import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TripDetails from './TripDetails';
import TripScreen from './TripScreen';

const Stack = createStackNavigator();
const TripStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TripScreen" component={TripScreen}/>
        <Stack.Screen name="TripDetails" component={TripDetails}/>
    </Stack.Navigator>
  )
}

export default TripStack;
