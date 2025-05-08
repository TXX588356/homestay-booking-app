import { View, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { ExternalStyles } from '../Styles';


const width = Dimensions.get('window').width;

const CustomCarousel = ({ data }: { data: any[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const progress = useSharedValue(0);
    
    return (
      <View style={{height: width * 0.7 + 20,}}>
        <Carousel
         loop={true}
         autoPlay={false}
         data={data}
         width={width}
         height={width-30}
         onSnapToItem={(index) => setActiveIndex(index)}
         onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress
        }}
        modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
        mode="parallax"
        renderItem={({ item }) => (
          <View style={ExternalStyles.imageContainer}>
              <Image 
                  source={item} 
                  style={ExternalStyles.CarouselImage}
                  resizeMode="cover"
              />
          </View>
      )}

        />

        <View style={ExternalStyles.dotContainer}>
          {data.map((_, index) => (
            <View
                key={index}
                style={[ExternalStyles.dot, activeIndex === index ? ExternalStyles.activeDot : ExternalStyles.inactiveDot]}>
            </View>
          ))}
        </View>
      </View>
    );
  };

export default CustomCarousel;