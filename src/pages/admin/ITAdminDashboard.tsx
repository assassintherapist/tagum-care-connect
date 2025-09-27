import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LogOut, 
  Users, 
  Calendar, 
  Activity, 
  Database,
  BarChart3,
  Settings,
  MapPin,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockAppointments, mockPatients, mockBarangayData } from '@/data/mockData';
import FacilityManager from '@/components/admin/FacilityManager';
import SystemSettings from '@/components/admin/SystemSettings';

const ITAdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Calculate statistics
  const totalAppointments = mockAppointments.length;
  const totalPatients = mockPatients.length;
  const activePatients = mockPatients.filter(p => p.status === 'Active').length;
  const totalActiveCases = mockBarangayData.reduce((sum, b) => sum + b.activeCases, 0);
  const totalTests = mockBarangayData.reduce((sum, b) => sum + b.testsPerformed, 0);

  const appointmentsByFacility = {
    CHO: mockAppointments.filter(a => a.facility === 'CHO').length,
    'Red STAR Clinic': mockAppointments.filter(a => a.facility === 'Red STAR Clinic').length
  };

  const patientsByFacility = {
    CHO: mockPatients.filter(p => p.registeredAt === 'CHO').length,
    'Red STAR Clinic': mockPatients.filter(p => p.registeredAt === 'Red STAR Clinic').length
  };

  return (
    <div className="min-h-screen bg-gradient-muted">
      {/* Header */}
      <header className="bg-card border-b border-border/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">IT Administration Portal</h1>
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
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalPatients}</p>
                      <p className="text-sm text-muted-foreground">Total Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-success" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{activePatients}</p>
                      <p className="text-sm text-muted-foreground">Active Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalAppointments}</p>
                      <p className="text-sm text-muted-foreground">Total Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="medical-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{totalTests}</p>
                      <p className="text-sm text-muted-foreground">Tests Performed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Facility Overview */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span>Facility Performance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">CHO (City Health Office)</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Registered Patients:</span>
                        <Badge variant="outline">{patientsByFacility.CHO}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Appointments:</span>
                        <Badge variant="outline">{appointmentsByFacility.CHO}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Red STAR Clinic</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Registered Patients:</span>
                        <Badge variant="outline">{patientsByFacility['Red STAR Clinic']}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Appointments:</span>
                        <Badge variant="outline">{appointmentsByFacility['Red STAR Clinic']}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span>Barangay Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBarangayData.map((barangay) => (
                    <div key={barangay.barangay} className="p-4 bg-gradient-subtle rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-primary" />
                          {barangay.barangay}
                        </h3>
                        <Badge className="bg-primary text-primary-foreground">
                          Population: {barangay.population.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Active Cases:</span>
                          <p className="font-semibold text-destructive">{barangay.activeCases}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">New Cases:</span>
                          <p className="font-semibold text-warning">{barangay.newCases}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tests Performed:</span>
                          <p className="font-semibold text-success">{barangay.testsPerformed}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities" className="space-y-6">
            <FacilityManager />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-subtle rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Monthly Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Total Active Cases:</span>
                        <p className="font-semibold text-foreground">{totalActiveCases}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">New Registrations:</span>
                        <p className="font-semibold text-foreground">
                          {mockBarangayData.reduce((sum, b) => sum + b.newCases, 0)}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tests Conducted:</span>
                        <p className="font-semibold text-foreground">{totalTests}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Appointments:</span>
                        <p className="font-semibold text-foreground">{totalAppointments}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ITAdminDashboard;