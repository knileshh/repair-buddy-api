
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllServices, Service } from '@/services/serviceApi';
import { ServiceCard } from './ServiceCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ServiceListProps {
  onEdit?: (service: Service) => void;
  onDelete?: (serviceId: string) => void;
}

export const ServiceList: React.FC<ServiceListProps> = ({ onEdit, onDelete }) => {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: getAllServices,
  });

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
        <p className="text-destructive">Error loading services. Please try again later.</p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="rounded-md bg-muted p-8 text-center">
        <p className="text-muted-foreground">No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard 
          key={service._id} 
          service={service} 
          onEdit={onEdit} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
