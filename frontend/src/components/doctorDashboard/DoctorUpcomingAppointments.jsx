// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button } from '../ui/Button';
// import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
// import PatientDetailsModal from '../../pagess/PatientDetailsModal';

// const DoctorUpcomingAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

// //   const fetchAppointments = async () => {
// //     try {
// //       const { data } = await axios.get('/api/doctor/appointments/upcoming');
// //       console.log('Fetched appointments:', data); 
// //       setAppointments(Array.isArray(data) ? data : data.appointments || []);
// //     } catch (error) {
// //       console.error('Error fetching appointments:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
  

// //   useEffect(() => {
// //     fetchAppointments();
// //   }, []);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Upcoming Appointments</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : appointments.length === 0 ? (
//           <p>No upcoming appointments.</p>
//         ) : (
//           appointments.map((appt) => (
//             <div key={appt._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg">
//               <div>
//                 <p className="font-medium">{appt.patientName}</p>
//                 <p className="text-sm text-gray-600">
//                   {new Date(appt.date).toLocaleString()} | {appt.reason}
//                 </p>
//               </div>
//               <div className="mt-2 sm:mt-0 flex gap-2">
//                 <PatientDetailsModal patient={appt.patient} />
//                 <Button size="sm" variant="default">Accept</Button>
//                 <Button size="sm" variant="destructive">Reject</Button>
//               </div>
//             </div>
//           ))
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default DoctorUpcomingAppointments;





import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Progress } from "../ui/Progress";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const DoctorUpcomingAppointments = () => {
  const totalAppointments = 8;
  const completedAppointments = 3;

  const scheduleCompletion = (completedAppointments / totalAppointments) * 100;

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const upcomingAppointments = [
    {
      id: "apt1",
      patientName: "John Doe",
      age: 35,
      gender: "male",
      date: new Date("2025-05-01T14:30:00"),
      type: "video",
      status: "scheduled",
      avatar: "/placeholder.svg",
    },
    {
      id: "apt2",
      patientName: "Emily Johnson",
      age: 42,
      gender: "female",
      date: new Date("2025-05-01T15:30:00"),
      type: "in-person",
      status: "scheduled",
      avatar: "/placeholder.svg",
    },
    {
      id: "apt3",
      patientName: "David Williams",
      age: 28,
      gender: "male",
      date: new Date("2025-05-01T16:30:00"),
      type: "video",
      status: "scheduled",
      avatar: "/placeholder.svg",
    },
  ];

  return (
    <main className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>
              Today's Schedule -{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </CardTitle>
            <Badge variant="secondary">
              {completedAppointments}/{totalAppointments} Completed
            </Badge>
          </div>
          <div className="pt-2">
            <Progress value={scheduleCompletion} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center space-x-4 rounded-md border p-4"
              >
                <Avatar>
                  <AvatarImage src={appointment.avatar} />
                  <AvatarFallback>
                    {appointment.patientName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="font-medium leading-none">
                    {appointment.patientName}
                  </p>
                  <p className="text-sm text-muted-foreground text-gray-500">
                    {appointment.age} years, {appointment.gender}
                  </p>
                  <div className="flex items-center pt-2">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground text-gray-500" />
                    <span className="text-xs text-muted-foreground text-gray-500">
                      {formatTime(appointment.date)}
                    </span>
                    <Badge className="ml-2" variant="outline">
                      {appointment.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2 ">
                  <Button
                    size="sm"
                    className="bg-medical-green text-white hover:bg-[rgba(16,185,129,1)]"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-medical-red text-medical-red hover:bg-medical-red/10"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-gray-200 text-black hover:bg-medical-sky hover:text-white">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default DoctorUpcomingAppointments;
