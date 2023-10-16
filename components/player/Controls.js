import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PrevIcon, PauseIcon, Play2Icon } from '../../constants/images';

const Controls = ({ isPlaying, handlePlayPause, handleNext, handlePrev }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePrev}>
        <Image source={PrevIcon} style={styles.prev} resizeMode="contain" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePlayPause}>
        <Image
          source={isPlaying ? PauseIcon : Play2Icon}
          style={styles.play}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleNext}>
        <Image source={PrevIcon} style={styles.next} resizeMode="contain" />
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
  },
});

export default Controls;
