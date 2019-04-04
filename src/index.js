import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

//React Router
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch} from "react-router-dom";
import { createHashHistory } from 'history'
    
//Components
import ReduxedApp from './App';
import Dashboard from './components/Dashboard';

//Redux
import {store} from './redux/store';
import {Provider} from 'react-redux';

const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

const jsx = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Switch>
                <Route exact path='/' component={Dashboard}/>
                <Route path='/counter' component={ReduxedApp}/>
                <Route component={() => (<div>404 Not found 1</div>)} />
            </Switch>
        </Router>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
