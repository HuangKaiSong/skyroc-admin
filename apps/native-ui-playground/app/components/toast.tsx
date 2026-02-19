import { Stack } from 'expo-router';
import { ToastDemo } from '@/src/demos/ToastDemo';

const ToastPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Toast' }} />
      <ToastDemo />
    </>
  );
};

export default ToastPage;
