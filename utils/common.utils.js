import React, {Component} from 'react'
import {NativeModules, Platform} from 'react-native'

export const registerTokenToServer = async (token, platform) => {
  try {
    let result = await fetch(
      `https://zapier001.herokuapp.com/api/registertoken`,
      {
        method: 'POST',
        body: JSON.stringify({
          token,
          platform: 'G',
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.state.token,
        },
      },
    )
    result = await result.json()

    return {
      status: 'success',
      result,
    }
  } catch (error) {
    return {
      status: 'error',
      error,
    }
  }
}

export const fetchToken = async () => {
  const {NotificationActivity} = NativeModules
  const token = null;

  if (Platform.OS === 'android') {
    token = await NotificationActivity.generateToken();
  } else  { // Fetching token for iOS
    console.log("NotificationActivity", NotificationActivity);
    const res = await NotificationActivity.generateToken();
    console.log("res", res);
    // NotificationActivity.generateToken(result => {
    //   console.log('result', result);
    // });
  }
  return token;
}
