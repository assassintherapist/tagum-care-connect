import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Users, 
  Shield, 
  Database,
  Bell,
  Mail,
  Calendar,
  Activity,
  Save,
  Plus,
  Trash2,
  Edit
} from "lucide-react";

interface SystemConfig {
  notifications: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    appointmentReminders: boolean;
    followUpReminders: boolean;
  };
  appointments: {
    maxBookingsPerDay: number;
    bookingWindow: number; // days in advance
    reminderDays: number;
    cancellationWindow: number; // hours before appointment
  };
  security: {
    sessionTimeout: number; // minutes
    passwordRequirements: boolean;
    twoFactorAuth: boolean;
    dataEncryption: boolean;
  };
  system: {
    maintenanceMode: boolean;
    debugMode: boolean;
    autoBackup: boolean;
    backupFrequency: string;
  };
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  active: boolean;
  createdAt: string;
  expiresAt?: string;
}

const SystemSettings = () => {
  const { toast } = useToast();
  
  const [config, setConfig] = useState<SystemConfig>({
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      appointmentReminders: true,
      followUpReminders: true
    },
    appointments: {
      maxBookingsPerDay: 20,
      bookingWindow: 30,
      reminderDays: 1,
      cancellationWindow: 24
    },
    security: {
      sessionTimeout: 60,
      passwordRequirements: true,
      twoFactorAuth: false,
      dataEncryption: true
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      autoBackup: true,
      backupFrequency: 'daily'
    }
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ann001',
      title: 'System Maintenance Scheduled',
      content: 'Regular system maintenance will be performed on Sunday from 2 AM to 4 AM.',
      type: 'info',
      active: true,
      createdAt: '2024-01-10',
      expiresAt: '2024-01-20'
    },
    {
      id: 'ann002',
      title: 'New HIV Testing Guidelines',
      content: 'Updated testing protocols are now available. Please review the new guidelines.',
      type: 'warning',
      active: true,
      createdAt: '2024-01-08'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    type: 'info',
    active: true
  });

  const updateConfig = (section: keyof SystemConfig, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings Saved",
      description: "System configuration has been updated successfully.",
    });
  };

  const addAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const announcement: Announcement = {
      id: `ann${Date.now()}`,
      title: newAnnouncement.title!,
      content: newAnnouncement.content!,
      type: newAnnouncement.type as any || 'info',
      active: newAnnouncement.active ?? true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAnnouncements([...announcements, announcement]);
    setNewAnnouncement({ title: '', content: '', type: 'info', active: true });

    toast({
      title: "Success",
      description: "Announcement added successfully.",
    });
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
    toast({
      title: "Success",
      description: "Announcement deleted successfully.",
    });
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements(announcements.map(a => 
      a.id === id ? { ...a, active: !a.active } : a
    ));
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-primary text-primary-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'success': return 'bg-success text-success-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
        <p className="text-muted-foreground">Configure system-wide settings and announcements</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-card">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Appointment Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Max Bookings Per Day</Label>
                  <Input
                    type="number"
                    value={config.appointments.maxBookingsPerDay}
                    onChange={(e) => updateConfig('appointments', 'maxBookingsPerDay', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Booking Window (Days)</Label>
                  <Input
                    type="number"
                    value={config.appointments.bookingWindow}
                    onChange={(e) => updateConfig('appointments', 'bookingWindow', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Reminder Days</Label>
                  <Input
                    type="number"
                    value={config.appointments.reminderDays}
                    onChange={(e) => updateConfig('appointments', 'reminderDays', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Cancellation Window (Hours)</Label>
                  <Input
                    type="number"
                    value={config.appointments.cancellationWindow}
                    onChange={(e) => updateConfig('appointments', 'cancellationWindow', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-primary" />
                <span>System Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable public access</p>
                  </div>
                  <Switch
                    checked={config.system.maintenanceMode}
                    onCheckedChange={(checked) => updateConfig('system', 'maintenanceMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup system data</p>
                  </div>
                  <Switch
                    checked={config.system.autoBackup}
                    onCheckedChange={(checked) => updateConfig('system', 'autoBackup', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed logging</p>
                  </div>
                  <Switch
                    checked={config.system.debugMode}
                    onCheckedChange={(checked) => updateConfig('system', 'debugMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Send email notifications for important events</p>
                  </div>
                  <Switch
                    checked={config.notifications.emailAlerts}
                    onCheckedChange={(checked) => updateConfig('notifications', 'emailAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Send SMS notifications</p>
                  </div>
                  <Switch
                    checked={config.notifications.smsAlerts}
                    onCheckedChange={(checked) => updateConfig('notifications', 'smsAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Appointment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send appointment reminders to patients</p>
                  </div>
                  <Switch
                    checked={config.notifications.appointmentReminders}
                    onCheckedChange={(checked) => updateConfig('notifications', 'appointmentReminders', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Follow-up Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send follow-up care reminders</p>
                  </div>
                  <Switch
                    checked={config.notifications.followUpReminders}
                    onCheckedChange={(checked) => updateConfig('notifications', 'followUpReminders', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Session Timeout (Minutes)</Label>
                <Input
                  type="number"
                  value={config.security.sessionTimeout}
                  onChange={(e) => updateConfig('security', 'sessionTimeout', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Strong Password Requirements</Label>
                    <p className="text-sm text-muted-foreground">Enforce complex password policies</p>
                  </div>
                  <Switch
                    checked={config.security.passwordRequirements}
                    onCheckedChange={(checked) => updateConfig('security', 'passwordRequirements', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={config.security.twoFactorAuth}
                    onCheckedChange={(checked) => updateConfig('security', 'twoFactorAuth', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt sensitive patient data</p>
                  </div>
                  <Switch
                    checked={config.security.dataEncryption}
                    onCheckedChange={(checked) => updateConfig('security', 'dataEncryption', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary" />
                <span>Add New Announcement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    placeholder="Enter announcement title"
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <select 
                    className="w-full p-2 border rounded-md bg-background"
                    value={newAnnouncement.type}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value as any})}
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Content</Label>
                <Textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                  placeholder="Enter announcement content"
                />
              </div>
              <Button onClick={addAnnouncement}>
                <Plus className="w-4 h-4 mr-2" />
                Add Announcement
              </Button>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Active Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 bg-gradient-subtle rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                        <Badge className={getAnnouncementColor(announcement.type)}>
                          {announcement.type}
                        </Badge>
                        {announcement.active && (
                          <Badge className="bg-success text-success-foreground">Active</Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAnnouncement(announcement.id)}
                        >
                          {announcement.active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteAnnouncement(announcement.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{announcement.content}</p>
                    <div className="text-xs text-muted-foreground">
                      Created: {announcement.createdAt}
                      {announcement.expiresAt && ` • Expires: ${announcement.expiresAt}`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={saveSettings} className="bg-primary text-primary-foreground">
          <Save className="w-4 h-4 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SystemSettings;