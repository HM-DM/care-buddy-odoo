import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Baby, Home, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Baby, label: 'Babies', path: '/babies' },
    { icon: FileText, label: 'Daily Logs', path: '/logs' },
    { icon: Plus, label: 'Add Log Entry', path: '/add-log' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Baby className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Little Steps</h1>
              <p className="text-xs text-muted-foreground">Daycare Management</p>
            </div>
          </div>
          <Link to="/babies/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Baby
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto flex gap-6 px-4 py-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-2 rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-[var(--shadow-soft)]'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1">
          {children}
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card lg:hidden">
        <div className="flex justify-around p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="flex-1">
                <div
                  className={cn(
                    'flex flex-col items-center gap-1 rounded-xl py-2 text-xs transition-all',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
