import {NativeModules, Platform} from 'react-native'

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
