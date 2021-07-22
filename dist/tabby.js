(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Tabby = factory());
}(this, (function () { 'use strict';

  const TAB_KEY = 'Tab';
  const B_KEY = 'b';

  class Tracker {
    constructor() {
      this.keysPressed = new Set();
    }

    register(e) {
      if (e.key === TAB_KEY) {
        e.preventDefault();
      }
      this.keysPressed.add(e.key);
    }

    clear() {
      this.keysPressed.clear();
    }

    shortcutTriggered() {
      const valid = this.keysPressed.has(TAB_KEY) && this.keysPressed.has(B_KEY);
      return valid
    }
  }

  class Renderer {
    constructor({ images }) {
      this.images = images;
    }

    static randomize(max) {
      return Math.floor(Math.random() * max)
    }

    static generateLocation() {
      const windowHeight = window.innerHeight - 500;
      const windowWidth = window.innerWidth - 500;
      const left = Renderer.randomize(windowWidth);
      const top = Renderer.randomize(windowHeight);
      return { left, top }
    }

    static generateRotation() {
      const direction = Math.random() < 0.5 ? -1 : 1;
      return (Math.random() * ((50 - (-50)) + -50)) * direction
    }

    static generateStyle() {
      const { left, top } = Renderer.generateLocation();
      const degrees = Renderer.generateRotation();
      const style = `
      z-index: 9999;
      position: absolute;
      left: ${left}px;
      top: ${top}px;
      transform: rotate(${degrees}deg);
    `;
      return style
    }

    drawImage() {
      const image = document.createElement('img');
      image.src = this.images[Renderer.randomize(this.images.length)];
      image.style = Renderer.generateStyle();
      document.body.appendChild(image);
    }
  }

  const images = [
    'https://user-images.githubusercontent.com/3347296/126543571-e3a941fb-3042-4b6f-8195-f2b5634511a8.png',
    'https://user-images.githubusercontent.com/3347296/126543572-ddb4c474-b407-41cc-8cc0-26ed9c73868b.png',
    'https://user-images.githubusercontent.com/3347296/126543578-f82937e2-60f1-4039-9358-ae763cb5ed32.png',
    'https://user-images.githubusercontent.com/3347296/126543580-c483b33f-63a8-473d-8cc3-db72495992e2.png',
  ];

  class Tabby {
    constructor(images$1) {
      this.images = images$1 ?? images;
      this.tracker = new Tracker();
      this.renderer = new Renderer({ images: this.images });
    }

    init() {
      document.addEventListener('keydown', (e) => {
        this.tracker.register(e);
        if (this.tracker.shortcutTriggered()) {
          this.renderer.drawImage();
        }
      });

      document.addEventListener('keyup', (e) => {
        this.tracker.clear(e);
      });
    }

    static start(images) {
      const instance = new Tabby(images);
      instance.init();
      return instance
    }
  }

  return Tabby;

})));
