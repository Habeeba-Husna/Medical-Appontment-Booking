import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAppSelector } from '../../hooks/useAppSelector';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-medical-secondary">
              {/* HealthHarbor Connect */}
              HealWise
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-medical-primary">
              Home
            </Link>
            <a href="#users" className="px-3 py-2 text-gray-700 hover:text-medical-primary">Users</a>
            <a href="#Testimonials" className="px-3 py-2 text-gray-700 hover:text-medical-primary">Testimonials</a>
            <a href="#Contact" className="px-3 py-2 text-gray-700 hover:text-medical-primary">Contact</a>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-medical-primary hover:bg-medical-secondary">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-medical-primary text-white  hover:bg-medical-secondary">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-medical-primary focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg absolute w-full z-50">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-medical-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#users"
              className="block px-3 py-2 text-gray-700 hover:text-medical-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Users
            </a>
            <a
              href="#Testimonials"
              className="block px-3 py-2 text-gray-700 hover:text-medical-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#Contact"
              className="block px-3 py-2 text-gray-700 hover:text-medical-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="pt-4 pb-2 border-t border-gray-200 flex flex-col space-y-2">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="w-full bg-medical-primary hover:bg-medical-secondary">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full border-medical-primary text-medical-primary hover:bg-medical-light">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-medical-primary hover:bg-medical-secondary">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
