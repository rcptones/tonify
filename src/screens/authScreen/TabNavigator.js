import React, {Component} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator();

// Screens
import Login from './Login';
import Signup from './Signup';

export default class TabNavigator extends Component {

  componentDidMount() {
    const {navigation} = this.props;

    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000)

  }

  render () {
    return (
      <Tab.Navigator>
        <Tab.Screen name='Login' component={Login} />
        <Tab.Screen name='Signup' component={Signup} />
      </Tab.Navigator>
    )
  }
}
