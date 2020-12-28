const JS_HOOK_START_BUTTON = '[js-hook-meeloopdag-start-button]'
const JS_HOOK_STEP_ONE = '[js-hook-meeloopdag-step-one]'
const JS_HOOK_FIRST_VIDEO = '[js-hook-meeloopdag-first-video]'
const JS_HOOK_FIRST_VIDEO_REPEAT = '[js-hook-meeloopdag-button-first-video-repeat]'
const JS_HOOK_FIRST_VIDEO_CONTINUE = '[js-hook-meeloopdag-button-first-video-continue]'

const CLASS_IS_HIDDEN = 'is--hidden'

class Meeloopdag {
  constructor(element) {
    this.startButton = element.querySelector(JS_HOOK_START_BUTTON)
    this.firstStepSection = document.querySelector(JS_HOOK_STEP_ONE)
    this.firstVideo = document.querySelector(JS_HOOK_FIRST_VIDEO)
    this.firstVideoRepeat = document.querySelector(JS_HOOK_FIRST_VIDEO_REPEAT)
    this.firstVideoContinue = document.querySelector(JS_HOOK_FIRST_VIDEO_CONTINUE)

    this.bindEvents()
  }

  bindEvents() {
    this.startButton.addEventListener('click', () => {
      this.showFirstStep()
    })

    this.firstVideo.addEventListener('ended', () => this.showFirstVideoButtons())
    this.firstVideoRepeat.addEventListener('click', () => this.startFirstVideo())
    this.firstVideoContinue.addEventListener('click', () => this.showSecondStep())
  }

  onYoutubeIframeAPIReady() {}

  showFirstStep() {
    this.firstStepSection.classList.remove(CLASS_IS_HIDDEN)

    this.startFirstVideo()
  }

  startFirstVideo() {
    this.firstVideo.play()
  }

  showFirstVideoButtons() {
    this.firstVideoRepeat.classList.remove(CLASS_IS_HIDDEN)
    this.firstVideoContinue.classList.remove(CLASS_IS_HIDDEN)
  }

  showSecondStep() {
    if (this.firstStepSection.classList.contains(CLASS_IS_HIDDEN))
      this.firstStepSection.classList.add(CLASS_IS_HIDDEN)

    this.secondStepSection.classList.remove(CLASS_IS_HIDDEN)
  }
}

export default Meeloopdag
