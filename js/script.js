const user_config_initial = 'js/particles.json';
var user_prefs = {
  bg_color: "#FFFFFF",
  particles_load: false,
  particles_color: '',
  particles_num: 110,
  particles_density: 800,
  particles_size: 20
};

$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('body > nav > div.my-2 > i:nth-child(1)').hide();
  $('#sidenav').hide();
  $('#paint_section').hide();
  canvas_init();
});


function reset_prefs() {
  user_prefs = {
    bg_color: "#FFFFFF",
    particles_load: false,
    particles_color: '',
    particles_num: 110,
    particles_density: 800,
    particles_size: 20
  };
}

function update_prefs(bg_color = null, particles_load = null, particles_color = null, particles_num = null, particles_density = null, particles_size = null) {
  if (bg_color) {
    user_prefs.bg_color = bg_color;
  }
  if (particles_load) {
    user_prefs.particles_load = particles_load;
  }
  if (particles_color) {
    user_prefs.particles_color = particles_color;
  }
  if (particles_num) {
    user_prefs.particles_num = particles_num;
  }
  if (particles_density) {
    user_prefs.particles_density = particles_density;
  }
  if (particles_size) {
    user_prefs.particles_size = particles_size;
  }
}

function canvas_init(type=null) {
  if ($('canvas')[0] !== undefined) {
    $('canvas').remove();
  }
  if(type==='paint') {
    $('#particles-js').append($('<canvas id="paint-canvas" style="height: 100%;width: 100%;"></canvas>'));
  } else {
    $('#particles-js').append($('<canvas class="particles-js-canvas-el" style="height: 100%;width: 100%;"></canvas>'));
  }
  return $('canvas')[0];
}

function reset_canvas() {
  unload_particles();
  canvas_init();
  var option_ele = document.getElementById('effectsop');
  option_ele.value = 0;
  var anim_size = document.getElementById('aopacityop');
  if (anim_size) {
    anim_size.value = 0;
  }
  update_prefs(bg_color = "#FFFFFF", particles_load = false, particles_color = '', particles_num = 110, particles_density = 800, particles_size = 20);
}

function hex_to_rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function update_bg_color() {
  var ccode = hex_to_rgb("#" + document.getElementById('bgcolor').value);
  update_prefs(bg_color = "rgb(" + ccode.r + "," + ccode.g + "," + ccode.b + ",1.0)");
  set_bg_color();
}

function set_bg_color(ccode = user_prefs.bg_color) {
  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.style.backgroundColor = ccode;
}

function set_effect() {
  var option_ele = document.getElementById('effectsop');
  switch (option_ele.value) {
    case "0":
      unload_particles();
      $('#paint_section').hide();
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      user_prefs.particles_load = false;
      break;
    case "1":
      load_json_config(user_config_initial, true);
      $('#paint_section').hide();
      show_block(document.getElementById('pjsop'));
      show_block(document.getElementById('animate'));
      $('body > nav > div.my-2 > i:nth-child(1)').show();
      user_prefs.particles_load = true;
      break;
    case "2":
      if (confirm('Are you sure you want to proceed? Selecting this option will remove your current progress and reset the canvas.')) {
        canvas_init('paint');
        var event = $.Event('build');
        $('#paint-canvas').trigger(event);
        $('#paint_section').show();
        hide_block(document.getElementById('pjsop'));
        hide_block(document.getElementById('animate'));
        user_prefs.particles_load = false;
        // $('body > nav > div.my-2 > i:nth-child(1)').show();
      } else {
        if (user_prefs.particles_load) {
          option_ele.value = 1;
        } else {
          option_ele.value = 0;
        }
      }
      break;
    default:
      break;
  }
}

function update_density_val() {
  user_prefs.particles_density = document.getElementById('densityvalue').value
  set_density_val();
}

function set_density_val() {
  pJSDom[0].pJS.particles.number.density.value_area = user_prefs.particles_density;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function set_density() {
  var option_ele = document.getElementById('densityop');
  if (option_ele.value === "0") {
    pJSDom[0].pJS.particles.number.density.enable = true;
    document.getElementById('dval').style.display = 'block';
  } else {
    pJSDom[0].pJS.particles.number.density.enable = false;
    document.getElementById('dval').style.display = 'none';
  }
  pJSDom[0].pJS.fn.particlesRefresh();
}

function update_particles_num() {
  user_prefs.particles_num = document.getElementById('range_weight').value;
  set_particles_num();
}

function set_particles_num() {
  pJSDom[0].pJS.particles.number.value = user_prefs.particles_num;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function set_particles_color() {
  var option_ele = document.getElementById('pcolor');
  pJSDom[0].pJS.particles.color.value = option_ele.value;
  user_prefs.particles_color.value = option_ele.value;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function set_particles_shape() {
  var option_ele = document.getElementById('shapeop');
  pJSDom[0].pJS.particles.shape.type = option_ele.value;
  user_prefs.particles_shape = option_ele.value;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function set_particles_size() {
  user_prefs.particles_size = document.getElementById('range_size').value;
  pJSDom[0].pJS.particles.size.value = user_prefs.particles_size;
  // console.log(pJSDom[0].pJS.particles.size.value);
  pJSDom[0].pJS.fn.particlesUpdate();
}

function set_preset() {
  var option_ele = document.getElementById('presetop');
  switch (option_ele.value) {
    case "0":
      show_block(document.getElementById('effect'));
      show_block(document.getElementById('pjsop'));
      show_block(document.getElementById('animate'));
      load_user_config();
      break;
    case "1":
      load_json_config('js/preset1.json', false, '#2d2541');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));
      break;
    case "2":
      load_json_config('js/preset2.json', false, '#FFCC33');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));

      break;
    case "3":
      load_json_config('js/preset3.json', false, '#000000');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));
      break;
    default:
      break;
  }
}

