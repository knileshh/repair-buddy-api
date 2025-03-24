
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui-components/Button';
import Input from '@/components/ui-components/Input';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await login(formData.email, formData.password);
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
          autoComplete="current-password"
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
          Sign In
        </Button>
        
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
