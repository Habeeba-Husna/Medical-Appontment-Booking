import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Menu, User, LogOut } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/Dropdown-menu';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { logoutUser } from '../../../store/slices/authSlice';
import { toast } from 'react-toastify';

const DashboardHeader = ({ toggleSidebar }) => {
  const { name, user } = useAppSelector(state => state.auth);
  const role = user?.role || 'User';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
      navigate('/login');
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">
            {user?.fullName ? `Welcome 😊, ${user.fullName}` : 'Welcome 😊'}
              </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  {user?.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt={user?.fullName || 'User'} />
                  ) : (
                    <AvatarFallback className="bg-medical-primary text-white">
                      {getInitials(name)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                  <p className="text-xs leading-none text-gray-500 capitalize">{role}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Bell, Menu, User, LogOut, Search } from 'lucide-react';
// import { Button } from '../../ui/Button';
// import { Input } from '../../ui/Input';
// import { Avatar, AvatarFallback, AvatarImage } from '../../ui/Avatar';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../../ui/Dropdown-menu';
// import { useAppDispatch, useAppSelector } from '../../../hooks';
// import { logoutUser } from '../../../store/slices/authSlice';
// // import { logout } from '../../../store/slices/authSlice';

// import { toast } from 'react-toastify';

// const DashboardHeader = ({ toggleSidebar }) => {
//   const { name, user } = useAppSelector(state => state.auth);
//   const role = user?.role || 'User'; 
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap();
//       // dispatch(logout());
//       toast.success('Logged out successfully');
//       navigate('/login');
//     } catch (error) {
//       toast.error(error.message || 'Logout failed');
//       // Still navigate to login since we cleared client-side tokens
//       navigate('/login');
//     }
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name
//       .split(' ')
//       .map(part => part[0])
//       .join('')
//       .toUpperCase();
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
//             <Menu className="h-5 w-5" />
//           </Button>

//           <div className="flex flex-col">
//             <h1 className="text-xl font-semibold">Welcome, {user?.fullName || 'User'}</h1>
//           </div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="icon" className="relative">
//             <Bell className="h-5 w-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   {user?.avatarUrl ? (
//                     <AvatarImage src={user.avatarUrl} alt={name || 'User'} />
//                   ) : (
//                     <AvatarFallback className="bg-medical-primary text-white">
//                       {getInitials(name)}
//                     </AvatarFallback>
//                   )}
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">{name}</p>
//                   <p className="text-xs leading-none text-gray-500 capitalize">{role}</p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => navigate('/profile')}>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;



















//direct login
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Bell, Menu, User, LogOut, Search } from 'lucide-react';
// import { Button } from '../../ui/Button';
// import { Input } from '../../ui/Input';
// import { Avatar, AvatarFallback, AvatarImage } from '../../ui/Avatar';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '../../ui/Dropdown-menu';
// import { useAppDispatch, useAppSelector } from '../../../hooks';
// import { logoutUser } from '../../../store/slices/authSlice';

// const DashboardHeader = ({ toggleSidebar }) => {
//   const { name, user } = useAppSelector(state => state.auth);

//   const role = user?.role || 'User'; 

//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate('/');
//   };

//   const getInitials = (name) => {
//     if (!name) return 'U';
//     return name
//       .split(' ')
//       .map(part => part[0])
//       .join('')
//       .toUpperCase();
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
//       <div className="flex items-center justify-between px-4 py-3">
//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
//             <Menu className="h-5 w-5" />
//           </Button>

// <div className="flex flex-col">
//             <h1 className="text-xl font-semibold">Welcome, {user?.fullName || 'User'}</h1>
//             {/* <p className="text-sm text-gray-500 capitalize">Logged in as {role}</p> */}
//           </div>
//         </div>

//         <div className="flex items-center space-x-4">
//           <Button variant="ghost" size="icon" className="relative">
//             <Bell className="h-5 w-5" />
//             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//           </Button>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   {user?.avatarUrl ? (
//                     <AvatarImage src={user.avatarUrl} alt={name || 'User'} />
//                   ) : (
//                     <AvatarFallback className="bg-medical-primary text-white">
//                       {getInitials(name)}
//                     </AvatarFallback>
//                   )}
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">{name}</p>
//                   {/* <p className="text-xs leading-none text-gray-500">Patient</p> */}

//                   <p className="text-xs leading-none text-gray-500 capitalize">{role}</p>

                  
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => navigate('/profile')}>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
//                 <LogOut className="mr-2 h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader;

