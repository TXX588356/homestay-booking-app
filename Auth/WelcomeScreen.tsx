import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { ExternalStyles } from '../Styles';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={ExternalStyles.container}>
            <Image
                source={require('../img/background-image.jpg')} 
                style={{height: Dimensions.get('window').width, width: Dimensions.get('window').width}}
            />
            <View style={{padding: 20, alignItems: 'center',}}>
                <Text style={ExternalStyles.mainTitle}>Welcome to HomeStay Booking App</Text>
                <Text style={[ExternalStyles.subTitle, {fontSize: 15}]}>Find your perfect stay</Text>
            </View>

            <View style={{padding: 20}}>
                <TouchableOpacity
                    style={[ExternalStyles.button, {marginTop: 0,marginBottom: 15, backgroundColor: '#ff385c'}]}
                    onPress={() => navigation.navigate('Login', { mode: 'register' })} 
                    >
                    <Text style={[ExternalStyles.sectionTitle, {color: 'white'}]}>Register</Text>
                  </TouchableOpacity>

                    <TouchableOpacity
                    style={[ExternalStyles.button, {marginTop: 10}]}
                    onPress={() => navigation.navigate('Login', { mode: 'login' })}
                    >
                    <Text style={[ExternalStyles.sectionTitle, {color: 'white'}]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
        

    );
};

export default WelcomeScreen;
