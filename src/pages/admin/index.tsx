import { BarChart3, Users, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import UserManagement from "@/components/admin/UserManagement";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Placeholder data
const teamPerformance = [
  { name: "John Doe", resolvedTickets: 45, avgResponseTime: "1.2h", rating: 4.8 },
  { name: "Jane Smith", resolvedTickets: 38, avgResponseTime: "1.5h", rating: 4.7 },
  { name: "Mike Johnson", resolvedTickets: 42, avgResponseTime: "1.3h", rating: 4.9 },
];

const recentActivity = [
  {
    icon: <AlertCircle className="h-4 w-4 text-blue-500" />,
    title: "New agent added to the team",
    timestamp: "2 hours ago",
  },
  {
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    title: "Monthly performance review completed",
    timestamp: "5 hours ago",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<BarChart3 className="h-4 w-4" />}
          label="Open Tickets"
          value="42"
          trend={{ value: "-5%", positive: true }}
        />
        <StatsCard
          icon={<Clock className="h-4 w-4" />}
          label="Pending"
          value="23"
          trend={{ value: "+2%", positive: false }}
        />
        <StatsCard
          icon={<CheckCircle2 className="h-4 w-4" />}
          label="Resolved"
          value="156"
          trend={{ value: "+12%", positive: true }}
        />
        <StatsCard
          icon={<Users className="h-4 w-4" />}
          label="Active Agents"
          value="8"
          trend={{ value: "+1", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead className="text-right">Resolved</TableHead>
                  <TableHead className="text-right">Avg. Response</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamPerformance.map((agent) => (
                  <TableRow key={agent.name}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell className="text-right">{agent.resolvedTickets}</TableCell>
                    <TableCell className="text-right">{agent.avgResponseTime}</TableCell>
                    <TableCell className="text-right">{agent.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserManagement />
        </CardContent>
      </Card>
    </div>
  );
}
