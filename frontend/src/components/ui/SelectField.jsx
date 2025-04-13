import React from 'react';

const SelectField = ({ label, name, value, onChange, options, editable }) => (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={!editable}
        className={`border rounded-md px-3 py-2 ${
          editable ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
        }`}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
  export default SelectField;  