import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomFileInputFieldProps {
  id: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  iconPath?: string;
  defaultValue?: string;
  isSingle?: boolean;
}

const CustomFileInputField: React.FC<CustomFileInputFieldProps> = ({
  id,
  placeholder,
  register,
  error,
  iconPath,
  defaultValue,
  isSingle = true,
}) => {
  return (
    <div className="relative mb-4">
      <input
        type="file"
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full px-10 py-2 rounded-md text-black dark:text-white outline-none transition 
          border 
          ${error ? "border-red-600" : "border-gray-300 dark:border-gray-600"} 
          bg-white dark:bg-gray-800 
          focus:border-blue-500 focus:ring focus:ring-blue-300`}
        {...register}
        multiple={!isSingle} // Enable multiple attribute if isSingle is false
      />
      {iconPath && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={25}
          height={25}
          viewBox="0 0 24 24"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white"
        >
          <path fill="#737373" d={iconPath}></path>
        </svg>
      )}
      {error && (
        <p className="text-red-600 text-[13px] mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default CustomFileInputField;
