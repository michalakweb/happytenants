import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BuyingListItem from './BuyingListItem';

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

  handleAdd = () => {
    this.props.dispatch(addItemAction('trzy'))
  }

  render() {
    return (
      <div>
        <Container>
          <h1>Buying List</h1>
          {
            !this.props.state.length ? <p>Nic nie ma na liście</p> :
            this.props.state.map((item, index) => <BuyingListItem key={index} item={item}/>)
          }
          <button onClick={this.handleAdd}>Click to add</button>

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

