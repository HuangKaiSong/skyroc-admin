import { Calendar, Text } from '@skyroc/native-ui';
import type { DateType } from '@skyroc/native-ui';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const CalendarDemo = () => {
  const [singleDate, setSingleDate] = useState<DateType>(new Date());
  const [rangeStart, setRangeStart] = useState<DateType>();
  const [rangeEnd, setRangeEnd] = useState<DateType>();
  const [multiDates, setMultiDates] = useState<DateType[]>([]);
  const [limitDate, setLimitDate] = useState<DateType>(new Date());

  function formatDate(date: DateType) {
    if (!date) return '未选择';
    const d = new Date(date as string | number | Date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* 基础用法 */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <View className="px-4">
        <Text className="mb-2 text-sm text-muted-foreground">已选: {formatDate(singleDate)}</Text>
        <Calendar mode="single" date={singleDate} locale="zh" onChange={({ date }) => setSingleDate(date)} />
      </View>

      {/* 日期范围 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">日期范围</Text>
      <View className="px-4">
        <Text className="mb-2 text-sm text-muted-foreground">
          {rangeStart ? formatDate(rangeStart) : '开始'} ~ {rangeEnd ? formatDate(rangeEnd) : '结束'}
        </Text>
        <Calendar
          mode="range"
          endDate={rangeEnd}
          locale="zh"
          startDate={rangeStart}
          onChange={({ startDate, endDate }) => {
            setRangeStart(startDate);
            setRangeEnd(endDate);
          }}
        />
      </View>

      {/* 多选模式 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">多选模式</Text>
      <View className="px-4">
        <Text className="mb-2 text-sm text-muted-foreground">已选 {multiDates.length} 个日期</Text>
        <Calendar mode="multiple" dates={multiDates} locale="zh" onChange={({ dates }) => setMultiDates(dates)} />
      </View>

      {/* 限制日期范围 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">限制日期范围</Text>
      <View className="px-4">
        <Text className="mb-2 text-sm text-muted-foreground">
          已选: {formatDate(limitDate)}（只能选今天起 30 天内）
        </Text>
        <Calendar
          mode="single"
          date={limitDate}
          locale="zh"
          maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
          minDate={new Date()}
          onChange={({ date }) => setLimitDate(date)}
        />
      </View>
    </ScrollView>
  );
};

export { CalendarDemo };
