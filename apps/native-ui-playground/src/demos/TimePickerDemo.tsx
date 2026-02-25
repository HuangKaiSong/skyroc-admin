import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TimePicker, TimePickerView } from '@skyroc/native-ui';
import type { TimePickerFilter, TimePickerFormatter } from '@skyroc/native-ui';

const TimePickerDemo = () => {
  const [sheetShow, setSheetShow] = useState(false);
  const [sheetValue, setSheetValue] = useState<string[]>(['09', '30']);

  const [formatterShow, setFormatterShow] = useState(false);
  const [formatterValue, setFormatterValue] = useState<string[]>(['14', '30', '00']);

  const [filterShow, setFilterShow] = useState(false);
  const [filterValue, setFilterValue] = useState<string[]>(['10', '00']);

  const timeFormatter: TimePickerFormatter = (type, option) => {
    if (type === 'hour') return { ...option, label: `${option.value}时` };
    if (type === 'minute') return { ...option, label: `${option.value}分` };
    return { ...option, label: `${option.value}秒` };
  };

  const evenMinuteFilter: TimePickerFilter = (type, options) => {
    if (type === 'minute') {
      return options.filter(opt => Number.parseInt(opt.value, 10) % 10 === 0);
    }
    return options;
  };

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic — hour/minute */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic (Hour & Minute)</Text>
      <TimePickerView
        defaultValue={['12', '30']}
        showToolbar={false}
      />

      {/* Hour, Minute & Second */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Hour, Minute & Second</Text>
      <TimePickerView
        columnsType={['hour', 'minute', 'second']}
        defaultValue={['08', '15', '30']}
        showToolbar={false}
      />

      {/* Time range constraint */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Time Range (09:00 ~ 18:00)</Text>
      <TimePickerView
        defaultValue={['12', '00']}
        maxTime="18:00:00"
        minTime="09:00:00"
        showToolbar={false}
      />

      {/* With Sheet popup */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Popup TimePicker</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setSheetShow(true)}>
            Select Time
          </Button>
          <Text className="text-sm text-muted-foreground">
            {sheetValue.join(':') || 'None'}
          </Text>
        </View>

        <TimePicker
          onConfirm={setSheetValue}
          onUpdateShow={setSheetShow}
          show={sheetShow}
          title="Select Time"
          value={sheetValue}
        />
      </View>

      {/* Formatter — add suffixes */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Formatter</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setFormatterShow(true)}>
            Formatted Picker
          </Button>
          <Text className="text-sm text-muted-foreground">
            {formatterValue.join(':') || 'None'}
          </Text>
        </View>

        <TimePicker
          columnsType={['hour', 'minute', 'second']}
          formatter={timeFormatter}
          onConfirm={setFormatterValue}
          onUpdateShow={setFormatterShow}
          show={formatterShow}
          title="Formatted Time"
          value={formatterValue}
        />
      </View>

      {/* Filter — every 10 minutes */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Filter (Every 10 Minutes)</Text>
      <View className="bg-background px-4 py-3">
        <View className="flex-row items-center gap-3">
          <Button size="sm" onPress={() => setFilterShow(true)}>
            Filtered Picker
          </Button>
          <Text className="text-sm text-muted-foreground">
            {filterValue.join(':') || 'None'}
          </Text>
        </View>

        <TimePicker
          filter={evenMinuteFilter}
          onConfirm={setFilterValue}
          onUpdateShow={setFilterShow}
          show={filterShow}
          title="Select Time"
          value={filterValue}
        />
      </View>
    </ScrollView>
  );
};

export { TimePickerDemo };
