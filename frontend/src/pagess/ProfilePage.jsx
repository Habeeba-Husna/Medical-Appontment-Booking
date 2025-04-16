// import React, { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
// import { Card, CardContent, CardHeader } from '../components/ui/Card';
// import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
// import { Camera, Pencil, Check, X } from "lucide-react";
// import { Button } from '../components/ui/Button';
// import { Badge } from '../components/ui/Badge';
// import InputField from '../components/ui/InputField';
// import SelectField from '../components/ui/SelectField';
// import TextAreaField from '../components/ui/TextAreaField';
// import axiosInstance from "../api/axiosInstance";
// import { useToast } from '../hooks/use-toast'; 

// const ProfilePage  = ({ profile }) => {
//   const [user, setUser] = useState(null);
//   const [tempPhoto, setTempPhoto] = useState(null);
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState("personal");
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: profile?.fullName || "",
//     email: profile?.email || "",
//     phoneNumber: profile?.phoneNumber || "",
//     age: profile?.age || "",
//     gender: profile?.gender || "",
//     bloodGroup: profile?.bloodGroup || "",
//     allergies: profile?.allergies || "",
//     chronicConditions: profile?.chronicConditions || "",
//     currentMedications: profile?.currentMedications || "",
//     pastSurgeries: profile?.pastSurgeries || ""
//   });

//   const getFullPhotoUrl = (photoPath) => {
//     if (!photoPath) return '';
//     return photoPath.startsWith('http')
//       ? photoPath
//       : `http://localhost:5000/${photoPath}`;
//   };
  

//     // Function to fetch updated profile
//     const fetchUpdatedProfile = async () => {
//       try {
//         const response = await axiosInstance.get('/patient/profile', { withCredentials: true });
//         setUser(response.data);  // Update profile state with new data
//       } catch (error) {
//         console.error('Failed to fetch updated profile', error);
//       }
//     };

//   const handlePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
  
//     // Validate file
//     const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!validTypes.includes(file.type)) {
//       toast({
//         title: 'Invalid file type',
//         description: 'Please upload a JPEG, PNG, or WEBP image',
//         variant: 'destructive',
//       });
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('profilePhoto', file);
  
//     try {
//       // Show temporary preview
//       setTempPhoto(URL.createObjectURL(file));
  
//       const response = await axiosInstance.post(
//         '/patient/upload-profile-photo',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           withCredentials: true,
//         }
//       );
  
//       // Update profile data
//       await fetchUpdatedProfile();
      
//      // Update local state directly from response if possible
//     if (response.data.profilePhoto) {
//       setUser(prev => ({...prev, profilePhoto: response.data.profilePhoto}));
//     }
    
//     toast({
//       title: 'Success!',
//       description: 'Profile photo updated successfully',
//     });
//   } catch (error) {
//     console.error('Upload failed:', error);
//     toast({
//       title: 'Upload failed',
//       description: error.response?.data?.message || 'Failed to upload photo',
//       variant: 'destructive',
//     });
//   } finally {
//     if (tempPhoto) {
//       URL.revokeObjectURL(tempPhoto);
//       setTempPhoto(null);
//     }
//   }
// };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     console.log("Saving data:", formData);
//     // Implement save logic here
//     setIsEditing(false);
//   };

//   const getInitials = (name = "") => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();
//   };

//   const verificationStatus = [
//     { label: "Email", verified: profile?.emailVerified, icon: profile?.emailVerified ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" /> },
//     { label: "Phone", verified: profile?.phoneVerified, icon: profile?.phoneVerified ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" /> },
//     { label: "Identity", verified: profile?.identityVerified, icon: profile?.identityVerified ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" /> }
//   ];

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//           My Profile
//         </h1>
//         {isEditing ? (
//           <div className="flex space-x-2">
//             <Button variant="outline" onClick={() => setIsEditing(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
//               Save Changes
//             </Button>
//           </div>
//         ) : (
//           <Button 
//             onClick={() => setIsEditing(true)} 
//             className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
//           >
//             <Pencil className="h-4 w-4" /> Edit Profile
//           </Button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
//         {/* Left Sidebar */}
//         <div className="space-y-6">
//           {/* Profile Card */}
//           <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
//             <CardContent className="p-6 flex flex-col items-center text-center">
//               <div className="relative mb-4 group">
//               <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
//     {tempPhoto ? (
//       // <AvatarImage src={tempPhoto} alt="Uploading..." className="object-cover" />
//       <AvatarImage
//   src={getFullPhotoUrl(profile?.profilePhoto)}
//   alt={profile?.fullName}
//   className="object-cover"
// />

