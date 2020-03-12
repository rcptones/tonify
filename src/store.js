import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';

import rootReducer from './reducers/index';

// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'firebaseReducer'],
};

const middleware = [thunk, logger];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {
  store,
  persistor,
}
