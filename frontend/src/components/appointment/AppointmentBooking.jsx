// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Calendar } from 'lucide-react';
// import { jwtDecode } from "jwt-decode";
// import { Button } from '../ui/Button';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
// import CalendarComponent  from '../ui/Calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
// import { format } from 'date-fns';
// import { useAppSelector, useAppDispatch } from '../../hooks';
// import { useToast } from '../../hooks/use-toast';
// import { cn } from '../../lib/utils';
// import axiosInstance from '../../api/axiosInstance';
// import { ENDPOINTS } from '../../api/axiosInstance';

// import { 
//   setBookingDate, 
//   setBookingTime, 
//   bookAppointmentStart, 
//   bookAppointmentSuccess,
//   bookAppointmentFailure, 
// } from '../../store/slices/appointmentSlice';
// import { fetchDoctors } from '../../store/slices/doctorSlice';


// const AppointmentBooking = () => {
//   const { doctorId } = useParams();
//   const [selectedDate, setSelectedDate] = useState(undefined);
//   const [selectedTime, setSelectedTime] = useState(undefined);
//   const [availableTimes, setAvailableTimes] = useState([]);
  
//   // const { doctors } = useAppSelector(state => state.doctors);
//   // const { id: patientId } = useAppSelector(state => state.auth);

// // const { user } = useAppSelector((state) => state.auth);
// // const patientId = user?.id;

// // const { doctors } = useSelector((state) => state.doctors);
// const doctors = useSelector((state) => state.doctors.list);
// console.log("getting..........",doctors)
// const user = useSelector((state) => state.auth?.user);
// console.log("user  ............",user)
// let patientId;
// if (user?.role === 'Patient' && user?.accessToken) {
//   const decoded = jwtDecode(user.accessToken);
//   patientId = decoded?.id; // ✅ Now you'll get the actual MongoDB user ID
// }

// console.log('Decoded patientId:', patientId);



// // Only allow patient to book
// // const patientId = user?.role === 'Patient' ? user?.id : null;
// patientId = patientId || (user?.role === 'Patient' ? user?.id : null);
// console.log('after patient id:', patientId);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();
  
//   const doctor = doctors?.find(d => d.id === doctorId);
//   console.log("doctors getting.....",doctor)
//   useEffect(() => {
//     if (doctorId) {
//       dispatch(fetchDoctors(doctorId));
//     }
//   }, [doctorId, dispatch]);
  

//   useEffect(() => {
//     dispatch(fetchDoctors());
//   }, [dispatch]);

  

