import { CSSProperties } from "react";
import { Dayjs } from "dayjs";
import { Locale } from "dayjs/locale/*";

interface DateTimePickerType {
  name: string;
  value?: string;
  defaultValue?: Dayjs;
  disabled?: boolean;
  readonly?: boolean;
  allowClear?: boolean;
  onBlur?: () => void;
  onChange?: (value: Dayjs) => void;
  disabledDates?: (day: Dayjs) => boolean;
  style?: CSSProperties;
  rtl?: boolean;
  lang: Locale;
  width?: string;
}

export interface WeekDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isDisabled: boolean;
}

export default DateTimePickerType;
