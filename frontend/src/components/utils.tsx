import { type HTMLInputTypeAttribute } from "react";
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";

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
      <p className=" text-xs">{error ? String(error) : ""}</p>
      <input
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
        placeholder={placeholder}
        className=" min-h-[200px] rounded-md border border-gray-500 p-1 outline-none "
        {...register}
      />
    </div>
  );
};

export const PrimaryButton: React.FC<{
  label: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ className, type, label, onClick }) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      type={type ? type : "button"}
      className={`w-full rounded-full border border-gray-500 px-3 py-2 text-white transition-colors duration-500 hover:bg-gray-900 ${className}`}
    >
      {label}
    </button>
  );
};
