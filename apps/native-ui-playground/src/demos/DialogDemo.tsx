import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Dialog,
  showConfirmDialog,
  showDialog,
  Text
} from '@skyroc/native-ui';

function simulateAsync(ms = 2000): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), ms);
  });
}

const DialogDemo = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showRoundV, setShowRoundV] = useState(false);
  const [showRoundH, setShowRoundH] = useState(false);
  const [showAsync, setShowAsync] = useState(false);
  const [showAsyncRound, setShowAsyncRound] = useState(false);

  function handleFunctionAlert() {
    showDialog({
      title: 'Alert',
      message: 'This is a function-call dialog.'
    });
  }

  function handleFunctionConfirm() {
    showConfirmDialog({
      title: 'Confirm',
      message: 'Are you sure you want to proceed?'
    });
  }

  function handleFunctionAsync() {
    showConfirmDialog({
      title: 'Async Close',
      message: 'Confirm will show loading for 2 seconds.',
      beforeClose(action) {
        if (action === 'confirm') return simulateAsync();
        return true;
      }
    });
  }

  function handleFunctionRound() {
    showConfirmDialog({
      title: 'Round Button',
      message: 'Dialog with round button theme.',
      theme: 'round-button'
    });
  }

  function handleFunctionAsyncRound() {
    showConfirmDialog({
      title: 'Async + Round',
      message: 'Confirm will show loading for 2 seconds.',
      theme: 'round-button',
      beforeClose(action) {
        if (action === 'confirm') return simulateAsync();
        return true;
      }
    });
  }

  function handleFunctionAsyncRoundH() {
    showConfirmDialog({
      title: 'Async + Round Horizontal',
      message: 'Horizontal round button layout.',
      theme: 'round-button',
      themeDirection: 'horizontal',
      beforeClose(action) {
        if (action === 'confirm') return simulateAsync();
        return true;
      }
    });
  }

  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Declarative */}
      <Text className="mb-4 text-lg font-semibold">Declarative</Text>
      <View className="mb-8 gap-3">
        <Button onPress={() => setShowBasic(true)}>Basic Dialog</Button>
        <Button variant="tonal" onPress={() => setShowConfirm(true)}>Confirm Dialog</Button>
        <Button variant="tonal" onPress={() => setShowRoundV(true)}>Round Vertical</Button>
        <Button variant="tonal" onPress={() => setShowRoundH(true)}>Round Horizontal</Button>
        <Button variant="tonal" onPress={() => setShowAsync(true)}>Async Close</Button>
        <Button variant="tonal" onPress={() => setShowAsyncRound(true)}>Async + Round</Button>
      </View>

      {/* Function Call */}
      <Text className="mb-4 text-lg font-semibold">Function Call</Text>
      <View className="mb-8 gap-3">
        <Button variant="outline" onPress={handleFunctionAlert}>showDialog</Button>
        <Button variant="outline" onPress={handleFunctionConfirm}>showConfirmDialog</Button>
        <Button variant="outline" onPress={handleFunctionAsync}>Async Close</Button>
        <Button variant="outline" onPress={handleFunctionRound}>Round Button</Button>
        <Button variant="outline" onPress={handleFunctionAsyncRound}>Async + Round</Button>
        <Button variant="outline" onPress={handleFunctionAsyncRoundH}>Async + Round Horizontal</Button>
      </View>

      {/* Basic */}
      <Dialog
        title="Title"
        message="This is a basic dialog with only a confirm button."
        show={showBasic}
        onUpdateShow={setShowBasic}
        onConfirm={() => setShowBasic(false)}
      />

      {/* Confirm */}
      <Dialog
        title="Confirm"
        message="Are you sure you want to delete this item?"
        show={showConfirm}
        showCancelButton
        onUpdateShow={setShowConfirm}
      />

      {/* Round Vertical */}
      <Dialog
        title="Round Vertical"
        message="Buttons stacked vertically."
        show={showRoundV}
        showCancelButton
        theme="round-button"
        onUpdateShow={setShowRoundV}
      />

      {/* Round Horizontal */}
      <Dialog
        title="Round Horizontal"
        message="Buttons side by side."
        show={showRoundH}
        showCancelButton
        theme="round-button"
        themeDirection="horizontal"
        onUpdateShow={setShowRoundH}
      />

      {/* Async Close */}
      <Dialog
        title="Async Close"
        message="Confirm will show loading for 2 seconds."
        show={showAsync}
        showCancelButton
        onUpdateShow={setShowAsync}
        beforeClose={action => {
          if (action === 'confirm') return simulateAsync();
          return true;
        }}
      />

      {/* Async + Round */}
      <Dialog
        title="Async + Round"
        message="Confirm will show loading for 2 seconds."
        show={showAsyncRound}
        showCancelButton
        theme="round-button"
        onUpdateShow={setShowAsyncRound}
        beforeClose={action => {
          if (action === 'confirm') return simulateAsync();
          return true;
        }}
      />
    </ScrollView>
  );
};

export { DialogDemo };
