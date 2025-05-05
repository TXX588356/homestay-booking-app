import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import TabNavigator from './Tab/Tabs'
import { RootStackParamList } from "./Types";
import DrawerNavigator from "./Drawer/App";
import AuthStack from "./Auth/App";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PaperProvider } from 'react-native-paper';


const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
    return(
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Auth" component={AuthStack}/>
                        <Stack.Screen name="Main" component={DrawerNavigator}/>
                    </Stack.Navigator>
            </NavigationContainer>
            </PaperProvider>
        </GestureHandlerRootView>
        
       
    )
}

//need to add one more welcome screen
export default App;