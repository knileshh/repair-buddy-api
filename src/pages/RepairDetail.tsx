
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getRepairById } from '@/services/repairApi';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, DollarSign } from 'lucide-react';
import { RepairStatusUpdate } from '@/components/repairs/RepairStatusUpdate';
import { RepairCard } from '@/components/repairs/RepairCard';
import NavBar from '@/components/NavBar';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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

const RepairDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: repair, isLoading, error } = useQuery({
    queryKey: ['repair', id],
    queryFn: () => getRepairById(id!),
    enabled: !!id && isAuthenticated,
  });

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Or a loading state
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col page-enter">
        <NavBar />
        <main className="flex-1 pt-28 pb-16 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <p className="text-center py-8">Loading repair details...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error || !repair) {
    return (
      <div className="min-h-screen flex flex-col page-enter">
        <NavBar />
        <main className="flex-1 pt-28 pb-16 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => navigate('/repairs')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Repairs
            </Button>
            <div className="rounded-md bg-destructive/15 p-6 text-center">
              <p className="text-destructive mb-4">Failed to load repair details</p>
              <Button variant="outline" onClick={() => navigate('/repairs')}>
                Go Back to Repairs
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Check if the user is authorized to view this repair
  const isAuthorized = user.isAdmin || repair.userId._id === user._id;
  
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col page-enter">
        <NavBar />
        <main className="flex-1 pt-28 pb-16 px-4 md:px-6">
          <div className="container mx-auto max-w-4xl">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => navigate('/repairs')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Repairs
            </Button>
            <div className="rounded-md bg-destructive/15 p-6 text-center">
              <p className="text-destructive mb-4">You don't have permission to view this repair request</p>
              <Button variant="outline" onClick={() => navigate('/repairs')}>
                Go Back to Repairs
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(repair.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <NavBar />
      
      <main className="flex-1 pt-28 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/repairs')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Repairs
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Repair Request: {repair.serviceId.name}
              </h1>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(repair.status)} text-white`}>
                  {repair.status.charAt(0).toUpperCase() + repair.status.slice(1)}
                </Badge>
                <span className="text-muted-foreground">ID: {repair._id}</span>
              </div>
            </div>
          </div>
          
          <div className="glass p-6 md:p-8 rounded-xl mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Request Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Service Type</p>
                    <p className="font-medium">{repair.serviceId.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Customer</p>
                    <p>{repair.userId.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        <DollarSign className="h-4 w-4 inline mr-1" />
                        Cost Estimate
                      </p>
                      <p className="font-semibold">{formatCurrency(repair.estimatedCost)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Submitted On
                      </p>
                      <p>{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Description</p>
                    <div className="bg-background/50 p-4 rounded-md whitespace-pre-line">
                      {repair.description || "No description provided."}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Service Information</h2>
                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Service Description</p>
                  <p>{repair.serviceId.description}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Standard Price</p>
                  <p className="font-semibold">{formatCurrency(repair.serviceId.price)}</p>
                </div>
                
                {user.isAdmin && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Admin Controls</h3>
                    <RepairStatusUpdate 
                      repairId={repair._id} 
                      currentStatus={repair.status} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
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

export default RepairDetail;
