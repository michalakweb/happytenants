
const calcReducer = (state = 0, action) => {
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

export default calcReducer;