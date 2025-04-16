// import React from 'react';
// import { Button } from '../ui/Button';
// import { useNavigate } from 'react-router-dom';
// import { CalendarPlus, FilePlus, Upload } from 'lucide-react';

// const DoctorQuickActions = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//       <Button 
//         variant="outline" 
//         className="flex items-center justify-center gap-2 p-6 text-medical-secondary border-medical-secondary"
//         onClick={() => navigate('/doctor/availability')}
//       >
//         <CalendarPlus className="w-5 h-5" />
//         Set Availability
//       </Button>
      
//       <Button 
//         variant="outline" 
//         className="flex items-center justify-center gap-2 p-6 text-medical-secondary border-medical-secondary"
//         onClick={() => navigate('/doctor/patients')}
//       >
//         <FilePlus className="w-5 h-5" />
//         View Patients
//       </Button>

//       <Button 
//         variant="outline" 
//         className="flex items-center justify-center gap-2 p-6 text-medical-secondary border-medical-secondary"
//         onClick={() => navigate('/doctor/prescriptions')}
//       >
//         <Upload className="w-5 h-5" />
//         Upload Prescription
//       </Button>
//     </div>
//   );
// };

// export default DoctorQuickActions;


import { Calendar, Users, MessageSquare, CreditCard } from "lucide-react";
import { StatsCard } from "../ui/statsCard";

const DoctorQuickActions = () => {
  const totalAppointments = 8;
  const completedAppointments = 3;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Today's Appointments"
        value={totalAppointments.toString()}
        description={`${completedAppointments} completed`}
        icon={Calendar}
        titleClassName="text-gray-500"
      />
      <StatsCard
        title="Total Patients"
        value="156"
        icon={Users}
        trend={{ value: 12, isPositive: true }}
      />
      <StatsCard
        title="Consultations This Week"
        value="28"
        icon={MessageSquare}
        trend={{ value: 8, isPositive: true }}
      />
      <StatsCard
        title="This Month's Earnings"
        value="$4,850"
        icon={CreditCard}
        trend={{ value: 15, isPositive: true }}
      />
    </div>
  );
};

export default DoctorQuickActions;
