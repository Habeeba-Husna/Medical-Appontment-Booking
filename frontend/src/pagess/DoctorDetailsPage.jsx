import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endPoints';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.PATIENT.SINGLE_DOCTOR(id));
      setDoctor(response.data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  if (loading) return <p className="p-5">Loading doctor details...</p>;
  if (!doctor) return <p className="p-5 text-red-500">Doctor not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={doctor.photo || '/doctor-placeholder.png'}
          alt="Doctor"
          className="w-full md:w-1/3 h-auto rounded-lg shadow"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{doctor.fullName}</h2>
          <p className="text-gray-600">Specialization: {doctor.specialization}</p>
          <p className="text-gray-600">Experience: {doctor.experience} years</p>
          <p className="text-gray-600">Qualifications: {doctor.qualifications}</p>
          <p className="text-gray-600">Rating: {doctor.rating || 'N/A'}</p>
          <p className="text-gray-600">Clinic: {doctor.clinicName || 'N/A'}</p>
          <p className="text-gray-600">Location: {doctor.clinicLocation || 'Not Available'}</p>
          <p className="text-gray-600">Next Available: {doctor.nextAvailable || 'Not Available'}</p>
          <p className="text-gray-600">About: {doctor.about || 'No description provided.'}</p>

          <div className="flex gap-3 mt-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => navigate(`/book-appointment/${doctor._id}`)}
            >
              Book Appointment
            </button>
            <button
              className="border border-gray-400 px-4 py-2 rounded text-gray-700"
              onClick={() => navigate('/doctors')}
            >
              Back to Doctors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;
