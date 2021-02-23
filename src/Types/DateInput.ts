import { Dayjs } from "dayjs";
import { CSSProperties } from "react";

interface DateInputType {
  name: string;
  value: string | undefined;
  rtl?: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabledDate: (day: Dayjs) => boolean;
  setIsOpenOptions: (value: boolean) => void;
  placeholder: string;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  style?: CSSProperties;
}

export default DateInputType;
