import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Types for our ticket data
interface Ticket {
  id: string;
  subject: string;
  status: "open" | "pending" | "resolved";
  priority: "low" | "medium" | "high";
  type: string;
  customer: string;
  updatedAt: string;
}

// Placeholder data - would come from Supabase in production
const tickets: Ticket[] = [
  {
    id: "1",
    subject: "Cannot access my account",
    status: "open",
    priority: "high",
    type: "Incident",
    customer: "John Doe",
    updatedAt: "2h ago",
  },
  {
    id: "2",
    subject: "Feature request: Dark mode",
    status: "pending",
    priority: "medium",
    type: "Feature Request",
    customer: "Jane Smith",
    updatedAt: "1d ago",
  },
];

const statusStyles = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-100",
  pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
  resolved: "bg-gray-50 text-gray-700 border-gray-100",
};

const priorityStyles = {
  low: "bg-blue-50 text-blue-700 border-blue-100",
  medium: "bg-blue-50 text-blue-700 border-blue-100",
  high: "bg-red-50 text-red-700 border-red-100",
};

const typeStyles = "bg-purple-50 text-purple-700 border-purple-100";

export function TicketList() {
  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <Link key={ticket.id} to={`/tickets/${ticket.id}`}>
          <Card
            className="p-6 hover:border-gray-300 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h3 className="font-medium">{ticket.subject}</h3>
                <div className="flex gap-2 items-center flex-wrap">
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusStyles[ticket.status])}
                  >
                    {ticket.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", priorityStyles[ticket.priority])}
                  >
                    {ticket.priority}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", typeStyles)}
                  >
                    {ticket.type}
                  </Badge>
                  <span className="text-gray-600">{ticket.customer}</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">{ticket.updatedAt}</span>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}