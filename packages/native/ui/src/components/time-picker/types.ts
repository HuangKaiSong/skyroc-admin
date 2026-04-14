import type { ReactNode } from 'react';
import type { PickerOption, PickerViewProps } from '../picker/types';

/** Time column type identifier */
export type TimePickerColumnType = 'hour' | 'minute' | 'second';

/** Filter function to exclude certain options from a time column */
export type TimePickerFilter = (
  columnType: TimePickerColumnType,
  options: PickerOption[],
  values: string[]
) => PickerOption[];

/** Formatter function to customize the display of time options */
export type TimePickerFormatter = (type: TimePickerColumnType, option: PickerOption) => PickerOption;

/** Props for the inline TimePickerView component */
export interface TimePickerViewProps extends Omit<PickerViewProps, 'columns' | 'fieldNames'> {
  /** Column types to display, defaults to ['hour', 'minute'] */
  columnsType?: TimePickerColumnType[];

  /** Filter function to exclude certain options */
  filter?: TimePickerFilter;

  /** Formatter function to customize option display */
  formatter?: TimePickerFormatter;

  /** Maximum selectable time, format "HH:mm:ss" */
  maxTime?: string;

  /** Minimum selectable time, format "HH:mm:ss" */
  minTime?: string;
}

/** Props for the popup TimePicker component */
export interface TimePickerProps extends TimePickerViewProps {
  /** Trigger element: ReactNode or render function */
  children?: ReactNode | ((params: { open: () => void; value: string[] }) => ReactNode);

  /** Called when the sheet visibility changes */
  onUpdateShow?: (show: boolean) => void;

  /** Whether the sheet is visible */
  show: boolean;
}
