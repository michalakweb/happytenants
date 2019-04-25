const authState = '';

const authReducer = (state = authState, action) => {
    switch (action.type) {
        case "LOGGED":
            return 'logged';
        case "NOT_LOGGED":
            return 'not logged';
        default:
            return state;
    }
}

export default authReducer;