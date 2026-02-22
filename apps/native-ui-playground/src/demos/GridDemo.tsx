import { Alert, ScrollView, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Grid, GridItem, Text } from '@skyroc/native-ui';

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
        <Grid>
          <GridItem icon={<AntDesign color="#1989fa" name="picture" size={24} />} text="图片" />
          <GridItem icon={<AntDesign color="#1989fa" name="gift" size={24} />} text="礼物" />
          <GridItem icon={<AntDesign color="#1989fa" name="star" size={24} />} text="收藏" />
          <GridItem icon={<AntDesign color="#1989fa" name="heart" size={24} />} text="喜欢" />
        </Grid>
      </View>

      {/* Column Count */}
      <Text className="mb-4 text-lg font-semibold">Column Count</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <GridItem key={i} icon={<AntDesign color="#1989fa" name="appstore" size={24} />} text={`文字 ${i + 1}`} />
          ))}
        </Grid>
      </View>

      {/* Square */}
      <Text className="mb-4 text-lg font-semibold">Square</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={4} square>
          {Array.from({ length: 8 }).map((_, i) => (
            <GridItem key={i} icon={<AntDesign color="#1989fa" name="picture" size={24} />} text={`文字 ${i + 1}`} />
          ))}
        </Grid>
      </View>

      {/* Gutter */}
      <Text className="mb-4 text-lg font-semibold">Gutter</Text>
      <View className="mb-8">
        <Grid columnNum={4} gutter={10}>
          {Array.from({ length: 8 }).map((_, i) => (
            <GridItem key={i} className="rounded-lg bg-background" icon={<AntDesign color="#1989fa" name="picture" size={24} />} text={`文字 ${i + 1}`} />
          ))}
        </Grid>
      </View>

      {/* Horizontal */}
      <Text className="mb-4 text-lg font-semibold">Horizontal</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={3} direction="horizontal">
          <GridItem icon={<AntDesign color="#1989fa" name="picture" size={24} />} text="图片" />
          <GridItem icon={<AntDesign color="#1989fa" name="gift" size={24} />} text="礼物" />
          <GridItem icon={<AntDesign color="#1989fa" name="star" size={24} />} text="收藏" />
        </Grid>
      </View>

      {/* Reverse */}
      <Text className="mb-4 text-lg font-semibold">Reverse</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={3} reverse>
          <GridItem icon={<AntDesign color="#1989fa" name="picture" size={24} />} text="图片" />
          <GridItem icon={<AntDesign color="#1989fa" name="gift" size={24} />} text="礼物" />
          <GridItem icon={<AntDesign color="#1989fa" name="star" size={24} />} text="收藏" />
        </Grid>
      </View>

      {/* Border */}
      <Text className="mb-4 text-lg font-semibold">Border</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid border columnNum={4}>
          {Array.from({ length: 8 }).map((_, i) => (
            <GridItem key={i} icon={<AntDesign color="#1989fa" name="appstore" size={24} />} text={`文字 ${i + 1}`} />
          ))}
        </Grid>
      </View>

      {/* Clickable */}
      <Text className="mb-4 text-lg font-semibold">Clickable</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid clickable columnNum={3}>
          <GridItem icon={<AntDesign color="#1989fa" name="picture" size={24} />} text="图片" onPress={() => Alert.alert('点击', '图片')} />
          <GridItem icon={<AntDesign color="#1989fa" name="gift" size={24} />} text="礼物" onPress={() => Alert.alert('点击', '礼物')} />
          <GridItem icon={<AntDesign color="#1989fa" name="star" size={24} />} text="收藏" onPress={() => Alert.alert('点击', '收藏')} />
        </Grid>
      </View>

      {/* Custom Content */}
      <Text className="mb-4 text-lg font-semibold">Custom Content</Text>
      <View className="mb-8 overflow-hidden rounded-xl bg-background">
        <Grid columnNum={2}>
          <GridItem>
            <View className="items-center gap-2 p-2">
              <AntDesign color="#ee0a24" name="heart" size={32} />
              <Text className="text-base font-semibold">自定义内容</Text>
              <Text className="text-xs text-muted-foreground">可放入任意组件</Text>
            </View>
          </GridItem>
          <GridItem>
            <View className="items-center gap-2 p-2">
              <AntDesign color="#ff976a" name="star" size={32} />
              <Text className="text-base font-semibold">自定义内容</Text>
              <Text className="text-xs text-muted-foreground">完全自由布局</Text>
            </View>
          </GridItem>
        </Grid>
      </View>
    </ScrollView>
  );
};

export { GridDemo };
