import React from 'react';
import {connect} from 'react-redux';
import {startRemoveItemAction} from '../redux/actions/actions';

const BuyingListItem = (props) => (
    <div>
        <p>{props.item.description}</p>
        <button onClick={() => {
            props.dispatch(startRemoveItemAction({id : props.item.id}));
        }}>delete option</button>
    </div>
);

const mapStateToProps = (state) => ({
    state
});

const ReduxedBuyingListItem = connect(mapStateToProps)(BuyingListItem);
  

export default ReduxedBuyingListItem;