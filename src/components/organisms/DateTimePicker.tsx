import React, { useEffect, useState } from "react";
import { mergeRefs, useLayer } from "react-laag";
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
import { useDirection } from "../atoms/hooks/useDirection";

export const DateTimePicker = ({
  inputRef,
  mode,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  isCurrentMonth,
  disabledDates,
  disabled,
  readOnly,
  allowClear,
  onClear,
  language,
}: IDateTimePicker) => {
  dayjs.locale(language.dayjs.locale);

  const { getDirection } = useDirection();
  const extraRef = React.useRef<HTMLInputElement>(null);
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

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: isCalendarOpen,
    onOutsideClick: () => {
      setIsCalendarOpen(false), onBlur && onBlur();
    },
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
          .set("hour", targetValue.hour ? targetValue.hour : dayjs().hour())
          .set(
            "minute",
            targetValue.minute ? targetValue.minute : dayjs().minute()
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
        role="datetimepicker"
        {...triggerProps}
        onClick={() => {
          if (!disabled && !readOnly) {
            extraRef.current?.focus();
            setIsCalendarOpen(!isCalendarOpen);
          }
        }}
      >
        <Input
          inputRef={inputRef ? mergeRefs(inputRef, extraRef) : extraRef}
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
          disabledDates={disabledDates}
          disabled={disabled}
          readOnly={readOnly}
          allowClear={allowClear}
          onClear={onClear}
        />
      </div>
      {isCalendarOpen &&
        renderLayer(
          <div
            role="picker"
            dir={getDirection()}
            className="bg-white flex flex-row justify-center items-center p-8 z-60"
            {...layerProps}
            style={{
              boxShadow: "0px 4px 14px rgba(96, 79, 112, 0.05)",
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
                  onChange &&
                    onChange(
                      dayjs()
                        .set("year", value.year)
                        .set("month", value.month)
                        .set("date", value.day)
                        .set("hour", targetValue.hour || dayjs().hour())
                        .set("minute", targetValue.minute || dayjs().minute())
                    );
                }}
                onChangeTime={(value) => {
                  setTargetValue({
                    year: targetValue.year,
                    month: targetValue.month,
                    day: targetValue.day,
                    hour: value.hour,
                    minute: value.minute,
                  });
                }}
                disabledDates={disabledDates}
                language={language}
              />
            )}
          </div>
        )}
    </>
  );
};
