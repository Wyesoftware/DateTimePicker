import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IRangeInput } from "../../types";
import { dateFormat, dateValidator } from "../atoms/constants";
import { formatDate } from "../atoms/functions/autoFormat";
import { calendar, clear, rangeArrow } from "../atoms/icons";

export const RangeInput = ({
  inputRef,
  name,
  placeholder,
  value,
  disabled,
  readOnly,
  allowClear,
  onChange,
  onBlur,
  onClear,
}: IRangeInput) => {
  const inputToRef = React.useRef<HTMLInputElement>(null);
  const [inputFromValue, setInputFromValue] = useState<string>(value[0]);
  const [inputToValue, setInputToValue] = useState<string>(value[1]);

  useEffect(() => {
    setInputFromValue(value[0]);
    setInputToValue(value[1]);
  }, [value]);

  const autoFormat = (value: string, input: "from" | "to") => {
    let format = formatDate(value, false);

    if (input === "from") {
      setInputFromValue(format);

      if (dateValidator.test(value) && dayjs(value, dateFormat).isValid()) {
        if (
          dateValidator.test(inputToValue) &&
          dayjs(inputToValue, dateFormat).isValid()
        ) {
          onChange([dayjs(value, dateFormat), dayjs(inputToValue, dateFormat)]);
        } else {
          onChange([dayjs(value, dateFormat), null]);
          inputToRef.current?.focus();
        }
      }
    } else {
      setInputToValue(format);

      if (dateValidator.test(value) && dayjs(value, dateFormat).isValid()) {
        if (
          dateValidator.test(inputFromValue) &&
          dayjs(inputFromValue, dateFormat).isValid()
        ) {
          onChange([
            dayjs(inputFromValue, dateFormat),
            dayjs(value, dateFormat),
          ]);
        } else {
          onChange([null, dayjs(value, dateFormat)]);
        }
      }
    }
  };

  const blurFormat = (value: string, input: "from" | "to") => {
    if (value) {
      if (input === "from") {
        if (!dateValidator.test(value)) {
          setInputFromValue("");
          if (
            dateValidator.test(inputToValue) &&
            dayjs(inputToValue, dateFormat).isValid()
          ) {
            onBlur(0);
          } else {
            onBlur(2);
          }
        }
      } else {
        if (!dateValidator.test(value)) {
          setInputToValue("");
          if (
            dateValidator.test(inputFromValue) &&
            dayjs(inputFromValue, dateFormat).isValid()
          ) {
            onBlur(1);
          } else {
            onBlur(2);
          }
        }
      }
    }
  };

  return (
    <div
      dir="ltr"
      className="min-w-85 flex flex-row justify-between items-center border-1 border-[#e5e7eb] rounded-sm p-1 cursor-text focus-within:border-[#90caf9]"
    >
      <div className="flex flex-row justify-start items-center">
        <input
          role="rangepicker-input-from"
          data-cy="rangepicker-from"
          className="w-30 bg-transparent outline-none border-0"
          ref={inputRef}
          autoComplete="off"
          name={name + "-from"}
          type="text"
          placeholder={placeholder ? placeholder[0] : dateFormat}
          value={inputFromValue}
          onChange={(e) => autoFormat(e.currentTarget.value, "from")}
          onBlur={(e) => blurFormat(e.currentTarget.value, "from")}
          max={14}
          min={14}
          maxLength={14}
          disabled={disabled}
          readOnly={readOnly}
        />
        <img className="mx-4" src={rangeArrow} alt="range-arrow" />
        <input
          role="rangepicker-input-to"
          data-cy="rangepicker-to"
          className="w-30 bg-transparent outline-none border-0"
          ref={inputToRef}
          autoComplete="off"
          name={name + "-to"}
          type="text"
          placeholder={placeholder ? placeholder[1] : dateFormat}
          value={inputToValue}
          onChange={(e) => autoFormat(e.currentTarget.value, "to")}
          onBlur={(e) => blurFormat(e.currentTarget.value, "to")}
          max={14}
          min={14}
          maxLength={14}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
      {allowClear && (
        <img
          role="clearInput"
          className="mx-1 !cursor-pointer"
          src={clear}
          alt="clear-button"
          onClick={(e) => {
            e.stopPropagation();
            onChange(null);
            setInputFromValue("");
            setInputToValue("");
            onClear && onClear();
          }}
        />
      )}
      <img src={calendar} alt="datetimeinput" />
    </div>
  );
};
