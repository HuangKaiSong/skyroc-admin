import { Stack } from 'expo-router';
import { AvatarDemo } from '@/src/demos/AvatarDemo';

const AvatarPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Avatar' }} />
      <AvatarDemo />
    </>
  );
};

export default AvatarPage;
