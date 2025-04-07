// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Star, MapPin, CalendarDays } from 'lucide-react';
// import { Button } from '../ui/Button';
// import { Card, CardContent } from '../ui/Card';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
// import { Badge } from '../ui/Badge';
// import { useAppDispatch } from '../../hooks/useAppDispatch';
// import fetchDoctors  from '../../store/slices/doctorSlice';
// // import { Doctor } from '../../store/slices/doctorSlice';

// const DoctorCard = ({ doctor }) => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleViewProfile = () => {
//     dispatch(selectDoctor(doctor.id));
//     navigate(`/doctors/${doctor.id}`);
//   };

//   const handleBookAppointment = () => {
//     dispatch(selectDoctor(doctor.id));
//     navigate(`/book-appointment/${doctor.id}`);
//   };

//   return (
//     <Card className="overflow-hidden hover:shadow-md transition-shadow">
//       <CardContent className="p-0">
//         <div className="p-5">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//             <Avatar className="h-16 w-16 border-2 border-medical-light">
//               <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
//               <AvatarFallback className="bg-medical-primary text-white">
//                 {doctor.name.split(' ').map(n => n[0]).join('')}
//               </AvatarFallback>
//             </Avatar>
            
//             <div className="flex-1">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                   <h3 className="font-semibold text-lg">{doctor.name}</h3>
//                   <p className="text-gray-500 text-sm">{doctor.specialization}</p>
//                 </div>
                
//                 <div className="flex items-center mt-2 sm:mt-0">
//                   <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                   <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
//                 </div>
//               </div>
              
//               <div className="mt-2 flex flex-wrap gap-2">
//                 <Badge variant="outline" className="bg-medical-light text-medical-secondary border-medical-light">
//                   {doctor.experience} years exp
//                 </Badge>
//                 <div className="flex items-center text-sm text-gray-500">
//                   <MapPin className="h-3 w-3 mr-1" />
//                   <span>{doctor.clinicDetails.location}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex items-center mt-4 text-sm">
//             <CalendarDays className="h-4 w-4 mr-2 text-medical-secondary" />
//             <span className="text-gray-600">Next available: Today, {doctor.availableSlots[0]?.times[0]}</span>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-100 p-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
//           <Button 
//             variant="outline" 
//             className="flex-1 sm:flex-none border-medical-secondary text-medical-secondary hover:bg-medical-light"
//             onClick={handleViewProfile}
//           >
//             View Profile
//           </Button>
//           <Button 
//             className="flex-1 sm:flex-none bg-medical-primary hover:bg-medical-secondary"
//             onClick={handleBookAppointment}
//           >
//             Book Appointment
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DoctorCard;




// import { Star, MapPin, CalendarDays } from 'lucide-react';
// import { Button } from '../ui/Button';
// import { Card, CardContent } from '../ui/Card';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
// import { Badge } from '../ui/Badge';
// import { useAppDispatch } from '../../hooks/useAppDispatch';


// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const DoctorCard = ({ doctor }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
//       <img src={doctor.photo || '/doctor-placeholder.png'} alt="Doctor" className="w-full h-40 object-cover rounded" />
//       <h3 className="text-lg font-semibold mt-3">{doctor.fullName}</h3>
//       <p className="text-sm text-gray-600">{doctor.specialization}</p>
//       <p className="text-sm">Experience: {doctor.experience} years</p>
//       <p className="text-sm">Rating: {doctor.rating || 'N/A'}</p>
//       <p className="text-sm">Location: {doctor.clinicLocation || 'Not Provided'}</p>
//       <p className="text-sm mb-2">Next Available: {doctor.nextAvailable || 'Not Available'}</p>

//       <div className="flex gap-2 mt-2">
//         <button
//           className="bg-blue-600 text-white px-3 py-1 rounded"
//           onClick={() => navigate(`/doctor/${doctor._id}`)}
//         >
//           View Profile
//         </button>
//         <button
//           className="bg-green-500 text-white px-3 py-1 rounded"
//           onClick={() => navigate(`/book-appointment/${doctor._id}`)}
//         >
//           Book Appointment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorCard;



// import React from 'react';
// import { Star, MapPin, CalendarDays } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// import { Button } from '../ui/Button';
// import { Card, CardContent } from '../ui/Card';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
// import { Badge } from '../ui/Badge';

// const DoctorCard = ({ doctor }) => {
//   const navigate = useNavigate();

//   return (
//     <Card className="w-full max-w-sm rounded-xl shadow-md hover:shadow-lg transition duration-200">
//       <CardContent className="p-4">
//         <div className="flex flex-col items-center">
//           <Avatar className="w-24 h-24 mb-4">
//             <AvatarImage
//               src={doctor.photo || '/doctor-placeholder.png'}
//               alt={doctor.fullName}
//             />
//             <AvatarFallback>{doctor.fullName?.charAt(0)}</AvatarFallback>
//           </Avatar>

//           <h3 className="text-xl font-semibold text-center">
//             {doctor.fullName}
//           </h3>
//           <p className="text-sm text-muted-foreground text-center">
//             {doctor.specialization}
//           </p>

