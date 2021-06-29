import dayjs from "dayjs";
import { TargetMonth } from "../../../types";

const getWeekday = (date: string, startWeek: "sunday" | "monday") => {
  if (startWeek === "sunday") {
    return dayjs(date).day() + 1;
  } else {
    return dayjs(date).day();
  }
};

export const createCalendar = (
  selectedMonth: TargetMonth,
  startWeek: "sunday" | "monday"
) => {
  let currentMonthDays = [
    ...Array(
      dayjs(`${selectedMonth.year}-${selectedMonth.month + 1}-01`).daysInMonth()
    ),
  ].map((_, index) => {
    return {
      date: dayjs(
        `${selectedMonth.year}-${selectedMonth.month + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
    };
  });

  const currentMonthFirstDay = getWeekday(currentMonthDays[0].date, startWeek);

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
    };
  });

  const currentMonthLastDay = getWeekday(
    `${selectedMonth.year}-${selectedMonth.month + 1}-${
      currentMonthDays.length
    }`,
    startWeek
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
    };
  });

  let days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

  return days;
};
