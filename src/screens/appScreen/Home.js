import React, {Component} from 'react';
import {Text, StyleSheet, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import { generateToken } from '../../actions/firebase.actions';
import { TOKEN_REGISTRATION_URL } from '../../constants/api.constants';

class Home extends Component {

  state = {
    token: null,
    done: false,
    loggedIn: false,
  };

  componentDidMount = async () => {
    const {generateToken} = this.props;
    console.log("CDM Happened");
    generateToken();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {token} = nextProps.firebaseReducer;
    console.log("getDerivedStateFromProps Happened");
    if (token) {
      return {token};
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate Happened");
    const {token: oldToken} = prevProps.firebaseReducer;
    const {token: newToken} = this.props.firebaseReducer;
    /**
     * TODO 
     */
    // if(oldToken == null){
    //   // Register it for first time
    //   return
    // }

    /**
     * TODO 
     */
    // if(oldToken !== newToken){
    //   // Update the token
    //   return
    // }

    console.log("oldToken", oldToken)
    console.log("newToken", newToken);

    if (oldToken !== newToken) {
      console.log("\n\n inside", this.props);
      this.registerToken(newToken);
    }
   }

  registerToken = async (token) => {
    console.log("\n\n registerToken");
    const {token: authToken} = this.props.auth;
    const body = {
      platform: Platform.OS == 'ios' ? 'ios' : 'android',
      token,
    };

    try {
      let result = await fetch(TOKEN_REGISTRATION_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify(body),
        method: 'POST',
      });
      console.log("\n\n result", result);
    } catch (error) {
      console.log('error', error);
    }
  };

  updateToken = () => {};

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

const mapStateToProps = state => ({
  firebaseReducer: state.firebaseReducer,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {generateToken},
)(Home);
