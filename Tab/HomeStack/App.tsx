import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen';
import PropertyDetailsScreen from './PropertyDetailsScreen';
import BookingScreen from './BookingScreen';
import PaymentScreen from './PaymentScreen';
import CategoryScreen from './CategoryScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Stack = createStackNavigator();
const tabHiddenRoutes = ["PropertyDetails"]

const App = ({route, navigation}) => {
  //only show tab bar when at explore screen
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    
    if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
     } else {
     navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Booking Screen" component={BookingScreen}/>
        <Stack.Screen name="Payment Screen" component={PaymentScreen}/>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />

    </Stack.Navigator>
  )
}

export default App;