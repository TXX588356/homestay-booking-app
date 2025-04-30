import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { RootStackParamList } from '../../Types';
import { allProperties } from '../../properties';
import PropertyCard from './PropertyCard';
import { StackScreenProps } from '@react-navigation/stack';

type CategoryProps = StackScreenProps<RootStackParamList, 'CategoryScreen'>;



const CategoryScreen = ({route, navigation}: CategoryProps) => {
    const {catName} = route.params;
    const categoryData = allProperties[catName];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{catName}</Text>
            {categoryData ? (
                categoryData.map((item) => (
                    <PropertyCard
                        key={item.id}
                        name={item.name}
                        location={item.location}
                        price={item.price}
                        images={item.images[0]}
                        onPress={() => navigation.navigate('PropertyDetails', { data: item})}
                    />
                ))
            ) : (
                <Text>No properties found for this category.</Text>
            )}
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default CategoryScreen;