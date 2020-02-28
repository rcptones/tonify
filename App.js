/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {SafeAreaView, View, Text, NativeModules, Platform} from 'react-native'
import firebase from 'firebase'
import {firebaseConfig} from './fireabase.config'
import {registerTokenToServer, fetchToken} from './utils/common.utils'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

class App extends Component {
  state = {
    token: null,
    done: false,
  }

  componentDidMount () {
    fetchToken();
  }

  fakeLogin = async () => {
    const credentials = {
      email: 'ankitbaid11326@gmail.com',
      password: 'abcd1234',
    }
    let result = await fetch(`https://zapier001.herokuapp.com/api/login`, {
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    result = await result.json()
    const {access_token} = result
    this.setState(
      {
        token: access_token,
      },
      () => {
        this.fetchTokenforAndorid()
      },
    )
  }

  render () {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!this.state.done ? (
            <Text style={{fontSize: 24}}>Hello Android</Text>
          ) : (
            <Text style={{fontSize: 24}}>Registration Successful</Text>
          )}
        </View>
      </SafeAreaView>
    )
  }
}

export default App
