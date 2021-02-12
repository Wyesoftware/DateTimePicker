import React, { FC, useEffect, useState } from "react";
import "./styles/index.scss";
import dayjs, { Dayjs } from "dayjs";
import { useLayer } from "react-laag";
import * as heIL from "dayjs/locale/he";
import * as enUS from "dayjs/locale/en";
import { InfiniteMonthYearsSelect } from "./Components/InfiniteMonthYearsSelect";
import DateInput from "./Components/DateInput";
import DateTimePickerType from "./Types/DateTimePicker";

let arrowClose = require("../styles/Icons/arrowClose.svg");
let arrowOpen = require("../styles/Icons/arrowOpen.svg");
let arrowBack = require("../styles/Icons/arrowBack.svg");
let arrowForward = require("../styles/Icons/arrowForward.svg");

let customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DateTimePicker: FC<DateTimePickerType> = ({
  name,
  value,
  defaultValue,
  disabled = false,
  readonly = false,
  allowClear = false,
  onBlur,
  onChange,
  style,
  rtl = false,
}) => {
  dayjs.locale(rtl ? heIL : enUS);

  const [selectedMonth, setSelectedMonth] = useState<{
    month: number;
    year: number;
  }>({
    month: defaultValue ? dayjs(defaultValue).month() : dayjs().month(),
    year: defaultValue ? dayjs(defaultValue).year() : dayjs().year(),
  });
  const [weeksAndDays, setWeeksAndDays] = useState<any[]>([]);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [isActionsOpen, setIsActionsOpen] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs>(
    defaultValue ? dayjs(defaultValue) : dayjs()
  );
  const [hoverPlaceholder, setHoverPlaceholder] = useState<string | undefined>(
    undefined
  );
  const [inputValue, setInputValue] = useState<string | undefined>(value);

  const { triggerProps, layerProps, renderLayer } = useLayer({
    isOpen: isOptionsOpen,
    onOutsideClick: () => setIsOptionsOpen(false),
    placement: rtl ? "bottom-end" : "bottom-start",
    auto: true,
    overflowContainer: false,
    possiblePlacements: [rtl ? "top-end" : "top-start"],
  });

  const weekDays = rtl
    ? [
        dayjs().day(0).format("dd"),
        dayjs().day(1).format("dd"),
        dayjs().day(2).format("dd"),
        dayjs().day(3).format("dd"),
        dayjs().day(4).format("dd"),
        dayjs().day(5).format("dd"),
        dayjs().day(6).format("dd"),
      ]
    : [
        dayjs().day(1).format("dd"),
        dayjs().day(2).format("dd"),
        dayjs().day(3).format("dd"),
        dayjs().day(4).format("dd"),
        dayjs().day(5).format("dd"),
        dayjs().day(6).format("dd"),
        dayjs().day(0).format("dd"),
      ];

  const getWeekday = (date: string) => {
    return rtl ? dayjs(date).day() + 1 : dayjs(date).day();
  };

  const createCalendar = () => {
    let currentMonthDays = [
      ...Array(
        dayjs(
          `${selectedMonth.year}-${selectedMonth.month + 1}-01`
        ).daysInMonth()
      ),
    ].map((day, index) => {
      return {
        date: dayjs(
          `${selectedMonth.year}-${selectedMonth.month + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
      };
    });

    const currentMonthFirstDay = getWeekday(currentMonthDays[0].date);

    const previousMonth = dayjs(
      `${selectedMonth.year}-${selectedMonth.month + 1}-01`
    ).subtract(1, "month");

    const daysOfPreviousMonth = currentMonthFirstDay
      ? currentMonthFirstDay - 1
      : 6;

    const lastMondayOfPreviousMonth = dayjs(currentMonthDays[0].date)
      .subtract(daysOfPreviousMonth, "day")
      .date();

    let previousMonthDays = [...Array(daysOfPreviousMonth)].map(
      (day, index) => {
        return {
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month() + 1}-${
              lastMondayOfPreviousMonth + index
            }`
          ).format("YYYY-MM-DD"),
          dayOfMonth: lastMondayOfPreviousMonth + index,
          isCurrentMonth: false,
        };
      }
    );

    const currentMonthLastDay = getWeekday(
      `${selectedMonth.year}-${selectedMonth.month + 1}-${
        currentMonthDays.length
      }`
    );

    const nextMonth = dayjs(
      `${selectedMonth.year}-${selectedMonth.month + 1}-01`
    ).add(1, "month");

    const daysOfNextMonth = currentMonthLastDay
      ? 7 - currentMonthLastDay
      : currentMonthLastDay;

    let nextMonthDays = [...Array(daysOfNextMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
      };
    });

    let days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

    return days;
  };

  useEffect(() => {
    let days = createCalendar();

    const chunkDays = () => {
      let results = [];
      while (days.length) {
        results.push(days.splice(0, 7));
      }
      return results;
    };

    setWeeksAndDays(chunkDays());
  }, [selectedMonth]);

  const goBack = () => {
    setSelectedMonth({
      month: dayjs(
        dayjs()
          .month(selectedMonth.month)
          .year(selectedMonth.year)
          .subtract(1, "month")
      ).month(),
      year: dayjs(
        dayjs()
          .month(selectedMonth.month)
          .year(selectedMonth.year)
          .subtract(1, "month")
      ).year(),
    });
  };

  const goForward = () => {
    setSelectedMonth({
      month: dayjs(
        dayjs()
          .month(selectedMonth.month)
          .year(selectedMonth.year)
          .add(1, "month")
      ).month(),
      year: dayjs(
        dayjs()
          .month(selectedMonth.month)
          .year(selectedMonth.year)
          .add(1, "month")
      ).year(),
    });
  };

  const mergeDayClass = (value: string) => {
    let className = "day ";

    if (dayjs(value).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) {
      className += "isToday ";
    }
    if (
      dayjs(value).format("YYYY-MM-DD") ===
      dayjs(selectedDay).format("YYYY-MM-DD")
    ) {
      className += "isSelected";
    }

    return className;
  };

  const setNewMonthYear = (value: Dayjs) => {
    setSelectedMonth({
      month: value.month(),
      year: value.year(),
    });
  };

  const manualChange = (value: string) => {
    setSelectedMonth({
      month: dayjs(value, "DD / MM / YYYY").month(),
      year: dayjs(value, "DD / MM / YYYY").year(),
    });
    setSelectedDay(dayjs(value, "DD / MM / YYYY"));
    setInputValue(value);
    if (onChange) {
      onChange(dayjs(value, "DD / MM / YYYY"));
    }
  };

  return (
    <div id="container" className={rtl ? "rtl" : undefined}>
      <div className="picker-container" {...triggerProps}>
        <DateInput
          name={name}
          value={inputValue}
          rtl={rtl}
          onClick={() => {
            if (!disabled && !readonly) {
              setIsOptionsOpen(true);
            }
          }}
          onChange={(value) => manualChange(value)}
          onBlur={onBlur}
          placeholder={hoverPlaceholder ? hoverPlaceholder : "DD / MM / YYYY"}
          allowClear={allowClear}
          disabled={disabled}
          readonly={readonly}
          style={style}
        />
        {isOptionsOpen &&
          renderLayer(
            <div className={rtl ? "options rtl" : "options"} {...layerProps}>
              <div className="calendar-actions">
                <div
                  className="currentmonth"
                  onClick={() => setIsActionsOpen(!isActionsOpen)}
                >
                  {dayjs().month(selectedMonth.month).format("MMMM") +
                    " " +
                    dayjs().year(selectedMonth.year).format("YYYY")}
                  {isActionsOpen ? (
                    <img src={arrowClose} alt="arrowClose" />
                  ) : (
                    <img src={arrowOpen} alt="arrowOpen" />
                  )}
                </div>
                <div className="actions">
                  {rtl ? (
                    <>
                      <img src={arrowBack} alt="arrowBack" onClick={goBack} />
                      <img
                        src={arrowForward}
                        alt="arrowForward"
                        onClick={goForward}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={arrowForward}
                        alt="arrowForward"
                        onClick={goForward}
                      />
                      <img src={arrowBack} alt="arrowBack" onClick={goBack} />
                    </>
                  )}
                </div>
              </div>
              {isActionsOpen ? (
                <div className="date-actions">
                  <InfiniteMonthYearsSelect
                    defaultValue={selectedDay}
                    onChange={(value) => setNewMonthYear(value)}
                    onClose={(value) => setIsActionsOpen(value)}
                  />
                </div>
              ) : (
                <>
                  <table>
                    <thead>
                      <tr>
                        {weekDays.map((weekDay: string, key: number) => (
                          <th key={key}>{weekDay}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {weeksAndDays?.map((week: any, i: number) => (
                        <tr key={i}>
                          {week.map((day: any, a: number) => (
                            <td
                              style={{
                                opacity: day.isCurrentMonth ? 1 : 0.5,
                              }}
                              key={a}
                            >
                              <div
                                className={mergeDayClass(day.date)}
                                onMouseEnter={() =>
                                  setHoverPlaceholder(
                                    dayjs(day.date).format("DD / MM / YYYY")
                                  )
                                }
                                onMouseOut={() =>
                                  setHoverPlaceholder(undefined)
                                }
                                onClick={() => {
                                  setInputValue(
                                    dayjs(day.date).format("DD / MM / YYYY")
                                  );
                                  if (onChange) {
                                    onChange(dayjs(value, "DD / MM / YYYY"));
                                  }
                                  setSelectedDay(dayjs(day.date));
                                  if (!day.isCurrentMonth) {
                                    setSelectedMonth({
                                      month: dayjs(day.date).month(),
                                      year: dayjs(day.date).year(),
                                    });
                                  }
                                }}
                              >
                                {dayjs(day.date).format("D")}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="primary"
                    type="button"
                    style={{ width: "100%", marginTop: "1rem" }}
                    onClick={() => {
                      setSelectedMonth({
                        month: dayjs().month(),
                        year: dayjs().year(),
                      });
                      setSelectedDay(dayjs());
                    }}
                  >
                    {rtl ? "להיום" : "Today"}
                  </button>
                </>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default DateTimePicker;
