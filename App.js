import React, {Component} from 'react'
import {SafeAreaView, View, Text, AsyncStorage} from 'react-native'
import firebase from 'firebase'
import {firebaseConfig} from './fireabase.config'

// Navigation from react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import AuthTabNavigator from './src/screens/authScreen/TabNavigator';
import DrawerNavigator from './src/screens/appScreen/DrawerNavigator';

// Redux Imports
import {Provider} from 'react-redux';
import store from './src/store';

import {AUTH, DRAWER} from './src/constants/navigation.constants';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator()

class App extends Component {
  render () {
    return (
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name={AUTH} component={AuthTabNavigator} />
              <Stack.Screen name={DRAWER} component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    )
  }
}

export default App
