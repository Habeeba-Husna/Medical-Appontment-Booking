import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, User } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { selectAppointment, cancelAppointment, fetchAppointments } from '../../../store/slices/appointmentSlice';
import { toast } from 'react-toastify';

const UpcomingAppointments = () => {
  const { appointments, loading } = useAppSelector(state => state.appointments);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch appointments if they aren't already loaded
    if (appointments.length === 0) {
      dispatch(fetchAppointments());
    }
  }, [appointments.length, dispatch]); // Fetch appointments only if there are no appointments

  const isToday = (someDate) => {
    const today = new Date();
    const date = new Date(someDate);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const upcomingAppointments = appointments.filter(appointment => {
    const isUpcoming = new Date(appointment.date) > new Date();
    const isValidStatus = !['completed', 'cancelled'].includes(appointment.status?.toLowerCase());
    return isUpcoming && isValidStatus;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleViewDetails = (appointmentId) => {
    dispatch(selectAppointment(appointmentId));
    // navigate(`/appointments/${appointmentId}`);
    navigate("/appointments");
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await dispatch(cancelAppointment(appointmentId)).unwrap();
      toast.success("Appointment cancelled successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to cancel appointment");
    }
  };

  if (upcomingAppointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>You have no upcoming appointments</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="mb-4 text-gray-500">No appointments scheduled yet.</p>
          <Button onClick={() => navigate('/doctors')} className="bg-medical-primary hover:bg-medical-secondary">
            Book an Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>Your scheduled appointments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingAppointments.map((appointment, index) => (
          <div key={appointment._id || index}
            className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex-1 mb-3 sm:mb-0">
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 mr-2 text-medical-secondary" />
                <h4 className="font-medium text-medical-secondary">{appointment.doctorName}</h4>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>{appointment.time}</span>
              </div>
              <div className="mt-2">
                <Badge variant={appointment.status === 'confirmed' ? 'default' : 'outline'}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-medical-secondary border-medical-secondary hover:bg-medical-light"
                onClick={() => handleViewDetails(appointment._id)}
              >
                Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-500 hover:bg-red-50"
                disabled={loading}
                onClick={() => handleCancelAppointment(appointment._id)}
              >
                {loading ? 'Cancelling...' : 'Cancel'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate('/appointments')} variant="outline" className="w-full">
          View All Appointments
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingAppointments;




// import React,{ useEffect } from 'react';
// import { isToday } from 'date-fns';
// import { useNavigate } from 'react-router-dom';
// import { CalendarDays, Clock, User } from 'lucide-react';
// import { Button } from '../../ui/Button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../ui/Card';
// import { Badge } from '../../ui/Badge';
// import { useAppSelector, useAppDispatch } from '../../../hooks';
// import { selectAppointment, cancelAppointment ,fetchAppointments} from '../../../store/slices/appointmentSlice';
// import { toast } from 'react-toastify';

// const UpcomingAppointments = () => {
//   console.log("Appointments:", upcomingAppointments);
//   const { appointments, loading } = useAppSelector(state => state.appointments);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(fetchAppointments());
//   }, [dispatch]);

//   const isToday = (someDate) => {
//     const today = new Date();
//     const date = new Date(someDate);
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const upcomingAppointments = appointments.filter(appointment => {
//     const isUpcoming = new Date(appointment.date) > new Date();
//     const isValidStatus = !['completed', 'cancelled'].includes(appointment.status?.toLowerCase());
//     return isUpcoming && isValidStatus;
//   });

//   const formatDate = (dateString) => {
//     const options = { weekday: 'short', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const handleViewDetails = (appointmentId) => {
//     dispatch(selectAppointment(appointmentId));
//     navigate(`/appointments/${appointmentId}`);
//   };

//   const handleCancelAppointment = async (appointmentId) => {
//     try {
//       await dispatch(cancelAppointment(appointmentId)).unwrap(); // Waits for the thunk to complete
//       toast.success("Appointment cancelled successfully!");
//     } catch (error) {
//       toast.error(error.message || "Failed to cancel appointment");
//     }
//   };

//   if (upcomingAppointments.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle>Upcoming Appointments</CardTitle>
//           <CardDescription>You have no upcoming appointments</CardDescription>
//         </CardHeader>
//         <CardContent className="text-center py-8">
//           <p className="mb-4 text-gray-500">No appointments scheduled yet.</p>
//           <Button onClick={() => navigate('/doctors')} className="bg-medical-primary hover:bg-medical-secondary">
//             Book an Appointment
//           </Button>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Upcoming Appointments</CardTitle>
//         <CardDescription>Your scheduled appointments</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {upcomingAppointments.map((appointment,index) => (
//           <div key={appointment._id || index}
//            className="p-4 border rounded-lg flex flex-col sm:flex-row justify-between bg-white hover:shadow-md transition-shadow"
//            >
//             <div className="flex-1 mb-3 sm:mb-0">
//               <div className="flex items-center mb-2">
//                 <User className="h-4 w-4 mr-2 text-medical-secondary" />
//                 <h4 className="font-medium text-medical-secondary">{appointment.doctorName}</h4>
//               </div>
//               <div className="flex items-center text-sm text-gray-600 mb-1">
//                 <CalendarDays className="h-4 w-4 mr-2" />
//                 <span>{formatDate(appointment.date)}</span>
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <Clock className="h-4 w-4 mr-2" />
//                 <span>{appointment.time}</span>
//               </div>
//               <div className="mt-2">
//                 <Badge variant={appointment.status === 'confirmed' ? 'default' : 'outline'}>
//                   {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//                 </Badge>
//               </div>
//             </div>
//             <div className="flex flex-row sm:flex-col gap-2 justify-end">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-medical-secondary border-medical-secondary hover:bg-medical-light"
//                 onClick={() => handleViewDetails(appointment._id)}
//               >
//                 Details
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-red-500 border-red-500 hover:bg-red-50"
//                 disabled={loading}
//                 onClick={() => handleCancelAppointment(appointment._id)}
//               >
//                 {loading ? 'Cancelling...' : 'Cancel'}
//               </Button>
//             </div>
//           </div>
//         ))}
//       </CardContent>
//       <CardFooter>
//         <Button onClick={() => navigate('/appointments')} variant="outline" className="w-full">
//           View All Appointments
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default UpcomingAppointments;
