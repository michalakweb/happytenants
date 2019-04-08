import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Firebase
import {database} from '../firebase/firebase';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Button} from 'react-bootstrap';

//Redux
import {incrementAction, decrementAction, resetAction} from '../redux/actions/actions';
import {store} from '../redux/store';
import {connect} from 'react-redux';



class App extends Component {
  state = {
    name: 'Fetching from firebase...'
  }

  componentDidMount = () => {
    database.ref().on('value', (snapshot) => {
      const val = snapshot.val();
      this.setState(() => ({
        name: val.name
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

const reduxedBuyingList = connect(mapStateToProps)(App);

export default reduxedBuyingList;

