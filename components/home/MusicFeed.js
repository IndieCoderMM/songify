import { View, Text, FlatList, ScrollView } from 'react-native';
import TrackItem from './TrackItem';

const VirtualizedView = ({ children }) => (
  <FlatList
    data={[]}
    renderItem={null}
    keyExtractor={null}
    ListEmptyComponent={null}
    ListHeaderComponent={() => <>{children}</>}
  />
);

const MusicFeed = ({ data }) => {
  return (
    <VirtualizedView>
      <ScrollView>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <TrackItem
                albumCover={item.album.cover_small}
                title={item.title_short}
                artist={item.artist.name}
                duration={item.duration}
                index={index}
              />
            );
          }}
        />
      </ScrollView>
    </VirtualizedView>
  );
};

export default MusicFeed;
