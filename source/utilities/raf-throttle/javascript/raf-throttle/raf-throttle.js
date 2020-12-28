// @ts-ignore
import raf from 'raf'

/**
 * @typedef {Object} Bind
 * @property {HTMLElement|Window} element Element we are binding to ie. document or window
 * @property {string} event Event type we are binding ie. scroll
 * @property {string} namespace Namepace of the event
 * @property {Function} fn Function we want to execute
 * @property {Number} [delay] Amount of delay
 *
 *
 * @typedef {Object} Options
 * @property {HTMLElement|Window} element
 * @property {string} event Event type we are binding ie. scroll
 * @property {string} namespace Namepace of the event
 * @property {EventListenerOrEventListenerObject} [callback]
 * @property {object} [eventOptions] Give options to your event
 */

class RafThrottle {
  constructor() {
    this.namespaces = {}
    this.timeoutList = {}
    this.runningList = {}
  }

  /**
   * Public function to set the assigned binds
   * @param {Bind[]} binds
   */
  set(binds) {
    this._addEvents(binds)
  }

  /**
   * Public function to remove an assigned bind
   * @param {Bind[]} binds
   */
  remove(binds) {
    if (binds) {
      this._removeEvents(binds)
    }
  }

  /*
   * Private methods
   */

  /**
   * Loop over binds and bind them
   * @param {Bind[]} binds
   */
  _addEvents(binds) {
    binds.forEach(bind => {
      const eventOptions = {
        element: bind.element,
        event: bind.event,
        namespace: generateNamespace(bind.event, bind.namespace),
        callback: event => this._trigger(bind, event),
        eventOptions: { passive: true },
        delay: bind.delay,
      }

      this.timeoutList[eventOptions.namespace] = null
      this.runningList[eventOptions.namespace] = false

      this._addThrottledEvent(eventOptions)
    })
  }

  /**
   * Loop over binds and remove them
   * @param {Bind[]} binds
   */
  _removeEvents(binds) {
    binds.forEach(bind => {
      const eventOptions = {
        element: bind.element,
        event: bind.event,
        namespace: generateNamespace(bind.event, bind.namespace),
      }

      this._removeThrottledEvent(eventOptions)
    })
  }

  /**
   * Append requestAnimationFrame before firing event
   * @param {Bind} bind
   * @param {Event} event Event object
   */
  _trigger(bind, event) {
    const eventNamespace = generateNamespace(bind.event, bind.namespace)

    if (bind.delay) {
      if (this.timeoutList[eventNamespace]) {
        this.runningList[eventNamespace] = false
        clearTimeout(this.timeoutList[eventNamespace])
      }

      this.timeoutList[eventNamespace] = setTimeout(
        () => this.createRafInstance(bind, event, eventNamespace),
        bind.delay,
      )
    } else {
      this.createRafInstance(bind, event, eventNamespace)
    }
  }

  /**
   *
   * @param {Bind} bind
   * @param {Event} event Event object
   * @param eventNamespace {string} - Name of event space
   */
  createRafInstance(bind, event, eventNamespace) {
    if (this.runningList[eventNamespace]) return

    raf(() => {
      bind.fn(event)
      this.runningList[eventNamespace] = false
    })

    this.runningList[eventNamespace] = true
  }

  /**
   * Bind a namespaced eventlistener to given element
   * @param {Options} options
   */
  _addThrottledEvent(options) {
    const { element, event, namespace, callback } = options
    let { eventOptions } = options

    this.namespaces[namespace] = callback
    eventOptions = eventOptions || false

    element.addEventListener(event, callback, eventOptions)
  }

  /**
   * Remove a namespaced eventlistener to given element
   * @param {Options} options
   */
  _removeThrottledEvent(options) {
    const { element, event, namespace } = options
    if (this.namespaces[namespace]) {
      element.removeEventListener(event, this.namespaces[namespace])
      delete this.namespaces[namespace]
    }
  }
}

/**
 * Merges the event and the namespace together
 * @param {string} eventName
 * @param {string} namespace
 */
function generateNamespace(eventName, namespace) {
  return `${eventName}.${namespace}`
}

export default new RafThrottle()
