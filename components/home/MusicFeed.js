import { View, Text, FlatList, ScrollView } from 'react-native';
import React from 'react';
import data from '../../constants/sampleData';
import TrackItem from './TrackItem';

const MusicFeed = () => {
  return (
    <ScrollView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TrackItem
              albumCover={item.album.cover_small}
              title={item.title_short}
              artist={item.artist.name}
              duration={item.duration}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default MusicFeed;
