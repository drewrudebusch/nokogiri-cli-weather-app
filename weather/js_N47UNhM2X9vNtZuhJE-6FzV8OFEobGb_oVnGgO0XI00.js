
angular
    .module('local_map', []);
;
/**
 * User: Velu
 * Date: 10/12/2015
 * Time: 10:21 PM
 * Ideally, this all should come from Drupal.
 */

twc.shared.apps.provider("mapLayersValue", function MapLayersValue() {
    this.$get = [function() {return window.PangeaMap.mapLayersValue;}];
});
;
twc.shared.apps.value('controlsValue', [{
   id: 'legends',
   metric: 'legends',
   label: 'Legends',
   type: 'control',
   interface: 'graphic', // contextual graphic
   selected: true,
   order: 3
},
{
   id: 'timeline',
   metric: 'timeline',
   label: 'Timeline',
   type: 'control',
   interface: 'interactive-graphic', // complex interactive control
   selected: true,
   order: 1
},
{
   id: 'geolocation',
   metric: 'geolocation',
   label: 'Geolocate',
   type: 'control',
   interface: 'button', // simple button on map
   selected: false,
   order: 4
}
]);
;
twc.shared.apps.value('mapLayerRules', {
  radar : [
    {_gprId : /NAM/}
  ],
  radarFcst: [
    {_gprId : /NAM/}
  ],
  radarAlaska : [
    {cntryCd : /AK/}
  ],
  radarHawaii : [
    {cntryCd : /HI/}
  ],
  radarEurope : [
    {regSat : /eur/}
  ],
  radarAustrailian : [
    {cntryCd : /AU/}
  ],
  satrad : [
    {_gprId : /NAM/},
    {cntryCd : /UK/}
  ],
  satradFcst : [
    {_gprId : /NAM/},
    {cntryCd : /UK/}
  ],
  sat: [
    {cntryCd : /\S+/}
  ],
  ussat: [
    {_gprId : /NAM/},
    {cntryCd : /UK/}
  ],
  cloudsFcst: [
    {_gprId : /NAM/},
    {cntryCd : /UK/}
  ],
  temp: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  tempFcst: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  feelsLike: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  feelsLikeFcst: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  windSpeed: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  windSpeedFcst: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  dewpoint: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  dewpointFcst: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  uv: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ],
  uvFcst: [
    {cntryCd : /US/, stCd: /^(?!AK|AS|GU|HI|MP|MQ|PR|VI|WQ).*$/}
  ]
});
;
twc.shared.apps.factory('eventDispatchFactory', function () {
  dispatches = {};
  return {
    getDispatch: function (key) {
      return dispatches[key] || (dispatches[key] = jQuery({}));
    }
  };
});
;
(function () {
  'use strict';
  twc.shared.apps.constant('basemapConstants', {
      'LAYER_LOOKUP': {
        'road': 'Road',
        'mssat': 'Satellite',
        'satellite': 'Satellite',
        'hybrid': 'Satellite',
        'dark': 'Dark',
        'r': 'Road',
        'h': 'Satellite',
        '0078': 'Road',
        '0079': 'Satellite'
      },
      'URL_TOKEN': 'baseMap',
      'PREFS_KEY': 'Basemap',
      'METRICS_TOKEN': 'base'
    }
  );
})();
;
/**
 * User: Velu
 * Date: 10/12/2015
 * Time: 10:15 PM
 * Controller methods or API methods for PangeaMap. This will behave as a model to
 * the map and
 */

twc.shared.apps.controller('PMapController', [
	'$q', '$timeout', '$scope', '$location', 'twcUtil', 'controlsValue', 'mapLayersValue', 'eventDispatchFactory', 'mapLayerRules', 'PcoProducts', 'customEvent', 'PcoPage', 'BusyManager', 'pMapUtil',
	function($q, $timeout, $scope, $location, _, controlsValue, mapLayersValue, eventDispatchFactory, mapLayerRules, PcoProducts, customEvent, pcoPage, BusyManager, pMapUtil) {
		var context     = this,
			busyManager 	= new BusyManager($scope),
			mapStack 			= {
					weather: []
			},
			imperialEnabled = false,
			params 					= {
				'Tile': ['id', 'urlTemplate', 'subdomains', 'opacity'],
				'SunTile': ['id', 'layerKey', 'validForward', 'validBackward', 'errorTileUrl', 'version'],
				'Feature': ['id']
			},
			dispatchWeatherLayers = eventDispatchFactory.getDispatch('layersWeather'),
			dispatchBaseLayer 		= eventDispatchFactory.getDispatch('layerBase'),
			dispatchMapView 			= eventDispatchFactory.getDispatch('dispatchMapView'),
			dispatchOpacity 			= eventDispatchFactory.getDispatch('opacity'),
			dispatchPMap 					= eventDispatchFactory.getDispatch('pMap');

	function getParams(layer) {
		var options = _.pick(layer, params[layer.className.replace('LayerOptions', '')]);
		if (options) {
			if (options.validForward) {
				options.validForward = new wx.dateTime.TimeSpan(0, 0, 0, options.validForward);
			} else if (options.validBackward) {
				options.validBackward = new wx.dateTime.TimeSpan(0, 0, 0, options.validBackward);
			}
		}
		return options;
	}

	// API Methods
	angular.extend(this, {
		// events
		events: {
			loaded: $q.defer(),
			ready: $q.defer(),
			activeLayerChanged: $q.defer()
		},

		controlState: _.indexBy(controlsValue, 'id'), //_.chain(controlsValue).pluck('id').object([]).mapObject(_.constant(false)).value(),

		// default storage key
		storageKey : 'pangeaMap',

		/**
		 * Customize storage key for the consumer.
		 * @param storageKey - {string}
     */
		setStorageKey: function(storageKey) {
			if(storageKey) {
				this.storageKey = storageKey;
			}
		},

		/**
		 * Get storage key for the current setup.
		 * @returns {string}
     */
		getStorageKey: function() {
			return this.storageKey;
		},

		/**
		 * Get current map state from local storage.
		 * @returns {object}
     */
		getMapState: function() {
			return PcoProducts.getMapState(this.storageKey);
		},

		/**
		 * Save part of map state into local storage
		 * @param key - {string}
		 * @param value - {*}
     */
		saveMapSubState: function(key, value) {
			var data = {};
			data[key] = value;
			PcoProducts.saveMapState(this.storageKey, data);
		},

		/**
		 * Get opacity configs from local storage
		 * @returns {object}
     */
		getMapOpacityState: function() {
			return PcoProducts.getMapOpacityConfigs(this.storageKey);
		},

		/**
		 * Set basemap using layerId.
		 * @param layerId - {string}
     */
		setBaseMap: function(layerId) {
			PcoProducts.setBaseMap(this.storageKey, layerId);
		},

		/**
		 * Get configuration passed from controller to pmap.
		 * @returns {*}
     */
		getConfig: function() {
			return $scope.config;
		},

		/**
		 * Get module id from configuration.
		 * @returns {string}
     */
		getModuleId: function() {
			return this.getConfig().module_id || 'imap';
		},

		/**
		 * Async callback event registration for map ready state.
		 * @param callback - {function}
     */
		onReady: function(callback) {
			context.events.loaded.promise.then(function(map) {
				callback(map);
			});
		},

		/**
		 * Async zoom event registration.
		 * @param callback - {function}
     */
		onZoom: function(callback) {
			this.map.zoomed.addListener.call(this.map.zoomed, callback);
		},

		/**
		 * Async pan event registration.
		 * @param callback - {function}
		 */
		onPan: function(callback) {
			this.map.panned.addListener.call(this.map.panned, callback);
		},

		/**
		 * Async layer added event registration.
		 * @param callback - {function}
		 */
		onLayerAdded: function(callback) {
			this.map.layerAdded.addListener.call(this.map.layerAdded, callback);
		},

		/**
		 * Async layer removal event registration.
		 * @param callback - {function}
		 */
		onLayerRemoved: function(callback) {
			this.map.layerRemoved.addListener.call(this.map.layerRemoved, callback);
		},

		/**
		 * Async map timeout event registration.
		 * @param callback - {function}
		 */
		onInteractionTimeout: function(callback) {
			this.map.slidingTimeout.addListener.call(this.map.slidingTimeout, callback);
		},

		/**
		 * Enable/Disable dragging on the map.
		 * @param val - {boolean}
     */
		enableDragging: function(val) {
			val ? this.map.dragging.enable() : this.map.dragging.disable();
		},

		/**
		 * Enable/Disable zooming on the map.
		 * @param val - {boolean}
     */
		enableZooming: function(val) {
			if (val) {
				this.map.doubleClickZoom.enable();
				this.map.scrollWheelZoom.enable();
			} else {
				this.map.doubleClickZoom.disable();
				this.map.scrollWheelZoom.disable();
			}
		},

		/**
		 * Enable/Disable scroll zoom on the map.
		 * NOTE: double click zoom will still work.
		 * @param flag
     */
		enableScrollZoom: function(flag) {
			this.map.scrollWheelZoom[flag ? 'enable' : 'disable']();
		},

		/**
		 * The init method which creates map (if not already created by bootstrap files). Registers
		 * Async listen helpers that will allow consumers to add layers to the map, adjust opacity,
		 * etc.
		 *
		 * @param element - {dom}
		 * @param options - {object}
     */
		loadMap: function(element, options) {
			var leafletWeatherLayerClassName;
			var showHiddenWeatherLayerDebounced = _.debounce(function() {
				if(context.activeWeatherLayer && context.activeWeatherLayer.id) {
					leafletWeatherLayerClassName = '.' + ('leaflet-' + context.activeWeatherLayer.id + '-pane').split(' ')[0];
					jQuery(leafletWeatherLayerClassName).show();
				}
			}, 1000);

			this.map = window._map;
			// local_map "may" be instantiated with lazy load.
			if (!this.map) {
				this.map = window._map = new wx.maps.Map(element, new wx.maps.MapOptions(options));
				var zoomLevel = parseInt(_.getURLParameter("zoom") || 8, 10);
				this.map.zoom((zoomLevel < 3 || zoomLevel > 13) ? 8 : zoomLevel);
			}

			/*********** setup listeners *******************/
			dispatchWeatherLayers.on('change', function (evt, layers) {
				layers = _.flatten([layers]);
				context.setWeatherLayers(_.pluck(layers, 'id'));
			});
			dispatchOpacity.on('change', function (evt, data) {
				context.setOpacityForActiveWeatherLayer(data);
			});
			dispatchMapView.on('change', function (evt, data) {
				context.moveAndZoom(data.latitude, data.longitude, data.zoom, data.offsetX, data.offsetY);
			});
			dispatchBaseLayer.on('change', function (evt, data) {
				context.setBaseLayer(data);
			});
			/***********************************************/

			// restore map controlsValue override from PCO.
			(function(key, dataMap) {
				var pcoData = context.getMapState(context.storageKey)[key] || {};
				dataMap.forEach(function(control) {
					if(control.id in pcoData) {
						control.selected = pcoData[control.id];
					}
				});
			})('key_controls', controlsValue);

			context.map.loading.addListener(function() {
				context.isAnimationPlaying() && busyManager.addBusy();
				if(context.isAnimationPlaying() && context.activeWeatherLayer && context.activeWeatherLayer.id) {
					// having spaces in layer ids complicates things
					leafletWeatherLayerClassName = '.' + ('leaflet-' + context.activeWeatherLayer.id + '-pane').split(' ')[0];
					jQuery(leafletWeatherLayerClassName).hide();
				}
			});

			context.map.loaded.addListener(function() {
				dispatchPMap.triggerHandler('layerLoaded', context);
				busyManager.removeBusy();
				showHiddenWeatherLayerDebounced();
			});

			context.map.popupOpened.addListener(function() {
				$scope.$evalAsync(function() {
						context.popupOpen = true;
				});
			});

			context.map.popupClosed.addListener(function() {
				$scope.$evalAsync(function() {
						context.popupOpen = false;
				});
			});

				// Until better popup centering logic is written.
			var _leaflet = this.map.engine;
			_leaflet.on('popupopen', function(e) {
				var px = _leaflet.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
				px.y -= e.popup._container.clientHeight / 2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
				_leaflet.panTo(_leaflet.unproject(px), {
					animate: true
				}); // pan to new center

				// we need to make this smarter
				// I believe this only needs to be done for small screens
				// I should probably used mapAPI.smallScreen instead
				((screen.height < 600) || (document.documentElement.offsetHeight < 600)) && setTimeout(function() {
					var $popup = angular.element('.leaflet-popup');
					var popupBoundingBox = $popup[0].getBoundingClientRect();
					var pinBoundingBox = angular.element('.leaflet-marker-icon')[0].getBoundingClientRect();
					$popup.detach().appendTo('body').css({
						transform: '',
						position: 'absolute',
						zIndex: 5000,
						top: (pinBoundingBox.top - popupBoundingBox.height) + 'px',
						bottom: 'initial',
						left: (pinBoundingBox.left - popupBoundingBox.width / 2 + pinBoundingBox.width / 2 + 'px')
					});
				}, 1000);
			});
			context.events.loaded.resolve();
		},

		/**
		 * Insert layer using layerId and at specified index.
		 * @param layerId - {string}
		 * @param idx - {integer}
		 * @param options - {object}
     */
		insertViewLayer: function(layerId, idx, options) {
			var layerParams = _.findWhere(mapLayersValue, {
				id: layerId
			});
			if (layerParams) {
				angular.extend(context.map.configuration, layerParams.config || {});
				context.map.insertLayer(context.map.createLayer(
						new wx.layers[layerParams.className](angular.extend(getParams(layerParams) || {}, options || {}))), idx);
			}
		},

		/**
		 * Remove weather layers that are not in the request but in the map.
		 * @returns {integer}
     */
		removeExtraWeatherLayersFromView: function() {
			return _.chain(context.getViewLayerStackWeather()).difference(mapStack.weather).each(context.removeViewLayer).value().length;
		},

		/**
		 * Add weather layers that are in the request but not in the map.
		 * @returns {integer}
     */
		addMissingWeatherLayersToView: function() {
			// Add layer by passing in configuration data.
			// can accept string or object
			// should only be called in context of mapStack or mapStack won't sink up anymore
			var addViewLayer = function(layerId, options) {
				var layerParams = _.findWhere(mapLayersValue, {
					id: layerId
				});
				if (layerParams) {
					angular.extend(context.map.configuration, layerParams.config || {});

					// override with pco values
					var pcoOpacity = context.getMapOpacityState();
					if (pcoOpacity) {
							layerParams.opacity = pcoOpacity[layerId] || layerParams.opacity;
					}

					context.map.layerAdded.addListener(function opacityAdder(layerId) {
						context.map.layerAdded.removeListener(opacityAdder);
						context.setOpacityForActiveWeatherLayer(layerParams.opacity);
					});
					var newLayer = new wx.layers[layerParams.className](angular.extend(getParams(layerParams) || {}, options || {}));
					// newLayer.setOpacity(layerParams.opacity);
					context.map.addLayer(context.map.createLayer(newLayer));
				}
			};

			return _.chain(mapStack.weather).difference(context.getViewLayerStackWeather()).each(addViewLayer).value().length;
		},

		/**
		 * Remove a particular layer from map using layerId.
		 * @param layerId
     */
		removeViewLayer: function(layerId) {
			// check not necessary
			layerId && context.map.removeLayer(layerId);
		},

		/**
		 * Async event dispatcher notifying activeWeatherLayer changes.
		 */
		checkActiveWeatherLayer: function() {
			var activeWeatherLayer = (context.getViewLayerById(mapStack.weather[0]) || null);
			if (activeWeatherLayer !== null && context.activeWeatherLayer !== activeWeatherLayer) {
				context.activeWeatherLayer = activeWeatherLayer;
				var resolved = {
					id: _.last(mapStack.weather),
					layer: activeWeatherLayer
				};
				if (activeWeatherLayer.loadState === wx.LoadState.Loading) {
					activeWeatherLayer.loaded.addListener(function onLoaded() {
						activeWeatherLayer.loaded.removeListener(onLoaded);
						context.events.activeLayerChanged.notify(resolved);
						// Turn off preloader as we honestly cannot understand the benefit from it.
						// TODO: A/B test to determine if its needed.
						// activeWeatherLayer.preload();
					});
				} else {
					context.events.activeLayerChanged.notify(resolved);
				}
			}
		},

		/**
		 * Render the map immediately using mosaic with the current configuration in hand.
		 */
		render: function() {
			var viewLayers = context.getViewLayers();
			var viewLayersBase = context.getViewLayerStackBase();
			// swap basemap if needed
			if (mapStack.base !== viewLayersBase[0]) {
				context.insertViewLayer(mapStack.base, 0);
			}

			//////// removing multi-layer capability /////////
			// remove all non-base layers and add selected layers
			context.removeExtraWeatherLayersFromView();

			context.addMissingWeatherLayersToView();

			// add basemap overlay layers (roads)
			if (mapStack.overlays && mapStack.overlays.length > 0) {
				angular.forEach(mapStack.overlays, function(layerId) {
					context.insertViewLayer(layerId, context.map.stack.length);
				});
			}

			// add feature layer if not added already
			if (context.map && mapStack.feature && mapStack.feature.layerId) {
				if (!viewLayers[mapStack.feature.layerId]) {
					context.insertViewLayer(mapStack.feature.layerId, context.map.stack.length, mapStack.feature.options);
				} else {
					context.map.arrangeLayer(mapStack.feature.layerId, context.map.stack.length);
				}
			}

			context.checkActiveWeatherLayer();
		},

		/**
		 * Async listener registration for active weather layer change.
		 * @returns {*}
     */
		onActiveWeatherLayerChanged: function() {
			return context.events.activeLayerChanged.promise;
		},

		/**
		 * Get configured weather layer for the map.
		 * NOTE: This may or may not be rendered already.
		 * @returns {Array}
     */
		getWeatherLayers: function() {
			return mapStack.weather && mapStack.weather[0];
		},

		/**
		 * Get configured base layer for the map.
		 * NOTE: This may or may not be rendered already.
		 * @returns {string}
     */
		getBaseLayer: function() {
			return mapStack.base;
		},

		/**
		 * Sets weather layers for the map. If render param is true, the map will be rendered immediately.
		 * @param layerIds - {Array}
		 * @param render - {boolean}
     */
		setWeatherLayers: function(layerIds, render) {
			mapStack.weather = _.flatten([layerIds]);

			if (!!render) {
				context.render();
				context.activeWeatherLayer = (context.getViewLayerById(mapStack.weather[0]) || null);
			}
		},

		/**
		 * Sets base layer for the map. If render param is true, the map will be rendered immediately.
		 * @param layerId - {string}
		 * @param render - {boolean}
     */
		setBaseLayer: function(layerId, render) {
			// probably don't need this if clause
			if (layerId !== mapStack.base) {
				mapStack.base = layerId;
				mapStack.overlays = _.findWhere(mapLayersValue, {
					id: layerId
				}).overlays;
				(!!render) && context.render();
			}
		},

		/**
		 * Sets feature layer for the map with options provided. If render flag is set to true,
		 * map will be rendered immediately.
		 * @param layerId - {string}
		 * @param options - {object}
		 * @param render - {boolean}
     */
		setFeatureLayer: function(layerId, options, render) {
			if (layerId !== mapStack.feature) {
				mapStack.feature = {
					layerId: layerId,
					options: options
				};
				(render !== false) && context.render();
			}
		},

		/**
		 * Get opacity for active weather layer.
		 * @returns {number}
     */
		getOpacityForActiveWeatherLayer: function() {
			// assuming context opacity would never be 0
			return context.map && context.getActiveWeatherLayerId() && Math.round(context.getViewLayerById(context.getActiveWeatherLayerId()).getOpacity() * 100);
		},

		/**
		 * Set opacity for active weather layer.
		 * @param opacity - {number}
     */
		setOpacityForActiveWeatherLayer: function(opacity) {
			opacity = _.isObject(opacity) && opacity.opacity || opacity;
			// because we could have multiple (observed and future) layers for a single selection
			_.chain(mapStack.weather).map(context.getViewLayerById).each(function(layer) {
				if(layer) {
					layer.opacity = (opacity / 100);
				}
			});
		},

		/**
		 * Get last updated timestamp for weather layer.
		 * @param timeZoneOffset
		 * @returns {undefined}
     */
		getLastUpdatedTimeForLayerByIdTimestamp: function (timeZoneOffset) {
			var layers = _.flatten([context.getWeatherLayers()]);
			var layerWeather;
			var validTime = layers.length && layers[0] && (layerWeather = context.getViewLayerById(layers[0])) && layerWeather.validTimes && layerWeather.validTimes[0].value;
			return (validTime && (_.isNumber(timeZoneOffset))) ? pMapUtil.validTimeToLocalTimeIso(layerWeather.validTimes[0], timeZoneOffset) : undefined;
		},

		/**
		 * Get active weather layer id in the rendered map.
		 * @returns {*}
     */
		getActiveWeatherLayerId: function() {
			return context.map && context.getViewLayerStackWeather()[0];
		},

		/**
		 * Get active layers in the rendered map.
		 * @returns {*}
     */
		getViewLayers: function() {
			return context.map && context.map.layers;
		},

		/**
		 * Get the order of layer (layer stack) in the rendered map.
		 * @returns {*}
     */
		getViewLayerOrder: function() {
			return context.map && context.map.stack;
		},

		/**
		 * Get active weather layer object.
		 * @returns {*}
     */
		getActiveWeatherLayer: function() {
			return context.getViewLayerById(context.getActiveWeatherLayerId());
		},

		/**
		 * Get last updated timestamp from layer using layerId.
		 * @param layerId - {string}
		 * @param tzOffset - {number, optional}
		 * @returns {promise} - resolved with time
     */
		getLastUpdatedTimeForLayerById: function(layerId, tzOffset) {
			var df = $q.defer();
			var layer = context.getViewLayerById(layerId);
			if (layer !== null) {
				if (layer.loadState === wx.LoadState.Loading) {
					layer.updated.addListener(function onLoaded() {
							layer.updated.removeListener(onLoaded);
							df.resolve(layer.validTimes[0]);
					});
				} else {
					df.resolve(layer.validTimes[0]);
				}
			}
			return df.promise;
		},

		/**
		 * Get rendered layer object using layerId
		 * @param layerId
		 * @returns {*}
     */
		getViewLayerById: function(layerId) {
			return context.map.layers[layerId];
		},

		/**
		 * Clear features from layer using layerId.
		 * @param layerId
     */
		clearLayerFeatures: function(layerId) {
			var method = 'clearFeatures';
			var layer = this.getViewLayerById(layerId);
			layer && layer[method] && layer[method]();
		},

		/**
		 * Add an object (mostly a feature/overlay) to layer using layerId, configured object
		 * and method to be invoked to add the object.
		 * Eg: featureLayer.addFeature(new Point...);
		 * @param layerId
		 * @param obj
		 * @param method
     */
		addToLayer: function(layerId, obj, method) {
			var layer = this.getViewLayerById(layerId);
			layer && layer[method] && layer[method](obj);
		},

		/**
		 * Get configured weather layer stack.
		 * NOTE: This may or may not be rendered already.
		 * @returns {Array}
     */
		getViewLayerStackWeather: function() {
			return this.map && _.without(this.map.stack, mapStack.base, mapStack.feature && mapStack.feature.layerId);
		},

		/**
		 * Get configured weather layer stack - same as above but returns layerKey instead of layerId.
		 * @returns {Array}
     */
		getViewLayerKeyStackWeather: function() {
			return _.map(this.getViewLayerStackWeather(), function(layerId) {
				return this.getLayerKeyFromLayerId(layerId);
			}.bind(this));
		},

		/**
		 * Get the output from getViewLayerKeyStackWeather in string format.
		 * NOTE: Useful for metrics
		 * @returns {string}
     */
		getViewLayerKeyStackWeatherStr: function() {
			return (this.getViewLayerKeyStackWeather() || []).join(",");
		},

		/**
		 * Get base layer configured.
		 * NOTE: This may or may not be rendered already.
		 * @returns {*|Array}
     */
		getViewLayerStackBase: function() {
			return this.map && _.difference(this.map.stack, mapStack.weather);
		},

		/**
		 * Get layer configuration from layerId.
		 * @param layerId
		 * @returns {object}
     */
		getLayerFromLayerId: function(layerId) {
			return _.findWhere(mapLayersValue, {
				id: layerId
			});
		},

		/**
		 * Get layerKey from layer configuration using layerId.
		 * @param layerId
		 * @returns {string}
     */
		getLayerKeyFromLayerId: function(layerId) {
			return this.getLayerFromLayerId(layerId)["layerKey"];
		},

		/**
		 * Get zoom level from rendered map.
		 * @returns {number}
     */
		getZoomLevel: function() {
			return this.map.zoomLevel;
		},

		/**
		 * Get maximum zoom level from rendered map (mosaic).
		 * @returns {number}
     */
		getMaximumZoomLevel: function() {
			return this.map.maximumZoomLevel;
		},

		/**
		 * Get minimum zoom level from rendered map (mosaic).
		 * @returns {number}
     */
		getMinimumZoomLevel: function() {
			return this.map.minimumZoomLevel;
		},

		/**
		 * Set the minimum zoom level on the mosaic.
		 * @param zoomLevel - {number}
     */
		setMinZoomLevel: function(zoomLevel){
			if(zoomLevel){
				this.map.minimumZoomLevel = zoomLevel;
			}
		},

		/**
		 * Set the maximum zoom level on the mosaic.
		 * @param zoomLevel - {number}
     */
		setMaxZoomLevel: function(zoomLevel){
			if(zoomLevel){
				this.map.maximumZoomLevel = zoomLevel;
			}
		},

		/**
		 * Get the geoCenter from mosaic.
		 * @returns {object}
     */
		getCenter: function() {
			return this.map.getGeoCenter();
		},

		/**
		 * Is imperial enabled?
		 * @returns {boolean}
     */
		getImperialEnabled: function() {
			return imperialEnabled;
		},

		/**
		 * Set imperialEnabled.
		 * @param val
     */
		setImperialEnabled: function(val) {
			imperialEnabled = val;
		},

		/**
		 * Set zoom level on the map.
		 * @param level
     */
		setZoomLevel: function(level) {
			this.map.zoom(level);
		},

		/**
		 * Increase the zoom level by one point.
		 */
		zoomIn: function() {
			var zoomLevel = this.getZoomLevel();
			if (zoomLevel < this.getMaximumZoomLevel()) {
				this.setZoomLevel(zoomLevel + 1);
			}
		},

		/**
		 * Decrease the zoom level by one point.
		 */
		zoomOut: function() {
			var zoomLevel = this.getZoomLevel();
			if (zoomLevel > this.getMinimumZoomLevel()) {
				this.setZoomLevel(zoomLevel - 1);
			}
		},

		/**
		 * Invoke resize on mosaic for tiles to adjust themselves.
		 */
		resize: function(width, height) {
			this.map.resize(width, height);
		}.bind(this),

		/**
		 * Set location in context.
		 * @param location - {object}
     */
		setLocation: function(location) {
			this.location = location;
		},

		/**
		 * Move and Zoom to a particular point in map.
		 * @param lat - {double}
		 * @param lng - {double}
		 * @param zoom - {number}
		 * @param x - {number}
     * @param y - {number}
     */
		moveAndZoom: function(lat, lng, zoom, x, y) {
			!_.isNumber(zoom) && (zoom = this.getZoomLevel());
			this.map.move(lat, lng, zoom, x, y);
		},

		/**
		 * Estimate a zoom level for non-location page.
		 * @returns {number}
     */
		getCorrectDefaultZoomLevel: function(){
			var zoomLevel = 6,
					screenWidth = window.innerWidth;
			if(screenWidth < 2700){
				zoomLevel = 5;
			}
			if(screenWidth < 1466){
				zoomLevel = 4;
			}
			if(screenWidth < 730){
				zoomLevel = 3;
			}
			return zoomLevel;
		},

		/**
		 * Get current animator play rate.
		 * @returns {number}
     */
		getCurrentPlayBackSpeed: function(){
			return this.map.animator.playRate;
		},

		/**
		 * Set animator play rate.
		 * @param speedInMilliseconds - {number}
     */
		setPlayBackSpeed: function(speedInMilliseconds){
			// milliseconds between frames on playback
			// lower is faster..
			if(this.map && speedInMilliseconds){
				this.map.animator.playRate = new wx.dateTime.TimeSpan(speedInMilliseconds);
			}
		},

		/**
		 * Invoke geolocate on the navigator object in browser.
		 */
		geolocate: function() {
			navigator.geolocation.getCurrentPosition(function(position) {
				context.moveAndZoom(position.coords.latitude, position.coords.longitude);
			});
		},

		/**
		 * Check if the map have a location context.
		 * @returns {boolean}
     */
		isLocalizedMap: function() {
			return !!this.location;
		},

		/**
		 * Play animation on the map.
		 */
		playAnimation: function() {
			this.map && this.map.animator.play();
		},

		/**
		 * Stop animation on the map.
		 */
		stopAnimation: function() {
			this.map && this.map.animator.stop();
		},

		/**
		 * With current mosaic version, calling stop pauses the animation. So, this method
		 * is just a wrapper over stopAnimation.
		 */
		pauseAnimation: function() {
			this.stopAnimation();
		},

		/**
		 * Is animation current playing?
		 * @returns {*}
     */
		isAnimationPlaying: function() {
			return this.map && this.map.animator.isPlaying;
		},

		/**
		 * Is animation currently stopped?
		 * @returns {*|boolean}
     */
		isAnimationPaused: function() {
			return this.map && !this.map.animator.isPlaying;
		},

		/**
		 * Async event listener registration for animation start event.
		 * @param callback - {function}
     */
		onAnimationStarted: function(callback) {
			this.map.animator.started.addListener.call(this.map.animator.started, callback);
		},

		/**
		 * Async event listener registration for animation end event.
		 * @param callback - {function}
     */
		onAnimationStopped: function(callback) {
			this.map.animator.stopped.addListener.call(this.map.animator.stopped, callback);
		},

		/**
		 * Async event listener registration for animation loading event.
		 * @param callback - {function}
     */
		onAnimationLoading: function(callback) {
			this.map.animator.loading.addListener.call(this.map.animator.loading, callback);
		},

		/**
		 * Async event listener registration for animation loaded event.
		 * @param callback - {function}
     */
		onAnimationLoaded: function(callback) {
			this.map.animator.loaded.addListener.call(this.map.animator.loaded, callback);
		},

		/**
		 * Async event listener registration for animation frame count changes.
		 * @param callback - {function}
     */
		onAnimationTotalFramesChanged: function(callback) {
			this.map.animator.frameCountChanged.addListener.call(this.map.animator.frameCountChanged, callback);
		},

		/**
		 * Async event listener registration for current animation frame change.
		 * @param callback - {function}
     */
		onAnimationFrameChanged: function(callback) {
			this.map.animator.frameChanged.addListener.call(this.map.animator.frameChanged, callback);
		},

		/**
		 * Get current startTime in the animation.
		 * @returns {time}
     */
		getAnimationStartTime: function() {
			return this.map.animator.startTime;
		},

		/**
		 * Get current endTime in the animation.
		 * @returns {time}
     */
		getAnimationEndTime: function() {
			return this.map.animator.endTime;
		},

		/**
		 * Get total number of frames available in the animator.
		 * @returns {number}
     */
		getAnimationTotalFrames: function() {
			return this.map.animator.frameCount;
		},

		/**
		 * Set total number of frames in the animator
		 * @param val - {number}
		 * @returns {number}
     */
		setAnimationCurrentFrame: function(val) {
			return (this.map.animator.frame = 1);
		},

		/**
		 * Get current frame being rendered by animator.
		 * @returns {number}
     */
		getAnimationCurrentFrame: function() {
			return this.map.animator.frame;
		},

		/**
		 * Skip to a particular frame directly.
		 * @param val - {number}
     */
		skipToAnimationFrame: function(val) {
			this.map.animator.skipToFrame(val || 0);
		},

		/**
		 * Set total number of frames available in the animator.
		 * @param val - {number}
     */
		setTotalAnimationFrames: function(val) {
			this.map.animator.frameCount = (val || 0);
		},

		/**
		 * Modify animation range for the animator.
		 * @param startTime - {time}
		 * @param endTime - {time}
     */
		modifyAnimationRange: function(startTime, endTime) {
			this.map.animator.modifyRange(startTime, endTime);
		},

		/**
		 * Is animation currently loading.
		 * @returns {boolean}
     */
		isAnimationLoading: function() {
			return this.map.animator.isLoading;
		},

		/**
		 * Skip animation to the beginning.
		 */
		skipAnimationToStart: function() {
			this.map.animator.skipToStart();
		},

		/**
		 * Skip animation to the end.
		 */
		skipAnimationToEnd: function() {
			this.map.animator.skipToEnd();
		},

		/**
		 * Async listener registration for map clock changes.
		 * @param callback
     */
		onClockTimeChanged: function(callback) {
			this.map.clock.timeChanged.addListener.call(this.map.clock.timeChanged, callback);
		},

		/**
		 * Open popup from map.
		 * @param popup - {object}
     */
		openPopup: function(popup) {
			if (popup) {
				this.map.openPopup(popup);
			}
		},

		/**
		 * Close the popup.
		 * @param popup - {object}
		 */
		closePopup: function(popup) {
			if (popup) {
				this.map.closePopup(popup);
			}
		}.bind(this),

		/**
		 * Increment count on busy manager to show load icon.
		 */
		addBusy: function() {
			busyManager.addBusy();
		},

		/**
		 * Decrement busy manager count and if it reaches zero, load icon will be removed.
		 */
		removeBusy: function() {
			busyManager.removeBusy();
		},

		/**
		 * Is busymanager currently shows busy?
		 * @returns {*}
     */
		isBusyLoading: function() {
			return busyManager.isBusyLoading();
		},

		/**
		 * check if a layer really is valid for a region.
		 */
		layerValidForRegion: _.memoize(function(layerWeather) {
			var layerRuleSets = mapLayerRules[layerWeather.layerKey];

			return !!context.location && !_.isEmpty(layerRuleSets) && !_.isEmpty(context.location.data) && _.any(layerRuleSets, function(idx, ruleSet) {
				return _.every(ruleSet, function(pattern, key) {
					return locationData[key].match(pattern);
				});
			});
		}),

		fullScreenMap: false,
		smallScreen: (pcoPage.getScreenSize() === 'mobileSized'),
		mapboxInfoShow: false
	});

	// Requirement: WEB-3114
	// send odc metrics on ad nav slide. The problem is, right nav is outside the map scope and cannot
	// share map object in a factory because of singleton problem.
	customEvent.getEvent("right-rail-collapsed").progress(function() {
		customEvent.getEvent("track-string-event").notify({
			trackStr: ('imap_hiderightrail_' + context.getViewLayerKeyStackWeatherStr()),
			module_id: context.getModuleId()
		});
	});
	// Requirement: WEB-3114
	// send odc metrics on opening ad nav slide.
	customEvent.getEvent("right-rail-expanded").progress(function() {
		customEvent.getEvent("track-string-event").notify({
			trackStr: ('imap_openrightrail_' + context.getViewLayerKeyStackWeatherStr()),
			module_id: context.getModuleId()
		});
	});

	// send metrics for one off events of map
	context.onReady(function() {
		context.onPan(function() {
			customEvent.getEvent("track-string-event").notify({
				trackStr: ('imap_pan_' + context.getViewLayerKeyStackWeatherStr()),
				module_id: context.getModuleId()
			});
		});
	});
}]);
;
/**
 * User: Velu
 * Date: 10/12/2015
 * Time: 10:14 PM
 * PangeaMap directive to load the map.
 */
