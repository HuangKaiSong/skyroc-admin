import type { PickerOption } from '../picker/types';
import type { TimePickerColumnType, TimePickerFilter, TimePickerFormatter } from './types';

/** Pad a number to two digits with leading zero */
function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/** Parse a time string "HH:mm:ss" into [hour, minute, second] */
function parseTime(time: string): [number, number, number] {
  const parts = time.split(':').map(s => Number.parseInt(s, 10));
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

/** Generate picker options for a time range */
function genTimeOptions(
  min: number,
  max: number,
  type: TimePickerColumnType,
  formatter: TimePickerFormatter | undefined,
  filter: TimePickerFilter | undefined,
  values: string[]
): PickerOption[] {
  const options: PickerOption[] = [];

  for (let i = min; i <= max; i++) {
    const value = padZero(i);
    let option: PickerOption = { label: value, value };

    if (formatter) {
      option = formatter(type, option);
    }

    options.push(option);
  }

  if (filter) {
    return filter(type, options, values);
  }

  return options;
}

/** Clamp selected values to be within the valid range of each column */
function formatTimeValueRange(values: string[], columns: PickerOption[][]): string[] {
  return values.map((value, index) => {
    const column = columns[index];

    if (!column || column.length === 0) {
      return value;
    }

    // If current value exists in column options, keep it
    if (column.some(option => option.value === value)) {
      return value;
    }

    // Otherwise clamp to the last option (closest valid value)
    return column[column.length - 1]!.value;
  });
}

export { formatTimeValueRange, genTimeOptions, padZero, parseTime };
