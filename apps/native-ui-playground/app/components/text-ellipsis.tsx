import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { TextEllipsisDemo } from '@/src/demos/TextEllipsisDemo';

const TextEllipsisPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="TextEllipsis" onLeftPress={() => router.back()} />
      <TextEllipsisDemo />
    </View>
  );
};

export default TextEllipsisPage;
