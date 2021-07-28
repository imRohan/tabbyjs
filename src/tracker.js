const TAB_KEY = 'Tab'
const B_KEY = 'b'

export default class Tracker {
  constructor() {
    this.keysPressed = new Set()
  }

  register(e) {
    if (e.key === TAB_KEY) {
      e.preventDefault()
    }
    this.keysPressed.add(e.key)
  }

  clear(e) {
    if (e.key !== B_KEY) {
      this.keysPressed.clear()
    }
  }

  shortcutTriggered() {
    const valid = this.keysPressed.has(TAB_KEY) && this.keysPressed.has(B_KEY)
    return valid
  }
}
