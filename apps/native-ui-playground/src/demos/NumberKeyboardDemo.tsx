import { NumberKeyboard, Text } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const NumberKeyboardDemo = () => {
  const [defaultVisible, setDefaultVisible] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');

  const [customVisible, setCustomVisible] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const [extraVisible, setExtraVisible] = useState(false);
  const [extraValue, setExtraValue] = useState('');

  const [doubleExtraVisible, setDoubleExtraVisible] = useState(false);
  const [doubleExtraValue, setDoubleExtraValue] = useState('');

  const [titleVisible, setTitleVisible] = useState(false);
  const [titleValue, setTitleValue] = useState('');

  const [randomVisible, setRandomVisible] = useState(false);
  const [randomValue, setRandomValue] = useState('');

  const [maxVisible, setMaxVisible] = useState(false);
  const [maxValue, setMaxValue] = useState('');

  function closeAll() {
    setDefaultVisible(false);
    setCustomVisible(false);
    setExtraVisible(false);
    setDoubleExtraVisible(false);
    setTitleVisible(false);
    setRandomVisible(false);
    setMaxVisible(false);
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-80" showsVerticalScrollIndicator={false}>
        {/* 默认键盘 */}
        <Text className="mb-3 mt-4 px-4 text-lg font-semibold">默认键盘</Text>
        <View className="px-4">
          <Text className="mb-2 text-sm text-muted-foreground">当前值: {defaultValue || '(空)'}</Text>
          <View className="rounded-lg bg-background p-3">
            <Text
              className="text-base text-primary"
              onPress={() => {
                closeAll();
                setDefaultVisible(true);
              }}
            >
              弹出默认键盘
            </Text>
          </View>
        </View>

        {/* 带关闭按钮 */}
        <Text className="mb-3 mt-6 px-4 text-lg font-semibold">带标题与关闭按钮</Text>
        <View className="px-4">
          <Text className="mb-2 text-sm text-muted-foreground">当前值: {titleValue || '(空)'}</Text>
          <View className="rounded-lg bg-background p-3">
            <Text
              className="text-base text-primary"
              onPress={() => {
                closeAll();
                setTitleVisible(true);
              }}
            >
              弹出带标题键盘
            </Text>
          </View>
        </View>

        {/* 带额外按键 */}
        <Text className="mb-3 mt-6 px-4 text-lg font-semibold">额外按键</Text>
        <View className="px-4">
          <Text className="mb-2 text-sm text-muted-foreground">当前值: {extraValue || '(空)'}</Text>
          <View className="rounded-lg bg-background p-3">
            <Text
              className="text-base text-primary"
              onPress={() => {
                closeAll();
                setExtraVisible(true);
              }}
            >
              弹出带小数点键盘
            </Text>
          </View>
        </View>

        {/* 自定义主题 */}
        <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义主题</Text>
        <View className="px-4">
          <Text className="mb-2 text-sm text-muted-foreground">当前值: {customValue || '(空)'}</Text>
          <View className="rounded-lg bg-background p-3">
            <Text
              className="text-base text-primary"
              onPress={() => {
                closeAll();
                setCustomVisible(true);
              }}
            >
              弹出自定义主题键盘
            </Text>
          </View>
        </View>

        {/* 双额外按键 */}
        <Text className="mb-3 mt-6 px-4 text-lg font-semibold">双额外按键（自定义主题）</Text>
        <View className="px-4">
          <Text className="mb-2 text-sm text-muted-foreground">当前值: {doubleExtraValue || '(空)'}</Text>
          <View className="rounded-lg bg-background p-3">
            <Text
              className="text-base text-primary"
              onPress={() => {
                closeAll();
                setDoubleExtraVisible(true);
              }}
            >
              弹出双额外按键键盘
            </Text>
          </View>
        </View>

        {/* 随机排序 */}
        <Text className="mb-3 mt-6 px-4 text-lg font-semibold">随机排序</Text>
        <View className="px-4">
          <Text className="mb-2 text-sm text-muted-foreground">当前值: {randomValue || '(空)'}</Text>
          <View className="rounded-lg bg-background p-3">
            <Text
              className="text-base text-primary"
              onPress={() => {
                closeAll();
                setRandomVisible(true);
              }}
            >
              弹出随机排序键盘
            </Text>
          </View>
        </View>

        {/* 最大长度 */}
        <Text className="mb-3 mt-6 px-4 text-lg font-semibold">最大长度</Text>
        <View className="px-4">
          <Text className="mb-2 text-sm text-muted-foreground">当前值: {maxValue || '(空)'}（最多 6 位）</Text>
          <View className="rounded-lg bg-background p-3">
            <Text
              className="text-base text-primary"
              onPress={() => {
                closeAll();
                setMaxVisible(true);
              }}
            >
              弹出限制长度键盘
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* 键盘实例 */}
      <NumberKeyboard
        value={defaultValue}
        visible={defaultVisible}
        onBlur={() => setDefaultVisible(false)}
        onChange={setDefaultValue}
        onClose={() => setDefaultVisible(false)}
      />

      <NumberKeyboard
        closeButtonText="完成"
        title="数字键盘"
        value={titleValue}
        visible={titleVisible}
        onBlur={() => setTitleVisible(false)}
        onChange={setTitleValue}
        onClose={() => setTitleVisible(false)}
      />

      <NumberKeyboard
        extraKey="."
        value={extraValue}
        visible={extraVisible}
        onBlur={() => setExtraVisible(false)}
        onChange={setExtraValue}
        onClose={() => setExtraVisible(false)}
      />

      <NumberKeyboard
        closeButtonText="完成"
        theme="custom"
        value={customValue}
        visible={customVisible}
        onBlur={() => setCustomVisible(false)}
        onChange={setCustomValue}
        onClose={() => setCustomVisible(false)}
      />

      <NumberKeyboard
        closeButtonText="完成"
        extraKey={['.', 'X']}
        theme="custom"
        value={doubleExtraValue}
        visible={doubleExtraVisible}
        onBlur={() => setDoubleExtraVisible(false)}
        onChange={setDoubleExtraValue}
        onClose={() => setDoubleExtraVisible(false)}
      />

      <NumberKeyboard
        randomKeyOrder
        value={randomValue}
        visible={randomVisible}
        onBlur={() => setRandomVisible(false)}
        onChange={setRandomValue}
        onClose={() => setRandomVisible(false)}
      />

      <NumberKeyboard
        maxLength={6}
        value={maxValue}
        visible={maxVisible}
        onBlur={() => setMaxVisible(false)}
        onChange={setMaxValue}
        onClose={() => setMaxVisible(false)}
      />
    </View>
  );
};

export { NumberKeyboardDemo };
