import {database} from '../../firebase/firebase';

export const addItemAction = (item) => ({
    type: 'ADD_ITEM',
    item
});

export const startAddItemAction = (itemData) => {
    return (dispatch) => {
        const {
            description = itemData,
          } = itemData;
          const item = { description };

        return database.ref(`todoList`).push(item)
        .then((ref) => {
            dispatch(addItemAction({id: ref.key, ...item}))
        });
    };
};
  

export const removeItemAction = (itemVal) => ({
    type: 'REMOVE_ITEM',
    itemVal
});
