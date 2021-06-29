export const padNumber = (num: number | string, width: number, z?: string) => {
  z = z || "0";
  num = num + "";
  return num.length >= width
    ? num
    : new Array(width - num.length + 1).join(z) + num;
};
