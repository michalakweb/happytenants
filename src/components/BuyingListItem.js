import React from 'react';
import {connect} from 'react-redux';
import {removeItemAction} from '../redux/actions/actions';

const BuyingListItem = (props) => (
    <div>
        <p>{props.item}</p>
        <button onClick={() => {
            props.dispatch(removeItemAction(props.item));
        }}>delete option</button>
    </div>
);

const mapStateToProps = (state) => ({
    state
});

const ReduxedBuyingListItem = connect(mapStateToProps)(BuyingListItem);
  

export default ReduxedBuyingListItem;