function unload_particles() {
  var canvas = document.getElementById('particles-js');
  $('.particles-js-canvas-el').remove();
  var newcanvas = document.createElement('canvas');
  newcanvas.classList += 'particles-js-canvas-el h-100 w-100';
  canvas.appendChild(newcanvas);
  set_bg_color(user_prefs.bg_color);
  hide_block(document.getElementById('animate'));
  hide_block(document.getElementById('pjsop'))
  pJSDom = [];
}

function load_json_config(config, load_user = true, ccode) {
  particlesJS.load('particles-js', config, function () {
    if (load_user) {
      load_user_config();
    } else {
      set_bg_color(ccode);
    }
  });
}

function load_user_config() {
  set_bg_color(user_prefs.bg_color);
  if (user_prefs.particles_load) {
    set_particles_color();
    set_particles_num();
    set_density();
    set_particles_shape();
    anim_particles();
    anim_particles_opacity();
    randomise_opacity();
  } else {
    unload_particles();
  }
}

function toggle_sidenav() {
  if (document.getElementById("sidenav").style.display === "none") {
    document.getElementById("sidenav").style.display = "block";
  } else {
    document.getElementById("sidenav").style.display = "none";
  }
}

function show_error_onpage_by_qselector(selector, message) {
  var element = document.querySelectorAll(selector)[0];
  var err_message = document.createElement('div');
  var err_message_text = document.createTextNode(message);
  err_message.appendChild(err_message_text);
  err_message.classList += "alert alert-danger m-0";
  err_message.setAttribute('role', 'alert');
  element.appendChild(err_message);
}

function show_block(targetElement) {
  if (targetElement.style.display != 'block') {
    targetElement.style.display = 'block';

  }
}

function hide_block(targetElement) {
  if (targetElement.style.display != 'none') {
    targetElement.style.display = 'none';
  }
}

function get_image() {
  var canvas = document.getElementsByTagName('canvas')[0];
  if (user_prefs.bg_color === "#FFFFFF" && user_prefs.particles_load === false) {
    show_block(document.getElementById('error_message'));
    setTimeout(() => {
      // $('.alert').alert('close');
      hide_block(document.getElementById('error_message'));
    }, 2900)
  } else if (user_prefs.bg_color !== "#FFFFFF" && user_prefs.particles_load === false) {
    // $('.alert').alert('close');
    finalimage = document.createElement("canvas");
    finalimage_canvascontext = finalimage.getContext('2d');
    finalimage.width = 2000;
    finalimage.height = 2000;
    finalimage_canvascontext.fillStyle = user_prefs.bg_color;
    finalimage_canvascontext.fillRect(0, 0, 2000, 2000);
    var a = document.createElement('a');
    a.href = finalimage.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    a.download = 'bgGeneratorImage.jpg';
    a.click();
  } else {
    // hide_block(document.getElementById('error_message'));
    // $('.alert').alert('close');
    // console.log(canvas.width, canvas.height);
    finalimage = document.createElement("canvas");
    finalimage_canvascontext = finalimage.getContext('2d');
    finalimage.width = canvas.width;
    finalimage.height = canvas.height;
    finalimage_canvascontext.fillStyle = user_prefs.bg_color;
    finalimage_canvascontext.fillRect(0, 0, canvas.width, canvas.height);
    finalimage_canvascontext.drawImage(canvas, 0, 0);
    var a = document.createElement('a');
    a.href = finalimage.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
    a.download = 'bgGeneratorImage.jpg';
    a.click();
  }
}

function anim_particles() {
  if (document.getElementById('anim_cb').checked) {
    // document.getElementById('asize_op').style.display = 'block';
    pJSDom[0].pJS.particles.size.anim = {
      "enable": true,
      "speed": 40,
      "size_min": 0.1,
      "sync": false
    }
  } else {
    // document.getElementById('asize_op').style.display = 'none';
    pJSDom[0].pJS.particles.size.anim = {
      "enable": false,
      "speed": 40,
      "size_min": 0.1,
      "sync": false
    };
  }
  user_prefs.particles_size_anim = pJSDom[0].pJS.particles.size.anim;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function anim_particles_opacity() {
  if (document.getElementById('aopacity').checked) {
    document.getElementById('raopacityop').classList.remove('invisible');
    pJSDom[0].pJS.particles.opacity = {
      "value": 0.5,
      "random": this.random,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": true
      }
    };
    randomise_opacity();
  } else {
    document.getElementById('raopacityop').classList += ' invisible';
    pJSDom[0].pJS.particles.opacity = {
      "value": 0.5,
      "random": this.random,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    };
  }
  user_prefs.particles_opacity = pJSDom[0].pJS.particles.opacity;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function randomise_opacity() {
  if (document.getElementById('raopacity').checked) {
    pJSDom[0].pJS.particles.opacity.random = true;
  } else {
    pJSDom[0].pJS.particles.opacity.random = false;
  }
  user_prefs.particles_opacity_random = pJSDom[0].pJS.particles.opacity.random;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function pause_image() {
  if (pJSDom[0].pJS.particles.move.enable) {
    pJSDom[0].pJS.particles.move.enable = false;
  } else {
    pJSDom[0].pJS.particles.move.enable = true;
    pJSDom[0].pJS.fn.particlesRefresh();
  }
}

function updatepAnimSpeed() {
  user_prefs.particles_anim_speed = document.getElementById('animspeedrange').value;
  set_particles_num();
}

function setpAnimSpeed() {
  pJSDom[0].pJS.particles.size.anim.speed = user_prefs.particles_anim_speed;
  pJSDom[0].pJS.fn.particlesRefresh();
}