twc.shared.apps.directive('pMap', ['twcUtil', '$q', '$templateCache', '$filter', 'throttler', 'customEvent', '$modal', 'customEvent',
  function(twcUtil, $q, $templateCache, $filter, throttler, ce, $modal, customEvent) {

    function link(scope, element, attrs, MapAPI) {
      // create map
      var _ = twcUtil;
      var mapContainer = element.find('.map-container');

      MapAPI.setStorageKey(attrs.storageKey);
      MapAPI.loadMap(mapContainer[0], {maximumZoomLevel: 13}, attrs.baseMap);
      MapAPI.enableZooming(!(attrs.enableZoom && attrs.enableZoom === "false"));
      MapAPI.enableDragging(!(attrs.enableDrag && attrs.enableDrag === "false"));
      if( parseInt(attrs.zoomLevel) ) {
          MapAPI.setZoomLevel(parseInt(attrs.zoomLevel));
      }
      mapContainer.css('width', '100%');
      mapContainer.css('height', '100%');

      throttler.onResize(function() {
        MapAPI.resize();
      });

      customEvent.getEvent("right-rail-collapsed").progress(function(){
        setTimeout(function(){
          MapAPI.resize();
        },250);
      });

      if( attrs.forceReloadOnTimeout ) {
        MapAPI.onInteractionTimeout(_.once(function() {
          var _$modalScope = scope.$new();
          $modal.open({
            templateUrl: '/sites/all/modules/custom/angularmods/app/shared/p_map/templates/p_map_timedout.html',
            scope: _$modalScope,
            windowClass: 'map-modal-content',
            keyboard: false,
            backdrop: 'static'
          });
          _$modalScope.doUpdate = function() {
            ce.getEvent('from-string-event').notify({
              scope: scope,
              fromStr: 'expireRefresh_1'
            });
            location.reload(true);
          };
        }));
      }

      MapAPI.resize();
    }

    return {
      controller: 'PMapController',
      controllerAs: 'pMap',
      compile: function() {
        return {
          pre: link
        };
      },
      restrict: 'AE'
    };
  }]);
;
twc.shared.apps.factory('pMapUtil', ['pcoUser', function (pcoUser) {

    function pad(val, type) {
        var ret = val + "";
        var padding = "00";
        if(type === 'utc_millis') {
            padding = "000";
        }
        return (padding + ret).slice(-padding.length);
    }

    return {
      getLegendPath: function (legend) {
        return (legend && ('/sites/all/modules/custom/angularmods/app/shared/p_map_legend/images-2016-3-29/legend-' + legend.toLowerCase() + '-' + ((pcoUser.getTempUnit().toUpperCase() === 'F') ? 'imperial' : 'metric') + '.svg').replace(/-+/g, '-'));
      },
      validTimeToLocalTimeIso: function(validTime, twcTimezoneOffset) {
          if( validTime ) {
              var timezoneOffsetMillis = (parseFloat(twcTimezoneOffset) || 0.0) * 60 * 60 * 1000;
              var localTimeIso = new Date();
                localTimeIso.setTime(wx.dateTime.toUtc(validTime.value).getTime() + timezoneOffsetMillis);
              return localTimeIso.getUTCFullYear() + '-' +
                  pad(localTimeIso.getUTCMonth()+1, 'date') + '-' +
                  pad(localTimeIso.getUTCDate(), 'date') + 'T' +
                  pad(localTimeIso.getUTCHours(), 'utc_hours') + ':' +
                  pad(localTimeIso.getUTCMinutes(), 'time') + ':' +
                  pad(localTimeIso.getUTCSeconds(), 'time') + '.' +
                  pad(localTimeIso.getUTCMilliseconds(), 'utc_millis') + 'Z';
          }
          return '';
      }
    };
}]);
;
/**
 * User: Crystal Gardner
 * Date: 10/9/2015
 * Time: 12:58
 */
/* global twc */
/*jshint -W065 */
/* App Module */

angular
  .module('gm_lifestyle_teaser', ['ngSanitize']);
;
/**
 * User: jonathan.mcsweet
 * Date: 7/1/2015
 * Time: 16:0
 */
/* global twc */
/*jshint -W065 */

twc.shared.apps.directive('glomoWeekendProject',
  ['glomo_weekend_project',
    function glomoWeekendProject(glomo_weekend_project) {
      'use strict';
      var dir = this,
          rootUrl = '/sites/all/modules/glomo/shared/glomo_weekend_project/templates/';

      var returnable = {
        restrict: 'A',
        scope: {
          trigger: '=',
          selectContent: '=',
          moduleSettings: '=',
          tileLayout: '='
        },
        templateUrl: function($elem, $attr){
          return rootUrl + $attr.glomoWeekendProject + '.html';
        }
      };

      return returnable; //easier to step through code in browser using this pattern


    }]);;
/**
 * User: jonathan.mcsweet
 * Date: 7/1/2015
 * Time: 16:0
 */
/* global twc */
/*jshint -W065*/
/*jshint -W026*/

twc.shared.apps.factory('glomo_weekend_project',
  ['dsxclient', '$http', 'datefactory','twcUtil','home_depot_wfx_map', 'ActionTracker',
    function(dsxclient, $http, datefactory, _, home_depot_wfx_map, ActionTracker) {
      'use strict';

      var priv = {
        impressionThrown: false
      };

      var fns = {
        /**
         * function getData(locId)
         *
         * @param  {[string]} locId [locId string from PCO]
         * @return {[promise]}       [return dsx promise to use in controller]
         */
        getData: function(locId) {
          var config = [
            {$id : "csModel" ,recordType : "cs", recordName : "datetime", fullLocId : locId},
            {$id : 'locData', recordType: "wxd", recordName: "loc", fullLocId: locId}
          ];

          return dsxclient.execute(config);
        },

        /**
         * function getTriggersPromise(daysForward, locData) {
         *
         * Gives you a promise for when the triggers call returns
         *
         * @param daysForward
         * @param locData
         * @returns {HttpPromise}
         */
        getTriggersPromise: function(daysForward, locData) {
          var vars = {

            triggersURL: '//triggers1.wfxtriggers.com/json/',

            triggersParams: {
              resp_type: 'json',
              df: daysForward,
              callback: 'JSON_CALLBACK',
              loc: "US_4_" + locData.getZipCode()
            }

          };

          return $http.jsonp(vars.triggersURL, {params: vars.triggersParams} );
        },


        /**
         * function getToday(csModel)
         *
         * @param csModel
         * @returns {*}
         */
        getToday: function (csModel) {
          return datefactory['new']( csModel.getDateTimeISO(), csModel.getTimeZoneAbbr() );
        },


        /**
         * function getDaysForward(today)
         *
         * @param today
         * @returns {*}
         */
        getDaysForward: function (today) {
          var forward;

          if (today) {
            forward = today.toDateObject().getDay() < 6 ? (6 - today.toDateObject().getDay()) : 0;
          }

          return forward;
        },


        /**
         * function getDateForward(daysForward, today)
         *
         * @param daysForward
         * @param today
         * @returns {*}
         */
        getDateForward: function (daysForward, today) {
          var forwardDate;

          if (daysForward && today) {
            var today2 = new Date(today.year, (today.month - 1), (today.day + daysForward));
            var month2 = (today2.getMonth() + 1);
            var adjustedDay = today2.getDate();
            var adjustedMonth = month2 < 10 ? '0' + month2 : month2; // Ugh remove this at some point when someone actually cares to upgrade UnderscoreJS
            adjustedDay = adjustedDay < 10 ? '0' + adjustedDay : adjustedDay;
            forwardDate = today.year.toString() + adjustedMonth + adjustedDay;
          }

          return forwardDate;
        },

        /**
         * function selectTriggerDate (dateForward, triggers)
         * @param dateForward
         * @param triggers
         * @returns {*|Rx.Observable<T>|Mixed|Observable}
         */
        selectTriggerDate: function (dateForward, triggers) {
          var hd = home_depot_wfx_map, final;

          var triggersNotEmpty = function(doesObjExist){
            return (triggers.wfxtg.dailyForecast[0].trigger.length !== 0 && doesObjExist);
          };

          var fallback = fns.findFirstIndoorTrigger(hd["default"]);

          if(triggersNotEmpty(hd[dateForward])){
            final = fns.findTrigger(hd[dateForward], triggers);
          }
          else if ( triggersNotEmpty(hd["default"]) ) {
            final = fns.findTrigger(hd["default"], triggers);
          }
          else {
            final = fallback;
          }

          return final || fallback;
        },

        /**
         * function projectDays (dayObj)
         *
         * Maps days value from drupal checkboxes to equivalent days index from javascript .getDay() method
         *
         * @param  {[date]}   dayObj    [the name says it all]
         * @return {[array]}            [returns index numbers for days of week that the project tab will show]
         */
        projectDays: function (dayObj) {
          var days = { "Sun": 0, "Mon": 1, "Tues": 2, "Wed": 3, "Thurs": 4, "Fri": 5,  "Sat": 6 };
          return _(dayObj).map(function(day) {
            return days[day];
          });
        },

        trackImpressions: function(triggerId, currentLoc) {
          var attrs;

          if(priv.impressionThrown === false){
            attrs = {
              linkTrackVars: 'events,eVar72,eVar73,prop17',
              linkTrackEvents: 'event60',
              events: 'event60',
              eVar72: triggerId,
              eVar73: currentLoc,
              prop17: "hd weekend project",
              trackStr: "hd_weekend_project"
            };

            priv.impressionThrown = true;
            ActionTracker.track(null, null, attrs);

            return 1; //beacuse it's easy to test
          }

          return 0; //because it's easy to test
        },

        findTrigger: function(triggerObj, triggers) {
          var selected = _(triggerObj)
            .chain()
            .find(function(item){
              var trigger = _(triggers.wfxtg.dailyForecast[0].trigger).find(function(triggerNum){
                return item.id === triggerNum;
              });

              return trigger;
            })
            .value();

          return selected;
        },

        findFirstIndoorTrigger: function(triggerObj){
          var selected =
            _(triggerObj)
              .find(function(item){
                return item.outdoor === false;
              });

          return selected;
        }

      };

      return fns;

}]);;
/**
 * User: jonathan.mcsweet
 * Date: 7/1/2015
 * Time: 16:0
 */
/* global twc */
/*jshint -W065 */

twc.shared.apps.factory('home_depot_wfx_map', [function(){

    return {
      "20160116": [{
        "outdoor": true,
        "phrase": "Protect Your Home From Harsh Winter Weather",
        "shortPhrase": "Protect Your Home",
        "id": 758,
        "trigger": "Enterprise_THD2015_THD125",
        "url": "/home-garden/home/news/protect-home-winter-weather",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/coldhomeprep.jpg",
        "duration": "2-4 Hour"
      }, {
        "outdoor": false,
        "phrase": "Lower Your Electric Bills With Winter Weather Tips",
        "shortPhrase": "Lower Your Electric Bills",
        "id": 768,
        "trigger": "Enterprise_THD2015_THD135",
        "url": "/home-garden/home/news/lower-electric-bill-home-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/winterweatherization.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 Hours"
      }, {
        "outdoor": true,
        "phrase": "Upgrade your outdoor living with a fresh coat of paint",
        "shortPhrase": "Update With Paint",
        "id": 707,
        "trigger": "PAINT_EXTERIOR PAINT",
        "url": "/home-garden/home/news/outdoor-furniture-exterior-paint",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/exteriorpaintstep02_0.jpg?api=7db9fe61-7414-47b5-9871-e17d87b8b6a0&h=720&w=1280&v=at",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Fertilize Your Lawn for Fall",
        "shortPhrase": "Fertilize for Fall",
        "id": 739,
        "trigger": "Enterprise_THD2015_THD122 - Fall Fertilizer",
        "url": "/home-garden/home/news/fall-fertilizer-20120912",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/fallfertilizer_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "How to create privacy in your backyard",
        "shortPhrase": "Create Backyard Privacy",
        "id": 708,
        "trigger": "GRD/OUTDOOR_LAWN ACCESSORIES",
        "url": "/home-garden/home/news/backyard-privacy-screen",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/HOME2_1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Get Festive With Outdoor Holiday Decorations",
        "shortPhrase": "Get Festive With Holiday Decor",
        "id": 779,
        "trigger": "Enterprise_THD2015_THD146",
        "url": "/home-garden/home/news/outdoor-holiday-decoration",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/outdoorholidaydecor.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Build a \"Cooler\" Picnic Table",
        "shortPhrase": "Reinvent your table",
        "id": 560,
        "trigger": "GRD/INDOOR_PATIO FURNITURE_STACK AND FOLD",
        "url": "/home-garden/home/news/how-make-cooler-picnic-table-20140606#/1",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/4564d8f5-77b0-4dc0-a947-1d1faa13daf4.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "What you need to do to prepare for Fall",
        "shortPhrase": "Get Ready for Fall",
        "id": 777,
        "trigger": "Enterprise_THD2015_THD144",
        "url": "/home-garden/home/news/home-care-fall",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/homesafefall.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hour"
      }, {
        "outdoor": false,
        "phrase": "Upgrade your Walls with Magnetic Paint",
        "shortPhrase": "Upgrade with paint",
        "id": 569,
        "trigger": "PAINT_INTERIOR PAINT_EGGSHELL",
        "url": "/home-garden/home/news/magnetic-paint-project-20130626",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/cc926dda-c8c5-4a00-8e32-9f9364858296.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Build ambience in your backyard with a fire pit",
        "shortPhrase": "Entertain With a Fire Pit",
        "id": 709,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_2",
        "url": "/home-garden/home/news/entertain-outdoors-fire-pit",
        "difficulty": "Advanced",
        "photoUrl": "//dsx.weather.com/util/image/w/firepitpromo02.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Decorate with Pre-Made Containers",
        "shortPhrase": "Decorate with containers",
        "id": 565,
        "trigger": "GRD/OUTDOOR_PLANTERS_PLASTIC",
        "url": "/home-garden/home/news/creating-space-containers-20120921",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/04a93cc3-a138-480e-8258-27ba0dfa6087.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": false,
        "phrase": "Give Your Ceiling Some Pizzaz with Metallic Paint",
        "shortPhrase": "Revive your ceiling",
        "id": 568,
        "trigger": "PAINT_INTERIOR PAINT_CEILING PAINT",
        "url": "/home-garden/home/news/how-paint-metallic-ceiling-20141013",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/329e4591-f05c-4b8d-9129-55ebf9260d24.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": false,
        "phrase": "How to install a new ceiling fan",
        "shortPhrase": "Cool Your Home",
        "id": 705,
        "trigger": "LIGHTING_CEILING FANS",
        "url": "/home-garden/home/news/ceiling-fan-installation",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/ceilingfanstep03.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": true,
        "phrase": "Keep your family safe from a house fire",
        "shortPhrase": "Keep Your Family Safe",
        "id": 775,
        "trigger": "Enterprise_THD2015_THD142",
        "url": "/home-garden/home/news/fire-home-safety-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/firehomesafety.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": false,
        "phrase": "Add Glamour with Bathroom Wall Stripes",
        "shortPhrase": "Spruce up with wall stripes",
        "id": 571,
        "trigger": "WALL/FLOOR COVERING_TILE SET MATERIALS/TOOLS_ADHESIVES",
        "url": "/home-garden/home/news/creating-bathroom-wall-stripes-20120815",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/728c166d-376d-4808-bcfd-8edf8f93f9e1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Find the Right Plants for Fall",
        "shortPhrase": "Plant for Fall",
        "id": 740,
        "trigger": "Enterprise_THD2015_THD123 - Fall Planting",
        "url": "/home-garden/home/news/fall-planting-20120919",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/plantforfall_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Spruce up your backyard with a raised bed salsa garden",
        "shortPhrase": "Make a salsa garden",
        "id": 564,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_VEGETABLES AND HERBS",
        "url": "/home-garden/home/news/how-make-raised-bed-salsa-garden-20140527#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/fee0733d-d178-4db6-a056-e05d00e57d7e.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Install a Soft Path",
        "shortPhrase": "Install a Soft Path",
        "id": 566,
        "trigger": "GRD/OUTDOOR_SOILS AND MULCH_BARKS & MULCHES",
        "url": "/home-garden/home/news/install-soft-path-20120711",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/6d8af8c3-41b1-48f6-9627-15a3c8a7bae4.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Plant a Mailbox Garden",
        "shortPhrase": "Revamp your mailbox",
        "id": 563,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_ANNUALS",
        "url": "/home-garden/home/news/mailbox-gardens-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/8783c8f2-6d67-4cdd-89e3-545ca7432a3c.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Up Your Curb Appeal with Tree Rings",
        "shortPhrase": "Beautify your tree rings",
        "id": 561,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_CONCRETE EDGING",
        "url": "/home-garden/home/news/install-tree-ring-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/ed12ff34-140c-47b1-82cd-e62031e3e461.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Give your deck a facelift",
        "shortPhrase": "Makeover your deck",
        "id": 567,
        "trigger": "PAINT_EXT STAINS/WATERSEALERS_DECK/TONERS",
        "url": "/home-garden/home/news/how-make-over-your-wood-deck-20140709#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/06fd669e-7991-4982-9fe0-262ed6c09df7.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Install a Paver Path",
        "shortPhrase": "Install a Paver Path",
        "id": 562,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_PAVERS",
        "url": "/home-garden/home/news/paver-path-20130405",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/paver-path.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Organize Your Home With Storage Solutions",
        "shortPhrase": "Organize Your Home",
        "id": 690,
        "trigger": "Enterprise_THD2015_THD90",
        "url": "/home-garden/home/news/home-organization-storage",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/storagevideoprimary.jpg",
        "duration": "One Weekend"
      }],
      "20160123": [{
        "outdoor": true,
        "phrase": "Organize Your Home With Storage Solutions",
        "shortPhrase": "Organize Your Home",
        "id": 690,
        "trigger": "Enterprise_THD2015_THD90",
        "url": "/home-garden/home/news/home-organization-storage",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/storagevideoprimary.jpg",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Build a \"Cooler\" Picnic Table",
        "shortPhrase": "Reinvent your table",
        "id": 560,
        "trigger": "GRD/INDOOR_PATIO FURNITURE_STACK AND FOLD",
        "url": "/home-garden/home/news/how-make-cooler-picnic-table-20140606#/1",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/4564d8f5-77b0-4dc0-a947-1d1faa13daf4.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "How to create privacy in your backyard",
        "shortPhrase": "Create Backyard Privacy",
        "id": 708,
        "trigger": "GRD/OUTDOOR_LAWN ACCESSORIES",
        "url": "/home-garden/home/news/backyard-privacy-screen",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/HOME2_1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Plant a Mailbox Garden",
        "shortPhrase": "Revamp your mailbox",
        "id": 563,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_ANNUALS",
        "url": "/home-garden/home/news/mailbox-gardens-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/8783c8f2-6d67-4cdd-89e3-545ca7432a3c.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "What you need to do to prepare for Fall",
        "shortPhrase": "Get Ready for Fall",
        "id": 777,
        "trigger": "Enterprise_THD2015_THD144",
        "url": "/home-garden/home/news/home-care-fall",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/homesafefall.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hour"
      }, {
        "outdoor": true,
        "phrase": "Get Festive With Outdoor Holiday Decorations",
        "shortPhrase": "Get Festive With Holiday Decor",
        "id": 779,
        "trigger": "Enterprise_THD2015_THD146",
        "url": "/home-garden/home/news/outdoor-holiday-decoration",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/outdoorholidaydecor.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Spruce up your backyard with a raised bed salsa garden",
        "shortPhrase": "Make a salsa garden",
        "id": 564,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_VEGETABLES AND HERBS",
        "url": "/home-garden/home/news/how-make-raised-bed-salsa-garden-20140527#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/fee0733d-d178-4db6-a056-e05d00e57d7e.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Up Your Curb Appeal with Tree Rings",
        "shortPhrase": "Beautify your tree rings",
        "id": 561,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_CONCRETE EDGING",
        "url": "/home-garden/home/news/install-tree-ring-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/ed12ff34-140c-47b1-82cd-e62031e3e461.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Give your deck a facelift",
        "shortPhrase": "Makeover your deck",
        "id": 567,
        "trigger": "PAINT_EXT STAINS/WATERSEALERS_DECK/TONERS",
        "url": "/home-garden/home/news/how-make-over-your-wood-deck-20140709#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/06fd669e-7991-4982-9fe0-262ed6c09df7.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": false,
        "phrase": "Give Your Ceiling Some Pizzaz with Metallic Paint",
        "shortPhrase": "Revive your ceiling",
        "id": 568,
        "trigger": "PAINT_INTERIOR PAINT_CEILING PAINT",
        "url": "/home-garden/home/news/how-paint-metallic-ceiling-20141013",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/329e4591-f05c-4b8d-9129-55ebf9260d24.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Upgrade your outdoor living with a fresh coat of paint",
        "shortPhrase": "Update With Paint",
        "id": 707,
        "trigger": "PAINT_EXTERIOR PAINT",
        "url": "/home-garden/home/news/outdoor-furniture-exterior-paint",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/exteriorpaintstep02_0.jpg?api=7db9fe61-7414-47b5-9871-e17d87b8b6a0&h=720&w=1280&v=at",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Keep your family safe from a house fire",
        "shortPhrase": "Keep Your Family Safe",
        "id": 775,
        "trigger": "Enterprise_THD2015_THD142",
        "url": "/home-garden/home/news/fire-home-safety-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/firehomesafety.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": true,
        "phrase": "Protect Your Home From Harsh Winter Weather",
        "shortPhrase": "Protect Your Home",
        "id": 758,
        "trigger": "Enterprise_THD2015_THD125",
        "url": "/home-garden/home/news/protect-home-winter-weather",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/coldhomeprep.jpg",
        "duration": "2-4 Hour"
      }, {
        "outdoor": true,
        "phrase": "Decorate with Pre-Made Containers",
        "shortPhrase": "Decorate with containers",
        "id": 565,
        "trigger": "GRD/OUTDOOR_PLANTERS_PLASTIC",
        "url": "/home-garden/home/news/creating-space-containers-20120921",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/04a93cc3-a138-480e-8258-27ba0dfa6087.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": false,
        "phrase": "How to install a new ceiling fan",
        "shortPhrase": "Cool Your Home",
        "id": 705,
        "trigger": "LIGHTING_CEILING FANS",
        "url": "/home-garden/home/news/ceiling-fan-installation",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/ceilingfanstep03.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": true,
        "phrase": "Organize Your Home With Storage Solutions",
        "shortPhrase": "Organize Your Home",
        "id": 690,
        "trigger": "Enterprise_THD2015_THD90",
        "url": "/home-garden/home/news/home-organization-storage",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/storagevideoprimary.jpg",
        "duration": "One Weekend"
      }, {
        "outdoor": true,
        "phrase": "Install a Paver Path",
        "shortPhrase": "Install a Paver Path",
        "id": 562,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_PAVERS",
        "url": "/home-garden/home/news/paver-path-20130405",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/paver-path.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Build ambience in your backyard with a fire pit",
        "shortPhrase": "Entertain With a Fire Pit",
        "id": 709,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_2",
        "url": "/home-garden/home/news/entertain-outdoors-fire-pit",
        "difficulty": "Advanced",
        "photoUrl": "//dsx.weather.com/util/image/w/firepitpromo02.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": false,
        "phrase": "Upgrade your Walls with Magnetic Paint",
        "shortPhrase": "Upgrade with paint",
        "id": 569,
        "trigger": "PAINT_INTERIOR PAINT_EGGSHELL",
        "url": "/home-garden/home/news/magnetic-paint-project-20130626",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/cc926dda-c8c5-4a00-8e32-9f9364858296.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Install a Soft Path",
        "shortPhrase": "Install a Soft Path",
        "id": 566,
        "trigger": "GRD/OUTDOOR_SOILS AND MULCH_BARKS & MULCHES",
        "url": "/home-garden/home/news/install-soft-path-20120711",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/6d8af8c3-41b1-48f6-9627-15a3c8a7bae4.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": false,
        "phrase": "Add Glamour with Bathroom Wall Stripes",
        "shortPhrase": "Spruce up with wall stripes",
        "id": 571,
        "trigger": "WALL/FLOOR COVERING_TILE SET MATERIALS/TOOLS_ADHESIVES",
        "url": "/home-garden/home/news/creating-bathroom-wall-stripes-20120815",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/728c166d-376d-4808-bcfd-8edf8f93f9e1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Fertilize Your Lawn for Fall",
        "shortPhrase": "Fertilize for Fall",
        "id": 739,
        "trigger": "Enterprise_THD2015_THD122 - Fall Fertilizer",
        "url": "/home-garden/home/news/fall-fertilizer-20120912",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/fallfertilizer_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Find the Right Plants for Fall",
        "shortPhrase": "Plant for Fall",
        "id": 740,
        "trigger": "Enterprise_THD2015_THD123 - Fall Planting",
        "url": "/home-garden/home/news/fall-planting-20120919",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/plantforfall_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": false,
        "phrase": "Lower Your Electric Bills With Winter Weather Tips",
        "shortPhrase": "Lower Your Electric Bills",
        "id": 768,
        "trigger": "Enterprise_THD2015_THD135",
        "url": "/home-garden/home/news/lower-electric-bill-home-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/winterweatherization.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 Hours"
      }],
      "20160130": [{
        "outdoor": true,
        "phrase": "Build ambience in your backyard with a fire pit",
        "shortPhrase": "Entertain With a Fire Pit",
        "id": 709,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_2",
        "url": "/home-garden/home/news/entertain-outdoors-fire-pit",
        "difficulty": "Advanced",
        "photoUrl": "//dsx.weather.com/util/image/w/firepitpromo02.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Plant a Mailbox Garden",
        "shortPhrase": "Revamp your mailbox",
        "id": 563,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_ANNUALS",
        "url": "/home-garden/home/news/mailbox-gardens-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/8783c8f2-6d67-4cdd-89e3-545ca7432a3c.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Protect Your Home From Harsh Winter Weather",
        "shortPhrase": "Protect Your Home",
        "id": 758,
        "trigger": "Enterprise_THD2015_THD125",
        "url": "/home-garden/home/news/protect-home-winter-weather",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/coldhomeprep.jpg",
        "duration": "2-4 Hour"
      }, {
        "outdoor": true,
        "phrase": "How to create privacy in your backyard",
        "shortPhrase": "Create Backyard Privacy",
        "id": 708,
        "trigger": "GRD/OUTDOOR_LAWN ACCESSORIES",
        "url": "/home-garden/home/news/backyard-privacy-screen",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/HOME2_1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Fertilize Your Lawn for Fall",
        "shortPhrase": "Fertilize for Fall",
        "id": 739,
        "trigger": "Enterprise_THD2015_THD122 - Fall Fertilizer",
        "url": "/home-garden/home/news/fall-fertilizer-20120912",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/fallfertilizer_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": false,
        "phrase": "How to install a new ceiling fan",
        "shortPhrase": "Cool Your Home",
        "id": 705,
        "trigger": "LIGHTING_CEILING FANS",
        "url": "/home-garden/home/news/ceiling-fan-installation",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/ceilingfanstep03.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": false,
        "phrase": "Give Your Ceiling Some Pizzaz with Metallic Paint",
        "shortPhrase": "Revive your ceiling",
        "id": 568,
        "trigger": "PAINT_INTERIOR PAINT_CEILING PAINT",
        "url": "/home-garden/home/news/how-paint-metallic-ceiling-20141013",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/329e4591-f05c-4b8d-9129-55ebf9260d24.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": false,
        "phrase": "Lower Your Electric Bills With Winter Weather Tips",
        "shortPhrase": "Lower Your Electric Bills",
        "id": 768,
        "trigger": "Enterprise_THD2015_THD135",
        "url": "/home-garden/home/news/lower-electric-bill-home-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/winterweatherization.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 Hours"
      }, {
        "outdoor": true,
        "phrase": "Spruce up your backyard with a raised bed salsa garden",
        "shortPhrase": "Make a salsa garden",
        "id": 564,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_VEGETABLES AND HERBS",
        "url": "/home-garden/home/news/how-make-raised-bed-salsa-garden-20140527#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/fee0733d-d178-4db6-a056-e05d00e57d7e.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Install a Soft Path",
        "shortPhrase": "Install a Soft Path",
        "id": 566,
        "trigger": "GRD/OUTDOOR_SOILS AND MULCH_BARKS & MULCHES",
        "url": "/home-garden/home/news/install-soft-path-20120711",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/6d8af8c3-41b1-48f6-9627-15a3c8a7bae4.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Get Festive With Outdoor Holiday Decorations",
        "shortPhrase": "Get Festive With Holiday Decor",
        "id": 779,
        "trigger": "Enterprise_THD2015_THD146",
        "url": "/home-garden/home/news/outdoor-holiday-decoration",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/outdoorholidaydecor.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Install a Paver Path",
        "shortPhrase": "Install a Paver Path",
        "id": 562,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_PAVERS",
        "url": "/home-garden/home/news/paver-path-20130405",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/paver-path.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Organize Your Home With Storage Solutions",
        "shortPhrase": "Organize Your Home",
        "id": 690,
        "trigger": "Enterprise_THD2015_THD90",
        "url": "/home-garden/home/news/home-organization-storage",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/storagevideoprimary.jpg",
        "duration": "One Weekend"
      }, {
        "outdoor": true,
        "phrase": "Build a \"Cooler\" Picnic Table",
        "shortPhrase": "Reinvent your table",
        "id": 560,
        "trigger": "GRD/INDOOR_PATIO FURNITURE_STACK AND FOLD",
        "url": "/home-garden/home/news/how-make-cooler-picnic-table-20140606#/1",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/4564d8f5-77b0-4dc0-a947-1d1faa13daf4.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "What you need to do to prepare for Fall",
        "shortPhrase": "Get Ready for Fall",
        "id": 777,
        "trigger": "Enterprise_THD2015_THD144",
        "url": "/home-garden/home/news/home-care-fall",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/homesafefall.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hour"
      }, {
        "outdoor": true,
        "phrase": "Upgrade your outdoor living with a fresh coat of paint",
        "shortPhrase": "Update With Paint",
        "id": 707,
        "trigger": "PAINT_EXTERIOR PAINT",
        "url": "/home-garden/home/news/outdoor-furniture-exterior-paint",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/exteriorpaintstep02_0.jpg?api=7db9fe61-7414-47b5-9871-e17d87b8b6a0&h=720&w=1280&v=at",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Give your deck a facelift",
        "shortPhrase": "Makeover your deck",
        "id": 567,
        "trigger": "PAINT_EXT STAINS/WATERSEALERS_DECK/TONERS",
        "url": "/home-garden/home/news/how-make-over-your-wood-deck-20140709#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/06fd669e-7991-4982-9fe0-262ed6c09df7.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Keep your family safe from a house fire",
        "shortPhrase": "Keep Your Family Safe",
        "id": 775,
        "trigger": "Enterprise_THD2015_THD142",
        "url": "/home-garden/home/news/fire-home-safety-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/firehomesafety.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": true,
        "phrase": "Up Your Curb Appeal with Tree Rings",
        "shortPhrase": "Beautify your tree rings",
        "id": 561,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_CONCRETE EDGING",
        "url": "/home-garden/home/news/install-tree-ring-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/ed12ff34-140c-47b1-82cd-e62031e3e461.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Find the Right Plants for Fall",
        "shortPhrase": "Plant for Fall",
        "id": 740,
        "trigger": "Enterprise_THD2015_THD123 - Fall Planting",
        "url": "/home-garden/home/news/fall-planting-20120919",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/plantforfall_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": false,
        "phrase": "Upgrade your Walls with Magnetic Paint",
        "shortPhrase": "Upgrade with paint",
        "id": 569,
        "trigger": "PAINT_INTERIOR PAINT_EGGSHELL",
        "url": "/home-garden/home/news/magnetic-paint-project-20130626",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/cc926dda-c8c5-4a00-8e32-9f9364858296.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Decorate with Pre-Made Containers",
        "shortPhrase": "Decorate with containers",
        "id": 565,
        "trigger": "GRD/OUTDOOR_PLANTERS_PLASTIC",
        "url": "/home-garden/home/news/creating-space-containers-20120921",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/04a93cc3-a138-480e-8258-27ba0dfa6087.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": false,
        "phrase": "Add Glamour with Bathroom Wall Stripes",
        "shortPhrase": "Spruce up with wall stripes",
        "id": 571,
        "trigger": "WALL/FLOOR COVERING_TILE SET MATERIALS/TOOLS_ADHESIVES",
        "url": "/home-garden/home/news/creating-bathroom-wall-stripes-20120815",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/728c166d-376d-4808-bcfd-8edf8f93f9e1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }],
      "default": [{
        "outdoor": true,
        "phrase": "What you need to do to prepare for Fall",
        "shortPhrase": "Get Ready for Fall",
        "id": 777,
        "trigger": "Enterprise_THD2015_THD144",
        "url": "/home-garden/home/news/home-care-fall",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/homesafefall.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hour"
      }, {
        "outdoor": false,
        "phrase": "Add Glamour with Bathroom Wall Stripes",
        "shortPhrase": "Spruce up with wall stripes",
        "id": 571,
        "trigger": "WALL/FLOOR COVERING_TILE SET MATERIALS/TOOLS_ADHESIVES",
        "url": "/home-garden/home/news/creating-bathroom-wall-stripes-20120815",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/728c166d-376d-4808-bcfd-8edf8f93f9e1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": false,
        "phrase": "How to install a new ceiling fan",
        "shortPhrase": "Cool Your Home",
        "id": 705,
        "trigger": "LIGHTING_CEILING FANS",
        "url": "/home-garden/home/news/ceiling-fan-installation",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/ceilingfanstep03.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": false,
        "phrase": "Lower Your Electric Bills With Winter Weather Tips",
        "shortPhrase": "Lower Your Electric Bills",
        "id": 768,
        "trigger": "Enterprise_THD2015_THD135",
        "url": "/home-garden/home/news/lower-electric-bill-home-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/winterweatherization.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 Hours"
      }, {
        "outdoor": true,
        "phrase": "Install a Soft Path",
        "shortPhrase": "Install a Soft Path",
        "id": 566,
        "trigger": "GRD/OUTDOOR_SOILS AND MULCH_BARKS & MULCHES",
        "url": "/home-garden/home/news/install-soft-path-20120711",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/6d8af8c3-41b1-48f6-9627-15a3c8a7bae4.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Build a \"Cooler\" Picnic Table",
        "shortPhrase": "Reinvent your table",
        "id": 560,
        "trigger": "GRD/INDOOR_PATIO FURNITURE_STACK AND FOLD",
        "url": "/home-garden/home/news/how-make-cooler-picnic-table-20140606#/1",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/4564d8f5-77b0-4dc0-a947-1d1faa13daf4.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Build ambience in your backyard with a fire pit",
        "shortPhrase": "Entertain With a Fire Pit",
        "id": 709,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_2",
        "url": "/home-garden/home/news/entertain-outdoors-fire-pit",
        "difficulty": "Advanced",
        "photoUrl": "//dsx.weather.com/util/image/w/firepitpromo02.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Keep your family safe from a house fire",
        "shortPhrase": "Keep Your Family Safe",
        "id": 775,
        "trigger": "Enterprise_THD2015_THD142",
        "url": "/home-garden/home/news/fire-home-safety-tips",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/firehomesafety.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 hour"
      }, {
        "outdoor": true,
        "phrase": "Protect Your Home From Harsh Winter Weather",
        "shortPhrase": "Protect Your Home",
        "id": 758,
        "trigger": "Enterprise_THD2015_THD125",
        "url": "/home-garden/home/news/protect-home-winter-weather",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/coldhomeprep.jpg",
        "duration": "2-4 Hour"
      }, {
        "outdoor": true,
        "phrase": "Plant a Mailbox Garden",
        "shortPhrase": "Revamp your mailbox",
        "id": 563,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_ANNUALS",
        "url": "/home-garden/home/news/mailbox-gardens-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/8783c8f2-6d67-4cdd-89e3-545ca7432a3c.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Install a Paver Path",
        "shortPhrase": "Install a Paver Path",
        "id": 562,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_PAVERS",
        "url": "/home-garden/home/news/paver-path-20130405",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/paver-path.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": false,
        "phrase": "Give Your Ceiling Some Pizzaz with Metallic Paint",
        "shortPhrase": "Revive your ceiling",
        "id": 568,
        "trigger": "PAINT_INTERIOR PAINT_CEILING PAINT",
        "url": "/home-garden/home/news/how-paint-metallic-ceiling-20141013",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/329e4591-f05c-4b8d-9129-55ebf9260d24.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Give your deck a facelift",
        "shortPhrase": "Makeover your deck",
        "id": 567,
        "trigger": "PAINT_EXT STAINS/WATERSEALERS_DECK/TONERS",
        "url": "/home-garden/home/news/how-make-over-your-wood-deck-20140709#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/06fd669e-7991-4982-9fe0-262ed6c09df7.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": false,
        "phrase": "Upgrade your Walls with Magnetic Paint",
        "shortPhrase": "Upgrade with paint",
        "id": 569,
        "trigger": "PAINT_INTERIOR PAINT_EGGSHELL",
        "url": "/home-garden/home/news/magnetic-paint-project-20130626",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/cc926dda-c8c5-4a00-8e32-9f9364858296.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Up Your Curb Appeal with Tree Rings",
        "shortPhrase": "Beautify your tree rings",
        "id": 561,
        "trigger": "GRD/OUTDOOR_HARDSCAPES_CONCRETE EDGING",
        "url": "/home-garden/home/news/install-tree-ring-20121001",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/ed12ff34-140c-47b1-82cd-e62031e3e461.png?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "How to create privacy in your backyard",
        "shortPhrase": "Create Backyard Privacy",
        "id": 708,
        "trigger": "GRD/OUTDOOR_LAWN ACCESSORIES",
        "url": "/home-garden/home/news/backyard-privacy-screen",
        "difficulty": "Intermediate",
        "photoUrl": "//dsx.weather.com//util/image/w/HOME2_1.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }, {
        "outdoor": true,
        "phrase": "Spruce up your backyard with a raised bed salsa garden",
        "shortPhrase": "Make a salsa garden",
        "id": 564,
        "trigger": "GRD/OUTDOOR_LIVE GOODS_VEGETABLES AND HERBS",
        "url": "/home-garden/home/news/how-make-raised-bed-salsa-garden-20140527#/1",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/fee0733d-d178-4db6-a056-e05d00e57d7e.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Decorate with Pre-Made Containers",
        "shortPhrase": "Decorate with containers",
        "id": 565,
        "trigger": "GRD/OUTDOOR_PLANTERS_PLASTIC",
        "url": "/home-garden/home/news/creating-space-containers-20120921",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/04a93cc3-a138-480e-8258-27ba0dfa6087.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "2-4 hours"
      }, {
        "outdoor": true,
        "phrase": "Organize Your Home With Storage Solutions",
        "shortPhrase": "Organize Your Home",
        "id": 690,
        "trigger": "Enterprise_THD2015_THD90",
        "url": "/home-garden/home/news/home-organization-storage",
        "difficulty": "Easy",
        "photoUrl": "//video-assets-prod-web-twc.s3.amazonaws.com/storagevideoprimary.jpg",
        "duration": "One Weekend"
      }, {
        "outdoor": true,
        "phrase": "Upgrade your outdoor living with a fresh coat of paint",
        "shortPhrase": "Update With Paint",
        "id": 707,
        "trigger": "PAINT_EXTERIOR PAINT",
        "url": "/home-garden/home/news/outdoor-furniture-exterior-paint",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/exteriorpaintstep02_0.jpg?api=7db9fe61-7414-47b5-9871-e17d87b8b6a0&h=720&w=1280&v=at",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Find the Right Plants for Fall",
        "shortPhrase": "Plant for Fall",
        "id": 740,
        "trigger": "Enterprise_THD2015_THD123 - Fall Planting",
        "url": "/home-garden/home/news/fall-planting-20120919",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/plantforfall_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Fertilize Your Lawn for Fall",
        "shortPhrase": "Fertilize for Fall",
        "id": 739,
        "trigger": "Enterprise_THD2015_THD122 - Fall Fertilizer",
        "url": "/home-garden/home/news/fall-fertilizer-20120912",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com/util/image/w/fallfertilizer_0.jpg",
        "duration": "1 day"
      }, {
        "outdoor": true,
        "phrase": "Get Festive With Outdoor Holiday Decorations",
        "shortPhrase": "Get Festive With Holiday Decor",
        "id": 779,
        "trigger": "Enterprise_THD2015_THD146",
        "url": "/home-garden/home/news/outdoor-holiday-decoration",
        "difficulty": "Easy",
        "photoUrl": "//dsx.weather.com//util/image/w/outdoorholidaydecor.jpg?v=at&w=980&h=551&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
        "duration": "1 weekend"
      }]
    };

}]);;
/**
 * User: jonathan.mcsweet
 * Date: 7/1/2015
 * Time: 16:0
 */
/* global twc */
/*jshint -W065 */

twc.shared.apps.config(['twcMessageProvider', function(twcMessageProvider) {
  twcMessageProvider.add({
    "en_US": {
      "twc_weekend_project" : {
        "THIS_WEEKEND" : "This weekend's forecast is perfect to",
        "THIS_WEEKEND2": "This weekend's recommended project is",
        "GET_OUT"      : "Get Out and",
        "STAY_IN"      : "Stay In and"
      }
    }
  });
}]);
;
/**
 * User: Rob Riggs
 * Date: 7/18/2014
 * Time: 14:6
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_sun_moon', []);;
/**
 * Created with JetBrains PhpStorm.
 * User: Velu
 * Date: 12/13/2013
 * Time: 14:34
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('glomo_local_affiliate_media', []);;
/**
 * User: C-Dub
 * Date: 7/10/2014
 * Time: 10:49
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_seo_links', []);;
/**
 * User: Tam Dao
 * Date: 8/21/2015
 * Time: 12:7
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular.module('today_nearby_locations', []);
;
/**
 * User: Thanh Tran
 * Date: 7/2/2015
 * Time: 23:16
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_footer', []);;
/**
 * Created by riggs on 6/12/14.
 */
twc.shared.apps.config(['twcMessageProvider',function(twcMessageProvider) {
	twcMessageProvider.add({
      "en_US" : {
        "module_status.GENERIC_ERROR_TITLE"       : "Oops!",
        "module_status.GENERIC_ERROR_DESCRIPTION" : "Looks like this feature didn't load properly. Please check back soon.",
        "module_status.NOT_AVAILABLE_TITLE"       : "We're Sorry...",
        "module_status.NOT_AVAILABLE_DESCRIPTION" : "Data is not currently available for this location.",
        "module_status.OLD_BROWSER_TITLE"             : "We're sorry, you're using a browser that is no longer supported.",
        "module_status.OLD_BROWSER_DESCRIPTION"       : "Please <a href='http://browsehappy.com/'>upgrade your browser</a> to improve your experience."
      }
	});
}]);;
/**
 * User: HusseinQ.
 * Date: 1/27/2015
 * Time: 17:11
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular.module('gm_push', []);
;
/**
 * Created with JetBrains PhpStorm.
 * User: Tran Kim Hieu
 * Date: 6/20/2015
 * Time: 12:59
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_location_title', []);;
/**
 * Created with JetBrains PhpStorm.
 * User: Son Dinh
 * Date: 6/22/2015
 * Time: 21:44
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_alerts', []);;
/**
 * User: Minh Van
 * Date: 02/03/2016
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('glomo_current_conditions', ['twc_dal']);
;
/**
 * User: gmalhotra
 * Date: 4/22/2014
 * Time: 13:11
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular.module('glomo_forecast_36hr', ['twc_dal']);
;
/**
 * User: Cody Schneider
 * Created: 5/1/2014
 */
twc.shared.apps
  .factory('gmWxDataUtils', ['twcUtil', 'datefactory', function(twcUtil, datefactory){
    return {
      /**
       * Round chance of precip to the nearest multiply of 5%
       * @param chanceOfPrecip
       * @returns {*}
       */
      roundChanceOfPrecip: function(chanceOfPrecip) {
        if(angular.isDefined(chanceOfPrecip)) {
          chanceOfPrecip = Math.round(chanceOfPrecip / 5) * 5;
        }
        return chanceOfPrecip;
      },

      /**
       * Round hours for timezones with offset. Ex: timezone at INXX0038:1:IN has a 30min offset
       */
      roundDateHours: function(nativeDateObj){
        if(nativeDateObj.getMinutes() > 0) {
          var roundedHours = nativeDateObj.getHours() + Math.round(nativeDateObj.getMinutes()/60);
          nativeDateObj.setHours(roundedHours);
          nativeDateObj.setMinutes(0);
        }
        return nativeDateObj;
      },

      /**
       * Filter expired records from 10Day forecastt records (DFRecord or WebDFRecord). The first records
       * in these data sets expire after midnight in most international locations.
       */
      filterExpiredDFRecord: function(csDateTime, dailyForecast) {

        var todaysDate = datefactory['new'](csDateTime.getDateTimeISO(), csDateTime.getTimeZoneAbbr()).date;

        if(todaysDate !== twcUtil.dateTimeToDate(dailyForecast.items[0].getForecastDate())) {
          dailyForecast.items.shift();
          return true;
        } else {
          return false;
        }

      }
    };
  }]);
;
/**
 * User: Cody Schneider
 * Created: 5/1/2014
 */
/* global twc */
/*jshint -W065 */

// Directives to handle common weather data (like: Temp, Precip, Humidity, Visibility, etc..) across multiple modules.
twc.shared.apps.directive('gmWxTemperature', ['pcoUser', function (pcoUser) {
  /**
   * Directive to display temperature eg: 78 deg, 78 deg F, feels like 78 deg, --
   */
  'use strict';
  return {
    restrict: 'A',
    template: '<span data-ng-if="tempPrefix" class="temp-prefix" data-ng-bind="tempPrefix"></span> <span data-ng-if="hasValue" class="dir-ltr" data-ng-bind="temp | safeDisplay"></span><sup data-ng-if="hasValue" class="deg dir-ltr">&deg;</sup><sup class="dir-ltr temp-unit" data-ng-if="showTempUnit" data-ng-bind="tempUnit"></sup>\n<span data-ng-if="!hasValue" data-ng-bind="text | safeDisplay"></span>',
    scope: {
      temp: '=gmWxTemperature',
      tempPrefix: '@',
      showTempUnit: '=',
      textToReplace: '@'
    },
    link: function (scope, element, attrs) {
      /**
       * Wait until we get the correct temp value.
       *
       * Sometime the first value passed is undefined and
       * is causing the View to display N/A
       */
      var watchTemp = scope.$watch('temp', function(_new,_old) {
        scope.text = scope.textToReplace;
        
        if(_new !== undefined){
          watchTemp(); // kill watcher

          /* WEBK-213 - Adding conditions for -999 in Fahrenheit and -572 in Celsius. These values are returned by DSX when there is invalid or no data for Temperature */
          scope.hasValue = scope.temp === 0 || (scope.temp !== -999 && scope.temp !== -572 && scope.temp !== '--' && !!scope.temp);
          scope.tempUnit = scope.hasValue ? pcoUser.getTempUnitLabel() : '';
        } else if (angular.isDefined(scope.textToReplace)) {
          scope.hasValue = false;
        }
      });
    }
  };
}]);

;
twc.shared.apps
  .factory('gmWxSeverity', ['twcUtil', function(twcUtil) {
    return function(skyCode) {
      var wxCodes = [300, 310, 412, 1002, 1012, 4000, 4010, 4200, 4210, 4300, 5302, 5312, 5500, 5509, 5600, 5610, 5700, 5709, 5710, 5719, 429, 1700, 1770, 1790, 1780, 1002, 1072, 1082, 1212, 1217, 1222, 1227, 1092, 1102, 1182, 1192, 1172, 1202, 1282, 1232, 1237, 1242, 1247, 1292, 1272, 1842, 1832, 1882, 1887, 1802, 1852, 1892, 1897, 1402, 1482, 1492, 1472, 1642, 1662, 1652, 1632, 1602, 1672, 1692, 1682, 402, 482, 472, 492, 422];

      var severeMode = twcUtil.filter(wxCodes, function(code) {
        return skyCode === code;
      });

      return severeMode;
    };
  }]);
;
/**
 * User: Vishal Shrivastava
 * Date: 2/26/2014
 * Time: 15:50
 */
/* global twc */
/*jshint -W065 */

/* App Module */
twc.glomo_smart_banner = twc.glomo_smart_banner || {};
twc.glomo_smart_banner.app = twc.glomo_smart_banner.app || angular.module('glomo_smart_banner', []);
;
/**
 * User: Chris Whitehead
 * Date: 9/8/2014
 * Time: 9:17
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('glomo_cobrand_headers', []);;
/**
 * Author: ksankaran (Velu)
 * Date: 7/8/14
 * Time: 1:11 PM
 * Comments:
 */

angular
  .module('glomo_breaking_now', []);;
/**
 * User: Ankit Parekh
 * Date: 1/22/2014
 * Time: 9:43
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('glomo_local_suite_nav', []);;
/**
 * User: Vishal Shrivastava
 * Date: 08/04/2015
 * Time: 12:27
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('glomo_search', []);;
/**
 * Created with JetBrains PhpStorm.
 * User: jefflu
 * Date: 1/15/14
 * Time: 3:11 PM
 * To change this template use File | Settings | File Templates.
 */

