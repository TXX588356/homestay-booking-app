import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ExternalStyles } from '../Styles'
import {Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../services/db-service'
import { useIsFocused } from '@react-navigation/native'
import { ThemeContext } from '../util/ThemeManager';
import ThemedText from '../components/ThemedText';



 
const Profile = () => {
  const { theme } = useContext(ThemeContext);
  
  const navigation = useNavigation();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUser = async() => {
      try{
        setLoading(true);
        const userDataString = await AsyncStorage.getItem('currentUser');

        if(userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      }catch(error){
        console.error("Error in fetching user data: ", error);
      }finally{
        setLoading(false);
      }
    }

    if(isFocused) {
      fetchUser();
    }
  }, [isFocused])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
      
    }catch(error){
      console.error("Error during logout: ", error);
    }
  }

  if(loading) {
    return (
      <View style={[ExternalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#ff5a5f" />
      </View>
    )
  }

  
  return (
    <View style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
      <View style={styles.userInfo}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Avatar.Image
            source={require('../img/cat.png')}
            size={80}
          />
          <View style={{marginLeft: 25}}>
            <Title style={[styles.title, {marginTop: 10, color: theme.text}]}>{userData.name}</Title>
            <Caption style={styles.caption, {color: theme.text}}>{userData.email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Ionicons 
          name='map'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <ThemedText>Malaysia</ThemedText>
        </View>
        <View style={styles.row}>
          <Ionicons 
          name='mail'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <ThemedText>{userData.email}</ThemedText>
        </View>
        <View style={styles.row}>
          <Ionicons 
          name='call'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <ThemedText>{userData.phoneNumber}</ThemedText>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd', 
          borderRightWidth: 1
          }]}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>10</ThemedText>
          <ThemedText>Trips</ThemedText>
        </View>
        <View style={styles.infoBox}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>7</ThemedText>
          <ThemedText>Wishlists</ThemedText>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity 
        style={[ExternalStyles.button, {width: "60%"}]}
        onPress= {handleLogout}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>Log Out</Text>                     
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  profileSection: {
    backgroundColor: 'grey',
    height: 100,
    width: '100%',
  },
  userInfo: {
    marginBottom: 25,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caption: {

  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  infoBoxWrapper: {
    borderTopColor: '#dddddd',
    borderBottomColor: '#dddddd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 100,


  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {

  },
  menuItem: {

  },
  menuItemText: {

  },


})

export default Profile;