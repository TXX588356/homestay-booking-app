import { View, Text, FlatList, Dimensions, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const width = Dimensions.get('window').width;

const Carousel = ({ data }: { data: any[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const slide = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(slide);
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={item} style={styles.image} />
            </View>
          )}
        />

        <View style={styles.dotContainer}>
          {data.map((_, index) => (
            <View
                key={index}
                style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}>

            </View>
          ))}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: width - 10,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    container: {
        height: width * 0.7 + 20,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'grey',
    },
    inactiveDot: {
        backgroundColor: '#ccc',
    },
})

export default Carousel;