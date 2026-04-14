import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useMemo } from 'react';
import { PickerView } from '../picker/PickerView';
import type { TimePickerColumnType, TimePickerViewProps } from './types';
import { formatTimeValueRange, genTimeOptions, padZero, parseTime } from './utils';

const TimePickerView = (props: TimePickerViewProps) => {
  const {
    columnsType = ['hour', 'minute'],
    defaultValue,
    filter,
    formatter,
    maxTime = '23:59:59',
    minTime = '00:00:00',
    onChange,
    value: valueProp,
    ...pickerProps
  } = props;

  const [minH, minM, minS] = parseTime(minTime);
  const [maxH, maxM, maxS] = parseTime(maxTime);

  const initialValue = useMemo(() => {
    if (defaultValue && defaultValue.length > 0) {
      return defaultValue;
    }

    const now = new Date();
    return columnsType.map(type => {
      if (type === 'hour') return padZero(now.getHours());
      if (type === 'minute') return padZero(now.getMinutes());
      return padZero(now.getSeconds());
    });
  }, []);

  const [value, setValue] = useControllableState({
    caller: 'TimePickerView',
    defaultProp: initialValue,
    onChange,
    prop: valueProp
  });

  function getValue(type: TimePickerColumnType): number {
    const index = columnsType.indexOf(type);
    if (index === -1) return 0;
    return Number.parseInt(value[index] ?? '0', 10);
  }

  function getHourRange(): [number, number] {
    return [minH, maxH];
  }

  function getMinuteRange(): [number, number] {
    const hour = getValue('hour');

    let min = 0;
    let max = 59;

    if (hour === minH) {
      min = minM;
    }
    if (hour === maxH) {
      max = maxM;
    }

    return [min, max];
  }

  function getSecondRange(): [number, number] {
    const hour = getValue('hour');
    const minute = getValue('minute');

    let min = 0;
    let max = 59;

    if (hour === minH && minute === minM) {
      min = minS;
    }
    if (hour === maxH && minute === maxM) {
      max = maxS;
    }

    return [min, max];
  }

  function getRangeByType(type: TimePickerColumnType): [number, number] {
    if (type === 'hour') return getHourRange();
    if (type === 'minute') return getMinuteRange();
    return getSecondRange();
  }

  const columns = useMemo(() => {
    return columnsType.map(type => {
      const [min, max] = getRangeByType(type);
      return genTimeOptions(min, max, type, formatter, filter, value);
    });
  }, [columnsType, value, minTime, maxTime, formatter, filter]);

  const clampedValue = useMemo(() => {
    return formatTimeValueRange(value, columns);
  }, [value, columns]);

  function handleChange(newValues: string[]) {
    // After changing, re-clamp because cascading constraints may apply
    const newColumns = columnsType.map(type => {
      const tempValues = [...newValues];

      function getTempValue(t: TimePickerColumnType): number {
        const idx = columnsType.indexOf(t);
        if (idx === -1) return 0;
        return Number.parseInt(tempValues[idx] ?? '0', 10);
      }

      function getTempRange(): [number, number] {
        if (type === 'hour') return getHourRange();

        if (type === 'minute') {
          const hour = getTempValue('hour');
          let min = 0;
          let max = 59;
          if (hour === minH) min = minM;
          if (hour === maxH) max = maxM;
          return [min, max];
        }

        // second
        const hour = getTempValue('hour');
        const minute = getTempValue('minute');
        let min = 0;
        let max = 59;
        if (hour === minH && minute === minM) min = minS;
        if (hour === maxH && minute === maxM) max = maxS;
        return [min, max];
      }

      const [min, max] = getTempRange();
      return genTimeOptions(min, max, type, formatter, filter, tempValues);
    });

    const clamped = formatTimeValueRange(newValues, newColumns);
    setValue(clamped);
  }

  return <PickerView {...pickerProps} columns={columns} onChange={handleChange} value={clampedValue} />;
};

export { TimePickerView };
