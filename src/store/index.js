import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { bg, mode, paint } from '../reducers';

const rootReducer = combineReducers({
  bgColor: bg,
  mode,
  paint,
});

const middleWares = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(reduxLogger);
}

const store = createStore(rootReducer, {}, applyMiddleware(...middleWares));

export default store;
