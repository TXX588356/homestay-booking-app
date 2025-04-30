import { View, Text, Button } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { ExternalStyles } from '../../Styles'

const TripScreen = ({route, navigation}: any) => {
  return (
    <ScrollView style={ExternalStyles.container}>
      <Text>TripScreen</Text>
    </ScrollView>
  )
}

export default TripScreen