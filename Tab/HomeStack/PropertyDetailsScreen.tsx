import { View, Dimensions} from 'react-native'
import React, { useContext } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Types';
import { ExternalStyles } from '../../Styles';
export type Props = StackScreenProps<RootStackParamList, 'PropertyDetails'>;
import CustomCarousel from '../../components/CustomCarousel';
import { ScrollView } from 'react-native-gesture-handler';
import PropertyBottomTab from '../../components/PropertyBottomTab';
import LoadingIndicator, { useTransitionLoading } from '../../components/LoadingIndicator';
import BackButton from '../../components/BackButton';
import { ThemeContext } from '../../util/ThemeManager';
import ThemedText from '../../components/ThemedText';
import { imageMap } from '../../imageMap';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({route, navigation}: Props) => {
    const {data} = route.params;

    const loading = useTransitionLoading(navigation);

    const { theme } = useContext(ThemeContext);
         
    let images = data.images.map(img => imageMap[img])

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

                <View style={[ExternalStyles.propertyTitle, {paddingTop: 70}]}>
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
