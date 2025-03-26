import React from "react";

import "./assets/css/button.css";

function Button({ previousDate, nextDate }) {
  return (
    <div className="flex flex-row">
      <button onClick={previousDate} className="cursor-pointer w-[200px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-[#FF3C38] focus:ring-4 focus:ring-[#FF3C38] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Précédent
      </button>
      <button onClick={nextDate} className="cursor-pointer w-[200px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-[#FF3C38] focus:ring-4 focus:ring-[#FF3C38] font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Suivant</button>
    </div>
  );
}

export default Button;
