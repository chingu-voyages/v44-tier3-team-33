import { type BookConditionEnum, type BookGenreEnum } from "@/types/post.types";
import {
  MultiSelectBox,
  MultiSelectBoxItem,
  SelectBox,
  SelectBoxItem,
} from "@tremor/react";
import { type HTMLInputTypeAttribute, useState } from "react";
import type {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";
import { Controller } from "react-hook-form";

export const FromInput: React.FC<{
  name: string;
  label: string;
  register: UseFormRegisterReturn<string>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
}> = ({ name, label, register, error, type, placeholder }) => {
  return (
    <div className="flex w-full flex-col">
      <label className="text-gray-700" htmlFor={name}>
        {label}:
      </label>
      <p className=" text-xs text-red-500">{error ? String(error) : ""}</p>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className=" rounded-md border border-gray-500 p-1 outline-none "
        {...register}
      />
    </div>
  );
};

export const FromTextArea: React.FC<{
  name: string;
  label: string;
  register: UseFormRegisterReturn<string>;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  placeholder?: string;
}> = ({ name, register, error, placeholder, label }) => {
  return (
    <div className="flex w-full flex-col">
      <label className="text-gray-700" htmlFor={name}>
        {label}:
      </label>
      <p className=" text-xs text-red-500">{error ? String(error) : ""}</p>
      <textarea
        id={name}
        placeholder={placeholder}
        className=" min-h-[200px] rounded-md border border-gray-500 p-1 outline-none "
        {...register}
      />
    </div>
  );
};

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

  if (multiple) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MultiSelectBox {...field}
          onValueChange={(value) => {
            field.onChange(value);
          }}
          >
            {values.map((value) => (
              <MultiSelectBoxItem key={value} text={value} value={value} />
            ))}
          </MultiSelectBox>
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectBox
          {...field}
          onValueChange={(value) => {
            field.onChange(value);
          }}
        >
          {values.map((value) => (
            <SelectBoxItem key={value} text={value} value={value} />
          ))}
        </SelectBox>
      )}
    />
  );
};

export const PrimaryButton: React.FC<{
  label: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}> = ({ className, type, label, onClick, disabled }) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      type={type ? type : "button"}
      className={`w-full rounded-full border border-gray-500 px-3 py-2 text-black transition-colors duration-500 hover:bg-gray-900 ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export const Spinner = () => {
  return (
    <svg
      className="ut-animate-spin h-5 w-5 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 576 512"
    >
      <path
        fill="currentColor"
        d="M256 32C256 14.33 270.3 0 288 0C429.4 0 544 114.6 544 256C544 302.6 531.5 346.4 509.7 384C500.9 399.3 481.3 404.6 465.1 395.7C450.7 386.9 445.5 367.3 454.3 351.1C470.6 323.8 480 291 480 255.1C480 149.1 394 63.1 288 63.1C270.3 63.1 256 49.67 256 31.1V32z"
      />
    </svg>
  );
};
