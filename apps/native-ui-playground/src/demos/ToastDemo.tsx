import { ScrollView, View } from 'react-native';
import {
  Button,
  closeToast,
  showFailToast,
  showLoadingToast,
  showSuccessToast,
  showToast,
  Text
} from '@skyroc/native-ui';

const ToastDemo = () => {
  function handleTextToast() {
    showToast('This is a text toast');
  }

  function handleSuccessToast() {
    showSuccessToast('Success!');
  }

  function handleFailToast() {
    showFailToast('Something went wrong');
  }

  function handleLoadingToast() {
    const toast = showLoadingToast('Loading...');
    setTimeout(() => {
      toast.update({ duration: 2000, message: 'Done!', type: 'success' });
    }, 2000);
  }

  function handleTopToast() {
    showToast({ message: 'Top position', position: 'top' });
  }

  function handleBottomToast() {
    showToast({ message: 'Bottom position', position: 'bottom' });
  }

  function handleLongToast() {
    showToast({ duration: 5000, message: 'This toast lasts 5 seconds' });
  }

  function handleForbidClickToast() {
    showLoadingToast({ forbidClick: true, message: 'Cannot touch background' });
    setTimeout(() => {
      closeToast();
    }, 3000);
  }

  function handleCustomIconToast() {
    showToast({
      icon: <Text className="text-4xl text-white">🎉</Text>,
      message: 'Custom Icon'
    });
  }

  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Basic Types */}
      <Text className="mb-4 text-lg font-semibold">Basic Types</Text>
      <View className="mb-8 gap-3">
        <Button onPress={handleTextToast}>Text Toast</Button>
        <Button color="success" onPress={handleSuccessToast}>Success Toast</Button>
        <Button color="destructive" onPress={handleFailToast}>Fail Toast</Button>
        <Button variant="outline" onPress={handleLoadingToast}>Loading Toast</Button>
      </View>

      {/* Position */}
      <Text className="mb-4 text-lg font-semibold">Position</Text>
      <View className="mb-8 gap-3">
        <Button variant="tonal" onPress={handleTopToast}>Top</Button>
        <Button variant="tonal" onPress={handleBottomToast}>Bottom</Button>
      </View>

      {/* Advanced */}
      <Text className="mb-4 text-lg font-semibold">Advanced</Text>
      <View className="mb-8 gap-3">
        <Button variant="outline" onPress={handleLongToast}>Long Duration (5s)</Button>
        <Button variant="outline" onPress={handleForbidClickToast}>Forbid Click</Button>
        <Button variant="outline" onPress={handleCustomIconToast}>Custom Icon</Button>
      </View>
    </ScrollView>
  );
};

export { ToastDemo };
