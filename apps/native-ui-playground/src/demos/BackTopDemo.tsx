import { View } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { BackTop, Text } from '@skyroc/native-ui';

const BackTopDemo = () => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <View className="flex-1 bg-background">
      <Animated.ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="p-6"
        scrollEventThrottle={16}
      >
        <Text className="mb-4 text-lg font-semibold">Basic</Text>
        <Text className="mb-6 text-sm text-muted-foreground">
          Scroll down to see the BackTop button appear. It shows when scroll position exceeds 200px.
        </Text>

        {Array.from({ length: 50 }, (_, i) => (
          <View
            key={i}
            className="mb-3 rounded-lg bg-card p-4"
          >
            <Text className="text-sm text-foreground">Item {i + 1}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <BackTop target={scrollRef} />
    </View>
  );
};

export { BackTopDemo };
