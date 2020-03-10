import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from "redux-logger"

import rootReducer from './reducers/index';


const middleware = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
