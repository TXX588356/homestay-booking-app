import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
    propertyData: any,
    addToWishlist: (item: any) => void;
};

const PropertyBottomTab = ({propertyData, addToWishlist}: Props) => {
    const navigation = useNavigation();
    const [liked, setLiked] = useState(false);

    const fetchWishlistItemFromDB = () => {
        AsyncStorage.getItem('currentUser')
          .then((userString) => {
            if (userString) {
              const user = JSON.parse(userString);
              const userID = parseInt(user.id);
              const propertyID = String(propertyData.id);

              fetch(`http://10.0.2.2:5000/api/wishlist/user/${userID}/property/${propertyID}`)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  console.log('Fetched wishlist item from database:', data);
                  if (Object.keys(data).length !== 0) {
                    // Current property is saved as wishlist in the database
                    setLiked(true);
                  }
                })
                .catch((error) => {
                  console.error('Error fetching wishlist item:', error);
                })
            } else {
              console.log('No user found in AsyncStorage');
            }
          })
          .catch((error) => {
            console.error('Error reading AsyncStorage:', error);
          });
      };
      
      
      
    useEffect(() => {
        fetchWishlistItemFromDB()
        }, []);

    const handleReserve = () => {
        navigation.navigate('BookingScreen', {property: propertyData});
    };

    const handlePress = () => {
        setLiked(!liked);

        if(!liked) {
            addToWishlist(propertyData);
            saveWishlistToDB();
        } else {
            removeWishlistFromDB();
        }
    };
      
    const saveWishlistToDB = () => {
      
        AsyncStorage.getItem('currentUser')
        .then((userString) => {
          if (userString) {
            const user = JSON.parse(userString);
            const userID = user.id;
  
            fetch('http://10.0.2.2:5000/api/wishlist', {  // Replace with your LAN IP!
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({userID: userID, propertyID: propertyData.id}),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Wishlist added to database:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
        }})
        .catch((error) => {
          console.error('Error reading AsyncStorage:', error);
        });
    };

      const removeWishlistFromDB = () => {
      
        AsyncStorage.getItem('currentUser')
        .then((userString) => {
          if (userString) {
            const user = JSON.parse(userString);
            const userID = user.id;
  
            fetch('http://10.0.2.2:5000/api/wishlist', {  // Replace with your LAN IP!
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({userID: userID, propertyID: propertyData.id}),
            })
              .then((response) => response.json())
              .then((data) => {
                console.log('Wishlist removed from database:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              })
        }})
        .catch((error) => {
          console.error('Error reading AsyncStorage:', error);
        });
    };

    return (
        <View style={styles.bottomContainer}>
            <View style={styles.innerContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Pressable onPress={handlePress}>
                        <Ionicons
                        name={liked ? 'heart' : 'heart-outline'}
                        color={liked ? 'red' : 'grey'}
                        size={24}
                        />
                    </Pressable>
                    <Text style={[{marginLeft: 10}, styles.textStyle]}>RM{propertyData.price}</Text>
                    <Text style={{marginLeft: 5, marginTop: 6, color: 'black'}}>per night</Text>
                </View>
                <View style={{ flexDirection: 'row', marginRight: 20, justifyContent: 'center', alignItems: 'center',}}>
                    <TouchableOpacity style={styles.bookButton} onPress={handleReserve}>
                        <Text style={styles.buttonText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


  )
}

const styles = StyleSheet.create({
    bottomContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    innerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    },
    bookButton: {
        height: 35,
        backgroundColor: '#FF385C',
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    buttonText: {
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'Montserrat-Regular',

    },
})

export default PropertyBottomTab;