//     ) : (
//       <>
//         <AvatarImage
//           src={profile?.profilePhoto}
//           alt={profile?.fullName}
//           className="object-cover"
//         />
//         <AvatarFallback className="bg-blue-600 text-white text-3xl font-medium">
//           {getInitials(profile?.fullName)}
//         </AvatarFallback>
//       </>
//     )}
//   </Avatar>
//                 <label
//                   htmlFor="profilePhotoInput"
//                   className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-200 shadow-md"
//                 >
//                   <Camera className="h-5 w-5" />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoUpload}
//                     className="hidden"
//                     id="profilePhotoInput"
//                   />
//                 </label>
//               </div>

//               <h2 className="text-xl font-semibold mb-1 text-gray-800">
//                 {profile?.fullName || "Patient"}
//               </h2>
//               <p className="text-gray-600 mb-4">{profile?.email}</p>

//               <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//                 <div
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
//                   style={{ width: `${profile?.isVerified ? 100 : 30}%` }}
//                 ></div>
//               </div>

//               <Badge variant={profile?.isVerified ? "success" : "warning"} className="px-3 py-1">
//                 {profile?.isVerified ? "Verified Account" : "Profile 30% Complete"}
//               </Badge>
//             </CardContent>
//           </Card>

//           {/* upcoming appointment */}
//           <Card className="border-0 shadow-sm">
//   <CardHeader className="border-b pb-4">
//     <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
//   </CardHeader>
//   <CardContent className="p-6 space-y-3">
//     {profile?.appointments?.length > 0 ? (
//       profile.appointments.map((appt, index) => (
//         <div key={index} className="text-sm text-gray-700">
//           <strong>{appt.doctorName}</strong><br />
//           {appt.date} at {appt.time}
//         </div>
//       ))
//     ) : (
//       <p className="text-gray-500">No upcoming appointments.</p>
//     )}
//     <Button variant="outline" className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-50">
//       Book New Appointment
//     </Button>
//   </CardContent>
// </Card>
//         </div>

//         {/* Right Tabs Content */}
//         <div>
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
//               <TabsTrigger value="personal" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
//                 Personal Info
//               </TabsTrigger>
//               <TabsTrigger value="medical" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
//                 Medical History
//               </TabsTrigger>
//               <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
//                 Security
//               </TabsTrigger>
//             </TabsList>

//             {/* PERSONAL INFO */}
//             <TabsContent value="personal">
//               <Card className="border-0 shadow-sm">
//                 <CardHeader className="border-b pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
//                 </CardHeader>
//                 <CardContent className="p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <InputField 
//                       label="Full Name" 
//                       name="fullName"
//                       value={formData.fullName} 
//                       onChange={handleInputChange}
//                       editable={isEditing}
//                     />
//                     <InputField 
//                       label="Email" 
//                       name="email"
//                       value={formData.email} 
//                       onChange={handleInputChange}
//                       editable={false}
//                     />
//                     <InputField 
//                       label="Phone Number" 
//                       name="phoneNumber"
//                       value={formData.phoneNumber} 
//                       onChange={handleInputChange}
//                       editable={isEditing}
//                     />
//                     <InputField 
//                       label="Age" 
//                       name="age"
//                       value={formData.age} 
//                       onChange={handleInputChange}
//                       editable={isEditing}
//                     />
//                     <SelectField 
//                       label="Gender" 
//                       name="gender"
//                       value={formData.gender} 
//                       onChange={handleInputChange}
//                       options={["Male", "Female", "Other"]}
//                       editable={isEditing}
//                     />
//                     <SelectField 
//                       label="Blood Group" 
//                       name="bloodGroup"
//                       value={formData.bloodGroup} 
//                       onChange={handleInputChange}
//                       options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
//                       editable={isEditing}
//                     />
//                   </div>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* MEDICAL HISTORY */}
//             <TabsContent value="medical">
//               <Card className="border-0 shadow-sm">
//                 <CardHeader className="border-b pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800">Medical History</h3>
//                 </CardHeader>
//                 <CardContent className="p-6 space-y-6">
//                   <TextAreaField 
//                     label="Allergies" 
//                     name="allergies"
//                     value={formData.allergies} 
//                     onChange={handleInputChange}
//                     editable={isEditing}
//                   />
//                   <TextAreaField 
//                     label="Chronic Conditions" 
//                     name="chronicConditions"
//                     value={formData.chronicConditions} 
//                     onChange={handleInputChange}
//                     editable={isEditing}
//                   />
//                   <TextAreaField 
//                     label="Current Medications" 
//                     name="currentMedications"
//                     value={formData.currentMedications} 
//                     onChange={handleInputChange}
//                     editable={isEditing}
//                   />
//                   <TextAreaField 
//                     label="Past Surgeries" 
//                     name="pastSurgeries"
//                     value={formData.pastSurgeries} 
//                     onChange={handleInputChange}
//                     editable={isEditing}
//                   />
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* SECURITY */}
//             <TabsContent value="security">
//               <Card className="border-0 shadow-sm">
//                 <CardHeader className="border-b pb-4">
//                   <h3 className="text-xl font-semibold text-gray-800">Security Settings</h3>
//                 </CardHeader>
//                 <CardContent className="p-6 space-y-4">
//                   <InputField 
//                     label="Current Password" 
//                     type="password" 
//                     editable={true}
//                   />
//                   <InputField 
//                     label="New Password" 
//                     type="password" 
//                     editable={true}
//                   />
//                   <InputField 
//                     label="Confirm New Password" 
//                     type="password" 
//                     editable={true}
//                   />
//                   <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
//                     Update Password
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProfilePage 




import React, { useState,useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Camera, Pencil, Check, X } from "lucide-react";
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import InputField from '../components/ui/InputField';
import SelectField from '../components/ui/SelectField';
import TextAreaField from '../components/ui/TextAreaField';
import axiosInstance from "../api/axiosInstance";
import { useToast } from '../hooks/use-toast'; 

const ProfilePage  = ({ profile }) => {
  const [user, setUser] = useState(null);
  const [tempPhoto, setTempPhoto] = useState(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
    age: profile?.age || "",
    gender: profile?.gender || "",
    bloodGroup: profile?.bloodGroup || "",
    allergies: profile?.allergies || "",
    chronicConditions: profile?.chronicConditions || "",
    currentMedications: profile?.currentMedications || "",
    pastSurgeries: profile?.pastSurgeries || ""
  });


  useEffect(() => {
    // First, try to load from localStorage
    const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    console.log('Loaded user from localStorage');
  }
    const getProfile = async () => {
      try {
        const res = await axiosInstance.get('/patient/profile', {
          withCredentials: true,
        });
        setUser(res.data);
           //  Store user temporarily on frontend (not for auth)
      localStorage.setItem('user', JSON.stringify(res.data));
      
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };

    getProfile();
  }, []);


  const getFullPhotoUrl = (photoPath) => {
    if (!photoPath) return '';
    return photoPath.startsWith('http')
      ? photoPath
      : `http://localhost:5000/${photoPath.replace(/\\/g, '/')}`;
  };
  

    // Function to fetch updated profile
    const fetchUpdatedProfile = async () => {
      try {
        const response = await axiosInstance.get('/patient/profile', { withCredentials: true });
        setUser(response.data);  // Update profile state with new data
      } catch (error) {
        console.error('Failed to fetch updated profile', error);
      }
    };
   

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Validate file
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a JPEG, PNG, or WEBP image',
        variant: 'destructive',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('profilePhoto', file);
  
    try {
      // Show temporary preview
      setTempPhoto(URL.createObjectURL(file));
  
      const response = await axiosInstance.patch(
        '/patient/upload-profile-photo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
          timeout: 10000,
        }
      );

   // Update the user state with the new photo URL
   setUser(prev => ({ ...prev, profilePhoto: response.data.data.profilePhoto }));

   // Fetch updated profile data
   await fetchUpdatedProfile();
    
    toast({
      title: 'Success!',
      description: 'Profile photo updated successfully',
    });
  } catch (error) {
    console.error('Upload failed:', error);
    toast({
      title: 'Upload failed',
      description: error.response?.data?.message || 'Failed to upload photo',
      variant: 'destructive',
    });
  } finally {
    if (tempPhoto) {
      URL.revokeObjectURL(tempPhoto);
      setTempPhoto(null);
    }
  }
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    // Implement save logic here
    setIsEditing(false);
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const verificationStatus = [
    { label: "Email", verified: profile?.emailVerified, icon: profile?.emailVerified ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" /> },
    { label: "Phone", verified: profile?.phoneVerified, icon: profile?.phoneVerified ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" /> },
    { label: "Identity", verified: profile?.identityVerified, icon: profile?.identityVerified ? <Check className="h-4 w-4 mr-1" /> : <X className="h-4 w-4 mr-1" /> }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          My Profile
        </h1>
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
          >
            <Pencil className="h-4 w-4" /> Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="relative mb-4 group">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
    {tempPhoto ? (
      // <AvatarImage src={tempPhoto} alt="Uploading..." className="object-cover" />
//       <AvatarImage
//   src={getFullPhotoUrl(profile?.profilePhoto)}
//   alt={profile?.fullName}
//   className="object-cover"
// />

// <img
//   src={getFullPhotoUrl(user?.profilePhoto)}
//   alt="Profile"
//   className="w-32 h-32 rounded-full object-cover"
// />
<img
  src={user?.profilePhoto || '/default-avatar.png ||defaultProfileImage'}  // Fallback to default image
  alt="Profile"
  className="w-32 h-32 rounded-full object-cover"
/>

    ) : (
      <>
        <AvatarImage
          src={profile?.profilePhoto}
          alt={profile?.fullName}
          className="object-cover"
        />
        <AvatarFallback className="bg-blue-600 text-white text-3xl font-medium">
          {getInitials(profile?.fullName)}
        </AvatarFallback>
      </>
    )}
  </Avatar>
                <label
                  htmlFor="profilePhotoInput"
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-200 shadow-md"
                >
                  <Camera className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="profilePhotoInput"
                  />
                </label>
              </div>

              <h2 className="text-xl font-semibold mb-1 text-gray-800">
                {profile?.fullName || "Patient"}
              </h2>
              <p className="text-gray-600 mb-4">{profile?.email}</p>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                  style={{ width: `${profile?.isVerified ? 100 : 30}%` }}
                ></div>
              </div>

              <Badge variant={profile?.isVerified ? "success" : "warning"} className="px-3 py-1">
                {profile?.isVerified ? "Verified Account" : "Profile 30% Complete"}
              </Badge>
            </CardContent>
          </Card>

          {/* upcoming appointment */}
          <Card className="border-0 shadow-sm">
  <CardHeader className="border-b pb-4">
    <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
  </CardHeader>
  <CardContent className="p-6 space-y-3">
    {profile?.appointments?.length > 0 ? (
      profile.appointments.map((appt, index) => (
        <div key={index} className="text-sm text-gray-700">
          <strong>{appt.doctorName}</strong><br />
          {appt.date} at {appt.time}
        </div>
      ))
    ) : (
      <p className="text-gray-500">No upcoming appointments.</p>
    )}
    <Button variant="outline" className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-50">
      Book New Appointment
    </Button>
  </CardContent>
</Card>
        </div>

        {/* Right Tabs Content */}
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="personal" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="medical" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Medical History
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Security
              </TabsTrigger>
            </TabsList>

            {/* PERSONAL INFO */}
            <TabsContent value="personal">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      label="Full Name" 
                      name="fullName"
                      value={formData.fullName} 
                      onChange={handleInputChange}
                      editable={isEditing}
                    />
                    <InputField 
                      label="Email" 
                      name="email"
                      value={formData.email} 
                      onChange={handleInputChange}
                      editable={false}
                    />
                    <InputField 
                      label="Phone Number" 
                      name="phoneNumber"
                      value={formData.phoneNumber} 
                      onChange={handleInputChange}
                      editable={isEditing}
                    />
                    <InputField 
                      label="Age" 
                      name="age"
                      value={formData.age} 
                      onChange={handleInputChange}
                      editable={isEditing}
                    />
                    <SelectField 
                      label="Gender" 
                      name="gender"
                      value={formData.gender} 
                      onChange={handleInputChange}
                      options={["Male", "Female", "Other"]}
                      editable={isEditing}
                    />
                    <SelectField 
                      label="Blood Group" 
                      name="bloodGroup"
                      value={formData.bloodGroup} 
                      onChange={handleInputChange}
                      options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                      editable={isEditing}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* MEDICAL HISTORY */}
            <TabsContent value="medical">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Medical History</h3>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <TextAreaField 
                    label="Allergies" 
                    name="allergies"
                    value={formData.allergies} 
                    onChange={handleInputChange}
                    editable={isEditing}
                  />
                  <TextAreaField 
                    label="Chronic Conditions" 
                    name="chronicConditions"
                    value={formData.chronicConditions} 
                    onChange={handleInputChange}
                    editable={isEditing}
                  />
                  <TextAreaField 
                    label="Current Medications" 
                    name="currentMedications"
                    value={formData.currentMedications} 
                    onChange={handleInputChange}
                    editable={isEditing}
                  />
                  <TextAreaField 
                    label="Past Surgeries" 
                    name="pastSurgeries"
                    value={formData.pastSurgeries} 
                    onChange={handleInputChange}
                    editable={isEditing}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* SECURITY */}
            <TabsContent value="security">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Security Settings</h3>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <InputField 
                    label="Current Password" 
                    type="password" 
                    editable={true}
                  />
                  <InputField 
                    label="New Password" 
                    type="password" 
                    editable={true}
                  />
                  <InputField 
                    label="Confirm New Password" 
                    type="password" 
                    editable={true}
                  />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage 
