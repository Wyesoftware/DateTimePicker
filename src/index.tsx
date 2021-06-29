import React from "react";
import "./styles/index.css";
import "virtual:windi.css";
import { DateTimePicker } from "./components/organisms/DateTimePicker";
import { RangePicker } from "./components/organisms/RangePicker";
import { ILanguage, Props } from "./types";
import dayjs from "dayjs";
import { en, he, ru } from "./components/atoms/constants/language";
import { useDirection } from "./components/atoms/hooks/useDirection";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const DateTimeComponent = ({
  mode = "datetime",
  placeholder,
  name,
  value,
  rangeValue,
  onChange,
  onChangeRange,
  isCurrentMonth = true,
  disabledDates,
  dir = "ltr",
  dirFromElement,
  language = "en",
  className,
}: Props) => {
  const { setDirection } = useDirection();

  const getLang = (): ILanguage => {
    switch (language) {
      case "en":
        return en;
      case "he":
        return he;
      case "ru":
        return ru;
      default:
        return language;
    }
  };

  const render = () => {
    switch (mode) {
      case "date":
      case "datetime":
      case "time":
        return (
          <DateTimePicker
            mode={mode}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            isCurrentMonth={isCurrentMonth}
            disabledDates={disabledDates}
            language={getLang()}
          />
        );
      case "range":
        return (
          <RangePicker
            name={name}
            placeholder={placeholder}
            value={rangeValue}
            onChange={onChangeRange}
            language={getLang()}
          />
        );
    }
  };

  return (
    <div
      id="wyesoftware-datetimepicker"
      className={className}
      dir={setDirection(dirFromElement) ? setDirection(dirFromElement) : dir}
    >
      {render()}
    </div>
  );
};

export default DateTimeComponent;
