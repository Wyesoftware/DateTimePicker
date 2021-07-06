import React from "react";
import "./styles/index.css";
import "virtual:windi.css";
import { DateTimePicker } from "./components/organisms/DateTimePicker";
import { RangePicker } from "./components/organisms/RangePicker";
import { ILanguage, Props } from "./types";
import dayjs, { Dayjs } from "dayjs";
import { en, he, ru } from "./components/atoms/constants/language";
import { useDirection } from "./components/atoms/hooks/useDirection";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const DateTimeComponent = ({
  dir = "ltr",
  dirFromElement,
  inputRef,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  mode = "datetime",
  isCurrentMonth = true,
  disabledDates,
  language = "en",
  disabled = false,
  readOnly = false,
  allowClear = false,
  onClear,
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
            inputRef={inputRef}
            mode={mode}
            placeholder={placeholder}
            name={name}
            value={value as string | Dayjs | undefined}
            onChange={onChange}
            onBlur={onBlur}
            isCurrentMonth={isCurrentMonth}
            disabledDates={disabledDates}
            disabled={disabled}
            readOnly={readOnly}
            allowClear={allowClear}
            onClear={onClear}
            language={getLang()}
          />
        );
      case "range":
        return (
          <RangePicker
            inputRef={inputRef}
            name={name}
            placeholder={placeholder}
            value={value as string[] | Dayjs[] | undefined}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            readOnly={readOnly}
            allowClear={allowClear}
            onClear={onClear}
            language={getLang()}
          />
        );
    }
  };

  return (
    <div
      id="wyesoftware-datetimepicker"
      role="container"
      className={className}
      dir={setDirection(dirFromElement) ? setDirection(dirFromElement) : dir}
    >
      {render()}
    </div>
  );
};

export default DateTimeComponent;
