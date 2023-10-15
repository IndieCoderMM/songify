import { Store, registerInDevtools } from 'pullstate';

const PlayerStore = new Store({
  allSongs: [],
  isPlaying: false,
  currentIndex: null,
  currentSong: null,
});

export const setAllSongs = (songs) => {
  PlayerStore.update((store) => {
    store.allSongs = songs;
  });
};

export const setCurrentSong = (index) => {
  PlayerStore.update((store) => {
    store.currentIndex = index;
    store.currentSong = store.allSongs[index];
  });
};

export const setIsPlaying = (isPlaying) => {
  PlayerStore.update((store) => {
    store.isPlaying = isPlaying;
  });
};

export const nextSong = () => {
  PlayerStore.update((store) => {
    store.currentIndex = store.currentIndex + 1;
    store.currentSong = store.allSongs[store.currentIndex];
  });
};

export const prevSong = () => {
  PlayerStore.update((store) => {
    store.currentIndex = store.currentIndex - 1;
    store.currentSong = store.allSongs[store.currentIndex];
  });
};

registerInDevtools({
  PlayerStore,
});

export default PlayerStore;
