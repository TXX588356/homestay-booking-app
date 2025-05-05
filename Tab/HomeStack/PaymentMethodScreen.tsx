import React, { useContext, useMemo, useRef, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, Button,TextInput, HelperText } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
import MyButton from '../../components/MyButton';
import BackButton from '../../components/BackButton';
import { RadioButton } from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';
import config from "../../config";
import { ThemeContext } from '../../util/ThemeManager';
import ThemedText from '../../components/ThemedText';


type Props = StackScreenProps<RootStackParamList, 'PaymentMethod'>;

const PaymentMethodScreen = ({route, navigation}: Props) => {
    const { theme } = useContext(ThemeContext);

    const [selectedMethod, setSelectedMethod] = useState();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  
    const onOpen = () => {
      bottomSheetRef.current?.expand();
    };

    const validateCardForm =() => {
      const newErrors: Record<string, string> = {};
      if(!cardName){
        newErrors.cardName = 'Cardholder name is required';
      }

      if (!cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }

      if (!expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      } else {
        const [month, year] = expiryDate.split('/');
        const currentYear = new Date().getFullYear() % 100; // Get last 2 digits
        const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
        

        const expMonth = parseInt(month, 10);
        const expYear = parseInt(year, 10);
      
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
            newErrors.expiryDate = 'Card has expired';
        }
      }

      if (!cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    const validateFPXForm = () => {
      const newErrors: Record<string, string> = {};
      
      if (!selectedBank) {
        newErrors.bank = 'Please select a bank';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };


    const handlePayment = () => {
      if (selectedMethod === 'card') {
        if (validateCardForm()) {
            saveBookingDetailsToDB();
            Alert.alert("Payment Successful", "Redirecting to home screen...", [{text: "OK", onPress: () => navigation.navigate('HomeScreen')}])
            setTimeout(() => {navigation.navigate("HomeScreen")}, 3000);
        }
      } else if (selectedMethod === 'fpx') {
        if (validateFPXForm()) {
            saveBookingDetailsToDB();
            Alert.alert("Payment Successful", "Redirecting to home screen...", [{text: "OK", onPress: () => navigation.navigate('HomeScreen')}])
            setTimeout(() => {navigation.navigate("HomeScreen")}, 3000);
        }
      }
    };

    const saveBookingDetailsToDB = () => {
      
      AsyncStorage.getItem('currentUser')
      .then((userString) => {
        if (userString) {
          const user = JSON.parse(userString);
          const userID = user.id;
          const {propertyID, startDate, endDate, numGuests, numDays} = route.params;

          const bookingData = {
            userID: parseInt(userID),
            propertyID,
            startDate,
            endDate,
            numGuests,
            numDays,
            paymentMethod: selectedMethod
          };

          fetch(`${config.settings.serverPath}/api/bookingHistory`, {  // Replace with your LAN IP!
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Booking created:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            })
      }})
      .catch((error) => {
        console.error('Error reading AsyncStorage:', error);
      });
    };

    const renderContent = () => {
        switch (selectedMethod) {
            case 'card':
                return(
                    <View style={[ExternalStyles.sectionContainer]}>
                        <Text style={ExternalStyles.sectionTitle}>Add Card Details</Text>

                        <TextInput
                          label="Card Holder Name"
                          value={cardName}
                          onChangeText={setCardName}
                          style={{ marginBottom: 10 }}
                          error={!!errors.cardName}
                        />
                        <HelperText type="error" visible={!!errors.cardName}>
                          {errors.cardName}
                        </HelperText>

                        <TextInput
                          label="Card Number"
                          value={cardNumber}
                          onChangeText={setCardNumber}
                          keyboardType="numeric"
                          maxLength={19}
                          style={{ marginBottom: 10 }}
                          error={!!errors.cardNumber}
                        />
                        <HelperText type="error" visible={!!errors.cardNumber}>
                          {errors.cardNumber}
                        </HelperText>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View style={{ width: '48%' }}>
                              <TextInput
                                  label="Expiry Date (MM/YY)"
                                  value={expiryDate}
                                  onChangeText={setExpiryDate}
                                  maxLength={5}
                                  style={{ marginBottom: 10 }}
                                  error={!!errors.expiryDate}
                              />
                              <HelperText type="error" visible={!!errors.expiryDate}>
                                  {errors.expiryDate}
                              </HelperText>
                          </View>
                          <View style={{ width: '48%' }}>
                              <TextInput
                                  label="CVV"
                                  value={cvv}
                                  onChangeText={setCvv}
                                  keyboardType="numeric"
                                  maxLength={4}
                                  secureTextEntry
                                  style={{ marginBottom: 10 }}
                                  error={!!errors.cvv}
                              />
                              <HelperText type="error" visible={!!errors.cvv}>
                                  {errors.cvv}
                              </HelperText>
                          </View>
                        </View>

                        
                        <MyButton
                         title="Confirm Payment"
                         textStyle={{ color: 'white' }}
                         onPress={() => {
                          handlePayment();
                        }}
                          />
                        </View>
                )
            case 'fpx':
            return(
                <View style={ExternalStyles.sectionContainer}>
                    <Text style={ExternalStyles.sectionTitle}>Select Your Bank</Text>
                    <RadioButton.Group onValueChange={value => setSelectedBank(value)} value={selectedBank}>
                      <RadioButton.Item
                          label="Maybank"
                          value="maybank"
                          position="trailing"
                          labelStyle={{ fontSize: 16 }}
                          color='black'
                      />
                      <RadioButton.Item
                          label="CIMB Bank"
                          value="cimb"
                          position="trailing"
                          labelStyle={{ fontSize: 16 }}
                          color='black'
                      />
                      <RadioButton.Item
                          label="Public Bank"
                          value="public"
                          position="trailing"
                          labelStyle={{ fontSize: 16 }}
                          color='black'
                      />
                      <RadioButton.Item
                          label="RHB Bank"
                          value="rhb"
                          position="trailing"
                          labelStyle={{ fontSize: 16 }}
                          color='black'
                      />
                  </RadioButton.Group>
                   
                    <MyButton
                        title="Confirm Payment"
                        textStyle={{ color: 'white' }}
                        onPress={handlePayment}
                    />
                  </View>
            );
            default:
              return (
                <View style={ExternalStyles.sectionContainer}>
                  <Text>Please select a payment method above.</Text>
                </View>
              );
        }
       
    };

  return (
    <>
    <ScrollView style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
        <View style={ExternalStyles.backButtonContainer}>
        <BackButton/>
        </View>
        <View style={[ExternalStyles.sectionContainer, {paddingTop: 25}]}>
          <ThemedText style={ExternalStyles.headerText}>Add a Payment Method</ThemedText>
        </View>

        <RadioButton.Group onValueChange={value => setSelectedMethod(value)} value={selectedMethod}>
          <RadioButton.Item
            label="Credit / Debit Card"
            value="card"
            position="trailing"
            labelStyle={{ fontSize: 16, color: theme.text }}
            color= {theme.text}
          />
          
          <RadioButton.Item
            label="FPX Online Banking"
            value="fpx"
            position="trailing"
            labelStyle={{ fontSize: 16, color: theme.text }}
            color= {theme.text}
          />
        </RadioButton.Group>

        

        <View style={ExternalStyles.sectionContainer}>
        <MyButton
          title="Next"
          textStyle={{ color: 'white', fontWeight: 'bold' }}
          onPress={onOpen}
        />
      </View>
      </ScrollView>

      

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        {renderContent()}
      </BottomSheet>
    </>
    
  )
}

export default PaymentMethodScreen;
