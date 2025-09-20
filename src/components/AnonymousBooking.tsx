import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, User } from "lucide-react";
import { format } from "date-fns";

export const AnonymousBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [formData, setFormData] = useState({
    codename: "",
    provider: "",
    service: "",
    timeSlot: "",
    notes: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !formData.codename || !formData.provider || !formData.service || !formData.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including provider selection.",
        variant: "destructive"
      });
      return;
    }

    // Save to localStorage (mock booking)
    const bookings = JSON.parse(localStorage.getItem("anonymousBookings") || "[]");
    const newBooking = {
      id: Date.now(),
      ...formData,
      date: selectedDate.toISOString(),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    localStorage.setItem("anonymousBookings", JSON.stringify(bookings));

    toast({
      title: "Appointment Requested",
      description: `Your appointment has been submitted with codename "${formData.codename}". You'll receive confirmation soon.`
    });

    // Reset form
    setFormData({ codename: "", provider: "", service: "", timeSlot: "", notes: "" });
    setSelectedDate(undefined);
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <User className="w-5 h-5" />
          Book Anonymous Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="codename">Codename *</Label>
            <Input
              id="codename"
              placeholder="Enter your preferred codename"
              value={formData.codename}
              onChange={(e) => setFormData(prev => ({ ...prev, codename: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="provider">Healthcare Provider *</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, provider: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select healthcare provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cho">CHO (City Health Office)</SelectItem>
                <SelectItem value="red-star">Red STAR Clinic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="service">Service Type *</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hiv-testing">HIV Testing</SelectItem>
                <SelectItem value="consultation">Medical Consultation</SelectItem>
                <SelectItem value="counseling">Counseling Session</SelectItem>
                <SelectItem value="follow-up">Follow-up Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-1"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="timeSlot">Time Slot *</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timeSlot: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any specific concerns or requests..."
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="mt-1"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
            <Clock className="w-4 h-4 mr-2" />
            Request Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};