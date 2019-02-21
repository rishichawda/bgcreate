import { isHexFormat, hexToRgb } from '../utils';
import {
  BG_UPDATE,
  MODE_UPDATE,
  BRUSH_COLOR,
  LINE_WIDTH,
} from '../shared/actionTypes';
import { unloadParticles } from '../utils/particles';
import { PARTICLES_MODE, NORMAL_MODE } from '../shared/constants';

const setBackground = payload => ({
  type: BG_UPDATE,
  payload,
});

const updateMode = payload => ({
  type: MODE_UPDATE,
  payload,
});

export const resetCanvasState = () => (dispatch, getState) => {
  const { mode } = getState();
  if (mode === PARTICLES_MODE) {
    unloadParticles();
  }
  dispatch(setBackground('#fff'));
  dispatch(updateMode(NORMAL_MODE));
};

export const updateBackground = color => (dispatch) => {
  if (isHexFormat(color)) {
    const rgb = hexToRgb(color);
    dispatch(setBackground(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`));
  } else {
    dispatch(setBackground(color));
  }
};

export const switchMode = mode => (dispatch) => {
  dispatch(updateMode(mode));
};

export const updateBrushCol = payload => ({
  type: BRUSH_COLOR,
  payload,
});

export const updateLineWidth = payload => ({
  type: LINE_WIDTH,
  payload,
});
