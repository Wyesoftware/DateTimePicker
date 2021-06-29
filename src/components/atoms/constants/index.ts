import dayjs from "dayjs";

export const weekDays = (locale: any, startWeek: "sunday" | "monday") => {
  dayjs.locale(locale);
  if (startWeek === "sunday") {
    return Array.from({ length: 7 }, (_, i) => dayjs().day(i).format("dd"));
  } else {
    return Array.from({ length: 7 }, (_, i) => {
      if (i + 1 === 8) {
        return dayjs().day(0).format("dd");
      } else {
        return dayjs()
          .day(i + 1)
          .format("dd");
      }
    });
  }
};

export const monthes = (locale: any) => {
  dayjs.locale(locale);
  return Array.from({ length: 12 }, (_, i) => dayjs().month(i).format("MMMM"));
};

export const hours = [...Array(24).keys()];
export const minutes = [...Array(60).keys()];

export const dateFormat = "DD / MM / YYYY";
export const dateValidator = /\d{2}\s\/\s\d{2}\s\/\s\d{4}/;

export const dateTimeFormat = "DD / MM / YYYY  HH : mm";
export const dateTimeValidator =
  /\d{2}\s\/\s\d{2}\s\/\s\d{4}\s\s\d{2}\s\:\s\d{2}/;

export const timeFormat = "HH : mm";
export const timeValidator = /\d{2}\s\:\s\d{2}/;
