var pencil_color = '#FFFFFF';

$(document).on('build','#paint-canvas',function(){ 
    var paint_canvas = false;
    var context = this.getContext('2d');
    $('#paint-canvas').on('mousedown',function(e){
        var x_pos = e.pageX - this.offsetLeft;
        var y_pos = e.pageY - this.offsetTop;
        context.strokeStyle = pencil_color;
        context.lineWidth = 7;
        paint_canvas = true;
        context.beginPath();
        context.moveTo(x_pos,y_pos);
    });
    
    $('#paint-canvas').on('mouseup',function(e){
        paint_canvas = false;
        context.stroke();
    });

    $('#paint-canvas').on('mouseleave',function(e){
        paint_canvas = false;
        context.stroke();
    });
    
    $('#paint-canvas').on('mousemove',function(e){
        if(paint_canvas) { 
            var x_pos = e.pageX - this.offsetLeft;
            var y_pos = e.pageY - this.offsetTop;
            context.lineTo(x_pos,y_pos);
        }
    });
 });

function select_pencil_color() { 
    pencil_color = '#' + $('#pencil-color')[0].value;
 }

