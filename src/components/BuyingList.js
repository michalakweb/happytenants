import React, { Component } from 'react';
import ReduxedBuyingListItem from './BuyingListItem';
import BottomNav from './BottomNav';
import { Offline, Online } from "react-detect-offline";

//Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {firebase, database } from '../firebase/firebase';
import 'firebase/auth';

// Bootstrap & styles
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import '../style.scss';


//Redux
import {startAddItemAction, startSetListAction, setListAction} from '../redux/actions/actions';
import {store} from '../redux/store';
import {connect} from 'react-redux';

export class BuyingList extends Component {
  state = {
    error: '',
    user: null
  }

  componentDidMount = () => {
    // After the component mounts it 
    // checks if TODO list items have been set in LocalStorage previously.
    // If so, then it will get and show them and afterwards connects with firebase to 
    // update the redux store and show the latest state.
    const myListJSON = localStorage.getItem('listItems');
    if(!!myListJSON) {
      const listItems = JSON.parse(myListJSON);
      this.props.dispatch(setListAction(listItems));
    }

    const connectedRef = database.ref(".info/connected");
    connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        this.props.dispatch(startSetListAction())
        .then(() => {
          this.setState(() => ({
            error: ''
          }));
        })
        
      } else {
        this.setState(() => ({
          error: `Updating the list...`
        }));
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(() => ({
          user: 'logged'
        }))
      } else {
        this.setState(() => ({
          user: 'not logged'
        }))
      }
    });
  }

  componentDidUpdate = () => {
    // Error messages disappear after three seconds, except the updating the list error
    if(this.state.error.length !== 0 && this.state.error !== 'Updating the list...') {
      setTimeout(() => {
        this.setState(() => ({
          error: ''
        }))
      }, 3000)
    };

  }

  handleAdd = (e) => {
    e.preventDefault();
    let todoItem = e.target.elements.todoItem.value.trim();
    e.target.elements.todoItem.value = '';
    e.target.elements.todoItem.focus();

    // A set of checks to prevent duplicate or invalid submissions

    if(typeof todoItem !== "string" || todoItem === '' || todoItem.length > 120) {
      this.setState(() => ({
        error: 'Submission has more than 120 characters or is blank. Try again.'
      }));
    }

    else if(this.props.state.some(el => el.description === todoItem)) {
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
  };

  handleLogout = () => {
    firebase.auth().signOut().then(() => {
    }).catch(function(error) {
      console.log(error);
    });
    
  }
  
  handleInfo = () => {
    var user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log(database.ref(`users/${profile.displayName}`))

        database.ref(`users/${profile.displayName}`).set(profile.email)
        
      });

    }
  }

  render() {
    return (
      <div>
        <Container className='container container--main text-center'>
          <Row>
              <Col className='px-0 mb-4'>
                  <h1 className="display-4 py-4 header">Todo list:</h1>
              </Col>
          </Row>

          <Container className='container--list'> 
                  {/* Disabling users from clicking on the buttons, depending on their Internet connection AND
                      if they're logged in */}

                  <Offline>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map(item => <ReduxedBuyingListItem key={item.id} item={item} isOnline={false}/>)}
                  </Offline>
                  <Online>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map(item => 
                    <ReduxedBuyingListItem key={item.id} item={item} isOnline={true} logged={this.state.user}/>)}
                  </Online>
                
                <div className='formTodo'>
                    <Form onSubmit={this.handleAdd}>
                      <Row>
                        <Col className='my-2'>
                        {/* Preventing users from submitting, depending on their Internet connection AND
                            if they're logged in */}
                          <Online>
                            <Form.Control autoComplete='off' type="text" name='todoItem' 
                            placeholder="Type your option here." disabled={false}/>
                          </Online>
                          <Offline>
                            <Form.Control autoComplete='off' type="text" name='todoItem' 
                            placeholder="You're offline. Can't add/delete options" disabled={true}/>
                          </Offline>
                        </Col>
                      </Row> 
                      <Row>
                        <Col className='my-2'>
                          <Online><Button disabled={this.state.user === 'logged' ? false : true} block variant="primary" type="submit">
                          Add task</Button>
                          </Online>
                          <Offline><Button disabled block variant="primary" type="submit">
                          Add task</Button>
                          </Offline>
                        </Col>
                      </Row>
                     </Form>
                </div>
                                
                {/* Error handling */}
                {
                  this.state.error.length !== 0 && 
                  <Alert className='mt-3 mb-2' variant='warning'>
                    {this.state.error}
                  </Alert>
                }
                {
                  this.state.user === 'not logged' && 
                  (<div>
                    <Alert className='mt-3 mb-2' variant='danger'>
                      Register to add and delete list items.
                    </Alert>
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/> 
                  </div>)        
                }
                <Button onClick={this.handleLogout}>Logout</Button> 

          </Container>

          <BottomNav/>
          
      </Container>
      </div>
    );
  }
}

// store.subscribe(() => console.log(store.getState()))
store.subscribe(() => store.getState())

const mapStateToProps = (state) => ({
  state
})

const reduxedBuyingList = connect(mapStateToProps)(BuyingList);

export default reduxedBuyingList;

