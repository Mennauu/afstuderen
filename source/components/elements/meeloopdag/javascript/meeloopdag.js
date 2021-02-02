const create360Viewer = require('360-image-viewer')
const canvasFit = require('canvas-fit')

const JS_HOOK_START_BUTTON = '[js-hook-meeloopdag-start-button]'
const JS_HOOK_TIMER = '[js-hook-meeloopdag-timer]'
const JS_HOOK_TIMER_TWO = '[js-hook-meeloopdag-timer-two]'

const JS_HOOK_STEP_ONE = '[js-hook-meeloopdag-step-one]'
const JS_HOOK_FIRST_VIDEO = '[js-hook-meeloopdag-first-video]'
const JS_HOOK_FIRST_VIDEO_REPEAT = '[js-hook-meeloopdag-button-first-video-repeat]'
const JS_HOOK_FIRST_VIDEO_CONTINUE = '[js-hook-meeloopdag-button-first-video-continue]'
const JS_HOOK_VIDEO_TEXT = '[js-hook-meeloopdag-video-text]'
const JS_HOOK_VIDEO_TEXT_TWO = '[js-hook-meeloopdag-video-text-two]'

const JS_HOOK_STEP_TWO = '[js-hook-meeloopdag-step-two]'
const JS_HOOK_SECOND_VIDEO = '[js-hook-meeloopdag-second-video]'
const JS_HOOK_SECOND_VIDEO_REPEAT = '[js-hook-meeloopdag-button-second-video-repeat]'
const JS_HOOK_SECOND_VIDEO_CONTINUE = '[js-hook-meeloopdag-button-second-video-continue]'

const JS_HOOK_STEP_THREE = '[js-hook-meeloopdag-step-three]'
const JS_HOOK_QUIZ_LABEL = '[js-hook-quiz-label]'
const JS_HOOK_QUIZ_INPUT = '[js-hook-quiz-input]'
const JS_HOOK_QUIZ_BUTTON = '[js-hook-quiz-button]'
const JS_HOOK_GOOD_TITLE = '[js-hook-quiz-good-title]'

const JS_HOOK_STEP_FOUR = '[js-hook-meeloopdag-step-four]'
const JS_HOOK_ROTATE_BUTTON = '[js-hook-rotate-button]'
const JS_HOOK_ROTATE_INFO_BLOCK = '[js-hook-rotate-info-block]'
const JS_HOOK_ROTATE_CONTINUE_BUTTON = '[js-hook-rotate-continue-button]'

const JS_HOOK_END = '[js-hook-meeloopdag-end]'
const JS_HOOK_END_TITLE = '[js-hook-meeloopdag-end-title]'

const JS_HOOK_MODAL_CLOSE = '[js-hook-button-modal-close]'

const CLASS_IS_RIGHT = 'meeloopdag-quiz--is-right'
const CLASS_IS_WRONG = 'meeloopdag-quiz--is-wrong'
const CLASS_IS_HIDDEN = 'is--hidden'
const CLASS_IS_HIDDEN_FULL = 'is--hidden-full'
const CLASS_IS_AUTO = 'height--is-auto'
const CLASS_IS_ROTATE_ACTIVE = 'rotate--is-active'
const CLASS_TIMER_IS_ACTIVE = 'meeloopdag__timer--is-active'

class Meeloopdag {
  constructor(element) {
    this.element = element
    this.startButton = element.querySelector(JS_HOOK_START_BUTTON)
    this.timer = document.querySelector(JS_HOOK_TIMER)
    this.timerTwo = document.querySelector(JS_HOOK_TIMER_TWO)

    // Step 1
    this.firstStepSection = document.querySelector(JS_HOOK_STEP_ONE)
    this.firstVideo = document.querySelector(JS_HOOK_FIRST_VIDEO)
    this.firstVideoRepeat = document.querySelector(JS_HOOK_FIRST_VIDEO_REPEAT)
    this.firstVideoContinue = document.querySelector(JS_HOOK_FIRST_VIDEO_CONTINUE)
    this.firstVideoText = document.querySelector(JS_HOOK_VIDEO_TEXT)

    // Step 2
    this.fourthStepSection = document.querySelector(JS_HOOK_STEP_FOUR)
    this.rotateButton = document.querySelector(JS_HOOK_ROTATE_BUTTON)
    this.rotateInfoBlock = document.querySelector(JS_HOOK_ROTATE_INFO_BLOCK)
    this.rotateContinueButton = document.querySelector(JS_HOOK_ROTATE_CONTINUE_BUTTON)

    // Step 3
    this.thirdStepSection = document.querySelector(JS_HOOK_STEP_THREE)
    this.quizLabels = [...document.querySelectorAll(JS_HOOK_QUIZ_LABEL)]
    this.quizInputs = [...document.querySelectorAll(JS_HOOK_QUIZ_INPUT)]
    this.quizButton = document.querySelector(JS_HOOK_QUIZ_BUTTON)
    this.quizGoodTitle = document.querySelector(JS_HOOK_GOOD_TITLE)

    // Step 4
    this.secondStepSection = document.querySelector(JS_HOOK_STEP_TWO)
    this.secondVideo = document.querySelector(JS_HOOK_SECOND_VIDEO)
    this.secondVideoRepeat = document.querySelector(JS_HOOK_SECOND_VIDEO_REPEAT)
    this.secondVideoContinue = document.querySelector(JS_HOOK_SECOND_VIDEO_CONTINUE)
    this.secondVideoText = document.querySelector(JS_HOOK_VIDEO_TEXT_TWO)

    // End
    this.endSection = document.querySelector(JS_HOOK_END)
    this.endTitle = document.querySelector(JS_HOOK_END_TITLE)
    this.modalCloseButtons = [...document.querySelectorAll(JS_HOOK_MODAL_CLOSE)]

    this.bindEvents()
  }

