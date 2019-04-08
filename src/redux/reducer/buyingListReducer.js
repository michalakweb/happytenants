const buyingListState = [];

const buyingListReducer = (state = buyingListState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, action.item]
        case "REMOVE_ITEM":
            return state.filter(el => el.id !== action.id)
        default:
            return state;
    }
}

export default buyingListReducer;