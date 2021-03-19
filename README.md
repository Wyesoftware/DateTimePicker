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

This component requires date package as like day.js/moment.js in order to recieve the right locale.

```jsx
import DateTimePicker from "@wyesoftware/datetimepicker";
import locale from "dayjs/locale/*your language*";

const App = () => {
  return <DateTimePicker name="something" lang={locale} />;
};
```

### TypeScript

This component has full typescript support.

## Available props

| Property      | Description                                      | Type                               | Default | Required |
| ------------- | ------------------------------------------------ | ---------------------------------- | ------- | -------- |
| mode          | DateTimeInput mode                               | "date" / "time" / "datetime"       | "date"  | false    |
| ref           | Input ref                                        | RefObject                          | -       | false    |
| name          | Form name                                        | string                             | -       | true     |
| value         | The input content value                          | string / Dayjs / undefined         | -       | false    |
| defaultValue  | The initial input date                           | Dayjs                              | dayjs() | false    |
| disabled      | Whether the input is disabled                    | boolean                            | false   | false    |
| readonly      | Whether the input is readOnly                    | boolean                            | false   | false    |
| allowClear    | If allow to remove input content with clear icon | boolean                            | false   | false    |
| onBlur        | Callback when user remove focus                  | () => void                         | -       | false    |
| onChange      | Callback when user input                         | (value: Dayjs / undefined) => void | -       | false    |
| disabledDates | Specify the date that cannot be selected         | (day: Dayjs) => boolean            | -       | false    |
| style         | The style of input                               | CSSProperties                      | -       | false    |
| rtl           | Right-to-left direction of component             | boolean                            | false   | false    |
| lang          | Date package locale                              | Dayjs.Locale                       | -       | true     |
| width         | Width of main container                          | string                             | "100%"  | false    |

## Future updates

Mode "Range" will be available soon.
