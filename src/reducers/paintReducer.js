import { BRUSH_COLOR, LINE_WIDTH } from '../shared/actionTypes';

const INITIAL_STATE = {
  brushCol: '#000000',
  lineWidth: 1,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BRUSH_COLOR:
      return { ...state, brushCol: action.payload };
    case LINE_WIDTH:
      return { ...state, lineWidth: action.payload };
    default:
      return state;
  }
}
