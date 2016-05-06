/* jshint ignore:start */
/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
/* jshint ignore:end */
;
(function (_) {
  /*
   * Helper function to determine is Number.
   * Underscore and Angular isNumber functions
   * Allow isNumber(NaN) = true;
   * This allows for floats and 0's, but not NaN
   */
  _.isNumber = function(num) {
    return (typeof num === 'number' && _.isFinite(num) && !isNaN(num));
  };

})(_);
;
(function (_) {
  /**
   * build image cutting service url based on drupal setting
   * params: imageName, height, width, isVideoThumb
   *
   */

  _.getImageUrl = function(dsxUrl, height, width) {
    if(!dsxUrl){
      return false;
    }
    try{
      dsxUrl.match();
    } catch(err) {
      return false;
    }
    var url = [];
    var matches = dsxUrl.match(/.*:\/\/(.*)image\/(.{1,2}\/)(.*\.\b(jpg|jpeg|gif|png)\b)/);
    // return non-matching (presumably non-dsx) urls immediately
    if(!matches) { return dsxUrl; }
    var endPoint = matches[2];
    var imageName = matches[3];

    if(TWC.Configs.image_poc.instart) {
      url.push('http://cm.imwx.com/');   /// instart does not yet have our certs for SSL so back to http
      url.push(endPoint);
      url.push(imageName);
      url.push('?i10c=img.resize(width:');
      url.push(width);
      url.push(',height:');
      url.push(height);
      url.push(')');
      return url.join('');
    }

    if(TWC.Configs.image_poc.akamai) {
      url.push('http://ion.imwx.com/');
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

    // default to dsx
    return dsxUrl;


  };

  /**
   * Converts hexadecimal colors to rgb in order to add the alpha channel
   * @param hex
   * @returns {{r: Number, g: Number, b: Number}}
   * @private
   */
  _.hexToRgb = function(hex, alpha) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16),
        g = parseInt(result[2], 16),
        b = parseInt(result[3], 16),
        a = alpha || 1;

    var rgba = [r,g,b,a].join(',');
    var rgbaCode = ['rgba(', rgba, ')'].join('');

    return result ? rgbaCode : null;

  };
})(_);
;
(function (_) {

  /**
   * Helper method to strip out :SS from HH:MM:SS am
   * @param tm
   * @returns {string}  Ex: 09:45 am
   */
  _.formatTime = function(tm) {
    var t1 = tm.split(':'), t2 = tm.split(' ');
    return [t1[0],':',t1[1], ' ', t2[1]].join('');
  };



  /**
   * Helper method to retrieve timezone based on browser or location object
   * loc Location object
   * @param loc
   * @returns {String} Ex: EDT
   */
  _.getTimeZone = function(loc) {
    return loc ? loc : new Date().toString().match(/\(([A-Za-z\s].*)\)/)[1];
  };


  _.dateTimeToDate = function(datetime){
    return datetime && datetime.replace(/-/g,"").substr(0,8);
  };
  /**
   * Get GMT diff from ISO date string. We can modify dsxdate but the
   * requirement was to just get the GMT diff and creating one big object
   * for just a small data is not a good idea.
   * @param dateStr in ISO format
   * @return {String}
   */
  _.getGMTOffsetFromISODate = function( dateStr ) {
    if(!!dateStr) {
      var match_parts = dateStr.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d+)([+-]?)(\d+)([:]{1})(\d+)/);
      // is it ISO string?
      if(match_parts && match_parts.length === 12) {
        var diff = ((parseInt(match_parts[9]) || 0) + ((parseInt(match_parts[11]) || 0) / 60));
        return (match_parts[8] === "-") ? -(diff) : diff;
      }
    }
    return null;
  };

  /**
   * Converts ISO time to date object. Only for IE8
   * @returns date
   */
  _.fromISOToDate = (function(){
    var testIso = '2011-11-24T09:00:27+0200';
    // Chrome
    var diso= Date.parse(testIso);
    if(diso===1322118027000) {
      return function(s){
        return new Date(Date.parse(s));
      };
    }
    // JS 1.8 gecko
    var noOffset = function(s) {
      var day= s.slice(0,-5).split(/\D/).map(function(itm){
        return parseInt(itm, 10) || 0;
      });
      day[1]-= 1;
      day= new Date(Date.UTC.apply(Date, day));
      var offsetString = s.slice(-5);
      var offset = parseInt(offsetString,10)/100;
      if (offsetString.slice(0,1)==="+"){offset*=-1;}
      day.setHours(day.getHours()+offset);
      return day;
    };
    if (noOffset(testIso)===1322118027000) {
      return noOffset;
    }
    return function(s){ // kennebec@SO + QTax@SO
      var day, tz,
//        rx = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d{4}))?$/,
        rx = /^(\d{4}\-\d\d\-\d\d([tT][\d:\.]*)?)([zZ]|([+\-])(\d\d):?(\d\d))?$/,

        p= rx.exec(s) || [];
      if(p[1]){
        day= p[1].split(/\D/).map(function(itm){
          return parseInt(itm, 10) || 0;
        });
        day[1]-= 1;
        day= new Date(Date.UTC.apply(Date, day));
        if(!day.getDate()){ return NaN;}
        if(p[5]){
          tz= parseInt(p[5], 10)/100*60;
          if(p[6]) {tz += parseInt(p[6], 10);}
          if(p[4]=== "+") {tz*= -1;}
          if(tz) {day.setUTCMinutes(day.getUTCMinutes()+ tz);}
        }
        return day;
      }
      return NaN;
    };
  })();

})(_);
;
(function (_) {
  /**
   * List of non-conus states
   * @type {Array}
   */
  _.nonConusStates = ['AK', 'AS', 'GU', 'HI', 'MP', 'MQ', 'PR', 'VI', 'WQ'];

  /**
   * Taken the location model and returns if the location is conus or not
   * @param loc
   * @returns {boolean}
   */
  _.isConus = function(loc) {
    var stateCd = loc.getStateCode();
    var countryCode = loc.getCountryCode();

    return _.isConusByCountryState(stateCd, countryCode);
  };

  /**
  * Taken the countryCode and the stateCode and returns if the location is conus or not
  * @param stateCd
  * @param countryCode
  * @returns {boolean}
  */
  _.isConusByCountryState = function(stateCd, countryCode) {
    return countryCode === 'US' && _.nonConusStates.indexOf(stateCd) === -1;
  };
})(_);
;
/*jshint -W054 */

