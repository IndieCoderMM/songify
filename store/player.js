import { Store, registerInDevtools } from 'pullstate';
import axios from 'axios';

const PlayerStore = new Store({
  songs: [],
  isPlaying: false,
  isActive: false,
  index: null,
  currentSongMetadata: null,
  currentAudio: null,
});

export const fetchAllSongs = async (query) => {
  const options = {
    method: 'GET',
    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
    params: { q: query },
    headers: {
      'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data.data.slice(0, 20);
    PlayerStore.update((store) => {
      store.songs = data;
      store.currentSongMetadata = data[0];
      store.currentAudio = data[0].preview;
      store.index = 0;
      store.isActive = true;
    });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentSong = (index) => {
  PlayerStore.update((store) => {
    if (store.songs.length === 0) return;
    store.index = index;
    store.currentSongMetadata = store.songs[index];
    store.currentAudio = store.songs[index].preview;
  });
};

export const gotoNextSong = () => {
  PlayerStore.update((store) => {
    if (store.songs.length === 0) return;
    if (store.index === store.songs.length - 1) {
      store.index = 0;
    } else {
      store.index += 1;
    }
  });

  setCurrentSong(PlayerStore.getRawState().index);
};

export const gotoPreviousSong = () => {
  PlayerStore.update((store) => {
    if (store.songs.length === 0) return;
    if (store.index === 0) {
      store.index = store.songs.length - 1;
    } else {
      store.index -= 1;
    }
  });
  setCurrentSong(PlayerStore.getRawState().index);
};

export const setIsPlaying = (isPlaying) => {
  PlayerStore.update((store) => {
    store.isPlaying = isPlaying;
  });
};

registerInDevtools({
  PlayerStore,
});

export default PlayerStore;

// {
//   id: 6461440,
//   readable: true,
//   title: 'Love The Way You Lie',
//   title_short: 'Love The Way You Lie',
//   title_version: '',
//   link: 'https://www.deezer.com/track/6461440',
//   duration: 263,
//   rank: 909960,
//   explicit_lyrics: true,
//   explicit_content_lyrics: 1,
//   explicit_content_cover: 1,
//   preview:
//     'https://cdns-preview-1.dzcdn.net/stream/c-1ed50e5b3118c99be858fc305609e62a-15.mp3',
//   md5_image: 'be682506145061814eddee648edb7c59',
//   artist: {
//     id: 13,
//     name: 'Eminem',
//     link: 'https://www.deezer.com/artist/13',
//     picture: 'https://api.deezer.com/artist/13/image',
//     picture_small:
//       'https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/56x56-000000-80-0-0.jpg',
//     picture_medium:
//       'https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/250x250-000000-80-0-0.jpg',
//     picture_big:
//       'https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/500x500-000000-80-0-0.jpg',
//     picture_xl:
//       'https://e-cdns-images.dzcdn.net/images/artist/19cc38f9d69b352f718782e7a22f9c32/1000x1000-000000-80-0-0.jpg',
//     tracklist: 'https://api.deezer.com/artist/13/top?limit=50',
//     type: 'artist',
//   },
//   album: {
//     id: 595243,
//     title: 'Recovery',
//     cover: 'https://api.deezer.com/album/595243/image',
//     cover_small:
//       'https://e-cdns-images.dzcdn.net/images/cover/be682506145061814eddee648edb7c59/56x56-000000-80-0-0.jpg',
//     cover_medium:
//       'https://e-cdns-images.dzcdn.net/images/cover/be682506145061814eddee648edb7c59/250x250-000000-80-0-0.jpg',
//     cover_big:
//       'https://e-cdns-images.dzcdn.net/images/cover/be682506145061814eddee648edb7c59/500x500-000000-80-0-0.jpg',
//     cover_xl:
//       'https://e-cdns-images.dzcdn.net/images/cover/be682506145061814eddee648edb7c59/1000x1000-000000-80-0-0.jpg',
//     md5_image: 'be682506145061814eddee648edb7c59',
//     tracklist: 'https://api.deezer.com/album/595243/tracks',
//     type: 'album',
//   },
//   type: 'track',
// },
