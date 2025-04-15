import React from "react";

export default function UserPostLoader() {
  return (
    <div className="border dark:border-gray-700 lg:w-[70%] w-full overflow-y-auto h-[85vh] p-4 shadow-md dark:shadow-gray-800 grid lg:grid-cols-3 grid-cols-1 gap-4 lg:mt-4 rounded mt-16">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="border dark:border-gray-700 w-full p-2 h-[300px] rounded-xl shadow-lg dark:shadow-gray-800 animate-pulse bg-white dark:bg-gray-900"
        >
          <div className="h-[250px] w-full bg-gray-100 dark:bg-gray-700 rounded"></div>
          <div className="flex items-center mt-1 h-[30px] justify-between">
            <h3 className="font-bold bg-gray-300 dark:bg-gray-600 w-1/2 h-full rounded"></h3>
            <div className="flex gap-2">
              <div className="cursor-pointer text-primaryColor bg-gray-300 dark:bg-gray-600 w-6 h-6 rounded"></div>
              <div className="cursor-pointer text-primaryColor hover:text-red-500 bg-gray-300 dark:bg-gray-600 w-6 h-6 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
