import { Stack } from 'expo-router';
import { PopupDemo } from '@/src/demos/PopupDemo';

const PopupPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Popup' }} />
      <PopupDemo />
    </>
  );
};

export default PopupPage;
