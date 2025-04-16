import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-50 py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Your Health, <span className="text-blue-600">Our Priority</span>
          </h1>
          <p className="text-md text-gray-700 mt-4 max-w-lg mx-auto md:mx-0">
            Connect with top healthcare professionals, book appointments, and manage your medical records — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
            <button 
              className="bg-blue-600 text-white px-6 py-2 text-sm rounded-lg"
              onClick={() => navigate('/login')}
            >
              Register as Patient
            </button>
            <button 
              className="border border-blue-600 text-blue-600 px-6 py-2 text-sm rounded-lg"
              onClick={() => navigate('/doctors')}
            >
              Join as Doctor
            </button>
          </div>
          <div className="mt-10 flex justify-center md:justify-start space-x-12">
            <div className="flex items-center space-x-2">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-bold">
                500+
              </div>
              <span className="text-gray-600 text-md">Doctors</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-bold">
                24/7
              </div>
              <span className="text-gray-600 text-md">Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-bold">
                10k+
              </div>
              <span className="text-gray-600 text-md">Patients</span>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg" 
            // src="https://cdn.dribbble.com/userupload/11768356/file/…1a30a60351cc.jpg?resize=1600x1200&vertical=center"
            alt="Health" 
            className="w-full max-w-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;





