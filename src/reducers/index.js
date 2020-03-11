import {combineReducers} from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import firebaseReducer from './firebaseReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  firebaseReducer,
});
