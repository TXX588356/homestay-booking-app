import React, { useContext} from 'react';
import { View, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
import MyButton from '../../components/MyButton';
import BackButton from '../../components/BackButton';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';
import BookingSummary from '../../components/BookingSummary';
import ThemedText from '../../components/ThemedText';
import { ThemeContext } from '../../util/ThemeManager';


type Props = StackScreenProps<RootStackParamList, 'ReviewBookingScreen'>;

const ReviewBookingScreen = ({route, navigation}: Props) => {
  const { theme } = useContext(ThemeContext);
  

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
    <ScrollView style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
    <View style={[ExternalStyles.backButtonContainer, {backgroundColor: theme.background}]}>
      <BackButton/>
    </View>

    <View style={[ExternalStyles.ContainerWithUnderline, {paddingTop: 25, backgroundColor: theme.background}]}>
        <ThemedText style={ExternalStyles.titleText}>Review and Continue</ThemedText>
      </View>

      <BookingSummary
        propertyName={property.name}
        pricePerNight={property.price}
        startDate={startDateObj}
        endDate={endDateObj}
        numGuests={numGuests}
        numOfDays={numOfDays}
      />

        
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
