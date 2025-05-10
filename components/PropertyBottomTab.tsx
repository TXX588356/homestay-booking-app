import { View, Text, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import config from '../config';
import { ThemeContext } from '../util/ThemeManager';
import ThemedText from './ThemedText';
import { ExternalStyles } from '../Styles';

type Props = {
    propertyData: any,
    addToWishlist: (item: any) => void;
    getUserId: () => any;
};

const PropertyBottomTab = ({propertyData, addToWishlist, getUserId}: Props) => {
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);
    const { theme } = useContext(ThemeContext);

    const fetchWishlistItemFromDB = async () => {
      const userID = await getUserId();
      const propertyID = String(propertyData.id);

      fetch(`${config.settings.wishlistServerPath}/api/wishlist/user/${userID}/property/${propertyID}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (Object.keys(data).length !== 0) {
            // Current property is saved as wishlist in the database
            setLiked(true);
            console.log('Fetched wishlist item from database:', data);
          } else {
            console.log("Fetched wishlist: This property is not in user's wishlist");
          }
        })
        .catch((error) => {
          console.error('Error fetching wishlist item:', error);
        })
      };
      
    useEffect(() => {
      fetchWishlistItemFromDB()
    }, []);

    const handleReserve = () => {
      navigation.navigate('BookingScreen', {property: propertyData, getUserId: getUserId});
    };

    const handlePress = () => {
        setLiked(!liked);

        if(!liked) {
            addToWishlist(propertyData);
            saveWishlistToDB();
            ToastAndroid.show('Added to Wishlist', ToastAndroid.LONG);
        } else {
            removeWishlistFromDB();
            ToastAndroid.show('Removed from Wishlist', ToastAndroid.LONG);
        }
    };

    const saveWishlistToDB = async () => {
      const userID = await getUserId();
      const propertyID = String(propertyData.id);
      
      fetch(`${config.settings.wishlistServerPath}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID: userID, propertyID: propertyID}),
      })
      .then((response) => response.json())
      .then((data) => {
          console.log('Wishlist added to database:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    };

    const removeWishlistFromDB = async () => {
      const userID = await getUserId();
      const propertyID = String(propertyData.id);

      fetch(`${config.settings.wishlistServerPath}/api/wishlist`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userID: userID, propertyID: propertyID}),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Wishlist removed from database:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
    };

    return (
        <View style={[ExternalStyles.bottomContainer, {backgroundColor: theme.background}]}>
            <View style={ExternalStyles.innerContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable onPress={handlePress}>
                        <Ionicons
                        name={liked ? 'heart' : 'heart-outline'}
                        color={liked ? 'red' : 'grey'}
                        size={24}
                        />
                    </Pressable>
                    <ThemedText style={[{marginLeft: 10, fontSize: 18, fontWeight: 'bold'}]}>RM{propertyData.price}</ThemedText>
                    <ThemedText style={{marginLeft: 5, marginTop: 6}}>per night</ThemedText>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20, justifyContent: 'center', alignItems: 'center',}}>
                    <TouchableOpacity style={ExternalStyles.bookButton} onPress={handleReserve}>
                        <Text style={ExternalStyles.buttonText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


  )
}

export default PropertyBottomTab;
