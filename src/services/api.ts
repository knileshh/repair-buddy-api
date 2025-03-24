
import axios from 'axios';
import { toast } from 'sonner';

const BASE_URL = 'https://be.naars.knileshh.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authorization token to requests if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        // Clear auth data if token is invalid/expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Show error message
        toast.error('Your session has expired. Please log in again.');
        
        // Redirect to login in a way that works with axios interceptors
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action');
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred');
    }
    
    return Promise.reject(error);
  }
);

export default api;
