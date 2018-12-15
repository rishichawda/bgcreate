import { PARTICLES_COLOR_UPDATE } from '../shared/actionTypes';
import { INITIAL_CONFIG } from '../shared/constants';

export default function (state = INITIAL_CONFIG, action) {
  const updatedState = state;
  switch (action.type) {
    case PARTICLES_COLOR_UPDATE:
      updatedState.particles.color = action.payload;
      return Object.assign({}, updatedState);
    default:
      return state;
  }
}
