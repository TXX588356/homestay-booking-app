import React, { useContext, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    Dimensions,
    FlatList,
    Button,
    Linking
  } from 'react-native';
  import { useTheme, Text, TextInput, Card } from 'react-native-paper'; 
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropertyCard from '../../components/PropertyCard';
import CategoryScreen from './CategoryScreen';
import { ExternalStyles } from '../../Styles';
import { ThemeContext } from '../../util/ThemeManager';
import ThemedText from '../../components/ThemedText';
import allProperties from '../../allProperties.json';
import { imageMap } from '../../imageMap';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Props = StackScreenProps<RootStackParamList, 'HomePage'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type PropertyType = {
    id: string;
    name: string;
    location: string;
    price: string;
    images: any;
}

const App = ({ route, navigation}: Props) => {
    const {colors} = useTheme();

    const [category, setCategory] = useState([
        { cat: 'Beach', icon: 'umbrella-beach', key: '1', iconColor: '#FF5733', bgColor: '#FFE5D9' },
        { cat: 'Mountain', icon: 'mountain', key: '2', iconColor: '#4CAF50', bgColor: '#DFF2BF' },
        { cat: 'City', icon: 'city', key: '3', iconColor: '#2196F3', bgColor: '#D6EAF8' },
        { cat: 'Camping', icon: 'campground', key: '4', iconColor: '#FFC107', bgColor: '#FFF8E1' },
        { cat: 'Pool', icon: 'swimming-pool', key: '5', iconColor: '#9C27B0', bgColor: '#E1BEE7' },
    ])

    /* const [properties, setProperties] = useState([
        {id: '1', name: 'Villa', location: 'Kuala Lumpur', price: 'RM199/night', image: require('../../img/villa.jpg')},
        { id: '2', name: 'Cabin', location: 'Cameron Highlands', price: 'RM149 per night', image: require('../../img/cabin.jpg') },
        { id: '3', name: 'Penthouse', location: 'Penang', price: 'RM299 per night', image: require('../../img/penthouse.jpg') },
    ]); */
    const recommended = [
        ...allProperties.Beach.slice(0,1),
        ...allProperties.Mountain.slice(0,1),
        ...allProperties.City.slice(0,1),
        ...allProperties.Camping.slice(0,1),
        ...allProperties.Pool.slice(0,1),
    ]

    const getCurrentUserId = async () => {
        try {
            const userString = await AsyncStorage.getItem('currentUser');
            if (userString) {
                const user = JSON.parse(userString);
                const userID = parseInt(user.id);
                return userID;
            } else {
                console.log('No user found in AsyncStorage');
                return null;
            }
        } catch (error) {
            console.error('Error reading AsyncStorage:', error);
            return null;
        }
    };

    const [wishList, setWishList] = useState<PropertyType[]>([]);

    const [searchQuery, setSearchQuery] = useState<any>('');

    const {theme} = useContext(ThemeContext);
   
    return ( 
        <ScrollView style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
            <View style={[{margin: 10, marginTop: 20}]}>

                <View>
                    <Text variant = "headlineLarge" style={[ExternalStyles.headerText, {color:colors.primary}]}>
                        HomeStay App
                    </Text>
                    
                    <ThemedText style={{fontFamily: 'Montserrat-Regular'}}>
                        Find your perfect stay
                    </ThemedText>
                </View>
                
                {/* <View style={[ExternalStyles.searchArea, { width: windowWidth * 0.9, backgroundColor: colors.surface }]}>
                    <Ionicons
                        name= 'search'
                        color= 'grey'
                        size={20}
                        style={{marginRight: 10}}
                    />  
                    <TextInput 
                        style={{ flex: 1, backgroundColor: 'transparent' }}
                        placeholder= 'Where are you going?'
                        value={searchQuery}
                        underlineColor="transparent"
                        activeUnderlineColor='transparent'
                        placeholderTextColor={colors.outline}
                        onChangeText={text => setSearchQuery(text)}
                    />
               </View> */}

               <View>
               <Text variant="titleLarge" style={[ExternalStyles.subHeaderText, { color: colors.primary }]}>Browse by Category</Text>

                    <FlatList
                        data={category}
                        keyExtractor={(item) => item.key}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={{ padding: 5}}
                                onPress={() => navigation.navigate('CategoryScreen', {catName: item.cat, getUserId: getCurrentUserId})}
                                >
                                <View style={{ borderRadius: 15, backgroundColor: item.bgColor}}>
                                    <FontAwesome5 name={item.icon} size={30} color={item.iconColor} style={{margin: 10, padding: 8,}} />
                                </View>
            
                                <ThemedText style={{ textAlign: 'center', fontFamily: 'Montserrat-Medium', }}>{item.cat}</ThemedText>
                            </TouchableOpacity>
                        )}
                    />
               </View>

               <View>
               <Text variant="titleLarge" style={[ExternalStyles.subHeaderText, { color: colors.primary }]}>Recommended for you</Text>
                    {recommended.map((item) => (
                        <PropertyCard
                            key={item.id}
                            name={item.name}
                            location={item.location}
                            price={item.price.toString()}
                            images={imageMap[item.images[0]]}
                            onPress={() => navigation.navigate('PropertyDetails', {propertyId: item.id, data: item, getUserId: getCurrentUserId})}
                        />
                    ))}
               </View>
            </View>
        </ScrollView>
    );
}

export default App;
