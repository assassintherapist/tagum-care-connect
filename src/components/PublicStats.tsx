import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Calendar, MapPin } from "lucide-react";

const mockStats = {
  totalTested: 2847,
  totalPositive: 91,
  monthlyTests: 156,
  monthlyPositive: 5,
  positiveRate: 3.2,
  treatmentCoverage: 92.5,
  activeCases: 78,
  barangayData: [
    { name: "Apokon", tested: 245, positive: 8, active: 6 },
    { name: "Magugpo", tested: 198, positive: 6, active: 5 },
    { name: "Mankilam", tested: 167, positive: 4, active: 3 },
    { name: "La Filipina", tested: 134, positive: 3, active: 2 },
    { name: "Cuambogan", tested: 125, positive: 5, active: 4 },
    { name: "Pagsabangan", tested: 98, positive: 2, active: 2 },
    { name: "New Visayas", tested: 87, positive: 3, active: 1 },
    { name: "Rizal", tested: 76, positive: 1, active: 1 }
  ],
  ageGroups: [
    { name: "15-24", value: 28, color: "#10b981" },
    { name: "25-34", value: 42, color: "#059669" },
    { name: "35-44", value: 23, color: "#047857" },
    { name: "45+", value: 7, color: "#065f46" }
  ]
};

export const PublicStats = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">HIV Care Statistics</h2>
        <p className="text-muted-foreground">Public health indicators for Tagum City</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tested</p>
                <p className="text-2xl font-bold text-primary">{mockStats.totalTested.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Positive Cases</p>
                <p className="text-2xl font-bold text-secondary">{mockStats.totalPositive}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold text-accent">{mockStats.activeCases}</p>
              </div>
              <MapPin className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-primary">{mockStats.monthlyTests}</p>
                <p className="text-xs text-muted-foreground">tests</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Positive</p>
                <p className="text-2xl font-bold text-secondary">{mockStats.monthlyPositive}</p>
                <p className="text-xs text-muted-foreground">this month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Barangay Data */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-primary">Cases by Barangay</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockStats.barangayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    value, 
                    name === 'tested' ? 'Tested' : 
                    name === 'positive' ? 'Positive Cases' : 'Active Cases'
                  ]}
                />
                <Bar dataKey="tested" fill="hsl(var(--primary))" name="tested" />
                <Bar dataKey="positive" fill="hsl(var(--secondary))" name="positive" />
                <Bar dataKey="active" fill="hsl(var(--accent))" name="active" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Group Distribution */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-primary">Cases by Age Group</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockStats.ageGroups}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {mockStats.ageGroups.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Progress */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-primary">Treatment Cascade Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Diagnosis Rate</span>
              <span>89%</span>
            </div>
            <Progress value={89} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Linkage to Care</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Treatment Retention</span>
              <span>92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Viral Suppression</span>
              <span>88%</span>
            </div>
            <Progress value={88} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};