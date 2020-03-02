import React, {Component} from 'react';
import {SafeAreaView, View, Text, AsyncStorage} from 'react-native';
import firebase from 'firebase';
import {firebaseConfig} from './fireabase.config';
import {registerTokenToServer, fetchToken} from './utils/common.utils';
import {DEVICE_TOKEN} from './constants/asyncstorage.constants';
import {login} from './Auth/backend';

// Redux Imports
import {Provider} from 'react-redux';
import store from './store';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {
  state = {
    token: null,
    done: false,
  }

  componentDidMount = async () => {
    const status = await login();
    if (status) {
      await this.checkOrDeleteToken();
    }
  }

  checkOrDeleteToken = async () => {
    const result = await fetchToken();
    if (result && result.status) {
      const {token} = result;
      const oldToken = await AsyncStorage.getItem(DEVICE_TOKEN);
      if (!oldToken || oldToken !== token) {
        // register new token to server
        return registerTokenToServer(token);
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
