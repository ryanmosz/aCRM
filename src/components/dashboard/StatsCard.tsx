import { Card } from "@/components/ui/card";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    positive?: boolean;
  };
  className?: string;
}

export function StatsCard({ icon, label, value, trend, className }: StatsCardProps) {
  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="rounded-lg p-2 bg-gray-100">{icon}</div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-semibold">{value}</h2>
            {trend && (
              <span className={`text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}