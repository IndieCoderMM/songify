import { View, StyleSheet, Dimensions } from 'react-native';
import SnapCarousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../constants/theme';
import { Banner1, Banner2, Banner3 } from '../../constants/images';
import CarouselCard from './CarouselCard';
import { useState } from 'react';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const items = [
  {
    image: Banner1,
  },
  {
    image: Banner2,
  },
  {
    image: Banner3,
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <SnapCarousel
          layout="default"
          data={items}
          renderItem={({ item }) => <CarouselCard image={item.image} />}
          onSnapToItem={(index) => setActiveIndex(index)}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          autoplay
          loop
          autoplayDelay={5000}
          autoplayInterval={5000}
          useScrollView
        />
      </View>
      <Pagination
        dotsLength={items.length}
        activeDotIndex={activeIndex}
        containerStyle={{ backgroundColor: 'transparent', paddingVertical: 0 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: COLORS.lightGreen,
        }}
        inactiveDotStyle={{
          backgroundColor: COLORS.white,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkGreen,
    marginBottom: 20,
  },
});

export default Carousel;
