import React, {Component} from 'react';
import {Text, StyleSheet, View, AsyncStorage} from 'react-native';

import {registerTokenToServer, fetchToken} from '../../utils/common.utils';
import {DEVICE_TOKEN} from '../../constants/asyncstorage.constants';
import { login } from '../../Auth/backend';

export default class Home extends Component {

  state = {
    token: null,
    done: false,
    loggedIn: false,
  };

  componentWillMount(){
    console.log("CWM: ", this.props);
  }

  componentDidMount = async () => {
    const {navigation, route} = this.props;  

    const status = await login();
    if (status) {
      this.setState({
        loggedIn: true,
      });
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
  };

  render() {
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 24}}>Registration Successful</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({});
