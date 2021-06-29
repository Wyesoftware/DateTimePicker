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

| Property       | Description                                                          | Type                                   | Default    | Required |
| -------------- | -------------------------------------------------------------------- | -------------------------------------- | ---------- | -------- |
| mode           | DateTimeInput mode                                                   | "date" / "datetime" / "time" / "range" | "datetime" | false    |
| placeholder    | Custom input placeholder                                             | string                                 | -          | false    |
| name           | Form name                                                            | string                                 | -          | false    |
| value          | The input content value                                              | string / Dayjs / undefined             | -          | false    |
| rangeValue     | The input content value (for range mode)                             | string[] / Dayjs[] / undefined         | -          | false    |
| onChange       | Callback when user input                                             | (value: Dayjs / undefined) => void     | -          | false    |
| onChangeRange  | Callback when user input (for range mode)                            | (value: Dayjs[] / undefined) => void   | -          | false    |
| isCurrentMonth | Calendar set current month and year on load                          | boolean                                | true       | false    |
| disabledDates  | Specify the date that cannot be selected                             | (day: Dayjs) => boolean                | -          | false    |
| dir            | Direction of the component                                           | "ltr" / "rtl"                          | "ltr"      | false    |
| dirFromElement | Set component direction from outside element                         | "html" / "body" / string (for id)      | -          | false    |
| language       | Choose language (english, hebrew, russian - available) or set custom | "en" / "he" / "ru" / custom            | "en"       | false    |
| className      | Set classes for main container                                       | string                                 | -          | false    |

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

As soon as possible we will add more props
