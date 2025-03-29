import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaChevronDown, FaSignOutAlt, FaUserMd, FaUserShield } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice'; 

const Navbar = ({ role = 'Patient' }) => {
  const dispatch = useDispatch();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Fetch user details from Redux store
  const userName = useSelector((state) => state.auth.user?.fullName || 'User');

  const handleLogout = () => {
    console.log(`${role} Logout clicked`);
    dispatch(logoutUser()); 
    // window.location.href = '/login';
  };

  // Role-based Config
  const roleDetails = {
    Patient: {
      icon: <FaUserCircle className="text-3xl" />,
      editProfileText: 'Edit Profile',
      welcomeMessage: `Welcome to your dashboard, ${userName}!`,
    },
    Doctor: {
      icon: <FaUserMd className="text-3xl text-green-500" />,
      editProfileText: 'Manage Profile',
      welcomeMessage: `Hello Dr. ${userName}, manage your appointments here!`,
    },
    Admin: {
      icon: <FaUserShield className="text-3xl text-red-500" />,
      editProfileText: 'Admin Settings',
      welcomeMessage: `Welcome back, Admin ${userName}!`,
    },
  };

  return (
    <div>
      {/* Navbar Section */}
      <header className="flex justify-end items-center p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-lg mb-8">
        <div className="flex items-center space-x-6">
          {/* Notification Icon */}
          <FaBell className="text-2xl cursor-pointer hover:text-yellow-300" />

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              {roleDetails[role]?.icon}
              <span className="ml-2 font-semibold">{userName}</span>
              <FaChevronDown className="ml-2" />
            </div>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 bg-white text-gray-800 shadow-md p-4 w-52 rounded-lg mt-2 border border-gray-200">
                <p className="mb-2 text-lg font-semibold">{userName}</p>
                <button className="text-blue-500 hover:text-blue-700 mb-2 w-full text-left">
                  {roleDetails[role]?.editProfileText}
                </button>
                <button
                  className="flex items-center text-red-500 hover:text-red-700 w-full text-left"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Dashboard Area with Welcome Message */}
      <main className="p-6">
        <h2 className="text-2xl font-semibold mb-4">{roleDetails[role]?.welcomeMessage}</h2>
        <p className="text-gray-700">
          Here you can find all your relevant information and manage your account.
        </p>
      </main>
    </div>
  );
};

export default Navbar;


