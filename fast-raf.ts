export type Event = (time: number) => void;

export type RafEventBus = Array<Event | null>;

declare global {
  interface Window {
    FAST_RAF_EVENT_BUS?: RafEventBus;
  }
}

const isSSR = typeof window === "undefined";

/** Normalized raf */
const Raf =
  !isSSR &&
  (window.requestAnimationFrame || window.webkitRequestAnimationFrame);
let isHandlerPending = false;

/** Folme global event bus. */
let FOLME_EVENT_BUS: RafEventBus = [];

if (!isSSR) {
  if (!window.FAST_RAF_EVENT_BUS) {
    window.FAST_RAF_EVENT_BUS = [];
  }
  FOLME_EVENT_BUS = window.FAST_RAF_EVENT_BUS;
}

/**
 * Push an event into global event bus. It will trigger the event handler,
 * all of the events in the same frame will be executed together.
 * @param event Event
 */
function pushToEventBus(event: Event) {
  FOLME_EVENT_BUS.push(event);
  eventHandler();
  return FOLME_EVENT_BUS.indexOf(event);
}

/**
 * Delete the event from global event bus.
 * @param event Event
 */

 function deleteFromEventBus(index: number) {
  if (index >= 0) {
    // Can't delete, because events behind this will be ignored.
    FOLME_EVENT_BUS[index] = null;
  }
}

/**
 * Flush event bus. Record initial bus length.
 * If push a new event in sub event, it should be called in next tick.
 */
function eventConsumer(time: number) {
  const length = FOLME_EVENT_BUS.length;
  for (let i = 0; i < length; i++) {
    const e = FOLME_EVENT_BUS[i];
    e?.(time);
  }
  FOLME_EVENT_BUS.splice(0, length);
  isHandlerPending = false;
  if (FOLME_EVENT_BUS.length) {
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
    window.requestAnimationFrame = pushToEventBus;
    window.cancelAnimationFrame = deleteFromEventBus;
  }
}

register();
