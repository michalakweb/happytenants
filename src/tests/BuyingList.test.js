import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import BuyingList from '../components/BuyingList';

//Redux
import {Provider} from 'react-redux';
import {store} from '../redux/store';

it('Buying List renders without error', () => {
    const div = document.createElement('div');
    const jsx = (
        <BrowserRouter>
            <Provider store={store}>
                <BuyingList />
            </Provider>
        </BrowserRouter>
    );
    ReactDOM.render(jsx, div);
    ReactDOM.unmountComponentAtNode(div);
})


