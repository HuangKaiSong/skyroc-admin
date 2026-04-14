import { Button, Popup, Text } from '@skyroc/native-ui';
import type { PopupPosition } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const PopupDemo = () => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<PopupPosition>('center');
  const [showRound, setShowRound] = useState(false);
  const [showSwipe, setShowSwipe] = useState(false);

  function handleOpen(pos: PopupPosition) {
    setPosition(pos);
    setShow(true);
  }

  function handleClose(val: boolean) {
    setShow(val);
  }

  function handleOpenRound() {
    setShowRound(true);
  }

  function handleCloseRound(val: boolean) {
    setShowRound(val);
  }

  function handleCloseSwipe(val: boolean) {
    setShowSwipe(val);
  }

  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Position */}
      <Text className="mb-4 text-lg font-semibold">Position</Text>
      <View className="mb-8 gap-3">
        <Button onPress={() => handleOpen('center')}>Center</Button>
        <Button variant="tonal" onPress={() => handleOpen('top')}>
          Top
        </Button>
        <Button variant="tonal" onPress={() => handleOpen('bottom')}>
          Bottom
        </Button>
        <Button variant="tonal" onPress={() => handleOpen('left')}>
          Left
        </Button>
        <Button variant="tonal" onPress={() => handleOpen('right')}>
          Right
        </Button>
      </View>

      {/* Round */}
      <Text className="mb-4 text-lg font-semibold">Round Corners</Text>
      <View className="mb-8 gap-3">
        <Button variant="outline" onPress={handleOpenRound}>
          Bottom Round
        </Button>
      </View>

      {/* Position Popup */}
      <Popup show={show} position={position} onUpdateShow={handleClose}>
        <View className="items-center justify-center p-8">
          <Text className="text-base">Popup Content ({position})</Text>
        </View>
      </Popup>

      {/* Round Popup */}
      <Popup show={showRound} position="bottom" round onUpdateShow={handleCloseRound}>
        <View className="items-center justify-center p-8">
          <Text className="text-base">Round Bottom Popup</Text>
        </View>
      </Popup>

      {/* Swipe Popup */}
      <Popup show={showSwipe} position="bottom" round onUpdateShow={handleCloseSwipe}>
        <View className="items-center justify-center p-8">
          <Text className="text-base">Swipe down to close</Text>
        </View>
      </Popup>
    </ScrollView>
  );
};

export { PopupDemo };
