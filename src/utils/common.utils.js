import {NativeModules, Platform} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_TOKEN} from '../constants/asyncstorage.constants';
import { BASE_URL } from '../constants/api.constants';

// export const loginUser = async (email, password) => {
//   const loginurl = `${BASE_URL}/login?email=${email}&password=${password}`;
//   console.log(loginurl);

//   const result = await fetch(loginurl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const {status} = result;
//   if (status == '200') {
//     const data = await result.json();
//     const {access_token} = data;
//     return {status: true, token: access_token};
//   }

//   if (status == 404) {
//     return {status: false, message: 'Credentials not working'}
//   }

//   return {
//     status: false,
//     message: 'Something is not right, Please try after sometime'
//   }
// }

// export const registerTokenToServer = async token => {
//   try {
//     const auth_token = await AsyncStorage.getItem(AUTH_TOKEN);
//     let result = await fetch(
//       `https://zapier001.herokuapp.com/api/registertoken`,
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           token,
//           platform: Platform.OS === 'ios' ? 'ios' : 'android',
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: auth_token,
//         },
//       },
//     );
//     result = await result.json();
//     return {status: true, result};
//   } catch (error) {
//     return {status: false, error};
//   }
// }

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
