import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

type PropertyProps = {
    name: string;
    location: string;
    price: string;
    images: any;
    onPress: () => void;
}


const PropertyCard = ({name, location, price, images, onPress}: PropertyProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.imageWrapper}>
            <Image source={images} style={styles.stayImage}/>
        </View>
        <View style={styles.contentContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.price}>RM{price}/night</Text>

        </View>
    </TouchableOpacity>
  )
}

export default PropertyCard;


const styles = StyleSheet.create({
    container: {
        width: "95%",
        height: 200,
        elevation: 5,
        borderRadius: 10,
        marginVertical: 7,
        backgroundColor: '#fff',
        alignSelf: 'center',
        
    },
    imageWrapper: {
        borderRadius: 10,
        overflow: "hidden",
        
    },
    stayImage: {
        height: 130,
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    contentContainer: {
        padding: 5,
    },

    name: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold'
    },
    price: {
        color: "#ff5a5f",
        fontFamily: 'Montserrat-Bold',
    },
    location: {
        color: 'grey',
        fontFamily: 'Montserrat-Medium'
    }
})