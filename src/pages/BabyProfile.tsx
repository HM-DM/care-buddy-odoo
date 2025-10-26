import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockBabies, mockDailyLogs } from '@/lib/mockData';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Baby, Calendar, Phone, Mail, Heart, Clock, Utensils, Moon, Smile } from 'lucide-react';

const BabyProfile = () => {
  const { id } = useParams();
  const baby = mockBabies.find((b) => b.id === id);
  const dailyLog = mockDailyLogs.find((log) => log.babyId === id);

  if (!baby) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Baby not found</h2>
          <Link to="/babies">
            <Button className="mt-4">Back to Babies</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + today.getMonth() - birthDate.getMonth();
    
    if (months < 12) {
      return `${months} months`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years} year${years > 1 ? 's' : ''}`;
    }
  };

  const moodIcons = {
    happy: '😊',
    fussy: '😤',
    calm: '😌',
    sleepy: '😴',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 lg:pb-6">
        <Link to="/babies">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Babies
          </Button>
        </Link>

        <Card className="shadow-[var(--shadow-card)]">
          <div className="h-40 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
          <CardContent className="relative -mt-20 p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl border-4 border-card bg-gradient-to-br from-primary to-secondary shadow-lg">
                  <Baby className="h-16 w-16 text-white" />
                </div>
                <div className="space-y-3 pt-12">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-foreground">{baby.name}</h2>
                    <Badge variant={baby.gender === 'female' ? 'secondary' : 'default'}>
                      {baby.gender}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{calculateAge(baby.dateOfBirth)} old • Born {new Date(baby.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button className="mt-4 md:mt-12">Add Daily Log</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-lg">Parent Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-semibold text-foreground">{baby.parentName}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{baby.parentPhone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{baby.parentEmail}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-lg">Medical Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {baby.allergies && (
                <div className="flex items-start gap-2">
                  <Heart className="h-4 w-4 text-destructive" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Allergies</p>
                    <p className="text-sm font-semibold text-destructive">{baby.allergies}</p>
                  </div>
                </div>
              )}
              {baby.medicalNotes && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Notes</p>
                  <p className="text-sm text-foreground">{baby.medicalNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-lg">Enrollment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Enrollment Date</p>
                <p className="text-sm font-semibold text-foreground">
                  {new Date(baby.enrollmentDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Days Enrolled</p>
                <p className="text-sm font-semibold text-foreground">
                  {Math.floor((new Date().getTime() - new Date(baby.enrollmentDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today's Log</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="health">Health Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            {dailyLog ? (
              <>
                <Card className="shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Meals</CardTitle>
                      <Utensils className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dailyLog.meals.map((meal) => (
                      <div key={meal.id} className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-foreground">{meal.time}</p>
                            <Badge variant={meal.finished ? 'default' : 'secondary'}>
                              {meal.finished ? 'Finished' : 'Partial'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground capitalize">{meal.type}</p>
                          <p className="text-sm text-foreground">{meal.description}</p>
                          {meal.amount && <p className="text-xs text-muted-foreground">Amount: {meal.amount}</p>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Naps</CardTitle>
                      <Moon className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {dailyLog.naps.map((nap) => (
                      <div key={nap.id} className="flex items-center justify-between rounded-xl border bg-muted/30 p-4">
                        <div>
                          <p className="font-semibold text-foreground">
                            {nap.startTime} - {nap.endTime}
                          </p>
                          <p className="text-sm text-muted-foreground">{nap.duration} minutes</p>
                        </div>
                        <Moon className="h-5 w-5 text-primary" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Activities & Mood</CardTitle>
                      <Smile className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-xl border bg-accent/10 p-4">
                      <p className="text-sm font-medium text-muted-foreground">Today's Mood</p>
                      <p className="text-2xl font-bold text-foreground">
                        {moodIcons[dailyLog.mood]} {dailyLog.mood.charAt(0).toUpperCase() + dailyLog.mood.slice(1)}
                      </p>
                    </div>
                    {dailyLog.activities.map((activity) => (
                      <div key={activity.id} className="rounded-xl border bg-muted/30 p-4">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-foreground">{activity.time}</p>
                          <Badge className="capitalize">{activity.type}</Badge>
                        </div>
                        <p className="mt-2 text-sm text-foreground">{activity.description}</p>
                      </div>
                    ))}
                    {dailyLog.notes && (
                      <div className="rounded-xl border bg-primary/5 p-4">
                        <p className="text-sm font-medium text-muted-foreground">Notes</p>
                        <p className="mt-1 text-sm text-foreground">{dailyLog.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-[var(--shadow-card)]">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No log entry for today yet</p>
                  <Button className="mt-4">Add Today's Log</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            <Card className="shadow-[var(--shadow-card)]">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Log history will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health">
            <Card className="shadow-[var(--shadow-card)]">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Health statistics and growth charts will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BabyProfile;
