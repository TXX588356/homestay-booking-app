import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import LoadingIndicator from '../components/LoadingIndicator';
import { ExternalStyles } from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // To identify whether user data is in AsyncStorage, if yes, then user stays logged in automatically
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const userDataString = await AsyncStorage.getItem('currentUser');

            if (userDataString) {
                console.log("Current User: " + JSON.parse(userDataString).name);
                setIsLoggedIn(true);
                navigation.navigate('Main');
            }
            } catch (error) {
                console.error('Error in fetching user data: ', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchUser();
    }, []);
    
    if(isLoading) {
        return (
            <LoadingIndicator/>
        )
      }
    
      return (
        !isLoggedIn ? (
            <View style={ExternalStyles.container}>
                <Image
                    source={require('../img/background-image.jpg')} 
                    style={{ height: Dimensions.get('window').width, width: Dimensions.get('window').width }}
                />
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text style={ExternalStyles.mainTitle}>Welcome to HomeStay Booking App</Text>
                    <Text style={[ExternalStyles.subTitle, { fontSize: 15 }]}>Find your perfect stay</Text>
                </View>
    
                <View style={{ padding: 20 }}>
                    <TouchableOpacity
                        style={[ExternalStyles.button, { marginTop: 0, marginBottom: 15, backgroundColor: '#ff385c' }]}
                        onPress={() => navigation.navigate('Login', { mode: 'register' })}
                    >
                        <Text style={[ExternalStyles.sectionTitle, { color: 'white' }]}>Register</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        style={[ExternalStyles.button, { marginTop: 10 }]}
                        onPress={() => navigation.navigate('Login', { mode: 'login' })}
                    >
                        <Text style={[ExternalStyles.sectionTitle, { color: 'white' }]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : ( <></> )
    );
    
};

export default WelcomeScreen;
