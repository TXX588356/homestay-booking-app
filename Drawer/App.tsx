import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from '../Tab/Tabs';
import ProfileScreen from './ProfileScreen';
import SettingScreen from './SettingScreen';
import CustomerSupport from './CustomerSupport';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../util/ThemeManager';

const Drawer = createDrawerNavigator ();

const DrawerNavigator = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Drawer.Navigator
    screenOptions={{
      drawerType: 'slide',
      drawerStyle: { backgroundColor: theme.background },
      drawerActiveTintColor: theme.text,
      drawerInactiveTintColor: theme.text,
      headerStyle: { backgroundColor: theme.background },
      headerTintColor: theme.text,
    }}
  >
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{
            title: 'Home',
            unmountOnBlur:true,
            drawerIcon: ({color}) => <Ionicons name="home" size={22} color={color} />
          }}
        />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{drawerIcon: ({color}) => <Ionicons name="person-circle" size={22} color={color}/>,}}/>
        <Drawer.Screen name="Settings" component={SettingScreen} options={{drawerIcon: ({color}) => <Ionicons name="cog" size={22} color={color}/>,}}/>
        <Drawer.Screen name="Customer Support" component={CustomerSupport} options={{drawerIcon: ({color}) => <Ionicons name="help-circle" size={22} color={color}/>,}}/>
    </Drawer.Navigator>
  )
}

export default DrawerNavigator;
