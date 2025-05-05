import { Text, TextProps, TextStyle } from 'react-native';
import React, { useContext } from 'react'
import { ThemeContext } from '../util/ThemeManager';

const ThemedText = ({children, style, ...props}: any) => {
  const {theme} = useContext(ThemeContext);
  return (
    <Text style={[{color: theme.text}, style]}>
      {children}
    </Text>
  )
}

export default ThemedText