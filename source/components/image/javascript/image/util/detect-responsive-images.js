const hasResponsiveImages = function() {
  const supports = {
    srcset: false,
    currentSrc: false,
    sizes: false,
    picture: false,
  }

  const img = new Image()

  if ('srcset' in img) {
    supports.srcset = true
  }

  if ('currentSrc' in img) {
    supports.currentSrc = true
  }

  if ('sizes' in img) {
    supports.sizes = true
  }

  if ('HTMLPictureElement' in window) {
    supports.picture = true
  }

  return supports
}

export default hasResponsiveImages()
