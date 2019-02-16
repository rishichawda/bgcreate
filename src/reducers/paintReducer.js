import { BRUSH_COLOR } from '../shared/actionTypes';

const INITIAL_STATE = {
  brushCol: '#000000',
  lineWidth: 1,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BRUSH_COLOR:
      return { ...state, brushCol: action.payload };
    default:
      return state;
  }
}
