import React, { useMemo, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
import MyButton from '../../components/MyButton';
import BackButton from '../../components/BackButton';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';


type Props = StackScreenProps<RootStackParamList, 'ReviewBookingScreen'>;

const ReviewBookingScreen = ({route, navigation}: Props) => {

  const {property, startDate, endDate, numGuests} = route.params;
  let numOfDays;
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
           
  numOfDays = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24));
  if(startDate == endDate) {
    numOfDays = 1;
  }
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const loading = useTransitionLoading(navigation);

  const serviceFees = numOfDays * property.price * 0.10;
  const totalPrice = (numOfDays * property.price) + serviceFees;

  if(loading) {
    return <LoadingIndicator/>;
  }

  return (
    <ScrollView style={ExternalStyles.container}>
    <View style={ExternalStyles.backButtonContainer}>
      <BackButton/>
    </View>

    <View style={[ExternalStyles.ContainerWithUnderline, {paddingTop: 25}]}>
        <Text style={ExternalStyles.titleText}>Review and Continue</Text>
      </View>

      <View style={[ExternalStyles.ContainerWithUnderline, {backgroundColor: 'lightgrey', padding: 10,}]}>
        <Text style={ExternalStyles.sectionTitle}>Booking Details</Text>
        <Text style={{marginVertical: 5}}>{property.name}</Text>
        <Text style={{marginVertical: 5}}>
        {formatDate(startDateObj)} ~ {formatDate(endDateObj)} ({numOfDays} nights)
        </Text>
        <Text style={{marginVertical: 5}}>Guests: {numGuests} {'\n\n'}</Text>

        <Text style={ExternalStyles.sectionTitle}>Price Breakdown</Text>
        <View style={ExternalStyles.priceRow}>
          <Text>RM{property.price} x {numOfDays} nights</Text>
          <Text>RM{(property.price * numOfDays).toFixed(2)}</Text>
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

        
      <View style={ExternalStyles.sectionContainer}>
        <MyButton
          title="Next"
          textStyle={{ color: 'white', fontWeight: 'bold' }}
          onPress={() => navigation.navigate('PaymentMethod', {
            propertyID: property.id, startDate: formatDate(startDateObj), endDate: formatDate(endDateObj), 
            numGuests: numGuests, numDays: numOfDays
          })}
        />
      </View>
    </ScrollView>
  )
}

export default ReviewBookingScreen;
