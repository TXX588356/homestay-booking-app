import { View, Text, Image, Button, Dimensions, StyleSheet, TouchableOpacity, ScrollViewComponent, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
import Carousel from '../../components/Carousel';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropertyBottomTab from '../../components/PropertyBottomTab';
import Calendar from '../../components/Calendar';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';
import BackButton from '../../components/BackButton';
import GuestSelector from '../../components/GuestSelector';
import MyButton from '../../components/MyButton';

type Props = StackScreenProps<RootStackParamList, 'BookingScreen'>;

const BookingScreen = ({route, navigation}: Props) => {
      const {property} = route.params;
      const [startDate, setStartDate] = useState<Date | null>(null);
      const [endDate, setEndDate] = useState<Date | null>(null);
      const [numGuests, setNumGuests] = useState(1);

      const loading = useTransitionLoading(navigation);



      if(loading) {
        return <LoadingIndicator/>;
      }

      const handleDateChange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
      }
      
      const handleGuestsChange = (guests: {adults: number; children: number; infants: number}) => {
        const totalGuests = guests.adults + guests.children + guests.infants;
        setNumGuests(totalGuests);
      }

    
  return (
    <ScrollView style={[ExternalStyles.container]}>
      <View style={ExternalStyles.backButtonContainer}>
          <BackButton/>
       </View>
       
      <View style={[ExternalStyles.sectionContainer, {paddingTop: 25}]}>
        <Text style={ExternalStyles.titleText}>You are now booking: {property.name}</Text>
      </View>

      <View style={ExternalStyles.ContainerWithUnderline}>
        <Text style={ExternalStyles.sectionTitle}>Please Pick Your Date</Text>
            <Calendar onDateChange={handleDateChange}/>

            {startDate && (
                <View style={ExternalStyles.selectedsectionContainer}>
                    <Ionicons name={'calendar'} size={22} marginRight={5}/>    
                    <Text style={ExternalStyles.date}>{startDate.toDateString()} - {endDate?.toDateString()}</Text>
                </View>
            )}

      </View>
          
       
      
      <View style={ExternalStyles.ContainerWithUnderline}>
        <Text style={ExternalStyles.sectionTitle}>Please Select Number of Guests</Text>
        <GuestSelector onGuestsChange={handleGuestsChange}/>
      </View>
      <View style={ExternalStyles.sectionContainer}>
        <MyButton 
        title="Proceed" 
        textStyle={{ color: 'white', fontWeight: 'bold' }}
        onPress={() => {
          if(!startDate || !endDate) {
            Alert.alert("Please select date before proceed.");
            return;
          }
         
          //console.log(numOfDays);
          //console.log(property.price);
          navigation.navigate('ReviewBookingScreen', {
            property, startDate: startDate.toISOString(), endDate: endDate.toISOString(), numGuests
          })
        }}/>
      </View>


    </ScrollView>
  )
}

export default BookingScreen