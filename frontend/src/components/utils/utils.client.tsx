"use client";

import { type BookConditionEnum, type BookGenreEnum } from "@/types/post.types";

import { useState } from "react";
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";

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
            <Select
              isMulti={multiple}
              options={values.map((item) => ({ value: item, label: item }))}
              className="w-full"
              onChange={(newValues) => {
                field.onChange(newValues.map((value) => value.value));
              }}
            />
          ) : (
            <Select
              isMulti={multiple}
              options={values.map((item) => ({ value: item, label: item }))}
              className="w-full"
              onChange={(value) => {
                field.onChange(value?.value);
              }}
            />
          )
        }
      />
    </div>
  );
};
