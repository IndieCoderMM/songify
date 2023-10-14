import { View, Image } from 'react-native';

const CarouselCard = ({ image }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 5,
        height: 140,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Image
        source={image}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </View>
  );
};

export default CarouselCard;
