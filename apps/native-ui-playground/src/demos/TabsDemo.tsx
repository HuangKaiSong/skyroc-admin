import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { Tabs, Text } from '@skyroc/native-ui';
import type { TabItem } from '@skyroc/native-ui';

const BASIC_ITEMS: TabItem[] = [
  {
    key: 'tab1',
    title: 'Tab 1',
    children: (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg font-semibold">Tab 1 Content</Text>
        <Text className="mt-2 text-sm text-muted-foreground">This is the first tab panel.</Text>
      </View>
    )
  },
  {
    key: 'tab2',
    title: 'Tab 2',
    children: (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg font-semibold">Tab 2 Content</Text>
        <Text className="mt-2 text-sm text-muted-foreground">This is the second tab panel.</Text>
      </View>
    )
  },
  {
    key: 'tab3',
    title: 'Tab 3',
    children: (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg font-semibold">Tab 3 Content</Text>
        <Text className="mt-2 text-sm text-muted-foreground">This is the third tab panel.</Text>
      </View>
    )
  }
];

const DISABLED_ITEMS: TabItem[] = [
  {
    key: 'd1',
    title: 'Active',
    children: (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg font-semibold">Active Tab</Text>
      </View>
    )
  },
  {
    key: 'd2',
    title: 'Disabled',
    disabled: true,
    children: (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg font-semibold">Disabled Tab</Text>
      </View>
    )
  },
  {
    key: 'd3',
    title: 'Normal',
    children: (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg font-semibold">Normal Tab</Text>
      </View>
    )
  }
];

const SCROLLABLE_ITEMS: TabItem[] = Array.from({ length: 8 }, (_, i) => ({
  key: `scroll-${i}`,
  title: `Tab ${i + 1}`,
  children: (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="text-lg font-semibold">Panel {i + 1}</Text>
      <Text className="mt-2 text-sm text-muted-foreground">Scrollable tab content {i + 1}</Text>
    </View>
  )
}));

/** 模拟异步加载的面板内容 */
const DelayedContent = (props: { label: string }) => {
  const { label } = props;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loaded) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <ActivityIndicator className="text-primary" size="large" />
        <Text className="mt-3 text-sm text-muted-foreground">Loading {label}...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center p-6">
      <Text className="text-lg font-semibold">{label} loaded</Text>
      <Text className="mt-2 text-sm text-muted-foreground">Content appeared after 2s delay.</Text>
    </View>
  );
};

const LAZY_ITEMS: TabItem[] = [
  {
    key: 'lazy1',
    title: 'Eager',
    children: (
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-lg font-semibold">Loaded immediately</Text>
      </View>
    )
  },
  {
    key: 'lazy2',
    title: 'Lazy A',
    children: <DelayedContent label="Lazy A" />
  },
  {
    key: 'lazy3',
    title: 'Lazy B',
    children: <DelayedContent label="Lazy B" />
  }
];

const TabsDemo = () => {
  const [controlledIndex, setControlledIndex] = useState(0);

  return (
    <ScrollView
      className="flex-1 bg-muted"
      contentContainerClassName="pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic Line */}
      <Text className="px-6 pb-3 pt-6 text-lg font-semibold">Basic (Line)</Text>
      <View className="mx-4 h-52 overflow-hidden rounded-2xl bg-background">
        <Tabs items={BASIC_ITEMS} />
      </View>

      {/* Pill Type */}
      <Text className="px-6 pb-3 pt-6 text-lg font-semibold">Pill Type</Text>
      <View className="mx-4 h-52 overflow-hidden rounded-2xl bg-background">
        <Tabs items={BASIC_ITEMS} type="pill" />
      </View>

      {/* Swipeable Disabled */}
      <Text className="px-6 pb-3 pt-6 text-lg font-semibold">Swipeable Disabled</Text>
      <View className="mx-4 h-52 overflow-hidden rounded-2xl bg-background">
        <Tabs items={BASIC_ITEMS} swipeable={false} />
      </View>

      {/* Lazy Loading */}
      <Text className="px-6 pb-3 pt-6 text-lg font-semibold">Lazy Loading</Text>
      <View className="mx-4 h-52 overflow-hidden rounded-2xl bg-background">
        <Tabs items={LAZY_ITEMS} lazy />
      </View>

      {/* Scrollable Tabs */}
      <Text className="px-6 pb-3 pt-6 text-lg font-semibold">Scrollable (8 tabs)</Text>
      <View className="mx-4 h-52 overflow-hidden rounded-2xl bg-background">
        <Tabs items={SCROLLABLE_ITEMS} />
      </View>

      {/* Disabled Tab */}
      <Text className="px-6 pb-3 pt-6 text-lg font-semibold">Disabled Tab</Text>
      <View className="mx-4 h-52 overflow-hidden rounded-2xl bg-background">
        <Tabs items={DISABLED_ITEMS} />
      </View>

      {/* Controlled */}
      <Text className="px-6 pb-3 pt-6 text-lg font-semibold">Controlled</Text>
      <View className="mx-4 h-52 overflow-hidden rounded-2xl bg-background">
        <Tabs
          activeIndex={controlledIndex}
          items={BASIC_ITEMS}
          onIndexChange={setControlledIndex}
        />
      </View>
      <Text className="px-6 pt-2 text-sm text-muted-foreground">
        Current index: {controlledIndex}
      </Text>
    </ScrollView>
  );
};

export { TabsDemo };
