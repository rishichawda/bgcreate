export default (canvasBg, mode) => {
  if (mode === 'particles') {
    const canvas = document.getElementsByTagName('canvas')[0];
    const finalimage = document.createElement('canvas');
    const finalimageCanvascontext = finalimage.getContext('2d');
    finalimage.width = canvas.width;
    finalimage.height = canvas.height;
    finalimageCanvascontext.fillStyle = canvasBg;
    finalimageCanvascontext.fillRect(0, 0, canvas.width, canvas.height);
    finalimageCanvascontext.drawImage(canvas, 0, 0);
    const a = document.createElement('a');
    a.href = finalimage.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
    a.download = 'bgGeneratorImage.jpg';
    a.click();
    return;
  }
  const finalimage = document.createElement('canvas');
  const finalimageCanvascontext = finalimage.getContext('2d');
  finalimage.width = 2000;
  finalimage.height = 2000;
  finalimageCanvascontext.fillStyle = canvasBg;
  finalimageCanvascontext.fillRect(0, 0, 2000, 2000);
  const a = document.createElement('a');
  a.href = finalimage.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
  a.download = 'bgGeneratorImage.jpg';
  a.click();
};
