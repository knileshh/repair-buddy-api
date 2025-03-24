import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllServices, createService, deleteService, updateService, Service, CreateServiceData } from '@/services/serviceApi';
import { ServiceList } from '@/components/services/ServiceList';
import { ServiceForm } from '@/components/services/ServiceForm';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import NavBar from '@/components/NavBar';

const Services = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const isAdmin = user?.isAdmin || false;
  const isMobile = useIsMobile();
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editService, setEditService] = useState<Service | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  // Queries and mutations
  const { data: services } = useQuery({
    queryKey: ['services'],
    queryFn: getAllServices,
  });

  const createMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service created successfully');
      setIsAddOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create service');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateServiceData> }) => 
      updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service updated successfully');
      setEditService(null);
      setIsEditOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update service');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
      setServiceToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete service');
    },
  });

  // Handlers
  const handleCreateService = async (data: CreateServiceData) => {
    await createMutation.mutate(data);
  };

  const handleUpdateService = async (data: CreateServiceData) => {
    if (editService) {
      await updateMutation.mutate({ id: editService._id, data });
    }
  };

  const handleEditClick = (service: Service) => {
    setEditService(service);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (serviceId: string) => {
    setServiceToDelete(serviceId);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      deleteMutation.mutate(serviceToDelete);
    }
  };

  // Common components for mobile and desktop
  const AddServiceForm = () => (
    <div className="p-1">
      <ServiceForm 
        onSubmit={handleCreateService} 
        isLoading={createMutation.isPending} 
      />
    </div>
  );

  const EditServiceForm = () => (
    <div className="p-1">
      {editService && (
        <ServiceForm 
          initialData={editService} 
          onSubmit={handleUpdateService} 
          isLoading={updateMutation.isPending} 
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl mt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Repair Services</h1>
          {isAdmin && (
            isMobile ? (
              <Drawer open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DrawerTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Add New Service</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <AddServiceForm />
                  </div>
                </DrawerContent>
              </Drawer>
            ) : (
              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Service</DialogTitle>
                  </DialogHeader>
                  <AddServiceForm />
                </DialogContent>
              </Dialog>
            )
          )}
        </div>

        <ServiceList 
          onEdit={isAdmin ? handleEditClick : undefined} 
          onDelete={isAdmin ? handleDeleteClick : undefined} 
        />

        {/* Edit Service Modal/Drawer */}
        {isAdmin && (
          isMobile ? (
            <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Service</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <EditServiceForm />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Service</DialogTitle>
                </DialogHeader>
                <EditServiceForm />
              </DialogContent>
            </Dialog>
          )
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!serviceToDelete} onOpenChange={(open) => !open && setServiceToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the service.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Services;
