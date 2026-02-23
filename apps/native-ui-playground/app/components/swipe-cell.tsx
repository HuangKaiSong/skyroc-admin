import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { SwipeCellDemo } from '@/src/demos/SwipeCellDemo';

const SwipeCellPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="SwipeCell" onLeftPress={() => router.back()} />
      <SwipeCellDemo />
    </View>
  );
};

export default SwipeCellPage;
