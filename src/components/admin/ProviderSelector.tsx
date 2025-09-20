import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Calendar, TrendingUp } from "lucide-react";

const providers = [
  {
    id: 'cho',
    name: 'City Health Office',
    shortName: 'CHO',
    description: 'Tagum City Health Office - Primary HIV Care Center',
    patients: 186,
    activeStaff: 12,
    monthlyVisits: 234,
    color: 'bg-primary'
  },
  {
    id: 'redstar',
    name: 'Red STAR Clinic',
    shortName: 'Red STAR',
    description: 'Specialized Treatment & Antiretroviral Clinic',
    patients: 61,
    activeStaff: 5,
    monthlyVisits: 89,
    color: 'bg-destructive'
  }
];

interface ProviderSelectorProps {
  selectedProvider: string;
  onProviderChange: (providerId: string) => void;
  onProviderSelect?: (providerId: string) => void;
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({ 
  selectedProvider, 
  onProviderChange,
  onProviderSelect
}) => {
  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-secondary" />
          <span>Healthcare Service Providers</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedProvider === provider.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => {
                onProviderChange(provider.id);
                onProviderSelect?.(provider.id);
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${provider.color} rounded-lg flex items-center justify-center`}>
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{provider.shortName}</h3>
                    <p className="text-xs text-muted-foreground">{provider.name}</p>
                  </div>
                </div>
                {selectedProvider === provider.id && (
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary mr-1" />
                    <span className="text-sm font-medium">{provider.patients}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Patients</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-secondary mr-1" />
                    <span className="text-sm font-medium">{provider.monthlyVisits}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm font-medium">{provider.activeStaff}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Staff</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total System Coverage:</span>
            <span className="font-semibold text-foreground">
              {providers.reduce((sum, p) => sum + p.patients, 0)} Patients
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderSelector;