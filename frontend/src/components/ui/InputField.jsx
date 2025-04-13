import React from 'react';

const InputField = ({ label, name, value, onChange, editable }) => (
    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={!editable}
        className={`border rounded-md px-3 py-2 ${
          editable ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
        }`}
      />
    </div>
  );
  export default InputField; 