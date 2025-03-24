
import React from 'react';
import { Service } from '@/services/serviceApi';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ServiceCardProps {
  service: Service;
  onEdit?: (service: Service) => void;
  onDelete?: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onEdit, onDelete }) => {
  return (
    <Card className="h-full flex flex-col glass hover:shadow-lg transition-all">
      <CardHeader>
        <CardTitle className="text-xl">{service.name}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{service.duration} minutes</span>
          <span className="font-semibold text-lg">{formatCurrency(service.price)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{service.description}</p>
      </CardContent>
      {(onEdit || onDelete) && (
        <CardFooter className="justify-end space-x-2 border-t p-4">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={() => onEdit(service)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="destructive" size="sm" onClick={() => onDelete(service._id)}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
