class MenuToggle {
  constructor(element) {
    this.element = element
    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener('click', () => {
      this.addBodyClass()
    })
  }

  addBodyClass() {
    document.body.classList.toggle('menu--is-open')
  }
}

export default MenuToggle
