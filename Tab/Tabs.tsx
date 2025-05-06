import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeStack from './HomeStack/App'
import Wishlist from './WishlistScreen';
import TripStack from './TripStack/App';
import ProfileScreen from '../Drawer/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }: any) => {

  
  

  //to get dynamic header title based on focused screen
  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Explore';

    switch (routeName) {
      case 'Explore':
        return '';
      case 'Wishlist':
        return 'Wishlist';
      case 'Trip':
        return 'Trips';
      case 'Profile':
        return 'Profile';
      default:
        return 'Explore';
    }
  }

  // dynamically set header title whenever tab route changes
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff5a5f',
        tabBarActiveBackgroundColor: 'rgba(106, 191, 208, 0.33)',
      }}
    >
      <Tab.Screen
        name="Explore"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={20} color={color} />
          )
        } 
        }
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Trip"
        component={TripStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
