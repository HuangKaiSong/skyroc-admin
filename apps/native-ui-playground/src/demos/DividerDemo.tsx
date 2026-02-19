import { ScrollView, View } from 'react-native';
import { Divider, Text } from '@skyroc/native-ui';

const DividerDemo = () => {
  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8">
        <Text className="text-sm">Some content above</Text>
        <Divider />
        <Text className="text-sm">Some content below</Text>
      </View>

      {/* With Text */}
      <Text className="mb-4 text-lg font-semibold">With Text</Text>
      <View className="mb-8">
        <Divider>Center Text</Divider>
        <Divider contentPosition="left">Left Text</Divider>
        <Divider contentPosition="right">Right Text</Divider>
      </View>

      {/* Dashed */}
      <Text className="mb-4 text-lg font-semibold">Dashed</Text>
      <View className="mb-8">
        <Divider dashed />
        <Divider dashed>Dashed with Text</Divider>
      </View>

      {/* Hairline */}
      <Text className="mb-4 text-lg font-semibold">Hairline vs 1px</Text>
      <View className="mb-8">
        <Text className="mb-1 text-xs text-muted-foreground">hairline (default)</Text>
        <Divider />
        <Text className="mb-1 text-xs text-muted-foreground">1px (hairline=false)</Text>
        <Divider hairline={false} />
      </View>

      {/* Vertical */}
      <Text className="mb-4 text-lg font-semibold">Vertical</Text>
      <View className="mb-8 flex-row items-center">
        <Text className="text-sm">Left</Text>
        <Divider orientation="vertical" />
        <Text className="text-sm">Center</Text>
        <Divider orientation="vertical" />
        <Text className="text-sm">Right</Text>
      </View>

      {/* Vertical Dashed */}
      <Text className="mb-4 text-lg font-semibold">Vertical Dashed</Text>
      <View className="mb-8 h-12 flex-row items-center">
        <Text className="text-sm">A</Text>
        <Divider dashed orientation="vertical" />
        <Text className="text-sm">B</Text>
        <Divider dashed orientation="vertical" />
        <Text className="text-sm">C</Text>
      </View>

      {/* Custom Style */}
      <Text className="mb-4 text-lg font-semibold">Custom Style</Text>
      <View className="mb-8">
        <Divider lineClassName="bg-primary" />
        <Divider lineClassName="bg-destructive" textClassName="text-destructive">Warning</Divider>
      </View>
    </ScrollView>
  );
};

export { DividerDemo };
