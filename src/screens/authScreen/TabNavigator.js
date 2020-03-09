import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { StackActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

// Screens
import Login from './Login';
import Signup from './Signup';

// NAVIGATION CONSTANTS
import {DRAWER, LOGIN, SIGNUP} from '../../constants/navigation.constants';

export default class TabNavigator extends Component {

  componentDidMount() {
    const {navigation} = this.props;

    //   navigation.navigate(DRAWER);
    setTimeout(() => {
      navigation.dispatch(
        StackActions.replace(DRAWER, {
          user: 'jane',
        })
      );
    }, 3000);

  }

  render () {
    return (
      <Tab.Navigator>
        <Tab.Screen name={LOGIN} component={Login} />
        <Tab.Screen name={SIGNUP} component={Signup} />
      </Tab.Navigator>
    )
  }
}
