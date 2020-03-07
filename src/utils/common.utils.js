import {NativeModules, Platform, AsyncStorage} from 'react-native'
import {AUTH_TOKEN} from '../constants/asyncstorage.constants'

export const registerTokenToServer = async token => {
  try {
    const auth_token = await AsyncStorage.getItem(AUTH_TOKEN);
    let result = await fetch(
      `https://zapier001.herokuapp.com/api/registertoken`,
      {
        method: 'POST',
        body: JSON.stringify({
          token,
          platform: Platform.OS === 'ios' ? 'ios' : 'android',
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth_token,
        },
      },
    );
    result = await result.json();
    return {status: true, result};
  } catch (error) {
    return {status: false, error};
  }
}

export const fetchToken = async () => {
  /***************
   * I have defined a common native function [generateToken] to generate token in iOS and Android
   ***************/
  const {NotificationActivity} = NativeModules;
  try {
    if (Platform.OS === 'ios') {
      const token = await NotificationActivity.generateToken();
      return {status: true, token};
    } else {
      NotificationActivity.generateToken(token => {
        return {status: true, token};
      });
    }
  } catch (error) {
    return {status: false, error};
  }
}
