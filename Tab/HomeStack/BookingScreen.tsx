import { View, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calendar from '../../components/Calendar';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';
import BackButton from '../../components/BackButton';
import GuestSelector from '../../components/GuestSelector';
import MyButton from '../../components/MyButton';
import { ThemeContext } from '../../util/ThemeManager';
import ThemedText from '../../components/ThemedText';

type Props = StackScreenProps<RootStackParamList, 'BookingScreen'>;

const BookingScreen = ({route, navigation}: Props) => {
  const {property, getUserId} = route.params;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numGuests, setNumGuests] = useState(1);

  const { theme } = useContext(ThemeContext);
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
    <ScrollView style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
      <View style={ExternalStyles.backButtonContainer}>
          <BackButton/>
       </View>
       
      <View style={[ExternalStyles.sectionContainer, {paddingTop: 25}]}>
        <ThemedText style={ExternalStyles.titleText}>You are now booking: {property.name}</ThemedText>
      </View>

      <View style={ExternalStyles.ContainerWithUnderline}>
        <ThemedText style={ExternalStyles.sectionTitle}>Please Pick Your Date</ThemedText>
            <Calendar onDateChange={handleDateChange}/>

            {startDate && (
                <View style={ExternalStyles.selectedsectionContainer}>
                    <Ionicons name={'calendar'} size={22} marginRight={5}/>    
                    <ThemedText style={ExternalStyles.date}>{startDate.toDateString()} - {endDate?.toDateString()}</ThemedText>
                </View>
            )}

      </View>
          
      <View style={ExternalStyles.ContainerWithUnderline}>
        <ThemedText style={ExternalStyles.sectionTitle}>Please Select Number of Guests</ThemedText>
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
         
          navigation.navigate('ReviewBookingScreen', {
            property, startDate: startDate.toISOString(), endDate: endDate.toISOString(), numGuests, getUserId: getUserId})
        }}/>
      </View>
    </ScrollView>
  )
}

export default BookingScreen;
