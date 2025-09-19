import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, TrendingUp, TrendingDown } from "lucide-react";

const barangayStats = [
  { name: "Poblacion", cases: 45, population: 8500, trend: "up", rate: 5.29 },
  { name: "Magugpo Poblacion", cases: 41, population: 11200, trend: "up", rate: 3.66 },
  { name: "Visayan Village", cases: 37, population: 10600, trend: "stable", rate: 3.49 },
  { name: "Mankilam", cases: 32, population: 12000, trend: "down", rate: 2.67 },
  { name: "San Agustin", cases: 28, population: 9800, trend: "up", rate: 2.86 },
  { name: "Magugpo Este", cases: 23, population: 8900, trend: "stable", rate: 2.58 },
  { name: "Magugpo Norte", cases: 19, population: 7400, trend: "down", rate: 2.57 },
  { name: "Nueva Fuerza", cases: 15, population: 6700, trend: "stable", rate: 2.24 },
  { name: "Cuambogan", cases: 12, population: 5200, trend: "down", rate: 2.31 },
  { name: "Bincungan", cases: 8, population: 4100, trend: "stable", rate: 1.95 }
];

const BarangayStatistics = () => {
  const maxCases = Math.max(...barangayStats.map(b => b.cases));
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-destructive" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-success" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-warning"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'destructive';
      case 'down':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span>Cases by Barangay</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {barangayStats.map((barangay, index) => (
            <div key={barangay.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{index + 1}. {barangay.name}</span>
                  {getTrendIcon(barangay.trend)}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getTrendColor(barangay.trend) as any} className="text-xs">
                    {barangay.cases} cases
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {barangay.rate.toFixed(2)}/1k
                  </span>
                </div>
              </div>
              <Progress 
                value={(barangay.cases / maxCases) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Highest Rate:</p>
              <p className="font-medium">Poblacion (5.29/1k)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Lowest Rate:</p>
              <p className="font-medium">Bincungan (1.95/1k)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Cases:</p>
              <p className="font-medium">{barangayStats.reduce((sum, b) => sum + b.cases, 0)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Avg Rate:</p>
              <p className="font-medium">3.06/1k</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarangayStatistics;