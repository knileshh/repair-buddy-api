
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from './ui-components/Button';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Navigation items
  const navItems = [
    { title: 'Home', path: '/' },
    ...(isAuthenticated
      ? [{ title: 'Dashboard', path: '/dashboard' }]
      : []),
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'glass shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter transition-all hover:scale-105"
        >
          Repair<span className="text-primary">Buddy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? 'text-primary' : 'text-foreground'
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={logout}>
              Sign Out
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
