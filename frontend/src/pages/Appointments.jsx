// Appointments.js
import React, { useState } from 'react';
import { FaSort, FaVideo, FaPhoneAlt } from 'react-icons/fa';

const doctorData = [
  { name: 'Dr. Smith', experience: '10 Years', qualification: 'MD', specialization: 'Cardiologist', location: 'New York', availableDays: 'Mon-Sat', time: '2:00 PM - 3:00 PM' },
  { name: 'Dr. John', experience: '8 Years', qualification: 'MBBS', specialization: 'Dermatologist', location: 'Los Angeles', availableDays: 'Tue-Fri', time: '11:00 AM - 12:00 PM' }
];

const Appointments = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search Doctor or Specialization"
          className="p-3 border rounded-lg w-3/4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-gray-200 p-3 rounded-lg flex items-center">
          <FaSort className="mr-2" /> Sort By
        </button>
      </div>
      <div className="space-y-4">
        {doctorData.map((doctor, index) => (
          <div key={index} className="flex items-center bg-white p-4 shadow-lg rounded-lg">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div className="flex-1 ml-6">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p>Experience: {doctor.experience}</p>
              <p>Qualification: {doctor.qualification}</p>
              <p>Specialization: {doctor.specialization}</p>
              <p>Location: {doctor.location}</p>
              <p>Available Days: {doctor.availableDays}</p>
              <p>Time: {doctor.time}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="bg-green-500 text-white p-2 rounded-lg flex items-center">
                <FaVideo className="mr-2" /> Video Call
              </button>
              <button className="bg-blue-500 text-white p-2 rounded-lg flex items-center">
                <FaPhoneAlt className="mr-2" /> Audio Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
