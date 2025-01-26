import { Sidebar } from "@/components/sidebar/Sidebar";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
  isAdmin?: boolean;
}

export function AppLayout({ children, isAdmin = false }: AppLayoutProps) {
  const { logout, profile } = useAuth();
  console.log('AppLayout profile:', profile);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar isAdmin={profile?.role === 'admin'} />
      <main className="flex-1 overflow-auto">
        <div className="p-4 flex justify-end items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, {profile?.username || 'User'}
          </span>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
        {children}
      </main>
    </div>
  );
}