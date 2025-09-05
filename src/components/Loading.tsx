import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10">
      <div className="flex space-x-2">
        <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500" />
        <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500 delay-150" />
        <div className="w-4 h-4 rounded-full animate-bounce bg-blue-500 delay-300" />
      </div>
    </div>
  );
};

export default Loading;
