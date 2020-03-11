import {GENERATE_TOKEN} from './types';
import {NativeModules, Platform, } from 'react-native';
import { TOKEN_REGISTRATION_URL } from '../constants/api.constants';

export const generateToken = () => async dispatch => {
  /***************
   * I have defined a common native function [generateToken] to generate token in iOS and Android
   ***************/
  const {NotificationActivity} = NativeModules;
  try {
    if (Platform.OS === 'ios') {
      const token = await NotificationActivity.generateToken();
      dispatch({
        type: GENERATE_TOKEN,
        payload: token
      });
    } else {
      NotificationActivity.generateToken(token => {
        dispatch({
          type: GENERATE_TOKEN,
          payload: token
        });
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      paylaod: error,
    });
  }
}
