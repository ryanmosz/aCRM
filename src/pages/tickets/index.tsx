import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, Search } from "lucide-react";
import { TicketList } from "@/components/tickets/TicketList";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { TicketFilters, TimeRange } from "@/types/filters";
import { Link } from "react-router-dom";

export default function TicketsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TicketFilters>({
    status: [],
    priority: [],
    category: [],
    timeRange: null,
  });

  const handleStatusChange = (status: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      status: checked 
        ? [...prev.status, status as TicketFilters["status"][number]]
        : prev.status.filter(s => s !== status),
    }));
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      priority: checked
        ? [...prev.priority, priority as TicketFilters["priority"][number]]
        : prev.priority.filter(p => p !== priority),
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      category: checked
        ? [...prev.category, category as TicketFilters["category"][number]]
        : prev.category.filter(c => c !== category),
    }));
  };

  const handleTimeRangeChange = (value: TimeRange) => {
    setFilters(prev => ({
      ...prev,
      timeRange: value,
    }));
  };

  const handleApplyFilters = () => {
    // Placeholder for filter application logic
    console.log("Applying filters:", filters);
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Tickets</h1>
        <Button 
          className="bg-[#4263EB] hover:bg-[#3b5bd9] text-white"
          onClick={() => navigate('/tickets/new')}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search tickets..."
            className="pl-10 bg-white"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-white">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Status</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["open", "pending", "resolved"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={filters.status.includes(status as TicketFilters["status"][number])}
                        onCheckedChange={(checked) => 
                          handleStatusChange(status, checked as boolean)
                        }
                      />
                      <Label htmlFor={`status-${status}`} className="capitalize">
                        {status}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Priority</h4>
                <div className="grid grid-cols-2 gap-2">
                  {["low", "medium", "high"].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox
                        id={`priority-${priority}`}
                        checked={filters.priority.includes(priority as TicketFilters["priority"][number])}
                        onCheckedChange={(checked) =>
                          handlePriorityChange(priority, checked as boolean)
                        }
                      />
                      <Label htmlFor={`priority-${priority}`} className="capitalize">
                        {priority}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Category</h4>
                <div className="grid grid-cols-1 gap-2">
                  {["Technical Issue", "Billing", "Feature Request", "Custom"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={filters.category.includes(category as TicketFilters["category"][number])}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category, checked as boolean)
                        }
                      />
                      <Label htmlFor={`category-${category}`}>
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Time Range</h4>
                <Select
                  value={filters.timeRange || undefined}
                  onValueChange={(value) => handleTimeRangeChange(value as TimeRange)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-[#4263EB] hover:bg-[#3b5bd9]"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <TicketList />
    </div>
  );
}