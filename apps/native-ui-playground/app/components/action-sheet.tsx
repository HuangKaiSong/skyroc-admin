import { Stack } from 'expo-router';
import { ActionSheetDemo } from '@/src/demos/ActionSheetDemo';

const ActionSheetPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'ActionSheet' }} />
      <ActionSheetDemo />
    </>
  );
};

export default ActionSheetPage;
