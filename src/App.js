import React, { Component } from 'react';
import './App.scss';
import {createStore} from 'redux';
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

const calcReducer = (state = 0, action) => {
  switch (action.type) {
      case "INCREMENT":
          return state + action.incrementBy;
      default:
          return state;
  }
}

export const store = createStore(calcReducer);

console.log(store.getState());

store.subscribe(() => console.log(store.getState()))

const incrementAction = (incrementBy = 1) => ({
  type: 'INCREMENT',
  incrementBy
});

store.dispatch(incrementAction(5));

const mapStateToProps = (state) => ({
  state
})

const reduxedApp = connect(mapStateToProps)(App);

export default reduxedApp;

// 1. ustawic sklep 
// (ustawic reducer, 
//   podpiac jedna akcje, 
//   to wszystko pod sklep podpiac, 
//   wyslac kilka akcji z programu)

// 2. 
// Connect redux state with App component
// Send App to GithubPages
// Organise file structure
// Show state on componenet and get button for calculations

