import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for Tagum City barangays with HIV case statistics and testing data
const barangayData = [
  { name: "Poblacion", lat: 7.4479, lng: 126.1740, cases: 45, population: 8500, tested: 287, positive: 45 },
  { name: "Mankilam", lat: 7.4520, lng: 126.1820, cases: 32, population: 12000, tested: 456, positive: 32 },
  { name: "San Agustin", lat: 7.4400, lng: 126.1650, cases: 28, population: 9800, tested: 378, positive: 28 },
  { name: "Magugpo Poblacion", lat: 7.4350, lng: 126.1780, cases: 41, population: 11200, tested: 523, positive: 41 },
  { name: "Nueva Fuerza", lat: 7.4600, lng: 126.1900, cases: 15, population: 6700, tested: 234, positive: 15 },
  { name: "Magugpo Este", lat: 7.4280, lng: 126.1850, cases: 23, population: 8900, tested: 298, positive: 23 },
  { name: "Magugpo Norte", lat: 7.4450, lng: 126.1950, cases: 19, population: 7400, tested: 245, positive: 19 },
  { name: "Visayan Village", lat: 7.4520, lng: 126.1600, cases: 37, population: 10600, tested: 412, positive: 37 },
  { name: "Cuambogan", lat: 7.4150, lng: 126.1700, cases: 12, population: 5200, tested: 167, positive: 12 },
  { name: "Bincungan", lat: 7.4680, lng: 126.1720, cases: 8, population: 4100, tested: 124, positive: 8 }
];

const BarangayHeatmap = () => {
  const getIntensityColor = (cases: number) => {
    if (cases >= 40) return 'bg-red-500';
    if (cases >= 25) return 'bg-orange-500';
    if (cases >= 15) return 'bg-yellow-500';
    if (cases >= 8) return 'bg-green-400';
    return 'bg-green-600';
  };

  const getIntensityLabel = (cases: number) => {
    if (cases >= 40) return 'Very High';
    if (cases >= 25) return 'High';
    if (cases >= 15) return 'Medium';
    if (cases >= 8) return 'Low-Medium';
    return 'Low';
  };

  const maxCases = Math.max(...barangayData.map(b => b.cases));

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>HIV Cases Distribution - Tagum City Barangays</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Grid visualization of barangays */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {barangayData
            .sort((a, b) => b.cases - a.cases)
            .map((barangay) => (
            <div
              key={barangay.name}
              className={`p-4 rounded-lg border-2 ${getIntensityColor(barangay.cases)} bg-opacity-20 border-opacity-40`}
              style={{
                borderColor: `hsl(var(--${barangay.cases >= 25 ? 'destructive' : barangay.cases >= 15 ? 'warning' : 'success'}))`
              }}
            >
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground text-sm">{barangay.name}</h3>
                <div className="relative">
                  <div className="text-2xl font-bold text-foreground">{barangay.cases}</div>
                  <div className="text-xs text-muted-foreground">cases</div>
                </div>
                <Badge 
                  variant={barangay.cases >= 25 ? 'destructive' : barangay.cases >= 15 ? 'secondary' : 'outline'}
                  className="text-xs"
                >
                  {getIntensityLabel(barangay.cases)}
                </Badge>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Tested: {barangay.tested}</div>
                  <div>Rate: {((barangay.positive / barangay.tested) * 100).toFixed(1)}%</div>
                </div>
                {/* Visual intensity bar */}
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getIntensityColor(barangay.cases)}`}
                    style={{ width: `${(barangay.cases / maxCases) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Risk Level Classification</h4>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>Very High (40+ cases)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span>High (25-39 cases)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>Medium (15-24 cases)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-400"></div>
              <span>Low-Medium (8-14 cases)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <span>Low (&lt;8 cases)</span>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Tests: </span>
              <span className="font-semibold">{barangayData.reduce((sum, b) => sum + b.tested, 0).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Total Positive: </span>
              <span className="font-semibold">{barangayData.reduce((sum, b) => sum + b.positive, 0)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Overall Rate: </span>
              <span className="font-semibold">
                {((barangayData.reduce((sum, b) => sum + b.positive, 0) / barangayData.reduce((sum, b) => sum + b.tested, 0)) * 100).toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Per 1,000: </span>
              <span className="font-semibold">
                {((barangayData.reduce((sum, b) => sum + b.positive, 0) / barangayData.reduce((sum, b) => sum + b.population, 0)) * 1000).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarangayHeatmap;