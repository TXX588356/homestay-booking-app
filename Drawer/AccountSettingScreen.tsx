import { View, Text, Alert } from 'react-native'
import {TextInput} from "react-native-paper"
import React, { useContext, useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import MyButton from '../components/MyButton';
import { ExternalStyles } from '../Styles';
import BackButton from '../components/BackButton';
import { ThemeContext } from '../util/ThemeManager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config';
import { deleteUserAccount, getDBConnection, updateUserInfo, updateUserPassword } from '../db-service';






const AccountSettingScreen = ({route, navigation}: any) => {
  const {mode} = route.params;
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRetypePassword, setNewRetypePassword] = useState("");

  
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("Updated name: ", name);
  }, [name]);

  useEffect(() => {
    console.log('Updated Email:', email);
  }, [email]);

  useEffect(() => {
    console.log('Updated Current Password:', currPassword);
  }, [currPassword]);

  useEffect(() => {
    console.log('Updated New Password:', newPassword);
  }, [newPassword]);

  useEffect(() => {
    console.log('Updated Confirm New Password:', newRetypePassword);
  }, [newRetypePassword]);

/*   const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNum: '',
  }); */


  
  const handleUpdateInfo = async () => {
    if(!name || !phoneNum) {
      Alert.alert('Error', 'Some fields are empty');
      return;
    }
    if (!/^\d{10,15}$/.test(phoneNum)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.', [{ text: 'OK' }]);
      setIsLoading(false);
      return;
    }

    try{
      const userData = await AsyncStorage.getItem('currentUser');
      const currentUser = userData ? JSON.parse(userData) : null;

      if(!currentUser || !currentUser.id) {
        Alert.alert('Error', 'User not found in local storage');
        return;
      }

      const db = await getDBConnection();

      const success = await updateUserInfo(db, currentUser.id, name, phoneNum);
      if(success) {
        Alert.alert('Success', 'User info updated successfully');
        setName('');
        setPhoneNum('');

        const updatedUser = {
          ...currentUser,
          name,
          phoneNumber: phoneNum
        }


        await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
        console.log("AsyncStoage updated with new user info")
      }else {
        Alert.alert("Error", "Failed to update user info");
      }
    } catch(error) {
      console.error("User info update error:", error)
      Alert.alert("Error", "Something went wrong")
    }
   
  };

  const handleUpdatePassword = async () => {
    if(!newPassword || newPassword !== newRetypePassword) {
      Alert.alert('Error', 'Password do not match or are empty');
      return;
    }


    try{
      const userData = await AsyncStorage.getItem('currentUser');
      const currentUser = userData ? JSON.parse(userData) : null;

      if(!currentUser || !currentUser.id) {
        Alert.alert('Error', 'User not found in local storage');
        return;
      }

      if(currPassword !== currentUser.password) {
        Alert.alert('Error', 'Wrong password entered. Please try again');
        return;
      }

      if(newPassword.trim().length < 8) {
        Alert.alert('Password too short', 'Password need to have at least 8 characters.');
        return;
      }

      const db = await getDBConnection();

      const success = await updateUserPassword(db, currentUser.id, newPassword);
      if(success) {
        Alert.alert('Success', 'Password updated successfully');
        setCurrPassword('');
        setNewPassword('');
        setNewRetypePassword('');
      }else {
        Alert.alert("Error", "Failed to update password");
      }
    } catch(error) {
      console.error("Password update error:", error)
      Alert.alert("Error", "Something went wrong")
    }
  }

  
 
  return (
    //AsyncStorage.getItem('currentUser').then(data => console.log('currentUser:', data)),

    <View style={{flex: 1,backgroundColor: theme.background, paddingLeft: 10, paddingRight: 10}}>
        <View style={ExternalStyles.backButtonContainer}>
          <BackButton/>
        </View>
      {mode === 'info' ? (
        <View style={{marginTop: 55}}>
          <View style={{marginBottom: 20}}>
            <TextInput label="Name" value={name} 
            onChangeText={(text) => {
              console.log("Previous Name:", name);
              setName(text);
            }}/>  
          </View>

          {
          <View style={{marginBottom: 20}}>
            <TextInput label="Phone Number" value={phoneNum} 
            onChangeText={(text) => {
              console.log("Previous phone number:", phoneNum);
              setPhoneNum(text);
            }}/> 
          </View>}
          
          <MyButton 
          title="Update Info"
          textStyle={{color: 'white', fontWeight: 'bold'}}
          style={{alignSelf: 'center', justifyContent: 'center'}}
          onPress={handleUpdateInfo}
          />
      
      </View>
      ) : (
        <View style={{marginTop: 55}}>

          <View style={{marginBottom: 20}}>
            <TextInput label="Current Password" value={currPassword} onChangeText={currPassword => setCurrPassword(currPassword)} secureTextEntry/>  
          </View>

          <View style={{marginBottom: 20}}>
            <TextInput label="New Password" value={newPassword} onChangeText={newPassword => setNewPassword(newPassword)} secureTextEntry/>  
          </View>

          <View style={{marginBottom: 20}}>
            <TextInput label="Confirm New Password" value={newRetypePassword} onChangeText={newRetypePassword => setNewRetypePassword(newRetypePassword)} secureTextEntry/>  
          </View>


          <MyButton 
          title="Update Password"
          textStyle={{color: 'white', fontWeight: 'bold'}}
          onPress={handleUpdatePassword}
          />

        </View>
      )}
    </View>
  )
}

export default AccountSettingScreen