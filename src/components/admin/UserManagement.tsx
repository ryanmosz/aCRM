import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Edit2, Users, Trash2, UserPlus } from "lucide-react";
import type { User, UserRole, TeamAssignment } from "@/types/user";

// Placeholder data
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    team: "support",
    permissions: {
      canDeleteTickets: true,
      canAssignAgents: true,
      canViewReports: true,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "agent",
    team: "sales",
    permissions: {
      canDeleteTickets: false,
      canAssignAgents: true,
      canViewReports: true,
    },
  },
];

const UserManagement = () => {
  const [users] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "agent" as UserRole,
    team: "support" as TeamAssignment,
    permissions: {
      canDeleteTickets: false,
      canAssignAgents: false,
      canViewReports: true,
    },
  });

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    console.log("Role changed", { userId, newRole });
  };

  const handleTeamChange = (userId: string, newTeam: TeamAssignment) => {
    console.log("Team changed", { userId, newTeam });
  };

  const handlePermissionToggle = (
    userId: string,
    permission: keyof User["permissions"]
  ) => {
    console.log("Permission toggled", { userId, permission });
  };

  const handleAddUser = () => {
    console.log("Adding new user:", newUser);
    setShowAddUserDialog(false);
    setNewUser({
      name: "",
      email: "",
      role: "agent",
      team: "support",
      permissions: {
        canDeleteTickets: false,
        canAssignAgents: false,
        canViewReports: true,
      },
    });
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Deleting user:", userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">User Management</h2>
        </div>
        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system. They will receive an email invitation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter user's name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="Enter user's email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: UserRole) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Team</label>
                <Select
                  value={newUser.team}
                  onValueChange={(value: TeamAssignment) =>
                    setNewUser({ ...newUser, team: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium">Default Permissions</label>
                {Object.entries(newUser.permissions).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setNewUser({
                          ...newUser,
                          permissions: {
                            ...newUser.permissions,
                            [key]: checked,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddUserDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="w-[140px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user.role === "admin"
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.team}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {Object.entries(user.permissions).map(([key, value]) => (
                      <Badge
                        key={key}
                        variant="outline"
                        className={
                          value
                            ? "bg-green-50 text-green-700 hover:bg-green-50"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                        }
                      >
                        {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setSelectedUser(user)}
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">Edit user</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <Select
                              defaultValue={user.role}
                              onValueChange={(value: UserRole) =>
                                handleRoleChange(user.id, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="agent">Agent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Team</label>
                            <Select
                              defaultValue={user.team}
                              onValueChange={(value: TeamAssignment) =>
                                handleTeamChange(user.id, value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="support">Support</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="technical">Technical</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-4">
                            <label className="text-sm font-medium">
                              Permissions
                            </label>
                            {Object.entries(user.permissions).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm">
                                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                                </span>
                                <Switch
                                  checked={value}
                                  onCheckedChange={() =>
                                    handlePermissionToggle(
                                      user.id,
                                      key as keyof User["permissions"]
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete user</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete User</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this user? This action
                            cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;