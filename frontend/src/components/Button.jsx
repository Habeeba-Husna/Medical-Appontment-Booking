import React from 'react';

const Button = ({ label, onClick, type = 'button', loading }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
    >
      {loading ? 'Loading...' : label}
    </button>
  );
};

export default Button;