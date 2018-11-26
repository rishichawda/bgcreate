/* eslint-disable no-undef */

export function loadParticles(callback) {
  particlesJS.load('particles-js', './assets/particles-config.json', () => {
    if (callback) {
      callback();
    }
  });
}

export function unloadParticles() {
  const canvas = document.getElementById('particles-js');
  canvas.removeChild(document.getElementsByClassName('particles-js-canvas-el')[0]);
  const newcanvas = document.createElement('canvas');
  newcanvas.classList += 'particles-js-canvas-el';
  newcanvas.style.height = '100%';
  newcanvas.style.width = '100%';
  canvas.appendChild(newcanvas);
  pJSDom = [];
}
