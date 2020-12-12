import Events from '@utilities/events'

const HAS_POLYFILL_CLASS = 'has--object-fit-polyfill'
const OBJECT_FIT_IMAGE_HOOK = 'js-hook-objectfit-img'
const OBJECT_FIT_CONTAINER_HOOK = 'js-hook-objectfit-container'

const html = document.querySelector('html')

class ObjectFit {
  constructor() {
    this.bindEvents()
  }

  bindEvents() {
    Events.$on('image::object-fit', (event, element) => this.polyfillObjectFit(element))
  }

  polyfillObjectFit(element) {
    if ('objectFit' in document.documentElement.style) {
      return
    }

    const images = this.getObjectfitImages(element)
    html.classList.add(HAS_POLYFILL_CLASS)
    images.forEach(image => this.polyfillImage(image))
  }

  getObjectfitImages(element) {
    let images = []

    if (element) {
      // If element without hook is passed in, ignore it.
      if (
        typeof element.getAttribute(OBJECT_FIT_IMAGE_HOOK) === 'undefined' ||
        element.getAttribute(OBJECT_FIT_IMAGE_HOOK) === null ||
        element.getAttribute(OBJECT_FIT_IMAGE_HOOK) === false
      ) {
        return images
      }
      images.push(element)
    } else {
      images = [...document.querySelectorAll(`[${OBJECT_FIT_IMAGE_HOOK}]`)]
    }

    return images
  }

  polyfillImage(image) {
    const container = image.closest(`[${OBJECT_FIT_CONTAINER_HOOK}]`)
    container.setAttribute('style', `background-image: url(${image.currentSrc});`)
  }
}

export default new ObjectFit()
