import { CSSProperties } from "react";

interface DateInputType {
  name: string;
  value: string | undefined;
  rtl?: boolean;
  onClick: () => void;
  onChange: (value: string) => void;
  onBlur?: () => void;
  setIsOpenOptions: (value: boolean) => void;
  placeholder: string;
  allowClear?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  style?: CSSProperties;
}

export default DateInputType;
