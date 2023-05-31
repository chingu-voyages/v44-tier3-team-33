"use client";

import { type BookConditionEnum, type BookGenreEnum } from "@/types/post.types";
import {
  MultiSelectBox,
  MultiSelectBoxItem,
  SelectBox,
  SelectBoxItem,
} from "@tremor/react";
import { useState } from "react";
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { Controller } from "react-hook-form";

export const FromSelect: React.FC<{
  values: string[] | typeof BookConditionEnum | typeof BookGenreEnum;
  name: string;
  label: string;
  control: Control<any, any>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  multiple: boolean;
}> = ({ name, label, error, values, multiple, control }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  return (
    <div className="text-lg">
      <label className="text-gray-700" htmlFor={name}>
        {label}:
      </label>
      <div className="flex w-full flex-wrap gap-2 text-sm ">
        {selectedValues.map((value) => (
          <span key={value} className=" bg-gray-300 p-1">
            {value}
          </span>
        ))}
      </div>
      <p className=" text-sm font-bold text-red-500">
        {error ? String(error) : ""}
      </p>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          multiple ? (
            <MultiSelectBox
              id={name}
              placeholder={label}
              {...field}
              onValueChange={(value) => {
                setSelectedValues(value);
                field.onChange(value);
              }}
            >
              {values.map((value) => (
                <MultiSelectBoxItem key={value} text={value} value={value} />
              ))}
            </MultiSelectBox>
          ) : (
            <SelectBox
              id={name}
              placeholder={label}
              {...field}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              {values.map((value) => (
                <SelectBoxItem key={value} text={value} value={value} />
              ))}
            </SelectBox>
          )
        }
      />
    </div>
  );
};


export const FormSelectM:React.FC<{}>=()=>{
  return <select multiple >
    <option value="1">1</option>
    <option value="2">2</option>
  </select>
}
