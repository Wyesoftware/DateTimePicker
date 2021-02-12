import React, { FC, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import useOnClickOutside from "./Hooks/useOnClickOutside";
import InfiniteMonthYearsSelectType from "../Types/InfiniteMonthYearsSelect";
import OptionType from "../Types/Options";

export const InfiniteMonthYearsSelect: FC<InfiniteMonthYearsSelectType> = ({
  defaultValue,
  onChange,
  onClose,
}) => {
  const [monthData, setMonthData] = useState<OptionType[]>([]);
  const [yearsData, setYearsData] = useState<OptionType[]>([]);
  const [target, setTarget] = useState<Dayjs>(defaultValue);
  const [isEditMonth, setIsEditMonth] = useState<boolean>(false);
  const monthesRef = useRef(null);
  useOnClickOutside(monthesRef, () => setIsEditMonth(false));

  const [isEditYear, setIsEditYear] = useState<boolean>(false);
  const yearsRef = useRef(null);
  useOnClickOutside(yearsRef, () => setIsEditYear(false));

  const options: OptionType[] = [
    { label: dayjs().month(0).format("MMMM"), value: 1 },
    { label: dayjs().month(1).format("MMMM"), value: 2 },
    { label: dayjs().month(2).format("MMMM"), value: 3 },
    { label: dayjs().month(3).format("MMMM"), value: 4 },
    { label: dayjs().month(4).format("MMMM"), value: 5 },
    { label: dayjs().month(5).format("MMMM"), value: 6 },
    { label: dayjs().month(6).format("MMMM"), value: 7 },
    { label: dayjs().month(7).format("MMMM"), value: 8 },
    { label: dayjs().month(8).format("MMMM"), value: 9 },
    { label: dayjs().month(9).format("MMMM"), value: 10 },
    { label: dayjs().month(10).format("MMMM"), value: 11 },
    { label: dayjs().month(11).format("MMMM"), value: 12 },
  ];

  useEffect(() => {
    if (defaultValue) {
      setTarget(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (options.length > 0) {
      let newData: OptionType[] = [];

      newData.push(
        options[
          options.findIndex(
            (element: OptionType) =>
              element.value ===
              parseInt(target.subtract(2, "month").format("M"))
          )
        ]
      );
      newData.push(
        options[
          options.findIndex(
            (element: OptionType) =>
              element.value ===
              parseInt(target.subtract(1, "month").format("M"))
          )
        ]
      );
      newData.push(
        options[
          options.findIndex(
            (element: OptionType) =>
              element.value === parseInt(target.format("M"))
          )
        ]
      );
      newData.push(
        options[
          options.findIndex(
            (element: OptionType) =>
              element.value === parseInt(target.add(1, "month").format("M"))
          )
        ]
      );
      newData.push(
        options[
          options.findIndex(
            (element: OptionType) =>
              element.value === parseInt(target.add(2, "month").format("M"))
          )
        ]
      );
      setMonthData(newData);
    }

    let years: OptionType[] = [];

    years.push({
      label: target.add(2, "year").format("YYYY"),
      value: parseInt(target.add(2, "year").format("YYYY")),
    });
    years.push({
      label: target.add(1, "year").format("YYYY"),
      value: parseInt(target.add(1, "year").format("YYYY")),
    });
    years.push({
      label: target.format("YYYY"),
      value: parseInt(target.format("YYYY")),
    });
    years.push({
      label: target.subtract(1, "year").format("YYYY"),
      value: parseInt(target.subtract(1, "year").format("YYYY")),
    });
    years.push({
      label: target.subtract(2, "year").format("YYYY"),
      value: parseInt(target.subtract(2, "year").format("YYYY")),
    });
    setYearsData(years);
  }, [target]);

  const handleWheelMonth = (e: any) => {
    if (e.nativeEvent.wheelDelta > 0) {
      setTarget(target.add(1, "month"));
    } else {
      setTarget(target.subtract(1, "month"));
    }
  };

  const handleWheelYear = (e: any) => {
    if (e.nativeEvent.wheelDelta > 0) {
      setTarget(target.add(1, "year"));
    } else {
      setTarget(target.subtract(1, "year"));
    }
  };

  const setMonth = (value: number) => {
    setTarget(target.set("month", value - 1));
  };

  const setYear = (value: number) => {
    setTarget(target.set("year", value));
  };

  const setMonthManual = (value: string) => {
    if (isNaN(parseInt(value))) {
      let month = options.find((option) => option.label === value)?.value;
      if (month) {
        setTarget(target.set("month", month - 1));
        setIsEditMonth(false);
      }
    } else {
      let month = options.find((option) => option.value === parseInt(value))
        ?.value;
      if (month) {
        setTarget(target.set("month", month - 1));
        setIsEditMonth(false);
      }
    }
  };

  const setYearManual = (value: string) => {
    if (!isNaN(parseInt(value))) {
      setTarget(target.set("year", parseInt(value)));
      setIsEditYear(false);
    }
  };

  return (
    <div className="infinite-container">
      <div className="picker-container">
        {monthData.length > 0 && (
          <div onWheel={handleWheelMonth} onTouchMove={handleWheelMonth}>
            <div
              className="other"
              onClick={() => setMonth(monthData[0].value)}
              style={{ opacity: 0.3 }}
            >
              {monthData[0].label}
            </div>
            <div
              className="other"
              onClick={() => setMonth(monthData[1].value)}
              style={{ opacity: 0.5 }}
            >
              {monthData[1].label}
            </div>
            <div
              className="target"
              style={{ marginLeft: "-20px" }}
              onClick={() => setIsEditMonth(true)}
            >
              {isEditMonth ? (
                <input
                  className="input-month"
                  autoFocus
                  ref={monthesRef}
                  type="text"
                  maxLength={11}
                  max={11}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setMonthManual(String(e.currentTarget.value));
                    }
                  }}
                  placeholder={monthData[2].label}
                />
              ) : (
                monthData[2].label
              )}
            </div>
            <div
              className="other"
              onClick={() => setMonth(monthData[3].value)}
              style={{ opacity: 0.5 }}
            >
              {monthData[3].label}
            </div>
            <div
              className="other"
              onClick={() => setMonth(monthData[4].value)}
              style={{ opacity: 0.3 }}
            >
              {monthData[4].label}
            </div>
          </div>
        )}
        {yearsData.length > 0 && (
          <div onWheel={handleWheelYear} onTouchMove={handleWheelYear}>
            <div
              className="other"
              onClick={() => setYear(yearsData[0].value)}
              style={{ opacity: 0.3 }}
            >
              {yearsData[0].label}
            </div>
            <div
              className="other"
              onClick={() => setYear(yearsData[1].value)}
              style={{ opacity: 0.5 }}
            >
              {yearsData[1].label}
            </div>
            <div className="target" onClick={() => setIsEditYear(true)}>
              {isEditYear ? (
                <input
                  className="input-year"
                  autoFocus
                  ref={yearsRef}
                  type="text"
                  maxLength={4}
                  max={4}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setYearManual(String(e.currentTarget.value));
                    }
                  }}
                  placeholder={yearsData[2].label}
                />
              ) : (
                yearsData[2].label
              )}
            </div>
            <div
              className="other"
              onClick={() => setYear(yearsData[3].value)}
              style={{ opacity: 0.5 }}
            >
              {yearsData[3].label}
            </div>
            <div
              className="other"
              onClick={() => setYear(yearsData[4].value)}
              style={{ opacity: 0.3 }}
            >
              {yearsData[4].label}
            </div>
          </div>
        )}
      </div>
      <button
        className="primary"
        type="button"
        style={{ width: "100%", marginTop: "1rem" }}
        onClick={() => {
          onChange(target);
          onClose(false);
        }}
      >
        שמור
      </button>
    </div>
  );
};
