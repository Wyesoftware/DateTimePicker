[![✅ testing](https://github.com/Wyesoftware/DateTimePicker/actions/workflows/main.yml/badge.svg)](https://github.com/Wyesoftware/DateTimePicker/actions/workflows/main.yml)

# DateTimePicker

DateTimePicker Component for React.JS/React.TS

## Install package

```bash
npm i @wyesoftware/datetimepicker
```

```bash
yarn add @wyesoftware/datetimepicker
```

## Usage

```jsx
import DateTimePicker from "@wyesoftware/datetimepicker";

const App = () => {
  return <DateTimePicker />;
};
```

### TypeScript

This component has full typescript support.

## Available props

| Property       | Description                                                          | Type                                            | Default    | Required |
| -------------- | -------------------------------------------------------------------- | ----------------------------------------------- | ---------- | -------- |
| dir            | Direction of the component                                           | "ltr" / "rtl"                                   | "ltr"      | false    |
| dirFromElement | Set component direction from outside element                         | "html" / "body" / string (for id)               | -          | false    |
| inputRef       | Ref for input                                                        | Ref<HTMLInputElement>                           | -          | false    |
| name           | Form name                                                            | string                                          | -          | false    |
| value          | The input content value                                              | string / Dayjs / string[] / Dayjs[] / undefined | -          | false    |
| placeholder    | Custom input placeholder                                             | string                                          | -          | false    |
| onChange       | Callback when user input                                             | (value: Dayjs / Dayjs[] / undefined) => void    | -          | false    |
| onBlur         | Callback when user click outside                                     | (e?: FocusEvent<HTMLInputElement>) => void      | -          | false    |
| mode           | DateTimeInput mode                                                   | "date" / "datetime" / "time" / "range"          | "datetime" | false    |
| isCurrentMonth | Calendar set current month and year on load                          | boolean                                         | true       | false    |
| disabledDates  | Specify the date that cannot be selected                             | (day: Dayjs) => boolean                         | -          | false    |
| language       | Choose language (english, hebrew, russian - available) or set custom | "en" / "he" / "ru" / custom                     | "en"       | false    |
| disabled       | Set input disabled mode                                              | boolean                                         | false      | false    |
| readOnly       | Set input readOnly mode                                              | boolean                                         | false      | false    |
| allowClear     | Show clear input button                                              | boolean                                         | false      | false    |
| onClear        | Callback when user clear input                                       | () => void                                      | -          | false    |
| className      | Set classes for main container                                       | string                                          | -          | false    |

### Custom language object example

```jsx
dayjs: {
  locale: langLocale;
  startWeek: "monday";
}
buttons: {
  today: "string";
  time: "string";
}
labels: {
  time: "string";
}
placeholders: {
  year: "string";
  month: "string";
}
```

## Future updates

More features....
