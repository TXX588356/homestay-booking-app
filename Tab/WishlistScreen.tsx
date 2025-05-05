import { View, Text, FlatList, TouchableOpacity} from 'react-native'
import React, {useState, useCallback} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { ExternalStyles } from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import BackButton from '../components/BackButton';
import property from '../allProperties.json';
import config from "../config";
import PropertyCard from '../components/PropertyCard';
import { RootStackParamList } from '../Types';
import { StackScreenProps } from '@react-navigation/stack';
import { imageMap } from '../imageMap';

export type Props = StackScreenProps<RootStackParamList, 'Wishlist'>;

const Wishlist = ({route, navigation}: Props) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load current user and fetch wishlist
  const fetchWishlist = () => {
    AsyncStorage.getItem('currentUser')
      .then((userString) => {
        if (userString) {
          const user = JSON.parse(userString);
          
          fetch(`${config.settings.serverPath}/api/wishlist/user/${user.id}`)
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
      if (place){
        const images = place.images.map(img => imageMap[img]);
        return {...place, images};
      }
    }
    return null;
  };

  if (loading) return <LoadingIndicator/>;
  
  return (
    <View style={ExternalStyles.container}>
      <View style={ExternalStyles.backButtonContainer}>
        <BackButton/>
      </View>

      
      {wishlist.length === 0 ?   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{fontSize: 30}}>No wishlist added</Text></View>: null}
    
          <FlatList
            style={{marginTop: 40}}
            data={wishlist}
            keyExtractor={(item) => item.propertyID.toString()}
            renderItem={({ item }) => {
    
              const property = getPropertyDetails(item.propertyID);
              
              return (
                <PropertyCard
                  key={property.id}
                  name={property.name}
                  location={property.location}
                  price={property.price}
                  images={property.images[0]}
                  onPress={() => navigation.navigate('PropertyDetails', {propertyId: property.id, data: property})}
                />
              );
            }}
          />
    </View>
  )
}

export default Wishlist;
