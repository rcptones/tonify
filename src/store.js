import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Root-Reducers
import rootReducer from './reducers/index';

// Initial State
const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;