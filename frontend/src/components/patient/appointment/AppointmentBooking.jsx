import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import { Button } from '../../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/Card';
import CalendarComponent from '../../ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/Popover';
import { format } from 'date-fns';
import { useAppDispatch } from '../../../hooks';
import { cn } from '../../../lib/utils';
import { toast } from 'react-toastify';

import {
  setBookingDate,
  setBookingTime,
  bookAppointment,
  fetchAppointments,
} from '../../../store/slices/appointmentSlice';
import { fetchDoctors } from '../../../store/slices/doctorSlice';
import { fetchCurrentUser } from '../../../store/slices/authSlice';

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list: doctors } = useSelector((state) => state.doctors);
  const user = useSelector((state) => state.auth.user);
  console.log("User from Redux:", user);
  
  const appointments = useSelector((state) => state.appointments.appointments);
  const { status: bookingStatus } = useSelector((state) => state.appointments);
  const { doctorId } = useParams();

     // Get patient ID safely
     const getPatientId = () => {
      if (!user) return null;
      
      // First try direct _id from user object
  if (user._id && user.role?.toLowerCase() === 'patient') {
    return user._id;
  }

  // Then try token decoding as fallback
  if (user.token) {
    try {
      const decoded = jwtDecode(user.token);
      if (decoded?.id && decoded?.role?.toLowerCase() === 'patient') {
        return decoded.id;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  
  return null;
};

 
const patientId = getPatientId();
console.log("Resolved patientId:", patientId);

const doctorList = doctors?.doctors || [];
  const doctor = doctorList.find(d => d._id === doctorId || d.id === doctorId);

  // Check authentication on mount
  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser())
        .unwrap()
        .catch(() => {
          toast.error('Please login to book appointments');
          navigate('/login');
        });
    }
  }, [dispatch, navigate, user]);



  useEffect(() => {
    if (doctorId) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, doctorId]);


  useEffect(() => {
    setSelectedTime(undefined);
    setBookedTimes([]);


    if (selectedDate && doctor) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const DEFAULT_TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '18:00'];
      const slot = doctor.availableSlots?.find(s => s.date === dateStr);
      const doctorAvailableTimes = slot ? slot.times : DEFAULT_TIMES;

  //     const bookedTimes = appointments
  //       ?.filter(app => (app.doctorId === doctorId || app.doctorId === doctor._id) && app.date === dateStr)
  //       .map(app => app.time);

  //     const remainingTimes = doctorAvailableTimes.filter(time => !bookedTimes.includes(time)).sort();
  //     setAvailableTimes(remainingTimes);
  //   }
  // }, [selectedDate, doctor, appointments, doctorId]);


  // Get all booked times for this doctor on selected date
  const times = appointments
  ?.filter(app => 
    (app.doctorId === doctorId || app.doctorId === doctor._id) && 
    app.date === dateStr &&
    app.status !== 'cancelled'
  )
  .map(app => app.time);

setBookedTimes(times || []);

// Filter out booked times
const remainingTimes = doctorAvailableTimes.filter(time => !times?.includes(time)).sort();
setAvailableTimes(remainingTimes);
}
}, [selectedDate, doctor, appointments, doctorId]);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      dispatch(setBookingDate(format(date, 'yyyy-MM-dd')));
    }
  };



  const handleTimeSelect = (time) => {
    if (selectedDate && isToday(selectedDate)) {
      const now = new Date();
      const [hours, minutes] = time.split(':').map(Number);
      const selectedDateTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );
      
      if (selectedDateTime < now) {
        toast.error("Cannot book appointment in the past. Please select a future time.");
        return;
      }
    }
    
  //   setSelectedTime(time);
  //   dispatch(setBookingTime(time));
  // };

  // Check if the selected time is already booked
  const isBooked = bookedTimes.includes(time);
  
  if (isBooked) {
    // Show error toast if the slot is already booked
    toast.error("This slot is already booked. Please choose another time.");
    return; // Exit if the time is booked
  } else {
    // Proceed with the selection logic if the slot is not booked
    setSelectedTime(time); // Update selected time
    dispatch(setBookingTime(time)); // Dispatch action to store booking time
  }
};
  
  const handleBookAppointment = async () => {
    if (!user) {
      toast.error('Please login to book appointments');
      navigate('/login');
      return;
    }

    const finalPatientId = getPatientId();
    if (!finalPatientId) {
      toast.error('Unable to verify patient information');
      return;
    }

    if (!selectedDate || !selectedTime || !doctorId) {
      toast.error("Please select a date and time."); 
      return;
    }

     // Double-check if time is still available
     if (bookedTimes.includes(selectedTime)) {
      toast.error("This time slot is no longer available. Please select another time.");
      return;
    }
    

  const appointmentData = {
      patientId: finalPatientId,
      doctorId: doctor.id || doctor._id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
    };
   
    try {
      const resultAction = await dispatch(bookAppointment(appointmentData));
      
      if (bookAppointment.fulfilled.match(resultAction)) {
        toast.success("Appointment booked successfully!");
        await dispatch(fetchAppointments());
        navigate('/appointments');
      } else {
        throw new Error(resultAction.error.message || "Booking failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to book appointment");
    }
  };

  if (!doctor) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Doctor not found.</p>
        <Button onClick={() => navigate('/doctors')} className="mt-4">
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
                    date < new Date(new Date().setHours(0, 0, 0, 0)) ||  // Only disable dates before today
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
           
                

                availableTimes.map((time) => {
                  const isBooked = bookedTimes.includes(time);
                  return (
                    // <Button
                    //   key={time}
                    //   variant={selectedTime === time ? "default" : "outline"}
                    //   className={cn(
                    //     "px-4 py-2 text-sm font-medium",
                    //     selectedTime === time ? "bg-blue-500 text-white" : 
                    //     isBooked ? "bg-gray-100 text-gray-400 cursor-not-allowed" : 
                    //     "hover:bg-gray-200"
                    //   )}
                    //   onClick={() => !isBooked && handleTimeSelect(time)}
                    //   disabled={isBooked}
                    // >
                    //   {time}
                    //   {isBooked && " (Booked)"}
                    // </Button>

                    <div key={time} className="booking-slot">

                    <Button
          // key={time}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            selectedTime === time 
              ? "bg-blue-600 text-white shadow-md" 
              : isBooked
                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-blue-300"
          )}
          onClick={() => !isBooked && handleTimeSelect(time)}
          disabled={isBooked}
          aria-disabled={isBooked}
        >
          {time}
          {isBooked && (
            <span className="block text-xs mt-1 text-gray-500">Booked</span>
          )}
        </Button>
        </div>
                  );
                })
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
            disabled={!selectedDate || !selectedTime || bookingStatus === 'loading'}
            onClick={handleBookAppointment}
          >
            {bookingStatus === 'loading' ? 'Booking...' : 'Confirm Appointment'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppointmentBooking;