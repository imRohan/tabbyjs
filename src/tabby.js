import Tracker from './tracker'
import Renderer from './renderer'
import defaultImages from './images'

export default class Tabby {
  constructor(images) {
    this.images = images ?? defaultImages
    this.tracker = new Tracker()
    this.renderer = new Renderer({ images: this.images })
  }

  init() {
    document.addEventListener('keydown', (e) => {
      this.tracker.register(e)
      if (this.tracker.shortcutTriggered()) {
        this.renderer.drawImage()
      }
    })

    document.addEventListener('keyup', (e) => {
      this.tracker.clear(e)
    })
  }

  static start(images) {
    const instance = new Tabby(images)
    instance.init()
    return instance
  }
}
