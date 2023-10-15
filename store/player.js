import { Store, registerInDevtools } from 'pullstate';
import SoundPlayer from 'react-native-sound-player';

const PlayerStore = new Store({
  allSongs: [],
  isPlaying: false,
  currentIndex: null,
  currentSong: null,
  isActive: false,
});

export const setAllSongs = (songs) => {
  PlayerStore.update((store) => {
    store.allSongs = songs;
  });
};

export const activatePlayer = () => {
  PlayerStore.update((store) => {
    if (store.allSongs.length === 0) {
      return;
    }
    store.isActive = true;
    store.currentIndex = 0;
    store.currentSong = store.allSongs[store.currentIndex];
    SoundPlayer.loadUrl(store.currentSong.preview);
  });
};

export const setCurrentSong = (index) => {
  PlayerStore.update((store) => {
    store.currentIndex = index;
    store.currentSong = store.allSongs[index];
    SoundPlayer.loadUrl(store.currentSong.preview);
  });
};

export const setIsPlaying = (isPlaying) => {
  PlayerStore.update((store) => {
    store.isPlaying = isPlaying;
    if (isPlaying) {
      SoundPlayer.play();
    } else {
      SoundPlayer.pause();
    }
  });
};

export const nextSong = () => {
  PlayerStore.update((store) => {
    if (store.currentIndex === store.allSongs.length - 1) {
      store.currentIndex = 0;
      store.currentSong = store.allSongs[store.currentIndex];
      return;
    }
    store.currentIndex = store.currentIndex + 1;
    store.currentSong = store.allSongs[store.currentIndex];
  });
};

export const prevSong = () => {
  PlayerStore.update((store) => {
    if (store.currentIndex === 0) {
      store.currentIndex = store.allSongs.length - 1;
      store.currentSong = store.allSongs[store.currentIndex];
      return;
    }
    store.currentIndex = store.currentIndex - 1;
    store.currentSong = store.allSongs[store.currentIndex];
  });
};

registerInDevtools({
  PlayerStore,
});

export default PlayerStore;
