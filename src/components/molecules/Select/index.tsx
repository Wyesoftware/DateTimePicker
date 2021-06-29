import React, { useEffect, useState } from "react";
import { useLayer } from "react-laag";
import { ISelect, IOption } from "../../../types";
import { arrowClose } from "../../atoms/icons";
import { Options } from "./Options";

export const Select = ({
  name,
  placeholder,
  options,
  defaultValue,
  value,
  onChange,
}: ISelect) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectValue, setSelectValue] =
    useState<string | number | undefined>(undefined);

  useEffect(() => {
    setSelectValue(value ? value : undefined);
  }, [value]);

  const { triggerProps, layerProps, renderLayer, triggerBounds } = useLayer({
    container: "wyesoftware-datetimepicker",
    isOpen: isSelectOpen,
    onOutsideClick: () => setIsSelectOpen(false),
    onParentClose: () => setIsSelectOpen(false),
    placement: "bottom-start",
    overflowContainer: false,
    possiblePlacements: ["top-start"],
  });

  return (
    <div id="select-container">
      <div
        className="flex flex-row justify-between items-center border-1 border-[#e5e7eb] rounded-sm p-1 cursor-pointer focus-within:border-[#90caf9]"
        onClick={() => {
          if (isSelectOpen) {
            setIsSelectOpen(false);
          } else {
            if (options.length > 0) {
              setIsSelectOpen(true);
              selectRef.current?.focus();
            }
          }
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setIsSelectOpen(false);
          }
        }}
        {...triggerProps}
      >
        <select
          className="bg-transparent w-full p-2 text-1.5 outline-none border-0 cursor-pointer appearance-none"
          ref={selectRef}
          name={name}
          value={selectValue}
          defaultValue={
            defaultValue
              ? defaultValue
              : placeholder
              ? "placeholder"
              : undefined
          }
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => {
            onChange(e.currentTarget.value);
            setSelectValue(e.currentTarget.value);
            setIsSelectOpen(false);
          }}
        >
          <option hidden={isSelectOpen} value="placeholder" disabled>
            {placeholder}
          </option>
          {options.map((option: IOption, i: number) => (
            <option key={i} hidden={isSelectOpen} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <img
          src={arrowClose}
          alt="datetimeselect"
          style={{ width: "1.5rem" }}
        />
      </div>
      {renderLayer(
        isSelectOpen && (
          <Options
            layerProps={layerProps}
            triggerBounds={triggerBounds}
            options={options}
            onChange={onChange}
            setSelectValue={setSelectValue}
            setIsSelectOpen={setIsSelectOpen}
          />
        )
      )}
    </div>
  );
};
