
import React from 'react';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Footer from '../components/home/Footer'
import { Card, CardContent } from '../components/ui/Card';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-medical-secondary mb-2">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                HealthHarbor Connect makes healthcare accessible with just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-medical-light text-medical-primary text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Find a Doctor</h3>
                <p className="text-gray-600">
                  Search for specialists based on specialization, ratings, and availability.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-medical-light text-medical-primary text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
                <p className="text-gray-600">
                  Select your preferred time slot and schedule a consultation.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-medical-light text-medical-primary text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Care</h3>
                <p className="text-gray-600">
                  Visit the doctor or attend a virtual consultation and receive quality healthcare.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Specialties Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-medical-secondary mb-2">Our Medical Specialties</h2>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-medical-secondary mb-2">What Our Patients Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Read testimonials from patients who have used our platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  text: 'HealthHarbor Connect made finding a specialist and booking an appointment incredibly easy. I was able to see a doctor the same day!'
                },
                {
                  name: 'Michael Chen',
                  text: 'The virtual consultation feature saved me so much time. I got the medical advice I needed without having to leave my home.'
                },
                {
                  name: 'Emily Wilson',
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
      
      <Footer/>
    </div>
  );
};

export default HomePage;