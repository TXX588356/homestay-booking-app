import { View, Text, StyleSheet, Appearance, ColorSchemeName, Switch } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../util/ThemeManager'
import ThemedText from './ThemedText';
import { ExternalStyles } from '../Styles';

const MySwitch = () => {
  const {themeName, toggleTheme} = useContext(ThemeContext);


  return (
    <View style={[{marginTop: 10, marginBottom: 20, backgroundColor: themeName.background}]}>
      <View style={[{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: 'lightgrey', paddingVertical: 10}]}>
            <ThemedText style={[ExternalStyles.headerText, {paddingLeft: 20}]}>{themeName === 'light' ? 'Light Mode' : 'Dark Mode'}</ThemedText>
            <Switch
            value={themeName === 'dark'}
            onValueChange={toggleTheme}/>
      </View>
    </View>
    
  )
}


export default MySwitch;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 60,
    },
    switchLabel: {
      flex: 4,
      fontSize: 20,
      margin: 10,
    },
    switch: {
      flex: 1,
      margin: 10,
    },
  });
  