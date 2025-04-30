import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ExternalStyles } from '../Styles'

const MyButton = ({title, onPress, textStyle}: any) => {
  return (
    <TouchableOpacity style={ExternalStyles.button} onPress={onPress}>
        <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default MyButton