/**
 * Polyfill for element.closest
 * @source: https://raw.githubusercontent.com/jonathantneal/closest/master/element-closest.js
 */

// closest requires element.matches.
import './matches'
;(function(ElementProto) {
  if (typeof ElementProto.closest !== 'function') {
    ElementProto.closest = function closest(selector) {
      var element = this

      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element
        }

        element = element.parentNode
      }

      return null
    }
  }
})(window.Element.prototype)
