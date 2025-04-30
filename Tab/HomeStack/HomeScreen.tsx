import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Alert,
    Dimensions,
    FlatList,
    Button,
  } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PropertyCard from './PropertyCard';
import CategoryScreen from './CategoryScreen';
import { allProperties } from '../../properties';
import { ExternalStyles } from '../../Styles';



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

    const [wishList, setWishList] = useState<PropertyType[]>([]);


    const [searchQuery, setSearchQuery] = useState<any>('');
   
    return ( 
        <ScrollView style={ExternalStyles.container}>
            <View style={styles.container}>

                <View>
                    <Text style={styles.headerText}>
                        HomeStay App
                    </Text>
                    <Text style={{fontFamily: 'Montserrat-Regular'}}>Find your perfect stay</Text>
                </View>
                
               <View style={styles.searchArea}>
                    <Ionicons
                        name= 'search'
                        color= 'grey'
                        size={20}
                        style={{marginRight: 10}}
                    />  
                    <TextInput 
                        style={styles.searchBar}
                        placeholder= 'Where are you going?'
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                    />
               </View>

               <View style={styles.mainHeader}>
                    <Text style={styles.subHeaderText}>Browse by Category</Text>

                    <FlatList
                        data={category}
                        keyExtractor={(item) => item.key}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.categoryItem}
                                onPress={() => navigation.navigate('CategoryScreen', {catName: item.cat})}
                                >
                                <View style={[styles.iconContainer, { backgroundColor: item.bgColor}]}>
                                    <FontAwesome5 name={item.icon} size={30} color={item.iconColor} style={styles.categoryIcon} />
                                </View>
            
                                <Text style={styles.categoryText}>{item.cat}</Text>
                            </TouchableOpacity>
                        )}
                    />
               </View>

               <View style={styles.mainHeader}>
                    <Text style={styles.subHeaderText}>Recommended for you</Text>
                    {recommended.map((item) => (
                        <PropertyCard
                            key={item.id}
                            name={item.name}
                            location={item.location}
                            price={item.price}
                            images={item.images[0]}
                            onPress={() => navigation.navigate('PropertyDetails', {propertyId: item.id, data: item})}
                        />
                    ))}
               </View>
            </View>
        </ScrollView>
        //           <Button title="5 Stars Hotel" onPress={() => {navigation.navigate('PropertyDetails', {img: require('../../img/caption.jpg')})}}/>

        
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Montserrat-Bold',
    },
    subHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold',
    },
    container: {
        margin: 10,
        marginTop: 20,
    },
    searchArea: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 0.9, 
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 20, 
        paddingHorizontal: 15,
        fontSize: 16,
        elevation: 4, 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    searchBar: {
        flex: 1,
        fontSize: 16,
    },
    categoryIcon: {
        margin: 10,
        padding: 8,
    },
    iconContainer: {
        borderRadius: 15,
    },
    categoryItem: {
        padding: 5,
    },
    categoryText: {
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Montserrat-Medium',
    },
})


export default App;