
import api from './api';

export interface RepairStatus {
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

export interface RepairRequest {
  _id: string;
  userId: string;
  serviceId: string;
  status: string;
  description: string;
  estimatedCost: number;
  createdAt: string;
}

export interface PopulatedRepairRequest {
  _id: string;
  userId: {
    _id: string;
    email: string;
  };
  serviceId: {
    _id: string;
    name: string;
    description: string;
    price: number;
  };
  status: string;
  description: string;
  estimatedCost: number;
  createdAt: string;
}

export interface CreateRepairData {
  serviceId: string;
  description: string;
  estimatedCost: number;
}

// Create a new repair request
export const createRepair = async (data: CreateRepairData): Promise<RepairRequest> => {
  const response = await api.post('/repairs', data);
  return response.data;
};

// Get all repairs for current user
export const getUserRepairs = async (): Promise<RepairRequest[]> => {
  const response = await api.get('/repairs/user');
  return response.data;
};

// Get all repairs (admin only)
export const getAllRepairs = async (): Promise<PopulatedRepairRequest[]> => {
  const response = await api.get('/repairs');
  return response.data;
};

// Get specific repair by id
export const getRepairById = async (id: string): Promise<PopulatedRepairRequest> => {
  const response = await api.get(`/repairs/${id}`);
  return response.data;
};

// Update repair status (admin only)
export const updateRepairStatus = async (id: string, status: RepairStatus): Promise<RepairRequest> => {
  const response = await api.put(`/repairs/${id}/status`, status);
  return response.data;
};
