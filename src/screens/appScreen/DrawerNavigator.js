import React, {Component} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { Text, TouchableOpacity } from 'react-native';
const Drawer = createDrawerNavigator();

// Components
import Home from './Home';
import Profile from './Profile';
import Sounds from './Sounds';

// NAVIGATION CONSTANTS
import {HOME, PROFILE, SOUNDS} from '../../constants/navigation.constants';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} 
        options={{
          title: 'HOME',
          headerShown: true,
          headerLeft: () => <HanmurgerMenu navigation={navigation}/>
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} 
        options={{
          title: 'Profile',
          headerShown: true,
          headerLeft: () => <HanmurgerMenu navigation={navigation}/>
        }}
      />
    </Stack.Navigator>
  );
};

const SoundScreen = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Sounds} 
        options={{
          title: 'Sounds',
          headerShown: true,
          headerLeft: () => <HanmurgerMenu navigation={navigation}/>
        }}
      />
    </Stack.Navigator>
  );
};

function HanmurgerMenu({navigation}){
  return (
    <TouchableOpacity
      style={{ padding: 5 }}
      onPress={()=> navigation.openDrawer()}>
      <Text style={{ fontSize: 20 }}> ☰ </Text>
    </TouchableOpacity>
  )
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName={HOME}>
      <Drawer.Screen name={HOME} component={HomeScreen} />
      <Drawer.Screen name={PROFILE} component={ProfileScreen} />
      <Drawer.Screen name={SOUNDS} component={SoundScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
