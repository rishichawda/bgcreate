export function loadParticles() {
  particlesJS.load('particles-js', './assets/particles-config.json', () => {
    console.log('particles loaded');
  });
}
