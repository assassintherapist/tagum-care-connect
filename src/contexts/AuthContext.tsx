import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'patient' | 'healthcare_provider' | 'it_admin';
export type Facility = 'CHO' | 'Red STAR Clinic' | 'All';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  facility?: Facility;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Record<string, User> = {
  'patient@test.com': {
    id: 'p001',
    email: 'patient@test.com',
    name: 'Juan Dela Cruz',
    role: 'patient'
  },
  'cho.admin@tagumcity.gov.ph': {
    id: 'hp001',
    email: 'cho.admin@tagumcity.gov.ph',
    name: 'Dr. Maria Santos',
    role: 'healthcare_provider',
    facility: 'CHO',
    department: 'Tagum City Health Office'
  },
  'redstar.admin@tagumcity.gov.ph': {
    id: 'hp002',
    email: 'redstar.admin@tagumcity.gov.ph',
    name: 'Dr. Roberto Cruz',
    role: 'healthcare_provider',
    facility: 'Red STAR Clinic',
    department: 'Red STAR Clinic'
  },
  'it.admin@tagumcity.gov.ph': {
    id: 'it001',
    email: 'it.admin@tagumcity.gov.ph',
    name: 'Mark Johnson',
    role: 'it_admin',
    facility: 'All',
    department: 'IT Department'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const foundUser = mockUsers[email];
    if (foundUser && password) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};