//           <div className="flex items-center gap-1 text-sm mt-2 text-gray-700">
//             <Star className="text-yellow-500" size={16} />
//             <span>Rating: {doctor.rating || 'N/A'}</span>
//           </div>

//           <div className="flex items-center gap-1 text-sm mt-1 text-gray-700">
//             <MapPin size={16} />
//             <span>{doctor.clinicLocation || 'Not Provided'}</span>
//           </div>

//           <div className="flex items-center gap-1 text-sm mt-1 text-gray-700">
//             <CalendarDays size={16} />
//             <span>Next: {doctor.nextAvailable || 'Not Available'}</span>
//           </div>

//           <Badge variant="secondary" className="mt-2">
//             {doctor.experience} yrs experience
//           </Badge>

//           <div className="flex gap-3 mt-4">
//             <Button
//               variant="outline"
//               onClick={() => navigate(`/doctor/${doctor._id}`)}
//             >
//               View Profile
//             </Button>
//             <Button
//               variant="default"
//               onClick={() => navigate(`/book-appointment/${doctor._id}`)}
//             >
//               Book Appointment
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DoctorCard;



// import React from 'react';
// import { Star, MapPin, CalendarDays } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// import { Button } from '../ui/Button';
// import { Card, CardContent } from '../ui/Card';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
// import { Badge } from '../ui/Badge';

// const DoctorCard = ({ doctor }) => {
//   const navigate = useNavigate();

//   return (
//     <Card className="w-full p-4 shadow-md rounded-xl relative">
//       {/* Top-right rating */}
//       <div className="absolute top-4 right-4 flex items-center text-yellow-500 font-semibold">
//         <Star className="w-4 h-4 fill-yellow-500 mr-1" />
//         <span>{doctor.rating || 'N/A'}</span>
//       </div>

//       <CardContent className="p-0">
//         <div className="flex items-start gap-6">
//           {/* Doctor Photo */}
//           <Avatar className="w-20 h-20">
//             <AvatarImage
//               src={doctor.photo || '/doctor-placeholder.png'}
//               alt={doctor.fullName}
//             />
//             <AvatarFallback>{doctor.fullName?.charAt(0)}</AvatarFallback>
//           </Avatar>

//           {/* Doctor Info */}
//           <div className="flex flex-col flex-grow">
//             <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
//             <p className="text-sm text-muted-foreground">{doctor.specialization}</p>

//             <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700 mt-2">
//               <Badge variant="secondary">
//                 {doctor.experience} yrs exp
//               </Badge>
//               <div className="flex items-center gap-1">
//                 <MapPin size={16} />
//                 <span>{doctor.clinicLocation || 'Not Provided'}</span>
//               </div>
//             </div>

//             <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
//               <CalendarDays size={16} />
//               <span>Next available: {doctor.nextAvailable || 'Not Available'}</span>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-3 mt-4">
//               <Button
//                 variant="outline"
//                 onClick={() => navigate(`/doctor/${doctor._id}`)}
//               >
//                 View Profile
//               </Button>
//               <Button
//                 onClick={() => navigate(`/book-appointment/${doctor._id}`)}
//               >
//                 Book Appointment
//               </Button>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DoctorCard;


// import React from 'react';
// import { Star, MapPin, CalendarDays } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// import { Button } from '../ui/Button';
// import { Card, CardContent } from '../ui/Card';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';
// import { Badge } from '../ui/Badge';

// const DoctorCard = ({ doctor }) => {
//   const navigate = useNavigate();

//   return (
//     <Card className="w-full p-4 shadow-md rounded-xl relative">
//       {/* Top-right rating */}
//       <div className="absolute top-4 right-4 flex items-center text-yellow-500 font-semibold">
//         <Star className="w-4 h-4 fill-yellow-500 mr-1" />
//         <span>{doctor.rating || 'N/A'}</span>
//       </div>

//       <CardContent className="p-0">
//         <div className="flex items-start gap-6">
//           {/* Doctor Photo */}
//           <Avatar className="w-20 h-20">
//             <AvatarImage
//               src={doctor.photo || '/doctor-placeholder.png'}
//               alt={doctor.fullName}
//             />
//             <AvatarFallback>{doctor.fullName?.charAt(0)}</AvatarFallback>
//           </Avatar>

//           {/* Doctor Info */}
//           <div className="flex flex-col flex-grow">
//             <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
//             <p className="text-sm text-gray-500">{doctor.specialization}</p>

//             <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
//               <span className="bg-sky-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//                 {doctor.experience} yrs exp
//               </span>

//               <div className="flex items-center gap-1 text-gray-700">
//                 <MapPin size={16} />
//                 <span>{doctor.clinicLocation || 'Not Provided'}</span>
//               </div>
//             </div>

//            {/* Calendar row */}
// <div className="flex items-center gap-1 text-sm text-gray-700 mt-1">
//   <CalendarDays size={16} className="text-blue-800" />
//   <span>Next available: {doctor.nextAvailable || 'Not Available'}</span>
// </div>

