import { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextEllipsis } from '@skyroc/native-ui';
import type { TextEllipsisRef } from '@skyroc/native-ui';

const LONG_TEXT =
  '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。在这个世界上，没有一劳永逸的答案，也没有完美的解决方案。我们需要不断地学习、成长和适应变化。每一次挫折都是一次学习的机会，每一次失败都是成功的前奏。';

const TextEllipsisDemo = () => {
  const ellipsisRef = useRef<TextEllipsisRef>(null);

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic (1 row) */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic (1 Row)</Text>
      <View className="bg-background px-4 py-4">
        <TextEllipsis content={LONG_TEXT} expandText="展开" />
      </View>

      {/* Multiple Rows */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Multiple Rows (3 Rows)</Text>
      <View className="bg-background px-4 py-4">
        <TextEllipsis content={LONG_TEXT} expandText="展开" rows={3} />
      </View>

      {/* Expand & Collapse */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Expand & Collapse</Text>
      <View className="bg-background px-4 py-4">
        <TextEllipsis
          collapseText="收起"
          content={LONG_TEXT}
          expandText="展开"
          rows={2}
        />
      </View>

      {/* Custom Dots */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Dots</Text>
      <View className="bg-background px-4 py-4">
        <TextEllipsis
          content={LONG_TEXT}
          dots=" ···"
          expandText="展开"
          rows={2}
        />
      </View>

      {/* Programmatic Control */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Programmatic Control</Text>
      <View className="bg-background px-4 py-4">
        <TextEllipsis
          ref={ellipsisRef}
          content={LONG_TEXT}
          rows={2}
        />
        <View className="mt-3 flex-row gap-2">
          <Button size="sm" onPress={() => ellipsisRef.current?.toggle(true)}>Expand</Button>
          <Button size="sm" variant="outline" onPress={() => ellipsisRef.current?.toggle(false)}>Collapse</Button>
        </View>
      </View>
    </ScrollView>
  );
};

export { TextEllipsisDemo };
