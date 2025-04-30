import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { ExternalStyles } from '../Styles';

const Wishlist = () => {
  return (
    <ScrollView style={ExternalStyles.container}>
      <Text>Wishlist Screen</Text>
    </ScrollView>
  )
}

export default Wishlist;