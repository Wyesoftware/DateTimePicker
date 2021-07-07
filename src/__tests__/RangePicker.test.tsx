import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import DateTimeComponent from "../index";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

describe("RangePicker", () => {
  it("render rangepicker", () => {
    render(<DateTimeComponent mode="range" />);
    expect(screen.getByRole("rangepicker")).toBeInTheDocument();
  });

  it("test open calendar", () => {
    render(<DateTimeComponent mode="range" />);
    user.click(screen.getByRole("rangepicker"));
    expect(screen.getByRole("picker")).toBeInTheDocument();
  });

  describe("Props testing", () => {
    it("test default placeholder", () => {
      render(<DateTimeComponent mode="range" />);
      expect(screen.getByRole("rangepicker-input-from")).toHaveAttribute(
        "placeholder",
        "DD / MM / YYYY"
      );
      expect(screen.getByRole("rangepicker-input-to")).toHaveAttribute(
        "placeholder",
        "DD / MM / YYYY"
      );
    });

    it("test custom placeholder", () => {
      render(
        <DateTimeComponent mode="range" placeholder={["test1", "test2"]} />
      );
      expect(screen.getByRole("rangepicker-input-from")).toHaveAttribute(
        "placeholder",
        "test1"
      );
      expect(screen.getByRole("rangepicker-input-to")).toHaveAttribute(
        "placeholder",
        "test2"
      );
    });

    it("test allowClear", () => {
      render(<DateTimeComponent mode="range" allowClear />);
      expect(screen.getByRole("clearInput")).toBeInTheDocument();
    });

    it("test name", () => {
      render(<DateTimeComponent mode="range" name="test" />);
      expect(screen.getByRole("rangepicker-input-from")).toHaveAttribute(
        "name",
        "test-from"
      );
      expect(screen.getByRole("rangepicker-input-to")).toHaveAttribute(
        "name",
        "test-to"
      );
    });

    it("test className", () => {
      render(<DateTimeComponent mode="range" className="test" />);
      expect(screen.getByRole("container")).toHaveClass("test");
    });

    it("test disabled", () => {
      render(<DateTimeComponent mode="range" disabled />);
      expect(screen.getByRole("rangepicker-input-from")).toHaveAttribute(
        "disabled",
        ""
      );
      expect(screen.getByRole("rangepicker-input-to")).toHaveAttribute(
        "disabled",
        ""
      );
      user.click(screen.getByRole("rangepicker"));
      expect(screen.queryByRole("picker")).not.toBeInTheDocument();
    });

    it("test onBlur", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent mode="range" onBlur={() => console.log("blur")} />
      );
      user.click(screen.getByRole("rangepicker"));
      expect(screen.queryByRole("picker")).toBeInTheDocument();
      user.click(document.body);
      expect(console.log).toHaveBeenCalledWith("blur");
      expect(screen.queryByRole("picker")).not.toBeInTheDocument();
    });

    it("test onClear", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="range"
          allowClear
          onClear={() => console.log("clear")}
        />
      );
      user.type(screen.getByRole("rangepicker-input-from"), "12032021");
      expect(screen.getByRole("rangepicker-input-from")).toHaveValue(
        "12 / 03 / 2021"
      );
      user.type(screen.getByRole("rangepicker-input-to"), "12042021");
      expect(screen.getByRole("rangepicker-input-to")).toHaveValue(
        "12 / 04 / 2021"
      );
      user.click(screen.getByRole("clearInput"));
      expect(screen.getByRole("rangepicker-input-from")).toHaveValue("");
      expect(screen.getByRole("rangepicker-input-to")).toHaveValue("");
      expect(console.log).toHaveBeenCalledWith("clear");
    });

    it("test dir", () => {
      render(<DateTimeComponent mode="range" dir="rtl" />);
      expect(screen.getByRole("container")).toHaveAttribute("dir", "rtl");
    });

    it("test dirFromElement", () => {
      document.dir = "rtl";
      render(<DateTimeComponent mode="range" dirFromElement="html" />);
      expect(screen.getByRole("container")).toHaveAttribute("dir", "rtl");
    });

    it("test language", () => {
      render(<DateTimeComponent mode="range" language="ru" />);
      user.click(screen.getByRole("rangepicker"));
      expect(screen.getByRole("today-button")).toHaveTextContent("Сегодня");
    });

    it("test readOnly", () => {
      render(<DateTimeComponent mode="range" readOnly />);
      expect(screen.getByRole("rangepicker-input-from")).toHaveAttribute(
        "readOnly",
        ""
      );
      expect(screen.getByRole("rangepicker-input-to")).toHaveAttribute(
        "readOnly",
        ""
      );
      user.click(screen.getByRole("rangepicker"));
      expect(screen.queryByRole("picker")).not.toBeInTheDocument();
    });
  });

  describe("Value testing", () => {
    it("test onChange by type", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="range"
          onChange={(value) => console.log(value)}
        />
      );
      user.type(screen.getByRole("rangepicker-input-from"), "12032021");
      user.type(screen.getByRole("rangepicker-input-to"), "12042021");
      expect(screen.getByRole("rangepicker-input-from")).toHaveValue(
        "12 / 03 / 2021"
      );
      expect(screen.getByRole("rangepicker-input-to")).toHaveValue(
        "12 / 04 / 2021"
      );
      expect(console.log).toHaveBeenCalledWith([
        dayjs("2021-03-12", "YYYY-MM-DD", true),
        dayjs("2021-04-12", "YYYY-MM-DD", true),
      ]);
    });

    it("test onChange by type (wrong value)", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="range"
          onChange={(value) => console.log(value)}
        />
      );
      user.type(screen.getByRole("rangepicker-input-from"), "12031884");
      user.type(screen.getByRole("rangepicker-input-to"), "12041736");
      user.click(document.body);
      expect(screen.getByRole("rangepicker-input-from")).toHaveValue("");
      expect(screen.getByRole("rangepicker-input-to")).toHaveValue("");
      expect(console.log).toHaveBeenCalledWith(undefined);
    });

    it("test onChange by click", () => {
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="range"
          onChange={(value: Dayjs[]) =>
            console.log(value.map((day) => day.format("YYYY-MM-DD")))
          }
        />
      );
      user.click(screen.getByRole("rangepicker"));
      user.click(screen.getByRole("calendar-from-day-12"));
      user.click(screen.getByRole("calendar-to-day-12"));
      expect(screen.getByRole("rangepicker-input-from")).toHaveValue(
        dayjs().set("date", 12).format("DD / MM / YYYY")
      );
      expect(screen.getByRole("rangepicker-input-to")).toHaveValue(
        dayjs().add(1, "month").set("date", 12).format("DD / MM / YYYY")
      );
      expect(console.log).toHaveBeenCalledWith([
        dayjs().set("date", 12).format("YYYY-MM-DD"),
        dayjs().add(1, "month").set("date", 12).format("YYYY-MM-DD"),
      ]);
    });
  });
});
