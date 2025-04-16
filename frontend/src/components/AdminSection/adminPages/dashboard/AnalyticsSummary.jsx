// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "../../../ui/Card";
// import { Button } from "../../../ui/Button";
// import { ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";

// const AnalyticsSummary = () => {
//   return (
//     <div className="space-y-6">
//       {/* <h1 className="text-2xl font-semibold mb-6 text-gray-800">Analytics Dashboard</h1> */}

//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
//         {/* Analytics Summary */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Analytics Summary</CardTitle>
//             <CardDescription>Platform performance</CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {/* User Growth */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">User Growth</span>
//                 <div className="flex items-center text-medical-green text-sm">
//                   <ArrowUpRight className="mr-1 h-4 w-4" />
//                   <span>23%</span>
//                 </div>
//               </div>
//               <div className="h-2 bg-secondary rounded-full overflow-hidden">
//                 <div className="h-full bg-primary" style={{ width: "72%" }}></div>
//               </div>
//             </div>

//             {/* Appointment Rate */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">Appointment Rate</span>
//                 <div className="flex items-center text-medical-green text-sm">
//                   <ArrowUpRight className="mr-1 h-4 w-4" />
//                   <span>18%</span>
//                 </div>
//               </div>
//               <div className="h-2 bg-secondary rounded-full overflow-hidden">
//                 <div className="h-full bg-primary" style={{ width: "65%" }}></div>
//               </div>
//             </div>

//             {/* Cancellation Rate */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">Cancellation Rate</span>
//                 <div className="flex items-center text-medical-red text-sm">
//                   <ArrowDownRight className="mr-1 h-4 w-4" />
//                  <span>5%</span>
//                 </div>
//               </div>
//               <div className="h-2 bg-secondary rounded-full overflow-hidden">
//                 <div className="h-full bg-destructive" style={{ width: "12%" }}></div>
//               </div>
//             </div>

//             {/* Doctor Activity */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm font-medium">Doctor Activity</span>
//                 <div className="flex items-center text-medical-green text-sm">
//                   <ArrowUpRight className="mr-1 h-4 w-4" />
//                   <span>15%</span>
//                 </div>
//               </div>
//               <div className="h-2 bg-secondary rounded-full overflow-hidden">
//                 <div className="h-full bg-primary" style={{ width: "58%" }}></div>
//               </div>
//             </div>
//           </CardContent>

//           <CardFooter>
//             <Button variant="outline" className="w-full flex items-center gap-2">
//               <BarChart3 className="h-4 w-4" />
//               <span>View Full Analytics</span>
//             </Button>
//           </CardFooter>
//         </Card>
//       {/* </div> */}
//     </div>
//   );
// };

// export default AnalyticsSummary;



import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../ui/Card";
import { Button } from "../../../ui/Button";
import { ArrowUpRight, ArrowDownRight, BarChart3 } from "lucide-react";

const AnalyticsSummary = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <CardHeader className="pb-2 sm:pb-1">
        <CardTitle className="text-lg sm:text-xl">Analytics Summary</CardTitle>
        <CardDescription className="text-sm sm:text-base text-gray-500">
          Platform performance
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 pb-3">
        {/* User Growth */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">User Growth</span>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              <span>23%</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: "72%" }}></div>
          </div>
        </div>

        {/* Appointment Rate */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Appointment Rate</span>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              <span>18%</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: "65%" }}></div>
          </div>
        </div>

        {/* Cancellation Rate */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Cancellation Rate</span>
            <div className="flex items-center text-red-500 text-sm">
              <ArrowDownRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              <span>5%</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: "12%" }}></div>
          </div>
        </div>

        {/* Doctor Activity */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Doctor Activity</span>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              <span>15%</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: "58%" }}></div>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>View Full Analytics</span>
        </Button>
      </CardFooter>
    </div>
  );
};

export default AnalyticsSummary;