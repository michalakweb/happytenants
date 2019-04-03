import {createStore} from 'redux';
import calcReducer from './reducer/calcReducer';

export const store = createStore(calcReducer);