import React, { useState, useEffect } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { useAppSelector } from '../hooks/useAppSelector';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calendar, Clock, AlarmClock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { fetchAppointments,rescheduleAppointment,cancelAppointment } from '../store/slices/appointmentSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import RescheduleAppointmentModal from '../modal/RescheduleAppointmentModal';

const AppointmentsPage = () => {
  const dispatch = useDispatch();

    // Fetch appointments when component mounts
    useEffect(() => {
      dispatch(fetchAppointments());
    }, [dispatch]);

  const { 
    appointments = [], 
    upcomingAppointments = [], 
    pastAppointments = [], 
    status 
  } = useAppSelector((state) => state.appointments);
  

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const todayAppointments = upcomingAppointments.filter(app => 
    app && isToday(app.date) && 
    app.status && 
    !['completed', 'cancelled'].includes(app.status.toLowerCase())
  );

  const futureAppointments = upcomingAppointments.filter(app => 
    app && 
    !isToday(app.date) && 
    app.status && 
    !['completed', 'cancelled'].includes(app.status.toLowerCase())
  );
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    const lowerStatus = status.toLowerCase();
    switch (lowerStatus) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = async ({ newDate, newTime, appointmentId }) => {
    try {
      await dispatch(rescheduleAppointment({ newDate, newTime, appointmentId })).unwrap();
      await dispatch(fetchAppointments());
      toast.success('Appointment rescheduled successfully!');
      setShowRescheduleModal(false);
    } catch (error) {
      toast.error(error.message || 'Failed to reschedule appointment.');
    }
  };

const renderAppointmentCard = (appointment, highlightToday = false) => {
  if (!appointment) return null;

  const isPastAppointment = ['completed', 'cancelled'].includes(appointment.status?.toLowerCase());
  
  return (
    <Card
      key={appointment._id || `${appointment.doctorId?._id}-${appointment.date}-${appointment.time}`}
      className={highlightToday ? 'border-2 border-blue-500 bg-blue-50' : ''}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-2 items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-medical-secondary">
                  {appointment.doctorId?.fullName || 'Unknown Doctor'}
                </h3>
                {highlightToday && (
                  <Badge className="bg-blue-200 text-blue-800 flex items-center gap-1">
                    <AlarmClock className="w-4 h-4" /> Today
                  </Badge>
                )}
              </div>
              <Badge className={getStatusColor(appointment.status)}>
                {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">
              {appointment.doctorId?.specialization || 'General Practice'}
            </p>

            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2">
            {isPastAppointment ? (
              <>
                {appointment.status?.toLowerCase() === 'completed' && (
                  <Button 
                    variant="outline" 
                    className="text-medical-secondary border-medical-secondary hover:bg-medical-light flex-1"
                  >
                    View Prescription
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="text-medical-primary border-medical-primary hover:bg-medical-light flex-1"
                  onClick={() => (window.location.href = '/doctors')}
                >
                  Book Again
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="text-medical-secondary border-medical-secondary hover:bg-medical-light flex-1"
                  onClick={() => handleRescheduleClick(appointment)}
                  disabled={status === 'loading'} 
                >
                  {status === 'loading' && selectedAppointment?._id === appointment._id 
                    ? 'Processing...' 
                    : 'Reschedule'}
                </Button>
                {/* <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50 flex-1"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to cancel this appointment?')) {
                      dispatch(cancelAppointment(appointment._id));
                      toast.success('Appointment cancelled successfully!');
                    }
                  }}
                  disabled={status === 'loading'} 
                >
                  Cancel
                </Button> */}

{appointment.status === 'cancelling' ? (
  <span className="text-red-500 font-semibold flex items-center justify-center">
    Cancelling...
  </span>
) : (
  <Button
  variant="outline"
  className="text-red-500 border-red-500 hover:bg-red-50 flex-1"
  onClick={() => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(cancelAppointment(appointment._id))
        .unwrap()
        .then(() => {
          toast.success('Appointment cancelled successfully!');
          dispatch(fetchAppointments()); // Refresh the list
        })
        .catch((error) => {
          toast.error(error.message || 'Failed to cancel appointment');
        });
    }
  }}
  disabled={status === 'loading'} 
>
  Cancel
</Button>
)}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


if (status === 'loading') {
  return <div className="flex justify-center items-center h-64">Loading appointments...</div>;
}

if (status === 'failed') {
  return <div className="text-red-500 text-center p-4">Error loading appointments. Please try again.</div>;
}

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="flex justify-center bg-gray-100 p-2 rounded-xl mb-8 shadow-sm">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-medical-primary data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300 text-gray-600"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-medical-primary data-[state=active]:text-white px-6 py-2 rounded-lg transition-all duration-300 text-gray-600"
          >
            Past
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="animate-fadeIn">
          {todayAppointments.length === 0 && upcomingAppointments.length === 0 ? (
            <Card className="shadow-md">
              <CardContent className="py-10 text-center">
                <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
                <Button
                  onClick={() => (window.location.href = '/doctors')}
                  className="bg-medical-primary hover:bg-medical-secondary"
                >
                  Book an Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {todayAppointments.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
                    <AlarmClock className="w-5 h-5" /> <span>Today's Appointments</span>
                  </div>
                  {todayAppointments.map((appointment) =>
                    renderAppointmentCard(appointment, true)
                  )}
                </>
              )}

              {upcomingAppointments.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-gray-800 text-lg font-semibold mt-6">
                    <Calendar className="w-5 h-5" /> <span>Upcoming Appointments</span>
                  </div>
                  {upcomingAppointments.map((appointment) =>
                    renderAppointmentCard(appointment)
                  )}
                </>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="animate-fadeIn">
          {pastAppointments.length === 0 ? (
            <Card className="shadow-md">
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">You don't have any past appointment records.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              <div className="flex items-center gap-2 text-gray-800 text-lg font-semibold mb-4">
                <Calendar className="w-5 h-5" /> <span>Past Appointments</span>
              </div>

              {pastAppointments.map((appointment) => renderAppointmentCard(appointment))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <RescheduleAppointmentModal
        showRescheduleModal={showRescheduleModal}
        setShowRescheduleModal={setShowRescheduleModal}
        selectedAppointment={selectedAppointment}
        onSubmit={handleRescheduleSubmit}
      />
    </div>
  );
};

export default AppointmentsPage;



// const renderAppointmentCard = (appointment, highlightToday = false) => {
//   if (!appointment) return null;

//   const isPastAppointment = ['completed', 'cancelled'].includes(appointment.status?.toLowerCase());
  
//   return (
//     <Card
//       key={appointment._id || `${appointment.doctorId?._id}-${appointment.date}-${appointment.time}`}
//       className={highlightToday ? 'border-2 border-blue-500 bg-blue-50' : ''}
//     >
//       <CardContent className="p-6">
//         <div className="flex flex-col md:flex-row justify-between gap-4">
//           <div className="flex-1">
//             <div className="flex justify-between mb-2 items-center">
//               <div className="flex items-center gap-2">
//                 <h3 className="text-xl font-semibold text-medical-secondary">
//                   {appointment.doctorId?.fullName || 'Unknown Doctor'}
//                 </h3>
//                 {highlightToday && (
//                   <Badge className="bg-blue-200 text-blue-800 flex items-center gap-1">
//                     <AlarmClock className="w-4 h-4" /> Today
//                   </Badge>
//                 )}
//               </div>
//               <Badge className={getStatusColor(appointment.status)}>
//                 {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
//               </Badge>
//             </div>
//             <p className="text-gray-600 mb-4">
//               {appointment.doctorId?.specialization || 'General Practice'}
//             </p>

//             <div className="space-y-2">
//               <div className="flex items-center">
//                 <Calendar className="h-4 w-4 mr-2 text-gray-500" />
//                 <span>{formatDate(appointment.date)}</span>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="h-4 w-4 mr-2 text-gray-500" />
//                 <span>{appointment.time}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-row md:flex-col gap-2">
//             {isPastAppointment ? (
//               <>
//                 {appointment.status?.toLowerCase() === 'completed' && (
//                   <Button 
//                     variant="outline" 
//                     className="text-medical-secondary border-medical-secondary hover:bg-medical-light flex-1"
//                   >
//                     View Prescription
//                   </Button>
//                 )}
//                 <Button 
//                   variant="outline" 
//                   className="text-medical-primary border-medical-primary hover:bg-medical-light flex-1"
//                   onClick={() => (window.location.href = '/doctors')}
//                 >
//                   Book Again
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button
//                   variant="outline"
//                   className="text-medical-secondary border-medical-secondary hover:bg-medical-light flex-1"
//                   onClick={() => handleRescheduleClick(appointment)}
//                   disabled={status === 'loading'} 
//                 >
//                   {status === 'loading' && selectedAppointment?._id === appointment._id 
//                     ? 'Processing...' 
//                     : 'Reschedule'}
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="text-red-500 border-red-500 hover:bg-red-50 flex-1"
//                   onClick={() => {
//                     if (window.confirm('Are you sure you want to cancel this appointment?')) {
//                       dispatch(cancelAppointment(appointment._id));
//                       toast.success('Appointment cancelled successfully!');
//                     }
//                   }}
//                   disabled={status === 'loading'} 
//                 >
//                   Cancel
//                 </Button>
//               </>
//             )}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };