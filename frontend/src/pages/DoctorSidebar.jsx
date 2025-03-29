import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaClipboardList, FaChartLine } from 'react-icons/fa';

const DoctorSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 shadow-xl flex flex-col items-center transition-all duration-300 ${isExpanded ? 'w-80' : 'w-24'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="space-y-8 mt-16">
        <li>
          <Link to="/doctor/appointments" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaCalendarAlt size={32} />
            {isExpanded && <span className="text-xl font-semibold">Appointments</span>}
          </Link>
        </li>
        <li>
          <Link to="/doctor/profile" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaUserMd size={32} />
            {isExpanded && <span className="text-xl font-semibold">Profile</span>}
          </Link>
        </li>
        <li>
          <Link to="/doctor/medical-records" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaClipboardList size={32} />
            {isExpanded && <span className="text-xl font-semibold">Medical Records</span>}
          </Link>
        </li>
        <li>
          <Link to="/doctor/statistics" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaChartLine size={32} />
            {isExpanded && <span className="text-xl font-semibold">Reports</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DoctorSidebar;
