import React from 'react';
import { FieldError } from 'react-hook-form'; // Import FieldError from react-hook-form

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  error?: FieldError;  // Use FieldError type from react-hook-form
  [rest: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, error, ...rest }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md mt-1"
        {...rest}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default InputField;
