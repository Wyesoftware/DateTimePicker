import { Dayjs } from "dayjs";
import { CSSProperties } from "react";

interface DateInputType {
  ref:
    | string
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  name: string;
  value: string | undefined;
  rtl?: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabledDate: (day: Dayjs) => boolean;
  setIsOpenOptions: (value: boolean) => void;
  onClear: () => void;
  placeholder: string;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  style?: CSSProperties;
}

export default DateInputType;
