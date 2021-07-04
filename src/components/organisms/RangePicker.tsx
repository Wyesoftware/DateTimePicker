import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { mergeRefs, useLayer } from "react-laag";
import { IRangePicker, TargetMonth } from "../../types";
import { dateFormat } from "../atoms/constants";
import { RangeInput } from "../molecules/RangeInput";
import { RangeCalendar } from "../molecules/RangeCalendar";
import { useDirection } from "../atoms/hooks/useDirection";

export const RangePicker = ({
  inputRef,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  language,
  disabled = false,
  readOnly = false,
  allowClear = false,
  onClear,
}: IRangePicker) => {
  dayjs.locale(language.dayjs.locale);

  const { getDirection } = useDirection();
  const extraRef = React.useRef<HTMLInputElement>(null);
  const [targetDate, setTargetDate] = useState<TargetMonth>({
    year: dayjs().year(),
    month: dayjs().month(),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [targetValue, setTargetValue] = useState<(Dayjs | null)[]>([
    null,
    null,
  ]);

  useEffect(() => {
    if (value && value.length === 2) {
      setTargetValue([dayjs(value[0]), dayjs(value[1])]);
    }
  }, [value]);

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: isCalendarOpen,
    onOutsideClick: () => {
      setIsCalendarOpen(false);
      onBlur && onBlur();
    },
    placement: "bottom-start",
    auto: true,
    overflowContainer: false,
    possiblePlacements: ["top-start"],
  });

  const getValue = () => {
    if (targetValue.length === 2) {
      return [
        targetValue[0] ? targetValue[0].format(dateFormat) : "",
        targetValue[1] ? targetValue[1].format(dateFormat) : "",
      ];
    }
    return ["", ""];
  };

  return (
    <>
      <div
        {...triggerProps}
        onClick={() => {
          if (!disabled && !readOnly) {
            setIsCalendarOpen(!isCalendarOpen);
          }
        }}
      >
        <RangeInput
          inputRef={inputRef ? mergeRefs(inputRef, extraRef) : extraRef}
          name={name}
          placeholder={placeholder}
          value={getValue()}
          onChange={(value) => {
            if (value) {
              if (value[0]) {
                setTargetValue([value[0], targetValue[1]]);
                setTargetDate({
                  year: value[0].year(),
                  month: value[0].month(),
                });
              }
              if (value[1]) {
                setTargetValue([targetValue[0], value[1]]);
              }
              if (value[0] && value[1]) {
                onChange && onChange([value[0], value[1]]);
              }
            } else {
              setTargetValue([null, null]);
              setTargetDate({
                year: dayjs().year(),
                month: dayjs().month(),
              });
              onChange && onChange(undefined);
            }
          }}
          onBlur={(value) => {
            if (value === 0) {
              setTargetValue([null, targetValue[1]]);
            } else if (value === 1) {
              setTargetValue([targetValue[0], null]);
            } else {
              setTargetValue([null, null]);
            }
            onChange && onChange(undefined);
          }}
          disabled={disabled}
          readOnly={readOnly}
          allowClear={allowClear}
          onClear={onClear}
        />
      </div>
      {isCalendarOpen &&
        renderLayer(
          <div
            dir={getDirection()}
            className="bg-white flex flex-row justify-center items-center p-8 z-60"
            {...layerProps}
            style={{
              boxShadow: "0px 4px 14px rgba(96, 79, 112, 0.05)",
              ...layerProps.style,
            }}
          >
            <RangeCalendar
              targetDate={targetDate}
              targetValue={targetValue}
              setTargetDate={setTargetDate}
              onChange={(value) => {
                setTargetValue(value);
              }}
              language={language}
            />
          </div>
        )}
    </>
  );
};
