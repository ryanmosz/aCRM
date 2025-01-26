export type UserRole = "admin" | "agent";

export type TeamAssignment = "support" | "sales" | "technical" | "none";

export interface UserPermissions {
  canDeleteTickets: boolean;
  canAssignAgents: boolean;
  canViewReports: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  team: TeamAssignment;
  permissions: UserPermissions;
}