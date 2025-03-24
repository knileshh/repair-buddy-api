
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import Button from '@/components/ui-components/Button';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Or a loading state
  }

  return (
    <div className="min-h-screen flex flex-col page-enter">
      <NavBar />
      
      <main className="flex-1 pt-28 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          
          <div className="glass p-8 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Repair Requests</h2>
            
            {/* Empty state */}
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No repair requests yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Submit your first repair request to get started. Our technicians are ready to help.
              </p>
              <Button>Create New Request</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Device Inventory", count: 0 },
              { title: "Completed Repairs", count: 0 },
              { title: "Messages", count: 0 }
            ].map((card, index) => (
              <div 
                key={index} 
                className="glass p-6 rounded-xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold">{card.count}</p>
              </div>
            ))}
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

export default Dashboard;
