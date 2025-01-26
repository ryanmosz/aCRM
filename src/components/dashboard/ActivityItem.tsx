interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  timestamp: string;
}

export function ActivityItem({ icon, title, timestamp }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="mt-1">{icon}</div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
}