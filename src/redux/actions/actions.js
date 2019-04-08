import {database} from '../../firebase/firebase';

export const addItemAction = (itemVal) => ({
    type: 'ADD_ITEM',
    itemVal
});

export const startAddItemAction = (itemVal = []) => {
    return (dispatch) => {
        return database.ref(`todoList`).push(itemVal)
        .then(() => {
            dispatch(addItemAction(itemVal))
        });
    };
};
  
//   export const startAddExpense = (expenseData = {}) => {
//     return (dispatch, getState) => {
//       const uid = getState().auth.uid;
//       const {
//         description = '',
//         note = '',
//         amount = 0,
//         createdAt = 0
//       } = expenseData;
//       const expense = { description, note, amount, createdAt };
  
//       return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
//         dispatch(addExpense({
//           id: ref.key,
//           ...expense
//         }));
//       });
//     };
//   };

export const removeItemAction = (itemVal) => ({
    type: 'REMOVE_ITEM',
    itemVal
});
