import React, { FC, useEffect, useRef, useState } from "react";
import { Dayjs } from "dayjs";
import InfiniteTimeInputType from "../Types/InfiniteTimeInputType";
import OptionType from "../Types/Options";
import useOnClickOutside from "./Hooks/useOnClickOutside";

export const InfiniteTimeInput: FC<InfiniteTimeInputType> = ({
  defaultValue,
  onChange,
  rtl,
}) => {
  const [minutesData, setMinutesData] = useState<OptionType[]>([]);
  const [hoursData, setHoursData] = useState<OptionType[]>([]);
  const [target, setTarget] = useState<Dayjs>(defaultValue);

  const [isEditMinute, setIsEditMinute] = useState<boolean>(false);
  const minutesRef = useRef(null);
  useOnClickOutside(minutesRef, () => setIsEditMinute(false));

  const [isEditHour, setIsEditHour] = useState<boolean>(false);
  const hoursRef = useRef(null);
  useOnClickOutside(hoursRef, () => setIsEditHour(false));

  useEffect(() => {
    if (defaultValue) {
      setTarget(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    let hours: OptionType[] = [];

    hours.push(
      {
        label: target.subtract(1, "hour").format("HH"),
        value: parseInt(target.add(1, "hour").format("HH")),
      },
      {
        label: target.format("HH"),
        value: parseInt(target.format("HH")),
      },
      {
        label: target.add(1, "hour").format("HH"),
        value: parseInt(target.subtract(1, "hour").format("HH")),
      }
    );

    setHoursData(hours);

    let minutes: OptionType[] = [];

    minutes.push(
      {
        label: target.subtract(1, "minutes").format("mm"),
        value: parseInt(target.add(1, "minutes").format("mm")),
      },
      {
        label: target.format("mm"),
        value: parseInt(target.format("mm")),
      },
      {
        label: target.add(1, "minutes").format("mm"),
        value: parseInt(target.subtract(1, "minutes").format("mm")),
      }
    );

    setMinutesData(minutes);
  }, [target]);

  const handleWheelMinute = (e: any) => {
    if (e.nativeEvent.wheelDelta > 0) {
      setTarget(target.subtract(1, "minutes"));
    } else {
      setTarget(target.add(1, "minutes"));
    }
  };

  const handleWheelHour = (e: any) => {
    if (e.nativeEvent.wheelDelta > 0) {
      setTarget(target.subtract(1, "hours"));
    } else {
      setTarget(target.add(1, "hours"));
    }
  };

  const setMinute = (value: number) => {
    setTarget(target.set("minutes", value));
  };

  const setHour = (value: number) => {
    setTarget(target.set("hours", value));
  };

  const setMinuteManual = (value: string) => {
    if (!isNaN(Number(value))) {
      setTarget(target.set("minutes", Number(value)));
    }
    setIsEditMinute(false);
  };

  const setHourManual = (value: string) => {
    if (!isNaN(Number(value))) {
      setTarget(target.set("hours", Number(value)));
    }
    setIsEditHour(false);
  };

  return (
    <div
      className={
        rtl
          ? "wye-datetimepicker-infinitetime-container wye-datetimepicker-infinitetime-container-rtl"
          : "wye-datetimepicker-infinitetime-container"
      }
    >
      <div className="wye-datetimepicker-picker-container">
        {minutesData.length > 0 && (
          <div onWheel={handleWheelMinute} onTouchMove={handleWheelMinute}>
            <div
              className="wye-datetimepicker-other"
              onClick={() => setMinute(minutesData[0].value)}
              style={{ opacity: 0.3 }}
            >
              {minutesData[0].label}
            </div>
            <div
              className="wye-datetimepicker-target"
              style={{ marginLeft: rtl ? "-20px" : "0" }}
              onClick={() => setIsEditMinute(true)}
            >
              {isEditMinute ? (
                <input
                  className="wye-datetimepicker-input-minute"
                  autoFocus
                  ref={minutesRef}
                  type="text"
                  maxLength={2}
                  max={2}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setMinuteManual(String(e.currentTarget.value));
                    }
                    if (e.currentTarget.value.length === 2) {
                      setMinuteManual(String(e.currentTarget.value));
                    }
                  }}
                  placeholder={minutesData[1].label}
                />
              ) : (
                minutesData[1].label
              )}
            </div>
            <div
              className="wye-datetimepicker-other"
              onClick={() => setMinute(minutesData[2].value)}
              style={{ opacity: 0.5 }}
            >
              {minutesData[2].label}
            </div>
          </div>
        )}
        <span className="wye-datetimepicker-after">:</span>
        {hoursData.length > 0 && (
          <div onWheel={handleWheelHour} onTouchMove={handleWheelHour}>
            <div
              className="wye-datetimepicker-other"
              onClick={() => setHour(hoursData[0].value)}
              style={{ opacity: 0.3 }}
            >
              {hoursData[0].label}
            </div>
            <div
              className="wye-datetimepicker-target"
              onClick={() => setIsEditHour(true)}
            >
              {isEditHour ? (
                <input
                  className="wye-datetimepicker-input-hour"
                  autoFocus
                  ref={hoursRef}
                  type="text"
                  maxLength={2}
                  max={2}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setHourManual(String(e.currentTarget.value));
                    }
                    if (e.currentTarget.value.length === 2) {
                      setHourManual(String(e.currentTarget.value));
                      setIsEditMinute(true);
                    }
                  }}
                  placeholder={hoursData[1].label}
                />
              ) : (
                hoursData[1].label
              )}
            </div>
            <div
              className="wye-datetimepicker-other"
              onClick={() => setHour(hoursData[2].value)}
              style={{ opacity: 0.5 }}
            >
              {hoursData[2].label}
            </div>
          </div>
        )}
      </div>
      <button
        className="wye-datetimepicker-ghost"
        type="button"
        onClick={() => onChange(target)}
      >
        {rtl ? "שמור זמן" : "Save time"}
      </button>
    </div>
  );
};
