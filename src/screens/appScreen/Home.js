import React, {Component} from 'react';
import {Text, StyleSheet, View, AsyncStorage} from 'react-native';
import { connect } from 'react-redux';

import {registerTokenToServer, fetchToken} from '../../utils/common.utils';
import {DEVICE_TOKEN} from '../../constants/asyncstorage.constants';
import { generateToken } from '../../actions/firebase.actions';

class Home extends Component {

  state = {
    token: null,
    done: false,
    loggedIn: false,
  };

  componentDidMount = async () => {
    console.log("props", this.props);
    const {generateToken} = this.props;
    generateToken();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("nextProps", nextProps);
    const {token} = nextProps.firebaseReducer;
    if (token) {
      return {token}
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.firebaseReducer.token !== this.props.firebaseReducer.token){
      // make an api call to register token
    }
   }

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
});


export default connect(
  mapStateToProps,
  {generateToken},
)(Home);

