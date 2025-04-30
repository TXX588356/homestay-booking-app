import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import PasswordInput from "../components/PasswordInput";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../Types";
import { ExternalStyles } from "../Styles";
import MyButton from "../components/MyButton";
import { useRoute } from '@react-navigation/native';

interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}

export type Props = StackScreenProps<RootStackParamList, 'AuthScreen'>;

const AuthScreen = ({ navigation }: Props) => {
    const route = useRoute<Props['route']>();
    useEffect(() => {
        if (route.params?.mode === 'login') {
          setIsNewUser(false);
        } else if (route.params?.mode === 'register') {
          setIsNewUser(true);
        }
      }, [route.params]);
    const [isNewUser, setIsNewUser] = useState(true);

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    });

    const handleSubmit = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation for Login
        if (!isNewUser) {
            if (!formData.email || !formData.password) {
                Alert.alert('Some fields are blank', 'Please enter your email and password.', [{ text: 'OK' }]);
                return;
            } else if (!emailRegex.test(formData.email)) {
                Alert.alert('Invalid Email', 'Please enter a valid email format.', [{ text: 'OK' }]);
                return;
            }
            navigation.navigate('Main');
            return;
        }

        // Validation for Registration
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber) {
            Alert.alert('Some fields are blank', 'Please fill up all fields.', [{ text: 'OK' }]);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Password Mismatch', 'Your passwords do not match. Please try again.', [{ text: 'OK' }]);
            return;
        }

        if (!emailRegex.test(formData.email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email format.', [{ text: 'OK' }]);
            return;
        }

        if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.', [{ text: 'OK' }]);
            return;
        }

        navigation.navigate('Home'); 
};

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>{isNewUser ? 'Register' : 'Login'}</Text>
                </View>

                <View style={styles.formContainer}>
                    {isNewUser && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                            />
                        </View>
                    )}

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={formData.email}
                            keyboardType="email-address"
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <PasswordInput
                            placeholder={isNewUser ? "Create a password" : "Enter your password"}
                            value={formData.password}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                        />
                    </View>

                    {isNewUser && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <PasswordInput
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                            />
                        </View>
                    )}

                    {isNewUser && (
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                                keyboardType="phone-pad"
                                maxLength={12}
                            />
                        </View>
                    )}
                    
                    <MyButton onPress={handleSubmit} title={isNewUser? 'Register' : 'Login'} textStyle={{ color: 'white', fontWeight: 'bold' }}/>

                    <View style={styles.signInContainer}>
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>
                            {isNewUser ? 'Already have an account?' : "Don’t have an account?"}
                        </Text>
                         <TouchableOpacity onPress={() => setIsNewUser(!isNewUser)}>
                            <Text style={styles.loginText}>
                                {isNewUser ? 'Login here' : 'Register here'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    headingContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    formContainer: {
        width: '100%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Montserrat-Bold',
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        fontFamily: 'Montserrat-Bold'
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 10,
    },
    
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#ff5a5f',
        fontWeight: 'bold',
        marginLeft: 5,
        fontFamily: 'Montserrat-Regular'
    },
});

export default AuthScreen;
