import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { TabsDemo } from '@/src/demos/TabsDemo';

const TabsDemoPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="Tabs" onLeftPress={() => router.back()} />
      <TabsDemo />
    </View>
  );
};

export default TabsDemoPage;
