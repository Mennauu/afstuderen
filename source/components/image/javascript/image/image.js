import './lazy-image'
import './object-fit'

import Events from '@utilities/events'

class Image {
  constructor() {
    Events.$trigger('image::object-fit')
  }
}

export default new Image()
