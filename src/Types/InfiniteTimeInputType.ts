import { Dayjs } from "dayjs";

interface InfiniteTimeInputType {
  defaultValue: Dayjs;
  onChange: (value: Dayjs) => void;
  rtl: boolean;
}

export default InfiniteTimeInputType;
