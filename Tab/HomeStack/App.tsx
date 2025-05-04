import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen';
import PropertyDetailsScreen from './PropertyDetailsScreen';
import BookingScreen from './BookingScreen';
import ReviewBookingScreen from './ReviewBookingScreen';
import CategoryScreen from './CategoryScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import PaymentMethodScreen from './PaymentMethodScreen';


const Stack = createStackNavigator();
const tabHiddenRoutes = ["PropertyDetails", "BookingScreen", "ReviewBookingScreen", "CategoryScreen", "PaymentMethod"]

const App = ({route, navigation}) => {
  //only show tab bar when at screen specified in tabHiddenRoutes
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    
    if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
      navigation.setOptions({tabBarStyle: {display: 'none'}});
     } else {
     navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator 
    screenOptions={{headerShown: false,
      cardStyle: {
        backgroundColor: 'transparent'
      }
    }}
  >
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="BookingScreen" component={BookingScreen}/>
        <Stack.Screen name="ReviewBookingScreen" component={ReviewBookingScreen}/>
        <Stack.Screen name="CategoryScreen" component={CategoryScreen}/>
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />

    </Stack.Navigator>
  )
}

export default App;