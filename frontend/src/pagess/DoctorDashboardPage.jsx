import React, { useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import DoctorSidebar from '../components/doctorDashboard/DoctorSidebar';
import DashboardHeader from '../components/patient/dashboard/DashboardHeaders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import DoctorQuickActions from '../components/doctorDashboard/DoctorQuickActions';
import DoctorUpcomingAppointments from '../components/doctorDashboard/DoctorUpcomingAppointments';
import Notifications from '../components/doctorDashboard/Notifications';

const DoctorDashboardPage = () => {
  const { user } = useAppSelector(state => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <DoctorSidebar isOpen={sidebarOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">

        <main className="p-6 overflow-y-auto">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {user?.name || 'Doctor'}</h1>
              <p className="text-gray-500">Manage your appointments, consultations, and reports from your dashboard.</p>
            </div>

            <DoctorQuickActions />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <DoctorUpcomingAppointments />
                <Notifications />
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Medical News</CardTitle>
                    <CardDescription>Latest updates from the medical world</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-medical-light rounded-lg">
                      <h3 className="font-medium text-medical-secondary mb-2">Telemedicine Guidelines</h3>
                      <p className="text-sm text-gray-600">Stay up to date with telehealth regulations and best practices.</p>
                    </div>
                    <div className="p-4 bg-medical-light rounded-lg">
                      <h3 className="font-medium text-medical-secondary mb-2">New Treatments</h3>
                      <p className="text-sm text-gray-600">Explore the latest research in chronic illness management.</p>
                    </div>
                    <div className="p-4 bg-medical-light rounded-lg">
                      <h3 className="font-medium text-medical-secondary mb-2">Mental Health Trends</h3>
                      <p className="text-sm text-gray-600">Track trends in anxiety, depression, and patient recovery strategies.</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardPage;