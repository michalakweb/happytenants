export const incrementAction = (incrementBy = 1) => ({
    type: 'INCREMENT',
    incrementBy
});

export const decrementAction = (decrementBy = 1) => ({
    type: 'DECREMENT',
    decrementBy
});

export const resetAction = () => ({
    type: 'RESET'
});
