import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Image
                source={require('../img/background-image.jpg')} 
                style={{height: Dimensions.get('window').width, width: Dimensions.get('window').width}}
            />
            <View style={styles.textContainer}>
                <Text style={styles.header}>Welcome to HomeStay Booking App</Text>
                <Text style={styles.subHeader}>Find your perfect stay</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login', { mode: 'register' })} 
                    >
                    <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.navigate('Login', { mode: 'login' })}
                    >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
        

    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
    color: 'black'
  },
  subHeader: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
  },
  buttonContainer: {
    padding: 20,
  },

  button: {
    backgroundColor: '#ff385c',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center'
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
  },
  loginButton: {
    backgroundColor: '#ff5a5f',
  }

});
