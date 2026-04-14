import { Text, TreeSelect } from '@skyroc/native-ui';
import type { TreeSelectItem } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const BASIC_ITEMS: TreeSelectItem[] = [
  {
    text: '浙江',
    children: [
      { id: 1, text: '杭州' },
      { id: 2, text: '温州' },
      { id: 3, text: '宁波', disabled: true }
    ]
  },
  {
    text: '江苏',
    children: [
      { id: 4, text: '南京' },
      { id: 5, text: '苏州' },
      { id: 6, text: '无锡' }
    ]
  },
  {
    text: '福建',
    disabled: true,
    children: [
      { id: 7, text: '福州' },
      { id: 8, text: '厦门' }
    ]
  }
];

const BADGE_ITEMS: TreeSelectItem[] = [
  {
    text: '浙江',
    dot: true,
    children: [
      { id: 1, text: '杭州' },
      { id: 2, text: '温州' }
    ]
  },
  {
    text: '江苏',
    badge: 5,
    children: [
      { id: 3, text: '南京' },
      { id: 4, text: '苏州' }
    ]
  }
];

const TreeSelectDemo = () => {
  const [activeId, setActiveId] = useState<number | string>(1);
  const [mainIndex, setMainIndex] = useState(0);
  const [multiIds, setMultiIds] = useState<(number | string)[]>([1, 2]);
  const [multiMainIndex, setMultiMainIndex] = useState(0);

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="p-4 pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic - Radio */}
      <Text className="mb-3 text-lg font-semibold">Radio Mode</Text>
      <View className="mb-6 overflow-hidden rounded-2xl">
        <TreeSelect
          activeId={activeId}
          height={260}
          items={BASIC_ITEMS}
          mainActiveIndex={mainIndex}
          onActiveIdChange={setActiveId}
          onMainActiveIndexChange={setMainIndex}
        />
      </View>

      {/* Multiple */}
      <Text className="mb-3 text-lg font-semibold">Multiple Mode (max: 3)</Text>
      <View className="mb-6 overflow-hidden rounded-2xl">
        <TreeSelect
          activeId={multiIds}
          height={260}
          items={BASIC_ITEMS}
          mainActiveIndex={multiMainIndex}
          max={3}
          onActiveIdChange={setMultiIds}
          onMainActiveIndexChange={setMultiMainIndex}
        />
      </View>

      {/* Badge */}
      <Text className="mb-3 text-lg font-semibold">Badge</Text>
      <View className="mb-6 overflow-hidden rounded-2xl">
        <TreeSelect height={220} items={BADGE_ITEMS} />
      </View>

      {/* Custom Content */}
      <Text className="mb-3 text-lg font-semibold">Custom Content</Text>
      <View className="mb-6 overflow-hidden rounded-2xl">
        <TreeSelect
          height={220}
          items={[{ text: '分组 1' }, { text: '分组 2' }, { text: '分组 3' }]}
          renderContent={() => (
            <View className="flex-1 items-center justify-center p-4">
              <Text className="text-2xl">🎉</Text>
              <Text className="mt-2 text-sm text-muted-foreground">Custom content area</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

export { TreeSelectDemo };
