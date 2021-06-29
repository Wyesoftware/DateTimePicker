export const checkDateValue = (
  value: string,
  min: number | null,
  max: number
) => {
  if (min) {
    value = Number(value) < min || Number(value) > max ? "" : value;
  } else {
    if (value.charAt(0) !== "0" || value === "00") {
      var num = parseInt(value);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      value =
        num > parseInt(max.toString().charAt(0)) && num.toString().length === 1
          ? "0" + num
          : num.toString();
    }
  }
  return value;
};
