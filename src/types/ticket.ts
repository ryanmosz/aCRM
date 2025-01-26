export type TicketPriority = "Low" | "Medium" | "High";

export type TicketType = "Question" | "Incident" | "Problem" | "Feature Request" | "Custom";

export interface CreateTicketFormData {
  subject: string;
  description: string;
  priority: TicketPriority;
  type: TicketType;
  customType?: string;
}