import RafThrottle from '@utilities/raf-throttle'

const MEDIA_QUERIES = [
  {
    reference: 'isMobile',
    breakpoint: 320,
  },
  {
    reference: 'isMobilePlus',
    breakpoint: 480,
  },
  {
    reference: 'isTabletPortrait',
    breakpoint: 768,
  },
  {
    reference: 'isTabletLandscape',
    breakpoint: 1024,
  },
  {
    reference: 'isLaptop',
    breakpoint: 1240,
  },
  {
    reference: 'isDesktop',
    breakpoint: 1600,
  },
  {
    reference: 'isWidescreen',
    breakpoint: 1920,
  },
]

class ScreenDimensions {
  get screenHeight() {
    return this.height
  }

  get screenWidth() {
    return this.width
  }

  constructor() {
    RafThrottle.set([
      {
        element: window,
        event: 'resize',
        namespace: 'ScreenDimensionsWidthChange',
        fn: () => this.updateWidth(),
      },
    ])

    MEDIA_QUERIES.forEach((mqObject, index) => {
      const breakpoint = mqObject.breakpoint

      installMediaQueryWatcher(`(min-width: ${breakpoint}px)`, matches => {
        this[`${mqObject.reference}AndBigger`] = matches
      })

      if (!index) {
        installMediaQueryWatcher(`(max-width: ${breakpoint}px)`, matches => {
          this[mqObject.reference] = matches
        })
      } else if (MEDIA_QUERIES[index + 1]) {
        installMediaQueryWatcher(
          `(min-width: ${breakpoint}px) and (max-width: ${MEDIA_QUERIES[index + 1].breakpoint -
            1}px)`,
          matches => {
            this[mqObject.reference] = matches
          },
        )
      } else {
        installMediaQueryWatcher(`(min-width: ${breakpoint}px)`, matches => {
          this[mqObject.reference] = matches
        })
      }
    })

    this.updateWidth()
  }

  updateWidth() {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
}

const installMediaQueryWatcher = (mediaQuery, layoutChangedCallback) => {
  const mql = window.matchMedia(mediaQuery)
  mql.addListener(event => layoutChangedCallback(event.matches, event.media))
  layoutChangedCallback(mql.matches, mql.media)
}

export default new ScreenDimensions()
