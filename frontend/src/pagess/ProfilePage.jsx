
// import React, { useState } from 'react';
// import {Button } from '../components/ui/Button';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
// import {Input} from '../components/ui/Input';
// import {Textarea} from '../components/ui/Textarea';
// import { Label } from '../components/ui/label';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
// import { useAppSelector } from '../hooks/useAppSelector';
// import { useToast } from '../hooks/use-toast';

// const ProfilePage = () => {
//   const { name, email } = useAppSelector(state => state.auth);
//   const { toast } = useToast();

//   const [profileData, setProfileData] = useState({
//     fullName: name || '',
//     email: email || '',
//     phone: '(123) 456-7890',
//     age: '35',
//     gender: 'Male',
//     address: '123 Main St, New York, NY 10001',
//     bloodGroup: 'O+',
//     emergencyContact: 'Jane Doe - (123) 456-7899',
//   });
  
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
  
//   const [medicalHistory, setMedicalHistory] = useState({
//     allergies: 'Peanuts, Penicillin',
//     chronicConditions: 'Asthma',
//     currentMedications: 'Albuterol inhaler',
//     pastSurgeries: 'Appendectomy (2015)',
//     familyHistory: 'Diabetes (mother), Hypertension (father)',
//   });
  
//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleMedicalHistoryChange = (e) => {
//     const { name, value } = e.target;
//     setMedicalHistory(prev => ({ ...prev, [name]: value }));
//   };
  
//   const handleProfileSubmit = (e) => {
//     e.preventDefault();
//     toast({
//       title: "Profile Updated",
//       description: "Your profile information has been updated successfully.",
//     });
//   };
  
//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast({
//         title: "Error",
//         description: "New passwords do not match.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     toast({
//       title: "Password Updated",
//       description: "Your password has been changed successfully.",
//     });
    
//     setPasswordData({
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//   };
  
//   const handleMedicalHistorySubmit = (e) => {
//     e.preventDefault();
//     toast({
//       title: "Medical History Updated",
//       description: "Your medical history has been updated successfully.",
//     });
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
//     <div>
//       <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
//         <div className="space-y-6">
//           <Card>
//             <CardContent className="p-6 flex flex-col items-center">
//               <Avatar className="h-24 w-24 mb-4">
//                 <AvatarImage src="" alt={name || 'User'} />
//                 <AvatarFallback className="bg-medical-primary text-white text-xl">
//                   {getInitials(name)}
//                 </AvatarFallback>
//               </Avatar>
//               <h2 className="text-xl font-semibold mb-1">{name}</h2>
//               <p className="text-gray-500 mb-4">{email}</p>
//               <Button 
//                 variant="outline" 
//                 className="w-full text-medical-secondary border-medical-secondary"
//               >
//                 Change Photo
//               </Button>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardHeader>
//               <CardTitle>Account Verification</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <span>Email</span>
//                   <span className="text-sm text-green-600 font-medium">Verified</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span>Phone Number</span>
//                   <span className="text-sm text-green-600 font-medium">Verified</span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span>Identity</span>
//                   <span className="text-sm text-yellow-600 font-medium">Pending</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
        
//         <div>
//           <Tabs defaultValue="personal" className="w-full">
//             <TabsList className="mb-6">
//               <TabsTrigger value="personal">Personal Information</TabsTrigger>
//               <TabsTrigger value="medical">Medical History</TabsTrigger>
//               <TabsTrigger value="security">Security Settings</TabsTrigger>
//             </TabsList>
            
//             <TabsContent value="personal">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Personal Information</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <form onSubmit={handleProfileSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="fullName">Full Name</Label>
//                         <Input 
//                           id="fullName"
//                           name="fullName"
//                           value={profileData.fullName}
//                           onChange={handleProfileChange}
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="email">Email</Label>
//                         <Input 
//                           id="email"
//                           name="email"
//                           type="email"
//                           value={profileData.email}
//                           onChange={handleProfileChange}
//                           disabled
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="phone">Phone Number</Label>
//                         <Input 
//                           id="phone"
//                           name="phone"
//                           value={profileData.phone}
//                           onChange={handleProfileChange}
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="age">Age</Label>
//                         <Input 
//                           id="age"
//                           name="age"
//                           value={profileData.age}
//                           onChange={handleProfileChange}
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="gender">Gender</Label>
//                         <Input 
//                           id="gender"
//                           name="gender"
//                           value={profileData.gender}
//                           onChange={handleProfileChange}
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="bloodGroup">Blood Group</Label>
//                         <Input 
//                           id="bloodGroup"
//                           name="bloodGroup"
//                           value={profileData.bloodGroup}
//                           onChange={handleProfileChange}
//                         />
//                       </div>
                      
