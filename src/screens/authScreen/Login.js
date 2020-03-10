import React, {Component} from 'react';
import {Text, StyleSheet, View, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth.actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import {loginUser} from '../../utils/common.utils';

class Login extends Component {
  state = {
    email: 'ankitbaid11326@gmail.com',
    password: 'abcd1234'
  }

  componentDidMount() {
    // this.login();
  }

  // login = async () => {
  //   const {navigation} = this.props;
  //   console.log("navigation", navigation);
  //   const result = await loginUser('ankitbaid11326@gmail.com', 'abcd1234');
  //   console.log("result", result);
  //   if (result.status) {
  //     const {token} = result;
  //     await AsyncStorage.setItem(AUTH_TOKEN, token);
  //     // navigation.navigate('DRAWER');
  //   }
  // }

  handleLogin = () => {
    // console.log("props", this.props);
    const {loginUser} = this.props;
    loginUser("ankitbaid11326@gmail.com", 'abcd1234');
  }

  render() {
    return (
      <View style={{ flex:1, backgroundColor: "#cfcfcf", justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={this.handleLogin}>
          <Text> Login </Text>
        </TouchableOpacity>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
  {loginUser},
)(Login);
