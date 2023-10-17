import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const Controls = ({ isPlaying, handlePlayPause, handleNext, handlePrev }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrev}>
        <Ionicons name="ios-play-skip-back" size={55} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause} style={styles.play}>
        {isPlaying ? (
          <FontAwesome5 name="pause" size={50} color="white" />
        ) : (
          <FontAwesome5
            name="play"
            size={50}
            color="white"
            style={styles.icon}
          />
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNext}>
        <Ionicons name="ios-play-skip-forward" size={55} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  next: {
    transform: [{ rotate: '180deg' }],
  },
  play: {
    marginHorizontal: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGreen,
  },
  icon: {
    transform: [{ translateX: 3 }],
  },
});

export default Controls;
