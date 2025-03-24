
import React from 'react';
import { Service } from '@/services/serviceApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Trash2, Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface ServiceCardProps {
  service: Service;
  onEdit?: (service: Service) => void;
  onDelete?: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{service.name}</span>
          {service.active ? (
            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Active</span>
          ) : (
            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Inactive</span>
          )}
        </CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span className="font-medium">${service.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{service.duration} minutes</span>
          </div>
        </div>
      </CardContent>
      {isAdmin && (
        <CardFooter className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit && onEdit(service)}
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => onDelete && onDelete(service._id)}
          >
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
