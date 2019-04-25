import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

//React Router
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch} from "react-router-dom";
import { createHashHistory } from 'history'
    
//Components
import ReduxedBuyingList from './components/BuyingList';
import Chores from './components/Chores';
import LoginPage from './components/LoginPage';

//Firebase
import firebase from 'firebase/app';
import 'firebase/auth';

//Redux
import {store} from './redux/store';
import {Provider} from 'react-redux';

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faClipboardList, faBroom, faBath, faUtensils, faTrashAlt } from '@fortawesome/free-solid-svg-icons'


library.add(faStroopwafel, faClipboardList, faBroom, faBath, faUtensils, faTrashAlt);

//Hash History
const hashHistory = createHashHistory({ basename: process.env.PUBLIC_URL });

const jsx = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Switch>
                <Route exact path='/' component={LoginPage}/>
                <Route exact path='/chores' component={Chores}/>
                <Route path='/buyingList' component={ReduxedBuyingList}/>
                <Route component={() => (<div>404 Not found 1</div>)} />
            </Switch>
        </Router>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));

// Routing whether the user is logged in or not
firebase.auth().onAuthStateChanged(user => {
    if (user) {
      hashHistory.push('/chores');
    } else {
      hashHistory.push('/');
    }
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
