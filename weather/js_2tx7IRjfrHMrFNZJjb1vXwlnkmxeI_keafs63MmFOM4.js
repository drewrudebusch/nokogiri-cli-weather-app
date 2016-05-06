/**
 * Author: ksankaran (Velu)
 * Date: 3/18/14
 * Time: 10:04 PM
 * Comments:
 */

/*!
 * domready (c) Dustin Diaz 2012 - License MIT
 */
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}});
//////////////////////////////
// eq.js
//////////////////////////////
!function(e,t){"use strict";function n(){this.nodes=[],this.eqsLength=0,this.widths=[],this.points=[],this.callback=void 0}function o(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent("on"+t,function(){return n.call(e,window.event)})}function r(e){return e.className.split(/[\s]+/)}function i(e,t){a(e),e.className=r(e).concat(["data-eq-"+t]).join(" ")}function a(e){for(var t=[],n=r(e),o=0,i=n.length;i>o;o++){var a=n[o];-1===a.indexOf("data-eq-")&&t.push(a)}e.className=t.join(" ")}function s(t){t.forEach(function(t){t.target.getAttribute("data-eq-pts")&&!t.target.getAttribute("data-eq-state")&&(e.refreshNodes(),e.query())})}"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="".__proto__===String.prototype?function(e){return e.__proto__}:function(e){return e.constructor.prototype});for(var u=0,d=["webkit","moz"],c=0;c<d.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[d[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[d[c]+"CancelAnimationFrame"]||window[d[c]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){t=t;var n=(new Date).getTime(),o=Math.max(0,16-(n-u)),r=window.setTimeout(function(){e(n+o)},o);return u=n+o,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)}),n.prototype.query=function(t,n){var o,r=Object.getPrototypeOf(e);n&&"function"==typeof n&&(r.callback=n),t&&"number"!=typeof t?o=t.length:(t=r.nodes,o=r.nodesLength);var i,a=[],s=[];for(i=0;o>i;i++){a.push(t[i].offsetWidth);try{s.push(r.sortObj(t[i].getAttribute("data-eq-pts")))}catch(u){s.push({})}}r.widths=a,r.points=s,t&&"number"!=typeof t?r.nodeWrites(t,a,s):n&&"function"!=typeof n?r.nodeWrites():window.requestAnimationFrame(r.nodeWrites)},n.prototype.nodeWrites=function(t){var n,o,r,s=Object.getPrototypeOf(e),u=s.widths,d=s.points;for(t&&"number"!=typeof t?o=t.length:(t=s.nodes,o=s.nodesLength),n=0;o>n;n++){var c=u[n],f=t[n],l=d[n],w=l.length;if(c<l[0].value)f.removeAttribute("data-eq-state"),a(f);else if(c>=l[w-1].value)f.setAttribute("data-eq-state",l[w-1].key),i(f,l[w-1].key);else for(var m=0;w>m;m++){var p=l[m],v=l[m+1];if(0===m&&c<p.value){f.removeAttribute("data-eq-state"),a(f);break}if(void 0===v.value){f.setAttribute("data-eq-state",v.key),i(f,v.key);break}if(c>=p.value&&c<v.value){f.setAttribute("data-eq-state",p.key),i(f,p.key);break}}}s.callback&&(r=s.callback,s.callback=void 0,r(t))},n.prototype.refreshNodes=function(){var t=Object.getPrototypeOf(e);t.nodes=document.querySelectorAll("[data-eq-pts]"),t.nodesLength=t.nodes.length},n.prototype.sortObj=function(e){for(var t=[],n=e.split(","),o=0;o<n.length;o++){var r=n[o].split(":");t.push({key:r[0].replace(/^\s+|\s+$/g,""),value:parseFloat(r[1])})}return t.sort(function(e,t){return e.value-t.value})},e=e||new n,window.MutationObserver?new MutationObserver(s).observe(document.documentElement,{childList:!0,subtree:!0}):t?t(function(){e.refreshNodes(),e.query(void 0,!0)}):o(window,"DOMContentLoaded",function(){e.refreshNodes(),e.query(void 0,!0)}),o(window,"resize",function(){e.refreshNodes(),e.query(),window.requestAnimationFrame(e.query)}),"undefined"!=typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd?define(function(){return e}):window.eqjs=e}(window.eqjs,window.domready);;

/*
    Future-proof coding pattern for modular JavaScript
 */
(function (root, factory) {
    /*
      // AMD
      // @ref http://requirejs.org/docs/whyamd.html#amd
      // CommonJS
      // @ref http://requirejs.org/docs/commonjs.html
      define(["TwcClass", "TwcDalClient", "SunTurboAggregationConfig"], function(TwcClass, TwcDalClient, SunTurboAggregationConfig) {
        return (root.TwcDalBaseModel = factory(TwcClass, TwcDalClient, SunTurboAggregationConfig));
      });
    *//*
      // NodeJS
      module.exports = (root.TwcDalBaseModel = factory(require("TwcClass"), require("TwcDalClient"), require("SunTurboAggregationConfig")));
    */
    // Export to global namespace [root]
    root.TwcDalBaseModel = factory(root.TwcClass, root.TwcDalClient, root.SunTurboAggregationConfig);
}(window.TWC, function (TwcClass, TwcDalClient, SunTurboAggregationConfig) {

  /**
   * Private function used to parse HTTP cache control headers
   * https://github.com/roryf/parse-cache-control/blob/master/index.js
   *
   * @param  {String} field    String value of cache control http property
   * @return {Integer}         Returns the pased value of max age
   */
  function parseCacheControl(field) {

    if (typeof field !== 'string') {
      return null;
    }

    /*
      Cache-Control   = 1#cache-directive
      cache-directive = token [ "=" ( token / quoted-string ) ]
      token           = [^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+
      quoted-string   = "(?:[^"\\]|\\.)*"
    */

    //                             1: directive                                        =   2: token                                              3: quoted-string
    var regex = /(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g;

    var header = {};
    var err = field.replace(regex, function($0, $1, $2, $3) {
      var value = $2 || $3;
      header[$1] = value ? value.toLowerCase() : true;
      return '';
    });

    if (header['max-age']) {
      try {
        var maxAge = parseInt(header['max-age'], 10);
        if (isNaN(maxAge)) {
          return null;
        }

        header['max-age'] = maxAge;
      }
      catch (err) { }
    }

    return (err ? null : header);
  }

  function baseModel(TwcClass, TwcDalClient, SunTurboAggregationConfig) {
    return TwcClass.extend({

      /**
       *  Aggregation config to group similar turbo calls
       * @type {[type]}
       */
      aggregationConfig: SunTurboAggregationConfig,
      /**
       * isExpiredRule is a function that passes in the $http response
       * which can be used to determine cache headers, cache time, expires, time,
       * etc.
       *
       * @param  {$http response}  data $http response
       * @return {Boolean}      Returns true if its expired, else false
       */
      isExpiredRule: function (data) {
        var currentDateTime = new Date().getTime();
        var dataHeaders = data.headers;
        var dateHeader = dataHeaders['date'];

        // if date doesnt exist in response, use date set when response was saved to cache
        var dataDateUnix = new Date(dateHeader).getTime() || data.date;
        var cacheControlHeader = dataHeaders['cache-control'];
        var cacheControlObj = parseCacheControl(cacheControlHeader);
        var cacheControlMaxAge = cacheControlObj && cacheControlObj['max-age'];

        if (cacheControlHeader && cacheControlMaxAge && (dataDateUnix + (cacheControlMaxAge * 1000) > currentDateTime)) {
          return false;
        }

        return true;

      },
      /**
       * This function massages the data that comes back from a network call
       * See execute()
       *
       * @return {Void}
       */
      transform: function () {
        this.data = this.data;
      },
      get: function (key) {
        return this.data ? this.data[key] : '';
      },

      set: function (obj) {
        angular.extend(this.data, obj);
      },
      /**
       * Execute fires off a network call and throws an error if applicable
       * It uses TwcDalClient which passes in urlConfig, optional isExpired rule, and optional aggregationConfig
       * which is used to aggregate any applicable urls
       *
       * @return {Promise} Returns promise for the data. Data is set to data, headers set to headers, status set to status.
       */
      execute: function () {
        var _this = this;

        // do work on the response
        var promise = TwcDalClient.execute(_this.urlConfig, _this.isExpiredRule, _this.aggregationConfig);
          promise.fail(function (err) {
              _this.headers = null;
              _this.data = null;
              _this.status = err.status || 0;
              //throw err;
          });
        return promise.done(function (response) {

          if(!Object.isFrozen(_this)) {

            if(response) {

              _this.headers = response.headers;
              _this.data    = response.data;
              _this.status  = response.status;

              // transform data when a model uses a transform function
              _this.transform();

            }

            return _this;
          }
        });
      },
      /**
       * This is the constructor function used to create the object
       *
       * @param  {Object} urlConfig This object contains baseUrl, resource, and other keys as query parameters
       * @return {Void}
       */
      construct: function (urlConfig) {
        this.urlConfig = urlConfig;
      }

    });
  }

  return baseModel(TwcClass, TwcDalClient, SunTurboAggregationConfig);
}));
;
(function(TWC, window) {
    if( window.explicit_location_obj) {
        TWC._prefetch = TWC._prefetch || {};
        var geocode = window.explicit_location_obj.lat + "," + window.explicit_location_obj.long;
        var baseUrl = TWC.Configs.sunTurbo.baseUrl || 'https://api.weather.com';
        var apiKey = TWC.Configs.sunTurbo.apiKey || '';
        var language = TWC.Configs.sunTurbo.locale || 'en';
        var format = 'json';
        var units = TWC.PcoUtils.getUserPreferedUnits();

        TWC._prefetch.models = [
            {resource: '/v2/turbo/vt1observation', units: units},
            {resource: '/v2/turbo/vt1dailyForecast', units: units},
            {resource: '/v2/turbo/vt1pollenforecast'}
        ].map(function(config) {
            return new TWC.TwcDalBaseModel(_.extend({
                baseUrl: baseUrl,
                apiKey: apiKey,
                language: language,
                format: format,
                geocode: geocode
            }, config));
        });
        TWC._prefetch.promise = Promise.all(TWC._prefetch.models.map(function(model) {
            return model.execute();
        }));
    }
}(TWC, window));;
/**
 * Created with PhpStorm
 * User: ssherwood
 * Date: 12/15/14
 * Time: 7:51 AM
 *
 */
TWC.tealium = TWC.tealium || {};
window.utag_data = window.utag_data || {};
TWC.Events.ifReady(['pcoReady', 'wfxtgReady', 'lotameReady', 'amznslotsReady', 'criteoReady', 'openxReady']).done(function(){
  var gnv = TWC.pco.getNodeValue,
      snv = TWC.pco.setNodeValue,
      $ = jQuery, i,
      twcSettings = Drupal && Drupal.settings && Drupal.settings.twc,
      adConfigs = twcSettings && twcSettings.adConfigs,
      pageType = gnv('page','content'),
      screenSize = gnv('page','screenSize'),
      mobileScreen = (screenSize === 'mobileSized'),
      tabletScreen = (screenSize === 'tabletSized'),
      screen = mobileScreen && 'mobile' || tabletScreen && 'tablet' || 'desktop';

  // check if sitespect has set a value for the experiment
  utag_data["vab"] = !utag_data["vab"] ? "main" : utag_data["vab"];

  /**
   * Add cust_param env
   * Random Number between 1 and 10
   */
  utag_data['gpt_env'] = "" + Math.floor(Math.random()*(10-0)+1);

  /**
   * Pass screensize for prop74
   */
  utag_data['screensize'] = screenSize;

  /**
   * Detect useragent and report browser
   */
  var userAgent = navigator && navigator.userAgent,
      browser = userAgent && userAgent.match(/chrome|firefox|safari|trident/i);
  if (browser && jQuery.isArray(browser)) {
    switch (browser[0].toLowerCase()) {

      case 'chrome':
        utag_data['brwsr'] = 'twcchrome';
        break;
      case 'firefox':
        utag_data['brwsr'] = 'twcff';
        break;
      case 'safari':
        utag_data['brwsr'] = 'twcsafari';
        break;
      case 'trident':
        utag_data['brwsr'] = 'twcie';
        break;
      default:
        utag_data['brwsr'] = 'twcnative';
    }
  }

  /**
   * Send isUserLoggedIn on every omniture beacon call.  This sets up that variable.
   */
  var isloggedin = jQuery.cookie('uplogin') ? 'logged in' : 'not logged in';
  utag_data['js_page.loggedin'] = isloggedin;

  /**
   * Process cig variable for Criteo
   */
  if (window.crtg_content) {
    var split_criteo, l, split_cig, output = [];
    split_criteo = crtg_content.split(";");
    for (i = 0, l = split_criteo.length; i < l; i++) {
      if (split_criteo[i].match(/cig/)) {
        split_cig = split_criteo[i].split('=');
        if (split_cig.length === 2) {
          output.push(split_cig[1]);
        }
      }
    }
    utag_data['cig'] = output.join(",");
  }

  /**
   * If the page variant exists, use it to determine isMobile.
   * Next test for article or video page and screen size
   * otherwise if gnv('device','OpenDDRDevice').match(/phone/)
   * set isMobile to true.
   */

  utag_data['js_page.isMobile'] = false;
  if (gnv('page','variant')) {
    utag_data['js_page.isMobile'] = gnv('page', 'variant') !== 'big';
  } else if (screen === 'mobile') {
    utag_data['js_page.isMobile'] = true;
  }

  /**
   * forecast 24 hour module
   * Only report on pages with forecast_24hour module
   */
  if (twcSettings && twcSettings.modules && twcSettings.modules.forecast_24hour) {
    var isExpandedView = gnv('products', 'fcst24') && gnv('products', 'fcst24').isExpandedView;
    utag_data['fcst24_expandedView'] =  utag_data['fcst24_expandedView2'] = isExpandedView ? 'expanded' : 'collapsed';
  }

  /**
   * locTypeIdName
   * @type {string}
   */
  if (gnv('page', 'currentLocation') && !gnv('page', 'currentLocation').error) {
    utag_data['js_page.locTypeIdName'] = gnv('page', 'currentLocation').locType + ':' +
      gnv('page', 'currentLocation').locId + ':' +
      gnv('page', 'currentLocation').cityNm.replace(/ /g, '_');
  }

  /**
   * fromStr
   */
  utag_data['js_page.fromStr'] =
    utag_data['js_page.fromStr2'] = gnv('page','fromStr');

  /**
   * impression_id
   */
  utag_data['js_page.impression_id'] = gnv('ad','impression_id');

  /**
   * metrics data
   */
  utag_data['js_page.pagename'] = utag_data['js_page.pagename2'] =
    gnv('metrics','level1') + ':' + gnv('metrics','pagename');
  utag_data['js_page.level1'] =
    utag_data['js_page.level1_2'] =
      utag_data['js_page.channel'] = gnv('metrics','level1');
  utag_data['js_page.contentSection'] =
    utag_data['js_page.contentSection2'] = gnv('metrics','contentSection');
  utag_data['js_page.contentFamily'] =
    utag_data['js_page.contentFamily2'] = gnv('metrics','contentFamily');
  utag_data['js_page.contentChannel'] =
    utag_data['js_page.contentChannel2'] = gnv('metrics','contentChannel');
  utag_data['js_page.timeframe'] = gnv('metrics','level1') || 'nl';
  utag_data['js_page.contentType'] = gnv('metrics','contentType');

  /**
   * Current URL
   */
  utag_data['js_page.current_url'] = document.location.href;

  /**
   * ad location info
   */
  var city, state, loc = gnv('ad','location'),locale_array, localeStr = gnv('page','locale');
  if (loc) {
    utag_data['js_page.lat'] = '' + loc.lat;
    utag_data['js_page.lon'] = '' + loc.long;
    locale_array = localeStr.split('-');
    if ($.isArray(locale_array) && locale_array.length > 1) {
      locale_array[1] = locale_array[1].toUpperCase();
      localeStr = locale_array.join('-');
    } else {
      // If international module is not turned on hard code en-US
      localeStr = 'en-US';
    }
    utag_data['js_page.locale'] = localeStr;

    // targeting by locid requires locId$locType for all locTypes except 4
    utag_data['js_page.locid'] = (loc.locType !== 4) ? loc.locId + '$' + loc.locType : loc.locId;

    utag_data['js_page.gpr'] = loc._gprId;
    if (loc.locType === 4) {
      utag_data['js_page.ent'] =  'zip';
    } else if (loc.locType === 1) {
      utag_data['js_page.ent'] = 'city';
    }
    utag_data['js_page.dma'] =
      utag_data['js_page.dma2'] = loc.dmaCd + '';
    utag_data['js_page.city'] = city = loc.cityNm;
    utag_data['js_page.state'] = state = loc.stCd;
    utag_data['js_page.zip'] =
      utag_data['js_page.zip2'] = loc.zipCd;
    utag_data['js_page.cntryCd'] = loc.cntryCd;
    utag_data['js_page.countyName'] = loc.cntyNm;
    utag_data['js_page.locCityStateCountry'] =
      utag_data['js_page.locCityStateCountry2'] = city + ":" + state + ":" + loc.cntryCd;
  }

  /**
   * wx data
   */
  utag_data['js_page.cond'] =
    utag_data['js_page.cond2'] = gnv("wx","cond");
  utag_data['js_page.pollen'] = gnv("wx","pollen");
  utag_data['js_page.temp'] = gnv("wx","temp");
  utag_data['js_page.tempc'] = gnv("wx","tempc") + '';
  utag_data['js_page.tempR'] = gnv("wx","tempR");
  utag_data['tempRC'] = gnv("wx","tempRC");
  utag_data['js_page.fhi'] = gnv("wx","fcst") && gnv("wx","fcst").tempH || "";
  utag_data['js_page.fhr'] = gnv("wx","fcst") && gnv("wx","fcst").tempHR || "";
  utag_data['js_page.fli'] = gnv("wx","fcst") && gnv("wx","fcst").tempL || "";
  utag_data['js_page.flr'] = gnv("wx","fcst") && gnv("wx","fcst").tempLR || "";
  utag_data['js_page.fhic'] = gnv('wx', 'fcst') && gnv('wx', 'fcst').tempCH + '' || '';
  utag_data['js_page.floc'] = gnv('wx', 'fcst') && gnv('wx', 'fcst').tempCL + '' || '';
  utag_data['js_page.fltmpc'] = gnv('wx', 'flsLkC') + '';

  utag_data['js_page.wind'] = gnv("wx","wind");
  utag_data['js_page.uv'] = gnv("wx","uv");
  utag_data['js_page.hum'] = gnv("wx","hum");
  utag_data['js_page.snw'] = gnv("wx","snw");
  utag_data['js_page.baroTendency'] = gnv("wx","baroTendency");
  utag_data['js_page.fsnw'] = gnv("wx","fcst") && gnv("wx","fcst").fsnw + '';
  utag_data['js_page.prcp'] = gnv("wx","fcst") && gnv("wx","fcst").prcp && gnv("wx","fcst").prcp.prcpStr || "";
  utag_data['js_page.fc1'] = gnv("wx","fcst") && gnv("wx","fcst").cond && gnv("wx","fcst").cond.fc1 || "";
  utag_data['js_page.fc2'] = gnv("wx","fcst") && gnv("wx","fcst").cond && gnv("wx","fcst").cond.fc2 || "";
  utag_data['js_page.fc3'] = gnv("wx","fcst") && gnv("wx","fcst").cond && gnv("wx","fcst").cond.fc3 || "";
  utag_data['js_page.d1'] = gnv("wx","fcst") && gnv("wx","fcst").fiveDay && gnv("wx","fcst").fiveDay.d1 || "";
  utag_data['js_page.d2'] = gnv("wx","fcst") && gnv("wx","fcst").fiveDay && gnv("wx","fcst").fiveDay.d2 || "";
  utag_data['js_page.d3'] = gnv("wx","fcst") && gnv("wx","fcst").fiveDay && gnv("wx","fcst").fiveDay.d3 || "";
  utag_data['js_page.d4'] = gnv("wx","fcst") && gnv("wx","fcst").fiveDay && gnv("wx","fcst").fiveDay.d4 || "";
  utag_data['js_page.d5'] = gnv("wx","fcst") && gnv("wx","fcst").fiveDay && gnv("wx","fcst").fiveDay.d5 || "";

  /**
   * ord / rmid
   */
  utag_data['js_page.ord'] = utag_data['js_page.rmid'] = "" + gnv("user","rmid");

  /**
   * lang
   */
  utag_data['js_page.lang'] = gnv("page","lang");

  /**
   * primaryDecl
   */
  utag_data['js_page.primaryDecl'] =
    utag_data['js_page.primaryDecl2'] = typeof gnv("user","declarations") === "object" &&
                                        gnv("user","declarations")[0];

  /**
   * anonymizedURL
   */
  var anonymization = String(window.location.pathname);
  if (anonymization.indexOf("?") > -1) {
    var eol1 = anonymization.indexOf("?");
    anonymization = anonymization.substring(0,eol1);
  }
  if (anonymization.indexOf("#") > -1) {
    var eol2 = anonymization.indexOf("#");
    anonymization = anonymization.substring(0,eol2);
  }
  if(anonymization === "/index.html"|| anonymization === "/" || anonymization === ""){
    anonymization="/";
  } else{
    if(anonymization.indexOf("/interact/photogallery") === 0){
      anonymization='/interact/photogallery';
    }else if(anonymization.indexOf("/common/drilldown") === 0){
      var urlObjs1=anonymization.split("/");
      for(i=0;i<urlObjs1.length;i++){
        if(i !== "common" || i !== "drilldown"){
          urlObjs1.pop();
        }
      }
      anonymization = urlObjs1.join("/");
    } else if (anonymization.indexOf(".html") > -1) {
    } else {
      var urlObjs2 = anonymization.split("/");
      totalNum = urlObjs2.length - 1;
      var omn_temp = urlObjs2[totalNum];
      if (omn_temp.match(/[A-Z]/) || omn_temp.match(/[0-9]/) || omn_temp.match(/[@#$%&!*:]/) || omn_temp === '') {
        urlObjs2.pop();
      }
      anonymization = urlObjs2.join("/");
    }
  }
  utag_data['js_page.anonymizedURL'] = anonymization;

  /**
   * provider_author
   */
  var provider = gnv("metrics","meta") && gnv("metrics","meta").provider,
    author = gnv("metrics","meta") && gnv("metrics","meta").author &&
             gnv("metrics","meta").author.match(/(By )?([^()]*)(\(.*\))?/)[2];
  if (author) {
    author = author && author.replace(/ /, '_');
    author = "By_" + author;

    utag_data['js_page.provider_author'] =
      utag_data['js_page.provider_author2'] = (author && provider) ? provider + ":" + author : null;
  }

  /**
   * template
   */
  utag_data['js_page.template'] = gnv("metrics","meta") && gnv("metrics","meta").page_template;

  /**
   * partner
   */
  utag_data['js_page.partner'] = gnv("page","parStr") ? gnv("page","partner") : ""; // prop39
  utag_data['js_page.partner2'] = gnv("user","partner") || ""; // eVar39
  utag_data['js_page.partner3'] = gnv("page","partner") || ""; // eVar60

  /**
   * partnerSite
   */
  utag_data['js_page.partnerSite'] = gnv("page","partnerSite");

  /**
   * partner_ilabel
   */
  utag_data['js_page.partner_ilabel'] = gnv('page','partner_ilabel');

  /**
   * intref
   */
  utag_data['intref'] = gnv('page','intref');

  /**
   * campaign
   */
  var cm_ven = gnv('page','cm_ven'),
    cm_cat = gnv('page','cm_cat'),
    cm_pla = gnv('page','cm_pla'),
    cm_ite = gnv('page','cm_ite'),
    cm_date = gnv('page','cm_date');

  /**
   * date suffix for campaignCode
   */
  if (cm_date) {
    cm_date = '_' + cm_date;
  }

  utag_data['js_page.campaign'] =
    utag_data['js_page.campaign2'] =
      utag_data['js_page.campaign3'] = cm_ven + cm_date + cm_cat + cm_pla + cm_ite;

  /**
   * campaignCode
   */
  if (cm_ven) {
    utag_data['js_page.campaignCode'] = gnv('metrics', 'pagename') + '?cm_ven=' + cm_ven + cm_date;
  }

  /**
   * event2
   */
  utag_data['js_page.event_name'] = "event2";

  /**
   * Site Severe Mode
   */
  utag_data['js_page.severe'] = gnv("ad","severe");

  /**
   * assetId
   */
  utag_data['js_page.assetId'] = gnv('page','assetId');

  /**
   * assetType
   */
  utag_data['js_page.assetType'] = gnv('page','assetType');

  /**
   * DFP Network Code
   */
  utag_data['js_page.DFP_Network_Code'] = 7646;

  /**
   * site
   */
  utag_data['js_page.site'] = screenSize === 'mobileSized' && 'mobile_smart_us' ||
                              screenSize === 'tabletSized' && 'tablet_weather_us' ||
                              screenSize === 'desktopSized' && 'web_weather_us';

  /**
   * ad_unit
   */
  var adstest = gnv('ad','adstest');
  var site = utag_data['js_page.site'];
  site = (adstest) ? 'test_' + site : site;
  utag_data['js_page.ad_unit'] = "/" + utag_data['js_page.DFP_Network_Code'] + "/" + site;

  /**
   * zone
   */
  var adsmetrics_zone = gnv('ad','zone');
  utag_data['js_page.zone'] = adsmetrics_zone && adsmetrics_zone.replace(/ /g,'');

  /**
   * ugcLookup
   */
  utag_data['js_page.ugcLookup'] = gnv('ad','ugcLookup');

  /**
   * positions lookup
   * @output array
   */
  utag_data['js_page.positions'] = gnv("ad","all_ad_positions");

  // var contentType = TWC.pco.get('page').attributes.content; 
  // check content type 'article'
  var path = document.location.href;
  var res = path.split('/');
  var pathCont = res[res.length - 2];
  var isArticle = (pathCont === 'news');
  var hasVideo = (TWC.pco.getNodeValue('page','contains_videoplayer') === 'videoplayer-present');
  var isSponsored = false;

  if (Drupal.settings.twc.contexts && Drupal.settings.twc.contexts.taxonomy_term &&
    Drupal.settings.twc.contexts.taxonomy_term.field_collection_sponsored &&
    Drupal.settings.twc.contexts.taxonomy_term.field_collection_sponsored.und[0]) {
    isSponsored = (Drupal.settings.twc.contexts.taxonomy_term.field_collection_sponsored.und[0].value === "1");
  }

  //WEB-2729, WEB-3860
  if (isArticle && hasVideo) {
    //If article's collectionis sponsored, only preroll and companion should show
    var index = utag_data['js_page.positions'].indexOf("WX_VideoCompanion");
    if (isSponsored) {
      //If WX_VideoCompanion position was not meant to be in the first place (mobile web), we will not include it
      utag_data['js_page.positions'] = index === -1 ? ["WX_Video_Player"] : ["WX_Video_Player", "WX_VideoCompanion"];
    } else {
      //if not sponsored, companion should not show - everything else can
      if (index !== -1) {
        utag_data['js_page.positions'].splice(index, 1);
      }
    }
    TWC.Events.getEvent('slotRefreshReady').resolve();
  }

  /**
   * videoCollection
   */
  if (twcSettings && twcSettings.contexts && twcSettings.contexts.node && twcSettings.contexts.node.type === "video") {
    utag_data['videoCollection'] = twcSettings.contexts.node.field_pcoll;
  } else if (twcSettings && twcSettings.contexts && twcSettings.contexts.term) {
    utag_data['videoCollection'] = twcSettings.contexts.term.name;
  }

  /**
   * videoPlaylist
   */
  if (twcSettings && twcSettings.contexts && twcSettings.contexts.node && twcSettings.contexts.node.type === "video") {
    var playlist = TWC.PcoUtils.getURLParameter("pl");
    utag_data['videoPlaylist'] = playlist || 'none';
  }

  /**
   * contains_videoplayer
   */
  utag_data['js_page.contains_videoplayer'] = gnv('page','contains_videoplayer');

  /**
   * date
   */
  var dt = new Date();
  utag_data['js_page.date'] = (dt.getMonth() + 1) + "-" + dt.getDate() +  "-" + dt.getFullYear();

  /**
   * refurl
   */
  utag_data['js_page.refurl'] = gnv('ad', 'refurl') || "";

  /**
   * mlayer
   */
  var layers = TWC.PcoUtils.getURLParameter('layers');
  layer = layers && layers.indexOf(',') === -1 ? layers : layers && layers.split(',')[1];
  if (layer) {
    utag_data['js_page.mlayer'] = layer;
  }

  /**
   * plat
   */
  utag_data['js_page.plat'] = screenSize === 'desktopSized' && 'wx' ||
                              screenSize === 'tabletSized' && 'wx_tab' ||
                              screenSize === 'mobileSized' && 'wx_mw';

  /**
   * cobrand
   */
  utag_data['js_page.cobrand'] = gnv('user', 'cobrand') || "";

  /**
   * env
   */
  utag_data['js_page.env'] = gnv('page', 'env') || "";

  /**
   * age
   */
  utag_data['js_page.age'] = gnv('user','age') || "";

  /**
   * flash
   */
  utag_data['js_page.flash'] = gnv('user', 'flash') && gnv('user','flash').version || "";

  /**
   * gender
   */
  utag_data['js_page.gender'] = gnv('user', 'gender');

  /**
   * savedLocations
   */
  var locs = gnv('user','savedLocations'),
    locLength = (locs && locs.length) || 0,
    locIdArray = [];
  for (var idx = 0;idx < locLength;idx++) {
    locIdArray.push(locs[idx].loc);
  }
  utag_data['js_page.savedLocs'] = locLength + "^" + locIdArray.join(",");

  /**
   * recentSearchLocations
   */
  var rlocs = gnv('user','recentSearchLocations'),
    rlocLength = (rlocs && rlocs.length) || 0,
    rlocIdArray = [];
  for (var ridx = 0;ridx < rlocLength;ridx++) {
    rlocIdArray.push(rlocs[ridx].loc);
  }
  utag_data['js_page.recentLocs'] = rlocLength + "^" + rlocIdArray.join(",");

  /**
   * preferredLocation
   */
  utag_data['js_page.preferredLocation'] = gnv('user', 'preferredLocation') &&
                                           gnv('user', 'preferredLocation').loc;

  /**
   * hier1
   */
  var hier1 = gnv('metrics','level1') || '',
    level = "level";
  for (var jdx = 2; jdx < 5; jdx++) {
    level = "level" + jdx;
    hier1 += gnv('metrics',level) ? "-" + gnv('metrics',level) : '';
  }
  utag_data['js_page.hier1'] = hier1;

  /**
   * weatherView - for prop67 siteCatalyst and template= in ad call
   */
  if (gnv('page','content').match(/today|hourly|weekend|5day|10day|/)) {
    utag_data['js_page.weather_view'] = gnv('products', 'localsuite') && gnv('products', 'localsuite').weatherView;
  }

  // initialize empty pos, sizes
  utag_data['js_page.pos'] = [];
  utag_data['js_page.sizes'] = [];

  // setting ad sponstory back to js_page.sponstory
  utag_data['js_page.sponstory'] = gnv('ad', 'sponstory');

  /**
   * Chartbeat start variable
   */
  window._sf_startpt = (new Date()).getTime();

  /**
   * Cable provider variable
   */
  //  var decodedsaml = (document.referrer.indexOf("/signon_mvpd") !== -1) &&
  //    TWC.PcoUtils.getDecodedSaml(TWC.PcoUtils.getURLParameter("aisresponse", document.referrer));
  //  if(decodedsaml) {
  //    var myjson = JSON.parse(decodedsaml);
  //    utag_data['cableprovider'] = myjson;
  //  }
  // If user is authenticated, we send eVar57 (cable provider) in the event2 call
  // if(utag_data['js_page.contains_videoplayer'] === "video-player-present") {
  // For now we do this only for the video page
  if (pageType === "video") {
    utag_data['cable_provider'] = jQuery.cookie("twcSignonAuth_mvpd") || "";
  }

  /**
   * Fire utag_dataReady
   */
  TWC.Events.getEvent('utag_dataReady').resolve();

});
;
/**
 * Created with PhpStorm
 * User: SSHERWOOD
 * Date: 12/01/15
 * Time: 7:20 AM
 *
 */

function oxDone() {
  var priceMap;
  priceMap =OX.dfp_bidder.getPriceMap();
  window.utag_data = window.utag_data || {};
  utag_data['OX_Price_Maps'] = priceMap;
  TWC.PcoUtils.setTiming('openxReady', (new Date()).getTime());
  TWC.Events.getEvent('openxReady').resolve();
}

(function ($, TWC) {
  var locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale;
  var openxReady = TWC.Events.getEvent('openxReady');
  var openxOn = TWC.Configs.openxOn;

  if (locale !== 'de_DE' && openxOn) {

    TWC.Events.ifReady(['window_loadReady','pcoReady','tealiumLoaded']).done(function() {

      // OpenX now works for all screen sizes
      if (window.utag) {
        var all_ad_positions = TWC.pco.getNodeValue('ad', 'all_ad_positions');
        var zone = $('[name=adsmetrics_zone]').length > 0 && $('[name=adsmetrics_zone]').attr('value');
        var nc = browserWidth < 768 ? '7646-weatherMW' : '7646-weatherBW';

        window.utag_data = window.utag_data || {};
        utag_data['js_page.sizes'] = [];
        utag_data['js_page.locale'] = TWC && TWC.Configs && TWC.Configs.locale || 'en-US';
        utag_data['js_page.positions'] = all_ad_positions;
        utag_data['js_page.zone'] = zone && zone.replace(/ /g, '');

        TWC.PcoUtils.setTiming('openxTealiumView', (new Date()).getTime());
        utag.view(utag_data, null, ['114']);

        // OX_dfp_ads_Ready is fired from Tealium processOpenX extension
        TWC.Events.getEvent('OX_dfp_ads_Ready').done(function () {
          TWC.PcoUtils.setTiming('OX_dfp_ads_Ready', (new Date()).getTime());
          // Resolve openxReady within 5 seconds in case call fails
          setTimeout(function() {
            if (!('OX' in window)) {
              TWC.PcoUtils.setTiming('openxFailed', (new Date()).getTime());
              openxReady.resolve();
            }
          },5000);

          TWC.PcoUtils.setTiming('openxCallMade', (new Date()).getTime());
          $.ajax("//ox-d.weatherus.servedbyopenx.com/w/1.0/jstag?nc=" + nc,
            {
              dataType: 'jsonp',
              timeout: 5000,
              success: function() {
                // Do Nothing
              },
              error: function(jqXHR,textStatus,errorThrown){
                if (textStatus === 'timeout') {
                  TWC.PcoUtils.setTiming('openxTimedOut', (new Date()).getTime());
                  openxReady.resolve();
                }
              }
            });
        });
      } else {
        TWC.PcoUtils.setTiming('openxSkippedByTealium', (new Date()).getTime());
        openxReady.resolve();
      }

    });


  } else {
    openxReady.resolve();
  }

})(jQuery, TWC);
;
/**
 * Created with PhpStorm
 * User: ssherwood
 * Date: 12/12/14
 * Time: 12:59 PM
 *
 */
(function ($, TWC, utag_data, amznads) {
  window.utag_data = utag_data;
  window.amznads = amznads;

  var locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale,
      amznid = locale === 'de_DE' && '3128' || '1004';

  amznads.asyncParams = {
    id: amznid,
    callbackFn: function () {
      var targeting = amznads.getTargeting();

      if (!amznads.hasAds() || !utag_data || !targeting) {
        TWC.PcoUtils.setTiming('amznslotsSet', (new Date()).getTime());
        TWC.Events.getEvent('amznslotsReady').resolve();
        return;
      }

      utag_data['js_page.amznslots'] = targeting.amznslots instanceof Array && targeting.amznslots.join(',') || '';

      if (targeting.amzn_vid && targeting.amzn_vid instanceof Array) {
        utag_data['js_page.amzn_vid'] = targeting.amzn_vid.join(',');
      }
      if (targeting.amzn_vid) {
        utag_data['js_page.amzn_vid'] = targeting.amzn_vid;
      } else {
        utag_data['js_page.amzn_vid'] = '';
      }

      TWC.PcoUtils.setTiming('amznslotsSet', (new Date()).getTime());
      TWC.Events.getEvent('amznslotsReady').resolve();
    },
    timeout: 2000
  };

  if (locale !== 'de_DE') {
    TWC.Events.getEvent('window_loadReady').done(function () {

      // Resolve amznslotsReady within 5 seconds in case of failed call
      setTimeout(function () {TWC && TWC.Events && TWC.Events.getEvent('amznslotsReady').resolve();},5000);

      TWC.PcoUtils.setTiming('amznslotsStart', (new Date()).getTime());
      $.ajax({
        url: '//c.amazon-adsystem.com/aax2/amzn_ads.js',
        dataType: 'script'
      });
    });
  }

})(jQuery, TWC, window.utag_data || {}, window.amznads || {});
;
/**
 * Created with PhpStorm
 * User: ssherwood
 * Date: 12/12/14
 * Time: 12:34 PM
 *
 */
(function ($, TWC) {
  TWC.Events.getEvent('window_loadReady').done(function () {

    var criteoReady = TWC && TWC.Events && TWC.Events.getEvent && TWC.Events.getEvent('criteoReady');

    // Resolve criteoReady within 5 seconds in case of failure
    setTimeout(function () {criteoReady.resolve();},5000);

    TWC.PcoUtils.setTiming('criteoStart', (new Date()).getTime());
    $.ajax({
      url: '//rtax.criteo.com/delivery/rta/rta.js?netId=2305&cookieName=cto_weather&varName=crtg_content',
      dataType: 'script',
      success: function () {
        TWC.PcoUtils.setTiming('criteoEnd', (new Date()).getTime());
        criteoReady.resolve();
      }
    });
  });
})(jQuery, TWC);
;
/**
 * Created with PhpStorm
 * User: SSHERWOOD
 * Date: 12/15/14
 * Time: 7:59 AM
 *
 */
(function ($, TWC) {
  var locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale,
    wfxtgReady = TWC.Events.getEvent('wfxtgReady');
  if (locale !== 'de_DE') {
    TWC.Events.getEvent('window_loadReady').done(function () {

      /** Need to pull in localStorage to find:
       *  lastVisited location
       *  first saved location
       *  recent search location
       *  or user currentLocation - if it does not exist or has expired
       *  Start with page.currentLocation from pco
       *  
       *  utag_dataReady waits on pcoReady, so pcoReady has already fired
       */
      TWC.Events.getEvent('pcoReady').done(function () {
        var user = $.jStorage.get("user"),
          pageLoc = TWC && TWC.pco && TWC.pco.getNodeValue && TWC.pco.getNodeValue('page', 'currentLocation'),
          zcs = pageLoc && pageLoc.zipCd || user && user.lastVisitedLocation && user.lastVisitedLocation.zipCd ||
            user && user.savedLocations && $.isArray(user.savedLocations) && user.savedLocations[0] && user.savedLocations[0].zipCd ||
            user && user.recentSearchLocations && $.isArray(user.recentSearchLocations) &&
            user.recentSearchLocations[0] && user.recentSearchLocations[0].zipCd || "",
          nzcs = zcs,
          hzcs = user && user.currentLocation && user.currentLocation.zipCd || "",
          getVal = function (scatterSegs, idx, key, prop) {
            return (scatterSegs[idx] &&
              scatterSegs[idx][key] &&
              scatterSegs[idx][key][0] &&
              scatterSegs[idx][key][0][prop]) || [];
          };

        // $.ajax("//stagingtriggers.wfxtriggers.com/json/?resp_type=json&acctid=5E2FB6&current=true&zcs=" + zcs + "&nzcs=zcs",


        $.ajax("//triggers.wfxtriggers.com/json/?resp_type=json&acctid=5E2FB6&current=true&zcs=" + zcs + "&nzcs=" + nzcs,
          {
            dataType: 'jsonp',
            timeout: 5000,
            success: function (data) {
              var triggers = data && data.wfxtg,
                wfxtg = $.isArray(data.wfxtg.current) && data.wfxtg.current.join(',') || "",
                scatterSegs = $.isArray(triggers.scatterSegs) && triggers.scatterSegs,
                zcsScatterSegs = getVal(scatterSegs, 0, "zcs", "segments"),
                nzvsScatterSegs = getVal(scatterSegs, 1, "nzcs", "segments"),
                cxtgScatterSegs = getVal(scatterSegs, 0, "zcs", "cxtg"),
                cxtg = cxtgScatterSegs.join(","),
                zcs = zcsScatterSegs.join(","),
                nzcs = nzvsScatterSegs.join(",");

              window.utag_data = window.utag_data || {};
              utag_data['js_page.wfxtg'] = wfxtg;
              utag_data['js_page.scatter_zcs'] = zcs;
              utag_data['js_page.scatter_nzcs'] = nzcs;
              utag_data['scatter_cxtg'] = cxtg;
              TWC.PcoUtils.setTiming('wfxtgEnd', (new Date()).getTime());
              TWC.Events.getEvent('wfxtgReady').resolve();
            },
            error: function () {
              wfxtgReady.resolve();
            }
          });
      });
    });
  } else {
    wfxtgReady.resolve();
  }

})(jQuery, TWC);
;
/**
 * Created with PhpStorm
 * User: ssherwood
 * Date: 12/12/14
 * Time: 2:18 PM
 *
 */
(function ($, TWC) {
  var locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale,
      lotameReady = TWC.Events.getEvent('lotameReady');
  if (locale !== 'de_DE') {
    TWC.Events.getEvent('window_loadReady').done(function () {

      // The audience extraction API has client id 2215 shown here in url2
      // The Lotame BCP API has Client Id 1884 and is loaded in twc_ngmods.module.
      // It also names the _cc1884 object on the page.
      var url2 = '//ad.crwdcntrl.net/5/c=2215/pe=y/callback=?';
      $.ajax({
        url: url2,
        dataType: 'jsonp',
        cache: true,
        type: 'GET',
        timeout: 5000,
        success: function (data) {
          TWC.Events.getEvent('pcoReady').done(function () {
            var lot_tpid,
                lot_pid,
                lot_abbr,
                lot_id,
                lotame,
                prsntNm,
                site;

            lotame = TWC.pco.getNodeValue('user','lotame') || {};
            lot_tpid = lotame.lot_tpid = data && data.Profile && data.Profile.tpid || lotame.lot_tpid;
            lot_pid = lotame.lot_tpid = data && data.Profile && data.Profile.pid || lotame.lot_pid;

            lot_abbr = (lotame && lotame.lot_abbr) || '';
            lot_id = (lotame && lotame.lot_id) || '';

            audienceLength = data && data.Profile && data.Profile.Audiences &&
            data.Profile.Audiences.Audience && data.Profile.Audiences.Audience.length;
            if (audienceLength > 0) {
              lot_abbr = '';
              lot_id = '';
              for (var cci = 0; cci < audienceLength; cci++) {
                lot_abbr += (data.Profile.Audiences.Audience[cci].abbr + (cci < audienceLength - 1 ? ',' : ''));
                lot_id += (data.Profile.Audiences.Audience[cci].id + (cci < audienceLength - 1 ? ',' : ''));
              }
              lotame.lot_abbr = lot_abbr;
              lotame.lot_id = lot_id;
            }

            TWC.pco.setNodeValue('user','lotame',lotame);
            window.utag_data = window.utag_data || {};
            if (utag_data) {
              utag_data['js_page.tpid'] = lot_tpid;
              utag_data['js_page.lpid'] = lot_pid;
              utag_data['js_page.sg'] = lot_id;
            }

            if (window._cc1884) {
              var gnv = TWC && TWC.pco && TWC.pco.getNodeValue;
              if (TWC.pco.get('user')) {

                var age = gnv('user', 'age') || '',
                  gender = gnv('user', 'gender') || '';
                if (age) {
                  _cc1884.add('seg', 'a_' + age);
                }
                if (gender) {
                  _cc1884.add('seg', 'g_' + gender);
                }

                if (TWC.pco.get('metrics')) {
                  _cc1884.add('seg', 'level1_' + gnv('metrics', 'level1'));
                  _cc1884.add('seg', 'level2_' + gnv('metrics', 'level2'));
                  _cc1884.add('seg', 'level3_' + gnv('metrics', 'level3'));
                  _cc1884.add('seg', 'level4_' + gnv('metrics', 'level4'));
                }
                if (TWC.pco.get('ad')) {
                  if (gnv('ad', 'location')) {
                    _cc1884.add('seg', 'dma_' + gnv('ad', 'location').dmaCd);
                  }

                  _cc1884.add('seg', 'zone_' + gnv('ad', 'zone'));
                }
                if (TWC.pco.get('page')) {
                  _cc1884.add('seg', 'lang_' + gnv('page', 'lang'));
                }
                _cc1884.bcp();
              }
              TWC.PcoUtils.setTiming('lotameReady', (new Date()).getTime());
              lotameReady.resolve();
            }
          });
        },
        error: function () {
          lotameReady.resolve(false);
          TWC.PcoUtils.setTiming('lotameFailed', (new Date()).getTime());
        }
      });
    });
  } else {
    lotameReady.resolve();
  }
})(jQuery, TWC);
;
(function (root, factory) {
  root.DailyForecastTurboModel = factory(root.TwcDalBaseModel);
}(window.TWC, function (TwcDalBaseModel) {

  function dailyForecastTurboModel(TwcDalBaseModel) {
    return TwcDalBaseModel.extend({
      transform: function () {
        var _this = this;
        this.data = this.get('vt1dailyForecast');
        this.days = [];
        if (!this.data){
          return;
        }
        function transformDay(key) {
          if (key === 'day' || key === 'night') {
            day[key] = {
              isNight: key === 'night',
              isDay: key === 'day',
              validDate: _this.data.validDate[i],
              sunrise: _this.data.sunrise[i],
              sunset: _this.data.sunset[i],
              moonrise: _this.data.moonrise[i],
              moonset: _this.data.moonset[i],
              daytemp : _this.data.day.temperature[i],
              nighttemp : _this.data.night.temperature[i]
            };
            Object.keys(_this.data[key]).forEach(function (subkey) {
              day[key][subkey] = _this.data[key][subkey][i];
            });
          } else {
            day[key] = _this.data[key][i];
          }
        }

        for (var i = 0; i < 15; i++) {
          var day = {
          };
          Object.keys(this.data).forEach(transformDay);
          this.days.push(day);
        }

        // retrofitting days to items for wxcard.factory.js
        this.items = this.days;
      },
      construct: function (geocode) {
        this.urlConfig = {
          baseUrl: TWC.Configs.sunTurbo.baseUrl || 'https://qaapi.weather.com',
          apiKey: TWC.Configs.sunTurbo.apiKey || '',
          resource: '/v2/turbo/vt1dailyForecast',
          language: TWC.Configs.sunTurbo.locale || 'en',
          units: TWC.PcoUtils.getUserPreferedUnits(),
          format: 'json'
        };

        if (geocode) {
          this.urlConfig['geocode'] = geocode;
        }

      }

    });
  }

  return dailyForecastTurboModel(TwcDalBaseModel);
}));
;
(function (root, factory) {
  root.ObservationTurboModel = factory(root.TwcDalBaseModel);
}(window.TWC, function (TwcDalBaseModel) {
  function observationTurboModel(TwcDalBaseModel) {
    return TwcDalBaseModel.extend({
      transform: function () {
        this.data = this.get('vt1observation');
      },
      construct: function (geocode) {
        this.urlConfig = {
          baseUrl: TWC.Configs.sunTurbo.baseUrl || 'https://qaapi.weather.com',
          apiKey: TWC.Configs.sunTurbo.apiKey || '',
          resource: '/v2/turbo/vt1observation',
          language: TWC.Configs.sunTurbo.locale || 'en',
          units:  TWC.PcoUtils.getUserPreferedUnits(),
          format: 'json'
        };

        if (geocode) {
          this.urlConfig['geocode'] = geocode;
        }

      },
      getSkyCode: function() {
        return this.get('icon');
      },
      getTemp: function () {
        return this.get('temperature');
      },
      getWeatherDescription: function() {
        return this.get('phrase');
      },
      getLocalObsTime: function () {
        return this.get('observationTime');
      },
      getFeelsLike: function () {
        return this.get('feelsLike');
      },
      getWindSpeed: function () {
        return this.get('windSpeed');
      },
      getWindDirection: function () {
        return this.get('windDirCompass');
      },
      getHumidity: function () {
        return this.get('humidity');
      },
      getDewPoint: function () {
        return this.get('dewPoint');
      },
      getPressure: function () {
        // var unit = this.getUser().getPressureUnit();
        // return (unit === 'mb' ? this.get('pres') : this.get('alt'));
        return this.get('altimeter');
      },
      getBarometricText: function () {
        return this.get('baroTrndAsc');
      },
      getVisibility: function () {
        return this.get('visibility');
      },
      getUVIndex: function () {
        return this.get('uvIndex');
      }
    });
  }
  return observationTurboModel(TwcDalBaseModel);
}));
;
(function (root, factory) {
    root.PollenForecastTurboModel = factory(root.TwcDalBaseModel);
}(window.TWC, function (TwcDalBaseModel) {

    function pollenForecastTurboModel(TwcDalBaseModel) {
        return TwcDalBaseModel.extend({
            transform: function () {
                this.data = this.get('vt1pollenforecast');
                this.pollenAlerts = [];
                this.highestPollen = {};
                var pollenTypes = ['tree', 'grass', 'weed'];

                if (!this.data || !this.data.reportDate){
                    return;
                }

                var maxSeverity = -1;
                for (var i = 0; i < pollenTypes.length; i++) {
                    for (var j = 0; j < this.data['reportDate'].length; j++) {
                        var day = {
                            reportDate: this.data['reportDate'][j],
                            type: pollenTypes[i],
                            severityCode: this.data[pollenTypes[i]][j]
                        };

                        if (day.severityCode > maxSeverity){
                            _.clone(day, this.highestPollen);
                            maxSeverity = day.severityCode;
                        }
                        this.pollenAlerts.push(day);
                    }

                }

                if (typeof this.data['mold'] === 'number') {
                    this.moldCount = this.data['mold'];
                }

            },
            construct: function (geocode) {
                this.urlConfig = {
                    baseUrl: TWC.Configs.sunTurbo.baseUrl || 'https://qaapi.weather.com',
                    apiKey: TWC.Configs.sunTurbo.apiKey || '',
                    resource: '/v2/turbo/vt1pollenforecast',
                    language: TWC.Configs.sunTurbo.locale || 'en',
                    format: 'json'
                };

                if (geocode) {
                    this.urlConfig['geocode'] = geocode;
                }
            }
        });
    }
    return pollenForecastTurboModel(TwcDalBaseModel);
}));
;
/**
 * Created by sherwoos on 4/6/16.
 * This file loads tealium's utag.js file async
 */



(function($){
  if (window.TWC && TWC.Configs && TWC.Configs.tealiumUrl) {

    $.ajax({
      url: TWC.Configs.tealiumUrl,
      dataType: 'script',
      cache: true
    });
    $.ajax({
      url: '//js-sec.indexww.com/ht/ls-weather.js',
      dataType: 'script',
      timeout: 3000,
      cache: true,
      success: function(){
        TWC.Events.getEvent('lightspeedReady').resolve();
      },
      error: function(){
        TWC.Events.getEvent('lightspeedReady').resolve();
      }
    });


  }
})(jQuery);
;
/**
 * Author: ksankaran (Velu)
 * Date: 11/15/13
 * Time: 3:56 PM
 * Comments: The node rules contain the attributes that has to be used pco nodes to restrict invalid data entry in the
 * pco. As of now, only the node presence validation is done. However, the setup is done to process the validation
 * rules as well which will not be enabled for now.
 */

// Create the window TWC if not there.
window.TWC = window.TWC || {};

/**
 * Basic validation rule functions. All methods should return an boolean.
 *
 * @type {{NO_VALIDATOR: Function, NOT_NULL_VALIDATOR: Function, OBJECT_VALIDATOR: Function}}
 */
TWC.validators = {
  NO_VALIDATOR        : function(value, $) { return true; },
  NOT_NULL_VALIDATOR  : function(value, $) { return !!value; },
  OBJECT_VALIDATOR    : function(value, $) { return (jQuery.type(val) === "object"); },
  ARRAY_VALIDATOR     : function(value, $) { return $.type(val) === "array";}
};

/**
 * The node rules config object. Every node need to have allowedAttributes "if" the node needs to be restricted from
 * adding wrong attributes.
 */
TWC.node_rules = (function() {
  // Private
  var nodeConfig = {
    user : {
      allowedAttributes : {
        "age"             : null,
        "anonCreated"     : null,
        "currentLocation" : TWC.validators.OBJECT_VALIDATOR,
        "declarations"    : TWC.validators.ARRAY_VALIDATOR,
        "preferredLocation": TWC.validators.OBJECT_VALIDATOR,
        "date"            : null,
        "day"             : null,
        "browser"         : null,
        "flash"           : null,
        "gender"          : null,
        "lotame"          : null,
        "lastVisitedLocation": null,
        "partner"         : null,
        "locale"          : null,
        "rmid"            : null,
        "signedIn"        : null,
        "site"            : null,
        "time"            : null,
        "tzOffset"        : null,
        "unit"            : null,
        "currentBackTo"   : TWC.validators.OBJECT_VALIDATOR,
        "backTo"          : TWC.validators.OBJECT_VALIDATOR,
        "savedLocations"  : TWC.validators.ARRAY_VALIDATOR,
        "recentSearchLocations" : TWC.validators.ARRAY_VALIDATOR,
        "local_suite_bg"  : TWC.validators.OBJECT_VALIDATOR,
        "titan_local_suite_bgwt"  : TWC.validators.OBJECT_VALIDATOR,
        "titan_local_suite_bgwp"  : TWC.validators.OBJECT_VALIDATOR,
        "userSpecifiedUnits"    : null,
        "article_bg"      : TWC.validators.OBJECT_VALIDATOR,
        "preferredSite"   : null
      }
    }
  };

  return {
    // Public
    getNodeConfig : function(nodeName) {
      return nodeConfig[nodeName];
    }
  }
})();;
/**
 * Author: ksankaran (Velu)
 * Date: 11/12/13
 * Time: 10:36 AM
 * Comments: The base class for all the PCO Nodes. The class contains several common methods that will be inherited
 * down by the node classes such as User, Device, Page, etc. The attribute isPersisted determines whether the node
 * should be persisted or not. restrictExtend will determine whether this object can be extended once the node is
 * ready.
 * Every subclass that inherits from this class should contain init and process method. The init method should set
 * class properties alone. It should not make any network calls. The process method should contain the actual processing
 * logic. It is advisable that, the logic is split into submethods and then, invoked from process.
 */

// set metrics
TWC.PcoUtils.setTiming('pcoLoad', (new Date()).getTime());


// Create the window TWC if not there.
window.TWC = window.TWC || {};

/**
 * @class
 * @constructor
 */
TWC.Node = function() {


  // default node name property. This should be overriden by the subclasses in init method.
  this.nodeName       = "node";
  // attributes object which holds the actual properties.
  this.attributes     = {};
  // any asynchronous activities that happen on the node should be added to this.promises.
  this.promises       = [];
  // Flag to determine whether the node should be persisted or not.
  this.isPersisted    = false;
  // restrictExtend flag, when set will block the node from getting extended. However, the block do not work in IE8.
  // Not a big deal as the block is done for developers and not for user.
  this.restrictExtend = false;
  // transform rules is a way of transforming values into another using a function. Do not enable this in node class.
  // Instead have your subclasses create one if needed.
  // this.transform_rules = {};
  // Call the subclass init.
  this.init(jQuery, arguments);
  // Do the basic postInit in here itself. THe postInit extends the attribute value from local storage.
  // Also, it extends the attribute from arguments as well.
  this.postInit(jQuery, arguments);
  // Fire the process method on the subclass.
  this.process(jQuery, arguments);
  // Freeze the object.
  this.restrictExtendBehavior(jQuery);

  this.writeTimer;

  this.storageWritePromises = [];
};

TWC.Node.prototype = {
  /**
   * Common logic to extend the attributes from local storage as well as from arguments.
   *
   * @param $ - jQuery
   * @param arguments - arguments passed from new method.
   */
  postInit     : function($, arguments) {
    if(this.isPersisted) {
      var persistedAttrs = TWC.LocalStorage.getPersistedValue( this.getPersistKey() );
      if (persistedAttrs){
        if(!('expirationTime' in persistedAttrs) || !persistedAttrs.expirationTime || persistedAttrs.expirationTime > (new Date().getTime())) {
          $.extend(this.attributes, persistedAttrs);
        }
      }
    }
    if(arguments && arguments.length > 0) {
      $.extend(this.attributes, arguments[0]);
    }
  },

  /**
   * Restrict the object from being extended.
   *
   * @param $ - jQuery object
   */
  restrictExtendBehavior : function($) {
    if(this.restrictExtend) {
      var _self = this;
      $.when.apply($, this.promises).done( function() {
        TWC.PcoUtils.restrictExtend(_self);
      });
    }
  },

  /**
   * Get the name of this node.
   *
   * @returns {string}
   */
  getNodeName : function() {
    return this.nodeName;
  },

  /**
   * Get the list of promises of this node.
   *
   * @returns {Array}
   */
  getPromises : function() {
    return this.promises;
  },

  /**
   * Return the actual attributes of this node.
   *
   * @returns {Object}
   */
  getAttributes : function() {
    return this.attributes;
  },

  /**
   * Get the attribute value.
   *
   * @param key
   * @returns {*}
   */
  get         : function( key ) {
    return this.attributes[key];
  },

  /**
   * Transformation rules. If a particular value has to be altered before storage, do it with simple transformation rules.
   *
   * @param key
   * @param value
   */
  getTransformedValue : function( key, value ) {
    var nullVal;
    if('config' in this && 'NULL_KEYNAME' in this.config) {
      nullVal = this.config.NULL_KEYNAME;
    }
    if(!value) { return nullVal; }

    var transformedVal = this.transform_rules[key](value, jQuery);

    return (transformedVal ? transformedVal : nullVal);
  },

  /**
   * Set a value to a attribute. Basic key-value set method.
   *
   * @param key
   * @param value
   */
  set         : function( key, value ) {
    // Here is the beauty of override methods: The override methods are basically done to do additional processing or
    // validations. For example, in this case, I want to set preferredLocation if savedLocation is set. The naming convention
    // is overrideSet{FirstLetterCapitalizedAttributeKey}.

    var override = 'overrideSet' + TWC.PcoUtils.capitalize(key), promise;
    if( override in this ) {
      this[override](jQuery, value);
    }
    else {
      this.attributes[key] = (('transform_rules' in this && key in this.transform_rules) ? this.getTransformedValue(key, value) : value);
    }
    promise = this.persistAttributes(key);
    this.checkEventTriggers(key);

    return promise;
  },

  /**
   * Delete an attribute
   * @param key
   */
  deleteKey : function(key){
    delete this.attributes[key];
  },

  /**
   * In case if the node wants to have a different persistance name, set persistKey in your init and you are set.
   * By default, the persistKey is nodeName.
   * For example, refer Device node.
   *
   * @returns {string}
   */
  getPersistKey : function() {
    return ('persistKey' in this ? this.persistKey : this.nodeName);
  },

  /**
   * Delete key if not present in allowed attributes list.
   *
   * @param allowedAttributes
   * @param aKey
   */
  deleteKeyIfNotAllowed : function(allowedAttributes, aKey) {
    // TODO: Validation function in config map looks to be costly. Check with Joe before putting it in.
    if( !(aKey in allowedAttributes) ) {
      delete this.attributes[aKey];
    }
  },

  /**
   * Check the config map for allowed attributes. If not present delete it.
   *
   * @param allowedAttributes
   * @param aKey
   */
  cleanUpObject : function(allowedAttributes, aKey) {
    if(aKey) {
      this.deleteKeyIfNotAllowed(allowedAttributes, aKey);
    }
    else {
      for(var vKey in this.attributes) {
        this.deleteKeyIfNotAllowed(allowedAttributes, vKey);
      }
    }
  },

  /**
   * persist attributes will be called automatically on set or setAttributes method. This will persist the node
   * attributes on change auto-magic-ally.
   *
   * @param aKey
   */
  persistAttributes : function(aKey) {
    if(this.isPersisted) {
      var nodeConfig = TWC.node_rules.getNodeConfig(this.nodeName);

      if(this.restrictExtend && nodeConfig && nodeConfig.allowedAttributes) {
        this.cleanUpObject( nodeConfig.allowedAttributes, aKey );
      }

      return this.localStorageWrite();
    }
  },

  /**
   * debounces TWC.LocalStorage.persistValue by 500 ms so that it is not called consecutively
   * on each set attributes
   *
   * @param  val to be stored
   */
  localStorageWrite: function (val) {
    var _self = this, deferred = jQuery.Deferred();
    if (this.writeTimer) {
        clearTimeout(this.writeTimer);
        this.writeTimer = undefined;
    }
    if(!this.storageWritePromises)
      this.storageWritePromises = [];

    this.storageWritePromises.push(deferred);

    this.writeTimer = setTimeout(function () {
      var promise = TWC.LocalStorage.persistValue(_self.getPersistKey(), val || _self.attributes);
      promise.then(function(){
        jQuery.each(_self.storageWritePromises, function(key, defer) {
          defer.resolve();
        });
        _self.storageWritePromises = [];
      }, function(){
        jQuery.each(_self.storageWritePromises, function(key, defer) {
          defer.reject();
        });
        _self.storageWritePromises = [];
      });
    }, 500);

    return deferred.promise();
  },

  /**
   * setAttributes will completely overwrite the attributes in the node. However, do not forget that persistAttributes
   * will check for those attributes correctness and delete if it have to.
   *
   * @param attributes
   */
  setAttributes : function( attributes ) {
    this.attributes = attributes;
    this.persistAttributes();
    // Fire all event listeners as we do not know what changed. This is why, this function is costly. So, use it at
    // your own app risk.
    var _self = this;
    jQuery.each(this.attributes, function(key, value) {
      _self.checkEventTriggers(key);
    });
  },

  /**
   * One of the big features in the new PCO. Gone are the days, you manually have to write event creation and fire them
   * on change. Init the eventTriggers map in your subclass and you are all set. Whenever the configured attribute is changed,
   * boom, it will fire the event auto-magic-ally.
   *
   * @param key
   */
  checkEventTriggers : function( key ) {
    if(key && 'eventTriggers' in this && key in this.eventTriggers) {
      var eventName = this.eventTriggers[key];
      var event     = TWC.Events.getEvent( eventName );
      // Go for notify. done is basically for one time operation and based on my understand, set is done periodically
      // and user wants to modify whenever something is changed.
      event.notify({key:key, locations:this.attributes[key]} );
    }
  }
};
;
/**
 * Created with PhpStorm
 * User: ssherwood
 * Date: 8/27/14
 * Time: 7:20 AM
 * Comments: The Profile node of the pco. This is not persisted. The profile node contains
 * attributes such as uphostname, lastmodified, userid, username, and addlparams (an array
 * of any params that may be added to the uplogin cookie in the future)
 */


TWC.Profile = TWC.Node.createSubClass({
  // just set the basic attributes.
  init : function() {
    this.nodeName = "profile";
    this.isPersisted  = true;
  },

  // Execute the business logic one by one.
  process : function( $ ) {
    this.setUpProfile($);
  },

  // Set up ad node
  setUpProfile : function( $ ) {

    var uploginCookie = $.cookie('uplogin'),
        uplogin = uploginCookie && decodeURIComponent(uploginCookie),
        uploginParts = uplogin && uplogin.split('^'),
        length = uploginParts && uploginParts.length;

    if (uploginParts && length && length >= 4) {
      this.set('uphostname', uploginParts[0]);
      this.set('lastmodified', uploginParts[1]);
      this.set('userid', uploginParts[2]);
      this.set('username', uploginParts[3]);
      this.set('addlparams', uploginParts.slice(4));
    }
  }
});;
/**
 * Author: ksankaran (Velu)
 * Date: 11/12/13
 * Time: 10:36 AM
 * Comments: The Page node of the pco. This is not persisted. The page node contains attributes such as currentLocation
 * that contains the details of the current page location, page locale, page lang, etc.
 */


TWC.Page = TWC.Node.createSubClass({
  // just set the basic attributes.
  init: function ($, arguments) {
    this.nodeName = "page";
  },

  // Execute the business logic one by one.
  process: function ($, arguments) {
    this.setScreenSize($);
    this.setUpPage($, arguments);
    this.setUpEnv($);
    this.setUpFV($);
    this.setUpPartner($, arguments);
    this.setUpFromStr($);
    this.setPathName();
    this.setAssetId($);
    this.setVideoPresent($);
  },


  // Set up page.screenSize based on browser width
  setScreenSize: function ($) {
    window.browserWidth = jQuery(window).width();
    var mobile = window.browserWidth < 768 || null,
      tablet = window.browserWidth >= 768 && browserWidth < 1025 || null,
      desktop = window.browserWidth > 1024 || null;

    window.wx_screenSize = mobile && 'mobile' || tablet && 'tablet' ||
      desktop && 'desktop';

    var mobileSized = window.browserWidth < 768,
      tabletSized = window.browserWidth >= 768 && window.browserWidth < 1025,
      desktopSized = window.browserWidth > 1024,
      screenSize = mobileSized && 'mobileSized' || tabletSized && 'tabletSized' ||
        desktopSized && 'desktopSized';
    this.set("screenSize", screenSize);
    $.cookie('screenSize', screenSize);
  },

  // Set up page location, locale, lang, modules and variant
  setUpPage: function ($, arguments) {
    var locId,
      currentLocation = {},
      that = this,
      userRef = arguments.length > 1 ? arguments[1] : {},
      locale = TWC && TWC.Titan && TWC.Titan.locale || this.get("locale"),
      dsxLocale = locale.split("-").join("_"),
      lang = TWC && TWC.Titan && TWC.Titan.locale && TWC.Titan.locale.split("_") && TWC.Titan.locale.split("_")[0] ||
        this.get('locale') && this.get('locale').split('-') && this.get('locale').split('-')[0] || "en",
      locPromise = $.Deferred(),
      esi_location_available = !!(window.explicit_location && window.explicit_location_obj);
    locale = locale.indexOf('_') ? locale.split('_').join('-') : locale;
    this.set("locale", locale);
    this.set("lang", lang);

    TWC.Events.ifReady(['drupalSettingsReady']).done(function () {

      // Add page settings from Drupal.settings
      var settings = Drupal && Drupal.settings, locObj,
        twcsettings = settings && settings.twc,
        pathname = window.location.pathname,
        promise;

      if (twcsettings && twcsettings.modules) {
        that.set("modules", twcsettings.modules);
      }

      if (twcsettings && twcsettings.variant) {
        that.set("variant", twcsettings.variant);
      }

      if (esi_location_available) {
        // If ESI is available pull it from the page
        locObj = window.explicit_location_obj;
        locId = locObj.locId + ":" + locObj.locType + ":" + locObj.cntryCd;
        promise = TWC.PcoUtils.get_dsx_records(['cs/v2/datetime/' + dsxLocale + "/" + locId]);
        promise.success(function (data) {
          if (data && data.body && $.isArray(data.body) && data.body.length > 0) {
            locObj.datetime = data.body[0].doc.datetime;
          }
        });
        that.set("currentLocId", locId);
        that.set("currentLocation", locObj);

      } else {
        if ((twcsettings && twcsettings.contexts &&
          twcsettings.contexts.is_page_loc) ||
          (TWC && TWC.Titan && TWC.Titan.locid)) {
          locId = TWC.PcoUtils.getURLlocid();
          if (TWC && TWC.Titan && TWC.Titan.locid) {
            locId = TWC.Titan.locid;
          }

          that.set("currentLocId", locId);

          // Eventually the loc object will be retrieved via ESI and made available on page load
          locale = (TWC && TWC.Titan && TWC.Titan.locale) || that.get("locale");
          promise = TWC.PcoUtils.get_dsx_records(["wxd/v2/loc/" + dsxLocale + "/" + locId, "cs/v2/datetime/" + dsxLocale + "/" + locId]);
          promise.success(function (data, textStatus, jqXHR) {
            if (data && data.body && $.isArray(data.body) && data.body.length > 0) {
              var locBody = data.body[0];
              if (locBody && locBody.doc && 'locId' in locBody.doc) {
                currentLocation = locBody.doc;
                currentLocation.loc = currentLocation.locId + ":" + currentLocation.locType + ":" + currentLocation.cntryCd;
                currentLocation.datetime = data.body[1].doc.datetime;
                that.set("currentLocation", currentLocation);
                userRef.setLastVisitedLocation && userRef.setLastVisitedLocation(currentLocation);
              }
            }
            else {
              that.set("currentLocation", {error: "LOCATION_UNAVAILABLE"});
            }
            locPromise.resolve();
          });
          promise.error(function () {
            that.set("currentLocation", {error: "LOCATION_UNAVAILABLE"});
            locPromise.resolve();
          });
        }
        else {
          that.set("currentLocation", {error: "LOCATION_UNAVAILABLE"});
          locPromise.resolve();
        }
      }

      // Determine page contents
      // TODO: Add other pages as they get built
      if (twcsettings && twcsettings.modules && twcsettings.modules.video_player) {
        that.set('content', 'video');
      // @todo ct_article appears to have been deprecated and no longer returns 'article'
      } else if ('article' === TWC.PcoUtils.getter(settings, 'twc.contexts.node.type')) {
        that.set('content', 'article');
      } else if (twcsettings && twcsettings.modules && twcsettings.modules.imap) {
        that.set('content', 'imap');
      } else if (pathname.match(/\/weather\/today/)) {
        that.set('content', 'today');
      } else if (pathname.match(/\/weather\/tomorrow/)) {
        that.set('content', 'tomorrow');
      } else if (pathname.match(/\/weather\/hour/)) {
        that.set('content', 'hourly');
      } else if (pathname.match(/\/weather\/5day/)) {
        that.set('content', '5day');
      } else if (pathname.match(/\/weather\/tenday/)) {
        that.set('content', '10day');
      } else if (pathname.match(/\/weather\/weekend/)) {
        that.set('content', 'weekend');
      } else if (pathname.match(/\/weather\/today/)) {
        that.set('content', 'today');
      } else if (pathname.match(/\/photos/)) {
        that.set('content', 'ugc');
      } else if (pathname.match(/\/hurricane-central/)) {
        that.set('content', 'hurricane-central');
      } else if (pathname.match(/\/(commuter|interactive|maps)/)) {
        that.set('content', 'maps');
      } else if (pathname.match(/\/report-recover/)) {
        that.set('content', 'report-and-recover');
      } else if (pathname.match(/\/(?!.)/) || pathname.match(/(\/([a-z]{2}\-[A-Z]{2})\/?)(?!.)/)) {
        that.set('content', 'homepage');
      } else if (twcsettings && twcsettings.modules && twcsettings.modules.title_collection_index) {
        that.set('content', 'index');
      } else {
        that.set('content', 'other');
      }


    });
    // wait for promise only if the ESI is not available.
    esi_location_available ? (function () {
      var explicit_location_obj = window.explicit_location_obj;
      if (!explicit_location_obj.loc && explicit_location_obj.locId &&
        explicit_location_obj.locType && explicit_location_obj.cntryCd) {
        // append loc attribute to make sure others get it.
        explicit_location_obj.loc = explicit_location_obj.locId + ":" +
          explicit_location_obj.locType + ":" +
          explicit_location_obj.cntryCd;
      }
      that.set("currentLocId", window.explicit_location);
      that.set("currentLocation", explicit_location_obj);
      userRef.setLastVisitedLocation && userRef.setLastVisitedLocation(explicit_location_obj);

    })() : this.promises.push(locPromise);
  },

  setUpTime: function ($) {
    var locationDatetime,
      locId = this.get("currentLocation").loc,
      promise = TWC.PcoUtils.get_dsx_records(['cs/v2/datetime/' + dsxLocale + '/' + locId]);

  },

  // Set up first view.
  setUpFV: function ($) {
    var fv = $.cookie('fv'),
      expires = new Date(new Date().getTime() + (30 * 60 * 1000)); // 30 minutes
    if (fv) {
      fv = ( fv == 1 || fv == 2) ? ++fv : -1;
    }
    else {
      fv = 1;
    }
    this.set("fv", fv);
    // Set or touch fv cookie and extend it for 30 minutes matching
    // SiteCatalyst definition of a session (To deal with Chrome's cookie policy).
    $.cookie('fv', fv, {path: '/', domain: '.weather.com', expires: expires});
  },

  // Set assetId for eVar63 in metrics and assetType for eVar64
  setAssetId: function ($) {
    var assetPromise = $.Deferred(),
      self = this;
    this.promises.push(assetPromise);
    TWC.Events.ifReady(['drupalSettingsReady']).done(function () {
      // if page is an article page, check for node context and pull uuid.
      var node = Drupal && Drupal.settings && Drupal.settings.twc && Drupal.settings.twc.contexts && Drupal.settings.twc.contexts.node;
      if (node) {
        assetId = node.uuid;
        assetType = node.type;
        self.set("assetId", assetId);
        self.set("assetType", assetType);
      }
      assetPromise.resolve();
    });
  },

  // Set up partner, partner_url and site cookies and pco
  setUpPartner: function ($, arguments) {

    var p = TWC.PcoUtils.getURLParameter,
      userRef = arguments.length > 1 ? arguments[1] : {},
      partner = p('par'),
      ilabel = p('ilabel'),
      ilabel_cookie = $.cookie("partner_ilabel"),
      site = p('site'),
      siteCookie = $.cookie("site"),
      cm_date = p("cm_date") ? p("cm_date") : "",
      cm_ven = p("cm_ven") ? p("cm_ven") : "",
      cm_cat = p("cm_cat") ? ":" + p("cm_cat"): "",
      cm_pla = p("cm_pla") ? ":" + p("cm_pla") : "",
      cm_ite = p("cm_ite") ? ":" + p("cm_ite") : "",
      expires = new Date(new Date().getTime() + (30 * 60 * 1000)), // 30 minutes
      partnerCookie = $.cookie("partner"),
      partner_urlCookie = $.cookie("partner_url"),
      intref = p('intref');

    this.set("cm_date",cm_date);
    this.set("cm_ven",cm_ven);
    this.set("cm_cat",cm_cat);
    this.set("cm_pla",cm_pla);
    this.set("cm_ite",cm_ite);
    this.set("intref",intref);


    if(partner){
      // if page Url contains par query param,  start the partner registration process
      // par query param is used to register a referral from a partner
      // therefore, any partner reflector (e.g. comcast.weather.com) must have
      // ?par= in the final url.) Set partner cookie and partner properites in
      // pco.page and pco.user nodes.
      $.cookie("partner", partner, {domain: ".weather.com", path: "/", expires: expires});
      userRef ? userRef.set("partner", partner) : null;

      this.set("partner", partner);
      this.set("parStr", true); // used to detect queryString 'par' in Tealium
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, TWC.PcoUtils.removeURLParameter(window.location.href, "par"));
        partner_urlCookie = document.referrer;
      }
    }
    else if (partnerCookie && userRef) {
      // If no par query param in url, but a referral session is still active,
      // the cookie exists. Touch it and extend for 30 minutes matching
      // SiteCatalyst definition of a session (To deal with Chrome's cookie policy);
      // Set partner node in pco.page and pco.user
      $.cookie("partner", partnerCookie, {domain: ".weather.com", path: "/", expires: expires});
      userRef.set("partner", partnerCookie);
      this.set("partner", partnerCookie);
    }

    if (partner_urlCookie) {
      /********  I DON'T THINK THIS IS BEING USED  *********/
        // If partner_urlCookie exists either by query param or as part of a
        // session cookie value, touch it and extend for 30 minutes matching
        // SiteCatalyst definition of a session (To deal with Chrome's cookie policy);
      $.cookie("partner_url", partner_urlCookie, {domain: ".weather.com", path: "/", expires: expires});
    }

    if (site) {
      // If site query param, set site cookie for session
      // and partnerSite property of pco.page
      $.cookie("site", site, {domain: ".weather.com", path: "/", expires: expires});
      this.set("partnerSite", site);
    }
    else if (siteCookie) {
      /********  I DON'T THINK THIS IS BEING USED  *********/
        // if no site query param, but site session cookie exists,
        // touch it and extend for 30 minutes matching
        // SiteCatalyst definition of a session (To deal with Chrome's cookie policy);
      $.cookie("site", siteCookie, {domain: ".weather.com", path: "/", expires: expires});
    }

    if (ilabel && this.get('partner')) {
      // If ilabel query param, set ilabel cookie for session
      // and partner_ilabel property of pco.page
      $.cookie("partner_ilabel", ilabel, {domain: ".weather.com", path: "/", expires: expires});
      this.set("partner_ilabel", ilabel);
    }
    else if (ilabel_cookie) {
      // If no ilabel query param, but ilabel session cookie exists,
      // touch it and extend for 30 minutes matching SiteCatalyst
      // definition of a session (To deal with Chrome's cookie policy)
      // Also, put ilabel property into pco.page node.
      $.cookie("partner_ilabel", ilabel_cookie, {domain: ".weather.com", path: "/", expires: expires});
      this.set("partner_ilabel", ilabel_cookie);
    }
  },

  // Set up env.
  setUpEnv: function ($) {
    var serverEnv = "";
    var replEnvStr = location.host.replace(".weather.com", "");

    if (location.href.match(/twcrb/)) {
      serverEnv = ["dev:", replEnvStr].join("");
    } else if (location.href.match(/preview/)) {
      serverEnv = ["preview:", replEnvStr].join("");
    } else if (location.href.match(/beta/)) {
      serverEnv = ["beta:", replEnvStr].join("");
    } else {
      serverEnv = ["live:", replEnvStr].join("");
    }
    this.set("env", serverEnv);
  },

  // Set up fromStr from cookie or param.
  setUpFromStr: function ($) {
    var fromStr = $.cookie("fromStr");
    if (!fromStr) {
      fromStr = TWC.PcoUtils.getURLParameter("from");
    }
    else {
      $.removeCookie("fromStr", {domain: ".weather.com", path: "/"});
    }
    this.set("fromStr", fromStr);
  },

  // SET PATHNAME
  setPathName: function () {
    this.set('pathname', window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1));
  },

  // Check for presence of video_player module or wxnode_video module
  // And setVideoPresent if either exist for eVar62
  setVideoPresent: function ($) {
    var videopresent = $.Deferred(),
      self = this;
    this.promises.push(videopresent);
    TWC.Events.ifReady(['drupalSettingsReady']).done(function () {
      var modules = Drupal && Drupal.settings && Drupal.settings.twc && Drupal.settings.twc.modules,
        contains_videoplayer = (modules && (modules.video_player || modules.wxnode_video_player)) ? "videoplayer-present" : "videoplayer-not-present";
      self.set("contains_videoplayer", contains_videoplayer);
      videopresent.resolve();
    });
  }


});
;
/**
 * Author: ssherwood
 * Date: 2/14/14.
 * Comments: This node is for holding product specific values that should be persisted
 * from session to session.  Each product should create a subnode of product
 */
TWC.Products = TWC.Node.createSubClass({
  // just set the basic attributes.
  init : function( $, arguments ) {
    this.nodeName = "products";
    this.isPersisted  = true;
    this.eventTriggers = {
      products:  'products_changed'
    }
  },

  // Execute the business logic one by one.
  process : function( $ ) {
    this.setUpProducts($);
  },

  // Set up ad node
  setUpProducts : function( $ ) {
    var productsPromise = $.Deferred();

    // Put any product setup operations here
    productsPromise.resolve();
  }
});;
/**
 * Author: ksankaran (Velu)
 * Date: 11/13/13
 * Time: 9:17 PM
 * Comments: The User node of the pco. The core important piece of the PCO nodes. The node is persisted in local storage,
 * blocks object extension and also sets event triggers.
 */

TWC.User = TWC.Node.createSubClass({
  // set the basic properties
  init : function() {
    this.nodeName     = "user";
    this.isPersisted  = true;
    this.attributes.savedLocations = [];
    this.attributes.recentSearchLocations = [];
    this.restrictExtend = true;
    this.eventTriggers = {
      'savedLocations'          : 'locations_changed',
      'recentSearchLocations'   : 'locations_changed',
      'preferredLocation'       : 'preferred_location_change'
    };
    this.transform_rules  = {
      "preferredLocation" : function(val) {
        if(val && val.locId && val.locType && val.cntryCd) {
          val.loc = [val.locId, ":", val.locType, ":", val.cntryCd].join("");
        }
        return val;
      }
    };

    /**
     * Override node(super) postInit to provide logic to convert local
     * storage user attributes from PCO2 to PCO3 and then extend
     * the node's attributes with the converted local storage
     * as well as from arguments.  Calls pco2ToPco3 in this object
     *
     * @param $ - jQuery
     * @param arguments - arguments passed from new method.
     */
    this.postInit = function($, arguments){
      if(this.isPersisted) {
        var persistedAttrs = TWC.LocalStorage.getPersistedValue( this.getPersistKey() );

        // If this is a PCO2 local storage object, convert to pco3
        if (persistedAttrs && persistedAttrs.claritas) {
          persistedAttrs = this.pco2ToPco3(persistedAttrs);
        }
        // check for cleanup
        persistedAttrs = this.cleanUpPcoObjects(persistedAttrs, $);

        if (persistedAttrs){
          $.extend(this.attributes, persistedAttrs);
        }
      }
      if(arguments && arguments.length > 0) {
        $.extend(this.attributes, arguments[0]);
      }
    };

  },

  /**
   * Method used by page node of pco to set
   * lastVisitedLocation
   *
   * @param locObj
   */
  setLastVisitedLocation : function(locObj) {
    var truncatedLocObj = this.truncateSingleLoc(locObj),
      savedLocs = this.get('savedLocations'),
      rSrchLocs = this.get('recentSearchLocations');
    this.set("lastVisitedLocation", truncatedLocObj);
    // Also, add it to recent search if its not present in saved or recent search.
    !this.isLocationPresent(savedLocs, truncatedLocObj) &&
    !this.isLocationPresent(rSrchLocs, truncatedLocObj) &&
    (function(_self) {
      rSrchLocs.unshift(truncatedLocObj);
      _self.set( "recentSearchLocations", rSrchLocs );
    })(this);
  },

  isLocationPresent : function(locations, location) {
    return jQuery(locations || []).filter(function(idx, vLocation) {
      return location && (location.loc === vLocation.loc);
    }).length;
  },

  setGlueSavedLocations: function (arguments) {
    glue = arguments.length > 1 ? arguments[1] : {},
    glue.gauge('com.weather.gauge.favoritelocations', this.get('savedLocations').length, 'items');
  },

  // execute business logic one by one.
  process : function($, arguments) {
    this.updateLocationObject($);
    this.setUpLocale($);
    this.setUpBrowserInfo($);
    //this.setSignedIn($);
    //this.setDateTime($); // Shouldn't be persisted. This is in the page node.
    this.setUnit($);
    this.setCurrentLocation($);
    this.setPlaceIQ($);
    this.setRMID($);
    this.setPreferredLocation($);
    this.setBackTo($);
    this.setAgeGender($);
    this.setGlueSavedLocations(arguments);
    this.getProfileLocations($, arguments);
    this.createAnonymous($);
  },

  createAnonymous: function($) {
    var userData = {
      "provider": "anon",
      "token": "",
      "id": this.attributes.rmid
    };
    var apiKey = '112bf7d6-fb5d-11e5-86aa-5e5517507c66';
    var self = this;
    var _url = TWC.Configs.dsx.host || 'dsx.weather.com';
    TWC.Events.createEvent('ssoReady');

    //if a user is not signed in already
    if (document.cookie.indexOf('uplogin') === -1) {
      //create a connection to dsx with the apiKey
      self.makeRequest('POST', _url + 'dsx/session', apiKey)
        .then(function () {
          self.makeRequest('POST', _url + 'u', JSON.stringify(userData, null, 2)).then(function () {
            userData.longSession = true;
            // Making a sso request
            self.makeRequest('POST', _url + 'p/sso', JSON.stringify(userData, null, 2))
              .then(function() {
                self.makeRequest('PUT', _url + 'p/preferences', JSON.stringify({locale: self.attributes.locale}))
                  .then(function() {
                    TWC.Events.getEvent('ssoReady').notify();
                  });
              })
          });
        });
    }
  },

  makeRequest : function(method, url, data) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(data);
    });
  },

  updateLocationObject : function($) {
    var defer = $.Deferred(),
      savedLocations = this.get('savedLocations'),
      rsLocations = this.get('recentSearchLocations'),
      locationToConsider = ((savedLocations && savedLocations.length > 0) ? savedLocations : rsLocations);

    if(locationToConsider && locationToConsider[0] && !locationToConsider[0]._gprId) {
      var locationObj = locationToConsider[0], locId = locationObj.loc,
        promise = TWC.PcoUtils.get_dsx_records("wxd/v2/loc/" + TWC.Configs.dsx.locale + "/" + locId),
        _self = this;
      promise.then(function(response) {
        if(response && response.body) {
          locationObj._gprId = response.body._gprId;
          locationObj.dmaCd = response.body.dmaCd;
          locationObj.cntyNm = response.body.cntyNm;
          locationObj.lat = response.body.lat;
          locationObj['long'] = response.body['long'];
          locationObj.zipCd = response.body.zipCd;
          locationObj.tmZnAbbr = response.body.tmZnAbbr;
        }
      });
    }
  },

  setUpLocale : function($) {
    var locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale || 'en_US';
    this.set("locale", locale);
  },

  // Set up flash data.
  setUpBrowserInfo: function( $ ) {
    // Extend functionality of jquery browser
    var browser = $.extend({}, $.browser);
    browser.ltIE9 = browser.msie && parseInt(browser.version, 10) < 9;
    browser.lteIE9 = browser.msie && parseInt(browser.version, 10) <= 9;

    this.set("browser", browser);
    this.set("flash", browser); // alias so we could keep the property "flash" for legacy support
  },

  signedIn: function() {
    var _signedIn = jQuery.cookie('uplogin');
    return _signedIn ? true : false;
  },

  // Set date and time in specific format.
  setDateTime : function( $ ) {
    // Set user time strings
    var dt = new Date(), yy = dt.getFullYear(), mt = dt.getMonth() + 1, date = dt.getDate(),
      dow = dt.getDay(), mh = dt.getHours(), hh = (mh > 12) ? mh - 12 : (mh == 0) ? 12 : mh,
      ampm = (mh < 12) ? "AM" : "PM", mm = dt.getMinutes(), ss = dt.getSeconds() + "",
      ss = (ss.length > 1) ? ss : "0" + ss, tm = dt.getTime(), day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dow],
      tzOffset = dt.getTimezoneOffset()/60;

    this.set("date",[mt,"/",date,"/",yy].join(""));
    this.set("time",[hh,":",mm,":",ss].join(""));
    this.set("day",day);
    this.set("tzOffset",tzOffset);
  },

  // Set measurement unit
  setUnit: function($) {

    var dsxLocale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale,
        titanLocale = TWC && TWC.Titan && TWC.Titan.locale,
        locale = titanLocale || dsxLocale,
        isInternationalLocale = locale !== 'en_US',
        pcoUnits = this.get("unit"),
        userSpecifiedUnits = this.get("userSpecifiedUnits"),
        pcoUtils = window.TWC && TWC.PcoUtils;

        // WEB-2307 Force all international to m regardless
        //units = isInternationalLocale && !pcoUnits ? 'm' : (pcoUnits || 'e');
     if(locale === 'es_US') {
       var countryCode = window.esidata ? window.esidata.country : null;
       if (countryCode && countryCode.length === 2 && countryCode.match(/US/)) {
         isInternationalLocale = false;
       }
     }
     var units = isInternationalLocale ? 'm' : 'e';

    var qsTempUnit = pcoUtils.getURLParameter('temp');

    if (userSpecifiedUnits) {
      units = pcoUnits;
    }

    if (qsTempUnit) {
      units = (qsTempUnit.toLowerCase() === 'f' ? 'e' : 'm');
      this.set('userSpecifiedUnits', true);
      if (window.history && window.history.replaceState){
        window.history.replaceState({},document.title, TWC.PcoUtils.removeURLParameter(window.location.href, "temp"));
      }

    }

    this.set("unit", units);
  },

  getDefaultLocation : function( localeStr ) {
    var localeToDefaultLocation = {
      "en_US" : "USDC0001:1:US",
      "de_DE" : "GMXX0007:1:GM",
      "en_GB" : "UKXX0085:1:UK",
      "es_US" : "USDC0001:1:US",
      "en_IN" : "INXX0087:1:IN"
    };
    var defaultLocation = localeToDefaultLocation[localeStr];
    return (defaultLocation ? defaultLocation : "USDC0001:1:US");
  },

  setCurrentLocation : function( $ ) {
    // Get CURRENT LOCATION from user if its not already set.
    // TODO: Can we convert to DSX? Refer DSX-251.
    var geolocatePromise = $.Deferred();
    var _self = this;
    var myLocale = (TWC.Configs.dsx && TWC.Configs.dsx.locale) || "en_US";
    var geolocateOn = window.TWC && TWC.Configs && TWC.Configs.geolocateOn;
    var phantomJs = window.callPhantom;
    if(!this.attributes.currentLocation || !this.attributes.currentLocation.expirationTime || this.attributes.currentLocation.expirationTime < (new Date().getTime())) {
      //Use default location in case Geolocate is disallowed
      var defaultData = {"locid" : _self.getDefaultLocation(myLocale)};
      this.promises.push(geolocatePromise);
      if (!phantomJs && geolocateOn) {
        _self.getHTML5Location($, geolocatePromise, defaultData);
      } else if (!geolocateOn || phantomJs) {
        _self.getDSXLocation($, defaultData, geolocatePromise, true);
      } else {
        geolocatePromise.resolve();
      }
    }

    geolocatePromise.done(function(){
      // Add current location to Recent Search Locations and preferredLocation
        var currLoc = _self.get("currentLocation");
        if (currLoc && "cityNm" in currLoc) {
          _self.get("currentLocation").cityNm = TWC.PcoUtils.capitalize(currLoc.cityNm, true);
          _self.setPreferredLocation();
        }

    });
  },

  getHTML5Location : function( $, geolocatePromise, defaultData ) {
    var _self = this, resolvedPromise = false;

    // if geolocation doesnt exist, use default
    if (!navigator.geolocation) {
      _self.getDSXLocation($, defaultData, geolocatePromise, true);
      resolvedPromise = true;
      return;
    }

    // detect if Safari or IE11 and setTimeout
    if ((navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) ||
      !!navigator.userAgent.match(/Trident\/7\./)) {
      setTimeout(geolocate, 100);
    } else {
      geolocate();
    }


    function geolocate() {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = parseFloat(parseFloat(position.coords.latitude).toFixed(2));
        var lng = parseFloat(parseFloat(position.coords.longitude).toFixed(2));

        _self.getDSXLocation($, {
          'lat': lat,
          'lng': lng
        }, geolocatePromise);

        resolvedPromise = true;
      }, function errorHandler(err) {
        _self.getDSXLocation($, defaultData, geolocatePromise, true);
        resolvedPromise = true;
      });
      var userPromptTimeOut = setTimeout(function () {
        if (!resolvedPromise) {
          _self.getDSXLocation($, defaultData, geolocatePromise, true);
        }
      }, 5000);
    }
  },

  getDSXLocation : function($, data, customPromise, locidFlag) {
    var _self = this;
    if((locidFlag && (!data || !data.locid)) || (!locidFlag && (!data || !data.lat || !data.lng))) {
      this.set("currentLocation", {gipResponse : data});
      customPromise.resolve();
      return;
    }
    var myLocale = (TWC.Configs.dsx && TWC.Configs.dsx.locale) || "en_US",
      locId = "";

    if (!locidFlag) {

      // truncate lat and long to only 2 fixed decimal points for dsx
      var lat = $.isNumeric(data.lat) ? Number(data.lat).toFixed(2) : data.lat, lng = $.isNumeric(data.lng) ? Number(data.lng).toFixed(2) : data.lng;
      locId = lat + "," + lng;
    } else {
      locId = data.locid;
    }
    var promise = TWC.PcoUtils.get_dsx_records(["wxd/loc/" + myLocale + "/" + locId]);
    promise.success(function(data, textStatus, jqXHR) {
      if (data && data.body && $.isArray(data.body) && data.body.length > 0) {
        var locBody = data.body[0];
        if(locBody && locBody.doc && 'locId' in locBody.doc) {
          var locBodyDoc = locBody.doc;

          _self.set("currentLocation", locBodyDoc );

          _self.get("currentLocation").lat = parseFloat(lat || locBodyDoc.lat);
          _self.get("currentLocation").long = parseFloat(lng || locBodyDoc.long);
          _self.get("currentLocation").loc = (locBodyDoc.locId || '') + ':' + (locBodyDoc.locType || '') + ':' + (locBodyDoc.cntryCd || '');
          _self.get("currentLocation").expirationTime = (new Date().getTime()) + 900000;
        }
      }

    });
    promise.error(function(){
      _self.set("currentLocation", {error : true});
    });
    promise['always'](function() {
      TWC.PcoUtils.setTiming('userCurrentLocResolved', (new Date()).getTime());
      customPromise.resolve();
    });
  },

  setPlaceIQ : function( $ ) {
    // Get placeIQ for the current location.
    // TODO: Is this really necessary? If so, convert logic from DS2 to DSX.
  },

  // Generate the random string and set in RMID.
  setRMID : function( $ ) {
    // Read rmid from local storage. If not available, set one.
    var rmid = this.get("rmid");
    if(!rmid) {
      //rmid = TWC.PcoUtils.genRandStr(16,"0123456789");
      rmid = TWC.PcoUtils.generateUUID();
    }
    this.set("rmid", rmid);
  },

  // Generate the random string and set in RMID.
  setBackTo : function( $ ) {
    // simple logic. try to store the current page in currentBackTo. If it is already there, back it
    // up to backTo.
    var current = this.get("currentBackTo"), currentLocation = window.location.href;
    if(current && current.url && current.url !== currentLocation) {
      this.set("backTo", current);
    }
    this.set("currentBackTo", {
      url       : currentLocation,
      pagetype  : "N/A"
    });
  },

  // Set savedLocations
  setSavedAndRecentLocations : function($) {
    if(this.isPersisted) {
      var persistedAttrs = TWC.LocalStorage.getPersistedValue(this.nodeName) || {};
      if (persistedAttrs){
        $.extend(this.attributes, persistedAttrs);
      }
    }
  },

  // Set preferredLocation based on saved or recent search locations.
  setPreferredLocation : function( $ ) {
    var _self = this;
    var savedLocs       = _self.get("savedLocations");
    var recentSearchLocs= _self.get("recentSearchLocations");
    if(savedLocs && savedLocs.length > 0){
      _self.set("preferredLocation", savedLocs[0]);
    }else if (recentSearchLocs && recentSearchLocs.length > 0){
      _self.set("preferredLocation", recentSearchLocs[0]);
    }else{ // If no savedLocations or recentSearchLocations exist delete preferredLocation
      _self.deleteKey("preferredLocation");
    }
  },

  // Override set method for savedLocations attribute.
  overrideSetSavedLocations : function( $, value ) {
    // Do not call set from here because that is going to cause a loop. However, there is also a way to pass in a
    // param to identify whether or not we want the override to happen. But, that's just not good.
    this.attributes['savedLocations'] = value;
    this.setPreferredLocation($);
  },

  // Override set method for recentSearchLocations attribute.
  overrideSetRecentSearchLocations : function( $, value ) {
    this.attributes['recentSearchLocations'] = value;
    this.setPreferredLocation($);
  },

  truncateSingleLoc : function(locObj) {
    var lat = locObj.lat || 0,
      long = locObj.long || 0;
    return {
      key : locObj.key || '',
      id : locObj.id || '',
      locId : locObj.locId || '',
      locType : locObj.locType || '',
      cntryCd : locObj.cntryCd || '',
      cityNm  : (locObj.cityNm && TWC.PcoUtils.capitalize(locObj.cityNm, true, true)) || '',
      address : locObj.address || '',
      nickname : locObj.nickname || '',
      loc : [locObj.locId, ":", locObj.locType, ":", locObj.cntryCd].join(""),
      lat : parseFloat(parseFloat(lat).toFixed(2)) || '',
      long : parseFloat(parseFloat(long).toFixed(2)) || '',
      cntyNm : locObj.cntyNm || '',
      _gprId : locObj._gprId || '',
      position : locObj.position || '',
      prsntNm: locObj.prsntNm || '',
      _country :locObj._country || '',
      stNm : locObj.stNm || '',
      stCd : locObj.stCd || '',
      tag : locObj.tag || '',
      zipCd : locObj.zipCd || '',
      tmZnAbbr : locObj.tmZnAbbr || '',
      dmaCd : locObj.dmaCd || ''
    };
  },

  // Truncate full loc object to mini loc object
  truncateLoc : function(locArray) {
    var returnLocs = [],
      locObj,
      location;
    if (locArray && locArray.length > 0) {
      for (var i = 0,l = locArray.length; i < l; i++){
        locObj = locArray[i];
        location = this.truncateSingleLoc(locObj);
        returnLocs.push(location);
      }
      return returnLocs;
    }
  },

  // update a single saved location.
  updateLocation : function(idx, locObj) {
    var savedLocs = this.attributes['savedLocations'];
    if(savedLocs && jQuery.isArray(savedLocs) && savedLocs.length > idx) {
      savedLocs[idx] = locObj;
      // coz all of the stuff has to happen sequentially like event triggers, persistance, etc.
      this.set('savedLocations', savedLocs);
    }
  },

  /**
   * Clean up the location objects with empty properties.
   *
   * @param localStorageObj
   * @param $
   */
  cleanUpPcoObjects : function(localStorageObj, $) {
    if(!localStorageObj) {
      return;
    }
    var locationTypes = ["preferredLocation", "recentSearchLocations", "savedLocations"];
    $.each(locationTypes, function(indx, locationType) {
      var locations = localStorageObj[locationType], newLocations = [], isArrayObj = $.isArray(locations);
      locations = isArrayObj ? locations : [locations];
      for(var idx= 0, len = locations.length; idx < len; idx++) {
        if(locations[idx] && locations[idx].locId) {
          newLocations.push(locations[idx]);
        }
      }
      localStorageObj[locationType] = isArrayObj ? newLocations : newLocations[0];
    });
    return localStorageObj;
  },

  /**
   * Convert user localStorage to PCO3.
   *
   * @param localStorageObj - localStorage object
   */
  pco2ToPco3 : function(localStorageObj) {
    // PCO2 user LocalStorage will have a claritas property,
    // so process this conversion only if claritas is present
    if (localStorageObj.claritas) {
      var propsToKeep = [
          "preferredLocation",
          "recentSearchLocations",
          "savedLocations",
          "unit",
          "rmid"
        ],
        locationObjMap = {
          "countryName": "_country",
          "city": "cityNm",
          "country": "cntryCd",
          "locid": "locId",
          "loctype": "locType",
          "state": "stCd",
          "prsntNm": "prsntNm",
          "nickname": "nickname",
          "loc": "loc"
        },
        locationTypes = ["preferredLocation", "recentSearchLocations", "savedLocations"],
        location,
        newLocalStorageObj = {}, i, k, j, p, locationsArray,
        newLocationsArray = [],
        locationType,
        locTypeIsObject = false;

      // Check to see if this is a PCO2 LocalStorage Object
      // If it is process it.
      if (localStorageObj)
        for (i = 0, l = propsToKeep.length; i < l; i++) {
          p = propsToKeep[i];
          newLocalStorageObj[p] = localStorageObj[p];
        }

      // Next Map location objects for each locationType to PCO3 property names
      for (i = 0, l = locationTypes.length; i < l; i++) {
        locationType = locationTypes[i];
        locTypeIsObject = false;
        locationsArray = newLocalStorageObj[locationType] || [];

        // The locationsArray is either an array of
        // locations or a single loc object
        if (!jQuery.isArray(locationsArray)) {
          locationsArray = [locationsArray];
          locTypeIsObject = true;
        }
        newLocationsArray = [];
        for (k = 0, j = locationsArray.length; k < j; k++) {
          for (p in locationObjMap) {
            location = locationsArray[k];
            if (locationObjMap.hasOwnProperty(p)) {
              location[locationObjMap[p]] = (p === "nickname" && location[p]) ?
                                             location[p].replace(/\+/," ") : location[p];
              if (p !== locationObjMap[p]) {
                delete location[p];
              }
            }
            // Remove locType from locId if it exists
            if (p === "locid" && location.locId) {
              location.locId = location.locId.split(":")[0];
            }
          }
          // Add missing properties if they don't exist
          if(location.locId) {
            location.loc = [
              location.locId,
              location.locType,
              location.cntryCd
            ].join(":");
            location.prsntNm = location.cityNm + "," + (location.cntryCd === "US" ? location.stCd : location._country);
            location.nickname = location.nickname || "";
            newLocationsArray.push(location);
          }
        }
        //
        newLocalStorageObj[locationType] = locTypeIsObject ? newLocationsArray[0] : newLocationsArray;
      }
      return newLocalStorageObj;
    }
  },

  /**
   * user node specific 'persistAttributes' method overrides node persist attributes.
   * This will persist the node attributes on change auto-magic-ally.
   * Truncates location objects persisted in localstorage
   *
   * @param aKey
   */
  persistAttributes : function(aKey) {
    if(this.isPersisted) {
      var nodeConfig = TWC.node_rules.getNodeConfig(this.nodeName),
          user = jQuery.extend({}, this.attributes), // Clone user node
          savedLoc = {},
          recentLoc = {},
          svdLocs = [],
          rcntLocs = [];

      if(this.restrictExtend && nodeConfig && nodeConfig.allowedAttributes) {
        this.cleanUpObject( nodeConfig.allowedAttributes, aKey );
      }

      if(user && user.savedLocations && user.savedLocations.length > 0){
        user.savedLocations = this.truncateLoc(user.savedLocations);
      }

      if(user && user.recentSearchLocations && user.recentSearchLocations.length > 0){
        user.recentSearchLocations = this.truncateLoc(user.recentSearchLocations);
      }

       var preferredLoc = user.preferredLocation ? user.preferredLocation : null;
      if (preferredLoc) {
        user.preferredLocation = {
          key : preferredLoc.key || '',
          id : preferredLoc.id || '',
          locId : preferredLoc.locId || '',
          locType : preferredLoc.locType || '',
          cntryCd : preferredLoc.cntryCd || '',
          cityNm  : preferredLoc.cityNm || '',
          address : preferredLoc.address || '',
          nickname : preferredLoc.nickname || '',
          loc : [preferredLoc.locId, ":", preferredLoc.locType, ":", preferredLoc.cntryCd].join(""),
          lat : preferredLoc.lat || '',
          long : preferredLoc.long || '',
          cntyNm : preferredLoc.cntyNm || '',
          _gprId : preferredLoc._gprId || '',
          prsntNm: preferredLoc.prsntNm || '',
          _country :preferredLoc._country || '',
          stNm : preferredLoc.stNm || '',
          stCd : preferredLoc.stCd || '',
          position  : preferredLoc.position || '',
          tag  : preferredLoc.tag || '',
          zipCd : preferredLoc.zipCd || '',
          tmZnAbbr : preferredLoc.tmZnAbbr || '',
          dmaCd : preferredLoc.dmaCd || ''
        }
      }

      return this.localStorageWrite(user);
    }
  },

  /**
   * Retrieve age and gender from updataxfer cookie
   * and set as props on user node
   *
   * @param $
   */
  setAgeGender : function($) {
    var updataxferCookie = $.cookie("updataxfer") || "",
        updataxfer = decodeURIComponent(updataxferCookie),
        upSplit = updataxfer && updataxfer.split("|"),
        age = $.isArray(upSplit) && upSplit[0] || "",
        gender = age && upSplit.length > 1 && upSplit[1] || "";
    if (updataxfer) {
      this.set("age", age);
      this.set("gender", gender);
      $.removeCookie("updataxfer", {path: "/", domain: ".weather.com"});
    }
  },

  /**
   * Check for user login and then query dsx profile
   * for user locations
   *
   * @param $
   * @param timeStamp
   */
  getProfileLocations : function($, arguments) {

    var isLoggedIn = jQuery.cookie('uplogin'),
        dsxHost = isLoggedIn && isLoggedIn.split("^")[0],
        dsxSession = jQuery.cookie('dsx'),
        userSession = $.cookie('userSession'),
        expires = new Date(new Date().getTime() + (30 * 60 * 1000)), // 30 minutes
        profileRef = arguments.length > 2 ? arguments[2] : {},
        pfLocalSavedLocations = profileRef.get('savedLocations') || {};
    var originalPFSavedLocations = pfLocalSavedLocations && pfLocalSavedLocations.locations &&
                                   pfLocalSavedLocations.locations.slice(0) || {},
        profileIsMerged = pfLocalSavedLocations.profileIsMerged,
        savedLocs = this.get('savedLocations') || [],
        originalLocs = savedLocs.slice(0),
        recentSearchLocs = this.get('recentSearchLocations'),
        self = this;

    /**
     * restoreProfileLocations needs to have access to
     * original savedLocations and original pfSavedLocations
     */
    TWC.User.restoreProfileLocations = function() {
      self.set('savedLocations', originalLocs);
      profileRef.set('savedLocations', originalPFSavedLocations);
    };

    /**
     * /p/location request must be available at the
     * window level to respond to ups-post-message
     * through the postMessage API
     */

    TWC.User.getProfileLocations = function() {
      // Set 30 minute user session
      var isLoggedIn = jQuery.cookie('uplogin'),
          dsxHost = isLoggedIn && isLoggedIn.split("^")[0],
          dsxSession = jQuery.cookie('dsx'),
          userSession = $.cookie('userSession', new Date(), {path:'/', domain:'.weather.com', expires: expires});
      if (isLoggedIn && dsxSession) {
        jQuery.ajax(
          {
            url: dsxHost + '/p/locations?jsonp=TWC.User.callback',
            dataType: 'jsonp',
            cache: false
          }
        );
      }
    };

    /**
     * Listener for profile login success
     * Call getProfileLocations if this occurs
     *
     */
    TWC.Events.getEvent('ups-post-message').progress(function(payload){
      TWC.User.getProfileLocations();
    });

    /**
     * Callback from profile must be available at window scope
     */

    TWC.User.callback = function(data) {
      var pfSavedLocs = data.body || [],
          pfSavedLocsLength = $.isArray(pfSavedLocs) && pfSavedLocs.length || 0,
          i, pfLocs, pfLocsLength,
          locs2Get = [], id,
          savedLocsLength = $.isArray(savedLocs) && savedLocs.length || 0,
          startNewIndex, newpos=0,
          newRecentSearchLocs,
          dsxLocale = TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale,
          mergedSavedLocs,removedLocs, indx, pos, profileLocsPromise,
          newPFLocs = [], theSavedLoc,
          profileIsMergedEvent = TWC.Events.getEvent('profileIsMerged');


      /**
       * If profile locations exist map them to an array of objects
       * that have the five profile properties. First, sort array on
       * position property. Then, set the position property to the index
       * of the original Array if position doesn't already exist.
       */
      for (i = 0; i < pfSavedLocsLength; i++) {
        pfSavedLocs[i].doc.position = pfSavedLocs[i].doc.position || 1000;
      }
      if (pfSavedLocsLength > 0) {
        pfSavedLocs.sort(function(a, b){
          return a.doc.position - b.doc.position;
        });
        pfLocs = pfSavedLocs.map(function (value, idx) {
          return {
            'id' : value.id,
            'address': value.doc.address,
            'nickname': value.doc.nickname,
            'loc': value.doc.loc,
            'tag': value.doc.tag,
            'position': value.doc.position ? value.doc.position : idx
          }
        });

        // find the last valid position
        for (i = 0; i < pfSavedLocsLength; i++) {
          newpos = pfLocs[i].position !== 1000 && pfLocs[i].position || newpos;
        }

        // add positions to locs with a position of 1000
        for (i = 0; i < pfSavedLocsLength; i++) {
          if (pfLocs[i].position === 1000) {
            pfLocs[i].position = ++newpos;
          }
        }

        pfLocsLength = pfLocs.length;
      }

      /**
       * Fetch Full Loc Objects for all profile locations
       * until PSG returns full loc objects with profile locations
       */

      // Build array of loc ids from the pfLocs
      for (i = 0; i < pfLocsLength; i++) {
        locs2Get.push(pfLocs[i].loc);
      }

      // Make dsx call for loc objects
      profileLocsPromise = TWC.PcoUtils.get_dsx_records("wxd/v2/loc/" + dsxLocale + "/(" + locs2Get.join(';') + ")")
        .then(function(locObjs) {
        var locObjsLocArray = locObjs.body, p, fullLocArray = [],
            locsAbove10 = savedLocsLength + pfLocsLength - 10;

        // extend full loc objects with profile loc information
        if (pfLocs) {
          for (i = 0, l=locObjsLocArray.length; i < l; i++) {
            fullLocArray.push($.extend(locObjsLocArray[i].doc, pfLocs[i]));
          }
        }

        /**
         * If profile is merged, set the fullLocArray to savedLocations,
         * and the profile locations to profile; otherwise merge
         * profile locations into savedLocations and save both
         */

        if (profileIsMerged) {
          self.set('savedLocations', fullLocArray);
          pfLocalSavedLocations.locations = pfLocs;
          profileRef.set('savedLocations', pfLocalSavedLocations);
        } else {
          // If the total locs are more than 10,
          // pop off those greater than 10 and make them recent searches
          if (locsAbove10 > 0) {
            indx = savedLocsLength - locsAbove10;
            removedLocs = savedLocs.splice(indx, locsAbove10);
            newRecentSearchLocs = removedLocs.concat(recentSearchLocs);
            self.set('recentSearchLocations', newRecentSearchLocs);
          }
          mergedSavedLocs = fullLocArray.concat(savedLocs);

          // Add pos to newly spliced savedLocs
          // And add pos and loc to new pfLocs
          savedLocsLength = mergedSavedLocs.length;
          startNewIndex = fullLocArray.length; // Start at index of appended localStorage items
          pos = pfLocsLength;
          if (pfLocs) {
            for (i = startNewIndex; i < savedLocsLength; i++) {
              theSavedLoc = mergedSavedLocs[i];
              mergedSavedLocs[i].position  = ++newpos;
              id = mergedSavedLocs.id || 'loc' + (new Date()).getTime();
              mergedSavedLocs[i].id =id;

              pfLocs[i] = {
                id: id,
                loc: (theSavedLoc.lat && theSavedLoc.lat + "," + theSavedLoc.long) || theSavedLoc.loc,
                nickname: theSavedLoc.nickname,
                tag: theSavedLoc.tag,
                address: theSavedLoc.address,
                position: newpos
              };
            }
          }

          // Set savedLocations with newly merged locations from profile
          self.set('savedLocations', mergedSavedLocs);

          // Add profileIsMerged to profile.savedLocations
          pfLocalSavedLocations.profileIsMerged = true;

          // Set profile locations in products node
          pfLocalSavedLocations.locations = pfLocs;
          profileRef.set('savedLocations', pfLocalSavedLocations);

          // Add profileLocsPromise to array of user promises
          self.promises.push(profileLocsPromise);

          // Notify the world profileIsMerged
          if (savedLocs.length > 0) {
            newPFLocs = savedLocs;
          }
          profileIsMergedEvent.notify({locs2Write2Dsx: pfLocalSavedLocations,
                                        locsMoved2RecentSearch: removedLocs,
                                        locsAddedToProfile: newPFLocs
          });
        }
        TWC.Events.getEvent('profileLocationsLoaded').notify();

      });

    };

    if (isLoggedIn && dsxSession && !userSession) {
      TWC.User.getProfileLocations($)
    }

  },

  /**
   * Remove all savedLocations
   */
  removeSavedLocations : function() { return this.set('savedLocations',[]); }

});
;
/**
 * Author: ksankaran (Velu)
 * Date: 11/13/13
 * Time: 10:01 PM
 * Comments: The device sub node of PCO. It is persisted and is done with a different persist key.
 */

TWC.Device = TWC.Node.createSubClass({
  // init method setting up basic properties.
  init : function( $, arguments ) {
    this.nodeName     = "device";
    this.persistKey   = "pcoDeviceNode";
    this.isPersisted  = true;
  },

  // Fire up the only available logic in process.
  process : function( $ ) {
    this.setUpDevice($);
    this.setUpDeviceWidth( $ );
  },

  // Make the call to diag ua to set up the device node.
  setUpDevice : function( $ ) {
    var that = this;
    var attrs = this.attributes;
    var userAgent ={
      UserAgent: navigator.userAgent,
      dClass: "www",
      deviceWidth: window.innerWidth,
      deviceHeight: window.innerHeight,
      OpenDDRCrawler: null,
      OpenDDRJS: null,
      OpenDDRWireless: null,
      OpenDDRDisplay: "" + window.innerWidth + "x" + window.innerHeight,
      OpenDDRId: window.innerWidth < 768 && "mobileDevice" || window.innerWidth >= 768 && window.innerWidth < 1025 &&
                 "tabletDevice" || window.innerWidth > 1024 && "desktopDevice"
    };
    userAgent.OpenDDRTablet = userAgent.OpenDDRId === "tabletDevice";
    userAgent.OpenDDRDesktop = userAgent.OpenDDRId === "desktopDevice";

    this.setAttributes($.extend(attrs, userAgent));

  },

  // Find the viewport size
  setUpDeviceWidth : function( $ ) {
    this.set('deviceWidth', window.browserWidth);
  }
});;
/**
 * Author: ksankaran (Velu)
 * Date: 11/25/13
 * Time: 1:04 PM
 * Comments:
 */

(function(Strategy) {
    TWC.getWxJs = function( empty, ad, user, page) {

        TWC.WeatherInfo = TWC.Node.createSubClass({
            // init method setting up basic properties.
            init: function ($, arguments) {

                // Adding Tealium timing

                var _self = this;

                if (arguments.length > 1) {
                    this.adRef = arguments.length > 1 ? arguments[1] : {};
                    //this.userRef  = arguments.length > 2 ? arguments[2] : {};
                    //this.pageRef  = arguments.length > 3 ? arguments[3] : {};
                }

                // Handle ad location changes and update pco wx node only if
                // the intitial adRef promise is not pending. In other words,
                // don't do this on intitial load.
                TWC.Events.getEvent('ad_location_changed').progress(function () {
                    if (_self.adRef.promises[0].state() !== "pending") {
                        _self.setUpWeatherInfo($);
                    }
                });

                this.customPromise = $.Deferred();
                this.customPromise.done(function () {
                    TWC.PcoUtils.setTiming('wxResolved', (new Date()).getTime());
                });
                this.nodeName = "wx";
                this.config = {NULL_KEYNAME: "nl"};
                this.persistKey = "pcoWxNode";
                this.isPersisted = true;
                this.transform_rules = Strategy;
            },

            // Fire up the only available logic in process.
            process: function ($) {
                this.setUpWeatherInfo($);
            },

            // Make the call to diag ua to set up the device node.
            setUpWeatherInfo: function ($) {
                var _self = this,
                    currentLocation,
                    getRemainingSeconds = function (currentRecord, existingRemainder) {
                        var currentTime = existingRemainder;
                        if (currentRecord.generatedTime && currentRecord.cacheMaxSeconds && currentRecord.currentTime) {
                            currentTime = (currentRecord.cacheMaxSeconds - (currentRecord.currentTime - currentRecord.generatedTime));
                        }
                        return (currentTime < existingRemainder) ? currentTime : existingRemainder;
                    },
                    processWxData = function (alert, observation, dailyForecast, pollenForecast) {
                        var units, obs, tempF, tempC, feelsLikeF, feelsLikeC, secondsToCache = 0;

                        var alertsMap = alert && alert.body[0] && alert.body[0].doc;
                        getRemainingSeconds = function (currentRecord, existingRemainder) {
                            var currentTime = existingRemainder;
                            if (currentRecord.generatedTime && currentRecord.cacheMaxSeconds && currentRecord.currentTime) {
                                currentTime = (currentRecord.cacheMaxSeconds - (currentRecord.currentTime - currentRecord.generatedTime));
                            }
                            return (currentTime < existingRemainder) ? currentTime : existingRemainder;
                        };

                        //_self.set("secondsToCache", secondsToCache);
                        //_self.set("expirationTime", (new Date().getTime()) + (secondsToCache * 1000));
                        if (observation && observation.data && observation.data.vt1observation) {
                            units = TWC.PcoUtils.getUserPreferedUnits();
                            obs = observation.data.vt1observation;
                            /*
                             Temporarily calculating english/metric temp values until Turbo Ad call is made available.
                             Concern raised about implementing conversion logic on client. Data accuracy/synchronization
                             issues as well as implementation not portable/cross-platform.
                             */
                            tempF = (units === 'e') ? obs.temperature : Strategy.convertTemp(obs.temperature, units);
                            tempC = (units === 'm') ? obs.temperature : Strategy.convertTemp(obs.temperature, units);
                            feelsLikeF = (units === 'e') ? obs.feelsLike : Strategy.convertTemp(obs.feelsLike, units);
                            feelsLikeC = (units === 'm') ? obs.feelsLike : Strategy.convertTemp(obs.feelsLike, units);
                            // set attributes one after another. Let transform rules take care of it. Baaammmmmm!!!!
                            _self.set("dayNight", obs.dyNght);
                            /*not in turbo data*/
                            _self.set("relativeHumidity", obs.humidity);
                            _self.set("hum", obs.humidity);
                            _self.set("windSpeed", tempF);
                            _self.set("wind", tempF);
                            _self.set("uvIndex", obs.uvIndex);
                            _self.set("uv", obs.uvIndex);
                            _self.set("realTemp", tempF);
                            _self.set("temp", [tempF, tempC]);
                            _self.set("tempc", tempC);
                            _self.set("tempR", {
                                val: tempF
                            });
                            _self.set("tempRC", {
                                val: tempC
                            });
                            _self.set("wxIcon", obs.icon);

                            _self.set('flsLkF', feelsLikeF);
                            _self.set('flsLkC', feelsLikeC);

                            if (obs.iconExt) {
                                _self.set("wxExtIcon", obs.iconExt /*not in turbo data. not needed per Pavan.*/);
                            }
                            _self.set("cond", obs.icon);
                            _self.set("baroTendency", obs.barometerCode);
                            _self.set("snw", obs.snowDepth);
                        }
                        if (dailyForecast) {
                            _self.set("fcst", dailyForecast);
                        }
                        if (alert) {
                            _self.set("severe", alertsMap);
                        }
                        if (pollenForecast) {
                            _self.set("pollen", pollenForecast);
                        }
                    },
                    getWxData = function (location) {
                        // Eventually all wx data will be retrieved by ESI and made available on page load
                        TWC.PcoUtils.setTiming('wxCallMade', (new Date()).getTime());
                        var locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale || 'en_US';
                        var locId = location.loc;
                        var dsxPromise = TWC.PcoUtils.get_dsx_records(["wxd/v2/BERecord/" + locale + "/" + locId], "wxdata_callback");

                        var geocode = location['lat'] + ',' + location['long'];
                        var promise = Promise.all([new TWC.ObservationTurboModel(geocode).execute(), new TWC.DailyForecastTurboModel(geocode).execute(), new TWC.PollenForecastTurboModel(geocode).execute(), dsxPromise]);
                        _self.set("locId", geocode);
                        promise.then(function success(data) {
                                var observation = data[0],
                                    dailyForecast = data[1],
                                    pollen = data[2],
                                    alert = data[3];
                                TWC.PcoUtils.setTiming('wxCallReturned', (new Date()).getTime());
                                TWC.adUtils = TWC.adUtils || (TWC.adUtils = {});
                                TWC.adUtils.data = {
                                    units: TWC.PcoUtils.getUserPreferedUnits(),
                                    location: location,
                                    alert: alert,
                                    observation: observation,
                                    dailyForecast: dailyForecast,
                                    pollen: pollen
                                };
                                processWxData(alert, observation, dailyForecast, pollen);
                            },
                            function fail() {
                                _self.setAttributes({error: true});
                            }).then(function always() {
                            if (_self.customPromise.state() === 'resolved') {
                                TWC.Events.getEvent('wx_data_updated').notify();
                            } else {
                                _self.customPromise.resolve();
                                TWC.PcoUtils.setTiming('wxResolved', (new Date()).getTime());
                            }
                        });
                    };

                //Adding the PCO wx node
                /*use esi loc or wait on user promise*/
                if (window.explicit_location_obj) {
                    getWxData(window.explicit_location_obj);
                } else {
                    /* always goes here on non location pages */
                    $.when.apply($, [].concat(_self.adRef.promises || [])).then(function success() {
                            TWC.adUtils = TWC.adUtils || (TWC.adUtils = {});
                            currentLocation = _self.adRef.get("location");
                            if (!currentLocation) {
                                // no location available. move on you're done.
                                _self.customPromise.resolve();
                                return;
                            }

                            getWxData(currentLocation);

                        },
                        function fail() {
                            _self.customPromise.resolve();
                        });
                }


                this.promises.push(_self.customPromise);
            }
        });
        return new TWC.WeatherInfo( empty, ad, user, page);
    };
}({
    "hum"         : function(val) { return ((val >= 61) ? "hi" : "lo"); },
    "wind"        : function(val) {
        if (val >= 6 && val <= 29) {
            return "lo";
        }
        else if(val >= 30) {
            return "hi";
        }
    },
    "uv"          : function(val) { if(val >= 5){ return "hi";} },
    "getTempInc"  : function(val, scale) {
        if (typeof scale === 'undefined') {
            return 'fnnl';
        }

        if (scale === 'f') {
            if(typeof val === "undefined") { return "fnnl";}
            if (val<20){                     return "fnnl";}
            else if (val>=20 && val<=24){   return "20l"; }
            else if (val>=25 && val<=29){   return "20h"; }
            else if (val>=30 && val<=34){   return "30l"; }
            else if (val>=35 && val<=39){   return "30h"; }
            else if (val>=40 && val<=44){   return "40l"; }
            else if (val>=45 && val<=49){   return "40h"; }
            else if (val>=50 && val<=54){   return "50l"; }
            else if (val>=55 && val<=59){   return "50h"; }
            else if (val>=60 && val<=64){   return "60l"; }
            else if (val>=65 && val<=69){   return "60h"; }
            else if (val>=70 && val<=74){   return "70l"; }
            else if (val>=75 && val<=79){   return "70h"; }
            else if (val>=80 && val<=84){   return "80l"; }
            else if (val>=85 && val<=89){   return "80h"; }
            else if (val>=90 && val<=94){   return "90l"; }
            else if (val>=95 && val<=100){  return "90h"; }
            else if (val>100){               return "fpnl";}
            return "fnnl";
        } else if (scale === 'c') {
            if (typeof val === 'undefined') {
                return 'cnnl';
            }
            var tempCVal = "cpnl";
            if(val > 60){ tempCVal = "cpnl"; }
            else if(val %2 == 0 && val >=0){ tempCVal = (val + 1) + "ci"; }
            else if(val %2 != 0 && val >=0){ tempCVal = val + "ci"; }
            else if(val %2 == 0 && val <0 && val > -9){ tempCVal = (val * -1) + "nci"; }
            else{ tempCVal = "cnnl"; }
            return tempCVal;
        }


    },
    "temp"        : function(val, $) {
        if($.isArray(val) && val.length === 2) {
            var tmpF = val[0], tmpC = val[1];
            // set temperature increments
            var tempFVal = this.getTempInc(tmpF, 'f');

            // set fahrenheit unit
            var fUnit = (tmpF >= 0) ? (tmpF + "f") : ((tmpF * -1) + "nf");

            // set celsius unit
            var cUnit = (tmpC >= 0) ? (tmpC + "c") : ((tmpC * -1) + "nc");

            // set celsius increments
            var tempCVal = "cpnl";
            if(tmpC > 60){ tempCVal = "cpnl"; }
            else if(tmpC %2 == 0 && tmpC >=0){ tempCVal = (tmpC + 1) + "ci"; }
            else if(tmpC %2 != 0 && tmpC >=0){ tempCVal = tmpC + "ci"; }
            else if(tmpC %2 == 0 && tmpC <0 && tmpC > -9){ tempCVal = (tmpC * -1) + "nci"; }
            else{ tempCVal = "cnnl"; }

            return (tempFVal + "," + fUnit + "," + cUnit + "," + tempCVal);
        }
        return val;
    },
    "convertTemp" : function(temp, unit) {
        return (unit === 'e') ? Math.round((temp - 32) * 5 / 9) /*F to C*/: Math.round((temp * 9 / 5) + 32) /*C to F*/;
    },
    "tempR" : function(obj) {
        var scale = obj.scale;
        var val = obj.val;

        if (scale === 'c') {
            val = val * 9 / 5 + 32;
        }

        if(typeof val === "undefined"){ return "nl"; }
        if (val<=31){ return "icy"; }
        else if (val >= 32 && val <= 40){   return "cold";  }
        else if (val >= 41 && val <= 55){   return "thaw";  }
        else if (val >= 56 && val <= 69){   return "cool";  }
        else if (val >= 70 && val <= 79){   return "mod";   }
        else if (val >= 80 && val <= 89){   return "warm";  }
        else if (val >= 90 && val <= 100){  return "hot";   }
        else if (val>=101){                 return "xhot";  }
    },
    "tempRC" : function(obj) {
        var val = obj.val;

        if(typeof val === "undefined"){ return "nl"; }
        if (val<=0){ return "icy"; }
        else if (val >= 1 && val <= 4){   return "cold";  }
        else if (val >= 5 && val <= 12){   return "thaw";  }
        else if (val >= 13 && val <= 20){   return "cool";  }
        else if (val >= 21 && val <= 25){   return "mod";   }
        else if (val >= 26 && val <= 31){   return "warm";  }
        else if (val >= 32 && val <= 38){  return "hot";   }
        else if (val>=39){                 return "xhot";  }
    },
    "snowR" : function(val) {
        if(typeof val === "undefined"){   return "nl";  }
        if (val >= 1 && val < 3){ return "1";   }
        else if (val >=3){        return "3";   }
        return "nl";
    },
    "cond"  : function(val) {
        if([31,33].indexOf(val) != -1)                          { return "clr";   }
        else if([26,27,28,29,30].indexOf(val) != -1)            { return "cld";   }
        else if([1,2,5,6,9,11,12,39,40,45].indexOf(val) != -1)  { return "rain";  }
        else if([13,14,15,16,41,42,43,46].indexOf(val) != -1)   { return "snow";  }
        else if([7,8,10,18].indexOf(val) != -1)                 { return "ice";   }
        else if([32,34,36].indexOf(val) != -1)                  { return "sun";   }
        else if([0,3,4,17,35,37,38,47].indexOf(val) != -1)      { return "thdr";  }
    },
    "baroTendency" : function(val) {
        if(val == 0) { return "stdy"; }
        else if(val == 1) { return "rsng";  }
        else if(val == 2) { return "fllng"; }
    },
    "snw"          : function(val) {
        if (val >= 1 && val < 3){ return "1"; }
        else if (val >=3){ return "3"; }
    },
    "fcst"         : function(dailyForecast, $) {
        var fcst={},prcp = {},cond={},highTemp, lowTemp, highTempC, lowTempC, highSnow,
            day, night, prcp3Day, prcp3Night, cond3Day, cond3Night, dIdx, nIdx, nCurrent, dCond, nCond,
            _this = this, units = TWC.PcoUtils.getUserPreferedUnits();
        prcp.prcpStr = "";
        day = dailyForecast.data.vt1dailyForecast.day;
        night = dailyForecast.data.vt1dailyForecast.night;
        /* extract precip params */
        prcp3Day = day.precipPct.slice(0,3);
        prcp3Night = night.precipPct.slice(0,3);
        prcp = prcp3Day.reduce(function(previous, current, idx) {
            dIdx = ((idx * 2) + 1); // day param index
            nIdx = dIdx + 1; // night param index
            nCurrent = prcp3Night[idx]; // Night chance of precipitation
            previous[dIdx + ""] = (current) ? current : 'nl';
            previous[nIdx + ""] = (nCurrent) ? nCurrent : 'nl';
            previous.prcpStr += (((current < 50) ? dIdx + "_0," : dIdx + "_50,") +
                ((nCurrent < 50) ? nIdx + "_0," : nIdx + "_50,"));
            return previous;
        }, prcp);

        /* extract condition params */
        cond3Day = day.icon.slice(0,3);
        cond3Night = night.icon.slice(0,3);
        cond = cond3Day.reduce(function(previous, current, idx) {
            dCond = _this.cond(current);
            nCond = _this.cond(cond3Night[idx]);
            previous[ ( "fc" + ((idx * 2) + 1) ) ] =  (dCond ? dCond : "nl");
            previous[ ( "fc" + ((idx * 2) + 2) ) ] =  (nCond ? nCond : "nl");
            return previous
        }, cond);

        /* only 'e' or 'm' data in turbo call, not both */
        /* extract high temp 'e' */
        if( day.temperature && day.temperature.length ) {
            highTemp = Math.max.apply(null, ((units === 'e') ? day.temperature.slice(0,3) : day.temperature.slice(0,3).map(function(value) { return _this.convertTemp(value, units);}))) || undefined;
        }
        /* extract low temp 'e' */
        if( night.temperature && night.temperature.length ) {
            lowTemp = Math.min.apply(null, ((units === 'e') ? night.temperature.slice(0,3) : night.temperature.slice(0,3).map(function(value) { return _this.convertTemp(value, units);}))) || undefined;
        }
        /* extract high temp 'm' */
        if( day.temperature && day.temperature.length ) {
            highTempC = Math.max.apply(null, ((units === 'm') ? day.temperature.slice(0,3) : day.temperature.slice(0,3).map(function(value) { return _this.convertTemp(value, units);}))) || undefined;
        }
        /* extract low temp 'm' */
        if( night.temperature && night.temperature.length ) {
            lowTempC = Math.max.apply(null, ((units === 'm') ? night.temperature.slice(0,3) : night.temperature.slice(0,3).map(function(value) { return _this.convertTemp(value, units);}))) || undefined;
        }
        /* extract high snow */ /* data field not available in turbo dailyforecast data */
        if( day.snwQfp && day.snwQfp.length && night.snwQfp && night.snwQfp.length ) {
            highSnow = Math.min.apply(null, [].concat(day.snwQfp, night.snwQfp)) || undefined;
        }
        /* extract five day phrase */


        /*if(daily && $.isArray(daily) && daily.length > 2) {
         var threeDay = daily.slice(0, 3);
         for(var idx= 0, len = (threeDay.length > 3 ? 3 : threeDay.length); idx < len ; idx++) {
         var data = threeDay[idx];

         prcpData12 = (data.pOP12 ? data.pOP12 : "nl");
         record = ((idx * 2) + 1);
         prcp[ ( record + "" ) ] =  prcpData12;

         // Create prcpStr for ads configuration in DFPP
         prcp.prcpStr += (prcpData12 < 50) ? record + "_0," : record + "_50,";

         prcpData24 = (data.pOP24 ? data.pOP24 : "nl");
         record = ((idx * 2) + 2);
         prcp[ ( record + "" ) ] =  prcpData24;

         //Create prcpStr for ads configuration in DFPP
         prcp.prcpStr += (prcpData24 < 50) ? record + "_0," : record + "_50,";

         var dayCondInfo = this.cond(data.sky12), nightCondInfo = this.cond(data.sky12_24);
         cond[ ( "fc" + ((idx * 2) + 1) ) ] =  (dayCondInfo ? dayCondInfo : "nl");
         cond[ ( "fc" + ((idx * 2) + 2) ) ] =  (nightCondInfo ? nightCondInfo : "nl");

         if(!highTemp || data.hiTmpF > highTemp) {
         highTemp = data.hiTmpF
         }
         highTemp = (!highTemp || data.hiTmpF > highTemp) ? data.hiTmpF : highTemp;
         lowTemp  = (!lowTemp || data.loTmpF < lowTemp) ? data.loTmpF : lowTemp;

         if (!highTempC || data.hiTmpC > highTempC) {
         highTempC = data.hiTmpC;
         }
         highTempC = (!highTempC || data.hiTmpC > highTempC) ? data.hiTmpC : highTempC;
         lowTempC = (!lowTempC || data.loTmpC > lowTempC) ? data.loTmpC : lowTempC;

         var dayTimeSnowInches = data.snwQpf12, nightTimeSnowInches = data.snwQpf12_24; //* cannot find in turbo * /
         highSnow  = (!highSnow || dayTimeSnowInches > highSnow) ? dayTimeSnowInches : highSnow;
         highSnow  = (!highSnow || nightTimeSnowInches < highSnow) ? nightTimeSnowInches : highSnow;
         }*/
        prcp.prcpStr = prcp.prcpStr.substr(0,prcp.prcpStr.length - 1);
        fcst["prcp"]    = prcp;
        fcst["cond"]    = cond;
        fcst["tempH"]   = this.getTempInc(highTemp, 'f');
        fcst["tempL"]   = this.getTempInc(lowTemp, 'f');
        fcst["tempHR"]  = this.tempR({
            val: highTemp
        });
        fcst["tempLR"]  = this.tempR({
            val: lowTemp
        });

        fcst['tempCH']  = highTempC;
        fcst['tempCL']  = lowTempC;
        fcst['tempCHR'] = this.tempR({
            val: highTempC,
            scale: 'c'
        });
        fcst['tempCLR'] = this.tempR({
            val: lowTempC,
            scale: 'c'
        });

        fcst["fsnw"]    = this.snowR(highSnow);
        //}

        /* equivalent field 'wrlsWx12' not in Turbo data */
        fcst["fiveDay"] = day.phrase.slice(0,5).reduce(function(previous, current, idx) {
            previous["d" + (idx + 1)] = current ? current : 'nl';
            return previous;
        }, {});

        /*if(daily && $.isArray(daily) && daily.length > 4) {
         var fiveDay = daily.slice(0, 5);
         for(var idx= 0, len = (fiveDay.length > 5 ? 5 : fiveDay.length); idx < len ; idx++) {
         var data = fiveDay[idx];
         fiveDayPhrase[ "d" + (idx + 1) ] = (data.wrlsWx12 ? data.wrlsWx12 : "nl");
         }
         fcst["fiveDay"] = fiveDayPhrase;
         }*/
        return fcst;
    },
    "severe"  : function(alerts, $) {
        if(alerts && $.isArray(alerts) && alerts.length > 0) {
            var alertsInfo = [];
            for(var idx= 0, len=alerts.length; idx < len; idx++) {
                var alert = alerts[idx];
                if(alert && 'BEHdr' in alert && 'bEvent' in alert.BEHdr) {
                    var alertEventMetaData = alert.BEHdr.bEvent;
                    if('eSgnfcnc' in alertEventMetaData && 'ePhenom' in alertEventMetaData) {
                        var phenomena = alertEventMetaData.ePhenom;
                        var significance = alertEventMetaData.eSgnfcnc;
                        var alertMap = [
                            {
                                regex : /(^|\s)(CF|LS|FA|FL|EL|FF|HY|TS|RP|TCL|TCO|TGR|TLM|TRA|TCW)(\s|$)/,
                                key   : "fld"
                            },
                            {
                                regex : /(^|\s)(HU|HI|TI|TR|TTP|TY)(\s|$)/,
                                key   : "trop"
                            },
                            {
                                regex : /(^|\s)(WC|SU|EW|FG|MF|AF|MH|BW|DS|DU|EC|EH|EW|FG|MF|FR|FW|FZ|GL|HF|HT|HW|HZ|LO|LW|MA|SE|MS|SM|UP|WI|ZF|TAD|TCA|TTW|TCD|TCE|TEQ|TEV|TLC|TLA|RB|SC|SI|SW|TNM|TST|TNS|TNU|TOF|TRE|TRF|TRH|TSS|TSG|TSL|TSP|TSF|TNO|TVO|TZO|TOZ|TAQ|TAP|TWA|THT|TFF|TWX)(\s|$)/,
                                key   : "oth"
                            },
                            {
                                regex : /(^|\s)(SV|SW|SR|TLM|TSA|TRA|TTS)(\s|$)/,
                                key   : "thdr"
                            },
                            {
                                regex : /(^|\s)(TO)(\s|$)/,
                                key   : "tor"
                            },
                            {
                                regex : /(^|\s)(BZ|HS|IS|LB|LE|WS|ZR|TAV|WW|TSI|TFA|TLT|TAA)(\s|$)/,
                                key   : "wint"
                            }
                        ];
                        for(var aidx=0, alen=alertMap.length; aidx < alen; aidx++) {
                            if(phenomena.match(alertMap[aidx].regex)) {
                                var key = alertMap[aidx].key;
                                alertsInfo.push(key);
                                alertsInfo.push(key + phenomena + significance);
                                break;
                            }
                        }
                    }
                }
            }
            return alertsInfo;
        }
        return "nl";
    },
    "pollen"  : function(pollen) {
        var p = pollen.data.vt1pollenforecast;
        var highVal = [].concat( ((p.tree || [])[0] || []), ((p.weed || [])[0] || []), ((p.grass || [])[0] || []) );
        if (highVal.length > 0) {
            highVal.reduce(
              function (previous, current) {
                  return Math.max(previous, current) || previous;
              });
        } else {
            highVal = "nl";
        }
        if( isNaN(highVal) ) {return 'nl';}
        else if (highVal >= 4 ) {return 'hi';}
        else if (highVal < 2 ) {return 'lo';}
        else { return 'me';}
    }
}));;
/**
 * Created with JetBrains PhpStorm.
 * User: ssherwood
 * Date: 12/17/13
 * Time: 7:47 AM
 * To change this template use File | Settings | File Templates.
 */



TWC.Ad = TWC.Node.createSubClass({


  // just set the basic attributes.
  init : function( $, arguments ) {

    var _self=this;

    this.nodeName = "ad";
    this.isPersisted = true;
    this.eventTriggers = {
      'location'    : 'ad_location_changed'
    };

    this.WX_WindowShadeTransform = {
      "default" : 'WX_WindowShade',
      "tablet"  : 'WX_Leaderboard'
    };

    this.WX_Driver1Transform = {
      "default" : 'WX_Driver1',
      "tablet"  : 'WX_DriverTablet'
    };

    this.WX_DriverUnitTransform = {
      "default" : "WX_DriverUnit",
      "tablet"  : "WX_DriverUnitTablet"
    };

    this.WX_EditorialLGTransform = {
      "default" : "WX_EditorialLG",
      "tablet"  : "WX_EditorialSM"
    };

    // Modules that may contain ads
    this.possible_ad_modules = {
      admodule : {
        adtype_param    : "admodule",
        ad_position_key : "",
        control: "server"
      },
      admodule_burda : {
        adtype_param    : "admodule_burda",
        ad_position_key : "",
        control: "server"
      },
      admodule_companion : {
        adtype_param    : "admodule_companion",
        ad_position_key : "",
        control: "client"
      },
      content_media : {
        atype_param     : "content_media",
        ad_position_key : "",
        control: "server"
      },
      glomo_content_media : {
        atype_param     : "glomo_content_media",
        ad_position_key : "",
        control: "server"
      },
      glomo_content_media_local : {
        atype_param     : "glomo_content_media_local",
        ad_position_key : "",
        control: "server"
      },
      wxnode_slideshow : {
        adtype_param    : "slideshow",
        ad_position_key : "wxnode_slideshow_ad_pos",
        control: "client"
      },
      wxnode_content_inset : {
        adtype_param    : "wxnode_content_inset",
        ad_position_key : "",
        control: "server"
      },
      delivery_units : {
        adtype_param    : "delivery_units",
        ad_position_key : "",
        control: "client",
        collection      : "hpdu"
      },
      hp_dl_stormdata : {
        adtype_param: "hp_dl_stormdata",
        ad_position_key : "",
        control: "client"
      },
      commutercast_map : {
        adtype_param: "commutercast_map",
        ad_position_key : "",
        control: "client"
      },
      commutercast_leftrail : {
        adtype_param: "commutercast_leftrail",
        ad_position_key : "",
        control: "client"
      },
      hp_countdown : {
        adtype_param: "hp_countdown",
        ad_position_key : "",
        control: "client"
      },
      video_player : {
        adtype_param: "video_player",
        ad_position_key : "",
        control: "client"
      },
      wxnode_video_player : {
        adtype_param: "wxnode_video_player",
        ad_position_key : "",
        control: "client"
      },
      haircast: {
        adtype_param: "haircast",
        ad_position_key : "",
        control: "server",
        collection: "adpositions"
      },
      photos_details: {
        adtype_param: "photos_details",
        ad_position_key : "",
        control: "client"
      },
      photos_collection_feed: {
        adtype_param: "photos_collection_feed",
        ad_position_key: "",
        control: "client"
      },
      title_video_collection: {
        adtype_param: "title_video_collection",
        ad_position_key: "",
        control: "client"
      },
      title_collection_index: {
        adtype_param: "title_collection_index",
        ad_position_key : "",
        control: "client"
      },
      title_image_ad: {
        adtype_param: "title_image_ad",
        ad_position_key : "",
        control: "client"
      },
      pollencast_teaser: {
        adtype_param: "pollencast_teaser",
        ad_position_key : "",
        control: "client"
      },
      lifestyle_teaser: {
        adtype_param: "lifestyle_teaser",
        ad_position_key : "",
        control: "client"
      },
      gm_lifestyle_teaser: {
        adtype_param: "gm_lifestyle_teaser",
        ad_position_key : "",
        control: "client"
      },
      forecast_weekend: {
        adtype_param: "forecast_weekend",
        ad_position_key : "",
        control: "client"
      },
      storm_hero: {
        adtype_param: "storm_hero",
        ad_position_key : "",
        control: "server"
      },
      gm_delivery_units : {
        adtype_param    : "gm_delivery_units",
        ad_position_key : "",
        control: "client",
        collection: "delivery_units"
      },
      glomo_hp_countdown : {
        adtype_param: "glomo_hp_countdown",
        ad_position_key : "",
        control: "client"
      },
      report_and_recover_sidebar: {
        adtype_param: "report_and_recover_sidebar",
        ad_position_key : "",
        control: "client"
      },
      your_weather : {
        adtype_param: "your_weather",
        ad_position_key : "",
        control: "client",
        collection: "ad_instances"
      }

    };
  },

  // Execute the business logic one by one.
  process : function( $, arguments ) {
    this.setUpLocalParams($);
    this.setUpCustomParams($);
    this.setUpAd($, arguments);
    this.setUpSevere( $ );
    this.setUpUGC();
    this.setAdsTestCookie($);
    this.setAdImpressionObj($, arguments);
    this.setUpGlueAdMetrics();
  },

  // Set up local params from page
  setUpLocalParams : function($){

    var refURLmatch, hostValue, hostParts, hostPartsLength;

    refURLmatch = document.referrer.match(/http[s]?:\/\/([a-z\.\-]+)/);
    hostValue = refURLmatch ? refURLmatch[1] : "";
    if(hostValue && hostValue.indexOf(".") != -1) {
      hostParts = hostValue.split(".");
      hostPartsLength = hostParts.length;
      if(hostPartsLength > 1) {
        var startIndex = (hostParts[0] == 'www' ? 1 : 0);
        var website = hostParts.splice(startIndex, hostPartsLength - startIndex - 1).join(".");
        this.set("refurl", website);
      }
    }


  },

  // Set up custom params
  setUpCustomParams : function($){
    var _self = this;
    // Update custom_params when ad and wx nodes are updated
    TWC.Events.getEvent('wx_data_updated').progress(function(){

      // Parse cust_params into an object
      var cust_params = _self.get('cust_params'), custObj = {},
        wx,adLoc,keyValues,i,targetMap = {};

      cust_params = decodeURIComponent(cust_params);
      keyValues = cust_params.split("&");
      for (i = 0,l=keyValues.length;i < l; i++){
        var keyValue = keyValues[i].split("=");
        targetMap[keyValue[0]]=keyValue[1];
      }

      wx = TWC && TWC.pco && TWC.pco.get('wx') && TWC.pco.get('wx').attributes;
      adLoc = _self.get('location');

      // Add new loc and wx data
      targetMap.fsnw = wx.fcst.fsnw;
      targetMap.cnd = wx.cond;
      targetMap.loc = adLoc.locId;
      targetMap.dma = adLoc.dmaCd;
      targetMap.ct = adLoc.cityNm;
      targetMap.st = adLoc.stCd;
      targetMap.cc = adLoc.cntryCd;
      targetMap.cnty = adLoc.cntyNm;
      targetMap.zip = adLoc.zipCd;
      targetMap.lat = adLoc.lat;
      targetMap.lon = adLoc.long;
      targetMap.tmp = wx.temp;
      targetMap.tmpr = wx.tempR;
      targetMap.plln = wx.pollen;
      targetMap.wind = wx.wind;
      targetMap.uv = wx.uv;
      targetMap.hmid = wx.hum;
      targetMap.sev = wx.severe;
      targetMap.baro = wx.baroTendency;
      targetMap.snw = wx.snw;
      targetMap.fc1 = wx.fcst.cond.fc1;
      targetMap.fc2 = wx.fcst.cond.fc2;
      targetMap.fc3 = wx.fcst.cond.fc3;
      targetMap.d1 = wx.fcst.fiveDay.d1;
      targetMap.d2 = wx.fcst.fiveDay.d2;
      targetMap.d3 = wx.fcst.fiveDay.d3;
      targetMap.d4 = wx.fcst.fiveDay.d4;
      targetMap.d5 = wx.fcst.fiveDay.d5;

      // Convert object back into a string
      cust_params = JSON.stringify(targetMap);
      cust_params = cust_params.replace(/,\"/g,"&\"");
      cust_params = cust_params.replace(/[{}]/g,"");
      cust_params = cust_params.replace(/"/g,'');
      cust_params = cust_params.replace(/:/g,"=");

      cust_params = encodeURIComponent(cust_params);

      TWC.pco.setNodeValue('ad','cust_params',cust_params);

      // A brand new 'ad_cust_params_changeed' event will be
      // created in the AdControl factory to handle the
      // resolution of updated cust_params.
      TWC.Events.getEvent('ad_cust_params_changed').resolve();

    });

  },

  // Set up ad node
  setUpAd : function( $ , arguments) {
    var adPromise = $.Deferred(),
      _self = this,
      pageRef = arguments.length > 1 ? arguments[1] : {},
      userRef = arguments.length > 2 ? arguments[2] : {},
      device  = arguments.length > 3 ? arguments[3] : {},
      setTypeAndRefreshParams, setTablet, setNone,
      twcConfigs = window.TWC && TWC.Configs;

    _self.promises.push(adPromise);

    TWC.Events.ifReady(['drupalSettingsReady']).done(function(){

      // Extract adpositions from Drupal settings
      var i, j, k, l, all_ad_positions=[], ad_video_companions={}, DFPSlots={},pos,control,
          ads_ctrld_clientside={}, admodules, collection, adIndx, selectedadpos,transform,
          ads_lazy_load = {},
          pam = _self.possible_ad_modules,instance_id,allAdModules = [],adInstance,
          twcSettings = window.Drupal && Drupal.settings && Drupal.settings.twc,
          modules = twcSettings && twcSettings.modules,
          contexts = twcSettings && twcSettings.contexts,
          instance = twcSettings && twcSettings.instance,
          pageType = (contexts && contexts.node && contexts.node.type) || (pageRef && pageRef.attributes && pageRef.attributes.content),
          mobile = window.browserWidth < 768,
          tablet = window.browserWidth >= 768 && window.browserWidth < 1025,
          scrn = mobile && 'mobile' || tablet && 'tablet' || 'desktop';


      _self.set("ord", TWC.PcoUtils.genRandStr(16, "0123456789"));
      _self.set("zone", $('[name=adsmetrics_zone]').attr('value'));


      // Fine tune a little more
      var promisesToWait = [].concat(device.promises),
        pageLocId    = window.explicit_location,
        pageLocation = pageRef.get("currentLocation"),
        lastVisitedLocation = userRef.get("lastVisitedLocation");

      if(pageLocId && !pageLocation) {
        // this happens only in environments that are not Akamai ESI facing.
        // So, this is a location based page and hence, you dont have to wait for page promises.
        promisesToWait = promisesToWait.concat(pageRef.promises);
      } else if (TWC && TWC.Titan && TWC.Titan.locid) {
        // If it is a Titan page then there is no explicit location either
        promisesToWait = promisesToWait.concat(pageRef.promises);
      }
      if(!(promisesToWait.length > 1) && !lastVisitedLocation) {
        // well, most people have something in their lastVisitedLocation coz
        // they searched for some location. For people who do not have anything
        // then, only then, we wait for user promises.
        promisesToWait = promisesToWait.concat(userRef.promises);
      }
      $.when.apply($, promisesToWait).then( function(){
        pageLocation      = pageRef.get("currentLocation");
        lastVisitedLocation = userRef.get("lastVisitedLocation");
        _self.set("location", (pageLocation &&
        (!pageLocation.error)) ?
          pageLocation :
        lastVisitedLocation ||
        userRef.get("currentLocation") || null);
          TWC.PcoUtils.setTiming('adLocationResolved', (new Date()).getTime());
        TWC.Events.getEvent('ad_location_resolved').resolve();

        setTablet = function(positionTransform){

          pos = adInstance.selectedadpos;
          if (typeof pos === "object" && pos.length && pos.length > 0) {
            // Transform branding bar based
            adIndx = $.inArray(positionTransform["default"], pos);
            if (adIndx !== -1) {
              pos[adIndx] = positionTransform.tablet;
            }

          } else  if (pos === positionTransform["default"]) {
            pos = positionTransform.tablet;
          }
          $(document).ready(function(){
            $('#' + positionTransform["default"]).attr('id',positionTransform.tablet);
          });
        };

        setNone = function(positionTransform){
          selectedadpos = adInstance.selectedadpos;
          if (typeof selectedadpos === "object" && selectedadpos.length && selectedadpos.length > 0) {
            adIndx = $.inArray(positionTransform["default"], selectedadpos);
            if (adIndx !== -1) {
              selectedadpos[adIndx] = undefined;
            }
          }
          if (selectedadpos === positionTransform["default"]) {
            selectedadpos = undefined;
          }

        };

        setTypeAndRefreshParams = function(adInstance, control, adtype_param, ad_position_key){
          var default_adtype, tablet, viewport, orientation;

          default_adtype = adtype_param ? adtype_param : "default";

          // Set default adtype if adtype not present
          adInstance.adtype = adInstance.adtype ? adInstance.adtype : default_adtype;

          // Set refresh to false  if refresh not present
          adInstance.refresh = adInstance.refresh ? adInstance.refresh : false;

          // if control === client, set refresh to true
          adInstance.refresh = (control === 'client') ? true : adInstance.refresh;

          // Set selectedadpos based
          adInstance.selectedadpos = ad_position_key ? adInstance[ad_position_key] : adInstance.selectedadpos;

          // Set control value on ad instance
          adInstance.control = control;

          // If OpenDDRTablet === true
          //set appropriate ad position
          pos = adInstance.selectedadpos;
          pos =  (typeof pos === "object" && pos.length && pos.length > 0) ? pos[0] : pos;


          viewport = device && device.get('OpenDDRDisplay') && device.get('OpenDDRDisplay').split('x');
          orientation = Math.abs(window.orientation) === 90 ? 1 : 0;
          tablet = (device.get('OpenDDRTablet') === true);
          transform = pos + 'Transform';

          if (_self[transform] && pos === _self[transform]["default"]) {
            if (tablet && viewport[orientation] >>> 0 < 768) {
              setNone(_self[transform]);
            }
            else if (tablet && pos === _self[transform]["default"]) {
              setTablet(_self[transform]);
            }

            // This check is for special WX_DriverUnit sizing
            if (tablet && viewport[orientation] >>> 0 >= 768 && tablet && viewport[orientation] >>> 0 <= 1024) {
              setTablet(_self[transform]);
            }

            // If browserWidth === tablet width
            // set appropriate ad position

            // Special size check for WX_Driver1
            if (!tablet && window.browserWidth < 1064 && window.browserWidth >= 970 && pos === 'WX_Driver1'){
              setTablet(_self[transform]);
            }

            // Tablet setting goes up to 1024 for WX_DriverUnit, so exclude
            if (!tablet && window.browserWidth < 970 && window.browserWidth >= 768 && pos !== 'WX_DriverUnit') {
              setTablet(_self[transform]);
            } else if (!tablet && window.browserWidth < 768) {
              setNone(_self[transform]);
            }

            // Tablet size for WX_DriverUnit is between 768 and 1024
            if (!tablet && window.browserWidth >= 768 && window.browserWidth <= 1024 && pos === 'WX_DriverUnit') {
              setTablet(_self[transform]);
            }

            // Tablet size for WX_EditorialLG is between 768 and 1024
            if (!tablet && window.browserWidth >= 768 && window.browserWidth <= 1024 && pos === 'WX_EditorialLG') {
              setTablet(_self[transform]);
            }
          }


          return adInstance;

        };

        // Add keywords if available
        if(modules && modules.page_keywords) {
          var keywordModuleId = modules.page_keywords[0];
          if(keywordModuleId && instance && instance[keywordModuleId] && instance[keywordModuleId].article_node) {
            var contextKey = instance[keywordModuleId].article_node;
            if(contextKey && contexts && contexts[contextKey]) {
              var nodeContext = contexts[contextKey];
              if(nodeContext && nodeContext.field_keywords) {
                _self.set("sponstory", nodeContext.field_keywords);
              }
            }
          }
        }

        // Collect all ad positions
        for (ad in pam) {
          if (pam.hasOwnProperty(ad)) {
            admodules = modules && modules[ad] || [];
            control = pam[ad].control;

            if (admodules.length > 0) {

              // Set params on adInstance
              for (i = admodules.length-1; i >= 0; i--){
                adInstance = instance[admodules[i]];

                // Set an empty string for adtype if it doesn't exist
                adInstance.adtype = adInstance.adtype || "";
                collection = pam[ad].collection;

                // if the adInstance is a collection of ads process each ad in the collection
                if (collection && adInstance[collection] && adInstance[collection].length) {
                  // process original module instance
                  adInstance = setTypeAndRefreshParams(adInstance,control,adInstance.adtype);
                  // get a base instance id for use by collection instances
                  var instance_id_base = admodules[i] + "-ad";
                  for (j = 0, k = adInstance[collection].length; j < k; j++) {
                    if (adInstance[collection][j].selectedadpos) {

                      // Create instance ids for each ad in the collection
                      // array based on the original admodule instance id
                      instance_id_ad = instance_id_base + "-" + j;

                      // write the module_id and collection array from the original
                      // admodule instance back into a new instance property for
                      // each ad in the collection
                      adInstance[collection][j].module_id = adInstance.module_id;

                      setTypeAndRefreshParams(adInstance[collection][j],control,adInstance.adtype);

                      // Create a new instance property for each ad
                      instance[instance_id_ad] = adInstance[collection][j];

                      // Create a new admodule for each ad, starting at 1 so we don't over write the original module
                      admodules[j+1] = instance_id_ad;
                    }
                  }
                } else if (pam[ad].ad_position_key) {
                  adInstance = setTypeAndRefreshParams(adInstance, control, adInstance.adtype, pam[ad].ad_position_key);
                } else {
                  adInstance = setTypeAndRefreshParams(adInstance, control, adInstance.adtype);
                }

                // Remove any admodules that don't have a selectedadpos
                if (!adInstance.selectedadpos || (typeof adInstance.selectedadpos === "object" &&
                  adInstance.selectedadpos.length &&
                  adInstance.selectedadpos.length > 0 &&
                  !adInstance.selectedadpos[0])) {
                  admodules.splice(i,1);
                  continue;
                }

                // Remove any admodules that are not
                // selected for that screen size.

                // if ad is video preroll or slideshow or photos make it available for all screens
                if (ad.match(/video/) || ad.match(/slideshow/) || ad.match(/photos/)){
                  adInstance.desktop = adInstance.mobile = adInstance.tablet = 1;
                }

                // If adInstance does not have desktop,
                // mobile and tablet default it to all
                if (!adInstance.desktop && !adInstance.mobile && !adInstance.tablet) {
                  adInstance.desktop = adInstance.tablet = adInstance.mobile = 1;
                }
                // Remove admodules not selected for this screen size
                if (!adInstance[scrn]) {
                  admodules.splice(i,1);
                }

              }
              allAdModules = allAdModules.concat(admodules);
            }
          }
        }

        if(!allAdModules || allAdModules.length === 0) {
          adPromise.resolve();
          return;
        }

        for (i = 0,l = allAdModules.length;i < l;i++ ){
          // Retrieve ad_module configuration from instance
          adInstance = instance[allAdModules[i]];

          // Do not include any adInstance that has 'include_ad' property set to 0
          if (adInstance && ('include_ad' in adInstance) && adInstance.include_ad === 0) {
            continue;
          }

          // Set pos array to selectadpos array (convert selectedadpos string to an array)
          pos = (adInstance && adInstance.selectedadpos && typeof adInstance.selectedadpos === "string") ?
            [adInstance.selectedadpos] : (adInstance && adInstance.selectedadpos && typeof adInstance.selectedadpos === "object" &&
          adInstance.selectedadpos.length && adInstance.selectedadpos.length > 0) ?
            adInstance.selectedadpos : [];

          // Loop and create all_ad_positions array and DFPSlots Object
          for(j=0, k=pos.length;j < k;j++){
            // Add all adtypes to adpositions array for Tealium to
            // process the pos and size lookups for all ads

            // Adtypes other than default will be handled clientside.
            // Companions are now handled clientside.
            all_ad_positions.push(pos[j]);
            if (adInstance && adInstance.adtype && adInstance.adtype.match(/companion/)) {
              ad_video_companions[pos[j]] = {
                adtype  : adInstance.adtype
              }
            }

            // Adtypes other than default will be handled clientside.
            if (adInstance && adInstance.control === 'client') {
              ads_ctrld_clientside[pos[j]] = {
                adtype  : adInstance.adtype
              }
            }

            // Collect all lazyload positions if lazy load is turned on
            if (adInstance && adInstance.lazyload && twcConfigs.lazy_load_ads[scrn]) {
              ads_lazy_load[pos[j]] = {
                adtype : adInstance.adtype
              }
            }

            DFPSlots[pos[j]] = {
              adtype  : adInstance.adtype,
              refresh : adInstance.refresh
            }
          }
        }

        //Adding any ads coming in from Drupal that renders this page
        var origArticleContentAd = twcSettings.ct_article && twcSettings.ct_article.selectedadpos;
        var newArticleContentAd;
        if(origArticleContentAd) {
          if (scrn === "mobile") {
            newArticleContentAd = "MW_Position2";
          } else if (scrn === "tablet") {
            newArticleContentAd = "WX_DriverUnitTablet";
          } else if (scrn === "desktop") {
            newArticleContentAd = "WX_DriverUnit";
          }
          ads_lazy_load[newArticleContentAd] = {
            adtype : adInstance.adtype
          };
          all_ad_positions = all_ad_positions.concat(newArticleContentAd);
          DFPSlots[newArticleContentAd] = {
            adtype : 'article',
            refresh: true
          };
          $(document).ready(function() {
            var $articleAdDiv = $('#' + origArticleContentAd);
            if ($articleAdDiv.length) {
              $articleAdDiv.attr('id', newArticleContentAd);
            }
          });
          TWC.adUtils.article.adposition = newArticleContentAd;
        }


        _self.set('all_ad_positions',all_ad_positions);
        //noinspection BadExpressionStatementJS
        ($.isEmptyObject(ad_video_companions)) ? null : _self.set('ad_video_companions',ad_video_companions);
        //noinspection BadExpressionStatementJS
        ($.isEmptyObject(ads_ctrld_clientside)) ? null : _self.set('ads_ctrld_clientside',ads_ctrld_clientside);
        //noinspection BadExpressionStatementJS
        ($.isEmptyObject(ads_lazy_load)) ? null : _self.set('ads_lazy_load',ads_lazy_load);
        _self.set('DFPSlots',DFPSlots);

        adPromise.resolve();
      }, function(){
        // IF Page, Dev ice or User nodes fail their promises
        _self.set("location", null);
          TWC.PcoUtils.setTiming('adLocationResolved', (new Date()).getTime());
        TWC.Events.getEvent("ad_location_resolved").reject();
        adPromise.resolve();
      });

      TWC.Events.getEvent('dfpLoaded').done(function(){
        var slots = _self.get("DFPSlots"), i, l, all_ad_positions = _self.get("all_ad_positions"),
          do_only_once = true, ads_ctrld_clientside = _self.get("ads_ctrld_clientside"), ad, idx,
          adpositions = all_ad_positions && all_ad_positions.slice(0),
          slotRefreshReady = TWC.Events.getEvent('slotRefreshReady');

        // Removing any ads_ctrld_clientside
        for (ad in ads_ctrld_clientside){
          idx = adpositions.indexOf(ad);
          if (idx >= 0) {
            adpositions.splice(idx,1);
          }
        }

        // Fix for NONE positions in the array.
        // Removing any admodule marked NONE
        var new_ad_positions = [];
        for(var adidx = 0, len = adpositions && adpositions.length || 0; adidx < len; adidx++) {
          if(adpositions[adidx] !== "NONE") {
            new_ad_positions.push(adpositions[adidx]);
          }
        }

        // This listener processes only ads controlled by Tealium
        // (i.e. those left in the new_ad_positions array.)
        // All clientside  and companion ads have been removed, so once the last Tealium
        // controlled ad in the list has been processed. Tealium slots can be refreshed.
        // WX_Hidden will always be on the page, so it could be the only ad controlled
        // by Tealium and will cause slotRefreshReady to fire.
        googletag.pubads().addEventListener('slotRenderEnded',function(e){
          if (do_only_once) {
            var key = e.slot.getSlotId().getDomId();
            slots[key].slot = e.slot;
            if( key === new_ad_positions[new_ad_positions.length - 1]){
              do_only_once = false;
              slotRefreshReady.resolve();
            }
          }
        });

        // If there are no adpositions on the page, resolve slotRefreshReady
        if (jQuery.isArray(adpositions) && adpositions.length === 0) {
          slotRefreshReady.resolve();
        }

      });

    });
  },

  setUpGlueAdMetrics: function () {
    var googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];
    googletag.cmd.push(function () {
      window.glue && glue.timer('ad.request', 'Time it takes to fire ad call and get back a rendered ad');
    });

    TWC.Events.getEvent('slotRefreshReady')
      .then(function () {
        window.glue && glue.timer('ad.request').end();
      });
  },

  setUpSevere : function($) {
    // check in cache
    if(this.get("severe")) {
      return;
    }
    // Request severe endpoint from dsx
    var _self = this,
      cacheBuster = TWC.PcoUtils.genRandStr(),
      promise = TWC.PcoUtils.get_dsx_records(["cms/settings/content-mode"]),
      adSeverePromise = $.Deferred();
    this.promises.push(adSeverePromise);
    promise.success(function(data, textStatus, jqXHR) {
      if (data && data.body && data.body.length && data.body.length > 0 &&
        data.body[0].doc.mode === 'severe2') {
        _self.set('severe', "y");
      } else {
        _self.set('severe', "n");
      }
      // cache it.
      if (data && data.body && data.body.length && data.body.length > 0) {
        var record = data.body[0];
        if(record.generatedTime && record.cacheMaxSeconds && record.currentTime) {
          var remainingTime = (record.cacheMaxSeconds - (record.currentTime - record.generatedTime));
          if(remainingTime && remainingTime < 0) {
            // cache for 5 mins. Probably, DSX has gone crazy again.
            remainingTime = 300;
          }
          _self.set('expirationTime', (new Date().getTime()) + (remainingTime * 1000));
        }
      }
      adSeverePromise.resolve();
    });
    promise.error(function() {
      adSeverePromise.resolve();
    });
  },

  /** setUpUGC passes the collection for Tealium to use in a lookup table to
   *  determine the cat, fam, ch for ads
   */
  setUpUGC : function() {
    var pageUrl = window.location.href,
      ugcMatch = pageUrl.match(/photos\/collection(.*)/);
    if (ugcMatch && ugcMatch.length && ugcMatch.length > 1) {
      this.set('ugcLookup',ugcMatch[1])
    }
  },

  /** setAdsTestCookie gets the adstest cookie and places
   *  it in the ad node of pco
   */
  setAdsTestCookie : function($) {
    var adstest = $.cookie('adstest');
    this.set('adstest',adstest);
  },

  /**
   * Overwrite persistAttributes to filter the things that are going into local storage.
   * @param aKey
   */
  persistAttributes : function(aKey) {
    if(this.isPersisted && (aKey === "severe" || aKey === "expirationTime")) {
      TWC.LocalStorage.persistValue(this.getPersistKey(), {
        severe : this.attributes["severe"],
        expirationTime : this.attributes["expirationTime"]
      });
    }
  },

  /**
   * Set Impression ID using PcoUtils.generateUUID
   */
  setAdImpressionObj : function($, arguments){
    var impressionObj = {},
        device = arguments.length > 3 ? arguments[3] : {},
        impression_id = TWC.PcoUtils.generateUUID();

    this.set('impression_id', impression_id);

    TWC.Events.ifReady(['drupalSettingsReady','awsReady']).done(function(){
      $.when.apply($, device.promises).done( function() {
        var wxdId = device && device.attributes && device.attributes.OpenDDRId,
          page_id = window.location.pathname !== "/" && window.location.pathname || $('meta[name="pagecode"]').attr("value"),
          modules = Drupal && Drupal.settings && Drupal.settings.twc && Drupal.settings.twc.modules,
          p, context = [];

        for (p in modules) {
          //var obj = {};
          //obj[p] = $.isArray(modules[p]) && modules[p].length;
          //context.push(obj);
          context.push(p);
        }
        impressionObj.eventType = "ImpressionBeacon";
        impressionObj.eventData = [{
          impressionId: impression_id,
          pageId: page_id,
          context: context
        }];
        impressionObj.platform = "web";
        impressionObj.version = 1;
        impressionObj.wxdId = wxdId;

        AWS.config.update({
          region: 'us-east-1',
          accessKeyId: TWC.AWS.aws_bk_ai,
          secretAccessKey: TWC.AWS.aws_tk_ai
        });
        var SQS = new AWS.SQS();

        var params = {
          MessageBody: JSON.stringify(impressionObj), /* required */
          QueueUrl: TWC.AWS.sqs_url_prefix + TWC.AWS.aws_acct + '/' + TWC.AWS.aws_queue_ai,
          DelaySeconds: 0
        };
        SQS.sendMessage(params, function (err, data) {
          //if (err) console.log(err, err.stack);
          //else     console.log(data);           // successful response
        });
      });

    });
  }
});
;
/**
 * Created with JetBrains PhpStorm.
 * User: ssherwood
 * Date: 12/18/13
 * Time: 11:41 AM
 * To change this template use File | Settings | File Templates.
 */
TWC.Metrics = TWC.Node.createSubClass({
  // just set the basic attributes.
  init : function( $, arguments ) {
    this.nodeName = "metrics";
  },

  // Execute the business logic one by one.
  process : function( $, arguments ) {
    this.setUpMetrics($, arguments);
    this.setPageId($, arguments);
  },

  // Set up metrics node
  setUpMetrics : function( $, arguments ) {
    var attrVal = $('[name=metrics_levels]').attr('value'),
        metricLevels = attrVal ? attrVal.split("/") : null,
        pagecode = $('[name=pagecode]').attr('value'),
        that = this,
        settingsPromise = $.Deferred();

    if( $.isEmptyObject( this.attributes ) ){
      this.set("pagename", pagecode);
      if(metricLevels) {
        this.set("level1", metricLevels[0]);
        this.set("level2", metricLevels[1]);
        this.set("level3", metricLevels[2]);
        this.set("level4", metricLevels[3]);
      }
      this.set("contentFamily", this.get("level1") + "-" + this.get("level2"));
      this.set("contentChannel",this.get("contentFamily") + "-" + this.get("level3"));
      this.set("contentSection",this.get("contentChannel") + "-" + this.get("level4"));
    }

    TWC.Events.ifReady(['drupalSettingsReady']).done(function(){

      var twcsettings = Drupal.settings && Drupal.settings.twc || null,
          meta = twcsettings && twcsettings.meta || null,
          modules = twcsettings && twcsettings.modules || null,
          context = [];

      if(meta){
        // Add meta data for articles
        that.set("meta", meta);
      }

      settingsPromise.resolve();
      TWC.PcoUtils.setTiming('metricsResolved', (new Date()).getTime());

    });

    // Do we really need meta for PCO? Angular will definitely get it.
    // Commenting this for now to enable it later.
    this.promises.push(settingsPromise);

  },

  setPageId : function($,arguments) {
    var pageRef = arguments && arguments.length > 1 &&  arguments[1],
        pathName = pageRef && pageRef.get("pathname") || "";
        page_id = this.get("pagename") + "/" + pathName;
    this.set("page_id", page_id);
  }
});
;
/**
 * Author: ksankaran (Velu)
 * Date: 1/6/14
 * Time: 3:03 PM
 * Comments: A log node for PCO. There are two sub-attributes which hold the
 */

TWC.Log = TWC.Node.createSubClass((function() {
  // Private methods and variables
  var mem_log = {
    error: {
      logs          : [],
      size          : 1000,
      limitExceeded : false
    },
    debug: {
      logs          : [],
      size          : 1000,
      limitExceeded : false
    }
  };

  /**
   * Actual method to store the logs in memory. Its private for a reason.
   *
   * @param attr - name of the attribute or sub-type of the log.
   * @param pArguments - Actual logs to be stored.
   */
  function pushToMemory( attr, pArguments ) {
    var memNode = mem_log[attr];
    if(pArguments && pArguments.length > 0 && memNode && !memNode.limitExceeded) {
      memNode.logs.push( Array.prototype.slice.call(pArguments, 0) );
    }

    if(memNode.logs.length === memNode.size && !memNode.limitExceeded) {
      memNode.limitExceeded = true;
      memNode.logs.push( ["Memory limit reached. Logging will be stopped."] );
    }
  }

  return {
    // init method setting up basic properties.
    init : function( $, arguments ) {
      this.nodeName       = "twclog";
      this.restrictExtend = true;
    },

    // Fire up the only available logic in process.
    process : function( $ ) {
      //nothing now. but hopefully gets filled later.
    },

    debug : function() {
      pushToMemory( 'debug', arguments );
    },

    error : function() {
      pushToMemory( 'error', arguments );
    },

    print : function( attr ) {
      var attrValue = (attr ? mem_log[attr].logs : null);
      if(attrValue && jQuery.isArray(attrValue)) {
        jQuery.each(attrValue, function(idx, val) {
          if('log' in console) {
            if(typeof console.log == "object") {
              console.log([attr.toUpperCase() + ": "].concat(val));
            }
            else {
              console.log.apply(console, [attr.toUpperCase() + ": "].concat(val));
            }
          }
        });
      }
    }
  }
})());;
/**
 * Author: ksankaran (Velu)
 * Date: 3/17/14
 * Time: 12:30 PM
 * Comments: Performance node. It will be the center for all performance related logs.
 */

TWC.Performance = TWC.Node.createSubClass((function() {
  // Private methods and variables
  var metrics = [];

  /**
   * Actual method to store the logs in memory. Its private for a reason.
   *
   * @param perfObj - object containing performance stats.
   */
  function pushToMemory( perfObj ) {
    if(metrics.length <= 1000) {
      metrics.push( perfObj );
    }
  }

  return {
    // init method setting up basic properties.
    init : function( $, arguments ) {
      this.nodeName       = "performance";
      this.restrictExtend = true;
    },

    // Fire up the only available logic in process.
    process : function( $ ) {
      //nothing now. but hopefully gets filled later.
    },

    // v0.1 structure.
    log : function(type, operation, comment) {
      pushToMemory({
        type      : type,
        operation : operation,
        comment   : comment,
        timing    : (new Date()).getTime()
      });
    },

    /**
     * Helper method for logging DSX calls
     * @param recordUrl
     * @param isCached
     * @param timeTaken
     */
    log_dsx_call : function(recordUrl, isCached, timeTaken) {
      this.log("DSX_CALL", recordUrl, ((isCached) ? "CACHED" : "NETWORK") + (timeTaken ? (" (completed in "+timeTaken+"secs)") : ""));
    },

    /**
     * Helper method to print formatted string from object
     * @param metric
     * @returns {string}
     */
    format : function(metric) {
      return metric.type + " : " + metric.operation + " : " +  metric.comment + " (SNAPSHOT TIME:" + metric.timing + ")";
    },

    /**
     * Print all or filtered metric data.
     * @param key
     */
    print : function( key ) {
      var metricsToDisplay = (key ? jQuery.filter(metrics, function(metric) { return metric.type === key; }) : metrics), _self = this;
      if(metricsToDisplay && metricsToDisplay.length > 0) {
        jQuery.each(metricsToDisplay, function(idx, metric) {
          if('log' in console) {
            console.log(_self.format(metric));
          }
        });
      }
    },

    getAll : function( key ) {
      return metrics.slice(0);
    }
  }
})());;
TWC.Glue = TWC.Node.createSubClass((function() {

  var metrics = {
    timers: {},
    counters: {},
    gauges: {}
    };
  var twcRelease = {
    appName: 'web',
    appVersion: 'Web Release not found in release.json',
    svcCommit: 'Tag: not found in release.json'
  };

  function printMetric(metricName, obj) {
    var statement = '';
    Object.keys(obj).map(function (key) {
      var val = obj[key];
      if (!(typeof val === 'string' || typeof val === 'number' )) {
        val = val.result;
      }

      if (!val) {
        return;
      }

      statement = statement + key + ': ' + val + '; ';
    });
    console.log('GLUE', metricName, '-', statement);
  }

  function getTwcReleaseInfo(){
    var releaseJsonUrl = "/release.json",
        $ = jQuery;

    $.getJSON( releaseJsonUrl, function (data) {
      data = data || {};
      twcRelease.appVersion = data.release || twcRelease.appVersion;
      twcRelease.svcCommit = data.tag || twcRelease.svcCommit;
    });
  }

  function throwBeacon(_this) {

      TWC.Events.ifReady(['glueReady', 'awsReady', 'slotRefreshReady']).done(function () {
        AWS.config.update({
          region: 'us-east-1',
          accessKeyId: TWC.AWS.aws_bk_glue,
          secretAccessKey: TWC.AWS.aws_tk_glue
        });

        var SQS = new AWS.SQS();
        var queueUrl = TWC.AWS.sqs_url_prefix;
        var awsAccount = TWC.AWS.aws_acct;
        var queueName = TWC.AWS.aws_queue_glue;
        var num = Math.floor(Math.random() * 1000) + 1;
        var glue_beacon_percentage = _this.get('percentage') * 10;


        var data = {
          MessageBody: transformGlueMetrics(metrics),
          QueueUrl: queueUrl + awsAccount + '/' + queueName,
          DelaySeconds: 0
        };

        // if number is greater than or equal to 1000 - glue_beacon_percentage,
        // fire beacon
        if (num >= (1000 - glue_beacon_percentage)) {
          SQS.sendMessage(data, function (err, data) {
            console.log(data);
          });
        }
      });
  }

  function transformGlueMetrics(metrics) {
    var gnv = TWC.pco.getNodeValue;
    var endDateTime = new Date().getTime();
    var request = {
      nameSpace: 'com.weather',
      startDateTime: new Date(window.windowRenderStartTime),
      endDateTime: new Date(endDateTime),
      startEpochSec: window.windowRenderStartTime,
      locale: gnv('page','locale'),
      endEpochSec: endDateTime,
      os: {
        platform: gnv('device', 'browserOS'),
      },
      browser: {
        name: gnv('device', 'browserName')
      },
      twcRelease: twcRelease,
      currentLocation: {
        timezoneOffset: gnv('user', 'currentLocation').gmtDiff,
        coords: {
          lat: gnv('user', 'currentLocation').lat,
          lon: gnv('user', 'currentLocation').long
        }
      },
      placeNames: {
        city: gnv('user', 'currentLocation').cityNm,
        state: gnv('user', 'currentLocation').stCd,
        country: gnv('user', 'currentLocation').cntryCd
      },
      metrics: {
        timers: [],
        counters: [],
        gauges: []
      }
    };

    Object.keys(metrics.timers).forEach(function (timerKey) {
      if (!metrics.timers[timerKey].result) {
        return;
      }

      request.metrics.timers.push({
        name: timerKey,
        startEpochSec: metrics.timers[timerKey].startTime,
        endEpochSec: metrics.timers[timerKey].endTime,
        duration: metrics.timers[timerKey].result
      });
    });

    Object.keys(metrics.gauges).forEach(function (gaugeKey) {
      request.metrics.gauges.push({
        name: gaugeKey,
        epoch: metrics.gauges[gaugeKey].epoch,
        val: metrics.gauges[gaugeKey].val,
        units: metrics.gauges[gaugeKey].units
      });
    });

    return JSON.stringify(request) ;
  }

  return {
    init : function() {
      this.nodeName = 'glue';
      this.restrictExtend = true;
    },
    process : function() {
      var _this = this;
      getTwcReleaseInfo();
      if ((navigator.userAgent.match(/iPhone/) && navigator.userAgent.match(/Safari/)) ||
           navigator.userAgent.match(/Android/i)) {
        jQuery(window).load(function(){
          throwBeacon(_this);
        });
      } else {
        window.addEventListener('beforeunload', function(){
          throwBeacon(_this);
        });
      }
    },
    timer: function (name, description, startTime) {
      var _name = name;

      metrics.timers[_name] = metrics.timers[_name] || {};
      metrics.timers[_name].description = metrics.timers[_name].description || description || '';
      metrics.timers[_name].startTime = metrics.timers[_name].startTime || startTime || new Date().getTime();

      return {
        start: function () {
          metrics.timers[_name].startTime = new Date().getTime();
        },
        end: function () {
          metrics.timers[_name].endTime = new Date().getTime();
          metrics.timers[_name].result = metrics.timers[_name].endTime - metrics.timers[_name].startTime;
        },
        result: function () {
          return metrics.timers[_name].result;
        }
      };
    },
    counter: function (name, amount) {
      var _name = name;

      if (!metrics.counters[_name]) {
        metrics.counters[_name] = amount || 0;
      }

      return {
        inc: function () {
          metrics.counters[_name]++;
        }
      };
    },
    gauge: function (name, val, units) {
      metrics.gauges[name] = metrics.gauges[name] || {};
      metrics.gauges[name].epoch = metrics.gauges[name].epoch || new Date().getTime();
      metrics.gauges[name].val = metrics.gauges[name].val || 0;
      metrics.gauges[name].units = metrics.gauges[name].units || units;
      metrics.gauges[name].result = metrics.gauges[name].val + ' ' + metrics.gauges[name].units;
    },
    summary: function () {
      Object.keys(metrics).forEach(function (metricKey) {
        printMetric(metricKey, metrics[metricKey]);
      });
    }
  };

})());
;
// AWS SDK for JavaScript v2.1.16
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// License at https://sdk.amazonaws.com/js/BUNDLE_LICENSE.txt

TWC.Events.getEvent('pcoReady').done(function(){

  var gnv = TWC.pco && TWC.pco.getNodeValue;
if (!(gnv('device','browserName') === 'Internet Explorer' && (gnv('device','browserVer').substr(0,1) == 8 || gnv('device','browserVer').substr(0,1) == 9))) {
!function e(t,r,n){function i(a,s){if(!r[a]){if(!t[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);throw new Error("Cannot find module '"+a+"'")}var c=r[a]={exports:{}};t[a][0].call(c.exports,function(e){var r=t[a][1][e];return i(r?r:e)},c,c.exports,e,t,r,n)}return r[a].exports}for(var o="function"==typeof require&&require,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(e,t){var r=e("./core");r.apiLoader=function(e,t){return r.apiLoader.services[e][t]},r.apiLoader.services={},r.XML.Parser=e("./xml/browser_parser"),e("./http/xhr"),"undefined"!=typeof window&&(window.AWS=r),"undefined"!=typeof t&&(t.exports=r),r.apiLoader.services.cloudwatch={},r.CloudWatch=r.Service.defineService("cloudwatch",["2010-08-01"]),r.apiLoader.services.cloudwatch["2010-08-01"]={metadata:{apiVersion:"2010-08-01",endpointPrefix:"monitoring",serviceAbbreviation:"CloudWatch",serviceFullName:"Amazon CloudWatch",signatureVersion:"v4",xmlNamespace:"http://monitoring.amazonaws.com/doc/2010-08-01/",protocol:"query"},operations:{DeleteAlarms:{input:{type:"structure",required:["AlarmNames"],members:{AlarmNames:{shape:"S2"}}},http:{}},DescribeAlarmHistory:{input:{type:"structure",members:{AlarmName:{},HistoryItemType:{},StartDate:{type:"timestamp"},EndDate:{type:"timestamp"},MaxRecords:{type:"integer"},NextToken:{}}},output:{resultWrapper:"DescribeAlarmHistoryResult",type:"structure",members:{AlarmHistoryItems:{type:"list",member:{type:"structure",members:{AlarmName:{},Timestamp:{type:"timestamp"},HistoryItemType:{},HistorySummary:{},HistoryData:{}}}},NextToken:{}}},http:{}},DescribeAlarms:{input:{type:"structure",members:{AlarmNames:{shape:"S2"},AlarmNamePrefix:{},StateValue:{},ActionPrefix:{},MaxRecords:{type:"integer"},NextToken:{}}},output:{resultWrapper:"DescribeAlarmsResult",type:"structure",members:{MetricAlarms:{shape:"Sj"},NextToken:{}}},http:{}},DescribeAlarmsForMetric:{input:{type:"structure",required:["MetricName","Namespace"],members:{MetricName:{},Namespace:{},Statistic:{},Dimensions:{shape:"Sv"},Period:{type:"integer"},Unit:{}}},output:{resultWrapper:"DescribeAlarmsForMetricResult",type:"structure",members:{MetricAlarms:{shape:"Sj"}}},http:{}},DisableAlarmActions:{input:{type:"structure",required:["AlarmNames"],members:{AlarmNames:{shape:"S2"}}},http:{}},EnableAlarmActions:{input:{type:"structure",required:["AlarmNames"],members:{AlarmNames:{shape:"S2"}}},http:{}},GetMetricStatistics:{input:{type:"structure",required:["Namespace","MetricName","StartTime","EndTime","Period","Statistics"],members:{Namespace:{},MetricName:{},Dimensions:{shape:"Sv"},StartTime:{type:"timestamp"},EndTime:{type:"timestamp"},Period:{type:"integer"},Statistics:{type:"list",member:{}},Unit:{}}},output:{resultWrapper:"GetMetricStatisticsResult",type:"structure",members:{Label:{},Datapoints:{type:"list",member:{type:"structure",members:{Timestamp:{type:"timestamp"},SampleCount:{type:"double"},Average:{type:"double"},Sum:{type:"double"},Minimum:{type:"double"},Maximum:{type:"double"},Unit:{}},xmlOrder:["Timestamp","SampleCount","Average","Sum","Minimum","Maximum","Unit"]}}}},http:{}},ListMetrics:{input:{type:"structure",members:{Namespace:{},MetricName:{},Dimensions:{type:"list",member:{type:"structure",required:["Name"],members:{Name:{},Value:{}}}},NextToken:{}}},output:{xmlOrder:["Metrics","NextToken"],resultWrapper:"ListMetricsResult",type:"structure",members:{Metrics:{type:"list",member:{type:"structure",members:{Namespace:{},MetricName:{},Dimensions:{shape:"Sv"}},xmlOrder:["Namespace","MetricName","Dimensions"]}},NextToken:{}}},http:{}},PutMetricAlarm:{input:{type:"structure",required:["AlarmName","MetricName","Namespace","Statistic","Period","EvaluationPeriods","Threshold","ComparisonOperator"],members:{AlarmName:{},AlarmDescription:{},ActionsEnabled:{type:"boolean"},OKActions:{shape:"So"},AlarmActions:{shape:"So"},InsufficientDataActions:{shape:"So"},MetricName:{},Namespace:{},Statistic:{},Dimensions:{shape:"Sv"},Period:{type:"integer"},Unit:{},EvaluationPeriods:{type:"integer"},Threshold:{type:"double"},ComparisonOperator:{}}},http:{}},PutMetricData:{input:{type:"structure",required:["Namespace","MetricData"],members:{Namespace:{},MetricData:{type:"list",member:{type:"structure",required:["MetricName"],members:{MetricName:{},Dimensions:{shape:"Sv"},Timestamp:{type:"timestamp"},Value:{type:"double"},StatisticValues:{type:"structure",required:["SampleCount","Sum","Minimum","Maximum"],members:{SampleCount:{type:"double"},Sum:{type:"double"},Minimum:{type:"double"},Maximum:{type:"double"}}},Unit:{}}}}}},http:{}},SetAlarmState:{input:{type:"structure",required:["AlarmName","StateValue","StateReason"],members:{AlarmName:{},StateValue:{},StateReason:{},StateReasonData:{}}},http:{}}},shapes:{S2:{type:"list",member:{}},Sj:{type:"list",member:{type:"structure",members:{AlarmName:{},AlarmArn:{},AlarmDescription:{},AlarmConfigurationUpdatedTimestamp:{type:"timestamp"},ActionsEnabled:{type:"boolean"},OKActions:{shape:"So"},AlarmActions:{shape:"So"},InsufficientDataActions:{shape:"So"},StateValue:{},StateReason:{},StateReasonData:{},StateUpdatedTimestamp:{type:"timestamp"},MetricName:{},Namespace:{},Statistic:{},Dimensions:{shape:"Sv"},Period:{type:"integer"},Unit:{},EvaluationPeriods:{type:"integer"},Threshold:{type:"double"},ComparisonOperator:{}},xmlOrder:["AlarmName","AlarmArn","AlarmDescription","AlarmConfigurationUpdatedTimestamp","ActionsEnabled","OKActions","AlarmActions","InsufficientDataActions","StateValue","StateReason","StateReasonData","StateUpdatedTimestamp","MetricName","Namespace","Statistic","Dimensions","Period","Unit","EvaluationPeriods","Threshold","ComparisonOperator"]}},So:{type:"list",member:{}},Sv:{type:"list",member:{type:"structure",required:["Name","Value"],members:{Name:{},Value:{}},xmlOrder:["Name","Value"]}}},paginators:{DescribeAlarmHistory:{input_token:"NextToken",output_token:"NextToken",limit_key:"MaxRecords",result_key:"AlarmHistoryItems"},DescribeAlarms:{input_token:"NextToken",output_token:"NextToken",limit_key:"MaxRecords",result_key:"MetricAlarms"},DescribeAlarmsForMetric:{result_key:"MetricAlarms"},ListMetrics:{input_token:"NextToken",output_token:"NextToken",result_key:"Metrics"}}},r.apiLoader.services.cognitoidentity={},r.CognitoIdentity=r.Service.defineService("cognitoidentity",["2014-06-30"]),e("./services/cognitoidentity"),r.apiLoader.services.cognitoidentity["2014-06-30"]={metadata:{apiVersion:"2014-06-30",endpointPrefix:"cognito-identity",jsonVersion:"1.1",serviceFullName:"Amazon Cognito Identity",signatureVersion:"v4",targetPrefix:"AWSCognitoIdentityService",protocol:"json"},operations:{CreateIdentityPool:{input:{type:"structure",required:["IdentityPoolName","AllowUnauthenticatedIdentities"],members:{IdentityPoolName:{},AllowUnauthenticatedIdentities:{type:"boolean"},SupportedLoginProviders:{shape:"S4"},DeveloperProviderName:{},OpenIdConnectProviderARNs:{shape:"S8"}}},output:{shape:"Sa"},http:{}},DeleteIdentityPool:{input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{}}},http:{}},DescribeIdentity:{input:{type:"structure",required:["IdentityId"],members:{IdentityId:{}}},output:{shape:"Sf"},http:{}},DescribeIdentityPool:{input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{}}},output:{shape:"Sa"},http:{}},GetCredentialsForIdentity:{input:{type:"structure",required:["IdentityId"],members:{IdentityId:{},Logins:{shape:"Sk"}}},output:{type:"structure",members:{IdentityId:{},Credentials:{type:"structure",members:{AccessKeyId:{},SecretKey:{},SessionToken:{},Expiration:{type:"timestamp"}}}}},http:{}},GetId:{input:{type:"structure",required:["IdentityPoolId"],members:{AccountId:{},IdentityPoolId:{},Logins:{shape:"Sk"}}},output:{type:"structure",members:{IdentityId:{}}},http:{}},GetIdentityPoolRoles:{input:{type:"structure",members:{IdentityPoolId:{}}},output:{type:"structure",members:{IdentityPoolId:{},Roles:{shape:"Sw"}}},http:{}},GetOpenIdToken:{input:{type:"structure",required:["IdentityId"],members:{IdentityId:{},Logins:{shape:"Sk"}}},output:{type:"structure",members:{IdentityId:{},Token:{}}},http:{}},GetOpenIdTokenForDeveloperIdentity:{input:{type:"structure",required:["IdentityPoolId","Logins"],members:{IdentityPoolId:{},IdentityId:{},Logins:{shape:"Sk"},TokenDuration:{type:"long"}}},output:{type:"structure",members:{IdentityId:{},Token:{}}},http:{}},ListIdentities:{input:{type:"structure",required:["IdentityPoolId","MaxResults"],members:{IdentityPoolId:{},MaxResults:{type:"integer"},NextToken:{}}},output:{type:"structure",members:{IdentityPoolId:{},Identities:{type:"list",member:{shape:"Sf"}},NextToken:{}}},http:{}},ListIdentityPools:{input:{type:"structure",required:["MaxResults"],members:{MaxResults:{type:"integer"},NextToken:{}}},output:{type:"structure",members:{IdentityPools:{type:"list",member:{type:"structure",members:{IdentityPoolId:{},IdentityPoolName:{}}}},NextToken:{}}},http:{}},LookupDeveloperIdentity:{input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{},IdentityId:{},DeveloperUserIdentifier:{},MaxResults:{type:"integer"},NextToken:{}}},output:{type:"structure",members:{IdentityId:{},DeveloperUserIdentifierList:{type:"list",member:{}},NextToken:{}}},http:{}},MergeDeveloperIdentities:{input:{type:"structure",required:["SourceUserIdentifier","DestinationUserIdentifier","DeveloperProviderName","IdentityPoolId"],members:{SourceUserIdentifier:{},DestinationUserIdentifier:{},DeveloperProviderName:{},IdentityPoolId:{}}},output:{type:"structure",members:{IdentityId:{}}},http:{}},SetIdentityPoolRoles:{input:{type:"structure",required:["IdentityPoolId","Roles"],members:{IdentityPoolId:{},Roles:{shape:"Sw"}}},http:{}},UnlinkDeveloperIdentity:{input:{type:"structure",required:["IdentityId","IdentityPoolId","DeveloperProviderName","DeveloperUserIdentifier"],members:{IdentityId:{},IdentityPoolId:{},DeveloperProviderName:{},DeveloperUserIdentifier:{}}},http:{}},UnlinkIdentity:{input:{type:"structure",required:["IdentityId","Logins","LoginsToRemove"],members:{IdentityId:{},Logins:{shape:"Sk"},LoginsToRemove:{shape:"Sg"}}},http:{}},UpdateIdentityPool:{input:{shape:"Sa"},output:{shape:"Sa"},http:{}}},shapes:{S4:{type:"map",key:{},value:{}},S8:{type:"list",member:{}},Sa:{type:"structure",required:["IdentityPoolId","IdentityPoolName","AllowUnauthenticatedIdentities"],members:{IdentityPoolId:{},IdentityPoolName:{},AllowUnauthenticatedIdentities:{type:"boolean"},SupportedLoginProviders:{shape:"S4"},DeveloperProviderName:{},OpenIdConnectProviderARNs:{shape:"S8"}}},Sf:{type:"structure",members:{IdentityId:{},Logins:{shape:"Sg"},CreationDate:{type:"timestamp"},LastModifiedDate:{type:"timestamp"}}},Sg:{type:"list",member:{}},Sk:{type:"map",key:{},value:{}},Sw:{type:"map",key:{},value:{}}}},r.apiLoader.services.cognitosync={},r.CognitoSync=r.Service.defineService("cognitosync",["2014-06-30"]),r.apiLoader.services.cognitosync["2014-06-30"]={version:"2.0",metadata:{apiVersion:"2014-06-30",endpointPrefix:"cognito-sync",jsonVersion:"1.1",serviceFullName:"Amazon Cognito Sync",signatureVersion:"v4",protocol:"rest-json"},operations:{BulkPublish:{http:{requestUri:"/identitypools/{IdentityPoolId}/bulkpublish",responseCode:200},input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"}}},output:{type:"structure",members:{IdentityPoolId:{}}}},DeleteDataset:{http:{method:"DELETE",requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId","DatasetName"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},DatasetName:{location:"uri",locationName:"DatasetName"}}},output:{type:"structure",members:{Dataset:{shape:"S8"}}}},DescribeDataset:{http:{method:"GET",requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId","DatasetName"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},DatasetName:{location:"uri",locationName:"DatasetName"}}},output:{type:"structure",members:{Dataset:{shape:"S8"}}}},DescribeIdentityPoolUsage:{http:{method:"GET",requestUri:"/identitypools/{IdentityPoolId}",responseCode:200},input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"}}},output:{type:"structure",members:{IdentityPoolUsage:{shape:"Sg"}}}},DescribeIdentityUsage:{http:{method:"GET",requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"}}},output:{type:"structure",members:{IdentityUsage:{type:"structure",members:{IdentityId:{},IdentityPoolId:{},LastModifiedDate:{type:"timestamp"},DatasetCount:{type:"integer"},DataStorage:{type:"long"}}}}}},GetBulkPublishDetails:{http:{requestUri:"/identitypools/{IdentityPoolId}/getBulkPublishDetails",responseCode:200},input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"}}},output:{type:"structure",members:{IdentityPoolId:{},BulkPublishStartTime:{type:"timestamp"},BulkPublishCompleteTime:{type:"timestamp"},BulkPublishStatus:{},FailureMessage:{}}}},GetIdentityPoolConfiguration:{http:{method:"GET",requestUri:"/identitypools/{IdentityPoolId}/configuration",responseCode:200},input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"}}},output:{type:"structure",members:{IdentityPoolId:{},PushSync:{shape:"Sq"},CognitoStreams:{shape:"Su"}}}},ListDatasets:{http:{method:"GET",requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets",responseCode:200},input:{type:"structure",required:["IdentityId","IdentityPoolId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},NextToken:{location:"querystring",locationName:"nextToken"},MaxResults:{location:"querystring",locationName:"maxResults",type:"integer"}}},output:{type:"structure",members:{Datasets:{type:"list",member:{shape:"S8"}},Count:{type:"integer"},NextToken:{}}}},ListIdentityPoolUsage:{http:{method:"GET",requestUri:"/identitypools",responseCode:200},input:{type:"structure",members:{NextToken:{location:"querystring",locationName:"nextToken"},MaxResults:{location:"querystring",locationName:"maxResults",type:"integer"}}},output:{type:"structure",members:{IdentityPoolUsages:{type:"list",member:{shape:"Sg"}},MaxResults:{type:"integer"},Count:{type:"integer"},NextToken:{}}}},ListRecords:{http:{method:"GET",requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/records",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId","DatasetName"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},DatasetName:{location:"uri",locationName:"DatasetName"},LastSyncCount:{location:"querystring",locationName:"lastSyncCount",type:"long"},NextToken:{location:"querystring",locationName:"nextToken"},MaxResults:{location:"querystring",locationName:"maxResults",type:"integer"},SyncSessionToken:{location:"querystring",locationName:"syncSessionToken"}}},output:{type:"structure",members:{Records:{shape:"S17"},NextToken:{},Count:{type:"integer"},DatasetSyncCount:{type:"long"},LastModifiedBy:{},MergedDatasetNames:{type:"list",member:{}},DatasetExists:{type:"boolean"},DatasetDeletedAfterRequestedSyncCount:{type:"boolean"},SyncSessionToken:{}}}},RegisterDevice:{http:{requestUri:"/identitypools/{IdentityPoolId}/identity/{IdentityId}/device",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId","Platform","Token"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},Platform:{},Token:{}}},output:{type:"structure",members:{DeviceId:{}}}},SetIdentityPoolConfiguration:{http:{requestUri:"/identitypools/{IdentityPoolId}/configuration",responseCode:200},input:{type:"structure",required:["IdentityPoolId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},PushSync:{shape:"Sq"},CognitoStreams:{shape:"Su"}}},output:{type:"structure",members:{IdentityPoolId:{},PushSync:{shape:"Sq"},CognitoStreams:{shape:"Su"}}}},SubscribeToDataset:{http:{requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/subscriptions/{DeviceId}",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId","DatasetName","DeviceId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},DatasetName:{location:"uri",locationName:"DatasetName"},DeviceId:{location:"uri",locationName:"DeviceId"}}},output:{type:"structure",members:{}}},UnsubscribeFromDataset:{http:{method:"DELETE",requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}/subscriptions/{DeviceId}",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId","DatasetName","DeviceId"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},DatasetName:{location:"uri",locationName:"DatasetName"},DeviceId:{location:"uri",locationName:"DeviceId"}}},output:{type:"structure",members:{}}},UpdateRecords:{http:{requestUri:"/identitypools/{IdentityPoolId}/identities/{IdentityId}/datasets/{DatasetName}",responseCode:200},input:{type:"structure",required:["IdentityPoolId","IdentityId","DatasetName","SyncSessionToken"],members:{IdentityPoolId:{location:"uri",locationName:"IdentityPoolId"},IdentityId:{location:"uri",locationName:"IdentityId"},DatasetName:{location:"uri",locationName:"DatasetName"},DeviceId:{},RecordPatches:{type:"list",member:{type:"structure",required:["Op","Key","SyncCount"],members:{Op:{},Key:{},Value:{},SyncCount:{type:"long"},DeviceLastModifiedDate:{type:"timestamp"}}}},SyncSessionToken:{},ClientContext:{location:"header",locationName:"x-amz-Client-Context"}}},output:{type:"structure",members:{Records:{shape:"S17"}}}}},shapes:{S8:{type:"structure",members:{IdentityId:{},DatasetName:{},CreationDate:{type:"timestamp"},LastModifiedDate:{type:"timestamp"},LastModifiedBy:{},DataStorage:{type:"long"},NumRecords:{type:"long"}}},Sg:{type:"structure",members:{IdentityPoolId:{},SyncSessionsCount:{type:"long"},DataStorage:{type:"long"},LastModifiedDate:{type:"timestamp"}}},Sq:{type:"structure",members:{ApplicationArns:{type:"list",member:{}},RoleArn:{}}},Su:{type:"structure",members:{StreamName:{},RoleArn:{},StreamingStatus:{}}},S17:{type:"list",member:{type:"structure",members:{Key:{},Value:{},SyncCount:{type:"long"},LastModifiedDate:{type:"timestamp"},LastModifiedBy:{},DeviceLastModifiedDate:{type:"timestamp"}}}}}},r.apiLoader.services.dynamodb={},r.DynamoDB=r.Service.defineService("dynamodb",["2011-12-05","2012-08-10"]),e("./services/dynamodb"),r.apiLoader.services.dynamodb["2012-08-10"]={metadata:{apiVersion:"2012-08-10",endpointPrefix:"dynamodb",jsonVersion:"1.0",serviceAbbreviation:"DynamoDB",serviceFullName:"Amazon DynamoDB",signatureVersion:"v4",targetPrefix:"DynamoDB_20120810",protocol:"json"},operations:{BatchGetItem:{input:{type:"structure",required:["RequestItems"],members:{RequestItems:{shape:"S2"},ReturnConsumedCapacity:{}}},output:{type:"structure",members:{Responses:{type:"map",key:{},value:{shape:"Sr"}},UnprocessedKeys:{shape:"S2"},ConsumedCapacity:{shape:"St"}}},http:{}},BatchWriteItem:{input:{type:"structure",required:["RequestItems"],members:{RequestItems:{shape:"S10"},ReturnConsumedCapacity:{},ReturnItemCollectionMetrics:{}}},output:{type:"structure",members:{UnprocessedItems:{shape:"S10"},ItemCollectionMetrics:{type:"map",key:{},value:{type:"list",member:{shape:"S1a"}}},ConsumedCapacity:{shape:"St"}}},http:{}},CreateTable:{input:{type:"structure",required:["AttributeDefinitions","TableName","KeySchema","ProvisionedThroughput"],members:{AttributeDefinitions:{shape:"S1f"},TableName:{},KeySchema:{shape:"S1j"},LocalSecondaryIndexes:{type:"list",member:{type:"structure",required:["IndexName","KeySchema","Projection"],members:{IndexName:{},KeySchema:{shape:"S1j"},Projection:{shape:"S1o"}}}},GlobalSecondaryIndexes:{type:"list",member:{type:"structure",required:["IndexName","KeySchema","Projection","ProvisionedThroughput"],members:{IndexName:{},KeySchema:{shape:"S1j"},Projection:{shape:"S1o"},ProvisionedThroughput:{shape:"S1u"}}}},ProvisionedThroughput:{shape:"S1u"}}},output:{type:"structure",members:{TableDescription:{shape:"S1x"}}},http:{}},DeleteItem:{input:{type:"structure",required:["TableName","Key"],members:{TableName:{},Key:{shape:"S6"},Expected:{shape:"S29"},ConditionalOperator:{},ReturnValues:{},ReturnConsumedCapacity:{},ReturnItemCollectionMetrics:{},ConditionExpression:{},ExpressionAttributeNames:{shape:"Sm"},ExpressionAttributeValues:{shape:"S2h"}}},output:{type:"structure",members:{Attributes:{shape:"Ss"},ConsumedCapacity:{shape:"Su"},ItemCollectionMetrics:{shape:"S1a"}}},http:{}},DeleteTable:{input:{type:"structure",required:["TableName"],members:{TableName:{}}},output:{type:"structure",members:{TableDescription:{shape:"S1x"}}},http:{}},DescribeTable:{input:{type:"structure",required:["TableName"],members:{TableName:{}}},output:{type:"structure",members:{Table:{shape:"S1x"}}},http:{}},GetItem:{input:{type:"structure",required:["TableName","Key"],members:{TableName:{},Key:{shape:"S6"},AttributesToGet:{shape:"Sj"},ConsistentRead:{type:"boolean"},ReturnConsumedCapacity:{},ProjectionExpression:{},ExpressionAttributeNames:{shape:"Sm"}}},output:{type:"structure",members:{Item:{shape:"Ss"},ConsumedCapacity:{shape:"Su"}}},http:{}},ListTables:{input:{type:"structure",members:{ExclusiveStartTableName:{},Limit:{type:"integer"}}},output:{type:"structure",members:{TableNames:{type:"list",member:{}},LastEvaluatedTableName:{}}},http:{}},PutItem:{input:{type:"structure",required:["TableName","Item"],members:{TableName:{},Item:{shape:"S14"},Expected:{shape:"S29"},ReturnValues:{},ReturnConsumedCapacity:{},ReturnItemCollectionMetrics:{},ConditionalOperator:{},ConditionExpression:{},ExpressionAttributeNames:{shape:"Sm"},ExpressionAttributeValues:{shape:"S2h"}}},output:{type:"structure",members:{Attributes:{shape:"Ss"},ConsumedCapacity:{shape:"Su"},ItemCollectionMetrics:{shape:"S1a"}}},http:{}},Query:{input:{type:"structure",required:["TableName","KeyConditions"],members:{TableName:{},IndexName:{},Select:{},AttributesToGet:{shape:"Sj"},Limit:{type:"integer"},ConsistentRead:{type:"boolean"},KeyConditions:{type:"map",key:{},value:{shape:"S30"}},QueryFilter:{shape:"S31"},ConditionalOperator:{},ScanIndexForward:{type:"boolean"},ExclusiveStartKey:{shape:"S6"},ReturnConsumedCapacity:{},ProjectionExpression:{},FilterExpression:{},ExpressionAttributeNames:{shape:"Sm"},ExpressionAttributeValues:{shape:"S2h"}}},output:{type:"structure",members:{Items:{shape:"Sr"},Count:{type:"integer"},ScannedCount:{type:"integer"},LastEvaluatedKey:{shape:"S6"},ConsumedCapacity:{shape:"Su"}}},http:{}},Scan:{input:{type:"structure",required:["TableName"],members:{TableName:{},IndexName:{},AttributesToGet:{shape:"Sj"},Limit:{type:"integer"},Select:{},ScanFilter:{shape:"S31"},ConditionalOperator:{},ExclusiveStartKey:{shape:"S6"},ReturnConsumedCapacity:{},TotalSegments:{type:"integer"},Segment:{type:"integer"},ProjectionExpression:{},FilterExpression:{},ExpressionAttributeNames:{shape:"Sm"},ExpressionAttributeValues:{shape:"S2h"}}},output:{type:"structure",members:{Items:{shape:"Sr"},Count:{type:"integer"},ScannedCount:{type:"integer"},LastEvaluatedKey:{shape:"S6"},ConsumedCapacity:{shape:"Su"}}},http:{}},UpdateItem:{input:{type:"structure",required:["TableName","Key"],members:{TableName:{},Key:{shape:"S6"},AttributeUpdates:{type:"map",key:{},value:{type:"structure",members:{Value:{shape:"S8"},Action:{}}}},Expected:{shape:"S29"},ConditionalOperator:{},ReturnValues:{},ReturnConsumedCapacity:{},ReturnItemCollectionMetrics:{},UpdateExpression:{},ConditionExpression:{},ExpressionAttributeNames:{shape:"Sm"},ExpressionAttributeValues:{shape:"S2h"}}},output:{type:"structure",members:{Attributes:{shape:"Ss"},ConsumedCapacity:{shape:"Su"},ItemCollectionMetrics:{shape:"S1a"}}},http:{}},UpdateTable:{input:{type:"structure",required:["TableName"],members:{AttributeDefinitions:{shape:"S1f"},TableName:{},ProvisionedThroughput:{shape:"S1u"},GlobalSecondaryIndexUpdates:{type:"list",member:{type:"structure",members:{Update:{type:"structure",required:["IndexName","ProvisionedThroughput"],members:{IndexName:{},ProvisionedThroughput:{shape:"S1u"}}},Create:{type:"structure",required:["IndexName","KeySchema","Projection","ProvisionedThroughput"],members:{IndexName:{},KeySchema:{shape:"S1j"},Projection:{shape:"S1o"},ProvisionedThroughput:{shape:"S1u"}}},Delete:{type:"structure",required:["IndexName"],members:{IndexName:{}}}}}}}},output:{type:"structure",members:{TableDescription:{shape:"S1x"}}},http:{}}},shapes:{S2:{type:"map",key:{},value:{type:"structure",required:["Keys"],members:{Keys:{type:"list",member:{shape:"S6"}},AttributesToGet:{shape:"Sj"},ConsistentRead:{type:"boolean"},ProjectionExpression:{},ExpressionAttributeNames:{shape:"Sm"}}}},S6:{type:"map",key:{},value:{shape:"S8"}},S8:{type:"structure",members:{S:{},N:{},B:{type:"blob"},SS:{type:"list",member:{}},NS:{type:"list",member:{}},BS:{type:"list",member:{type:"blob"}},M:{type:"map",key:{},value:{shape:"S8"}},L:{type:"list",member:{shape:"S8"}},NULL:{type:"boolean"},BOOL:{type:"boolean"}}},Sj:{type:"list",member:{}},Sm:{type:"map",key:{},value:{}},Sr:{type:"list",member:{shape:"Ss"}},Ss:{type:"map",key:{},value:{shape:"S8"}},St:{type:"list",member:{shape:"Su"}},Su:{type:"structure",members:{TableName:{},CapacityUnits:{type:"double"},Table:{shape:"Sw"},LocalSecondaryIndexes:{shape:"Sx"},GlobalSecondaryIndexes:{shape:"Sx"}}},Sw:{type:"structure",members:{CapacityUnits:{type:"double"}}},Sx:{type:"map",key:{},value:{shape:"Sw"}},S10:{type:"map",key:{},value:{type:"list",member:{type:"structure",members:{PutRequest:{type:"structure",required:["Item"],members:{Item:{shape:"S14"}}},DeleteRequest:{type:"structure",required:["Key"],members:{Key:{shape:"S6"}}}}}}},S14:{type:"map",key:{},value:{shape:"S8"}},S1a:{type:"structure",members:{ItemCollectionKey:{type:"map",key:{},value:{shape:"S8"}},SizeEstimateRangeGB:{type:"list",member:{type:"double"}}}},S1f:{type:"list",member:{type:"structure",required:["AttributeName","AttributeType"],members:{AttributeName:{},AttributeType:{}}}},S1j:{type:"list",member:{type:"structure",required:["AttributeName","KeyType"],members:{AttributeName:{},KeyType:{}}}},S1o:{type:"structure",members:{ProjectionType:{},NonKeyAttributes:{type:"list",member:{}}}},S1u:{type:"structure",required:["ReadCapacityUnits","WriteCapacityUnits"],members:{ReadCapacityUnits:{type:"long"},WriteCapacityUnits:{type:"long"}}},S1x:{type:"structure",members:{AttributeDefinitions:{shape:"S1f"},TableName:{},KeySchema:{shape:"S1j"},TableStatus:{},CreationDateTime:{type:"timestamp"},ProvisionedThroughput:{shape:"S20"},TableSizeBytes:{type:"long"},ItemCount:{type:"long"},LocalSecondaryIndexes:{type:"list",member:{type:"structure",members:{IndexName:{},KeySchema:{shape:"S1j"},Projection:{shape:"S1o"},IndexSizeBytes:{type:"long"},ItemCount:{type:"long"}}}},GlobalSecondaryIndexes:{type:"list",member:{type:"structure",members:{IndexName:{},KeySchema:{shape:"S1j"},Projection:{shape:"S1o"},IndexStatus:{},Backfilling:{type:"boolean"},ProvisionedThroughput:{shape:"S20"},IndexSizeBytes:{type:"long"},ItemCount:{type:"long"}}}}}},S20:{type:"structure",members:{LastIncreaseDateTime:{type:"timestamp"},LastDecreaseDateTime:{type:"timestamp"},NumberOfDecreasesToday:{type:"long"},ReadCapacityUnits:{type:"long"},WriteCapacityUnits:{type:"long"}}},S29:{type:"map",key:{},value:{type:"structure",members:{Value:{shape:"S8"},Exists:{type:"boolean"},ComparisonOperator:{},AttributeValueList:{shape:"S2d"}}}},S2d:{type:"list",member:{shape:"S8"}},S2h:{type:"map",key:{},value:{shape:"S8"}},S30:{type:"structure",required:["ComparisonOperator"],members:{AttributeValueList:{shape:"S2d"},ComparisonOperator:{}}},S31:{type:"map",key:{},value:{shape:"S30"}}},paginators:{BatchGetItem:{input_token:"RequestItems",output_token:"UnprocessedKeys"},ListTables:{input_token:"ExclusiveStartTableName",output_token:"LastEvaluatedTableName",limit_key:"Limit",result_key:"TableNames"},Query:{input_token:"ExclusiveStartKey",output_token:"LastEvaluatedKey",limit_key:"Limit",result_key:"Items"},Scan:{input_token:"ExclusiveStartKey",output_token:"LastEvaluatedKey",limit_key:"Limit",result_key:"Items"}},waiters:{__default__:{interval:20,max_attempts:25},__TableState:{operation:"DescribeTable"},TableExists:{"extends":"__TableState",ignore_errors:["ResourceNotFoundException"],success_type:"output",success_path:"Table.TableStatus",success_value:"ACTIVE"},TableNotExists:{"extends":"__TableState",success_type:"error",success_value:"ResourceNotFoundException"}}},r.apiLoader.services.elastictranscoder={},r.ElasticTranscoder=r.Service.defineService("elastictranscoder",["2012-09-25"]),r.apiLoader.services.elastictranscoder["2012-09-25"]={version:"2.0",metadata:{apiVersion:"2012-09-25",endpointPrefix:"elastictranscoder",serviceFullName:"Amazon Elastic Transcoder",signatureVersion:"v4",protocol:"rest-json"},operations:{CancelJob:{http:{method:"DELETE",requestUri:"/2012-09-25/jobs/{Id}",responseCode:202},input:{type:"structure",required:["Id"],members:{Id:{location:"uri",locationName:"Id"}}},output:{type:"structure",members:{}}},CreateJob:{http:{requestUri:"/2012-09-25/jobs",responseCode:201},input:{type:"structure",required:["PipelineId","Input"],members:{PipelineId:{},Input:{shape:"S5"},Output:{shape:"Sg"},Outputs:{type:"list",member:{shape:"Sg"}},OutputKeyPrefix:{},Playlists:{type:"list",member:{type:"structure",members:{Name:{},Format:{},OutputKeys:{shape:"S1f"},HlsContentProtection:{shape:"S1g"}}}},UserMetadata:{shape:"S1k"}}},output:{type:"structure",members:{Job:{shape:"S1n"}}}},CreatePipeline:{http:{requestUri:"/2012-09-25/pipelines",responseCode:201},input:{type:"structure",required:["Name","InputBucket","Role"],members:{Name:{},InputBucket:{},OutputBucket:{},Role:{},AwsKmsKeyArn:{},Notifications:{shape:"S20"},ContentConfig:{shape:"S22"},ThumbnailConfig:{shape:"S22"}}},output:{type:"structure",members:{Pipeline:{shape:"S2b"},Warnings:{shape:"S2d"}}}},CreatePreset:{http:{requestUri:"/2012-09-25/presets",responseCode:201},input:{type:"structure",required:["Name","Container"],members:{Name:{},Description:{},Container:{},Video:{shape:"S2h"},Audio:{shape:"S2x"},Thumbnails:{shape:"S34"}}},output:{type:"structure",members:{Preset:{shape:"S38"},Warning:{}}}},DeletePipeline:{http:{method:"DELETE",requestUri:"/2012-09-25/pipelines/{Id}",responseCode:202},input:{type:"structure",required:["Id"],members:{Id:{location:"uri",locationName:"Id"}}},output:{type:"structure",members:{}}},DeletePreset:{http:{method:"DELETE",requestUri:"/2012-09-25/presets/{Id}",responseCode:202},input:{type:"structure",required:["Id"],members:{Id:{location:"uri",locationName:"Id"}}},output:{type:"structure",members:{}}},ListJobsByPipeline:{http:{method:"GET",requestUri:"/2012-09-25/jobsByPipeline/{PipelineId}"},input:{type:"structure",required:["PipelineId"],members:{PipelineId:{location:"uri",locationName:"PipelineId"},Ascending:{location:"querystring",locationName:"Ascending"},PageToken:{location:"querystring",locationName:"PageToken"}}},output:{type:"structure",members:{Jobs:{shape:"S3h"},NextPageToken:{}}}},ListJobsByStatus:{http:{method:"GET",requestUri:"/2012-09-25/jobsByStatus/{Status}"},input:{type:"structure",required:["Status"],members:{Status:{location:"uri",locationName:"Status"},Ascending:{location:"querystring",locationName:"Ascending"},PageToken:{location:"querystring",locationName:"PageToken"}}},output:{type:"structure",members:{Jobs:{shape:"S3h"},NextPageToken:{}}}},ListPipelines:{http:{method:"GET",requestUri:"/2012-09-25/pipelines"},input:{type:"structure",members:{Ascending:{location:"querystring",locationName:"Ascending"},PageToken:{location:"querystring",locationName:"PageToken"}}},output:{type:"structure",members:{Pipelines:{type:"list",member:{shape:"S2b"}},NextPageToken:{}}}},ListPresets:{http:{method:"GET",requestUri:"/2012-09-25/presets"},input:{type:"structure",members:{Ascending:{location:"querystring",locationName:"Ascending"},PageToken:{location:"querystring",locationName:"PageToken"}}},output:{type:"structure",members:{Presets:{type:"list",member:{shape:"S38"}},NextPageToken:{}}}},ReadJob:{http:{method:"GET",requestUri:"/2012-09-25/jobs/{Id}"},input:{type:"structure",required:["Id"],members:{Id:{location:"uri",locationName:"Id"}}},output:{type:"structure",members:{Job:{shape:"S1n"}}}},ReadPipeline:{http:{method:"GET",requestUri:"/2012-09-25/pipelines/{Id}"},input:{type:"structure",required:["Id"],members:{Id:{location:"uri",locationName:"Id"}}},output:{type:"structure",members:{Pipeline:{shape:"S2b"},Warnings:{shape:"S2d"}}}},ReadPreset:{http:{method:"GET",requestUri:"/2012-09-25/presets/{Id}"},input:{type:"structure",required:["Id"],members:{Id:{location:"uri",locationName:"Id"}}},output:{type:"structure",members:{Preset:{shape:"S38"}}}},TestRole:{http:{requestUri:"/2012-09-25/roleTests",responseCode:200},input:{type:"structure",required:["Role","InputBucket","OutputBucket","Topics"],members:{Role:{},InputBucket:{},OutputBucket:{},Topics:{type:"list",member:{}}}},output:{type:"structure",members:{Success:{},Messages:{type:"list",member:{}}}}},UpdatePipeline:{http:{method:"PUT",requestUri:"/2012-09-25/pipelines/{Id}",responseCode:200},input:{type:"structure",required:["Id"],members:{Id:{location:"uri",locationName:"Id"},Name:{},InputBucket:{},Role:{},AwsKmsKeyArn:{},Notifications:{shape:"S20"},ContentConfig:{shape:"S22"},ThumbnailConfig:{shape:"S22"}}},output:{type:"structure",members:{Pipeline:{shape:"S2b"},Warnings:{shape:"S2d"}}}},UpdatePipelineNotifications:{http:{requestUri:"/2012-09-25/pipelines/{Id}/notifications"},input:{type:"structure",required:["Id","Notifications"],members:{Id:{location:"uri",locationName:"Id"},Notifications:{shape:"S20"}}},output:{type:"structure",members:{Pipeline:{shape:"S2b"}}}},UpdatePipelineStatus:{http:{requestUri:"/2012-09-25/pipelines/{Id}/status"},input:{type:"structure",required:["Id","Status"],members:{Id:{location:"uri",locationName:"Id"},Status:{}}},output:{type:"structure",members:{Pipeline:{shape:"S2b"}}}}},shapes:{S5:{type:"structure",members:{Key:{},FrameRate:{},Resolution:{},AspectRatio:{},Interlaced:{},Container:{},Encryption:{shape:"Sc"}}},Sc:{type:"structure",members:{Mode:{},Key:{},KeyMd5:{},InitializationVector:{}}},Sg:{type:"structure",members:{Key:{},ThumbnailPattern:{},ThumbnailEncryption:{shape:"Sc"},Rotate:{},PresetId:{},SegmentDuration:{},Watermarks:{shape:"Sk"},AlbumArt:{shape:"So"},Composition:{shape:"Sw"},Captions:{shape:"S10"},Encryption:{shape:"Sc"}}},Sk:{type:"list",member:{type:"structure",members:{PresetWatermarkId:{},InputKey:{},Encryption:{shape:"Sc"}}}},So:{type:"structure",members:{MergePolicy:{},Artwork:{type:"list",member:{type:"structure",members:{InputKey:{},MaxWidth:{},MaxHeight:{},SizingPolicy:{},PaddingPolicy:{},AlbumArtFormat:{},Encryption:{shape:"Sc"}}}}}},Sw:{type:"list",member:{type:"structure",members:{TimeSpan:{type:"structure",members:{StartTime:{},Duration:{}}}}}},S10:{type:"structure",members:{MergePolicy:{},CaptionSources:{type:"list",member:{type:"structure",members:{Key:{},Language:{},TimeOffset:{},Label:{},Encryption:{shape:"Sc"}}}},CaptionFormats:{type:"list",member:{type:"structure",members:{Format:{},Pattern:{},Encryption:{shape:"Sc"}}}}}},S1f:{type:"list",member:{}},S1g:{type:"structure",members:{Method:{},Key:{},KeyMd5:{},InitializationVector:{},LicenseAcquisitionUrl:{},KeyStoragePolicy:{}}},S1k:{type:"map",key:{},value:{}},S1n:{type:"structure",members:{Id:{},Arn:{},PipelineId:{},Input:{shape:"S5"},Output:{shape:"S1o"},Outputs:{type:"list",member:{shape:"S1o"}},OutputKeyPrefix:{},Playlists:{type:"list",member:{type:"structure",members:{Name:{},Format:{},OutputKeys:{shape:"S1f"},HlsContentProtection:{shape:"S1g"},Status:{},StatusDetail:{}}}},Status:{},UserMetadata:{shape:"S1k"}}},S1o:{type:"structure",members:{Id:{},Key:{},ThumbnailPattern:{},ThumbnailEncryption:{shape:"Sc"},Rotate:{},PresetId:{},SegmentDuration:{},Status:{},StatusDetail:{},Duration:{type:"long"},Width:{type:"integer"},Height:{type:"integer"},Watermarks:{shape:"Sk"},AlbumArt:{shape:"So"},Composition:{shape:"Sw"},Captions:{shape:"S10"},Encryption:{shape:"Sc"}}},S20:{type:"structure",members:{Progressing:{},Completed:{},Warning:{},Error:{}}},S22:{type:"structure",members:{Bucket:{},StorageClass:{},Permissions:{type:"list",member:{type:"structure",members:{GranteeType:{},Grantee:{},Access:{type:"list",member:{}}}}}}},S2b:{type:"structure",members:{Id:{},Arn:{},Name:{},Status:{},InputBucket:{},OutputBucket:{},Role:{},AwsKmsKeyArn:{},Notifications:{shape:"S20"},ContentConfig:{shape:"S22"},ThumbnailConfig:{shape:"S22"}}},S2d:{type:"list",member:{type:"structure",members:{Code:{},Message:{}}}},S2h:{type:"structure",members:{Codec:{},CodecOptions:{type:"map",key:{},value:{}},KeyframesMaxDist:{},FixedGOP:{},BitRate:{},FrameRate:{},MaxFrameRate:{},Resolution:{},AspectRatio:{},MaxWidth:{},MaxHeight:{},DisplayAspectRatio:{},SizingPolicy:{},PaddingPolicy:{},Watermarks:{type:"list",member:{type:"structure",members:{Id:{},MaxWidth:{},MaxHeight:{},SizingPolicy:{},HorizontalAlign:{},HorizontalOffset:{},VerticalAlign:{},VerticalOffset:{},Opacity:{},Target:{}}}}}},S2x:{type:"structure",members:{Codec:{},SampleRate:{},BitRate:{},Channels:{},CodecOptions:{type:"structure",members:{Profile:{}}}}},S34:{type:"structure",members:{Format:{},Interval:{},Resolution:{},AspectRatio:{},MaxWidth:{},MaxHeight:{},SizingPolicy:{},PaddingPolicy:{}}},S38:{type:"structure",members:{Id:{},Arn:{},Name:{},Description:{},Container:{},Audio:{shape:"S2x"},Video:{shape:"S2h"},Thumbnails:{shape:"S34"},Type:{}}},S3h:{type:"list",member:{shape:"S1n"}}},paginators:{ListJobsByPipeline:{input_token:"PageToken",output_token:"NextPageToken",result_key:"Jobs"},ListJobsByStatus:{input_token:"PageToken",output_token:"NextPageToken",result_key:"Jobs"},ListPipelines:{input_token:"PageToken",output_token:"NextPageToken",result_key:"Pipelines"},ListPresets:{input_token:"PageToken",output_token:"NextPageToken",result_key:"Presets"}},waiters:{JobComplete:{operation:"ReadJob",success_type:"output",success_path:"Job.Status",interval:30,max_attempts:120,success_value:"Complete",failure_value:["Canceled","Error"]}}},r.apiLoader.services.kinesis={},r.Kinesis=r.Service.defineService("kinesis",["2013-12-02"]),r.apiLoader.services.kinesis["2013-12-02"]={metadata:{apiVersion:"2013-12-02",endpointPrefix:"kinesis",jsonVersion:"1.1",serviceAbbreviation:"Kinesis",serviceFullName:"Amazon Kinesis",signatureVersion:"v4",targetPrefix:"Kinesis_20131202",protocol:"json"},operations:{AddTagsToStream:{input:{type:"structure",required:["StreamName","Tags"],members:{StreamName:{},Tags:{type:"map",key:{},value:{}}}},http:{}},CreateStream:{input:{type:"structure",required:["StreamName","ShardCount"],members:{StreamName:{},ShardCount:{type:"integer"}}},http:{}},DeleteStream:{input:{type:"structure",required:["StreamName"],members:{StreamName:{}}},http:{}},DescribeStream:{input:{type:"structure",required:["StreamName"],members:{StreamName:{},Limit:{type:"integer"},ExclusiveStartShardId:{}}},output:{type:"structure",required:["StreamDescription"],members:{StreamDescription:{type:"structure",required:["StreamName","StreamARN","StreamStatus","Shards","HasMoreShards"],members:{StreamName:{},StreamARN:{},StreamStatus:{},Shards:{type:"list",member:{type:"structure",required:["ShardId","HashKeyRange","SequenceNumberRange"],members:{ShardId:{},ParentShardId:{},AdjacentParentShardId:{},HashKeyRange:{type:"structure",required:["StartingHashKey","EndingHashKey"],members:{StartingHashKey:{},EndingHashKey:{}}},SequenceNumberRange:{type:"structure",required:["StartingSequenceNumber"],members:{StartingSequenceNumber:{},EndingSequenceNumber:{}}}}}},HasMoreShards:{type:"boolean"}}}}},http:{}},GetRecords:{input:{type:"structure",required:["ShardIterator"],members:{ShardIterator:{},Limit:{type:"integer"}}},output:{type:"structure",required:["Records"],members:{Records:{type:"list",member:{type:"structure",required:["SequenceNumber","Data","PartitionKey"],members:{SequenceNumber:{},Data:{type:"blob"},PartitionKey:{}}}},NextShardIterator:{}}},http:{}},GetShardIterator:{input:{type:"structure",required:["StreamName","ShardId","ShardIteratorType"],members:{StreamName:{},ShardId:{},ShardIteratorType:{},StartingSequenceNumber:{}}},output:{type:"structure",members:{ShardIterator:{}}},http:{}},ListStreams:{input:{type:"structure",members:{Limit:{type:"integer"},ExclusiveStartStreamName:{}}},output:{type:"structure",required:["StreamNames","HasMoreStreams"],members:{StreamNames:{type:"list",member:{}},HasMoreStreams:{type:"boolean"}}},http:{}},ListTagsForStream:{input:{type:"structure",required:["StreamName"],members:{StreamName:{},ExclusiveStartTagKey:{},Limit:{type:"integer"}}},output:{type:"structure",required:["Tags","HasMoreTags"],members:{Tags:{type:"list",member:{type:"structure",required:["Key"],members:{Key:{},Value:{}}}},HasMoreTags:{type:"boolean"}}},http:{}},MergeShards:{input:{type:"structure",required:["StreamName","ShardToMerge","AdjacentShardToMerge"],members:{StreamName:{},ShardToMerge:{},AdjacentShardToMerge:{}}},http:{}},PutRecord:{input:{type:"structure",required:["StreamName","Data","PartitionKey"],members:{StreamName:{},Data:{type:"blob"},PartitionKey:{},ExplicitHashKey:{},SequenceNumberForOrdering:{}}},output:{type:"structure",required:["ShardId","SequenceNumber"],members:{ShardId:{},SequenceNumber:{}}},http:{}},PutRecords:{input:{type:"structure",required:["Records","StreamName"],members:{Records:{type:"list",member:{type:"structure",required:["Data","PartitionKey"],members:{Data:{type:"blob"},ExplicitHashKey:{},PartitionKey:{}}}},StreamName:{}}},output:{type:"structure",required:["Records"],members:{FailedRecordCount:{type:"integer"},Records:{type:"list",member:{type:"structure",members:{SequenceNumber:{},ShardId:{},ErrorCode:{},ErrorMessage:{}}}}}},http:{}},RemoveTagsFromStream:{input:{type:"structure",required:["StreamName","TagKeys"],members:{StreamName:{},TagKeys:{type:"list",member:{}}}},http:{}},SplitShard:{input:{type:"structure",required:["StreamName","ShardToSplit","NewStartingHashKey"],members:{StreamName:{},ShardToSplit:{},NewStartingHashKey:{}}},http:{}}},shapes:{},paginators:{DescribeStream:{input_token:"ExclusiveStartShardId",limit_key:"Limit",more_results:"StreamDescription.HasMoreShards",output_token:"StreamDescription.Shards[-1].ShardId",result_key:"StreamDescription.Shards"},ListStreams:{input_token:"ExclusiveStartStreamName",limit_key:"Limit",more_results:"HasMoreStreams",output_token:"StreamNames[-1]",result_key:"StreamNames"}}},r.apiLoader.services.lambda={},r.Lambda=r.Service.defineService("lambda",["2014-11-11"]),r.apiLoader.services.lambda["2014-11-11"]={metadata:{apiVersion:"2014-11-11",endpointPrefix:"lambda",serviceFullName:"AWS Lambda",signatureVersion:"v4",protocol:"rest-json"},operations:{AddEventSource:{http:{requestUri:"/2014-11-13/event-source-mappings/"},input:{type:"structure",required:["EventSource","FunctionName","Role"],members:{EventSource:{},FunctionName:{},Role:{},BatchSize:{type:"integer"},Parameters:{shape:"S6"}}},output:{shape:"S7"}},DeleteFunction:{http:{method:"DELETE",requestUri:"/2014-11-13/functions/{FunctionName}",responseCode:204},input:{type:"structure",required:["FunctionName"],members:{FunctionName:{location:"uri",locationName:"FunctionName"}}}},GetEventSource:{http:{method:"GET",requestUri:"/2014-11-13/event-source-mappings/{UUID}",responseCode:200},input:{type:"structure",required:["UUID"],members:{UUID:{location:"uri",locationName:"UUID"}}},output:{shape:"S7"}},GetFunction:{http:{method:"GET",requestUri:"/2014-11-13/functions/{FunctionName}",responseCode:200},input:{type:"structure",required:["FunctionName"],members:{FunctionName:{location:"uri",locationName:"FunctionName"}}},output:{type:"structure",members:{Configuration:{shape:"Se"},Code:{type:"structure",members:{RepositoryType:{},Location:{}}}}}},GetFunctionConfiguration:{http:{method:"GET",requestUri:"/2014-11-13/functions/{FunctionName}/configuration",responseCode:200},input:{type:"structure",required:["FunctionName"],members:{FunctionName:{location:"uri",locationName:"FunctionName"}}},output:{shape:"Se"}},InvokeAsync:{http:{requestUri:"/2014-11-13/functions/{FunctionName}/invoke-async/",responseCode:202},input:{type:"structure",required:["FunctionName","InvokeArgs"],members:{FunctionName:{location:"uri",locationName:"FunctionName"},InvokeArgs:{shape:"Sq"}},payload:"InvokeArgs"},output:{type:"structure",members:{Status:{location:"statusCode",type:"integer"}}}},ListEventSources:{http:{method:"GET",requestUri:"/2014-11-13/event-source-mappings/",responseCode:200},input:{type:"structure",members:{EventSourceArn:{location:"querystring",locationName:"EventSource"},FunctionName:{location:"querystring",locationName:"FunctionName"},Marker:{location:"querystring",locationName:"Marker"},MaxItems:{location:"querystring",locationName:"MaxItems",type:"integer"}}},output:{type:"structure",members:{NextMarker:{},EventSources:{type:"list",member:{shape:"S7"}}}}},ListFunctions:{http:{method:"GET",requestUri:"/2014-11-13/functions/",responseCode:200},input:{type:"structure",members:{Marker:{location:"querystring",locationName:"Marker"},MaxItems:{location:"querystring",locationName:"MaxItems",type:"integer"}}},output:{type:"structure",members:{NextMarker:{},Functions:{type:"list",member:{shape:"Se"}}}}},RemoveEventSource:{http:{method:"DELETE",requestUri:"/2014-11-13/event-source-mappings/{UUID}",responseCode:204},input:{type:"structure",required:["UUID"],members:{UUID:{location:"uri",locationName:"UUID"}}}},UpdateFunctionConfiguration:{http:{method:"PUT",requestUri:"/2014-11-13/functions/{FunctionName}/configuration",responseCode:200},input:{type:"structure",required:["FunctionName"],members:{FunctionName:{location:"uri",locationName:"FunctionName"},Role:{location:"querystring",locationName:"Role"},Handler:{location:"querystring",locationName:"Handler"},Description:{location:"querystring",locationName:"Description"},Timeout:{location:"querystring",locationName:"Timeout",type:"integer"},MemorySize:{location:"querystring",locationName:"MemorySize",type:"integer"}}},output:{shape:"Se"}},UploadFunction:{http:{method:"PUT",requestUri:"/2014-11-13/functions/{FunctionName}",responseCode:201},input:{type:"structure",required:["FunctionName","FunctionZip","Runtime","Role","Handler","Mode"],members:{FunctionName:{location:"uri",locationName:"FunctionName"},FunctionZip:{shape:"Sq"},Runtime:{location:"querystring",locationName:"Runtime"},Role:{location:"querystring",locationName:"Role"},Handler:{location:"querystring",locationName:"Handler"},Mode:{location:"querystring",locationName:"Mode"},Description:{location:"querystring",locationName:"Description"},Timeout:{location:"querystring",locationName:"Timeout",type:"integer"},MemorySize:{location:"querystring",locationName:"MemorySize",type:"integer"}},payload:"FunctionZip"},output:{shape:"Se"}}},shapes:{S6:{type:"map",key:{},value:{}},S7:{type:"structure",members:{UUID:{},BatchSize:{type:"integer"},EventSource:{},FunctionName:{},Parameters:{shape:"S6"},Role:{},LastModified:{type:"timestamp"},IsActive:{type:"boolean"},Status:{}}},Se:{type:"structure",members:{FunctionName:{},FunctionARN:{},ConfigurationId:{},Runtime:{},Role:{},Handler:{},Mode:{},CodeSize:{type:"long"},Description:{},Timeout:{type:"integer"},MemorySize:{type:"integer"},LastModified:{type:"timestamp"}}},Sq:{type:"blob",streaming:!0}},paginators:{ListEventSources:{input_token:"Marker",output_token:"NextMarker",limit_key:"MaxItems",result_key:"EventSources"},ListFunctions:{input_token:"Marker",output_token:"NextMarker",limit_key:"MaxItems",result_key:"Functions"}}},r.apiLoader.services.s3={},r.S3=r.Service.defineService("s3",["2006-03-01"]),e("./services/s3"),r.apiLoader.services.s3["2006-03-01"]={metadata:{apiVersion:"2006-03-01",checksumFormat:"md5",endpointPrefix:"s3",globalEndpoint:"s3.amazonaws.com",serviceAbbreviation:"Amazon S3",serviceFullName:"Amazon Simple Storage Service",signatureVersion:"s3",timestampFormat:"rfc822",protocol:"rest-xml"},operations:{AbortMultipartUpload:{http:{method:"DELETE",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key","UploadId"],members:{Bucket:{location:"uri",locationName:"Bucket"},Key:{location:"uri",locationName:"Key"},UploadId:{location:"querystring",locationName:"uploadId"}}}},CompleteMultipartUpload:{http:{requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key","UploadId"],members:{Bucket:{location:"uri",locationName:"Bucket"},Key:{location:"uri",locationName:"Key"},MultipartUpload:{locationName:"CompleteMultipartUpload",xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},type:"structure",members:{Parts:{locationName:"Part",type:"list",member:{type:"structure",members:{ETag:{},PartNumber:{type:"integer"}}},flattened:!0}}},UploadId:{location:"querystring",locationName:"uploadId"}},payload:"MultipartUpload"},output:{type:"structure",members:{Location:{},Bucket:{},Key:{},Expiration:{location:"header",locationName:"x-amz-expiration",type:"timestamp"},ETag:{},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},VersionId:{location:"header",locationName:"x-amz-version-id"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}}}},CopyObject:{http:{method:"PUT",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","CopySource","Key"],members:{ACL:{location:"header",locationName:"x-amz-acl"},Bucket:{location:"uri",locationName:"Bucket"},CacheControl:{location:"header",locationName:"Cache-Control"},ContentDisposition:{location:"header",locationName:"Content-Disposition"},ContentEncoding:{location:"header",locationName:"Content-Encoding"},ContentLanguage:{location:"header",locationName:"Content-Language"},ContentType:{location:"header",locationName:"Content-Type"},CopySource:{location:"header",locationName:"x-amz-copy-source"},CopySourceIfMatch:{location:"header",locationName:"x-amz-copy-source-if-match"},CopySourceIfModifiedSince:{location:"header",locationName:"x-amz-copy-source-if-modified-since",type:"timestamp"},CopySourceIfNoneMatch:{location:"header",locationName:"x-amz-copy-source-if-none-match"},CopySourceIfUnmodifiedSince:{location:"header",locationName:"x-amz-copy-source-if-unmodified-since",type:"timestamp"},Expires:{location:"header",locationName:"Expires",type:"timestamp"},GrantFullControl:{location:"header",locationName:"x-amz-grant-full-control"},GrantRead:{location:"header",locationName:"x-amz-grant-read"},GrantReadACP:{location:"header",locationName:"x-amz-grant-read-acp"},GrantWriteACP:{location:"header",locationName:"x-amz-grant-write-acp"},Key:{location:"uri",locationName:"Key"},Metadata:{shape:"Sy",location:"headers",locationName:"x-amz-meta-"},MetadataDirective:{location:"header",locationName:"x-amz-metadata-directive"},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},StorageClass:{location:"header",locationName:"x-amz-storage-class"},WebsiteRedirectLocation:{location:"header",locationName:"x-amz-website-redirect-location"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKey:{shape:"S15",location:"header",locationName:"x-amz-server-side-encryption-customer-key"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"},CopySourceSSECustomerAlgorithm:{location:"header",locationName:"x-amz-copy-source-server-side-encryption-customer-algorithm"},CopySourceSSECustomerKey:{shape:"S18",location:"header",locationName:"x-amz-copy-source-server-side-encryption-customer-key"},CopySourceSSECustomerKeyMD5:{location:"header",locationName:"x-amz-copy-source-server-side-encryption-customer-key-MD5"}}},output:{type:"structure",members:{CopyObjectResult:{type:"structure",members:{ETag:{},LastModified:{type:"timestamp"}}},Expiration:{location:"header",locationName:"x-amz-expiration",type:"timestamp"},CopySourceVersionId:{location:"header",locationName:"x-amz-copy-source-version-id"},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}},payload:"CopyObjectResult"},alias:"PutObjectCopy"},CreateBucket:{http:{method:"PUT",requestUri:"/{Bucket}"},input:{type:"structure",required:["Bucket"],members:{ACL:{location:"header",locationName:"x-amz-acl"},Bucket:{location:"uri",locationName:"Bucket"},CreateBucketConfiguration:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"CreateBucketConfiguration",type:"structure",members:{LocationConstraint:{}}},GrantFullControl:{location:"header",locationName:"x-amz-grant-full-control"},GrantRead:{location:"header",locationName:"x-amz-grant-read"},GrantReadACP:{location:"header",locationName:"x-amz-grant-read-acp"},GrantWrite:{location:"header",locationName:"x-amz-grant-write"},GrantWriteACP:{location:"header",locationName:"x-amz-grant-write-acp"}},payload:"CreateBucketConfiguration"},output:{type:"structure",members:{Location:{location:"header",locationName:"Location"}}},alias:"PutBucket"},CreateMultipartUpload:{http:{requestUri:"/{Bucket}/{Key+}?uploads"},input:{type:"structure",required:["Bucket","Key"],members:{ACL:{location:"header",locationName:"x-amz-acl"},Bucket:{location:"uri",locationName:"Bucket"},CacheControl:{location:"header",locationName:"Cache-Control"},ContentDisposition:{location:"header",locationName:"Content-Disposition"},ContentEncoding:{location:"header",locationName:"Content-Encoding"},ContentLanguage:{location:"header",locationName:"Content-Language"},ContentType:{location:"header",locationName:"Content-Type"},Expires:{location:"header",locationName:"Expires",type:"timestamp"},GrantFullControl:{location:"header",locationName:"x-amz-grant-full-control"},GrantRead:{location:"header",locationName:"x-amz-grant-read"},GrantReadACP:{location:"header",locationName:"x-amz-grant-read-acp"},GrantWriteACP:{location:"header",locationName:"x-amz-grant-write-acp"},Key:{location:"uri",locationName:"Key"},Metadata:{shape:"Sy",location:"headers",locationName:"x-amz-meta-"},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},StorageClass:{location:"header",locationName:"x-amz-storage-class"},WebsiteRedirectLocation:{location:"header",locationName:"x-amz-website-redirect-location"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKey:{shape:"S15",location:"header",locationName:"x-amz-server-side-encryption-customer-key"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}}},output:{type:"structure",members:{Bucket:{locationName:"Bucket"},Key:{},UploadId:{},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}}},alias:"InitiateMultipartUpload"},DeleteBucket:{http:{method:"DELETE",requestUri:"/{Bucket}"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}}},DeleteBucketCors:{http:{method:"DELETE",requestUri:"/{Bucket}?cors"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}}},DeleteBucketLifecycle:{http:{method:"DELETE",requestUri:"/{Bucket}?lifecycle"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}}},DeleteBucketPolicy:{http:{method:"DELETE",requestUri:"/{Bucket}?policy"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}}},DeleteBucketTagging:{http:{method:"DELETE",requestUri:"/{Bucket}?tagging"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}}},DeleteBucketWebsite:{http:{method:"DELETE",requestUri:"/{Bucket}?website"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}}},DeleteObject:{http:{method:"DELETE",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key"],members:{Bucket:{location:"uri",locationName:"Bucket"},Key:{location:"uri",locationName:"Key"},MFA:{location:"header",locationName:"x-amz-mfa"},VersionId:{location:"querystring",locationName:"versionId"}}},output:{type:"structure",members:{DeleteMarker:{location:"header",locationName:"x-amz-delete-marker",type:"boolean"},VersionId:{location:"header",locationName:"x-amz-version-id"}}}},DeleteObjects:{http:{requestUri:"/{Bucket}?delete"},input:{type:"structure",required:["Bucket","Delete"],members:{Bucket:{location:"uri",locationName:"Bucket"},Delete:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"Delete",type:"structure",required:["Objects"],members:{Objects:{locationName:"Object",type:"list",member:{type:"structure",required:["Key"],members:{Key:{},VersionId:{}}},flattened:!0},Quiet:{type:"boolean"}}},MFA:{location:"header",locationName:"x-amz-mfa"}},payload:"Delete"},output:{type:"structure",members:{Deleted:{type:"list",member:{type:"structure",members:{Key:{},VersionId:{},DeleteMarker:{type:"boolean"},DeleteMarkerVersionId:{}}},flattened:!0},Errors:{locationName:"Error",type:"list",member:{type:"structure",members:{Key:{},VersionId:{},Code:{},Message:{}}},flattened:!0}}},alias:"DeleteMultipleObjects"},GetBucketAcl:{http:{method:"GET",requestUri:"/{Bucket}?acl"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{Owner:{shape:"S2b"},Grants:{shape:"S2e",locationName:"AccessControlList"}}}},GetBucketCors:{http:{method:"GET",requestUri:"/{Bucket}?cors"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{CORSRules:{shape:"S2n",locationName:"CORSRule"}}}},GetBucketLifecycle:{http:{method:"GET",requestUri:"/{Bucket}?lifecycle"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{Rules:{shape:"S30",locationName:"Rule"}}}},GetBucketLocation:{http:{method:"GET",requestUri:"/{Bucket}?location"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{LocationConstraint:{}}}},GetBucketLogging:{http:{method:"GET",requestUri:"/{Bucket}?logging"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{LoggingEnabled:{shape:"S3f"}}}},GetBucketNotification:{http:{method:"GET",requestUri:"/{Bucket}?notification"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{TopicConfiguration:{shape:"S3n"},QueueConfiguration:{shape:"S3s"},CloudFunctionConfiguration:{shape:"S3u"}}}},GetBucketPolicy:{http:{method:"GET",requestUri:"/{Bucket}?policy"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{Policy:{}},payload:"Policy"}},GetBucketRequestPayment:{http:{method:"GET",requestUri:"/{Bucket}?requestPayment"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{Payer:{}}}},GetBucketTagging:{http:{method:"GET",requestUri:"/{Bucket}?tagging"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",required:["TagSet"],members:{TagSet:{shape:"S45"}}}},GetBucketVersioning:{http:{method:"GET",requestUri:"/{Bucket}?versioning"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{Status:{},MFADelete:{locationName:"MfaDelete"}}}},GetBucketWebsite:{http:{method:"GET",requestUri:"/{Bucket}?website"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}},output:{type:"structure",members:{RedirectAllRequestsTo:{shape:"S4e"},IndexDocument:{shape:"S4h"},ErrorDocument:{shape:"S4j"},RoutingRules:{shape:"S4k"}}}},GetObject:{http:{method:"GET",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key"],members:{Bucket:{location:"uri",locationName:"Bucket"},IfMatch:{location:"header",locationName:"If-Match"},IfModifiedSince:{location:"header",locationName:"If-Modified-Since",type:"timestamp"},IfNoneMatch:{location:"header",locationName:"If-None-Match"},IfUnmodifiedSince:{location:"header",locationName:"If-Unmodified-Since",type:"timestamp"},Key:{location:"uri",locationName:"Key"},Range:{location:"header",locationName:"Range"},ResponseCacheControl:{location:"querystring",locationName:"response-cache-control"},ResponseContentDisposition:{location:"querystring",locationName:"response-content-disposition"},ResponseContentEncoding:{location:"querystring",locationName:"response-content-encoding"},ResponseContentLanguage:{location:"querystring",locationName:"response-content-language"},ResponseContentType:{location:"querystring",locationName:"response-content-type"},ResponseExpires:{location:"querystring",locationName:"response-expires",type:"timestamp"},VersionId:{location:"querystring",locationName:"versionId"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKey:{shape:"S15",location:"header",locationName:"x-amz-server-side-encryption-customer-key"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"}}},output:{type:"structure",members:{Body:{streaming:!0,type:"blob"},DeleteMarker:{location:"header",locationName:"x-amz-delete-marker",type:"boolean"},AcceptRanges:{location:"header",locationName:"accept-ranges"},Expiration:{location:"header",locationName:"x-amz-expiration",type:"timestamp"},Restore:{location:"header",locationName:"x-amz-restore"},LastModified:{location:"header",locationName:"Last-Modified",type:"timestamp"},ContentLength:{location:"header",locationName:"Content-Length",type:"integer"},ETag:{location:"header",locationName:"ETag"},MissingMeta:{location:"header",locationName:"x-amz-missing-meta",type:"integer"},VersionId:{location:"header",locationName:"x-amz-version-id"},CacheControl:{location:"header",locationName:"Cache-Control"},ContentDisposition:{location:"header",locationName:"Content-Disposition"},ContentEncoding:{location:"header",locationName:"Content-Encoding"},ContentLanguage:{location:"header",locationName:"Content-Language"},ContentType:{location:"header",locationName:"Content-Type"},Expires:{location:"header",locationName:"Expires",type:"timestamp"},WebsiteRedirectLocation:{location:"header",locationName:"x-amz-website-redirect-location"},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},Metadata:{shape:"Sy",location:"headers",locationName:"x-amz-meta-"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}},payload:"Body"}},GetObjectAcl:{http:{method:"GET",requestUri:"/{Bucket}/{Key+}?acl"},input:{type:"structure",required:["Bucket","Key"],members:{Bucket:{location:"uri",locationName:"Bucket"},Key:{location:"uri",locationName:"Key"},VersionId:{location:"querystring",locationName:"versionId"}}},output:{type:"structure",members:{Owner:{shape:"S2b"},Grants:{shape:"S2e",locationName:"AccessControlList"}}}},GetObjectTorrent:{http:{method:"GET",requestUri:"/{Bucket}/{Key+}?torrent"},input:{type:"structure",required:["Bucket","Key"],members:{Bucket:{location:"uri",locationName:"Bucket"},Key:{location:"uri",locationName:"Key"}}},output:{type:"structure",members:{Body:{streaming:!0,type:"blob"}},payload:"Body"}},HeadBucket:{http:{method:"HEAD",requestUri:"/{Bucket}"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"}}}},HeadObject:{http:{method:"HEAD",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key"],members:{Bucket:{location:"uri",locationName:"Bucket"},IfMatch:{location:"header",locationName:"If-Match"},IfModifiedSince:{location:"header",locationName:"If-Modified-Since",type:"timestamp"},IfNoneMatch:{location:"header",locationName:"If-None-Match"},IfUnmodifiedSince:{location:"header",locationName:"If-Unmodified-Since",type:"timestamp"},Key:{location:"uri",locationName:"Key"},Range:{location:"header",locationName:"Range"},VersionId:{location:"querystring",locationName:"versionId"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKey:{shape:"S15",location:"header",locationName:"x-amz-server-side-encryption-customer-key"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"}}},output:{type:"structure",members:{DeleteMarker:{location:"header",locationName:"x-amz-delete-marker",type:"boolean"},AcceptRanges:{location:"header",locationName:"accept-ranges"},Expiration:{location:"header",locationName:"x-amz-expiration",type:"timestamp"},Restore:{location:"header",locationName:"x-amz-restore"},LastModified:{location:"header",locationName:"Last-Modified",type:"timestamp"},ContentLength:{location:"header",locationName:"Content-Length",type:"integer"},ETag:{location:"header",locationName:"ETag"},MissingMeta:{location:"header",locationName:"x-amz-missing-meta",type:"integer"},VersionId:{location:"header",locationName:"x-amz-version-id"},CacheControl:{location:"header",locationName:"Cache-Control"},ContentDisposition:{location:"header",locationName:"Content-Disposition"},ContentEncoding:{location:"header",locationName:"Content-Encoding"},ContentLanguage:{location:"header",locationName:"Content-Language"},ContentType:{location:"header",locationName:"Content-Type"},Expires:{location:"header",locationName:"Expires",type:"timestamp"},WebsiteRedirectLocation:{location:"header",locationName:"x-amz-website-redirect-location"},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},Metadata:{shape:"Sy",location:"headers",locationName:"x-amz-meta-"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}}}},ListBuckets:{http:{method:"GET"},output:{type:"structure",members:{Buckets:{type:"list",member:{locationName:"Bucket",type:"structure",members:{Name:{},CreationDate:{type:"timestamp"}}}},Owner:{shape:"S2b"}}},alias:"GetService"},ListMultipartUploads:{http:{method:"GET",requestUri:"/{Bucket}?uploads"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"},Delimiter:{location:"querystring",locationName:"delimiter"},EncodingType:{location:"querystring",locationName:"encoding-type"},KeyMarker:{location:"querystring",locationName:"key-marker"},MaxUploads:{location:"querystring",locationName:"max-uploads",type:"integer"},Prefix:{location:"querystring",locationName:"prefix"},UploadIdMarker:{location:"querystring",locationName:"upload-id-marker"}}},output:{type:"structure",members:{Bucket:{},KeyMarker:{},UploadIdMarker:{},NextKeyMarker:{},Prefix:{},Delimiter:{},NextUploadIdMarker:{},MaxUploads:{type:"integer"},IsTruncated:{type:"boolean"},Uploads:{locationName:"Upload",type:"list",member:{type:"structure",members:{UploadId:{},Key:{},Initiated:{type:"timestamp"},StorageClass:{},Owner:{shape:"S2b"},Initiator:{shape:"S5z"}}},flattened:!0},CommonPrefixes:{shape:"S60"},EncodingType:{}}}},ListObjectVersions:{http:{method:"GET",requestUri:"/{Bucket}?versions"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"},Delimiter:{location:"querystring",locationName:"delimiter"},EncodingType:{location:"querystring",locationName:"encoding-type"},KeyMarker:{location:"querystring",locationName:"key-marker"},MaxKeys:{location:"querystring",locationName:"max-keys",type:"integer"},Prefix:{location:"querystring",locationName:"prefix"},VersionIdMarker:{location:"querystring",locationName:"version-id-marker"}}},output:{type:"structure",members:{IsTruncated:{type:"boolean"},KeyMarker:{},VersionIdMarker:{},NextKeyMarker:{},NextVersionIdMarker:{},Versions:{locationName:"Version",type:"list",member:{type:"structure",members:{ETag:{},Size:{type:"integer"},StorageClass:{},Key:{},VersionId:{},IsLatest:{type:"boolean"},LastModified:{type:"timestamp"},Owner:{shape:"S2b"}}},flattened:!0},DeleteMarkers:{locationName:"DeleteMarker",type:"list",member:{type:"structure",members:{Owner:{shape:"S2b"},Key:{},VersionId:{},IsLatest:{type:"boolean"},LastModified:{type:"timestamp"}}},flattened:!0},Name:{},Prefix:{},Delimiter:{},MaxKeys:{type:"integer"},CommonPrefixes:{shape:"S60"},EncodingType:{}}},alias:"GetBucketObjectVersions"},ListObjects:{http:{method:"GET",requestUri:"/{Bucket}"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"},Delimiter:{location:"querystring",locationName:"delimiter"},EncodingType:{location:"querystring",locationName:"encoding-type"},Marker:{location:"querystring",locationName:"marker"},MaxKeys:{location:"querystring",locationName:"max-keys",type:"integer"},Prefix:{location:"querystring",locationName:"prefix"}}},output:{type:"structure",members:{IsTruncated:{type:"boolean"},Marker:{},NextMarker:{},Contents:{type:"list",member:{type:"structure",members:{Key:{},LastModified:{type:"timestamp"},ETag:{},Size:{type:"integer"},StorageClass:{},Owner:{shape:"S2b"}}},flattened:!0},Name:{},Prefix:{},Delimiter:{},MaxKeys:{type:"integer"},CommonPrefixes:{shape:"S60"},EncodingType:{}}},alias:"GetBucket"},ListParts:{http:{method:"GET",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key","UploadId"],members:{Bucket:{location:"uri",locationName:"Bucket"},Key:{location:"uri",locationName:"Key"},MaxParts:{location:"querystring",locationName:"max-parts",type:"integer"},PartNumberMarker:{location:"querystring",locationName:"part-number-marker",type:"integer"},UploadId:{location:"querystring",locationName:"uploadId"}}},output:{type:"structure",members:{Bucket:{},Key:{},UploadId:{},PartNumberMarker:{type:"integer"},NextPartNumberMarker:{type:"integer"},MaxParts:{type:"integer"},IsTruncated:{type:"boolean"},Parts:{locationName:"Part",type:"list",member:{type:"structure",members:{PartNumber:{type:"integer"},LastModified:{type:"timestamp"},ETag:{},Size:{type:"integer"}}},flattened:!0},Initiator:{shape:"S5z"},Owner:{shape:"S2b"},StorageClass:{}}}},PutBucketAcl:{http:{method:"PUT",requestUri:"/{Bucket}?acl"},input:{type:"structure",required:["Bucket"],members:{ACL:{location:"header",locationName:"x-amz-acl"},AccessControlPolicy:{shape:"S6t",xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"AccessControlPolicy"},Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},GrantFullControl:{location:"header",locationName:"x-amz-grant-full-control"},GrantRead:{location:"header",locationName:"x-amz-grant-read"},GrantReadACP:{location:"header",locationName:"x-amz-grant-read-acp"},GrantWrite:{location:"header",locationName:"x-amz-grant-write"},GrantWriteACP:{location:"header",locationName:"x-amz-grant-write-acp"}},payload:"AccessControlPolicy"}},PutBucketCors:{http:{method:"PUT",requestUri:"/{Bucket}?cors"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"},CORSConfiguration:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"CORSConfiguration",type:"structure",members:{CORSRules:{shape:"S2n",locationName:"CORSRule"}}},ContentMD5:{location:"header",locationName:"Content-MD5"}},payload:"CORSConfiguration"}},PutBucketLifecycle:{http:{method:"PUT",requestUri:"/{Bucket}?lifecycle"},input:{type:"structure",required:["Bucket"],members:{Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},LifecycleConfiguration:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"LifecycleConfiguration",type:"structure",required:["Rules"],members:{Rules:{shape:"S30",locationName:"Rule"}}}},payload:"LifecycleConfiguration"}},PutBucketLogging:{http:{method:"PUT",requestUri:"/{Bucket}?logging"},input:{type:"structure",required:["Bucket","BucketLoggingStatus"],members:{Bucket:{location:"uri",locationName:"Bucket"},BucketLoggingStatus:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"BucketLoggingStatus",type:"structure",members:{LoggingEnabled:{shape:"S3f"}}},ContentMD5:{location:"header",locationName:"Content-MD5"}},payload:"BucketLoggingStatus"}},PutBucketNotification:{http:{method:"PUT",requestUri:"/{Bucket}?notification"},input:{type:"structure",required:["Bucket","NotificationConfiguration"],members:{Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},NotificationConfiguration:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"NotificationConfiguration",type:"structure",members:{TopicConfiguration:{shape:"S3n"},QueueConfiguration:{shape:"S3s"},CloudFunctionConfiguration:{shape:"S3u"}}}},payload:"NotificationConfiguration"}},PutBucketPolicy:{http:{method:"PUT",requestUri:"/{Bucket}?policy"},input:{type:"structure",required:["Bucket","Policy"],members:{Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},Policy:{}},payload:"Policy"}},PutBucketRequestPayment:{http:{method:"PUT",requestUri:"/{Bucket}?requestPayment"},input:{type:"structure",required:["Bucket","RequestPaymentConfiguration"],members:{Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},RequestPaymentConfiguration:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"RequestPaymentConfiguration",type:"structure",required:["Payer"],members:{Payer:{}}}},payload:"RequestPaymentConfiguration"}},PutBucketTagging:{http:{method:"PUT",requestUri:"/{Bucket}?tagging"},input:{type:"structure",required:["Bucket","Tagging"],members:{Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},Tagging:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"Tagging",type:"structure",required:["TagSet"],members:{TagSet:{shape:"S45"}}}},payload:"Tagging"}},PutBucketVersioning:{http:{method:"PUT",requestUri:"/{Bucket}?versioning"},input:{type:"structure",required:["Bucket","VersioningConfiguration"],members:{Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},MFA:{location:"header",locationName:"x-amz-mfa"},VersioningConfiguration:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"VersioningConfiguration",type:"structure",members:{MFADelete:{locationName:"MfaDelete"},Status:{}}}},payload:"VersioningConfiguration"}},PutBucketWebsite:{http:{method:"PUT",requestUri:"/{Bucket}?website"},input:{type:"structure",required:["Bucket","WebsiteConfiguration"],members:{Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},WebsiteConfiguration:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"WebsiteConfiguration",type:"structure",members:{ErrorDocument:{shape:"S4j"},IndexDocument:{shape:"S4h"},RedirectAllRequestsTo:{shape:"S4e"},RoutingRules:{shape:"S4k"}}}},payload:"WebsiteConfiguration"}},PutObject:{http:{method:"PUT",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key"],members:{ACL:{location:"header",locationName:"x-amz-acl"},Body:{streaming:!0,type:"blob"},Bucket:{location:"uri",locationName:"Bucket"},CacheControl:{location:"header",locationName:"Cache-Control"},ContentDisposition:{location:"header",locationName:"Content-Disposition"},ContentEncoding:{location:"header",locationName:"Content-Encoding"},ContentLanguage:{location:"header",locationName:"Content-Language"},ContentLength:{location:"header",locationName:"Content-Length",type:"integer"},ContentMD5:{location:"header",locationName:"Content-MD5"},ContentType:{location:"header",locationName:"Content-Type"},Expires:{location:"header",locationName:"Expires",type:"timestamp"},GrantFullControl:{location:"header",locationName:"x-amz-grant-full-control"},GrantRead:{location:"header",locationName:"x-amz-grant-read"},GrantReadACP:{location:"header",locationName:"x-amz-grant-read-acp"},GrantWriteACP:{location:"header",locationName:"x-amz-grant-write-acp"},Key:{location:"uri",locationName:"Key"},Metadata:{shape:"Sy",location:"headers",locationName:"x-amz-meta-"},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},StorageClass:{location:"header",locationName:"x-amz-storage-class"},WebsiteRedirectLocation:{location:"header",locationName:"x-amz-website-redirect-location"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKey:{shape:"S15",location:"header",locationName:"x-amz-server-side-encryption-customer-key"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}},payload:"Body"},output:{type:"structure",members:{Expiration:{location:"header",locationName:"x-amz-expiration",type:"timestamp"},ETag:{location:"header",locationName:"ETag"},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},VersionId:{location:"header",locationName:"x-amz-version-id"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}}}},PutObjectAcl:{http:{method:"PUT",requestUri:"/{Bucket}/{Key+}?acl"},input:{type:"structure",required:["Bucket","Key"],members:{ACL:{location:"header",locationName:"x-amz-acl"},AccessControlPolicy:{shape:"S6t",xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"AccessControlPolicy"},Bucket:{location:"uri",locationName:"Bucket"},ContentMD5:{location:"header",locationName:"Content-MD5"},GrantFullControl:{location:"header",locationName:"x-amz-grant-full-control"},GrantRead:{location:"header",locationName:"x-amz-grant-read"},GrantReadACP:{location:"header",locationName:"x-amz-grant-read-acp"},GrantWrite:{location:"header",locationName:"x-amz-grant-write"},GrantWriteACP:{location:"header",locationName:"x-amz-grant-write-acp"},Key:{location:"uri",locationName:"Key"}},payload:"AccessControlPolicy"}},RestoreObject:{http:{requestUri:"/{Bucket}/{Key+}?restore"},input:{type:"structure",required:["Bucket","Key"],members:{Bucket:{location:"uri",locationName:"Bucket"},Key:{location:"uri",locationName:"Key"},VersionId:{location:"querystring",locationName:"versionId"},RestoreRequest:{xmlNamespace:{uri:"http://s3.amazonaws.com/doc/2006-03-01/"},locationName:"RestoreRequest",type:"structure",required:["Days"],members:{Days:{type:"integer"}}}},payload:"RestoreRequest"},alias:"PostObjectRestore"},UploadPart:{http:{method:"PUT",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","Key","PartNumber","UploadId"],members:{Body:{streaming:!0,type:"blob"},Bucket:{location:"uri",locationName:"Bucket"},ContentLength:{location:"header",locationName:"Content-Length",type:"integer"},ContentMD5:{location:"header",locationName:"Content-MD5"},Key:{location:"uri",locationName:"Key"},PartNumber:{location:"querystring",locationName:"partNumber",type:"integer"},UploadId:{location:"querystring",locationName:"uploadId"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKey:{shape:"S15",location:"header",locationName:"x-amz-server-side-encryption-customer-key"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"}},payload:"Body"},output:{type:"structure",members:{ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},ETag:{location:"header",locationName:"ETag"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}}}},UploadPartCopy:{http:{method:"PUT",requestUri:"/{Bucket}/{Key+}"},input:{type:"structure",required:["Bucket","CopySource","Key","PartNumber","UploadId"],members:{Bucket:{location:"uri",locationName:"Bucket"},CopySource:{location:"header",locationName:"x-amz-copy-source"},CopySourceIfMatch:{location:"header",locationName:"x-amz-copy-source-if-match"},CopySourceIfModifiedSince:{location:"header",locationName:"x-amz-copy-source-if-modified-since",type:"timestamp"},CopySourceIfNoneMatch:{location:"header",locationName:"x-amz-copy-source-if-none-match"},CopySourceIfUnmodifiedSince:{location:"header",locationName:"x-amz-copy-source-if-unmodified-since",type:"timestamp"},CopySourceRange:{location:"header",locationName:"x-amz-copy-source-range"},Key:{location:"uri",locationName:"Key"},PartNumber:{location:"querystring",locationName:"partNumber",type:"integer"},UploadId:{location:"querystring",locationName:"uploadId"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKey:{shape:"S15",location:"header",locationName:"x-amz-server-side-encryption-customer-key"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},CopySourceSSECustomerAlgorithm:{location:"header",locationName:"x-amz-copy-source-server-side-encryption-customer-algorithm"},CopySourceSSECustomerKey:{shape:"S18",location:"header",locationName:"x-amz-copy-source-server-side-encryption-customer-key"},CopySourceSSECustomerKeyMD5:{location:"header",locationName:"x-amz-copy-source-server-side-encryption-customer-key-MD5"}}},output:{type:"structure",members:{CopySourceVersionId:{location:"header",locationName:"x-amz-copy-source-version-id"},CopyPartResult:{type:"structure",members:{ETag:{},LastModified:{type:"timestamp"}}},ServerSideEncryption:{location:"header",locationName:"x-amz-server-side-encryption"},SSECustomerAlgorithm:{location:"header",locationName:"x-amz-server-side-encryption-customer-algorithm"},SSECustomerKeyMD5:{location:"header",locationName:"x-amz-server-side-encryption-customer-key-MD5"},SSEKMSKeyId:{shape:"Sg",location:"header",locationName:"x-amz-server-side-encryption-aws-kms-key-id"}},payload:"CopyPartResult"}}},shapes:{Sg:{type:"string",sensitive:!0},Sy:{type:"map",key:{},value:{}},S15:{type:"string",sensitive:!0},S18:{type:"string",sensitive:!0},S2b:{type:"structure",members:{DisplayName:{},ID:{}}},S2e:{type:"list",member:{locationName:"Grant",type:"structure",members:{Grantee:{shape:"S2g"},Permission:{}}}},S2g:{type:"structure",required:["Type"],members:{DisplayName:{},EmailAddress:{},ID:{},Type:{type:"string",xmlAttribute:!0,locationName:"xsi:type"},URI:{}},xmlNamespace:{prefix:"xsi",uri:"http://www.w3.org/2001/XMLSchema-instance"}},S2n:{type:"list",member:{type:"structure",members:{AllowedHeaders:{locationName:"AllowedHeader",type:"list",member:{},flattened:!0},AllowedMethods:{locationName:"AllowedMethod",type:"list",member:{},flattened:!0},AllowedOrigins:{locationName:"AllowedOrigin",type:"list",member:{},flattened:!0},ExposeHeaders:{locationName:"ExposeHeader",type:"list",member:{},flattened:!0},MaxAgeSeconds:{type:"integer"}}},flattened:!0},S30:{type:"list",member:{type:"structure",required:["Prefix","Status"],members:{Expiration:{type:"structure",members:{Date:{shape:"S33"},Days:{type:"integer"}}},ID:{},Prefix:{},Status:{},Transition:{type:"structure",members:{Date:{shape:"S33"},Days:{type:"integer"},StorageClass:{}}},NoncurrentVersionTransition:{type:"structure",members:{NoncurrentDays:{type:"integer"},StorageClass:{}}},NoncurrentVersionExpiration:{type:"structure",members:{NoncurrentDays:{type:"integer"}}}}},flattened:!0},S33:{type:"timestamp",timestampFormat:"iso8601"},S3f:{type:"structure",members:{TargetBucket:{},TargetGrants:{type:"list",member:{locationName:"Grant",type:"structure",members:{Grantee:{shape:"S2g"},Permission:{}}}},TargetPrefix:{}}},S3n:{type:"structure",members:{Id:{},Events:{shape:"S3p",locationName:"Event"},Event:{deprecated:!0},Topic:{}}},S3p:{type:"list",member:{},flattened:!0},S3s:{type:"structure",members:{Id:{},Event:{deprecated:!0},Events:{shape:"S3p",locationName:"Event"},Queue:{}}},S3u:{type:"structure",members:{Id:{},Event:{deprecated:!0},Events:{shape:"S3p",locationName:"Event"},CloudFunction:{},InvocationRole:{}}},S45:{type:"list",member:{locationName:"Tag",type:"structure",required:["Key","Value"],members:{Key:{},Value:{}}}},S4e:{type:"structure",required:["HostName"],members:{HostName:{},Protocol:{}}},S4h:{type:"structure",required:["Suffix"],members:{Suffix:{}}},S4j:{type:"structure",required:["Key"],members:{Key:{}}},S4k:{type:"list",member:{locationName:"RoutingRule",type:"structure",required:["Redirect"],members:{Condition:{type:"structure",members:{HttpErrorCodeReturnedEquals:{},KeyPrefixEquals:{}}},Redirect:{type:"structure",members:{HostName:{},HttpRedirectCode:{},Protocol:{},ReplaceKeyPrefixWith:{},ReplaceKeyWith:{}}}}}},S5z:{type:"structure",members:{ID:{},DisplayName:{}}},S60:{type:"list",member:{type:"structure",members:{Prefix:{}}},flattened:!0},S6t:{type:"structure",members:{Grants:{shape:"S2e",locationName:"AccessControlList"},Owner:{shape:"S2b"}}}},paginators:{ListBuckets:{result_key:"Buckets"},ListMultipartUploads:{limit_key:"MaxUploads",more_results:"IsTruncated",output_token:["NextKeyMarker","NextUploadIdMarker"],input_token:["KeyMarker","UploadIdMarker"],result_key:["Uploads","CommonPrefixes"]},ListObjectVersions:{more_results:"IsTruncated",limit_key:"MaxKeys",output_token:["NextKeyMarker","NextVersionIdMarker"],input_token:["KeyMarker","VersionIdMarker"],result_key:["Versions","DeleteMarkers","CommonPrefixes"]},ListObjects:{more_results:"IsTruncated",limit_key:"MaxKeys",output_token:"NextMarker || Contents[-1].Key",input_token:"Marker",result_key:["Contents","CommonPrefixes"]},ListParts:{more_results:"IsTruncated",limit_key:"MaxParts",output_token:"NextPartNumberMarker",input_token:"PartNumberMarker",result_key:"Parts"}},waiters:{__default__:{interval:5,max_attempts:20},BucketExists:{operation:"HeadBucket",ignore_errors:[404],success_type:"output"},BucketNotExists:{operation:"HeadBucket",success_type:"error",success_value:404},ObjectExists:{operation:"HeadObject",ignore_errors:[404],success_type:"output"},ObjectNotExists:{operation:"HeadObject",success_type:"error",success_value:404}}},r.apiLoader.services.sns={},r.SNS=r.Service.defineService("sns",["2010-03-31"]),r.apiLoader.services.sns["2010-03-31"]={metadata:{apiVersion:"2010-03-31",endpointPrefix:"sns",serviceAbbreviation:"Amazon SNS",serviceFullName:"Amazon Simple Notification Service",signatureVersion:"v4",xmlNamespace:"http://sns.amazonaws.com/doc/2010-03-31/",protocol:"query"},operations:{AddPermission:{input:{type:"structure",required:["TopicArn","Label","AWSAccountId","ActionName"],members:{TopicArn:{},Label:{},AWSAccountId:{type:"list",member:{}},ActionName:{type:"list",member:{}}}},http:{}},ConfirmSubscription:{input:{type:"structure",required:["TopicArn","Token"],members:{TopicArn:{},Token:{},AuthenticateOnUnsubscribe:{}}},output:{resultWrapper:"ConfirmSubscriptionResult",type:"structure",members:{SubscriptionArn:{}}},http:{}},CreatePlatformApplication:{input:{type:"structure",required:["Name","Platform","Attributes"],members:{Name:{},Platform:{},Attributes:{shape:"Sf"}}},output:{resultWrapper:"CreatePlatformApplicationResult",type:"structure",members:{PlatformApplicationArn:{}}},http:{}},CreatePlatformEndpoint:{input:{type:"structure",required:["PlatformApplicationArn","Token"],members:{PlatformApplicationArn:{},Token:{},CustomUserData:{},Attributes:{shape:"Sf"}}},output:{resultWrapper:"CreatePlatformEndpointResult",type:"structure",members:{EndpointArn:{}}},http:{}},CreateTopic:{input:{type:"structure",required:["Name"],members:{Name:{}}},output:{resultWrapper:"CreateTopicResult",type:"structure",members:{TopicArn:{}}},http:{}},DeleteEndpoint:{input:{type:"structure",required:["EndpointArn"],members:{EndpointArn:{}}},http:{}},DeletePlatformApplication:{input:{type:"structure",required:["PlatformApplicationArn"],members:{PlatformApplicationArn:{}}},http:{}},DeleteTopic:{input:{type:"structure",required:["TopicArn"],members:{TopicArn:{}}},http:{}},GetEndpointAttributes:{input:{type:"structure",required:["EndpointArn"],members:{EndpointArn:{}}},output:{resultWrapper:"GetEndpointAttributesResult",type:"structure",members:{Attributes:{shape:"Sf"}}},http:{}},GetPlatformApplicationAttributes:{input:{type:"structure",required:["PlatformApplicationArn"],members:{PlatformApplicationArn:{}}},output:{resultWrapper:"GetPlatformApplicationAttributesResult",type:"structure",members:{Attributes:{shape:"Sf"}}},http:{}},GetSubscriptionAttributes:{input:{type:"structure",required:["SubscriptionArn"],members:{SubscriptionArn:{}}},output:{resultWrapper:"GetSubscriptionAttributesResult",type:"structure",members:{Attributes:{type:"map",key:{},value:{}}}},http:{}},GetTopicAttributes:{input:{type:"structure",required:["TopicArn"],members:{TopicArn:{}}},output:{resultWrapper:"GetTopicAttributesResult",type:"structure",members:{Attributes:{type:"map",key:{},value:{}}}},http:{}},ListEndpointsByPlatformApplication:{input:{type:"structure",required:["PlatformApplicationArn"],members:{PlatformApplicationArn:{},NextToken:{}}},output:{resultWrapper:"ListEndpointsByPlatformApplicationResult",type:"structure",members:{Endpoints:{type:"list",member:{type:"structure",members:{EndpointArn:{},Attributes:{shape:"Sf"}}}},NextToken:{}}},http:{}},ListPlatformApplications:{input:{type:"structure",members:{NextToken:{}}},output:{resultWrapper:"ListPlatformApplicationsResult",type:"structure",members:{PlatformApplications:{type:"list",member:{type:"structure",members:{PlatformApplicationArn:{},Attributes:{shape:"Sf"}}}},NextToken:{}}},http:{}},ListSubscriptions:{input:{type:"structure",members:{NextToken:{}}},output:{resultWrapper:"ListSubscriptionsResult",type:"structure",members:{Subscriptions:{shape:"S1c"},NextToken:{}}},http:{}},ListSubscriptionsByTopic:{input:{type:"structure",required:["TopicArn"],members:{TopicArn:{},NextToken:{}}},output:{resultWrapper:"ListSubscriptionsByTopicResult",type:"structure",members:{Subscriptions:{shape:"S1c"},NextToken:{}}},http:{}},ListTopics:{input:{type:"structure",members:{NextToken:{}}},output:{resultWrapper:"ListTopicsResult",type:"structure",members:{Topics:{type:"list",member:{type:"structure",members:{TopicArn:{}}}},NextToken:{}}},http:{}},Publish:{input:{type:"structure",required:["Message"],members:{TopicArn:{},TargetArn:{},Message:{},Subject:{},MessageStructure:{},MessageAttributes:{type:"map",key:{locationName:"Name"},value:{locationName:"Value",type:"structure",required:["DataType"],members:{DataType:{},StringValue:{},BinaryValue:{type:"blob"}}}}}},output:{resultWrapper:"PublishResult",type:"structure",members:{MessageId:{}}},http:{}},RemovePermission:{input:{type:"structure",required:["TopicArn","Label"],members:{TopicArn:{},Label:{}}},http:{}},SetEndpointAttributes:{input:{type:"structure",required:["EndpointArn","Attributes"],members:{EndpointArn:{},Attributes:{shape:"Sf"}}},http:{}},SetPlatformApplicationAttributes:{input:{type:"structure",required:["PlatformApplicationArn","Attributes"],members:{PlatformApplicationArn:{},Attributes:{shape:"Sf"}}},http:{}},SetSubscriptionAttributes:{input:{type:"structure",required:["SubscriptionArn","AttributeName"],members:{SubscriptionArn:{},AttributeName:{},AttributeValue:{}}},http:{}},SetTopicAttributes:{input:{type:"structure",required:["TopicArn","AttributeName"],members:{TopicArn:{},AttributeName:{},AttributeValue:{}}},http:{}},Subscribe:{input:{type:"structure",required:["TopicArn","Protocol"],members:{TopicArn:{},Protocol:{},Endpoint:{}}},output:{resultWrapper:"SubscribeResult",type:"structure",members:{SubscriptionArn:{}}},http:{}},Unsubscribe:{input:{type:"structure",required:["SubscriptionArn"],members:{SubscriptionArn:{}}},http:{}}},shapes:{Sf:{type:"map",key:{},value:{}},S1c:{type:"list",member:{type:"structure",members:{SubscriptionArn:{},Owner:{},Protocol:{},Endpoint:{},TopicArn:{}}}}},paginators:{ListEndpointsByPlatformApplication:{input_token:"NextToken",output_token:"NextToken",result_key:"Endpoints"},ListPlatformApplications:{input_token:"NextToken",output_token:"NextToken",result_key:"PlatformApplications"},ListSubscriptions:{input_token:"NextToken",output_token:"NextToken",result_key:"Subscriptions"},ListSubscriptionsByTopic:{input_token:"NextToken",output_token:"NextToken",result_key:"Subscriptions"},ListTopics:{input_token:"NextToken",output_token:"NextToken",result_key:"Topics"}}},r.apiLoader.services.sqs={},r.SQS=r.Service.defineService("sqs",["2012-11-05"]),e("./services/sqs"),r.apiLoader.services.sqs["2012-11-05"]={metadata:{apiVersion:"2012-11-05",endpointPrefix:"sqs",serviceAbbreviation:"Amazon SQS",serviceFullName:"Amazon Simple Queue Service",signatureVersion:"v4",xmlNamespace:"http://queue.amazonaws.com/doc/2012-11-05/",protocol:"query"},operations:{AddPermission:{input:{type:"structure",required:["QueueUrl","Label","AWSAccountIds","Actions"],members:{QueueUrl:{},Label:{},AWSAccountIds:{type:"list",member:{locationName:"AWSAccountId"},flattened:!0},Actions:{type:"list",member:{locationName:"ActionName"},flattened:!0}}},http:{}},ChangeMessageVisibility:{input:{type:"structure",required:["QueueUrl","ReceiptHandle","VisibilityTimeout"],members:{QueueUrl:{},ReceiptHandle:{},VisibilityTimeout:{type:"integer"}}},http:{}},ChangeMessageVisibilityBatch:{input:{type:"structure",required:["QueueUrl","Entries"],members:{QueueUrl:{},Entries:{type:"list",member:{locationName:"ChangeMessageVisibilityBatchRequestEntry",type:"structure",required:["Id","ReceiptHandle"],members:{Id:{},ReceiptHandle:{},VisibilityTimeout:{type:"integer"}}},flattened:!0}}},output:{resultWrapper:"ChangeMessageVisibilityBatchResult",type:"structure",required:["Successful","Failed"],members:{Successful:{type:"list",member:{locationName:"ChangeMessageVisibilityBatchResultEntry",type:"structure",required:["Id"],members:{Id:{}}},flattened:!0},Failed:{shape:"Sd"}}},http:{}},CreateQueue:{input:{type:"structure",required:["QueueName"],members:{QueueName:{},Attributes:{shape:"Sh",locationName:"Attribute"}}},output:{resultWrapper:"CreateQueueResult",type:"structure",members:{QueueUrl:{}}},http:{}},DeleteMessage:{input:{type:"structure",required:["QueueUrl","ReceiptHandle"],members:{QueueUrl:{},ReceiptHandle:{}}},http:{}},DeleteMessageBatch:{input:{type:"structure",required:["QueueUrl","Entries"],members:{QueueUrl:{},Entries:{type:"list",member:{locationName:"DeleteMessageBatchRequestEntry",type:"structure",required:["Id","ReceiptHandle"],members:{Id:{},ReceiptHandle:{}}},flattened:!0}}},output:{resultWrapper:"DeleteMessageBatchResult",type:"structure",required:["Successful","Failed"],members:{Successful:{type:"list",member:{locationName:"DeleteMessageBatchResultEntry",type:"structure",required:["Id"],members:{Id:{}}},flattened:!0},Failed:{shape:"Sd"}}},http:{}},DeleteQueue:{input:{type:"structure",required:["QueueUrl"],members:{QueueUrl:{}}},http:{}},GetQueueAttributes:{input:{type:"structure",required:["QueueUrl"],members:{QueueUrl:{},AttributeNames:{shape:"St"}}},output:{resultWrapper:"GetQueueAttributesResult",type:"structure",members:{Attributes:{shape:"Sh",locationName:"Attribute"}}},http:{}},GetQueueUrl:{input:{type:"structure",required:["QueueName"],members:{QueueName:{},QueueOwnerAWSAccountId:{}}},output:{resultWrapper:"GetQueueUrlResult",type:"structure",members:{QueueUrl:{}}},http:{}},ListDeadLetterSourceQueues:{input:{type:"structure",required:["QueueUrl"],members:{QueueUrl:{}}},output:{resultWrapper:"ListDeadLetterSourceQueuesResult",type:"structure",required:["queueUrls"],members:{queueUrls:{shape:"Sz"}}},http:{}},ListQueues:{input:{type:"structure",members:{QueueNamePrefix:{}}},output:{resultWrapper:"ListQueuesResult",type:"structure",members:{QueueUrls:{shape:"Sz"}}},http:{}},PurgeQueue:{input:{type:"structure",required:["QueueUrl"],members:{QueueUrl:{}}},http:{}},ReceiveMessage:{input:{type:"structure",required:["QueueUrl"],members:{QueueUrl:{},AttributeNames:{shape:"St"},MessageAttributeNames:{type:"list",member:{locationName:"MessageAttributeName"},flattened:!0},MaxNumberOfMessages:{type:"integer"},VisibilityTimeout:{type:"integer"},WaitTimeSeconds:{type:"integer"}}},output:{resultWrapper:"ReceiveMessageResult",type:"structure",members:{Messages:{type:"list",member:{locationName:"Message",type:"structure",members:{MessageId:{},ReceiptHandle:{},MD5OfBody:{},Body:{},Attributes:{shape:"Sh",locationName:"Attribute"},MD5OfMessageAttributes:{},MessageAttributes:{shape:"S19",locationName:"MessageAttribute"}}},flattened:!0}}},http:{}},RemovePermission:{input:{type:"structure",required:["QueueUrl","Label"],members:{QueueUrl:{},Label:{}}},http:{}},SendMessage:{input:{type:"structure",required:["QueueUrl","MessageBody"],members:{QueueUrl:{},MessageBody:{},DelaySeconds:{type:"integer"},MessageAttributes:{shape:"S19",locationName:"MessageAttribute"}}},output:{resultWrapper:"SendMessageResult",type:"structure",members:{MD5OfMessageBody:{},MD5OfMessageAttributes:{},MessageId:{}}},http:{}},SendMessageBatch:{input:{type:"structure",required:["QueueUrl","Entries"],members:{QueueUrl:{},Entries:{type:"list",member:{locationName:"SendMessageBatchRequestEntry",type:"structure",required:["Id","MessageBody"],members:{Id:{},MessageBody:{},DelaySeconds:{type:"integer"},MessageAttributes:{shape:"S19",locationName:"MessageAttribute"}}},flattened:!0}}},output:{resultWrapper:"SendMessageBatchResult",type:"structure",required:["Successful","Failed"],members:{Successful:{type:"list",member:{locationName:"SendMessageBatchResultEntry",type:"structure",required:["Id","MessageId","MD5OfMessageBody"],members:{Id:{},MessageId:{},MD5OfMessageBody:{},MD5OfMessageAttributes:{}}},flattened:!0},Failed:{shape:"Sd"}}},http:{}},SetQueueAttributes:{input:{type:"structure",required:["QueueUrl","Attributes"],members:{QueueUrl:{},Attributes:{shape:"Sh",locationName:"Attribute"}}},http:{}}},shapes:{Sd:{type:"list",member:{locationName:"BatchResultErrorEntry",type:"structure",required:["Id","SenderFault","Code"],members:{Id:{},SenderFault:{type:"boolean"},Code:{},Message:{}}},flattened:!0},Sh:{type:"map",key:{locationName:"Name"},value:{locationName:"Value"},flattened:!0,locationName:"Attribute"},St:{type:"list",member:{locationName:"AttributeName"},flattened:!0},Sz:{type:"list",member:{locationName:"QueueUrl"},flattened:!0},S19:{type:"map",key:{locationName:"Name"},value:{locationName:"Value",type:"structure",required:["DataType"],members:{StringValue:{},BinaryValue:{type:"blob"},StringListValues:{flattened:!0,locationName:"StringListValue",type:"list",member:{locationName:"StringListValue"}},BinaryListValues:{flattened:!0,locationName:"BinaryListValue",type:"list",member:{locationName:"BinaryListValue",type:"blob"}},DataType:{}}},flattened:!0}},paginators:{ListQueues:{result_key:"QueueUrls"}}},r.apiLoader.services.sts={},r.STS=r.Service.defineService("sts",["2011-06-15"]),e("./services/sts"),r.apiLoader.services.sts["2011-06-15"]={version:"2.0",metadata:{apiVersion:"2011-06-15",endpointPrefix:"sts",globalEndpoint:"sts.amazonaws.com",serviceAbbreviation:"AWS STS",serviceFullName:"AWS Security Token Service",signatureVersion:"v4",xmlNamespace:"https://sts.amazonaws.com/doc/2011-06-15/",protocol:"query"},operations:{AssumeRole:{input:{type:"structure",required:["RoleArn","RoleSessionName"],members:{RoleArn:{},RoleSessionName:{},Policy:{},DurationSeconds:{type:"integer"},ExternalId:{},SerialNumber:{},TokenCode:{}}},output:{resultWrapper:"AssumeRoleResult",type:"structure",members:{Credentials:{shape:"Sa"},AssumedRoleUser:{shape:"Sf"},PackedPolicySize:{type:"integer"}}},http:{}},AssumeRoleWithSAML:{input:{type:"structure",required:["RoleArn","PrincipalArn","SAMLAssertion"],members:{RoleArn:{},PrincipalArn:{},SAMLAssertion:{},Policy:{},DurationSeconds:{type:"integer"}}},output:{resultWrapper:"AssumeRoleWithSAMLResult",type:"structure",members:{Credentials:{shape:"Sa"},AssumedRoleUser:{shape:"Sf"},PackedPolicySize:{type:"integer"},Subject:{},SubjectType:{},Issuer:{},Audience:{},NameQualifier:{}}},http:{}},AssumeRoleWithWebIdentity:{input:{type:"structure",required:["RoleArn","RoleSessionName","WebIdentityToken"],members:{RoleArn:{},RoleSessionName:{},WebIdentityToken:{},ProviderId:{},Policy:{},DurationSeconds:{type:"integer"}}},output:{resultWrapper:"AssumeRoleWithWebIdentityResult",type:"structure",members:{Credentials:{shape:"Sa"},SubjectFromWebIdentityToken:{},AssumedRoleUser:{shape:"Sf"},PackedPolicySize:{type:"integer"},Provider:{},Audience:{}}},http:{}},DecodeAuthorizationMessage:{input:{type:"structure",required:["EncodedMessage"],members:{EncodedMessage:{}}},output:{resultWrapper:"DecodeAuthorizationMessageResult",type:"structure",members:{DecodedMessage:{}}},http:{}},GetFederationToken:{input:{type:"structure",required:["Name"],members:{Name:{},Policy:{},DurationSeconds:{type:"integer"}}},output:{resultWrapper:"GetFederationTokenResult",type:"structure",members:{Credentials:{shape:"Sa"},FederatedUser:{type:"structure",required:["FederatedUserId","Arn"],members:{FederatedUserId:{},Arn:{}}},PackedPolicySize:{type:"integer"}}},http:{}},GetSessionToken:{input:{type:"structure",members:{DurationSeconds:{type:"integer"},SerialNumber:{},TokenCode:{}}},output:{resultWrapper:"GetSessionTokenResult",type:"structure",members:{Credentials:{shape:"Sa"}}},http:{}}},shapes:{Sa:{type:"structure",required:["AccessKeyId","SecretAccessKey","SessionToken","Expiration"],members:{AccessKeyId:{},SecretAccessKey:{},SessionToken:{},Expiration:{type:"timestamp"}}},Sf:{type:"structure",required:["AssumedRoleId","Arn"],members:{AssumedRoleId:{},Arn:{}}}}}
},{"./core":3,"./http/xhr":12,"./services/cognitoidentity":36,"./services/dynamodb":37,"./services/s3":38,"./services/sqs":39,"./services/sts":40,"./xml/browser_parser":50}],2:[function(e){var t=e("./core");e("./credentials"),e("./credentials/credential_provider_chain"),t.Config=t.util.inherit({constructor:function(e){void 0===e&&(e={}),e=this.extractCredentials(e),t.util.each.call(this,this.keys,function(t,r){this.set(t,e[t],r)})},getCredentials:function(e){function r(t){e(t,t?null:a.credentials)}function n(e,r){return new t.util.error(r||new Error,{code:"CredentialsError",message:e})}function i(){a.credentials.get(function(e){if(e){var t="Could not load credentials from "+a.credentials.constructor.name;e=n(t,e)}r(e)})}function o(){var e=null;a.credentials.accessKeyId&&a.credentials.secretAccessKey||(e=n("Missing credentials")),r(e)}var a=this;a.credentials?"function"==typeof a.credentials.get?i():o():a.credentialProvider?a.credentialProvider.resolve(function(e,t){e&&(e=n("Could not load credentials from any providers",e)),a.credentials=t,r(e)}):r(n("No credentials to load"))},update:function(e,r){r=r||!1,e=this.extractCredentials(e),t.util.each.call(this,e,function(e,n){(r||this.keys.hasOwnProperty(e)||t.Service.hasService(e))&&this.set(e,n)})},loadFromPath:function(e){this.clear();var r=JSON.parse(t.util.readFileSync(e)),n=new t.FileSystemCredentials(e),i=new t.CredentialProviderChain;return i.providers.unshift(n),i.resolve(function(e,t){if(e)throw e;r.credentials=t}),this.constructor(r),this},clear:function(){t.util.each.call(this,this.keys,function(e){delete this[e]}),this.set("credentials",void 0),this.set("credentialProvider",void 0)},set:function(e,r,n){void 0===r?(void 0===n&&(n=this.keys[e]),this[e]="function"==typeof n?n.call(this):n):this[e]="httpOptions"===e&&this[e]?t.util.merge(this[e],r):r},keys:{credentials:null,credentialProvider:null,region:null,logger:null,apiVersions:{},apiVersion:null,endpoint:void 0,httpOptions:{timeout:12e4},maxRetries:void 0,maxRedirects:10,paramValidation:!0,sslEnabled:!0,s3ForcePathStyle:!1,s3BucketEndpoint:!1,computeChecksums:!0,convertResponseTypes:!0,dynamoDbCrc32:!0,systemClockOffset:0,signatureVersion:null},extractCredentials:function(e){return e.accessKeyId&&e.secretAccessKey&&(e=t.util.copy(e),e.credentials=new t.Credentials(e)),e}}),t.config=new t.Config},{"./core":3,"./credentials":4,"./credentials/credential_provider_chain":6}],3:[function(e,t){var r={util:e("./util")},n={};n.toString(),t.exports=r,r.util.update(r,{VERSION:"2.1.16",Signers:{},Protocol:{Json:e("./protocol/json"),Query:e("./protocol/query"),Rest:e("./protocol/rest"),RestJson:e("./protocol/rest_json"),RestXml:e("./protocol/rest_xml")},XML:{Builder:e("./xml/builder"),Parser:null},JSON:{Builder:e("./json/builder"),Parser:e("./json/parser")},Model:{Api:e("./model/api"),Operation:e("./model/operation"),Shape:e("./model/shape"),Paginator:e("./model/paginator"),ResourceWaiter:e("./model/resource_waiter")},util:e("./util"),apiLoader:function(){throw new Error("No API loader set")}}),e("./service"),e("./credentials"),e("./credentials/credential_provider_chain"),e("./credentials/temporary_credentials"),e("./credentials/web_identity_credentials"),e("./credentials/cognito_identity_credentials"),e("./credentials/saml_credentials"),e("./config"),e("./http"),e("./sequential_executor"),e("./event_listeners"),e("./request"),e("./response"),e("./resource_waiter"),e("./signers/request_signer"),e("./param_validator"),r.events=new r.SequentialExecutor},{"./config":2,"./credentials":4,"./credentials/cognito_identity_credentials":5,"./credentials/credential_provider_chain":6,"./credentials/saml_credentials":7,"./credentials/temporary_credentials":8,"./credentials/web_identity_credentials":9,"./event_listeners":10,"./http":11,"./json/builder":13,"./json/parser":14,"./model/api":15,"./model/operation":17,"./model/paginator":18,"./model/resource_waiter":19,"./model/shape":20,"./param_validator":21,"./protocol/json":22,"./protocol/query":23,"./protocol/rest":24,"./protocol/rest_json":25,"./protocol/rest_xml":26,"./request":30,"./resource_waiter":31,"./response":32,"./sequential_executor":34,"./service":35,"./signers/request_signer":42,"./util":49,"./xml/builder":51}],4:[function(e){var t=e("./core");t.Credentials=t.util.inherit({constructor:function(){if(t.util.hideProperties(this,["secretAccessKey"]),this.expired=!1,this.expireTime=null,1===arguments.length&&"object"==typeof arguments[0]){var e=arguments[0].credentials||arguments[0];this.accessKeyId=e.accessKeyId,this.secretAccessKey=e.secretAccessKey,this.sessionToken=e.sessionToken}else this.accessKeyId=arguments[0],this.secretAccessKey=arguments[1],this.sessionToken=arguments[2]},expiryWindow:15,needsRefresh:function(){var e=t.util.date.getDate().getTime(),r=new Date(e+1e3*this.expiryWindow);return this.expireTime&&r>this.expireTime?!0:this.expired||!this.accessKeyId||!this.secretAccessKey},get:function(e){var t=this;this.needsRefresh()?this.refresh(function(r){r||(t.expired=!1),e&&e(r)}):e&&e()},refresh:function(e){this.expired=!1,e()}})},{"./core":3}],5:[function(e){var t=e("../core");t.CognitoIdentityCredentials=t.util.inherit(t.Credentials,{localStorageKey:{id:"aws.cognito.identity-id.",providers:"aws.cognito.identity-providers."},constructor:function(e){t.Credentials.call(this),this.expired=!0,this.webIdentityCredentials=new t.WebIdentityCredentials(e),this.cognito=new t.CognitoIdentity({params:e}),this.sts=new t.STS,this.params=e,this.data=null,this.identityId=null,this.loadCachedId()},refresh:function(e){var t=this;t.data=null,t.identityId=null,t.getId(function(r){r?(t.clearCachedId(),e(r)):t.params.RoleArn?t.getCredentialsFromSTS(e):t.getCredentialsForIdentity(e)})},clearCachedId:function(){var e=this.params.IdentityPoolId;delete this.storage[this.localStorageKey.id+e],delete this.storage[this.localStorageKey.providers+e]},getId:function(e){var t=this;return"string"==typeof t.params.IdentityId?e(null,t.params.IdentityId):void t.cognito.getId(function(r,n){!r&&n.IdentityId?(t.params.IdentityId=n.IdentityId,e(null,n.IdentityId)):e(r)})},loadCredentials:function(e,t){e&&t&&(t.expired=!1,t.accessKeyId=e.Credentials.AccessKeyId,t.secretAccessKey=e.Credentials.SecretKey,t.sessionToken=e.Credentials.SessionToken,t.expireTime=e.Credentials.Expiration)},getCredentialsForIdentity:function(e){var t=this;t.cognito.getCredentialsForIdentity(function(r,n){r?t.clearCachedId():(t.cacheId(n),t.data=n,t.loadCredentials(t.data,t)),e(r)})},getCredentialsFromSTS:function(e){var t=this;t.cognito.getOpenIdToken(function(r,n){r?(t.clearCachedId(),e(r)):(t.cacheId(n),t.params.WebIdentityToken=n.Token,t.webIdentityCredentials.refresh(function(r){r?t.clearCachedId():(t.data=t.webIdentityCredentials.data,t.sts.credentialsFrom(t.data,t)),e(r)}))})},loadCachedId:function(){var e=this;if(t.util.isBrowser()&&!e.params.IdentityId){var r=e.getStorage("id");if(r&&e.params.Logins){var n=Object.keys(e.params.Logins),i=(e.getStorage("providers")||"").split(","),o=i.filter(function(e){return-1!==n.indexOf(e)});0!==o.length&&(e.params.IdentityId=r)}else r&&(e.params.IdentityId=r)}},cacheId:function(e){this.identityId=e.IdentityId,this.params.IdentityId=this.identityId,t.util.isBrowser()&&(this.setStorage("id",e.IdentityId),this.params.Logins&&this.setStorage("providers",Object.keys(this.params.Logins).join(",")))},getStorage:function(e){return this.storage[this.localStorageKey[e]+this.params.IdentityPoolId]},setStorage:function(e,t){try{this.storage[this.localStorageKey[e]+this.params.IdentityPoolId]=t}catch(r){}},storage:function(){try{return t.util.isBrowser()&&"object"==typeof window.localStorage?window.localStorage:{}}catch(e){return{}}}()})},{"../core":3}],6:[function(e){var t=e("../core");t.CredentialProviderChain=t.util.inherit(t.Credentials,{constructor:function(e){this.providers=e?e:t.CredentialProviderChain.defaultProviders.slice(0)},resolve:function(e){function t(i,o){if(!i&&o||r===n.length)return void e(i,o);var a=n[r++];o="function"==typeof a?a.call():a,o.get?o.get(function(e){t(e,e?null:o)}):t(null,o)}if(0===this.providers.length)return e(new Error("No providers")),this;var r=0,n=this.providers.slice(0);return t(),this}}),t.CredentialProviderChain.defaultProviders=[]},{"../core":3}],7:[function(e){var t=e("../core");t.SAMLCredentials=t.util.inherit(t.Credentials,{constructor:function(e){t.Credentials.call(this),this.expired=!0,this.params=e,this.service=new t.STS({params:this.params})},refresh:function(e){var t=this;e||(e=function(e){if(e)throw e}),t.service.assumeRoleWithSAML(function(r,n){r||t.service.credentialsFrom(n,t),e(r)})}})},{"../core":3}],8:[function(e){var t=e("../core");t.TemporaryCredentials=t.util.inherit(t.Credentials,{constructor:function(e){t.Credentials.call(this),this.loadMasterCredentials(),this.expired=!0,this.params=e||{},this.params.RoleArn&&(this.params.RoleSessionName=this.params.RoleSessionName||"temporary-credentials"),this.service=new t.STS({params:this.params})},refresh:function(e){var t=this;e||(e=function(e){if(e)throw e}),t.service.config.credentials=t.masterCredentials;var r=t.params.RoleArn?t.service.assumeRole:t.service.getSessionToken;r.call(t.service,function(r,n){r||t.service.credentialsFrom(n,t),e(r)})},loadMasterCredentials:function(){for(this.masterCredentials=t.config.credentials;this.masterCredentials.masterCredentials;)this.masterCredentials=this.masterCredentials.masterCredentials}})},{"../core":3}],9:[function(e){var t=e("../core");t.WebIdentityCredentials=t.util.inherit(t.Credentials,{constructor:function(e){t.Credentials.call(this),this.expired=!0,this.params=e,this.params.RoleSessionName=this.params.RoleSessionName||"web-identity",this.service=new t.STS({params:this.params}),this.data=null},refresh:function(e){var t=this;e||(e=function(e){if(e)throw e}),t.service.assumeRoleWithWebIdentity(function(r,n){t.data=null,r||(t.data=n,t.service.credentialsFrom(n,t)),e(r)})}})},{"../core":3}],10:[function(e){var t=e("./core"),r=e("./sequential_executor");t.EventListeners={Core:{}},t.EventListeners={Core:(new r).addNamedListeners(function(e,r){r("VALIDATE_CREDENTIALS","validate",function(e,r){return e.service.api.signatureVersion?void e.service.config.getCredentials(function(n){n&&(e.response.error=t.util.error(n,{code:"CredentialsError",message:"Missing credentials in config"})),r()}):r()}),e("VALIDATE_REGION","validate",function(e){e.service.config.region||e.service.isGlobalEndpoint||(e.response.error=t.util.error(new Error,{code:"ConfigError",message:"Missing region in config"}))}),e("VALIDATE_PARAMETERS","validate",function(e){var r=e.service.api.operations[e.operation].input;(new t.ParamValidator).validate(r,e.params)}),e("SET_CONTENT_LENGTH","afterBuild",function(e){if(void 0===e.httpRequest.headers["Content-Length"]){var r=t.util.string.byteLength(e.httpRequest.body);e.httpRequest.headers["Content-Length"]=r}}),e("SET_HTTP_HOST","afterBuild",function(e){e.httpRequest.headers.Host=e.httpRequest.endpoint.host}),e("RESTART","restart",function(){var e=this.response.error;e&&e.retryable&&(this.response.retryCount<this.service.config.maxRetries?this.response.retryCount++:this.response.error=null)}),r("SIGN","sign",function(e,r){return e.service.api.signatureVersion?void e.service.config.getCredentials(function(n,i){if(n)return e.response.error=n,r();try{var o=t.util.date.getDate(),a=e.service.getSignerClass(e),s=new a(e.httpRequest,e.service.api.signingName||e.service.api.endpointPrefix);delete e.httpRequest.headers.Authorization,delete e.httpRequest.headers.Date,delete e.httpRequest.headers["X-Amz-Date"],s.addAuthorization(i,o),e.signedAt=o}catch(u){e.response.error=u}r()}):r()}),e("VALIDATE_RESPONSE","validateResponse",function(e){this.service.successfulResponse(e,this)?(e.data={},e.error=null):(e.data=null,e.error=t.util.error(new Error,{code:"UnknownError",message:"An unknown error occurred."}))}),r("SEND","send",function(e,r){function n(n){e.httpResponse.stream=n,n.on("headers",function(r,i){e.request.emit("httpHeaders",[r,i,e]),e.httpResponse.streaming||(2===t.HttpClient.streamsApiVersion?n.on("readable",function(){var t=n.read();null!==t&&e.request.emit("httpData",[t,e])}):n.on("data",function(t){e.request.emit("httpData",[t,e])}))}),n.on("end",function(){e.request.emit("httpDone"),r()})}function i(t){t.on("sendProgress",function(t){e.request.emit("httpUploadProgress",[t,e])}),t.on("receiveProgress",function(t){e.request.emit("httpDownloadProgress",[t,e])})}function o(n){e.error=t.util.error(n,{code:"NetworkingError",region:e.request.httpRequest.region,hostname:e.request.httpRequest.endpoint.hostname,retryable:!0}),e.request.emit("httpError",[e.error,e],function(){r()})}function a(){var r=t.HttpClient.getInstance(),a=e.request.service.config.httpOptions||{};try{var s=r.handleRequest(e.request.httpRequest,a,n,o);i(s)}catch(u){o(u)}}e.httpResponse._abortCallback=r,e.error=null,e.data=null;var s=(t.util.date.getDate()-this.signedAt)/1e3;s>=600?this.emit("sign",[this],function(e){e?r(e):a()}):a()}),e("HTTP_HEADERS","httpHeaders",function(e,r,n){n.httpResponse.statusCode=e,n.httpResponse.headers=r,n.httpResponse.body=new t.util.Buffer(""),n.httpResponse.buffers=[],n.httpResponse.numBytes=0}),e("HTTP_DATA","httpData",function(e,r){if(e){if(t.util.isNode()){r.httpResponse.numBytes+=e.length;var n=r.httpResponse.headers["content-length"],i={loaded:r.httpResponse.numBytes,total:n};r.request.emit("httpDownloadProgress",[i,r])}r.httpResponse.buffers.push(new t.util.Buffer(e))}}),e("HTTP_DONE","httpDone",function(e){if(e.httpResponse.buffers&&e.httpResponse.buffers.length>0){var r=t.util.buffer.concat(e.httpResponse.buffers);e.httpResponse.body=r}delete e.httpResponse.numBytes,delete e.httpResponse.buffers}),e("FINALIZE_ERROR","retry",function(e){e.httpResponse.statusCode&&(e.error.statusCode=e.httpResponse.statusCode,void 0===e.error.retryable&&(e.error.retryable=this.service.retryableError(e.error,this)))}),e("INVALIDATE_CREDENTIALS","retry",function(e){if(e.error)switch(e.error.code){case"RequestExpired":case"ExpiredTokenException":case"ExpiredToken":e.error.retryable=!0,e.request.service.config.credentials.expired=!0}}),e("EXPIRED_SIGNATURE","retry",function(e){var t=e.error;t&&"string"==typeof t.code&&"string"==typeof t.message&&t.code.match(/Signature/)&&t.message.match(/expired/)&&(e.error.retryable=!0)}),e("REDIRECT","retry",function(e){e.error&&e.error.statusCode>=300&&e.error.statusCode<400&&e.httpResponse.headers.location&&(this.httpRequest.endpoint=new t.Endpoint(e.httpResponse.headers.location),this.httpRequest.headers.Host=this.httpRequest.endpoint.host,e.error.redirect=!0,e.error.retryable=!0)}),e("RETRY_CHECK","retry",function(e){if(e.error)if(e.error.redirect&&e.redirectCount<e.maxRedirects)e.error.retryDelay=0;else if(e.retryCount<e.maxRetries){var t=this.service.retryDelays();e.error.retryDelay=t[e.retryCount]||0}}),r("RESET_RETRY_STATE","afterRetry",function(e,t){var r,n=!1;e.error&&(r=e.error.retryDelay||0,e.error.retryable&&e.retryCount<e.maxRetries?(e.retryCount++,n=!0):e.error.redirect&&e.redirectCount<e.maxRedirects&&(e.redirectCount++,n=!0)),n?(e.error=null,setTimeout(t,r)):t()})}),CorePost:(new r).addNamedListeners(function(e){e("EXTRACT_REQUEST_ID","extractData",function(e){e.requestId||(e.requestId=e.httpResponse.headers["x-amz-request-id"]||e.httpResponse.headers["x-amzn-requestid"]),!e.requestId&&e.data&&e.data.ResponseMetadata&&(e.requestId=e.data.ResponseMetadata.RequestId)}),e("ENOTFOUND_ERROR","httpError",function(e){if("NetworkingError"===e.code&&"ENOTFOUND"===e.errno){var r="Inaccessible host: `"+e.hostname+"'. This service may not be available in the `"+e.region+"' region.";this.response.error=t.util.error(new Error(r),{code:"UnknownEndpoint",region:e.region,hostname:e.hostname,retryable:!1,originalError:e})}})}),Logger:(new r).addNamedListeners(function(r){r("LOG_REQUEST","complete",function(r){function n(){var n=t.util.date.getDate().getTime(),a=(n-i.startTime.getTime())/1e3,s=o.isTTY?!0:!1,u=r.httpResponse.statusCode,c=e("util").inspect(i.params,!0,null),p="";return s&&(p+="[33m"),p+="[AWS "+i.service.serviceIdentifier+" "+u,p+=" "+a.toString()+"s "+r.retryCount+" retries]",s&&(p+="[0;1m"),p+=" "+t.util.string.lowerFirst(i.operation),p+="("+c+")",s&&(p+="[0m"),p}var i=r.request,o=i.service.config.logger;if(o){var a=n();"function"==typeof o.log?o.log(a):"function"==typeof o.write&&o.write(a+"\n")}})}),Json:(new r).addNamedListeners(function(t){var r=e("./protocol/json");t("BUILD","build",r.buildRequest),t("EXTRACT_DATA","extractData",r.extractData),t("EXTRACT_ERROR","extractError",r.extractError)}),Rest:(new r).addNamedListeners(function(t){var r=e("./protocol/rest");t("BUILD","build",r.buildRequest),t("EXTRACT_DATA","extractData",r.extractData),t("EXTRACT_ERROR","extractError",r.extractError)}),RestJson:(new r).addNamedListeners(function(t){var r=e("./protocol/rest_json");t("BUILD","build",r.buildRequest),t("EXTRACT_DATA","extractData",r.extractData),t("EXTRACT_ERROR","extractError",r.extractError)}),RestXml:(new r).addNamedListeners(function(t){var r=e("./protocol/rest_xml");t("BUILD","build",r.buildRequest),t("EXTRACT_DATA","extractData",r.extractData),t("EXTRACT_ERROR","extractError",r.extractError)}),Query:(new r).addNamedListeners(function(t){var r=e("./protocol/query");t("BUILD","build",r.buildRequest),t("EXTRACT_DATA","extractData",r.extractData),t("EXTRACT_ERROR","extractError",r.extractError)})}},{"./core":3,"./protocol/json":22,"./protocol/query":23,"./protocol/rest":24,"./protocol/rest_json":25,"./protocol/rest_xml":26,"./sequential_executor":34,util:70}],11:[function(e){var t=e("./core"),r=t.util.inherit;t.Endpoint=r({constructor:function(e,r){if(t.util.hideProperties(this,["slashes","auth","hash","search","query"]),"undefined"==typeof e||null===e)throw new Error("Invalid endpoint: "+e);if("string"!=typeof e)return t.util.copy(e);if(!e.match(/^http/)){var n=r&&void 0!==r.sslEnabled?r.sslEnabled:t.config.sslEnabled;e=(n?"https":"http")+"://"+e}t.util.update(this,t.util.urlParse(e)),this.port=this.port?parseInt(this.port,10):"https:"===this.protocol?443:80}}),t.HttpRequest=r({constructor:function(e,r){e=new t.Endpoint(e),this.method="POST",this.path=e.path||"/",this.headers={},this.body="",this.endpoint=e,this.region=r,this.setUserAgent()},setUserAgent:function(){var e=t.util.isBrowser()?"X-Amz-":"";this.headers[e+"User-Agent"]=t.util.userAgent()},pathname:function(){return this.path.split("?",1)[0]},search:function(){var e=this.path.split("?",2)[1];return e?(e=t.util.queryStringParse(e),t.util.queryParamsToString(e)):""}}),t.HttpResponse=r({constructor:function(){this.statusCode=void 0,this.headers={},this.body=void 0,this.streaming=!1,this.stream=null},createUnbufferedStream:function(){return this.streaming=!0,this.stream}}),t.HttpClient=r({}),t.HttpClient.getInstance=function(){return void 0===this.singleton&&(this.singleton=new this),this.singleton}},{"./core":3}],12:[function(e){var t=e("../core"),r=e("events").EventEmitter;e("../http"),t.XHRClient=t.util.inherit({handleRequest:function(e,n,i,o){var a=this,s=e.endpoint,u=new r,c=s.protocol+"//"+s.hostname;80!==s.port&&443!==s.port&&(c+=":"+s.port),c+=e.path;var p=new XMLHttpRequest,l=!1;e.stream=p,p.addEventListener("readystatechange",function(){try{if(0===p.status)return}catch(e){return}if(this.readyState>=this.HEADERS_RECEIVED&&!l){try{p.responseType="arraybuffer"}catch(e){}u.statusCode=p.status,u.headers=a.parseHeaders(p.getAllResponseHeaders()),u.emit("headers",u.statusCode,u.headers),l=!0}this.readyState===this.DONE&&a.finishRequest(p,u)},!1),p.upload.addEventListener("progress",function(e){u.emit("sendProgress",e)}),p.addEventListener("progress",function(e){u.emit("receiveProgress",e)},!1),p.addEventListener("timeout",function(){o(t.util.error(new Error("Timeout"),{code:"TimeoutError"}))},!1),p.addEventListener("error",function(){o(t.util.error(new Error("Network Failure"),{code:"NetworkingError"}))},!1),i(u),p.open(e.method,c,n.xhrAsync!==!1),t.util.each(e.headers,function(e,t){"Content-Length"!==e&&"User-Agent"!==e&&"Host"!==e&&p.setRequestHeader(e,t)}),n.timeout&&n.xhrAsync!==!1&&(p.timeout=n.timeout),n.xhrWithCredentials&&(p.withCredentials=!0);try{p.send(e.body)}catch(m){if(!e.body||"object"!=typeof e.body.buffer)throw m;p.send(e.body.buffer)}return u},parseHeaders:function(e){var r={};return t.util.arrayEach(e.split(/\r?\n/),function(e){var t=e.split(":",1)[0],n=e.substring(t.length+2);t.length>0&&(r[t]=n)}),r},finishRequest:function(e,r){var n;if("arraybuffer"===e.responseType&&e.response){var i=e.response;n=new t.util.Buffer(i.byteLength);for(var o=new Uint8Array(i),a=0;a<n.length;++a)n[a]=o[a]}try{n||"string"!=typeof e.responseText||(n=new t.util.Buffer(e.responseText))}catch(s){}n&&r.emit("data",n),r.emit("end")}}),t.HttpClient.prototype=t.XHRClient.prototype,t.HttpClient.streamsApiVersion=1},{"../core":3,"../http":11,events:61}],13:[function(e,t){function r(){}function n(e,t){if(!t||void 0===e||null===e)return void 0;switch(t.type){case"structure":return i(e,t);case"map":return a(e,t);case"list":return o(e,t);default:return s(e,t)}}function i(e,t){var r={};return u.each(e,function(e,i){var o=t.members[e];if(o){if("body"!==o.location)return;var a=n(i,o);void 0!==a&&(r[e]=a)}}),r}function o(e,t){var r=[];return u.arrayEach(e,function(e){var i=n(e,t.member);void 0!==i&&r.push(i)}),r}function a(e,t){var r={};return u.each(e,function(e,i){var o=n(i,t.value);void 0!==o&&(r[e]=o)}),r}function s(e,t){return t.toWireFormat(e)}var u=e("../util");r.prototype.build=function(e,t){return JSON.stringify(n(e,t))},t.exports=r},{"../util":49}],14:[function(e,t){function r(){}function n(e,t){if(!t||void 0===e||null===e)return void 0;switch(t.type){case"structure":return i(e,t);case"map":return a(e,t);case"list":return o(e,t);default:return s(e,t)}}function i(e,t){var r={};return u.each(e,function(e,i){var o=t.members[e];if(o){var a=n(i,o);void 0!==a&&(r[e]=a)}}),r}function o(e,t){var r=[];return u.arrayEach(e,function(e){var i=n(e,t.member);void 0!==i&&r.push(i)}),r}function a(e,t){var r={};return u.each(e,function(e,i){var o=n(i,t.value);void 0!==o&&(r[e]=o)}),r}function s(e,t){return t.toType(e)}var u=e("../util");r.prototype.parse=function(e,t){return n(JSON.parse(e),t)},t.exports=r},{"../util":49}],15:[function(e,t){function r(e,t){e=e||{},t=t||{},t.api=this,e.metadata=e.metadata||{},c(this,"isApi",!0,!1),c(this,"apiVersion",e.metadata.apiVersion),c(this,"endpointPrefix",e.metadata.endpointPrefix),c(this,"signingName",e.metadata.signingName),c(this,"globalEndpoint",e.metadata.globalEndpoint),c(this,"signatureVersion",e.metadata.signatureVersion),c(this,"jsonVersion",e.metadata.jsonVersion),c(this,"targetPrefix",e.metadata.targetPrefix),c(this,"protocol",e.metadata.protocol),c(this,"timestampFormat",e.metadata.timestampFormat),c(this,"xmlNamespaceUri",e.metadata.xmlNamespace),c(this,"abbreviation",e.metadata.serviceAbbreviation),c(this,"fullName",e.metadata.serviceFullName),p(this,"className",function(){var t=e.metadata.serviceAbbreviation||e.metadata.serviceFullName;return t?(t=t.replace(/^Amazon|AWS\s*|\(.*|\s+|\W+/g,""),"ElasticLoadBalancing"===t&&(t="ELB"),t):null}),c(this,"operations",new n(e.operations,t,function(e,r){return new i(e,r,t)},u.string.lowerFirst)),c(this,"shapes",new n(e.shapes,t,function(e,r){return o.create(r,t)})),c(this,"paginators",new n(e.paginators,t,function(e,r){return new a(e,r,t)})),c(this,"waiters",new n(e.waiters,t,function(e,r){return new s(e,r,t)},u.string.lowerFirst)),t.documentation&&(c(this,"documentation",e.documentation),c(this,"documentationUrl",e.documentationUrl))}var n=e("./collection"),i=e("./operation"),o=e("./shape"),a=e("./paginator"),s=e("./resource_waiter"),u=e("../util"),c=u.property,p=u.memoizedProperty;t.exports=r},{"../util":49,"./collection":16,"./operation":17,"./paginator":18,"./resource_waiter":19,"./shape":20}],16:[function(e,t){function r(e,t,r,n){i(this,n(e),function(){return r(e,t)})}function n(e,t,n,i){i=i||String;var o=this;for(var a in e)e.hasOwnProperty(a)&&r.call(o,a,e[a],n,i)}var i=e("../util").memoizedProperty;t.exports=n},{"../util":49}],17:[function(e,t){function r(e,t,r){r=r||{},o(this,"name",t.name||e),o(this,"api",r.api,!1),t.http=t.http||{},o(this,"httpMethod",t.http.method||"POST"),o(this,"httpPath",t.http.requestUri||"/"),a(this,"input",function(){return t.input?n.create(t.input,r):new n.create({type:"structure"},r)}),a(this,"output",function(){return t.output?n.create(t.output,r):new n.create({type:"structure"},r)}),a(this,"errors",function(){var e=[];if(!t.errors)return null;for(var i=0;i<t.errors.length;i++)e.push(n.create(t.errors[i],r));return e}),a(this,"paginator",function(){return r.api.paginators[e]}),r.documentation&&(o(this,"documentation",t.documentation),o(this,"documentationUrl",t.documentationUrl))}var n=e("./shape"),i=e("../util"),o=i.property,a=i.memoizedProperty;t.exports=r},{"../util":49,"./shape":20}],18:[function(e,t){function r(e,t){n(this,"inputToken",t.input_token),n(this,"limitKey",t.limit_key),n(this,"moreResults",t.more_results),n(this,"outputToken",t.output_token),n(this,"resultKey",t.result_key)}var n=e("../util").property;t.exports=r},{"../util":49}],19:[function(e,t){function r(e,t,r){function o(){i(this,"name",e),i(this,"api",r.api,!1),t.operation&&i(this,"operation",n.string.lowerFirst(t.operation));var o=this,a={ignoreErrors:"ignore_errors",successType:"success_type",successValue:"success_value",successPath:"success_path",acceptorType:"acceptor_type",acceptorValue:"acceptor_value",acceptorPath:"acceptor_path",failureType:"failure_type",failureValue:"failure_value",failurePath:"success_path",interval:"interval",maxAttempts:"max_attempts"};Object.keys(a).forEach(function(e){var r=t[a[e]];r&&i(o,e,r)})}if(r=r||{},r.api){var a=null;t["extends"]?a=r.api.waiters[t["extends"]]:"__default__"!==e&&(a=r.api.waiters.__default__),a&&(o.prototype=a)}return new o}var n=e("../util"),i=n.property;t.exports=r},{"../util":49}],20:[function(e,t){function r(e,t,r){null!==r&&void 0!==r&&g.property.apply(this,arguments)}function n(e,t){e.constructor.prototype[t]||g.memoizedProperty.apply(this,arguments)}function i(e,t,n){t=t||{},r(this,"shape",e.shape),r(this,"api",t.api,!1),r(this,"type",e.type),r(this,"location",e.location||this.location||"body"),r(this,"name",this.name||e.xmlName||e.queryName||e.locationName||n),r(this,"isStreaming",e.streaming||this.isStreaming||!1),r(this,"isComposite",e.isComposite||!1),r(this,"isShape",!0,!1),r(this,"isQueryName",e.queryName?!0:!1,!1),r(this,"isLocationName",e.locationName?!0:!1,!1),t.documentation&&(r(this,"documentation",e.documentation),r(this,"documentationUrl",e.documentationUrl)),e.xmlAttribute&&r(this,"isXmlAttribute",e.xmlAttribute||!1),r(this,"defaultValue",null),this.toWireFormat=function(e){return null===e||void 0===e?"":e},this.toType=function(e){return e}}function o(e){i.apply(this,arguments),r(this,"isComposite",!0),e.flattened&&r(this,"flattened",e.flattened||!1)}function a(e,t){var a=null,s=!this.isShape;o.apply(this,arguments),s&&(r(this,"defaultValue",function(){return{}}),r(this,"members",{}),r(this,"memberNames",[]),r(this,"required",[]),r(this,"isRequired",function(){return!1})),e.members&&(r(this,"members",new f(e.members,t,function(e,r){return i.create(r,t,e)})),n(this,"memberNames",function(){return e.xmlOrder||Object.keys(e.members)})),e.required&&(r(this,"required",e.required),r(this,"isRequired",function(t){if(!a){a={};for(var r=0;r<e.required.length;r++)a[e.required[r]]=!0}return a[t]},!1,!0)),r(this,"resultWrapper",e.resultWrapper||null),e.payload&&r(this,"payload",e.payload),"string"==typeof e.xmlNamespace?r(this,"xmlNamespaceUri",e.xmlNamespace):"object"==typeof e.xmlNamespace&&(r(this,"xmlNamespacePrefix",e.xmlNamespace.prefix),r(this,"xmlNamespaceUri",e.xmlNamespace.uri))}function s(e,t){var a=this,s=!this.isShape;if(o.apply(this,arguments),s&&r(this,"defaultValue",function(){return[]}),e.member&&n(this,"member",function(){return i.create(e.member,t)}),this.flattened){var u=this.name;n(this,"name",function(){return a.member.name||u})}}function u(e,t){var a=!this.isShape;o.apply(this,arguments),a&&(r(this,"defaultValue",function(){return{}}),r(this,"key",i.create({type:"string"},t)),r(this,"value",i.create({type:"string"},t))),e.key&&n(this,"key",function(){return i.create(e.key,t)}),e.value&&n(this,"value",function(){return i.create(e.value,t)})}function c(e){var t=this;if(i.apply(this,arguments),"header"===this.location)r(this,"timestampFormat","rfc822");else if(e.timestampFormat)r(this,"timestampFormat",e.timestampFormat);else if(this.api)if(this.api.timestampFormat)r(this,"timestampFormat",this.api.timestampFormat);else switch(this.api.protocol){case"json":case"rest-json":r(this,"timestampFormat","unixTimestamp");break;case"rest-xml":case"query":case"ec2":r(this,"timestampFormat","iso8601")}this.toType=function(e){return null===e||void 0===e?null:"function"==typeof e.toUTCString?e:"string"==typeof e||"number"==typeof e?g.date.parseTimestamp(e):null},this.toWireFormat=function(e){return g.date.format(e,t.timestampFormat)}}function p(){if(i.apply(this,arguments),this.api)switch(this.api.protocol){case"rest-xml":case"query":case"ec2":this.toType=function(e){return e||""}}}function l(){i.apply(this,arguments),this.toType=function(e){return null===e||void 0===e?null:parseFloat(e)},this.toWireFormat=this.toType}function m(){i.apply(this,arguments),this.toType=function(e){return null===e||void 0===e?null:parseInt(e,10)},this.toWireFormat=this.toType}function d(){i.apply(this,arguments),this.toType=g.base64.decode,this.toWireFormat=g.base64.encode}function h(){d.apply(this,arguments)}function y(){i.apply(this,arguments),this.toType=function(e){return"boolean"==typeof e?e:null===e||void 0===e?null:"true"===e}}var f=e("./collection"),g=e("../util");i.normalizedTypes={character:"string","double":"float","long":"integer","short":"integer",biginteger:"integer",bigdecimal:"float",blob:"binary"},i.types={structure:a,list:s,map:u,"boolean":y,timestamp:c,"float":l,integer:m,string:p,base64:h,binary:d},i.resolve=function(e,t){if(e.shape){var r=t.api.shapes[e.shape];if(!r)throw new Error("Cannot find shape reference: "+e.shape);return r}return null},i.create=function(e,t,r){if(e.isShape)return e;var n=i.resolve(e,t);if(n){var o=Object.keys(e);if(t.documentation||(o=o.filter(function(e){return!e.match(/documentation/)})),o===["shape"])return n;var a=function(){n.constructor.call(this,e,t,r)};return a.prototype=n,new a}e.type||(e.type=e.members?"structure":e.member?"list":e.key?"map":"string");var s=e.type;if(i.normalizedTypes[e.type]&&(e.type=i.normalizedTypes[e.type]),i.types[e.type])return new i.types[e.type](e,t,r);throw new Error("Unrecognized shape type: "+s)},i.shapes={StructureShape:a,ListShape:s,MapShape:u,StringShape:p,BooleanShape:y,Base64Shape:h},t.exports=i},{"../util":49,"./collection":16}],21:[function(e){var t=e("./core");t.ParamValidator=t.util.inherit({validate:function(e,r,n){if(this.errors=[],this.validateMember(e,r||{},n||"params"),!(this.errors.length>1)){if(1===this.errors.length)throw this.errors[0];return!0}var i=this.errors.join("\n* ");if(this.errors.length>1)throw i="There were "+this.errors.length+" validation errors:\n* "+i,t.util.error(new Error(i),{code:"MultipleValidationErrors",errors:this.errors})},validateStructure:function(e,t,r){this.validateType(r,t,["object"],"structure");for(var n,i=0;e.required&&i<e.required.length;i++){n=e.required[i];var o=t[n];(void 0===o||null===o)&&this.fail("MissingRequiredParameter","Missing required key '"+n+"' in "+r)}for(n in t)if(t.hasOwnProperty(n)){var a=t[n],s=e.members[n];if(void 0!==s){var u=[r,n].join(".");this.validateMember(s,a,u)}else this.fail("UnexpectedParameter","Unexpected key '"+n+"' found in "+r)}return!0},validateMember:function(e,t,r){switch(e.type){case"structure":return this.validateStructure(e,t,r);case"list":return this.validateList(e,t,r);case"map":return this.validateMap(e,t,r);
default:return this.validateScalar(e,t,r)}},validateList:function(e,t,r){this.validateType(r,t,[Array]);for(var n=0;n<t.length;n++)this.validateMember(e.member,t[n],r+"["+n+"]")},validateMap:function(e,t,r){this.validateType(r,t,["object"],"map");for(var n in t)t.hasOwnProperty(n)&&this.validateMember(e.value,t[n],r+"['"+n+"']")},validateScalar:function(e,t,r){switch(e.type){case null:case void 0:case"string":return this.validateType(r,t,["string"]);case"base64":case"binary":return this.validatePayload(r,t);case"integer":case"float":return this.validateNumber(r,t);case"boolean":return this.validateType(r,t,["boolean"]);case"timestamp":return this.validateType(r,t,[Date,/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/,"number"],"Date object, ISO-8601 string, or a UNIX timestamp");default:return this.fail("UnkownType","Unhandled type "+e.type+" for "+r)}},fail:function(e,r){this.errors.push(t.util.error(new Error(r),{code:e}))},validateType:function(e,r,n,i){if(null!==r&&void 0!==r){for(var o=!1,a=0;a<n.length;a++){if("string"==typeof n[a]){if(typeof r===n[a])return}else if(n[a]instanceof RegExp){if((r||"").toString().match(n[a]))return}else{if(r instanceof n[a])return;if(t.util.isType(r,n[a]))return;i||o||(n=n.slice()),n[a]=t.util.typeName(n[a])}o=!0}var s=i;s||(s=n.join(", ").replace(/,([^,]+)$/,", or$1"));var u=s.match(/^[aeiou]/i)?"n":"";this.fail("InvalidParameterType","Expected "+e+" to be a"+u+" "+s)}},validateNumber:function(e,t){if(null!==t&&void 0!==t){if("string"==typeof t){var r=parseFloat(t);r.toString()===t&&(t=r)}this.validateType(e,t,["number"])}},validatePayload:function(e,r){if(null!==r&&void 0!==r&&"string"!=typeof r&&(!r||"number"!=typeof r.byteLength)){if(t.util.isNode()){var n=t.util.nodeRequire("stream").Stream;if(t.util.Buffer.isBuffer(r)||r instanceof n)return}var i=["Buffer","Stream","File","Blob","ArrayBuffer","DataView"];if(r)for(var o=0;o<i.length;o++){if(t.util.isType(r,i[o]))return;if(t.util.typeName(r.constructor)===i[o])return}this.fail("InvalidParameterType","Expected "+e+" to be a string, Buffer, Stream, Blob, or typed array object")}}})},{"./core":3}],22:[function(e,t){function r(e){var t=e.httpRequest,r=e.service.api,n=r.targetPrefix+"."+r.operations[e.operation].name,i=r.jsonVersion||"1.0",o=r.operations[e.operation].input,s=new a;1===i&&(i="1.0"),t.body=s.build(e.params||{},o),t.headers["Content-Type"]="application/x-amz-json-"+i,t.headers["X-Amz-Target"]=n}function n(e){var t={},r=e.httpResponse;if(t.code=r.headers["x-amzn-errortype"]||"UnknownError","string"==typeof t.code&&(t.code=t.code.split(":")[0]),r.body.length>0){var n=JSON.parse(r.body.toString());(n.__type||n.code)&&(t.code=(n.__type||n.code).split("#").pop()),t.message="RequestEntityTooLarge"===t.code?"Request body must be less than 1 MB":n.message||n.Message||null}else t.statusCode=r.statusCode,t.message=r.statusCode.toString();e.error=o.error(new Error,t)}function i(e){var t=e.httpResponse.body.toString()||"{}";if(e.request.service.config.convertResponseTypes===!1)e.data=JSON.parse(t);else{var r=e.request.service.api.operations[e.request.operation],n=r.output||{},i=new s;e.data=i.parse(t,n)}}var o=e("../util"),a=e("../json/builder"),s=e("../json/parser");t.exports={buildRequest:r,extractError:n,extractData:i}},{"../json/builder":13,"../json/parser":14,"../util":49}],23:[function(e,t){function r(e){var t=e.service.api.operations[e.operation],r=e.httpRequest;r.headers["Content-Type"]="application/x-www-form-urlencoded; charset=utf-8",r.params={Version:e.service.api.apiVersion,Action:t.name};var n=new s;n.serialize(e.params,t.input,function(e,t){r.params[e]=t}),r.body=a.queryParamsToString(r.params)}function n(e){var t,r=e.httpResponse.body.toString();t=r.match("<UnknownOperationException")?{Code:"UnknownOperation",Message:"Unknown operation "+e.request.operation}:(new o.XML.Parser).parse(r),t.requestId&&!e.requestId&&(e.requestId=t.requestId),t.Errors&&(t=t.Errors),t.Error&&(t=t.Error),e.error=t.Code?a.error(new Error,{code:t.Code,message:t.Message}):a.error(new Error,{code:e.httpResponse.statusCode,message:null})}function i(e){var t=e.request,r=t.service.api.operations[t.operation],n=r.output||{},i=n;if(i.resultWrapper){var s=u.create({type:"structure"});s.members[i.resultWrapper]=n,s.memberNames=[i.resultWrapper],a.property(n,"name",n.resultWrapper),n=s}var c=new o.XML.Parser;if(n&&n.members&&!n.members._XAMZRequestId){var p=u.create({type:"string"},{api:{protocol:"query"}},"requestId");n.members._XAMZRequestId=p}var l=c.parse(e.httpResponse.body.toString(),n);e.requestId=l._XAMZRequestId||l.requestId,l._XAMZRequestId&&delete l._XAMZRequestId,i.resultWrapper&&l[i.resultWrapper]&&(a.update(l,l[i.resultWrapper]),delete l[i.resultWrapper]),e.data=l}var o=e("../core"),a=e("../util"),s=e("../query/query_param_serializer"),u=e("../model/shape");t.exports={buildRequest:r,extractError:n,extractData:i}},{"../core":3,"../model/shape":20,"../query/query_param_serializer":27,"../util":49}],24:[function(e,t){function r(e){e.httpRequest.method=e.service.api.operations[e.operation].httpMethod}function n(e){var t=e.service.api.operations[e.operation],r=t.input,n=[e.httpRequest.endpoint.path,t.httpPath].join("/");n=n.replace(/\/+/g,"/");var i={},o=!1;if(u.each(r.members,function(t,r){var a=e.params[t];if(null!==a&&void 0!==a)if("uri"===r.location){var s=new RegExp("\\{"+r.name+"(\\+)?\\}");n=n.replace(s,function(e,t){var r=t?u.uriEscapePath:u.uriEscape;return r(String(a))})}else"querystring"===r.location&&(o=!0,i[r.name]="list"===r.type?a.map(function(e){return u.uriEscape(String(e))}):u.uriEscape(String(a)))}),o){n+=n.indexOf("?")>=0?"&":"?";var a=[];u.arrayEach(Object.keys(i).sort(),function(e){Array.isArray(i[e])||(i[e]=[i[e]]);for(var t=0;t<i[e].length;t++)a.push(u.uriEscape(String(e))+"="+i[e][t])}),n+=a.join("&")}e.httpRequest.path=n}function i(e){var t=e.service.api.operations[e.operation];u.each(t.input.members,function(t,r){var n=e.params[t];null!==n&&void 0!==n&&("headers"===r.location&&"map"===r.type?u.each(n,function(t,n){e.httpRequest.headers[r.name+t]=n}):"header"===r.location&&(n=r.toWireFormat(n).toString(),e.httpRequest.headers[r.name]=n))})}function o(e){r(e),n(e),i(e)}function a(){}function s(e){var t=e.request,r={},n=e.httpResponse,i=t.service.api.operations[t.operation],o=i.output,a={};u.each(n.headers,function(e,t){a[e.toLowerCase()]=t}),u.each(o.members,function(e,t){var i=(t.name||e).toLowerCase();if("headers"===t.location&&"map"===t.type){r[e]={};var o=t.isLocationName?t.name:"",s=new RegExp("^"+o+"(.+)","i");u.each(n.headers,function(t,n){var i=t.match(s);null!==i&&(r[e][i[1]]=n)})}else"header"===t.location?void 0!==a[i]&&(r[e]=a[i]):"statusCode"===t.location&&(r[e]=parseInt(n.statusCode,10))}),e.data=r}var u=e("../util");t.exports={buildRequest:o,extractError:a,extractData:s}},{"../util":49}],25:[function(e,t){function r(e){var t=new c,r=e.service.api.operations[e.operation].input;if(r.payload){var n={},i=r.members[r.payload];if(n=e.params[r.payload],void 0===n)return;e.httpRequest.body="structure"===i.type?t.build(n,i):n}else e.httpRequest.body=t.build(e.params,r)}function n(e){s.buildRequest(e),["GET","HEAD"].indexOf(e.httpRequest.method)<0&&r(e)}function i(e){u.extractError(e)}function o(e){s.extractData(e);var t=e.request,r=t.service.api.operations[t.operation].output||{};if(r.payload){var n=r.members[r.payload],i=e.httpResponse.body;if(n.isStreaming)e.data[r.payload]=i;else if("structure"===n.type){var o=new p;e.data[r.payload]=o.parse(i,n)}else e.data[r.payload]=i.toString()}else{var c=e.data;u.extractData(e),e.data=a.merge(c,e.data)}}var a=e("../util"),s=e("./rest"),u=e("./json"),c=e("../json/builder"),p=e("../json/parser");t.exports={buildRequest:n,extractError:i,extractData:o}},{"../json/builder":13,"../json/parser":14,"../util":49,"./json":22,"./rest":24}],26:[function(e,t){function r(e){var t=e.service.api.operations[e.operation].input,r=new a.XML.Builder,n=e.params,i=t.payload;if(i){var o=t.members[i];if(n=n[i],void 0===n)return;if("structure"===o.type){var u=o.name;e.httpRequest.body=r.toXML(n,o,u)}else e.httpRequest.body=n}else e.httpRequest.body=r.toXML(n,t,t.name||t.shape||s.string.upperFirst(e.operation)+"Request")}function n(e){u.buildRequest(e),["GET","HEAD"].indexOf(e.httpRequest.method)<0&&r(e)}function i(e){u.extractError(e);var t=(new a.XML.Parser).parse(e.httpResponse.body.toString());t.Errors&&(t=t.Errors),t.Error&&(t=t.Error),e.error=t.Code?s.error(new Error,{code:t.Code,message:t.Message}):s.error(new Error,{code:e.httpResponse.statusCode,message:null})}function o(e){u.extractData(e);var t,r=e.request,n=e.httpResponse.body,i=r.service.api.operations[r.operation],o=i.output,c=o.payload;if(c){var p=o.members[c];p.isStreaming?e.data[c]=n:"structure"===p.type?(t=new a.XML.Parser,e.data[c]=t.parse(n.toString(),p)):e.data[c]=n.toString()}else if(n.length>0){t=new a.XML.Parser;var l=t.parse(n.toString(),o);s.update(e.data,l)}}var a=e("../core"),s=e("../util"),u=e("./rest");t.exports={buildRequest:n,extractError:i,extractData:o}},{"../core":3,"../util":49,"./rest":24}],27:[function(e,t){function r(){}function n(e){return e.isQueryName||"ec2"!==e.api.protocol?e.name:e.name[0].toUpperCase()+e.name.substr(1)}function i(e,t,r,i){u.each(r.members,function(r,o){var a=t[r];if(null!==a&&void 0!==a){var u=n(o);u=e?e+"."+u:u,s(u,a,o,i)}})}function o(e,t,r,n){var i=1;u.each(t,function(t,o){var a=r.flattened?".":".entry.",u=a+i++ +".",c=u+(r.key.name||"key"),p=u+(r.value.name||"value");s(e+c,t,r.key,n),s(e+p,o,r.value,n)})}function a(e,t,r,i){var o=r.member||{};return 0===t.length?void i.call(this,e,null):void u.arrayEach(t,function(t,a){var u="."+(a+1);if("ec2"===r.api.protocol)u+="";else if(r.flattened){if(o.name){var c=e.split(".");c.pop(),c.push(n(o)),e=c.join(".")}}else u=".member"+u;s(e+u,t,o,i)})}function s(e,t,r,n){null!==t&&void 0!==t&&("structure"===r.type?i(e,t,r,n):"list"===r.type?a(e,t,r,n):"map"===r.type?o(e,t,r,n):n(e,r.toWireFormat(t).toString()))}var u=e("../util");r.prototype.serialize=function(e,t,r){i("",e,t,r)},t.exports=r},{"../util":49}],28:[function(e,t){function r(e){if(!e)return null;var t=e.split("-");return t.length<3?null:t.slice(0,t.length-2).join("-")+"-*"}function n(e){var t=e.config.region,n=r(t),i=e.api.endpointPrefix;return[[t,i],[n,i],[t,"*"],[n,"*"],["*",i],["*","*"]].map(function(e){return e[0]&&e[1]?e.join("/"):null})}function i(e,t){a.each(t,function(t,r){"globalEndpoint"!==t&&(void 0===e.config[t]||null===e.config[t])&&(e.config[t]=r)})}function o(e){for(var t=n(e),r=0;r<t.length;r++){var o=t[r];if(o&&s.rules.hasOwnProperty(o)){var a=s.rules[o];return"string"==typeof a&&(a=s.patterns[a]),e.isGlobalEndpoint=!!a.globalEndpoint,a.signatureVersion||(a.signatureVersion="v4"),void i(e,a)}}}var a=e("./util"),s=e("./region_config.json");t.exports=o},{"./region_config.json":29,"./util":49}],29:[function(e,t){t.exports={rules:{"*/*":{endpoint:"{service}.{region}.amazonaws.com"},"cn-*/*":{endpoint:"{service}.{region}.amazonaws.com.cn"},"*/cloudfront":"globalSSL","*/iam":"globalSSL","*/sts":"globalSSL","*/importexport":{endpoint:"{service}.amazonaws.com",signatureVersion:"v2",globalEndpoint:!0},"*/route53":{endpoint:"https://{service}.amazonaws.com",signatureVersion:"v3https",globalEndpoint:!0},"us-gov-*/iam":"globalGovCloud","us-gov-*/sts":{endpoint:"{service}.{region}.amazonaws.com"},"us-gov-west-1/s3":"s3dash","us-west-1/s3":"s3dash","us-west-2/s3":"s3dash","eu-west-1/s3":"s3dash","ap-southeast-1/s3":"s3dash","ap-southeast-2/s3":"s3dash","ap-northeast-1/s3":"s3dash","sa-east-1/s3":"s3dash","us-east-1/s3":{endpoint:"{service}.amazonaws.com",signatureVersion:"s3"},"us-east-1/sdb":{endpoint:"{service}.amazonaws.com",signatureVersion:"v2"},"*/sdb":{endpoint:"{service}.{region}.amazonaws.com",signatureVersion:"v2"}},patterns:{globalSSL:{endpoint:"https://{service}.amazonaws.com",globalEndpoint:!0},globalGovCloud:{endpoint:"{service}.us-gov.amazonaws.com"},s3dash:{endpoint:"{service}-{region}.amazonaws.com",signatureVersion:"s3"}}}},{}],30:[function(e){(function(t){function r(e){return s.hasOwnProperty(e._asm.currentState)}var n=e("./core"),i=e("./state_machine"),o=n.util.inherit,a=n.util.nodeRequire("domain"),s={success:1,error:1,complete:1},u=new i;u.setupStates=function(){var e=function(e,t){var n=this;try{n.emit(n._asm.currentState,function(){t(n.response.error)})}catch(i){if(r(n)){if(!(a&&n.domain instanceof a.Domain))throw i;i.domainEmitter=n,i.domain=n.domain,i.domainThrown=!1,n.domain.emit("error",i)}else n.response.error=i,t(i)}};this.addState("validate","build","error",e),this.addState("build","afterBuild","restart",e),this.addState("afterBuild","sign","restart",e),this.addState("sign","send","retry",e),this.addState("retry","afterRetry","afterRetry",e),this.addState("afterRetry","sign","error",e),this.addState("send","validateResponse","retry",e),this.addState("validateResponse","extractData","extractError",e),this.addState("extractError","extractData","retry",e),this.addState("extractData","success","retry",e),this.addState("restart","build","error",e),this.addState("success","complete","complete",e),this.addState("error","complete","complete",e),this.addState("complete",null,null,e)},u.setupStates(),n.Request=o({constructor:function(e,t,r){var o=e.endpoint,s=e.config.region;e.isGlobalEndpoint&&(s="us-east-1"),this.domain=a&&a.active,this.service=e,this.operation=t,this.params=r||{},this.httpRequest=new n.HttpRequest(o,s),this.startTime=n.util.date.getDate(),this.response=new n.Response(this),this._asm=new i(u.states,"validate"),n.SequentialExecutor.call(this),this.emit=this.emitEvent},send:function(e){return e&&this.on("complete",function(t){e.call(t,t.error,t.data)}),this.runTo(),this.response},build:function(e){return this.runTo("send",e)},runTo:function(e,t){return this._asm.runTo(e,t,this),this},abort:function(){return this.removeAllListeners("validateResponse"),this.removeAllListeners("extractError"),this.on("validateResponse",function(e){e.error=n.util.error(new Error("Request aborted by user"),{code:"RequestAbortedError",retryable:!1})}),this.httpRequest.stream&&(this.httpRequest.stream.abort(),this.httpRequest._abortCallback?this.httpRequest._abortCallback():this.removeAllListeners("send")),this},eachPage:function(e){function t(r){e.call(r,r.error,r.data,function(i){i!==!1&&(r.hasNextPage()?r.nextPage().on("complete",t).send():e.call(r,null,null,n.util.fn.noop))})}e=n.util.fn.makeAsync(e,3),this.on("complete",t).send()},eachItem:function(e){function t(t,i){if(t)return e(t,null);if(null===i)return e(null,null);var o=r.service.paginationConfig(r.operation),a=o.resultKey;Array.isArray(a)&&(a=a[0]);var s=n.util.jamespath.query(a,i);n.util.arrayEach(s,function(t){n.util.arrayEach(t,function(t){e(null,t)})})}var r=this;this.eachPage(t)},isPageable:function(){return this.service.paginationConfig(this.operation)?!0:!1},createReadStream:function(){var e=n.util.nodeRequire("stream"),r=this,i=null,o=!1;return 2===n.HttpClient.streamsApiVersion?(i=new e.Readable,i._read=function(){}):(i=new e.Stream,i.readable=!0),i.sent=!1,i.on("newListener",function(e){i.sent||"data"!==e&&"readable"!==e||("data"===e&&(o=!0),i.sent=!0,t.nextTick(function(){r.send(function(){})}))}),this.on("httpHeaders",function(e,t,a){if(300>e){r.removeListener("httpData",n.EventListeners.Core.HTTP_DATA),r.removeListener("httpError",n.EventListeners.Core.HTTP_ERROR),r.on("httpError",function(e){a.error=e,a.error.retryable=!1});var s=a.httpResponse.createUnbufferedStream();o?(s.on("data",function(e){i.emit("data",e)}),s.on("end",function(){i.emit("end")})):(s.on("readable",function(){var e;do e=s.read(),null!==e&&i.push(e);while(null!==e);i.read(0)}),s.on("end",function(){i.push(null)})),s.on("error",function(e){i.emit("error",e)})}}),this.on("error",function(e){i.emit("error",e)}),i},emitEvent:function(e,t,r){"function"==typeof t&&(r=t,t=null),r||(r=function(){}),t||(t=this.eventParameters(e,this.response));var i=n.SequentialExecutor.prototype.emit;i.call(this,e,t,function(e){e&&(this.response.error=e),r.call(this,e)})},eventParameters:function(e){switch(e){case"restart":case"validate":case"sign":case"build":case"afterValidate":case"afterBuild":return[this];case"error":return[this.response.error,this.response];default:return[this.response]}},presign:function(e,t){return t||"function"!=typeof e||(t=e,e=null),(new n.Signers.Presign).sign(this.toGet(),e,t)},toUnauthenticated:function(){return this.removeListener("validate",n.EventListeners.Core.VALIDATE_CREDENTIALS),this.removeListener("sign",n.EventListeners.Core.SIGN),this.toGet()},toGet:function(){return("query"===this.service.api.protocol||"ec2"===this.service.api.protocol)&&(this.removeListener("build",this.buildAsGet),this.addListener("build",this.buildAsGet)),this},buildAsGet:function(e){e.httpRequest.method="GET",e.httpRequest.path=e.service.endpoint.path+"?"+e.httpRequest.body,e.httpRequest.body="",delete e.httpRequest.headers["Content-Length"],delete e.httpRequest.headers["Content-Type"]}}),n.util.mixin(n.Request,n.SequentialExecutor)}).call(this,e("FWaASH"))},{"./core":3,"./state_machine":48,FWaASH:63}],31:[function(e){var t=e("./core"),r=t.util.inherit;t.ResourceWaiter=r({constructor:function(e,r){this.service=e,this.state=r,"object"==typeof this.state&&t.util.each.call(this,this.state,function(e,t){this.state=e,this.expectedValue=t}),this.loadWaiterConfig(this.state),this.expectedValue||(this.expectedValue=this.config.successValue)},service:null,state:null,expectedValue:null,config:null,waitDone:!1,Listeners:{retry:(new t.SequentialExecutor).addNamedListeners(function(e){e("RETRY_CHECK","retry",function(e){var t=e.request._waiter;e.error&&"ResourceNotReady"===e.error.code&&(e.error.retryDelay=1e3*t.config.interval)})}),output:(new t.SequentialExecutor).addNamedListeners(function(e){e("CHECK_OUT_ERROR","extractError",function(e){e.error&&e.request._waiter.setError(e,!0)}),e("CHECK_OUTPUT","extractData",function(e){var t=e.request._waiter,r=t.checkSuccess(e);r?e.error=null:t.setError(e,null===r?!1:!0)})}),error:(new t.SequentialExecutor).addNamedListeners(function(e){e("CHECK_ERROR","extractError",function(e){var t=e.request._waiter,r=t.checkError(e);r?(e.error=null,e.data={},e.request.removeAllListeners("extractData")):t.setError(e,null===r?!1:!0)}),e("CHECK_ERR_OUTPUT","extractData",function(e){e.request._waiter.setError(e,!0)})})},wait:function(e,t){"function"==typeof e&&(t=e,e=void 0);var r=this.service.makeRequest(this.config.operation,e),n=this.Listeners[this.config.successType];return r._waiter=this,r.response.maxRetries=this.config.maxAttempts,r.addListeners(this.Listeners.retry),n&&r.addListeners(n),t&&r.send(t),r},setError:function(e,r){e.data=null,e.error=t.util.error(e.error||new Error,{code:"ResourceNotReady",message:"Resource is not in the state "+this.state,retryable:r})},checkSuccess:function(e){if(!this.config.successPath)return e.httpResponse.statusCode<300;var r=t.util.jamespath.find(this.config.successPath,e.data);return this.config.failureValue&&this.config.failureValue.indexOf(r)>=0?null:this.expectedValue?r===this.expectedValue:r?!0:!1},checkError:function(e){var t=this.config.successValue;return"number"==typeof t?e.httpResponse.statusCode===t:e.error&&e.error.code===t},loadWaiterConfig:function(e,r){if(!this.service.api.waiters[e]){if(r)return;throw new t.util.error(new Error,{code:"StateNotFoundError",message:"State "+e+" not found."})}this.config=this.service.api.waiters[e];var n=this.config;!function(){n.successType=n.successType||n.acceptorType,n.successPath=n.successPath||n.acceptorPath,n.successValue=n.successValue||n.acceptorValue,n.failureType=n.failureType||n.acceptorType,n.failurePath=n.failurePath||n.acceptorPath,n.failureValue=n.failureValue||n.acceptorValue}()}})},{"./core":3}],32:[function(e){var t=e("./core"),r=t.util.inherit;t.Response=r({constructor:function(e){this.request=e,this.data=null,this.error=null,this.retryCount=0,this.redirectCount=0,this.httpResponse=new t.HttpResponse,e&&(this.maxRetries=e.service.numRetries(),this.maxRedirects=e.service.config.maxRedirects)},nextPage:function(e){var r,n=this.request.service,i=this.request.operation;try{r=n.paginationConfig(i,!0)}catch(o){this.error=o}if(!this.hasNextPage()){if(e)e(this.error,null);else if(this.error)throw this.error;return null}var a=t.util.copy(this.request.params);if(this.nextPageTokens){var s=r.inputToken;"string"==typeof s&&(s=[s]);for(var u=0;u<s.length;u++)a[s[u]]=this.nextPageTokens[u];return n.makeRequest(this.request.operation,a,e)}return e?e(null,null):null},hasNextPage:function(){return this.cacheNextPageTokens(),this.nextPageTokens?!0:void 0===this.nextPageTokens?void 0:!1},cacheNextPageTokens:function(){if(this.hasOwnProperty("nextPageTokens"))return this.nextPageTokens;this.nextPageTokens=void 0;var e=this.request.service.paginationConfig(this.request.operation);if(!e)return this.nextPageTokens;if(this.nextPageTokens=null,e.moreResults&&!t.util.jamespath.find(e.moreResults,this.data))return this.nextPageTokens;var r=e.outputToken;return"string"==typeof r&&(r=[r]),t.util.arrayEach.call(this,r,function(e){var r=t.util.jamespath.find(e,this.data);r&&(this.nextPageTokens=this.nextPageTokens||[],this.nextPageTokens.push(r))}),this.nextPageTokens}})},{"./core":3}],33:[function(e,t){var r=e("../core"),n=r.util.string.byteLength;r.S3.ManagedUpload=r.util.inherit({constructor:function(e){var t=this;r.SequentialExecutor.call(t),t.body=null,t.sliceFn=null,t.callback=null,t.parts={},t.completeInfo=[],t.fillQueue=function(){t.callback(new Error("Unsupported body payload "+typeof t.body))},t.configure(e)},configure:function(e){if(e=e||{},this.partSize=this.minPartSize,e.queueSize&&(this.queueSize=e.queueSize),e.partSize&&(this.partSize=e.partSize),e.leavePartsOnError&&(this.leavePartsOnError=!0),this.partSize<this.minPartSize)throw new Error("partSize must be greater than "+this.minPartSize);this.service=e.service,this.bindServiceObject(e.params),this.validateBody(),this.adjustTotalBytes()},leavePartsOnError:!1,queueSize:4,partSize:null,minPartSize:5242880,maxTotalParts:1e4,send:function(e){var t=this;t.callback=e||function(e){if(e)throw e};var n=!0;if(t.sliceFn)t.fillQueue=t.fillBuffer;else if(r.util.isNode()){var i=r.util.nodeRequire("stream").Stream;t.body instanceof i&&(n=!1,t.fillQueue=t.fillStream,t.partBuffer=new r.util.Buffer(0),t.body.on("readable",function(){t.fillQueue()}).on("end",function(){t.isDoneChunking=!0,t.numParts=t.totalPartNumbers,t.fillQueue.call(t)}))}n&&t.fillQueue.call(t)},abort:function(){this.cleanup(r.util.error(new Error("Request aborted by user"),{code:"RequestAbortedError",retryable:!1}))},validateBody:function(){var e=this;if(e.body=e.service.config.params.Body,!e.body)throw new Error("params.Body is required");"string"==typeof e.body&&(e.body=new r.util.Buffer(e.body)),e.sliceFn=r.util.arraySliceFn(e.body)},bindServiceObject:function(e){e=e||{};var t=this;if(t.service){var n=r.util.copy(t.service.config);t.service=new t.service.constructor.__super__(n),t.service.config.params=r.util.merge(t.service.config.params||{},e)}else t.service=new r.S3({params:e})},adjustTotalBytes:function(){var e=this;try{e.totalBytes=n(e.body)}catch(t){}if(e.totalBytes){var r=Math.ceil(e.totalBytes/e.maxTotalParts);r>e.partSize&&(e.partSize=r)}else e.totalBytes=void 0},isDoneChunking:!1,partPos:0,totalChunkedBytes:0,totalUploadedBytes:0,totalBytes:void 0,numParts:0,totalPartNumbers:0,activeParts:0,doneParts:0,parts:null,completeInfo:null,failed:!1,multipartReq:null,partBuffer:null,fillBuffer:function(){for(var e=this,t=n(e.body);e.activeParts<e.queueSize&&e.partPos<t;){var r=Math.min(e.partPos+e.partSize,t),i=e.sliceFn.call(e.body,e.partPos,r);e.partPos+=e.partSize,(n(i)<e.partSize||e.partPos===t)&&(e.isDoneChunking=!0,e.numParts=e.totalPartNumbers+1),e.nextChunk(i)}},fillStream:function(){var e=this;if(!(e.activeParts>=e.queueSize)){var t=e.body.read(e.partSize-e.partBuffer.length)||e.body.read();t&&(e.partBuffer=r.util.Buffer.concat([e.partBuffer,t]),e.totalChunkedBytes+=t.length),e.partBuffer.length>=e.partSize?(e.nextChunk(e.partBuffer.slice(0,e.partSize)),e.partBuffer=e.partBuffer.slice(e.partSize)):e.isDoneChunking&&(e.totalBytes=e.totalChunkedBytes,e.partBuffer.length>0&&(e.numParts++,e.nextChunk(e.partBuffer)),e.partBuffer=new r.util.Buffer(0)),e.body.read(0)}},nextChunk:function(e){var t=this;if(t.failed)return null;var r=++t.totalPartNumbers;if(t.isDoneChunking&&1===r){var n=t.service.putObject({Body:e});return n._managedUpload=t,n.on("httpUploadProgress",t.progress).send(t.finishSinglePart),null}t.activeParts++,t.service.config.params.UploadId?t.uploadPart(e,r):t.multipartReq?t.queueChunks(e,r):(t.multipartReq=t.service.createMultipartUpload(),t.multipartReq.on("success",function(e){t.service.config.params.UploadId=e.data.UploadId,t.multipartReq=null}),t.queueChunks(e,r),t.multipartReq.on("error",function(e){t.cleanup(e)}),t.multipartReq.send())},uploadPart:function(e,t){var n=this,i={Body:e,ContentLength:r.util.string.byteLength(e),PartNumber:t},o={ETag:null,PartNumber:t};n.completeInfo.push(o);var a=n.service.uploadPart(i);n.parts[t]=a,a._lastUploadedBytes=0,a._managedUpload=n,a.on("httpUploadProgress",n.progress),a.send(function(e,t){if(delete n.parts[i.PartNumber],n.activeParts--,!(e||t&&t.ETag)){var a="No access to ETag property on response.";r.util.isBrowser()&&(a+=" Check CORS configuration to expose ETag header."),e=r.util.error(new Error(a),{code:"ETagMissing",retryable:!1})}return e?n.cleanup(e):(o.ETag=t.ETag,n.doneParts++,void(n.isDoneChunking&&n.doneParts===n.numParts?n.finishMultiPart():n.fillQueue.call(n)))})},queueChunks:function(e,t){var r=this;r.multipartReq.on("success",function(){r.uploadPart(e,t)})},cleanup:function(e){var t=this;t.failed||("function"==typeof t.body.removeAllListeners&&"function"==typeof t.body.resume&&(t.body.removeAllListeners("readable"),t.body.removeAllListeners("end"),t.body.resume()),t.service.config.params.UploadId&&!t.leavePartsOnError&&t.service.abortMultipartUpload().send(),r.util.each(t.parts,function(e,t){t.removeAllListeners("complete"),t.abort()}),t.parts={},t.callback(e),t.failed=!0)},finishMultiPart:function(){var e=this,t={MultipartUpload:{Parts:e.completeInfo}};e.service.completeMultipartUpload(t,function(t,r){return t?e.cleanup(t):void e.callback(t,r)})},finishSinglePart:function(e,t){var n=this.request._managedUpload,i=this.request.httpRequest,o=r.util.urlFormat(i.endpoint);return e?n.callback(e):(t.Location=o.substr(0,o.length-1)+i.path,void n.callback(e,t))},progress:function(e){var t=this._managedUpload;"putObject"===this.operation?e.part=1:(t.totalUploadedBytes+=e.loaded-this._lastUploadedBytes,this._lastUploadedBytes=e.loaded,e={loaded:t.totalUploadedBytes,total:t.totalBytes,part:this.params.PartNumber}),t.emit("httpUploadProgress",[e])}}),r.util.mixin(r.S3.ManagedUpload,r.SequentialExecutor),t.exports=r.S3.ManagedUpload},{"../core":3}],34:[function(e,t){var r=e("./core");r.SequentialExecutor=r.util.inherit({constructor:function(){this._events={}},listeners:function(e){return this._events[e]?this._events[e].slice(0):[]},on:function(e,t){return this._events[e]?this._events[e].push(t):this._events[e]=[t],this},onAsync:function(e,t){return t._isAsync=!0,this.on(e,t)},removeListener:function(e,t){var r=this._events[e];if(r){for(var n=r.length,i=-1,o=0;n>o;++o)r[o]===t&&(i=o);i>-1&&r.splice(i,1)}return this},removeAllListeners:function(e){return e?delete this._events[e]:this._events={},this},emit:function(e,t,r){r||(r=function(){});var n=this.listeners(e),i=n.length;return this.callListeners(n,t,r),i>0},callListeners:function(e,t,r){function n(n){n?r.call(i,n):i.callListeners(e,t,r)}for(var i=this;e.length>0;){var o=e.shift();if(o._isAsync)return void o.apply(i,t.concat([n]));o.apply(i,t)}r.call(i)},addListeners:function(e){var t=this;return e._events&&(e=e._events),r.util.each(e,function(e,n){"function"==typeof n&&(n=[n]),r.util.arrayEach(n,function(r){t.on(e,r)})}),t},addNamedListener:function(e,t,r){return this[e]=r,this.addListener(t,r),this},addNamedAsyncListener:function(e,t,r){return r._isAsync=!0,this.addNamedListener(e,t,r)},addNamedListeners:function(e){var t=this;return e(function(){t.addNamedListener.apply(t,arguments)},function(){t.addNamedAsyncListener.apply(t,arguments)}),this}}),r.SequentialExecutor.prototype.addListener=r.SequentialExecutor.prototype.on,t.exports=r.SequentialExecutor},{"./core":3}],35:[function(e){var t=e("./core"),r=e("./model/api"),n=e("./region_config"),i=t.util.inherit;t.Service=i({constructor:function(e){if(!this.loadServiceClass)throw t.util.error(new Error,"Service must be constructed with `new' operator");var r=this.loadServiceClass(e||{});return r?new r(e):void this.initialize(e)},initialize:function(e){var r=t.config[this.serviceIdentifier];this.config=new t.Config(t.config),r&&this.config.update(r,!0),e&&this.config.update(e,!0),this.validateService(),this.config.endpoint||n(this),this.config.endpoint=this.endpointFromTemplate(this.config.endpoint),this.setEndpoint(this.config.endpoint)},validateService:function(){},loadServiceClass:function(e){var r=e;if(t.util.isEmpty(this.api)){if(r.apiConfig)return t.Service.defineServiceApi(this.constructor,r.apiConfig);if(this.constructor.services){r=new t.Config(t.config),r.update(e,!0);var n=r.apiVersions[this.constructor.serviceIdentifier];return n=n||r.apiVersion,this.getLatestServiceClass(n)}return null}return null},getLatestServiceClass:function(e){return e=this.getLatestServiceVersion(e),null===this.constructor.services[e]&&t.Service.defineServiceApi(this.constructor,e),this.constructor.services[e]},getLatestServiceVersion:function(e){if(!this.constructor.services||0===this.constructor.services.length)throw new Error("No services defined on "+this.constructor.serviceIdentifier);if(e?t.util.isType(e,Date)&&(e=t.util.date.iso8601(e).split("T")[0]):e="latest",Object.hasOwnProperty(this.constructor.services,e))return e;for(var r=Object.keys(this.constructor.services).sort(),n=null,i=r.length-1;i>=0;i--)if("*"!==r[i][r[i].length-1]&&(n=r[i]),r[i].substr(0,10)<=e)return n;throw new Error("Could not find "+this.constructor.serviceIdentifier+" API to satisfy version constraint `"+e+"'")},api:{},defaultRetryCount:3,makeRequest:function(e,r,n){if("function"==typeof r&&(n=r,r=null),r=r||{},this.config.params){var i=this.api.operations[e];i&&(r=t.util.copy(r),t.util.each(this.config.params,function(e,t){i.input.members[e]&&(void 0===r[e]||null===r[e])&&(r[e]=t)}))}var o=new t.Request(this,e,r);return this.addAllRequestListeners(o),n&&o.send(n),o},makeUnauthenticatedRequest:function(e,t,r){"function"==typeof t&&(r=t,t={});var n=this.makeRequest(e,t).toUnauthenticated();return r?n.send(r):n},waitFor:function(e,r,n){var i=new t.ResourceWaiter(this,e);return i.wait(r,n)},addAllRequestListeners:function(e){for(var r=[t.events,t.EventListeners.Core,this.serviceInterface(),t.EventListeners.CorePost],n=0;n<r.length;n++)r[n]&&e.addListeners(r[n]);this.config.paramValidation||e.removeListener("validate",t.EventListeners.Core.VALIDATE_PARAMETERS),this.config.logger&&e.addListeners(t.EventListeners.Logger),this.setupRequestListeners(e)},setupRequestListeners:function(){},getSignerClass:function(){var e;return e=this.config.signatureVersion?this.config.signatureVersion:this.api.signatureVersion,t.Signers.RequestSigner.getVersion(e)},serviceInterface:function(){switch(this.api.protocol){case"ec2":return t.EventListeners.Query;case"query":return t.EventListeners.Query;case"json":return t.EventListeners.Json;case"rest-json":return t.EventListeners.RestJson;case"rest-xml":return t.EventListeners.RestXml}if(this.api.protocol)throw new Error("Invalid service `protocol' "+this.api.protocol+" in API config")},successfulResponse:function(e){return e.httpResponse.statusCode<300},numRetries:function(){return void 0!==this.config.maxRetries?this.config.maxRetries:this.defaultRetryCount},retryDelays:function(){for(var e=this.numRetries(),t=[],r=0;e>r;++r)t[r]=30*Math.pow(2,r);
return t},retryableError:function(e){return this.networkingError(e)?!0:this.expiredCredentialsError(e)?!0:this.throttledError(e)?!0:e.statusCode>=500?!0:!1},networkingError:function(e){return"NetworkingError"===e.code},expiredCredentialsError:function(e){return"ExpiredTokenException"===e.code},throttledError:function(e){switch(e.code){case"ProvisionedThroughputExceededException":case"Throttling":return!0;default:return!1}},endpointFromTemplate:function(e){if("string"!=typeof e)return e;var t=e;return t=t.replace(/\{service\}/g,this.api.endpointPrefix),t=t.replace(/\{region\}/g,this.config.region),t=t.replace(/\{scheme\}/g,this.config.sslEnabled?"https":"http")},setEndpoint:function(e){this.endpoint=new t.Endpoint(e,this.config)},paginationConfig:function(e,r){var n=this.api.operations[e].paginator;if(!n){if(r){var i=new Error;throw t.util.error(i,"No pagination configuration for "+e)}return null}return n}}),t.util.update(t.Service,{defineMethods:function(e){t.util.each(e.prototype.api.operations,function(t){e.prototype[t]||(e.prototype[t]=function(e,r){return this.makeRequest(t,e,r)})})},defineService:function(e,r,n){t.Service._serviceMap[e]=!0,Array.isArray(r)||(n=r,r=[]);var o=i(t.Service,n||{});if("string"==typeof e){t.Service.addVersions(o,r);var a=o.serviceIdentifier||e;o.serviceIdentifier=a}else o.prototype.api=e,t.Service.defineMethods(o);return o},addVersions:function(e,t){Array.isArray(t)||(t=[t]),e.services=e.services||{};for(var r=0;r<t.length;r++)void 0===e.services[t[r]]&&(e.services[t[r]]=null);e.apiVersions=Object.keys(e.services).sort()},defineServiceApi:function(e,n,o){function a(e){s.prototype.api=e.isApi?e:new r(e)}var s=i(e,{serviceIdentifier:e.serviceIdentifier});if("string"==typeof n){if(o)a(o);else try{a(t.apiLoader(e.serviceIdentifier,n))}catch(u){throw t.util.error(u,{message:"Could not find API configuration "+e.serviceIdentifier+"-"+n})}e.services.hasOwnProperty(n)||(e.apiVersions=e.apiVersions.concat(n).sort()),e.services[n]=s}else a(n);return t.Service.defineMethods(s),s},hasService:function(e){return t.Service._serviceMap.hasOwnProperty(e)},_serviceMap:{}})},{"./core":3,"./model/api":15,"./region_config":28}],36:[function(e){var t=e("../core");t.util.update(t.CognitoIdentity.prototype,{getOpenIdToken:function(e,t){return this.makeUnauthenticatedRequest("getOpenIdToken",e,t)},getId:function(e,t){return this.makeUnauthenticatedRequest("getId",e,t)},getCredentialsForIdentity:function(e,t){return this.makeUnauthenticatedRequest("getCredentialsForIdentity",e,t)}})},{"../core":3}],37:[function(e){var t=e("../core");t.util.update(t.DynamoDB.prototype,{setupRequestListeners:function(e){e.service.config.dynamoDbCrc32&&e.addListener("extractData",this.checkCrc32)},checkCrc32:function(e){e.httpResponse.streaming||e.request.service.crc32IsValid(e)||(e.error=t.util.error(new Error,{code:"CRC32CheckFailed",message:"CRC32 integrity check failed",retryable:!0}))},crc32IsValid:function(e){var r=e.httpResponse.headers["x-amz-crc32"];return r?parseInt(r,10)===t.util.crypto.crc32(e.httpResponse.body):!0},defaultRetryCount:10,retryDelays:function(){for(var e=this.numRetries(),t=[],r=0;e>r;++r)t.push(0===r?0:50*Math.pow(2,r-1));return t}})},{"../core":3}],38:[function(e){var t=e("../core");e("../s3/managed_upload"),t.util.update(t.S3.prototype,{validateService:function(){if(this.config.region||(this.config.region="us-east-1"),!this.config.endpoint&&this.config.s3BucketEndpoint){var e="An endpoint must be provided when configuring `s3BucketEndpoint` to true.";throw t.util.error(new Error,{name:"InvalidEndpoint",message:e})}},setupRequestListeners:function(e){e.addListener("validate",this.validateScheme),e.addListener("validate",this.validateBucketEndpoint),e.addListener("build",this.addContentType),e.addListener("build",this.populateURI),e.addListener("build",this.computeContentMd5),e.onAsync("build",this.computeSha256),e.addListener("build",this.computeSseCustomerKeyMd5),e.addListener("afterBuild",this.addExpect100Continue),e.removeListener("validate",t.EventListeners.Core.VALIDATE_REGION),e.addListener("extractError",this.extractError),e.addListener("extractData",this.extractData),e.addListener("extractData",t.util.hoistPayloadMember),e.addListener("beforePresign",this.prepareSignedUrl)},validateScheme:function(e){var r=e.params,n=e.httpRequest.endpoint.protocol,i=r.SSECustomerKey||r.CopySourceSSECustomerKey;if(i&&"https:"!==n){var o="Cannot send SSE keys over HTTP. Set 'sslEnabled'to 'true' in your configuration";throw t.util.error(new Error,{code:"ConfigError",message:o})}},validateBucketEndpoint:function(e){if(!e.params.Bucket&&e.service.config.s3BucketEndpoint){var r="Cannot send requests to root API with `s3BucketEndpoint` set.";throw t.util.error(new Error,{code:"ConfigError",message:r})}},populateURI:function(e){var t=e.httpRequest,r=e.params.Bucket;if(r&&!e.service.pathStyleBucketName(r)){if(!e.service.config.s3BucketEndpoint){t.endpoint.hostname=r+"."+t.endpoint.hostname;var n=t.endpoint.port;t.endpoint.host=80!==n&&443!==n?t.endpoint.hostname+":"+t.endpoint.port:t.endpoint.hostname}t.virtualHostedBucket=r,t.path=t.path.replace(new RegExp("/"+r),""),"/"!==t.path[0]&&(t.path="/"+t.path)}},addExpect100Continue:function(e){var r=e.httpRequest.headers["Content-Length"];t.util.isNode()&&r>=1048576&&(e.httpRequest.headers.Expect="100-continue")},addContentType:function(e){var r=e.httpRequest;if("GET"===r.method||"HEAD"===r.method)return void delete r.headers["Content-Type"];r.headers["Content-Type"]||(r.headers["Content-Type"]="application/octet-stream");var n=r.headers["Content-Type"];if(t.util.isBrowser())if("string"!=typeof r.body||n.match(/;\s*charset=/)){var i=function(e,t,r){return t+r.toUpperCase()};r.headers["Content-Type"]=n.replace(/(;\s*charset=)(.+)$/,i)}else{var o="; charset=UTF-8";r.headers["Content-Type"]+=o}},computableChecksumOperations:{putBucketCors:!0,putBucketLifecycle:!0,putBucketTagging:!0,deleteObjects:!0},willComputeChecksums:function(e){if(this.computableChecksumOperations[e.operation])return!0;if(!this.config.computeChecksums)return!1;if(!t.util.Buffer.isBuffer(e.httpRequest.body)&&"string"!=typeof e.httpRequest.body)return!1;var r=e.service.api.operations[e.operation].input.members;return e.service.getSignerClass(e)===t.Signers.V4&&r.ContentMD5&&!r.ContentMD5.required?!1:r.ContentMD5&&!e.params.ContentMD5?!0:void 0},computeContentMd5:function(e){if(e.service.willComputeChecksums(e)){var r=t.util.crypto.md5(e.httpRequest.body,"base64");e.httpRequest.headers["Content-MD5"]=r}},computeSha256:function(e,r){if(e.service.getSignerClass(e)===t.Signers.V4){var n=e.httpRequest.body||"";if(t.util.isNode()){var i=t.util.nodeRequire("stream").Stream,o=t.util.nodeRequire("fs");if(n instanceof i){if("string"!=typeof n.path)return void r(new Error("Non-file stream objects are not supported with SigV4 in AWS.S3"));n=o.createReadStream(n.path)}}t.util.crypto.sha256(n,"hex",function(t,n){t||(e.httpRequest.headers["X-Amz-Content-Sha256"]=n),r(t)})}else r()},computeSseCustomerKeyMd5:function(e){var r=["x-amz-server-side-encryption-customer-key","x-amz-copy-source-server-side-encryption-customer-key"];t.util.arrayEach(r,function(r){if(e.httpRequest.headers[r]){var n=e.httpRequest.headers[r],i=r+"-MD5";if(e.httpRequest.headers[r]=t.util.base64.encode(n),!e.httpRequest.headers[i]){var o=t.util.crypto.md5(n,"base64");e.httpRequest.headers[i]=o}}})},pathStyleBucketName:function(e){return this.config.s3ForcePathStyle?!0:this.config.s3BucketEndpoint?!1:this.dnsCompatibleBucketName(e)?this.config.sslEnabled&&e.match(/\./)?!0:!1:!0},dnsCompatibleBucketName:function(e){var t=e,r=new RegExp(/^[a-z0-9][a-z0-9\.\-]{1,61}[a-z0-9]$/),n=new RegExp(/(\d+\.){3}\d+/),i=new RegExp(/\.\./);return!t.match(r)||t.match(n)||t.match(i)?!1:!0},successfulResponse:function(e){var t=e.request,r=e.httpResponse;return"completeMultipartUpload"===t.operation&&r.body.toString().match("<Error>")?!1:r.statusCode<300},retryableError:function(e,r){if("completeMultipartUpload"===r.operation&&200===e.statusCode)return!0;if(e&&"RequestTimeout"===e.code)return!0;var n=t.Service.prototype.retryableError;return n.call(this,e,r)},extractData:function(e){var t=e.request;if("getBucketLocation"===t.operation){var r=e.httpResponse.body.toString().match(/>(.+)<\/Location/);r&&(delete e.data._,e.data.LocationConstraint=r[1])}},extractError:function(e){var r={304:"NotModified",403:"Forbidden",400:"BadRequest",404:"NotFound"},n=e.httpResponse.statusCode,i=e.httpResponse.body||"";if(r[n]&&0===i.length)e.error=t.util.error(new Error,{code:r[e.httpResponse.statusCode],message:null});else{var o=(new t.XML.Parser).parse(i.toString());e.error=t.util.error(new Error,{code:o.Code||n,message:o.Message||null})}},getSignedUrl:function(e,r,n){r=t.util.copy(r||{});var i=r.Expires||900;delete r.Expires;var o=this.makeRequest(e,r);return o.presign(i,n)},prepareSignedUrl:function(e){e.addListener("validate",e.service.noPresignedContentLength),e.removeListener("build",e.service.addContentType),e.params.Body||(e.removeListener("build",e.service.computeContentMd5),e.removeListener("build",e.service.computeSha256))},noPresignedContentLength:function(e){if(void 0!==e.params.ContentLength)throw t.util.error(new Error,{code:"UnexpectedParameter",message:"ContentLength is not supported in pre-signed URLs."})},createBucket:function(e,t){e||(e={});var r=this.endpoint.hostname;return r===this.api.globalEndpoint||e.CreateBucketConfiguration||(e.CreateBucketConfiguration={LocationConstraint:this.config.region}),this.makeRequest("createBucket",e,t)},upload:function(e,r,n){"function"==typeof r&&void 0===n&&(n=r,r=null),r=r||{},r=t.util.merge(r||{},{service:this,params:e});var i=new t.S3.ManagedUpload(r);return"function"==typeof n&&i.send(n),i}})},{"../core":3,"../s3/managed_upload":33}],39:[function(e){var t=e("../core");t.util.update(t.SQS.prototype,{setupRequestListeners:function(e){e.addListener("build",this.buildEndpoint),e.service.config.computeChecksums&&("sendMessage"===e.operation?e.addListener("extractData",this.verifySendMessageChecksum):"sendMessageBatch"===e.operation?e.addListener("extractData",this.verifySendMessageBatchChecksum):"receiveMessage"===e.operation&&e.addListener("extractData",this.verifyReceiveMessageChecksum))},verifySendMessageChecksum:function(e){if(e.data){var t=e.data.MD5OfMessageBody,r=this.params.MessageBody,n=this.service.calculateChecksum(r);if(n!==t){var i='Got "'+e.data.MD5OfMessageBody+'", expecting "'+n+'".';this.service.throwInvalidChecksumError(e,[e.data.MessageId],i)}}},verifySendMessageBatchChecksum:function(e){if(e.data){var r=this.service,n={},i=[],o=[];t.util.arrayEach(e.data.Successful,function(e){n[e.Id]=e}),t.util.arrayEach(this.params.Entries,function(e){if(n[e.Id]){var t=n[e.Id].MD5OfMessageBody,a=e.MessageBody;r.isChecksumValid(t,a)||(i.push(e.Id),o.push(n[e.Id].MessageId))}}),i.length>0&&r.throwInvalidChecksumError(e,o,"Invalid messages: "+i.join(", "))}},verifyReceiveMessageChecksum:function(e){if(e.data){var r=this.service,n=[];t.util.arrayEach(e.data.Messages,function(e){var t=e.MD5OfBody,i=e.Body;r.isChecksumValid(t,i)||n.push(e.MessageId)}),n.length>0&&r.throwInvalidChecksumError(e,n,"Invalid messages: "+n.join(", "))}},throwInvalidChecksumError:function(e,r,n){e.error=t.util.error(new Error,{retryable:!0,code:"InvalidChecksum",messageIds:r,message:e.request.operation+" returned an invalid MD5 response. "+n})},isChecksumValid:function(e,t){return this.calculateChecksum(t)===e},calculateChecksum:function(e){return t.util.crypto.md5(e,"hex")},buildEndpoint:function(e){var r=e.httpRequest.params.QueueUrl;if(r){e.httpRequest.endpoint=new t.Endpoint(r);var n=e.httpRequest.endpoint.host.match(/^sqs\.(.+?)\./);n&&(e.httpRequest.region=n[1])}}})},{"../core":3}],40:[function(e){var t=e("../core");t.util.update(t.STS.prototype,{credentialsFrom:function(e,r){return e?(r||(r=new t.TemporaryCredentials),r.expired=!1,r.accessKeyId=e.Credentials.AccessKeyId,r.secretAccessKey=e.Credentials.SecretAccessKey,r.sessionToken=e.Credentials.SessionToken,r.expireTime=e.Credentials.Expiration,r):null},assumeRoleWithWebIdentity:function(e,t){return this.makeUnauthenticatedRequest("assumeRoleWithWebIdentity",e,t)},assumeRoleWithSAML:function(e,t){return this.makeUnauthenticatedRequest("assumeRoleWithSAML",e,t)}})},{"../core":3}],41:[function(e,t){function r(e){var t=e.httpRequest.headers[a];if(delete e.httpRequest.headers["User-Agent"],delete e.httpRequest.headers["X-Amz-User-Agent"],e.service.getSignerClass()===i.Signers.V4){if(t>604800){var r="Presigning does not support expiry time greater than a week with SigV4 signing.";throw i.util.error(new Error,{code:"InvalidExpiryTime",message:r,retryable:!1})}e.httpRequest.headers[a]=t}else{if(e.service.getSignerClass()!==i.Signers.S3)throw i.util.error(new Error,{message:"Presigning only supports S3 or SigV4 signing.",code:"UnsupportedSigner",retryable:!1});e.httpRequest.headers[a]=parseInt(i.util.date.unixTimestamp()+t,10).toString()}}function n(e){var t=e.httpRequest.endpoint,r=i.util.urlParse(e.httpRequest.path),n={};r.search&&(n=i.util.queryStringParse(r.search.substr(1))),i.util.each(e.httpRequest.headers,function(e,t){e===a&&(e="Expires"),n[e]=t}),delete e.httpRequest.headers[a];var o=n.Authorization.split(" ");if("AWS"===o[0])o=o[1].split(":"),n.AWSAccessKeyId=o[0],n.Signature=o[1];else if("AWS4-HMAC-SHA256"===o[0]){o.shift();var s=o.join(" "),u=s.match(/Signature=(.*?)(?:,|\s|\r?\n|$)/)[1];n["X-Amz-Signature"]=u,delete n.Expires}delete n.Authorization,delete n.Host,t.pathname=r.pathname,t.search=i.util.queryParamsToString(n)}var i=e("../core"),o=i.util.inherit,a="presigned-expires";i.Signers.Presign=o({sign:function(e,t,o){if(e.httpRequest.headers[a]=t||3600,e.on("build",r),e.on("sign",n),e.removeListener("afterBuild",i.EventListeners.Core.SET_CONTENT_LENGTH),e.emit("beforePresign",[e]),!o){if(e.build(),e.response.error)throw e.response.error;return i.util.urlFormat(e.httpRequest.endpoint)}e.build(function(){this.response.error?o(this.response.error):o(null,i.util.urlFormat(e.httpRequest.endpoint))})}}),t.exports=i.Signers.Presign},{"../core":3}],42:[function(e){var t=e("../core"),r=t.util.inherit;t.Signers.RequestSigner=r({constructor:function(e){this.request=e}}),t.Signers.RequestSigner.getVersion=function(e){switch(e){case"v2":return t.Signers.V2;case"v3":return t.Signers.V3;case"v4":return t.Signers.V4;case"s3":return t.Signers.S3;case"v3https":return t.Signers.V3Https}throw new Error("Unknown signing version "+e)},e("./v2"),e("./v3"),e("./v3https"),e("./v4"),e("./s3"),e("./presign")},{"../core":3,"./presign":41,"./s3":43,"./v2":44,"./v3":45,"./v3https":46,"./v4":47}],43:[function(e,t){var r=e("../core"),n=r.util.inherit;r.Signers.S3=n(r.Signers.RequestSigner,{subResources:{acl:1,cors:1,lifecycle:1,"delete":1,location:1,logging:1,notification:1,partNumber:1,policy:1,requestPayment:1,restore:1,tagging:1,torrent:1,uploadId:1,uploads:1,versionId:1,versioning:1,versions:1,website:1},responseHeaders:{"response-content-type":1,"response-content-language":1,"response-expires":1,"response-cache-control":1,"response-content-disposition":1,"response-content-encoding":1},addAuthorization:function(e,t){this.request.headers["presigned-expires"]||(this.request.headers["X-Amz-Date"]=r.util.date.rfc822(t)),e.sessionToken&&(this.request.headers["x-amz-security-token"]=e.sessionToken);var n=this.sign(e.secretAccessKey,this.stringToSign()),i="AWS "+e.accessKeyId+":"+n;this.request.headers.Authorization=i},stringToSign:function(){var e=this.request,t=[];t.push(e.method),t.push(e.headers["Content-MD5"]||""),t.push(e.headers["Content-Type"]||""),t.push(e.headers["presigned-expires"]||"");var r=this.canonicalizedAmzHeaders();return r&&t.push(r),t.push(this.canonicalizedResource()),t.join("\n")},canonicalizedAmzHeaders:function(){var e=[];r.util.each(this.request.headers,function(t){t.match(/^x-amz-/i)&&e.push(t)}),e.sort(function(e,t){return e.toLowerCase()<t.toLowerCase()?-1:1});var t=[];return r.util.arrayEach.call(this,e,function(e){t.push(e.toLowerCase()+":"+String(this.request.headers[e]))}),t.join("\n")},canonicalizedResource:function(){var e=this.request,t=e.path.split("?"),n=t[0],i=t[1],o="";if(e.virtualHostedBucket&&(o+="/"+e.virtualHostedBucket),o+=n,i){var a=[];r.util.arrayEach.call(this,i.split("&"),function(e){var t=e.split("=")[0],r=e.split("=")[1];if(this.subResources[t]||this.responseHeaders[t]){var n={name:t};void 0!==r&&(n.value=this.subResources[t]?r:decodeURIComponent(r)),a.push(n)}}),a.sort(function(e,t){return e.name<t.name?-1:1}),a.length&&(i=[],r.util.arrayEach(a,function(e){i.push(void 0===e.value?e.name:e.name+"="+e.value)}),o+="?"+i.join("&"))}return o},sign:function(e,t){return r.util.crypto.hmac(e,t,"base64","sha1")}}),t.exports=r.Signers.S3},{"../core":3}],44:[function(e,t){var r=e("../core"),n=r.util.inherit;r.Signers.V2=n(r.Signers.RequestSigner,{addAuthorization:function(e,t){t||(t=r.util.date.getDate());var n=this.request;n.params.Timestamp=r.util.date.iso8601(t),n.params.SignatureVersion="2",n.params.SignatureMethod="HmacSHA256",n.params.AWSAccessKeyId=e.accessKeyId,e.sessionToken&&(n.params.SecurityToken=e.sessionToken),delete n.params.Signature,n.params.Signature=this.signature(e),n.body=r.util.queryParamsToString(n.params),n.headers["Content-Length"]=n.body.length},signature:function(e){return r.util.crypto.hmac(e.secretAccessKey,this.stringToSign(),"base64")},stringToSign:function(){var e=[];return e.push(this.request.method),e.push(this.request.endpoint.host.toLowerCase()),e.push(this.request.pathname()),e.push(r.util.queryParamsToString(this.request.params)),e.join("\n")}}),t.exports=r.Signers.V2},{"../core":3}],45:[function(e,t){var r=e("../core"),n=r.util.inherit;r.Signers.V3=n(r.Signers.RequestSigner,{addAuthorization:function(e,t){var n=r.util.date.rfc822(t);this.request.headers["X-Amz-Date"]=n,e.sessionToken&&(this.request.headers["x-amz-security-token"]=e.sessionToken),this.request.headers["X-Amzn-Authorization"]=this.authorization(e,n)},authorization:function(e){return"AWS3 AWSAccessKeyId="+e.accessKeyId+",Algorithm=HmacSHA256,SignedHeaders="+this.signedHeaders()+",Signature="+this.signature(e)},signedHeaders:function(){var e=[];return r.util.arrayEach(this.headersToSign(),function(t){e.push(t.toLowerCase())}),e.sort().join(";")},canonicalHeaders:function(){var e=this.request.headers,t=[];return r.util.arrayEach(this.headersToSign(),function(r){t.push(r.toLowerCase().trim()+":"+String(e[r]).trim())}),t.sort().join("\n")+"\n"},headersToSign:function(){var e=[];return r.util.each(this.request.headers,function(t){("Host"===t||"Content-Encoding"===t||t.match(/^X-Amz/i))&&e.push(t)}),e},signature:function(e){return r.util.crypto.hmac(e.secretAccessKey,this.stringToSign(),"base64")},stringToSign:function(){var e=[];return e.push(this.request.method),e.push("/"),e.push(""),e.push(this.canonicalHeaders()),e.push(this.request.body),r.util.crypto.sha256(e.join("\n"))}}),t.exports=r.Signers.V3},{"../core":3}],46:[function(e,t){var r=e("../core"),n=r.util.inherit;e("./v3"),r.Signers.V3Https=n(r.Signers.V3,{authorization:function(e){return"AWS3-HTTPS AWSAccessKeyId="+e.accessKeyId+",Algorithm=HmacSHA256,Signature="+this.signature(e)},stringToSign:function(){return this.request.headers["X-Amz-Date"]}}),t.exports=r.Signers.V3Https},{"../core":3,"./v3":45}],47:[function(e,t){var r=e("../core"),n=r.util.inherit,i={},o="presigned-expires";r.Signers.V4=n(r.Signers.RequestSigner,{constructor:function(e,t){r.Signers.RequestSigner.call(this,e),this.serviceName=t},algorithm:"AWS4-HMAC-SHA256",addAuthorization:function(e,t){var n=r.util.date.iso8601(t).replace(/[:\-]|\.\d{3}/g,"");this.isPresigned()?this.updateForPresigned(e,n):this.addHeaders(e,n),this.request.headers.Authorization=this.authorization(e,n)},addHeaders:function(e,t){this.request.headers["X-Amz-Date"]=t,e.sessionToken&&(this.request.headers["x-amz-security-token"]=e.sessionToken)},updateForPresigned:function(e,t){var n=this.credentialString(t),i={"X-Amz-Date":t,"X-Amz-Algorithm":this.algorithm,"X-Amz-Credential":e.accessKeyId+"/"+n,"X-Amz-Expires":this.request.headers[o],"X-Amz-SignedHeaders":this.signedHeaders()};e.sessionToken&&(i["X-Amz-Security-Token"]=e.sessionToken),this.request.headers["Content-Type"]&&(i["Content-Type"]=this.request.headers["Content-Type"]),r.util.each.call(this,this.request.headers,function(e,t){e!==o&&this.isSignableHeader(e)&&0===e.toLowerCase().indexOf("x-amz-")&&(i[e]=t)});var a=this.request.path.indexOf("?")>=0?"&":"?";this.request.path+=a+r.util.queryParamsToString(i)},authorization:function(e,t){var r=[],n=this.credentialString(t);return r.push(this.algorithm+" Credential="+e.accessKeyId+"/"+n),r.push("SignedHeaders="+this.signedHeaders()),r.push("Signature="+this.signature(e,t)),r.join(", ")},signature:function(e,t){var n=i[this.serviceName],o=t.substr(0,8);if(!n||n.akid!==e.accessKeyId||n.region!==this.request.region||n.date!==o){var a=e.secretAccessKey,s=r.util.crypto.hmac("AWS4"+a,o,"buffer"),u=r.util.crypto.hmac(s,this.request.region,"buffer"),c=r.util.crypto.hmac(u,this.serviceName,"buffer"),p=r.util.crypto.hmac(c,"aws4_request","buffer");i[this.serviceName]={region:this.request.region,date:o,key:p,akid:e.accessKeyId}}var l=i[this.serviceName].key;return r.util.crypto.hmac(l,this.stringToSign(t),"hex")},stringToSign:function(e){var t=[];return t.push("AWS4-HMAC-SHA256"),t.push(e),t.push(this.credentialString(e)),t.push(this.hexEncodedHash(this.canonicalString())),t.join("\n")},canonicalString:function(){var e=[],t=this.request.pathname();return"s3"!==this.serviceName&&(t=r.util.uriEscapePath(t)),e.push(this.request.method),e.push(t),e.push(this.request.search()),e.push(this.canonicalHeaders()+"\n"),e.push(this.signedHeaders()),e.push(this.hexEncodedBodyHash()),e.join("\n")},canonicalHeaders:function(){var e=[];r.util.each.call(this,this.request.headers,function(t,r){e.push([t,r])}),e.sort(function(e,t){return e[0].toLowerCase()<t[0].toLowerCase()?-1:1});var t=[];return r.util.arrayEach.call(this,e,function(e){var r=e[0].toLowerCase();this.isSignableHeader(r)&&t.push(r+":"+this.canonicalHeaderValues(e[1].toString()))}),t.join("\n")},canonicalHeaderValues:function(e){return e.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")},signedHeaders:function(){var e=[];return r.util.each.call(this,this.request.headers,function(t){t=t.toLowerCase(),this.isSignableHeader(t)&&e.push(t)}),e.sort().join(";")},credentialString:function(e){var t=[];return t.push(e.substr(0,8)),t.push(this.request.region),t.push(this.serviceName),t.push("aws4_request"),t.join("/")},hexEncodedHash:function(e){return r.util.crypto.sha256(e,"hex")},hexEncodedBodyHash:function(){return this.isPresigned()&&"s3"===this.serviceName?"UNSIGNED-PAYLOAD":this.request.headers["X-Amz-Content-Sha256"]?this.request.headers["X-Amz-Content-Sha256"]:this.hexEncodedHash(this.request.body||"")},unsignableHeaders:["authorization","content-type","content-length","user-agent",o],isSignableHeader:function(e){return 0===e.toLowerCase().indexOf("x-amz-")?!0:this.unsignableHeaders.indexOf(e)<0},isPresigned:function(){return this.request.headers[o]?!0:!1}}),t.exports=r.Signers.V4},{"../core":3}],48:[function(e,t){function r(e,t){this.currentState=t||null,this.states=e||{}}r.prototype.runTo=function(e,t,r,n){"function"==typeof e&&(n=r,r=t,t=e,e=null);var i=this,o=i.states[i.currentState];o.fn.call(r||i,n,function(n){if(n){if(!o.fail)return t?t.call(r,n):null;i.currentState=o.fail}else{if(!o.accept)return t?t.call(r):null;i.currentState=o.accept}return i.currentState===e?t?t.call(r,n):null:void i.runTo(e,t,r,n)})},r.prototype.addState=function(e,t,r,n){return"function"==typeof t?(n=t,t=null,r=null):"function"==typeof r&&(n=r,r=null),this.currentState||(this.currentState=e),this.states[e]={accept:t,fail:r,fn:n},this},t.exports=r},{}],49:[function(e,t){(function(r){var n,i=e("crypto"),o=e("buffer").Buffer,a={engine:function(){return a.isBrowser()&&"undefined"!=typeof navigator?navigator.userAgent:r.platform+"/"+r.version},userAgent:function(){var t=a.isBrowser()?"js":"nodejs",r="aws-sdk-"+t+"/"+e("./core").VERSION;return"nodejs"===t&&(r+=" "+a.engine()),r},isBrowser:function(){return r&&r.browser},isNode:function(){return!a.isBrowser()},nodeRequire:function(t){return a.isNode()?e(t):void 0},multiRequire:function(t,r){return e(a.isNode()?t:r)},uriEscape:function(e){var t=encodeURIComponent(e);return t=t.replace(/[^A-Za-z0-9_.~\-%]+/g,escape),t=t.replace(/[*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})},uriEscapePath:function(e){var t=[];return a.arrayEach(e.split("/"),function(e){t.push(a.uriEscape(e))}),t.join("/")},urlParse:function(t){return e("url").parse(t)},urlFormat:function(t){return e("url").format(t)},queryStringParse:function(t){return e("querystring").parse(t)},queryParamsToString:function(e){var t=[],r=a.uriEscape,n=Object.keys(e).sort();return a.arrayEach(n,function(n){var i=e[n],o=r(n),s=o+"=";if(Array.isArray(i)){var u=[];a.arrayEach(i,function(e){u.push(r(e))}),s=o+"="+u.sort().join("&"+o+"=")}else void 0!==i&&null!==i&&(s=o+"="+r(i));t.push(s)}),t.join("&")},readFileSync:function(e){return"undefined"!=typeof window?null:a.nodeRequire("fs").readFileSync(e,"utf-8")},base64:{encode:function(e){return new o(e).toString("base64")},decode:function(e){return new o(e,"base64")}},Buffer:o,buffer:{toStream:function(e){a.Buffer.isBuffer(e)||(e=new a.Buffer(e));var t=new(a.nodeRequire("stream").Readable),r=0;return t._read=function(n){if(r>=e.length)return t.push(null);var i=r+n;i>e.length&&(i=e.length),t.push(e.slice(r,i)),r=i},t},concat:function(e){var t,r=0,n=0,i=null;for(t=0;t<e.length;t++)r+=e[t].length;for(i=new o(r),t=0;t<e.length;t++)e[t].copy(i,n),n+=e[t].length;return i}},string:{byteLength:function(e){if(null===e||void 0===e)return 0;if("string"==typeof e&&(e=new o(e)),"number"==typeof e.byteLength)return e.byteLength;if("number"==typeof e.length)return e.length;if("number"==typeof e.size)return e.size;if("string"==typeof e.path)return a.nodeRequire("fs").lstatSync(e.path).size;throw a.error(new Error("Cannot determine length of "+e),{object:e})},upperFirst:function(e){return e[0].toUpperCase()+e.substr(1)},lowerFirst:function(e){return e[0].toLowerCase()+e.substr(1)}},ini:{parse:function(e){var t,r={};return a.arrayEach(e.split(/\r?\n/),function(e){e=e.split(/(^|\s);/)[0];var n=e.match(/^\s*\[([^\[\]]+)\]\s*$/);if(n)t=n[1];else if(t){var i=e.match(/^\s*(.+?)\s*=\s*(.+?)\s*$/);i&&(r[t]=r[t]||{},r[t][i[1]]=i[2])}}),r}},fn:{noop:function(){},makeAsync:function(e,t){return t&&t<=e.length?e:function(){var t=Array.prototype.slice.call(arguments,0),r=t.pop(),n=e.apply(null,t);r(n)}}},jamespath:{query:function(e,t){if(!t)return[];var r=[],n=e.split(/\s+\|\|\s+/);return a.arrayEach.call(this,n,function(e){var n=[t],i=e.split(".");return a.arrayEach.call(this,i,function(e){var t=e.match("^(.+?)(?:\\[(-?\\d+|\\*|)\\])?$"),r=[];return a.arrayEach.call(this,n,function(e){"*"===t[1]?a.arrayEach.call(this,e,function(e){r.push(e)}):e.hasOwnProperty(t[1])&&r.push(e[t[1]])}),n=r,void 0!==t[2]&&(r=[],a.arrayEach.call(this,n,function(e){if(Array.isArray(e))if("*"===t[2]||""===t[2])r=r.concat(e);else{var n=parseInt(t[2],10);0>n&&(n=e.length+n),r.push(e[n])}}),n=r),0===n.length?a.abort:void 0}),n.length>0?(r=n,a.abort):void 0}),r},find:function(e,t){return a.jamespath.query(e,t)[0]}},date:{getDate:function(){return n||(n=e("./core")),n.config.systemClockOffset?new Date((new Date).getTime()+n.config.systemClockOffset):new Date},iso8601:function(e){return void 0===e&&(e=a.date.getDate()),e.toISOString()},rfc822:function(e){return void 0===e&&(e=a.date.getDate()),e.toUTCString()},unixTimestamp:function(e){return void 0===e&&(e=a.date.getDate()),e.getTime()/1e3},from:function(e){return new Date("number"==typeof e?1e3*e:e)},format:function(e,t){return t||(t="iso8601"),a.date[t](a.date.from(e))},parseTimestamp:function(e){if("number"==typeof e)return new Date(1e3*e);if(e.match(/^\d+$/))return new Date(1e3*e);if(e.match(/^\d{4}/))return new Date(e);if(e.match(/^\w{3},/))return new Date(e);throw a.error(new Error("unhandled timestamp format: "+e),{code:"TimestampParserError"})}},crypto:{crc32Table:[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,2932959818,3654703836,1088359270,936918e3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],crc32:function(e){var t=a.crypto.crc32Table,r=-1;"string"==typeof e&&(e=new o(e));for(var n=0;n<e.length;n++){var i=e.readUInt8(n);r=r>>>8^t[255&(r^i)]}return(-1^r)>>>0},hmac:function(e,t,r,n){return r||(r="binary"),"buffer"===r&&(r=void 0),n||(n="sha256"),"string"==typeof t&&(t=new o(t)),i.createHmac(n,e).update(t).digest(r)},md5:function(e,t,r){return a.crypto.hash("md5",e,t,r)},sha256:function(e,t,r){return a.crypto.hash("sha256",e,t,r)},hash:function(e,t,r,n){var i=a.crypto.createHash(e);r||(r="binary"),"buffer"===r&&(r=void 0),"string"==typeof t&&(t=new o(t));var s=a.arraySliceFn(t),u=o.isBuffer(t);if(n&&"object"==typeof t&&"function"==typeof t.on&&!u)t.on("data",function(e){i.update(e)}),t.on("error",function(e){n(e)}),t.on("end",function(){n(null,i.digest(r))});else{if(!n||!s||u||"undefined"==typeof FileReader){a.isBrowser()&&"object"==typeof t&&!u&&(t=new o(new Uint8Array(t)));var c=i.update(t).digest(r);return n&&n(null,c),c}var p=0,l=524288,m=new FileReader;m.onerror=function(){n(new Error("Failed to read data."))},m.onload=function(){var e=new o(new Uint8Array(m.result));
i.update(e),p+=e.length,m._continueReading()},m._continueReading=function(){if(p>=t.size)return void n(null,i.digest(r));var e=p+l;e>t.size&&(e=t.size),m.readAsArrayBuffer(s.call(t,p,e))},m._continueReading()}},toHex:function(e){for(var t=[],r=0;r<e.length;r++)t.push(("0"+e.charCodeAt(r).toString(16)).substr(-2,2));return t.join("")},createHash:function(e){return i.createHash(e)}},abort:{},each:function(e,t){for(var r in e)if(e.hasOwnProperty(r)){var n=t.call(this,r,e[r]);if(n===a.abort)break}},arrayEach:function(e,t){for(var r in e)if(e.hasOwnProperty(r)){var n=t.call(this,e[r],parseInt(r,10));if(n===a.abort)break}},update:function(e,t){return a.each(t,function(t,r){e[t]=r}),e},merge:function(e,t){return a.update(a.copy(e),t)},copy:function(e){if(null===e||void 0===e)return e;var t={};for(var r in e)t[r]=e[r];return t},isEmpty:function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0},arraySliceFn:function(e){var t=e.slice||e.webkitSlice||e.mozSlice;return"function"==typeof t?t:null},isType:function(e,t){return"function"==typeof t&&(t=a.typeName(t)),Object.prototype.toString.call(e)==="[object "+t+"]"},typeName:function(e){if(e.hasOwnProperty("name"))return e.name;var t=e.toString(),r=t.match(/^\s*function (.+)\(/);return r?r[1]:t},error:function(e,t){var r=null;return"string"==typeof e.message&&""!==e.message&&("string"==typeof t||t&&t.message)&&(r=a.copy(e),r.message=e.message),e.message=e.message||null,"string"==typeof t?e.message=t:a.update(e,t),"function"==typeof Object.defineProperty&&(Object.defineProperty(e,"name",{writable:!0,enumerable:!1}),Object.defineProperty(e,"message",{enumerable:!0})),e.name=e.name||e.code||"Error",e.time=new Date,r&&(e.originalError=r),e},inherit:function(e,t){var r=null;if(void 0===t)t=e,e=Object,r={};else{var n=function(){};n.prototype=e.prototype,r=new n}return t.constructor===Object&&(t.constructor=function(){return e!==Object?e.apply(this,arguments):void 0}),t.constructor.prototype=r,a.update(t.constructor.prototype,t),t.constructor.__super__=e,t.constructor},mixin:function(){for(var e=arguments[0],t=1;t<arguments.length;t++)for(var r in arguments[t].prototype){var n=arguments[t].prototype[r];"constructor"!==r&&(e.prototype[r]=n)}return e},hideProperties:function(e,t){"function"==typeof Object.defineProperty&&a.arrayEach(t,function(t){Object.defineProperty(e,t,{enumerable:!1,writable:!0,configurable:!0})})},property:function(e,t,r,n,i){var o={configurable:!0,enumerable:void 0!==n?n:!0};"function"!=typeof r||i?(o.value=r,o.writable=!0):o.get=r,Object.defineProperty(e,t,o)},memoizedProperty:function(e,t,r,n){var i=null;a.property(e,t,function(){return null===i&&(i=r()),i},n)},hoistPayloadMember:function(e){var t=e.request,r=t.operation,i=t.service.api.operations[r].output;if(i.payload){var o=i.members[i.payload],a=e.data[i.payload];"structure"===o.type&&n.util.each(a,function(t,r){n.util.property(e.data,t,r,!1)})}}};t.exports=a}).call(this,e("FWaASH"))},{"./core":3,FWaASH:63,buffer:52,crypto:56,querystring:67,url:68}],50:[function(e,t){function r(){}function n(e,t){switch(t||(t={}),t.type){case"structure":return i(e,t);case"map":return o(e,t);case"list":return a(e,t);case void 0:case null:return u(e);default:return s(e,t)}}function i(e,t){var r={};return null===e?r:(c.each(t.members,function(t,i){if(i.isXmlAttribute){if(e.attributes.hasOwnProperty(i.name)){var o=e.attributes[i.name].value;r[t]=n({textContent:o},i)}}else{var a=i.flattened?e:e.getElementsByTagName(i.name)[0];a?r[t]=n(a,i):i.flattened||"list"!==i.type||(r[t]=i.defaultValue)}}),r)}function o(e,t){for(var r={},i=t.key.name||"key",o=t.value.name||"value",a=t.flattened?t.name:"entry",s=e.firstElementChild;s;){if(s.nodeName===a){var u=s.getElementsByTagName(i)[0].textContent,c=s.getElementsByTagName(o)[0];r[u]=n(c,t.value)}s=s.nextElementSibling}return r}function a(e,t){for(var r=[],i=t.flattened?t.name:t.member.name||"member",o=e.firstElementChild;o;)o.nodeName===i&&r.push(n(o,t.member)),o=o.nextElementSibling;return r}function s(e,t){if(e.getAttribute){var r=e.getAttribute("encoding");"base64"===r&&(t=new p.create({type:r}))}var n=e.textContent;return""===n&&(n=null),"function"==typeof t.toType?t.toType(n):n}function u(e){if(void 0===e||null===e)return"";if(!e.firstElementChild)return null===e.parentNode.parentNode?{}:0===e.childNodes.length?"":e.textContent;for(var t={type:"structure",members:{}},r=e.firstElementChild;r;){var n=r.nodeName;t.members.hasOwnProperty(n)?t.members[n].type="list":t.members[n]={name:n},r=r.nextElementSibling}return i(e,t)}var c=e("../util"),p=e("../model/shape");r.prototype.parse=function(e,t){if(""===e.replace(/^\s+/,""))return{};var r,i;try{if(window.DOMParser){try{var o=new DOMParser;r=o.parseFromString(e,"text/xml")}catch(a){throw c.error(new Error("Parse error in document"),{originalError:a})}if(null===r.documentElement)throw new Error("Cannot parse empty document.");var s=r.getElementsByTagName("parsererror")[0];if(s&&(s.parentNode===r||"body"===s.parentNode.nodeName))throw new Error(s.getElementsByTagName("div")[0].textContent)}else{if(!window.ActiveXObject)throw new Error("Cannot load XML parser");if(r=new window.ActiveXObject("Microsoft.XMLDOM"),r.async=!1,!r.loadXML(e))throw new Error("Parse error in document")}}catch(u){i=u}if(r&&r.documentElement&&!i){var p=n(r.documentElement,t),l=r.getElementsByTagName("ResponseMetadata")[0];return l&&(p.ResponseMetadata=n(l,{})),p}if(i)throw c.error(i||new Error,{code:"XMLParserError"});return{}},t.exports=r},{"../model/shape":20,"../util":49}],51:[function(e,t){function r(){}function n(e,t,r){switch(r.type){case"structure":return i(e,t,r);case"map":return o(e,t,r);case"list":return a(e,t,r);default:return s(e,t,r)}}function i(e,t,r){c.arrayEach(r.memberNames,function(i){var o=r.members[i];if("body"===o.location){var a=t[i],s=o.name;if(void 0!==a&&null!==a)if(o.isXmlAttribute)e.att(s,a);else if(o.flattened)n(e,a,o);else{var c=e.ele(s);u(c,o),n(c,a,o)}}})}function o(e,t,r){var i=r.key.name||"key",o=r.value.name||"value";c.each(t,function(t,a){var s=e.ele(r.flattened?r.name:"entry");n(s.ele(i),t,r.key),n(s.ele(o),a,r.value)})}function a(e,t,r){r.flattened?c.arrayEach(t,function(t){var i=r.member.name||r.name,o=e.ele(i);n(o,t,r.member)}):c.arrayEach(t,function(t){var i=r.member.name||"member",o=e.ele(i);n(o,t,r.member)})}function s(e,t,r){e.txt(r.toWireFormat(t))}function u(e,t){var r,n="xmlns";t.xmlNamespaceUri?(r=t.xmlNamespaceUri,t.xmlNamespacePrefix&&(n+=":"+t.xmlNamespacePrefix)):e.isRoot&&t.api.xmlNamespaceUri&&(r=t.api.xmlNamespaceUri),r&&e.att(n,r)}var c=e("../util"),p=e("xmlbuilder");r.prototype.toXML=function(e,t,r){var i=p.create(r);return u(i,t),n(i,e,t),0===i.children.length?"":i.root().toString()},t.exports=r},{"../util":49,xmlbuilder:73}],52:[function(e,t,r){function n(e,t,r){if(!(this instanceof n))return new n(e,t,r);var i=typeof e;if("base64"===t&&"string"===i)for(e=A(e);e.length%4!==0;)e+="=";var o;if("number"===i)o=T(e);else if("string"===i)o=n.byteLength(e,t);else{if("object"!==i)throw new Error("First argument needs to be a number, array or string.");o=T(e.length)}var a;n._useTypedArrays?a=n._augment(new Uint8Array(o)):(a=this,a.length=o,a._isBuffer=!0);var s;if(n._useTypedArrays&&"number"==typeof e.byteLength)a._set(e);else if(P(e))for(s=0;o>s;s++)a[s]=n.isBuffer(e)?e.readUInt8(s):e[s];else if("string"===i)a.write(e,0,t);else if("number"===i&&!n._useTypedArrays&&!r)for(s=0;o>s;s++)a[s]=0;return a}function i(e,t,r,i){r=Number(r)||0;var o=e.length-r;i?(i=Number(i),i>o&&(i=o)):i=o;var a=t.length;F(a%2===0,"Invalid hex string"),i>a/2&&(i=a/2);for(var s=0;i>s;s++){var u=parseInt(t.substr(2*s,2),16);F(!isNaN(u),"Invalid hex string"),e[r+s]=u}return n._charsWritten=2*s,s}function o(e,t,r,i){var o=n._charsWritten=_(B(t),e,r,i);return o}function a(e,t,r,i){var o=n._charsWritten=_(L(t),e,r,i);return o}function s(e,t,r,n){return a(e,t,r,n)}function u(e,t,r,i){var o=n._charsWritten=_(U(t),e,r,i);return o}function c(e,t,r,i){var o=n._charsWritten=_(D(t),e,r,i);return o}function p(e,t,r){return V.fromByteArray(0===t&&r===e.length?e:e.slice(t,r))}function l(e,t,r){var n="",i="";r=Math.min(e.length,r);for(var o=t;r>o;o++)e[o]<=127?(n+=z(i)+String.fromCharCode(e[o]),i=""):i+="%"+e[o].toString(16);return n+z(i)}function m(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;r>i;i++)n+=String.fromCharCode(e[i]);return n}function d(e,t,r){return m(e,t,r)}function h(e,t,r){var n=e.length;(!t||0>t)&&(t=0),(!r||0>r||r>n)&&(r=n);for(var i="",o=t;r>o;o++)i+=M(e[o]);return i}function y(e,t,r){for(var n=e.slice(t,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function f(e,t,r,n){n||(F("boolean"==typeof r,"missing or invalid endian"),F(void 0!==t&&null!==t,"missing offset"),F(t+1<e.length,"Trying to read beyond buffer length"));var i=e.length;if(!(t>=i)){var o;return r?(o=e[t],i>t+1&&(o|=e[t+1]<<8)):(o=e[t]<<8,i>t+1&&(o|=e[t+1])),o}}function g(e,t,r,n){n||(F("boolean"==typeof r,"missing or invalid endian"),F(void 0!==t&&null!==t,"missing offset"),F(t+3<e.length,"Trying to read beyond buffer length"));var i=e.length;if(!(t>=i)){var o;return r?(i>t+2&&(o=e[t+2]<<16),i>t+1&&(o|=e[t+1]<<8),o|=e[t],i>t+3&&(o+=e[t+3]<<24>>>0)):(i>t+1&&(o=e[t+1]<<16),i>t+2&&(o|=e[t+2]<<8),i>t+3&&(o|=e[t+3]),o+=e[t]<<24>>>0),o}}function b(e,t,r,n){n||(F("boolean"==typeof r,"missing or invalid endian"),F(void 0!==t&&null!==t,"missing offset"),F(t+1<e.length,"Trying to read beyond buffer length"));var i=e.length;if(!(t>=i)){var o=f(e,t,r,!0),a=32768&o;return a?-1*(65535-o+1):o}}function v(e,t,r,n){n||(F("boolean"==typeof r,"missing or invalid endian"),F(void 0!==t&&null!==t,"missing offset"),F(t+3<e.length,"Trying to read beyond buffer length"));var i=e.length;if(!(t>=i)){var o=g(e,t,r,!0),a=2147483648&o;return a?-1*(4294967295-o+1):o}}function S(e,t,r,n){return n||(F("boolean"==typeof r,"missing or invalid endian"),F(t+3<e.length,"Trying to read beyond buffer length")),H.read(e,t,r,23,4)}function N(e,t,r,n){return n||(F("boolean"==typeof r,"missing or invalid endian"),F(t+7<e.length,"Trying to read beyond buffer length")),H.read(e,t,r,52,8)}function I(e,t,r,n,i){i||(F(void 0!==t&&null!==t,"missing value"),F("boolean"==typeof n,"missing or invalid endian"),F(void 0!==r&&null!==r,"missing offset"),F(r+1<e.length,"trying to write beyond buffer length"),O(t,65535));var o=e.length;if(!(r>=o))for(var a=0,s=Math.min(o-r,2);s>a;a++)e[r+a]=(t&255<<8*(n?a:1-a))>>>8*(n?a:1-a)}function C(e,t,r,n,i){i||(F(void 0!==t&&null!==t,"missing value"),F("boolean"==typeof n,"missing or invalid endian"),F(void 0!==r&&null!==r,"missing offset"),F(r+3<e.length,"trying to write beyond buffer length"),O(t,4294967295));var o=e.length;if(!(r>=o))for(var a=0,s=Math.min(o-r,4);s>a;a++)e[r+a]=t>>>8*(n?a:3-a)&255}function E(e,t,r,n,i){i||(F(void 0!==t&&null!==t,"missing value"),F("boolean"==typeof n,"missing or invalid endian"),F(void 0!==r&&null!==r,"missing offset"),F(r+1<e.length,"Trying to write beyond buffer length"),K(t,32767,-32768));var o=e.length;r>=o||(t>=0?I(e,t,r,n,i):I(e,65535+t+1,r,n,i))}function x(e,t,r,n,i){i||(F(void 0!==t&&null!==t,"missing value"),F("boolean"==typeof n,"missing or invalid endian"),F(void 0!==r&&null!==r,"missing offset"),F(r+3<e.length,"Trying to write beyond buffer length"),K(t,2147483647,-2147483648));var o=e.length;r>=o||(t>=0?C(e,t,r,n,i):C(e,4294967295+t+1,r,n,i))}function k(e,t,r,n,i){i||(F(void 0!==t&&null!==t,"missing value"),F("boolean"==typeof n,"missing or invalid endian"),F(void 0!==r&&null!==r,"missing offset"),F(r+3<e.length,"Trying to write beyond buffer length"),j(t,3.4028234663852886e38,-3.4028234663852886e38));var o=e.length;r>=o||H.write(e,t,r,n,23,4)}function q(e,t,r,n,i){i||(F(void 0!==t&&null!==t,"missing value"),F("boolean"==typeof n,"missing or invalid endian"),F(void 0!==r&&null!==r,"missing offset"),F(r+7<e.length,"Trying to write beyond buffer length"),j(t,1.7976931348623157e308,-1.7976931348623157e308));var o=e.length;r>=o||H.write(e,t,r,n,52,8)}function A(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function w(e,t,r){return"number"!=typeof e?r:(e=~~e,e>=t?t:e>=0?e:(e+=t,e>=0?e:0))}function T(e){return e=~~Math.ceil(+e),0>e?0:e}function R(e){return(Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)})(e)}function P(e){return R(e)||n.isBuffer(e)||e&&"object"==typeof e&&"number"==typeof e.length}function M(e){return 16>e?"0"+e.toString(16):e.toString(16)}function B(e){for(var t=[],r=0;r<e.length;r++){var n=e.charCodeAt(r);if(127>=n)t.push(e.charCodeAt(r));else{var i=r;n>=55296&&57343>=n&&r++;for(var o=encodeURIComponent(e.slice(i,r+1)).substr(1).split("%"),a=0;a<o.length;a++)t.push(parseInt(o[a],16))}}return t}function L(e){for(var t=[],r=0;r<e.length;r++)t.push(255&e.charCodeAt(r));return t}function D(e){for(var t,r,n,i=[],o=0;o<e.length;o++)t=e.charCodeAt(o),r=t>>8,n=t%256,i.push(n),i.push(r);return i}function U(e){return V.toByteArray(e)}function _(e,t,r,n){for(var i=0;n>i&&!(i+r>=t.length||i>=e.length);i++)t[i+r]=e[i];return i}function z(e){try{return decodeURIComponent(e)}catch(t){return String.fromCharCode(65533)}}function O(e,t){F("number"==typeof e,"cannot write a non-number as a number"),F(e>=0,"specified a negative value for writing an unsigned value"),F(t>=e,"value is larger than maximum value for type"),F(Math.floor(e)===e,"value has a fractional component")}function K(e,t,r){F("number"==typeof e,"cannot write a non-number as a number"),F(t>=e,"value larger than maximum allowed value"),F(e>=r,"value smaller than minimum allowed value"),F(Math.floor(e)===e,"value has a fractional component")}function j(e,t,r){F("number"==typeof e,"cannot write a non-number as a number"),F(t>=e,"value larger than maximum allowed value"),F(e>=r,"value smaller than minimum allowed value")}function F(e,t){if(!e)throw new Error(t||"Failed assertion")}var V=e("base64-js"),H=e("ieee754");r.Buffer=n,r.SlowBuffer=n,r.INSPECT_MAX_BYTES=50,n.poolSize=8192,n._useTypedArrays=function(){try{var e=new ArrayBuffer(0),t=new Uint8Array(e);return t.foo=function(){return 42},42===t.foo()&&"function"==typeof t.subarray}catch(r){return!1}}(),n.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"raw":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},n.isBuffer=function(e){return!(null===e||void 0===e||!e._isBuffer)},n.byteLength=function(e,t){var r;switch(e+="",t||"utf8"){case"hex":r=e.length/2;break;case"utf8":case"utf-8":r=B(e).length;break;case"ascii":case"binary":case"raw":r=e.length;break;case"base64":r=U(e).length;break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":r=2*e.length;break;default:throw new Error("Unknown encoding")}return r},n.concat=function(e,t){if(F(R(e),"Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),0===e.length)return new n(0);if(1===e.length)return e[0];var r;if("number"!=typeof t)for(t=0,r=0;r<e.length;r++)t+=e[r].length;var i=new n(t),o=0;for(r=0;r<e.length;r++){var a=e[r];a.copy(i,o),o+=a.length}return i},n.prototype.write=function(e,t,r,n){if(isFinite(t))isFinite(r)||(n=r,r=void 0);else{var p=n;n=t,t=r,r=p}t=Number(t)||0;var l=this.length-t;r?(r=Number(r),r>l&&(r=l)):r=l,n=String(n||"utf8").toLowerCase();var m;switch(n){case"hex":m=i(this,e,t,r);break;case"utf8":case"utf-8":m=o(this,e,t,r);break;case"ascii":m=a(this,e,t,r);break;case"binary":m=s(this,e,t,r);break;case"base64":m=u(this,e,t,r);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":m=c(this,e,t,r);break;default:throw new Error("Unknown encoding")}return m},n.prototype.toString=function(e,t,r){var n=this;if(e=String(e||"utf8").toLowerCase(),t=Number(t)||0,r=void 0!==r?Number(r):r=n.length,r===t)return"";var i;switch(e){case"hex":i=h(n,t,r);break;case"utf8":case"utf-8":i=l(n,t,r);break;case"ascii":i=m(n,t,r);break;case"binary":i=d(n,t,r);break;case"base64":i=p(n,t,r);break;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":i=y(n,t,r);break;default:throw new Error("Unknown encoding")}return i},n.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}},n.prototype.copy=function(e,t,r,i){var o=this;if(r||(r=0),i||0===i||(i=this.length),t||(t=0),i!==r&&0!==e.length&&0!==o.length){F(i>=r,"sourceEnd < sourceStart"),F(t>=0&&t<e.length,"targetStart out of bounds"),F(r>=0&&r<o.length,"sourceStart out of bounds"),F(i>=0&&i<=o.length,"sourceEnd out of bounds"),i>this.length&&(i=this.length),e.length-t<i-r&&(i=e.length-t+r);var a=i-r;if(100>a||!n._useTypedArrays)for(var s=0;a>s;s++)e[s+t]=this[s+r];else e._set(this.subarray(r,r+a),t)}},n.prototype.slice=function(e,t){var r=this.length;if(e=w(e,r,0),t=w(t,r,r),n._useTypedArrays)return n._augment(this.subarray(e,t));for(var i=t-e,o=new n(i,void 0,!0),a=0;i>a;a++)o[a]=this[a+e];return o},n.prototype.get=function(e){return console.log(".get() is deprecated. Access using array indexes instead."),this.readUInt8(e)},n.prototype.set=function(e,t){return console.log(".set() is deprecated. Access using array indexes instead."),this.writeUInt8(e,t)},n.prototype.readUInt8=function(e,t){return t||(F(void 0!==e&&null!==e,"missing offset"),F(e<this.length,"Trying to read beyond buffer length")),e>=this.length?void 0:this[e]},n.prototype.readUInt16LE=function(e,t){return f(this,e,!0,t)},n.prototype.readUInt16BE=function(e,t){return f(this,e,!1,t)},n.prototype.readUInt32LE=function(e,t){return g(this,e,!0,t)},n.prototype.readUInt32BE=function(e,t){return g(this,e,!1,t)},n.prototype.readInt8=function(e,t){if(t||(F(void 0!==e&&null!==e,"missing offset"),F(e<this.length,"Trying to read beyond buffer length")),!(e>=this.length)){var r=128&this[e];return r?-1*(255-this[e]+1):this[e]}},n.prototype.readInt16LE=function(e,t){return b(this,e,!0,t)},n.prototype.readInt16BE=function(e,t){return b(this,e,!1,t)},n.prototype.readInt32LE=function(e,t){return v(this,e,!0,t)},n.prototype.readInt32BE=function(e,t){return v(this,e,!1,t)},n.prototype.readFloatLE=function(e,t){return S(this,e,!0,t)},n.prototype.readFloatBE=function(e,t){return S(this,e,!1,t)},n.prototype.readDoubleLE=function(e,t){return N(this,e,!0,t)},n.prototype.readDoubleBE=function(e,t){return N(this,e,!1,t)},n.prototype.writeUInt8=function(e,t,r){r||(F(void 0!==e&&null!==e,"missing value"),F(void 0!==t&&null!==t,"missing offset"),F(t<this.length,"trying to write beyond buffer length"),O(e,255)),t>=this.length||(this[t]=e)},n.prototype.writeUInt16LE=function(e,t,r){I(this,e,t,!0,r)},n.prototype.writeUInt16BE=function(e,t,r){I(this,e,t,!1,r)},n.prototype.writeUInt32LE=function(e,t,r){C(this,e,t,!0,r)},n.prototype.writeUInt32BE=function(e,t,r){C(this,e,t,!1,r)},n.prototype.writeInt8=function(e,t,r){r||(F(void 0!==e&&null!==e,"missing value"),F(void 0!==t&&null!==t,"missing offset"),F(t<this.length,"Trying to write beyond buffer length"),K(e,127,-128)),t>=this.length||(e>=0?this.writeUInt8(e,t,r):this.writeUInt8(255+e+1,t,r))},n.prototype.writeInt16LE=function(e,t,r){E(this,e,t,!0,r)},n.prototype.writeInt16BE=function(e,t,r){E(this,e,t,!1,r)},n.prototype.writeInt32LE=function(e,t,r){x(this,e,t,!0,r)},n.prototype.writeInt32BE=function(e,t,r){x(this,e,t,!1,r)},n.prototype.writeFloatLE=function(e,t,r){k(this,e,t,!0,r)},n.prototype.writeFloatBE=function(e,t,r){k(this,e,t,!1,r)},n.prototype.writeDoubleLE=function(e,t,r){q(this,e,t,!0,r)},n.prototype.writeDoubleBE=function(e,t,r){q(this,e,t,!1,r)},n.prototype.fill=function(e,t,r){if(e||(e=0),t||(t=0),r||(r=this.length),"string"==typeof e&&(e=e.charCodeAt(0)),F("number"==typeof e&&!isNaN(e),"value is not a number"),F(r>=t,"end < start"),r!==t&&0!==this.length){F(t>=0&&t<this.length,"start out of bounds"),F(r>=0&&r<=this.length,"end out of bounds");for(var n=t;r>n;n++)this[n]=e}},n.prototype.inspect=function(){for(var e=[],t=this.length,n=0;t>n;n++)if(e[n]=M(this[n]),n===r.INSPECT_MAX_BYTES){e[n+1]="...";break}return"<Buffer "+e.join(" ")+">"},n.prototype.toArrayBuffer=function(){if("undefined"!=typeof Uint8Array){if(n._useTypedArrays)return new n(this).buffer;for(var e=new Uint8Array(this.length),t=0,r=e.length;r>t;t+=1)e[t]=this[t];return e.buffer}throw new Error("Buffer.toArrayBuffer not supported in this browser")};var W=n.prototype;n._augment=function(e){return e._isBuffer=!0,e._get=e.get,e._set=e.set,e.get=W.get,e.set=W.set,e.write=W.write,e.toString=W.toString,e.toLocaleString=W.toString,e.toJSON=W.toJSON,e.copy=W.copy,e.slice=W.slice,e.readUInt8=W.readUInt8,e.readUInt16LE=W.readUInt16LE,e.readUInt16BE=W.readUInt16BE,e.readUInt32LE=W.readUInt32LE,e.readUInt32BE=W.readUInt32BE,e.readInt8=W.readInt8,e.readInt16LE=W.readInt16LE,e.readInt16BE=W.readInt16BE,e.readInt32LE=W.readInt32LE,e.readInt32BE=W.readInt32BE,e.readFloatLE=W.readFloatLE,e.readFloatBE=W.readFloatBE,e.readDoubleLE=W.readDoubleLE,e.readDoubleBE=W.readDoubleBE,e.writeUInt8=W.writeUInt8,e.writeUInt16LE=W.writeUInt16LE,e.writeUInt16BE=W.writeUInt16BE,e.writeUInt32LE=W.writeUInt32LE,e.writeUInt32BE=W.writeUInt32BE,e.writeInt8=W.writeInt8,e.writeInt16LE=W.writeInt16LE,e.writeInt16BE=W.writeInt16BE,e.writeInt32LE=W.writeInt32LE,e.writeInt32BE=W.writeInt32BE,e.writeFloatLE=W.writeFloatLE,e.writeFloatBE=W.writeFloatBE,e.writeDoubleLE=W.writeDoubleLE,e.writeDoubleBE=W.writeDoubleBE,e.fill=W.fill,e.inspect=W.inspect,e.toArrayBuffer=W.toArrayBuffer,e}},{"base64-js":53,ieee754:54}],53:[function(e,t,r){var n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";!function(e){"use strict";function t(e){var t=e.charCodeAt(0);return t===a||t===l?62:t===s||t===m?63:u>t?-1:u+10>t?t-u+26+26:p+26>t?t-p:c+26>t?t-c+26:void 0}function r(e){function r(e){c[l++]=e}var n,i,a,s,u,c;if(e.length%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var p=e.length;u="="===e.charAt(p-2)?2:"="===e.charAt(p-1)?1:0,c=new o(3*e.length/4-u),a=u>0?e.length-4:e.length;var l=0;for(n=0,i=0;a>n;n+=4,i+=3)s=t(e.charAt(n))<<18|t(e.charAt(n+1))<<12|t(e.charAt(n+2))<<6|t(e.charAt(n+3)),r((16711680&s)>>16),r((65280&s)>>8),r(255&s);return 2===u?(s=t(e.charAt(n))<<2|t(e.charAt(n+1))>>4,r(255&s)):1===u&&(s=t(e.charAt(n))<<10|t(e.charAt(n+1))<<4|t(e.charAt(n+2))>>2,r(s>>8&255),r(255&s)),c}function i(e){function t(e){return n.charAt(e)}function r(e){return t(e>>18&63)+t(e>>12&63)+t(e>>6&63)+t(63&e)}var i,o,a,s=e.length%3,u="";for(i=0,a=e.length-s;a>i;i+=3)o=(e[i]<<16)+(e[i+1]<<8)+e[i+2],u+=r(o);switch(s){case 1:o=e[e.length-1],u+=t(o>>2),u+=t(o<<4&63),u+="==";break;case 2:o=(e[e.length-2]<<8)+e[e.length-1],u+=t(o>>10),u+=t(o>>4&63),u+=t(o<<2&63),u+="="}return u}var o="undefined"!=typeof Uint8Array?Uint8Array:Array,a="+".charCodeAt(0),s="/".charCodeAt(0),u="0".charCodeAt(0),c="a".charCodeAt(0),p="A".charCodeAt(0),l="-".charCodeAt(0),m="_".charCodeAt(0);e.toByteArray=r,e.fromByteArray=i}("undefined"==typeof r?this.base64js={}:r)},{}],54:[function(e,t,r){r.read=function(e,t,r,n,i){var o,a,s=8*i-n-1,u=(1<<s)-1,c=u>>1,p=-7,l=r?i-1:0,m=r?-1:1,d=e[t+l];for(l+=m,o=d&(1<<-p)-1,d>>=-p,p+=s;p>0;o=256*o+e[t+l],l+=m,p-=8);for(a=o&(1<<-p)-1,o>>=-p,p+=n;p>0;a=256*a+e[t+l],l+=m,p-=8);if(0===o)o=1-c;else{if(o===u)return a?0/0:1/0*(d?-1:1);a+=Math.pow(2,n),o-=c}return(d?-1:1)*a*Math.pow(2,o-n)},r.write=function(e,t,r,n,i,o){var a,s,u,c=8*o-i-1,p=(1<<c)-1,l=p>>1,m=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=n?0:o-1,h=n?1:-1,y=0>t||0===t&&0>1/t?1:0;for(t=Math.abs(t),isNaN(t)||1/0===t?(s=isNaN(t)?1:0,a=p):(a=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-a))<1&&(a--,u*=2),t+=a+l>=1?m/u:m*Math.pow(2,1-l),t*u>=2&&(a++,u/=2),a+l>=p?(s=0,a=p):a+l>=1?(s=(t*u-1)*Math.pow(2,i),a+=l):(s=t*Math.pow(2,l-1)*Math.pow(2,i),a=0));i>=8;e[r+d]=255&s,d+=h,s/=256,i-=8);for(a=a<<i|s,c+=i;c>0;e[r+d]=255&a,d+=h,a/=256,c-=8);e[r+d-h]|=128*y}},{}],55:[function(e,t){function r(e,t){if(e.length%a!==0){var r=e.length+(a-e.length%a);e=o.concat([e,s],r)}for(var n=[],i=t?e.readInt32BE:e.readInt32LE,u=0;u<e.length;u+=a)n.push(i.call(e,u));return n}function n(e,t,r){for(var n=new o(t),i=r?n.writeInt32BE:n.writeInt32LE,a=0;a<e.length;a++)i.call(n,e[a],4*a,!0);return n}function i(e,t,i,a){o.isBuffer(e)||(e=new o(e));var s=t(r(e,a),e.length*u);return n(s,i,a)}var o=e("buffer").Buffer,a=4,s=new o(a);s.fill(0);var u=8;t.exports={hash:i}},{buffer:52}],56:[function(e,t,r){function n(e,t,r){s.isBuffer(t)||(t=new s(t)),s.isBuffer(r)||(r=new s(r)),t.length>d?t=e(t):t.length<d&&(t=s.concat([t,h],d));for(var n=new s(d),i=new s(d),o=0;d>o;o++)n[o]=54^t[o],i[o]=92^t[o];var a=e(s.concat([n,r]));return e(s.concat([i,a]))}function i(e,t){e=e||"sha1";var r=m[e],i=[],a=0;return r||o("algorithm:",e,"is not yet supported"),{update:function(e){return s.isBuffer(e)||(e=new s(e)),i.push(e),a+=e.length,this},digest:function(e){var o=s.concat(i),a=t?n(r,t,o):r(o);return i=null,e?a.toString(e):a}}}function o(){var e=[].slice.call(arguments).join(" ");throw new Error([e,"we accept pull requests","http://github.com/dominictarr/crypto-browserify"].join("\n"))}function a(e,t){for(var r in e)t(e[r],r)}var s=e("buffer").Buffer,u=e("./sha"),c=e("./sha256"),p=e("./rng"),l=e("./md5"),m={sha1:u,sha256:c,md5:l},d=64,h=new s(d);h.fill(0),r.createHash=function(e){return i(e)},r.createHmac=function(e,t){return i(e,t)},r.randomBytes=function(e,t){if(!t||!t.call)return new s(p(e));try{t.call(this,void 0,new s(p(e)))}catch(r){t(r)}},a(["createCredentials","createCipher","createCipheriv","createDecipher","createDecipheriv","createSign","createVerify","createDiffieHellman","pbkdf2"],function(e){r[e]=function(){o("sorry,",e,"is not implemented yet")}})},{"./md5":57,"./rng":58,"./sha":59,"./sha256":60,buffer:52}],57:[function(e,t){function r(e,t){e[t>>5]|=128<<t%32,e[(t+64>>>9<<4)+14]=t;for(var r=1732584193,n=-271733879,c=-1732584194,p=271733878,l=0;l<e.length;l+=16){var m=r,d=n,h=c,y=p;r=i(r,n,c,p,e[l+0],7,-680876936),p=i(p,r,n,c,e[l+1],12,-389564586),c=i(c,p,r,n,e[l+2],17,606105819),n=i(n,c,p,r,e[l+3],22,-1044525330),r=i(r,n,c,p,e[l+4],7,-176418897),p=i(p,r,n,c,e[l+5],12,1200080426),c=i(c,p,r,n,e[l+6],17,-1473231341),n=i(n,c,p,r,e[l+7],22,-45705983),r=i(r,n,c,p,e[l+8],7,1770035416),p=i(p,r,n,c,e[l+9],12,-1958414417),c=i(c,p,r,n,e[l+10],17,-42063),n=i(n,c,p,r,e[l+11],22,-1990404162),r=i(r,n,c,p,e[l+12],7,1804603682),p=i(p,r,n,c,e[l+13],12,-40341101),c=i(c,p,r,n,e[l+14],17,-1502002290),n=i(n,c,p,r,e[l+15],22,1236535329),r=o(r,n,c,p,e[l+1],5,-165796510),p=o(p,r,n,c,e[l+6],9,-1069501632),c=o(c,p,r,n,e[l+11],14,643717713),n=o(n,c,p,r,e[l+0],20,-373897302),r=o(r,n,c,p,e[l+5],5,-701558691),p=o(p,r,n,c,e[l+10],9,38016083),c=o(c,p,r,n,e[l+15],14,-660478335),n=o(n,c,p,r,e[l+4],20,-405537848),r=o(r,n,c,p,e[l+9],5,568446438),p=o(p,r,n,c,e[l+14],9,-1019803690),c=o(c,p,r,n,e[l+3],14,-187363961),n=o(n,c,p,r,e[l+8],20,1163531501),r=o(r,n,c,p,e[l+13],5,-1444681467),p=o(p,r,n,c,e[l+2],9,-51403784),c=o(c,p,r,n,e[l+7],14,1735328473),n=o(n,c,p,r,e[l+12],20,-1926607734),r=a(r,n,c,p,e[l+5],4,-378558),p=a(p,r,n,c,e[l+8],11,-2022574463),c=a(c,p,r,n,e[l+11],16,1839030562),n=a(n,c,p,r,e[l+14],23,-35309556),r=a(r,n,c,p,e[l+1],4,-1530992060),p=a(p,r,n,c,e[l+4],11,1272893353),c=a(c,p,r,n,e[l+7],16,-155497632),n=a(n,c,p,r,e[l+10],23,-1094730640),r=a(r,n,c,p,e[l+13],4,681279174),p=a(p,r,n,c,e[l+0],11,-358537222),c=a(c,p,r,n,e[l+3],16,-722521979),n=a(n,c,p,r,e[l+6],23,76029189),r=a(r,n,c,p,e[l+9],4,-640364487),p=a(p,r,n,c,e[l+12],11,-421815835),c=a(c,p,r,n,e[l+15],16,530742520),n=a(n,c,p,r,e[l+2],23,-995338651),r=s(r,n,c,p,e[l+0],6,-198630844),p=s(p,r,n,c,e[l+7],10,1126891415),c=s(c,p,r,n,e[l+14],15,-1416354905),n=s(n,c,p,r,e[l+5],21,-57434055),r=s(r,n,c,p,e[l+12],6,1700485571),p=s(p,r,n,c,e[l+3],10,-1894986606),c=s(c,p,r,n,e[l+10],15,-1051523),n=s(n,c,p,r,e[l+1],21,-2054922799),r=s(r,n,c,p,e[l+8],6,1873313359),p=s(p,r,n,c,e[l+15],10,-30611744),c=s(c,p,r,n,e[l+6],15,-1560198380),n=s(n,c,p,r,e[l+13],21,1309151649),r=s(r,n,c,p,e[l+4],6,-145523070),p=s(p,r,n,c,e[l+11],10,-1120210379),c=s(c,p,r,n,e[l+2],15,718787259),n=s(n,c,p,r,e[l+9],21,-343485551),r=u(r,m),n=u(n,d),c=u(c,h),p=u(p,y)}return Array(r,n,c,p)}function n(e,t,r,n,i,o){return u(c(u(u(t,e),u(n,o)),i),r)}function i(e,t,r,i,o,a,s){return n(t&r|~t&i,e,t,o,a,s)}function o(e,t,r,i,o,a,s){return n(t&i|r&~i,e,t,o,a,s)}function a(e,t,r,i,o,a,s){return n(t^r^i,e,t,o,a,s)}function s(e,t,r,i,o,a,s){return n(r^(t|~i),e,t,o,a,s)}function u(e,t){var r=(65535&e)+(65535&t),n=(e>>16)+(t>>16)+(r>>16);return n<<16|65535&r}function c(e,t){return e<<t|e>>>32-t}var p=e("./helpers");t.exports=function(e){return p.hash(e,r,16)}},{"./helpers":55}],58:[function(e,t){!function(){var e,r,n=this;e=function(e){for(var t,t,r=new Array(e),n=0;e>n;n++)0==(3&n)&&(t=4294967296*Math.random()),r[n]=t>>>((3&n)<<3)&255;return r},n.crypto&&crypto.getRandomValues&&(r=function(e){var t=new Uint8Array(e);return crypto.getRandomValues(t),t}),t.exports=r||e}()},{}],59:[function(e,t){function r(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var r=Array(80),s=1732584193,u=-271733879,c=-1732584194,p=271733878,l=-1009589776,m=0;m<e.length;m+=16){for(var d=s,h=u,y=c,f=p,g=l,b=0;80>b;b++){r[b]=16>b?e[m+b]:a(r[b-3]^r[b-8]^r[b-14]^r[b-16],1);var v=o(o(a(s,5),n(b,u,c,p)),o(o(l,r[b]),i(b)));l=p,p=c,c=a(u,30),u=s,s=v}s=o(s,d),u=o(u,h),c=o(c,y),p=o(p,f),l=o(l,g)}return Array(s,u,c,p,l)}function n(e,t,r,n){return 20>e?t&r|~t&n:40>e?t^r^n:60>e?t&r|t&n|r&n:t^r^n}function i(e){return 20>e?1518500249:40>e?1859775393:60>e?-1894007588:-899497514}function o(e,t){var r=(65535&e)+(65535&t),n=(e>>16)+(t>>16)+(r>>16);return n<<16|65535&r}function a(e,t){return e<<t|e>>>32-t}var s=e("./helpers");t.exports=function(e){return s.hash(e,r,20,!0)}},{"./helpers":55}],60:[function(e,t){var r=e("./helpers"),n=function(e,t){var r=(65535&e)+(65535&t),n=(e>>16)+(t>>16)+(r>>16);return n<<16|65535&r},i=function(e,t){return e>>>t|e<<32-t},o=function(e,t){return e>>>t},a=function(e,t,r){return e&t^~e&r},s=function(e,t,r){return e&t^e&r^t&r},u=function(e){return i(e,2)^i(e,13)^i(e,22)},c=function(e){return i(e,6)^i(e,11)^i(e,25)},p=function(e){return i(e,7)^i(e,18)^o(e,3)},l=function(e){return i(e,17)^i(e,19)^o(e,10)},m=function(e,t){var r,i,o,m,d,h,y,f,g,b,v,S,N=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),I=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),C=new Array(64);e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var g=0;g<e.length;g+=16){r=I[0],i=I[1],o=I[2],m=I[3],d=I[4],h=I[5],y=I[6],f=I[7];for(var b=0;64>b;b++)C[b]=16>b?e[b+g]:n(n(n(l(C[b-2]),C[b-7]),p(C[b-15])),C[b-16]),v=n(n(n(n(f,c(d)),a(d,h,y)),N[b]),C[b]),S=n(u(r),s(r,i,o)),f=y,y=h,h=d,d=n(m,v),m=o,o=i,i=r,r=n(v,S);I[0]=n(r,I[0]),I[1]=n(i,I[1]),I[2]=n(o,I[2]),I[3]=n(m,I[3]),I[4]=n(d,I[4]),I[5]=n(h,I[5]),I[6]=n(y,I[6]),I[7]=n(f,I[7])}return I};t.exports=function(e){return r.hash(e,m,32,!0)}},{"./helpers":55}],61:[function(e,t){function r(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function i(e){return"number"==typeof e}function o(e){return"object"==typeof e&&null!==e}function a(e){return void 0===e}t.exports=r,r.EventEmitter=r,r.prototype._events=void 0,r.prototype._maxListeners=void 0,r.defaultMaxListeners=10,r.prototype.setMaxListeners=function(e){if(!i(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},r.prototype.emit=function(e){var t,r,i,s,u,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||o(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;
throw TypeError('Uncaught, unspecified "error" event.')}if(r=this._events[e],a(r))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:for(i=arguments.length,s=new Array(i-1),u=1;i>u;u++)s[u-1]=arguments[u];r.apply(this,s)}else if(o(r)){for(i=arguments.length,s=new Array(i-1),u=1;i>u;u++)s[u-1]=arguments[u];for(c=r.slice(),i=c.length,u=0;i>u;u++)c[u].apply(this,s)}return!0},r.prototype.addListener=function(e,t){var i;if(!n(t))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(t.listener)?t.listener:t),this._events[e]?o(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,o(this._events[e])&&!this._events[e].warned){var i;i=a(this._maxListeners)?r.defaultMaxListeners:this._maxListeners,i&&i>0&&this._events[e].length>i&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},r.prototype.on=r.prototype.addListener,r.prototype.once=function(e,t){function r(){this.removeListener(e,r),i||(i=!0,t.apply(this,arguments))}if(!n(t))throw TypeError("listener must be a function");var i=!1;return r.listener=t,this.on(e,r),this},r.prototype.removeListener=function(e,t){var r,i,a,s;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(r=this._events[e],a=r.length,i=-1,r===t||n(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(o(r)){for(s=a;s-->0;)if(r[s]===t||r[s].listener&&r[s].listener===t){i=s;break}if(0>i)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(i,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},r.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],n(r))this.removeListener(e,r);else for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},r.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},r.listenerCount=function(e,t){var r;return r=e._events&&e._events[t]?n(e._events[t])?1:e._events[t].length:0}},{}],62:[function(e,t){t.exports="function"==typeof Object.create?function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},{}],63:[function(e,t){function r(){}var n=t.exports={};n.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var r=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),r.length>0)){var n=r.shift();n()}},!0),function(e){r.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),n.title="browser",n.browser=!0,n.env={},n.argv=[],n.on=r,n.addListener=r,n.once=r,n.off=r,n.removeListener=r,n.removeAllListeners=r,n.emit=r,n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")}},{}],64:[function(e,t,r){(function(e){!function(n){function i(e){throw RangeError(M[e])}function o(e,t){for(var r=e.length;r--;)e[r]=t(e[r]);return e}function a(e,t){return o(e.split(P),t).join(".")}function s(e){for(var t,r,n=[],i=0,o=e.length;o>i;)t=e.charCodeAt(i++),t>=55296&&56319>=t&&o>i?(r=e.charCodeAt(i++),56320==(64512&r)?n.push(((1023&t)<<10)+(1023&r)+65536):(n.push(t),i--)):n.push(t);return n}function u(e){return o(e,function(e){var t="";return e>65535&&(e-=65536,t+=D(e>>>10&1023|55296),e=56320|1023&e),t+=D(e)}).join("")}function c(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:I}function p(e,t){return e+22+75*(26>e)-((0!=t)<<5)}function l(e,t,r){var n=0;for(e=r?L(e/k):e>>1,e+=L(e/t);e>B*E>>1;n+=I)e=L(e/B);return L(n+(B+1)*e/(e+x))}function m(e){var t,r,n,o,a,s,p,m,d,h,y=[],f=e.length,g=0,b=A,v=q;for(r=e.lastIndexOf(w),0>r&&(r=0),n=0;r>n;++n)e.charCodeAt(n)>=128&&i("not-basic"),y.push(e.charCodeAt(n));for(o=r>0?r+1:0;f>o;){for(a=g,s=1,p=I;o>=f&&i("invalid-input"),m=c(e.charCodeAt(o++)),(m>=I||m>L((N-g)/s))&&i("overflow"),g+=m*s,d=v>=p?C:p>=v+E?E:p-v,!(d>m);p+=I)h=I-d,s>L(N/h)&&i("overflow"),s*=h;t=y.length+1,v=l(g-a,t,0==a),L(g/t)>N-b&&i("overflow"),b+=L(g/t),g%=t,y.splice(g++,0,b)}return u(y)}function d(e){var t,r,n,o,a,u,c,m,d,h,y,f,g,b,v,S=[];for(e=s(e),f=e.length,t=A,r=0,a=q,u=0;f>u;++u)y=e[u],128>y&&S.push(D(y));for(n=o=S.length,o&&S.push(w);f>n;){for(c=N,u=0;f>u;++u)y=e[u],y>=t&&c>y&&(c=y);for(g=n+1,c-t>L((N-r)/g)&&i("overflow"),r+=(c-t)*g,t=c,u=0;f>u;++u)if(y=e[u],t>y&&++r>N&&i("overflow"),y==t){for(m=r,d=I;h=a>=d?C:d>=a+E?E:d-a,!(h>m);d+=I)v=m-h,b=I-h,S.push(D(p(h+v%b,0))),m=L(v/b);S.push(D(p(m,0))),a=l(r,g,n==o),r=0,++n}++r,++t}return S.join("")}function h(e){return a(e,function(e){return T.test(e)?m(e.slice(4).toLowerCase()):e})}function y(e){return a(e,function(e){return R.test(e)?"xn--"+d(e):e})}var f="object"==typeof r&&r,g="object"==typeof t&&t&&t.exports==f&&t,b="object"==typeof e&&e;(b.global===b||b.window===b)&&(n=b);var v,S,N=2147483647,I=36,C=1,E=26,x=38,k=700,q=72,A=128,w="-",T=/^xn--/,R=/[^ -~]/,P=/\x2E|\u3002|\uFF0E|\uFF61/g,M={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},B=I-C,L=Math.floor,D=String.fromCharCode;if(v={version:"1.2.4",ucs2:{decode:s,encode:u},decode:m,encode:d,toASCII:y,toUnicode:h},"function"==typeof define&&"object"==typeof define.amd&&define.amd)define("punycode",function(){return v});else if(f&&!f.nodeType)if(g)g.exports=v;else for(S in v)v.hasOwnProperty(S)&&(f[S]=v[S]);else n.punycode=v}(this)}).call(this,"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],65:[function(e,t){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,i,o){t=t||"&",i=i||"=";var a={};if("string"!=typeof e||0===e.length)return a;var s=/\+/g;e=e.split(t);var u=1e3;o&&"number"==typeof o.maxKeys&&(u=o.maxKeys);var c=e.length;u>0&&c>u&&(c=u);for(var p=0;c>p;++p){var l,m,d,h,y=e[p].replace(s,"%20"),f=y.indexOf(i);f>=0?(l=y.substr(0,f),m=y.substr(f+1)):(l=y,m=""),d=decodeURIComponent(l),h=decodeURIComponent(m),r(a,d)?n(a[d])?a[d].push(h):a[d]=[a[d],h]:a[d]=h}return a};var n=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],66:[function(e,t){"use strict";function r(e,t){if(e.map)return e.map(t);for(var r=[],n=0;n<e.length;n++)r.push(t(e[n],n));return r}var n=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,a,s){return t=t||"&",a=a||"=",null===e&&(e=void 0),"object"==typeof e?r(o(e),function(r){var o=encodeURIComponent(n(r))+a;return i(e[r])?e[r].map(function(e){return o+encodeURIComponent(n(e))}).join(t):o+encodeURIComponent(n(e[r]))}).join(t):s?encodeURIComponent(n(s))+a+encodeURIComponent(n(e)):""};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},o=Object.keys||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t}},{}],67:[function(e,t,r){"use strict";r.decode=r.parse=e("./decode"),r.encode=r.stringify=e("./encode")},{"./decode":65,"./encode":66}],68:[function(e,t,r){function n(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function i(e,t,r){if(e&&c(e)&&e instanceof n)return e;var i=new n;return i.parse(e,t,r),i}function o(e){return u(e)&&(e=i(e)),e instanceof n?e.format():n.prototype.format.call(e)}function a(e,t){return i(e,!1,!0).resolve(t)}function s(e,t){return e?i(e,!1,!0).resolveObject(t):t}function u(e){return"string"==typeof e}function c(e){return"object"==typeof e&&null!==e}function p(e){return null===e}function l(e){return null==e}var m=e("punycode");r.parse=i,r.resolve=a,r.resolveObject=s,r.format=o,r.Url=n;var d=/^([a-z0-9.+-]+:)/i,h=/:[0-9]*$/,y=["<",">",'"',"`"," ","\r","\n","	"],f=["{","}","|","\\","^","`"].concat(y),g=["'"].concat(f),b=["%","/","?",";","#"].concat(g),v=["/","?","#"],S=255,N=/^[a-z0-9A-Z_-]{0,63}$/,I=/^([a-z0-9A-Z_-]{0,63})(.*)$/,C={javascript:!0,"javascript:":!0},E={javascript:!0,"javascript:":!0},x={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},k=e("querystring");n.prototype.parse=function(e,t,r){if(!u(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var n=e;n=n.trim();var i=d.exec(n);if(i){i=i[0];var o=i.toLowerCase();this.protocol=o,n=n.substr(i.length)}if(r||i||n.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===n.substr(0,2);!a||i&&E[i]||(n=n.substr(2),this.slashes=!0)}if(!E[i]&&(a||i&&!x[i])){for(var s=-1,c=0;c<v.length;c++){var p=n.indexOf(v[c]);-1!==p&&(-1===s||s>p)&&(s=p)}var l,h;h=-1===s?n.lastIndexOf("@"):n.lastIndexOf("@",s),-1!==h&&(l=n.slice(0,h),n=n.slice(h+1),this.auth=decodeURIComponent(l)),s=-1;for(var c=0;c<b.length;c++){var p=n.indexOf(b[c]);-1!==p&&(-1===s||s>p)&&(s=p)}-1===s&&(s=n.length),this.host=n.slice(0,s),n=n.slice(s),this.parseHost(),this.hostname=this.hostname||"";var y="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!y)for(var f=this.hostname.split(/\./),c=0,q=f.length;q>c;c++){var A=f[c];if(A&&!A.match(N)){for(var w="",T=0,R=A.length;R>T;T++)w+=A.charCodeAt(T)>127?"x":A[T];if(!w.match(N)){var P=f.slice(0,c),M=f.slice(c+1),B=A.match(I);B&&(P.push(B[1]),M.unshift(B[2])),M.length&&(n="/"+M.join(".")+n),this.hostname=P.join(".");break}}}if(this.hostname=this.hostname.length>S?"":this.hostname.toLowerCase(),!y){for(var L=this.hostname.split("."),D=[],c=0;c<L.length;++c){var U=L[c];D.push(U.match(/[^A-Za-z0-9_-]/)?"xn--"+m.encode(U):U)}this.hostname=D.join(".")}var _=this.port?":"+this.port:"",z=this.hostname||"";this.host=z+_,this.href+=this.host,y&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==n[0]&&(n="/"+n))}if(!C[o])for(var c=0,q=g.length;q>c;c++){var O=g[c],K=encodeURIComponent(O);K===O&&(K=escape(O)),n=n.split(O).join(K)}var j=n.indexOf("#");-1!==j&&(this.hash=n.substr(j),n=n.slice(0,j));var F=n.indexOf("?");if(-1!==F?(this.search=n.substr(F),this.query=n.substr(F+1),t&&(this.query=k.parse(this.query)),n=n.slice(0,F)):t&&(this.search="",this.query={}),n&&(this.pathname=n),x[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var _=this.pathname||"",U=this.search||"";this.path=_+U}return this.href=this.format(),this},n.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",r=this.pathname||"",n=this.hash||"",i=!1,o="";this.host?i=e+this.host:this.hostname&&(i=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&c(this.query)&&Object.keys(this.query).length&&(o=k.stringify(this.query));var a=this.search||o&&"?"+o||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||x[t])&&i!==!1?(i="//"+(i||""),r&&"/"!==r.charAt(0)&&(r="/"+r)):i||(i=""),n&&"#"!==n.charAt(0)&&(n="#"+n),a&&"?"!==a.charAt(0)&&(a="?"+a),r=r.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),a=a.replace("#","%23"),t+i+r+a+n},n.prototype.resolve=function(e){return this.resolveObject(i(e,!1,!0)).format()},n.prototype.resolveObject=function(e){if(u(e)){var t=new n;t.parse(e,!1,!0),e=t}var r=new n;if(Object.keys(this).forEach(function(e){r[e]=this[e]},this),r.hash=e.hash,""===e.href)return r.href=r.format(),r;if(e.slashes&&!e.protocol)return Object.keys(e).forEach(function(t){"protocol"!==t&&(r[t]=e[t])}),x[r.protocol]&&r.hostname&&!r.pathname&&(r.path=r.pathname="/"),r.href=r.format(),r;if(e.protocol&&e.protocol!==r.protocol){if(!x[e.protocol])return Object.keys(e).forEach(function(t){r[t]=e[t]}),r.href=r.format(),r;if(r.protocol=e.protocol,e.host||E[e.protocol])r.pathname=e.pathname;else{for(var i=(e.pathname||"").split("/");i.length&&!(e.host=i.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==i[0]&&i.unshift(""),i.length<2&&i.unshift(""),r.pathname=i.join("/")}if(r.search=e.search,r.query=e.query,r.host=e.host||"",r.auth=e.auth,r.hostname=e.hostname||e.host,r.port=e.port,r.pathname||r.search){var o=r.pathname||"",a=r.search||"";r.path=o+a}return r.slashes=r.slashes||e.slashes,r.href=r.format(),r}var s=r.pathname&&"/"===r.pathname.charAt(0),c=e.host||e.pathname&&"/"===e.pathname.charAt(0),m=c||s||r.host&&e.pathname,d=m,h=r.pathname&&r.pathname.split("/")||[],i=e.pathname&&e.pathname.split("/")||[],y=r.protocol&&!x[r.protocol];if(y&&(r.hostname="",r.port=null,r.host&&(""===h[0]?h[0]=r.host:h.unshift(r.host)),r.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===i[0]?i[0]=e.host:i.unshift(e.host)),e.host=null),m=m&&(""===i[0]||""===h[0])),c)r.host=e.host||""===e.host?e.host:r.host,r.hostname=e.hostname||""===e.hostname?e.hostname:r.hostname,r.search=e.search,r.query=e.query,h=i;else if(i.length)h||(h=[]),h.pop(),h=h.concat(i),r.search=e.search,r.query=e.query;else if(!l(e.search)){if(y){r.hostname=r.host=h.shift();var f=r.host&&r.host.indexOf("@")>0?r.host.split("@"):!1;f&&(r.auth=f.shift(),r.host=r.hostname=f.shift())}return r.search=e.search,r.query=e.query,p(r.pathname)&&p(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.href=r.format(),r}if(!h.length)return r.pathname=null,r.path=r.search?"/"+r.search:null,r.href=r.format(),r;for(var g=h.slice(-1)[0],b=(r.host||e.host)&&("."===g||".."===g)||""===g,v=0,S=h.length;S>=0;S--)g=h[S],"."==g?h.splice(S,1):".."===g?(h.splice(S,1),v++):v&&(h.splice(S,1),v--);if(!m&&!d)for(;v--;v)h.unshift("..");!m||""===h[0]||h[0]&&"/"===h[0].charAt(0)||h.unshift(""),b&&"/"!==h.join("/").substr(-1)&&h.push("");var N=""===h[0]||h[0]&&"/"===h[0].charAt(0);if(y){r.hostname=r.host=N?"":h.length?h.shift():"";var f=r.host&&r.host.indexOf("@")>0?r.host.split("@"):!1;f&&(r.auth=f.shift(),r.host=r.hostname=f.shift())}return m=m||r.host&&h.length,m&&!N&&h.unshift(""),h.length?r.pathname=h.join("/"):(r.pathname=null,r.path=null),p(r.pathname)&&p(r.search)||(r.path=(r.pathname?r.pathname:"")+(r.search?r.search:"")),r.auth=e.auth||r.auth,r.slashes=r.slashes||e.slashes,r.href=r.format(),r},n.prototype.parseHost=function(){var e=this.host,t=h.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{punycode:64,querystring:67}],69:[function(e,t){t.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},{}],70:[function(e,t,r){(function(t,n){function i(e,t){var n={seen:[],stylize:a};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),y(t)?n.showHidden=t:t&&r._extend(n,t),N(n.showHidden)&&(n.showHidden=!1),N(n.depth)&&(n.depth=2),N(n.colors)&&(n.colors=!1),N(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=o),u(n,e,n.depth)}function o(e,t){var r=i.styles[t];return r?"["+i.colors[r][0]+"m"+e+"["+i.colors[r][1]+"m":e}function a(e){return e}function s(e){var t={};return e.forEach(function(e){t[e]=!0}),t}function u(e,t,n){if(e.customInspect&&t&&k(t.inspect)&&t.inspect!==r.inspect&&(!t.constructor||t.constructor.prototype!==t)){var i=t.inspect(n,e);return v(i)||(i=u(e,i,n)),i}var o=c(e,t);if(o)return o;var a=Object.keys(t),y=s(a);if(e.showHidden&&(a=Object.getOwnPropertyNames(t)),x(t)&&(a.indexOf("message")>=0||a.indexOf("description")>=0))return p(t);if(0===a.length){if(k(t)){var f=t.name?": "+t.name:"";return e.stylize("[Function"+f+"]","special")}if(I(t))return e.stylize(RegExp.prototype.toString.call(t),"regexp");if(E(t))return e.stylize(Date.prototype.toString.call(t),"date");if(x(t))return p(t)}var g="",b=!1,S=["{","}"];if(h(t)&&(b=!0,S=["[","]"]),k(t)){var N=t.name?": "+t.name:"";g=" [Function"+N+"]"}if(I(t)&&(g=" "+RegExp.prototype.toString.call(t)),E(t)&&(g=" "+Date.prototype.toUTCString.call(t)),x(t)&&(g=" "+p(t)),0===a.length&&(!b||0==t.length))return S[0]+g+S[1];if(0>n)return I(t)?e.stylize(RegExp.prototype.toString.call(t),"regexp"):e.stylize("[Object]","special");e.seen.push(t);var C;return C=b?l(e,t,n,y,a):a.map(function(r){return m(e,t,n,y,r,b)}),e.seen.pop(),d(C,g,S)}function c(e,t){if(N(t))return e.stylize("undefined","undefined");if(v(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}return b(t)?e.stylize(""+t,"number"):y(t)?e.stylize(""+t,"boolean"):f(t)?e.stylize("null","null"):void 0}function p(e){return"["+Error.prototype.toString.call(e)+"]"}function l(e,t,r,n,i){for(var o=[],a=0,s=t.length;s>a;++a)o.push(R(t,String(a))?m(e,t,r,n,String(a),!0):"");return i.forEach(function(i){i.match(/^\d+$/)||o.push(m(e,t,r,n,i,!0))}),o}function m(e,t,r,n,i,o){var a,s,c;if(c=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]},c.get?s=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(s=e.stylize("[Setter]","special")),R(n,i)||(a="["+i+"]"),s||(e.seen.indexOf(c.value)<0?(s=f(r)?u(e,c.value,null):u(e,c.value,r-1),s.indexOf("\n")>-1&&(s=o?s.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+s.split("\n").map(function(e){return"   "+e}).join("\n"))):s=e.stylize("[Circular]","special")),N(a)){if(o&&i.match(/^\d+$/))return s;a=JSON.stringify(""+i),a.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),a=e.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),a=e.stylize(a,"string"))}return a+": "+s}function d(e,t,r){var n=0,i=e.reduce(function(e,t){return n++,t.indexOf("\n")>=0&&n++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1]:r[0]+t+" "+e.join(", ")+" "+r[1]}function h(e){return Array.isArray(e)}function y(e){return"boolean"==typeof e}function f(e){return null===e}function g(e){return null==e}function b(e){return"number"==typeof e}function v(e){return"string"==typeof e}function S(e){return"symbol"==typeof e}function N(e){return void 0===e}function I(e){return C(e)&&"[object RegExp]"===A(e)}function C(e){return"object"==typeof e&&null!==e}function E(e){return C(e)&&"[object Date]"===A(e)}function x(e){return C(e)&&("[object Error]"===A(e)||e instanceof Error)}function k(e){return"function"==typeof e}function q(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function A(e){return Object.prototype.toString.call(e)}function w(e){return 10>e?"0"+e.toString(10):e.toString(10)}function T(){var e=new Date,t=[w(e.getHours()),w(e.getMinutes()),w(e.getSeconds())].join(":");return[e.getDate(),L[e.getMonth()],t].join(" ")}function R(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var P=/%[sdj%]/g;r.format=function(e){if(!v(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(i(arguments[r]));return t.join(" ")}for(var r=1,n=arguments,o=n.length,a=String(e).replace(P,function(e){if("%"===e)return"%";if(r>=o)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(t){return"[Circular]"}default:return e}}),s=n[r];o>r;s=n[++r])a+=f(s)||!C(s)?" "+s:" "+i(s);return a},r.deprecate=function(e,i){function o(){if(!a){if(t.throwDeprecation)throw new Error(i);t.traceDeprecation?console.trace(i):console.error(i),a=!0}return e.apply(this,arguments)}if(N(n.process))return function(){return r.deprecate(e,i).apply(this,arguments)};if(t.noDeprecation===!0)return e;var a=!1;return o};var M,B={};r.debuglog=function(e){if(N(M)&&(M=t.env.NODE_DEBUG||""),e=e.toUpperCase(),!B[e])if(new RegExp("\\b"+e+"\\b","i").test(M)){var n=t.pid;B[e]=function(){var t=r.format.apply(r,arguments);console.error("%s %d: %s",e,n,t)}}else B[e]=function(){};return B[e]},r.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},r.isArray=h,r.isBoolean=y,r.isNull=f,r.isNullOrUndefined=g,r.isNumber=b,r.isString=v,r.isSymbol=S,r.isUndefined=N,r.isRegExp=I,r.isObject=C,r.isDate=E,r.isError=x,r.isFunction=k,r.isPrimitive=q,r.isBuffer=e("./support/isBuffer");var L=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];r.log=function(){console.log("%s - %s",T(),r.format.apply(r,arguments))},r.inherits=e("inherits"),r._extend=function(e,t){if(!t||!C(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e}}).call(this,e("FWaASH"),"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./support/isBuffer":69,FWaASH:63,inherits:62}],71:[function(e,t){(function(){var r,n;n=e("./XMLFragment"),r=function(){function e(e,t,r){var i,o,a;if(this.children=[],this.rootObject=null,this.is(e,"Object")&&(a=[e,t],t=a[0],r=a[1],e=null),null!=e&&(e=""+e||"",null==t&&(t={version:"1.0"})),null!=t&&null==t.version)throw new Error("Version number is required");if(null!=t){if(t.version=""+t.version||"",!t.version.match(/1\.[0-9]+/))throw new Error("Invalid version number: "+t.version);if(i={version:t.version},null!=t.encoding){if(t.encoding=""+t.encoding||"",!t.encoding.match(/[A-Za-z](?:[A-Za-z0-9._-]|-)*/))throw new Error("Invalid encoding: "+t.encoding);i.encoding=t.encoding}null!=t.standalone&&(i.standalone=t.standalone?"yes":"no"),o=new n(this,"?xml",i),this.children.push(o)}null!=r&&(i={},null!=e&&(i.name=e),null!=r.ext&&(r.ext=""+r.ext||"",i.ext=r.ext),o=new n(this,"!DOCTYPE",i),this.children.push(o)),null!=e&&this.begin(e)}return e.prototype.begin=function(t,r,i){var o,a;if(null==t)throw new Error("Root element needs a name");return this.rootObject&&(this.children=[],this.rootObject=null),null!=r?(o=new e(t,r,i),o.root()):(t=""+t||"",a=new n(this,t,{}),a.isRoot=!0,a.documentObject=this,this.children.push(a),this.rootObject=a,a)},e.prototype.root=function(){return this.rootObject},e.prototype.end=function(e){return toString(e)},e.prototype.toString=function(e){var t,r,n,i,o;for(r="",o=this.children,n=0,i=o.length;i>n;n++)t=o[n],r+=t.toString(e);return r},e.prototype.is=function(e,t){var r;return r=Object.prototype.toString.call(e).slice(8,-1),null!=e&&r===t},e}(),t.exports=r}).call(this)},{"./XMLFragment":72}],72:[function(e,t){(function(){var e,r={}.hasOwnProperty;e=function(){function e(e,t,r,n){this.isRoot=!1,this.documentObject=null,this.parent=e,this.name=t,this.attributes=r,this.value=n,this.children=[]}return e.prototype.element=function(t,n,i){var o,a,s,u,c;if(null==t)throw new Error("Missing element name");t=""+t||"",this.assertLegalChar(t),null==n&&(n={}),this.is(n,"String")&&this.is(i,"Object")?(u=[i,n],n=u[0],i=u[1]):this.is(n,"String")&&(c=[{},n],n=c[0],i=c[1]);for(a in n)r.call(n,a)&&(s=n[a],s=""+s||"",n[a]=this.escape(s));return o=new e(this,t,n),null!=i&&(i=""+i||"",i=this.escape(i),this.assertLegalChar(i),o.raw(i)),this.children.push(o),o},e.prototype.insertBefore=function(t,n,i){var o,a,s,u,c,p;if(this.isRoot)throw new Error("Cannot insert elements at root level");if(null==t)throw new Error("Missing element name");t=""+t||"",this.assertLegalChar(t),null==n&&(n={}),this.is(n,"String")&&this.is(i,"Object")?(c=[i,n],n=c[0],i=c[1]):this.is(n,"String")&&(p=[{},n],n=p[0],i=p[1]);for(s in n)r.call(n,s)&&(u=n[s],u=""+u||"",n[s]=this.escape(u));return o=new e(this.parent,t,n),null!=i&&(i=""+i||"",i=this.escape(i),this.assertLegalChar(i),o.raw(i)),a=this.parent.children.indexOf(this),this.parent.children.splice(a,0,o),o},e.prototype.insertAfter=function(t,n,i){var o,a,s,u,c,p;if(this.isRoot)throw new Error("Cannot insert elements at root level");if(null==t)throw new Error("Missing element name");t=""+t||"",this.assertLegalChar(t),null==n&&(n={}),this.is(n,"String")&&this.is(i,"Object")?(c=[i,n],n=c[0],i=c[1]):this.is(n,"String")&&(p=[{},n],n=p[0],i=p[1]);for(s in n)r.call(n,s)&&(u=n[s],u=""+u||"",n[s]=this.escape(u));return o=new e(this.parent,t,n),null!=i&&(i=""+i||"",i=this.escape(i),this.assertLegalChar(i),o.raw(i)),a=this.parent.children.indexOf(this),this.parent.children.splice(a+1,0,o),o},e.prototype.remove=function(){var e,t;if(this.isRoot)throw new Error("Cannot remove the root element");return e=this.parent.children.indexOf(this),[].splice.apply(this.parent.children,[e,e-e+1].concat(t=[])),t,this.parent},e.prototype.text=function(t){var r;if(null==t)throw new Error("Missing element text");return t=""+t||"",t=this.escape(t),this.assertLegalChar(t),r=new e(this,"",{},t),this.children.push(r),this},e.prototype.cdata=function(t){var r;if(null==t)throw new Error("Missing CDATA text");if(t=""+t||"",this.assertLegalChar(t),t.match(/]]>/))throw new Error("Invalid CDATA text: "+t);return r=new e(this,"",{},"<![CDATA["+t+"]]>"),this.children.push(r),this},e.prototype.comment=function(t){var r;if(null==t)throw new Error("Missing comment text");if(t=""+t||"",t=this.escape(t),this.assertLegalChar(t),t.match(/--/))throw new Error("Comment text cannot contain double-hypen: "+t);return r=new e(this,"",{},"<!-- "+t+" -->"),this.children.push(r),this},e.prototype.raw=function(t){var r;if(null==t)throw new Error("Missing raw text");return t=""+t||"",r=new e(this,"",{},t),this.children.push(r),this},e.prototype.up=function(){if(this.isRoot)throw new Error("This node has no parent. Use doc() if you need to get the document object.");return this.parent},e.prototype.root=function(){var e;if(this.isRoot)return this;for(e=this.parent;!e.isRoot;)e=e.parent;return e},e.prototype.document=function(){return this.root().documentObject},e.prototype.end=function(e){return this.document().toString(e)},e.prototype.prev=function(){var e;if(this.isRoot)throw new Error("Root node has no siblings");if(e=this.parent.children.indexOf(this),1>e)throw new Error("Already at the first node");return this.parent.children[e-1]},e.prototype.next=function(){var e;if(this.isRoot)throw new Error("Root node has no siblings");if(e=this.parent.children.indexOf(this),-1===e||e===this.parent.children.length-1)throw new Error("Already at the last node");return this.parent.children[e+1]},e.prototype.clone=function(t){var r;return r=new e(this.parent,this.name,this.attributes,this.value),t&&this.children.forEach(function(e){var n;return n=e.clone(t),n.parent=r,r.children.push(n)}),r},e.prototype.importXMLBuilder=function(e){var t;return t=e.root().clone(!0),t.parent=this,this.children.push(t),t.isRoot=!1,this},e.prototype.attribute=function(e,t){var r;if(null==e)throw new Error("Missing attribute name");if(null==t)throw new Error("Missing attribute value");return e=""+e||"",t=""+t||"",null==(r=this.attributes)&&(this.attributes={}),this.attributes[e]=this.escape(t),this},e.prototype.removeAttribute=function(e){if(null==e)throw new Error("Missing attribute name");return e=""+e||"",delete this.attributes[e],this},e.prototype.toString=function(e,t){var r,n,i,o,a,s,u,c,p,l,m,d;s=null!=e&&e.pretty||!1,o=null!=e&&e.indent||"  ",a=null!=e&&e.newline||"\n",t||(t=0),c=new Array(t+1).join(o),u="",s&&(u+=c),u+=null==this.value?"<"+this.name:""+this.value,m=this.attributes;for(r in m)n=m[r],u+="!DOCTYPE"===this.name?" "+n:" "+r+'="'+n+'"';if(0===this.children.length)null==this.value&&(u+="?xml"===this.name?"?>":"!DOCTYPE"===this.name?">":"/>"),s&&(u+=a);else if(s&&1===this.children.length&&this.children[0].value)u+=">",u+=this.children[0].value,u+="</"+this.name+">",u+=a;else{for(u+=">",s&&(u+=a),d=this.children,p=0,l=d.length;l>p;p++)i=d[p],u+=i.toString(e,t+1);s&&(u+=c),u+="</"+this.name+">",s&&(u+=a)}return u},e.prototype.escape=function(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")},e.prototype.assertLegalChar=function(e){var t,r;if(t=/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF\uFFFE-\uFFFF]/,r=e.match(t))throw new Error("Invalid character ("+r+") in string: "+e)},e.prototype.is=function(e,t){var r;return r=Object.prototype.toString.call(e).slice(8,-1),null!=e&&r===t},e.prototype.ele=function(e,t,r){return this.element(e,t,r)},e.prototype.txt=function(e){return this.text(e)},e.prototype.dat=function(e){return this.cdata(e)},e.prototype.att=function(e,t){return this.attribute(e,t)},e.prototype.com=function(e){return this.comment(e)},e.prototype.doc=function(){return this.document()},e.prototype.e=function(e,t,r){return this.element(e,t,r)},e.prototype.t=function(e){return this.text(e)},e.prototype.d=function(e){return this.cdata(e)},e.prototype.a=function(e,t){return this.attribute(e,t)},e.prototype.c=function(e){return this.comment(e)},e.prototype.r=function(e){return this.raw(e)},e.prototype.u=function(){return this.up()},e}(),t.exports=e}).call(this)},{}],73:[function(e,t){(function(){var r;r=e("./XMLBuilder"),t.exports.create=function(e,t,n){return null!=e?new r(e,t,n).root():new r}}).call(this)},{"./XMLBuilder":71}]},{},[1]);

  TWC.Events.getEvent('awsReady').resolve();
}
});
;
/**
 * PCO Reboot: The PCO is completely revamped to incorporate code re-usability, maintainability, etc. Previously,
 * we followed the Modular programming where we called methods and set attributes in no specific order. The order
 * of execution is determined by process flow and events. From Reboot, PCO will be a organized structure. This core pco
 * is responsible for creating the Node class objects and attach them to the PCO. So, PCO is no longer just a map with
 * load of functionality. Instead, it is a collection of classes. The classes determine its attribute and behavior in
 * its own object (or namespace) like whether the node is persisted, what the node name is and so on.
 * There are multiple nodes available right now like TWC.User, TWC.Device, TWC.Page, etc and objects of these classes
 * are attached to the PCO. They all follow inheritance and common code resides at one place - TWC.Node, which is the
 * parent of all classes. Read the documentation on TWC.Node to understand node organization in detail.
 *
 * Author: Kulanthaivelu Sankaran (Velu)
 */

/**
 * initPCO initializes the PCO object on the page. However, it is not a synchronous operation as it depends on JSONP
 * calls to complete. PCOReady event will be fired on ready.
 *
 * @param $
 * @param pcoObject
 * @param mode
 * @param siteId
 * @param currlocObj
 * @returns {Object}
 */
TWC.initpco = function($, pcoObject, mode, siteId, currlocObj){

  /**
   * Assign server side pcoObject if it exists
   */
  var PCO = pcoObject || {}, privatepco ={};

  // PRIVATE METHODS.

  /**
   * Sets a node object against a key. This should be Node class object or any of its sub-classes.
   * Like get, this will not do deep linking.
   *
   * @param pNode
   * @param node
   * @param value
   */
  var set = function( pNode, node, value) {
    pNode[node] = value;
  };

  /**
   * Initial nodes attachment to PCO object. Each node has a nodeName and that serves as key.
   *
   * @param pNode
   * @param nodes
   */
  var setNodes = function( pNode, nodes ) {
    $.each(nodes, function(idx, node) {
      set(pNode, node.getNodeName(), node);
    })
  };

  // PRIVATE methods and data END here. What follows now are exposed to the outside world.

  /***
   **
   ** Privileged methods
   **/

  var prvlgd = {};

  /**
   * Set a node from PCO. This will not do deep links. Persist attributes promise
   *
   * @param node
   * @returns type: Promise
   */
  prvlgd.set = function( node, value ) {
    return privatepco[node].set(value);
  };

  /**
   * Get a node from PCO. This will not do deep links. For example, user.savedLocations cannot
   * be passed here. This is a simple straightforward fetch.
   *
   * @param node
   * @returns {Object} - Node
   */
  prvlgd.get = function( node ) {
    return privatepco[node];
  };

  /**
   * Set a attribute inside a node. For example, get("user").set("savedLocations", [....]) can be combined
   * here as setNodeValue("user", "savedLocations", [...]).
   *
   * @param nodeName
   * @param key
   * @param value
   */
  prvlgd.setNodeValue = function(nodeName, key, value) {
    return prvlgd.get(nodeName).set(key, value);
  };

  /**
   * Get a attribute value inside node. For example, get("user").get("savedLocations") can be combined
   * here as getNodeValue("user", "savedLocations").
   *
   * @param nodeName
   * @param key
   * @returns {*|Array|get|get|String|Object}
   */
  prvlgd.getNodeValue = function(nodeName, key) {
    return prvlgd.get(nodeName).get(key);
  };

  // Create object for each node and attach to the pco. The first param is the attributes that you need to pass on.
  // The first param is used by the base class and is important that you always pass the attributes in the first slot.
  // What follows after the first param is purely the subclasses requirement.
  window.glue = new TWC.Glue({});
  window.twcperf = new TWC.Performance( {} );
  var device  = new TWC.Device( {} );
  var profile = new TWC.Profile( {} );
  var products = new TWC.Products({});
  var user    = new TWC.User( {}, glue, profile );
  var page    = new TWC.Page( PCO.page ? PCO.page : {}, user);
  var ad      = new TWC.Ad( {}, page, user, device );
  //  var wx      = new TWC.WeatherInfo( {}, ad, user, page );
  // This is a temporary fix to allow prefetch of turbo calls only on turbo pages. Once this is done, we need to remove the next line and uncomment the prev one
  var wx      = new TWC.getWxJs( {}, ad, user, page);
  var metrics = new TWC.Metrics({},page);
  // create window alias for twclog coz its easy to use.
  window.twclog  = new TWC.Log( {} );

  // Set nodes once
  setNodes( privatepco, [ page, user, device, wx, ad, metrics, products, profile, twclog, twcperf, glue] );

  /**
   * Hooks are array of functions that need to be executed for setting nodes in the PCO. It is easier to maintain
   * this way.
   */
  // Using for loop because jquery/underscore foreach performs worse than a simple for loop.
  // Alternate way: window.user_hooks.forEach(Function.prototype.call, Function.prototype.call); but we need
  // some manipulations on the output of each method, so please follow through.

  var node_setup_promises = [ TWC.Events.getDummyDeferredEvent() ].concat( page.promises, user.promises, device.promises, wx.promises, ad.promises, metrics.promises );

  // During emergency, we does want them to provide with hook methods. This is a beta feature.
  // TODO: Steve/Joe needs to approve this.
  var node_hooks          = [].concat( TWC.node_hooks || [] );
  for( var count = 0; count < node_hooks.length; count++ ) {
    node_hooks[count]( prvlgd, jQuery, node_setup_promises );
  }

  // The idea is to wait for promises that was added in the node setups and in hooks as well. Every
  // node would have to add any asynchronous operation in its own promises array.
  $.when.apply($, page.promises).done( function() {
    TWC.PcoUtils.setTiming('pageResolved', (new Date()).getTime());
  });
  $.when.apply($, user.promises).done( function() {
    TWC.PcoUtils.setTiming('userResolved', (new Date()).getTime());
  });
  $.when.apply($, device.promises).done( function() {
    TWC.PcoUtils.setTiming('deviceResolved', (new Date()).getTime());
  });
  $.when.apply($, wx.promises).done( function() {
    TWC.PcoUtils.setTiming('wxResolved', (new Date()).getTime());
  });
  $.when.apply($, ad.promises).done( function() {
    TWC.PcoUtils.setTiming('adResolved', (new Date()).getTime());
  });
  $.when.apply($, metrics.promises).done( function() {
    TWC.PcoUtils.setTiming('metricsResolved', (new Date()).getTime());
  });
  $.when.apply($, node_setup_promises).done( function() {
    TWC.PcoUtils.setTiming('pcoReady', (new Date()).getTime());
    TWC.Events.getEvent("pcoReady").resolve();
  });

  // The idea is to lock down the PCO and NOT allow addition of nodes to PCO beyond this point.
  if('preventExtensions' in Object) {
    Object.preventExtensions( prvlgd );
  }

  /***
   **
   ** Return a reference to the privileged object
   **/
  return prvlgd;


};

;
/**
 * Author: cschneider
 * Date: 8/26/15
 * Comments: Utilities for setting Weather backgrounds
 */

(function($){
  window.TWC = window.TWC || {};
  TWC.Events = TWC.Events  || {};
  TWC.ad_background = TWC.ad_background || {};
  TWC.ad_background.isPresent = false;
  TWC.Configs = TWC.Configs || {};

  TWC.weather_background = (function(){
    var _private = {
      defaultOptions : {
        bgTarget: '#wx-hero-wrap', //Element that gets the BG image applied
        imageCacheTime: 600000, //How long to use stored PCO image URL for
        defaultImage: undefined, //This is the image that displays if we can't get one from DSX
        imageOverride: undefined //This image trumps whatever comes from DSX and is determined by module settings and is either scheduled or persistent
      },
      locId: TWC.PcoUtils.getURLlocid(),
      currentImage: undefined, //Used to cache current image object since the PCO takes its sweet time (500ms) saving nodes after the promise returns
      getCurrentImage: getCurrentImage, //get currently active image from the PCO
      getImageServiceUrl : getImageServiceUrl, // Get Url for DSX call
      setBodyClass: setBodyClass,
      injectCSS: injectCSS,
      //setBgHeight: setBgHeight,
      getImageUrl: getImageUrl
    };

    var service = {
      getImageData: getImageData,
      setBackground: setBackground,
      init: init
    };

    return service;

    /**
     * Do all the things
     * @public
     */
    function init() {

      if (hasCachedImage()){
        setBackground();
      }
      else {
        getImageData().then(
          function success(data) {
            saveCurrentImage(data);

            // if dsx is slower than ad call the weather background could
            // overwrite the branded background, so check ad_background flag
            if (!TWC.ad_background.isPresent) {
              setBackground();
            }
          },
          function fail() {
            //TODO: Use fallback image
          }
        );
      }
    }

    /**
     * Set the background
     * @public
     *
     * @param options
     * @param options.imageOverride {imageUrl} Set a specific background image
     * @param options.textColor {light || dark} Set body class to display specific text color
     */
    function setBackground(options) {
      var params = options || {};
      var imageOverride = params.imageOverride || null;
      var textColor = params.textColor || null;

      if (imageOverride) {
        _private.injectCSS({imageUrl: imageOverride});
        _private.setBodyClass(textColor);
      } else {
        _private.setBodyClass();
        _private.injectCSS();
      }
    }

    /**
     * Set the media queries in the head for weather background image
     *
     * @param options    config object
     * @param options.target    This is the target element selector to apply BG to
     * @param options.imageUrl  URL to override with custom background image
     */

    function injectCSS(options) {
      var params = options || {};

      var el = params.target || _private.defaultOptions.bgTarget;
      var baseImageUrl = params.imageUrl || _private.getCurrentImage().image;

      var url640 = "'" + _private.getImageUrl(baseImageUrl, 598, 640) + "'";
      var url815 = "'" + _private.getImageUrl(baseImageUrl, 458, 815) + "'";
      var url1600 = "'" + _private.getImageUrl(baseImageUrl, 700, 1600) + "'";

      //TODO: replace existing style block for branded bg override
      var styleBlock = '<style>' +
      el + ' {background-image:url('+ url640 +');}' +
      '@media(min-width:768px){' + el + ' {background-image:url('+ url815 +');}}' +
      '@media(min-width:1024px){'+ el +' {background-image:url('+ url1600 +');}} ' +

      '</style>';
      $('head').append(styleBlock);
    }

    /**
     * Sets a dark class on the body if 'dark' is in image URL
     * @private
     * @param textColor light || dark Sets background class for specific text color
     */
    function setBodyClass(textColor) {
      if (textColor) {
        bodyClass = textColor === 'dark' ? 'light' : 'dark';
      } else {
        bodyClass = _private.getCurrentImage().image.match(/dark/) ? 'dark' : 'light';
      }
      if (bodyClass === 'dark') {
        $(document).ready(function(){
          $('body').addClass('dark');
        });
      } else {
        $(document).ready(function(){
          $('body').removeClass('dark');
        });
      }
    }

    /**
     * Updates the current image object in the PCO
     * @private
     *
     * @param imageData
     */
    function saveCurrentImage(imageData){
      var isValidResponse = imageData && imageData.status && imageData.status === 200;
      var isImageArray = imageData.body && imageData.body.length;

      if (isValidResponse && isImageArray) {
        // Get a random image index from the array
        var randomIndex = Math.floor(Math.random() * imageData.body.length);

        _private.currentImage = {
          locId: _private.locId,
          image: imageData.body[randomIndex],
          expirationTime: new Date().getTime() + _private.defaultOptions.imageCacheTime
        };
        TWC.pco.setNodeValue("user", "weather_bg", _private.currentImage);
      }
      //else {
      //  //TODO: Article Image Stuff here
      //}
    }

    /**
     * Gets the current image object from the PCO
     * @private
     *
     * @returns {Object}
     */
    function getCurrentImage() {
      // Cache the PCO value if it hasn't been done already
      if (!_private.currentImage) {
        _private.currentImage = TWC.pco.getNodeValue("user", "weather_bg");
      }
      return _private.currentImage;
    }

    /**
     * Check if there is an image in the PCO that matches the current locId
     * and hasn't expired
     * @private
     *
     * @returns {boolean} true if you should use current PCO image
     */
    function hasCachedImage() {
      if(_private.getCurrentImage() && _private.getCurrentImage().locId === _private.locId) {
        if(new Date().getTime() < _private.getCurrentImage().expirationTime) {
          return true;
        }
      }
      return false;
    }

    /**
     * Get the URL to make DSX call
     * @private
     *
     * @returns {string}
     */
    function getImageServiceUrl() {
      return TWC.Configs.dsx.host + "util/v2/images/mw/" + _private.locId + "?jsonp=?";
    }

    /**
     * Make the call to DSX to get the image URL data for the page locId
     * @public
     *
     * @returns {Deferred}
     */
    function getImageData(){
      var promise = $.Deferred();
      $.ajax({
        url: _private.getImageServiceUrl(),
        dataType: "jsonp",
        async: true,
        cache: true,
        data:{
          api : TWC.Configs.dsx.apiKey
        },
        type:"GET",
        success: function(data){
          promise.resolve(data);
        },
        fail: function(){
          promise.reject();
        }
      });
      return promise;
    }

    /**
     *
     * Sets the background image url based on which cutting service is currently enabled.
     * Duplicated from the function in twcUtil which I can't inject because this isn't an angular
     * module.  :(
     * @private
     */
    function getImageUrl(dsxUrl, height, width) {
      var locale = TWC.pco.getNodeValue('page', 'locale');
      //console.log('BG locale:', locale);
      if(locale === 'de-DE') {
        var matches = dsxUrl.match(/.*:\/\/(.*)image\/(.{1,2}\/)(.*\.\b(jpg|jpeg|gif|png)\b)/);
        var endPoint = matches[2];
        var imageName = matches[3];
        //console.log(matches);
        var url = [];
        if (TWC.Configs.image_poc.instart) {
          url.push('//cm.imwx.com/');   /// instart doesn't have our certs for SSL so back to http for now
          url.push(endPoint);
          url.push(imageName);
          url.push('?i10c=img.resize(width:');
          url.push(width);
          url.push(',height:');
          url.push(height);
          url.push(')');
          return url.join('');
        }

        if (TWC.Configs.image_poc.akamai) {
          url.push('//ion.imwx.com/');
          url.push(endPoint);
          url.push(imageName);
          url.push('?resize=');
          url.push(width);
          url.push('px:');
          url.push(height);
          url.push('px&output-format=');
          var format = imageName.substr(imageName.lastIndexOf('.') + 1) || 'jpg';
          url.push(format);
          return url.join('');
        }

      }
      // if neither is enabled, return the original dsx url
      return dsxUrl;


    }


  })();

  // wrapping pco ready with dom ready to make sure the hero wrap and the current conditions modules are on the page when we try to set the background
  $(document).ready(function(){
    TWC.Events.pcoReady.then(function () {
      // if ad has already been called
      // do not initialize weather bg
      if (!TWC.ad_background.isPresent) {
        TWC.weather_background.init();
      }
    });
  });

})(jQuery);;
/**
 * Created with PhpStorm
 * User: cschneider
 * Date: 12/3/15
 * Comments: Provides a method for the ad creative to call in order to
 * set a branding background to replace the weather background
 *
 */

(function($){
  window.TWC = window.TWC  || {};
  TWC.Events = TWC.Events || {};
  TWC.Events.adBgAvailable = TWC.Events.getEvent('adBgAvailable');
  TWC.ad_background = TWC.ad_background || {};

  TWC.ad_background.setBrandingBg = function(bbgObj){
    var _private = {
      defaults: {
        bbgURL: decodeURIComponent(bbgObj.dir + bbgObj.bg.img),
        ctaTarget: '.hero_right'
      },
      init: init,
      checkParams: checkParams,
      collapseAds: collapseAds,
      setContainerClass: setContainerClass,
      appendCTA: appendCTA
    };
    _private.init();

    /**
     * Do all the things
     */
    function init() {
      // Flag to prevent weather background from loading over the ad
      TWC.ad_background.isPresent = true;
      if (_private.checkParams()) {
        _private.collapseAds();
        TWC.weather_background.setBackground({
          imageOverride:_private.defaults.bbgURL,
          textColor:bbgObj.bg.textcolor
        });
        _private.setContainerClass();
        _private.appendCTA();
        TWC.Events.adBgAvailable.notify();
      }
    }

    /**
     * Add the CTA link element
     */
    function appendCTA(){
      var $ctaTarget = $(_private.defaults.ctaTarget);
      var ctaImg = bbgObj.cta && bbgObj.cta.img && (bbgObj.dir + bbgObj.cta.img) || "";
      var ctaXPos = bbgObj.cta && bbgObj.cta.x;
      var ctaYPos = bbgObj.cta && bbgObj.cta.y;
      var ctaUrl = bbgObj.clicks && bbgObj.clicks.cta && decodeURIComponent(bbgObj.clicks.cta) || "";

      var positionStyles='';

      if (ctaXPos || ctaYPos) {
        positionStyles = 'style="';
        if (ctaXPos) {
          positionStyles += 'right:'+ctaXPos+';';
        }
        if (ctaYPos) {
          positionStyles += 'bottom:'+ctaYPos+';';
        }
        positionStyles += '"';
      }
      var ctaHTML =
        '<a class="cta" href="' + ctaUrl + '" '+positionStyles+' target="_blank">' +
          '<img src="' + ctaImg + '"/>' +
        '</a>';

      $ctaTarget.append(ctaHTML);
    }

    /**
     * Add a container class for targeting styles
     */
    function setContainerClass() {
      $('#wx-hero-wrap').addClass('branded-bg');
    }

    /**
     * Hide the ad that is serving the bbgObject
     */
    function collapseAds() {
      var $top300 = $('#WX_Top300Variable');
      var $mw4Top = $('#MW4_Top');

      if ($top300.length > 0) {
        $top300.find('.admodule').css('min-height', 0).css('margin-bottom', 0);
      } else if ($mw4Top) {
        $mw4Top.find('.admodule').css('min-height', 0);
      }

    }

    /**
     * Make sure the bbgObject has all the important things
     * @returns {boolean}
     */
    function checkParams() {
      if (!(bbgObj && (typeof bbgObj.dir === "string") && bbgObj.bg && bbgObj.bg.img && bbgObj.bg.textcolor && bbgObj.bg["background-size"])){
        console.log("Missing params in branding background object.");
        return false;
      } else {
        return true;
      }
    }

  };

})(jQuery);


;
/*! lazysizes - v1.5.0 */
!function(e,t,r){"use strict";var i,n,a=e.lazySizes&&lazySizes.cfg||e.lazySizesConfig,s=t.createElement("img"),l="sizes"in s&&"srcset"in s,o=/\s+\d+h/g,u=Array.prototype.forEach,c=function(e){var t=e.getAttribute(lazySizesConfig.srcsetAttr);t&&e.setAttribute(lazySizesConfig.srcsetAttr,t.replace(o,""))};if(a||(a={},e.lazySizesConfig=a),a.supportsType||(a.supportsType=function(e){return!e}),!(e.picturefill||e.respimage||a.pf)){if(e.HTMLPictureElement&&l)return t.msElementsFromPoint&&(n=navigator.userAgent.match(/Edge\/(\d+)/))&&n[1]<15&&t.addEventListener("lazybeforeunveil",function(e){var t=e.target.parentNode;t&&u.call(t.getElementsByTagName("source"),c),c(e.target)}),void(a.pf=function(){});a.pf=function(t){var r,n;if(!e.picturefill&&!e.respimage)for(r=0,n=t.elements.length;n>r;r++)i(t.elements[r])},i=function(){var r=function(e,t){return e.w-t.w},n=/^\s*\d+px\s*$/,s=function(e){var t,r,i=e.length,n=e[i-1],a=0;for(a;i>a;a++)if(n=e[a],n.d=n.w/e.w,n.d>=e.d){!n.cached&&(t=e[a-1])&&t.d>e.d-.13*Math.pow(e.d,2.2)&&(r=Math.pow(t.d-.6,1.6),t.cached&&(t.d+=.15*r),t.d+(n.d-e.d)*r>e.d&&(n=t));break}return n},u=function(){var e,t=/(([^,\s].[^\s]+)\s+(\d+)w)/g,r=/\s/,i=function(t,r,i,n){e.push({c:r,u:i,w:1*n})};return function(n){return e=[],n=n.trim(),n.replace(o,"").replace(t,i),e.length||!n||r.test(n)||e.push({c:n,u:n,w:99}),e}}(),c=function(){c.init||(c.init=!0,addEventListener("resize",function(){var e,r=t.getElementsByClassName("lazymatchmedia"),n=function(){var e,t;for(e=0,t=r.length;t>e;e++)i(r[e])};return function(){clearTimeout(e),e=setTimeout(n,66)}}()))},f=function(t,r){var i,n=t.getAttribute("srcset")||t.getAttribute(a.srcsetAttr);!n&&r&&(n=t._lazypolyfill?t._lazypolyfill._set:t.getAttribute("src")||t.getAttribute(a.srcAttr)),t._lazypolyfill&&t._lazypolyfill._set==n||(i=u(n||""),r&&t.parentNode&&(i.isPicture="PICTURE"==t.parentNode.nodeName.toUpperCase(),i.isPicture&&(e.matchMedia||e.Modernizr&&Modernizr.mq)&&(lazySizes.aC(t,"lazymatchmedia"),c())),i._set=n,Object.defineProperty(t,"_lazypolyfill",{value:i,writable:!0}))},d=function(t){var r=e.devicePixelRatio||1,i=lazySizes.getX&&lazySizes.getX(t);return Math.min(i||r,2.5,r)},p=function(t){return e.matchMedia?(p=function(e){return!e||(matchMedia(e)||{}).matches})(t):e.Modernizr&&Modernizr.mq?!t||Modernizr.mq(t):!t},y=function(e){var t,i,l,o,u,c,y;if(o=e,f(o,!0),u=o._lazypolyfill,u.isPicture)for(i=0,t=e.parentNode.getElementsByTagName("source"),l=t.length;l>i;i++)if(a.supportsType(t[i].getAttribute("type"),e)&&p(t[i].getAttribute("media"))){o=t[i],f(o),u=o._lazypolyfill;break}return u.length>1?(y=o.getAttribute("sizes")||"",y=n.test(y)&&parseInt(y,10)||lazySizes.gW(e,e.parentNode),u.d=d(e),(!u.w||u.w<y)&&(u.w=y,c=s(u.sort(r)))):c=u[0],c},g=function(e){if(!l||!e.parentNode||"PICTURE"==e.parentNode.nodeName.toUpperCase()){var t=y(e);t&&t.u&&e._lazypolyfill.cur!=t.u&&(e._lazypolyfill.cur=t.u,t.cached=!0,e.setAttribute(a.srcAttr,t.u),e.setAttribute("src",t.u))}};return g.parse=u,g}(),a.loadedClass&&a.loadingClass&&!function(){var e=[];['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(t){e.push(t+a.loadedClass),e.push(t+a.loadingClass)}),a.pf({elements:t.querySelectorAll(e.join(", "))})}()}}(window,document);;
/*! lazysizes - v1.5.0-rc3 */
!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports?module.exports=c:"function"==typeof define&&define.amd&&define(c)}(window,function(a,b){"use strict";if(b.getElementsByClassName){var c,d=b.documentElement,e=a.HTMLPictureElement&&"sizes"in b.createElement("img"),f="addEventListener",g="getAttribute",h=a[f],i=a.setTimeout,j=a.requestAnimationFrame||i,k=/^picture$/i,l=["load","error","lazyincluded","_lazyloaded"],m={},n=Array.prototype.forEach,o=function(a,b){return m[b]||(m[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),m[b].test(a[g]("class")||"")&&m[b]},p=function(a,b){o(a,b)||a.setAttribute("class",(a[g]("class")||"").trim()+" "+b)},q=function(a,b){var c;(c=o(a,b))&&a.setAttribute("class",(a[g]("class")||"").replace(c," "))},r=function(a,b,c){var d=c?f:"removeEventListener";c&&r(a,b),l.forEach(function(c){a[d](c,b)})},s=function(a,c,d,e,f){var g=b.createEvent("CustomEvent");return g.initCustomEvent(c,!e,!f,d||{}),a.dispatchEvent(g),g},t=function(b,d){var f;!e&&(f=a.picturefill||c.pf)?f({reevaluate:!0,elements:[b]}):d&&d.src&&(b.src=d.src)},u=function(a,b){return(getComputedStyle(a,null)||{})[b]},v=function(a,b,d){for(d=d||a.offsetWidth;d<c.minSize&&b&&!a._lazysizesWidth;)d=b.offsetWidth,b=b.parentNode;return d},w=function(b){var c,d=0,e=a.Date,f=function(){c=!1,d=e.now(),b()},g=function(){i(f)},h=function(){j(g)};return function(){if(!c){var a=125-(e.now()-d);c=!0,6>a&&(a=6),i(h,a)}}},x=function(){var e,l,m,v,x,z,A,B,C,D,E,F,G,H,I,J=/^img$/i,K=/^iframe$/i,L="onscroll"in a&&!/glebot/.test(navigator.userAgent),M=0,N=0,O=0,P=0,Q=0,R=function(a){O--,a&&a.target&&r(a.target,R),(!a||0>O||!a.target)&&(O=0)},S=function(a,c){var e,f=a,g="hidden"==u(b.body,"visibility")||"hidden"!=u(a,"visibility");for(C-=c,F+=c,D-=c,E+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=d;)g=(u(f,"opacity")||1)>0,g&&"visible"!=u(f,"overflow")&&(e=f.getBoundingClientRect(),g=E>e.left&&D<e.right&&F>e.top-1&&C<e.bottom+1);return g},T=function(){var a,b,f,h,i,j,k,n,o;if((x=c.loadMode)&&8>O&&(a=e.length)){b=0,P++,null==H&&("expand"in c||(c.expand=d.clientHeight>600?d.clientWidth>860?500:410:359),G=c.expand,H=G*c.expFactor),H>N&&1>O&&P>3&&x>2?(N=H,P=0):N=x>1&&P>2&&6>O?G:M;for(;a>b;b++)if(e[b]&&!e[b]._lazyRace)if(L)if((n=e[b][g]("data-expand"))&&(j=1*n)||(j=N),o!==j&&(A=innerWidth+j*I,B=innerHeight+j,k=-1*j,o=j),f=e[b].getBoundingClientRect(),(F=f.bottom)>=k&&(C=f.top)<=B&&(E=f.right)>=k*I&&(D=f.left)<=A&&(F||E||D||C)&&(m&&3>O&&!n&&(3>x||4>P)||S(e[b],j))){if($(e[b]),i=!0,O>9)break}else!i&&m&&!h&&4>O&&4>P&&x>2&&(l[0]||c.preloadAfterLoad)&&(l[0]||!n&&(F||E||D||C||"auto"!=e[b][g](c.sizesAttr)))&&(h=l[0]||e[b]);else $(e[b]);h&&!i&&$(h)}},U=w(T),V=function(a){p(a.target,c.loadedClass),q(a.target,c.loadingClass),r(a.target,W)},W=function(a){a={target:a.target},j(function(){V(a)})},X=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},Y=function(a){var b,d,e=a[g](c.srcsetAttr);(b=c.customMedia[a[g]("data-media")||a[g]("media")])&&a.setAttribute("media",b),e&&a.setAttribute("srcset",e),b&&(d=a.parentNode,d.insertBefore(a.cloneNode(),a),d.removeChild(a))},Z=function(){var a,b=[],c=function(){for(;b.length;)b.shift()();a=!1},d=function(d){b.push(d),a||(a=!0,j(c))};return{add:d,run:c}}(),$=function(a){var b,d,e,f,h,l,u,w=J.test(a.nodeName),x=w&&(a[g](c.sizesAttr)||a[g]("sizes")),z="auto"==x;(!z&&m||!w||!a.src&&!a.srcset||a.complete||o(a,c.errorClass))&&(z&&(u=a.offsetWidth),a._lazyRace=!0,O++,c.rC&&(u=c.rC(a,u)||u),Z.add(function(){Q++,(h=s(a,"lazybeforeunveil")).defaultPrevented||(x&&(z?(y.updateElem(a,!0,u),p(a,c.autosizesClass)):a.setAttribute("sizes",x)),d=a[g](c.srcsetAttr),b=a[g](c.srcAttr),w&&(e=a.parentNode,f=e&&k.test(e.nodeName||"")),l=h.detail.firesLoad||"src"in a&&(d||b||f),h={target:a},l&&(r(a,R,!0),clearTimeout(v),v=i(R,2500),p(a,c.loadingClass),r(a,W,!0)),f&&n.call(e.getElementsByTagName("source"),Y),d?a.setAttribute("srcset",d):b&&!f&&(K.test(a.nodeName)?X(a,b):a.src=b),(d||f)&&t(a,{src:b})),j(function(){a._lazyRace&&delete a._lazyRace,q(a,c.lazyClass),(!l||a.complete)&&(l?R(h):O--,V(h))})}))},_=function(){if(!m){if(Date.now()-z<999)return void i(_,999);var a,b=function(){c.loadMode=3,U()};m=!0,c.loadMode=3,Q?U():i(function(){T(),Z.run()}),h("scroll",function(){3==c.loadMode&&(c.loadMode=2),clearTimeout(a),a=i(b,99)},!0)}};return{_:function(){z=Date.now(),e=b.getElementsByClassName(c.lazyClass),l=b.getElementsByClassName(c.lazyClass+" "+c.preloadClass),I=c.hFac,h("scroll",U,!0),h("resize",U,!0),a.MutationObserver?new MutationObserver(U).observe(d,{childList:!0,subtree:!0,attributes:!0}):(d[f]("DOMNodeInserted",U,!0),d[f]("DOMAttrModified",U,!0),setInterval(U,999)),h("hashchange",U,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(a){b[f](a,U,!0)}),/d$|^c/.test(b.readyState)?_():(h("load",_),b[f]("DOMContentLoaded",U),i(_,2e4)),U(e.length>0)},checkElems:U,unveil:$}}(),y=function(){var a,d=function(a,b,c){var d,e,f,g,h=a.parentNode;if(h&&(c=v(a,h,c),g=s(a,"lazybeforesizes",{width:c,dataAttr:!!b}),!g.defaultPrevented&&(c=g.detail.width,c&&c!==a._lazysizesWidth))){if(a._lazysizesWidth=c,c+="px",a.setAttribute("sizes",c),k.test(h.nodeName||""))for(d=h.getElementsByTagName("source"),e=0,f=d.length;f>e;e++)d[e].setAttribute("sizes",c);g.detail.dataAttr||t(a,g.detail)}},e=function(){var b,c=a.length;if(c)for(b=0;c>b;b++)d(a[b])},f=w(e);return{_:function(){a=b.getElementsByClassName(c.autosizesClass),h("resize",f)},checkElems:f,updateElem:d}}(),z=function(){z.i||(z.i=!0,y._(),x._())};return function(){var b,d={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.7,hFac:.8,loadMode:2};c=a.lazySizesConfig||a.lazysizesConfig||{};for(b in d)b in c||(c[b]=d[b]);a.lazySizesConfig=c,i(function(){c.init&&z()})}(),{cfg:c,autoSizer:y,loader:x,init:z,uP:t,aC:p,rC:q,hC:o,fire:s,gW:v}}});;
