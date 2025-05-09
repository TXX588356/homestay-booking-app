import { View, Text, Image, Button, Dimensions, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
export type Props = StackScreenProps<RootStackParamList, 'PropertyDetails'>;
import CustomCarousel from '../../components/CustomCarousel';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropertyBottomTab from '../../components/PropertyBottomTab';
import Calendar from '../../components/Calendar';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';
import BackButton from '../../components/BackButton';
import { ThemeContext } from '../../util/ThemeManager';
import ThemedText from '../../components/ThemedText';
import { imageMap } from '../../imageMap';
import { createMapLink } from 'react-native-open-maps';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({route, navigation}: Props) => {

    const {data, getUserId} = route.params;

    const loading = useTransitionLoading(navigation);

    const { theme } = useContext(ThemeContext);
        
    let images = data.images.map(img => imageMap[img]);

    const openMap = (propertyName: string) => { 
        const mapLink = createMapLink({ provider: 'google', query: propertyName });
        Linking.openURL(mapLink);
    }

    if(loading) {
        return <LoadingIndicator/>;
    }
    
    return(
        <View style={[ExternalStyles.container]}>
            <ScrollView style={[ExternalStyles.container, {backgroundColor: theme.background}]} contentContainerStyle={{paddingBottom: 100}} >
            <View style={ExternalStyles.backButtonContainer}>
                <BackButton/>
            </View>
                <CustomCarousel data={images}/>

                <View style={[ExternalStyles.propertyTitle, {paddingTop: 88}]}>
                    <ThemedText style={ExternalStyles.titleText}>{data.name}</ThemedText>
                    <ThemedText style={ExternalStyles.subTitle}>{data.category} stay in {data.location}</ThemedText>
                </View>

                <View style={ExternalStyles.descContainer}>
                    <ThemedText style={ExternalStyles.sectionTitle}>About this place</ThemedText>
                    <ThemedText style={{fontFamily: 'Montserrat-Medium'}}>{data.description}</ThemedText>

                </View>

                <View style={ExternalStyles.ContainerWithUnderline}>
                    <ThemedText style={ExternalStyles.sectionTitle}>What this place offers</ThemedText>
                    {data.amenities.map((amenity: string, index: number) => (
                        <ThemedText key={index} style={{fontSize: 16, marginVertical: 2, lineHeight: 25, fontFamily: 'Montserrat-Medium'}}>- {amenity}</ThemedText>
                    ))}
                </View>
                
                <View style={ExternalStyles.ContainerWithUnderline}>
                    <ThemedText style={ExternalStyles.sectionTitle}>This place is located at</ThemedText>
                    <ThemedText style={{fontFamily: 'Montserrat-Medium', marginTop: 3}}>{data.address}</ThemedText>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                        <TouchableOpacity style={[ExternalStyles.button, {width: '65%', flexDirection: 'row', justifyContent: 'center'}]} 
                            onPress={() => openMap(data.name)}>
                            <Ionicons name="location-outline" size={22} color="white" />
                            <Text style={[ExternalStyles.buttonText, {marginHorizontal: 8}]}>View in Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <PropertyBottomTab
                propertyData={data}
                getUserId={getUserId}
                addToWishlist={(item) => {
                    console.log("Added to wishlist: ", item)
                }}/>
        </View>
    )
}

export default PropertyDetailsScreen;
