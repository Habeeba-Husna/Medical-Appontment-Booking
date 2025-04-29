//converted

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, CalendarDays, FileText, Clock, MessageSquare } from 'lucide-react';

const ActionCard = ({ icon, title, description, onClick }) => (
  <div className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
    <div className="p-6 flex flex-col items-center text-center">
      <div className="p-4 rounded-full bg-medical-light text-medical-primary mb-4">
        {icon}
      </div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <p className="text-gray-500">Access important features quickly</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ActionCard
          icon={<Stethoscope className="h-6 w-6" />}
          title="Find Doctor"
          description="Search for specialists"
          onClick={() => navigate('/doctors')}
        />
        <ActionCard
          icon={<CalendarDays className="h-6 w-6" />}
          title="Book Appointment"
          description="Schedule a consultation"
          onClick={() => navigate('/doctors')}
        />
        <ActionCard
          icon={<Clock className="h-6 w-6" />}
          title="Appointment History"
          description="View past consultations"
          onClick={() => navigate('/appointments')}
        />
        <ActionCard
          icon={<FileText className="h-6 w-6" />}
          title="Medical Records"
          description="Access your health data"
          onClick={() => navigate('/records')}
        />
        <ActionCard
          icon={<MessageSquare className="h-6 w-6" />}
          title="Teleconsultation"
          description="Virtual appointments"
          onClick={() => navigate('/appointments')}
        />
      </div>
    </div>
  );
};

export default QuickActions;