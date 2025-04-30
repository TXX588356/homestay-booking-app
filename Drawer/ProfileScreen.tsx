import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { ExternalStyles } from '../Styles'
import {Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';



 
const Profile = () => {
  const navigation = useNavigation();

  
  return (
    <View style={ExternalStyles.container}>
      <View style={styles.userInfo}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Avatar.Image
            source={require('../img/cat.png')}
            size={80}
          />
          <View style={{marginLeft: 25}}>
            <Title style={[styles.title, {marginTop: 10}]}>John Doe</Title>
            <Caption style={styles.caption}>john@gmail.com</Caption>
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
          <Text>Malaysia</Text>
        </View>
        <View style={styles.row}>
          <Ionicons 
          name='mail'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <Text>john@gmail.com</Text>
        </View>
        <View style={styles.row}>
          <Ionicons 
          name='call'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <Text>01234567890</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd', 
          borderRightWidth: 1
          }]}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>10</Text>
          <Text>Trips</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>7</Text>
          <Text>Wishlists</Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity 
        style={[ExternalStyles.button, {width: "60%"}]}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Auth'}],
          });
        }}
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