import { ICreateCalendar } from "../../../types";

export const chunkDays = (calendar: ICreateCalendar[]) => {
  let results = [];
  while (calendar.length) {
    results.push(calendar.splice(0, 7));
  }
  return results;
};
