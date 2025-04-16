import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Footer from '../components/home/Footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  UserRound,
  CheckCircle,
  UserRoundCheck,
  ShieldCheck,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* User Types Section */}
        <section id="users" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Designed for <span className="text-blue-600">Everyone</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              {/* PATIENT CARD */}
              <Card className="max-w-sm w-full relative overflow-hidden border hover:border-primary shadow-md rounded-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <UserRound className="h-5 w-5 text-blue-600" />
                    <CardTitle>Patients</CardTitle>
                  </div>
                  <CardDescription className="text-gray-500">
                    For individuals seeking healthcare
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Book appointments with specialists</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Virtual consultations from home</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Access to medical records</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Prescription management</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/register">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-300">
                        Register as Patient
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* DOCTOR CARD */}
              <Card className="max-w-sm w-full relative overflow-hidden border hover:border-primary shadow-md rounded-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <UserRoundCheck className="h-5 w-5 text-blue-600" />
                    <CardTitle>Doctors</CardTitle>
                  </div>
                  <CardDescription className="text-gray-500">
                    For healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Manage your appointment schedule</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Conduct virtual consultations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Access patient history</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Issue digital prescriptions</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/doctor-register">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-300">
                        Apply as Doctor
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* ADMIN CARD */}
              <Card className="max-w-sm w-full relative overflow-hidden border hover:border-primary shadow-md rounded-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    <CardTitle>Administrators</CardTitle>
                  </div>
                  <CardDescription className="text-gray-500">
                    For platform management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>User management and verification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Analytics and reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Monitor appointment activity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>System configuration</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link to="/login">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-300">
                        Admin Login
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section id="Specialties" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-medical-secondary mb-2">Our Medical Specialties</h2>
              {/* <h2 className="text-3xl font-bold text-center mb-12">Our <span className="text-blue-600">Medical Specialties</span></h2> */}
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with specialists across a wide range of medical fields
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics',
                'Neurology', 'Ophthalmology', 'Gynecology', 'Dentistry'].map((specialty) => (
                  <Card key={specialty} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-medium text-medical-secondary">{specialty}</h3>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="Testimonials" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-center mb-12">What <span className="text-blue-600">Our Patients Say</span></h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Read testimonials from patients who have used our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Elizabeth',
                  text: 'HealthHarbor Connect made finding a specialist and booking an appointment incredibly easy. I was able to see a doctor the same day!'
                },
                {
                  name: 'Michael shan',
                  text: 'The virtual consultation feature saved me so much time. I got the medical advice I needed without having to leave my home.'
                },
                {
                  name: 'Emin Wilson',
                  text: 'I love being able to access all my medical records and prescriptions in one place. This platform has simplified my healthcare journey.'
                }
              ].map((testimonial, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <svg className="h-6 w-6 text-medical-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 flex-grow mb-4">{testimonial.text}</p>
                      <p className="font-medium text-medical-secondary">{testimonial.name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;







      {/* Features Section */}
//       <section id="features" className="py-16 bg-blue-50">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">
//             Key <span className="text-primary">Features</span>
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center gap-2 mb-2">
//                   <Calendar className="h-5 w-5 text-primary" />
//                   <CardTitle>Smart Scheduling</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   Easily book appointments with your preferred healthcare providers based on real-time availability.
//                 </p>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center gap-2 mb-2">
//                   <MessageSquare className="h-5 w-5 text-primary" />
//                   <CardTitle>Virtual Consultations</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   Connect with healthcare professionals through secure video or audio calls from the comfort of your home.
//                 </p>
//               </CardContent>
//             </Card>
            
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center gap-2 mb-2">
//                   <ClipboardList className="h-5 w-5 text-primary" />
//                   <CardTitle>Health Records</CardTitle>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   Store and access your complete medical history, prescriptions, and test results in one secure place.
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//           <div className="mt-12 text-center">
//             <Link to="/register">
//               <Button>
//                 Explore All Features
//                 <ChevronRight className="h-4 w-4 ml-2" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>