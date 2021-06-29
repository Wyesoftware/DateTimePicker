import { ILanguage } from "../../../types";
let localeEn = require("dayjs/locale/en");
let localeHe = require("dayjs/locale/he");
let localeRu = require("dayjs/locale/ru");

export const en: ILanguage = {
  dayjs: {
    locale: localeEn,
    startWeek: "monday",
  },
  buttons: {
    today: "Today",
    time: "Set Time",
  },
  labels: {
    time: "Select time",
  },
  placeholders: {
    year: "Select year",
    month: "Select month",
  },
};

export const he: ILanguage = {
  dayjs: {
    locale: localeHe,
    startWeek: "sunday",
  },
  buttons: {
    today: "להיום",
    time: "בצע",
  },
  labels: {
    time: "בחר שעה",
  },
  placeholders: {
    year: "בחר שנה",
    month: "בחר חודש",
  },
};

export const ru: ILanguage = {
  dayjs: {
    locale: localeRu,
    startWeek: "monday",
  },
  buttons: {
    today: "Сегодня",
    time: "Задать время",
  },
  labels: {
    time: "Выберите время",
  },
  placeholders: {
    year: "Выберите год",
    month: "Выберите месяц",
  },
};
