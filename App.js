import React, {Component} from 'react'
import {SafeAreaView, View, Text, AsyncStorage} from 'react-native'
import firebase from 'firebase'
import {firebaseConfig} from './fireabase.config'

// Navigation from react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// SCREENS
import AuthTabNavigator from './src/screens/authScreen/TabNavigator';
import Home from './src/screens/appScreen/Home';

// Redux Imports
import {Provider} from 'react-redux'
import store from './src/store'

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
              <Stack.Screen name='Auth' component={AuthTabNavigator} />
              <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    )
  }
}

export default App
