
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Award, 
  LogOut, 
  Flame,
  User,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Aulas", url: "/dashboard/aulas", icon: BookOpen },
  { title: "Apostilas", url: "/dashboard/apostilas", icon: FileText },
  { title: "Certificados", url: "/dashboard/certificados", icon: Award },
];

export function StudentSidebar() {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Aluno';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-orange-500/20 text-orange-400 border-r-2 border-orange-500" 
      : "text-gray-300 hover:bg-white/10 hover:text-white";

  return (
    <Sidebar className={`${state === "collapsed" ? "w-16" : "w-64"} bg-slate-900 border-r border-orange-500/20`}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg welding-glow">
            <Flame className="h-6 w-6 text-white" />
          </div>
          {state !== "collapsed" && (
            <div>
              <h2 className="font-bold text-lg">Portal do Aluno</h2>
              <p className="text-gray-400 text-sm">Escola de Soldagem</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-3">
            {state !== "collapsed" && "Navegação"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClass}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state !== "collapsed" && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-orange-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-full">
            <User className="h-4 w-4 text-blue-400" />
          </div>
          {state !== "collapsed" && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userEmail}</p>
              <p className="text-gray-400 text-xs">Estudante</p>
            </div>
          )}
        </div>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" />
          {state !== "collapsed" && <span className="ml-3">Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
