import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Baby, Utensils, Moon, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockBabies } from '@/lib/mockData';

const Dashboard = () => {
  const mealData = [
    { day: 'Mon', bottles: 24, solids: 18, snacks: 12 },
    { day: 'Tue', bottles: 26, solids: 20, snacks: 14 },
    { day: 'Wed', bottles: 22, solids: 19, snacks: 13 },
    { day: 'Thu', bottles: 25, solids: 21, snacks: 15 },
    { day: 'Fri', bottles: 23, solids: 17, snacks: 11 },
  ];

  const napData = [
    { day: 'Mon', duration: 165 },
    { day: 'Tue', duration: 180 },
    { day: 'Wed', duration: 150 },
    { day: 'Thu', duration: 175 },
    { day: 'Fri', duration: 160 },
  ];

  const moodData = [
    { name: 'Happy', value: 45, color: 'hsl(var(--success))' },
    { name: 'Calm', value: 30, color: 'hsl(var(--secondary))' },
    { name: 'Fussy', value: 15, color: 'hsl(var(--accent))' },
    { name: 'Sleepy', value: 10, color: 'hsl(var(--primary))' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 lg:pb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">Overview of today's activities and health metrics</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Babies"
            value={mockBabies.length}
            icon={Baby}
            colorClass="bg-primary/10"
          />
          <StatCard
            title="Meals Today"
            value={68}
            icon={Utensils}
            trend={{ value: '+12% from yesterday', isPositive: true }}
            colorClass="bg-accent/10"
          />
          <StatCard
            title="Avg Nap Time"
            value="2.8h"
            icon={Moon}
            trend={{ value: '+0.3h from average', isPositive: true }}
            colorClass="bg-secondary/20"
          />
          <StatCard
            title="Activities"
            value={16}
            icon={Activity}
            colorClass="bg-success/10"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle>Weekly Meal Intake</CardTitle>
              <CardDescription>Tracking different meal types throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mealData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Bar dataKey="bottles" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="solids" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="snacks" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle>Nap Duration Trends</CardTitle>
              <CardDescription>Average sleep time in minutes per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={napData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="duration" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
              <CardDescription>Overall mood patterns this week</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest logged activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Outdoor playtime - All babies', 'Music session completed', 'Art & crafts activity', 'Story time session'].map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border bg-muted/30 p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{activity}</p>
                      <p className="text-xs text-muted-foreground">{15 * (idx + 1)} minutes ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