  bindEvents() {
    this.startButton.addEventListener('click', () => {
      // this.showThirdStep()
      this.showFirstStep()
    })

    this.firstVideo?.addEventListener('ended', () => this.showFirstVideoButtons())
    this.secondVideo?.addEventListener('ended', () => this.showSecondVideoButtons())

    this.firstVideoRepeat?.addEventListener('click', () => this.startVideo(this.firstVideo))
    this.firstVideoContinue?.addEventListener('click', () => this.showFourthStep())

    this.secondVideoRepeat?.addEventListener('click', () => this.startVideo(this.secondVideo))
    this.secondVideoContinue?.addEventListener('click', () => this.showThirdStep())

    this.quizButton.addEventListener('click', () => this.checkQuizAnswer())
    this.quizInputs.forEach(input => {
      input.addEventListener('click', () => {
        this.scrollIntoView(this.quizButton)
      })
    })

    this.rotateButton.addEventListener('click', () => this.toggleRotateInfo())
    this.rotateContinueButton.addEventListener('click', () => this.showSecondStep())

    this.modalCloseButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (!this.endSection.classList.contains(CLASS_IS_HIDDEN_FULL)) {
          this.endSection.classList.add(CLASS_IS_HIDDEN_FULL)
        }
      })
    })
  }

  startVideo(video) {
    video.play()
  }

  stopVideo(video) {
    video.pause()
  }

  scrollIntoView(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
  }

  toggleRotateInfo() {
    this.rotateInfoBlock.classList.toggle(CLASS_IS_HIDDEN)
    this.rotateButton.classList.toggle(CLASS_IS_ROTATE_ACTIVE)
  }

  checkQuizAnswer() {
    this.quizInputs.forEach(input => {
      const label = document.querySelector(`label[for='${input.id}']`)

      if (input.checked && input.id === 'first') {
        label.classList.add(CLASS_IS_RIGHT)

        this.quizInputs.forEach(inputElement => {
          inputElement.setAttribute('disabled', '')
        })

        this.quizGoodTitle.classList.remove(CLASS_IS_HIDDEN)
        this.quizGoodTitle.classList.add(CLASS_IS_AUTO)

        this.quizButton.innerHTML = 'Doorgaan'

        this.quizButton.addEventListener('click', () => this.showEnd())

        setTimeout(() => {
          this.quizButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })
        }, 100)
      } else if (input.checked) {
        input.setAttribute('disabled', '')
        label.classList.add(CLASS_IS_WRONG)
      }
    })
  }

  // Step 1

  showFirstStep() {
    this.firstStepSection.classList.remove(CLASS_IS_HIDDEN)

    this.startVideo(this.firstVideo)
    this.timer.classList.add(CLASS_TIMER_IS_ACTIVE)
    this.startTimer(true, 1)
  }

  showFirstVideoButtons() {
    this.firstVideoRepeat.classList.remove(CLASS_IS_HIDDEN)
    this.firstVideoContinue.classList.remove(CLASS_IS_HIDDEN)
  }

  // Step 2

  showSecondStep() {
    if (!this.fourthStepSection.classList.contains(CLASS_IS_HIDDEN))
      this.fourthStepSection.classList.add(CLASS_IS_HIDDEN)

    this.secondStepSection.classList.remove(CLASS_IS_HIDDEN)
    this.startVideo(this.secondVideo)
    this.timerTwo.classList.add(CLASS_TIMER_IS_ACTIVE)
    this.startTimer(true, 2)
  }

  showSecondVideoButtons() {
    this.secondVideoRepeat.classList.remove(CLASS_IS_HIDDEN)
    this.secondVideoContinue.classList.remove(CLASS_IS_HIDDEN)
  }

  // Step 3

  showThirdStep() {
    this.timerTwo.classList.add(CLASS_IS_HIDDEN_FULL)

    if (!this.secondStepSection.classList.contains(CLASS_IS_HIDDEN)) {
      this.secondStepSection.classList.add(CLASS_IS_HIDDEN)
    }

    this.thirdStepSection.classList.remove(CLASS_IS_HIDDEN_FULL)
  }

  showFourthStep() {
    this.timer.classList.add(CLASS_IS_HIDDEN_FULL)
    // if (!this.thirdStepSection.classList.contains(CLASS_IS_HIDDEN_FULL)) {
    //   this.thirdStepSection.classList.add(CLASS_IS_HIDDEN_FULL)
    // }

    if (!this.firstStepSection.classList.contains(CLASS_IS_HIDDEN))
      this.firstStepSection.classList.add(CLASS_IS_HIDDEN)

    this.fourthStepSection.classList.remove(CLASS_IS_HIDDEN_FULL)

    // load your image
    const image = new Image()
    image.src = '/assets/images/360.jpg'

    image.onload = () => {
      // when the image is loaded, setup the viewer
      const viewer = create360Viewer({
        image: image,
      })

      // attach canvas to body
      this.fourthStepSection.appendChild(viewer.canvas)

      // setup fullscreen canvas sizing
      const fit = canvasFit(viewer.canvas, window, window.devicePixelRatio)
      window.addEventListener('resize', fit, false)
      fit()

      // start the render loop
      viewer.start()

      this.toggleRotateInfo()
    }
  }

  // End
  showEnd() {
    if (!this.thirdStepSection.classList.contains(CLASS_IS_HIDDEN_FULL)) {
      this.thirdStepSection.classList.add(CLASS_IS_HIDDEN_FULL)
    }

    this.endSection.classList.remove(CLASS_IS_HIDDEN_FULL)

    this.scrollIntoView(this.endTitle)
  }

  startTimer(state, number) {
    let count = 0

    if (state !== false) {
      count = 0

      setInterval(() => {
        count++
        const hour = Math.floor(count / 3600)
        const minute = Math.floor((count - hour * 3600) / 60)
        const seconds = count - (hour * 3600 + minute * 60)
        const time =
          ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2) + ':' + ('0' + seconds).slice(-2)

        if (number === 1) {
          this.showMessage(time)
        } else {
          this.showMessageTwo(time)
        }
      }, 1000)
    }
  }

  showMessageTwo(time) {
    if (time == '00:00:17') {
      this.startTimer(false, 0)
    }

    const data = [
      {
        text: 'Dit is de coffeecorner van het Benno Premselahuis',
        timestamp: '00:00:01',
      },
      {
        text: 'Je kan hier heerlijk eten kopen',
        timestamp: '00:00:03',
      },
      {
        text: 'Maar, nog belangrijker, een lekker bakje koffie kopen',
        timestamp: '00:00:05',
      },
      {
        text: 'Je hoeft alleen maar je pasje er even voor te doen en',
        timestamp: '00:00:09',
      },
      {
        text: 'eventjes wachten.',
        timestamp: '00:00:11',
      },
      {
        text: 'en je koffie is klaar, zo snel gaat dat!',
        timestamp: '00:00:13',
      },
    ]

    for (const item of data) {
      if (item.timestamp == time) {
        this.secondVideoText.innerHTML = item.text
      }
    }
  }

  showMessage(time) {
    if (time == '00:00:34') {
      this.startTimer(false, 0)
    }

    const data = [
      {
        text: 'Hallo, ik ben Jan-Henk. Tweedejaars Associate Degree student',
        timestamp: '00:00:01',
      },
      {
        text: 'Frontend Design & Development aan de Hogeschool van Amsterdam',
        timestamp: '00:00:04',
      },
      {
        text: 'Welkom op de amstelcampus',
        timestamp: '00:00:08',
      },
      {
        text: 'We hebben hier meerdere gebouwen',
        timestamp: '00:00:10',
      },
      {
        text: 'allemaal op loopafstand van elkaar.',
        timestamp: '00:00:12',
      },
      {
        text: 'Ik wil je graag het Benno Premselahuis laten zien',
        timestamp: '00:00:15',
      },
      {
        text: 'welke je kan vinden op Rhijnspoorplein 1.',
        timestamp: '00:00:18',
      },
      {
        text: 'In dit gebouw zitten studenten van de faculteit',
        timestamp: '00:00:20',
      },
      {
        text: 'Digitale Media en Creatieve Industrie,',
        timestamp: '00:00:22',
      },
      {
        text: 'De Associate Degree Frontend Design & Development valt hier ook onder',
        timestamp: '00:00:24',
      },
      {
        text: 'Ik ga je een rondleiding door het gebouw geven',
        timestamp: '00:00:29',
      },
      {
        text: 'en je een paar interessante plekken laten zien.',
        timestamp: '00:00:31',
      },
      {
        text: '',
        timestamp: '00:00:33',
      },
    ]

    for (const item of data) {
      if (item.timestamp == time) {
        this.firstVideoText.innerHTML = item.text
      }
    }
  }
}

export default Meeloopdag
