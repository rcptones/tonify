import {AsyncStorage} from 'react-native';
import {AUTH_TOKEN} from '../constants/asyncstorage.constants';
import {BASE_URL, LOGIN_URL} from '../constants/api.constants';

export const login = async (
  email = 'ankitbaid11326@gmail.com',
  password = 'abcd1234',
) => {
  try {
    let result = await fetch(
      `${LOGIN_URL}?email=${email}&password=${password}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (result && result.status == 200) {
      result = await result.json();
      console.log('result', result);
      const {access_token} = result;
      await AsyncStorage.setItem(AUTH_TOKEN, access_token);
    }

    return {status: true};
  } catch (error) {
    return {status: false};
  }
};
