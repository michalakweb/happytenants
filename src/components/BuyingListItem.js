import React from 'react';

const BuyingListItem = (props) => (
    <div>
        <p>{props.item}</p>
        {console.log(props)}
    </div>
);

export default BuyingListItem;