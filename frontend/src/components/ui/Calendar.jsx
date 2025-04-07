
// import React from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// function Calendar({ className, showOutsideDays = true, ...props }) {
//   return (
//     <DayPicker
//       showOutsideDays={showOutsideDays}
//       className={`p-3 ${className}`}
//       classNames={{
//         months:
//           "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
//         month: "space-y-4",
//         // Flex container with arrows and label all in one line
//         caption:
//           "flex items-center justify-between px-4 py-2 border rounded-md bg-gray-100",
//         caption_label:
//           "text-sm font-medium text-center flex-1", // Centered month/year
//         nav: "flex items-center justify-between w-full",
//         nav_button:
//           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md",
//         nav_button_previous: "", // No need for absolute
//         nav_button_next: "",
//         table: "w-full border-collapse space-y-1",
//         head_row: "flex",
//         head_cell:
//           "text-gray-600 rounded-md w-9 font-normal text-[0.8rem] text-center",
//         row: "flex w-full mt-2",
//         cell: "h-9 w-9 text-center text-sm p-0 relative",
//         day: "h-9 w-9 p-0 font-normal hover:bg-gray-200 rounded-full",
//         day_selected:
//           "bg-blue-500 text-white font-semibold hover:bg-blue-600",
//         day_today: "bg-gray-300 text-black font-semibold",
//         day_outside: "text-gray-400",
//         day_disabled: "text-gray-300 cursor-not-allowed",
//         day_range_middle: "bg-blue-100 text-blue-600",
//         day_hidden: "invisible",
//       }}
//       components={{
//         IconLeft: () => <ChevronLeft className="h-4 w-4 text-gray-600" />,
//         IconRight: () => <ChevronRight className="h-4 w-4 text-gray-600" />,
//       }}
//       {...props}
//     />
//   );
// }

// export default Calendar;


import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function Calendar({ className, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={`p-3 ${className}`}
      classNames={{
        months:
          "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption:
          "flex items-center justify-between px-4 py-2 border rounded-md bg-gray-100",
        caption_label: "text-sm font-medium text-center flex-1",
        nav: "flex items-center justify-between w-full",
        nav_button:
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border rounded-md",
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-gray-600 rounded-md w-9 font-normal text-[0.8rem] text-center",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: "h-9 w-9 p-0 font-normal hover:bg-green-200 rounded-full", // <-- light green hover
        day_selected:
          "bg-green-400 text-white font-semibold hover:bg-green-500", // <-- light green when selected
        day_today: "bg-gray-300 text-black font-semibold",
        day_outside: "text-gray-400",
        day_disabled: "text-gray-300 cursor-not-allowed",
        day_range_middle: "bg-blue-100 text-blue-600",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4 text-gray-600" />,
        IconRight: () => <ChevronRight className="h-4 w-4 text-gray-600" />,
      }}
      {...props}
    />
  );
}

export default Calendar;

