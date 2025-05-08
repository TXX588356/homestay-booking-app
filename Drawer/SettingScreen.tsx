import { View, Alert } from 'react-native'
import React, { useContext } from 'react'
import { ExternalStyles } from '../Styles'
import MySwitch from '../components/MySwitch'
import { ThemeContext } from '../util/ThemeManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemedText from '../components/ThemedText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MyButton from '../components/MyButton'
import { getDBConnection, deleteUserAccount } from '../db-service'



const SettingScreen = ({route, navigation}: any) => {
  const { theme } = useContext(ThemeContext);
  const handleDeleteAccount = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      const currentUser = userData ? JSON.parse(userData) : null;

      if(!currentUser || !currentUser.id) {
        Alert.alert('Error', 'User not found');
        return;
      }
      const db = await getDBConnection();
      const success = await deleteUserAccount(db, currentUser.id);

      if(success) {
        await AsyncStorage.removeItem('currentUser');
        Alert.alert("Account Deleted", "Your account has been deleted successfully", [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{name: 'Auth'}],
              })
            }
          }
        ])
      } else {
        Alert.alert('Error', 'Failed to delete account');
      }
    } catch(error) {
      console.error('Delete account error: ', error);
      Alert.alert('Error', 'Something went wrong while deleting the account');
    }


  }
  
  

  return (
    <View style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
      <View>
        <MySwitch />
      </View>

      

      <View style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingVertical: 10 }}>
        <ThemedText style={[ExternalStyles.headerText, { paddingLeft: 20, marginBottom: 10 }]}>
          Manage My Account
        </ThemedText>

        <TouchableOpacity style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate('AccountSettings', {mode: 'info'})}>
          <ThemedText>Change Account Information</ThemedText>
          <ThemedText>{'>'}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate('AccountSettings', {mode: 'password'})}>
          <ThemedText>Change Password</ThemedText>
          <ThemedText>{'>'}</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={{alignSelf: 'center',width: '50%', justifyContent:'center'}}>
        <MyButton 
        title="Delete Account"
        textStyle={{color: 'white', fontWeight: 'bold'}}
        onPress={() => 
          Alert.alert("Confirm", "Are you sure you want to premanently delete your account?", [
            {text: "Cancel", style: 'cancel'},
            {text: "Delete", onPress: handleDeleteAccount}
          ])
        }
        />
      </View>
      

     

    </View>
    
  )
}

/*
Section 1: Theme and Appearance
Section 2: About us
Section 3: Policy
Section 4: Delete Account?
*/




export default SettingScreen;


