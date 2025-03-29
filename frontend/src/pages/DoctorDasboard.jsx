import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaClipboardList, FaChartLine } from 'react-icons/fa';

const DoctorDashboard = () => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      {/* <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard, Doctor</h1> */}

      <div className="space-y-4">
        <Link to="/doctor/appointments" className="flex items-center space-x-4 bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600">
          <FaCalendarAlt size={24} />
          <span>View Your Appointments</span>
        </Link>

        <Link to="/doctor/profile" className="flex items-center space-x-4 bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600">
          <FaUserMd size={24} />
          <span>Manage Your Profile</span>
        </Link>

        <Link to="/doctor/medical-records" className="flex items-center space-x-4 bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
          <FaClipboardList size={24} />
          <span>View Patient Medical Records</span>
        </Link>

        <Link to="/doctor/statistics" className="flex items-center space-x-4 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600">
          <FaChartLine size={24} />
          <span>View Statistics and Reports</span>
        </Link>
      </div>
    </div>
  );
};

export default DoctorDashboard;
