import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { COLORS } from '../../constants/theme';

const Carousel = () => {
  return (
    <View style={styles.container}>
      <Text>Carousel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: 100,
    width: '100%',
    marginBottom: 30,
  },
});

export default Carousel;
