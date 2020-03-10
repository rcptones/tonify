import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Screens
import Login from './Login';
import Signup from './Signup';

// NAVIGATION CONSTANTS
import { LOGIN, SIGNUP} from '../../constants/navigation.constants';


export default class TabNavigator extends Component {
  render () {
    return (
      <Tab.Navigator>
        <Tab.Screen name={LOGIN} component={Login} />
        <Tab.Screen name={SIGNUP} component={Signup} />
      </Tab.Navigator>
    )
  }
}
