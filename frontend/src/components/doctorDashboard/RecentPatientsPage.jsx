// import React, { useEffect, useState } from 'react';
// import { Bell } from 'lucide-react';
// import axios from 'axios';
// import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchNotifications = async () => {
//     try {
//       const { data } = await axios.get('/api/doctor/notifications');
//       setNotifications(Array.isArray(data) ? data : data.notifications || []);

//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Bell className="w-5 h-5 text-medical-secondary" />
//           Notifications
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : notifications.length === 0 ? (
//           <p>No notifications available.</p>
//         ) : (
//           notifications.map((note) => (
//             <div key={note._id} className="p-3 bg-medical-light rounded-md">
//               <p className="font-medium text-medical-secondary">{note.type}</p>
//               <p className="text-sm text-gray-600">{note.message}</p>
//             </div>
//           ))
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default Notifications;





import React from 'react';
import { Button } from "../ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { ChevronRight } from 'lucide-react';


// Sample patient data
const recentPatients = [
  {
    id: 'pat1',
    name: 'Sarah Adams',
    age: 29,
    gender: 'female',
    condition: 'Diabetes',
    lastVisit: new Date('2025-04-10'),
    avatar: '/placeholder.svg',
  },
  {
    id: 'pat2',
    name: 'Michael Brown',
    age: 40,
    gender: 'male',
    condition: 'Hypertension',
    lastVisit: new Date('2025-04-08'),
    avatar: '/placeholder.svg',
  },
];

// Format date function
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const RecentPatientsPage = () => {
  return (
    <Card className="shadow-sm">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Recent Patients</CardTitle>
      <Button size="sm" variant="outline" className="bg-gray-200 text-black hover:bg-medical-sky hover:text-white">View All</Button>
    </div>
    <CardDescription className="text-gray-400">Your recently treated patients</CardDescription>
  </CardHeader>
  <CardContent>
    {recentPatients.map((patient) => (
      <div
        key={patient.id}
        className="mb-4 flex items-center justify-between rounded-md border p-4 hover:bg-gray-50 transition"
      >
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={patient.avatar} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="font-medium leading-none">{patient.name}</p>
                <p className="text-sm text-muted-foreground text-gray-400">{patient.age} years, {patient.gender}</p>
                <div className="flex items-center pt-1">
                  <Badge variant="outline">{patient.condition}</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-xs text-muted-foreground mr-2 text-gray-400">
                {formatDate(patient.lastVisit)}
              </div>
              <Button size="icon" variant="ghost" className="bg-gray-200 text-black hover:bg-medical-sky hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentPatientsPage;
