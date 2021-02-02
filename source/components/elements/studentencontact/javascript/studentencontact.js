const MODAL_CONTEXT_CLASS = '.c-studentencontact'
const MODAL_ID = 'modal-contact'
const MODAL_TITLE = '.modal__title'

const JS_HOOK_STUDENTENCONTACT_IMAGE = '.studentencontact-card__image .image__default'
const JS_HOOK_STUDENTENCONTACT_NAME = '[js-hook-studentencontact-name]'

class Studentencontact {
  constructor(element) {
    this.element = element
    this.modal = document.getElementById(MODAL_ID)
    this.modalContext = this.modal.querySelector(MODAL_CONTEXT_CLASS)
    this.modalTitle = this.modal.querySelector(MODAL_TITLE)
    this.image = element.querySelector(JS_HOOK_STUDENTENCONTACT_IMAGE)?.src
    this.name = element.querySelector(JS_HOOK_STUDENTENCONTACT_NAME)?.textContent.slice(0, -5)

    this.bindEvents()
  }

  bindEvents() {
    this.element.addEventListener('click', () => this.triggerTransition(300))
  }

  triggerTransition(ms) {
    this.modalContext.classList.add('studentencontact__transition')

    setTimeout(() => {
      this.changeModalContext()
    }, ms)
  }

  changeModalContext() {
    this.modalContext.innerHTML = `
    <div class="studentencontact__single">
        <h2 class="studentencontact__title">Hoi, ik ben ${this.name}</h2>
        <div class="studentencontact__image-wrapper">
          <img class="studentencontact__image" src='${this.image}' alt='${this.name}'>
          <div class="studentencontact__description-wrapper">
          <p>Ik kan me heel goed voorstellen dat je het 
          lastig vindt om de juiste studiekeuze te maken. 
          Zelf ben ik van opleiding veranderd, omdat mijn 
          vorige opleiding toch niet iets voor mij was. Nu 
          heb ik mijn plekje gevonden. Het is een tweejarige, 
          maar brede opleiding waarmee je direct aan de slag 
          kunt nadat je je diploma hebt behaald. Mocht je vragen 
          hebben over de opleiding of mijn ervaringen, neem gerust 
          contact op. Ik help graag!</p>
          <div class="studentencontact__contact">
            <h3 class="studentencontact__subtitle">Stel je vraag</h3>
            <a class="studentencontact__button--whatsapp" 
               href="https://api.whatsapp.com/send?phone=31621195761" 
               target="_blank" rel="nofollower noopener">Whatsapp</a>
        </div>
        </div>
        </div>
    </div>`

    this.removeTransition()
  }

  removeTransition() {
    this.modalContext.classList.remove('studentencontact__transition')

    this.modalTitle.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
  }
}

export default Studentencontact
