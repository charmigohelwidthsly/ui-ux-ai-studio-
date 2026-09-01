export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  patientId: string;
}

export interface PatientProfile {
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  insurancePolicy?: {
    provider: string;
    policyNumber: string;
    validTill: string;
    tpaDesk: string;
  };
}

export interface AadhaarInfo {
  isLinked: boolean;
  aadhaarNumberMasked: string; // e.g. "XXXX-XXXX-8921"
  abhaId: string; // e.g. "91-4452-9811-3049"
  abhaAddress: string; // e.g. "priya.sharma@abdm"
  verifiedOn: string;
  consentSharingEnabled: boolean;
  linkedHospitals: {
    hospitalId: string;
    hospitalName: string;
    recordsLinked: number;
    lastSynced: string;
    status: 'Active' | 'Pending' | 'Revoked';
  }[];
}

export type MedicalSpecialty =
  | 'Cardiology'
  | 'Neurology'
  | 'Pediatrics'
  | 'Orthopedics'
  | 'Dermatology'
  | 'General Medicine'
  | 'Gynecology'
  | 'Gastroenterology'
  | 'Ophthalmology'
  | 'ENT & Head-Neck'
  | 'Pulmonology'
  | 'Psychiatry';

export interface DoctorCategory {
  id: string;
  name: MedicalSpecialty;
  iconName: string;
  tagline: string;
  description: string;
  commonSymptoms: string[];
  whenToConsult: string;
  averageWaitTime: string;
  availableDoctorsCount: number;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: MedicalSpecialty;
  hospital: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  avatar: string;
  about: string;
  education: string;
  languages: string[];
  nextAvailable: string;
  availableSlots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export interface Appointment {
  id: string;
  bookingRef: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: MedicalSpecialty;
  doctorAvatar: string;
  hospital: string;
  date: string;
  timeSlot: string;
  mode: 'in_clinic' | 'video_call';
  status: 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  symptoms: string;
  tokenNumber: number;
  roomNumber?: string;
  createdAt: string;
}

export interface MedicationItem {
  id: string;
  medicineName: string;
  genericName: string;
  dosage: string; // e.g. "500 mg"
  frequency: string; // e.g. "1-0-1 (Twice Daily)"
  duration: string; // e.g. "5 Days"
  timing: string;
  instructions: string;
  refillsRemaining: number;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: MedicalSpecialty;
  hospital: string;
  date: string;
  validUntil: string;
  diagnosis: string;
  chiefComplaints: string[];
  medications: MedicationItem[];
  adviceAndDiet: string[];
  followUpDate: string;
  doctorRegistrationNo: string;
}

export interface LabResultItem {
  parameter: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low' | 'borderline';
  interpretation?: string;
}

export interface LabReport {
  id: string;
  reportNumber: string;
  testName: string;
  category: 'Pathology' | 'Biochemistry' | 'Radiology / Imaging' | 'Hematology' | 'Microbiology';
  date: string;
  sampleCollectedAt: string;
  labName: string;
  pathologist: string;
  specimenType: string;
  results: LabResultItem[];
  clinicalImpression: string;
  doctorRecommendation: string;
  isUrgent?: boolean;
}

export interface ChatMessage {
  id: string;
  doctorId: string;
  sender: 'patient' | 'doctor';
  text: string;
  timestamp: string;
  read: boolean;
  attachment?: {
    type: 'prescription' | 'lab_report' | 'vitals' | 'image';
    title: string;
    refId?: string;
  };
}

export interface PharmacyOrLab {
  id: string;
  name: string;
  type: 'pharmacy' | 'diagnostic_center' | 'hospital_pharmacy';
  distanceKm: number;
  address: string;
  cityArea: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  openStatus: 'Open 24/7' | 'Open (Closes 10:00 PM)' | 'Open (Closes 8:00 PM)';
  is24x7: boolean;
  offersHomeDelivery: boolean;
  homeSampleCollection: boolean;
  deliveryTimeEstimate: string;
  availableStockTags: string[];
  availableTests?: string[];
  discountOffer?: string;
  lat: number;
  lng: number;
}

export interface HospitalVisit {
  id: string;
  hospitalName: string;
  branch: string;
  department: string;
  doctorName: string;
  visitDate: string;
  dischargeDate?: string;
  visitType: 'Outpatient (OPD)' | 'Emergency (ER)' | 'Day Care Surgery' | 'Inpatient (IPD)';
  diagnosis: string;
  clinicalSummary: string;
  followUpStatus: 'Follow-up Scheduled' | 'Completed' | 'Due Soon';
  documentsCount: number;
}

export interface VitalSign {
  name: string;
  value: string;
  unit: string;
  status: 'normal' | 'attention' | 'optimal';
  trend: 'stable' | 'up' | 'down';
  lastChecked: string;
}
