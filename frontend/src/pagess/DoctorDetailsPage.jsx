// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';
// import { ENDPOINTS } from '../api/endPoints';

// const DoctorDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showFullAbout, setShowFullAbout] = useState(false); // toggle for read more

//   const fetchDoctorDetails = async () => {
//     try {
//       const response = await axiosInstance.get(ENDPOINTS.PATIENT.SINGLE_DOCTOR(id));
//       setDoctor(response.data);
//     } catch (error) {
//       console.error('Error fetching doctor details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctorDetails();
//   }, [id]);

//   if (loading) return <p className="p-6 text-center text-blue-600 font-semibold">Loading doctor details...</p>;
//   if (!doctor) return <p className="p-6 text-center text-red-500">Doctor not found.</p>;

//   // handle truncation
//   const aboutText = doctor.about || 'No description provided by the doctor.';
//   const isLong = aboutText.length > 250;
//   const displayedAbout = showFullAbout || !isLong ? aboutText : aboutText.substring(0, 250) + '...';

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <div className="bg-white shadow-lg rounded-xl overflow-hidden md:flex">
//         {/* Left - Image */}
//         <div className="md:w-1/3 bg-blue-50 flex items-center justify-center p-6">
//           <img
//             src={doctor.imageUrl || '/doctor-placeholder.png'}
//             alt={doctor.fullName}
//             className="w-48 h-48 object-cover rounded-full border-4 border-blue-200"
//           />
//         </div>

//         {/* Right - Info */}
//         <div className="md:w-2/3 p-6 space-y-4">
//           <h2 className="text-3xl font-bold text-blue-800">{doctor.fullName}</h2>
//           <p className="text-gray-700 text-lg"><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
//           <p className="text-gray-700"><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
//           <p className="text-gray-700"><span className="font-semibold">Qualifications:</span> {doctor.qualifications}</p>
//           <p className="text-gray-700"><span className="font-semibold">Clinic:</span> {doctor.clinicDetails || 'N/A'}</p>
//           <p className="text-gray-700"><span className="font-semibold">Next Available:</span> {doctor.nextAvailable || 'Not Available'}</p>

//           {/* Rating */}
//           <div className="mt-2">
//             <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
//               ⭐ {doctor.rating || 'Not Rated'}
//             </span>
//           </div>

//           {/* About Section with Read More / Read Less */}
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold text-blue-700 mb-1">About Doctor</h3>
//             <p className="text-gray-600 leading-relaxed whitespace-pre-line">
//               {displayedAbout}
//             </p>
//             {isLong && (
//               <button
//                 onClick={() => setShowFullAbout(!showFullAbout)}
//                 className="text-blue-600 text-sm mt-1 hover:underline focus:outline-none"
//               >
//                 {showFullAbout ? 'Read Less' : 'Read More'}
//               </button>
//             )}
//           </div>


//           {/* Available Slots Section */}
// {doctor.availableSlots && doctor.availableSlots.length > 0 && (
//   <div className="mt-6">
//     <h3 className="text-lg font-semibold text-blue-700 mb-3">Available Time Slots</h3>
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {doctor.availableSlots.map((slot, index) => (
//         <div
//           key={index}
//           className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm"
//         >
//           <p className="text-blue-800 font-medium">{slot.day}</p>
//           <p className="text-gray-700 text-sm">
//             {slot.startTime} - {slot.endTime}
//           </p>
//         </div>
//       ))}
//     </div>
//   </div>
// )}


//           {/* Buttons */}
//           <div className="mt-6 flex flex-col sm:flex-row gap-3">
//             <button
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
//               onClick={() => navigate(`/book-appointment/${doctor._id}`)}
//             >
//               Book Appointment
//             </button>
//             <button
//               className="border border-gray-400 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 transition"
//               onClick={() => navigate('/doctors')}
//             >
//               Back to Doctors
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDetailsPage;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import axiosInstance from '../api/axiosInstance';
// import { ENDPOINTS } from '../api/endPoints';
import { fetchDoctorById } from '../store/slices/doctorSlice';

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [doctor, setDoctor] = useState(null);

  // const [loading, setLoading] = useState(true);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const { singleDoctor: doctor, loading, error } = useSelector((state) => state.doctors);

  // const fetchDoctorDetails = async () => {
  //   try {
  //     const response = await axiosInstance.get(ENDPOINTS.PATIENT.SINGLE_DOCTOR(id));
  //     setDoctor(response.data);
  //   } catch (error) {
  //     console.error('Error fetching doctor details:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDoctorById();
  // }, [id]);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
  }, [id, dispatch]);

  if (loading) return <p className="p-6 text-center text-blue-600 font-semibold">Loading doctor details...</p>;
  if (!doctor) return <p className="p-6 text-center text-red-500">Doctor not found.</p>;

  const aboutText = doctor.about || 'No description provided by the doctor.';
  const isLong = aboutText.length > 250;
  const displayedAbout = showFullAbout || !isLong ? aboutText : aboutText.substring(0, 250) + '...';

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden md:flex">
        {/* Image */}
        <div className="md:w-1/3 bg-blue-50 flex items-center justify-center p-6">
          <img
            src={doctor.imageUrl || '/doctor-placeholder.png'}
            alt={doctor.fullName}
            className="w-48 h-48 object-cover rounded-full border-4 border-blue-200 shadow-md"
          />
        </div>

        {/* Info */}
        <div className="md:w-2/3 p-6 space-y-4">
          <h2 className="text-3xl font-bold text-blue-800">{doctor.fullName}</h2>
          <p className="text-gray-800 text-lg"><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
          <p className="text-gray-700"><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
          <p className="text-gray-700"><span className="font-semibold">Qualifications:</span> {doctor.qualifications}</p>
          <p className="text-gray-700"><span className="font-semibold">Clinic:</span> {doctor.clinicDetails || 'N/A'}</p>
          <p className="text-gray-700"><span className="font-semibold">Next Available:</span> {doctor.nextAvailable || 'Not Available'}</p>

          {/* Rating */}
          <div className="mt-2">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium shadow-sm">
              ⭐ {doctor.rating || 'Not Rated'}
            </span>
          </div>

          {/* About with Read More */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-1">About Doctor</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {displayedAbout}
            </p>
            {isLong && (
              <button
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="text-blue-600 text-sm mt-1 hover:underline focus:outline-none font-medium"
              >
                {showFullAbout ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>

          {/* Slots */}
          {doctor.availableSlots?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-blue-700 mb-3">Available Time Slots</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {doctor.availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition"
                  >
                    <p className="text-blue-800 font-semibold">{slot.day}</p>
                    <p className="text-gray-700 text-sm">{slot.startTime} - {slot.endTime}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md"
              onClick={() => navigate(`/book-appointment/${doctor._id}`)}
            >
              Book Appointment
            </button>
            <button
              // className="bg-white border border-gray-400 text-gray-800 font-medium px-6 py-3 rounded-lg hover:bg-gray-100 hover:text-blue-700 transition shadow-sm"
              className="bg-gray-300 text-gray-800 font-medium px-6 py-3 rounded-lg transition duration-200 hover:bg-gray-600 hover:text-white"
              onClick={() => navigate('/doctors')}
            >
              ← Back to Doctors
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;

