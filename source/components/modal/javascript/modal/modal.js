import { body, html } from '@utilities/dom-elements'
import Events from '@utilities/events'
import ScreenDimensions from '@utilities/screen-dimensions'
import setTabIndexOfChildren from '@utilities/set-tabindex-of-children'

const MODAL_HOOK = '[js-hook-modal]'
const MODAL_CLOSE_HOOK = '[js-hook-button-modal-close]'
const MODAL_VISIBLE_CLASS = 'modal--is-showing'
const MODAL_HTML_CLASS = 'is--modal-open'

const JS_HOOK_MODAL_TO_TOP = '[js-hook-modal-back-to-top]'
const JS_HOOK_MODAL_TITLE = '[js-hook-modal-title]'

class Modal {
  constructor() {
    this.registeredModals = {}
    this.tabIndexExceptionIds = ['modal-mega-menu']

    this.scrollElement = document.scrollingElement || html
    this.scrollTop = 0

    /** @type {HTMLElement[]} */
    const modals = Array.from(document.querySelectorAll(MODAL_HOOK))

    modals.forEach(modal => this.setupModalRegistry(modal))

    this.bindEvents()
  }

  /**
   * Bind event based on custom hook
   * @param {Object[]} data
   * @param {string} data[].id
   */
  customBind(data) {
    const modals = Array.from(document.querySelectorAll(data.hook))

    // Loop trough all found modals based on hook
    modals.forEach(modal => this.setupModalRegistry(modal))
  }

  /**
   * Setup an object per found modal
   * @param {HTMLElement} el Single modalbox
   */
  setupModalRegistry(el) {
    if (el._modalIsInitialised) return

    const id = el.getAttribute('id')

    const triggerBtn = Array.from(document.querySelectorAll(`[aria-controls=${id}]`))
    const closeBtn = Array.from(el.querySelectorAll(MODAL_CLOSE_HOOK))
    const backToTopBtn = Array.from(el.querySelectorAll(JS_HOOK_MODAL_TO_TOP))

    const mobileOnly = el.dataset.modalMobileOnly === 'true'

    const modal = {
      el,
      id,
      triggerBtn,
      closeBtn,
      backToTopBtn,
    }

    if (!mobileOnly || !ScreenDimensions.isTabletLandscapeAndBigger) {
      if (!this.tabIndexExceptionIds.includes(id)) {
        setTabIndexOfChildren(modal.el, -1)
      }
      this.registeredModals[`modal-${id}`] = modal
    }

    this.bindModalEvents(modal)

    el._modalIsInitialised = true
  }

  /**
   * Bind all general events
   */
  bindEvents() {
    Events.$on('modal::close', (_event, data) => this.closeModal(data))
    Events.$on('modal::open', (_event, data) => this.openModal(data))

    Events.$on('modal::bind', (_event, data) => this.customBind(data))
  }

  /**
   * Bind all modal specific events
   * @typedef {Object} BindOptions
   * @property {Element & {modalIsOpen: boolean}} el Modal id
   * @property {string} id Modal id
   * @property {HTMLElement[]} triggerBtn Button to open modal
   * @property {HTMLElement[]} closeBtn Button to close modal
   *
   * @param {BindOptions}
   */
  bindModalEvents({ el, id, triggerBtn, closeBtn, backToTopBtn }) {
    triggerBtn.forEach(triggerEl =>
      triggerEl.addEventListener('click', () => {
        if (el.modalIsOpen) {
          Events.$trigger('modal::close', { data: { id } })
          Events.$trigger(`modal[${id}]::close`, { data: { id } })
        } else {
          Events.$trigger('modal::open', { data: { id } })
          Events.$trigger(`modal[${id}]::open`, { data: { id } })
        }
      }),
    )

    Events.$on(`modal[${id}]::close`, () => this.closeModal({ id }))
    Events.$on(`modal[${id}]::open`, () => this.openModal({ id }))

    closeBtn.forEach(el =>
      el.addEventListener('click', () => {
        Events.$trigger('modal::close', { data: { id } })
        Events.$trigger(`modal[${id}]::close`, { data: { id } })
      }),
    )

    backToTopBtn.forEach(button =>
      button.addEventListener('click', () => {
        const modalTitle = el.querySelector(JS_HOOK_MODAL_TITLE)

        modalTitle.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
      }),
    )

    // Close on ESCAPE_KEY
    document.addEventListener('keyup', event => {
      if (event.keyCode === 27) {
        Events.$trigger('modal::close')
        Events.$trigger(`modal[${id}]::close`, { data: { id } })
      }
    })
  }

