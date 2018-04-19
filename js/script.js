const user_config_initial = 'js/particles.json';
var current_user_config = {};
user_prefs = {
  bg_color: "",
  particles: false
};

$(document).ready(function () {
  document.getElementById("sidenav").style.display = "none";
});

function set_effect() {
  var option_ele = document.getElementById('effectsop');
  switch (option_ele.value) {
    case "0":
      unload_particles();
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      user_prefs.particles = false;
      break;
    case "1":
      load_json_config(user_config_initial);
      show_block(document.getElementById('pjsop'));
      show_block(document.getElementById('animate'));
      user_prefs.particles = true;
      break;
    default:
      break;
  }
}

function set_density_val() {
  pJSDom[0].pJS.particles.number.density.value_area = document.getElementById('densityvalue').value;
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

function set_particles_num() {
  pJSDom[0].pJS.particles.number.value = document.getElementById('range_weight').value;
  user_prefs.particles_num = document.getElementById('range_weight').value;
  pJSDom[0].pJS.fn.particlesRefresh();
}


function set_bg_color(config = user_prefs, ccode = null) {
  var canvas = document.getElementById('particles-js');
  if (ccode === null) {
    var option_ele = document.getElementById('bgcolor');
    canvas.style.backgroundColor = option_ele.value
  } else {
    canvas.style.backgroundColor = ccode;
  }
  config.bg_color = canvas.style.backgroundColor;
  return config;
}

function set_particles_color() {
  var option_ele = document.getElementById('pcolor');
  pJSDom[0].pJS.particles.color.value = option_ele.value;
  user_prefs.particles_color = option_ele.value;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function set_particles_shape() {
  var option_ele = document.getElementById('shapeop');
  pJSDom[0].pJS.particles.shape.type = option_ele.value;
  user_prefs.particles_shape = option_ele.value;
  pJSDom[0].pJS.fn.particlesRefresh();
}

function set_particles_size() {
  pJSDom[0].pJS.particles.size.value = document.getElementById('range_size').value;
  user_prefs.particles_size = option_ele.value;
  // console.log(pJSDom[0].pJS.particles.size.value);
  pJSDom[0].pJS.fn.particlesRefresh();
}

function set_preset() {
  var option_ele = document.getElementById('presetop');
  switch (option_ele.value) {
    case "0":
      load_user_config(true);
      show_block(document.getElementById('effect'));
      document.getElementById('effectsop').value = 0;
      break;
    case "1":
      load_json_config('js/preset1.json');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));
      set_bg_color({}, '#2d2541');
      break;
    case "2":
      load_json_config('js/preset2.json');
      hide_block(document.getElementById('pjsop'));
      hide_block(document.getElementById('animate'));
      hide_block(document.getElementById('effect'));
      set_bg_color({}, '#FFCC33');
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

function reset_bg_color() {
  user_prefs.bg_color = set_bg_color(user_prefs, '#FFFFFF');
}

function reset_canvas() {
  unload_particles();
  reset_bg_color();
  current_user_config = {};
}

function unload_particles() {
  var canvas = document.getElementById('particles-js');
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  load_user_config(false);
}

function load_json_config(config) {
  particlesJS.load('particles-js', config, function(){});
}

function load_user_config(particles_load) {
  var canvas = document.getElementById('particles-js');
  canvas.style.backgroundColor = user_prefs.bg_color;
  if (particles_load) {
    pJSDom[0].pJS.particles.number.value = user_prefs.particles_num;
    pJSDom[0].pJS.particles.size.anim = user_prefs.particles_size_anim;
    pJSDom[0].pJS.particles.shape.type = user_prefs.particles_shape;
    pJSDom[0].pJS.fn.particlesRefresh();
    console.log(user_prefs);
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
  targetElement.style.display = 'block';
}

function hide_block(targetElement) {
  targetElement.style.display = 'none';
}

function get_image() {
  var canvas = document.getElementsByTagName('canvas')[0];
  console.log(canvas.width, canvas.height);
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