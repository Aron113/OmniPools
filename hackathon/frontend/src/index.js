import React from 'react';
import App from './components/App';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import proposalReducer from './features/ProposalReducer'
import factoryReducer from './features/ContractReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import "regenerator-runtime/runtime.js";
import componentReducer from './features/componentReducer'


const store = configureStore({
    reducer: {
        proposals: proposalReducer, 
        factory: factoryReducer, 
        component: componentReducer, 
    }, 
     middleware: (x) => x().concat(logger)
    
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('app')
)

console.log('Pass')