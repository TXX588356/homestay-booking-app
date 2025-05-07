import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Appearance, ColorSchemeName } from 'react-native'
import { ExternalStyles } from '../Styles'
import MySwitch from '../components/MySwitch'
import { ThemeContext } from '../util/ThemeManager'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemedText from '../components/ThemedText'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MyButton from '../components/MyButton'



const SettingScreen = ({route, navigation}: any) => {
  const { theme } = useContext(ThemeContext);
  

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


