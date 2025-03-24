
import api from './api';

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    _id: string;
    email: string;
    isAdmin: boolean;
  };
}

export const register = async (data: RegisterData) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', data);
  
  // Store token and user data in localStorage
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};
