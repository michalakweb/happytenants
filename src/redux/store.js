import {createStore} from 'redux';
import buyingListReducer from './reducer/buyingListReducer';

export const store = createStore(buyingListReducer);