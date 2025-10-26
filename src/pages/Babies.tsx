import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockBabies } from '@/lib/mockData';
import { Baby, Calendar, Phone, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Babies = () => {
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

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20 lg:pb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Babies</h2>
          <p className="text-muted-foreground">Manage baby profiles and information</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockBabies.map((baby) => (
            <Card key={baby.id} className="overflow-hidden shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-soft)]">
              <div className="h-32 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
              <CardContent className="relative -mt-16 space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-gradient-to-br from-primary to-secondary shadow-lg">
                    <Baby className="h-12 w-12 text-white" />
                  </div>
                  <Badge variant={baby.gender === 'female' ? 'secondary' : 'default'} className="mt-2">
                    {baby.gender}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{baby.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{calculateAge(baby.dateOfBirth)} old</span>
                  </div>
                </div>

                <div className="space-y-2 rounded-xl bg-muted/50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Parent Info</p>
                  <p className="text-sm font-medium text-foreground">{baby.parentName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{baby.parentPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{baby.parentEmail}</span>
                  </div>
                </div>

                {baby.allergies && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-3">
                    <Heart className="h-4 w-4 text-destructive" />
                    <div>
                      <p className="text-xs font-medium text-destructive">Allergies</p>
                      <p className="text-sm text-foreground">{baby.allergies}</p>
                    </div>
                  </div>
                )}

                <Link to={`/babies/${baby.id}`}>
                  <Button className="w-full">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Babies;
