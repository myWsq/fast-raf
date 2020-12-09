export type Event = (time: number) => void;

export type RafEventMap = Record<number, Event | null>;

declare global {
  interface Window {
    FAST_RAF: {
      map: RafEventMap;
      count: number;
    };
  }
}

let isHandlerPending = false;

const isSSR = typeof window === "undefined";

/** Normalized raf */
const Raf =
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
function requestAnimationFrame(event: Event) {
  const count = window.FAST_RAF.count + 1;
  window.FAST_RAF.map[count] = event;
  window.FAST_RAF.count = count;
  eventHandler();
  return count;
}

/**
 * Delete the event from global event map.
 * @param event Event
 */

function cancelAnimationFrame(index: number) {
  delete window.FAST_RAF.map[index];
}

/**
 * Flush event map. If push a new event in sub event, it should be called in next tick.
 */
function eventConsumer(time: number) {
  const curTickCount = window.FAST_RAF.count;
  const map = window.FAST_RAF.map;
  const curKeys = Object.keys(map);
  for (const key of curKeys) {
    const index = Number(key);
    const e = map[index];
    if (e) {
      e(time);
      delete map[index];
    }
  }
  isHandlerPending = false;
  const nextTickCount = window.FAST_RAF.count;
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
