import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import TabNavigator from './Tab/Tabs'
import { RootStackParamList } from "./Types";
import DrawerNavigator from "./Drawer/App";
import AuthStack from "./Auth/App";


const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthStack}/>
                <Stack.Screen name="Main" component={DrawerNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

//need to add one more welcome screen
export default App;