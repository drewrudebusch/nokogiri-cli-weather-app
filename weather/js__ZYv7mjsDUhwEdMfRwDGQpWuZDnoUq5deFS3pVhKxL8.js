/**
 * Created by sherwoos on 3/2/16.
 */
window.TWC = window.TWC || {};
TWC.adUtils = TWC.adUtils || {};
TWC.adUtils.article = {};
TWC.adUtils.lazyLoad = function(adpos, adposVariable) {
  TWC.Events = TWC.Events || {};
  TWC.Events.dfpLoaded = TWC.Events.dfpLoaded || jQuery.Deferred();
  TWC.Events.dfpLoaded.done(function () {
    var gnv = TWC && TWC.pco && TWC.pco.getNodeValue,
      mobile = jQuery(window).width() < 768,
      utils = TWC && TWC.PcoUtils;
    if (mobile && window.utag) {
      var ads_lazy_load = gnv("ad", "ads_lazy_load");
      adpos = adpos || adposVariable;
      var lazyLoadPos = ads_lazy_load && adpos in ads_lazy_load;
      if (!lazyLoadPos || !jQuery('#' + adpos).length) {
        return;
      }
      utils && utils.scrollThrottler.onScroll(function () {
        var wrapperSel = '#' + jQuery('#' + adpos).closest('.wx-adWrapper').attr('id');
        var $wrapper = jQuery(wrapperSel);
        var adCalled = $wrapper.data('ad-called');
        var adUnitAndZone = gnv('ad', 'adUnitAndZone');
        var viewport_padding = TWC && TWC.Configs && TWC.Configs.lazy_load_ads && TWC.Configs.lazy_load_ads.viewport_padding;
        var makeAdCall = utils.isInViewPort(wrapperSel, viewport_padding || 0, false);
        if (lazyLoadPos && makeAdCall && !adCalled) {
          $wrapper.data('ad-called', true);
          var slotTargeting = {};
          var lazy_load_adpos = ads_lazy_load && ads_lazy_load[adpos];
          var pos = lazy_load_adpos && lazy_load_adpos.pos;
          var sizes = lazy_load_adpos && lazy_load_adpos.sizes;
          var oxSize = lazy_load_adpos && lazy_load_adpos.oxSize;
          var oxPrice = lazy_load_adpos && lazy_load_adpos.oxPrice;

          slotTargeting.pos = pos;
          if (oxSize) {
            slotTargeting[oxSize] = oxPrice;
          }
          var new_data = jQuery.extend({}, utag_data,
            {'js_page.Ad_Slot_Definition': [[adUnitAndZone, sizes, adpos, slotTargeting]]});
          utag.view(new_data, null, [120]);
        }
      });
    }
  });
};
;
