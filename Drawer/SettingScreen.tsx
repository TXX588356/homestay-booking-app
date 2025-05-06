import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Appearance, ColorSchemeName } from 'react-native'
import { ExternalStyles } from '../Styles'
import MySwitch from '../components/MySwitch'
import { ThemeContext } from '../util/ThemeManager'
import AsyncStorage from '@react-native-async-storage/async-storage';



const SettingScreen = () => {
  const { theme } = useContext(ThemeContext);
  

  return (
    <View style={{flex: 1}}>
      <View style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
        <MySwitch
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


