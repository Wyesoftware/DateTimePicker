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
  style?: CSSProperties;
  rtl?: boolean;
  lang: Locale;
  width?: string;
}

export default DateTimePickerType;
