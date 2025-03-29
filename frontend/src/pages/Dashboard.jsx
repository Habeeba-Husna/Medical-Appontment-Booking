import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaUserMd, FaCalendarAlt, FaClipboardList, FaRegCalendarCheck } from 'react-icons/fa';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';

const Dashboard = ({ role }) => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* <Navbar /> */}

        {/* Welcome Message */}
        {/* <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1> */}

        {role === 'Admin' && (
          <div className="space-y-4">
            <Link to="/admin/pending-doctors" className="flex items-center space-x-4 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
              <FaUserMd />
              <span>Manage Pending Doctors</span>
            </Link>
            <Link to="/admin/users" className="flex items-center space-x-4 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600">
              <FaUsers />
              <span>View All Users</span>
            </Link>
          </div>
        )}

        {role === 'Doctor' && (
          <div className="space-y-4">
            <Link to="/doctor/appointments" className="flex items-center space-x-4 bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600">
              <FaCalendarAlt />
              <span>View Your Appointments</span>
            </Link>
            <Link to="/doctor/profile" className="flex items-center space-x-4 bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600">
              <FaUserMd />
              <span>Manage Your Profile</span>
            </Link>
          </div>
        )}

        {role === 'Patient' && (
          <div className="space-y-4">
            <Link to="/patient/book-appointment" className="flex items-center space-x-4 bg-teal-500 text-white p-4 rounded-lg hover:bg-teal-600">
              <FaRegCalendarCheck />
              <span>Book an Appointment</span>
            </Link>
            <Link to="/patient/appointments" className="flex items-center space-x-4 bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600">
              <FaClipboardList />
              <span>View Your Appointments</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
