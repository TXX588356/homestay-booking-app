import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { ExternalStyles } from '../../Styles';
import BackButton from '../../components/BackButton';
import { ThemeContext } from '../../util/ThemeManager';
import ThemedText from '../../components/ThemedText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMapLink } from 'react-native-open-maps';

const TripDetails = ({route, navigation}: any) => {
  const { theme } = useContext(ThemeContext);

  const {booking, property} = route.params;
  const serviceFees = booking.numDays * property.price * 0.10;
  const totalPrice = (booking.numDays * property.price) + serviceFees;
  const paymentMethod = booking.paymentMethod === 'card' ? "Credit Card" : "FPX Online Banking";

  const openMap = (propertyName: string) => { 
          const mapLink = createMapLink({ provider: 'google', query: propertyName });
          Linking.openURL(mapLink);
      }

  return (
    <ScrollView style={{backgroundColor: theme.background, flex: 1}}>
      <View style={ExternalStyles.backButtonContainer}>
        <BackButton/>
      </View>

      <View style={[ExternalStyles.ContainerWithUnderline, {backgroundColor: 'lightgrey', padding: 10, marginTop: 60}]}>
        <Text style={ExternalStyles.sectionTitle}>Booking Details</Text>
        <Text style={{marginVertical: 5}}>{property.name}</Text>
        <Text style={{marginVertical: 5}}>
          {booking.startDate} ~ {booking.endDate} ({booking.numDays} nights)
        </Text>
        <Text style={{marginVertical: 5}}>Guests: {booking.numGuests} {'\n\n'}</Text>
      
        <Text style={ExternalStyles.sectionTitle}>Price Breakdown</Text>
        <View style={ExternalStyles.priceRow}>
          <Text>RM{property.price} x {booking.numDays} nights</Text>
          <Text>RM{(property.price * booking.numDays).toFixed(2)}</Text>
        </View>
        <View style={ExternalStyles.priceRow}>
          <Text>Service Fee (10%)</Text>
          <Text>RM{(serviceFees).toFixed(2)}</Text>
        </View>
        <View style={ExternalStyles.totalRow}>
          <Text style={ExternalStyles.sectionTitle}>Total</Text>
          <Text style={ExternalStyles.sectionTitle}>RM{totalPrice.toFixed(2)}</Text>
        </View>
      
      </View>
      
      <View style={ExternalStyles.ContainerWithUnderline}>
          <ThemedText style={ExternalStyles.sectionTitle}>Payment Method</ThemedText>
          <ThemedText style={{fontFamily: 'Montserrat-Medium'}}>{paymentMethod}</ThemedText>
      </View>

      <View style={ExternalStyles.ContainerWithUnderline}>
          <ThemedText style={ExternalStyles.sectionTitle}>Location Address</ThemedText>
          <ThemedText style={{fontFamily: 'Montserrat-Medium'}}>{property.address}</ThemedText>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                <TouchableOpacity style={[ExternalStyles.button, {width: '65%', flexDirection: 'row', justifyContent: 'center'}]} 
                    onPress={() => openMap(property.name)}>
                    <Ionicons name="location-outline" size={22} color="white" />
                      <Text style={[ExternalStyles.buttonText, {marginHorizontal: 8}]}>View in Map</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
}

export default TripDetails;