// {/* Full-width button row styled like a table row */}
// <div className="w-full bg-gray-100 mt-4 p-3 rounded">
//   <div className="flex flex-col sm:flex-row gap-3 w-full">
//     <Button
//       variant="outline"
//       className="w-full sm:w-auto border-blue-800 text-blue-800 hover:bg-sky-200 hover:text-black"
//       onClick={() => navigate(`/doctor/${doctor._id}`)}
//     >
//       View Profile
//     </Button>
//     <Button
//       className="w-full sm:w-auto bg-sky-400 text-white hover:bg-blue-800"
//       onClick={() => navigate(`/book-appointment/${doctor._id}`)}
//     >
//       Book Appointment
//     </Button>
//   </div>
// </div>

//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DoctorCard;


// import React from 'react';
// import { Star, MapPin, CalendarDays } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// import { Button } from '../ui/Button';
// import { Card, CardContent } from '../ui/Card';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

// const DoctorCard = ({ doctor }) => {
//   const navigate = useNavigate();

//   return (
//     <Card className="w-full p-4 shadow-md rounded-xl relative">
//       {/* Top-right rating */}
//       <div className="absolute top-4 right-4 flex items-center text-yellow-500 font-semibold">
//         <Star className="w-4 h-4 fill-yellow-500 mr-1" />
//         <span>{doctor.rating || 'N/A'}</span>
//       </div>

//       <CardContent className="p-0">
//         <div className="flex gap-4">
//           {/* Doctor Photo */}
//           <div className="flex flex-col items-center">
//             <Avatar className="w-20 h-20 mb-2">
//               <AvatarImage
//                 src={doctor.photo || '/doctor-placeholder.png'}
//                 alt={doctor.fullName}
//               />
//               <AvatarFallback>{doctor.fullName?.charAt(0)}</AvatarFallback>
//             </Avatar>

//             {/* Calendar info under photo */}
//             <div className="flex items-center gap-1 text-sm text-gray-700">
//               <CalendarDays size={16} className="text-blue-800" />
//               <span>Next available: {doctor.nextAvailable || 'Not Available'}</span>
//             </div>
//           </div>

//           {/* Doctor Info */}
//           <div className="flex flex-col justify-center">
//             <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
//             <p className="text-sm text-gray-500">{doctor.specialization}</p>

//             <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
//               <span className="bg-sky-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
//                 {doctor.experience} yrs exp
//               </span>

//               <div className="flex items-center gap-1 text-gray-700">
//                 <MapPin size={16} />
//                 <span>{doctor.clinicLocation || 'Not Provided'}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Full-width button row below everything */}
//         <div className="w-full bg-gray-100 mt-4 p-3 rounded">
//           <div className="flex flex-col sm:flex-row gap-3 w-full">
//             <Button
//               variant="outline"
//               className="w-full sm:w-auto border-blue-800 text-blue-800 hover:bg-sky-200 hover:text-black"
//               onClick={() => navigate(`/doctor/${doctor._id}`)}
//             >
//               View Profile
//             </Button>
//             <Button
//               className="w-full sm:w-auto bg-sky-400 text-white hover:bg-blue-800"
//               onClick={() => navigate(`/book-appointment/${doctor._id}`)}
//             >
//               Book Appointment
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DoctorCard;


import React from 'react';
import { Star, MapPin, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <Card className="w-full p-4 shadow-md rounded-xl relative">
      {/* Top-right rating */}
      <div className="absolute top-4 right-4 flex items-center text-yellow-500 font-semibold">
        <Star className="w-4 h-4 fill-yellow-500 mr-1" />
        <span>{doctor.rating || 'N/A'}</span>
      </div>

      <CardContent className="p-0">
        {/* Top row: Small photo and text info */}
        <div className="flex gap-4 items-start">
          <Avatar className="w-14 h-14">
            <AvatarImage
              src={doctor.photo || '/doctor-placeholder.png'}
              alt={doctor.fullName}
            />
            <AvatarFallback>{doctor.fullName?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>

            <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
              <span className="bg-sky-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                {doctor.experience} yrs exp
              </span>

              <div className="flex items-center gap-1 text-gray-700">
                <MapPin size={16} />
                <span>{doctor.clinicLocation || 'Not Provided'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar below photo and info */}
        <div className="flex items-center gap-1 text-sm text-gray-700 mt-4 ml-1">
          <CalendarDays size={16} className="text-blue-800" />
          <span>Next available: {doctor.nextAvailable || 'Not Available'}</span>
        </div>

        {/* Full-width buttons */}
        <div className="w-full bg-gray-100 mt-4 p-3 rounded">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-blue-800 text-blue-800 hover:bg-sky-200 hover:text-black"
              onClick={() => navigate(`/doctor/${doctor._id}`)}
            >
              View Profile
            </Button>
            <Button
              className="w-full sm:w-auto bg-sky-400 text-white hover:bg-blue-800"
              onClick={() => navigate(`/book-appointment/${doctor._id}`)}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
