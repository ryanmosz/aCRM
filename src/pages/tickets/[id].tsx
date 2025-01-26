import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, FileText } from "lucide-react";
import { useParams } from "react-router-dom";

// Placeholder data - would come from Supabase
const ticketData = {
  id: "1",
  subject: "Cannot access my account",
  status: "open",
  priority: "high",
  type: "Incident",
  assignedTo: "John Smith",
  customer: "Alice Johnson",
  createdAt: "2024-01-25T10:00:00Z",
  conversation: [
    {
      id: "1",
      sender: "Alice Johnson",
      message: "Hi, I'm unable to log into my account. It keeps saying invalid credentials.",
      timestamp: "2024-01-25T10:00:00Z",
    },
    {
      id: "2",
      sender: "John Smith",
      message: "Hi Alice, I'll help you with that. Can you confirm when this started happening?",
      timestamp: "2024-01-25T10:15:00Z",
    },
  ],
  internalNotes: [
    {
      id: "1",
      author: "John Smith",
      note: "Customer's account was locked due to multiple failed login attempts.",
      timestamp: "2024-01-25T10:10:00Z",
    },
  ],
};

export default function TicketDetailsPage() {
  const { id } = useParams();

  // Placeholder handlers - would integrate with Supabase
  const handleStatusChange = (value: string) => {
    console.log("Status changed to:", value);
  };

  const handlePriorityChange = (value: string) => {
    console.log("Priority changed to:", value);
  };

  const handleTypeChange = (value: string) => {
    console.log("Type changed to:", value);
  };

  const handleAddNote = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Adding new note");
  };

  const handleAddReply = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Adding new reply");
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{ticketData.subject}</h1>
          <p className="text-sm text-muted-foreground">
            Ticket #{id} • Created by {ticketData.customer}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue={ticketData.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={ticketData.priority} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue={ticketData.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Question">Question</SelectItem>
              <SelectItem value="Incident">Incident</SelectItem>
              <SelectItem value="Problem">Problem</SelectItem>
              <SelectItem value="Feature Request">Feature Request</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5" />
                <h2 className="font-semibold">Conversation</h2>
              </div>
              <div className="space-y-4">
                {ticketData.conversation.map((message) => (
                  <div key={message.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <form onSubmit={handleAddReply} className="p-6">
              <Textarea
                placeholder="Type your reply..."
                className="mb-4"
              />
              <Button type="submit">Send Reply</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5" />
                <h2 className="font-semibold">Internal Notes</h2>
              </div>
              <div className="space-y-4">
                {ticketData.internalNotes.map((note) => (
                  <div key={note.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{note.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(note.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm">{note.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <form onSubmit={handleAddNote} className="p-6">
              <Textarea
                placeholder="Add internal note..."
                className="mb-4"
              />
              <Button type="submit">Add Note</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}