import React, { useEffect } from "react";
import { IOption, IOptionComponent } from "../../../types";

export const Options = ({
  layerProps,
  triggerBounds,
  options,
  onChange,
  setSelectValue,
  setIsSelectOpen,
}: IOptionComponent) => {
  useEffect(() => {
    let item = document.getElementById("focus");
    item?.scrollIntoView();
  }, []);

  return (
    <div id="select-container">
      <div
        className="max-h-60 bg-white flex flex-col justify-start items-start overflow-y-auto z-61"
        {...layerProps}
        style={{
          boxShadow: "0px 4px 14px rgba(96, 79, 112, 0.05)",
          minWidth: triggerBounds!.width,
          ...layerProps.style,
        }}
      >
        {options.map((option: IOption, i: number) => (
          <div
            key={i}
            id={option.focus ? "focus" : undefined}
            className="w-full py-2 cursor-pointer hover:bg-[#eee]"
            data-value={option.value}
            onClick={() => {
              onChange(option.value);
              setSelectValue(option.value);
              setIsSelectOpen(false);
            }}
          >
            <span className="px-4">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
