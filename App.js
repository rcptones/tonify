/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {SafeAreaView, View, Text, NativeModules, Platform} from 'react-native'

class App extends Component {
  componentDidMount () {
    this.fetchTokenforAndorid();
  }

  fetchTokenforAndorid = async () => {
    if (Platform.OS === 'android') {
      const {NotificationActivity} = NativeModules
      await NotificationActivity.generateToken((token) => {
        console.log('token', token);
      });
    }
  }

  render () {
    return (
      <SafeAreaView>
        <View>
          <Text>Hello Tonify</Text>
        </View>
      </SafeAreaView>
    )
  }
}

export default App
