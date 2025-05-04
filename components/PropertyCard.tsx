import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ExternalStyles } from '../Styles';

type PropertyProps = {
    name: string;
    location: string;
    price: string;
    images: any;
    onPress: () => void;
}


const PropertyCard = ({name, location, price, images, onPress}: PropertyProps) => {
  return (
    <TouchableOpacity style={ExternalStyles.propertyCardContainer} onPress={onPress}>
        <View style={{borderRadius: 10, overflow: "hidden"}}>
            <Image source={images} style={ExternalStyles.stayImage}/>
        </View>
        <View style={{padding: 5}}>
            <Text style={ExternalStyles.propertyName}>{name}</Text>
            <Text style={ExternalStyles.propertyLocation}>{location}</Text>
            <Text style={ExternalStyles.propertyPrice}>RM{price}/night</Text>

        </View>
    </TouchableOpacity>
  )
}

export default PropertyCard;

