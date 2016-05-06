(function () {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    var script = document.createElement('script');
    script.src = "/js/twc_push_main.js";
    document.body.appendChild(script);
  }
})();