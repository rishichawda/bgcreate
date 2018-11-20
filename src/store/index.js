import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reduxLogger from 'redux-logger';
import { bg } from '../reducers';

const rootReducer = combineReducers({
  bgColor: bg,
});

const middleWares = [reduxPromise];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(reduxLogger);
}

const store = createStore(rootReducer, {}, applyMiddleware(...middleWares));

export default store;
