export type TicketStatus = "open" | "pending" | "resolved";
export type TicketPriority = "low" | "medium" | "high";
export type TicketCategory = "Technical Issue" | "Billing" | "Feature Request" | "Custom";
export type TimeRange = "today" | "last7days" | "last30days";

export interface TicketFilters {
  status: TicketStatus[];
  priority: TicketPriority[];
  category: TicketCategory[];
  timeRange: TimeRange | null;
}