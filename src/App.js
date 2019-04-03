import React, { Component } from 'react';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Button} from 'react-bootstrap';
import './App.scss';

//Redux
import {incrementAction, decrementAction, resetAction} from './redux/actions/actions';
import {store} from './redux/store';
import {connect} from 'react-redux';

class App extends Component {
  handleAdd = () => {
    this.props.dispatch(incrementAction());
  }

  handleMinus = () => {
    this.props.dispatch(decrementAction());
  }

  handleReset = () => {
    this.props.dispatch(resetAction());
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Counter</h1>
          <p>Current Count: {this.props.state}</p>
          <Button onClick={this.handleAdd}>+</Button>
          <Button onClick={this.handleMinus}>-</Button>
          <Button onClick={this.handleReset}>Reset</Button>
        </Container>
      </div>
    );
  }
}

store.subscribe(() => console.log(store.getState()))

const mapStateToProps = (state) => ({
  state
})

const reduxedApp = connect(mapStateToProps)(App);

export default reduxedApp;

// 1. 
// Set store: reducer, action, define store x
// Dispatch a test action x

// 2. 
// Connect redux state with App component x
// Send App to GithubPages x
// Organise file structure x
// Show state on componenet and get button for calculations x

// 3.
// Add Bootstrap x
// Add SimpleRouting
// Read initial data from Firebase


