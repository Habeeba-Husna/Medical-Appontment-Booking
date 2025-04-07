import React from 'react';
import QuickActions from '../components/dashboard/QuickActions';
import UpcomingAppointments from '../components/dashboard/UpcomingAppointments';
import { useAppSelector } from '../hooks/useAppSelector';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';

const DashboardPage = () => {
  // const { name } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.auth);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || 'User'}</h1>
        <p className="text-gray-500">Manage your health journey from your personal dashboard</p>
      </div>
      
      <QuickActions />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Health Tips</CardTitle>
              <CardDescription>Wellness recommendations for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-medical-light rounded-lg">
                <h3 className="font-medium text-medical-secondary mb-2">Stay Hydrated</h3>
                <p className="text-sm text-gray-600">Drinking adequate water daily is essential for maintaining energy and overall health.</p>
              </div>
              <div className="p-4 bg-medical-light rounded-lg">
                <h3 className="font-medium text-medical-secondary mb-2">Regular Exercise</h3>
                <p className="text-sm text-gray-600">Aim for at least 30 minutes of moderate activity most days of the week.</p>
              </div>
              <div className="p-4 bg-medical-light rounded-lg">
                <h3 className="font-medium text-medical-secondary mb-2">Mental Wellness</h3>
                <p className="text-sm text-gray-600">Practice mindfulness or meditation to reduce stress and improve mental clarity.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;


