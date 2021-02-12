import { CSSProperties } from "react";
import { Dayjs } from "dayjs";

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
}

export default DateTimePickerType;
