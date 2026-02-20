import { Stack } from 'expo-router';
import { FloatingButtonDemo } from '@/src/demos/FloatingButtonDemo';

const FloatingButtonPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'FloatingButton' }} />
      <FloatingButtonDemo />
    </>
  );
};

export default FloatingButtonPage;
