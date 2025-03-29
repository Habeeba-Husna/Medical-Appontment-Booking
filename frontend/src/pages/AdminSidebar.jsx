import React, { useState } from 'react';
import { FaUserMd, FaUsers, FaCalendarAlt, FaFileAlt, FaExclamationCircle, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    console.log('Admin Logout clicked');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 shadow-xl flex flex-col items-center transition-all duration-300 ${isExpanded ? 'w-80' : 'w-24'}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <h1 className={`text-2xl font-bold mb-8 ${isExpanded ? 'block' : 'hidden'}`}>Admin Dashboard</h1>
      <nav>
        <ul className="space-y-8 mt-8">
          <li onClick={() => setActiveTab('doctors')} className="cursor-pointer flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg w-full">
            <FaUserMd size={32} />
            {isExpanded && <span className="text-xl font-semibold">Manage Doctors</span>}
          </li>
          <li onClick={() => setActiveTab('patients')} className="cursor-pointer flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg w-full">
            <FaUsers size={32} />
            {isExpanded && <span className="text-xl font-semibold">Manage Patients</span>}
          </li>
          <li onClick={() => setActiveTab('appointments')} className="cursor-pointer flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg w-full">
            <FaCalendarAlt size={32} />
            {isExpanded && <span className="text-xl font-semibold">Manage Appointments</span>}
          </li>
          <li onClick={() => setActiveTab('reports')} className="cursor-pointer flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg w-full">
            <FaFileAlt size={32} />
            {isExpanded && <span className="text-xl font-semibold">Generate Reports</span>}
          </li>
          <li onClick={() => setActiveTab('disputes')} className="cursor-pointer flex items-center justify-center space-x-4 hover:bg-blue-700 p-5 rounded-lg w-full">
            <FaExclamationCircle size={32} />
            {isExpanded && <span className="text-xl font-semibold">Manage Disputes</span>}
          </li>
          <li onClick={handleLogout} className="cursor-pointer flex items-center justify-center space-x-4 text-red-400 mt-8 p-5 hover:bg-red-700 rounded-lg w-full">
            <FaSignOutAlt size={32} />
            {isExpanded && <span className="text-xl font-semibold">Logout</span>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
