import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import buyingListReducer from './reducer/buyingListReducer';
import authReducer from './reducer/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  combineReducers({
    todoList: buyingListReducer,
    auth: authReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

