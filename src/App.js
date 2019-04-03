import React, { Component } from 'react';
import './App.scss';

//Redux
import {incrementAction} from './redux/actions/actions';
import {store} from './redux/store';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        {console.log(this.props)}
        Calculator
      </div>
    );
  }
}

console.log(store.getState());

store.subscribe(() => console.log(store.getState()))
store.dispatch(incrementAction(5));


const mapStateToProps = (state) => ({
  state
})

const reduxedApp = connect(mapStateToProps)(App);

export default reduxedApp;

// 1. 
// Set store: reducer, action, define store
// Dispatch a test action

// 2. 
// Connect redux state with App component
// Send App to GithubPages
// Organise file structure
// Show state on componenet and get button for calculations

