import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockBabies, mockDailyLogs } from '@/lib/mockData';
import { Calendar, Baby, Utensils, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';

const DailyLogs = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 lg:pb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Daily Logs</h2>
          <p className="text-muted-foreground">View and manage daily activity logs</p>
        </div>

        <div className="space-y-4">
          {mockDailyLogs.map((log) => {
            const baby = mockBabies.find((b) => b.id === log.babyId);
            if (!baby) return null;

            return (
              <Card key={log.id} className="shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-soft)]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                        <Baby className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{baby.name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="default" className="capitalize">
                      {log.mood}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border bg-muted/30 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Utensils className="h-4 w-4" />
                        Meals
                      </div>
                      <p className="mt-2 text-2xl font-bold text-foreground">{log.meals.length}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.meals.filter((m) => m.finished).length} completed
                      </p>
                    </div>

                    <div className="rounded-xl border bg-muted/30 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Moon className="h-4 w-4" />
                        Naps
                      </div>
                      <p className="mt-2 text-2xl font-bold text-foreground">{log.naps.length}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.naps.reduce((sum, nap) => sum + nap.duration, 0)} min total
                      </p>
                    </div>

                    <div className="rounded-xl border bg-muted/30 p-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Activities
                      </div>
                      <p className="mt-2 text-2xl font-bold text-foreground">{log.activities.length}</p>
                      <p className="text-xs text-muted-foreground">{log.diaperChanges} diaper changes</p>
                    </div>
                  </div>

                  {log.notes && (
                    <div className="mt-4 rounded-xl border bg-primary/5 p-4">
                      <p className="text-sm font-medium text-muted-foreground">Notes</p>
                      <p className="mt-1 text-sm text-foreground">{log.notes}</p>
                    </div>
                  )}

                  <Link to={`/babies/${baby.id}`} className="mt-4 block">
                    <div className="text-center text-sm font-medium text-primary hover:underline">
                      View Full Details →
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DailyLogs;
