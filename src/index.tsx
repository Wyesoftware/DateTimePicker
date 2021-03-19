import React, { FC, useEffect, useState } from "react";
import "./styles/index.scss";
import arrowBack from "./styles/Icons/ArrowBack.svg";
import arrowClose from "./styles/Icons/ArrowClose.svg";
import arrowForward from "./styles/Icons/ArrowForward.svg";
import arrowOpen from "./styles/Icons/ArrowOpen.svg";
import dayjs, { Dayjs } from "dayjs";
import { useLayer } from "react-laag";
import { InfiniteMonthYearsSelect } from "./Components/InfiniteMonthYearsSelect";
import { InfiniteTimeInput } from "./Components/InfiniteTimeInput";
import { DateInput } from "./Components/DateInput";
import DateTimePickerType, { WeekDay } from "./Types/DateTimePicker";

let customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const DateTimePicker: FC<DateTimePickerType> = ({
  mode = "date",
  ref,
  name,
  value,
  defaultValue,
  disabled = false,
  readonly = false,
  allowClear = false,
  onBlur,
  onChange,
  disabledDates,
  style,
  rtl = false,
  lang,
  width = "100%",
}) => {
  dayjs.locale(lang);

  const getValueFormat = () => {
    if (mode === "date") {
      return "DD / MM / YYYY";
    } else if (mode === "datetime") {
      return "DD / MM / YYYY HH:mm";
    } else {
      return "HH:mm";
    }
  };

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
  const [inputValue, setInputValue] = useState<string | undefined>(
    value ? dayjs(value).format(getValueFormat()) : undefined
  );

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
    ].map((_, index) => {
      return {
        date: dayjs(
          `${selectedMonth.year}-${selectedMonth.month + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true,
        isDisabled:
          disabledDates &&
          disabledDates(
            dayjs(
              `${selectedMonth.year}-${selectedMonth.month + 1}-${index + 1}`
            )
          ),
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

    let previousMonthDays = [...Array(daysOfPreviousMonth)].map((_, index) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            lastMondayOfPreviousMonth + index
          }`
        ).format("YYYY-MM-DD"),
        dayOfMonth: lastMondayOfPreviousMonth + index,
        isCurrentMonth: false,
        isDisabled:
          disabledDates &&
          disabledDates(
            dayjs(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                lastMondayOfPreviousMonth + index
              }`
            )
          ),
      };
    });

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

    let nextMonthDays = [...Array(daysOfNextMonth)].map((_, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false,
        isDisabled:
          disabledDates &&
          disabledDates(
            dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`)
          ),
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
    let className = "wye-datetimepicker-day ";

    if (dayjs(value).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")) {
      className += "wye-datetimepicker-isToday ";
    }
    if (
      dayjs(value).format("YYYY-MM-DD") ===
      dayjs(selectedDay).format("YYYY-MM-DD")
    ) {
      className += "wye-datetimepicker-isSelected";
    }

    return className;
  };

  const setNewMonthYear = (value: Dayjs) => {
    setSelectedMonth({
      month: value.month(),
      year: value.year(),
    });
  };

  const setNewMinuteHour = async (value: Dayjs) => {
    let newDay = selectedDay
      .set("hours", value.get("hours"))
      .set("minutes", value.get("minutes"));
    await setSelectedDay(newDay);
    setInputValue(newDay.format(getValueFormat()));
    if (onChange) {
      onChange(newDay);
    }
  };

  const manualChange = async (value: string) => {
    setSelectedMonth({
      month: dayjs(value, getValueFormat()).month(),
      year: dayjs(value, getValueFormat()).year(),
    });
    await setSelectedDay(dayjs(value, getValueFormat()));
    setInputValue(value);
    if (onChange) {
      onChange(dayjs(value, getValueFormat()));
    }
  };

  return (
    <div
      id="wye-datetimepicker-container"
      className={rtl ? "wye-datetimepicker-rtl" : "wye-datetimepicker-ltr"}
      style={{ width: width }}
    >
      <div className="wye-datetimepicker-picker-container" {...triggerProps}>
        <DateInput
          mode={mode}
          ref={ref}
          name={name}
          value={inputValue ? inputValue : ""}
          rtl={rtl}
          onClick={() => {
            if (!disabled && !readonly) {
              setIsOptionsOpen(true);
            }
          }}
          onChange={(value: string) => manualChange(value)}
          onBlur={onBlur}
          disabledDate={(day) => (disabledDates ? disabledDates(day) : false)}
          setIsOpenOptions={(value: boolean) => setIsOptionsOpen(value)}
          onClear={() => onChange && onChange(undefined)}
          placeholder={hoverPlaceholder ? hoverPlaceholder : getValueFormat()}
          allowClear={allowClear}
          disabled={disabled}
          readonly={readonly}
          style={style}
        />
        {isOptionsOpen &&
          renderLayer(
            <div
              className={
                rtl
                  ? "wye-datetimepicker-options wye-datetimepicker-rtl"
                  : "wye-datetimepicker-options wye-datetimepicker-ltr"
              }
              {...layerProps}
            >
              {(mode === "time" || mode === "datetime") && !isActionsOpen && (
                <InfiniteTimeInput
                  defaultValue={selectedDay}
                  onChange={(value) => setNewMinuteHour(value)}
                  rtl={rtl}
                />
              )}
              {mode === "datetime" && !isActionsOpen && (
                <div className="wye-datetimepicker-hr"></div>
              )}
              {(mode === "date" || mode === "datetime") && (
                <>
                  <div className="wye-datetimepicker-calendar-actions">
                    <div
                      className={
                        rtl
                          ? "wye-datetimepicker-currentmonth wye-datetimepicker-currentmonth-rtl"
                          : "wye-datetimepicker-currentmonth"
                      }
                      onClick={() => setIsActionsOpen(!isActionsOpen)}
                    >
                      {dayjs().month(selectedMonth.month).format("MMMM") +
                        " " +
                        dayjs().year(selectedMonth.year).format("YYYY")}
                      {isActionsOpen ? (
                        <img src={arrowClose} alt="arrowClose" />
                      ) : (
                        <img
                          src={arrowOpen}
                          className={
                            rtl ? undefined : "wye-datetimepicker-rotate"
                          }
                          alt="arrowOpen"
                        />
                      )}
                    </div>
                    <div
                      className={
                        rtl
                          ? "wye-datetimepicker-actions wye-datetimepicker-actions-rtl"
                          : "wye-datetimepicker-actions"
                      }
                    >
                      {rtl ? (
                        <>
                          <img
                            src={arrowBack}
                            alt="arrowBack"
                            onClick={goBack}
                          />
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
                          <img
                            src={arrowBack}
                            alt="arrowBack"
                            onClick={goBack}
                          />
                        </>
                      )}
                    </div>
                  </div>
                  {isActionsOpen ? (
                    <div className="wye-datetimepicker-date-actions">
                      <InfiniteMonthYearsSelect
                        defaultValue={selectedDay}
                        onChange={(value) => setNewMonthYear(value)}
                        onClose={(value) => setIsActionsOpen(value)}
                        rtl={rtl}
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
                          {weeksAndDays?.map((week: WeekDay[], i: number) => (
                            <tr key={i}>
                              {week.map((day: WeekDay, a: number) => (
                                <td
                                  className={
                                    day.isDisabled
                                      ? "wye-datetimepicker-disabledDay"
                                      : undefined
                                  }
                                  style={{
                                    opacity: day.isCurrentMonth ? 1 : 0.5,
                                  }}
                                  key={a}
                                >
                                  <div
                                    className={mergeDayClass(day.date)}
                                    onMouseEnter={() =>
                                      !day.isDisabled &&
                                      setHoverPlaceholder(
                                        dayjs(day.date)
                                          .set("hour", selectedDay.get("hour"))
                                          .set(
                                            "minute",
                                            selectedDay.get("minute")
                                          )
                                          .format(getValueFormat())
                                      )
                                    }
                                    onMouseOut={() =>
                                      setHoverPlaceholder(undefined)
                                    }
                                    onClick={() => {
                                      if (!day.isDisabled) {
                                        setInputValue(
                                          dayjs(day.date)
                                            .set(
                                              "hour",
                                              selectedDay.get("hour")
                                            )
                                            .set(
                                              "minute",
                                              selectedDay.get("minute")
                                            )
                                            .format(getValueFormat())
                                        );
                                        if (onChange) {
                                          onChange(
                                            dayjs(day.date, "YYYY-MM-DD")
                                              .set(
                                                "hour",
                                                selectedDay.get("hour")
                                              )
                                              .set(
                                                "minute",
                                                selectedDay.get("minute")
                                              )
                                          );
                                        }
                                        setSelectedDay(
                                          selectedDay.set(
                                            "date",
                                            dayjs(day.date, "YYYY-MM-DD").get(
                                              "date"
                                            )
                                          )
                                        );
                                        if (!day.isCurrentMonth) {
                                          setSelectedMonth({
                                            month: dayjs(day.date).month(),
                                            year: dayjs(day.date).year(),
                                          });
                                        }
                                        setIsOptionsOpen(false);
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
                        className="wye-datetimepicker-primary"
                        type="button"
                        style={{ width: "100%", marginTop: "1rem" }}
                        onClick={() => {
                          setSelectedMonth({
                            month: dayjs().month(),
                            year: dayjs().year(),
                          });
                          if (
                            (disabledDates && !disabledDates(dayjs())) ||
                            !disabledDates
                          ) {
                            setSelectedDay(dayjs());
                            setInputValue(dayjs().format(getValueFormat()));
                            if (onChange) {
                              onChange(dayjs());
                            }
                          }
                        }}
                      >
                        {rtl ? "להיום" : "Today"}
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default DateTimePicker;
