import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReduxedBuyingListItem from './BuyingListItem';

//Firebase
import {database} from '../firebase/firebase';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'react-bootstrap';

//Redux
import {addItemAction} from '../redux/actions/actions';
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

  handleAdd = (e) => {
    e.preventDefault();
    let todoItem = e.target.elements.todoItem.value;
    this.props.dispatch(addItemAction(todoItem));
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Buying List</h1>
          {
            !this.props.state.length ? <p>Nic nie ma na liście</p> :
            this.props.state.map((item, index) => <ReduxedBuyingListItem key={index} item={item}/>)
          }

          <form onSubmit={this.handleAdd}>
            <input type="text" name='todoItem' placeholder="Type your option here"></input>
            <button type='submit'>Add something</button>
          </form>

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

