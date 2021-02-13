import { Dayjs } from "dayjs";

interface InfiniteMonthYearsSelectType {
  defaultValue: Dayjs;
  onChange: (value: Dayjs) => void;
  onClose: (value: boolean) => void;
  rtl: boolean;
}

export default InfiniteMonthYearsSelectType;
