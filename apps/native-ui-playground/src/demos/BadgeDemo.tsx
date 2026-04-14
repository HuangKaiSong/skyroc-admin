import { Avatar, Badge, Text } from '@skyroc/native-ui';
import { ScrollView, View } from 'react-native';

const BadgeDemo = () => {
  return (
    <ScrollView className="flex-1 bg-background p-6">
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8 flex-row items-center gap-6">
        <Badge content={5}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content={10}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content="new">
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
      </View>

      {/* Max */}
      <Text className="mb-4 text-lg font-semibold">Max</Text>
      <View className="mb-8 flex-row items-center gap-6">
        <Badge content={20} max={9}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content={150} max={99}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content={1000} max={999}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
      </View>

      {/* Dot */}
      <Text className="mb-4 text-lg font-semibold">Dot</Text>
      <View className="mb-8 flex-row items-center gap-6">
        <Badge dot>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge dot>
          <Avatar fallback="AB" size="md" />
        </Badge>
      </View>

      {/* Show Zero */}
      <Text className="mb-4 text-lg font-semibold">Show Zero</Text>
      <View className="mb-8 flex-row items-center gap-6">
        <Badge content={0} showZero>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content={0} showZero={false}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
      </View>

      {/* Position */}
      <Text className="mb-4 text-lg font-semibold">Position</Text>
      <View className="mb-8 flex-row items-center gap-6">
        <Badge content={1} position="top-left">
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content={2} position="top-right">
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content={3} position="bottom-left">
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge content={4} position="bottom-right">
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
      </View>

      {/* Standalone */}
      <Text className="mb-4 text-lg font-semibold">Standalone</Text>
      <View className="mb-8 flex-row items-center gap-4">
        <Badge content={20} />
        <Badge content={100} max={99} />
        <Badge content="new" />
        <Badge dot />
      </View>

      {/* Custom Color */}
      <Text className="mb-4 text-lg font-semibold">Custom Color</Text>
      <View className="mb-8 flex-row items-center gap-6">
        <Badge badgeClassName="bg-primary" content={5}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge badgeClassName="bg-success" content={10}>
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
        <Badge badgeClassName="bg-warning" content="hot">
          <View className="h-10 w-10 rounded-lg bg-primary/20" />
        </Badge>
      </View>

      {/* With Avatar */}
      <Text className="mb-4 text-lg font-semibold">With Avatar</Text>
      <View className="mb-8 flex-row items-center gap-6">
        <Badge content={3}>
          <Avatar fallback="AB" size="lg" />
        </Badge>
        <Badge dot>
          <Avatar fallback="CD" size="lg" />
        </Badge>
        <Badge content={99} max={99}>
          <Avatar fallback="EF" size="lg" />
        </Badge>
      </View>
    </ScrollView>
  );
};

export { BadgeDemo };
