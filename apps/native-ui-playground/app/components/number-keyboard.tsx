import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { NumberKeyboardDemo } from '@/src/demos/NumberKeyboardDemo';

const NumberKeyboardPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="NumberKeyboard" onLeftPress={() => router.back()} />
      <NumberKeyboardDemo />
    </View>
  );
};

export default NumberKeyboardPage;
