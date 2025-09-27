import { Facility } from '@/contexts/AuthContext';

export interface Appointment {
  id: string;
  codename: string;
  date: string;
  time: string;
  facility: Facility;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  type: 'consultation' | 'testing' | 'follow-up' | 'counseling';
  notes?: string;
  patientId?: string;
}

export interface Patient {
  id: string;
  codename: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  barangay: string;
  registeredAt: Facility;
  status: 'Active' | 'Lost to Follow-up' | 'Transferred' | 'Deceased';
  lastVisit: string;
  cd4Count?: number;
  viralLoad?: string;
  artStatus: 'Not Started' | 'On Treatment' | 'Treatment Interrupted';
}

export interface BarangayData {
  barangay: string;
  activeCases: number;
  newCases: number;
  testsPerformed: number;
  population: number;
}

// Mock Appointments Data
export const mockAppointments: Appointment[] = [
  {
    id: 'apt001',
    codename: 'ALPHA-001',
    date: '2024-01-15',
    time: '09:00',
    facility: 'CHO',
    status: 'scheduled',
    type: 'testing',
    notes: 'Initial HIV testing appointment'
  },
  {
    id: 'apt002',
    codename: 'BETA-002',
    date: '2024-01-15',
    time: '10:30',
    facility: 'Red STAR Clinic',
    status: 'scheduled',
    type: 'consultation',
    patientId: 'p002'
  },
  {
    id: 'apt003',
    codename: 'GAMMA-003',
    date: '2024-01-16',
    time: '14:00',
    facility: 'CHO',
    status: 'completed',
    type: 'follow-up',
    patientId: 'p003'
  },
  {
    id: 'apt004',
    codename: 'DELTA-004',
    date: '2024-01-17',
    time: '11:00',
    facility: 'Red STAR Clinic',
    status: 'scheduled',
    type: 'counseling'
  },
  {
    id: 'apt005',
    codename: 'EPSILON-005',
    date: '2024-01-18',
    time: '13:30',
    facility: 'CHO',
    status: 'no-show',
    type: 'testing'
  }
];

// Mock Patients Data
export const mockPatients: Patient[] = [
  {
    id: 'p001',
    codename: 'CHARLIE-001',
    age: 28,
    gender: 'Male',
    barangay: 'Poblacion',
    registeredAt: 'CHO',
    status: 'Active',
    lastVisit: '2024-01-10',
    cd4Count: 450,
    viralLoad: 'Undetectable',
    artStatus: 'On Treatment'
  },
  {
    id: 'p002',
    codename: 'DELTA-002',
    age: 35,
    gender: 'Female',
    barangay: 'Magugpo East',
    registeredAt: 'Red STAR Clinic',
    status: 'Active',
    lastVisit: '2024-01-08',
    cd4Count: 380,
    viralLoad: 'Low',
    artStatus: 'On Treatment'
  },
  {
    id: 'p003',
    codename: 'ECHO-003',
    age: 42,
    gender: 'Male',
    barangay: 'San Miguel',
    registeredAt: 'CHO',
    status: 'Lost to Follow-up',
    lastVisit: '2023-11-15',
    cd4Count: 200,
    viralLoad: 'High',
    artStatus: 'Treatment Interrupted'
  },
  {
    id: 'p004',
    codename: 'FOXTROT-004',
    age: 31,
    gender: 'Female',
    barangay: 'Magugpo West',
    registeredAt: 'Red STAR Clinic',
    status: 'Active',
    lastVisit: '2024-01-12',
    cd4Count: 520,
    viralLoad: 'Undetectable',
    artStatus: 'On Treatment'
  },
  {
    id: 'p005',
    codename: 'GOLF-005',
    age: 26,
    gender: 'Male',
    barangay: 'Cuambogan',
    registeredAt: 'CHO',
    status: 'Active',
    lastVisit: '2024-01-09',
    cd4Count: 620,
    viralLoad: 'Undetectable',
    artStatus: 'On Treatment'
  }
];

// Mock Barangay Data
export const mockBarangayData: BarangayData[] = [
  {
    barangay: 'Poblacion',
    activeCases: 15,
    newCases: 2,
    testsPerformed: 45,
    population: 8500
  },
  {
    barangay: 'Magugpo East',
    activeCases: 12,
    newCases: 1,
    testsPerformed: 38,
    population: 7200
  },
  {
    barangay: 'Magugpo West',
    activeCases: 8,
    newCases: 0,
    testsPerformed: 28,
    population: 6800
  },
  {
    barangay: 'San Miguel',
    activeCases: 6,
    newCases: 1,
    testsPerformed: 22,
    population: 5400
  },
  {
    barangay: 'Cuambogan',
    activeCases: 4,
    newCases: 0,
    testsPerformed: 18,
    population: 4600
  },
  {
    barangay: 'Mankilam',
    activeCases: 3,
    newCases: 1,
    testsPerformed: 15,
    population: 3800
  },
  {
    barangay: 'Pagsabangan',
    activeCases: 2,
    newCases: 0,
    testsPerformed: 12,
    population: 3200
  }
];

// HIV Care Information
export const hivCareInfo = {
  prevention: [
    {
      title: "Pre-Exposure Prophylaxis (PrEP)",
      description: "Daily medication for high-risk individuals to prevent HIV infection",
      details: "PrEP reduces the risk of getting HIV from sex by about 99% when taken as prescribed."
    },
    {
      title: "Post-Exposure Prophylaxis (PEP)",
      description: "Emergency medication taken within 72 hours of potential exposure",
      details: "PEP must be started within 72 hours after possible exposure and taken for 28 days."
    },
    {
      title: "Regular Testing",
      description: "Know your status through regular HIV testing",
      details: "CDC recommends HIV testing for everyone 13-64 at least once, and annually for high-risk individuals."
    }
  ],
  treatment: [
    {
      title: "Antiretroviral Therapy (ART)",
      description: "Daily medication that reduces viral load to undetectable levels",
      details: "When viral load is undetectable, HIV cannot be transmitted sexually (U=U)."
    },
    {
      title: "CD4 Count Monitoring",
      description: "Regular blood tests to monitor immune system health",
      details: "CD4 counts indicate how well the immune system is functioning."
    },
    {
      title: "Viral Load Testing",
      description: "Measures the amount of HIV in the blood",
      details: "Undetectable viral load means treatment is working effectively."
    }
  ],
  support: [
    {
      title: "Counseling Services",
      description: "Psychological support and adherence counseling",
      details: "Professional counseling helps with treatment adherence and mental health."
    },
    {
      title: "Peer Support Groups",
      description: "Connect with others living with HIV",
      details: "Peer support provides emotional support and practical advice."
    },
    {
      title: "Care Coordination",
      description: "Comprehensive care planning and coordination",
      details: "Coordinated care ensures all health needs are addressed."
    }
  ]
};