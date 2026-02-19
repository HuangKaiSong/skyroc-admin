import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Sheet, Text } from '@skyroc/native-ui';

const SheetDemo = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showNoClose, setShowNoClose] = useState(false);

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8 gap-3">
        <Button onPress={() => setShowBasic(true)}>Basic Sheet</Button>
        <Button variant="tonal" onPress={() => setShowTitle(true)}>With Title</Button>
        <Button variant="tonal" onPress={() => setShowDesc(true)}>Title + Description</Button>
        <Button variant="tonal" onPress={() => setShowNoClose(true)}>No Close Button</Button>
      </View>

      {/* Basic */}
      <Sheet
        show={showBasic}
        onUpdateShow={setShowBasic}
      >
        <View className="items-center px-6 py-10">
          <Text className="text-base text-foreground">Sheet Content</Text>
        </View>
      </Sheet>

      {/* With Title */}
      <Sheet
        show={showTitle}
        title="Sheet Title"
        onUpdateShow={setShowTitle}
      >
        <View className="items-center px-6 py-10">
          <Text className="text-base text-foreground">Custom content goes here</Text>
        </View>
      </Sheet>

      {/* Title + Description */}
      <Sheet
        description="This is a description below the title"
        show={showDesc}
        title="Sheet Title"
        onUpdateShow={setShowDesc}
      >
        <View className="items-center px-6 py-10">
          <Text className="text-base text-foreground">Content with description</Text>
        </View>
      </Sheet>

      {/* No Close */}
      <Sheet
        closeable={false}
        show={showNoClose}
        title="No Close Button"
        onUpdateShow={setShowNoClose}
      >
        <View className="items-center px-6 py-10">
          <Text className="mb-4 text-base text-foreground">Tap backdrop to close</Text>
        </View>
      </Sheet>
    </ScrollView>
  );
};

export { SheetDemo };
