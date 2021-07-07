import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import DateTimeComponent from "../index";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

describe("TimePicker", () => {
  it("test render", () => {
    render(<DateTimeComponent mode="time" />);
    expect(screen.getByRole("datetimepicker")).toBeInTheDocument();
  });

  it("test open calendar", () => {
    render(<DateTimeComponent mode="time" />);
    user.click(screen.getByRole("datetimepicker"));
    expect(screen.getByRole("picker")).toBeInTheDocument();
  });

  describe("Props testing", () => {
    it("test default placeholder", () => {
      render(<DateTimeComponent mode="time" />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "placeholder",
        "HH : mm"
      );
    });

    it("test custom placeholder", () => {
      render(<DateTimeComponent mode="time" placeholder="test" />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "placeholder",
        "test"
      );
    });

    it("test allowClear", () => {
      render(<DateTimeComponent mode="time" allowClear />);
      expect(screen.getByRole("clearInput")).toBeInTheDocument();
    });

    it("test name", () => {
      render(<DateTimeComponent mode="time" name="test" />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "name",
        "test"
      );
    });

    it("test className", () => {
      render(<DateTimeComponent mode="time" className="test" />);
      expect(screen.getByRole("container")).toHaveClass("test");
    });

    it("test disabled", () => {
      render(<DateTimeComponent mode="time" disabled />);
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
        <DateTimeComponent mode="time" onBlur={() => console.log("blur")} />
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
          mode="time"
          allowClear
          onClear={() => console.log("clear")}
        />
      );
      user.type(screen.getByRole("datetimepicker-input"), "1230");
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("12 : 30");
      user.click(screen.getByRole("clearInput"));
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("");
      expect(console.log).toHaveBeenCalledWith("clear");
    });

    it("test dir", () => {
      render(<DateTimeComponent mode="time" dir="rtl" />);
      expect(screen.getByRole("container")).toHaveAttribute("dir", "rtl");
    });

    it("test dirFromElement", () => {
      document.dir = "rtl";
      render(<DateTimeComponent mode="time" dirFromElement="html" />);
      expect(screen.getByRole("container")).toHaveAttribute("dir", "rtl");
    });

    it("test language", () => {
      render(<DateTimeComponent mode="time" language="ru" />);
      user.click(screen.getByRole("datetimepicker"));
      expect(screen.getByRole("time-button")).toHaveTextContent("Задать время");
    });

    it("test readOnly", () => {
      render(<DateTimeComponent mode="time" readOnly />);
      expect(screen.getByRole("datetimepicker-input")).toHaveAttribute(
        "readOnly",
        ""
      );
      user.click(screen.getByRole("datetimepicker"));
      expect(screen.queryByRole("picker")).not.toBeInTheDocument();
    });

    it("test isCurrentMonth - false", () => {
      render(<DateTimeComponent mode="time" isCurrentMonth={false} />);
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
          mode="time"
          onChange={(value) => console.log(value)}
        />
      );
      user.type(screen.getByRole("datetimepicker-input"), "1230");
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("12 : 30");
      expect(console.log).toHaveBeenCalledWith(dayjs("12:30", "HH:mm", true));
    });

    it("test onChange by click", () => {
      window.HTMLElement.prototype.scrollIntoView = jest.fn();
      console.log = jest.fn();
      render(
        <DateTimeComponent
          mode="time"
          onChange={(value: Dayjs) => console.log(value.format("HH:mm"))}
        />
      );
      user.click(screen.getByRole("datetimepicker"));
      user.click(screen.getAllByRole("select")[0]);
      user.click(screen.getByRole("option-12"));
      user.click(screen.getAllByRole("select")[1]);
      user.click(screen.getByRole("option-30"));
      user.click(screen.getByRole("time-button"));
      expect(screen.getByRole("datetimepicker-input")).toHaveValue("12 : 30");
      expect(console.log).toHaveBeenCalledWith(
        dayjs().set("hour", 12).set("minute", 30).format("HH:mm")
      );
    });
  });
});
