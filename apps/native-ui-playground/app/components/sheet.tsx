import { Stack } from 'expo-router';
import { SheetDemo } from '@/src/demos/SheetDemo';

const SheetPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Sheet' }} />
      <SheetDemo />
    </>
  );
};

export default SheetPage;
