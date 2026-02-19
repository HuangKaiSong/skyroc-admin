import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Dialog,
  showConfirmDialog,
  showDialog,
  Text
} from '@skyroc/native-ui';

const DialogDemo = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleBasicOpen() {
    setShowBasic(true);
  }

  function handleBasicClose(val: boolean) {
    setShowBasic(val);
  }

  function handleConfirmOpen() {
    setShowConfirm(true);
  }

  function handleConfirmClose(val: boolean) {
    setShowConfirm(val);
  }

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
    })
      .then(() => {
        // confirmed
      })
      .catch(() => {
        // cancelled
      });
  }

  function handleFunctionSimple() {
    showDialog('Simple message dialog');
  }

  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Declarative */}
      <Text className="mb-4 text-lg font-semibold">Declarative</Text>
      <View className="mb-8 gap-3">
        <Button onPress={handleBasicOpen}>Basic Dialog</Button>
        <Button variant="tonal" onPress={handleConfirmOpen}>Confirm Dialog</Button>
      </View>

      {/* Function Call */}
      <Text className="mb-4 text-lg font-semibold">Function Call</Text>
      <View className="mb-8 gap-3">
        <Button variant="outline" onPress={handleFunctionAlert}>showDialog</Button>
        <Button variant="outline" onPress={handleFunctionConfirm}>showConfirmDialog</Button>
        <Button variant="outline" onPress={handleFunctionSimple}>Simple Message</Button>
      </View>

      {/* Declarative Dialog - Basic */}
      <Dialog
        title="Title"
        message="This is a basic dialog with only a confirm button."
        show={showBasic}
        onUpdateShow={handleBasicClose}
        onConfirm={() => setShowBasic(false)}
      />

      {/* Declarative Dialog - Confirm */}
      <Dialog
        title="Confirm"
        message="Are you sure you want to delete this item?"
        show={showConfirm}
        showCancelButton
        onUpdateShow={handleConfirmClose}
        onConfirm={() => setShowConfirm(false)}
        onCancel={() => setShowConfirm(false)}
      />
    </ScrollView>
  );
};

export { DialogDemo };
