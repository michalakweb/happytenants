//Set redux store
//a) state + reducers + store (subscribe to it)
import { createStore } from 'redux';

let calcState = {
    result: 0
};

const calcReducer = (state = calcState, action) => {
    switch (action.type) {
        case "ADD": 
            return {
                result: state.result + 1
            };
        default:
            return calcState;
    }
}

const store = createStore(calcReducer);

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});



//b) actions

const calcAdd = () => ({
    type: 'ADD',
})


//c) few calls to action (for testing)

// store.dispatch(calcAdd());


//Set App Components and connect them

import React from 'react';
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux';

const Calculator = (props) => (
        <div>
            <h1>Calculator</h1>
            <p>Result: {props.result}</p>
            <button onClick={() => {
                props.dispatch(calcAdd())
            }}>Add one</button>
        </div>
);

const mapStateToProps = state => {
    return { result: state.result };
  };

const ConCalc = connect(mapStateToProps)(Calculator);

const jsx = (
    <Provider store={store}>
        <ConCalc />
    </Provider>
);

//Set App Routes

//Render

ReactDOM.render(jsx, document.querySelector('#app'));
