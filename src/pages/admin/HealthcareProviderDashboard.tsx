import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  LogOut, 
  Users, 
  Calendar, 
  Activity, 
  FileText,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockAppointments, mockPatients } from '@/data/mockData';

const HealthcareProviderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("appointments");

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Filter data based on user's facility
  const facilityAppointments = mockAppointments.filter(apt => apt.facility === user?.facility);
  const facilityPatients = mockPatients.filter(patient => patient.registeredAt === user?.facility);

  const todayAppointments = facilityAppointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date === today;
  });

  const upcomingAppointments = facilityAppointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0];
    return apt.date > today && apt.status === 'scheduled';
  });

  const activePatients = facilityPatients.filter(p => p.status === 'Active');
  const lostToFollowUp = facilityPatients.filter(p => p.status === 'Lost to Follow-up');

  return (
    <div className="min-h-screen bg-gradient-muted">
      {/* Header */}
      <header className="bg-card border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{user?.facility} Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patient Records</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            {/* Appointment Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{todayAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Today's Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{upcomingAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{facilityAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Total Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Appointments */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todayAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No appointments scheduled for today</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-gradient-subtle rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{appointment.codename}</h3>
                            <p className="text-sm text-muted-foreground">
                              {appointment.time} - {appointment.type}
                            </p>
                            {appointment.notes && (
                              <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                            )}
                          </div>
                          <Badge className={
                            appointment.status === 'scheduled' ? 'bg-primary text-primary-foreground' :
                            appointment.status === 'completed' ? 'bg-success text-success-foreground' :
                            appointment.status === 'cancelled' ? 'bg-destructive text-destructive-foreground' :
                            'bg-warning text-warning-foreground'
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-success" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No upcoming appointments</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppointments.slice(0, 5).map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-gradient-subtle rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{appointment.codename}</h3>
                            <p className="text-sm text-muted-foreground">
                              {appointment.date} at {appointment.time} - {appointment.type}
                            </p>
                          </div>
                          <Badge className="bg-primary text-primary-foreground">
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            {/* Patient Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{facilityPatients.length}</p>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{activePatients.length}</p>
                      <p className="text-sm text-muted-foreground">Active Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-warning" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{lostToFollowUp.length}</p>
                      <p className="text-sm text-muted-foreground">Lost to Follow-up</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Patient List */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Patient Records</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {facilityPatients.map((patient) => (
                    <div key={patient.id} className="p-4 bg-gradient-subtle rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{patient.codename}</h3>
                          <p className="text-sm text-muted-foreground">
                            {patient.age} years, {patient.gender} - {patient.barangay}
                          </p>
                        </div>
                        <Badge className={
                          patient.status === 'Active' ? 'bg-success text-success-foreground' :
                          patient.status === 'Lost to Follow-up' ? 'bg-warning text-warning-foreground' :
                          'bg-muted text-muted-foreground'
                        }>
                          {patient.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Last Visit:</span>
                          <p className="font-medium text-foreground">{patient.lastVisit}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">CD4 Count:</span>
                          <p className="font-medium text-foreground">{patient.cd4Count || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Viral Load:</span>
                          <p className="font-medium text-foreground">{patient.viralLoad || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ART Status:</span>
                          <p className="font-medium text-foreground">{patient.artStatus}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>{user?.facility} Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <h3 className="font-semibold text-foreground mb-4">Monthly Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{facilityPatients.length}</p>
                        <p className="text-sm text-muted-foreground">Total Patients</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{activePatients.length}</p>
                        <p className="text-sm text-muted-foreground">Active Cases</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{facilityAppointments.length}</p>
                        <p className="text-sm text-muted-foreground">Appointments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {facilityAppointments.filter(a => a.status === 'completed').length}
                        </p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Treatment Outcomes</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Patients on ART:</span>
                        <span className="text-foreground font-medium">
                          {facilityPatients.filter(p => p.artStatus === 'On Treatment').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Undetectable Viral Load:</span>
                        <span className="text-foreground font-medium">
                          {facilityPatients.filter(p => p.viralLoad === 'Undetectable').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lost to Follow-up:</span>
                        <span className="text-foreground font-medium">{lostToFollowUp.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default HealthcareProviderDashboard;