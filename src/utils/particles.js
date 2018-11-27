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

export function updateParticlesShape(shape) {
  pJSDom[0].pJS.fn.particlesEmpty();
  if (typeof shape === 'object') {
    for (let i = 0; i < shape.length; i += 1) {
      pJSDom[0].pJS.particles.shape.type = shape[i];
      pJSDom[0].pJS.fn.particlesCreate();
    }
  }
}

export function updateParticlesDensity(value) {
  pJSDom[0].pJS.particles.number.density.value_area = value;
  pJSDom[0].pJS.fn.particlesRefresh();
}
