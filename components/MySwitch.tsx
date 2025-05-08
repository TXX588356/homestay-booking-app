import { View, Switch } from 'react-native'
import React, { useContext} from 'react'
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
