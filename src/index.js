import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import App from './container/App';
import {Rogonition,conversation} from "./reducers";
import registerServiceWorker from './registerServiceWorker';



let rootReducer = combineReducers({Rogonition,conversation});

const store = createStore(rootReducer,applyMiddleware(thunkMiddleware,logger));

ReactDOM.render(
  <Provider store={store}>
        <App />
   </Provider>
    , document.getElementById('root'));
registerServiceWorker();
