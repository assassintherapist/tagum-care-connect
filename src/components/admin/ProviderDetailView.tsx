import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Calendar, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Activity,
  TestTube,
  Stethoscope
} from "lucide-react";

interface ProviderDetailProps {
  provider: {
    id: string;
    name: string;
    shortName: string;
    description: string;
    patients: number;
    activeStaff: number;
    monthlyVisits: number;
    color: string;
    address?: string;
    phone?: string;
    email?: string;
    operatingHours?: string;
    testsPerformed?: number;
    activePrograms?: string[];
  };
  onClose: () => void;
}

const ProviderDetailView: React.FC<ProviderDetailProps> = ({ provider, onClose }) => {
  return (
    <Card className="medical-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 ${provider.color} rounded-xl flex items-center justify-center`}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{provider.name}</CardTitle>
              <p className="text-muted-foreground">{provider.description}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              Contact Information
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                {provider.address || "Tagum City, Davao del Norte"}
              </p>
              <p className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                {provider.phone || "+63 84 216 3456"}
              </p>
              <p className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                {provider.email || `${provider.id}@tagumcity.gov.ph`}
              </p>
              <p className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                {provider.operatingHours || "8:00 AM - 5:00 PM (Mon-Fri)"}
              </p>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center">
              <Activity className="w-4 h-4 mr-2 text-secondary" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{provider.patients}</div>
                <div className="text-xs text-muted-foreground">Active Patients</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{provider.testsPerformed || 342}</div>
                <div className="text-xs text-muted-foreground">Tests This Month</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{provider.monthlyVisits}</div>
                <div className="text-xs text-muted-foreground">Monthly Visits</div>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg text-center">
                <div className="text-lg font-bold text-foreground">{provider.activeStaff}</div>
                <div className="text-xs text-muted-foreground">Active Staff</div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Programs */}
        <div>
          <h3 className="font-semibold text-foreground flex items-center mb-3">
            <Stethoscope className="w-4 h-4 mr-2 text-accent" />
            Active Programs & Services
          </h3>
          <div className="flex flex-wrap gap-2">
            {(provider.activePrograms || [
              "HIV Testing & Counseling",
              "Antiretroviral Therapy",
              "Prevention Education",
              "Contact Tracing",
              "Peer Support Groups"
            ]).map((program, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                {program}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button variant="outline" className="flex-1">
            <TestTube className="w-4 h-4 mr-2" />
            View Lab Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderDetailView;