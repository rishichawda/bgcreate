const generateDownloadLink = (image) => {
  const a = document.createElement('a');
  a.href = image.toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
  a.download = 'bgGeneratorImage.jpg';
  document.body.appendChild(a);
  a.click();
};

export default (canvasBg, mode) => {
  const finalimage = document.createElement('canvas');
  const finalimageCanvascontext = finalimage.getContext('2d');
  if (mode === 'particles') {
    const canvas = document.getElementsByTagName('canvas')[0];
    finalimage.width = canvas.width;
    finalimage.height = canvas.height;
    finalimageCanvascontext.fillStyle = canvasBg;
    finalimageCanvascontext.fillRect(0, 0, canvas.width, canvas.height);
    finalimageCanvascontext.drawImage(canvas, 0, 0);
    generateDownloadLink(finalimage);
    return;
  }
  finalimage.width = 2000;
  finalimage.height = 2000;
  finalimageCanvascontext.fillStyle = canvasBg;
  finalimageCanvascontext.fillRect(0, 0, 2000, 2000);
  generateDownloadLink(finalimage);
};
