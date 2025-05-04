import { View, Text, Image, Button, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
export type Props = StackScreenProps<RootStackParamList, 'PropertyDetails'>;
import Carousel from '../../components/Carousel';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropertyBottomTab from '../../components/PropertyBottomTab';
import Calendar from '../../components/Calendar';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';
import BackButton from '../../components/BackButton';

const { width } = Dimensions.get('window');


const PropertyDetailsScreen = ({route, navigation}: Props) => {
    const {data} = route.params;

    const loading = useTransitionLoading(navigation);
         

    if(loading) {
        return <LoadingIndicator/>;
    }
    
    return(
        <View style={ExternalStyles.container}>
            <ScrollView style={ExternalStyles.container} contentContainerStyle={{paddingBottom: 100}} >
            <View style={ExternalStyles.backButtonContainer}>
                <BackButton/>
            </View>
                <Carousel data={data.images}/>

                <View style={ExternalStyles.propertyTitle}>
                    <Text style={ExternalStyles.titleText}>{data.name}</Text>
                    <Text style={ExternalStyles.subTitle}>{data.category} stay in {data.location}</Text>
                </View>

                <View style={ExternalStyles.descContainer}>
                    <Text style={ExternalStyles.sectionTitle}>About this place</Text>
                    <Text style={{fontFamily: 'Montserrat-Medium', color: 'black'}}>{data.description}</Text>

                </View>

                <View style={ExternalStyles.ContainerWithUnderline}>
                    <Text style={ExternalStyles.sectionTitle}>What this place offers</Text>
                    {data.amenities.map((amenity: string, index: number) => (
                        <Text key={index} style={{fontSize: 16, marginVertical: 2, lineHeight: 25, color: 'black', fontFamily: 'Montserrat-Medium'}}>- {amenity}</Text>
                    ))}
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

export default PropertyDetailsScreen;