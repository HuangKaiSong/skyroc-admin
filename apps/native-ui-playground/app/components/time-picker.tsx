import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { NavBar } from '@skyroc/native-ui';
import { TimePickerDemo } from '@/src/demos/TimePickerDemo';

const TimePickerPage = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <NavBar leftArrow title="TimePicker" onLeftPress={() => router.back()} />
      <TimePickerDemo />
    </View>
  );
};

export default TimePickerPage;
