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
    <div className="flex w-full flex-col text-lg">
      <label className="text-gray-700" htmlFor={name}>
        {label}:
      </label>
      <p className=" text-sm font-bold text-red-500 ">
        {error ? String(error) : ""}
      </p>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className=" rounded-md border border-gray-300 p-2 outline-none "
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
    <div className="flex w-full flex-col text-lg">
      <label className="text-gray-700" htmlFor={name}>
        {label}:
      </label>
      <p className=" text-sm font-bold text-red-500">
        {error ? String(error) : ""}
      </p>
      <textarea
        id={name}
        placeholder={placeholder}
        className=" min-h-[200px] rounded-md border border-gray-300 p-2 outline-none "
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
  disabled?: boolean;
  isLoading?: boolean;
}> = ({ className, type, label, onClick, disabled, isLoading }) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      type={type ? type : "button"}
      className={`w-full rounded-full flex items-center justify-center border border-gray-500 bg-white px-3 py-2 text-slate-600 transition-colors duration-500 hover:bg-slate-950 hover:text-white ${className}`}
      disabled={disabled}
    >
      {isLoading? <Spinner /> : label}
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
