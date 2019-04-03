import React, { Component } from 'react';
import './App.scss';
import {createStore} from 'redux';

class App extends Component {
  render() {
    return (
      <div>
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

const store = createStore(calcReducer);

console.log(store.getState());

store.subscribe(() => console.log(store.getState()))

const incrementAction = (incrementBy = 1) => ({
  type: 'INCREMENT',
  incrementBy
});

store.dispatch(incrementAction(5));

export default App;

// 1. ustawic sklep 
// (ustawic reducer, 
//   podpiac jedna akcje, 
//   to wszystko pod sklep podpiac, 
//   wyslac kilka akcji z programu)
