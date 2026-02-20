import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, FloatingButton, Text } from '@skyroc/native-ui';

const FloatingButtonDemo = () => {
  const [visible, setVisible] = useState(true);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 p-6">
        {/* Basic */}
        <Text className="mb-4 text-lg font-semibold">Basic (Y-axis drag)</Text>
        <Text className="mb-8 text-sm text-muted-foreground">
          Default floating button anchored at bottom-right. Drag vertically to reposition.
        </Text>

        {/* Free Drag */}
        <Text className="mb-4 text-lg font-semibold">Free Drag (axis=xy)</Text>
        <Text className="mb-8 text-sm text-muted-foreground">
          The green button can be dragged freely in any direction.
        </Text>

        {/* Magnetic Snap */}
        <Text className="mb-4 text-lg font-semibold">Magnetic Snap (magnetic=x)</Text>
        <Text className="mb-8 text-sm text-muted-foreground">
          The orange button snaps to the nearest horizontal edge after release.
        </Text>

        {/* Visibility Toggle */}
        <Text className="mb-4 text-lg font-semibold">Visibility Toggle</Text>
        <View className="mb-8 gap-3">
          <Button onPress={() => setVisible(v => !v)}>
            {visible ? 'Hide Red Button' : 'Show Red Button'}
          </Button>
          <Text className="text-sm text-muted-foreground">
            The red button shows/hides with a scale animation.
          </Text>
        </View>

        {/* Custom Content */}
        <Text className="mb-4 text-lg font-semibold">Custom Content & Size</Text>
        <Text className="mb-8 text-sm text-muted-foreground">
          A larger button with custom content and styling.
        </Text>
      </ScrollView>

      {/* Basic: default y-axis drag */}
      <FloatingButton
        offset={{ x: 24, y: 200 }}
        onPress={() => {}}
      >
        <Text className="text-sm font-bold text-primary-foreground">UP</Text>
      </FloatingButton>

      {/* Free drag */}
      <FloatingButton
        axis="xy"
        className="bg-success"
        offset={{ x: 24, y: 300 }}
      >
        <Text className="text-sm font-bold text-white">XY</Text>
      </FloatingButton>

      {/* Magnetic snap */}
      <FloatingButton
        axis="xy"
        className="bg-warning"
        magnetic="x"
        offset={{ x: 24, y: 400 }}
      >
        <Text className="text-sm font-bold text-white">MG</Text>
      </FloatingButton>

      {/* Visibility toggle */}
      <FloatingButton
        className="bg-destructive"
        offset={{ x: 90, y: 200 }}
        visible={visible}
      >
        <Text className="text-sm font-bold text-white">HI</Text>
      </FloatingButton>

      {/* Custom size */}
      <FloatingButton
        axis="xy"
        className="bg-info"
        offset={{ x: 90, y: 300 }}
        size={64}
      >
        <Text className="text-lg font-bold text-white">BIG</Text>
      </FloatingButton>
    </View>
  );
};

export { FloatingButtonDemo };
