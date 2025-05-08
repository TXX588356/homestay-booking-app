import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from "react-native";
import PasswordInput from "../components/PasswordInput";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../Types";
import { ExternalStyles } from "../Styles";
import MyButton from "../components/MyButton";
import { useRoute } from '@react-navigation/native';
import { getDBConnection, createUser, validateUser, User, getUsers, updateUserForgotPassword } from "../db-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    newPassword?: string;
    confirmNewPassword?: string;
}

export type Props = StackScreenProps<RootStackParamList, 'AuthScreen'>;

const AuthScreen = ({ navigation }: Props) => {
    
    //******TESTING PURPOSES******
    useEffect(() => {
        const fetchAllUsers = async () => {
          try {
            const db = await getDBConnection();
            const users = await getUsers(db);
            console.log('All Users:', users);
          } catch (error) {
            console.error('Failed to fetch users:', error);
          }
        };
      
        fetchAllUsers();
      }, []); 
    const route = useRoute<Props['route']>();
    const [isNewUser, setIsNewUser] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    useEffect(() => {
        if (route.params?.mode === 'login') {
          setIsNewUser(false);
        } else if (route.params?.mode === 'register') {
          setIsNewUser(true);
        }
      }, [route.params]);
   

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        newPassword: '',
        confirmNewPassword: '',
    });



    const handleSubmit = async () => {
        setIsLoading(true);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        try {
            const db = await getDBConnection();
    
            // Handle Forgot Password FIRST
            if (isForgotPassword) {
                if (!formData.email || !formData.newPassword || !formData.confirmNewPassword) {
                    Alert.alert('All fields are required', 'Please fill in all the required fields', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (formData.newPassword !== formData.confirmNewPassword) {
                    Alert.alert('Password Mismatch', 'New passwords do not match', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (formData.newPassword.trim().length < 8) {
                    Alert.alert('Password too short', 'Password need to have at least 8 characters', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                const updateSuccess = await updateUserForgotPassword(db, formData.email, formData.newPassword);
    
                if (updateSuccess) {
                    Alert.alert('Password update success!', 'Please login now with your new password',
                        [{
                            text: 'OK',
                            onPress: () => {
                                setIsForgotPassword(false);
                                setFormData(prev => ({
                                    ...prev,
                                    newPassword: '',
                                    confirmNewPassword: '',
                                }));
                            }
                        }]
                    );
                } else {
                    Alert.alert('Error', 'Email not found', [{ text: 'OK' }]);
                }
                setIsLoading(false);
                return;
            }
    
            // Handle regular login/register flow
            if (!isNewUser) {
                // Login validation
                if (!formData.email || !formData.password) {
                    Alert.alert('Some fields are blank', 'Please enter your email and password.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (!emailRegex.test(formData.email)) {
                    Alert.alert('Invalid Email', 'Please enter a valid email format.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                const user = await validateUser(db, formData.email, formData.password);
    
                if (user) {
                    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
                    navigation.navigate('Main');
                } else {
                    Alert.alert('Login Failed', 'Invalid email or password', [{ text: 'OK' }]);
                }
                setIsLoading(false);
                return;
            } else {
                // Registration validation
                if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber) {
                    Alert.alert('Some fields are blank', 'Please fill up all fields.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (formData.fullName.trim().length < 3) {
                    Alert.alert("Invalid Full Name", "Name need to have at least 3 character.", [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                } else if (formData.fullName.trim().length > 50) {
                    Alert.alert('Name is too long', 'Only maximum of 50 characters are allowed for full name.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (formData.password.trim().length < 8) {
                    Alert.alert('Password too short', 'Your passwords need to have at least 8 characters.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (formData.password !== formData.confirmPassword) {
                    Alert.alert('Password Mismatch', 'Your passwords do not match. Please try again.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (!emailRegex.test(formData.email)) {
                    Alert.alert('Invalid Email', 'Please enter a valid email format.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                if (!/^\d{10,15}$/.test(formData.phoneNumber)) {
                    Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.', [{ text: 'OK' }]);
                    setIsLoading(false);
                    return;
                }
    
                // Create new user
                const newUser: User = {
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber,
                };
    
                const userCreated = await createUser(db, newUser);
    
                if (userCreated) {
                    Alert.alert('Success', 'Registration successful! You can now login.', [{
                        text: 'OK',
                        onPress: () => {
                            setIsNewUser(false);
                            setFormData({
                                fullName: '',
                                email: '',
                                password: '',
                                confirmPassword: '',
                                phoneNumber: ''
                            });
                        }
                    }]);
                } else {
                    Alert.alert('Registration Failed', 'Email is already registered.', [{ text: 'OK' }]);
                }
            }
    
        } catch (error) {
            console.error("Error: ", error);
            Alert.alert('Error', 'An unexpected error occurred.', [{ text: 'OK' }]);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={[ExternalStyles.container, {padding: 20}]}>
                <View style={{alignItems: 'center', margin: 10,}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black', fontFamily: 'Montserrat-Bold',}}>
                        {isForgotPassword ? 'Reset Password' : (isNewUser ? 'Register' : 'Login')}
                    </Text>
                </View>

                <View style={{width: '100%'}}>
                {!isForgotPassword ? (
                    <>
                        {/* Existing login/register form */}
                        {isNewUser && (
                            <View style={ExternalStyles.inputContainer}>
                                <Text style={ExternalStyles.authLabel}>Full Name</Text>
                                <TextInput
                                    style={ExternalStyles.input}
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                                />
                            </View>
                        )}

                        <View style={ExternalStyles.inputContainer}>
                            <Text style={ExternalStyles.authLabel}>Email</Text>
                            <TextInput
                                style={ExternalStyles.input}
                                placeholder="Enter your email"
                                value={formData.email}
                                keyboardType="email-address"
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                        </View>

                        {!isNewUser && (
                            <View style={ExternalStyles.inputContainer}>
                                <Text style={ExternalStyles.authLabel}>Password</Text>
                                <PasswordInput
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                                />
                            </View>
                        )}

                        {isNewUser && (
                            <>
                                <View style={ExternalStyles.inputContainer}>
                                    <Text style={ExternalStyles.authLabel}>Password</Text>
                                    <PasswordInput
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChangeText={(text) => setFormData({ ...formData, password: text })}
                                    />
                                </View>

                                <View style={ExternalStyles.inputContainer}>
                                    <Text style={ExternalStyles.authLabel}>Confirm Password</Text>
                                    <PasswordInput
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                                    />
                                </View>

                                <View style={ExternalStyles.inputContainer}>
                                    <Text style={ExternalStyles.authLabel}>Phone Number</Text>
                                    <TextInput
                                        style={ExternalStyles.input}
                                        placeholder="Enter your phone number"
                                        value={formData.phoneNumber}
                                        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                                        keyboardType="phone-pad"
                                        maxLength={12}
                                    />
                                </View>
                            </>
                        )}
                    </>
                ) : (
                    /* Forgot Password Form */
                    <>
                        <View style={ExternalStyles.inputContainer}>
                            <Text style={ExternalStyles.authLabel}>Email</Text>
                            <TextInput
                                style={ExternalStyles.input}
                                placeholder="Enter your email"
                                value={formData.email}
                                keyboardType="email-address"
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                            />
                        </View>

                        <View style={ExternalStyles.inputContainer}>
                            <Text style={ExternalStyles.authLabel}>New Password</Text>
                            <PasswordInput
                                placeholder="Enter new password"
                                value={formData.newPassword || ''}
                                onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                            />
                        </View>

                        <View style={ExternalStyles.inputContainer}>
                            <Text style={ExternalStyles.authLabel}>Confirm New Password</Text>
                            <PasswordInput
                                placeholder="Confirm new password"
                                value={formData.confirmNewPassword || ''}
                                onChangeText={(text) => setFormData({ ...formData, confirmNewPassword: text })}
                            />
                        </View>
                    </>
                )}
                    

                    
                    <MyButton onPress={handleSubmit} title={isForgotPassword ? 'Reset Password' :  (isNewUser? 'Register' : 'Login')} textStyle={{ color: 'white', fontWeight: 'bold' }} disabled={isLoading}/>

                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 30}}>
                        <Text style={{ fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>
                            {!isForgotPassword && (isNewUser ? 'Already have an account?' : "Don’t have an account?")}
                        </Text>

                        <TouchableOpacity onPress={() => setIsNewUser(!isNewUser)}>
                            <Text style={ExternalStyles.loginText}>
                                {!isForgotPassword && (isNewUser ? 'Login here' : 'Register here')}
                            </Text>
                        </TouchableOpacity>
                        </View>
                        


                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 30}}>
                            {!isForgotPassword && !isNewUser && (
                                <TouchableOpacity onPress={() => {
                                    setIsForgotPassword(true);
                                    setFormData({
                                        ...formData,
                                        password: '',
                                        confirmPassword: '',
                                        newPassword: '',
                                        confirmNewPassword: '',
                                    });
                                }}>
                                    <Text style={ExternalStyles.loginText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            )}
                            
                            {isForgotPassword && (
                                <TouchableOpacity onPress={() => setIsForgotPassword(false)}>
                                    <Text style={ExternalStyles.loginText}>Back to Login</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView> );
};
export default AuthScreen;
