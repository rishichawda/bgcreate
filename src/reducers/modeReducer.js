import { MODE_UPDATE } from "../shared/actionTypes";

export default function (state = 'no-effect', action) {
  switch (action.type) {
    case MODE_UPDATE:
      return action.payload;
    default:
      return state;
  }
}
