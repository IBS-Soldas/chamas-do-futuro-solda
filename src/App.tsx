
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseLessons from "./pages/CourseLessons";
import Materials from "./pages/Materials";
import Certificates from "./pages/Certificates";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import { useFirebase } from "./contexts/FirebaseContext";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardLayout from "./components/AdminDashboardLayout";

const queryClient = new QueryClient();

const AppContent = () => {
  const { loading } = useFirebase();

  if (loading) return null; // or <Spinner />

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="cursos" element={<Courses />} />
            <Route path="cursos/:courseId/aulas" element={<CourseLessons />} />
            <Route path="apostilas" element={<Materials />} />
            <Route path="certificados" element={<Certificates />} />
          </Route>
          <Route
            path="/dashboard-admin"
            element={
              <PrivateRoute>
                <AdminDashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FirebaseProvider>
      <AppContent />
    </FirebaseProvider>
  </QueryClientProvider>
);

export default App;
