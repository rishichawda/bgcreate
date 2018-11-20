import { BG_UPDATE } from '../shared/actionTypes';

export default function (state = '#fff', action) {
  switch (action.type) {
    case BG_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
