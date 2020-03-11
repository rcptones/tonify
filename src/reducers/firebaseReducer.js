import {GENERATE_TOKEN, CLEAR_ERRORS} from '../actions/types';

const initialState = {
  token: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GENERATE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}