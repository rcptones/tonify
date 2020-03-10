import {SET_CURRENT_USER, CLEAR_ERRORS, GET_ERRORS} from './types';
import {BASE_URL} from '../constants/api.constants';

export const loginUser = (email, password) => async dispatch => {
  console.log("loginUser called");
  dispatch({type: CLEAR_ERRORS});
  const loginurl = `${BASE_URL}/login?email=${email}&password=${password}`;
  console.log(loginurl);

  const result = await fetch(loginurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const {status} = result;
  if (status == '200') {
    const data = await result.json();
    const {access_token} = data;
    // return {status: true, token: access_token};
    dispatch({
      type: SET_CURRENT_USER,
      payload: access_token,
    });
  } else {
    dispatch({
      type: GET_ERRORS,
      paylaod: 'Invalid Credentials',
    });
  };
}