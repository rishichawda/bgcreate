$(document).on('build', '#paint-canvas', function () {
    var canvas = document.getElementById('paint-canvas');
    var paint_style = getComputedStyle($('#particles-js')[0]);
    canvas.width = parseInt(paint_style.getPropertyValue('width'));
    canvas.height = parseInt(paint_style.getPropertyValue('height'));
    var mouse = {
        x: 0,
        y: 0
    };

    var context = canvas.getContext('2d');
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX - this.offsetLeft + 16;
        mouse.y = e.pageY - this.offsetTop - 56;
    }, false);

    canvas.addEventListener('mousedown', function (e) {
        context.beginPath();
        context.moveTo(mouse.x, mouse.y);
        context.lineWidth = document.getElementById('pencil-size').value;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.strokeStyle = '#' + document.getElementById('pencil-color').value;
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function () {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseleave', function () {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function () {
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
    };
});