import { Stack } from 'expo-router';
import { DividerDemo } from '@/src/demos/DividerDemo';

const DividerPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Divider' }} />
      <DividerDemo />
    </>
  );
};

export default DividerPage;
