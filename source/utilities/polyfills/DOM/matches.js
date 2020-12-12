/**
 * Polyfill for element.matches
 * @source: https://raw.githubusercontent.com/jonathantneal/closest/master/element-closest.js
 */

;(function(ElementProto) {
  if (typeof ElementProto.matches !== 'function') {
    ElementProto.matches =
      ElementProto.msMatchesSelector ||
      ElementProto.mozMatchesSelector ||
      ElementProto.webkitMatchesSelector ||
      function matches(selector) {
        var element = this
        var elements = (element.document || element.ownerDocument).querySelectorAll(selector)
        var index = 0

        while (elements[index] && elements[index] !== element) {
          ++index
        }

        return Boolean(elements[index])
      }
  }
})(window.Element.prototype)
