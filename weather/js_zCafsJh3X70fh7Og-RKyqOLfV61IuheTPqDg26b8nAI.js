/**
 * Created with JetBrains PhpStorm.
 * User: thomas.vo
 * Date: 9/9/13
 * Time: 12:36 PM
 * To change this template use File | Settings | File Templates.
 */

(function (root, underscore, factory) {
  root.TwcClass = factory(underscore);
}(window.TWC, _, function (_) {
  // Straight from backbone
  var extend = function (protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function () { return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function () { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) {
      _.extend(child.prototype, protoProps);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  var TwcClass = function () {
    if (this.construct) {
      this.construct.apply(this,arguments);
    }
  };

  TwcClass.extend = extend;

  return TwcClass;
}));
;
(function (root, factory) {
  root.SunTurboAggregationConfig = factory();
}(window.TWC, function () {
  function sunTurboAggregationConfig() {
    return {
      /**
       * urlMatch property is what is used to match urls that can be aggregated
       * The string is used in a RegExp object
       * @type {String}
       */
      urlMatch: '/v2/turbo',
      /**
       * function that returns a single aggregated config object
       * based on the array of configs passed in
       *
       * @param  {Array} aggregateConfigs Array of configs that are aggregateable
       * @return {Object}                 Returns a config object that contains baseUrl, resource, and
       *                                  query parameters for the aggregate url.
       */
      aggregation: function (aggregateConfigs) {
        var aggregateConfigsPool = {};

        // loop through configs and group them by geocode
        // and by resource api until empty
        //
        // Example:
        // aggregateConfigsPool should be
        // {
        //   '33.44,-83.00': [config, config, config],
        //   '31.82,-81.48': [config, config]
        // }
        //??? Can this be done with Array.map or .reduce or grouping;

        while (aggregateConfigs.length > 0) {
          var aggregateConfig = aggregateConfigs.pop();
          if (!aggregateConfigsPool[aggregateConfig.geocode]) {
            aggregateConfigsPool[aggregateConfig.geocode] = [];
          }

          if (aggregateConfigsPool[aggregateConfig.geocode]) {
           aggregateConfigsPool[aggregateConfig.geocode].push(aggregateConfig);
          }
        }

        var aggregatedGeocodes = [];
        var aggregatedQueryParameters = {};
        var aggregatedResources = [];

        // push geocodes and resources to individual arrays.
        // instead of foreach, using for loop is faster
        // https://jsperf.com/object-keys-vs-for-in-with-closure/3
        var aggregateConfigsPoolArray = Object.keys(aggregateConfigsPool);
        // TODO: Unroll and optimize nested loops
        for (var i = 0; i < aggregateConfigsPoolArray.length; i++) { // Loop 1
          var geocode = aggregateConfigsPoolArray[i];
          aggregatedGeocodes.push(geocode);
          var aggregateConfigsArray = aggregateConfigsPool[geocode];
          for (var j = 0; j < aggregateConfigsArray.length; j++) { // Loop 2
            var config = aggregateConfigsArray[j];
            var configArray = Object.keys(config);
            for (var k = 0; k < configArray.length; k++) { // Loop 3
              var queryParam = configArray[k];
              if (!(queryParam === 'resource' || queryParam === 'baseUrl' || queryParam === 'geocode' || queryParam === 'geocodes')) {
                aggregatedQueryParameters[queryParam] = config[queryParam];
              }
            }

            var splitUrlArray = config.resource.split('/');
            splitUrlArray.splice(0, 1);
            var resource = splitUrlArray[splitUrlArray.length - 1];
            if (aggregatedResources.indexOf(resource) < 0) {
              aggregatedResources.push(resource);
            }
          }
        }

        var turboAggregateConfig = aggregatedQueryParameters;
        turboAggregateConfig.baseUrl = TWC.Configs.sunTurbo.baseUrl || 'https://api.weather.com';
        turboAggregateConfig.resource = '/v2/turbo/' + aggregatedResources.join(';');
        if (aggregatedGeocodes.length > 1) {
          turboAggregateConfig.geocodes = aggregatedGeocodes.join(';');
        } else {
          turboAggregateConfig.geocode = aggregatedGeocodes.join(';');
        }

        return turboAggregateConfig;
      },
      /**
       * Deaggregation function is used to deaggregate the aggregate url's response
       * into its constituent urls.
       *
       * @param  {String} configUrl         The aggregate url
       * @param  {$http Response} response  The aggregate url's response
       * @param  {Array} urls               An array of urls that were used to create the aggregate url
       * @return {Object}                   The return object is an object with each key as the individual urls
       *                                    and the values as the individual responses from the aggregate response
       */
      deaggregation: function (configUrl, response, urls) {
        var deaggregatedResponses = {};

        var responseByGeocodeResource = {};

        function transformResponseDoc(response, resource, geocode, responseDoc) {
          // copy response
          var resourceResponse = _.clone(response);

          // set subdoc to copy of response data
          resourceResponse.data = responseDoc;

          // set headers as object instead of function
          resourceResponse.headers = resourceResponse.headers;
          resourceResponse.date = new Date().getTime();

          responseByGeocodeResource[geocode] = responseByGeocodeResource[geocode] || {};
          responseByGeocodeResource[geocode][resource] = resourceResponse;
        }

        function urlHasGeocode(url, geocode){
          var urlParams = url.split(/geocode=/);
          if (!urlParams[1]) {
            return false;
          }

          var geocodeFromUrl = (urlParams[1]).split('&')[0];
          return formatGeocode(geocodeFromUrl) === formatGeocode(geocode);
        }

        function formatGeocode(geocode) {
          var geocodeArray = geocode.split(',');
          return parseFloat(geocodeArray[0]) + ',' + parseFloat(geocodeArray[1]);
        }

        var configUrlArray = configUrl.split('?');
        var geocodes = configUrl.split(/geocodes=|geocode=/)[1].split('&')[0];
        var geocodesArray = geocodes.split(';');
        var responseResource = configUrlArray[0].split('/v2/turbo/')[1];
        var responseResourceArray = responseResource.split(';');
        
        var subdoc;
        var resource;
        var geocode;
        var responseDoc;
        if (geocodesArray.length > 1) {
          // TODO: Unroll and optimize nested loops
          for (var i = 0; i < response.data.length; i++) {
            subdoc = response.data[i];
            geocode = subdoc.id;
            for (var j = 0; j < responseResourceArray.length; j++) {
              resource = responseResourceArray[j];
              // create mock response doc as if it were an individual call
              responseDoc = {
                id: geocode
              };
              responseDoc[resource] = subdoc[resource];

              transformResponseDoc(response, resource, geocode, responseDoc);
            }
          }
        } else {
          geocode = response.data.id;
          for (var k = 0; k < responseResourceArray.length; k++) {
            resource = responseResourceArray[k];
            // create mock response doc as if it were an individual call
            responseDoc = {
              id: geocode
            };
            responseDoc[resource] = response.data[resource];

            transformResponseDoc(response, resource, geocode, responseDoc);
          }
        }

        // find promise in promise pool and set to cache
        //??? TODO: Unroll and optimize nested loops
        for (var l = 0; l < urls.length; l++) {
          var url = urls[l];
          var responseByGeocodeResourceArray = Object.keys(responseByGeocodeResource);
          for (var m= 0; m < responseByGeocodeResourceArray.length; m++) {
            geocode = responseByGeocodeResourceArray[m];
            if (urlHasGeocode(url, geocode)) {
              var resourcesGeocodeArray = Object.keys(responseByGeocodeResource[geocode]);
              for (var n = 0; n < resourcesGeocodeArray.length; n++) {
                resource = resourcesGeocodeArray[n];
                if (url.indexOf(resource) > -1) {
                  var resourceResponse = responseByGeocodeResource[geocode][resource];
                  deaggregatedResponses[url] = resourceResponse;
                }
              }
            }
          }
        }

        return deaggregatedResponses;

      }
    };
  }
  return sunTurboAggregationConfig();
}));
;
(function (root, factory) {
  root.TwcDalModel = factory(root.TwcClass);
}(window.TWC, function (TwcClass) {
  function twcDalModel(TwcClass) {
    return TwcClass.extend({
      get: function (key) {
        return this.data ? this.data[key] : '';
      },
      set: function (obj) {
        angular.extend(this.data, obj);
      },
      execute: function () {

      },
      construct: function () {

      }
    });
  }
  return twcDalModel(TwcClass);
}));
;
(function (root, factory) {
  root.TwcDalCache = factory();
}(window.TWC, function () {
  function twcDalCache() {
    /**
     * Writes data variable to storage and debounces
     * @return {Void}
     */
    function writeToStorage() {
      if (writeTimer) {
        writeTimer = clearTimeout(writeTimer) && false;
      }

      // de-bounce write since writes are synchronous
      writeTimer = setTimeout(function () {
        localStorage.setItem(cacheName, JSON.stringify(data));
      }, 1000);
    }

    var DalCache = {};
    var writeTimer;
    var data = {};
    var size = 0;
    var cacheName = 'twcDalCache';
    var localStorage = window.localStorage;

    try {
      var cachedLocalStorageItems = localStorage.getItem(cacheName);
      // parse cached JSON to object to be shadowed by local storage
      data = cachedLocalStorageItems ? JSON.parse(cachedLocalStorageItems) /* safe values to parse */ : {};
    } catch (err) {
      console.debug('Unable to access local storage');
    }

    //??? What is this doing???
    /* This one-time initialization logic can be consolidated
     into the try/catch block above. */
    /*
     if (DalCache.hasLocalStorage) {
     var cachedLocalStorageItems = DalCache.localStorage.getItem(cacheName);
     // parse cache to json to be stored back into local storage
     data = cachedLocalStorageItems ? JSON.parse(cachedLocalStorageItems) : {};

     // write map to storage (overwrites what is in local storage)
     // Is it necessary to re-write the same data back to local storage. Is this
     // a time consuming process to convert this back to json and push to back
     // into local storage.
     // writeToStorage();
     }
     */
     
    DalCache.size = function () {
      return size;
    };

    DalCache.put = function (key, val) {
      if (!(key in data)) {
        size++;
      }

      data[key] = val;
      writeToStorage();
    };

    DalCache.get = function (key) {
      return data[key];
    };

    DalCache.remove = function (key) {
      delete data[key];
      size--;
      writeToStorage();
    };

    DalCache.removeAll = function () {
      size = 0;
      data = {};
      writeToStorage();
    };

    return DalCache;
  }

  return twcDalCache();
}));
;
/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function n(e){return t.raw?e:decodeURIComponent(e.replace(i," "))}function o(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),e=n(e);try{return t.json?JSON.parse(e):e}catch(o){}}var i=/\+/g,t=e.cookie=function(i,r,a){if(void 0!==r){if(a=e.extend({},t.defaults,a),"number"==typeof a.expires){var c=a.expires,u=a.expires=new Date;u.setDate(u.getDate()+c)}return r=t.json?JSON.stringify(r):String(r),document.cookie=[t.raw?i:encodeURIComponent(i),"=",t.raw?r:encodeURIComponent(r),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}for(var d=document.cookie.split("; "),f=i?void 0:{},p=0,s=d.length;s>p;p++){var l=d[p].split("="),m=n(l.shift()),x=l.join("=");if(i&&i===m){f=o(x);break}i||(f[m]=o(x))}return f};t.defaults={},e.removeCookie=function(n,o){return void 0!==e.cookie(n)?(e.cookie(n,null,e.extend({},o,{expires:-1})),!0):!1}});;
/*
 *jQuery browser plugin detection 1.0.2
 *
 * http://plugins.jquery.com/project/jqplugin
 * Checks for plugins / mimetypes supported in the browser extending the jQuery.browser object
 * Copyright (c) 2008 Leonardo Rossetti motw.leo@gmail.com
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

(function($){if(typeof $.browser==="undefined"||!$.browser){var browser={};$.extend(browser);}var pluginList={flash:{activex:"ShockwaveFlash.ShockwaveFlash",plugin:/flash/gim},sl:{activex:["AgControl.AgControl"],plugin:/silverlight/gim},pdf:{activex:"PDF.PdfCtrl",plugin:/adobe\s?acrobat/gim},qtime:{activex:"QuickTime.QuickTime",plugin:/quicktime/gim},wmp:{activex:"WMPlayer.OCX",plugin:/(windows\smedia)|(Microsoft)/gim},shk:{activex:"SWCtl.SWCtl",plugin:/shockwave/gim},rp:{activex:"RealPlayer",plugin:/realplayer/gim},java:{activex:navigator.javaEnabled(),plugin:/java/gim}};var isSupported=function(p){if(window.ActiveXObject){try{new ActiveXObject(pluginList[p].activex);$.browser[p]=true;}catch(e){$.browser[p]=false;}}else{$.each(navigator.plugins,function(){if(this.name.match(pluginList[p].plugin)){$.browser[p]=true;return false;}else{$.browser[p]=false;}});}};$.each(pluginList,function(i,n){isSupported(i);});})(jQuery);

;
(function(){function D(){var a="{}";if("userDataBehavior"==k){d.load("jStorage");try{a=d.getAttribute("jStorage")}catch(b){}try{r=d.getAttribute("jStorage_update")}catch(c){}h.jStorage=a}E();x();F()}function u(){var a;clearTimeout(G);G=setTimeout(function(){if("localStorage"==k||"globalStorage"==k)a=h.jStorage_update;else if("userDataBehavior"==k){d.load("jStorage");try{a=d.getAttribute("jStorage_update")}catch(b){}}if(a&&a!=r){r=a;var l=m.parse(m.stringify(c.__jstorage_meta.CRC32)),p;D();p=m.parse(m.stringify(c.__jstorage_meta.CRC32));
  var e,z=[],f=[];for(e in l)l.hasOwnProperty(e)&&(p[e]?l[e]!=p[e]&&"2."==String(l[e]).substr(0,2)&&z.push(e):f.push(e));for(e in p)p.hasOwnProperty(e)&&(l[e]||z.push(e));s(z,"updated");s(f,"deleted")}},25)}function s(a,b){a=[].concat(a||[]);if("flushed"==b){a=[];for(var c in g)g.hasOwnProperty(c)&&a.push(c);b="deleted"}c=0;for(var p=a.length;c<p;c++){if(g[a[c]])for(var e=0,d=g[a[c]].length;e<d;e++)g[a[c]][e](a[c],b);if(g["*"])for(e=0,d=g["*"].length;e<d;e++)g["*"][e](a[c],b)}}function v(){var a=(+new Date).toString();
  if("localStorage"==k||"globalStorage"==k)try{h.jStorage_update=a}catch(b){k=!1}else"userDataBehavior"==k&&(d.setAttribute("jStorage_update",a),d.save("jStorage"));u()}function E(){if(h.jStorage)try{c=m.parse(String(h.jStorage))}catch(a){h.jStorage="{}"}else h.jStorage="{}";A=h.jStorage?String(h.jStorage).length:0;c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.CRC32||(c.__jstorage_meta.CRC32={})}function w(){if(c.__jstorage_meta.PubSub){for(var a=+new Date-2E3,b=0,l=c.__jstorage_meta.PubSub.length;b<
  l;b++)if(c.__jstorage_meta.PubSub[b][0]<=a){c.__jstorage_meta.PubSub.splice(b,c.__jstorage_meta.PubSub.length-b);break}c.__jstorage_meta.PubSub.length||delete c.__jstorage_meta.PubSub}try{h.jStorage=m.stringify(c),d&&(d.setAttribute("jStorage",h.jStorage),d.save("jStorage")),A=h.jStorage?String(h.jStorage).length:0}catch(p){}}function q(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");
  return!0}function x(){var a,b,l,d,e=Infinity,h=!1,f=[];clearTimeout(H);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;l=c.__jstorage_meta.TTL;d=c.__jstorage_meta.CRC32;for(b in l)l.hasOwnProperty(b)&&(l[b]<=a?(delete l[b],delete d[b],delete c[b],h=!0,f.push(b)):l[b]<e&&(e=l[b]));Infinity!=e&&(H=setTimeout(x,e-a));h&&(w(),v(),s(f,"deleted"))}}function F(){var a;if(c.__jstorage_meta.PubSub){var b,l=B;for(a=c.__jstorage_meta.PubSub.length-1;0<=a;a--)if(b=c.__jstorage_meta.PubSub[a],
  b[0]>B){var l=b[0],d=b[1];b=b[2];if(t[d])for(var e=0,h=t[d].length;e<h;e++)t[d][e](d,m.parse(m.stringify(b)))}B=l}}var y=window.jQuery||window.$||(window.$={}),m={parse:window.JSON&&(window.JSON.parse||window.JSON.decode)||String.prototype.evalJSON&&function(a){return String(a).evalJSON()}||y.parseJSON||y.evalJSON,stringify:Object.toJSON||window.JSON&&(window.JSON.stringify||window.JSON.encode)||y.toJSON};if(!("parse"in m&&"stringify"in m))throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
  var c={__jstorage_meta:{CRC32:{}}},h={jStorage:"{}"},d=null,A=0,k=!1,g={},G=!1,r=0,t={},B=+new Date,H,C={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async=
    "false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};y.jStorage={version:"0.4.4",set:function(a,b,d){q(a);d=d||{};if("undefined"==typeof b)return this.deleteKey(a),b;if(C.isXML(b))b={_is_xml:!0,xml:C.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=m.parse(m.stringify(b)))}c[a]=b;for(var h=c.__jstorage_meta.CRC32,e=m.stringify(b),k=e.length,f=2538058380^k,g=0,n;4<=k;)n=e.charCodeAt(g)&255|
    (e.charCodeAt(++g)&255)<<8|(e.charCodeAt(++g)&255)<<16|(e.charCodeAt(++g)&255)<<24,n=1540483477*(n&65535)+((1540483477*(n>>>16)&65535)<<16),n^=n>>>24,n=1540483477*(n&65535)+((1540483477*(n>>>16)&65535)<<16),f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)^n,k-=4,++g;switch(k){case 3:f^=(e.charCodeAt(g+2)&255)<<16;case 2:f^=(e.charCodeAt(g+1)&255)<<8;case 1:f^=e.charCodeAt(g)&255,f=1540483477*(f&65535)+((1540483477*(f>>>16)&65535)<<16)}f^=f>>>13;f=1540483477*(f&65535)+((1540483477*(f>>>16)&
    65535)<<16);h[a]="2."+((f^f>>>15)>>>0);this.setTTL(a,d.TTL||0);s(a,"updated");return b},get:function(a,b){q(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml?C.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){q(a);return a in c?(delete c[a],"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],delete c.__jstorage_meta.CRC32[a],w(),v(),s(a,"deleted"),!0):!1},setTTL:function(a,b){var d=+new Date;q(a);b=Number(b)||0;return a in
    c?(c.__jstorage_meta.TTL||(c.__jstorage_meta.TTL={}),0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a],w(),x(),v(),!0):!1},getTTL:function(a){var b=+new Date;q(a);return a in c&&c.__jstorage_meta.TTL&&c.__jstorage_meta.TTL[a]?(a=c.__jstorage_meta.TTL[a]-b)||0:0},flush:function(){c={__jstorage_meta:{CRC32:{}}};w();v();s(null,"flushed");return!0},storageObj:function(){function a(){}a.prototype=c;return new a},index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=
    b&&a.push(b);return a},storageSize:function(){return A},currentBackend:function(){return k},storageAvailable:function(){return!!k},listenKeyChange:function(a,b){q(a);g[a]||(g[a]=[]);g[a].push(b)},stopListening:function(a,b){q(a);if(g[a])if(b)for(var c=g[a].length-1;0<=c;c--)g[a][c]==b&&g[a].splice(c,1);else delete g[a]},subscribe:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");t[a]||(t[a]=[]);t[a].push(b)},publish:function(a,b){a=(a||"").toString();if(!a)throw new TypeError("Channel not defined");
    c.__jstorage_meta||(c.__jstorage_meta={});c.__jstorage_meta.PubSub||(c.__jstorage_meta.PubSub=[]);c.__jstorage_meta.PubSub.unshift([+new Date,a,b]);w();v()},reInit:function(){D()}};(function(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{window.localStorage&&(h=window.localStorage,k="localStorage",r=h.jStorage_update)}catch(c){}else if("globalStorage"in window)try{window.globalStorage&&(h=
    "localhost"==window.location.hostname?window.globalStorage["localhost.localdomain"]:window.globalStorage[window.location.hostname],k="globalStorage",r=h.jStorage_update)}catch(g){}else if(d=document.createElement("link"),d.addBehavior){d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);try{d.load("jStorage")}catch(e){d.setAttribute("jStorage","{}"),d.save("jStorage"),d.load("jStorage")}a="{}";try{a=d.getAttribute("jStorage")}catch(m){}try{r=d.getAttribute("jStorage_update")}catch(f){}h.jStorage=
    a;k="userDataBehavior"}else{d=null;return}E();x();"localStorage"==k||"globalStorage"==k?"addEventListener"in window?window.addEventListener("storage",u,!1):document.attachEvent("onstorage",u):"userDataBehavior"==k&&setInterval(u,1E3);F();"addEventListener"in window&&window.addEventListener("pageshow",function(a){a.persisted&&u()},!1)})()})();;
(function (root, jQuery, factory) {
  root.TwcDalClient = factory(jQuery, root.TwcDalCache);
}(window.TWC, jQuery, function (jQuery, TwcDalCache) {
  // TODO add check for max 2k url length
  /**
   * Converts config object which contains baseUrl and resource as key value pairs
   * and extra key value pairs as query parameters.
   *
   * @param  {Object} config Object
   * @return {String}        url of the converted config object
   */
  function convertConfig(config) {
    var urlArray = [];
    var keys = Object.keys(config).sort();
    urlArray.push(config['baseUrl']);
    urlArray.push(config['resource']);
    for (var i = keys.length - 1; i >= 0; i--) {

      // if ? is not in url array, go ahead and push ? after
      // baseUrl and resource
      if (keys.length > 2 && urlArray.indexOf('?') < 0) {
        urlArray.push('?');
      }

      // push the query parameters onto the array
      // while ignoring baseUrl and resource
      if (!(keys[i] === 'baseUrl' || keys[i] === 'resource')) {
        urlArray.push(keys[i] + '=' + config[keys[i]]);
        urlArray.push('&');
      }
    }

    // join url
    var url = urlArray.join('');

    if (url.substr(url.length - 1) === '&') {
      url = url.substr(0, url.length - 1);
    }

    return url;
  }

  function twcDalClient($, TwcDalCache) {
    var DalClient = {};

    // maintain configs in object pool
    var configs = {};
    var aggregateConfigs = {};
    var aggregationConfigs = {};
    var modelNetworkExecutions = {};

    // maintain promise pool by key
    var promisePool = {};

    var timeout;

    /**
     * Makes a network call and optionally aggregates urls
     *
     * If the network call is in progress it will return the same promise
     * If passing in an isExpiredRule function, it will use the function is a way
     * to check if the cachedItem is expired or not. If it does not exist
     * it will continue to make a network call, else return promise
     *
     * @param  {Object}  config            Object that requires baseUrl, resource, and other keys as query parameters
     * @param  {function} isExpiredRule     Function that returns true if is expired. Function expects an object that contains
     *                                     data, config, headers, date (unix timestamp)
     * @param  {function}  aggregationConfig Object that contains urlMatch, aggregation (function), deaggregation (function)
     *                                     aggregation expects the array of configs to be aggregate. deaggregation expects 3 params
     *                                     for aggregateUrl, the http response of the aggregateUrl, and the array of urls that were aggregated
     * @return {Promise}                    Returns a promise
     */
    DalClient.execute = function (config, isExpiredRule, aggregationConfig) {
      var deferred = $.Deferred();

      if (!config) {
        deferred.reject(new Error('TwcDalClient: config was not passed.'));
        return deferred;
      }

      if (!(config.baseUrl && config.resource)) {
        deferred.reject(new Error('TwcDalClient: baseUrl and resource is required.'));
        return deferred;
      }

      // contruct url from config
      // config expects baseUrl and resource at least
      // all other key value pairs are treated as
      // query parameters appended after baseUrl and resource
      // with ?
      var url = convertConfig(config);

      // insert logic to validate url

      // add url in promise pool if it does not exist
      // with the deferred object and promise
      // set by url as key
      if (!promisePool[url]) {
        promisePool[url] = {
          deferred: deferred,
          promise: deferred
        };
      }

      // dont continue and return promise since its already been
      // created and network call has been fired
      if (modelNetworkExecutions[url]) {
        return promisePool[url].promise;
      }

      var cachedItem = TwcDalCache.get(url);

      // if cachedItem is there and is expired rule is there
      // and cached item is not expired
      // resolve and return promise
      if (cachedItem && isExpiredRule && !isExpiredRule(cachedItem)) {
        promisePool[url].deferred.resolve(cachedItem);
        return promisePool[url].promise;
      }

      // because we got this far
      // set object key as url with value as true
      // this property will be deleted after finishing
      // a network call
      modelNetworkExecutions[url] = true;

      // if there is an aggregation config
      // and it matches the urlMatch specified on the config
      // add config based on what is matched to aggregation group
      // else just add url/config property to configs object
      if (aggregationConfig && aggregationConfig.urlMatch &&
        aggregationConfig.aggregation && aggregationConfig.deaggregation &&
        new RegExp(aggregationConfig.urlMatch, 'i').test(config.resource)) {
        aggregationConfigs[aggregationConfig.urlMatch] = aggregationConfig;
        aggregateConfigs[aggregationConfig.urlMatch] = aggregateConfigs[aggregationConfig.urlMatch] || [];
        aggregateConfigs[aggregationConfig.urlMatch].push(config);
      } else {
        configs[url] = {
          aggregate: false,
          config: config
        };
      }

      // debounce network calls
      if (timeout) {
        timeout = clearTimeout(timeout) && false;
      }

      // timeout network calls to aggregate all possible calls
      timeout = setTimeout(function DalClientTimeout() {

        var aggregateConfigsArray = Object.keys(aggregateConfigs);
        var aggregateConfigsSize = aggregateConfigsArray.length;
        var aggregateUrlMatch = '';
        if (aggregateConfigsSize > 0) {
          // loop through different aggregation configs
          //??? TODO: Unroll and optimize nested for loops.
          for (var i = 0; i < aggregateConfigsArray.length; i++) {
            aggregateUrlMatch = aggregateConfigsArray[i];
            var aggregateUrls = [];
            for (var j = 0; j < aggregateConfigs[aggregateUrlMatch].length; j++) {
              aggregateUrls.push(convertConfig(aggregateConfigs[aggregateUrlMatch][j]));
            }

            if (aggregateConfigs[aggregateUrlMatch].length === 0) {
              continue;
            }

            var aggregateUrlConfig = aggregationConfigs[aggregateUrlMatch].aggregation(aggregateConfigs[aggregateUrlMatch]);
            var aggregateUrl = convertConfig(aggregateUrlConfig);
            configs[aggregateUrl] = {
              aggregate: true,
              aggregateConfigs: aggregateConfigs,
              aggregateUrlMatch: aggregateUrlMatch,
              urls: aggregateUrls,
              config: aggregateUrlConfig
            };
          }
        }

        /**
         * Function that does the network call given the url
         * @param  {String} configUrl String of the url
         * @return {Void}           Resolves promises
         */
        function executeNetworkCall(configUrl) {
          var config = configs[configUrl];

          //return $http.get(configUrl)
            var request = $.getJSON(configUrl);
                request.fail(function (err) {
                    if (config.aggregate) {
                        var urls = config.urls;
                        for (var i = 0; i < urls.length; i++) {
                            // set to false so that next call is either cached or follows through
                            modelNetworkExecutions[urls[i]] = false;
                            promisePool[urls[i]].deferred.reject(err);
                        }
                    } else {
                        // set to false so that next call is either cached or follows through
                        modelNetworkExecutions[configUrl] = false;
                        promisePool[configUrl].deferred.reject(err);
                    }
                    return err;
                });

             return request.done(function (response, statusText, jqXHR) {
               var pkgdResponse = {
                     data: response,
                     status: jqXHR.status,
                     headers: {
                         'cache-control': jqXHR.getResponseHeader('cache-control'),
                         'date': jqXHR.getResponseHeader('date')
                     }
                 };
                if (response) {
                  response.config = { url: configUrl };
                  
                }
               if (config.aggregate) {
                 aggregateUrlMatch = config.aggregateUrlMatch;
                 var urls = config.urls;
                 var deaggregatedResponses = aggregationConfigs[aggregateUrlMatch].deaggregation(configUrl, pkgdResponse, urls);

                for (var i = 0; i < urls.length; i++) {
                  // set to false so that next call is either cached or follows through
                  modelNetworkExecutions[urls[i]] = false;
                  // set to cache and resolve promises
                  promisePool[urls[i]].deferred.resolve(deaggregatedResponses[urls[i]]);
                  TwcDalCache.put(urls[i], deaggregatedResponses[urls[i]]);
                }
              } else {
                pkgdResponse.date = new Date().getTime();

                // set to false so that next call is either cached or follows through
                modelNetworkExecutions[configUrl] = false;
                promisePool[configUrl].deferred.resolve(pkgdResponse);
                TwcDalCache.put(configUrl, pkgdResponse);
              }

              return pkgdResponse;

            });
        }

        function thenDeleteFromConfig(data) {
          if (data && data.config) {
            delete configs[data.config.url];
          }
        }

        // loop through each config
        var configsArray = Object.keys(configs);
        for (var k = 0; k < configsArray.length; k++) {
          configsArray[k] && executeNetworkCall(configsArray[k])
            .done(thenDeleteFromConfig);
        }

      }, 10);

      return promisePool[url].promise;
    };

    return DalClient;
  }

  return twcDalClient(jQuery, TwcDalCache);
}));
;