  /**
   * Open modal by given id
   * @param {{ id: string }} data
   */
  openModal(data) {
    const modal = this.registeredModals[`modal-${data.id}`]

    if (!modal || modal.el.modalIsOpen) return

    const autoFocus = modal.el.dataset.modalAutoFocus === 'true'
    const noBodyClass = modal.el.dataset.modalNoBodyClass === 'true'
    const closeAllOthers = modal.el.dataset.modalCloseAllOthers === 'true'
    const keepScrollPosition = modal.el.dataset.modalKeepScrollPosition === 'true'

    // Set scroll position for fixed body on mobile
    if (keepScrollPosition && !ScreenDimensions.isTabletPortraitAndBigger) this.setScrollPosition()

    if (closeAllOthers) {
      Object.keys(this.registeredModals)
        .filter(key => this.registeredModals[key].id !== data.id)
        .forEach(id => {
          const _modal = this.registeredModals[id]
          if (_modal.el.modalIsOpen) {
            Events.$trigger(`modal[${_modal.id}]::close`, {
              data: { id: _modal.id },
            })
          }
        })
    }

    // Add modal open class to html element if noBodyClass is false
    if (!noBodyClass) html.classList.add(MODAL_HTML_CLASS)

    // Add tabindex and add visible class
    if (!this.tabIndexExceptionIds.includes(data.id)) {
      modal.el.tabIndex = 0
      setTabIndexOfChildren(modal.el, 0)
    }

    modal.el.classList.add(MODAL_VISIBLE_CLASS)
    modal.el.modalIsOpen = true

    Events.$trigger('focustrap::activate', {
      data: {
        element: modal.el,
        autoFocus,
      },
    })
  }

  /**
   * Open modal by given id
   * @param {{ id: string }} data
   */
  closeModal(data) {
    // If no ID is given we will close all modals
    if (!data || !data.id) {
      for (const modalIndex of Object.keys(this.registeredModals)) {
        this.closeModal({ id: this.registeredModals[modalIndex].id })
        Events.$trigger('focustrap::deactivate')
      }
      return
    }

    // Get current modal from all known modals
    const modal = this.registeredModals[`modal-${data.id}`]

    // If there is no modal do nothing
    if (!modal || !modal.el.modalIsOpen) return

    const noBodyClass = modal.el.dataset.modalNoBodyClass === 'true'

    // Remove modal open class off html element if noBodyClass is false
    if (!noBodyClass) html.classList.remove(MODAL_HTML_CLASS)

    const keepScrollPosition = modal.el.dataset.modalKeepScrollPosition === 'true'

    // Scroll to original position
    if (keepScrollPosition && !ScreenDimensions.isTabletPortraitAndBigger)
      this.removeScrollPosition()

    // Remove tabindex and remove visible class
    if (!this.tabIndexExceptionIds.includes(data.id)) {
      modal.el.tabIndex = -1
      setTabIndexOfChildren(modal.el, -1)
    }

    modal.el.classList.remove(MODAL_VISIBLE_CLASS)
    modal.el.modalIsOpen = false

    Events.$trigger('focustrap::deactivate')

    Modal.clearCurrentFocus()
  }

  /**
   * Sets scrollposition to prevent body scrolling to top when position is fixed
   */
  setScrollPosition() {
    this.scrollTop = this.scrollElement.scrollTop
    body.style.top = `-${this.scrollTop}px`
  }

  /**
   * Removes scroll position from body and scrolls to original position
   */
  removeScrollPosition() {
    this.scrollElement.scrollTop = this.scrollTop
    body.style.removeProperty('top')
  }

  static clearCurrentFocus() {
    if (document.activeElement != document.body && document.activeElement instanceof HTMLElement)
      document.activeElement.blur()
  }
}

export default new Modal()
