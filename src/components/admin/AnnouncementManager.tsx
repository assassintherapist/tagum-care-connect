import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Megaphone, 
  Plus, 
  Edit3, 
  Trash2, 
  Send, 
  Eye,
  AlertCircle,
  Info,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  targetAudience: 'all' | 'patients' | 'staff';
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

interface AnnouncementManagerProps {
  userType: 'admin' | 'staff';
  canCreateAnnouncements: boolean;
}

const AnnouncementManager: React.FC<AnnouncementManagerProps> = ({ 
  userType, 
  canCreateAnnouncements 
}) => {
  const { toast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Extended Clinic Hours This Week',
      content: 'Our clinic will be open until 7 PM from Monday to Friday to accommodate more patients.',
      type: 'info',
      targetAudience: 'all',
      createdBy: 'Admin',
      createdAt: '2024-01-10',
      isActive: true
    },
    {
      id: '2',
      title: 'Important: Medication Pickup Reminder',
      content: 'Please ensure to pick up your monthly medication supply. Late pickups may affect treatment continuity.',
      type: 'warning',
      targetAudience: 'patients',
      createdBy: 'Dr. Maria Santos',
      createdAt: '2024-01-09',
      isActive: true
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState<{
    title: string;
    content: string;
    type: 'info' | 'warning' | 'success';
    targetAudience: 'all' | 'patients' | 'staff';
  }>({
    title: '',
    content: '',
    type: 'info',
    targetAudience: 'all'
  });

  const handleCreateAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const announcement: Announcement = {
      id: Date.now().toString(),
      ...newAnnouncement,
      createdBy: userType === 'admin' ? 'Admin' : 'Staff Member',
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', content: '', type: 'info', targetAudience: 'all' });
    setIsCreating(false);
    
    toast({
      title: "Success",
      description: "Announcement created successfully"
    });
  };

  const toggleAnnouncementStatus = (id: string) => {
    setAnnouncements(announcements.map(ann => 
      ann.id === id ? { ...ann, isActive: !ann.isActive } : ann
    ));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
    toast({
      title: "Success",
      description: "Announcement deleted successfully"
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Megaphone className="w-5 h-5 text-primary" />
            <span>Announcements & Communications</span>
          </CardTitle>
          {canCreateAnnouncements && (
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="w-4 h-4 mr-2" />
              New Announcement
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Create New Announcement Form */}
        {isCreating && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Create New Announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Announcement title..."
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
              />
              <Textarea
                placeholder="Announcement content..."
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                rows={4}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select 
                  value={newAnnouncement.type} 
                  onValueChange={(value) => 
                    setNewAnnouncement({ ...newAnnouncement, type: value as 'info' | 'warning' | 'success' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Information</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
                <Select 
                  value={newAnnouncement.targetAudience} 
                  onValueChange={(value) => 
                    setNewAnnouncement({ ...newAnnouncement, targetAudience: value as 'all' | 'patients' | 'staff' })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="patients">Patients Only</SelectItem>
                    <SelectItem value="staff">Staff Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateAnnouncement} className="flex-1">
                  <Send className="w-4 h-4 mr-2" />
                  Publish Announcement
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreating(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Announcements List */}
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className={`${!announcement.isActive ? 'opacity-60' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getTypeIcon(announcement.type)}
                      <h3 className="font-semibold text-foreground">{announcement.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {announcement.targetAudience}
                      </Badge>
                      {!announcement.isActive && (
                        <Badge variant="destructive" className="text-xs">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                    <div className="text-xs text-muted-foreground">
                      By {announcement.createdBy} on {announcement.createdAt}
                    </div>
                  </div>
                  {canCreateAnnouncements && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleAnnouncementStatus(announcement.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteAnnouncement(announcement.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnouncementManager;