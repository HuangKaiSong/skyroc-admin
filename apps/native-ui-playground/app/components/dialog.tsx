import { Stack } from 'expo-router';
import { DialogDemo } from '@/src/demos/DialogDemo';

const DialogPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Dialog' }} />
      <DialogDemo />
    </>
  );
};

export default DialogPage;
