import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReduxedBuyingListItem from './BuyingListItem';

//Firebase
import {database} from '../firebase/firebase';

//CSS
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'react-bootstrap';

//Redux
import {startAddItemAction, startSetListAction} from '../redux/actions/actions';
import {store} from '../redux/store';
import {connect} from 'react-redux';


class BuyingList extends Component {
  state = {
    name: 'Fetching from firebase...',
    error: ''
  }

  componentDidMount = () => {
    const connectedRef = database.ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.props.dispatch(startSetListAction());
      } else {
        console.log('not connected')
      }
    });
  }

  componentDidUpdate = () => {
    if(this.state.error.length !== 0) {
      setTimeout(() => {
        this.setState(() => ({
          error: ''
        }))
      }, 2000)
    }
  }

  handleAdd = (e) => {
    e.preventDefault();
    let todoItem = e.target.elements.todoItem.value.trim();
    e.target.elements.todoItem.value = '';
    e.target.elements.todoItem.focus();

    if(typeof todoItem !== "string" || todoItem === '' || todoItem.length > 120) {
      this.setState(() => ({
        error: 'Invalid type of submission. Try again.'
      }));
    }

    else if(this.props.state.includes(todoItem)) {
      this.setState(() => ({
        error: 'This option already exists. Try again.'
      }));
    }

    else {
      this.setState(() => ({
        error: ''
      }));

      this.props.dispatch(startAddItemAction(todoItem));
    }
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Buying List</h1>
          {
            !this.props.state.length ? <p>Nic nie ma na liście</p> :
            this.props.state.map(item => <ReduxedBuyingListItem key={item.id} item={item}/>)
          }

          <form onSubmit={this.handleAdd}>
            <input type="text" name='todoItem' placeholder="Type your option here"></input>
            <button type='submit'>Add something</button>
          </form>
          {/* Error handling */}
          {this.state.error.length !== 0 && <p className='mt-3 mb-2'>{this.state.error}</p>}

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

const reduxedBuyingList = connect(mapStateToProps)(BuyingList);

export default reduxedBuyingList;

