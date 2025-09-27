import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail,
  Users
} from "lucide-react";

export interface FacilityInfo {
  id: string;
  name: string;
  type: 'CHO' | 'Red STAR Clinic' | 'Other';
  address: string;
  phone: string;
  email: string;
  description: string;
  capacity: number;
  status: 'Active' | 'Inactive' | 'Under Maintenance';
  services: string[];
}

const FacilityManager = () => {
  const { toast } = useToast();
  const [facilities, setFacilities] = useState<FacilityInfo[]>([
    {
      id: 'fac001',
      name: 'CHO',
      type: 'CHO',
      address: 'Tagum City Health Office, Pioneer Avenue, Tagum City',
      phone: '+63 84 216 3456',
      email: 'cho.admin@tagumcity.gov.ph',
      description: 'Main city health office providing comprehensive HIV testing and care services.',
      capacity: 100,
      status: 'Active',
      services: ['HIV Testing', 'Counseling', 'ART Distribution', 'CD4 Monitoring']
    },
    {
      id: 'fac002',
      name: 'Red STAR Clinic',
      type: 'Red STAR Clinic',
      address: 'Red STAR Clinic, Magugpo East, Tagum City',
      phone: '+63 84 216 7890',
      email: 'redstar.admin@tagumcity.gov.ph',
      description: 'Specialized HIV care clinic focusing on treatment and follow-up care.',
      capacity: 75,
      status: 'Active',
      services: ['HIV Treatment', 'Viral Load Testing', 'Counseling', 'Support Groups']
    }
  ]);

  const [editingFacility, setEditingFacility] = useState<FacilityInfo | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [newFacility, setNewFacility] = useState<Partial<FacilityInfo>>({
    name: '',
    type: 'Other',
    address: '',
    phone: '',
    email: '',
    description: '',
    capacity: 50,
    status: 'Active',
    services: []
  });

  const handleAddFacility = () => {
    if (!newFacility.name || !newFacility.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const facility: FacilityInfo = {
      id: `fac${Date.now()}`,
      name: newFacility.name!,
      type: newFacility.type as any || 'Other',
      address: newFacility.address!,
      phone: newFacility.phone || '',
      email: newFacility.email || '',
      description: newFacility.description || '',
      capacity: newFacility.capacity || 50,
      status: newFacility.status as any || 'Active',
      services: newFacility.services || []
    };

    setFacilities([...facilities, facility]);
    setNewFacility({
      name: '',
      type: 'Other',
      address: '',
      phone: '',
      email: '',
      description: '',
      capacity: 50,
      status: 'Active',
      services: []
    });
    setShowAddDialog(false);

    toast({
      title: "Success",
      description: "Facility added successfully.",
    });
  };

  const handleEditFacility = () => {
    if (!editingFacility) return;

    setFacilities(facilities.map(f => 
      f.id === editingFacility.id ? editingFacility : f
    ));
    setEditingFacility(null);
    setShowEditDialog(false);

    toast({
      title: "Success",
      description: "Facility updated successfully.",
    });
  };

  const handleDeleteFacility = (facilityId: string) => {
    setFacilities(facilities.filter(f => f.id !== facilityId));
    toast({
      title: "Success",
      description: "Facility deleted successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Inactive': return 'bg-muted text-muted-foreground';
      case 'Under Maintenance': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Facility Management</h2>
          <p className="text-muted-foreground">Manage HIV care facilities and their information</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Facility
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Facility</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Facility Name *</Label>
                  <Input
                    id="name"
                    value={newFacility.name}
                    onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
                    placeholder="Enter facility name"
                  />
                </div>
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={newFacility.capacity}
                    onChange={(e) => setNewFacility({...newFacility, capacity: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={newFacility.address}
                  onChange={(e) => setNewFacility({...newFacility, address: e.target.value})}
                  placeholder="Enter facility address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newFacility.phone}
                    onChange={(e) => setNewFacility({...newFacility, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newFacility.email}
                    onChange={(e) => setNewFacility({...newFacility, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newFacility.description}
                  onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
                  placeholder="Enter facility description"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddFacility}>
                  Add Facility
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Facilities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <Card key={facility.id} className="medical-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span>{facility.name}</span>
                </CardTitle>
                <Badge className={getStatusColor(facility.status)}>
                  {facility.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">{facility.address}</span>
                </div>
                {facility.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{facility.phone}</span>
                  </div>
                )}
                {facility.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{facility.email}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Capacity: {facility.capacity}</span>
                </div>
              </div>

              {facility.description && (
                <p className="text-sm text-muted-foreground">{facility.description}</p>
              )}

              {facility.services.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {facility.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <Dialog open={showEditDialog && editingFacility?.id === facility.id} onOpenChange={setShowEditDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingFacility(facility)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Facility</DialogTitle>
                    </DialogHeader>
                    {editingFacility && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Facility Name</Label>
                            <Input
                              value={editingFacility.name}
                              onChange={(e) => setEditingFacility({...editingFacility, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Capacity</Label>
                            <Input
                              type="number"
                              value={editingFacility.capacity}
                              onChange={(e) => setEditingFacility({...editingFacility, capacity: parseInt(e.target.value)})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Address</Label>
                          <Input
                            value={editingFacility.address}
                            onChange={(e) => setEditingFacility({...editingFacility, address: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Phone</Label>
                            <Input
                              value={editingFacility.phone}
                              onChange={(e) => setEditingFacility({...editingFacility, phone: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label>Email</Label>
                            <Input
                              value={editingFacility.email}
                              onChange={(e) => setEditingFacility({...editingFacility, email: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={editingFacility.description}
                            onChange={(e) => setEditingFacility({...editingFacility, description: e.target.value})}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleEditFacility}>
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteFacility(facility.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FacilityManager;