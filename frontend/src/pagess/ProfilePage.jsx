
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



import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/Avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAppSelector } from '../hooks/useAppSelector';
import { useToast } from '../hooks/use-toast';

const ProfilePage = () => {
  const { name, email } = useAppSelector((state) => state.auth);
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: name || '',
    email: email || '',
    phone: '(123) 456-7890',
    age: '35',
    gender: 'Male',
    address: '123 Main St, New York, NY 10001',
    bloodGroup: 'O+',
    emergencyContact: 'Jane Doe - (123) 456-7899',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [medicalHistory, setMedicalHistory] = useState({
    allergies: 'Peanuts, Penicillin',
    chronicConditions: 'Asthma',
    currentMedications: 'Albuterol inhaler',
    pastSurgeries: 'Appendectomy (2015)',
    familyHistory: 'Diabetes (mother), Hypertension (father)',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMedicalHistoryChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been updated successfully.',
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully.',
    });

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleMedicalHistorySubmit = (e) => {
    e.preventDefault();
    toast({
      title: 'Medical History Updated',
      description: 'Your medical history has been updated successfully.',
    });
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const res = await fetch('/api/patients/upload-profile-photo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: 'Profile photo updated!',
          description: 'Your new profile picture has been uploaded.',
        });
      } else {
        toast({
          title: 'Upload failed',
          description: data.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Unable to upload profile photo.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={profileData?.profilePhoto || ''} alt={name || 'User'} />
                <AvatarFallback className="bg-medical-primary text-white text-xl">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold mb-1">{name}</h2>
              <p className="text-gray-500 mb-4">{email}</p>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
                id="profilePhotoInput"
              />

              <Button
                variant="outline"
                className="w-full text-medical-secondary border-medical-secondary"
                onClick={() => document.getElementById('profilePhotoInput').click()}
              >
                Change Photo
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Email</span>
                  <span className="text-sm text-green-600 font-medium">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone Number</span>
                  <span className="text-sm text-green-600 font-medium">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Identity</span>
                  <span className="text-sm text-yellow-600 font-medium">Pending</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="medical">Medical History</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', id: 'fullName' },
                        { label: 'Email', id: 'email', disabled: true, type: 'email' },
                        { label: 'Phone Number', id: 'phone' },
                        { label: 'Age', id: 'age' },
                        { label: 'Gender', id: 'gender' },
                        { label: 'Blood Group', id: 'bloodGroup' },
                        { label: 'Address', id: 'address', span: true },
                        { label: 'Emergency Contact', id: 'emergencyContact', span: true },
                      ].map(({ label, id, disabled, type, span }) => (
                        <div key={id} className={`space-y-2 ${span ? 'md:col-span-2' : ''}`}>
                          <Label htmlFor={id}>{label}</Label>
                          <Input
                            id={id}
                            name={id}
                            type={type || 'text'}
                            value={profileData[id]}
                            onChange={handleProfileChange}
                            disabled={disabled}
                          />
                        </div>
                      ))}
                    </div>
                    <Button type="submit" className="bg-medical-primary hover:bg-medical-secondary">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Medical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleMedicalHistorySubmit} className="space-y-4">
                    {[
                      { id: 'allergies', label: 'Allergies' },
                      { id: 'chronicConditions', label: 'Chronic Conditions' },
                      { id: 'currentMedications', label: 'Current Medications' },
                      { id: 'pastSurgeries', label: 'Past Surgeries' },
                      { id: 'familyHistory', label: 'Family History' },
                    ].map(({ id, label }) => (
                      <div className="space-y-2" key={id}>
                        <Label htmlFor={id}>{label}</Label>
                        <Textarea
                          id={id}
                          name={id}
                          value={medicalHistory[id]}
                          onChange={handleMedicalHistoryChange}
                          placeholder={`Enter your ${label.toLowerCase()}`}
                        />
                      </div>
                    ))}
                    <Button type="submit" className="bg-medical-primary hover:bg-medical-secondary">
                      Save Medical History
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    {[
                      { id: 'currentPassword', label: 'Current Password' },
                      { id: 'newPassword', label: 'New Password' },
                      { id: 'confirmPassword', label: 'Confirm Password' },
                    ].map(({ id, label }) => (
                      <div className="space-y-2" key={id}>
                        <Label htmlFor={id}>{label}</Label>
                        <Input
                          id={id}
                          name={id}
                          type="password"
                          value={passwordData[id]}
                          onChange={handlePasswordChange}
                        />
                      </div>
                    ))}
                    <Button type="submit" className="bg-medical-primary hover:bg-medical-secondary">
                      Update Password
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
