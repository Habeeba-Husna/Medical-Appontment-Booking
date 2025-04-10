// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Mail, Phone, MapPin } from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-medical-dark text-white">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4">HealthHarbor Connect</h3>
//             <p className="mb-4 text-gray-300">
//               Your trusted platform for medical appointment booking and healthcare management.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="w-8 h-8 rounded-full bg-medical-primary flex items-center justify-center hover:bg-medical-secondary transition-colors">
//                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
//                 </svg>
//               </a>
//               <a href="#" className="w-8 h-8 rounded-full bg-medical-primary flex items-center justify-center hover:bg-medical-secondary transition-colors">
//                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                 </svg>
//               </a>
//               <a href="#" className="w-8 h-8 rounded-full bg-medical-primary flex items-center justify-center hover:bg-medical-secondary transition-colors">
//                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link to="/doctors" className="text-gray-300 hover:text-white transition-colors">
//                   s
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/appointments" className="text-gray-300 hover:text-white transition-colors">
//                   Book Appointment
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
//                   Patient Login
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
//                   Doctor Login
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
//                   About Us
//                 </Link>
//               </li>
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Services</h3>
//             <ul className="space-y-2">
//               <li className="text-gray-300 hover:text-white transition-colors">
//                 Online Consultations
//               </li>
//               <li className="text-gray-300 hover:text-white transition-colors">
//                 Medical Records
//               </li>
//               <li className="text-gray-300 hover:text-white transition-colors">
//                 Health Checkups
//               </li>
//               <li className="text-gray-300 hover:text-white transition-colors">
//                 Lab Tests
//               </li>
//               <li className="text-gray-300 hover:text-white transition-colors">
//                 Mental Health Services
//               </li>
//             </ul>
//           </div>
          
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <ul className="space-y-4">
//               <li className="flex items-start">
//                 <MapPin className="h-5 w-5 mr-2 text-medical-primary" />
//                 <span className="text-gray-300">
//                   123 Healthcare Avenue, Medical District, New York, 10001
//                 </span>
//               </li>
//               <li className="flex items-center">
//                 <Phone className="h-5 w-5 mr-2 text-medical-primary" />
//                 <span className="text-gray-300">+1 (555) 123-4567</span>
//               </li>
//               <li className="flex items-center">
//                 <Mail className="h-5 w-5 mr-2 text-medical-primary" />
//                 <span className="text-gray-300">support@healthharbor.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
//           <p>&copy; {new Date().getFullYear()} HealthHarbor Connect. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[rgb(26,44,66)] text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">HealthHarbor Connect</h3>
          <p className="text-sm">
          Your trusted platform for medical appointment booking and healthcare management.
          </p>
        </div>

         {/* Quick Links Section */}
         <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="text-sm space-y-2">
            {["Home", "About", "Services", "Contact"].map((link, index) => (
              <li key={index}>
                <a href="#" className="hover:text-gray-300 transition duration-300">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <p className="text-sm text-gray-300">📧 support@example.com</p>
          <p className="text-sm text-gray-300">📞 +123 456 7890</p>
          <p className="text-sm text-gray-300">📍 123 Street, City, Country</p>
        </div>

        {/* Social Media Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebook size={24} />, href: "#" },
              { icon: <FaTwitter size={24} />, href: "#" },
              { icon: <FaInstagram size={24} />, href: "#" },
              { icon: <FaLinkedin size={24} />, href: "#" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="hover:text-gray-300 transition transform hover:scale-110 duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-300 mt-10 border-t border-gray-500 pt-4">
        &copy; {new Date().getFullYear()} HealthHarbor Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