twc.shared.apps.value('aliases', {
  specialty: {
    'alcatraz':	'USCA0987:1:US',
    'amelia island': 'USFL0144:1:US',
    'american somoa':	'USAS0001:1:US',
    'canary islands':	'SPXX0210:1:SP',
    'catalina island': 'USCA0055:1:US',
    'disney hawaii': 'USHI0200:1:US',
    'disney world': 'USFL0615:1:US',
    'disneyland': 'USCA1306:1:US',
    'grand cayman': 'CJXX0001:1:CJ',
    'green acres': 'USFL0512:1:US',
    'hawaii aulani disney resort': 'USHI0200:1:US',
    'kauai': 'USHI0060:1:US',
    'kiawah island': 'USSC0174:1:US',
    'la porte': 'USCA1106:1:US',
    'lanai': 'USHI0057:1:US',
    'manhattan': 'USNY0996:1:US',
    'maui': 'USHI0031:1:US',
    'monoco': 'MNXX0001:1:MN',
    'oahu': 'USHI0026:1:US',
    'tampa bay': 'USFL0481:1:US',
    'tel aviv': 'ISXX0026:1:IS',
    'uk': 'UKXX0085:1:UK',
    'walt disney world': 'USFL0615:1:US',
    'washington dc': 'USDC0001:1:US',
    'new york city': 'USNY0996:1:US',
    'aruba': 'AAXX0001:1:AA',
    'bahamas': 'BFXX0005:1:BF',
    'bermuda': 'BDXX0001:1:BD',
    'big bear': 'USCA0093:1:US',
    'brooklyn': 'USNY0176:1:US',
    'costa rica': 'CSXX1935:1:CS',
    'disneyworld': 'USFL0615:1:US',
    'la': 'USCA0638:1:US',
    'nyc': 'USNY0996:1:US',
    'puerto rico': 'USPR0087:1:US'
  },
  state: {
    'al': 'alabama',
    'ak': 'alaska',
    'az': 'arizona',
    'ar': 'arkansas',
    'ca': 'california',
    'co': 'colorado',
    'ct': 'connecticut',
    'de': 'delaware',
    'fl': 'florida',
    'ga': 'georgia',
    'hi': 'hawaii',
    'di': 'idaho',
    'il': 'illinois',
    'in': 'indiana',
    'ia': 'iowa',
    'ks': 'kansas',
    'ky': 'kentucky',
    'la': 'louisiana',
    'me': 'maine',
    'md': 'maryland',
    'ma': 'massachusetts',
    'mi': 'michigan	mi',
    'mn': 'minnesota	mn',
    'ms': 'mississippi',
    'mo': 'missouri',
    'mt': 'montana',
    'ne': 'nebraska',
    'nv': 'nevada',
    'nh': 'new hampshire',
    'nj': 'new jersey',
    'nm': 'new mexico',
    'ny': 'new york',
    'nc': 'north carolina',
    'nd': 'north dakota',
    'oh': 'ohio',
    'ok': 'oklahoma',
    'or': 'oregon',
    'pa': 'pennsylvania',
    'ri': 'rhode island',
    'sc': 'south carolina',
    'sd': 'south dakota',
    'tn': 'tennessee',
    'tx': 'texas',
    'ut': 'utah',
    'vt': 'vermont',
    'va': 'virginia',
    'wa': 'washington',
    'wv': 'west virginia',
    'wi': 'wisconsin',
    'wy': 'wyoming',
    'as': 'american samoa',
    'dc': 'district of columbia',
    'gu': 'guam',
    'mp': 'northern mariana islands',
    'mq': 'midway island',
    'pr': 'puerto rico',
    'vi': 'virgin islands',
    'wq': 'wake island'
  }
});

;
/**
 * Created with JetBrains PhpStorm.
 * User: Anh
 * Date: 6/24/2015
 * Time: 14:22
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_header_main_menu_resp', []);;
/**
 * User: Jeff Lu
 * Date: 8/29/2014
 * Time: 8:54
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('glomo_social_sharing', []);
;
/**
 * Created with JetBrains PhpStorm.
 * User: Tam Dao
 * Date: 6/27/2015
 * Time: 7:28
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_header_savedlocations', ['gm_locations', 'twc_dal']);;
/**
 * User: Tam Dao
 * Date: 7/2/2015
 * Time: 19:58
 */
/* global twc */
/*jshint -W065 */

twc.shared.apps
  .directive('wxSettings', function () {
  'use strict';

  return {
    templateUrl: '/sites/all/modules/glomo/shared/wx_settings/templates/wx_settings.html',
    restrict: 'A',
    transclude: true,
    scope: {
      onTempUnitChanged: '&',
      settings: '=gmSettings'
    },
    link: function($scope, $element, $attributes, controller, $transclude) {
      $transclude(function(clone) {
        $scope.isDisplayTransclude = !!(clone[1] && clone[1].tagName);
      });
    },
    controller: ['$scope', 'pcoUser', 'customEvent', '$window', '$filter', 'PcoPage', function ($scope, pcoUser, customEvent, $window, $filter, PcoPage) {
      $scope.localeLinks = $scope.settings.header_international_links;
      $scope.tempUnit = pcoUser.getTempUnit();
      var userLocale = pcoUser.getLocale(),
          newLocale = userLocale.replace('_','-');


      $scope.isDesktop = false;
      $scope.ifDesktop = function () {
        ($window.innerWidth >= 768) ? $scope.isDesktop = true : $scope.isDesktop = false;
        $scope.$evalAsync();
      };
      $scope.ifDesktop();

      if ($scope.isDesktop === false) {
        $scope.showlocales = false;
        $scope.showMoreLocalesBtn = true;
        $scope.showLessLocalesBtn = false;

        $scope.showLessLocales = function() {
          $scope.showlocales = false;
          $scope.showMoreLocalesBtn = true;
          $scope.showLessLocalesBtn = false;
        };

        $scope.showMoreLocales = function() {
          $scope.showlocales = true;
          $scope.showMoreLocalesBtn = false;
          $scope.showLessLocalesBtn = true;
        };
      }
      else {
        $scope.showlocales = true;
        $scope.showMoreLocalesBtn = false;
        $scope.showLessLocalesBtn = false;

      }

      $scope.setTempUnit = function(unit) {
        $scope.tempUnit = unit;
        var trackStrVal = unit === 'F' ? 'farenheit' : 'celsius';
        customEvent.getEvent('track-string-event').notify({module_id: $scope.settings.module_id || "header-saved-locations", trackStr: trackStrVal});
        pcoUser.setTempUnit(unit, $scope.onTempUnitChanged);
      };

      $scope.setLocale = function(url) {
        var s = url.split('/');
        var locale = s[s.length - 1];
        pcoUser.setEditionLocale(locale, function() {
          window.location.href = url;
        });
      };

      $scope.selectedLocale = false;
      (function () {
        angular.forEach($scope.localeLinks, function (localelink) {
          var linkDescription = localelink.description;
          var linkTitle = localelink.title;
          var linkUrl = localelink.url;
          if (linkUrl === "https://weather.com/?par=usa") {
            linkUrl = "https://weather.com/en-US";
          }
          if(linkUrl.indexOf(newLocale) > -1) {
            $scope.localeTitleDisplay = $filter('pfTranslate')(linkTitle, {context: 'wx_settings'});
            $scope.localeDescriptionDisplay = $filter('pfTranslate')(linkDescription, {context: 'wx_settings'});
            $scope.selectedLocale = true;

          }

        });
      })();


      // Set up and Clean Locale if not en-US
      $scope.getTargetUrl = function() {
        var curLoc = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale;
        if (curLoc && curLoc !== "en_US") {
          var tempLocaleArray = curLoc.split('_');
          curLoc = "/" + tempLocaleArray[0] + (tempLocaleArray[1] ? "-" + tempLocaleArray[1].toUpperCase() : "");
        } else {
          curLoc = "";
        }
        // Create Link for Push Management Link
        return curLoc + "/life/manage-notifications";
      };

      $scope.canPush = false;
      $scope.locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale;
      $scope.tempUnit = pcoUser.getTempUnit();
      $scope.setTempUnit = function(unit) {
        $scope.tempUnit = unit;
        pcoUser.setTempUnit(unit, $scope.onTempUnitChanged);
      };
      PcoPage.getPagePromises()
        .then(function() {
          // Check to see if SW is supported to show Push Management link.
          if ('serviceWorker' in navigator && 'PushManager' in window) {
            var requestFileSystem = window.RequestFileSystem || window.webkitRequestFileSystem;
            requestFileSystem && requestFileSystem(window.TEMPORARY, 100, ChromeNotIncognitoOnly);
          }
        });
      function ChromeNotIncognitoOnly() {
        $scope.canPush = true;
      }


    }]
  };
})

.directive('gmIsolateScrolling', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('mousewheel DOMMouseScroll', function (e) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;

                this.scrollTop += (delta <= 0 ? 1 : -1) * 10;
                e.preventDefault();
            });
        }
    };
});;
/**
 * User: Crystal Gardner
 * Date: 7/2/2015
 * Time: 19:58
 */
/* global twc */
/*jshint -W065 */

twc.shared.apps
  .directive('wxNotifications', function () {
  'use strict';

  return {
    templateUrl: '/sites/all/modules/glomo/shared/wx_notifications/templates/wx_notifications.html',
    restrict: 'A',
    transclude: true,
    scope: {
      settings: '=gmNotifications'
    },
    link: function($scope, $element, $attributes, controller, $transclude) {
      $transclude(function(clone) {
        $scope.isDisplayTransclude = !!(clone[1] && clone[1].tagName);
      });
    },
    controller: ['$scope', 'pcoUser', 'customEvent', '$window', '$filter', 'PcoPage', function ($scope, pcoUser, customEvent, $window, $filter, PcoPage) {


      // Set up and Clean Locale if not en-US
      $scope.getTargetUrl = function() {
        var curLoc = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale;
        if (curLoc && curLoc !== "en_US") {
          var tempLocaleArray = curLoc.split('_');
          curLoc = "/" + tempLocaleArray[0] + (tempLocaleArray[1] ? "-" + tempLocaleArray[1].toUpperCase() : "");
        } else {
          curLoc = "";
        }
        // Create Link for Push Management Link
        return curLoc + "/life/manage-notifications";
      };

      $scope.canPush = false;
      $scope.locale = TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale;
      $scope.tempUnit = pcoUser.getTempUnit();
      $scope.setTempUnit = function(unit) {
        $scope.tempUnit = unit;
        pcoUser.setTempUnit(unit, $scope.onTempUnitChanged);
      };
      PcoPage.getPagePromises()
          .then(function() {
            // Check to see if SW is supported to show Push Management link.
            if ('serviceWorker' in navigator && 'PushManager' in window) {
              var requestFileSystem = window.RequestFileSystem || window.webkitRequestFileSystem;
              requestFileSystem && requestFileSystem(window.TEMPORARY, 100, ChromeNotIncognitoOnly);
            }
          });
      function ChromeNotIncognitoOnly() {
        $scope.canPush = true;
      }



    }]
  };
});;
/**
 * User: Robert Blaske
 * Date: 10/5/2015
 * Time: 19:26
 */
/*jshint -W065 */

angular.module('gm_locations').controller('gmLocationsConfirmModalInstanceCtrl', function ($scope, $modalInstance) {
    'use strict';

    $scope.confirm = function () {
      $modalInstance.close('confirm');
    };

    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
    };

  });
;
/**
 * User: Robert Blaske
 * Date: 10/5/2015
 * Time: 19:26
 */

/*jshint -W065 */

angular.module('gm_locations').controller('gmLocationsErrorModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
    };

  });
;
/**
 * User: Robert Blaske
 * Date: 10/5/2015
 * Time: 19:26
 */
/* global twc */
/*jshint -W065 */

angular.module('gm_locations')
  .controller('gmLocationsMigrationModalInstanceCtrl', function ($scope, $modalInstance, customEvent, $document, rejectedCollection, totalSavedLocations) {

    $scope.showActionNeededPart = totalSavedLocations >= 10;

    /****************************
     *
     * Event handlers
     */

    $modalInstance.opened['finally'](function () {
      $scope.message = getMessage();
    }, function () {
      // handle cleanup if closed without clicking on the close button
    });

    /***************************
     *
     * Public interface
     */

    $scope.dismiss = $modalInstance.dismiss;

    /****************************
     *
     * Private methods
     */

    function getMessage() {
      $scope.link = "/life/profile";
      if (rejectedCollection.length === 0) {
        return "Congrats! You just saved locations in your profile, you can also manage your locations by clicking here. Have fun!";
      } else {
        return "Sorry! Locations: " + rejectedCollection + " have not been saved due to over 10 records, please manage your locations by clicking here. Have fun!";
      }
    }
  });
;
/**
 * User: Robert Blaske
 * Date: 10/5/2015
 * Time: 19:26
 */
/* global twc */
/*jshint -W065 */

angular.module('gm_locations').directive('gmLocationsProfileModal', ['$q', '$timeout', 'gmLocations', 'gmLocationsPco', 'gmLocationsCookies', 'twcPco', 'customEvent',
  function ($q, $timeout, gmLocations, gmLocationsPco, gmLocationsCookies, twcPco, customEvent) {
    'use strict';
    return {
      restrict: 'EA',
      templateUrl: '/sites/all/modules/glomo/shared/gm_locations/components/profile-modal/profile-modal.html',
      replace: true,
      scope: {
        customMessageKey: '@',
        origin: '@'
      },
      controller: function ($scope) {

        var closeEventDeferred;
        var user = twcPco.get('user');


        /********************************************************
         *
         * Public Interface
         */

        $scope.modal = {
          height: 600,
          width: 750
        };

        $scope.showProfileModal = false;
        $scope.iframeSrc = getIframeSrc();

        $scope.$watch('showProfileModal', function (newShowProfileModalValue, oldShowProfileModalValue) {
          var profileIsMerged = !!(twcPco.getNodeValue('profile', 'savedLocations') || {}).profileIsMerged;
          var isUserClosedProfileModal = !newShowProfileModalValue && newShowProfileModalValue !== oldShowProfileModalValue;
          var isUserSignIn = user.signedIn();

          if (isUserClosedProfileModal && !isUserSignIn && profileIsMerged) {
            // User session has timed out (profileIsMerged) and he dismissed profile modal without logged in.
            gmLocationsPco.savedLocations.removeAll();
          }

          if (isUserClosedProfileModal && !isUserSignIn) {
            // User dismissed profile modal without logged in.
            $timeout(function () {
              gmLocations.modals.profile.showMessage_MustLoginToSave($scope);
            }, 200);
          }

          if (isUserClosedProfileModal) {
            customEvent.getEvent('GML_ALERT_PROFILE_MODAL_CLOSED').notify();
          }
        });


        /*******************************************************
         *
         * Event Handlers
         */

        /***
         * Profile sign-in event
         */
          //Pass (Location Name?) and Message key on querystring
        customEvent.getEvent('ups-signin-message').progress(function (payload) {
          $scope.$evalAsync(function () {
            $scope.origin = payload.data.origin;
          });
        });

        /***
         * Dialog close event
         */
        customEvent.getEvent('ups-post-message').progress(function (event) {
          if (event && event.data && event.data.message === "close modal" && event.data.close) {
            $scope.$evalAsync(function () {
              $scope.showProfileModal = false;
            });
            setTimeout(function () {
              if (closeEventDeferred) {
                closeEventDeferred.resolve();
              }
            }, 500);
          }
        });

        /***
         * Dialog open Event
         */
        customEvent.getEvent('GML_COMMAND_PROFILE_MODAL_OPEN').progress(function () {
          $scope.$evalAsync(function () {
            $scope.showProfileModal = true;
          });
        });

        customEvent.getEvent('authentication-timeout-event').progress(function (payload) {
          $scope.$evalAsync(function () {
            gmLocationsCookies.removeSession();
            $scope.showProfileModal = true;
          });
        });

        //TODO: Move the template referenced in the html to this directive


        /********************************************************
         *
         * Private methods
         */

        function getIframeSrc() {
          var profileUrl = TWC && TWC.profile && TWC.profile.base_url,
            origin = $scope.origin && ('origin=' + $scope.origin),
            msg = $scope.customMessageKey && ('msgs=' + $scope.customMessageKey),
            queryString = [origin, msg].filter(Boolean).join('&'),
            path = ['/login.html#/login', queryString].filter(Boolean).join('?');
          return profileUrl + path;
        }

      }
    };
  }]);
;
/**
 * User: Tam Dao
 * Date: 7/21/2015
 * Time: 13:4
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('gm_users_site_preference', []);;
/*!
 * angular-slick-carousel
 * DevMark <hc.devmark@gmail.com>,Karan Batra-Daitch <karanganesha04@gmail.com>
 * https://github.com/devmark/angular-slick-carousel
 * Version: 3.0.2 - 2015-07-28T10:42:08.174Z
 * License: MIT
 */


'use strict';

angular
    .module('slickCarousel', [])
    //global config
    .constant('slickCarouselConfig', {
        autoplay: true,
        dots: true,
        autoplaySpeed: 3000,
        lazyLoad: 'ondemand',
        method: {},
        event: {}
    })
    .directive('slick', [
        '$timeout', 'slickCarouselConfig', function ($timeout, slickCarouselConfig) {
            var slickOptionList, slickMethodList, slickEventList;
            slickOptionList = ['accessibility', 'adaptiveHeight', 'autoplay', 'autoplaySpeed', 'asNavFor', 'appendArrows', 'prevArrow', 'nextArrow', 'centerMode', 'centerPadding', 'cssEase', 'customPaging', 'dots', 'draggable', 'fade', 'focusOnSelect', 'edgeFriction', 'infinite', 'initialSlide', 'lazyLoad', 'mobileFirst', 'pauseOnHover', 'pauseOnDotsHover', 'respondTo', 'rows', 'slide', 'slidesPerRow', 'slidesToShow', 'slidesToScroll', 'speed', 'swipe', 'swipeToSlide', 'touchMove', 'touchThreshold', 'useCSS', 'variableWidth', 'vertical', 'verticalSwiping', 'rtl'];
            slickMethodList = ['slickGoTo', 'slickNext', 'slickPrev', 'slickPause', 'slickPlay', 'slickAdd', 'slickRemove', 'slickFilter', 'slickUnfilter', 'unslick'];
            slickEventList = ['afterChange', 'beforeChange', 'breakpoint', 'destroy', 'edge', 'init', 'reInit', 'setPosition', 'swipe'];

            return {
                scope: {
                    settings: '=',
                    data: '='
                },
                restrict: 'AE',
                link: function (scope, element, attr) {
                    var options, initOptions, destroy, init, destroyAndInit, currentIndex = 0;
                    initOptions = function () {
                        options = angular.extend(angular.copy(slickCarouselConfig), scope.settings);
                        angular.forEach(attr, function (value, key) {
                            if (slickOptionList.indexOf(key) !== -1) {
                                options[key] = scope.$eval(value);
                            }
                        });
                    };

                    destroy = function () {
                        var slickness = angular.element(element);
                        slickness.remove('slick-list');
                        slickness.slick('unslick');
                        return slickness;
                    };

                    init = function () {
                        return $timeout(function () {
                            initOptions();
                            var slickness = angular.element(element);

                            if (angular.element(element).hasClass('slick-initialized')) {
                                slickness.slick('getSlick');
                            } else {
                                slickness.slick(options);
                            }

                            scope.internalControl = options.method || {};

                            // Method
                            slickMethodList.forEach(function (value) {
                                scope.internalControl[value] = function () {
                                    var args;
                                    args = Array.prototype.slice.call(arguments);
                                    args.unshift(value);
                                    slickness.slick.apply(element, args);
                                };
                            });

                            // Event
                            slickness.on('afterChange', function (event, slick, currentSlide, nextSlide) {
                                currentIndex = currentSlide;
                                if (typeof options.event.afterChange !== 'undefined') {
                                    options.event.afterChange(event, slick, currentSlide, nextSlide);
                                }
                            });

                            slickness.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                                if (typeof options.event.beforeChange !== 'undefined') {
                                    options.event.beforeChange(event, slick, currentSlide, nextSlide);
                                }
                            });

                            if (typeof options.event.breakpoint !== 'undefined') {
                                slickness.on('breakpoint', function (event, slick, breakpoint) {
                                    options.event.breakpoint(event, slick, breakpoint);
                                });
                            }
                            if (typeof options.event.destroy !== 'undefined') {
                                slickness.on('destroy', function (event, slick) {
                                    options.event.destroy(event, slick);
                                });
                            }
                            if (typeof options.event.edge !== 'undefined') {
                                slickness.on('edge', function (event, slick, direction) {
                                    options.event.edge(event, slick, direction);
                                });
                            }

                            slickness.on('init', function (event, slick) {
                                if (typeof options.event.init !== 'undefined') {
                                    options.event.init(event, slick);
                                }
                                if (currentIndex != null) {
                                    return slick.slideHandler(currentIndex);
                                }
                            });

                            if (typeof options.event.reInit !== 'undefined') {
                                slickness.on('reInit', function (event, slick) {
                                    options.event.reInit(event, slick);
                                });
                            }
                            if (typeof options.event.setPosition !== 'undefined') {
                                slickness.on('setPosition', function (event, slick) {
                                    options.event.setPosition(event, slick);
                                });
                            }
                            if (typeof options.event.swipe !== 'undefined') {
                                slickness.on('swipe', function (event, slick, direction) {
                                    options.event.swipe(event, slick, direction);
                                });
                            }

                        });
                    };

                    destroyAndInit = function () {
                        if (angular.element(element).hasClass('slick-initialized')) {
                            destroy();
                        }
                        $timeout(function () {
                            init();
                        }, 1);
                    };

                    scope.$on('$destroy', function() {
                      destroy();
                    });
                        
                    scope.$watch('settings', function (newVal, oldVal) {
                        if (newVal !== null) {
                            return destroyAndInit();
                        }
                    }, true);

                    return scope.$watch('data', function (newVal, oldVal) {
                        if (newVal != null) {
                            return destroyAndInit();
                        }
                    }, true);


                }
            };
        }
    ]);;
/**
 * User: Crystal Gardner
 * Date: 2/3/2016
 * Time: 17:3
 */
/* global twc */
/*jshint -W065 */
/* App Module */


angular.module('your_weather', ["twc_dal"]);
;
/**
 * Created with JetBrains PhpStorm.
 * User: kodeq_tho.nguyen
 * Date: 6/16/2015
 * Time: 17:19
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('almanac', []);;
twc.shared = twc.shared || {};
twc.shared.apps = twc.shared.apps || angular.module("shared",[]);


twc.shared.apps.config(function($provide) {
  $provide.decorator('tooltipClassesDirective', function($delegate) {
    var directive = $delegate[0];
    var _link = directive.link;

    directive.compile = function() {
      return function(scope, element, attrs) {
        _link.apply(this, arguments);
        element.find('.tooltip-arrow')
          .addClass('wx-iconfont-global')
          .addClass(scope.arrowClass());
      }
    }
    directive.controller = function($scope, $element, $attrs) {

      //Set default placement
      $scope.placement = $scope.placement || 'top';

      // Return class for arrow icon
      $scope.arrowClass = function() {
        switch ($scope.placement) {
          case 'top' :
            return 'wx-icon-arrow-down-2';
          case 'bottom' :
            return 'wx-icon-arrow-up-2';
          case 'left' :
            return 'wx-icon-arrow-right-2';
          case 'right' :
            return 'wx-icon-arrow-left-2';
          default :
            return 'wx-icon-arrow-down-2';
        }
      }
    }
    return $delegate;
  });
});;
/**
* Author: Cody Schneider
* Comments: Directive for rendering a transcluded dialog
*/

twc.shared = twc.shared || {};
twc.shared.apps = twc.shared.apps || angular.module("shared",[]);
twc.shared.apps
  .directive('dialog',['$modal', '$sce', 'customEvent', function ($modal, $sce, customEvent) {

    var dialogDefinition = {
      replace     : true,
      transclude  : true,
      template : '<button data-ng-show="showButton" class="btn" data-ng-class="dialogButtonClass" data-ng-click="openDialog()" ng-bind-html="buttonText"></button data-ng-if="showButton">',
      restrict    : 'A',
      scope: {
        dialogButton: '@',
        dialogButtonClass: '@',
        title: '@',
        disableButton:'@',
        openEvent:'@',
        dialogClass: '@',
        confirmText: '@',
        cancelText: '@',
        confirmAction: '&',
        cancelAction: '&'
      },

      link  : function(scope, element, attrs, ctrl, transclude) {
        scope.buttonText = $sce.trustAsHtml(attrs.dialogButton);
        scope.showButton = scope.disableButton === 'true' ? false : true;

        scope.dialogButtonClass = scope.dialogButtonClass || 'btn-primary';
        scope.openDialog = function(){
          var modalInstance = $modal.open({
            templateUrl: '/sites/all/modules/custom/angularmods/app/shared/ui_bootstrap/custom/templates/dialog.template.html',
            controller: 'dialogContentCtrl',
            scope: scope,
            windowClass: scope.dialogClass,
            resolve: {
              content: function () {
                var content = angular.element('<div></div>');
                transclude(function(clone){
                  content.append(clone);
                });
                return content;
              }
            }
          });
          modalInstance.result.then(function () {
            scope.confirmAction();
          }, function () {
            scope.cancelAction();
          });
        }
        if (scope.openEvent) {
          var openEvent = customEvent.getEvent(scope.openEvent);
          openEvent.progress(scope.openDialog);
        }

      }
    };
    return dialogDefinition;
  }])
  .directive('nestedModalTransclude', function(){
    return {
      scope: {
        content: '=nestedModalTransclude'
      },
      link: function(scope, element){
        element.append(scope.content);
      }
    };
  })

  .controller('dialogContentCtrl',['$scope','$modalInstance','content',
    function($scope, $modalInstance, content){
      $scope.content = content;

      $scope.confirm = function () {
        $modalInstance.close();
      };
      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
  }])
;;
/**
* Author: Son Dinh
* Date: 12/01/2015
* Time: 7:06 PM
* Comments: Handle touchstart events to avoid touch delay.
*/

twc.shared = twc.shared || {};
twc.shared.apps = twc.shared.apps || angular.module("shared",[]);

twc.shared.apps.config(function($provide) {
  $provide.decorator('dropdownDirective', function($delegate, $rootScope, customEvent) {
    var directive = $delegate[0];
    var _link = directive.link;
    directive.compile = function() {
      return function(scope, element, attrs) {
        _link.apply(this, arguments);
        var toggles = element.find('.dropdown');
        element.on('touchstart', function($event) {
          var $dropdown = angular.element($event.currentTarget);
          var isMenuEvent = $dropdown.children('.dropdown-menu').find($event.target).length > 0;

          if (!isMenuEvent) {
            $event.stopPropagation();
            $event.preventDefault(); // Stop ui-bootstrop's dropdown-toggle click handler

            if ($dropdown.hasClass('open')) {
              /**********************
               /* Close the dropdown
               */
              $dropdown.removeClass('open hover');
            } else {
              /**********************
               /* Open the dropdown
               */
              $dropdown.addClass('open').siblings().removeClass('open hover');
            }
          }
        });
        function isNavEvent(evt) {
          var isToggleEvent = angular.element(evt.target).hasClass('dropdown-toggle');
          var isDropdownEvent = angular.element('.dropdown').find(evt.target).length > 0;
          return (isToggleEvent || isDropdownEvent);
        }

        if ($rootScope.isTouch) {
          customEvent.getEvent('touch-on-body-event').progress(function (evt) {
            if (!isNavEvent(evt) && !scope.$$phase) {
                scope.$apply(function () {
                    element.removeClass('open hover');
                });
            }
          });
        }
      }
    }
    return $delegate;
  });
});;
(function () {
  twc.shared = twc.shared || {};
  twc.shared.apps = twc.shared.apps || angular.module('shared',[]);

  //  twc.shared.apps.config(['$tooltipProvider', function($tooltipProvider) {
  //    $tooltipProvider.options({appendToBody: true});
  //  }]);

  twc.shared.apps.requires.push('ui.bootstrap');
  twc.shared.apps.requires.push('ui.bootstrap.tooltip');
  twc.shared.apps.requires.push('ui.bootstrap.popover');

})();
;
/**
 * User: Cord Hamrick
 * Date: 8/28/2014
 * Time: 16:22
 */
/* global twc */
/*jshint -W065 */

/* App Module */
angular
  .module('glomo_most_popular', []);;
/**
 * Created by riggs on 6/12/14.
 */
