
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col page-enter">
      <div className="flex flex-1">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block mb-8">
              <span className="text-2xl font-bold">Repair<span className="text-primary">Buddy</span></span>
            </Link>
            
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-8">Sign in to your RepairBuddy account</p>
            
            <LoginForm />
          </div>
        </div>
        
        {/* Right side - Image/Design */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-secondary to-primary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative h-full flex flex-col justify-center items-center p-16 text-center">
            <div className="glass rounded-xl p-8 max-w-md">
              <h2 className="text-2xl font-bold mb-4">Fast & Reliable Service</h2>
              <p className="text-muted-foreground mb-4">
                Track your repair status, communicate with technicians, and manage your devices all in one place.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-2 bg-primary/20 rounded-full animate-pulse-slow" style={{ animationDelay: `${i * 0.5}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
