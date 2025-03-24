
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RepairRequest, getUserRepairs } from '@/services/repairApi';
import { RepairCard } from './RepairCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';

interface RepairListProps {
  limit?: number;
}

export const RepairList: React.FC<RepairListProps> = ({ limit }) => {
  const navigate = useNavigate();
  
  const { data: repairs, isLoading, error } = useQuery({
    queryKey: ['repairs'],
    queryFn: getUserRepairs,
  });

  const handleViewDetails = (repairId: string) => {
    navigate(`/repairs/${repairId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit || 3)].map((_, index) => (
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
        <p className="text-muted-foreground">No repair requests found. Create a new one to get started.</p>
      </div>
    );
  }

  const displayedRepairs = limit ? repairs.slice(0, limit) : repairs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedRepairs.map((repair: RepairRequest) => (
        <RepairCard 
          key={repair._id} 
          repair={repair}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
};
