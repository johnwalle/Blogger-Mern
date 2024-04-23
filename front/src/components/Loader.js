import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-52 ">
      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loader;