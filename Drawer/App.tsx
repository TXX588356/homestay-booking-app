import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from '../Tab/Tabs';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator ();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{
            title: 'Home',
            unmountOnBlur:true,
            drawerIcon: ({color}) => <Ionicons name="home" size={22} color={color} />,
          }}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{drawerIcon: ({color}) => <Ionicons name="person-circle" size={22} color={color}/>,}}/>
        <Drawer.Screen name="Settings" component={SettingScreen} options={{drawerIcon: ({color}) => <Ionicons name="cog" size={22} color={color}/>,}}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;