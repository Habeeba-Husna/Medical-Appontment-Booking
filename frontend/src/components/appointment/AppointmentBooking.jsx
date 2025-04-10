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
// import { useToast } from '../../hooks/use-toast';
import { cn } from '../../lib/utils';
// import { toast } from "sonner";
import { toast } from 'react-toastify';


import {
  setBookingDate,
  setBookingTime,
  bookAppointment,
  fetchAppointments,
} from '../../store/slices/appointmentSlice';
import { fetchDoctors } from '../../store/slices/doctorSlice';


const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const AppointmentBooking = () => {
  // const { doctorId } = useParams();
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [availableTimes, setAvailableTimes] = useState([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { toast } = useToast();

  // const doctors = useSelector((state) => state.doctors.list);
  const { list: doctors } = useSelector((state) => state.doctors);
  const user = useSelector((state) => state.auth?.user);
  const appointments = useSelector((state) => state.appointments.appointments);
  const { status: bookingStatus } = useSelector((state) => state.appointments);

  const decoded = user?.accessToken ? jwtDecode(user.accessToken) : {};
const patientId = user?.role === 'Patient' ? (decoded?.id || user?.id) : null;
const { doctorId } = useParams();

  const doctorList = doctors?.doctors || [];
  const doctor = doctorList.find(d => d._id === doctorId || d.id === doctorId);

// console.log("asdfgh..........",doctor)
  
  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchAppointments());
  }, [dispatch]);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       await dispatch(fetchAppointments());
  //       await dispatch(fetchDoctors());
  //     } catch (error) {
  //       toast.error(error.message || 'Failed to load data');
  //     }
  //   };
  //   loadData();
  // }, [dispatch]);



  useEffect(() => {
    setSelectedTime(undefined);

    if (selectedDate && doctor) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const DEFAULT_TIMES = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
      const slot = doctor.availableSlots?.find(s => s.date === dateStr);
      const doctorAvailableTimes = slot ? slot.times : DEFAULT_TIMES;

      const bookedTimes = appointments
        ?.filter(app => (app.doctorId === doctorId || app.doctorId === doctor._id) && app.date === dateStr)
        .map(app => app.time);

      const remainingTimes = doctorAvailableTimes.filter(time => !bookedTimes.includes(time)).sort();
      setAvailableTimes(remainingTimes);
    }
  }, [selectedDate, doctor, appointments, doctorId]);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      dispatch(setBookingDate(format(date, 'yyyy-MM-dd')));
    }
  };

  // const handleTimeSelect = (time) => {
  //   setSelectedTime(time);
  //   dispatch(setBookingTime(time));
  // };

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
    
    setSelectedTime(time);
    dispatch(setBookingTime(time));
  };

  
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !doctorId || !patientId) {
      // toast.error("Please select a date and time."); 
      toast.success("Your appointment has been scheduled.")
      navigate('/appointments')
      return;
    }

    const appointmentData = {
      patientId,
      doctorId: doctor.id || doctor._id,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedTime,
    };
   
    try {
      const resultAction = await dispatch(bookAppointment(appointmentData));
      
      if (bookAppointment.fulfilled.match(resultAction)) {
        toast.success("Your appointment has been scheduled.");
        navigate('/appointments');
      } else {
        throw new Error(resultAction.error.message || "Booking failed");
      }
    } catch (error) {
      toast.error(error.message || "Booking failed. Try again later.");
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
