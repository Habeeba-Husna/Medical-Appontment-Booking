// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import DoctorCard from './DoctorCard';
// import { Input } from '../ui/Input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
// import { Search, Filter } from 'lucide-react';

// const DoctorList = () => {
//   // const { doctors } = useSelector(state => state.doctors);
//   const { doctors = [] } = useSelector(state => state.doctors || {});

//   const [searchTerm, setSearchTerm] = useState('');
//   const [specialization, setSpecialization] = useState('all');

//   const specializations = Array.from(
//     new Set(doctors.map(doctor => doctor.specialization))
//   );

//   const filteredDoctors = doctors.filter(doctor => {
//     const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesSpecialization = specialization === 'all' ? 
//                                  true : 
//                                  doctor.specialization === specialization;
    
//     return matchesSearch && matchesSpecialization;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="space-y-4">
//         <h2 className="text-2xl font-semibold">Find Doctors</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//             <Input
//               placeholder="Search by name or specialization"
//               className="pl-10"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
          
//           <div className="flex w-full md:w-60">
//             <div className="relative flex-1">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
//               <Select
//                 value={specialization}
//                 onValueChange={setSpecialization}
//               >
//                 <SelectTrigger className="pl-10">
//                   <SelectValue placeholder="All Specializations" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Specializations</SelectItem>
//                   {specializations.map(spec => (
//                     <SelectItem key={spec} value={spec}>
//                       {spec}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {filteredDoctors.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-lg">
//           <p className="text-gray-500">No doctors found. Try adjusting your search.</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6">
//           {filteredDoctors.map(doctor => (
//             <DoctorCard key={doctor.id} doctor={doctor} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorList;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../store/slices/doctorSlice';
import DoctorCard from './DoctorCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';

const DoctorList = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.doctors);
  const doctors = list?.doctors || [];

  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('All Specializations');

  useEffect(() => {
    console.log(doctors," bf doctorlist pagw")
    dispatch(fetchDoctors());
    console.log(doctors," af doctorlist pagw")
  }, [dispatch]);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch = doc.fullName.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialization =
      specialization === 'All Specializations' || doc.specialization === specialization;
    return matchesSearch && matchesSpecialization;
  });

  const uniqueSpecializations = [
    'All Specializations',
    ...new Set(doctors.map((doc) => doc.specialization)),
  ];

  return (
    <div className="pt-2 px-5 pb-5 space-y-3">
      <h2 className="text-2xl font-bold">Find Doctors</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        {/* Search input with icon */}
        <div className="relative w-full md:w-2/3 ">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by dr name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-4 py-2 border rounded w-full text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
  <div className="relative w-full md:w-1/3">
    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    <select
      value={specialization}
      onChange={(e) => setSpecialization(e.target.value)}
      className="pl-12 pr-4 py-2 border rounded w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
    >
      {uniqueSpecializations.map((spec, idx) => (
        <option key={idx} value={spec}
        className="bg-green-50 text-gray-800 hover:bg-green-100"
        >
          {spec}
        </option>
      ))}
    </select>
  </div>
</div>

      {/* Doctor Cards */}
      {loading ? (
        <p>Loading doctors...</p>
      ) : filteredDoctors.length > 0 ? (
        <div className="flex flex-col gap-6 w-full ">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorList;