//                       <div className="space-y-2 md:col-span-2">
//                         <Label htmlFor="address">Address</Label>
//                         <Input 
//                           id="address"
//                           name="address"
//                           value={profileData.address}
//                           onChange={handleProfileChange}
//                         />
//                       </div>
                      
//                       <div className="space-y-2 md:col-span-2">
//                         <Label htmlFor="emergencyContact">Emergency Contact</Label>
//                         <Input 
//                           id="emergencyContact"
//                           name="emergencyContact"
//                           value={profileData.emergencyContact}
//                           onChange={handleProfileChange}
//                         />
//                       </div>
//                     </div>
                    
//                     <Button 
//                       type="submit"
//                       className="bg-medical-primary hover:bg-medical-secondary"
//                     >
//                       Save Changes
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="medical">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Medical History</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <form onSubmit={handleMedicalHistorySubmit} className="space-y-4">
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="allergies">Allergies</Label>
//                         <Textarea 
//                           id="allergies"
//                           name="allergies"
//                           value={medicalHistory.allergies}
//                           onChange={handleMedicalHistoryChange}
//                           placeholder="List any allergies you have"
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="chronicConditions">Chronic Conditions</Label>
//                         <Textarea 
//                           id="chronicConditions"
//                           name="chronicConditions"
//                           value={medicalHistory.chronicConditions}
//                           onChange={handleMedicalHistoryChange}
//                           placeholder="List any chronic conditions"
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="currentMedications">Current Medications</Label>
//                         <Textarea 
//                           id="currentMedications"
//                           name="currentMedications"
//                           value={medicalHistory.currentMedications}
//                           onChange={handleMedicalHistoryChange}
//                           placeholder="List medications you're currently taking"
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="pastSurgeries">Past Surgeries</Label>
//                         <Textarea 
//                           id="pastSurgeries"
//                           name="pastSurgeries"
//                           value={medicalHistory.pastSurgeries}
//                           onChange={handleMedicalHistoryChange}
//                           placeholder="List any past surgeries with dates"
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="familyHistory">Family Medical History</Label>
//                         <Textarea 
//                           id="familyHistory"
//                           name="familyHistory"
//                           value={medicalHistory.familyHistory}
//                           onChange={handleMedicalHistoryChange}
//                           placeholder="Any relevant family medical history"
//                         />
//                       </div>
//                     </div>
                    
//                     <Button 
//                       type="submit"
//                       className="bg-medical-primary hover:bg-medical-secondary"
//                     >
//                       Save Medical History
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </TabsContent>
            
//             <TabsContent value="security">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Change Password</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <form onSubmit={handlePasswordSubmit} className="space-y-4">
//                     <div className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor="currentPassword">Current Password</Label>
//                         <Input 
//                           id="currentPassword"
//                           name="currentPassword"
//                           type="password"
//                           value={passwordData.currentPassword}
//                           onChange={handlePasswordChange}
//                           required
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="newPassword">New Password</Label>
//                         <Input 
//                           id="newPassword"
//                           name="newPassword"
//                           type="password"
//                           value={passwordData.newPassword}
//                           onChange={handlePasswordChange}
//                           required
//                         />
//                       </div>
                      
//                       <div className="space-y-2">
//                         <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                         <Input 
//                           id="confirmPassword"
//                           name="confirmPassword"
//                           type="password"
//                           value={passwordData.confirmPassword}
//                           onChange={handlePasswordChange}
//                           required
//                         />
//                       </div>
//                     </div>
                    
