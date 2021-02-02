'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'
import '@utilities/polyfills'
import '@utilities/focus-trap'
import '@components/image'

import moduleInit from '@/utilities/module-init'

moduleInit.async('[js-hook-modal]', () =>
  import(/* webpackChunkName: "Modal" */ '@components/modal'),
)

moduleInit.async('[js-hook-studentencontact]', () =>
  import(/* webpackChunkName: "Modal" */ '../components/elements/studentencontact/javascript'),
)

moduleInit.async('[js-hook-studentenervaring]', () =>
  import(/* webpackChunkName: "Modal" */ '../components/elements/studentenervaring/javascript'),
)

moduleInit.async('[js-hook-meeloopdag]', () =>
  import(/* webpackChunkName: "Modal" */ '../components/elements/meeloopdag/javascript'),
)

moduleInit.async('[js-hook-menu-toggle]', () =>
  import(/* webpackChunkName: "Modal" */ '../components/menu-toggle/javascript'),
)
