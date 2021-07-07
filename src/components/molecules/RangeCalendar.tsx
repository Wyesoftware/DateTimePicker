import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ICreateCalendar, IRangeCalendar, WeekDay } from "../../types";
import { weekDays } from "../atoms/constants";
import { chunkDays } from "../atoms/functions/chunkDays";
import { createCalendar } from "../atoms/functions/createCalendar";
import { useDirection } from "../atoms/hooks/useDirection";
import { arrowBack, arrowForward, rangeArrow } from "../atoms/icons";
import cx from "classnames";

export const RangeCalendar = ({
  targetDate,
  targetValue,
  setTargetDate,
  setTargetValue,
  onChange,
  language,
}: IRangeCalendar) => {
  const { getDirection } = useDirection();

  const [calendarFromData, setCalendarFromData] = useState<ICreateCalendar[][]>(
    []
  );
  const [calendarToData, setCalendarToData] = useState<ICreateCalendar[][]>([]);

  useEffect(() => {
    let calendarFrom = createCalendar(targetDate, language.dayjs.startWeek);
    let chunkedCalendarFrom = chunkDays(calendarFrom);
    setCalendarFromData(chunkedCalendarFrom);

    const targetToDate = {
      year: targetDate.year,
      month: dayjs().month(targetDate.month).add(1, "month").month(),
    };

    let calendarTo = createCalendar(targetToDate, language.dayjs.startWeek);
    let chunkedCalendarTo = chunkDays(calendarTo);
    setCalendarToData(chunkedCalendarTo);
  }, [targetDate]);

  const goBack = () => {
    setTargetDate({
      month: dayjs(
        dayjs()
          .month(targetDate.month)
          .year(targetDate.year)
          .subtract(1, "month")
      ).month(),
      year: dayjs(
        dayjs()
          .month(targetDate.month)
          .year(targetDate.year)
          .subtract(1, "month")
      ).year(),
    });
  };

  const goForward = () => {
    setTargetDate({
      month: dayjs(
        dayjs().month(targetDate.month).year(targetDate.year).add(1, "month")
      ).month(),
      year: dayjs(
        dayjs().month(targetDate.month).year(targetDate.year).add(1, "month")
      ).year(),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <>
        <div className="w-full flex flex-row justify-between items-center mb-4 children:(font-bold cursor-pointer)">
          <span onClick={goBack}>
            <img
              src={getDirection() === "ltr" ? arrowBack : arrowForward}
              alt="arrowBack"
            />
          </span>
          <span className="flex flex-row justify-center items-center">
            {dayjs()
              .set("year", targetDate.year)
              .set("month", targetDate.month)
              .set("date", 1)
              .format("MMMM YYYY ")}
            <img
              className="mx-4 rtl:(transform -rotate-180)"
              src={rangeArrow}
              alt="range-arrow"
            />
            {dayjs()
              .set("year", targetDate.year)
              .set("month", targetDate.month)
              .set("date", 1)
              .add(1, "month")
              .format(" MMMM YYYY")}
          </span>
          <span onClick={goForward}>
            <img
              src={getDirection() === "ltr" ? arrowForward : arrowBack}
              alt="arrowForward"
            />
          </span>
        </div>
        <div className="relative flex flex-row justify-center items-start children:mx-2">
          <table className="table table-fixed border-collapse text-center">
            <thead>
              <tr>
                {weekDays(language.dayjs.locale, language.dayjs.startWeek).map(
                  (weekDay: string, key: number) => (
                    <th className="pb-1 opacity-60" key={key}>
                      {weekDay}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {calendarFromData?.map((week: WeekDay[], i: number) => (
                <tr key={i}>
                  {week.map((day: WeekDay, a: number) => (
                    <td key={a}>
                      <div
                        role={
                          "calendar-from-day-" + dayjs(day.date).format("D")
                        }
                        className={cx(
                          "relative flex justify-center items-center p-4 my-0.5 cursor-pointer rounded-sm select-none",
                          {
                            "opacity-0 cursor-default": !day.isCurrentMonth,
                            "hover:bg-[#1c87e54d]": targetValue[0]
                              ? dayjs(day.date).format("YYYY-MM-DD") !==
                                targetValue[0].format("YYYY-MM-DD")
                              : false,
                            "border-0 bg-[#1c87e5] text-white": targetValue[0]
                              ? dayjs(day.date).format("YYYY-MM-DD") ===
                                targetValue[0].format("YYYY-MM-DD")
                              : false,
                            "bg-[#1c87e54d]":
                              targetValue[0] && targetValue[1]
                                ? dayjs(day.date).isBetween(
                                    targetValue[0],
                                    targetValue[1]
                                  )
                                : false,
                          },
                          {
                            "border-0 bg-[#1c87e5] text-white": targetValue[1]
                              ? dayjs(day.date).format("YYYY-MM-DD") ===
                                targetValue[1].format("YYYY-MM-DD")
                              : false,
                          }
                        )}
                        onClick={() => {
                          if (day.isCurrentMonth) {
                            if (targetValue[0]) {
                              if (targetValue[1]) {
                                setTargetValue([dayjs(day.date), null]);
                              } else {
                                setTargetValue([
                                  targetValue[0],
                                  dayjs(day.date),
                                ]);
                                onChange([targetValue[0], dayjs(day.date)]);
                              }
                            } else {
                              setTargetValue([dayjs(day.date), targetValue[1]]);
                              targetValue[1] &&
                                onChange([dayjs(day.date), targetValue[1]]);
                            }
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
          <div className="absolute block h-full w-0.1 bg-gray-300" />
          <table className="table table-fixed border-collapse text-center">
            <thead>
              <tr>
                {weekDays(language.dayjs.locale, language.dayjs.startWeek).map(
                  (weekDay: string, key: number) => (
                    <th className="pb-1 opacity-60" key={key}>
                      {weekDay}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {calendarToData?.map((week: WeekDay[], i: number) => (
                <tr key={i}>
                  {week.map((day: WeekDay, a: number) => (
                    <td key={a}>
                      <div
                        role={"calendar-to-day-" + dayjs(day.date).format("D")}
                        className={cx(
                          "relative flex justify-center items-center p-4 my-0.5 cursor-pointer rounded-sm select-none",
                          {
                            "opacity-0 cursor-default": !day.isCurrentMonth,
                            "hover:bg-[#1c87e54d]": targetValue[1]
                              ? dayjs(day.date).format("YYYY-MM-DD") !==
                                targetValue[1].format("YYYY-MM-DD")
                              : false,
                            "border-0 bg-[#1c87e5] text-white": targetValue[1]
                              ? dayjs(day.date).format("YYYY-MM-DD") ===
                                targetValue[1].format("YYYY-MM-DD")
                              : false,
                            "bg-[#1c87e54d]":
                              targetValue[0] && targetValue[1]
                                ? dayjs(day.date).isBetween(
                                    targetValue[0],
                                    targetValue[1]
                                  )
                                : false,
                          },
                          {
                            "border-0 bg-[#1c87e5] text-white": targetValue[0]
                              ? dayjs(day.date).format("YYYY-MM-DD") ===
                                targetValue[0].format("YYYY-MM-DD")
                              : false,
                          }
                        )}
                        onClick={() => {
                          if (day.isCurrentMonth) {
                            setTargetValue([targetValue[0], dayjs(day.date)]);
                            targetValue[0] &&
                              onChange([targetValue[0], dayjs(day.date)]);
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
        </div>
        <div className="w-full flex flex-row justify-between items-center mt-4">
          <button
            role="today-button"
            className="bg-[#1c87e5] py-2 px-4 flex justify-center items-center border-0 outline-none mx-2 text-white w-full cursor-pointer hover:bg-[#1c87e5e6]"
            onClick={() =>
              setTargetDate({
                month: dayjs().month(),
                year: dayjs().year(),
              })
            }
          >
            {language.buttons.today}
          </button>
        </div>
      </>
    </div>
  );
};
