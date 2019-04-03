
const calcReducer = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + action.incrementBy;
        default:
            return state;
    }
}

export default calcReducer;