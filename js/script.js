const user_config_initial = 'js/particles.json';
var current_user_config = {};
user_prefs = {
  bg_color: "#FFFFFF",
  particles_load: false,
  particles_color: '',
  particles_num: 110,
  particles_density: 800
};


$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  document.getElementById("sidenav").style.display = "none";
});

function set_effect() {
  var option_ele = document.getElementById('effectsop');
  switch (option_ele.value) {
    case "0":
      unload_particles();
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      // user_prefs.particles_load = false;
      break;
    case "1":
      load_json_config(user_config_initial);
      show_block(document.getElementById('pjsop'));
      show_block(document.getElementById('animate'));
      user_prefs.particles_load = true;
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

function hex_to_rgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function update_bg_color() {
  var option_ele = document.getElementById('bgcolor');
  var ccode = hex_to_rgb("#" + option_ele.value);
  user_prefs.bg_color = "rgb(" + ccode.r + "," + ccode.g + "," + ccode.b + ",1.0)";
  set_bg_color(user_prefs.bg_color);
}

function set_bg_color(ccode) {
  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.style.backgroundColor = ccode;
}

function reset_bg_color() {
  set_bg_color('#FFFFFF');
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

function set_particles_size(size = null) {
  pJSDom[0].pJS.particles.size.value = document.getElementById('range_size').value;
  user_prefs.particles_size = option_ele.value;
  // console.log(pJSDom[0].pJS.particles.size.value);
  pJSDom[0].pJS.fn.particlesRefresh();
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
      load_json_config('js/preset1.json');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));
      set_bg_color('#2d2541');
      break;
    case "2":
      load_json_config('js/preset2.json');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));
      set_bg_color('#FFCC33');
      break;
    case "3":
      load_json_config('js/preset3.json');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));
      break;
    default:
      break;
  }
}

function reset_canvas() {
  unload_particles();
  reset_bg_color();
  var option_ele = document.getElementById('effectsop');
  option_ele.value = 0;
  var anim_size = document.getElementById('aopacityop');
  if (anim_size) {
    anim_size.value = 0;
  }
  current_user_config = {};
  user_prefs = {
    bg_color: "#FFFFFF",
    particles_load: false,
    particles_color: '',
  };
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

function load_json_config(config) {
  particlesJS.load('particles-js', config, function () {
    load_user_config();
  });
}

function load_user_config() {
  set_bg_color(user_prefs.bg_color);
  if (user_prefs.particles_load) {
    set_particles_color();
    set_particles_num();
    set_density();
    set_particles_shape();
    // set_particles_size();
    // }
    // if(user_prefs.particles_color.rgb)
    // pJSDom[0].pJS.particles.color.rgb = user_prefs.particles_color.rgb;
    // console.log(pJSDom[0]);
    // $.getJSON("js/particles.json", function (json) {

    //   current_user_config = json;
    //   current_user_config.particles.color = user_prefs.particles_color;

    // });
    // particlesJS.load('particles-js', user_config_initial, function () {
    //   console.log('loaded');
    //   set_particles_color(null);
    // });
    // set_particles_num();
    // if (user_prefs.particles_size_anim != undefined) {
    //   pJSDom[0].pJS.particles.size.anim = user_prefs.particles_size_anim;
    //   pJSDom[0].pJS.fn.particlesRefresh();
    // }
    // set_particles_shape();
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
  if (user_prefs.bg_color === "" && user_prefs.particles_load === false) {
    show_block(document.getElementById('error_message'));
    setTimeout(() => {
      // $('.alert').alert('close');
      hide_block(document.getElementById('error_message'));
    }, 2000)
  } else if (user_prefs.bg_color !== "" && user_prefs.particles_load === false) {
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