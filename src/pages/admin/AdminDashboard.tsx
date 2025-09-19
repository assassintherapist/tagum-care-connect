import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Calendar, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  FileText,
  Bell,
  Settings,
  LogOut,
  UserCheck,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in real app this would come from Supabase
  const stats = {
    totalPatients: 247,
    activePatients: 198,
    pendingAppointments: 15,
    criticalCases: 3,
    todayAppointments: 8,
    complianceRate: 94
  };

  const pendingAppointments = [
    {
      id: 1,
      patientName: "Maria Santos",
      patientId: "P001",
      requestedDate: "2024-01-15",
      requestedTime: "10:00 AM",
      type: "Routine Check-up",
      priority: "normal"
    },
    {
      id: 2,
      patientName: "John Doe",
      patientId: "P002", 
      requestedDate: "2024-01-16",
      requestedTime: "2:30 PM",
      type: "Lab Results Review",
      priority: "high"
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      message: "Patient P045 missed last 2 appointments",
      type: "attendance",
      priority: "high"
    },
    {
      id: 2,
      message: "Lab results pending review for 3 patients",
      type: "lab",
      priority: "medium"
    }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Admin session ended securely"
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Healthcare Management Portal</h1>
              <p className="text-sm text-muted-foreground">Tagum City HIV Care Center</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
              <Badge className="ml-2 bg-destructive text-destructive-foreground text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="medical-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Patients</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalPatients}</p>
                </div>
                <Users className="w-6 h-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Active Cases</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activePatients}</p>
                </div>
                <UserCheck className="w-6 h-6 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Today's Visits</p>
                  <p className="text-2xl font-bold text-foreground">{stats.todayAppointments}</p>
                </div>
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingAppointments}</p>
                </div>
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Critical</p>
                  <p className="text-2xl font-bold text-foreground">{stats.criticalCases}</p>
                </div>
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Compliance</p>
                  <p className="text-2xl font-bold text-foreground">{stats.complianceRate}%</p>
                </div>
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Appointment Requests */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Pending Appointment Requests</span>
              </CardTitle>
              <CardDescription>
                Review and approve patient appointment requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">Patient ID: {appointment.patientId}</p>
                      </div>
                      <Badge 
                        variant={appointment.priority === 'high' ? 'destructive' : 'secondary'}
                      >
                        {appointment.priority} priority
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{appointment.type}</p>
                      <p>{appointment.requestedDate} at {appointment.requestedTime}</p>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="bg-success hover:bg-success/90">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" onClick={() => navigate('/admin/appointments')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  View All Appointments
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Critical Alerts */}
          <Card className="medical-card border-destructive/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span>Critical Alerts</span>
              </CardTitle>
              <CardDescription>
                Issues requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{alert.message}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline" onClick={() => navigate('/admin/alerts')}>
                  <Activity className="w-4 h-4 mr-2" />
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Card className="medical-card hover:shadow-elevated cursor-pointer" onClick={() => navigate('/admin/patients')}>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Patient Management</h3>
              <p className="text-sm text-muted-foreground">View and manage patient cases</p>
            </CardContent>
          </Card>

          <Card className="medical-card hover:shadow-elevated cursor-pointer" onClick={() => navigate('/admin/reports')}>
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Reports & Analytics</h3>
              <p className="text-sm text-muted-foreground">Generate healthcare reports</p>
            </CardContent>
          </Card>

          <Card className="medical-card hover:shadow-elevated cursor-pointer" onClick={() => navigate('/admin/settings')}>
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">System Management</h3>
              <p className="text-sm text-muted-foreground">Configure system settings</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;