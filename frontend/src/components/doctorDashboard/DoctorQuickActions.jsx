import React from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { CalendarPlus, FilePlus, Upload } from 'lucide-react';

const DoctorQuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Button 
        variant="outline" 
        className="flex items-center justify-center gap-2 p-6 text-medical-secondary border-medical-secondary"
        onClick={() => navigate('/doctor/availability')}
      >
        <CalendarPlus className="w-5 h-5" />
        Set Availability
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center justify-center gap-2 p-6 text-medical-secondary border-medical-secondary"
        onClick={() => navigate('/doctor/patients')}
      >
        <FilePlus className="w-5 h-5" />
        View Patients
      </Button>

      <Button 
        variant="outline" 
        className="flex items-center justify-center gap-2 p-6 text-medical-secondary border-medical-secondary"
        onClick={() => navigate('/doctor/prescriptions')}
      >
        <Upload className="w-5 h-5" />
        Upload Prescription
      </Button>
    </div>
  );
};

export default DoctorQuickActions;