//   useEffect(() => {
//     setSelectedTime(undefined);
//     if (selectedDate && doctor) {
//       const dateStr = format(selectedDate, 'yyyy-MM-dd');
//       const slot = doctor.availableSlots.find(s => s.date === dateStr);
//       setAvailableTimes(slot ? slot.times : ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']);
//     }
//   }, [selectedDate, doctor]);
  
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     if (date) {
//       dispatch(setBookingDate(format(date, 'yyyy-MM-dd')));
//     }
//   };
  
//   const handleTimeSelect = (time) => {
//     setSelectedTime(time);
//     dispatch(setBookingTime(time));
//   };
  
//   const handleBookAppointment = () => {
//     if (!selectedDate || !selectedTime || !doctor || !patientId) {

//       console.log('selectedDate:', selectedDate);
// console.log('selectedTime:', selectedTime);
// console.log('doctor:', doctor);
// console.log('patientId:', patientId); 


//       toast({ title: "Error", description: "Please select a date and time.", variant: "destructive" });
//       return;
//     }

//       // ✅ Proceed to send booking data to backend
//   const appointmentData = {
//     patientId,
//     doctorId: doctor.id, // or doctor._id based on how doctor object is shaped
//     date: selectedDate,
//     time: selectedTime,
//   };


//     dispatch(bookAppointmentStart());

//     axiosInstance.post(ENDPOINTS.PATIENT.BOOK_APPOINTMENT, appointmentData)

//     .then((response) => {
//       dispatch(bookAppointmentSuccess({
//         id: response.data._id || `a${Date.now()}`, // Use backend ID if available
//         patientId,
//         doctorId: doctor.id,
//         doctorName: doctor.name,
//         specialization: doctor.specialization,
//         date: format(selectedDate, 'yyyy-MM-dd'),
//         time: selectedTime,
//         status: 'confirmed',
//         paymentStatus: 'completed',
//       }));


      
//       toast({ title: "Appointment Booked", description: "Your appointment has been scheduled." });
//       navigate('/appointments');
//    })
//    .catch((error) => {
//     dispatch(bookAppointmentFailure(error.response?.data?.message || "Booking failed"));
  
//     toast({
//       title: "Error",
//       description: error.response?.data?.message || "Booking failed",
//       variant: "destructive",
//     });
//   });
  
// };

//   if (!doctor) {
//     return (
//       <div className="text-center py-8">
//         <p>Doctor not found. Please go back and select a doctor.</p>
//         <Button onClick={() => navigate('/doctors')} className="mt-4">Find Doctors</Button>
//       </div>
//     );
//   }
  
//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Card className="shadow-lg border border-gray-200 rounded-xl">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold text-gray-700">
//             Book an Appointment with {doctor.name}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
//           {/* Select Date Section */}
//           <div>
//             <h3 className="font-medium text-lg mb-3">1. Select Date</h3>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline" className={cn("w-full py-3 text-left font-medium", !selectedDate && "text-gray-400")}>
//                   <Calendar className="mr-2 h-5 w-5" />
//                   {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-4 bg-white rounded-lg shadow-md">
//                 <CalendarComponent 
//                   mode="single" 
//                   selected={selectedDate} 
//                   onSelect={handleDateSelect} 
//                   initialFocus 
//                   disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))}
//                   // className="p-4"
//                   className={cn("p-3 pointer-events-auto")}
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>

//           {/* Select Time Section */}
//           <div>
//             <h3 className="font-medium text-lg mb-3">2. Select Time</h3>
//             <div className="grid grid-cols-3 gap-3">
//               {!selectedDate ? (
//                 <p className="col-span-3 text-gray-500">Please select a date first</p>
//               ) : availableTimes.length === 0 ? (
//                 <p className="col-span-3 text-gray-500">No available slots</p>
//               ) : (
//                 availableTimes.map((time) => (
//                   <Button
//                     key={time}
//                     variant={selectedTime === time ? "default" : "outline"}
//                     className={cn(
//                       "px-4 py-2 text-sm font-medium",
//                       selectedTime === time ? "bg-blue-500 text-white" : "hover:bg-gray-200"
//                     )}
//                     onClick={() => handleTimeSelect(time)}
//                   >
//                     {time}
//                   </Button>
//                 ))
//               )}
//             </div>
//           </div>
//         </CardContent>

//         {/* Appointment Summary */}
//         <CardFooter className="flex flex-col space-y-4">
//           <div className="w-full p-4 border border-gray-200 rounded-lg bg-gray-50 shadow">
//             <h3 className="font-medium text-lg mb-2">Appointment Summary</h3>
//             <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
//               <div>Doctor:</div><div>{doctor.name}</div>
//               <div>Specialization:</div><div>{doctor.specialization}</div>
//               <div>Date:</div><div>{selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Not selected'}</div>
//               <div>Time:</div><div>{selectedTime || 'Not selected'}</div>
//             </div>
//           </div>

//           <Button
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
//             //  className="w-full bg-medical-primary hover:bg-medical-secondary"
//             disabled={!selectedDate || !selectedTime}
//             onClick={handleBookAppointment}
//           >
//             Confirm Appointment
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default AppointmentBooking;




import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import CalendarComponent from '../ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover';
import { format } from 'date-fns';
import { useAppDispatch } from '../../hooks';
import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/utils';
import { toast } from "sonner";


import {
  setBookingDate,
  setBookingTime,
  bookAppointment,
  fetchAppointments,
} from '../../store/slices/appointmentSlice';
import { fetchDoctors } from '../../store/slices/doctorSlice';

const AppointmentBooking = () => {
  // const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // const doctors = useSelector((state) => state.doctors.list);
  const { list: doctors } = useSelector((state) => state.doctors);

  const user = useSelector((state) => state.auth?.user);
  const appointments = useSelector((state) => state.appointments.appointments);

  // console.log('doctors from Redux:', doctors);
  // console.log('user from Redux:', user);


  // let patientId;
  // if (user?.role === 'Patient' && user?.accessToken) {
  //   const decoded = jwtDecode(user.accessToken);
  //   patientId = decoded?.id;
  // }
  // patientId = patientId || (user?.role === 'Patient' ? user?.id : null);


  const decoded = user?.accessToken ? jwtDecode(user.accessToken) : {};
const patientId = user?.role === 'Patient' ? (decoded?.id || user?.id) : null;

const { doctorId } = useParams();
  // const doctor = doctors?.find(d => d.id === doctorId || d._id === doctorId);
  const doctorList = doctors?.doctors || [];
  const doctor = doctorList.find(d => d._id === doctorId || d.id === doctorId);

// console.log("asdfgh..........",doctor)
  
  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchAppointments());
  }, [dispatch]);


  useEffect(() => {
    setSelectedTime(undefined);

    if (selectedDate && doctor) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');


  const DEFAULT_TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
// const doctorAvailableTimes = slot ? slot.times : DEFAULT_TIMES;


const slot = doctor.availableSlots?.find(s => s.date === dateStr);
const doctorAvailableTimes = slot ? slot.times : DEFAULT_TIMES;

// const doctorAvailableTimes = selectedSlot ? selectedSlot.times : DEFAULT_TIMES;

      // Find already booked times for this doctor on the selected date
      const bookedTimes = appointments
        ?.filter(app => (app.doctorId === doctorId || app.doctorId === doctor._id) && app.date === dateStr)
        .map(app => app.time);

      // Filter out already booked times
      const remainingTimes = doctorAvailableTimes.filter(time => !bookedTimes.includes(time)).sort();
      setAvailableTimes(remainingTimes);
      // setAvailableTimes(doctorAvailableTimes); // show all slots

    }
  }, [selectedDate, doctor, appointments,doctorId]);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      dispatch(setBookingDate(format(date, 'yyyy-MM-dd')));
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    dispatch(setBookingTime(time));
  };


  
  const handleBookAppointment = () => {
    // console.log("appointment confirmed...............")
    if (!selectedDate || !selectedTime || !doctorId || !patientId) {
      // toast({ 
      //   title: "Missing Info", 
      //   description: "Please select a date and time.", 
      //   variant: "destructive" 
      // });
      toast.error("Please select a date and time."); 

      return;
    }

    const appointmentData = {
      patientId,
      doctorId: doctor.id || doctor._id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
    };
    console.log("Booking appointment with data:", appointmentData);


    dispatch(bookAppointment(appointmentData))
      .unwrap()
      .then(() => {
        toast.success("Your appointment has been scheduled.");
        navigate('/appointments');
      })
      .catch((error) => {
        toast.error(error || "Booking failed. Try again later.");
      });
  };

  if (!doctor) {
    return (
      // <div className="text-center py-8">
      //   <p>Doctor not found. Please go back and select a doctor.</p>
      //   <Button onClick={() => navigate('/doctors')} className="mt-4">Find Doctors</Button>
      // </div>

      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Doctor not found.</p>
        <Button onClick={() => navigate('/doctors')} className="mt-4">
          {/* Back to Doctors */}
          Find Doctors
          </Button>
      </div>

    );
  }

