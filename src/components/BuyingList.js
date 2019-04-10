import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReduxedBuyingListItem from './BuyingListItem';
import { Offline, Online } from "react-detect-offline";

//Firebase
import {database} from '../firebase/firebase';

// Bootstrap & styles
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../style.scss';

//Redux
import {startAddItemAction, startSetListAction, setListAction} from '../redux/actions/actions';
import {store} from '../redux/store';
import {connect} from 'react-redux';


class BuyingList extends Component {
  state = {
    error: ''
  }

  componentDidMount = () => {
    // After the component mounts it checks if it's the first time the app runs, by
    // checking if TODO list items have been set in LocalStorage previously.
    // If so it will get them and afterwards connects with firebase to update the redux store and
    // show the latest state.

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
  }

  componentDidUpdate = () => {
    // Error messages disappear after three seconds
    if(this.state.error.length !== 0) {
      setTimeout(() => {
        this.setState(() => ({
          error: ''
        }))
      }, 3000)
    }
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
                <div className='test'>
                
                  <Offline>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map(item => <ReduxedBuyingListItem key={item.id} item={item} isOnline={false}/>)}
                  </Offline>
                  <Online>
                  {!this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map(item => <ReduxedBuyingListItem key={item.id} item={item} isOnline={true}/>)}
                  </Online>

                </div>
                

                <div className='formTodo'>
                    <Form onSubmit={this.handleAdd}>
                      <Row>
                        <Col className='my-2'>
                          <Online>
                            <Form.Control autoComplete='off' type="text" name='todoItem' 
                            placeholder="Type your option here." disabled='false'/>
                          </Online>
                          <Offline>
                            <Form.Control autoComplete='off' type="text" name='todoItem' 
                            placeholder="You're offline. Can't add/delete options" disabled='true'/>
                          </Offline>
                        </Col>
                      </Row> 
                      <Row>
                        <Col className='my-2'>
                          <Online><Button block variant="primary" type="submit">
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
                {this.state.error.length !== 0 && <p className='mt-3 mb-2'>{this.state.error}</p>}


          </Container>
        
          <Row className='endRow text-center pt-2'>
              <Col>
                  <Link to='/buyingList'>
                      <p className='mb-1'>
                          <i className="fas fa-clipboard-list fa-2x"></i>
                      </p>
                      <p className='mb-1 p--nav'>Todo</p>
                  </Link>
              </Col>
              <Col xs={1}>
                  <div className="vl"></div>
              </Col>    
              <Col>
                  <Link to='/'>
                      <p className='mb-1'>
                          <i className="fas fa-broom fa-2x"></i>
                      </p>
                      <p className='mb-1 p--nav'>Chores</p>
                  </Link>
              </Col>
          </Row>
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

