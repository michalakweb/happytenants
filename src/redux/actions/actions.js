import {database, firebase} from '../../firebase/firebase';
import { store } from '../store';
import 'firebase/auth';

export const isLoggedAction = () => ({
    type: "LOGGED"
});

export const notLoggedAction = () => ({
    type: "NOT_LOGGED"
});

// Adding/removing makes a request to firebase first.
// Once the request is succesful it dispatches actions to the local Redux store.
// Next localStorage is updated.

export const addItemAction = (item) => ({
    type: 'ADD_ITEM',
    item
});

export const startAddItemAction = (itemData) => {
    return (dispatch) => {
        const item = { description: itemData };
        let listAddress = '';
        const user = firebase.auth().currentUser;
        database.ref(`users/${user.displayName}/list`)
        .once('value', (snap) => {
            listAddress = snap.val();
        })
        .then(() => {
            return database.ref(`lists/${listAddress}/todoList`).push(item)
            .then((ref) => {
            dispatch(addItemAction({
                id: ref.key, 
                ...item
            }));

            const myJSON = JSON.stringify(store.getState());
            localStorage.setItem('listItems', myJSON);
        });
        })
        
    };
};
  

const removeItemAction = ({id}) => ({
    type: 'REMOVE_ITEM',
    id
});

export const startRemoveItemAction = ({id}) => {
    return (dispatch) => {
        let listAddress = '';
        const user = firebase.auth().currentUser;
        database.ref(`users/${user.displayName}/list`)
        .once('value', (snap) => {
            listAddress = snap.val();
        })
        .then(() => {
            return database.ref(`lists/${listAddress}/todoList/${id}`).remove()
            .then(() => {
                dispatch(removeItemAction({id}));
                const myJSON = JSON.stringify(store.getState());
                localStorage.setItem('listItems', myJSON);
            });
        })
        
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
        var listAddress = '';
        const user = firebase.auth().currentUser;
        return database.ref(`users/${user.displayName}/list`)
        .once('value', (snap) => {
            listAddress = snap.val();
        })
        .then(() => {
            return database.ref(`lists/${listAddress}/todoList`).once('value').then(snapshot => {
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
        })
    };
};