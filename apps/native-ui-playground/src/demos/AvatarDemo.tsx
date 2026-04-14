import { Avatar, Text } from '@skyroc/native-ui';
import { ScrollView, View } from 'react-native';

const AvatarDemo = () => {
  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Sizes */}
      <Text className="mb-4 text-lg font-semibold">Sizes</Text>
      <View className="mb-8 flex-row items-end gap-3">
        <Avatar className="w-5 h-5" size="xs" src="https://assets.skyroc.me/asset/logo.svg" />
        <Avatar size="sm" src="https://assets.skyroc.me/asset/logo.png" />

        <Avatar size="md" src="https://picsum.photos/seed/av3/100" />
        <Avatar size="lg" src="https://picsum.photos/seed/av4/100" />
        <Avatar size="xl" src="https://picsum.photos/seed/av5/100" />
        <Avatar size="2xl" src="https://picsum.photos/seed/av6/100" />
      </View>

      {/* Fallback - Initials */}
      <Text className="mb-4 text-lg font-semibold">Fallback (Initials)</Text>

      <View className="mb-8 flex-row items-end gap-3">
        <Avatar fallback="A" size="xs" />
        <Avatar fallback="BC" size="sm" />
        <Avatar fallback="DE" size="md" />
        <Avatar fallback="FG" size="lg" />
        <Avatar fallback="HI" size="xl" />
        <Avatar fallback="JK" size="2xl" />
      </View>

      {/* Fallback - Error */}
      <Text className="mb-4 text-lg font-semibold">Fallback (Error)</Text>
      <View className="mb-8 flex-row items-end gap-3">
        <Avatar fallback="E" size="md" src="https://invalid-url.test/broken.jpg" />
        <Avatar fallback="R" size="lg" src="https://invalid-url.test/broken.jpg" />
      </View>

      {/* No src, no fallback */}
      <Text className="mb-4 text-lg font-semibold">Empty</Text>
      <View className="mb-8 flex-row gap-3">
        <Avatar size="md" />
        <Avatar size="lg" />
      </View>
    </ScrollView>
  );
};

export { AvatarDemo };
