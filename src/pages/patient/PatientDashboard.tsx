import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Heart, 
  Clock, 
  FileText, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  Bell,
  User,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in real app this would come from Supabase
  const upcomingAppointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Routine Check-up",
      status: "confirmed"
    },
    {
      id: 2,
      date: "2024-01-22",
      time: "2:30 PM", 
      type: "Lab Results Review",
      status: "pending"
    }
  ];

  const recentActivity = [
    { id: 1, activity: "Lab results uploaded", date: "2024-01-10", type: "success" },
    { id: 2, activity: "Appointment confirmed", date: "2024-01-08", type: "info" },
    { id: 3, activity: "Medication reminder sent", date: "2024-01-05", type: "warning" }
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "Thank you for using our service"
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">My Health Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, Maria</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Stats */}
        <div className="dashboard-grid mb-8">
          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Appointment</p>
                  <p className="text-2xl font-bold text-foreground">Jan 15</p>
                  <p className="text-sm text-primary">10:00 AM</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Treatment Days</p>
                  <p className="text-2xl font-bold text-foreground">45</p>
                  <p className="text-sm text-success">On track</p>
                </div>
                <Heart className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-sm text-success">Excellent</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Upcoming Appointments</span>
              </CardTitle>
              <CardDescription>
                Your scheduled healthcare visits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <Badge 
                      variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                      className={appointment.status === 'confirmed' ? 'status-success' : 'status-pending'}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                ))}
                <Button className="w-full" variant="outline" onClick={() => navigate('/patient/appointments')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule New Appointment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Health Overview */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-primary" />
                <span>Health Overview</span>
              </CardTitle>
              <CardDescription>
                Your current health status and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div>
                      <p className="font-medium text-success">Treatment On Track</p>
                      <p className="text-sm text-muted-foreground">Last updated: Jan 10, 2024</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Medication Adherence</span>
                    <span className="text-sm font-medium text-success">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Last Lab Test</span>
                    <span className="text-sm font-medium text-foreground">Jan 3, 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next Check-up</span>
                    <span className="text-sm font-medium text-primary">Jan 15, 2024</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline" onClick={() => navigate('/patient/health')}>
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Health Record
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="medical-card mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  {item.type === 'success' && <CheckCircle className="w-4 h-4 text-success" />}
                  {item.type === 'info' && <Clock className="w-4 h-4 text-primary" />}
                  {item.type === 'warning' && <AlertCircle className="w-4 h-4 text-warning" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.activity}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="medical-card mt-6 bg-destructive/5 border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Emergency Contact</h3>
                <p className="text-sm text-muted-foreground">
                  For urgent medical concerns, call our 24/7 hotline
                </p>
                <p className="text-lg font-bold text-destructive">0915-123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;