import { View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useState, useCallback} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { ExternalStyles } from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import BackButton from '../components/BackButton';
import property from '../allProperties.json';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load current user and fetch wishlist
  const fetchWishlist = () => {
    AsyncStorage.getItem('currentUser')
      .then((userString) => {
        if (userString) {
          const user = JSON.parse(userString);
          
          fetch(`http://10.0.2.2:5000/api/wishlist/user/${user.id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
              }
              return response.json();
            })
            .then((data) => {
              setWishlist(data);
            })
            .catch((error) => {
              console.error('Error fetching wishlist:', error);
            })
            .finally(() => {
              setLoading(false);
            });
        } else {
          console.log('No user found in AsyncStorage');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error reading AsyncStorage:', error);
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchWishlist();
    }, [])
  );

  // To return the object of property details from json file
  const getPropertyDetails = (propertyId) => {
    for (let category in property) {
      const place = property[category].find(p => p.id === propertyId);
      if (place) return place;
    }
    return null;
  };

  if (loading) return <LoadingIndicator/>;
  
  return (
    <View style={ExternalStyles.container}>
      <View style={ExternalStyles.backButtonContainer}>
        <BackButton/>
      </View>

      <Text>Wishlist Screen</Text>

      {wishlist.length === 0 ? <View><Text>No wishlist added</Text></View>: null}
    
          <FlatList
            style={{marginTop: 40}}
            data={wishlist}
            keyExtractor={(item) => item.propertyID.toString()}
            renderItem={({ item }) => {
    
              const property = getPropertyDetails(item.propertyID);
              
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 15,
                    backgroundColor: '#f0f0f0',
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{property.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
    </View>
  )
}

export default Wishlist;