twc.shared.apps.config(['twcMessageProvider',function(twcMessageProvider) {
	twcMessageProvider.add({
		"en_US" : {
      "error_handler.GENERIC_ERROR_TITLE" : "Oops!",
      "error_handler.GENERIC_ERROR_DESCRIPTION" : "Looks like this feature didn't load properly. Please check back soon.",
      "error_handler.NOT_AVAILABLE_TITLE" : "We're Sorry...",
      "error_handler.NOT_AVAILABLE_DESCRIPTION" : "Data is not currently available for this location."
		}
	});
}]);;
// Prevent WindowShade from making the page all jiggly
(function ($) {
  TWC.Events.dfpLoaded = TWC && TWC.Events && TWC.Events.getEvent('dfpLoaded');
  TWC.Events.slotRefreshReady = TWC && TWC.Events && TWC.Events.getEvent('slotRefreshReady');
  TWC.Events.adBgAvailable = TWC && TWC.Events && TWC.Events.getEvent('adBgAvailable');
  TWC.Events.topAdsCollapse = TWC && TWC.Events && TWC.Events.getEvent('topAdsCollapse');
  TWC.Events.createOrRefreshSlot = TWC && TWC.Events && TWC.Events.getEvent('createOrRefreshSlot');

  TWC.Events.dfpLoaded.done(function () {
    googletag.pubads().addEventListener('slotRenderEnded', function (event) {
      // This handler catches any ad updates that happen after slotRefreshReady such as those in directives
      if (TWC.Events.slotRefreshReady.state() === 'resolved') {
        toggleWindowShadePlaceholder();
        removeMinHeight();
      }
    });
  });
  TWC.Events.createOrRefreshSlot.always(function () {
    removeMinHeight();
  });
  TWC.Events.slotRefreshReady.done(function () {
    toggleWindowShadePlaceholder();
    removeMinHeight();
  });

  TWC.Events.adBgAvailable.progress(function () {
    removeMinHeight();
  });

  // Generic event for use by external scripts to collapse top-ads going forward.
  TWC.Events.topAdsCollapse.progress(function () {
    var $wxTopWrap = $('#wx-top-wrap');
    $wxTopWrap.find('.wx-gptADS').each(function () {
      $(this).hide();
    });
    removeMinHeight();
  });

  function hasVisibleTopAds() {
    var $wxTopWrap = $('#wx-top-wrap');
    return $wxTopWrap.find('.wx-gptADS:visible').length;
  }

  function removeMinHeight() {
    setTimeout(function () {
      if (!hasVisibleTopAds()) {
        var $wxTopWrap = $('#wx-top-wrap');
        $wxTopWrap.css('min-height','0');
        $wxTopWrap.find('.page-header-inner').css('min-height','0');
        $wxTopWrap.find('.content-header-inner').css('min-height','0');
        $wxTopWrap.find('.header-inner').css('min-height','0');
      }

      // Remove min-height on any right rail ads that did not render
      $('#wx-rail').find('.wx-gptADS:hidden').closest('.admodule').css('min-height','0');
      $('#wx-rail').find('.wx-gptADS:hidden').closest('.panel-pane').css('padding-top','0');
    },50);
  }

  function toggleWindowShadePlaceholder() {
    var $wxTopWrap = $('#wx-top-wrap');
    var $wxTopWrapInner = $wxTopWrap.find('.page-header-inner, .content-header-inner');
    var $WindowShade = $wxTopWrap.find('#WX_WindowShade');
    var wsHeight = $WindowShade.outerHeight();

    if (!$WindowShade.inViewport(0.5,0.5)) {
      $wxTopWrapInner.css('padding-top',wsHeight + 'px');
      $wxTopWrapInner.addClass('pin-ad');
    } else {
      $wxTopWrapInner.css('padding-top','0px');
      $wxTopWrapInner.removeClass('pin-ad');
    }
  }

  $(window).on('scroll',toggleWindowShadePlaceholder.debounce(50));
  $(document).ready(toggleWindowShadePlaceholder());

})(jQuery);
;
(function (angular) {
  angular
    .module('glomo_content_media', ['bnLazyLoad']);
})(angular);
;
/**
 * User: Hussein Qudsi
 * Date: 1/11/2016
 * Time: 17:11
 */
/* global twc */
/*jshint -W065 */
angular.module('gm_push').controller('twc_gm_push_controller', ['$scope', 'DrupalSettings', 'settings', 'customEvent', 'twcConstant', 'gmSendNotification', 'PcoPage', 'gmAnonymous', '$filter', '$timeout',
  function ($scope, DrupalSettings, settings, customEvent, twcConstant, gmSendNotification, PcoPage, gmAnonymous, $filter, $timeout) {
    'use strict';

    /**
     * Settings
     * Consists of setting up
     * a. Data from module configs is done in the pollen data factory (settings object)
     * b. Data setup (global variables within this controller). These are NOT $scope variables ($scope variables are primarily meant for binding with the view)
     */

    /**
     * requestFileSystem
     * We are using this method to find out in the user is incognito mode
     * If incognito then GmPushIncognito() else GmPushNotIncognito() will be called
     */
    var requestFileSystem = window.RequestFileSystem || window.webkitRequestFileSystem;
      requestFileSystem && requestFileSystem(window.TEMPORARY, 100, GmPushNotIncognito);

    /**
     * GmPushNotIncognito
     * Callback function that fires if the User is not in incognito mode
     */
    function GmPushNotIncognito(){
      /** 1. vars */
      var whiteLogoImage = twcConstant.assetsUrl + twcConstant.LogoTWC.white_logo, daysToWait = 14, alreadyDisplay = false,
        start = settings.animate_from,
        speed = parseInt(settings.animation_speed) || 400,
        homePage = 'homePage', todayPage = 'todayPage', articlePage = 'articlePage',
        $moduleEl, PCO = TWC && TWC.pco,
        waitBeforeAnimating = (settings.wait_before_animating === +settings.wait_before_animating) ?
        settings.wait_before_animating * 1000 : 3500;

      // TWC event vars:
      var TWC_SW_push_allow = 'TWC_SW_push_allow',
        TWC_SW_gmPush_ready = 'TWC_SW_gmPush_ready',
        TWC_SW_push_allow_confirmed = 'TWC_SW_push_allow_confirmed';
      var pfTranslateFilter = $filter('pfTranslate');
      var notifyTitle = pfTranslateFilter("Congrats! you'll now receive severe weather notifications in your area", {context: "gm_push"}),
        notifyBody = pfTranslateFilter("Manage your settings", {context: "gm_push"}),
        notifyTitleInternational = pfTranslateFilter("Click here to activate notifications for your favorite locations", {context: "gm_push"}),
        targetUrl = settings.target_url || '/life/manage-notifications';
      var localePathPrefix = "", siteLocale = (TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale);
      if (siteLocale && siteLocale !== "en_US") {
        var tempLocaleArray = siteLocale.split("_");
        localePathPrefix = tempLocaleArray[0] + (tempLocaleArray[1] ? "-" + tempLocaleArray[1].toUpperCase() : "");
      }
      targetUrl = location.origin + "/" + localePathPrefix + targetUrl;
      // Notification Vars:
      var welcomeNotifyOptions = {
        title: notifyTitle,
        body: notifyBody,
        icon: '//s.w-x.co/TWC_logo_100x100.gif',
        tag: 'TWC-first-push-notifications-confirmation',
        url: targetUrl
      };
      // DSX Vars:
      var endPointToken, sentConfirmationNotification = false;

      /**
       * 2. Functions
       * All work done in the controller goes here in the form of well-defined functions
       */
      var PushFnc = {
        /** Checks pco, if user previously interacted w/ module. Returns boolean */
        getPcoStatus: function () {
          if (PCO) {
            var webPush = TWC.pco.getNodeValue("products", "WebPushNotifications");
            var hasRecentSearchLocs = TWC.pco.getNodeValue("user", "recentSearchLocations");
            hasRecentSearchLocs = hasRecentSearchLocs && hasRecentSearchLocs.length > 0;
            if (document.cookie.indexOf('uplogin') !== -1) {
              // UP user, do not show the banner:
              return false;
            } else if ((!webPush || Object.keys(webPush).length === 0) && hasRecentSearchLocs) {
              // New user, show the banner:
              return true;
            } else if (webPush && webPush.PushStatus === 'ConfirmedPushNotification') {
              // Existing user, already subscribed
              return false;
            } else if (webPush && webPush.PushStatus === 'NoPushNotification' && webPush.timeStamp && hasRecentSearchLocs) {
              // Existing user, but reject/closed banner, need to ask them again after 14 days
              var time = new Date(webPush.timeStamp), currentTime = new Date();
              return (currentTime > new Date(time.setDate(time.getDate() + daysToWait)));
            }
          }
        },

        /** Checks pco, if user previously interacted w/ module. Returns boolean */
        getPcoStatus1: function () {
          if (PCO) {
            var webPush = TWC.pco.getNodeValue("products", "WebPushNotifications");
            return (!!webPush && !!webPush.PushStatus);
          }
        },

        /** Saving user status */
        updatePcoStatus: function (status) {
          if (PCO) {
            var products = TWC.pco.get('products'),
              webPush = products.attributes && products.attributes.WebPushNotifications;
            if (webPush) {
              webPush.PushStatus = status + 'PushNotification';
              webPush.timeStamp = new Date();
              PCO.set('products', products);
            }
          }
        },

        /** Module's animation */
        animatePushNotification: function (slide) {
          $moduleEl[slide](speed);// Sliding animations
        },

        /** Sending event to main.js */
        sendEvent: function () {
          customEvent.getEvent(TWC_SW_push_allow).notify();// Sending event to main.js
        },

        /** Recording tracking */
        tracking: function (trackStr) {
          customEvent.getEvent('track-string-event').notify({
            settings: settings,
            trackStr: 'WebPushNotification' + trackStr
          });
        },

        /** User interaction helper fnc, returns a function */
        userInteractions: function (status, trackString, callBack) {
          return function () {
            PushFnc.animatePushNotification('slideUp');// Animation
            PushFnc.updatePcoStatus(status);// PCO Status
            PushFnc.tracking(trackString);// Tracking

            // 3 cleaning send event here:
            callBack && PushFnc.sendEvent(callBack);
          };
        },

        /** Module initiation  */
        initModule: function () {
          if (this.getPcoStatus()) {
            // Waiting for TWC event
            customEvent.getEvent(TWC_SW_gmPush_ready).progress(function () {// Waiting for main.js event
              if(!alreadyDisplay){
                // Preventing the banner from reappearing
                alreadyDisplay = true;
                // Getting the module
                $moduleEl = angular.element('div.gm-push');
                // Animating from the top or bottom
                $moduleEl.addClass(start ? 'top' : 'bottom'); // Animation starting point
                // Waiting 5s before displaying the module
                $timeout(function () {
                  // Animating the module
                  PushFnc.animatePushNotification('slideDown'); // Sliding animations
                }, waitBeforeAnimating);
              }
            });
          }
        }
      };//End of PushFnc namespace


      /**
       * 3. Functions
       * All work done in the controller goes here in the form of well-defined functions
       */
      var DSX = {
        /** subscribeBreakingNews, setting user w/ breaking news */
        subscribeBreakingNews: function () {
          gmAnonymous.subscribeBreakingNews(endPointToken).then(function (response) {
            // Sending confirmation notification if breaking news is successful
            if (!sentConfirmationNotification) {
              // Sending confirmation
              gmSendNotification.send(welcomeNotifyOptions);
              sentConfirmationNotification = true;
            }
          });
        },

        /** setUpSevereAlerts, setting user w/ severe alerts */
        setUpSevereAlerts: function (location) {
          gmAnonymous.subscribeSevereAlerts(endPointToken, location).then(function (response) {
            // Sending confirmation notification if the 3 locations are successful
            if (!sentConfirmationNotification) {
              // Sending confirmation
              gmSendNotification.send(welcomeNotifyOptions);
              sentConfirmationNotification = true;
            }
          });
        },

        /**
         * createLocation
         * Creates a location, used for signing user w/ setUpSevereAlerts
         * */
        createLocation: function (loc) {
          gmAnonymous.createLocation(loc).then(function (data) {
            DSX.setUpSevereAlerts(data.data);
            // TODO remove me!!!
            //DSX.setUpGlobal8Alerts(data.data);
          });
        },

        /**
         * addLocationDefaults
         * Populates recent locations, then calls createLocation
         * */
        addLocationDefaults: function () {
          // Populating recent locations
          var recentLocations = gmSendNotification.locations('BannerModule');
          if (Array.isArray(recentLocations)) {
            angular.forEach(recentLocations, function (loc, index) {
              // Only for the first 3 locations calls createLocation
              index < 3 && DSX.createLocation(loc.loc);
            });
          }
        },

        /** setEndpoint, Setting the users endpoint */
        setEndpoint: function (token) {
          var _gcm = TWC.pco.get('page').get('screenSize');
          if (_gcm === 'desktopSized') {
            _gcm = 'gcm-web-desktop';
          } else if (_gcm === 'mobileSized') {
            _gcm = 'gcm-web-phone';
          } else {
            _gcm = 'gcm-web-tablet';
          }
          gmAnonymous.setEndpoint(token, _gcm).then(function (data) {
            // Getting the endpoint token
            endPointToken = data.data;
            // Adding defaults: 3 locations
            DSX.addLocationDefaults();
          });
        },

        /**
         * confirmedNotification
         * Handles user subscription after browsers permission prompt confirmed
         * */
        confirmedNotification: function () {
          // Getting token
          var webPush = TWC.pco.getNodeValue("products", "WebPushNotifications");
          // Calling setEndpoint
          webPush && webPush.deviceToken && DSX.setEndpoint(webPush.deviceToken);
        }
      };//End of DSX namespace


      /**
       * 4. Scope setup
       * Consists of scope data setup, scope events setup etc.
       * These are used directly by the view (html) and also during app level event management
       * $scope variables may use the global variables as needed.
       */
      $scope.PushNotification = {
        /** Img asset */
        getLogo: whiteLogoImage,

        /** Set banner text based */
        pageText: settings.is_home_page,

        /** Closing Push Alert */
        closePushNotification: PushFnc.userInteractions('No', '-denied-notifications', null),

        /** Allowing Push Alert */
        allowPushNotification: PushFnc.userInteractions('Confirmed', '-confirmed-notifications', 'sendEvent')
      };// End of $scope.PushNotification namespace


      /**
       * 5. Initiating web push Notification
       * Checking web push conditions to show notification
       */
      PushFnc.initModule();


      /**
       * 6. Event listeners on showing confirmation notification
       * Waiting for module to communicate to RegSW
       */
      customEvent.getEvent(TWC_SW_push_allow_confirmed).progress(function () {
        DSX.confirmedNotification();
      });
    }

  }
]);

;
/**
 * User: Minh Van
 * Date: 02/03/2016
 */
/* global twc */
/*jshint -W065 */
(function(angular, TWC) {
  'use strict';

  angular
    .module('glomo_current_conditions')
    .controller('twc_glomo_current_conditions_controller', GlomoCurrentConditionsController);

  GlomoCurrentConditionsController.$inject = ['$scope', '$q', 'settings', 'eventOrigin', 'customEvent', 'statusCodes', 'PcoPage', 'pcoUser', 'NowcastTurboModel', 'ObservationTurboModel'];

  function GlomoCurrentConditionsController($scope, $q, settings, eventOrigin, customEvent, statusCodes, PcoPage, pcoUser, NowcastTurboModel, ObservationTurboModel){
    /* jshint validthis: true */
    var vm = $scope.currentConditionsVm = this;
    vm.moduleId           = settings.module_id;
    vm.status             = statusCodes.LOADING;
    vm.showOriginalStyles = settings.show_original_styles;
    vm.showDetails        = false;
    vm.toggleDetails      = toggleDetails;

    init();
    getData();

    function init(){
      var eventType     = Modernizr.touch ? 'touchstart.glomoRightNowDetails' : 'mousedown.glomoRightNowDetails';
      var eventOrigins  = {
        detailsButton: eventOrigin.init({
          origin: angular.element('.glomo-right-now .details-button'),
          event: eventType,
          scope: $scope
        }),
        detailsModal: eventOrigin.init({
          origin: angular.element('.glomo-right-now .details'),
          event: eventType,
          scope: $scope
        })
      };

      var $body = angular.element('body').on(eventType, function(event) {
        // if event came from a bonafide origin, then noop
        if (eventOrigins.detailsModal.test(event) || eventOrigins.detailsButton.test(event)) {
          return;
        }

        // otherwise, hide the modal
        $scope.$evalAsync(function() {
          vm.toggleDetails(false);
        });
      });

      $scope.$on('$destroy', function() {
        $body.off('.glomoRightNowDetails');
      });
    }

    function getData(){
      PcoPage.getPagePromises()
        .then(function(){
          getTurboData();
        })
        .catch(function(){
          vm.status = statusCodes.ERROR;
        });
    }

    function getTurboData(){
      var geocode, nowcastModel, observationModel;
      geocode           = PcoPage.getGeocode();
      nowcastModel      = new NowcastTurboModel(geocode),
      observationModel  = new ObservationTurboModel(geocode);

      return $q.all([nowcastModel.execute(), observationModel.execute()])
              .then(function(){
                vm.nowcast                  = nowcastModel.data;
                vm.nowcast.isNowcastSevere  = nowcastModel.data.peakSeverity >= 4;
                vm.obs                      = observationModel.data;

                vm.status = statusCodes.DEFAULT;
              },
              function(){
                vm.status = statusCodes.ERROR;
              });
    }

    function toggleDetails(showDetails) {
      vm.showDetails = angular.isDefined(showDetails) ? showDetails : !vm.showDetails;
      if (vm.showDetails) {
        customEvent.getEvent('track-string-event').notify({
          module_id: vm.moduleId,
          trackStr: 'cc_openDetails'
        });
      }
    }
  }

})(angular, TWC);
;
/**
 * User: gmalhotra
 * Date: 4/22/2014
 * Time: 13:11
 */
/* global twc */
/*jshint -W065 */

(function(angular, TWC) {
  'use strict';

  angular
    .module('glomo_forecast_36hr')
    .controller('twc_glomo_forecast_36hr_controller', GlomoForecast36hrController);

  GlomoForecast36hrController.$inject = ['$scope', '$filter', '$q', 'settings', 'dsxclient', 'customEvent', 'statusCodes', 'datefactory', 'twcUtil', 'PcoPage', 'DatetimeTurboModel', 'DailyForecastTurboModel'];

  function GlomoForecast36hrController($scope, $filter, $q, settings, dsxclient, customEvent, statusCodes, datefactory, twcUtil, PcoPage, DatetimeTurboModel, DailyForecastTurboModel) {
    var openingCard = -1;
    /* jshint validthis: true */
    var vm = $scope.forecast36hrVm = this;

    vm.moduleId         = settings.module_id;
    vm.status           = statusCodes.LOADING;
    vm.rollingForecast  = [];
    vm.isOpenCard       = isOpenCard;
    vm.openCard         = openCard;
    vm.closeCard        = closeCard;


    getData();

    function getData(){
      var geocode, datetimeModel, forecastModel, astroModel = {};

      PcoPage.getPagePromises()
        .then(function(){
          geocode        = PcoPage.getGeocode();
          datetimeModel  = new DatetimeTurboModel(geocode),
          forecastModel  = new DailyForecastTurboModel(geocode);

          return $q.all([datetimeModel.execute(), forecastModel.execute(), getAstroData(astroModel)])
                  .then(function(){
                    initForecast(datetimeModel, forecastModel, astroModel);

                    vm.status = statusCodes.DEFAULT;
                  }, 
                  function(){
                    vm.status = statusCodes.ERROR;
                  });
        })
        .catch(function(){
          vm.status = statusCodes.ERROR;
        });
    }
    function getAstroData(astroModel){
      return dsxclient.execute([
          {$id: 'astro', recordType: 'wxd', recordName: 'Astro', date:'0', numOfDays:'15', fullLocId: TWC.PcoUtils.getURLlocid() }
        ])
        .addResultsTo(astroModel)
        ._promise;
    }
    function initForecast(datetimeModel, forecastModel, astroModel){
      var forecastItems = forecastModel.items;
      var forecastIndex = 0;
      var todaysDate = datetimeModel ? datefactory['new'](datetimeModel.data.datetime, datetimeModel.data.tmZnAbbr).date : null;
      var forecastDay;

      if (todaysDate !== twcUtil.dateTimeToDate(forecastItems[0].validDate)) {
        forecastItems = forecastItems.slice(1);
      }

      do {
         forecastDay = forecastItems[forecastIndex];
         if(!forecastDay){
            break;
          }

        if (hasDay(forecastDay)) {
          forecastDay.day.astro = astroModel.astro.astroData[forecastIndex];
          forecastDay.day.datetime = datetimeModel;
          forecastDay.day.title = getTitle(forecastDay.day);

          if(hasNight(forecastDay)){
            forecastDay.day.hasFullDay = true;
          }

          vm.rollingForecast.push(forecastDay.day);
        }

        if(vm.rollingForecast.length < 3 && hasNight(forecastDay)) {
          forecastDay.night.astro = astroModel.astro.astroData[forecastIndex];
          forecastDay.night.datetime = datetimeModel;
          forecastDay.night.title = getTitle(forecastDay.night);

          if(hasDay(forecastDay)){
            forecastDay.night.hasFullDay = true;
          }

          vm.rollingForecast.push(forecastDay.night);
        }
        forecastIndex++;
      }
      while (vm.rollingForecast.length < 3);
    }
    function hasDay (forecastDay) {
      return forecastDay.day && (forecastDay.day.daytemp || forecastDay.day.phrase);
    }
    function hasNight (forecastDay) {
      return forecastDay.night && (forecastDay.night.nighttemp || forecastDay.night.phrase);
    }

    function isOpenCard(index){
      if(index === undefined || index === null){
        return openingCard > -1;
      }
      else{
        return index === openingCard;
      }
    }
    function openCard(index){
      openingCard = index;

      customEvent.getEvent('track-string-event').notify({module_id: vm.moduleId, trackStr: index + 1 + '_openDetails'});
    }
    function closeCard(){
      openingCard = -1;
    }

    function getTitle(day){
      var todayDsxDateObj     = datefactory['new'](day.datetime.data.datetime, day.datetime.data.tmZnAbbr),
          tomorrowDateObj     = todayDsxDateObj.toDateObject(),
          pfTranslateFilter   = $filter('pfTranslate'),
          dateformatsContext  = {context: 'weather_dateformats'},
          weatherTermsContext = {context: 'weather_terms'},
          abbr                = pfTranslateFilter('EEE', dateformatsContext),
          title;

      // add one day to today to set tomorrow
      tomorrowDateObj.setDate(todayDsxDateObj.day+1);

      var todayDate           = todayDsxDateObj.date,
          tomorrowDate        = datefactory['new'](tomorrowDateObj.toISOString(), day.datetime.data.tmZnAbbr).date,
          forecastDate        = datefactory['new'](day.validDate).date,
          dayOfWeekName       = datefactory['new'](day.validDate).format(abbr),
          dayOfWeekWithNight  = pfTranslateFilter('@dow Night', {context: 'weather_terms', vars : {'@dow' : dayOfWeekName}});


      switch (true) {
        case (todayDate === forecastDate && day.isDay):
            title = pfTranslateFilter('Today', weatherTermsContext);
            break;
        case (todayDate === forecastDate && day.isNight):
            title = pfTranslateFilter('Tonight', weatherTermsContext);
            break;
        case (tomorrowDate === forecastDate && day.isDay):
            title = dayOfWeekName;
            break;
        case (tomorrowDate === forecastDate && day.isNight):
            title = dayOfWeekWithNight;
            break;
        default:
            title = day.isDay ? dayOfWeekName : dayOfWeekWithNight;
          break;
      }

      return title;
    }
  }

})(angular, TWC);
;
/**
 * Directive to that takes in any numeric input and appends % to it and outputs the value. eg: 50%
 */
twc.shared.apps.directive('gmWxPercentage', ['twcUtil','$filter',function (twcUtil, $filter) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      inputValue: '=gmWxPercentage'
    },
    replace: true,
    template: '<span data-ng-bind="output() | safeDisplay"></span>',
    link: function (scope, element, attrs) {
      scope.output = function(){
        return twcUtil.isNumeric(scope.inputValue) ? scope.inputValue + '%' : $filter('safeDisplay')(scope.inputValue);
      };
    }
  };
}]);;
/**
 * User: Chris Whitehead
 * Date: 9/8/2014
 * Time: 9:17
 */
/* global twc */
/*jshint -W065 */
angular
  .module('glomo_cobrand_headers')
  .controller('twc_glomo_cobrand_headers_controller', ['$scope', 'DrupalSettings', 'settings', 'dsxclient', 'twcConfig', function($scope, DrupalSettings, settings, dsxclient, twcConfig) {
    'use strict';
  }]);;

angular
    .module('glomo_breaking_now').value('BreakingNowMock_Severe', {
  "title"     : "BREAKING NOW",
  "headline"  : "ALERT: High Winds and Heavy Snow Pound the Coast of New England",
  "link_url"  : "//www.weather.com/news/tornado-central/severe-weather-tracker-page",
  "color"     : "#AC050F",
  "share"     : {
    "type"    : "social" // Other values include mfw/none
  }
}).value('BreakingNowMock_Severe_MFW', {
  "title"       : "BREAKING NOW",
  "headline"    : "ALERT: High Winds and Heavy Snow Pound the Coast of New England",
  "link_url"    : "//www.weather.com/news/tornado-central/severe-weather-tracker-page",
  "color"       : "#AC050F",
  "share"       : {
    "type"      : "mfw", // Other values include mfw/none
    "locations" : [ // if social/mfw, options is a must have attribute
      {
        "type" : "city_state",
        "value": "Atlanta,Georgia"
      },
      {
        "type" : "city_state",
        "value": "Duluth,Minnesota"
      }
      // Other values
      // {"type" : "state", "value" : "MN"}
      // {"type" : "geolocation", "value" : "33.12,-44.64|60"}
    ]
  }
}).value('BreakingNowMock_Severe_MFW2', {
  "title"       : "BREAKING NOW",
  "headline"    : "ALERT: High Winds and Heavy Snow Pound the Coast of New England",
  "link_url"    : "//www.weather.com/news/tornado-central/severe-weather-tracker-page",
  "color"       : "#DD552A",
  "share"       : {
    "type"      : "mfw", // Other values include mfw/none
    "locations" : [ // if social/mfw, options is a must have attribute
      {
        "type" : "state",
        "value": "Georgia"
      },
      {
        "type" : "state",
        "value": "Minnesota"
      }
      // Other values
      // {"type" : "state", "value" : "MN"}
      // {"type" : "geolocation", "value" : "33.12,-44.64|60"}
    ]
  }
}).value('BreakingNowMock_Severe_MFW3', {
  "title"       : "BREAKING NOW",
  "headline"    : "ALERT: High Winds and Heavy Snow Pound the Coast of New England",
  "link_url"    : "//www.weather.com/news/tornado-central/severe-weather-tracker-page",
  "color"       : "#0E4274",
  "share"       : {
    "type"      : "mfw", // Other values include mfw/none
    "locations" : [ // if social/mfw, options is a must have attribute
      {
        "type" : "geolocation",
        "value": "37.7793,-122.419|50"
      }
      // Other values
      // {"type" : "state", "value" : "MN"}
      // {"type" : "geolocation", "value" : "33.12,-44.64|60"}
    ]
  }
});;
/**
 * User: Ankit Parekh
 * Date: 1/22/2014
 * Time: 9:43
 */
/* global twc */
/*jshint -W065 */
angular
  .module('glomo_local_suite_nav')
  .controller('twc_glomo_local_suite_nav_controller', ["$scope", "settings", "linkerFactory", "customEvent", "twcUtil",
    function($scope, settings, linkerFactory, customEvent, twcUtil) {
      'use strict';

      var menuLinks = settings.menuLinks,
        dropdownTitle = settings.params.dropdown_title,
        dropdownLinks1 = settings.dropdownLinks1 || null,
        dropdownLinks2 = settings.dropdownLinks2 || null,
        tzOffsetOverride = settings.params.tzOffsetOverrride  && settings.params.tzOffsetOverrride !== '' ? parseInt(settings.params.tzOffsetOverrride) : null,
        moduleId = settings.params.module_id;

      /**
       * Validating current links according to link scheduling setup on the linker
       * @param linkList {linker object from linkerFactory}
       * @param tzOffsetOverride {Time zone offset used for scheduling sponsored links (Disney)}
       * @returns {object || null}
       */
      var filterScheduledLinks = function(linkList, tzOffsetOverride) {
        if (linkList && linkList.links.length > 0) {
          for(var i=0; i<linkList.links.length; i++){
            linkList.links[i].link_url = linkerFactory.interpolateLinkUrl(linkList.links[i].link_url);
            if(!linkList.links[i].link_visible_between || !linkerFactory.validateLinkSchedule(linkList.links[i].link_visible_between, tzOffsetOverride)){
              linkList.links.splice(i,1);
              i--; // moving the counter back 1 to adjust for the length
            }
          }
          return linkList;
        } else {
          return null;
        }
      };

      $scope.pageNav = {
        theme: settings.params.theme || 'dark',
        moreForecastText : dropdownTitle !== '' ? dropdownTitle : 'More Forecasts',
        currPath: document.location.pathname,
        moduleId: moduleId,
        hideMenu: !(dropdownLinks1 || dropdownLinks2),
        categories: settings.categories,
        getPathOfLink : function(url) {
          if (typeof url !=='string'){
            return;
          }
          var urlArray = url.split('/');
          // Get this index for removing the location portion of Url
          var locationPathIndex = urlArray.indexOf('l') >= 0 ? urlArray.indexOf('l') : urlArray.length;
          var path = decodeURIComponent(urlArray.slice(1,locationPathIndex).join('/'));
          return path;
        }

      };
      // Need to wait for event from linker_factory for link scheduling
      customEvent.ifReady(["gotCurrentTime", "linker_factory_tempScope"]).then(function(){
        angular.extend($scope.pageNav, {
          menuLinks : filterScheduledLinks(menuLinks, tzOffsetOverride),
          dropdownLinks1 : filterScheduledLinks(dropdownLinks1, tzOffsetOverride),
          dropdownLinks2 : filterScheduledLinks(dropdownLinks2, tzOffsetOverride),
          linksReady: true
        });
        $scope.$evalAsync();
      });

  }]);
;
/**
 * User: Vishal Shrivastava
 * Date: 8/04/2015
 * Time: 11:46
 */
/* global twc */
/*jshint -W065 */
/*jshint indent:2*/

/**
 * Search Controller:  This controller is meant to be a generic controller for all location searches
 * @param  Scope $scope
 * @param  Log $log
 * @param  Timeout $timeout
 * @param  DrupalSettings DrupalSettings
 * @param  settings settings
 * @param  httpclient httpclient
 * @param  twcConfig twcConfig
 * @return Results
 */
