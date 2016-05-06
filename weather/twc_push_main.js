/**
 * User: Hussein Qudsi
 * Date: 3/04/2016
 * Time: 17:11
 */
/* global twc */
/*jshint -W065 */
/*Version 0.1 */
(function () {
  'use strict';

  /** 1. vars* */
  // Registration vars:
  var reg, sub;
  // Event vars:
  var Events = TWC.Events,
    TWC_SW_gmPush_ready = 'TWC_SW_gmPush_ready',
    TWC_SW_push_allow = 'TWC_SW_push_allow',
    TWC_SW_push_allow_confirmed = 'TWC_SW_push_allow_confirmed',
    TWC_SW_push_allow_denied = 'TWC_SW_push_allow_denied',
    TWC_SW_unsubscribe_confirmed = 'TWC_SW_unsubscribe_confirmed',
    unSubscribeEvent = 'TWC_push_unsub',
    disableBodyTag = 'disableBodyTag';
  // Disabling the body tag
  var bodyDisabled = false;
  var pcoAttrs = TWC.pco.get('user') && TWC.pco.get('user').attributes;

  /**
   * 2. pcoHelper
   * Sets user PCO preference
   */
  var pcoHelper = function (updatePco) {
    var pco = TWC && TWC.pco;
    var products = TWC.pco.get('products');
    if (pco) {
      products.attributes.WebPushNotifications = products.attributes.WebPushNotifications || {};
      return function () {
        updatePco.apply(this, arguments);
        pco.set('products', products);
      };
    }
  };

  /**
   * 2. Helper Fnc
   * All work done in the controller goes here in the form of well-defined functions
   */
  var _helperFnc = {
    /** Sending banner ready event */
    sendBannerEvent: function (sendEvent, value) {
      Events.getEvent(sendEvent).notify(value);
    },

    /** Tracking
     * @param browser = the browser
     * @param status = the status
     * */
    trackingEvent: function (browser, status) {
      sc_trackAction && sc_trackAction(document, ('push-notification-user-opt-' + (browser.chrome ? 'chrome:' : 'firefox:') + status));
    },

    /**
     * Pco update
     * @param status = what pco action needs
     * @param pcoString = The pco WebPushNotifications prop value setter
     * */
    updatePco: pcoHelper(function (statusAction, pcoString) {
      var WebPushNotifiObj = TWC.pco.getNodeValue("products", "WebPushNotifications");
      switch (statusAction) {
        case 'saveToken': // Saving users token in PCO product's WebPushNotifications obj
          WebPushNotifiObj.deviceToken = pcoString;
          break;
        case 'reShow': // Reshowing Alert notification banner
          delete WebPushNotifiObj.PushStatus;
          break;
        case 'denied-prompt': // User denied browsers prompt.
        case 'user-unsub': // User un-subscribed
          WebPushNotifiObj.PushStatus = pcoString;
      }
    })
  };// End of _helperFnc namespace


  /**
   * 3. Functions
   * RegSW namespace
   * All work done in the controller goes here in the form of well-defined functions
   */
  var RegSW = {
    /**
     * Disable body tag
     * Disables the body tag until user interacts w/ browsers prompt
     * @param addRemove = add or remove the css disable class
     * */
    bodyTagStatus: function(){
      // Getting Body tag
      var body = document.querySelector('body');
      var child = body.children[0];
      // Making the overlay
      var overlay = document.createElement('div');
      // Styling the overlay
      overlay.style.width = 100 + '%';
      overlay.style.height = 100 + '%';
      overlay.style.position = 'fixed';
      overlay.style['zIndex'] = 5999; // plus one :)
      overlay.style.background = 'black';
      overlay.style.opacity = 0.75;
      // Returning a fnc w/ the behavior
      return function(addRemove){
        body[addRemove](overlay, child);
      };
    }(),

    /** Subscribing a user */
    subscribe: function (fromEvent) {
      var browser = pcoAttrs.browser;

      // Disables the body tag until user interacts w/ browsers prompt, --only w/ chrome
      if(pcoAttrs && browser.chrome && Notification.permission === 'default'){
        bodyDisabled = true;
        RegSW.bodyTagStatus('insertBefore');
      }

      // Subscribing the user
      reg && reg.pushManager.subscribe({userVisibleOnly: true}).
        then(function (pushSubscription) {
          sub = pushSubscription;
          var endPointURL = sub.endpoint,
            deviceToken = endPointURL.substring(endPointURL.lastIndexOf('/') + 1);

          // Updating the body tag
          bodyDisabled && RegSW.bodyTagStatus('removeChild');

          // Saving users token in PCO product
          _helperFnc.updatePco('saveToken', deviceToken);

          // Tracking update:
          _helperFnc.trackingEvent(browser, 'allow');

          // Sending event to manage notification page or banner
          _helperFnc.sendBannerEvent(TWC_SW_push_allow_confirmed);

        }).catch(function (error) {
          // Updating the body tag
          bodyDisabled && RegSW.bodyTagStatus('removeChild');

          var permissions = Notification.permission;
          // User dismissed the browser prompt
          _helperFnc.sendBannerEvent(TWC_SW_push_allow_denied, permissions);

          switch (permissions) {
            case 'denied':
              // Pco update, user denied prompt
              _helperFnc.updatePco('denied-prompt', 'User-denied-browsers-prompt');
              // Tracking update:
              _helperFnc.trackingEvent(browser, 'block');
              break;
            case 'default':
              // Reshowing Alert notification banner
              _helperFnc.updatePco('reShow');
              // Tracking update:
              _helperFnc.trackingEvent(browser, 'close');
          }
        });
    },

    /** Un-subscribing a user */
    unSubscribe: function () {
      sub && sub.unsubscribe &&
      sub.unsubscribe().then(function (event) {
        // User has un-subscribed
        _helperFnc.updatePco('user-unsub', 'UserUnSubscribed');
        // unsubscribe confirmed
        _helperFnc.sendBannerEvent(TWC_SW_unsubscribe_confirmed);
      });
    },

    /**
     * service worker registration
     * Returns a promise when SW is registered
     * */
    registerWorker: function () {
      return new Promise(function(resolve, reject){
        if ('serviceWorker' in navigator && 'PushManager' in window) {
          navigator.serviceWorker.register('/twc-push-worker.js').then(function () {
            return navigator.serviceWorker.ready;
          }).then(function (serviceWorkerRegistration) {
            reg = serviceWorkerRegistration;
            //Sending banner module the ready event
            _helperFnc.sendBannerEvent(TWC_SW_gmPush_ready);
            // resolving the promise
            resolve();
          }).catch(function (error) {
            // rejecting the promise
            reject();
          });
        }
      });
    },

    /**
     * Initiating service worker registration
     * If the service worker is already registered then
     * */
    initiateServiceWorker: function(){
      return new Promise(function(resolve, reject){
        navigator.serviceWorker.getRegistration().then(function (alreadyRegistered) {
            // If user is already registered then updating the registration else, we'll register them via registerWorker()
            if (alreadyRegistered) {
              navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                // Updating the reg, the registration
                reg = serviceWorkerRegistration;
                //Sending banner module the ready event
                _helperFnc.sendBannerEvent(TWC_SW_gmPush_ready);
                // resolving the promise
                resolve();
              });
            } else {
              // Registering the service worker
              RegSW.registerWorker().then(function(){
                // resolving the promise
                resolve();
              });
            }
          }
        );
      });
    }
  };// End of RegSW namespace

  /**
   * 3. Initiating service worker
   * Initiating service worker registration
   */
  RegSW.initiateServiceWorker();

  /**
   * 4. Event listeners on subscribe/ un-subscribe
   * Waiting for module to communicate to RegSW
   */
  Events.getEvent(TWC_SW_push_allow).progress(function () {
    RegSW.initiateServiceWorker().then(function(){
      RegSW.subscribe();// subscribe
    });
  });
  Events.getEvent(unSubscribeEvent).progress(function () {
    RegSW.unSubscribe();// un-subscribe
  });

})();
