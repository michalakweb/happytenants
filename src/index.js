import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

//React Router
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch} from "react-router-dom";
import { createHashHistory } from 'history'
import PrivateRoute from './components/routes/PrivateRoute';
    
//Components
import ReduxedBuyingList from './components/BuyingList';
import Chores from './components/Chores';
import LoginPage from './components/LoginPage';

//Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import {database} from './firebase/firebase'

//Redux
import {store} from './redux/store';
import {Provider} from 'react-redux';
import {isLoggedAction, notLoggedAction} from './redux/actions/actions';

//Font Awesome and library
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faClipboardList, faBroom, faBath, faUtensils, faTrashAlt, faPlus, faShare, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel, faClipboardList, faBroom, faSpinner,
    faBath, faUtensils, faTrashAlt, faPlus, faShare, faTimes);

//Hash History
const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

const jsx = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Switch>
                <Route exact path='/' component={LoginPage}/>
                <PrivateRoute exact path='/chores' component={Chores}/>
                <PrivateRoute path='/list' component={ReduxedBuyingList}/>
                <Route component={() => (<div>404 Not found 1</div>)} />
            </Switch>
        </Router>
    </Provider>
)

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
}


// Routing whether the user is logged in or not
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const ref = firebase.database().ref(`users/${user.displayName}`);
        ref.once("value")
        .then(function(snapshot) {
            if (snapshot.val() === null) {
                database.ref(`users/${user.displayName}`).set({'email': user.email });
            } 
        });
 
        renderApp();
        store.dispatch(isLoggedAction());
        if (hashHistory.location.pathname === '/' || hashHistory.location.pathname === '/#/') {
            hashHistory.push('/chores');
        }
    } else {
        renderApp();
        store.dispatch(notLoggedAction());
        hashHistory.push('/');
    }
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
