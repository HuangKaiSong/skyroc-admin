import { Button, PickerGroup, PickerGroupView, Text } from '@skyroc/native-ui';
import type { PickerGroupItem, PickerOption } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const YEARS: PickerOption[] = Array.from({ length: 10 }, (_, i) => ({
  label: `${2020 + i}`,
  value: `${2020 + i}`
}));

const MONTHS: PickerOption[] = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1} Month`,
  value: `${i + 1}`
}));

const DAYS: PickerOption[] = Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1} Day`,
  value: `${i + 1}`
}));

const HOURS: PickerOption[] = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}h`,
  value: `${i}`
}));

const MINUTES: PickerOption[] = Array.from({ length: 60 }, (_, i) => ({
  label: `${i}m`,
  value: `${i}`
}));

const DATE_TIME_PICKERS: PickerGroupItem[] = [
  {
    columns: [YEARS, MONTHS, DAYS],
    defaultValue: ['2026', '2', '23'],
    title: 'Date'
  },
  {
    columns: [HOURS, MINUTES],
    defaultValue: ['12', '0'],
    title: 'Time'
  }
];

const PickerGroupDemo = () => {
  const [sheetShow, setSheetShow] = useState(false);
  const [values, setValues] = useState<string[][]>([
    ['2026', '2', '23'],
    ['12', '0']
  ]);

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Inline */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Inline</Text>
      <PickerGroupView pickers={DATE_TIME_PICKERS} onConfirm={v => console.log('PickerGroup confirm:', v)} />

      {/* With Sheet */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">With Sheet</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setSheetShow(true)}>
            Select Date & Time
          </Button>
          <Text className="text-sm text-muted-foreground">
            {values[0]?.join('-')} {values[1]?.join(':')}
          </Text>
        </View>

        <PickerGroup
          onConfirm={setValues}
          onUpdateShow={setSheetShow}
          pickers={DATE_TIME_PICKERS}
          show={sheetShow}
          values={values}
        />
      </View>
    </ScrollView>
  );
};

export { PickerGroupDemo };
