import dayjs from "dayjs";
import { checkDateValue } from "./checkDateValue";

export const formatDate = (value: string, addSpace: boolean) => {
  if (/\D\/$/.test(value)) value = value.substr(0, value.length - 3);
  if (addSpace) {
    if (/\D$/.test(value)) value = value.substr(0, value.length - 2);
  }
  let values = value.split("/").map((v) => {
    return v.replace(/\D/g, "");
  });
  if (values[0]) values[0] = checkDateValue(values[0], null, 31);
  if (values[1]) values[1] = checkDateValue(values[1], null, 12);
  if (values[2] && values[2].length === 4)
    values[2] = checkDateValue(
      values[2],
      dayjs().subtract(120, "years").year(),
      dayjs().add(20, "years").year()
    );
  let output = values.map((v, i) => {
    return v.length === 2 && i < 2 ? v + " / " : v;
  });

  return output.join("").substr(0, 14).length === 14
    ? addSpace
      ? output.join("").substr(0, 14) + "  "
      : output.join("").substr(0, 14)
    : output.join("").substr(0, 14);
};

export const formatTime = (value: string, isCut: boolean) => {
  let cutTime = isCut ? value.substr(16) : value;
  if (/\D\:$/.test(cutTime)) cutTime = cutTime.substr(0, cutTime.length - 3);
  let values = cutTime.split(":").map((v) => {
    return v.replace(/\D/g, "");
  });
  if (values[0]) values[0] = checkDateValue(values[0], null, 23);
  if (values[1]) values[1] = checkDateValue(values[1], null, 59);

  let output = values.map((v, i) => {
    return v.length === 2 && i < 1 ? v + " : " : v;
  });

  return isCut
    ? value.substr(0, 16) + output.join("").substr(0, 7)
    : output.join("").substr(0, 7);
};
