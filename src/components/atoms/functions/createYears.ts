import dayjs from "dayjs";

export const createYears = () => {
  let previousYears = Array.from({ length: 120 }, (_, i) =>
    dayjs()
      .subtract(120 - i, "year")
      .year()
  );
  let nextYears = Array.from({ length: 20 }, (_, i) =>
    dayjs().add(i, "year").year()
  );

  return [...previousYears, ...nextYears];
};
