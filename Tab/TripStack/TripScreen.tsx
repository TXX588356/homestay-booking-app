import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../../components/LoadingIndicator';
import BackButton from '../../components/BackButton';
import { ExternalStyles } from '../../Styles';
import property from '../../allProperties.json';
import config from "../../config";

const TripScreen = ({ navigation }: any) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load current user and fetch bookings
  const fetchTrips = () => {
    AsyncStorage.getItem('currentUser')
      .then((userString) => {
        if (userString) {
          const user = JSON.parse(userString);
          
          fetch(`${config.settings.serverPath}/api/bookingHistory/user/${user.id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to fetch bookings');
              }
              return response.json();
            })
            .then((data) => {
              setBookings(data);
            })
            .catch((error) => {
              console.error('Error fetching bookings:', error);
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
      fetchTrips();
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
      <Text style={[ExternalStyles.headerText,{ marginBottom: 15, marginTop: 35, padding:10 }]}>My Trips</Text>

      {bookings.length === 0 ? <View><Text>No record found</Text></View>: null}

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.bookingID.toString()}
        renderItem={({ item }) => {

          const property = getPropertyDetails(item.propertyID);
          
          return (
            <TouchableOpacity
              style={ExternalStyles.ContainerWithUnderline}
              onPress={() => navigation.navigate('TripDetails', { booking: item, property: property})}
            >
              <View>
                <Text style={ExternalStyles.sectionTitle}>{property.name}</Text>
                <Text style={{ color: '#555' }}>{property.location}</Text>
                <Text style={{ color: '#555' }}>
                  From: {item.startDate} → To: {item.endDate}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TripScreen;


