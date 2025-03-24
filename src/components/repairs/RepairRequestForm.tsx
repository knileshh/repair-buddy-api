
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Service } from '@/services/serviceApi';
import { createRepair, CreateRepairData } from '@/services/repairApi';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RepairRequestFormProps {
  services: Service[];
  serviceId?: string;
  onSuccess?: () => void;
}

export const RepairRequestForm: React.FC<RepairRequestFormProps> = ({ 
  services, 
  serviceId, 
  onSuccess 
}) => {
  const form = useForm<CreateRepairData>({
    defaultValues: {
      serviceId: serviceId || '',
      description: '',
      estimatedCost: 0,
    },
  });

  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: createRepair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['repairs'] });
      toast.success('Repair request submitted successfully!');
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to submit repair request';
      toast.error(message);
    },
  });

  const onSubmit = (data: CreateRepairData) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value} 
                disabled={!!serviceId}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service._id} value={service._id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the type of repair service you need
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Issue Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please describe the issue with your device in detail..."
                  {...field}
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormDescription>
                Be as specific as possible about the problems you're experiencing
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Budget (USD)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="0"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                />
              </FormControl>
              <FormDescription>
                Provide your budget for this repair (our team will contact you if further discussion is needed)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          disabled={mutation.isPending}
          className="w-full md:w-auto"
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Repair Request'}
        </Button>
      </form>
    </Form>
  );
};