angular
  .module('glomo_search')
  .controller('twc_glomo_search_controller',['$scope', '$timeout', '$controller', '$filter', '$q', '$window', 'DrupalSettings', 'settings', 'dsxclient', 'httpclient', 'twcConfig', 'pcoUser', 'twcUtil', 'customEvent', 'aliases', 'twcConstant', '$injector', 'logger', function ($scope, $timeout, $controller, $filter, $q, $window, DrupalSettings, settings, dsxclient, httpclient, twcConfig, pcoUser, twcUtil, customEvent, aliases, twcConstant, $injector, logger) {
  'use strict';

  // extend glomoBaseSearchController
  $controller('glomoBaseSearchController', {$scope: $scope});
  var p = $scope.params;
  p.resultLimit = settings && settings.resultLimit ? parseInt(settings.resultLimit) : 10;

  p.suppressRecentSearches = settings && settings.suppress_recent_searches ? JSON.parse(settings.suppress_recent_searches) : false;
  p.destUrl = settings.destUrl;
  p.profileUrl = settings.profileUrl;
  p.settings = settings;
  p.moduleId = settings.module_id;

  var searchVis = false;

  $scope.createLocArray(settings.loc_type);

  var goToEnhance = function (term) {
    $window.location.href = settings.enhancedUrl + '?where=' + term + '&loctypes=' + p.locTypes + '&from=' + p.moduleId;
  };

  var goToSkiEnhance = function(term) {
    $window.location.href = twcConstant.pageUrl[p.moduleId]['page'] + term + '&loctypes=' + twcConstant.locTypes.Ski + '&from=' + p.moduleId;
  };

  // Check Titan locale before Glomo locale
  var searchLocale = (TWC && TWC.Titan && TWC.Titan.locale) || (TWC && TWC.Configs && TWC.Configs.dsx && TWC.Configs.dsx.locale) || "en_US";

  var landingPage = function(key, item) {
    addToRecentSearch.apply($scope, [item, 'deferLandingPage']);
  };

  var addToRecentSearch = function(item, callback) {
    // Check to see if location is in recent searches or saved locations
    var key = item.getKey && item.getKey() || item.getFullLocId && item.getFullLocId();
    if(item && !!item.data && !$filter('twcFilter').getByProperty('key', key, $scope.getRecentSearches()) && !$filter('twcFilter').getByProperty('key', key, $scope.getSavedLocations())) {
      var rs = $scope.getRecentSearches();
      customEvent.getEvent('locations_changed').progress(function(e) {
        // Ensure recent search got saved b4 redirecting
        if(e.locations.length === 10 || e.locations.length > rs.length) {
          $scope[callback](item);
        }
      });
      $scope.saveRecentSearch(item);
    } else {
      $scope[callback](item);
    }
  };

  var getLocationByLocId = function(locId) {
    if(locId && !$filter('twcFilter').getByProperty('loc', locId, $scope.getRecentSearches()) && !$filter('twcFilter').getByProperty('loc', locId, $scope.getSavedLocations())) {
      $scope.getLocationByLocId(locId).then(function(response) {
        var res = response.getModel({recordType : "wxd", recordName : p.wxdRecords.loc, locale: searchLocale, fullLocId: locId});
        if(res) {
          landingPage(locId, $scope.getXwebLocFromLoc(res));
        } else {
          // Will probably never get here
          goToEnhance(locId);
        }
      }, function(error) {
        // do nothing yet
      });
    }
  };

  var is121Match = function (item, term) {
    if (item && item.result && item.result === p.noResult) { return null; }
    var match = term.indexOf(',') > 0 ? term.split(',') : term.split(' '),
      shortName = item.getCountryCode().toLowerCase(),
      name = (shortName === 'us') ? item.getStateCode().toLowerCase() : item.getCountry().toLowerCase();

    angular.forEach(match, function (v, k) {
      match[k] = v.trim();
    });
    return (jQuery.inArray(item.getCity().toLowerCase(), match) === 0 && (jQuery.inArray(name, match) === 1) || jQuery.inArray(shortName, match) ===1) ? item.getKey() : null;
  };

  var isValidState = function(term) {
    var st = term.toLowerCase();
    if (term.length === 2 && aliases.state[st]) {
      return st;
    } else {
      return null;
    }
  };

  // ========= Override base controller functions ===================
  $scope.goSelectItem = function (item) {
    if (item) {
      logger.debug('should go to today page if location is big city or an exactly match otherwise go to multi-results page.');
      var fromStr = '',
        trackStr = '',
        term = $scope.term.toLowerCase();
      $scope.term = item.autoSelect ? term : item.getFormattedName($scope.$root.isMobile);
      if (!item.result && (!item.autoSelect || item.autoSelect && item.isBigCity() || $scope.results.length === 1 || item.getLocType() === twcConstant.locTypes.Airports && term.length === 3)) {
        if (term.length === 0) {
          fromStr = 'recentsearchresolved';
          trackStr = 'recentsearch';
        } else {
          fromStr = (item.autoSelect ? 'localsearch' : 'typeahead');
          trackStr = (item.autoSelect ? 'localsearchresolved' : 'typeaheadresolved');
        }
        $scope.tracking(fromStr, trackStr);
        landingPage(item.getKey(), item);
      } else {
        // TODO - Suppressing enhanced searches for now for Burda.
        if (p.minChar === 2 && !!isValidState(term)) {
          $scope.tracking('localsearch', 'localsearchresolved');
          goToSkiEnhance(term);
        } else if (aliases.specialty[term]) {
          $scope.tracking('localsearch', 'localsearchresolved');
          getLocationByLocId(aliases.specialty[term]);
        } else {
          var match = is121Match(item, term);
          if (!!match) {
            $scope.tracking('localsearch', 'localsearchresolved');
            landingPage(match, item);
          } else {
            trackStr =  item.result ? 'localsearcherror' : 'localsearchresults';
            $scope.tracking('localsearch', trackStr);
            goToEnhance(term);
          }
        }
      }
    }
  };

  // For mobile show saved locations instead if recent locations are suppressed
  $scope.showRecentSearches = function() {
    var suppressed = $scope.params.suppressRecentSearches;
    if($scope.$root.isMobile && suppressed) {
      $scope.results = $scope.getSavedLocations();
    }
    return suppressed === true ? 'Suppressed' : 'Recent';
  };

  $scope.validatePageUrl = function(url) {
    url = $scope.ensureUrlSlash(p.destUrl);
  };

  // =========== End of overriding functions ==========================

  $scope.deferLandingPage = function(key) {
    var theKey = typeof key === 'object' ? key.getKey() : key;
    $window.location.href = $scope.ensureUrlSlash(p.destUrl) + theKey;
  };

  var pfTranslateFilter = $filter('pfTranslate');
  $scope.placeHolder = pfTranslateFilter("Search city, zip or place", {context: 'glomo_base_search'});
  $scope.term = '';
  $scope.fromString = p.moduleId + 'typeahead';
  $scope.config = [{recordType : "xweb", locale: searchLocale, recordName : p.xwebRecords.webLoc, locTypes: ''}];

  $scope.manageLocations = function() {
    $window.location.href = (p.profileUrl && p.profileUrl !== '') ? p.profileUrl : '/life/profile';
  };

  $scope.validate = function(value) {
    var childScope = scope.$$childHead,
      valid = true;
    logger.debug('go search');
    if(value === scope.placeholderText) {
      valid = false;
      childScope.$apply(function() {
        childScope.isValid = false;
      });
    }
    return valid;
  };

  $scope.getLocTypes = function() {
    return p.locTypes;
  };
  /**
   * searchVis: helper function
   * @returns {*}
   */
  $scope.searchVis = function () {
    return searchVis;
  };

  /**
   * isVisible: shows the mobile search input field
   * @returns {*}
   */
  $scope.toggleVis = function () {
    searchVis = !searchVis;
  };


}]);;
/**
 * Created with JetBrains WebStorm.
 * User: Anh Pham The
 * Date: 6/27/2015
 * Time: 7:28
 * To change this template use File | Settings | File Templates.
 */
angular
  .module('gm_header_main_menu_resp')
  .controller('twc_gm_header_main_menu_resp_controller', [
    '$scope', 'twcUtil', 'settings', 'customEvent', '$window', 'gmLocations', 'twcPco', 'throttler', 'GlomoSocialAPI',
    function($scope, twcUtil, settings, customEvent, $window, gmLocations, twcPco, throttler, GlomoSocialAPI) {
      'use strict';
      /** Scope Setup */
      var profileUrl = TWC && TWC.profile && TWC.profile.base_url;
      $scope.settings = settings;

      $scope.responsive = {
        isMobile: false,
        menuBtn: true, // menu open btn
        closeBtn: false, // X close btn
        showMore: false,
        showMoreBtn: true,
        showLessBtn: false,
        showSignOn: false,
        modal : {
          height: 600,
          width: 750
        },
        isShowSignOnBtn: settings.isShowSignOnBtn,
        isStickyNav: settings.isStickyNav,
        notifyLink: settings.isAddNotificationToggle,
        myProfileLinksShown: false
      };
      $scope.header_locales = {
        international: settings.header_international_links
      };

      GlomoSocialAPI.loadAPI();

      customEvent.getEvent('ups-post-message').progress(function(payload) {
        $scope.$evalAsync(function() {
          $scope.responsive.showSignOn= !payload.data.close;
        });
      });

      customEvent.getEvent('ups-signin-message').progress(function(payload) {
        $scope.$evalAsync(function() {
          $scope.origin = payload.data.origin;
          $scope.headerMainMenu.signIn();
        });
      });

      customEvent.getEvent('ups-signup-message').progress(function(payload) {
        $scope.$evalAsync(function() {
          $scope.origin = payload.data.origin;
          $scope.headerMainMenu.signUp();
        });
      });

      customEvent.getEvent('twc-ups-alert').progress(function(payload) {
        $scope.$evalAsync(function() {
          $scope.responsive.iframeSrc = profileUrl + payload.data.type;
          $scope.responsive.showSignOn= true;
        });
      });

      $scope.headerMainMenu = {
        showMyProfileLinks: function() {
          $scope.responsive.myProfileLinksShown = true;
        },
        hideMyProfileLinks: function() {
          $scope.responsive.myProfileLinksShown = false;
        },
        myProfileClickToggle: function() {
          if ($scope.responsive.myProfileLinksShown) {
            $scope.responsive.myProfileLinksShown = false;
          } else {
            $scope.responsive.myProfileLinksShown = true;
          }
        },
        isLoggedIn: function() {
          return !!jQuery.cookie('uplogin');
        },
        tempUnitChnaged: function() {
          location.reload();
        },
        signIn: function() {
          $scope.responsive.iframeSrc = profileUrl + '/login.html#/login' + getProfileQuerystring();
          $scope.responsive.showSignOn= true;
        },
        signUp: function() {
          $scope.responsive.iframeSrc = profileUrl + '/login.html#/registration' + getProfileQuerystring();
          $scope.responsive.showSignOn= true;
        },
        signOut: function(){
          gmLocations.pcoDatasource.savedLocations.removeAll().then(function() {
            $window.location.href = 'https://profile.weather.com/#/signout';
          });
        },
        toggleMainMenu: function() {
          $scope.responsive.isMobile = !$scope.responsive.isMobile;
          $scope.responsive.menuBtn = !$scope.responsive.menuBtn;
          $scope.responsive.closeBtn = !$scope.responsive.closeBtn;
          angular.element('body').toggleClass('is-main-menu-opened');
          $scope.idx = false;
        },
        showMore: function(idx) {
          $scope.idx = idx;
          $scope.responsive.showMore = true;
          $scope.responsive.showMoreBtn = false;
        },
        showLess: function() {
          $scope.responsive.showMore = false;
          $scope.responsive.showMoreBtn = true;
        }
      };
      
      /***********************************************
       *
       * Private Functions
       */

      function getProfileQuerystring() {

        /***
         * Add the parameters
         */
        var qsParams = [];
        qsParams.push(getOrigin());
        //qsParams.push(getAnonymousId());
        qsParams.push(getLocale());
        qsParams.push(getCountry());

        /***
         * Export the querystring
         */
        var qsParamsString = '';
        if (qsParams.length > 0) {
          qsParamsString = '?' + qsParams.filter(Boolean).join('&');
        }
        return qsParamsString;

        /*function getAnonymousId() {
          var anonymousId = '';
          var anonymousIdParam = '';
          var isLoggedIn = !!jQuery.cookie('uplogin');
          if (!isLoggedIn) {
            anonymousId = twcPco.getNodeValue('user', 'rmid');
          }
          if (anonymousId) {
            anonymousIdParam = 'anonid=' + encodeURIComponent(anonymousId);
          }
          return anonymousIdParam;
        }*/
        // Ignore touchmove when main menu opened
        
        function getLocale() {
          var localeParam = '';
          var locale = twcPco.getNodeValue('page', 'locale');
          if (locale) {
            localeParam = 'locale=' + locale;
          }
          return localeParam;
        }

        function getCountry() {
          var countryParam = '';
          if ($window.esidata && $window.esidata.country) {
            var country = $window.esidata.country;
            if (twcUtil.isString(country) && country.length === 2) {
              countryParam = 'country=' + country;
            }
          }
          return countryParam;
        }

        function getOrigin() {
          var originParam = '';
          if ($scope.origin) {
            originParam = 'origin=' + $scope.origin;
          }
          return originParam;
        }

      }

    }
  ]);
;
/*==================================================================
=            Built By Crystal Gardner and Will Bowling             =
=            With a little help from Noel M. (:                    =
==================================================================*/


(function (angular) {
    'use strict';

    angular
        .module('gm_header_main_menu_resp')
        .directive('stickyNav', stickyNav);

    stickyNav.$inject = ['$window'];

    function stickyNav($window) {
        return {
            restrict: 'E',
            link: link
        };

        function link(scope, elem) {
            var navContainer = elem.parents('.today.glomo-header');
            var hdrContainer = elem.parents('.region.navigation');
            var fixed = 'nav-fixed';
            var hasSubnav = navContainer.find('.glomo_local_suite_nav').length;
            var ticking;
            var lastY;
            var navOffset;

            /**
             *
             * Scroll Magic!!!
             *
             */

            angular.element($window).on('scroll', onScroll);

            /**
             *
             * Setup requestAnimationFrame "bucket" to queue the scroll.
             *
             */

            function _requestTick() {
                if (!ticking) {
                    requestAnimationFrame(scrollNav);
                }
                ticking = true;
            }

            /**
             *
             * Check Offset and request "bucket"
             *
             */

            function onScroll() {
                lastY = window.scrollY || window.pageYOffset; /*----------  IE11 doesn't recognize scrollY ):  ----------*/
                navOffset = hdrContainer.offset().top;
                _requestTick();
            }

            /**
             *
             * Adding fixed class to nav.
             *
             */

            function scrollNav() {
                if (lastY > navOffset) {
                    var placeholderHeight = hdrContainer.outerHeight(true);
                    navContainer.addClass(fixed);
                    hdrContainer.css('padding-top', placeholderHeight+'px');
                } else {
                    navContainer.removeClass(fixed);
                    hdrContainer.css('padding-top', '0');
                }
                ticking = false;
            }
        }
        /*=====  End of Link Function  ======*/

    }


})(angular);
;
(function () {
  twc.shared = twc.shared || {};
  twc.shared.apps = twc.shared.apps || angular.module('shared',[]);

  twc.shared.apps.requires.push('slickCarousel');

})();
;
window.TWC = window.TWC || {};
TWC.adUtil = TWC.adUtil || {};
TWC.adUtil.sponsoredStoriesAd = function(adObj){
    var spon = jQuery('#WX_SponsoredStories'),
      module = spon.parents('.glomo_content_media'),
      instanceId = module.attr('instance'),
      ad_index = Drupal.settings.twc.instance[instanceId].ad_index,
      el = jQuery('li:eq(' + ad_index + ')',module),
      adContainer = jQuery('.wx-ad-container',el),
      inner = jQuery('.wx-inner',el).first();

  jQuery('.wx-image-wrapper .wx-media', adContainer).attr('href',adObj && adObj.href);
  jQuery('.wx-image-wrapper .wx-media', adContainer).attr('title',adObj && adObj.title);
  jQuery('.wx-image-wrapper .wx-media img', adContainer).attr('src', adObj && adObj.image);
  jQuery('h3 a.wx-content-header', adContainer).attr('href',adObj && adObj.href);
  jQuery('h3 a.wx-content-header', adContainer).attr('title',adObj && adObj.title);
  jQuery('.wx-title-wrapper p', adContainer).html(adObj && adObj.title);
  //jQuery('h3 a', adContainer).eq(1).html(adObj && adObj.title);
  jQuery('h3 > span', adContainer).html(adObj && adObj.attribution);

  adContainer.css('visibility',"visible");
  adContainer.css('opacity',1);
  inner.css('opacity',0);

};
;
(function (angular) {
  angular
    .module('glomo_content_media')
    .directive('dmaContent', populateDmaContent);

  function populateDmaContent() {
    return {
      restrict: 'EA',
      scope: {
        data: '=dmaContent',
      },
      link: function (scope, elem, attrs) {
        function getIcon(queryModel) {
          var iconType = queryModel.getType() || (queryModel.data && queryModel.data.icon);
          if (iconType) {
            if (iconType === 'video') {
              return 'wx-icon-video';
            } else if (iconType === 'image') {
              return 'wx-icon-photo';
            } else {
              return false;
            }
          }
        }

        scope.$watch('data', function (data) {
          if (data) {
            elem.removeClass('hidden');
            var queryModel = data;
            var icon = getIcon(queryModel);
            elem.find('.headline').text(queryModel.getTitle());
            elem.find('.headline-link').attr('href',queryModel.getUrl());
            elem.find('.wx-media-image').attr('href',queryModel.getUrl());
            elem.find('.wx-media-image img')
              .attr('data-src',queryModel.getVariants()[2])
              .attr('data-srcset',
                queryModel.getVariants()[2]+' 160w, ' +
                queryModel.getVariants()[8]+' 320w, ' +
                queryModel.getVariants()[9]+' 485w, ' +
                queryModel.getVariants()[10]+' 650w, ' +
                queryModel.getVariants()[11]+' 815w'
              )
              .addClass('lazyload');
            if (!queryModel.data.fallbackCorsican) {
              elem.find('.wx-media-image .wx-media-label').text('Local Story');
            } else {
              elem.find('.wx-media-image .wx-media-label').remove();
            }
            if (icon) {
              elem.find('.wx-media-image .wx-iconfont-global').addClass(icon);
            }
            if (queryModel.getProviderName()){
              elem.find('.wx-media-category')
                .attr('href', '/' + queryModel.getPrimaryCollectionId())
                .text(queryModel.getProviderName());
            }
            if (queryModel.getCollectionData().getTitleImage()) {
              var elTitleImage = '<a class="provider-logo" href="/'+queryModel.getPrimaryCollectionId()+'">By <img src="'+queryModel.getCollectionData().getTitleImage()+'"/></a>';
              elem.find('.wx-media-content').append(elTitleImage);
            }

          }

        });
      }
    };
  }
})(angular);
;
(function (angular) {
  angular
    .module('glomo_content_media')
    .controller('twc_glomo_content_media_controller', GlomoContentMediaController);
  angular
    .module('glomo_content_media')
    .directive('glomoContentMediaIndexer', glomoContentMediaShow);

    glomoContentMediaShow.$inject = ['PcoPage'];

    function glomoContentMediaShow(PcoPage) {
      return {
        restrict: 'EA',
        scope: {
          count: '=',
          showLess: '=',
          showMore: '=',
          limit: '@',
          mobileLimit: '@'
        },
        link: function (scope, elem, attrs) {
          var limit = parseInt(attrs['glomoContentMediaShow'], 10);
          var observer = new MutationObserver(function(mutations) {
            scope.count = elem.children().length;
            elem.children().each(function (i, e) {
              i++;
              e.setAttribute('data-gcm-index', i);
              if (scope.showLess && (i > (scope.mobileLimit)) && PcoPage.getScreenSize() !== 'desktopSized') {
                e.className = e.className.indexOf('mobile-hidden') === -1 ? e.className + ' mobile-hidden' : e.className;
                angular.element(e).hide();
              }

              if (i % 2 === 0) {
                e.className = e.className.indexOf('wx-module-even') === -1 ? e.className + ' wx-module-even' : e.className;
              } else {
                e.className = e.className.indexOf('wx-module-odd') === -1 ? e.className + ' wx-module-odd' : e.className;
              }
            });
          });
          observer.observe(elem[0], {
              childList: true,
              subtree: true
          });
        },
        controller: function ($scope, $element) {
          $scope.$watch('showMore', function (val) {
            //$scope.showMore.showMobileHidden = function () {
            //  $element.find('li.mobile-hidden')
            //    .removeClass('mobile-hidden')
            //    .show();
            //};
          });
        }
      };
    }

    GlomoContentMediaController.$inject = ['$scope', 'settings', 'PcoMetrics', '$interpolate', 'PcoPage', 'twcUtil', 'dsxclient', 'twcPco', 'DrupalSettings', 'CmsAModelClass'];

    function GlomoContentMediaController($scope, settings, metrics, $interpolate, PcoPage, _, dsxclient, twcPco, DrupalSettings, CmsAModelClass) {
      var vm = this;
      vm.moduleId = settings.module_id;
      vm.pageName = metrics.getPageName();
      vm.settings = settings;
      vm.corsicans = settings.cm && settings.cm.corsicans || [];

      PcoPage.getPagePromises()
        .then(function () {
          var pageLocation = PcoPage.getCurrentLocation();

          var showMobile = vm.settings.template_config_available && vm.settings.template_config.show_more_text;

          // list of location based queries to be made client side
          var locParams = ['dma', 'gpr', 'state', 'country', 'region'];
          var dsxLocQueryTemplateMap = {
            'dma': 'DMA:{{cntryCd}}.{{dmaCd}}:{{cntryCd}}',
            'state': 'state:{{cntryCd}}.{{stCd}}:{{cntryCd}}',
            'country': 'country:{{cntryCd}}:{{_gprId}}',
            'gpr': 'geo_pol:{{_gprId}}:EARTH',
            '4reg': '4reg:{{cntryCd}}.{{lsRad}}:{{cntryCd}}',
            '9reg': '9reg:{{cntryCd}}.{{ssRad}}:{{cntryCd}}'
          };
          var dsxQueryConfig = {
            recordType: "cms",
            recordName : "a"
          };

          var assetsRendered = 0;
          var corsicanCount = 0;

          getData(corsicanCount);

          function getData(corsicanCount) {
            var corsican = vm.corsicans[corsicanCount];

            var limit = +vm.settings.limit;

            if (assetsRendered >= limit ||
              corsicanCount === vm.corsicans.length) {
              return; //break out of forEach
            }

            if (!corsican) {
              return;
            }

            if (!corsican.render_client_side) {
              assetsRendered++;
              corsicanCount++;
              return getData(corsicanCount); // continue
            }

            var query = corsican.query_data;

            if (!query) {
              var tempModel = new CmsAModelClass({
                title: corsican.title,
                fallbackCorsican: true,
                description: corsican.description,
                variants: corsican.variants,
                url: corsican.link_url,
                icon: corsican.icon
              });
              tempModel.options = {
                new_tab: !!corsican.new_tab,
                icon: corsican.icon,
                attribution: corsican.attribution
              };

              // assign model array to corsican
              vm['corsican_' + corsican.position] = [tempModel];

              assetsRendered++;
              corsicanCount++;
              return getData(corsicanCount);
            }

            var remainderToRender = limit - (assetsRendered);

            query.limit = query.limit <= remainderToRender ? query.limit : remainderToRender;

            assetsRendered += (+query.limit);

            var dsxQueryCustParams = {};
            // used in dsx call
            var geoParams = [];

            if ('type' in query) {
              dsxQueryCustParams.type = angular.isArray(query.type) ? query.type : Object.keys(query.type);
            }

            locParams.forEach(function (locParam) {
              var locOptions = query[locParam];

              if (locOptions && locOptions.enabled) {
                var locSrc = locOptions.source;

                var prefixKey = locParam;
                if (locParam === 'region') {
                  if (locSrc === 'other') {
                    if (locOptions.other.indexOf('region:4') > -1) {
                      prefixKey = '4reg';
                    } else {
                      prefixKey = '9reg';
                    }
                  }

                  if (locSrc === 'page_4') {
                    prefixKey = '4reg';
                  } else {
                    prefixKey = '9reg';
                  }
                }

                var val;

                // set page location into query
                if (locSrc !== 'other' && pageLocation && !('error' in pageLocation)) {
                  val = $interpolate(dsxLocQueryTemplateMap[prefixKey])(pageLocation);
                } else if (locSrc.other && locSrc.other.length > 0) {
                  var regMatch = locSrc.other.match(/\((.*)\)/);
                  if(regMatch && regMatch.length === 2) {
                    val = regMatch[1];
                  }
                }

                if (val) {
                  geoParams.push(val);
                }


              }
            });

            if (geoParams.length > 0) {
              dsxQueryCustParams['tags.geo'] = geoParams;
            }

            if (query.primary_collection) {
              dsxQueryCustParams['pcollid'] = query.primary_collection.split(',').map(function (item) {
                return _.trim(item);
              });
            }

            if (query.keyword) {
              dsxQueryCustParams['keyword'] = query.keyword.split(',').map(function (item) {
                return _.trim(item);
              });
            }

            var sortRecent = query.sort_param && query.sort_param === "sort_recent";
            var sortPublish = query.sort_param && query.sort_param === "sort_publishdate";

            var paramMap = (function() {
              if (sortRecent) {
                return {
                  sort: '-lastmodifieddate'
                };
              }

              if (sortPublish) {
                return {
                  sort: '-publishdate'
                };
              }

              return {};
            })();

            var config = _.extend({
              position: corsican.position,
              use_teaser_title: query.use_teaser_title,
              show_provider: query.show_provider,
              custom_params: {
                query: [dsxQueryCustParams],
                start: query.start_index || 0,
                end: query.limit || 1
              }
            }, dsxQueryConfig);

            dsxclient.execute([config], paramMap)
              .then(function (response) {
                var model = response.getModel(config);

                if (!model) {
                  vm['corsican_' + config.position] = 0;
                  assetsRendered -= (+query.limit);
                  corsicanCount++;
                  return getData(corsicanCount);
                }

                if (!(model instanceof Array)) {
                  model = [model];
                }

                // Set title override for cms query
                if (config.use_teaser_title || config.show_provider || config.position) {
                  model.forEach(function (result) {
                    var pcollId = result.getPrimaryCollectionId();

                    var dConfig = {
                      recordType: 'cms',
                      recordName: 'collections',
                      path: pcollId
                    };

                    dsxclient.execute([dConfig])
                      .then(function (response) {
                        var model = response.getModel(dConfig);
                        result.category = model.getTitle();
                        result.category_link = model.getUrl();
                        result.showTeaserTitle = !!config.use_teaser_title;
                        result.showProvider = !!config.show_provider;
                        result.position = config.position;
                      });
                  });
                }

                // assign model array to controller
                vm['corsican_' + config.position] = model;

                // If the query limit is more than what is actually returned
                // subtract the difference from assetsRendered since assetsRendered
                // already accounted for the assumed query limit
                if (query.limit > model.length) {
                  assetsRendered = assetsRendered - (query.limit - model.length);
                }

                corsicanCount++;
                getData(corsicanCount);
              });
          }
      });

      vm.weatherView = getWeatherView(twcPco);

      // used by directive
      vm.count = 0;

      vm.showMore = {
        isClicked: false
      };

      vm.showMoreContent = function () {
        vm.showMore.isClicked = true;
        vm.showMore.showMobileHidden();
      };


      vm.isMobile = function () {
        return PcoPage.getScreenSize() !== 'desktopSized';
      };


      vm.showMoreButton = function () {

        var showMoreText = vm.settings.template_config_available && vm.settings.template_config.show_more_text;
        var mobileLimit = vm.settings.template_config_available && vm.settings.template_config.mobile_limit;

        return !vm.showMore.isClicked && vm.isMobile() && showMoreText && mobileLimit > 0;
      };




    }

    function getWeatherView(twcPco) {
      var localsuite = twcPco.getNodeValue('products','localsuite');
      if (twcPco.getNodeValue('page','content').match(/today|hourly|weekend|5day|10day/)) {
        return localsuite && localsuite.weatherView || "list";
      } else {
        return '';
      }
    }

})(angular);

;
/**
 * Directive to display visibility. eg: 10.0 mi or 16.0 km
 */
