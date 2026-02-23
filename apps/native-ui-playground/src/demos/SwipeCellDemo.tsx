import { useRef } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, Cell, SwipeCell, Text } from '@skyroc/native-ui';
import type { SwipeCellBeforeCloseParams, SwipeCellInstance } from '@skyroc/native-ui';

const SwipeCellDemo = () => {
  const swipeCellRef = useRef<SwipeCellInstance>(null);

  function handleBeforeClose({ position }: SwipeCellBeforeCloseParams) {
    if (position === 'cell') {
      return new Promise<boolean>(resolve => {
        Alert.alert('提示', '确定要关闭吗？', [
          { text: '取消', onPress: () => resolve(false), style: 'cancel' },
          { text: '确定', onPress: () => resolve(true) }
        ]);
      });
    }
    return true;
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <SwipeCell
        leading={
          <View className="w-16 items-center justify-center bg-primary">
            <Text className="text-sm text-primary-foreground">选择</Text>
          </View>
        }
        trailing={
          <>
            <View className="w-16 items-center justify-center bg-primary">
              <Text className="text-sm text-primary-foreground">编辑</Text>
            </View>
            <View className="w-16 items-center justify-center bg-destructive">
              <Text className="text-sm text-destructive-foreground">删除</Text>
            </View>
          </>
        }
      >
        <Cell title="单元格" trailing="内容" />
      </SwipeCell>

      {/* Before Close */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">异步关闭</Text>
      <SwipeCell
        beforeClose={handleBeforeClose}
        trailing={
          <View className="w-16 items-center justify-center bg-destructive">
            <Text className="text-sm text-destructive-foreground">删除</Text>
          </View>
        }
      >
        <Cell title="单元格" trailing="点击内容区关闭时弹窗确认" />
      </SwipeCell>

      {/* Custom Width */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义宽度</Text>
      <SwipeCell
        leading={
          <View className="w-[100px] items-center justify-center bg-primary">
            <Text className="text-sm text-primary-foreground">收藏</Text>
          </View>
        }
        leadingWidth={100}
        trailing={
          <View className="w-[80px] items-center justify-center bg-destructive">
            <Text className="text-sm text-destructive-foreground">删除</Text>
          </View>
        }
        trailingWidth={80}
      >
        <Cell title="单元格" trailing="自定义宽度" />
      </SwipeCell>

      {/* Disabled */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">禁用滑动</Text>
      <SwipeCell
        disabled
        trailing={
          <View className="w-16 items-center justify-center bg-destructive">
            <Text className="text-sm text-destructive-foreground">删除</Text>
          </View>
        }
      >
        <Cell title="单元格" trailing="禁用状态" />
      </SwipeCell>

      {/* Programmatic Control */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">编程式控制</Text>
      <View className="mb-3 flex-row gap-3 px-4">
        <Button size="sm" onPress={() => swipeCellRef.current?.open('left')}>
          打开左侧
        </Button>
        <Button size="sm" onPress={() => swipeCellRef.current?.open('right')}>
          打开右侧
        </Button>
        <Button size="sm" variant="outline" onPress={() => swipeCellRef.current?.close()}>
          关闭
        </Button>
      </View>
      <SwipeCell
        ref={swipeCellRef}
        leading={
          <View className="w-16 items-center justify-center bg-primary">
            <Text className="text-sm text-primary-foreground">选择</Text>
          </View>
        }
        trailing={
          <View className="w-16 items-center justify-center bg-destructive">
            <Text className="text-sm text-destructive-foreground">删除</Text>
          </View>
        }
      >
        <Cell title="单元格" trailing="编程式控制" />
      </SwipeCell>

      {/* Events */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">事件监听</Text>
      <SwipeCell
        name="event-demo"
        trailing={
          <>
            <View className="w-16 items-center justify-center bg-primary">
              <Text className="text-sm text-primary-foreground">编辑</Text>
            </View>
            <View className="w-16 items-center justify-center bg-destructive">
              <Text className="text-sm text-destructive-foreground">删除</Text>
            </View>
          </>
        }
        onClose={({ name, position }) => Alert.alert('关闭', `name: ${name}, position: ${position}`)}
        onOpen={({ name, position }) => Alert.alert('打开', `name: ${name}, position: ${position}`)}
      >
        <Cell title="单元格" trailing="滑动查看事件" />
      </SwipeCell>
    </ScrollView>
  );
};

export { SwipeCellDemo };
