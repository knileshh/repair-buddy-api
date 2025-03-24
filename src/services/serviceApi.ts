
import api from './api';

export interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  active: boolean;
}

export interface CreateServiceData {
  name: string;
  description: string;
  price: number;
  duration: number;
}

// Get all services (public)
export const getAllServices = async (): Promise<Service[]> => {
  const response = await api.get('/services');
  return response.data;
};

// Create a new service (admin only)
export const createService = async (data: CreateServiceData): Promise<Service> => {
  const response = await api.post('/services', data);
  return response.data;
};

// Delete a service (admin only)
export const deleteService = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

// Update a service (admin only)
export const updateService = async (id: string, data: Partial<CreateServiceData>): Promise<Service> => {
  const response = await api.put(`/services/${id}`, data);
  return response.data;
};
