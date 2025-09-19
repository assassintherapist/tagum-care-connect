import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, Link } from "react-router-dom";
import { Calendar as CalendarIcon, Clock, ArrowLeft, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientAppointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data - in real app this would come from Supabase
  const appointments = [
    {
      id: 1,
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Routine Check-up",
      status: "confirmed",
      doctor: "Dr. Maria Santos",
      location: "Room 201"
    },
    {
      id: 2,
      date: "2024-01-22",
      time: "2:30 PM",
      type: "Lab Results Review",
      status: "pending",
      doctor: "Dr. John Cruz",
      location: "Room 105"
    },
    {
      id: 3,
      date: "2024-01-08",
      time: "9:00 AM",
      type: "Follow-up Consultation",
      status: "completed",
      doctor: "Dr. Maria Santos",
      location: "Room 201"
    }
  ];

  const handleScheduleNew = () => {
    toast({
      title: "Appointment Request",
      description: "This feature requires backend integration with Supabase",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'status-success';
      case 'pending': return 'status-pending';
      case 'completed': return 'bg-muted text-muted-foreground border-muted';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Link to="/patient/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
              <p className="text-muted-foreground">Manage your healthcare appointments</p>
            </div>
            <Button onClick={handleScheduleNew} className="bg-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <span>Calendar</span>
              </CardTitle>
              <CardDescription>
                Select a date to view appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled healthcare visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments
                    .filter(apt => apt.status !== 'completed')
                    .map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{appointment.type}</h3>
                          <p className="text-sm text-muted-foreground">with {appointment.doctor}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Location: {appointment.location}
                      </p>
                      {appointment.status === 'pending' && (
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Past Appointments */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>
                  Your appointment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments
                    .filter(apt => apt.status === 'completed')
                    .map((appointment) => (
                    <div key={appointment.id} className="p-4 bg-muted/20 rounded-lg border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{appointment.type}</h3>
                          <p className="text-sm text-muted-foreground">with {appointment.doctor}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Location: {appointment.location}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Information Card */}
        <Card className="medical-card mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Appointment Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Please arrive 15 minutes before your scheduled time</li>
                  <li>• Bring your ID and any relevant medical documents</li>
                  <li>• If you need to reschedule, please do so at least 24 hours in advance</li>
                  <li>• For urgent concerns, call our emergency hotline: 0915-123-4567</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientAppointments;