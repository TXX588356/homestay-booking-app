import { ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { RootStackParamList } from '../../Types';
import PropertyCard from '../../components/PropertyCard';
import { StackScreenProps } from '@react-navigation/stack';
import { ExternalStyles } from '../../Styles';
import { ThemeContext } from '../../util/ThemeManager';
import ThemedText from '../../components/ThemedText';
import allProperties from '../../allProperties.json';
import { imageMap } from '../../imageMap';

type CategoryProps = StackScreenProps<RootStackParamList, 'CategoryScreen'>;

const CategoryScreen = ({route, navigation}: CategoryProps) => {
    const { theme } = useContext(ThemeContext);
    
    const {catName, getUserId} = route.params;
    const categoryData = allProperties[catName];

    return (
        <ScrollView style={[ExternalStyles.container, {padding: 10, backgroundColor: theme.background}]}>
            <ThemedText style={ExternalStyles.titleText}>{catName}</ThemedText>
            {categoryData ? (
                categoryData.map((item) => (
                    <PropertyCard
                        key={item.id}
                        name={item.name}
                        location={item.location}
                        price={item.price}
                        images={imageMap[item.images[0]]}
                        onPress={() => navigation.navigate('PropertyDetails', { propertyId:item.id, data: item, getUserId: getUserId})}
                    />
                ))
            ) : (
                <ThemedText>No properties found for this category.</ThemedText>
            )}
        </ScrollView>
    )
}

export default CategoryScreen;
