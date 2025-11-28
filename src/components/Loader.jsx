import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-blue-500/20 flex justify-center items-center z-50">
      <div className="w-20 h-20 border-4 border-blue-300/40 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
