import { Stack } from 'expo-router';
import { BadgeDemo } from '@/src/demos/BadgeDemo';

const BadgePage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Badge' }} />
      <BadgeDemo />
    </>
  );
};

export default BadgePage;
