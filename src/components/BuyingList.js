import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReduxedBuyingListItem from './BuyingListItem';

//Firebase
import {database} from '../firebase/firebase';

// Bootstrap & styles
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../style.scss';

//Redux
import {startAddItemAction, startSetListAction} from '../redux/actions/actions';
import {store} from '../redux/store';
import {connect} from 'react-redux';


class BuyingList extends Component {
  state = {
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
                {
                  !this.props.state.length ? <p className='lead py-4 mb-0'>Currently nothing on the list</p> :
                  this.props.state.map(item => <ReduxedBuyingListItem key={item.id} item={item}/>)
                }
                </div>

                <div className='formTodo'>
                    <Form onSubmit={this.handleAdd}>
                      <Row>
                        <Col className='my-2'>
                          <Form.Control autoComplete='off' type="text" name='todoItem' placeholder="Type your option here" />
                        </Col>
                      </Row> 
                      <Row>
                        <Col className='my-2'>
                          <Button block variant="primary" type="submit">
                            Add task
                          </Button>
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

