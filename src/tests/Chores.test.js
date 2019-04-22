import React from 'react';
import ReactDOM from 'react-dom';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom";
import Chores from '../components/Chores';
 

it('Chores renders without crashing', () => {
    const div = document.createElement('div');
    const jsx = (
        <BrowserRouter>
            <Chores />
        </BrowserRouter>
    );
    ReactDOM.render(jsx, div);
    ReactDOM.unmountComponentAtNode(div);
});