//                     <Button 
//                       type="submit"
//                       className="bg-medical-primary hover:bg-medical-secondary"
//                     >
//                       Change Password
//                     </Button>
//                   </form>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;




import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { useToast } from '../hooks/use-toast';
import { 
  fetchPatientProfile, 
  updatePatientProfile,
  updatePatientPhoto,
  changePassword 
} from '../features/patient/patientSlice';

// Validation schemas
const profileSchema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  age: yup.number().positive().integer().min(1).max(120),
  gender: yup.string().oneOf(['Male', 'Female', 'Other']),
  address: yup.string(),
  bloodGroup: yup.string(),
  emergencyContact: yup.string(),
});

const passwordSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

const medicalHistorySchema = yup.object().shape({
  allergies: yup.string(),
  chronicConditions: yup.string(),
  currentMedications: yup.string(),
  pastSurgeries: yup.string(),
  familyHistory: yup.string(),
});

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { patient, loading, error } = useAppSelector(state => state.patient);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Initialize forms
  const { 
    register: registerProfile, 
    handleSubmit: handleProfileSubmit, 
    formState: { errors: profileErrors },
    reset: resetProfile
  } = useForm({
    resolver: yupResolver(profileSchema)
  });

  const { 
    register: registerPassword, 
    handleSubmit: handlePasswordSubmit, 
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm({
    resolver: yupResolver(passwordSchema)
  });

  const { 
    register: registerMedical, 
    handleSubmit: handleMedicalSubmit, 
    formState: { errors: medicalErrors },
    reset: resetMedical
  } = useForm({
    resolver: yupResolver(medicalHistorySchema)
  });

  // Load patient data on component mount
  useEffect(() => {
    dispatch(fetchPatientProfile());
  }, [dispatch]);

  // Reset forms when patient data is loaded
  useEffect(() => {
    if (patient) {
      resetProfile({
        fullName: patient.fullName,
        email: patient.email,
        phoneNumber: patient.phoneNumber,
        age: patient.age,
        gender: patient.gender,
        address: patient.address || '',
        bloodGroup: patient.bloodGroup || '',
        emergencyContact: patient.emergencyContact || '',
      });

      resetMedical({
        allergies: patient.medicalHistory?.allergies || '',
        chronicConditions: patient.medicalHistory?.chronicConditions || '',
        currentMedications: patient.medicalHistory?.currentMedications || '',
        pastSurgeries: patient.medicalHistory?.pastSurgeries || '',
        familyHistory: patient.medicalHistory?.familyHistory || '',
      });
    }
  }, [patient, resetProfile, resetMedical]);

  // Handle profile update
  const onSubmitProfile = async (data) => {
    try {
      await dispatch(updatePatientProfile(data)).unwrap();
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  // Handle password change
  const onSubmitPassword = async (data) => {
    try {
      await dispatch(changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      })).unwrap();
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      resetPassword();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    }
  };

  // Handle medical history update
  const onSubmitMedical = async (data) => {
    try {
      await dispatch(updatePatientProfile({ medicalHistory: data })).unwrap();
      toast({
        title: "Medical History Updated",
        description: "Your medical history has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update medical history",
        variant: "destructive",
      });
    }
  };

  // Handle file selection for photo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match('image.*')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      
      await dispatch(updatePatientPhoto(formData)).unwrap();
      
      toast({
        title: "Photo Updated",
        description: "Your profile photo has been updated successfully.",
      });
      
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload photo",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (loading && !patient) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Left sidebar */}
        <div className="space-y-6">
          {/* Profile card */}
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage 
                  src={patient?.photoUrl || ''} 
                  alt={patient?.fullName || 'User'} 
                />
                <AvatarFallback className="bg-blue-600 text-white text-2xl">
                  {getInitials(patient?.fullName)}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-semibold mb-1">{patient?.fullName}</h2>
              <p className="text-gray-500 mb-4">{patient?.email}</p>
              
              <div className="w-full space-y-2">
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="profilePhoto"
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  Select Photo
                </label>
                {selectedFile && (
                  <Button
                    onClick={handlePhotoUpload}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Verification status */}
          <Card>
            <CardHeader>
              <CardTitle>Account Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email</span>
                  <span className="text-sm font-medium text-green-600">
                    {patient?.isEmailVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Phone Number</span>
                  <span className="text-sm font-medium text-green-600">
                    {patient?.isPhoneVerified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Identity</span>
                  <span className="text-sm font-medium text-yellow-600">
                    {patient?.isIdentityVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
            </TabsList>
            
            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit(onSubmitProfile)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          {...registerProfile('fullName')}
                          error={profileErrors.fullName?.message}
                        />
                        {profileErrors.fullName && (
                          <p className="text-sm text-red-600">{profileErrors.fullName.message}</p>
                        )}
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          {...registerProfile('email')}
                          disabled
                        />
                      </div>
                      
                      {/* Phone Number */}
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          {...registerProfile('phoneNumber')}
                          error={profileErrors.phoneNumber?.message}
                        />
                        {profileErrors.phoneNumber && (
                          <p className="text-sm text-red-600">{profileErrors.phoneNumber.message}</p>
                        )}
                      </div>
                      
                      {/* Age */}
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          {...registerProfile('age')}
                          error={profileErrors.age?.message}
                        />
                        {profileErrors.age && (
                          <p className="text-sm text-red-600">{profileErrors.age.message}</p>
                        )}
                      </div>
                      
                      {/* Gender */}
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select
                          id="gender"
                          {...registerProfile('gender')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      {/* Blood Group */}
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group</Label>
                        <Input
                          id="bloodGroup"
                          {...registerProfile('bloodGroup')}
                        />
                      </div>
                      
                      {/* Address */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          {...registerProfile('address')}
                        />
                      </div>
                      
                      {/* Emergency Contact */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="emergencyContact">Emergency Contact</Label>
                        <Input
                          id="emergencyContact"
                          {...registerProfile('emergencyContact')}
                          placeholder="Name and phone number"
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Medical History Tab */}
            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMedicalSubmit(onSubmitMedical)} className="space-y-6">
                    <div className="space-y-4">
                      {/* Allergies */}
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies</Label>
                        <Textarea
                          id="allergies"
                          {...registerMedical('allergies')}
                          placeholder="List any allergies you have"
                          rows={3}
                        />
                      </div>
                      
                      {/* Chronic Conditions */}
                      <div className="space-y-2">
                        <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                        <Textarea
                          id="chronicConditions"
                          {...registerMedical('chronicConditions')}
                          placeholder="List any chronic conditions"
                          rows={3}
                        />
                      </div>
                      
                      {/* Current Medications */}
                      <div className="space-y-2">
                        <Label htmlFor="currentMedications">Current Medications</Label>
                        <Textarea
                          id="currentMedications"
                          {...registerMedical('currentMedications')}
                          placeholder="List medications you're currently taking"
                          rows={3}
                        />
                      </div>
                      
                      {/* Past Surgeries */}
                      <div className="space-y-2">
                        <Label htmlFor="pastSurgeries">Past Surgeries</Label>
                        <Textarea
                          id="pastSurgeries"
                          {...registerMedical('pastSurgeries')}
                          placeholder="List any past surgeries with dates"
                          rows={3}
                        />
                      </div>
                      
                      {/* Family History */}
                      <div className="space-y-2">
                        <Label htmlFor="familyHistory">Family Medical History</Label>
                        <Textarea
                          id="familyHistory"
                          {...registerMedical('familyHistory')}
                          placeholder="Any relevant family medical history"
                          rows={3}
                        />
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Medical History'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Settings Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit(onSubmitPassword)} className="space-y-6">
                    <div className="space-y-4">
                      {/* Current Password */}
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...registerPassword('currentPassword')}
                          error={passwordErrors.currentPassword?.message}
                        />
                        {passwordErrors.currentPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.currentPassword.message}</p>
                        )}
                      </div>
                      
                      {/* New Password */}
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...registerPassword('newPassword')}
                          error={passwordErrors.newPassword?.message}
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.newPassword.message}</p>
                        )}
                      </div>
                      
                      {/* Confirm Password */}
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...registerPassword('confirmPassword')}
                          error={passwordErrors.confirmPassword?.message}
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? 'Updating...' : 'Change Password'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;