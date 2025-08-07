
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Users,
    FileText,
    Award,
    LogOut,
    Flame,
    User,
    Home
} from 'lucide-react';
import { useFirebase } from '@/contexts/FirebaseContext';
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
    { title: "Dashboard", url: "/dashboard-admin", icon: Home },
    { title: "Alunos", url: "/dashboard-admin/students", icon: Users },
    { title: "Cursos", url: "/dashboard-admin/cursos", icon: BookOpen },
    { title: "Apostilas", url: "/dashboard-admin/apostilas", icon: FileText },
    { title: "Certificados", url: "/dashboard-admin/certificados", icon: Award },
];

export function AdminSidebar() {
    const { state } = useSidebar();
    const navigate = useNavigate();
    const { auth } = useFirebase();
    const user = auth.currentUser;


    const getUserName = () => {
        if (user?.displayName) {
            return user.displayName;
        }

        const storedName = localStorage.getItem('userName');
        if (storedName) {
            return storedName;
        }

        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            return userEmail.split('@')[0];
        }

        return 'Aluno';
    };

    const userName = getUserName();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        navigate('/');
    };

    const getNavClass = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "w-full bg-black text-orange-500 rounded-md px-2 py-1"
            : "w-full text-gray-300 hover:bg-white/10 hover:text-white rounded-md px-2 py-1";

    return (
        <Sidebar className={`${state === "collapsed" ? "w-16" : "w-64"} bg-slate-900 border-r border-orange-500/20`}>
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                    {/* <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg welding-glow">
            <Flame className="h-6 w-6 text-white" />
          </div> */}
                    <div className="p-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg welding-glow">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-10 w-10 object-contain"
                        />
                    </div>
                    {state !== "collapsed" && (
                        <div>
                            <h2 className="font-bold text-lg text-gray-400">Portal do Admin</h2>
                            <p className="text-gray-400 text-sm">Escola de Soldagem</p>
                        </div>
                    )}
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                        {state !== "collapsed" && "Navegação"}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.title}
                                    to={item.url}
                                    end
                                    className={({ isActive }) =>
                                        (isActive
                                            ? "flex items-center w-full bg-white text-orange-500 rounded-lg px-2 py-2"
                                            : "flex items-center w-full"
                                            + " bg-[#22272b] text-orange-500 hover:bg-white/10 hover:text-white rounded-md px-2 py-2"
                                        ) + " focus:outline-none"
                                    }
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    {state !== "collapsed" && <span className="ml-3">{item.title}</span>}
                                </NavLink>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-orange-500/20">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                        <User className="h-4 w-4 text-blue-300" />
                    </div>
                    {state !== "collapsed" && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-gray-200">{userName}</p>
                            <p className="text-gray-200 text-xs">Administrador</p>
                        </div>
                    )}
                </div>

                <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-200 hover:bg-red-500/20"
                >
                    <LogOut className="h-4 w-4" />
                    {state !== "collapsed" && <span className="ml-3">Sair</span>}
                </Button>
            </SidebarFooter>
        </Sidebar>
    );
}
