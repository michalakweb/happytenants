import React from 'react';
import {connect} from 'react-redux';
import {startRemoveItemAction} from '../redux/actions/actions';
import {Button, Row, Col} from 'react-bootstrap';

export const BuyingListItem = (props) => (
    <div>
        <Row className='py-3 pl-2'>
            <Col xs={8} lg={10}><p className='lead optionText'>{props.item.description}</p></Col>

            <Col xs={4} lg={2} className='text-right'>
                <Button 
                disabled={props.isOnline === false || props.logged !== 'logged'}
                variant="outline-primary" className='button--deleteOption' onClick={() => {
                    props.dispatch(startRemoveItemAction({id : props.item.id}));
                }}>Delete</Button>
            </Col>
        </Row>
    </div>
);

/* Connecting the individual list item with the redux store, to be able to dispatch the 'delete_item' action  */
const mapStateToProps = (state) => ({
    state
});

const ReduxedBuyingListItem = connect(mapStateToProps)(BuyingListItem);
  

export default ReduxedBuyingListItem;