import { View, Text } from 'react-native';
import { AuthStore } from '../../../store';

const Home = () => {
  const { user, isLoggedIn } = AuthStore.useState();
  return (
    <View>
      <Text>{isLoggedIn ? `Welcome ${user?.displayName}` : 'Loading...'}</Text>
    </View>
  );
};

export default Home;
