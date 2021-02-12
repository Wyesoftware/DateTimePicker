import { Dayjs } from "dayjs";

interface InfiniteMonthYearsSelectType {
  defaultValue: Dayjs;
  onChange: (value: Dayjs) => void;
  onClose: (value: boolean) => void;
}

export default InfiniteMonthYearsSelectType;
