import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Megaphone, Calendar, User, Clock } from "lucide-react";
import { format } from "date-fns";

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  author: string;
  provider: string;
  createdAt: Date;
  isRead?: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Extended Testing Hours This Week",
    content: "We will be offering extended testing hours from Monday to Friday (7:00 AM - 8:00 PM) to accommodate more patients. No appointment necessary for walk-in testing.",
    priority: "high",
    author: "Dr. Maria Santos",
    provider: "CHO",
    createdAt: new Date(Date.now() - 60000 * 60 * 2)
  },
  {
    id: "2", 
    title: "New Support Group Sessions",
    content: "Join our weekly support group sessions every Wednesday at 3:00 PM. This is a safe space to share experiences and receive peer support. Sessions are completely confidential.",
    priority: "medium",
    author: "Counselor Jane Reyes",
    provider: "Red STAR Clinic",
    createdAt: new Date(Date.now() - 60000 * 60 * 24)
  },
  {
    id: "3",
    title: "Medication Adherence Workshop",
    content: "Learn about the importance of medication adherence and strategies to help you stay on track with your treatment. Free workshop this Saturday at 10:00 AM.",
    priority: "medium",
    author: "Pharmacist John Cruz",
    provider: "CHO",
    createdAt: new Date(Date.now() - 60000 * 60 * 48)
  },
  {
    id: "4",
    title: "Holiday Schedule Update",
    content: "Please note that our clinic will be closed on December 25th and January 1st. Emergency services will still be available through the main hospital.",
    priority: "low",
    author: "Admin Team",
    provider: "Red STAR Clinic",
    createdAt: new Date(Date.now() - 60000 * 60 * 72)
  }
];

export const PatientAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem("patientAnnouncements");
    return saved ? JSON.parse(saved).map((a: any) => ({
      ...a,
      createdAt: new Date(a.createdAt)
    })) : mockAnnouncements;
  });

  useEffect(() => {
    localStorage.setItem("patientAnnouncements", JSON.stringify(announcements));
  }, [announcements]);

  const markAsRead = (id: string) => {
    setAnnouncements(prev => 
      prev.map(ann => 
        ann.id === id ? { ...ann, isRead: true } : ann
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getProviderColor = (provider: string) => {
    return provider === "CHO" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground";
  };

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Announcements</h2>
          <p className="text-muted-foreground">Important updates from your healthcare providers</p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-sm">
            {unreadCount} unread
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card 
            key={announcement.id} 
            className={`medical-card transition-all ${
              !announcement.isRead ? "border-primary/50 shadow-md" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Megaphone className="w-5 h-5 text-primary" />
                    {announcement.title}
                    {!announcement.isRead && (
                      <Badge variant="destructive" className="text-xs">NEW</Badge>
                    )}
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(announcement.priority)}>
                    {announcement.priority.toUpperCase()}
                  </Badge>
                  <Badge className={getProviderColor(announcement.provider)}>
                    {announcement.provider}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {announcement.content}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{announcement.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{format(announcement.createdAt, "MMM d, yyyy 'at' h:mm a")}</span>
                  </div>
                </div>

                {!announcement.isRead && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => markAsRead(announcement.id)}
                    className="text-primary border-primary/50 hover:bg-primary/10"
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {announcements.length === 0 && (
          <Card className="medical-card">
            <CardContent className="text-center py-12">
              <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Announcements</h3>
              <p className="text-muted-foreground">
                Check back later for important updates from your healthcare providers.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};