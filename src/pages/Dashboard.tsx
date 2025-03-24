
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { RepairList } from '@/components/repairs/RepairList';
import { Plus } from 'lucide-react';

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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Your Recent Repair Requests</h2>
              <Button onClick={() => navigate('/repairs/new')}>
                <Plus className="h-4 w-4 mr-2" />
                New Request
              </Button>
            </div>
            
            <RepairList limit={3} />
            
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => navigate('/repairs')}>
                View All Repair Requests
              </Button>
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
