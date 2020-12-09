(function (factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  var isHandlerPending = false;
  var isSSR = typeof window === "undefined";
  /** Normalized raf */

  var Raf =
    !isSSR &&
    (window.requestAnimationFrame || window.webkitRequestAnimationFrame);

  if (!isSSR) {
    if (!window.FAST_RAF) {
      window.FAST_RAF = {
        map: {},
        count: 0,
      };
    }
  }
  /**
   * Push an event into global event map. It will trigger the event handler,
   * all of the events in the same frame will be executed together.
   * @param event Event
   */

  function requestAnimationFrame(event) {
    var count = window.FAST_RAF.count + 1;
    window.FAST_RAF.map[count] = event;
    window.FAST_RAF.count = count;
    eventHandler();
    return count;
  }
  /**
   * Delete the event from global event map.
   * @param event Event
   */

  function cancelAnimationFrame(index) {
    delete window.FAST_RAF.map[index];
  }
  /**
   * Flush event map. If push a new event in sub event, it should be called in next tick.
   */

  function eventConsumer(time) {
    var curTickCount = window.FAST_RAF.count;
    var map = window.FAST_RAF.map;
    var curKeys = Object.keys(map);

    for (var _i = 0, _curKeys = curKeys; _i < _curKeys.length; _i++) {
      var key = _curKeys[_i];
      var index = Number(key);
      var e = map[index];

      if (e) {
        e(time);
        delete map[index];
      }
    }

    isHandlerPending = false;
    var nextTickCount = window.FAST_RAF.count;

    if (curTickCount !== nextTickCount) {
      eventHandler();
    }
  }
  /**
   * Create a new event consumer if one isn't pending.
   */

  function eventHandler() {
    if (!Raf) {
      throw new Error("window.requestAnimationFrame is undefined.");
    }

    if (!isHandlerPending) {
      isHandlerPending = true;
      Raf(eventConsumer);
    }
  }

  function register() {
    if (!isSSR) {
      window.requestAnimationFrame = requestAnimationFrame;
      window.cancelAnimationFrame = cancelAnimationFrame;
    }
  }

  register();
});
//# sourceMappingURL=fast-raf.js.map
