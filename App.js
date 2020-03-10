import React, {Component} from 'react';
import {SafeAreaView, Button, Text} from 'react-native';
import firebase from 'firebase';
import {firebaseConfig} from './fireabase.config';
import { connect } from 'react-redux';

// Navigation from react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// SCREENS
import AuthTabNavigator from './src/screens/authScreen/TabNavigator';
import DrawerNavigator from './src/screens/appScreen/DrawerNavigator';

// Redux Imports



import {AUTH, DRAWER, HOME} from './src/constants/navigation.constants';
import { loginUser } from './src/actions/auth.actions';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

import Login from './src/screens/authScreen/Login';
// import Signup from './src/screens/authScreen/Signup';

// const AuthNavigator = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name={'LOGIN'} component={Login} />
//       <Tab.Screen name={'SIGNUP'} component={Signup} />
//     </Tab.Navigator>
//   )
// }

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
        loggedIn: true
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