(function (_) {
  /**
   *
   * @param destination
   * @param {...*} sources
   * @returns {*}
   */
  _.deepExtend = function(destination) {
    var deepExtend = _.deepExtend;
    var sources = Array.prototype.slice.call(arguments,1);
    _.each(sources, function(source) {
      _.each(source,function(value,property) {
        if (value && _.isObject(value)) {
          destination[property] = destination[property] || {};
          deepExtend(destination[property], value);
        } else {
          destination[property] = value;
        }
      });
    });

    return destination;
  };
})(_);
;
/*jshint -W083 */

(function (_, w) {
  'use strict';

  _.getURLParameter = ('PcoUtils' in TWC && 'getURLParameter' in TWC.PcoUtils) ? TWC.PcoUtils.getURLParameter : function (parameter) {
    return decodeURIComponent((new RegExp('[?|&]' + parameter + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [undefined, ""])[1].replace(/\+/g, '%20')) || null;
  };

  if ('undefined' === typeof _.normalizeUrl) {
    /**
     * Ensures that the URL has a secure protocol or is protocol neutral.
     *
     * This function ensures that the protocol is either secure (https) or
     * protocol neutral. It strips the www subdomain.
     *
     * @param {string} url
     * @param {string} [protocol] Protocol or protocol neutral. Default: current protocol.
     * @returns {string} Url with proper protocol & domain.
     */
    _.normalizeUrl = function normalizeUrl(url, protocol) {
      protocol = protocol || 'https';

      // Check Protocol
      if (!_.isString(url)) {
        return url;
      }
      url = url.replace(/^(http(s)?)?:?\/\//, (protocol.replace(':', '') + '://'));
      if (url.indexOf('www.weather.com') && 'https' === protocol) {
        url = url.replace('www.weather.com', 'weather.com');
      }

      return url;
    };
  }

  if ('undefined' === typeof _.makeUrlSecure) {
    /**
     * Makes the url secure.
     *
     * @see _.normalizeUrl
     * @param {stinrg} url Url to be made secure.
     * @returns {string} Secured Url.
     */
    _.makeUrlSecure = function makeUrlSecure(url) {
      return this.normalizeUrl(url, 'https');
    };
  }

  if ('undefined' === typeof _.removeParam) {
    /**
     * Removes a parameter or query from the search/query URL string.
     *
     * @param {string} key Parameter key to remove.
     * @param {string} sourceURL URL to have query param-value removed.
     * @returns {string} Modified URL
     */
    _.removeParam = function removeParam(key, sourceURL) {
      var rtn = sourceURL.split('?')[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf('?') !== -1) ? sourceURL.split('?')[1] : '';
      if (queryString !== '') {
        params_arr = queryString.split('&');
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
          param = params_arr[i].split('=')[0];
          if (param === key) {
            params_arr.splice(i, 1);
          }
        }
        rtn = rtn + '?' + params_arr.join('&');
      }
      return rtn;
    };
  }

  if ('undefined' === typeof _.addEscapedFragment) {
    /**
     * Adds `_escaped_fragment_` to URL.
     *
     * @param {string} url Url to add `_escaped_fragment_`.
     * @returns {string} Url with `_escaped_fragment_`.
     */
    _.addEscapedFragment = function addEscapedFragment(url) {
      url += ((url.indexOf('?') !== -1) ? '&' : '?') + ((url.indexOf('_escaped_fragment_') !== -1) ? '' : '_escaped_fragment_');
      return url;
    };
  }

  if ('undefined' === typeof _.removeEscapedFragment) {
    /**
     * Removes `_escaped_fragment_` from URL.
     *
     * @param {string} url Url to remove `_escaped_fragment_`.
     * @returns {string} Url without `_escaped_fragment_`.
     */
    _.removeEscapedFragment = function removeEscapedFragment(url) {
      return _.removeParam('_escaped_fragment_', url);
    };
  }

  if ('undefined' === typeof _.toQueryString) {
    /**
     * Formats a simple object (2 levels deep) to a query string.
     *
     * @param {object} obj Object to convert
     * @returns {string}
     */
    _.toQueryString = function toQueryString(obj) {
      var parts = [], temp, prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          temp = obj[prop];
          if (_.isArray(temp)) {
            parts.push(_.map(temp, function(value) {
              return encodeURIComponent(prop) + '[]=' + encodeURIComponent(value);
            }).join('&'));
          } else if (_.isObject(temp)) {
            parts.push(
              _.chain(temp)
                .mapObject(function(value, key) {
                  if (!_.isObject(value)) {
                    return encodeURIComponent(prop) + '[' + key + ']=' + encodeURIComponent(value);
                  }

                  // @todo Support recursive objects
                  return '';
                })
                .values()
                .join('&')
            );
          } else if (_.isNull(temp)) {
            parts.push(encodeURIComponent(prop));
          } else {
            parts.push(encodeURIComponent(prop) + '=' + encodeURIComponent(temp));
          }
        }
      }
      return parts.join('&');
    };
  }
})(_, window);
;
(function (_) {
    /**
   * Check to see if char is not a special char
   * @param char
   * @returns {boolean}
   * @private
   */
  _isValid = function(char) {
    var check = /^[a-z0-9 ]$/i;
    return check.test(char);
  };

  /**
   * Removes char in a given string
   * @param string
   * @param char
   * @returns {*}
   * @private
   */
  _removeChar = function(string, char) {
    var pattern = _isValid(char) ? char : "\\"+char;
    var regex = new RegExp(pattern, "g");
    return string.replace(regex, function (str, match) {
      return '';
    });
  };

  _.capitalize = (window.TWC && TWC.PcoUtils && TWC.PcoUtils.capitalize) || function(string) {
    string = String(string);
    return string && (string.charAt(0).toUpperCase() + string.slice(1));
  };

  _.trim = function (str) {
    return str.replace(/^\s+|\s+$/g, '');
  };

    /**
   * isNumeric: Returns a boolean indicating if a given string value is number only
   * @param val
   * @returns {*|boolean}
   */
  _.isNumeric = function(val) {
    return /^-?\d+$/.test(val);
  };

  /**
   * Removes duplicated char in a given string
   * @param string
   * @param char
   * @returns {*}
   */
  _.removeDupChar = function(string, char) {
    var pattern = _isValid(char) ? "(" + char + ")\\1+" : "(\\" + char + ")\\1+";
    var regex = new RegExp(pattern, "g");
    return string.replace(regex, function (str, match) {
      return match[0];
    });
  };


  /**
   * Removes all special characters (keeps digits, word chars, underscores, and whitespaces)
   * @param string
   * @return string
   */
  _.removeSpecialChars = function(str) {
    return str.replace(/[^\w\s]/gi, '');
  };

  /**
   * Removes spaces
   * @param  string
   * @return string
   */
  _.removeSpaces = function(str) {
    return str.replace(/\s+/g, '');
  };

  /**
   *
   */
  _.getCamelCase = function(name) {
      return name.toLowerCase().replace(/-(.)/g, function(match, group1) {
          return group1.toUpperCase();
      });
  };


})(_);
;
(function (_) {

  /**
   * Split array into small sub-arrays of mentioned chunkSize.
   * Eg: chunk([1,2,3,4,5,6,7,8], 3) results in [[1,2,3], [4,5,6], [7,8]]
   * Added by: ksankaran (Velu)
   * @param array
   * @param chunkSize
   * @returns {Array|Array}
   */
  _.chunk = function(array, chunkSize) {
    return [].concat.apply([],
      _.map(array, function(elem,i) {
        return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
      })
    );
  };
})(_);
;
(function ($) {
  $(document).ready(function() {
    $('img').unveil(350);
  });
})(jQuery);
;
(function (angular, _) {
  angular
    .module('angular-underscore', [])
    .factory('twcUtil', underscore);

  function underscore() {
    return _;
  }

})(angular, _);
;
/**
 * Author: ksankaran (Velu)
 * Date: 10/16/14
 * Time: 4:37 PM
 * Comments:
 */

