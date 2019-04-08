import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import buyingListReducer from './reducer/buyingListReducer';

export const store = createStore(
  buyingListReducer,
  applyMiddleware(thunk)
);