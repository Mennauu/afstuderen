/**
 * Polyfill for new Event > new CustomEvents
 * There's an IE polyfill for the CustomEvent constructor at MDN.
 * Adding CustomEvent to IE and using that instead works.
 * @source: https://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
 */
;(function() {
  if (typeof window.CustomEvent === 'function') return false // If not IE

  function CustomEvent(event, params) {
    const newParams = params || { bubbles: false, cancelable: false, detail: undefined }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, newParams.bubbles, newParams.cancelable, newParams.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
  return CustomEvent
})()
