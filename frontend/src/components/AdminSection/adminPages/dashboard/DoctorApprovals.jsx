// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "../../../ui/Card";
// import { Avatar, AvatarImage, AvatarFallback } from "../../../ui/Avatar";
// import { Badge } from "../../../ui/Badge";
// import { Button } from "../../../ui/Button";

// // Sample formatDate function
// const formatDate = (date) => {
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };

// // Pending Approvals Data
// const pendingApprovals = [
//   {
//     id: "doc1",
//     name: "Dr. Alex Johnson",
//     email: "alex.johnson@example.com",
//     specialization: "Neurologist",
//     experience: 12,
//     submittedAt: new Date("2025-04-25"),
//     avatar: "/placeholder.svg",
//   },
//   {
//     id: "doc2",
//     name: "Dr. Maria Garcia",
//     email: "maria.garcia@example.com",
//     specialization: "Pediatrician",
//     experience: 8,
//     submittedAt: new Date("2025-04-22"),
//     avatar: "/placeholder.svg",
//   },
// ];

// const DoctorApprovals = () => {
//   return (
//     <div className="space-y-6">
      
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle>Pending Doctor Approvals</CardTitle>
//               <Badge variant="secondary">{pendingApprovals.length} pending</Badge>
//             </div>
//             <CardDescription>Doctor registrations awaiting approval</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <div className="space-y-4">
//               {pendingApprovals.map((doctor) => (
//                 <div
//                   key={doctor.id}
//                   className="flex items-center justify-between rounded-md border p-4"
//                 >
//                   <div className="flex items-center space-x-4">
//                     <Avatar>
//                       <AvatarImage src={doctor.avatar} />
//                       <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
//                     </Avatar>
//                     <div className="space-y-1">
//                       <p className="font-medium leading-none">{doctor.name}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {doctor.specialization}
//                       </p>
//                       <div className="flex items-center text-xs text-muted-foreground">
//                         <span>{doctor.experience} years experience</span>
//                         <span className="mx-2">•</span>
//                         <span>
//                           Submitted on {formatDate(doctor.submittedAt)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center space-x-2">
//                     <Button size="sm" variant="outline">
//                       View Details
//                     </Button>
//                     <Button
//                       size="sm"
//                       className="bg-medical-green hover:bg-medical-green/90"
//                     >
//                       Approve
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="border-medical-red text-medical-red hover:bg-medical-red/10"
//                     >
//                       Reject
//                     </Button>
//                   </div>
//                 </div>
//               ))}

//               {pendingApprovals.length === 0 && (
//                 <div className="text-center py-6 text-muted-foreground">
//                   No pending approvals
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     // </div>
//   );
// };

// export default DoctorApprovals;



import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../../../ui/Avatar";
import { Badge } from "../../../ui/Badge";
import { Button } from "../../../ui/Button";

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const pendingApprovals = [
  {
    id: "doc1",
    name: "Dr. Alex Johnson",
    email: "alex.johnson@example.com",
    specialization: "Neurologist",
    experience: 12,
    submittedAt: new Date("2025-04-25"),
    avatar: "/placeholder.svg",
  },
  {
    id: "doc2",
    name: "Dr. Maria Garcia",
    email: "maria.garcia@example.com",
    specialization: "Pediatrician",
    experience: 8,
    submittedAt: new Date("2025-04-22"),
    avatar: "/placeholder.svg",
  },
];

const DoctorApprovals = () => {
  return (
    <div className="space-y-2 sm:space-y-3">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg sm:text-xl">Pending Doctor Approvals</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-400">
              Doctor registrations awaiting approval
            </CardDescription>
          </div>
          <Badge variant="secondary">{pendingApprovals.length} pending</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-1 pb-2 sm:pt-1 sm:pb-2">
        <div className="space-y-2 sm:space-y-4">
          {pendingApprovals.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border rounded-md"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                  <AvatarImage src={doctor.avatar} />
                  <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 ">
                  <p className="font-medium leading-none">{doctor.name}</p>
                  <p className="text-sm text-muted-foreground text-gray-400">
                    {doctor.specialization}
                  </p>
                  <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-2 text-gray-400">
                    <span>{doctor.experience} years experience</span>
                    <span>•</span>
                    <span>Submitted on {formatDate(doctor.submittedAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                  View Details
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-600/90 flex-1 sm:flex-none">
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500/10 flex-1 sm:flex-none"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}

          {pendingApprovals.length === 0 && (
            <div className="py-6 text-center text-muted-foreground">
              No pending approvals
            </div>
          )}
        </div>
      </CardContent>
    </div>
  );
};

export default DoctorApprovals;