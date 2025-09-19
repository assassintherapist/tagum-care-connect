import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Target, 
  Shield, 
  Users, 
  TrendingUp, 
  Calendar,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const PublicHealthStats = () => {
  const stats = {
    totalPopulation: 296693, // Tagum City population
    hivPrevalence: 0.083, // HIV prevalence rate
    testedThisYear: 1847,
    newCases: 58,
    linkageToCare: 94.8,
    artCoverage: 91.2,
    viralSuppression: 87.5,
    preventionPrograms: 6
  };

  const targets = {
    testing: 2000,
    linkage: 95,
    artCoverage: 95,
    viralSuppression: 90
  };

  return (
    <div className="space-y-6">
      {/* Key Public Health Indicators */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary" />
            <span>Public Health Key Indicators - Tagum City</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.hivPrevalence}%</p>
                <p className="text-sm text-muted-foreground">HIV Prevalence</p>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.testedThisYear.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Tested This Year</p>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.newCases}</p>
                <p className="text-sm text-muted-foreground">New Cases (YTD)</p>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.preventionPrograms}</p>
                <p className="text-sm text-muted-foreground">Prevention Programs</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Cascade */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-secondary" />
            <span>HIV Treatment Cascade Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Testing Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Annual Testing Target</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {stats.testedThisYear} / {targets.testing.toLocaleString()}
                  </span>
                  <Badge variant={stats.testedThisYear >= targets.testing ? 'default' : 'secondary'}>
                    {((stats.testedThisYear / targets.testing) * 100).toFixed(1)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(stats.testedThisYear / targets.testing) * 100} className="h-3" />
            </div>

            {/* Linkage to Care */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Linkage to Care</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{stats.linkageToCare}%</span>
                  <Badge variant={stats.linkageToCare >= targets.linkage ? 'default' : 'secondary'}>
                    {stats.linkageToCare >= targets.linkage ? 'On Target' : 'Below Target'}
                  </Badge>
                </div>
              </div>
              <Progress value={stats.linkageToCare} className="h-3" />
            </div>

            {/* ART Coverage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">ART Coverage</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{stats.artCoverage}%</span>
                  <Badge variant={stats.artCoverage >= targets.artCoverage ? 'default' : 'secondary'}>
                    {stats.artCoverage >= targets.artCoverage ? 'On Target' : 'Below Target'}
                  </Badge>
                </div>
              </div>
              <Progress value={stats.artCoverage} className="h-3" />
            </div>

            {/* Viral Suppression */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Viral Suppression</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{stats.viralSuppression}%</span>
                  <Badge variant={stats.viralSuppression >= targets.viralSuppression ? 'default' : 'secondary'}>
                    {stats.viralSuppression >= targets.viralSuppression ? 'On Target' : 'Below Target'}
                  </Badge>
                </div>
              </div>
              <Progress value={stats.viralSuppression} className="h-3" />
            </div>
          </div>
          
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium text-success">Achievements</span>
              </div>
              <ul className="text-sm space-y-1">
                <li>• 95% target achieved for linkage to care</li>
                <li>• Strong community engagement programs</li>
                <li>• Effective case management system</li>
              </ul>
            </div>
            
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="font-medium text-warning">Areas for Improvement</span>
              </div>
              <ul className="text-sm space-y-1">
                <li>• Increase ART coverage to 95% target</li>
                <li>• Improve viral suppression rates</li>
                <li>• Expand testing in high-risk populations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicHealthStats;