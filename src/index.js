import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route} from "react-router-dom";

//Components
import ReduxedApp from './App';
import Dashboard from './components/Dashboard';

//Redux
import {store} from './redux/store';
import {Provider} from 'react-redux';

const jsx = (
    <Provider store={store}>
        <Router>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/counter' component={ReduxedApp}/>
        </Router>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
