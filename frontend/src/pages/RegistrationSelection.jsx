import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User } from 'lucide-react';

const RegistrationSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Registration Page</h1>

        {/* Register as Doctor */}
        <button
          className="w-full mb-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
          onClick={() => navigate('/register-doctor')}
        >
          <span className="bg-white rounded-full p-2 mr-3">
            <Stethoscope className="w-6 h-6 text-blue-500" />
          </span>
          REGISTER AS DOCTOR
        </button>

        {/* Register as Patient */}
        <button
          className="w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
          onClick={() => navigate('/register-patient')}
        >
          <span className="bg-white rounded-full p-2 mr-3">
            <User className="w-6 h-6 text-green-500" />
          </span>
          REGISTER AS A PATIENT
        </button>
      </div>
    </div>
  );
};

export default RegistrationSelection;

