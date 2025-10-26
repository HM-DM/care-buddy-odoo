import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorClass?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, colorClass }: StatCardProps) => {
  return (
    <Card className="overflow-hidden shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-soft)]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.value}
              </p>
            )}
          </div>
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            colorClass || "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              colorClass ? "" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
