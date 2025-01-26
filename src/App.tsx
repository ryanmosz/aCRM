import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { 
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation
} from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import TicketsPage from "./pages/tickets";
import TicketDetailsPage from "./pages/tickets/[id]";
import CreateTicketPage from "./pages/tickets/new";
import SettingsPage from "./pages/settings";
import AdminDashboardPage from "./pages/admin";
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import LoginPage from "./pages/auth/login";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const AdminRoute = () => {
  const { profile } = useAuth();
  const location = useLocation();

  if (profile?.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <AdminDashboardPage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider><Outlet /></AuthProvider>,
    children: [
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <AppLayout>
              <Outlet />
            </AppLayout>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Index />
          },
          {
            path: "tickets",
            element: <TicketsPage />
          },
          {
            path: "tickets/:id",
            element: <TicketDetailsPage />
          },
          {
            path: "tickets/new",
            element: <CreateTicketPage />
          },
          {
            path: "settings",
            element: <SettingsPage />
          },
          {
            path: "admin",
            element: <AdminRoute />
          }
        ]
      }
    ]
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;