// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { logoutUser } from './pathToActions'; // Update the path to your actions file

// const LogoutButton = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Dispatch the logout action
//     dispatch(logoutUser())
//       .then(() => {
//         // After successful logout, redirect to the login page
//         navigate('/login');  // You can navigate to '/home' or any other page
//       })
//       .catch((error) => {
//         console.error('Logout failed:', error);
//       });
//   };

//   return (
//     <button onClick={handleLogout}>Logout</button>
//   );
// };

// export default LogoutButton;
