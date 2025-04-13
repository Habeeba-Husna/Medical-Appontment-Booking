import React from 'react';

const TextAreaField = ({ label, name, value, onChange, editable }) => (
  <div className="flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      disabled={!editable}
      rows={3}
      className={`border rounded-md px-3 py-2 resize-none ${
        editable ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'
      }`}
    />
  </div>
);

export default TextAreaField;
