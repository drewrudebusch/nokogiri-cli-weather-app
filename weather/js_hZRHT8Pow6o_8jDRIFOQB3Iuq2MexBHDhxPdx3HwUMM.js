window.PangeaMap = window.PangeaMap || {};
window.PangeaMap.mapLayersValue = [
/**
 * Basemap Layer Configs
*/
  {
    className: "TileLayerOptions",
    type: "base",
    title: "Road",
    thumbnail: null,
    opacity: 100,
    id: "Road",
    layerKey: 'road',
    selected: true,
    menuOrderByTypeAndGroup: 0,
    menuGroup: null,
    urlTemplate: "//{s}.tiles.mapbox.com/v4/weather.5svtc1nj/{z}/{x}/{y}.jpg?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaWlxNG01czkwMjM2dnFtNTdlMjVidTByIn0.Ml63Jx_BQtTx4CEXihwjyA",
    subdomains: ["a", "b", "c", "d"],
    config: null,
    overlays : []//['TWC Light Labels']
  },
  {
    className: "TileLayerOptions",
    type: "base",
    title: "Satellite",
    thumbnail: null,
    opacity: 100,
    id: "Satellite",
    layerKey: 'satellite',
    selected: false,
    menuOrderByTypeAndGroup: 1,
    menuGroup: null,
    urlTemplate: "//{s}.tiles.mapbox.com/v4/weather.6n364bwe/{z}/{x}/{y}.jpg?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaWlxNG01czkwMjM2dnFtNTdlMjVidTByIn0.Ml63Jx_BQtTx4CEXihwjyA",
    subdomains: ["a", "b", "c", "d"],
    config: null,
    overlays : []//["TWC Satellite Labels"]
  },
  {
    className: "TileLayerOptions",
    type: "base",
    title: "Dark",
    layerKey: 'dark',
    thumbnail: null,
    opacity: 100,
    id: "Dark",
    selected: false,
    menuOrderByTypeAndGroup: 2,
    menuGroup: null,
    urlTemplate: "//{s}.tiles.mapbox.com/v4/weather.bhpehcqr/{z}/{x}/{y}.jpg?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaWlxNG01czkwMjM2dnFtNTdlMjVidTByIn0.Ml63Jx_BQtTx4CEXihwjyA",
    subdomains: ["a", "b", "c", "d"],
    config: null,
    overlays : []//["TWC Dark Labels"]
  },
/**
 * Radar Layer Configs
 */
  {
    className: "SunTileLayerOptions",
    type: "weather",
    baseLayer: "road",
    title: "Radar (US)",
    localMapTitle : "Radar",
    localMapLegend : '//s.w-x.co/local-radar-legend.svg',
    imperialVariant: false,
    thumbnail: "//s.w-x.co/radar.png",
    thumbnailBackground: "//s.w-x.co/base-world.jpg",
    id: "Radar (US)",
    series: "observed",
    selected: false,
    menuOrderByTypeAndGroup: 1,
    menuGroup: "common",
    layerKey: "radarConus",
    layerAlias: ["radar"],
    projectedId: "SUN Radar Observation (projected)",
    animationTime: 1,
    validForward: 1,
    opacity: 60,
    toggleControlPresence: false,
    version: "2",
    locationOverride: function(location) {
      return !!(location && location.cntryCd && location.cntryCd === "US" && location.stCd && location.stCd !== "AK" && location.stCd !== "HI");
    },
    legend: "radar-north-america",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    baseLayer: "road",
    title: "Radar (US) Projected",
    localMapTitle : "Radar",
    thumbnail: "//s.w-x.co/radar.png",
    thumbnailBackground: "//s.w-x.co/base-world.jpg",
    id: "SUN Radar Observation (projected)",
    series: "projected",
    selected: false,
    animationTime: 5,
    menuOrderByTypeAndGroup: null,
    menuGroup: "common",
    layerKey: "radarFcst",
    observedId: "Radar (US)",
    validForward: 5.75,
    toggleControlPresence: true,
    version: "2",
    opacity: 60,
    legend: "radar-north-america",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
    {
        className: "SunTileLayerOptions",
        type: "weather",
        title: "Radar (Alaska)",
        localMapTitle : "Radar",
        localMapLegend : '//s.w-x.co/local-radar-legend.svg',
        imperialVariant: false,
        thumbnail: "//s.w-x.co/radar.png",
        thumbnailBackground: "//s.w-x.co/base-alaska.jpg",
        id: "SUN Radar Alaska",
        selected: false,
        menuOrderByTypeAndGroup: 2,
        menuGroup: "common",
        layerKey: "radarAlaska",
        animationTime: 1,
        validForward: 1,
        series: "observed",
        opacity: 60,
        version: "2",
        toggleControlPresence: false,
        locationOverride: function(location) {
          return !!(location && location.stCd && location.cntryCd && location.cntryCd === "US" && location.stCd === "AK");
        },
        legend: "radar-alaska",
        errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
        config: {
            sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
            sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
        }
    },
    {
        className: "SunTileLayerOptions",
        type: "weather",
        title: "Radar (Hawaii)",
        localMapTitle : "Radar",
        localMapLegend : '//s.w-x.co/local-radar-legend.svg',
        imperialVariant: false,
        thumbnail: "//s.w-x.co/radar.png",
        thumbnailBackground: "//s.w-x.co/base-hawaii.jpg",
        id: "SUN Radar Hawaii",
        selected: false,
        menuOrderByTypeAndGroup: 3,
        menuGroup: "common",
        layerKey: "radarHawaii",
        animationTime: 1,
        validForward: 1,
        series: "observed",
        opacity: 60,
        version: "2",
        toggleControlPresence: false,
        locationOverride: function(location) {
          return !!(location && location.stCd && location.cntryCd && location.cntryCd === "US" && location.stCd === "HI");
        },
        legend: "radar-hawaii",
        errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
        config: {
            sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
            sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
        }
    },
    {
        className: "SunTileLayerOptions",
        type: "weather",
        title: "Radar (Europe)",
        localMapTitle : "Radar",
        localMapLegend : '//s.w-x.co/local-radar-legend.svg',
        imperialVariant: false,
        thumbnail: "//s.w-x.co/radar.png",
        thumbnailBackground: "//s.w-x.co/base-europe.jpg",
        id: "SUN Radar Europe",
        selected: false,
        menuOrderByTypeAndGroup: 4,
        menuGroup: "common",
        layerKey: "radarEurope",
        animationTime: 1,
        validForward: 1,
        series: "observed",
        opacity: 60,
        version: "2",
        toggleControlPresence: false,
        locationOverride: function(location) {
          return !!(location && location.cntryCd && (
            location.cntryCd === "GM" ||
            location.cntryCd === "NL" ||
            location.cntryCd === "BE" ||
            location.cntryCd === "FR" ||
            location.cntryCd === "UK" ||
            location.cntryCd === "LS" ||
            location.cntryCd === "AN" ||
            location.cntryCd === "MN"
          ));
        },
        legend: "radar-europe",
        errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
        config: {
            sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
            sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
        }
    },
    {
        className: "SunTileLayerOptions",
        type: "weather",
        title: "Radar (Australia)",
        localMapTitle : "Radar",
        localMapLegend : '//s.w-x.co/local-radar-legend.svg',
        imperialVariant: false,
        thumbnail: "//s.w-x.co/radar.png",
        thumbnailBackground: "//s.w-x.co/base-australia.jpg",
        id: "SUN Radar Austrailia",
        selected: false,
        menuOrderByTypeAndGroup: 5,
        menuGroup: "common",
        animationTime: 1,
        layerKey: "radarAustralian",
        validForward: 1,
        series: "observed",
        opacity: 60,
        version: "2",
        toggleControlPresence: false,
        locationOverride: function(location) {
          return !!(location && location.cntryCd && location.cntryCd === "AS");
        },
        legend: "radar-austrailia",
        errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
        config: {
            sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
            sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
        }
    },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    baseLayer: "road",
    title: "Radar/Clouds (US)",
    localMapTitle : "Radar & Clouds",
    localMapLegend : '//s.w-x.co/local-radar-legend.svg',
    menuOrderByTypeAndGroup: 6,
    menuGroup: "common",
    thumbnail: "//s.w-x.co/radar-clouds.png",
    thumbnailBackground: "//s.w-x.co/base-world.jpg",
    id: "SUN Radar Clouds Observation",
    selected: false,
    layerKey: "satrad",
    validForward: 1,
    animationTime: 1,
    //projectedId: "SUN Radar Clouds Observation (projected)",
    series: "observed",
    opacity: 60,
    version: "2",
    toggleControlPresence: true,
    legend: "radar-and-clouds",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    baseLayer: "road",
    title: "Radar and Clouds Projected",
    localMapTitle : "Radar & Clouds",
    thumbnail: "//s.w-x.co/radar-clouds.png",
    thumbnailBackground: "//s.w-x.co/base-world.jpg",
    id: "SUN Radar Clouds Observation (projected)",
    selected: false,
    layerKey: "satradFcst",
    validForward: 5.75,
    animationTime: 5.75,
    observedId: "SUN Radar Clouds Observation",
    series: "projected",
    opacity: 60,
    version: "2",
    toggleControlPresence: true,
    legend: "radar-and-clouds",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
/**
 * Clouds Layers
 */
  {
    className: "SunTileLayerOptions",
    type: "weather",
    baseLayer: "road",
    title: "Clouds (World)",
    localMapTitle : "Clouds",
    localMapLegend : '//s.w-x.co/local-clouds-legend.svg',
    thumbnail: "//s.w-x.co/clouds.png",
    thumbnailBackground: "//s.w-x.co/base-world.jpg",
    id: "SUN Clouds Observation",
    selected: true,
    series: "observed",
    animationTime: 3,
    menuOrderByTypeAndGroup: 10,
    menuGroup: "clouds",
    layerKey: "sat",
    validForward: 3,
    toggleControlPresence: true,
    legend: "clouds",
    opacity: 60,
    version: "2",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Clouds (US)",
    localMapTitle : "Clouds",
    localMapLegend : '//s.w-x.co/local-clouds-legend.svg',
    imperialVariant: false,
    thumbnail: "//s.w-x.co/radar.png",
    thumbnailBackground: "//s.w-x.co/base-world.jpg",
    id: "SUN Clouds",
    selected: false,
    menuOrderByTypeAndGroup: 11,
    menuGroup: "clouds",
    layerKey: "ussat",
    validForward: 3,
    animationTime: 3,
    //projectedId: "SUN Clouds (projected)",
    series: "observed",
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "clouds",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Clouds Projected",
    localMapTitle : "Clouds",
    thumbnail: "//s.w-x.co/radar.png",
    thumbnailBackground: "//s.w-x.co/base-world.jpg",
    id: "SUN Clouds (projected)",
    observedId: "SUN Clouds",
    series: "projected",
    selected: false,
    layerKey: "cloudsFcst",
    validForward: 5.75,
    animationTime: 5.75,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "clouds",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
/**
 * Weather Layers
 */
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Temperatures",
    localMapTitle : "Temperatures",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/temperature.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Temps",
    projectedId: "SUN Temps (projected)",
    series: "observed",
    selected: false,
    menuOrderByTypeAndGroup: 30,
    menuGroup: "weather",
    layerKey: "temp",
    validForward: 3,
    animationTime: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "temps-us-lower-48",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Temps (US Lower 48) Projected",
    localMapTitle : "Temperatures",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/temperature.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Temps (projected)",
    observedId: "SUN Temps",
    series: "projected",
    selected: false,
    layerKey: "tempFcst",
    validForward: 5.75,
    animationTime: 5.75,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "temps-us-lower-48",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Feels Like",
    localMapTitle : "Feels Like",
    imperialVariant: false,
    thumbnail: "//s.w-x.co/temperature.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Feels Like",
    projectedId: "SUN Feels Like (projected)",
    series: "observed",
    selected: false,
    menuOrderByTypeAndGroup: 31,
    menuGroup: "weather",
    layerKey: "feelsLike",
    validForward: 3,
    animationTime: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "feels-like",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Feels Like Projected",
    localMapTitle : "Feels Like",
    imperialVariant: false,
    thumbnail: "//s.w-x.co/temperature.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Feels Like (projected)",
    observedId: "SUN Feels Like",
    series: "projected",
    selected: false,
    layerKey: "feelsLikeFcst",
    validForward: 5.75,
    animationTime: 5.75,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "feels-like",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    baseLayer: "road",
    title: "Wind Speed",
    localMapTitle : "Wind Speed",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/wind_1.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN WindSpeed Observation",
    projectedId: "SUN WindSpeed Observation (projected)",
    series: "observed",
    selected: false,
    menuOrderByTypeAndGroup: 32,
    menuGroup: "weather",
    layerKey: "windSpeed",
    layerAlias: ["wind"],
    validForward: 3,
    animationTime: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "wind-speed",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    baseLayer: "road",
    title: "Wind Speed Projected",
    localMapTitle : "Wind Speed",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/wind_1.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN WindSpeed Observation (projected)",
    observedId: "SUN WindSpeed Observation",
    series: "projected",
    selected: false,
    layerKey: "windSpeedFcst",
    validForward: 5.75,
    animationTime: 5.75,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "wind-speed",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    baseLayer: "road",
    title: "Dewpoints",
    localMapTitle : "Dewpoints",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/dewpoint.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Dewpoint Observation",
    selected: false,
    menuOrderByTypeAndGroup: 33,
    menuGroup: "weather",
    layerKey: "dewpoint",
    layerAlias: ["dewpoint"],
    validForward: 3,
    animationTime: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "dewpoint",
    projectedId: "SUN Dewpoint Observation (projected)",
    series: "observed",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e",
      errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII="
    }
  },
  {
    className: "SunTileLayerOptions",
    baseLayer: "road",
    title: "Dewpoint Projected",
    localMapTitle : "Dewpoints",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/dewpoint.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Dewpoint Observation (projected)",
    menuOrderByTypeAndGroup: null,
    menuGroup: "weather",
    layerKey: "dewpointFcst",
    validForward: 5.75,
    animationTime: 5.75,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "dewpoint",
    observedId: "SUN Dewpoint Observation",
    series: "projected",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    baseLayer: "road",
    title: "UV Index",
    localMapTitle : "UV Index",
    thumbnail: "//s.w-x.co/uv.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN UV Observation",
    projectedId: "SUN UV Observation (projected)",
    series: "observed",
    selected: false,
    menuOrderByTypeAndGroup: 34,
    menuGroup: "weather",
    layerKey: "uv",
    layerAlias: ["uv"],
    validForward: 3,
    animationTime: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "uv-index",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    baseLayer: "road",
    title: "UV Index Projected",
    localMapTitle : "UV Index",
    thumbnail: "//s.w-x.co/uv.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN UV Observation (projected)",
    observedId: "SUN UV Observation",
    series: "projected",
    selected: false,
    layerKey: "uvFcst",
    validForward: 5.75,
    animationTime: 5.75,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "uv-index",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Past 24-Hr Precip (est.)",
    localMapTitle : "24 Hour Precipitation",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/precipitation.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Past 24-Hr Precip",
    series: "observed",
    selected: false,
    menuOrderByTypeAndGroup: 35,
    menuGroup: "weather",
    layerKey: "precip24hr",
    layerAlias: ["rain"],
    validForward: 3,
    animationTime: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "24-hour-precipitation",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Past 24-Hr Snowfall (est.)",
    localMapTitle : "24 Hour Snowfall",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/snow_1.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "SUN Past 24-Hr Snowfall",
    selected: false,
    series: "observed",
    menuOrderByTypeAndGroup: 36,
    menuGroup: "weather",
    layerKey: "snow24hr",
    layerAlias: ["snow"],
    animationTime: 3,
    validForward: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "24-hour-snow",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "SunTileLayerOptions",
    type: "weather",
    title: "Driving Difficulty (US)",
    localMapTitle : "Driving Difficulty",
    imperialVariant: true,
    thumbnail: "//s.w-x.co/driving-difficulty.png",
    thumbnailBackground: "//s.w-x.co/base-us-lower-48.jpg",
    id: "Driving Difficulty Index (US)",
    selected: false,
    series: "observed",
    menuOrderByTypeAndGroup: 37,
    menuGroup: "weather",
    layerKey: "rwi",
    layerAlias: ["driving"],
    animationTime: 3,
    hide: true,
    validForward: 3,
    opacity: 60,
    version: "2",
    toggleControlPresence: false,
    legend: "driving-index",
    errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    config: {
      sunTileProductsUrl: "//api.weather.com/v2/TileServer/series?apiKey={apiKey}",
      sunApiKey: "3d498bd0777076fb2aa967aa67114c7e"
    }
  },
  {
    className: "TileLayerOptions",
    id: "TWC Light Labels",
    type: "overlay",
    opacity: 100,
    urlTemplate: "//api.tiles.mapbox.com/v4/weather.64j667v4/{z}/{x}/{y}.png32?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaWlxNG01czkwMjM2dnFtNTdlMjVidTByIn0.Ml63Jx_BQtTx4CEXihwjyA",
    subdomains: ["1", "2", "3", "4"],
    config: null
  },
  {
    className: "TileLayerOptions",
    id: "TWC Satellite Labels",
    type: "overlay",
    opacity: 100,
    urlTemplate: "//api.tiles.mapbox.com/v4/weather.8mhuro0f/{z}/{x}/{y}.png32?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaWlxNG01czkwMjM2dnFtNTdlMjVidTByIn0.Ml63Jx_BQtTx4CEXihwjyA",
    subdomains: ["1", "2", "3", "4"],
    config: null
  },
  {
    className: "TileLayerOptions",
    id: "TWC Dark Labels",
    type: "overlay",
    opacity: 100,
    urlTemplate: "//api.tiles.mapbox.com/v4/weather.bxatg0v4/{z}/{x}/{y}.png32?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaWlxNG01czkwMjM2dnFtNTdlMjVidTByIn0.Ml63Jx_BQtTx4CEXihwjyA",
    subdomains: ["1", "2", "3", "4"],
    config: null
  },
  {
    className: "TileLayerOptions",
    type: "overlay",
    baseLayer: "road",
    id: "Roads and Places",
    opacity: 100,
    urlTemplate: "//api.tiles.mapbox.com/v4/jplante.d1c2de96/{z}/{x}/{y}.png32?access_token=pk.eyJ1Ijoid2VhdGhlciIsImEiOiJjaWlxNG01czkwMjM2dnFtNTdlMjVidTByIn0.Ml63Jx_BQtTx4CEXihwjyA",
    subdomains: ["1", "2", "3", "4"],
    config: null
  },
  {
    className: "FeatureLayerOptions",
    type: "feature",
    baseLayer: "road",
    id: "Feature",
    layerKey: "featureLayer"
  }];
;
/*!
 * jQuery Smart Banner
 * Copyright (c) 2012 Arnold Daniels <arnold@jasny.net>
 * Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 */
(function($) {
    var SmartBanner = function(options) {
        //WEB-62 - Removed margin-top css height for Titan pages
        this.origHtmlMargin = parseFloat($('html')); // Get the original margin-top of the HTML element so we can take that into account
        this.options = $.extend({}, $.smartbanner.defaults, options);

        var standalone = navigator.standalone,
            UA = navigator.userAgent; // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)

        // Detect banner type (iOS or Android)
        if (this.options.force) {
            this.type = this.options.force;
        } else if (UA.match(/iPhone|iPod/i) != null || (UA.match(/iPad/) && this.options.iOSUniversalApp)) {
            if (UA.match(/Safari/i) != null &&
                (UA.match(/CriOS/i) != null ||
                window.Number(UA.substr(UA.indexOf('OS ') + 3, 3).replace('_', '.')) < 6)) {
                this.type = 'ios';
            } // Check webview and native smart banner support (iOS 6+)
        } else if (UA.match(/\bSilk\/(.*\bMobile Safari\b)?/) || UA.match(/\bKF\w/) || UA.match('Kindle Fire')) {
            this.type = 'kindle';
        } else if (UA.match(/Android/i) != null) {
            this.type = 'android';
        } else if (UA.match(/Windows NT 6.2/i) != null && UA.match(/Touch/i) !== null) {
            this.type = 'windows';
        }

        // Don't show banner if device isn't iOS or Android, website is loaded in app or user dismissed banner
        if (!this.type || standalone || this.getCookie('sb-closed') || this.getCookie('sb-installed')) {
            return;
        }

        // Calculate scale
        this.scale = this.options.scale === 'auto' ? $(window).width() / window.screen.width : this.options.scale;
        if (this.scale < 1) {
            this.scale = 1;
        }

        // Get info from meta data
        var meta = $(this.type === 'android' ? 'meta[name="google-play-app"]' :
            this.type === 'ios' ? 'meta[name="apple-itunes-app"]' :
                this.type === 'kindle' ? 'meta[name="kindle-fire-app"]' : 'meta[name="msApplication-ID"]');
        if (meta.length === 0) {
            return;
        }

        // For Windows Store apps, get the PackageFamilyName for protocol launch
        if (this.type === 'windows') {
            this.pfn = $('meta[name="msApplication-PackageFamilyName"]').attr('content');
            this.appId = meta.attr('content')[1];
        } else {
            this.appId = /app-id=([^\s,]+)/.exec(meta.attr('content'))[1];
        }

        this.title = this.options.title ? this.options.title : meta.data('title') || $('title').text().replace(/\s*[|\-·].*$/, '');
        this.author = this.options.author ? this.options.author : meta.data('author') || ($('meta[name="author"]').length ? $('meta[name="author"]').attr('content') : window.location.hostname);
        this.iconUrl = meta.data('icon-url');
        this.price = meta.data('price');
        this.androidSmartBannerUrl = this.options.androidSmartBannerUrl ? this.options.androidSmartBannerUrl : 'market://details?id=';
        // Create banner
        this.create();
        this.show();
        this.listen();
    };

    SmartBanner.prototype = {

        constructor: SmartBanner,
        create: function() {
            var iconURL,
                link = (this.options.url ? this.options.url : (this.type === 'windows' ? 'ms-windows-store:PDP?PFN=' + this.pfn : (this.type === 'android' ? this.androidSmartBannerUrl : (this.type === 'kindle' ? 'amzn://apps/android?asin=' : 'https://itunes.apple.com/' + this.options.appStoreLanguage + '/app/id'))) + this.appId),
                price = this.price || this.options.price,
                inStore = price ? price + ' - ' + (this.type === 'android' ? this.options.inGooglePlay : this.type === 'kindle' ? this.options.inAmazonAppStore : this.type === 'ios' ? this.options.inAppStore : this.options.inWindowsStore) : '',
                gloss = this.options.iconGloss === null ? (this.type === 'ios') : this.options.iconGloss;
            if (this.options.url) {
                link = this.options.url;
            }
            else {
                if (this.type === 'android') {
                    link = this.androidSmartBannerUrl + this.appId;
                    if (this.options.GooglePlayParams) {
                        link = link + '&referrer=' + this.options.GooglePlayParams;
                    }
                } else {
                    link = 'https://itunes.apple.com/' + this.options.appStoreLanguage + '/app/id' + this.appId;
                }
            }

            var banner = '<div id="smartbanner" class="' + this.type + '"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon"></span><div class="sb-info"><strong>' + this.title + '</strong><span>' + this.author + '</span><span>' + inStore + '</span></div><a href="' + link + '" class="sb-button"><span>' + this.options.button + '</span></a></div></div>';
            (this.options.layer) ? $(this.options.appendToSelector).append(banner): $(this.options.appendToSelector).prepend(banner);

            if (this.options.icon) {
                iconURL = this.options.icon;
            } else if (this.iconUrl) {
                iconURL = this.iconUrl;
            } else if ($('link[rel="apple-touch-icon-precomposed"]').length > 0) {
                iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href');
                if (this.options.iconGloss === null) { gloss = false; }
            } else if ($('link[rel="apple-touch-icon"]').length > 0) {
                iconURL = $('link[rel="apple-touch-icon"]').attr('href');
            } else if ($('meta[name="msApplication-TileImage"]').length > 0) {
                iconURL = $('meta[name="msApplication-TileImage"]').attr('content');
            } else if ($('meta[name="msapplication-TileImage"]').length > 0) { /* redundant because ms docs show two case usages */
                iconURL = $('meta[name="msapplication-TileImage"]').attr('content');
            }

            if (iconURL) {
                $('#smartbanner .sb-icon').css('background-image', 'url(' + iconURL + ')');
                if (gloss) { $('#smartbanner .sb-icon').addClass('gloss'); }
            } else {
                $('#smartbanner').addClass('no-icon');
            }

            this.bannerHeight = $('#smartbanner').outerHeight() + 2;

            if (this.scale > 1) {
                $('#smartbanner')
                    .css('top', parseFloat($('#smartbanner').css('top')) * this.scale)
                    .css('height', parseFloat($('#smartbanner').css('height')) * this.scale)
                    .hide();
                $('#smartbanner .sb-container')
                    .css('-webkit-transform', 'scale(' + this.scale + ')')
                    .css('-msie-transform', 'scale(' + this.scale + ')')
                    .css('-moz-transform', 'scale(' + this.scale + ')')
                    .css('width', $(window).width() / this.scale);
            }
            $('#smartbanner').css('position', (this.options.layer) ? 'absolute' : 'static');
        },
        listen: function() {
            $('#smartbanner .sb-close').on('click', $.proxy(this.close, this));
            $('#smartbanner .sb-button').on('click', $.proxy(this.install, this));
        },
        show: function(callback) {
            var banner = $('#smartbanner');
            banner.stop();

            if (this.options.layer) {
                banner.animate({
                    top: 0,
                    display: 'block'
                }, this.options.speedIn).addClass('shown').show();
                $('html').animate({
                    marginTop: this.origHtmlMargin + (this.bannerHeight * this.scale)
                }, this.options.speedIn, 'swing', callback);
            } else {
                if ($.support.transition) {
                    banner.animate({
                        top: 0
                    }, this.options.speedIn).addClass('shown');
                    var transitionCallback = function() {
                        $('html').removeClass('sb-animation');
                        if (callback) {
                            callback();
                        }
                    };
                    $('html').addClass('sb-animation').one($.support.transition.end, transitionCallback).emulateTransitionEnd(this.options.speedIn).css('margin-top', this.origHtmlMargin + (this.bannerHeight * this.scale));
                } else {
                    banner.slideDown(this.options.speedIn).addClass('shown');
                }
            }
        },
        hide: function(callback) {
            var banner = $('#smartbanner');
            banner.stop();

            if (this.options.layer) {
                banner.animate({
                    top: -1 * this.bannerHeight * this.scale,
                    display: 'block'
                }, this.options.speedIn).removeClass('shown');
                $('html').animate({
                    marginTop: this.origHtmlMargin
                }, this.options.speedIn, 'swing', callback);
            } else {
                if ($.support.transition) {
                    banner.css('top', -1 * this.bannerHeight * this.scale).removeClass('shown');
                    var transitionCallback = function() {
                        $('html').removeClass('sb-animation');
                        if (callback) {
                            callback();
                        }
                    };
                    $('html').addClass('sb-animation').one($.support.transition.end, transitionCallback).emulateTransitionEnd(this.options.speedOut).css('margin-top', this.origHtmlMargin);
                } else {
                    banner.slideUp(this.options.speedOut).removeClass('shown');
                }
            }
            banner.hide();
        },
        close: function(e) {
            e.preventDefault();
            this.hide();
            this.setCookie('sb-closed', 'true', this.options.daysHidden);
        },
        install: function(e) {
            if (this.options.hideOnInstall) {
                this.hide();
            }
            this.setCookie('sb-installed', 'true', this.options.daysReminder);
        },
        setCookie: function(name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            value = encodeURI(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString());
            document.cookie = name + '=' + value + '; path=/;';
        },
        getCookie: function(name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x === name) {
                    return decodeURI(y);
                }
            }
            return null;
        },
        switchType: function() {
            var that = this;

            this.hide(function() {
                that.type = that.type === 'android' ? 'ios' : 'android';
                var meta = $(that.type === 'android' ? 'meta[name="google-play-app"]' : 'meta[name="apple-itunes-app"]').attr('content');
                that.appId = /app-id=([^\s,]+)/.exec(meta)[1];

                $('#smartbanner').detach();
                that.create();
                that.show();
            });
        }
    };

    $.smartbanner = function(option) {
        var $window = $(window),
            data = $window.data('smartbanner'),
            options = typeof option === 'object' && option;
        if (!data) { $window.data('smartbanner', (data = new SmartBanner(options))); }
        if (typeof option === 'string') { data[option](); }
    };

    // override these globally if you like (they are all optional)
    $.smartbanner.defaults = {
        title: null, // What the title of the app should be in the banner (defaults to <title>)
        author: null, // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
        price: 'FREE', // Price of the app
        appStoreLanguage: 'us', // Language code for App Store
        inAppStore: 'On the App Store', // Text of price for iOS
        inGooglePlay: 'In Google Play', // Text of price for Android
        inAmazonAppStore: 'In the Amazon Appstore',
        inWindowsStore: 'In the Windows Store', //Text of price for Windows
        GooglePlayParams: null, // Aditional parameters for the market
        icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
        iconGloss: null, // Force gloss effect for iOS even for precomposed
        button: 'VIEW', // Text for the install button
        url: null, // The URL for the button. Keep null if you want the button to link to the app store.
        scale: 'auto', // Scale based on viewport size (set to 1 to disable)
        speedIn: 300, // Show animation speed of the banner
        speedOut: 400, // Close animation speed of the banner
        daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
        daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
        force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
        hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
        layer: false, // Display as overlay layer or slide down the page
        iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
        appendToSelector: 'body' //Append the banner to a specific selector
    };

    $.smartbanner.Constructor = SmartBanner;


    // ============================================================
    // Bootstrap transition
    // Copyright 2011-2014 Twitter, Inc.
    // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)

    function transitionEnd() {
        var el = document.createElement('smartbanner');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                };
            }
        }

        return false; // explicit for ie8 (  ._.)
    }

    if ($.support.transition !== undefined) {
        return; }// Prevent conflict with Twitter Bootstrap

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false,
            $el = this;
        $(this).one($.support.transition.end, function() {
            called = true;
        });
        var callback = function() {
            if (!called) { $($el).trigger($.support.transition.end); }
        };
        setTimeout(callback, duration);
        return this;
    };

    $(function() {
        $.support.transition = transitionEnd();
    });
    // ============================================================

})(window.jQuery);;
