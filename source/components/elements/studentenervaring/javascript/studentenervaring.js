const MODAL_CONTEXT_CLASS = '.c-studentenervaring'
const MODAL_ID = 'modal-ervaringen'
const MODAL_TITLE = '.modal__title'

const JS_HOOK_studentenervaring_IMAGE = '.studentenervaring-card__image .image__default'
const JS_HOOK_studentenervaring_NAME = '[js-hook-studentenervaring-name]'

class Studentenervaring {
  constructor(element) {
    this.element = element
    this.modal = document.getElementById(MODAL_ID)
    this.modalContext = this.modal.querySelector(MODAL_CONTEXT_CLASS)
    this.modalTitle = this.modal.querySelector(MODAL_TITLE)
    this.image = element.querySelector(JS_HOOK_studentenervaring_IMAGE)?.src
    this.name = element.querySelector(JS_HOOK_studentenervaring_NAME)?.textContent.slice(0, -5)

    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener('click', () => this.triggerTransition(300))
  }

  triggerTransition(ms) {
    this.modalContext.classList.add('studentenervaring__transition')

    setTimeout(() => {
      this.changeModalContext()
    }, ms)
  }

  changeModalContext() {
    this.modalContext.innerHTML = `
    <div class="studentenervaring__single">
        <h2 class="studentenervaring__title">Hoi, ik ben ${this.name}</h2>
        <div class="studentenervaring__image-wrapper">
          <img class="studentenervaring__image" src='${this.image}' alt='${this.name}'>
          <div class="studentenervaring__description-wrapper">
          <p>Ik kan me heel goed voorstellen dat je het 
          lastig vindt om de juiste studiekeuze te maken. 
          Zelf ben ik van opleiding veranderd, omdat mijn 
          vorige opleiding toch niet iets voor mij was. Nu 
          heb ik mijn plekje gevonden. Het is een tweejarige, 
          maar brede opleiding waarmee je direct aan de slag 
          kunt nadat je je diploma hebt behaald. Tijdens de opleiding
          leer je veel over het gebruik van Semantische HTML en CSS.
          Daarnaast leer je om goede controle te krijgen van de basis
          van JavaScript, zonder het gebruik van frameworks.
        </div>
    </div>`

    this.removeTransition()
  }

  removeTransition() {
    this.modalContext.classList.remove('studentenervaring__transition')

    this.modalTitle.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
  }
}

export default Studentenervaring
