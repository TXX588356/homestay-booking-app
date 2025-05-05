import React from 'react';
import { View, Text } from 'react-native';
import { ExternalStyles } from '../Styles';

type BookingSummaryProps = {
  propertyName: string;
  pricePerNight: number;
  startDate: Date;
  endDate: Date;
  numGuests: number;
  numOfDays: number;
};

const BookingSummary = ({
  propertyName,
  pricePerNight,
  startDate,
  endDate,
  numGuests,
  numOfDays,
}: BookingSummaryProps) => {
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const serviceFees = numOfDays * pricePerNight * 0.1;
  const totalPrice = numOfDays * pricePerNight + serviceFees;

  return (
    <View style={[ExternalStyles.ContainerWithUnderline, { backgroundColor: 'lightgrey', padding: 10 }]}>
      <Text style={ExternalStyles.sectionTitle}>Booking Details</Text>
      <Text style={{ marginVertical: 5 }}>{propertyName}</Text>
      <Text style={{ marginVertical: 5 }}>
        {formatDate(startDate)} ~ {formatDate(endDate)} ({numOfDays} nights)
      </Text>
      <Text style={{ marginVertical: 5 }}>Guests: {numGuests}{'\n\n'}</Text>

      <Text style={ExternalStyles.sectionTitle}>Price Breakdown</Text>
      <View style={ExternalStyles.priceRow}>
        <Text>RM{pricePerNight} x {numOfDays} nights</Text>
        <Text>RM{(pricePerNight * numOfDays).toFixed(2)}</Text>
      </View>
      <View style={ExternalStyles.priceRow}>
        <Text>Service Fee (10%)</Text>
        <Text>RM{serviceFees.toFixed(2)}</Text>
      </View>
      <View style={ExternalStyles.totalRow}>
        <Text style={ExternalStyles.sectionTitle}>Total</Text>
        <Text style={ExternalStyles.sectionTitle}>RM{totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default BookingSummary;