twc.shared.apps.directive('gmWxVisibility', ['pcoUser','$filter',function (pcoUser) {
  'use strict';
  return {
    restrict: 'A',
    template: '<span data-ng-bind="output() | safeDisplay"></span>',
    replace: true,
    scope: {
      visibility: '=gmWxVisibility'
    },
    link: function (scope, element, attrs) {
      scope.output = function () {
        if (angular.isDefined(scope.visibility) && (scope.visibility !== null)) {
          if (scope.visibility === 0) {
            return 0 + ' ' + pcoUser.getDistanceUnit();
          } else if (scope.visibility < 0) {
            return null;
          } else {
            return parseFloat(scope.visibility).toFixed(1) + ' ' + pcoUser.getDistanceUnitLabel();
          }
        } else {
          return null;
        }
      };
    }
  };
}]);;
angular
  .module('glomo_cobrand_headers')
  .directive('glomoWxCoBrandHeader',  [ 'PcoPage',  function (PcoPage) {
    'use strict';

    var templatePath = '/sites/all/modules/glomo/modules/glomo_cobrand_headers/templates/',
        templateMapping = {
          earthlinkHTML : templatePath + 'earthlink_co_brand.html',
          nbcnewsHTML     : templatePath + 'nbcnews_co_brand.html',
          peoplepcHTML  : templatePath + 'peoplepc_co_brand.html'
        };

    return {
      restrict: 'A',
      templateUrl: (function () {
        var partnerVal = PcoPage.getPartner(),
            _return;
        if (partnerVal === "nbcnews") {
          _return = templateMapping.nbcnewsHTML;
        } else if (partnerVal === "peoplepc") {
          _return = templateMapping.peoplepcHTML;
        } else if (partnerVal === "earthlink") {
          _return = templateMapping.earthlinkHTML;
        }
        return _return;
      }())
    };
  }]);;
/**
 * Author: ksankaran (Velu)
 * Date: 7/9/14
 * Time: 3:48 PM
 * Comments:
 */

angular
  .module('glomo_breaking_now')
  .directive('glomoBreakingNow', [function() {
    return {
      priority    : 0,
      replace     : false,
      templateUrl : '/sites/all/modules/glomo/modules/glomo_breaking_now/templates/breaking_now_content.html',
      scope       : '=',
      restrict    : 'EA'
    };
  }]);
;
angular
  .module('glomo_local_suite_nav')
  .directive('responsiveMenu', ['$window', '$timeout', 'twcUtil', function ($window, $timeout, twcUtil) {
    'use strict';

    return {
      restrict: 'A',
      compile: function compile(tElement) {
        var $subnav = tElement.find('[data-more-menu-item]');
        var $subnavTrigger = $subnav.find('> a');
        var $subnavContent = $subnav.find('> ul');
        var $overflowTarget = angular.element('<ul/>').addClass('overflow-content list-group');
        var $overflowElements = tElement.find('[data-menu-item]');

        function setAriaAttributes() {
          tElement.attr('role', 'menubar');
          $subnavTrigger.attr('role', 'menuitem');
          $subnavTrigger.attr({
            "aria-haspopup": "true",
            "aria-expanded": "false"
          });
        }

        function setCssClasses(){
          tElement.addClass('menubar');
          $subnav.addClass('dropdown');
          $subnavContent.addClass('dropdown-menu');
          $subnavTrigger.addClass('dropdown-toggle');
        }

        setAriaAttributes();
        setCssClasses();

        //clone elements into the more menu
        for (var e = 0; e < $overflowElements.length; e++) {
          var newElement = angular.element($overflowElements[e]).addClass('ng-hide').clone();
          newElement.find('.dropdown-menu').removeClass('dropdown-menu');
          $overflowTarget.prepend(newElement);
        }
        $subnavContent.prepend($overflowTarget);
        return this.link;
      },
      link: function (scope, element, attrs) {
        var MOBILE_SIZE = 465;
        var MAX_NUMBER_MOBILE_ITEMS = 4;
        var root = element[0];
        var wdw = angular.element($window);

        // Remove ng-hide so we can take some measurements
        var showAllMenuItems = function() {
          // Display overflow elements
          var elements = element.find(' > [data-menu-item]');
          angular.element(elements).removeClass('ng-hide');
          // Display dropdown trigger
          var moreMenuItem = root.querySelector('[data-more-menu-item]');
          angular.element(moreMenuItem).removeClass('ng-hide');
        };

        // Returns array of menu item sizes
        var getElementsSize = function () {
          var elements = element.find(' > [data-menu-item]');
          var elementsSize = [];
          for (var e = 0; e < elements.length; e++) {
            var size = elements[e].offsetWidth;
            if (size > 0) {
              elementsSize[e] = elements[e].offsetWidth;
            }
          }
          return elementsSize;
        };

        var getMoreElementSize = function () {
          return root.querySelector('[data-more-menu-item]').offsetWidth;
        };

        var getVisibleItems = function (_maxWidth) {
          showAllMenuItems();
          var visibleItems = [];
          var moreElementSize = getMoreElementSize();
          var elementsSize = getElementsSize();
          var sum = 1;
          var sumWithDropdownSize = moreElementSize + 1;
          var items = element.find(' > [data-menu-item]');

          for(var i = 0; i < items.length; i++) {
            sum += elementsSize[i];
            sumWithDropdownSize += elementsSize[i];

            if(sum > _maxWidth ||
              (sumWithDropdownSize > _maxWidth && i < (items.length - 1)) ||
              (_maxWidth <= MOBILE_SIZE && i === MAX_NUMBER_MOBILE_ITEMS)) {
                return visibleItems;
            } else {
              visibleItems.push(i);                
            }
          }
          return visibleItems;
        };

        var getOverflowElements = function(){
          var overflowElements = root.querySelectorAll('.overflow-content > li');
          var $overflowTarget = angular.element(root.querySelector('[data-overflow-target]'));
          if ($overflowTarget.length){
            for (var i = overflowElements.length; i >= 0; i--) {
              $overflowTarget.prepend(overflowElements[i]);
            }
            element.find('.overflow-content').remove();
            overflowElements = $overflowTarget.find('[data-menu-item]');
          }
          return overflowElements;
        };

        var setActiveItem = function(){
          var pagePath = attrs.menuControl;
          var menuLinks = root.querySelectorAll('[data-menu-control] [data-menu-item]');
          var i;
          
          for (i=0;i<menuLinks.length;i++) {
            if (pagePath === menuLinks[i].getAttribute('data-menu-item')) {
              angular.element(menuLinks[i]).addClass('active');
            }
          }

          var moreMenuItem = root.querySelector('[data-more-menu-item]');
          var moreMenuLinks = root.querySelectorAll('[data-menu-control] [data-more-item]');
          for (i=0;i<moreMenuLinks.length;i++) {
            if (pagePath === moreMenuLinks[i].getAttribute('data-more-item')) {
              angular.element(moreMenuItem).addClass('active');
            }
          }
        };

        var buildMenu = function () {
          var maxWidth = root.offsetWidth;
          var visibleItems = getVisibleItems(maxWidth);

          var elements = element.find(' > [data-menu-item]');
          var moreElements = getOverflowElements();
          var moreMenuToggle = root.querySelector('[data-more-menu-item]');

          if (visibleItems.length < element.find(' > [data-menu-item]').length) {
            angular.element(moreMenuToggle).removeClass('ng-hide').attr('aria-hidden', 'false');

            for (var i = 0; i < elements.length; i++) {
              if (visibleItems.indexOf(i) !== -1) {
                angular.element(elements[i]).removeClass('ng-hide').attr('aria-hidden', 'false');
                angular.element(moreElements[i]).addClass('ng-hide').attr('aria-hidden', 'true');
              } else {
                angular.element(elements[i]).addClass('ng-hide').attr('aria-hidden', 'true');
                angular.element(moreElements[i]).removeClass('ng-hide').attr('aria-hidden', 'false');
              }
            }
          } else {

            if (attrs.hideMenu === 'true') {
              angular.element(moreMenuToggle).addClass('ng-hide').attr('aria-hidden', 'true');
            }

            angular.element(elements).removeClass('ng-hide').attr('aria-hidden', 'false');
            angular.element(moreElements).addClass('ng-hide').attr('aria-hidden', 'true');
          }
        };

        wdw.bind('resize',
          twcUtil.throttle(buildMenu,500)
        );

        scope.$on('$destroy', function () {
          wdw.unbind('resize', buildMenu);
        });


        scope.$watch(
          function(){
            return root.querySelector('[data-ng-href]') && root.querySelector('[data-ng-href]').getAttribute('data-ng-href');
          },
          function(newVal,oldVal) {
            if (newVal !== oldVal){
              buildMenu();
              setActiveItem();
            }
          }
        );
      }
    };
}]);
;
/**
 * User: Nam Nguyen
 * Date: 08/10/2015
 * Time: 12:27
 */
/* global twc */
/*jshint -W065 */

angular
  .module('glomo_search')
  .directive('glomoSearch', ['$window', '$timeout', function ($window, $timeout) {
    'use strict';
    return {
      restrict: 'A',
      controller: ['$scope', '$element', function($scope, $element) {
        $scope.mobSearchVisible = false;
        $scope.toggleMobSearch = function() {
          $scope.mobSearchVisible= !$scope.mobSearchVisible;
          var mobSearchContainer = $element.closest('.glomo_search');
          if ($scope.mobSearchVisible === true){
            mobSearchContainer.css({'width':'100%'});
            $timeout(function () {
              mobSearchContainer.find('input[type=text]').focus();
            });
            mobSearchContainer.find('input[type=text]').trigger("click");
          } else {
            mobSearchContainer.css({'width':'45px'});
          }
        };
      }],
      link: function (scope, element, attr) {
        var tabletWidth = 767;
        var mobSearchContainer = element.closest('.glomo_search');
        var currentWidth = $window.innerWidth;
        angular.element($window).bind("resize", function() {
          if ($window.innerWidth > tabletWidth) {
            mobSearchContainer.css({'width':'100%'});
          } else if ($window.innerWidth <= tabletWidth && currentWidth !== $window.innerWidth) {
            mobSearchContainer.css({'width':'45px'});
            scope.mobSearchVisible = false;
            scope.$apply();
            currentWidth = $window.innerWidth;
          }
        });
      }
    };
  }]);
;
(function (angular) {
  angular
    .module('glomo_social_sharing')
    .directive('glomoSocialBarPosition', ['$window', 'pcoUser', function ($window, pcoUser) {
      'use strict';
      var _socialSharing = null;

      return {

        link: function (scope, elem) {
          var $ = angular.element,
            layoutType = scope.socialSharing && scope.socialSharing.getLayoutType() || 'auto';

          if (scope.socialSharing && !_socialSharing) {
            _socialSharing = scope.socialSharing;
          }

          if (layoutType !== 'auto' && layoutType !== 'vertical' && layoutType !== 'horizontalBottom' && !pcoUser.getBrowser().ltIE9) {
            scope.toolPos = "bottom";
            return;
          }

          var adjustElemPosition = function () {
            layoutType = scope.socialSharing && scope.socialSharing.getLayoutType();
            if ((layoutType === 'auto' || pcoUser.getBrowser().ltIE9) && $(window).width() <= 1268) {
              elem.css('bottom', 0).show();
              // set tooltip to top
              scope.toolPos = "top";
            }
            else if (layoutType === 'horizontalBottom' || pcoUser.getBrowser().ltIE9) {
              elem.css('bottom', 0).show();
              // set tooltip to top
              scope.toolPos = "top";
            }
            else {
              // bottom anchor, slide up
              elem.css('bottom', '15px').show();
              // set tooltip to right
              scope.toolPos = "right";
            }
          };

          $(window).on('load resize', adjustElemPosition);

          if (domready) {
            domready(function () {
              adjustElemPosition();
            });
          }

        }
      };
    }]);
})(angular);
;
/**
 * User: Jeff Lu
 * Date: 8/29/2014
 * Time: 8:54
 */
/* global twc */
/*jshint -W065 */
(function (angular) {
  angular
    .module('glomo_social_sharing')
    .controller('twc_glomo_social_sharing_controller', ['$controller', '$scope', 'DrupalSettings', 'settings', '$window', 'pcoUser', '$timeout', 'PcoPage',
      function twc_glomo_social_sharing_controller($controller, $scope, DrupalSettings, settings, $window, pcoUser, $timeout, PcoPage) {
        'use strict';
        $controller('glomoSocialSharingController', {$scope: $scope, settings: settings});

        /** vars */
        var $ = angular.element,
          body = $('body'),
          wrapper = $('.social-wrapper');


        /** scope setup */
        $scope.socialSharing = {
          toggleExpand: false,

          getTheme: function () {
            if (settings.theme === 'auto') {
              return body.hasClass('light') ? 'light' : 'color';
            }
            else {
              return settings.theme;
            }
          },
          // getTooltipPosition: function() {
          //   var layoutType = $scope.socialSharing.getLayoutType();
          //   if (layoutType === 'horizontal' || 'horizontalStatic' || wrapper.css('bottom') === '0px') {
          //     return 'top';
          //   }
          //   else {
          //     return 'right'
          //   };
          // },
          getLayoutType: function () {
            if (settings.position === 'auto' && pcoUser.getBrowser().ltIE9) {
              if (document.documentElement.clientWidth >= 1270) {
                return 'vertical';
              } else {
                return 'horizontalBottom';
              }
            }
            else {
              return settings.position;
            }
          }
        };

        /** init */
          //PcoPage.getPagePromises().then(function() {
        $scope.initSocial(settings);
        //});
      }
    ]);
})(angular);
;
/**
* Created with JetBrains PhpStorm.
* User: Tran Kim Hieu
* Date: 6/20/2015
* Time: 12:59
* To change this template use File | Settings | File Templates.
*/

/**
* Updated by cmwhitehead
* Data: 10-15-15
*/
/* global twc */
/*jshint -W065 */
angular
  .module('gm_location_title')
  .controller('twc_gm_location_title_controller', ['$scope', 'settings', '$interpolate', 'PcoPage', '$rootScope', 'twcConfig', 'dsxclient', '$filter',
    function($scope, settings, $interpolate, PcoPage, $rootScope, twcConfig, dsxclient, $filter) {
      'use strict';
      var status = twcConfig.module_status_codes;
      var controller = {
        moduleSettings: settings,
        title: "",
        timeZone: "",
        updatedTime: "",
        status: status.LOADING,
        title_type: settings.title_type,
        timestamp: (!!settings.timestamp) ? !!settings.timestamp : false,
        showObsText: (!!settings.showObsText) ? !!settings.showObsText : false,
        glomoPrintButton : (!!settings.glomoPrintButton) ? !!settings.glomoPrintButton : false,
        displayWeatherText: (!!settings.displayWeatherText) ? !!settings.displayWeatherText : false,

        getTimeStamp: function() {
          var locId = TWC.PcoUtils.getURLlocid();
          var config = [{$id: "obs", recordType: "wxd", recordName: "MORecord", fullLocId: locId},
              {$id : "csModel" ,recordType : "cs", recordName : "datetime", fullLocId : locId}];
          var promise = dsxclient.execute(config);
          promise['then'](["csModel", "obs", function (csModel, obs) {
            var locLocalDatetime = csModel;
            var obsDatetime = obs;
            controller.timeZone = locLocalDatetime.getTimeZoneAbbr();
            controller.updatedTime = obsDatetime.getLocalObsTime();
            controller.status = status.DEFAULT;
          }]);
          promise['catch'](function () {
            controller.status = status.ERROR;
          });
        },

        init: function () {
          // interpolation should be done by instance directive but for some reason if this happens first, interpolate it here.
          if (settings.title && settings.title.indexOf("{{") !== -1 && settings.title.indexOf("}}") !== -1) {
            controller.title = $interpolate(settings.title)($rootScope);
          } else {
            var translateFilter = $filter("pfTranslate");
            controller.title = settings.title === "" ? $rootScope.dynamicLocName : translateFilter(settings.title, {context: 'gm_location_title'});
          }
          if(controller.timestamp){
            controller.getTimeStamp();
          }
        }
      };
      $scope.controller = controller;


      /**
       * Start turning the wheel!
       */
      PcoPage.getPagePromises().then(function() {
          controller.init();
      });
    }
  ]);
;
/**
 * Created with JetBrains PhpStorm.
 * User: Son Dinh
 * Date: 6/22/2015
 * Time: 21:44
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

/*jshint latedef: nofunc */
angular
  .module('gm_alerts')
  .controller('twc_gm_alerts_controller',  gmAlertsCtrl);

gmAlertsCtrl
  .$inject = ['$scope',
    'settings',
    'dsxclient', 
    'twcConfig',
    'glomoAlertFactory'
  ];

function gmAlertsCtrl($scope, settings, dsxclient, twcConfig, glomoAlertFactory) {
  'use strict';
   
  /** 1. Settings **/
  var vars = {
    wxdRecords: twcConfig.dsxclient.wxd.records,
    locId: TWC.PcoUtils.getURLlocid(),
    config: null,
    modulefromstring: settings.module_id,
    POLLEN_ALERT_TRIGGER_VALUE: 3,
    showPollen: settings.showPollen,
    pollenUrl: settings.pollenUrl,
    detailUrl: settings.detailUrl,
    
    getConfig: function() {
      return [{
        $id: 'location',
        recordType: 'wxd',
        recordName: vars.wxdRecords.loc,
        fullLocId: vars.locId
      }, {
        $id: 'bullentins',
        recordType: 'wxd',
        recordName: vars.wxdRecords.bulletin,
        fullLocId: vars.locId
      }];
    },
    init: function() {
      vars.config = vars.getConfig();
      if (vars.showPollen) {
        vars.config.push({
          recordType: 'wxd',
          recordName: vars.wxdRecords.pollen,
          fullLocId: this.locId
        });
      }
    }
  };

  /** 2. function**/
  var fns = {
    getData: function() {
      dsxclient
        .execute(vars.config)
        .then(
          function(response) {

            var location = response.getModel(vars.config[0]);
            var bulletins = response.getModel(vars.config[1]);
            var pollenIdx;

            if (location !== null && bulletins !== null) {
              if(vars.showPollen){
                pollenIdx = response.getModel(vars.config[2]);
              }
              $scope.alerts.bulletins = glomoAlertFactory.getAlerts(bulletins, pollenIdx, vars.locId, vars.pollenUrl, vars.detailUrl);
              $scope.alerts.priority = $scope.alerts.bulletins.shift();
            }
          }
        );
    }
  };

  /**3. scope setup**/
  $scope.alerts = {
    bulletins: [],
    timeZone: '',
    priority: null,
    moduleId : settings.module_id,
    hasAlerts: function() {
      return !!$scope.alerts.priority;
    },
    hasMultipleAlerts: function() {
      return $scope.alerts.bulletins.length > 0;
    },
    getAlertCount:function(){
      return $scope.alerts.bulletins.length + 1;
    }
  };
  /** 4. Init **/
  vars.init();
  fns.getData();

};
/**
 * User: Son Dinh
 * Date: 8/4/2015
 * Time: 0:48
 */
/* global twc */
/*jshint -W065 */

/*jshint latedef: nofunc */
angular
  .module('gm_alerts')
  .directive('gmAlertsTime',alertsTime);

function alertsTime() {
  'use strict';
  
  return {
    scope: {
      alertInfo: "=gmAlertInfo",
      background: "=gmAlertBackground",
      showIcon: "=gmAlertShowIcon",
      moduleId: "@moduleIdVal"
    },
    restrict: 'AE',
    transclude: true,
    templateUrl: '/sites/all/modules/glomo/modules/gm_alerts/templates/gm_alerts_time_template.html'
  }; 
}
;
/**
 * Directive to display pressure along with the pressure icon appended. eg: 30.20-> or 998.20->
 */
twc.shared.apps.directive('gmWxPressure', ['pcoUser','$filter', function (pcoUser,$filter) {
  'use strict';
  return {
    restrict: 'A',
    template: '<span data-ng-bind="hasPressure() | safeDisplay"></span> <span data-ng-if="hasPressureValue() && getBarometricText()" aria-hidden="true" class="wx-iconfont-global {{pressureIconClass()}} "></span>',
    scope: {
      pressure: '=gmWxPressure',
      barometricText: '=wxPressureText'
    },
    link: function (scope, element, attrs) {
   
      scope.hasPressureValue = function () {
        return scope.pressure === 0 || !!scope.pressure;
      };
      scope.getBarometricText = function () {
        return scope.barometricText && scope.barometricText.toLowerCase();
      };
      scope.hasPressure = function () {
        if (scope.pressure) {
          return pcoUser._get('unit') === 'e' ? scope.pressure.toFixed(2) + ' ' + pcoUser.getPressureUnitLabel() : scope.pressure.toFixed(1) + ' ' + pcoUser.getPressureUnitLabel();
        }
      };
      scope.pressureIconClass = function () {
        var trend = scope.getBarometricText(),
        pfTranslateFilter = $filter('pfTranslate'),
        risingStr = pfTranslateFilter(('rising'), {context: 'weather_terms'}).toLowerCase(),
        risingRapidlyStr = pfTranslateFilter(('rising rapidly'), {context: 'weather_terms'}).toLowerCase(),
        fallingStr = pfTranslateFilter(('falling'), {context: 'weather_terms'}).toLowerCase(),
        fallingRapidlyStr = pfTranslateFilter(('falling rapidly'), {context: 'weather_terms'}).toLowerCase(),
        steadyStr = pfTranslateFilter(('steady'), {context: 'weather_terms'}).toLowerCase(),
        pressureIconClass =
          trend === risingStr || trend === risingRapidlyStr ? 'wx-icon-arrow-up-4' :
          trend === fallingStr || fallingRapidlyStr ? 'wx-icon-arrow-down-4' :
          trend === steadyStr ? '' : '';
        return trend ? pressureIconClass : '';
      };
    }
  };
}]);;

/* global twc angular */

twc.glomo_smart_banner.app.controller('twc_glomo_smart_banner_controller', ['$filter', 'PcoDevice',
    function($filter, $PcoDevice){
	'use strict';

	var $ = angular.element;
    var headElem = $('head');
	$PcoDevice.onReady(function() {
	// console.log($PcoDevice.getBrowserOS());
	if ($PcoDevice.getBrowserOS() === 'Android') {
        headElem.append('<scr'+'ipt src="/sites/all/modules/glomo/shared/glomo_smart_banner/vendor/jquery.smartbanner.js"></scr'+'ipt>');
        headElem.append('<meta name="google-play-app" content="app-id=com.weather.Weather">');
        var targetUrl = "http://c00.adobe.com/277dc43326d8171afd9be1845e0d584d922ee9945f833cb07a4d87a08dc0cebe/and_tab_ttn01/g/";
        if ($PcoDevice.getDClass() === 'mw4') {
            targetUrl = "http://c00.adobe.com/9933ac58-35d5-41b5-80a8-93f2a0ff4ca1/and_phe_ttn01/g/";
        }
        var translateFilter = $filter('pfTranslate');
		var asbTranslationString = {
            'button' : translateFilter('VIEW', {context: 'glomo_smart_banner'}),
            'price' : translateFilter('FREE', {context: 'glomo_smart_banner'}),
            'google_play' : translateFilter('IN Google Play', {context: 'glomo_smart_banner'})
			};
		$.smartbanner({
				title: 'Weather',
				author: 'The Weather Channel, LLC',
				icon: 'http://s.w-x.co/TWC_logo_100x100.gif',
				button: asbTranslationString.button,
				price: asbTranslationString.price,
				inGooglePlay: asbTranslationString.google_play,
				daysReminder: 30,
				daysHidden : 0,
				androidSmartBannerUrl : targetUrl
			});		
	}
	});
}]);;
/**
 * Author: ksankaran (Velu)
 * Date: 7/8/14
 * Time: 1:11 PM
 * Comments: This module will query cms/settings/breakingnow and shows the alert if there is one.
 */
angular
  .module('glomo_breaking_now')
  .controller('twc_glomo_breaking_now_controller', ['$scope', 'dsxclient', 'twcPco', '$rootScope', 'GlomoSocialAPI', 'settings', function ($scope, dsxclient, twcPco, $rootScope, GlomoSocialAPI, settings) {
    var vars = {};

    var fns = {
      init: function (callback) {
        dsxclient.execute([
          {$id: "bnModel", recordType: "cms", recordName: "BreakingNow"}
        ]).then(["bnModel", function (bnModel) {
          callback && callback.apply($scope.breaking_now, [bnModel]);
        }]);
      },
      loadGigya: function () {
        if (!GlomoSocialAPI.apiLoaded) {
          GlomoSocialAPI.loadAPI();
        }
      }

    };

    $scope.isTouch = $rootScope.isTouch;
    $scope.moduleId = settings.module_id;
    $scope.breaking_now = {
      model: {},
      fb: {},
      display: false,
      process: function (model) {
        if (model && model.getTitle()) {
          // enable gigya now.
          fns.loadGigya();

          this.model = model;
          this.pagename = ((twcPco.get('metrics') && twcPco.get('metrics').attributes.pagename) || '');
          this.display = true;
          this.cid = twcPco.getNodeValue("metrics", "contentChannel") || "";
        }
      }
    };

    fns.init($scope.breaking_now.process);
  }]);
;
/**
 * Created with JetBrains PhpStorm.
 * User: Tam Dao
 * Date: 6/27/2015
 * Time: 7:28
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */

(function(angular, $, TWC) {
  'use strict';
  angular
    .module('gm_header_savedlocations')
    .controller('twc_gm_header_savedlocations_controller', GmHeaderSavedLocationsTurboController);

  GmHeaderSavedLocationsTurboController.$inject = ['$injector', '$scope', 'twcUtil', 'dsxclient', 'twcConfig', 'pcoUser', 'glomoAlertFactoryTurbo', 'gmLocations', 'customEvent', 'settings', '$filter', '$q', 'ObservationTurboModel', 'PollenObsTurboModel'];

  function GmHeaderSavedLocationsTurboController($injector, $scope, _, dsxclient, twcConfig, pcoUser, glomoAlertFactoryTurbo, gmLocations, customEvent, settings, $filter, $q, ObservationTurboModel, PollenObsTurboModel) {

    var logger = $scope.$log.getInstance('gm_header_savedlocations');
    var NOT_AVAILABLE_STR = $filter('pfTranslate')("N/A", {context: 'weather_terms'});
    var NO_SKY_CODE = "44",
        NO_DATA = "noData";
    var wxdRecords = twcConfig.dsxclient.wxd.records;

    /******************************************************
     *
     * PUBLIC INTERFACE
     */
    var vm = this;
    vm.moduleId = settings.module_id;
    vm.userLocations = [];
    vm.settings = settings;
    vm.tempUnitChanged = function() {
      location.reload();
    };
    vm.notifyLink = settings.isAddNotificationToggle;


    /******************************************************
     *
     * EVENT HANDLERS
     */

    customEvent.getEvent('pcoReady').then(function(){
      loadLocations();
    });

    var profileLocationsLoaded = customEvent.getEvent("profileLocationsLoaded");
    if (profileLocationsLoaded) {
      profileLocationsLoaded.progress(function() {
        loadLocations();
      });
    }

    gmLocations.recentLocations.subscribeListChanged(function() {
      loadLocations();
    });

    gmLocations.savedLocations.subscribeListChanged(function() {
      loadLocations();
    });

    /******************************************************
     *
     * PRIVATE FUNCTIONS
     */

    function loadLocations() {
      vm.savedLocations = [];
      vm.recentLocations = [];
      vm.userLocations = [];

      var savedLocations = gmLocations.savedLocations.list;
      if (savedLocations.length) {
        getUserLocations(savedLocations).then(function(data){
          vm.savedLocations = data;
        });
      }

      var recentLocations = gmLocations.recentLocations.list;
      if (recentLocations.length) {
        getUserLocations(recentLocations).then(function(data){
          vm.recentLocations = data;
        });
      }

      var userLocations = savedLocations.concat(recentLocations);
      if (userLocations.length) {
        getUserLocations(userLocations).then(function(data){
          vm.userLocations = data;
        });
      }
    }

    function getUserLocations(locations) {

      var deferred = $q.defer();
      var promises = [];
      var pollens = {},
          observations = {};

      var bulletinConfigs = getDsxConfigsByLocations(locations, wxdRecords.bulletin);
      promises.push(dsxclient.execute(bulletinConfigs));
      
      _.each(locations, function(location) {
        var geoCode = location.getGeocode();
        if (!geoCode || geoCode.split(',')[0].length === 0 || geoCode.split(',')[0].length === 0) {
          logger.error('The location does not has geoCode', location);
          return;
        }

        //Initialize ObservationTurboModel
        observations[geoCode] = new ObservationTurboModel(geoCode);
        promises.push(observations[geoCode].execute());

        //Initialize PollenObsTurboModel
        if(settings.isAddPollenAlert) {
          pollens[geoCode] = new PollenObsTurboModel(geoCode);
          promises.push(pollens[geoCode].execute());
        }
      });

      $q.all(promises)
        .then(function (response) {
          var bulletinResponse = response[0];
          var tempUserLocations = [];

          _.each(locations, function(location) {
            var pollen = {};
            var geoCode = location.getGeocode();
            if (!geoCode || geoCode.split(',')[0].length === 0 || geoCode.split(',')[0].length === 0) {
              return;
            }

            if (settings.isAddPollenAlert) {
              pollen = pollens[geoCode];
            }

            var bulletinAlerts = bulletinResponse.getModel({
                  fullLocId: location.getFullLocId(),
                  recordType: "wxd",
                  recordName: wxdRecords.bulletin
                });
            var userLocation = createLocation(location, observations[geoCode]);
            var alerts = glomoAlertFactoryTurbo.getAlerts(bulletinAlerts, pollen);

            userLocation.alert = {
              count: alerts.length,
              severityCode: alerts[0] && alerts[0].severityCode
            };

            tempUserLocations.push(userLocation);
          });

          deferred.resolve(tempUserLocations);
        });

      return deferred.promise;
    }

    function getDsxConfigsByLocations(locations, recordName) {

      var configs, config = {
        recordType: "wxd",
        recordName: recordName
      };
      configs = _.map(locations, function(location) {
        var fullLocId = location.getFullLocId();
        return _.extend({
          fullLocId: fullLocId
        }, config);
      });

      return configs;
    }

    function createLocation(location, obs) {
      var label;
      if (location) {
        label = getLabel(location);
      }
      return {
        locUrl: settings.weatherTodayUrl + location.getFullLocId(),
        fullLocId: location.getFullLocId(),
        skyCode: !obs ? _NO_SKY_CODE : obs.getSkyCode(),
        noData: !obs ? _NO_DATA : "",
        noSkyCode: !obs ? _NOT_AVAILABLE_STR : "",
        temp: !obs ? _NOT_AVAILABLE_STR : obs.getTemp(),
        tempUnit: !obs ? _NOT_AVAILABLE_STR : obs.getTempUnit(),
        label: label,
        curWeather: !obs ? "" : obs.getWeatherDescription(),
        locObj: location.attrs
      };
    }

    function getLabel(xwebWebLocModel_Loc) {
      var label = 'N/A';
      if (xwebWebLocModel_Loc.data) {
        if (!xwebWebLocModel_Loc.data.tag) {
          label = xwebWebLocModel_Loc && !_.isEmpty(xwebWebLocModel_Loc.getNickname()) ? xwebWebLocModel_Loc.getNickname() : buildFullName(xwebWebLocModel_Loc);
        } else {
          label = xwebWebLocModel_Loc.data.tag.toUpperCase();
        }
      } else if (xwebWebLocModel_Loc.attrs) {
        if (!xwebWebLocModel_Loc.attrs.tag) {
          label = xwebWebLocModel_Loc && xwebWebLocModel_Loc.getNickname() && xwebWebLocModel_Loc.getNickname().length !== 0 ? xwebWebLocModel_Loc.getNickname() : buildFullName(xwebWebLocModel_Loc);
        } else {
          label = xwebWebLocModel_Loc.attrs.tag.toUpperCase();
        }
      } else {
        if (!xwebWebLocModel_Loc.tag) {
          label = xwebWebLocModel_Loc && xwebWebLocModel_Loc.nickname && xwebWebLocModel_Loc.nickname.length !== 0 ? xwebWebLocModel_Loc.nickname : buildFullNameForPcoDatasource(xwebWebLocModel_Loc);
        } else {
          label = xwebWebLocModel_Loc.tag.toUpperCase();
        }
      }
      return label;
    }

    function buildFullName(location) {
      if (!location) {
        return;
      }
      var label;
      if (!location.recentSearch) {
        if (location.getCountryCode().toLowerCase() === 'us') {
          label = location.getCity() + ", " + location.getStateCode();
        } else {
          label = location.getCity() + ", " + _.capitalize(location.getCountry(), true);
        }
      } else {
        label = location.getFormattedName();
      }
      return label;
    }

    function buildFullNameForPcoDatasource(location) {
      if (!location) {
        return;
      }
      var label;
      if (location.cntryCd.toLowerCase() === 'us') {
        label = toTitleCase(location.cityNm) + ", " + location.stCd;
      } else {
        label = toTitleCase(location.cityNm) + ", " + _.capitalize(location._country, true);
      }
      return label;
    }

    /***
     * Capitalize the first letter of the city
     */
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

  }

})(angular, jQuery, TWC);;
/**
 * Created by rriggs on 6/12/14.
 */
twc.shared.apps.config(['twcMessageProvider',function(twcMessageProvider) {
	twcMessageProvider.add({
		"fr_FR" : {
      "error_handler.GENERIC_ERROR_TITLE" : "Oups!",
      "error_handler.GENERIC_ERROR_DESCRIPTION" : "On dirait que cette fonctionnalité n'a pas tout à fait charger correctement ... S'il vous plaît revenez bientôt.",
      "error_handler.NOT_AVAILABLE_TITLE" : "Nous sommes désolés...",
      "error_handler.NOT_AVAILABLE_DESCRIPTION" : "Données n'est pas actuellement disponible pour cet emplacement."
		}
	});
}]);;
angular
  .module('gm_location_title')
  .directive("fitText", ['$timeout', 'fitTextDefaultConfig', 'fitTextConfig', function($timeout, fitTextDefaultConfig, fitTextConfig) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        angular.extend(fitTextDefaultConfig, fitTextConfig.config);

        var parent = element.parent();
        var compressor = attrs.fittext || 1;
        var loadDelay = attrs.fittextLoadDelay || fitTextDefaultConfig.loadDelay;
        var nl = element[0].querySelectorAll('[fittext-nl],[data-fittext-nl]').length || 1;
        var minFontSize = attrs.fittextMin || fitTextDefaultConfig.min || Number.NEGATIVE_INFINITY;
        var maxFontSize = attrs.fittextMax || fitTextDefaultConfig.max || Number.POSITIVE_INFINITY;

        /** Modified by thanh.tran (kodeq) */
        if(maxFontSize === 'currentFontSize'){
          maxFontSize = element.css('font-size');
        }
        
        var resizer = function() {
          element[0].style.lineHeight = '1';
          element[0].style.display = 'inline-block';
          element[0].style.fontSize = '10px';
          var ratio = element[0].offsetHeight / element[0].offsetWidth / nl;
          element[0].style.fontSize = Math.max(
            Math.min((parent[0].offsetWidth - 6) * ratio * compressor,
              parseFloat(maxFontSize)
            ),
            parseFloat(minFontSize)
          ) + 'px';
          /** Modified by thanh.tran (kodeq) */
          element[0].style.lineHeight = 'normal';
          element[0].style.display = 'block';
        };

        $timeout( function() { resizer(); }, loadDelay);
        /** Modified by thanh.tran (kodeq) */
        scope.$watch(attrs.ngBind, function() { resizer(); });
        /** Modified by thanh.tran (kodeq) */
        fitTextDefaultConfig.debounce ? 
              angular.element(window).bind('resize', fitTextDefaultConfig.debounce(resizer, fitTextDefaultConfig.delay)) : 
              angular.element(window).bind('resize', resizer);
      }
    };
  }]);;

angular
  .module('gm_location_title')
  .provider('fitTextConfig', function() {
    var self = this;
    this.config = {};
    this.$get = function() {
      var extend = {};
      extend.config = self.config;
      return extend;
    };
    return this;
  });;
angular
  .module('gm_location_title')
  .value('fitTextDefaultConfig', {
    'debounce': false,
    'delay': 250,
    'loadDelay': 10, /** Modified by thanh.tran (kodeq) */
    'min': undefined,
    'max': undefined
  });;
angular
  .module('gm_location_title')
  .directive('locationTitle', function($compile) {
    'use strict';
    return {
      scope: {
        titleType: '@',
        locationTitle: '@',
        displayWeatherText: "=displayWeatherText",
        weatherText: '=weatherText'
      },
      link: function(scope, element, attrs) {
        var titleType = scope.titleType;
        var htmlTitleArray = ['<', titleType, ' class="text-truncate" data-fit-text data-fittext-max="currentFontSize" data-fittext-min="16" ng-click="getFullTitle()" data-ng-bind="locationTitle"></', titleType, ">"];
        var htmlTitle = angular.element(htmlTitleArray.join(''));
        element.append(htmlTitle);
        var titleElement = $compile(htmlTitle)(scope);
        scope.getFullTitle = function() {
          titleElement.toggleClass('text-truncate');
        };

        var getLocationTitle = scope.$watch(function(){
          return titleElement[0].innerText;
        }, function(_new, _old){
          var innerTEXT;
          if(scope.displayWeatherText){
            if(_new !== _old){
              getLocationTitle(); // clear the watch..
              innerTEXT = titleElement[0].innerText;
              titleElement[0].innerText =  innerTEXT + " " +scope.weatherText;
            }
          }
        });
      }
    };
  });;
/**
 * Directive to display snow accumulation with icon and unit
 */
twc.shared.apps.directive('gmWxSnowAccumulation', ['pcoUser', function (pcoUser) {
  'use strict';
  return {
    restrict: 'A',
    template: '<span data-ng-if="::gmWxSnowAccumulation"><span class="accumulation-value" data-ng-bind="::accumulation"></span> <span class="accumulation-unit" data-ng-bind="::unit"></span></span>',
    scope: {
      gmWxSnowAccumulation: '='
    },
    link: function (scope, element, attrs) {
      scope.accumulation = scope.gmWxSnowAccumulation.replace(/ /g,'');
      scope.unit = pcoUser.getAccumulationUnitLabel();
    }
  };
}]);;
/**
 * Created with JetBrains PhpStorm.
 * User: Tam Dao
 * Date: 6/27/2015
 * Time: 7:28
 * To change this template use File | Settings | File Templates.
 */
/* global twc */
/*jshint -W065 */
(function(angular, $, TWC) {
  'use strict';

  angular
    .module('gm_header_savedlocations')
    .directive('gmUserLocations', gmUserLocation);

    function gmUserLocation() {
      
      var directive = {
          restrict: 'A',
          templateUrl: '/sites/all/modules/glomo/modules/gm_header_savedlocations/components/user_locations/user_locations.html',
          scope: {
            userLocations: '=gmUserLocations',
            savedLocations: '=gmSavedLocations',
            recentLocations: '=gmRecentLocations',
            tempUnitChanged: '&gmTempUnitChanged',
            settings: '=gmSettings'
          },
          replace: true,
          controller:  GmUserLocationsController,
          controllerAs: 'userLocationVm',
          bindToController: true
      };

      return directive;
    }

    GmUserLocationsController.$inject = ['$scope', '$element', '$window', '$timeout', 'twcUtil', 'pcoUser'];

    function GmUserLocationsController($scope, $element, $window, $timeout, _, pcoUser) {

      var MAX_WIDTH_LOCATION = 210,
          MAX_HEADER_LOCATIONS = 3,
          WIDTH_OFFSET = 135,
          timeoutId;

      var userLocationVm = this;

      userLocationVm.tempUnitDisplay = pcoUser.getTempUnit();

      //LOCALE MAPPING - change the locales that are different from the default format

      var locale = pcoUser.getLocale(),
          localeLast = locale.split("_").pop(), // last 2
          localeFirst = locale.substring(0, 2); // first 2

      userLocationVm.notifyLink = userLocationVm.settings.isAddNotificationToggle;

      userLocationVm.localeDisplay = [];

      (function(){
        if (localeLast === "AE" ) {
          userLocationVm.localeDisplay = "AR";
        } else if (localeFirst === "ca" ) {
          userLocationVm.localeDisplay = "CA";
        }
        else {userLocationVm.localeDisplay = localeLast;}
      })();

      var editionLocale = pcoUser.getEditionLocale();
      if(window.location.pathname === '/' && locale && locale.indexOf('US') === -1) {
        window.location.pathname = editionLocale;
      }


      $scope.$watchCollection('userLocationVm.userLocations', reloadLocations);
      $window.addEventListener('resize', updateDisplayLocations);

      resetLocations();

      function updateDisplayLocations() {
        $timeout.cancel(timeoutId);
        timeoutId = $timeout(reloadLocations, 200);
      }

      function resetLocations() {
        userLocationVm.locations = [];
        userLocationVm.otherLocations = [];
      }

      function reloadLocations() {
        var width = $element.width();
        resetLocations();
        _.each(userLocationVm.userLocations, function(location, index) {
          if ((width > MAX_WIDTH_LOCATION * (index + 1) + WIDTH_OFFSET) && userLocationVm.locations.length < MAX_HEADER_LOCATIONS) {
            userLocationVm.locations.push(angular.copy(location));
          } else {
            userLocationVm.otherLocations.push(angular.copy(location));
          }
        });

        if (userLocationVm.userLocations && userLocationVm.userLocations.length && !userLocationVm.locations.length){
          userLocationVm.locations.push(angular.copy(userLocationVm.userLocations[0]));
          userLocationVm.otherLocations.splice(0, 1);
        }
      }

    }

})(angular, jQuery, TWC);;
/**
 * Header Saved Locations Directive
 * cmwhitehead
 */

(function(angular, $, TWC) {
  'use strict';

  angular
    .module('gm_header_savedlocations')
    .directive('gmHeaderSavedLocationsLocationMigration', gmHeaderSavedLocationsLocationMigration);

    function gmHeaderSavedLocationsLocationMigration() {

      var directive = {
          restrict: 'A',
          replace: true,
          /**
           *  'over_top_left' position is added to ui-bootstrap-custom-tpls-0.13.4.js
           *  scope: { title: '@', content: '@', placement: '@', popupClass: '@', animation: '&', isOpen: '&' },
           */
          templateUrl: '/sites/all/modules/glomo/modules/gm_header_savedlocations/components/location_migration/location_migration.html',
          scope: { 
            moduleId: '@'
          },
          controller:  HeaderSavedLocationsLocationMigrationController,
          controllerAs: 'locationMigrationVm',
          bindToController: true
      };

      return directive;

    }

    HeaderSavedLocationsLocationMigrationController.$inject = ['$scope', '$timeout', 'gmLocations', 'twcPco', 'customEvent'];

    function HeaderSavedLocationsLocationMigrationController($scope, $timeout, gmLocations, twcPco, customEvent) {
      var moduleId = $scope.moduleId;

      var locationMigrationVm = this;

      /*************************
       *
       * Public Interface
       *
       */

      locationMigrationVm.isBannerOpen = false;

      locationMigrationVm.openProfileModal = function () {
        locationMigrationVm.isBannerOpen = false;
        setBannerDismissed();
        gmLocations.modals.profile.open();
      };

      locationMigrationVm.closeBanner = function () {
        locationMigrationVm.isBannerOpen = false;
        setBannerDismissed();
      };

      /*************************
       *
       * Self Initialization
       *
       */

      (function init() {
        if (showOnPageLoad()) {
          $timeout(function () {
            locationMigrationVm.isBannerOpen = true;
            displayedCTA_trackEventHandler();
          }, 2 * 1000);
        }
        gmLocations.migration.syncEventHandler($scope);
      }());

      /*************************
       *
       * Private Functions
       *
       */

      function showOnPageLoad() {
        var isManageLocationsPage = window.location.href.match(/weather\.com\/life\/profile/);
        var profileIsMerged = !!(twcPco.getNodeValue('profile', 'savedLocations') || {}).profileIsMerged;
        var hasLocalStorageLocations = (twcPco.getNodeValue('user', 'savedLocations') || []).length > 0;
        var isSignedIn = twcPco.get('user').signedIn();

        if(isBannerDismissed()) {
          return false;
        }

        if(isSignedIn) {
          return false;
        }

        if(profileIsMerged) {
          return false;
        }

        if(!hasLocalStorageLocations) {
          return false;
        }

        if(isManageLocationsPage) {
          return false;
        }

        return true;
      }

      function displayedCTA_trackEventHandler() {
        customEvent.getEvent('track-string-event')
          .notify({
            module_id: moduleId,
            attrs: {
              trackStr: 'saved_locations_cta',
              linkTrackEvents: 'event82',
              linkTrackVars: 'event82',
              events: 'event82'
            }
          });
      }

      function setBannerDismissed() {
        // "Profile - Location Management - 2 Week [promo] Banner [is] Closed"
        var manageLocations = twcPco.getNodeValue('products', 'manageLocations') || {};
        manageLocations.ctaBannerDismissed = true;
        twcPco.setNodeValue('products', 'manageLocations', manageLocations);
      }

      function isBannerDismissed() {
        // "Profile - Location Management - 2 Week [promo] Banner [is] Closed"
        var manageLocations = twcPco.getNodeValue('products', 'manageLocations');
        if(manageLocations && manageLocations.ctaBannerDismissed) {
          return manageLocations.ctaBannerDismissed;
        }
        return false;
      }
    }

})(angular, jQuery, TWC);;
/**
 * Header Saved Locations Directive
 * cmwhitehead
 */

(function(angular, $, TWC) {
  'use strict';

  angular
    .module('gm_header_savedlocations')
    .controller('gmHeaderSavedLocationsLocationMigrationController', GmLocationMigrationController);

  GmLocationMigrationController.$inject = ['$scope', '$document', '$modalInstance', 'customEvent', 'gmLocations', 'twcPco'];

  function GmLocationMigrationController($scope, $document, $modalInstance, customEvent, gmLocations, twcPco) {

    var first = true;

    /***************************
     *
     * Event Handlers
     */

    $modalInstance.result.then(function () {
      // not called... at least for me
    }, function () {
      // handle cleanup if closed without clicking on the close button
      handleModalClose();
    });

    $modalInstance.opened['finally'](function () {
      angular.element('[window-class=pref-intro-dialog]').appendTo('.loc-modal');
    }, function () {
      // handle cleanup if closed without clicking on the close button
    });

    customEvent.getEvent('touch-on-body-event').progress(function () {
      if (first) {
        handleModalClose();
        first = false;
      }
    });

    /****************************
     *
     * Public Interface
     */

    $scope.customizationMsg = {
      closeDialog: function () {
        gmLocations.modals.profile.open($scope.$parent);
        handleModalClose();
      },
      click: function () {
        handleModalClose();
        $document.off('click');
      }
    };

    /*************************
     *
     * Private Functions
     *
     */

    function handleModalClose() {
      $modalInstance.close('done');
      //TODO: Are these next lines actually needed, or are they just copied and pasted from Local Suite code? See Michael Chen for answer.
      //set the value in the PCO to remember that the dialog should not be shown again
      // extend the existing local suite object from the products node and add the new value
      var newObj = jQuery.extend(twcPco.getNodeValue('products', 'localsuite'), {saveLocationMsg: false});
      twcPco.setNodeValue('products', 'localsuite', newObj);
    }

  }

})(angular, jQuery, TWC);;
/**
 * Directive to display UV Index. Displays as a fractional scale from 0 - 10,
 * Extreme if value is greater than 10. Also should account for 999 which is a null
 * value from DSX
 */
twc.shared.apps.directive('gmWxUvIndex', ['$filter', 'twcUtil', function ($filter) {
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    template: '<span data-ng-bind="output() | safeDisplay"></span>',
    scope: {
      uvIndex: '=gmWxUvIndex'
    },
    link: function (scope, element, attrs) {
      scope.output = function () {
        if (angular.isNumber(scope.uvIndex)) {
          var pfTranslateFilter = $filter('pfTranslate'),
            uvIndexStr = pfTranslateFilter('@uvIndexVal of @uvIndexMaxVal', {context: 'weather_terms', vars : {'@uvIndexVal' : scope.uvIndex, '@uvIndexMaxVal' : 10}});
          return (scope.uvIndex >= 0 && scope.uvIndex <=10) ? uvIndexStr :
            ((scope.uvIndex > 10) && (scope.uvIndex <= 12)) ? pfTranslateFilter('Extreme', {context: 'weather_terms'}) : null;
        } else {
          return null;
        }
      };
    }
  };
}]);;
/**
 * Directive to display wind with wind icon prepended. eg: SW 10 mph
 */
twc.shared.apps.directive('gmWxWindDirection', ['pcoUser', '$filter', function (pcoUser, $filter) {
  'use strict';
  return {
    restrict: 'A',
    replace: true,
    template: '<span class="wx-wind dir-ltr" data-ng-bind="output() | safeDisplay"></span>',
    scope: {
      windDir: '=gmWxWindDirection',
      windSpeed: '=wxWindSpeed',
      windGust: '=wxWindGust'
    },
    link: function (scope, element, attrs) {
      scope.output = function() {
        var pfTranslateFilter = $filter('pfTranslate');
        var speedMeasureLabel = pcoUser.getSpeedMeasureLabel();
        var windSpeedUnit = pcoUser.getSpeedMeasure();

        if (scope.windSpeed === 0) {
         return pfTranslateFilter('Calm', {context: 'weather_terms'});
        } else if (angular.isDefined(scope.windSpeed) && angular.isDefined(scope.windDir) && angular.isDefined(scope.windGust) && (!!scope.windGust)) {
          return scope.windDir && scope.windDir.toLowerCase().match(/var/gi) ?
            pfTranslateFilter('Var @windSpeed @speedMeasureLabel gusts to @windgust @speedUnit', {
              context: 'weather_terms',
              vars: {
                '@windSpeed': scope.windSpeed,
                '@speedMeasureLabel': speedMeasureLabel,
                '@windgust': scope.windGust,
                '@speedUnit': windSpeedUnit
              }
            }) :
            pfTranslateFilter('@windDir @windSpeed @speedMeasureLabel gusts to @windgust @speedUnit', {
              context: 'weather_terms',
              vars: {
                '@windDir': scope.windDir,
                '@windSpeed': scope.windSpeed,
                '@speedMeasureLabel': speedMeasureLabel,
                '@windgust': scope.windGust,
                '@speedUnit': windSpeedUnit
              }
            });
        } else if (angular.isDefined(scope.windSpeed) && angular.isDefined(scope.windDir)) {
          return scope.windDir && scope.windDir.toLowerCase().match(/var/gi) ?
            pfTranslateFilter('Var @windSpeed @speedMeasureLabel', {
              context: 'weather_terms',
              vars: {
                '@windSpeed': scope.windSpeed,
                '@speedMeasureLabel': speedMeasureLabel
              }
            }) :
            pfTranslateFilter('@windDir @windSpeed @speedMeasureLabel', {
              context: 'weather_terms',
              vars: {
                '@windDir': scope.windDir,
                '@windSpeed': scope.windSpeed,
                '@speedMeasureLabel': speedMeasureLabel
              }
            });
        } else {
          return '';
        }
      };
        
   
    }
  };
}]);;
/**
 * Directive to display Precip with prcip type icon prepended. eg: (icon) 30%
 *
 * Attribs
 *
 * data-wx-precip (required): This should be a poP value
 * data-wx-precip-type: Type of precip (precip, rain, or snow), determines type of precip icon. Defaults to rain if undefined
 * data-wx-precip-sky-code: Expects 2 digit sky code. Used in conjunction with precip type to determine whether wintry mix icon should be displayed.
 * data-wx-precip-icon-only: Display only the precip icon
 *
 */
twc.shared.apps.directive('gmWxPrecip', ['twcUtil', function (twcUtil) {
  'use strict';

  return {
    restrict: 'A',
    template: '<span aria-hidden="true" class="wx-iconfont-global wx-icon-precip-rain-1"></span><span data-ng-if="::!wxPrecipIconOnly" class="precip-val" data-ng-bind="::chanceOfPrecip() | safeDisplay"></span>',
    scope: {
      gmWxPrecip: '=',
      wxPrecipType: '=',
      wxPrecipSkyCode: '='
    },
    link: function (scope, element, attrs) {
      // Calculate severity index (1-3) based on chance of precip
      scope.wxPrecipIconOnly = attrs.wxPrecipIconOnly === 'true' || angular.isDefined(attrs.wxPrecipIconOnly);
      function getPrecipSeverity(chanceOfPrecip) {
        return (chanceOfPrecip <= 100 && chanceOfPrecip >= 60) ? 3 :
          (chanceOfPrecip < 60 && chanceOfPrecip >= 30) ? 2 :
            (chanceOfPrecip < 30 && chanceOfPrecip >= 0) ? 1 : '';
      }

      function isWintryMix() {
        var skyCode = scope.wxPrecipSkyCode && parseInt(scope.wxPrecipSkyCode),
          wintryMixCodes = [5,7];

        return twcUtil.filter(wintryMixCodes, function (code) {
          return skyCode === code;
        }).length;
      }

      function hasValue() {
        return scope.gmWxPrecip === 0 || !!scope.gmWxPrecip;
      }

      scope.chanceOfPrecip = function(){
        return angular.isNumber(scope.gmWxPrecip) ? scope.gmWxPrecip +'%' : null;
      };

      scope.iconClass = function () {
        if(scope.wxPrecipType && !!scope.wxPrecipType) {
          return hasValue() && (scope.wxPrecipType ==='precip') && isWintryMix() ? 'wx-icon-precip-wintry-mix':
            hasValue() && (scope.wxPrecipType ==='rain' || scope.wxPrecipType ==='precip') ? 'wx-icon-precip-rain-' + getPrecipSeverity(scope.gmWxPrecip) :
              hasValue() && scope.wxPrecipType === 'snow' ? 'wx-icon-precip-snow-' + getPrecipSeverity(scope.gmWxPrecip) :
                'wx-icon-precip-rain-1';
        } else {
          return getPrecipSeverity(scope.gmWxPrecip) === '' ? 'wx-icon-precip-rain-1' : 'wx-icon-precip-rain-' + getPrecipSeverity(scope.gmWxPrecip);
        }
      };
    }
  };
}])
/**
 * WX Precip Range Label
 * =====================
 *
 * Accepts a "precipRange" object that is formatted as: {top:number,bottom:number}.
 * The range given will be displayed differently following the below conditions:
 * If there is no bottom: display "< top".
 * If there is no top: display "> bottom".
 * If there are both top and bottom: display "bottom - top".
 */
  .directive('wxPrecipRangeLabel', [function() {

    function resolveRangeTokens(range) {
      if(!range) {
        return null;
      }
      var tokens = null;
      if(range.top !== undefined || range.bottom !== undefined) { // range with top/bottom
        if(range.top === undefined) {
          tokens = [{val:'>',type:'symbol'},{val:range.bottom,type:'num'}];
        }
        else if(range.bottom === undefined) {
          tokens = [{val:'<',type:'symbol'},{val:range.top,type:'num'}];
        }
        else {
          tokens = [{val:range.bottom,type:'num'},{val:'-',type:'symbol'},{val:range.top,type:'num'}];
        }
      }
      else if(range.value !== undefined) { // single value
        tokens = [{val:range.value,type:'num'}];
      }
      return tokens;
    }

    return {
      template: '<span class="wx-precip-range-label">\n    <span data-ng-if="::!isEmpty" data-ng-repeat="token in ::rangeTokens" \n        data-ng-class="[\'wx-token-\' + ::token.type, ::token.val===\'>\' || ::token.val===\'<\' ? \'comparison-symbol\' : \'\']" \n        data-ng-bind="::token.val + ($index < ::rangeTokens.length-1 ? \' \': \'\')"\n        >\n    </span>\n    <span data-ng-if="::isEmpty" ng-bind="null | safeDisplay"></span>\n    \n    <span class="unit" data-ng-if="::!isEmpty" data-ng-bind="::precipUnit"></span>\n</span>',
      scope: {
        precipRange: '=',
        precipUnit: '='
      },
      link: function(scope) {
        scope.$watch('precipRange', function(precipRange) {
          scope.rangeTokens = resolveRangeTokens(precipRange);
        });
        scope.isEmpty = !scope.rangeTokens;
      }
    };
  }]);;
twc.shared.apps.directive('gmWxAlertBadge', ['twcUtil', 'gmWxSeverity', function(twcUtil, gmWxSeverity) {
  'use strict';
  return {
    restrict: 'A',
    template: ' <span data-ng-if="::isSevere" class="wx-alert-badge" data-ng-class="{lrg: lrgAlertBadge}"><span data-aria-hidden="true" class="wx-iconfont-global wx-icon-alert"></span></span>',
    scope: {
      skyCodeExtended: '=gmWxAlertBadge',
      altAlertCondition: '=wxAltAlertBadge',
      lrgAlertBadge: '=wxLrgAlertBadge'
    },
    replace: true,
    link: function(scope, element, attrs) {
      var isSevere = gmWxSeverity(scope.skyCodeExtended);

      scope.isSevere = !twcUtil.isEmpty(isSevere) || scope.altAlertCondition;
    }
  };
}]);;
/**
 * Directive to conditionally display obs qualifier
 */
twc.shared.apps.directive('gmWxObsQualifier', function () {
  'use strict';
  return {
    restrict: 'A',
    template: '<span data-gm-wx-alert-badge data-wx-alt-alert-badge="severity > 3 && qualifier"></span> <span data-ng-if="hasValue && (severity > 1)" data-ng-bind="::qualifier"></span>',
//      replace: true,
    scope: {
      qualifier: '=gmWxObsQualifier',
      severity: '=wxObsSeverity'
    },
    link: function (scope, element, attrs) {
      scope.hasValue = scope.qualifier === 0 || !!scope.qualifier;
    }
  };
});;
