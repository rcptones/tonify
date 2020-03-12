import React, {Component} from 'react';
import {SafeAreaView, Button, Text, View} from 'react-native';
import firebase from 'firebase';
import {firebaseConfig} from './fireabase.config';
import { connect } from 'react-redux';

// Navigation from react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import AuthTabNavigator from './src/screens/authScreen/TabNavigator';
import DrawerNavigator from './src/screens/appScreen/DrawerNavigator';


import {AUTH, DRAWER} from './src/constants/navigation.constants';
import { loginUser } from './src/actions/auth.actions';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator(); 

class App extends Component {
  state = {
    loggedIn: false,
  }

  componentDidMount() {
    const {auth} = this.props;
    if(auth && auth.isAuthenticated){
      this.setState({
        loggedIn: true
      })
    }
   }

   static getDerivedStateFromProps(nextProps, prevState) {
    const {auth} = nextProps;
    if (auth && auth.isAuthenticated) {
      return {login: true};
    } else {
      return null;
    }
   }

   componentDidUpdate(prevProps, prevState) {
    const {auth} = this.props;
    if(auth && auth.isAuthenticated && !this.state.loggedIn){
      this.setState({
        loggedIn: auth.isAuthenticated
      })
    }
   }
   

  render () {
    const { loggedIn } = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            {!loggedIn ?
            <Stack.Navigator>
              <Stack.Screen
                name={AUTH} 
                component={AuthTabNavigator} 
                options={{
                  headerShown:false
                }} 
              />
            </Stack.Navigator>
            : <Stack.Navigator>
              <Stack.Screen 
                name={DRAWER}
                component={DrawerNavigator} 
                options={{
                  headerShown:false
                }} 
              />
            </Stack.Navigator>
            }
          </NavigationContainer>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {loginUser},
)(App);
