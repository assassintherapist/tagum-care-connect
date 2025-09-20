import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Save, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  address: string;
  joinDate: string;
  lastActive: string;
  permissions: string[];
  bio: string;
}

interface ProfileEditorProps {
  userType: 'admin' | 'staff';
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ userType }) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: 'U001',
    name: 'Dr. Maria Santos',
    email: 'maria.santos@tagumcity.gov.ph',
    phone: '+63 912 345 6789',
    role: userType === 'admin' ? 'System Administrator' : 'Healthcare Provider',
    department: 'Tagum City Health Office',
    address: 'Tagum City, Davao del Norte',
    joinDate: '2023-06-15',
    lastActive: new Date().toISOString().split('T')[0],
    permissions: userType === 'admin' 
      ? ['Full System Access', 'User Management', 'Data Export', 'System Configuration']
      : ['Patient Management', 'Appointment Scheduling', 'Medical Records'],
    bio: 'Dedicated healthcare professional committed to providing quality HIV care and support services to the community.'
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-primary" />
            <span>Profile Management</span>
          </CardTitle>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4 bg-gradient-subtle rounded-lg">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                className="text-lg font-semibold mb-2"
              />
            ) : (
              <h2 className="text-lg font-semibold text-foreground">{profile.name}</h2>
            )}
            <Badge className="bg-primary text-primary-foreground">
              {profile.role}
            </Badge>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Email Address</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground">{profile.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Phone Number</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground">{profile.phone}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Address</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
                  />
                ) : (
                  <p className="text-foreground">{profile.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <Shield className="w-4 h-4 mr-2 text-secondary" />
              Professional Information
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Department</label>
                {isEditing ? (
                  <Select 
                    value={editedProfile.department} 
                    onValueChange={(value) => setEditedProfile({ ...editedProfile, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tagum City Health Office">Tagum City Health Office</SelectItem>
                      <SelectItem value="Red STAR Clinic">Red STAR Clinic</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-foreground">{profile.department}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Join Date</label>
                <p className="text-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {profile.joinDate}
                </p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Last Active</label>
                <p className="text-foreground flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-success" />
                  {profile.lastActive}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">Professional Bio</h3>
          {isEditing ? (
            <Textarea
              value={editedProfile.bio}
              onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
              rows={3}
              placeholder="Enter your professional bio..."
            />
          ) : (
            <p className="text-muted-foreground">{profile.bio}</p>
          )}
        </div>

        {/* Permissions */}
        <div>
          <h3 className="font-semibold text-foreground mb-3">System Permissions</h3>
          <div className="flex flex-wrap gap-2">
            {profile.permissions.map((permission, index) => (
              <Badge key={index} variant="outline" className="bg-success/10 text-success">
                {permission}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;