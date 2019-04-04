import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Firebase
import firebase from 'firebase/app';
import 'firebase/database';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Button} from 'react-bootstrap';
import './App.scss';

//Redux
import {incrementAction, decrementAction, resetAction} from './redux/actions/actions';
import {store} from './redux/store';
import {connect} from 'react-redux';

const config = {
  apiKey: "AIzaSyCLwlab9A5oJJeA9SIy5jY6f857HOpkTS8",
  authDomain: "boilerplate-de6e2.firebaseapp.com",
  databaseURL: "https://boilerplate-de6e2.firebaseio.com",
  projectId: "boilerplate-de6e2",
  storageBucket: "boilerplate-de6e2.appspot.com",
  messagingSenderId: "457161987783"
};

firebase.initializeApp(config);

const database = firebase.database();

class App extends Component {
  state = {
    name: 'Fetching from firebase...'
  }

  componentDidMount = () => {
    database.ref().on('value', (snapshot) => {
      const val = snapshot.val();
      this.setState(() => ({
        name: val.dane
      }))
    })
  }

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

          <p>Info from Firebase: {this.state.name}</p>

          <Link to='/'>Go to dashboard</Link>
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


