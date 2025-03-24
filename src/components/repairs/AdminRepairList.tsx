
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PopulatedRepairRequest, getAllRepairs } from '@/services/repairApi';
import { RepairCard } from './RepairCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const AdminRepairList: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: repairs, isLoading, error } = useQuery({
    queryKey: ['admin-repairs'],
    queryFn: getAllRepairs,
    enabled: !!user?.isAdmin,
  });

  const handleViewDetails = (repairId: string) => {
    navigate(`/repairs/${repairId}`);
  };

  if (!user?.isAdmin) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-center">
        <p className="text-destructive">You don't have permission to view this page.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-[200px]">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-center">
        <p className="text-destructive">Error loading repair requests. Please try again later.</p>
      </div>
    );
  }

  if (!repairs || repairs.length === 0) {
    return (
      <div className="rounded-md bg-muted p-8 text-center">
        <p className="text-muted-foreground">No repair requests found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repairs.map((repair: PopulatedRepairRequest) => (
        <RepairCard 
          key={repair._id} 
          repair={repair}
          onViewDetails={handleViewDetails}
          isDetailed={true}
        />
      ))}
    </div>
  );
};
