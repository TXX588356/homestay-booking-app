import React, { useState } from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import TabNavigator from './Tab/Tabs'
import { RootStackParamList } from "./Types";
import DrawerNavigator from "./Drawer/App";
import AuthStack from "./Auth/App";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {ThemeProvider} from './util/ThemeManager';
import { PaperProvider } from 'react-native-paper';


/* export const ToggleButton = () => {
    return(
        <Button
        title="Toggle"
        onPress={() => {}}/>
    )
} */

const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
    return(
        <ThemeProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <PaperProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Auth" component={AuthStack}/>
                            <Stack.Screen name="Main" component={DrawerNavigator}/>
                        </Stack.Navigator>
                </NavigationContainer>
                </PaperProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
        
        
       
    )
}

//need to add one more welcome screen
export default App;