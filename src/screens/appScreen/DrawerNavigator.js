import React, {Component} from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

// Components
import Home from './Home';
import Profile from './Profile';
import Sounds from './Sounds';

// NAVIGATION CONSTANTS
import { HOME, PROFILE, SOUNDS } from '../../constants/navigation.constants';


function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName='Home'>
      <Drawer.Screen name={HOME} component={Home} />
      <Drawer.Screen name={PROFILE} component={Profile} />
      <Drawer.Screen name={SOUNDS} component={Sounds} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
