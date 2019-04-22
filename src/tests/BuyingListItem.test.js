import React from 'react';
import ReactDOM from 'react-dom';
import { BuyingListItem } from '../components/BuyingListItem';

const mockProps = {
    item: {
        description: "test"
    },
    isOnline: true
};

it('Buying List item component renders properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BuyingListItem item={mockProps.item} isOnline={mockProps.isOnline}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});