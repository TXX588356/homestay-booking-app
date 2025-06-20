import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import { RootStackParamList } from "./Types";
import DrawerNavigator from "./Drawer/App";
import AuthStack from "./Auth/App";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {ThemeProvider} from './util/ThemeManager';
import { PaperProvider } from 'react-native-paper';



const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
    return(
        <ThemeProvider>
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
        </ThemeProvider>
        
        
       
    )
}

export default App;