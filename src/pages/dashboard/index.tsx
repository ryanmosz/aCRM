import { BarChart3, CheckCircle2, Clock, MessageCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const ticketVolumeData = [
  { day: "Mon", value: 12 },
  { day: "Tue", value: 19 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 22 },
  { day: "Fri", value: 18 },
  { day: "Sat", value: 10 },
  { day: "Sun", value: 8 },
];

const recentActivity = [
  {
    icon: <AlertCircle className="h-4 w-4 text-blue-500" />,
    title: "New high-priority ticket from John Doe",
    timestamp: "5 min ago",
  },
  {
    icon: <MessageCircle className="h-4 w-4 text-green-500" />,
    title: "Sarah responded to ticket #1234",
    timestamp: "15 min ago",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4 text-purple-500" />,
    title: "Ticket #1235 marked as resolved",
    timestamp: "1 hour ago",
  },
];

const notifications = [
  { message: "5 tickets require immediate attention", type: "urgent" },
  { message: "Response time above threshold", type: "warning" },
  { message: "Weekly report is ready", type: "success" },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<BarChart3 className="h-4 w-4" />}
          label="Total Tickets"
          value="127"
          trend={{ value: "+12%", positive: true }}
        />
        <StatsCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Resolved"
          value="85"
          trend={{ value: "+5%", positive: true }}
        />
        <StatsCard
          icon={<Clock className="h-4 w-4" />}
          label="Avg. Response"
          value="2.4h"
          trend={{ value: "+0.8h", positive: false }}
        />
        <StatsCard
          icon={<MessageCircle className="h-4 w-4" />}
          label="CSAT Score"
          value="4.8"
          trend={{ value: "+0.3", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ticket Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px]" config={{}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-sm" />
                  <YAxis className="text-sm" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  notification.type === 'urgent'
                    ? 'bg-blue-50 text-blue-700'
                    : notification.type === 'warning'
                    ? 'bg-yellow-50 text-yellow-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {notification.message}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}