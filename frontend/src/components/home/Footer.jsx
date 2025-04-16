import { HeartPulse } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="Contact" className="bg-slate-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mb-12">
          
          {/* HealWise Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">HealWise</span>
            </div>
            <p className="text-slate-400 mb-4">
              Connecting patients with healthcare professionals through a seamless digital experience.
            </p>
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              {[ 
                { icon: <FaFacebook size={20} />, href: "#" },
                { icon: <FaTwitter size={20} />, href: "#" },
                { icon: <FaInstagram size={20} />, href: "#" },
                { icon: <FaLinkedin size={20} />, href: "#" },
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

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#users" className="hover:text-white">Users</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">HIPAA Compliance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-slate-400">
              <li>support@healwise.example</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Medical Drive, Suite 456</li>
              <li>San Francisco, CA 94102</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 pt-6 text-center text-slate-500 text-sm">
          <p>© 2025 HealWise Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
