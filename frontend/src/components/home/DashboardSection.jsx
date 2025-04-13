// import { useNavigate } from "react-router-dom";
// import { FaUserMd, FaUserInjured, FaUserShield } from "react-icons/fa";
// import { getUserInfoFromCookies } from "../../utils/authHelpers"; 

// const DashboardSection = ({ userRole }) => {
//   const navigate = useNavigate();
//   const { token } = getUserInfoFromCookies();


//   const handleRedirect = (expectedRole, path) => {
//     if (token && userRole === expectedRole) {
//       navigate(path);
//     } else {
//       navigate("/login");
//     }
//   };


//   return (
//     <section className="py-12 bg-gradient-to-r from-sky-100 to-indigo-100 text-center shadow-inner">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">
//         {/* Go to Your Dashboard */}Access Your Dashboard
//       </h2>

//       <div className="flex flex-wrap justify-center gap-8 px-4">

//         {(userRole === "Patient" || userRole === "Doctor") && (
//           <>
//             <div
//              onClick={() => handleRedirect("Patient", "/dashboard1")}
//               className="cursor-pointer w-48 bg-blue-500 hover:bg-blue-600 text-white py-5 px-4 rounded-xl shadow-md transform hover:scale-105 transition duration-300 flex flex-col items-center"
//             >
//               <FaUserInjured className="text-3xl mb-2" />
//               <span className="text-lg font-semibold">Patient </span>
//             </div>

//             <div
//                onClick={() => handleRedirect("Doctor", "/dashboard2")}
//               className="cursor-pointer w-48 bg-green-500 hover:bg-green-600 text-white py-5 px-4 rounded-xl shadow-md transform hover:scale-105 transition duration-300 flex flex-col items-center"
//             >
//               <FaUserMd className="text-3xl mb-2" />
//               <span className="text-lg font-semibold">Doctor </span>
//             </div>
//           </>
//         )}

//         {userRole === "Admin" && (
//           <div
//           onClick={() => handleRedirect("Admin", "/dashboard3")}
//             className="cursor-pointer w-48 bg-red-500 hover:bg-red-600 text-white py-5 px-4 rounded-xl shadow-md transform hover:scale-105 transition duration-300 flex flex-col items-center"
//           >
//             <FaUserShield className="text-3xl mb-2" />
//             <span className="text-lg font-semibold">Admin </span>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default DashboardSection;


