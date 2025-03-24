
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui-components/Button';
import Input from '@/components/ui-components/Input';

const RegisterForm = () => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await register(formData.email, formData.password);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          fullWidth
          autoComplete="email"
          required
        />
        
        <Input
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          fullWidth
          autoComplete="new-password"
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={formErrors.confirmPassword}
          fullWidth
          autoComplete="new-password"
          required
        />
        
        {error && (
          <div className="text-destructive text-sm p-2 bg-destructive/10 rounded-md animate-slide-up">
            {error}
          </div>
        )}
        
        <Button 
          type="submit" 
          isLoading={loading} 
          fullWidth
          className="mt-6"
        >
          Create Account
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
