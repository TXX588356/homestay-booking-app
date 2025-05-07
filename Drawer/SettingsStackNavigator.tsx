import { createStackNavigator } from '@react-navigation/stack';
import SettingScreen from './SettingScreen';
import AccountSettingScreen from './AccountSettingScreen';
import { ThemeContext } from '../util/ThemeManager';
import { useContext } from 'react';
import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const SettingsStack = createStackNavigator();
const tabHiddenRoutes = ["SettingsMain", "AccountSettings"]


const SettingsStackNavigator = () => {
  const { theme } = useContext(ThemeContext);
  
  
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
      }}
    >
      <SettingsStack.Screen 
        name="SettingsMain" 
        component={SettingScreen} 
        
      />
      <SettingsStack.Screen 
        name="AccountSettings" 
        component={AccountSettingScreen} 
      />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;