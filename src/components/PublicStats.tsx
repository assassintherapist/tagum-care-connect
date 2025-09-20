import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Calendar, MapPin } from "lucide-react";

const mockStats = {
  totalTested: 2847,
  monthlyTests: 156,
  positiveRate: 3.2,
  treatmentCoverage: 92.5,
  barangayData: [
    { name: "Apokon", tested: 245, positive: 8 },
    { name: "Magugpo", tested: 198, positive: 6 },
    { name: "Mankilam", tested: 167, positive: 4 },
    { name: "La Filipina", tested: 134, positive: 3 },
    { name: "Cuambogan", tested: 125, positive: 5 }
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-accent">{mockStats.monthlyTests}</p>
              </div>
              <Calendar className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Positive Rate</p>
                <p className="text-2xl font-bold text-secondary">{mockStats.positiveRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Treatment Coverage</p>
                <p className="text-2xl font-bold text-primary">{mockStats.treatmentCoverage}%</p>
              </div>
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Barangay Testing Data */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-primary">Testing by Barangay</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockStats.barangayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tested" fill="hsl(var(--primary))" />
                <Bar dataKey="positive" fill="hsl(var(--accent))" />
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