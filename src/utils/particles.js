/* eslint-disable no-undef */

export function loadParticles() {
  particlesJS.load('particles-js', './assets/particles-config.json', () => {
    console.log('particles loaded');
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
