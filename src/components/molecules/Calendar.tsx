import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import cx from "classnames";
import { chunkDays } from "../atoms/functions/chunkDays";
import { createCalendar } from "../atoms/functions/createCalendar";
import { TargetMonth, WeekDay, ICalendar, ICreateCalendar } from "../../types";
import { hours, minutes, weekDays } from "../atoms/constants";
import { arrowBack, arrowForward } from "../atoms/icons";
import { Select } from "../molecules/Select";
import { padNumber } from "../atoms/functions/padNumber";
import { useDirection } from "../atoms/hooks/useDirection";

export const Calendar = ({
  mode,
  targetValue,
  onReset,
  onChange,
  onChangeTime,
  disabledDates,
  language,
}: ICalendar) => {
  const { getDirection } = useDirection();

  const [targetMonth, setTargetMonth] = useState<TargetMonth>({
    month: targetValue.month!,
    year: targetValue.year!,
  });

  const [calendarData, setCalendarData] = useState<ICreateCalendar[][]>([]);

  useEffect(() => {
    setTargetMonth({
      month: targetValue.month!,
      year: targetValue.year!,
    });
  }, [targetValue]);

  useEffect(() => {
    let calendar = createCalendar(targetMonth, language.dayjs.startWeek);
    let chunkedCalendar = chunkDays(calendar);
    setCalendarData(chunkedCalendar);
  }, [targetMonth]);

  const goBack = () => {
    setTargetMonth({
      month: dayjs(
        dayjs()
          .month(targetMonth.month)
          .year(targetMonth.year)
          .subtract(1, "month")
      ).month(),
      year: dayjs(
        dayjs()
          .month(targetMonth.month)
          .year(targetMonth.year)
          .subtract(1, "month")
      ).year(),
    });
  };

  const goForward = () => {
    setTargetMonth({
      month: dayjs(
        dayjs().month(targetMonth.month).year(targetMonth.year).add(1, "month")
      ).month(),
      year: dayjs(
        dayjs().month(targetMonth.month).year(targetMonth.year).add(1, "month")
      ).year(),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {(mode === "datetime" || mode === "time") && (
        <>
          <div
            className={cx("w-full flex flex-row justify-between items-center", {
              "mb-8": mode === "datetime",
              "mb-4": mode === "time",
            })}
          >
            <span>{language.labels.time}:</span>
            <div className="flex ltr:flex-row rtl:flex-row-reverse items-center children:mx-2">
              <Select
                options={hours.map((hour) => ({
                  value: hour,
                  label: padNumber(hour, 2),
                  focus: dayjs().hour() === hour,
                }))}
                defaultValue={dayjs().hour()}
                value={targetValue.hour}
                onChange={(value) =>
                  onChangeTime({
                    hour: Number(value),
                    minute: targetValue.minute,
                  })
                }
              />
              <Select
                options={minutes.map((minute) => ({
                  value: minute,
                  label: padNumber(minute, 2),
                  focus: dayjs().minute() === minute,
                }))}
                defaultValue={dayjs().minute()}
                value={targetValue.minute}
                onChange={(value) =>
                  onChangeTime({
                    hour: targetValue.hour,
                    minute: Number(value),
                  })
                }
              />
            </div>
          </div>
          {mode === "time" && (
            <div className="w-full flex flex-row justify-between items-center">
              <button
                className="bg-[#1c87e5] py-2 px-4 flex justify-center items-center border-0 outline-none text-white w-full cursor-pointer hover:bg-[#1c87e5e6]"
                onClick={() =>
                  onChange({
                    year: dayjs().year(),
                    month: dayjs().month(),
                    day: dayjs().date(),
                  })
                }
              >
                {language.buttons.time}
              </button>
            </div>
          )}
        </>
      )}
      {(mode === "date" || mode === "datetime") && (
        <>
          <div className="w-full flex flex-row justify-between items-center mb-4 children:(font-bold cursor-pointer)">
            <span onClick={goBack}>
              <img
                src={getDirection() === "ltr" ? arrowBack : arrowForward}
                alt="arrowBack"
              />
            </span>
            <span onClick={onReset}>
              {dayjs()
                .set("year", targetMonth.year)
                .set("month", targetMonth.month)
                .set("date", 1)
                .format("MMMM YYYY")}
            </span>
            <span onClick={goForward}>
              <img
                src={getDirection() === "ltr" ? arrowForward : arrowBack}
                alt="arrowForward"
              />
            </span>
          </div>
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
              {calendarData?.map((week: WeekDay[], i: number) => (
                <tr key={i}>
                  {week.map((day: WeekDay, a: number) => (
                    <td key={a}>
                      <div
                        className={cx(
                          "relative flex justify-center items-center p-4 my-0.5 cursor-pointer rounded-sm select-none hover:bg-[#1c87e54d]",
                          {
                            "text-[#bdbdbd]": !day.isCurrentMonth,
                            "border-b-2 border-b-[#1c87e5]":
                              dayjs().format("YYYY-MM-DD") ===
                              dayjs(day.date).format("YYYY-MM-DD"),
                            "border-0 bg-[#1c87e5] text-white":
                              targetValue &&
                              targetValue.year &&
                              targetValue.month &&
                              targetValue.day &&
                              dayjs(day.date).format("YYYY-MM-DD") ===
                                dayjs()
                                  .set("year", targetValue!.year!)
                                  .set("month", targetValue!.month!)
                                  .set("date", targetValue!.day!)
                                  .format("YYYY-MM-DD"),
                            "opacity-20 cursor-not-allowed hover:bg-transparent":
                              disabledDates
                                ? disabledDates(dayjs(day.date))
                                : false,
                          }
                        )}
                        onClick={() => {
                          if (
                            !disabledDates ||
                            !disabledDates(dayjs(day.date))
                          ) {
                            onChange({
                              year: dayjs(day.date).year(),
                              month: dayjs(day.date).month(),
                              day: dayjs(day.date).date(),
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
          <div className="w-full flex flex-row justify-between items-center mt-4">
            <button
              className="bg-[#1c87e5] py-2 px-4 flex justify-center items-center border-0 outline-none mx-2 text-white w-full cursor-pointer hover:bg-[#1c87e5e6]"
              onClick={() =>
                setTargetMonth({
                  month: dayjs().month(),
                  year: dayjs().year(),
                })
              }
            >
              {language.buttons.today}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
