import * as React from 'react';
import ReduxedBuyingListItem from './BuyingListItem';
import BottomNav from './BottomNav';
import { Offline, Online } from "react-detect-offline";

//Firebase
import {firebase, database } from '../firebase/firebase';
import 'firebase/auth';

// Bootstrap & styles
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import '../style.scss';


//Redux
import {startAddItemAction, startSetListAction, setListAction } from '../redux/actions/actions';
import {store} from '../redux/store';
import {connect} from 'react-redux';


interface Props {
  dispatch: any;
  state: Array<object>;
}

interface State {
  error: string;
  hasList: boolean;
  listAddress: string;
  listAddressVisible: boolean;
  joinListVisible: boolean;
  user: string;
}

type ReduxTodoItem = any;

type Item = {
  id: string;
}

export class BuyingList extends React.Component<Props, State> {
  state: State = {
    error: '',
    hasList: false,
    listAddress: '',
    listAddressVisible: false,
    joinListVisible: false,
    user: ''
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
    connectedRef.on("value", (snap: any) => {
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

    // Checking if the user has created a list already
    let listAddress = '';
    const user: any = firebase.auth().currentUser;
    return database.ref(`users/${user.displayName}/list`)
    .once('value', (snap) => {
            listAddress = snap.val();
    })
    .then(() => {
      if(listAddress !== null) {
        this.setState(() => ({
          hasList: true,
          listAddress: listAddress,
          joinListVisible: false
        }))
      }
    })
  }

  componentDidUpdate = () => {
    // Error messages disappear after two seconds, except the updating the list error
    if(this.state.error.length !== 0 && this.state.error !== 'Updating the list...') {
      setTimeout(() => {
        this.setState(() => ({
          error: ''
        }))
      }, 2000)
    };

    // Checking if the user has created a list already
    let listAddress = '';
    const user: any = firebase.auth().currentUser;
    return database.ref(`users/${user.displayName}/list`)
    .once('value', (snap) => {
            listAddress = snap.val();
    })
    .then(() => {
      if(listAddress !== null) {
        this.setState(() => ({
          hasList: true,
          listAddress: listAddress,
          joinListVisible: false
        }))
      }
    })

  }

  handleAdd = (e: any) => {
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

    else if(this.props.state.some((el: ReduxTodoItem) => el.description === todoItem)) {
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

  handleCreateList = () => {
    const user: any = firebase.auth().currentUser;
    database.ref(`lists`).push({'todoList': {
      1: {
        'description': 'First list entry'
      }
    }})
    .then((snap) => {
      database.ref(`users/${user.displayName}`).update({'list': snap.key});
    }) 
    .then(() => {
      this.props.dispatch(startSetListAction())
    })
  }

  handleShareList = () => {
    this.setState((prevState) => ({
      listAddressVisible: !prevState.listAddressVisible
    }))
  }

  handleJoinListVisible = () => {
    this.setState((prevState) => ({
      joinListVisible: !prevState.joinListVisible
    }))
  }

  handleJoinList = (e: any) => {
    e.preventDefault();
    let list = e.target.elements.newList.value.trim();
    e.target.elements.newList.value = '';

    // A set of checks to prevent invalid submissions

    if(typeof list !== "string" || list === '' || list.length > 120) {
      this.setState(() => ({
        error: 'Submission has more than 120 characters or is blank. Try again.'
      }));
    }

    else {
      firebase.database().ref("lists").once("value")
      .then((snap) => {
        if (snap.child(`${list}`).exists()) {
          const user: any = firebase.auth().currentUser;
          return database.ref(`users/${user.displayName}`).update({'list': list})
          .then(() => {
          this.props.dispatch(startSetListAction())
          })
        }

        else {
          this.setState(() => ({
            error: `This list doesn't exist.`
          }))
        }
      })

    }
};

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
                  {/* Disabling users from clicking on the buttons, depending on their Internet connection*/}

                  <Offline>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map((item: any) => <ReduxedBuyingListItem isOnline={false} key={item.id} item={item}/>)}
                  </Offline>
                  <Online>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map((item: any) => 
                    <ReduxedBuyingListItem key={item.id} item={item} isOnline={true}/>)}
                  </Online>
                
                <div className='formTodo'>
                    <Form onSubmit={this.handleAdd}>
                      <Row>
                        <Col className='my-2'>
                        {/* Preventing users from submitting, depending on their Internet connection AND
                            if they created a list */}
                          <Online>
                            <Form.Control id="todoItem" autoComplete='off' type="text" name='todoItem' 
                            placeholder="Type your option here." disabled={!this.state.hasList}/>
                          </Online>
                          <Offline>
                            <Form.Control autoComplete='off' type="text" name='todoItem' 
                            placeholder="You're offline. Can't add/delete options" disabled={true}/>
                          </Offline>
                        </Col>
                      </Row> 
                      <Row>
                        <Col className='my-2'>
                          <Online><Button disabled={!this.state.hasList} block variant="primary" type="submit">
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
                  // for testing purposes
                  // <Button onClick={() => firebase.auth().signOut()}>Logout</Button> 
                }

                {
                  // When the user doesn't have a list, he has to create it first or share somebody's list
                  !this.state.hasList && 
                  (<div>
                    <Row>
                      <Col>
                        <Button block variant="outline-success" onClick={this.handleCreateList}>Create List</Button>
                      </Col>
                      <Col xs={1} className='align-self-center'>OR</Col>
                      <Col>
                        <Button block variant="outline-info" onClick={this.handleJoinListVisible}>Join your friend's list</Button>
                      </Col>
                    </Row>
                    {this.state.joinListVisible && 
                        <Form onSubmit={this.handleJoinList}>
                            <Online>
                              <Col className='my-2'>
                                <Form.Control autoComplete='off' type="text" name='newList' 
                                placeholder="Type list ID"/>
                              </Col>
                              <Col className='my-2'>
                                <Button  block variant="primary" type="submit">
                                Join</Button>
                              </Col>
                            </Online>
                            <Offline>
                              <p>You need Internet to join a list</p>
                            </Offline>
                        </Form>
                    }
                  </div>)
                }
                {
                  // When the user has a list, he can share it with others via list id
                  this.state.hasList && 
                  (
                    <div>
                      <Row>
                        <Col>
                          <Button block variant="outline-success" onClick={this.handleShareList}>Share your list</Button>
                        </Col>
                      </Row>
                      {this.state.listAddressVisible && (
                        <Row>
                          <Col>
                            <Alert className='mt-2' variant='warning'>{this.state.listAddress}</Alert>
                            <p>Copy this address and send it to your friend/family.</p>
                            <p>When they login, they can join your list!</p>
                          </Col>
                        </Row>
                      ) }
                    </div>
                  )
                }

                
          </Container>

          <BottomNav/>
          
      </Container>
      </div>
    );
  }
}

// store.subscribe(() => console.log(store.getState()))
store.subscribe(() => store.getState())

const mapStateToProps = (state: {todoList: Array<object>}) => ({
  state: state.todoList
})

const reduxedBuyingList = connect(mapStateToProps)(BuyingList);

export default reduxedBuyingList;
