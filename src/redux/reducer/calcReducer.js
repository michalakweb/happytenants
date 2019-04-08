const buyingListState = ['jeden', 'dwa'];

const buyingListReducer = (state = buyingListState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + action.incrementBy;
        case "DECREMENT":
            return state - action.decrementBy;
        case "RESET":
            return 0;
        default:
            return state;
    }
}

export default buyingListReducer;