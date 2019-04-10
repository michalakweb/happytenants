import {database} from '../../firebase/firebase';

export const addItemAction = (item) => ({
    type: 'ADD_ITEM',
    item
});

export const startAddItemAction = (itemData) => {
    return (dispatch) => {
        const item = { description: itemData };

        return database.ref(`todoList`).push(item)
        .then((ref) => {
            dispatch(addItemAction({
                id: ref.key, 
                ...item
            }));
        });
    };
};
  

const removeItemAction = ({id}) => ({
    type: 'REMOVE_ITEM',
    id
});

export const startRemoveItemAction = ({id}) => {
    return (dispatch) => {
        
        return database.ref(`todoList/${id}`).remove()
        .then(() => {
            dispatch(removeItemAction({id}))
        });
    };
};

export const setListAction = (list) => ({
    type: 'SET_LIST',
    list
});

// the async function below grabs the todoList items from the database
// once it finishes it populates an array with objects/list items
// when it's done the "setListAction" is dispatched to update the store
// localStore also gets updated 

export const startSetListAction = () => {
    return (dispatch) => {
        return database.ref(`todoList`).once('value').then(snapshot => {
            const listItems = [];

            snapshot.forEach(childSnapshot => {
                listItems.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setListAction(listItems));
            const myJSON = JSON.stringify(listItems);
            localStorage.setItem('listItems', myJSON);
        });
    };
};
