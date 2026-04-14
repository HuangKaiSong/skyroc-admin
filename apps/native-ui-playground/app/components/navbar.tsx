import { NavBar } from '@skyroc/native-ui';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBarDemo } from '@/src/demos/NavBarDemo';

const NavBarPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="NavBar" onLeftPress={() => router.back()} />
      <NavBarDemo />
    </View>
  );
};

export default NavBarPage;
