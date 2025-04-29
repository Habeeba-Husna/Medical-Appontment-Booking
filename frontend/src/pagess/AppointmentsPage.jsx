
// import React, { useState, useEffect } from 'react';
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '../components/ui/tabs';
// import { useAppSelector } from '../hooks/useAppSelector';
// import { Card, CardContent } from '../components/ui/Card';
// import { Badge } from '../components/ui/Badge';
// import { Calendar, Clock, AlarmClock, Video, MessageCircle, FileText, Upload } from 'lucide-react';
// import { Button } from '../components/ui/Button';
// import { fetchAppointments, rescheduleAppointment, cancelAppointment } from '../store/slices/appointmentSlice';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import RescheduleAppointmentModal from '../modal/RescheduleAppointmentModal';
// import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/Avatar';

// const AppointmentsPage = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchAppointments());
//   }, [dispatch]);

//   const { 
//     appointments = [], 
//     upcomingAppointments = [], 
//     pastAppointments = [], 
//     status 
//   } = useAppSelector((state) => state.appointments);
  
//   const [showRescheduleModal, setShowRescheduleModal] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const isToday = (dateString) => {
//     if (!dateString) return false;
//     const date = new Date(dateString);
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   const todayAppointments = upcomingAppointments.filter(app => 
//     app && isToday(app.date) && 
//     app.status && 
//     !['completed', 'cancelled'].includes(app.status.toLowerCase())
//   );

//   const futureAppointments = upcomingAppointments.filter(app => {
//     const appDate = new Date(app.date); 
//     return (
//       app &&
//       !isToday(appDate) &&
//       app.status &&
//       !['completed', 'cancelled'].includes(app.status.toLowerCase())
//     );
//   });
  
//   const formatDate = (dateString) => {
//     if (!dateString) return 'Date not available';
//     const options = {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return '';
//     return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const getStatusColor = (status) => {
//     if (!status) return 'bg-gray-100 text-gray-800';
//     const lowerStatus = status.toLowerCase();
//     switch (lowerStatus) {
//       case 'confirmed':
//         return 'bg-green-100 text-green-800';
//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'completed':
//         return 'bg-blue-100 text-blue-800';
//       case 'cancelled':
//         return 'bg-red-100 text-red-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleRescheduleClick = (appointment) => {
//     setSelectedAppointment(appointment);
//     setShowRescheduleModal(true);
//   };

//   const handleRescheduleSubmit = async ({ newDate, newTime, appointmentId }) => {
//     try {
//       await dispatch(rescheduleAppointment({ newDate, newTime, appointmentId })).unwrap();
//       await dispatch(fetchAppointments());
//       toast.success('Appointment rescheduled successfully!');
//       setShowRescheduleModal(false);
//     } catch (error) {
//       toast.error(error.message || 'Failed to reschedule appointment.');
//     }
//   };

//   const handleJoinVideoCall = (appointment) => {
//     // Implement your video call functionality here
//     console.log('Joining video call for appointment:', appointment);
//     toast.info('Connecting to video consultation...');
//   };

//   const handleMessageDoctor = (doctorId) => {
//     // Implement your messaging functionality here
//     console.log('Messaging doctor with ID:', doctorId);
//     toast.info('Opening chat with doctor...');
//   };

//   const handleViewPrescription = (appointmentId) => {
//     // Implement prescription viewing functionality
//     console.log('Viewing prescription for:', appointmentId);
//     toast.info('Opening prescription...');
//   };

//   const renderAppointmentCard = (appointment, highlightToday = false) => {
//     if (!appointment) return null;

//     const isPastAppointment = ['completed', 'cancelled'].includes(appointment.status?.toLowerCase());
//     // const isVideoConsultation = appointment.consultationType?.toLowerCase() === 'video';
//     const isVideoConsultation = appointment.appointmentType?.toLowerCase().includes('video');

    
//     return (
//       <Card
//         key={appointment._id || `${appointment.doctorId?._id}-${appointment.date}-${appointment.time}`}
//         className={`${highlightToday ? 'border-2 border-blue-500 bg-blue-50' : ''} hover:shadow-lg transition-shadow`}
//       >
//         <CardContent className="p-6">
//           <div className="flex flex-col md:flex-row justify-between gap-4">
//             <div className="flex-1">
//               <div className="flex justify-between mb-2 items-center">
//                 <div className="flex items-center gap-2">
//                   <Avatar className="h-10 w-10 mr-2">
//                     <AvatarImage src={appointment.doctorId?.profilePicture} />
//                     <AvatarFallback>{appointment.doctorId?.fullName?.charAt(0) || 'D'}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="text-xl font-semibold text-medical-secondary">
//                       {appointment.doctorId?.fullName || 'Unknown Doctor'}
//                     </h3>
//                     <p className="text-gray-600 text-sm">
//                       {appointment.doctorId?.specialization || 'General Practice'}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {highlightToday && (
//                     <Badge className="bg-blue-200 text-blue-800 flex items-center gap-1">
//                       <AlarmClock className="w-4 h-4" /> Today
//                     </Badge>
//                   )}
//                   <Badge className={isVideoConsultation ? 'bg-medical-blue text-white' : 'bg-gray-200 text-gray-800'}>
//                     {isVideoConsultation ? 'Video-Call' : 'In-Person'}
//                   </Badge>
//                   <Badge className={getStatusColor(appointment.status)}>
//                     {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
//                   </Badge>
//                 </div>
//               </div>

//               <div className="space-y-2 mt-4">
//                 <div className="flex items-center">
//                   <Calendar className="h-4 w-4 mr-2 text-gray-500" />
//                   <span>{formatDate(appointment.date)}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="h-4 w-4 mr-2 text-gray-500" />
//                   <span>{formatTime(appointment.time)}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-row md:flex-col gap-2">
//               {isPastAppointment ? (
//                 <>
//                   {appointment.status?.toLowerCase() === 'completed' && (
//                     <Button 
//                       variant="outline" 
//                       className="text-medical-secondary border-medical-secondary hover:bg-medical-light flex-1"
//                       onClick={() => handleViewPrescription(appointment._id)}
//                     >
//                       <FileText className="mr-2 h-4 w-4" />
//                       View Prescription
//                     </Button>
//                   )}
//                   <Button 
//                     variant="outline" 
//                     className="text-medical-primary border-medical-primary hover:bg-medical-light flex-1"
//                     onClick={() => (window.location.href = '/patient/doctors')}
//                   >
//                     <Calendar className="mr-2 h-4 w-4" />
//                     Book Again
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   {isVideoConsultation && (
//                     <Button
//                       className="bg-medical-secondary text-white hover:bg-medical-secondary/90 flex-1"
//                       onClick={() => handleJoinVideoCall(appointment)}
//                     >
//                       <Video className="mr-2 h-4 w-4" />
//                       Join Video Call
//                     </Button>
//                   )}
//                   <Button
//                     variant="outline"
//                     className="bg-gray-100 text-black hover:bg-medical-sky hover:text-white flex-1"
//                     onClick={() => handleMessageDoctor(appointment.doctorId?._id)}
//                   >
//                     <MessageCircle className="mr-2 h-4 w-4" />
//                     Message Doctor
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-medical-secondary border-medical-secondary hover:bg-medical-light flex-1"
//                     onClick={() => handleRescheduleClick(appointment)}
//                     disabled={status === 'loading'} 
//                   >
//                     {status === 'loading' && selectedAppointment?._id === appointment._id 
//                       ? 'Processing...' 
//                       : 'Reschedule'}
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="text-red-500 border-red-500 hover:bg-red-50 flex-1"
//                     onClick={() => {
//                       if (window.confirm('Are you sure you want to cancel this appointment?')) {
//                         dispatch(cancelAppointment(appointment._id))
//                           .unwrap()
//                           .then(() => {
//                             toast.success('Appointment cancelled successfully!');
//                             dispatch(fetchAppointments());
//                           })
//                           .catch((error) => {
//                             toast.error(error.message || 'Failed to cancel appointment');
//                           });
//                       }
//                     }}
//                     disabled={status === 'loading'} 
//                   >
//                     Cancel
//                   </Button>
//                 </>
//               )}
//             </div>
//           </div>

//           {isPastAppointment && appointment.status?.toLowerCase() === 'completed' && (
//             <div className="mt-4 border-t pt-4">
//               <div className="mb-3">
//                 <h4 className="font-medium text-gray-800">Diagnosis:</h4>
//                 <p>{appointment.diagnosis || 'No diagnosis recorded'}</p>
//               </div>
//               <div>
//                 <h4 className="font-medium text-gray-800">Doctor's Notes:</h4>
//                 <p className="text-gray-600">{appointment.notes || 'No notes available'}</p>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     );
//   };

//   if (status === 'loading') {
//     return <div className="flex justify-center items-center h-64">Loading appointments...</div>;
//   }

//   if (status === 'failed') {
//     return <div className="text-red-500 text-center p-4">Error loading appointments. Please try again.</div>;
//   }

//   return (
//     <div className="container mx-auto px-2">
//       <div className="mb-3">
//         <h1 className="text-2xl font-bold text-primary">Consultations</h1>
//         <p className="text-gray-500 text-sm mt-1">Manage your doctor consultations</p>
//       </div>

//       <Tabs defaultValue="upcoming" className="w-full">
//         <div className="flex items-center justify-between mb-4">
//           <TabsList className="bg-white shadow-sm">
//             <TabsTrigger 
//               value="upcoming" 
//               className="data-[state=inactive]:bg-gray-100 data-[state=active]:bg-white"
//             >
//               Upcoming
//             </TabsTrigger>
//             <TabsTrigger 
//               value="past" 
//               className="data-[state=inactive]:bg-gray-100 data-[state=active]:bg-white"
//             >
//               Past Consultations
//             </TabsTrigger>
//           </TabsList>
//           <Button 
//             className="bg-medical-secondary text-white hover:bg-medical-secondary/90"
//             onClick={() => (window.location.href = '/patient/doctors')}
//           >
//             <Calendar className="mr-2 h-4 w-4" />
//             Book New Consultation
//           </Button>
//         </div>

//         <TabsContent value="upcoming" className="animate-fadeIn space-y-4">
//           {todayAppointments.length === 0 && futureAppointments.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
//               <Calendar className="h-16 w-16 mb-4" />
//               <h3 className="text-lg font-medium">No Upcoming Consultations</h3>
//               <p className="mt-2 mb-4">You don't have any upcoming consultations scheduled</p>
//               <Button 
//                 className="bg-medical-secondary text-white hover:bg-medical-secondary/90"
//                 onClick={() => (window.location.href = '/patient/doctors')}
//               >
//                 Book New Consultation
//               </Button>
//             </div>
//           ) : (
//             <>
//               {todayAppointments.length > 0 && (
//                 <>
//                   <div className="flex items-center gap-2 text-blue-700 text-lg font-semibold">
//                     <AlarmClock className="w-5 h-5" /> <span>Today's Appointments</span>
//                   </div>
//                   {todayAppointments.map((appointment) =>
//                     renderAppointmentCard(appointment, true)
//                   )}
//                 </>
//               )}

//               {futureAppointments.length > 0 && (
//                 <>
//                   <div className="flex items-center gap-2 text-gray-800 text-lg font-semibold mt-6">
//                     <Calendar className="w-5 h-5" /> <span>Upcoming Appointments</span>
//                   </div>
//                   {futureAppointments.map((appointment) =>
//                     renderAppointmentCard(appointment)
//                   )}
//                 </>
//               )}
//             </>
//           )}
//         </TabsContent>

//         <TabsContent value="past" className="animate-fadeIn space-y-4">
//           {pastAppointments.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
//               <MessageCircle className="h-16 w-16 mb-4" />
//               <h3 className="text-lg font-medium">No Past Consultations</h3>
//               <p className="mt-2 mb-4">You haven't had any consultations yet</p>
//             </div>
//           ) : (
//             <>
//               <div className="flex items-center gap-2 text-gray-800 text-lg font-semibold mb-4">
//                 <Calendar className="w-5 h-5" /> <span>Past Appointments</span>
//               </div>
//               {pastAppointments.map((appointment) => renderAppointmentCard(appointment))}
//             </>
//           )}
//         </TabsContent>
//       </Tabs>

//       <RescheduleAppointmentModal
//         showRescheduleModal={showRescheduleModal}
//         setShowRescheduleModal={setShowRescheduleModal}
//         selectedAppointment={selectedAppointment}
//         onSubmit={handleRescheduleSubmit}
//       />
//     </div>
//   );
// };

// export default AppointmentsPage;













import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { useAppSelector } from '../hooks/useAppSelector';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calendar, Clock, AlarmClock, Video, MessageCircle, FileText, Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { fetchAppointments, rescheduleAppointment, cancelAppointment } from '../store/slices/appointmentSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import RescheduleAppointmentModal from '../modal/RescheduleAppointmentModal';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/Avatar';

const AppointmentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


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

  const futureAppointments = upcomingAppointments.filter(app => {
    const appDate = new Date(app.date); 
    return (
      app &&
      !isToday(appDate) &&
      app.status &&
      !['completed', 'cancelled'].includes(app.status.toLowerCase())
    );
  });
  
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

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

  const handleJoinVideoCall = (appointment) => {
    console.log('Joining video call for appointment:', appointment);
    toast.info('Connecting to video consultation...');
  };

  // const handleMessageDoctor = (doctorId) => {

//    const handleMessageDoctor = (doctorId) => {
//   // Ensure we're getting the ID string
//   const id = typeof doctorId === 'object' ? doctorId._id : doctorId;
  
//   if (!id) {
//     console.error('Invalid doctor ID:', doctorId);
//     return;
//   }

//   console.log('Messaging doctor with ID:', id);
//   navigate(`/chat/${id}`);
// };

const handleMessageDoctor = (doctor) => {
  // Handle both cases where doctor is an object or just an ID string
  const doctorId = typeof doctor === 'object' ? doctor._id : doctor;
  
  if (!doctorId) {
    console.error('Invalid doctor ID:', doctor);
    toast.error('Cannot start chat - doctor information missing');
    return;
  }

  console.log('Messaging doctor with ID:', doctorId);
  navigate(`/chat/${doctorId}`);
};


  const handleViewPrescription = (appointmentId) => {
    console.log('Viewing prescription for:', appointmentId);
    toast.info('Opening prescription...');
  };

  const handleUploadDocuments = (appointmentId) => {
    console.log('Uploading documents for:', appointmentId);
    toast.info('Opening document upload...');
  };

  const renderAppointmentCard = (appointment, highlightToday = false) => {
    if (!appointment) return null;

    const isPastAppointment = ['completed', 'cancelled'].includes(appointment.status?.toLowerCase());
    const isVideoConsultation = appointment.appointmentType?.toLowerCase().includes('video');

    return (
      <Card
        key={appointment._id || `${appointment.doctorId?._id}-${appointment.date}-${appointment.time}`}
        className={`${highlightToday ? 'border-2 border-blue-500 bg-blue-50' : ''} hover:shadow-lg transition-shadow`}
      >
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2 items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10 mr-2">
                    <AvatarImage src={appointment.doctorId?.profilePicture} />
                    <AvatarFallback>{appointment.doctorId?.fullName?.charAt(0) || 'D'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-medical-secondary">
                      {appointment.doctorId?.fullName || 'Unknown Doctor'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {appointment.doctorId?.specialization || 'General Practice'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {highlightToday && (
                    <Badge className="bg-blue-200 text-blue-800 flex items-center gap-1">
                      <AlarmClock className="w-4 h-4" /> Today
                    </Badge>
                  )}
                  <Badge className={isVideoConsultation ? 'bg-medical-blue text-white' : 'bg-gray-200 text-gray-800'}>
                    {isVideoConsultation ? 'Video-Call' : 'In-Person'}
                  </Badge>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{formatTime(appointment.time)}</span>
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
                      onClick={() => handleViewPrescription(appointment._id)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Prescription
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleUploadDocuments(appointment._id)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-medical-primary border-medical-primary hover:bg-medical-light flex-1"
                    onClick={() => (window.location.href = '/patient/doctors')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Again
                  </Button>
                </>
              ) : (
                <>
                  {isVideoConsultation && (
                    <Button
                      className="bg-medical-secondary text-white hover:bg-medical-secondary/90 flex-1"
                      onClick={() => handleJoinVideoCall(appointment)}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Join Video Call
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="bg-gray-100 text-black hover:bg-medical-sky hover:text-white flex-1"
                    // onClick={() => handleMessageDoctor(appointment.doctorId?._id)}
                    onClick={() => handleMessageDoctor(appointment.doctorId)}>
    
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Doctor
                  </Button>
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
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 flex-1"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this appointment?')) {
                        dispatch(cancelAppointment(appointment._id))
                          .unwrap()
                          .then(() => {
                            toast.success('Appointment cancelled successfully!');
                            dispatch(fetchAppointments());
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
                </>
              )}
            </div>
          </div>

          {isPastAppointment && appointment.status?.toLowerCase() === 'completed' && (
            <div className="mt-4 border-t pt-4">
              <div className="mb-3">
                <h4 className="font-medium text-gray-800">Diagnosis:</h4>
                <p>{appointment.diagnosis || 'No diagnosis recorded'}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Doctor's Notes:</h4>
                <p className="text-gray-600">{appointment.notes || 'No notes available'}</p>
              </div>
            </div>
          )}
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
    <div className="container mx-auto px-2">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-primary">Consultations</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your doctor consultations</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-white shadow-sm">
            <TabsTrigger 
              value="upcoming" 
              className="data-[state=inactive]:bg-gray-100 data-[state=active]:bg-white"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              className="data-[state=inactive]:bg-gray-100 data-[state=active]:bg-white"
            >
              Past Consultations
            </TabsTrigger>
          </TabsList>
          <Button 
            className="bg-medical-secondary text-white hover:bg-medical-secondary/90"
            onClick={() => (window.location.href = '/patient/doctors')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book New Consultation
          </Button>
        </div>

        <TabsContent value="upcoming" className="animate-fadeIn space-y-4">
          {todayAppointments.length === 0 && futureAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Calendar className="h-16 w-16 mb-4" />
              <h3 className="text-lg font-medium">No Upcoming Consultations</h3>
              <p className="mt-2 mb-4">You don't have any upcoming consultations scheduled</p>
              <Button 
                className="bg-medical-secondary text-white hover:bg-medical-secondary/90"
                onClick={() => (window.location.href = '/patient/doctors')}
              >
                Book New Consultation
              </Button>
            </div>
          ) : (
            <>
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

              {futureAppointments.length > 0 && (
                <>
                  <div className="flex items-center gap-2 text-gray-800 text-lg font-semibold mt-6">
                    <Calendar className="w-5 h-5" /> <span>Upcoming Appointments</span>
                  </div>
                  {futureAppointments.map((appointment) =>
                    renderAppointmentCard(appointment)
                  )}
                </>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="past" className="animate-fadeIn space-y-4">
          {pastAppointments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <MessageCircle className="h-16 w-16 mb-4" />
              <h3 className="text-lg font-medium">No Past Consultations</h3>
              <p className="mt-2 mb-4">You haven't had any consultations yet</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-gray-800 text-lg font-semibold mb-4">
                <Calendar className="w-5 h-5" /> <span>Past Appointments</span>
              </div>
              {pastAppointments.map((appointment) => renderAppointmentCard(appointment))}
            </>
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