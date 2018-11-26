import { isHexFormat, hexToRgb } from '../utils';
import { BG_UPDATE, MODE_UPDATE } from '../shared/actionTypes';

const setBackground = payload => ({
  type: BG_UPDATE,
  payload,
});

const updateMode = payload => ({
  type: MODE_UPDATE,
  payload,
});

export const resetCanvasState = () => (dispatch) => {
  dispatch(setBackground('#fff'));
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
