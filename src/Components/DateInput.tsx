import React, { FC, useEffect, useState } from "react";
import DateInputType from "../Types/DateInput";
import calendarIcon from "../styles/Icons/Calendar.svg";
import clearIcon from "../styles/Icons/Clear.svg";

export const DateInput: FC<DateInputType> = ({
  name,
  value,
  rtl = false,
  onClick,
  onChange,
  onBlur,
  placeholder,
  allowClear,
  disabled,
  readonly,
  style,
}) => {
  const inputRef = React.useRef<any>(null);
  const [inputValue, setInputValue] = useState<string | undefined>(value);

  const checkValue = (value: string, max: number) => {
    if (value.charAt(0) !== "0" || value == "00") {
      var num = parseInt(value);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      value =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString();
    }
    return value;
  };

  const inputChange = (value: string) => {
    if (/\D\/$/.test(value)) value = value.substr(0, value.length - 3);
    let values = value.split("/").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[0]) values[0] = checkValue(values[0], 12);
    if (values[1]) values[1] = checkValue(values[1], 31);
    let output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + " / " : v;
    });
    setInputValue(output.join("").substr(0, 14));

    if (value.length === 14) {
      onChange(value);
    }
  };

  const inputBlur = (value: string) => {
    let values = value.split("/").map(function (v, i) {
      return v.replace(/\D/g, "");
    });
    let output = "";

    if (values.length == 3 && values[2].length > 0) {
      output = value;
    }
    setInputValue(output);
  };

  const mergeClasses = () => {
    if (rtl) {
      if (disabled) {
        return "wye-datetimepicker-dateinput wye-datetimepicker-dateinput-rtl wye-datetimepicker-dateinput-disabled";
      } else if (readonly) {
        return "wye-datetimepicker-dateinput wye-datetimepicker-dateinput-rtl wye-datetimepicker-dateinput-readonly";
      } else {
        return "wye-datetimepicker-dateinput wye-datetimepicker-dateinput-rtl";
      }
    } else {
      if (disabled) {
        return "wye-datetimepicker-dateinput wye-datetimepicker-dateinput-disabled";
      } else if (readonly) {
        return "wye-datetimepicker-dateinput wye-datetimepicker-dateinput-readonly";
      } else {
        return "wye-datetimepicker-dateinput";
      }
    }
  };

  const clear = () => {
    setInputValue("");
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div
      className={mergeClasses()}
      onClick={() => {
        onClick();
        inputRef.current.focus();
      }}
      style={style}
    >
      <input
        type="text"
        ref={inputRef}
        name={name}
        onChange={(e) => inputChange(e.currentTarget.value)}
        onBlur={(e) => {
          inputBlur(e.currentTarget.value);
          if (onBlur) {
            onBlur();
          }
        }}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
      />
      {allowClear && (
        <img
          className="wye-datetimepicker-clear"
          src={clearIcon}
          alt="clearinput"
          onClick={clear}
        />
      )}
      <img src={calendarIcon} alt="datetimeinput" />
    </div>
  );
};
