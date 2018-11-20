import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { bg } from '../reducers';

const rootReducer = combineReducers({
  bgColor: bg,
});

const store = createStore(rootReducer, {}, applyMiddleware(reduxPromise));

export default store;
