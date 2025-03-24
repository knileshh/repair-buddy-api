
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText, Wrench } from 'lucide-react';
import { PopulatedRepairRequest, RepairRequest } from '@/services/repairApi';
import { formatCurrency } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface RepairCardProps {
  repair: RepairRequest | PopulatedRepairRequest;
  isDetailed?: boolean;
  onViewDetails?: (repairId: string) => void;
}

// Helper to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-amber-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'completed':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const RepairCard: React.FC<RepairCardProps> = ({ 
  repair, 
  isDetailed = false, 
  onViewDetails 
}) => {
  const isMobile = useIsMobile();
  const isPopulated = 'userId' in repair && typeof repair.userId === 'object';
  
  // Format date
  const formattedDate = new Date(repair.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Card className="h-full flex flex-col glass hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">
              {isPopulated 
                ? (repair as PopulatedRepairRequest).serviceId.name 
                : `Repair #${repair._id.substring(0, 8)}`}
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor(repair.status)} text-white`}>
            {repair.status.charAt(0).toUpperCase() + repair.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPopulated ? (
          <>
            <div className="mb-3">
              <p className="text-sm font-medium text-muted-foreground">Customer:</p>
              <p>{(repair as PopulatedRepairRequest).userId.email}</p>
            </div>
            {!isMobile && (
              <div className="mb-3">
                <p className="text-sm font-medium text-muted-foreground">Service:</p>
                <p>{(repair as PopulatedRepairRequest).serviceId.name}</p>
              </div>
            )}
          </>
        ) : null}
        
        <div className="mb-3">
          <p className="text-sm font-medium text-muted-foreground">Cost Estimate:</p>
          <p className="font-semibold">{formatCurrency(repair.estimatedCost)}</p>
        </div>
        
        {isDetailed && (
          <div className="mt-4">
            <p className="text-sm font-medium text-muted-foreground">Description:</p>
            <p className="mt-1 text-sm whitespace-pre-line">{repair.description}</p>
          </div>
        )}
      </CardContent>
      {onViewDetails && (
        <CardFooter className="border-t pt-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onViewDetails(repair._id)}
          >
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
