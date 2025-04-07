import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAppSelector } from '../hooks/useAppSelector';
import { Card, CardContent} from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

const AppointmentsPage = () => {
  const { appointments } = useAppSelector(state => state.appointments);

  const upcomingAppointments = appointments.filter(
    app => app.status !== 'completed' && app.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(
    app => app.status === 'completed' || app.status === 'cancelled'
  );

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  

  const getStatusColor = (status) => {
    switch (status) {
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingAppointments.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500 mb-4">You don't have any upcoming appointments.</p>
                <Button 
                  onClick={() => window.location.href = '/doctors'}
                  className="bg-medical-primary hover:bg-medical-secondary"
                >
                  Book an Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {upcomingAppointments.map((appointment) => (
                // <Card key={appointment.id}>
                // <Card key={appointment.id || appointment._id}>
                <Card
                key={
                  appointment._id ??
                  appointment.id ??
                  (appointment.doctorName && appointment.date && appointment.time
                    ? `${appointment.doctorName}-${appointment.date}-${appointment.time}`
                    : Math.random())
                }
              >

                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="text-xl font-semibold text-medical-secondary">{appointment.doctorName}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {/* {appointment.status?.charAt(0).toUpperCase() + appointment.status.slice(1)} */}
                            {appointment.status
  ? appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)
  : 'N/A'}

                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{appointment.specialization}</p>

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
                        <Button variant="outline" className="text-medical-secondary border-medical-secondary hover:bg-medical-light flex-1">Reschedule</Button>
                        <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 flex-1">Cancel</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastAppointments.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-gray-500">You don't have any past appointment records.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {pastAppointments.map((appointment) => (
                // <Card key={appointment.id}>
                // <Card key={appointment.id || appointment._id}>
                <Card
                key={
                  appointment._id ??
                  appointment.id ??
                  (appointment.doctorName && appointment.date && appointment.time
                    ? `${appointment.doctorName}-${appointment.date}-${appointment.time}`
                    : Math.random())
                }
              >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h3 className="text-xl font-semibold text-medical-secondary">{appointment.doctorName}</h3>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{appointment.specialization}</p>

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

                      <div>
                        {appointment.status === 'completed' && (
                          <Button variant="outline" className="text-medical-secondary border-medical-secondary hover:bg-medical-light w-full mb-2">View Prescription</Button>
                        )}
                        <Button variant="outline" className="text-medical-primary border-medical-primary hover:bg-medical-light w-full">Book Again</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsPage;
