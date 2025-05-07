import { View, Text } from 'react-native'
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


const AccountSettingScreen = ({route, navigation}: any) => {
  const {mode} = route.params;
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRetypePassword, setNewRetypePassword] = useState("");

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


  
  /* const handleUpdateInfo = async () => {
    try {
      const userString = await AsyncStorage.getItem('currentUser');
      if(!userString) {
        console.error("No user data found.");
        return;
      }

      const user = JSON.parse(userString);
      const userID = user.id;

      console.log("Updating user info for ID: ", userID);
      console.log("New data: ", {name, email});

      const response = await fetch(`${config.settings.serverPath}/api/users/update-info`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: user.id,
          name: name,
          email: email
        }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      console.log('User info updated successfully:', updatedUser);
      // Optionally, update AsyncStorage with new user data
      await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
    } else {
      const errorData = await response.json();
      console.error('Failed to update user info:', errorData);
    }
  } catch (error) {
    console.error('Error updating user info:', error);
  }
   
  };
  
 */
  return (
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

          <View style={{marginBottom: 20}}>
            <TextInput label="Email" value={email} 
            onChangeText={(text) => {
              console.log("Previous email:", email);
              setEmail(text);
            }}/> 
          </View>
          
          <MyButton 
          title="Update Info"
          textStyle={{color: 'white', fontWeight: 'bold'}}
          style={{alignSelf: 'center', justifyContent: 'center'}}
          //onPress={handleUpdateInfo}
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
          />

        </View>
      )}
    </View>
  )
}

export default AccountSettingScreen