window.twc = window.twc || {};
window.twc.shared = {};
window.twc.shared.apps = angular.module('shared',['ngTouch', 'pascalprecht.translate', 'pf.drupal.translate', 'angular-underscore']);
;
/**
 * Created with JetBrains PhpStorm.
 * User: thomas.vo
 * Date: 9/9/13
 * Time: 11:03 AM
 * To change this template use File | Settings | File Templates.
 */
twc.shared.apps.provider('twcConfig',function () {
  var config = {};
  var overrideList = [];

  return {
    /**
     * This is made to be used in tests to override the defined settings
     * @param settings
     */
    __override__: function (settings) {
      overrideList.push(settings);
    },

    /**
     * This is the standard way to declare configurations
     * @param settings
     */
    add: function (settings) {
      angular.extend(config,settings);
    },

    $get: ['twcUtil', function (twcUtil) {
      angular.forEach(overrideList, function (overridingSettings) {
        twcUtil.deepExtend(config,overridingSettings);
      });
      return config;
    }]
  };
});

/**
 * User: ksankaran
 * Create a new provider for twcMessage. We can probably use one function and make two
 * factories from it. However, the message needs deep extend but config doesn't need
 * and we may increase complex by doing it for configs.
 */
twc.shared.apps.provider('twcMessage', function () {
  var config = {};

  return {
    deepExtend: function (destination) {
      var sources = Array.prototype.slice.call(arguments,1), _self = this;
      angular.forEach(sources, function (source) {
        angular.forEach(source,function (value,property) {
          if (value && angular.isObject(value)) {
            destination[property] = destination[property] || {};
            _self.deepExtend(destination[property], value);
          } else {
            destination[property] = value;
          }
        });
      });
    },

    /**
     * This is the standard way to declare configurations
     * @param settings
     */
    add: function (settings) {
      this.deepExtend(config,settings);
    },

    getAll: function (key) {
      return config;
    },

    $get: function () {
      return config;
    }
  };
});
;
