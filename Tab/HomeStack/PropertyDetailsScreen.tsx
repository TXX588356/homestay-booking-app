import { View, Text, Image, Button, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
export type Props = StackScreenProps<RootStackParamList, 'PropertyDetails'>;
import Carousel from '../../components/Carousel';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropertyBottomTab from '../../components/PropertyBottomTab';
import Calendar from '../../components/Calendar';

const { width } = Dimensions.get('window');


const PropertyDetailsScreen = ({route, navigation}: Props) => {
    const {data} = route.params;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (start: any, end: any) => {
        setStartDate(start);
        setEndDate(end);
    }

    
    return(
        <View style={styles.container}>
            <ScrollView style={ExternalStyles.container} contentContainerStyle={{paddingBottom: 100}} >
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
                <Carousel data={data.images}/>

                <View style={styles.propertyTitle}>
                    <Text style={styles.titleText}>{data.name}</Text>
                    <Text style={styles.subTitle}>{data.category} stay in {data.location}</Text>
                </View>

                <View style={styles.descContainer}>
                    <Text style={styles.sectionTitle}>About this place</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', color: 'black'}}>{data.description}</Text>

                </View>

                <View style={styles.amenitiesContainer}>
                    <Text style={styles.sectionTitle}>What this place offers</Text>
                    {data.amenities.map((amenity: string, index: number) => (
                        <Text key={index} style={{fontSize: 16, marginVertical: 2, lineHeight: 25, color: 'black', fontFamily: 'Montserrat-Medium'}}>- {amenity}</Text>
                    ))}
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.sectionTitle}>Pick your date</Text>
                    <Calendar onDateChange={handleDateChange}/>

                    {startDate && (
                        <View style={styles.selectedDateContainer}>
                            <Ionicons name={'calendar'} size={22} marginRight={5}/>    
                            <Text style={styles.date}>{startDate.toDateString()} - {endDate?.toDateString()}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <PropertyBottomTab
                propertyData={data}
                addToWishlist={(item) => {
                    console.log("Added to wishlist: ", item)
                }}/>
        </View>
        

       
    
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    propertyTitle: {
        alignItems: 'center',
    },
    titleText: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'Montserrat-Bold',
    },
    subTitle: {
        fontFamily: 'Montserrat-Medium'
    }, 
    amenitiesContainer: {
        margin: 20,
        paddingBottom: 10,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    sectionTitle: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Montserrat-Bold', 
   
    },
    dateContainer: {
        margin: 20,
    },
    selectedDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        borderColor: '#D3D3D3'
    },
    date: {
        color: 'black',
        fontFamily: 'Montserrat-Medium',
    },
    descContainer: {
        margin: 20,
        paddingBottom: 10,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1
    },
    backButtonContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
      },
      
      backButton: {
        backgroundColor: 'rgba(205, 192, 192, 0.5)',
        padding: 8,
        borderRadius: 20,
      },

})

export default PropertyDetailsScreen;