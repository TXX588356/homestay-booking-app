import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ExternalStyles } from '../Styles'
import {Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../db-service';
import { useIsFocused } from '@react-navigation/native'
import { ThemeContext } from '../util/ThemeManager';
import ThemedText from '../components/ThemedText';
import config from '../config';

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  
  const navigation = useNavigation();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [numTrips, setNumTrips] = useState(0);
  const [numWishlist, setNumWishlist] = useState(0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUser = async() => {
      try{
        setLoading(true);
        const userDataString = await AsyncStorage.getItem('currentUser');

        if(userDataString) {
          const userData = JSON.parse(userDataString);
          setUserData(userData);
        }
      }catch(error){
        console.error("Error in fetching user data: ", error);
      }finally{
        setLoading(false);
      }
    }

    if(isFocused) {
      fetchUser();
    }
  }, [isFocused])

  // Start fetching only after the userData is set
  useEffect(() => {
    if (userData) {
      fetchNumWishlist();
      fetchNumTrips();
    }
  }, [userData]);

 const fetchNumWishlist = () => {
    setLoading(true);
    fetch(`${config.settings.wishlistServerPath}/api/wishlist/user/${userData.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch num of wishlist');
        }
        return response.json();
      })
      .then((data) => {
        setNumWishlist(data.length);
      })
      .catch((error) => {
        console.error('Error fetching num of wishlist:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchNumTrips = () => {
    setLoading(true);
    fetch(`${config.settings.bookingServerPath}/api/bookingHistory/user/${userData.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch num of trips');
        }
        return response.json();
      })
      .then((data) => {
        setNumTrips(data.length);
      })
      .catch((error) => {
        console.error('Error fetching num of trips:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('currentUser');
      navigation.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
      
    }catch(error){
      console.error("Error during logout: ", error);
    }
  }

  if(loading) {
    return (
      <View style={[ExternalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#ff5a5f" />
      </View>
    )
  }

  return (
    <View style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
      <View style={{marginBottom: 25, paddingHorizontal: 30,}}>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Avatar.Image
            source={require('../img/cat.png')}
            size={80}
          />
          <View style={{marginLeft: 25}}>
            <Title style={[{fontSize: 16, fontWeight: 'bold',marginTop: 10, color: theme.text}]}>{userData.name}</Title>
            <Caption style={{color: theme.text}}>{userData.email}</Caption>
          </View>
        </View>
      </View>

      <View style={{ marginBottom: 25, paddingHorizontal: 30,}}>
        <View style={ExternalStyles.row}>
          <Ionicons 
          name='map'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <ThemedText>Malaysia</ThemedText>
        </View>
        <View style={ExternalStyles.row}>
          <Ionicons 
          name='mail'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <ThemedText>{userData.email}</ThemedText>
        </View>
        <View style={ExternalStyles.row}>
          <Ionicons 
          name='call'
          size={24}
          color="#777777"
          marginRight={20}
          />
          <ThemedText>{userData.phoneNumber}</ThemedText>
        </View>
      </View>

      <View style={ExternalStyles.infoBoxWrapper}>
        <TouchableOpacity 
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.navigate('Home', { screen: 'Trip' });
            } else {
              navigation.navigate('Trip', { screen: 'TripScreen' });
            }
          }}
          style={[ExternalStyles.infoBox, {
          borderRightColor: '#dddddd', 
          borderRightWidth: 1
          }]}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>{numTrips}</ThemedText>
          <ThemedText>Trips</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={ExternalStyles.infoBox} onPress={() => navigation.navigate('Home', { screen: 'Wishlist' })}>
          <ThemedText style={{fontSize: 20, fontWeight: 'bold'}}>{numWishlist}</ThemedText>
          <ThemedText>Wishlists</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center'}}>
        <TouchableOpacity 
        style={[ExternalStyles.button, {width: "60%"}]}
        onPress= {handleLogout}
        >
          <Text style={{color: 'white', fontWeight: 'bold'}}>Log Out</Text>                     
        </TouchableOpacity>
      </View>
      
    </View>
  )
}
export default Profile;
