import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Shield, Users, Calendar } from "lucide-react";
import { AnonymousBooking } from "@/components/AnonymousBooking";
import { PublicStats } from "@/components/PublicStats";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-muted">
      {/* Header */}
      <header className="px-6 py-4 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">HIV Care System</h1>
              <p className="text-sm text-muted-foreground">Tagum City Digital Health</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive HIV Care &
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Case Management</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            A secure, digital platform connecting patients with healthcare providers 
            for seamless HIV care management in Tagum City.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Patient Card */}
            <Card className="medical-card group hover:shadow-elevated cursor-pointer border-2 hover:border-primary/50" 
                  onClick={() => navigate('/patient/login')}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Patient Access</h3>
                <p className="text-muted-foreground mb-6">
                  Manage your health journey, schedule appointments, and track your treatment progress.
                </p>
                <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
                  Continue as Patient
                </Button>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Appointment Management</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Health Monitoring</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="medical-card group hover:shadow-elevated cursor-pointer border-2 hover:border-secondary/50" 
                  onClick={() => navigate('/admin/login')}>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">Healthcare Provider</h3>
                <p className="text-muted-foreground mb-6">
                  Manage patient cases, approve appointments, and oversee comprehensive care delivery.
                </p>
                <Button className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground">
                  Continue as Provider
                </Button>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Case Management</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Patient Oversight</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Anonymous Booking Section */}
      <section className="px-6 py-16 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Book an Appointment
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            <AnonymousBooking />
            <Card className="medical-card">
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold text-foreground mb-4">Anonymous & Confidential</h4>
                <div className="space-y-4 text-muted-foreground">
                  <p>Your privacy is our priority. Book appointments using a codename for complete confidentiality.</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm">Flexible scheduling options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm">Complete confidentiality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-primary" />
                      <span className="text-sm">Professional care</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Public Statistics Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <PublicStats />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Comprehensive Care Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Smart Scheduling</h4>
              <p className="text-muted-foreground">Automated appointment management with SMS reminders</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Health Monitoring</h4>
              <p className="text-muted-foreground">Track treatment progress and medication compliance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Secure Platform</h4>
              <p className="text-muted-foreground">HIPAA-compliant data protection and privacy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;