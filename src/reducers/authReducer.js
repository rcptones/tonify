import {SET_CURRENT_USER} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  token: null,
};

export default function(state = initialState, action) {
  console.log("action", action);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload != null ? true : false,
        token: action.payload,
      };
    default:
      return state;
  }
}
