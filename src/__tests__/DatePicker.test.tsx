import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import DateTimeComponent from "../index";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

describe("DatePicker", () => {
  it("test render", () => {
    render(<DateTimeComponent mode="date" />);
    expect(screen.getByRole("datetimepicker")).toBeInTheDocument();
  });

  it("test open calendar", () => {
    render(<DateTimeComponent mode="date" />);
    user.click(screen.getByRole("datetimepicker"));
    expect(screen.getByRole("picker")).toBeInTheDocument();
  });

  describe("Props testing", () => {
    it("test default placeholder", () => {
      render(<DateTimeComponent mode="date" />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "placeholder",
        "DD / MM / YYYY"
      );
    });

    it("test custom placeholder", () => {
      render(<DateTimeComponent mode="date" placeholder="test" />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "placeholder",
        "test"
      );
    });

    it("test allowClear", () => {
      render(<DateTimeComponent mode="date" allowClear />);
      expect(screen.getByRole("clearInput")).toBeInTheDocument();
    });

    it("test name", () => {
      render(<DateTimeComponent mode="date" name="test" />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "name",
        "test"
      );
    });

    it("test className", () => {
      render(<DateTimeComponent mode="date" className="test" />);
      expect(screen.getByRole("container")).toHaveClass("test");
    });

    it("test disabled", () => {
      render(<DateTimeComponent mode="date" disabled />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "disabled",
        ""
      );
      user.click(screen.getByRole("datetimepicker"));
      expect(screen.queryByRole("picker")).not.toBeInTheDocument();
    });

    it("test onBlur", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent mode="date" onBlur={() => console.log("blur")} />
      );
      user.click(screen.getByRole("datetimepicker"));
      expect(screen.queryByRole("picker")).toBeInTheDocument();
      user.click(document.body);
      expect(console.log).toHaveBeenCalledWith("blur");
      expect(screen.queryByRole("picker")).not.toBeInTheDocument();
    });

    it("test onClear", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="date"
          allowClear
          onClear={() => console.log("clear")}
        />
      );
      user.type(screen.getByRole("datetimepicker-input"), "12032021");
      expect(screen.getByRole("datetimepicker-input")).toHaveValue(
        "12 / 03 / 2021"
      );
      user.click(screen.getByRole("clearInput"));
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("");
      expect(console.log).toHaveBeenCalledWith("clear");
    });

    it("test dir", () => {
      render(<DateTimeComponent mode="date" dir="rtl" />);
      expect(screen.getByRole("container")).toHaveAttribute("dir", "rtl");
    });

    it("test dirFromElement", () => {
      document.dir = "rtl";
      render(<DateTimeComponent mode="date" dirFromElement="html" />);
      expect(screen.getByRole("container")).toHaveAttribute("dir", "rtl");
    });

    it("test language", () => {
      render(<DateTimeComponent mode="date" language="ru" />);
      user.click(screen.getByRole("datetimepicker"));
      expect(screen.getByRole("today-button")).toHaveTextContent("Сегодня");
    });

    it("test readOnly", () => {
      render(<DateTimeComponent mode="date" readOnly />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "readOnly",
        ""
      );
      user.click(screen.getByRole("datetimepicker"));
      expect(screen.queryByRole("picker")).not.toBeInTheDocument();
    });

    it("test isCurrentMonth - false", () => {
      render(<DateTimeComponent mode="date" isCurrentMonth={false} />);
      user.click(screen.getByRole("datetimepicker"));
      expect(screen.queryByRole("select")).toBeInTheDocument();
      expect(screen.queryByRole("calendar")).not.toBeInTheDocument();
    });
  });

  describe("Value testing", () => {
    it("test onChange by type", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="date"
          onChange={(value) => console.log(value)}
        />
      );
      user.type(screen.getByRole("datetimepicker-input"), "12032021");
      expect(screen.getByRole("datetimepicker-input")).toHaveValue(
        "12 / 03 / 2021"
      );
      expect(console.log).toHaveBeenCalledWith(
        dayjs("2021-03-12", "YYYY-MM-DD", true)
      );
    });

    it("test onChange by type (wrong value)", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="date"
          onChange={(value) => console.log(value)}
        />
      );
      user.type(screen.getByRole("datetimepicker-input"), "12031854");
      user.click(document.body);
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("");
      expect(console.log).toHaveBeenCalledWith(undefined);
    });

    it("test disabledDates by type", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="date"
          disabledDates={(day) => day.format("YYYY-MM-DD") === "2021-03-12"}
          onChange={(value) => console.log(value)}
        />
      );
      user.type(screen.getByRole("datetimepicker-input"), "12032021");
      user.click(document.body);
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("");
      expect(console.log).toHaveBeenCalledWith(undefined);
    });

    it("test onChange by click", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="date"
          onChange={(value: Dayjs) => console.log(value.format("DD/MM/YYYY"))}
        />
      );
      user.click(screen.getByRole("datetimepicker"));
      user.click(screen.getByRole("calendar-day-12"));
      expect(screen.getByRole("datetimepicker-input")).toHaveValue(
        dayjs().set("date", 12).format("DD / MM / YYYY")
      );
      expect(console.log).toHaveBeenCalledWith(
        dayjs().set("date", 12).format("DD/MM/YYYY")
      );
    });

    it("test disabledDates by click", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="date"
          disabledDates={(day) =>
            day.format("YYYY-MM-DD") ===
            dayjs().set("date", 12).format("YYYY-MM-DD")
          }
          onChange={(value) => console.log(value)}
        />
      );
      user.click(screen.getByRole("datetimepicker"));
      user.click(screen.getByRole("calendar-day-12"));
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("");
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});
