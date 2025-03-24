
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col page-enter">
      <div className="flex flex-1">
        {/* Left side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <Link to="/" className="inline-block mb-8">
              <span className="text-2xl font-bold">Repair<span className="text-primary">Buddy</span></span>
            </Link>
            
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
            <p className="text-muted-foreground mb-8">Enter your details to create your RepairBuddy account</p>
            
            <RegisterForm />
          </div>
        </div>
        
        {/* Right side - Image/Design */}
        <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary/40 to-secondary relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative h-full flex flex-col justify-center items-center p-16 text-center">
            <div className="glass rounded-xl p-8 max-w-md">
              <h2 className="text-2xl font-bold mb-4">Expert Electronics Repair Service</h2>
              <p className="text-muted-foreground mb-4">
                Join thousands of satisfied customers who trust us with their electronic devices every day.
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
