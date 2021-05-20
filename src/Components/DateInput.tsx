import React, { FC, useEffect, useState } from "react";
import DateInputType from "../Types/DateInput";
import calendarIcon from "../styles/Icons/calendar.svg";
import clearIcon from "../styles/Icons/clear.svg";
import dayjs from "dayjs";
import { mergeRefs } from "react-laag";

export const DateInput: FC<DateInputType> = ({
  mode,
  ref,
  name,
  value,
  rtl = false,
  onClick,
  onChange,
  onBlur,
  disabledDate,
  setIsOpenOptions,
  onClear,
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

  const autoFormat = (value: string) => {
    if (mode === "date") {
      if (/\D\/$/.test(value)) value = value.substr(0, value.length - 3);
      let values = value.split("/").map(function (v) {
        return v.replace(/\D/g, "");
      });
      if (values[0]) values[0] = checkValue(values[0], 31);
      if (values[1]) values[1] = checkValue(values[1], 12);
      let output = values.map(function (v, i) {
        return v.length == 2 && i < 2 ? v + " / " : v;
      });
      setInputValue(output.join("").substr(0, 14));

      if (
        value.length === 14 &&
        !disabledDate(dayjs(value, "DD / MM / YYYY")) &&
        dayjs(value, "DD / MM / YYYY").isValid()
      ) {
        onChange(value);
      }
    } else if (mode === "datetime") {
      if (value.length < 21) {
        setInputValue(value);
      }
      if (
        value.length === 20 &&
        !disabledDate(dayjs(value, "DD / MM / YYYY HH:mm")) &&
        dayjs(value, "DD / MM / YYYY HH:mm").isValid()
      ) {
        onChange(value);
      }

      if (value.length === 1) {
        let day = checkValue(value[0], 31);
        if (day.length === 2) {
          setInputValue(day + " / ");
        } else {
          setInputValue(day);
        }
      }

      if (value.length === 6) {
        let day = checkValue(value[5], 12);
        if (day.length === 2) {
          setInputValue(value.slice(0, 5) + day + " / ");
        } else {
          setInputValue(value.slice(0, 5) + day);
        }
      }

      if (value.length === 2) {
        setInputValue(value + " / ");
      } else if (value.length === 7) {
        setInputValue(value + " / ");
      } else if (value.length === 14) {
        setInputValue(value + " ");
      } else if (value.length === 17) {
        setInputValue(value + ":");
      }
    } else if (mode === "time") {
      if (value.length < 6) {
        setInputValue(value);
      }
      if (value.length === 5 && dayjs(value, "HH:mm").isValid()) {
        onChange(value);
      }
      if (value.length === 2) {
        setInputValue(value + ":");
      }
    }
  };

  const autoRemove = (value: string) => {
    if (mode === "datetime") {
      if (value.length === 5) {
        setInputValue(value.slice(0, 2));
      } else if (value.length === 10) {
        setInputValue(value.slice(0, 7));
      } else if (value.length === 15) {
        setInputValue(value.slice(0, 14));
      } else if (value.length === 18) {
        setInputValue(value.slice(0, 17));
      }
    } else if (mode === "time") {
      if (value.length === 3) {
        setInputValue(value.slice(0, 2));
      }
    }
  };

  const blur = (value: string) => {
    if (mode === "date") {
      let values = value.split("/").map(function (v, i) {
        return v.replace(/\D/g, "");
      });

      if (
        values.length == 3 &&
        values[2].length > 0 &&
        !disabledDate(dayjs(value, "DD / MM / YYYY"))
      ) {
        setInputValue(value);
      } else {
        setInputValue("");
        onClear();
      }
    } else if (mode === "datetime") {
      if (
        value.length === 20 &&
        !disabledDate(dayjs(value, "DD / MM / YYYY HH:mm")) &&
        dayjs(value, "DD / MM / YYYY HH:mm").isValid()
      ) {
        setInputValue(value);
      } else {
        setInputValue("");
        onClear();
      }
    } else if (mode === "time") {
      if (value.length === 5 && dayjs(value, "HH:mm").isValid()) {
        setInputValue(value);
      } else {
        setInputValue("");
        onClear();
      }
    }
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
    onClear();
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
        autoComplete="off"
        type="text"
        ref={ref ? mergeRefs(inputRef, ref) : inputRef}
        name={name}
        onChange={(e) => autoFormat(e.currentTarget.value)}
        onBlur={(e) => {
          blur(e.currentTarget.value);
          if (onBlur) {
            onBlur();
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setIsOpenOptions(false);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
          }
          if (e.key === "Backspace") {
            autoRemove(e.currentTarget.value);
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
