import React, { useEffect, useState } from "react";
import { useLayer } from "react-laag";
import dayjs from "dayjs";
import { IDateTimePicker, IDateValue } from "../../types";
import { createYears } from "../atoms/functions/createYears";
import { Calendar } from "../molecules/Calendar";
import { Input } from "../molecules/Input";
import { Select } from "../molecules/Select";
import {
  dateFormat,
  dateTimeFormat,
  monthes,
  timeFormat,
} from "../atoms/constants";

export const DateTimePicker = ({
  mode,
  placeholder,
  name,
  value,
  onChange,
  isCurrentMonth,
  disabledDates,
  language,
}: IDateTimePicker) => {
  dayjs.locale(language.dayjs.locale);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [targetValue, setTargetValue] = useState<IDateValue>({
    year: isCurrentMonth ? dayjs().year() : null,
    month: isCurrentMonth ? dayjs().month() : null,
    day: null,
    hour: null,
    minute: null,
  });

  useEffect(() => {
    if (value) {
      setTargetValue({
        year: dayjs(value).year(),
        month: dayjs(value).month(),
        day: dayjs(value).date(),
        hour: dayjs(value).hour(),
        minute: dayjs(value).minute(),
      });
    }
  }, [value]);

  const { triggerProps, triggerBounds, layerProps, renderLayer } = useLayer({
    container: "wyesoftware-datetimepicker",
    isOpen: isCalendarOpen,
    onOutsideClick: () => setIsCalendarOpen(false),
    placement: "bottom-start",
    auto: true,
    overflowContainer: false,
    possiblePlacements: ["top-start"],
  });

  const years = createYears();

  const getValue = () => {
    if (targetValue) {
      if (targetValue.year && targetValue.month && targetValue.day) {
        return dayjs()
          .set("year", targetValue.year)
          .set("month", targetValue.month)
          .set("date", targetValue.day)
          .set(
            "hour",
            targetValue.hour
              ? targetValue.hour
              : mode === "datetime" || mode === "time"
              ? dayjs().hour()
              : 9
          )
          .set(
            "minute",
            targetValue.minute
              ? targetValue.minute
              : mode === "datetime" || mode === "time"
              ? dayjs().minute()
              : 0
          )
          .format(
            mode === "date"
              ? dateFormat
              : mode === "datetime"
              ? dateTimeFormat
              : timeFormat
          );
      }
    }
    return "";
  };

  return (
    <>
      <div
        {...triggerProps}
        onClick={() => {
          inputRef.current?.focus();
          setIsCalendarOpen(!isCalendarOpen);
        }}
      >
        <Input
          inputRef={inputRef}
          mode={mode}
          name={name}
          placeholder={placeholder}
          value={getValue()}
          onChange={(value) => {
            if (value) {
              setTargetValue({
                year: value.year(),
                month: value.month(),
                day: value.date(),
                hour:
                  mode === "datetime" || mode === "time" ? value.hour() : null,
                minute:
                  mode === "datetime" || mode === "time"
                    ? value.minute()
                    : null,
              });
              onChange && onChange(value);
            } else {
              setTargetValue({
                year: isCurrentMonth ? dayjs().year() : null,
                month: isCurrentMonth ? dayjs().month() : null,
                day: null,
                hour: null,
                minute: null,
              });
              onChange && onChange(undefined);
            }
          }}
        />
      </div>
      {isCalendarOpen &&
        renderLayer(
          <div
            className="flex flex-row justify-center items-center p-8"
            {...layerProps}
            style={{
              boxShadow: "0px 4px 14px rgba(96, 79, 112, 0.05)",
              maxWidth: triggerBounds!.width,
              ...layerProps.style,
            }}
          >
            {(!targetValue || !targetValue.year) && (
              <Select
                placeholder={language.placeholders.year}
                options={years.map((year) => ({
                  value: year,
                  label: String(year),
                  focus: dayjs().year() === year,
                }))}
                onChange={(value) =>
                  setTargetValue({
                    year: Number(value),
                    month: null,
                    day: null,
                    hour: null,
                    minute: null,
                  })
                }
              />
            )}
            {targetValue && targetValue.year && !targetValue.month && (
              <Select
                placeholder={language.placeholders.month}
                options={monthes(language.dayjs.locale).map((month, key) => ({
                  value: key,
                  label: month,
                  focus: dayjs().month() === key,
                }))}
                onChange={(value) =>
                  setTargetValue({
                    year: targetValue.year,
                    month: Number(value),
                    day: null,
                    hour: null,
                    minute: null,
                  })
                }
              />
            )}
            {targetValue && targetValue.year && targetValue.month && (
              <Calendar
                mode={mode}
                targetValue={targetValue}
                onReset={() =>
                  setTargetValue({
                    year: null,
                    month: null,
                    day: null,
                    hour: null,
                    minute: null,
                  })
                }
                onChange={(value) => {
                  setTargetValue({
                    year: value.year,
                    month: value.month,
                    day: value.day,
                    hour: targetValue.hour,
                    minute: targetValue.minute,
                  });
                  setIsCalendarOpen(false);
                }}
                onChangeTime={(value) =>
                  setTargetValue({
                    year: targetValue.year,
                    month: targetValue.month,
                    day: targetValue.day,
                    hour: value.hour,
                    minute: value.minute,
                  })
                }
                disabledDates={disabledDates}
                language={language}
              />
            )}
          </div>
        )}
    </>
  );
};
