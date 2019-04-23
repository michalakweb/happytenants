import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import BottomNav from '../components/BottomNav';

//Redux
import {Provider} from 'react-redux';
import {store} from '../redux/store';

it('Bottom Nav renders without error', () => {
    const div = document.createElement('div');
    const jsx = (
        <BrowserRouter>
            <Provider store={store}>
                <BottomNav />
            </Provider>
        </BrowserRouter>
    );
    ReactDOM.render(jsx, div);
})