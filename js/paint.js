var pencil_color = '#FFFFFF';
var paint_canvas = false;
var context;

$(document).on('build','#paint-canvas',function(){ 
    context = document.getElementById('paint-canvas').getContext('2d');
 });

function select_pencil_color() { 
    pencil_color = '#' + $('#pencil-color')[0].value;
    console.log(pencil_color);
 }

$(document).on('mousedown','#paint-canvas',function(e){
    var x_pos = e.pageX - this.offsetLeft;
    var y_pos = e.pageY - this.offsetTop;
    context.strokeStyle = pencil_color;
    context.lineJoin = "round";
    context.lineWidth = 7;
    paint_canvas = true;
    console.log('start painting');
    context.beginPath();
    context.moveTo(x_pos,y_pos);
    // console.log(context);
});

$(document).on('mouseup','#paint-canvas',function(e){
    paint_canvas = false;
    context.stroke();
    console.log('stopped painting');
});

$(document).on('mousemove','#paint-canvas',function(e){
    if(paint_canvas) { 
        console.log('painting');
        var x_pos = e.pageX - this.offsetLeft;
        var y_pos = e.pageY - this.offsetTop;
        context.lineTo(x_pos,y_pos);
    }
});