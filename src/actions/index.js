import { isHexFormat, hexToRgb } from '../utils';
import { BG_UPDATE } from '../shared/actionTypes';

export const updateBackground = (color) => {
  if (isHexFormat(color)) {
    const rgb = hexToRgb(color);
    return {
      type: BG_UPDATE,
      payload: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    };
  }
  return {
    type: BG_UPDATE,
    payload: color,
  };
};
