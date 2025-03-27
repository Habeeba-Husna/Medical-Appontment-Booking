import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default InputField;
  