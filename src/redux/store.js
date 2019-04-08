import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import buyingListReducer from './reducer/buyingListReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  buyingListReducer,
  composeEnhancers(applyMiddleware(thunk))
);

