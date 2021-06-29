import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { IInput } from "../../types";
import { formatDate, formatTime } from "../atoms/functions/autoFormat";
import { calendar, clear } from "../atoms/icons";
import {
  dateFormat,
  dateTimeFormat,
  dateTimeValidator,
  dateValidator,
  timeFormat,
  timeValidator,
} from "../atoms/constants";

export const Input = ({
  inputRef,
  mode,
  name,
  placeholder,
  value,
  disabled = false,
  readOnly = false,
  allowClear = false,
  onChange,
}: IInput) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const autoFormat = (value: string) => {
    if (mode === "date") {
      let format = formatDate(value, false);
      setInputValue(format);

      if (dateValidator.test(value)) {
        if (dayjs(value, dateFormat).isValid()) {
          onChange(dayjs(value, dateFormat));
        }
      }
    } else if (mode === "datetime") {
      if (value.length <= 16) {
        let format = formatDate(value, true);
        setInputValue(format);
      } else {
        let format = formatTime(value, true);
        setInputValue(format);
      }

      if (dateTimeValidator.test(value)) {
        if (dayjs(value, dateTimeFormat).isValid()) {
          onChange(dayjs(value, dateTimeFormat));
        }
      }
    } else {
      let format = formatTime(value, false);
      setInputValue(format);
      if (timeValidator.test(value)) {
        if (dayjs(value, timeFormat).isValid()) {
          onChange(dayjs(value, timeFormat));
        }
      }
    }
  };

  const blurFormat = (value: string) => {
    if (mode === "date") {
      if (!dateValidator.test(value)) {
        onChange(null);
        setInputValue("");
      }
    } else if (mode === "datetime") {
      if (!dateTimeValidator.test(value)) {
        onChange(null);
        setInputValue("");
      }
    } else {
      if (!timeValidator.test(value)) {
        onChange(null);
        setInputValue("");
      }
    }
  };

  return (
    <div
      dir="ltr"
      className="flex flex-row justify-between items-center border-1 border-[#e5e7eb] rounded-sm p-1 cursor-text focus-within:border-[#90caf9]"
    >
      <input
        data-cy="datetimepicker"
        className="w-full bg-transparent outline-none border-0"
        ref={inputRef}
        autoComplete="off"
        name={name}
        type="text"
        placeholder={
          placeholder
            ? placeholder
            : mode === "date"
            ? dateFormat
            : mode === "datetime"
            ? dateTimeFormat
            : timeFormat
        }
        value={inputValue}
        onChange={(e) => autoFormat(e.currentTarget.value)}
        onBlur={(e) => blurFormat(e.currentTarget.value)}
        max={mode === "date" ? 14 : mode === "datetime" ? 23 : 7}
        min={mode === "date" ? 14 : mode === "datetime" ? 23 : 7}
        maxLength={mode === "date" ? 14 : mode === "datetime" ? 23 : 7}
        disabled={disabled}
        readOnly={readOnly}
      />
      {allowClear && (
        <img
          src={clear}
          alt="clear-button"
          onClick={() => {
            onChange(null);
            setInputValue("");
          }}
        />
      )}
      <img src={calendar} alt="datetimeinput" />
    </div>
  );
};
