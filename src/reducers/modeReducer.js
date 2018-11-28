import { MODE_UPDATE } from '../shared/actionTypes';
import { NORMAL_MODE } from '../shared/constants';

export default function (state = NORMAL_MODE, action) {
  switch (action.type) {
    case MODE_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
