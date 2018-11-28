import { PARTICLES_MODE } from '../shared/constants';

const generateDownloadLink = (image) => {
  const a = document.createElement('a');
  a.href = image
    .toDataURL('image/jpeg')
    .replace('image/jpeg', 'image/octet-stream');
  a.download = 'bgGeneratorImage.jpg';
  document.body.appendChild(a);
  a.click();
};

const getViewportDimensions = (canvas) => {
  const width = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0,
    window.devicePixelRatio > 1
      ? canvas.offsetWidth * window.devicePixelRatio
      : canvas.offsetWidth,
  );
  const height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
    window.devicePixelRatio > 1
      ? canvas.offsetHeight * window.devicePixelRatio
      : canvas.offsetHeight,
  );
  return { width, height };
};

export default (canvasBg, mode) => {
  const finalimage = document.createElement('canvas');
  const finalimageCanvascontext = finalimage.getContext('2d');
  const canvas = document.getElementsByTagName('canvas')[0];
  const { width, height } = getViewportDimensions(canvas);
  finalimage.width = width;
  finalimage.height = height;
  finalimageCanvascontext.fillStyle = canvasBg;
  finalimageCanvascontext.fillRect(0, 0, width, height);
  if (mode === PARTICLES_MODE) {
    finalimageCanvascontext.drawImage(canvas, 0, 0);
  }
  generateDownloadLink(finalimage);
};
