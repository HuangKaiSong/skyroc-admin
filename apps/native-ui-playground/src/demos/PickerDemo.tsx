import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Picker, PickerView, Text } from '@skyroc/native-ui';
import type { PickerOption } from '@skyroc/native-ui';

const FRUITS: PickerOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
];

const YEARS: PickerOption[] = Array.from({ length: 10 }, (_, i) => ({
  label: `${2020 + i}`,
  value: `${2020 + i}`,
}));

const MONTHS: PickerOption[] = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} Month`,
  value: `${i + 1}`,
}));

const DAYS: PickerOption[] = Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1} Day`,
  value: `${i + 1}`,
}));

const CASCADE_DATA: PickerOption[] = [
  {
    label: 'Zhejiang',
    value: 'zhejiang',
    children: [
      {
        label: 'Hangzhou',
        value: 'hangzhou',
        children: [
          { label: 'Xihu', value: 'xihu' },
          { label: 'Binjiang', value: 'binjiang' },
          { label: 'Yuhang', value: 'yuhang' },
        ],
      },
      {
        label: 'Ningbo',
        value: 'ningbo',
        children: [
          { label: 'Haishu', value: 'haishu' },
          { label: 'Jiangbei', value: 'jiangbei' },
        ],
      },
    ],
  },
  {
    label: 'Jiangsu',
    value: 'jiangsu',
    children: [
      {
        label: 'Nanjing',
        value: 'nanjing',
        children: [
          { label: 'Xuanwu', value: 'xuanwu' },
          { label: 'Gulou', value: 'gulou' },
        ],
      },
      {
        label: 'Suzhou',
        value: 'suzhou',
        children: [
          { label: 'Gusu', value: 'gusu' },
          { label: 'Huqiu', value: 'huqiu' },
        ],
      },
    ],
  },
];



const PickerDemo = () => {
  const [sheetShow, setSheetShow] = useState(false);
  const [sheetValue, setSheetValue] = useState<string[]>(['orange']);
  const [asyncLoading, setAsyncLoading] = useState(true);


  function loadAsyncData() {
    setAsyncLoading(true);

    setTimeout(() => {

      setAsyncLoading(false);
    }, 1500);
  }

  useEffect(() => {
    loadAsyncData();
  }, []);


  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic</Text>
      <PickerView
        columns={FRUITS}
        defaultValue={['orange']}
        haptic
        showToolbar={false}
      />

      {/* Multiple Columns */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Multiple Columns</Text>
      <PickerView
        columns={[YEARS, MONTHS, DAYS]}
        defaultValue={['2026', '2', '21']}
        title="Select Date"
      />

      {/* Cascade */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Cascade</Text>
      <PickerView
        columns={CASCADE_DATA}
        defaultValue={['zhejiang', 'hangzhou', 'xihu']}
        title="Select Region"
      />

      {/* With Sheet */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">With Sheet</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setSheetShow(true)}>
            Open Picker
          </Button>
          <Text className="text-sm text-muted-foreground">
            Selected: {sheetValue.join(', ') || 'None'}
          </Text>
        </View>

        <Picker
          columns={FRUITS}
          onConfirm={setSheetValue}
          onUpdateShow={setSheetShow}
          show={sheetShow}
          title="Select Fruit"
          value={sheetValue}
        />
      </View>


      {/* Async Loading */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Async Loading</Text>
      <View className="bg-background px-4 py-3">
        <Button size="sm" onPress={loadAsyncData}>Reload Data</Button>
      </View>
      <PickerView
        columns={asyncLoading ? [] : FRUITS}
        defaultValue={['apple']}
        loading={asyncLoading}
        showToolbar={false}
      />


    </ScrollView>
  );
};

export { PickerDemo };
