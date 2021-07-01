import { FocusEvent, Ref } from "react";
import { LayerProps } from "react-laag";
import { Dayjs } from "dayjs";
import { Locale } from "dayjs/locale/*";

export interface Props {
  /**
   * Set direction attribute
   * @param "ltr" | "rtl"
   * @default "ltr"
   */
  dir?: "ltr" | "rtl";
  /**
   * Set direction from outside element
   * @param "html" | "body" | string
   * @summary type string is the id of the element you want to get the dir attribute from
   */
  dirFromElement?: "html" | "body" | string;
  /**
   * Ref for input
   */
  inputRef?: Ref<HTMLInputElement>;
  /**
   * Input form name
   */
  name?: string;
  /**
   * Input value
   * @summary string | Dayjs - for "date" | "datetime" | "time" mode
   * @summary string[] | Dayjs[] - for "range" mode
   */
  value?: string | Dayjs | string[] | Dayjs[];
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Input onChange callback
   * @summary Dayjs | undefined - for "date" | "datetime" | "time" mode
   * @summary Dayjs[] | undefined - for "range" mode
   */
  onChange?: (value: Dayjs | Dayjs[] | undefined) => void;
  /**
   * Input onBlur callback
   */
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void;
  /**
   * Datetimepicker mode
   * @default "datetime"
   */
  mode?: "date" | "time" | "datetime" | "range";
  /**
   * Calendar already shows current month or need to choose year and month
   * @default true
   */
  isCurrentMonth?: boolean;
  /**
   * Disable some dates from choosing
   * @example disableDates={ (day) => day === dayjs() }
   * @summary available only in mode "date" or "datetime"
   */
  disabledDates?: (day: Dayjs) => boolean;
  /**
   * Choose language or set custom language
   * @param "en" | "he" | "ru" | customLang
   * @default "en"
   */
  language?: ILanguage | "en" | "he" | "ru";
  /**
   * Disabled mod for input
   * @default false
   */
  disabled?: boolean;
  /**
   * ReadOnly mod for input
   * @default false
   */
  readOnly?: boolean;
  /**
   * Show clear button to reset input
   * @default false
   */
  allowClear?: boolean;
  /**
   * onClear callback for clear button
   */
  onClear?: () => void;
  /**
   * Classes for main container
   */
  className?: string;
}

export interface ILanguage {
  /**
   * Dayjs options
   */
  dayjs: {
    /**
     * Dayjs Locale
     */
    locale: Locale;
    /**
     * Set day calendar start from
     * @param "sunday" | "monday"
     */
    startWeek: "sunday" | "monday";
  };
  /**
   * Buttons labels
   */
  buttons: {
    today: string;
    time: string;
  };
  /**
   * Text labels
   */
  labels: {
    time: string;
  };
  /**
   * Select placeholders
   */
  placeholders: {
    year: string;
    month: string;
  };
}

export interface TargetMonth {
  month: number;
  year: number;
}

export interface WeekDay {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
}

export interface ICalendar {
  mode: "date" | "datetime" | "time";
  targetValue: IDateValue;
  onReset: () => void;
  onChange: (value: { year: number; month: number; day: number }) => void;
  onChangeTime: (value: { hour: number | null; minute: number | null }) => void;
  disabledDates?: (day: Dayjs) => boolean;
  language: ILanguage;
}

export interface IRangeCalendar {
  targetDate: TargetMonth;
  targetValue: (Dayjs | null)[];
  setTargetDate: (value: TargetMonth) => void;
  onChange: (value: (Dayjs | null)[]) => void;
  language: ILanguage;
}

export interface ICreateCalendar {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
}

export interface IInput {
  inputRef: Ref<HTMLInputElement>;
  mode: "date" | "datetime" | "time";
  name?: string;
  placeholder?: string;
  value: string;
  disabled: boolean;
  readOnly: boolean;
  allowClear: boolean;
  onChange: (value: Dayjs | null) => void;
  onClear?: () => void;
}

export interface IRangeInput {
  inputRef: Ref<HTMLInputElement>;
  name?: string;
  placeholder?: string;
  value: string[];
  disabled: boolean;
  readOnly: boolean;
  allowClear: boolean;
  onChange: (value: (Dayjs | null)[] | null) => void;
  onBlur: (value: number) => void;
  onClear?: () => void;
}

export interface IDateTimePicker {
  inputRef?: Ref<HTMLInputElement>;
  mode: "date" | "datetime" | "time";
  placeholder: string | undefined;
  name: string | undefined;
  value: string | Dayjs | undefined;
  onChange: ((value: Dayjs | undefined) => void) | undefined;
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void;
  isCurrentMonth: boolean;
  disabledDates?: (day: Dayjs) => boolean;
  disabled: boolean;
  readOnly: boolean;
  allowClear: boolean;
  onClear?: () => void;
  language: ILanguage;
}

export interface IRangePicker {
  inputRef?: Ref<HTMLInputElement>;
  placeholder: string | undefined;
  name: string | undefined;
  value: string[] | Dayjs[] | undefined;
  onChange: ((value: Dayjs[] | undefined) => void) | undefined;
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void;
  disabled: boolean;
  readOnly: boolean;
  allowClear: boolean;
  onClear?: () => void;
  language: ILanguage;
}

export interface IDateValue {
  day: number | null;
  month: number | null;
  year: number | null;
  hour: number | null;
  minute: number | null;
}

export interface ISelect {
  parentId?: string;
  name?: string;
  placeholder?: string;
  options: IOption[];
  defaultValue?: number | string | null;
  value?: number | string | null;
  onChange: (value: number | string | undefined) => void;
}

export interface IOptionComponent {
  layerProps: LayerProps;
  triggerBounds: ClientRect | null;
  options: IOption[];
  onChange: (value: string | number | undefined) => void;
  setSelectValue: React.Dispatch<
    React.SetStateAction<string | number | undefined>
  >;
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IOption {
  value: string | number;
  label: string;
  focus?: boolean;
}
