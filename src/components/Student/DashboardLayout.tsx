
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudentSidebar } from './StudentSidebar';

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-900">
        <StudentSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-slate-800 border-b border-orange-500/20 flex items-center px-6">
            <SidebarTrigger className="text-white hover:text-orange-400" />
            <div className="ml-4">
              <h1 className="text-white text-xl font-semibold">Área do Aluno</h1>
            </div>
          </header>

          <main className="flex-1 p-6 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-800">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
