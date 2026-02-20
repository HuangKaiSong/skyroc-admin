import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { SwitchDemo } from '@/src/demos/SwitchDemo';

const SwitchPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="Switch" onLeftPress={() => router.back()} />
      <SwitchDemo />
    </View>
  );
};

export default SwitchPage;
