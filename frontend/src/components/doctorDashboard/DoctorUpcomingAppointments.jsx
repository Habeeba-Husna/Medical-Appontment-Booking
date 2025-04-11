import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import PatientDetailsModal from '../../pagess/PatientDetailsModal';

const DoctorUpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

//   const fetchAppointments = async () => {
//     try {
//       const { data } = await axios.get('/api/doctor/appointments/upcoming');
//       console.log('Fetched appointments:', data); 
//       setAppointments(Array.isArray(data) ? data : data.appointments || []);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : appointments.length === 0 ? (
          <p>No upcoming appointments.</p>
        ) : (
          appointments.map((appt) => (
            <div key={appt._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="font-medium">{appt.patientName}</p>
                <p className="text-sm text-gray-600">
                  {new Date(appt.date).toLocaleString()} | {appt.reason}
                </p>
              </div>
              <div className="mt-2 sm:mt-0 flex gap-2">
                <PatientDetailsModal patient={appt.patient} />
                <Button size="sm" variant="default">Accept</Button>
                <Button size="sm" variant="destructive">Reject</Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorUpcomingAppointments;

