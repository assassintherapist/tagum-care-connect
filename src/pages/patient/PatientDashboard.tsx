import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  LogOut,
  Activity,
  TrendingUp,
  MessageCircle,
  BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PatientAnnouncements } from "@/components/patient/PatientAnnouncements";
import { HIVInformation } from "@/components/patient/HIVInformation";
import { CommunityChat } from "@/components/patient/CommunityChat";
import ProfileEditor from "@/components/admin/ProfileEditor";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data - in real app this would come from Supabase
  const upcomingAppointments = [
    {
      id: 1,
      type: "Regular Check-up",
      date: "Jan 15, 2024",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 2,
      type: "Lab Work",
      date: "Jan 22, 2024", 
      time: "9:00 AM",
      status: "pending"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      activity: "Lab results received",
      date: "2 days ago",
      type: "success"
    },
    {
      id: 2,
      activity: "Appointment scheduled",
      date: "5 days ago", 
      type: "info"
    },
    {
      id: 3,
      activity: "Medication reminder",
      date: "1 week ago",
      type: "warning"
    }
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
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="hiv-info" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              HIV Information
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            {/* Quick Stats */}
            <div className="dashboard-grid">
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
                      <p className="text-sm text-accent">On track</p>
                    </div>
                    <Heart className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Compliance</p>
                      <p className="text-2xl font-bold text-foreground">98%</p>
                      <p className="text-sm text-accent">Excellent</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Upcoming Appointments</span>
                  </CardTitle>
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
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
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

              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-primary" />
                    <span>Health Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-medium text-accent">Treatment On Track</p>
                          <p className="text-sm text-muted-foreground">Last updated: Jan 10, 2024</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Medication Adherence</span>
                        <span className="text-sm font-medium text-accent">98%</span>
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="announcements">
            <PatientAnnouncements />
          </TabsContent>

          <TabsContent value="hiv-info">
            <HIVInformation />
          </TabsContent>

          <TabsContent value="community">
            <CommunityChat />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileEditor userType="patient" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;