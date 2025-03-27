import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ role }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
      
      {role === 'Admin' && (
        <div className="space-y-4">
          <Link to="/admin/pending-doctors" className="block bg-blue-500 text-white p-4 rounded-lg">Manage Pending Doctors</Link>
          <Link to="/admin/users" className="block bg-green-500 text-white p-4 rounded-lg">View All Users</Link>
        </div>
      )}

      {role === 'Doctor' && (
        <div className="space-y-4">
          <Link to="/doctor/appointments" className="block bg-purple-500 text-white p-4 rounded-lg">View Your Appointments</Link>
          <Link to="/doctor/profile" className="block bg-yellow-500 text-white p-4 rounded-lg">Manage Your Profile</Link>
        </div>
      )}

      {role === 'Patient' && (
        <div className="space-y-4">
          <Link to="/patient/book-appointment" className="block bg-teal-500 text-white p-4 rounded-lg">Book an Appointment</Link>
          <Link to="/patient/appointments" className="block bg-indigo-500 text-white p-4 rounded-lg">View Your Appointments</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
