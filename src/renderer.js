export default class Renderer {
  constructor({ images }) {
    this.images = images
  }

  static randomize(max) {
    return Math.floor(Math.random() * max)
  }

  static generateLocation() {
    const windowHeight = window.innerHeight - 500
    const windowWidth = window.innerWidth - 500
    const left = Renderer.randomize(windowWidth)
    const top = Renderer.randomize(windowHeight)
    return { left, top }
  }

  static generateRotation() {
    const direction = Math.random() < 0.5 ? -1 : 1
    return (Math.random() * ((50 - (-50)) + -50)) * direction
  }

  static generateStyle() {
    const { left, top } = Renderer.generateLocation()
    const degrees = Renderer.generateRotation()
    const style = `
      z-index: 9999;
      position: absolute;
      left: ${left}px;
      top: ${top}px;
      transform: rotate(${degrees}deg);
    `
    return style
  }

  drawImage() {
    const image = document.createElement('img')
    image.src = this.images[Renderer.randomize(this.images.length)]
    image.style = Renderer.generateStyle()
    document.body.appendChild(image)
  }
}
