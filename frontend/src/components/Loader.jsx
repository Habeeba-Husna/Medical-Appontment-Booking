import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;