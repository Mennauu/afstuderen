const KEYBOARD_FOCUSED = 'has--keyboard-focus'
const TAB_KEYS = ['Tab', 9]

class DetectKeyboardFocus {
  constructor() {
    this.keyDown = false

    document.addEventListener('keydown', event => this.handleKey(true, event), true)
    document.addEventListener('keyup', () => this.handleKey(false), true)
    document.addEventListener('mouseleave', () => this.handleKey(false))
    document.addEventListener('focus', () => this.handleFocus(), true)
    document.addEventListener('blur', () => DetectKeyboardFocus.handleBlur(), true)
  }

  handleKey(pressed, event) {
    const key = event ? event.key || event.keyCode : undefined

    if (event && TAB_KEYS.indexOf(key) === -1) return

    this.keyDown = pressed
  }

  handleFocus() {
    if (this.keyDown) document.body.classList.add(KEYBOARD_FOCUSED)
  }

  static handleBlur() {
    document.body.classList.remove(KEYBOARD_FOCUSED)
  }
}

export default new DetectKeyboardFocus()
