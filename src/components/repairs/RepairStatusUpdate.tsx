
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { updateRepairStatus, RepairStatus } from '@/services/repairApi';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RepairStatusUpdateProps {
  repairId: string;
  currentStatus: string;
}

export const RepairStatusUpdate: React.FC<RepairStatusUpdateProps> = ({ 
  repairId, 
  currentStatus 
}) => {
  const [status, setStatus] = React.useState<string>(currentStatus);
  const queryClient = useQueryClient();
  
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const mutation = useMutation({
    mutationFn: (status: RepairStatus) => updateRepairStatus(repairId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
      queryClient.invalidateQueries({ queryKey: ['repair', repairId] });
      toast.success('Repair status updated successfully');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to update repair status';
      toast.error(message);
    },
  });

  const handleUpdateStatus = () => {
    mutation.mutate({ status: status as 'pending' | 'in-progress' | 'completed' | 'cancelled' });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="space-y-2 flex-grow">
        <label className="text-sm font-medium">Update Status</label>
        <Select
          value={status}
          onValueChange={setStatus}
          disabled={mutation.isPending}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select new status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button 
        onClick={handleUpdateStatus} 
        disabled={mutation.isPending || status === currentStatus}
      >
        {mutation.isPending ? 'Updating...' : 'Update Status'}
      </Button>
    </div>
  );
};
