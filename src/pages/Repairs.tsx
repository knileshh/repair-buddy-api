
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getAllServices } from '@/services/serviceApi';
import { Button } from '@/components/ui/button';
import { Plus, Wrench } from 'lucide-react';
import { RepairList } from '@/components/repairs/RepairList';
import { AdminRepairList } from '@/components/repairs/AdminRepairList';
import NavBar from '@/components/NavBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Repairs = () => {
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Repair Requests</h1>
              <p className="text-muted-foreground">Manage your device repair requests</p>
            </div>
            <Button onClick={() => navigate('/repairs/new')}>
              <Plus className="h-4 w-4 mr-2" />
              New Repair Request
            </Button>
          </div>
          
          {user.isAdmin ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="my">My Requests</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <AdminRepairList />
              </TabsContent>
              <TabsContent value="my" className="mt-0">
                <RepairList />
              </TabsContent>
            </Tabs>
          ) : (
            <RepairList />
          )}
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

export default Repairs;
