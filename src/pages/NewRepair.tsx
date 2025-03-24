
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getAllServices } from '@/services/serviceApi';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { RepairRequestForm } from '@/components/repairs/RepairRequestForm';
import NavBar from '@/components/NavBar';

const NewRepair = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: getAllServices,
  });

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    navigate('/repairs');
  };

  if (!isAuthenticated || !user) {
    return null; // Or a loading state
  }

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center py-8">Loading services...</p>;
    }

    if (error) {
      return (
        <div className="rounded-md bg-destructive/15 p-6 text-center">
          <p className="text-destructive mb-4">Failed to load services</p>
          <Button variant="outline" onClick={() => navigate('/repairs')}>
            Go Back
          </Button>
        </div>
      );
    }

    if (!services || services.length === 0) {
      return (
        <div className="rounded-md bg-muted p-6 text-center">
          <p className="text-muted-foreground mb-4">No services available at the moment</p>
          <Button variant="outline" onClick={() => navigate('/repairs')}>
            Go Back
          </Button>
        </div>
      );
    }

    return (
      <div className="glass p-6 md:p-8 rounded-xl">
        <RepairRequestForm services={services} onSuccess={handleSuccess} />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <NavBar />
      
      <main className="flex-1 pt-28 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => navigate('/repairs')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Repairs
            </Button>
            <h1 className="text-3xl font-bold mb-2">New Repair Request</h1>
            <p className="text-muted-foreground">Submit your device repair details</p>
          </div>
          
          {renderContent()}
        </div>
      </main>
      
      <footer className="py-6 px-4 md:px-6 bg-secondary/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2023 RepairBuddy. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NewRepair;
