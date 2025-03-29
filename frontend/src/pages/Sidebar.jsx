import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThLarge, FaCalendarCheck, FaClipboardList, FaUserMd } from 'react-icons/fa';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 shadow-xl flex flex-col items-center transition-all duration-300 ${isExpanded ? 'w-80' : 'w-24'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <ul className="space-y-8 mt-24 w-full">
        <li>
          <Link to="/dashboard" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaThLarge size={40} className="min-w-[40px]" />
            {isExpanded && <span className="text-xl font-semibold">Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/appointments" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaCalendarCheck size={40} className="min-w-[40px]" />
            {isExpanded && <span className="text-xl font-semibold">Appointments</span>}
          </Link>
        </li>
        <li>
          <Link to="/medical-records" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaClipboardList size={40} className="min-w-[40px]" />
            {isExpanded && <span className="text-xl font-semibold">Medical Records</span>}
          </Link>
        </li>
        <li>
          <Link to="/search-doctors" className="flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg transition duration-300 w-full">
            <FaUserMd size={40} className="min-w-[40px]" />
            {isExpanded && <span className="text-xl font-semibold">Search Doctors</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;