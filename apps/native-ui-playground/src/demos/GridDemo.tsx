import { Alert, ScrollView, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Grid, Text } from '@skyroc/native-ui';
import type { GridItemData } from '@skyroc/native-ui';

const BASIC_ITEMS: GridItemData[] = [
  { icon: <AntDesign color="#1989fa" name="picture" size={24} />, text: '图片' },
  { icon: <AntDesign color="#1989fa" name="gift" size={24} />, text: '礼物' },
  { icon: <AntDesign color="#1989fa" name="star" size={24} />, text: '收藏' },
  { icon: <AntDesign color="#1989fa" name="heart" size={24} />, text: '喜欢' }
];

const COLUMN_ITEMS: GridItemData[] = Array.from({ length: 6 }, (_, i) => ({
  icon: <AntDesign color="#1989fa" name="appstore" size={24} />,
  key: `col-${i}`,
  text: `文字 ${i + 1}`
}));

const SQUARE_ITEMS: GridItemData[] = Array.from({ length: 8 }, (_, i) => ({
  icon: <AntDesign color="#1989fa" name="picture" size={24} />,
  key: `sq-${i}`,
  text: `文字 ${i + 1}`
}));

const GUTTER_ITEMS: GridItemData[] = Array.from({ length: 8 }, (_, i) => ({
  className: 'rounded-lg bg-background',
  icon: <AntDesign color="#1989fa" name="picture" size={24} />,
  key: `gut-${i}`,
  text: `文字 ${i + 1}`
}));

const HORIZONTAL_ITEMS: GridItemData[] = [
  { icon: <AntDesign color="#1989fa" name="picture" size={24} />, text: '图片' },
  { icon: <AntDesign color="#1989fa" name="gift" size={24} />, text: '礼物' },
  { icon: <AntDesign color="#1989fa" name="star" size={24} />, text: '收藏' }
];

const BORDER_ITEMS: GridItemData[] = Array.from({ length: 8 }, (_, i) => ({
  icon: <AntDesign color="#1989fa" name="appstore" size={24} />,
  key: `bdr-${i}`,
  text: `文字 ${i + 1}`
}));

const CLICKABLE_ITEMS: GridItemData[] = [
  { icon: <AntDesign color="#1989fa" name="picture" size={24} />, onPress: () => Alert.alert('点击', '图片'), text: '图片' },
  { icon: <AntDesign color="#1989fa" name="gift" size={24} />, onPress: () => Alert.alert('点击', '礼物'), text: '礼物' },
  { icon: <AntDesign color="#1989fa" name="star" size={24} />, onPress: () => Alert.alert('点击', '收藏'), text: '收藏' }
];

const CUSTOM_ITEMS: GridItemData[] = [
  {
    children: (
      <View className="items-center gap-2 p-2">
        <AntDesign color="#ee0a24" name="heart" size={32} />
        <Text className="text-base font-semibold">自定义内容</Text>
        <Text className="text-xs text-muted-foreground">可放入任意组件</Text>
      </View>
    ),
    key: 'custom-1'
  },
  {
    children: (
      <View className="items-center gap-2 p-2">
        <AntDesign color="#ff976a" name="star" size={32} />
        <Text className="text-base font-semibold">自定义内容</Text>
        <Text className="text-xs text-muted-foreground">完全自由布局</Text>
      </View>
    ),
    key: 'custom-2'
  }
];

const GridDemo = () => {
  return (
    <ScrollView
      className="flex-1 bg-muted"
      contentContainerClassName="p-6 pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid items={BASIC_ITEMS} />
      </View>

      {/* Column Count */}
      <Text className="mb-4 text-lg font-semibold">Column Count</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={3} items={COLUMN_ITEMS} />
      </View>

      {/* Square */}
      <Text className="mb-4 text-lg font-semibold">Square</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={4} items={SQUARE_ITEMS} square />
      </View>

      {/* Gutter */}
      <Text className="mb-4 text-lg font-semibold">Gutter</Text>
      <View className="mb-8">
        <Grid columnNum={4} gutter={10} items={GUTTER_ITEMS} />
      </View>

      {/* Horizontal */}
      <Text className="mb-4 text-lg font-semibold">Horizontal</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={3} direction="horizontal" items={HORIZONTAL_ITEMS} />
      </View>

      {/* Reverse */}
      <Text className="mb-4 text-lg font-semibold">Reverse</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={3} items={HORIZONTAL_ITEMS} reverse />
      </View>

      {/* Border */}
      <Text className="mb-4 text-lg font-semibold">Border</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid border columnNum={4} items={BORDER_ITEMS} />
      </View>

      {/* Clickable */}
      <Text className="mb-4 text-lg font-semibold">Clickable</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid clickable columnNum={3} items={CLICKABLE_ITEMS} />
      </View>

      {/* Custom Content */}
      <Text className="mb-4 text-lg font-semibold">Custom Content</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={2} items={CUSTOM_ITEMS} />
      </View>
    </ScrollView>
  );
};

export { GridDemo };
