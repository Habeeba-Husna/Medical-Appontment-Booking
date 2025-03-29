import React, { useState } from 'react';
// import AdminSidebar from './AdminSidebar';
import ManageDoctors from '../components/AdminSection/ManageDoctors';
// import ManagePatients from './ManagePatients';
// import ManageAppointments from './ManageAppointments';
// import Reports from './Reports';
// import ManageDisputes from './ManageDisputes';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctors');

  const renderContent = () => {
    switch (activeTab) {
      case 'doctors':
        return <ManageDoctors />;
      case 'patients':
        return <ManagePatients />;
      case 'appointments':
        return <ManageAppointments />;
      case 'reports':
        return <Reports />;
      case 'disputes':
        return <ManageDisputes />;
      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* <AdminSidebar setActiveTab={setActiveTab} /> */}
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;