import React, { useState, useCallback, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import LoadingIndicator from '../../components/LoadingIndicator';
import BackButton from '../../components/BackButton';
import { ExternalStyles } from '../../Styles';
import property from '../../allProperties.json';
import config from "../../config";
import ThemedText from '../../components/ThemedText';
import { ThemeContext } from '../../util/ThemeManager';

const TripScreen = ({ navigation }: any) => {
  const { theme } = useContext(ThemeContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load current user and fetch bookings
  const fetchTrips = () => {
    AsyncStorage.getItem('currentUser')
      .then((userString) => {
        if (userString) {
          const user = JSON.parse(userString);
          
          fetch(`${config.settings.bookingServerPath}/api/bookingHistory/user/${user.id}`)
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
    <View style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
      <View style={ExternalStyles.backButtonContainer}>
        <BackButton/>
      </View>
      <ThemedText style={[ExternalStyles.headerText,{ marginBottom: 15, marginTop: 35, padding:10 }]}>My Trips</ThemedText>

      {bookings.length === 0 ? <View><ThemedText>No record found</ThemedText></View>: null}

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
                <ThemedText style={ExternalStyles.sectionTitle}>{property.name}</ThemedText>
                <ThemedText style={{ color: '#555' }}>{property.location}</ThemedText>
                <ThemedText style={{ color: '#555' }}>
                  From: {item.startDate} → To: {item.endDate}
                </ThemedText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TripScreen;