return (

  <div className="max-w-3xl mx-auto">
  <Card className="shadow-lg border border-gray-200 rounded-xl">
    <CardHeader>
      <CardTitle className="text-2xl font-bold mb-0">
        Book an Appointment with {doctor.fullName}
      </CardTitle>
    </CardHeader>

    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Select Date Section */}
      <div>
        <h3 className="text-lg font-normal mb-2">1. Select Date</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "w-64 px-4 py-2 text-left font-medium flex items-center justify-start gap-2 bg-gray-50", 
                !selectedDate && "text-gray-400"
              )}
            >
              <Calendar className="h-5 w-5" />
              {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 bg-white rounded-lg shadow-md">
            <CalendarComponent 
              mode="single" 
              selected={selectedDate} 
              onSelect={handleDateSelect} 
              initialFocus 
              disabled={(date) => 
                date < new Date() || 
                date > new Date(new Date().setMonth(new Date().getMonth() + 2))
              }
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Select Time Section */}
      <div>
        <h3 className="text-lg font-normal mb-2">2. Select Time</h3>
        <div className="grid grid-cols-3 gap-3">
          {!selectedDate ? (
            <p className="col-span-3 text-gray-500">Please select a date first</p>
          ) : availableTimes.length === 0 ? (
            <p className="col-span-3 text-gray-500">No available slots on this date. Please choose another date.</p>
          ) : (
            availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  // disabled={isBooked}
                  className={cn(
                    "px-4 py-2 text-sm font-medium",
                    // isBooked && "opacity-50 cursor-not-allowed",
                    selectedTime === time ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  )}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))
          )}
        </div>
      </div>
    </CardContent>

    {/* Appointment Summary */}
    <CardFooter className="flex flex-col space-y-4">
      <div className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 shadow">
        <h3 className="text-lg font-medium mb-2">Appointment Summary</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-500">Doctor:</div>
          <div className="text-black">{doctor.fullName}</div>

          <div className="text-gray-500">Specialization:</div>
          <div className="text-black">{doctor.specialization}</div>

          <div className="text-gray-500">Date:</div>
          <div className="text-black">
            {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Not selected'}
          </div>

          <div className="text-gray-500">Time:</div>
          <div className="text-black">{selectedTime || 'Not selected'}</div>
        </div>
      </div>

      <Button
        className="w-full bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700"
        disabled={!selectedDate || !selectedTime}
        onClick={handleBookAppointment}
      >
        Confirm Appointment
      </Button>
    </CardFooter>
  </Card>
</div>

   
);
};

export default AppointmentBooking;
