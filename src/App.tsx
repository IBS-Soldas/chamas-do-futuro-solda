
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Login from "./pages/Login";
import DashboardLayout from "./components/Student/DashboardLayout";
import Dashboard from "./pages/StudentPage/Dashboard";
import Courses from "./pages/StudentPage/Courses";
import CourseLessons from "./pages/StudentPage/CourseLessons";
import Materials from "./pages/StudentPage/Materials";
import Certificates from "./pages/StudentPage/Certificates";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import { useFirebase } from "./contexts/FirebaseContext";
import AdminDashboard from "./pages/AdminPage/AdminDashboard";
import AdminDashboardLayout from "./components/Admin/AdminDashboardLayout";
import Students from "./pages/AdminPage/Students";
import AdminCourses from "./pages/AdminPage/AdminCourses";
import AdminCourseLessons from "./pages/AdminPage/AdminCourseLessons";
import StudentDetails from "./pages/AdminPage/StudentDetails";

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          <Route
            path="/dashboard-student"
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
            <Route path="students" element={<Students />} />
            <Route path="students/:firebaseUid" element={<StudentDetails />} />
            <Route path="cursos" element={<AdminCourses />} />
            <Route path="cursos/:courseId/aulas" element={<AdminCourseLessons />} />
            <Route path="apostilas" element={<Materials />} />
            <Route path="certificados" element={<Certificates />} />
          </Route>
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
