import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import WelcomeScreen from './WelcomeScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Forgot Password" component={ForgotPassword}/>
   </Stack.Navigator>
  )
}

export default AuthStack;