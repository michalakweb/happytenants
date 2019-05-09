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
import logo from '../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Redux
import {startAddItemAction, startSetListAction, setListAction } from '../redux/actions/actions';
import {store} from '../redux/store';
import {connect} from 'react-redux';


// 
// Types 
//

// React & Redux
interface Props {
  dispatch: Function;
  state: Array<object>;
}


interface State {
  error: string;
  hasList: boolean;
  listAddress: string | null;
  listAddressVisible: boolean;
  joinListVisible: boolean;
  user: string;
}


// Firebase
type firebaseUser = firebase.User | null;
type firebaseSnapshot = firebase.database.DataSnapshot | null;


// 
// Component
// 

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
    connectedRef.on("value", (snapshot: firebaseSnapshot) => {
      if (snapshot!.val() === true) {
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
    // If has, then information will be loaded from localStorage
    // If there is no info in localStorage, firebase will be called and
    // data will be saved in localStorage
    
    const listAddress: string | null = localStorage.getItem('listAddress');

    if(listAddress !== null && listAddress.length > 5) {
      this.setState(() => ({
        hasList: true,
        listAddress: listAddress,
      }))
    } else {
      let listAddress = '';
      const user: firebaseUser = firebase.auth().currentUser;
      return database.ref(`users/${user!.displayName}/list`)
      .once('value', (snap) => {
              listAddress = snap.val();
      })
      .then(() => {
        if(listAddress !== null && listAddress.length > 5) {
          console.log(typeof listAddress);
          this.setState(() => ({
            hasList: true,
            listAddress: listAddress,
            joinListVisible: false
          }))

          localStorage.setItem('listAddress', listAddress);

        }
      })
    }
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
  }

  handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let todoItem = (document.querySelector('#todoItem') as HTMLInputElement).value.trim();
    (document.querySelector('#todoItem') as HTMLInputElement).value = '';
    (document.querySelector('#todoItem') as HTMLInputElement).focus();

    // A set of checks to prevent duplicate or invalid submissions

    if(typeof todoItem !== "string" || todoItem === '' || todoItem.length > 120) {
      this.setState(() => ({
        error: 'Submission has more than 120 characters or is blank. Try again.'
      }));
    }

    else if(this.props.state.some((el: {description?: string}) => el.description === todoItem)) {
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
    
    database.ref(`lists`).push({'todoList': {
      1: {
        'description': 'First list entry'
      }
    }})
    .then((snap) => {
      const user: firebaseUser = firebase.auth().currentUser;
      database.ref(`users/${user!.displayName}`).update({'list': snap.key});
      this.setState(() => ({
        listAddress: snap.key
      }))
    }) 
    .then(() => {
      this.props.dispatch(startSetListAction())
      .then(() => {
        this.setState(() => ({
          hasList: true
        }))
      })
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

  handleJoinList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let list = (document.querySelector('#newList') as HTMLInputElement).value.trim();
    (document.querySelector('#newList') as HTMLInputElement).value = '';
    (document.querySelector('#newList') as HTMLInputElement).focus();

    // A set of checks to prevent invalid submissions

    if(typeof list !== "string" || list === '' || list.length > 120) {
      this.setState(() => ({
        error: 'Submission has more than 120 characters or is blank. Try again.'
      }));
    }

    // Joining a list

    else {
      firebase.database().ref("lists").once("value")
      .then((snap) => {
        if (snap.child(`${list}`).exists()) {
          const user: firebaseUser = firebase.auth().currentUser;
          return database.ref(`users/${user!.displayName}`).update({'list': list})
          .then(() => {
          this.props.dispatch(startSetListAction())
          .then(() => {
            this.setState(() => ({
              hasList: true,
              listAddress: list
            }))
          })
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
        <Container className='container container--main'>
          <Row className='row--nav'>
              <Col className='col--chores'>
                  <Row className='row--nav'>
                      <Col className='px-0 mx-1 col--logo'>
                          <img src={logo} alt='logo' className='logo--sm' />
                      </Col>
                      <Col className='px-0 align-self-center ml-3'>
                          <h1 className="display-4 header">Todo list</h1>
                      </Col>
                  </Row>
              </Col>
          </Row>

          <Row className='row--list'> 
                  {/* Disabling users from clicking on the buttons, depending on their Internet connection*/}

                  <Offline>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map((item: {
                    id?: number;
                    description?: string;
                  }) => <ReduxedBuyingListItem isOnline={false} key={item.id} item={item}/>)}
                  </Offline>
                  <Online>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map((item: {
                    id?: number;
                    description?: string;
                  }) => 
                    <ReduxedBuyingListItem key={item.id} item={item} isOnline={true}/>)}
                  </Online>    
          </Row>

          <Row className='row--zero'>
                    {
                    // When the user has a list, he can share it with others via list id
                    this.state.hasList && 
                    (
                        <Row className='row--zero'>
                          <Col className='col--todoForm'>
                            <Button variant="primary" className='violet radius'
                            onClick={this.handleShareList}>
                              <FontAwesomeIcon className='fontAwesomeIcon--white mr-2' icon="share" />
                              Share
                            </Button>
                          </Col>
                        
                        {this.state.listAddressVisible && (
                            <Col className='col--todoForm'>
                              <Alert className='mt-2' variant='warning'>{this.state.listAddress}</Alert>
                              <p className='px-2'>Copy this address and send it to your friend/family.</p>
                              <p className='px-2'>When they login, they can join your list!</p>
                            </Col>
                        ) }
                        </Row>
                      )
                      }
                      <Form onSubmit={this.handleAdd} className='formTodo'>
                            <Col xs={10} className='col--todoForm'>
                            {/* Preventing users from submitting, depending on their Internet connection AND
                                if they created a list */}
                              <Online>
                                <Form.Control id="todoItem" autoComplete='off' type="text" name='todoItem' 
                                className='noRadius'
                                placeholder="Type your option here." disabled={!this.state.hasList}/>
                              </Online>
                              <Offline>
                                <Form.Control autoComplete='off' type="text" name='todoItem' 
                                className='noRadius'
                                placeholder="You're offline. Can't add/delete options" disabled={true}/>
                              </Offline>
                            </Col>
                        
                            {/* Add button */}
                            <Col xs={2} className='col--todoForm'>
                              <Online>
                                <Button disabled={!this.state.hasList} className='noRadius violet'
                              block variant="primary" type="submit">
                                  <FontAwesomeIcon className='fontAwesomeIcon--white' icon="plus" />
                                </Button>
                              </Online>
                              <Offline>
                                <Button disabled block variant="primary" type="submit" className='noRadius violet'> 
                                  <FontAwesomeIcon className='fontAwesomeIcon--white' icon="plus" />
                                </Button>
                              </Offline>
                            </Col>
                      </Form>
                                  
                  {/* Error handling */}
                  {
                    this.state.error.length !== 0 && 
                    <Alert className='my-1' variant='warning'>
                      {this.state.error}
                    </Alert>
                  }

                  {
                    // for testing purposes
                    // <Button onClick={() => firebase.auth().signOut()}>Logout</Button> 
                  }

                  {
                    // When the user doesn't have a list, he has to create it first or share somebody's list
                    // They can't perform these actions without an internet connection
                    !this.state.hasList && 
                    (<div className='width100'>
                      <Online>
                        <Row className='row--zero'>
                          <Col xs={6} className='col--todoForm'>
                            <Button block variant="outline-success" onClick={this.handleCreateList}>Create List</Button>
                          </Col>
                          <Col xs={6} className='col--todoForm'>
                            <Button block variant="outline-info" onClick={this.handleJoinListVisible}>Join your friend's list</Button>
                          </Col>
                        </Row>
                        {this.state.joinListVisible && 
                            <Form onSubmit={this.handleJoinList}>
                                  <Col className='my-2'>
                                    <Form.Control id="newList" autoComplete='off' type="text" name='newList' 
                                    placeholder="Type list ID"/>
                                  </Col>
                                  <Col className='my-2'>
                                    <Button  block variant="primary" type="submit">
                                    Join</Button>
                                  </Col>
                            </Form>
                        }
                      </Online>
                      <Offline>
                        <Alert variant="warning">You need to connect to the Internet to join or add a 
                        new list.</Alert>
                      </Offline>
                    </div>)
                  }
          </Row>



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

