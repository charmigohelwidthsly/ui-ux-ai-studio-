import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  PatientProfile,
  AadhaarInfo,
  Doctor,
  Appointment,
  Prescription,
  LabReport,
  ChatMessage,
  PharmacyOrLab,
  HospitalVisit,
  VitalSign,
  MedicalSpecialty,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_PATIENT_PROFILE,
  INITIAL_AADHAAR_INFO,
  DOCTORS_LIST,
  INITIAL_APPOINTMENTS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_LAB_REPORTS,
  INITIAL_CHAT_MESSAGES,
  NEARBY_PHARMACIES_AND_LABS,
  RECENT_HOSPITAL_VISITS,
  PATIENT_VITALS,
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type NavigationTab =
  | 'dashboard'
  | 'appointments'
  | 'emr'
  | 'chat'
  | 'nearby'
  | 'hospitals'
  | 'doctor_guide';

interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface AppContextType {
  // Auth & Profile
  user: User | null;
  isAuthenticated: boolean;
  patientProfile: PatientProfile;
  aadhaarInfo: AadhaarInfo;
  login: (username: string, pass: string) => boolean;
  loginWithGoogle: (googleUser?: { name?: string; email?: string; picture?: string; sub?: string }) => void;
  logout: () => void;
  register: (name: string, username: string, email: string, phone: string) => void;
  linkAadhaar: (aadhaarNum: string, otp: string) => Promise<boolean>;
  unlinkAadhaar: () => void;
  toggleConsentSharing: () => void;

  // Navigation
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;

  // Appointments
  appointments: Appointment[];
  doctors: Doctor[];
  selectedDoctorForBooking: Doctor | null;
  setSelectedDoctorForBooking: (doc: Doctor | null) => void;
  selectedSpecialtyFilter: MedicalSpecialty | 'All';
  setSelectedSpecialtyFilter: (spec: MedicalSpecialty | 'All') => void;
  bookAppointment: (bookingData: {
    doctorId: string;
    date: string;
    timeSlot: string;
    mode: 'in_clinic' | 'video_call';
    symptoms: string;
  }) => Appointment;
  cancelAppointment: (id: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;

  // EMR Records
  prescriptions: Prescription[];
  labReports: LabReport[];
  vitals: VitalSign[];
  selectedPrescriptionModal: Prescription | null;
  setSelectedPrescriptionModal: (rx: Prescription | null) => void;
  selectedLabReportModal: LabReport | null;
  setSelectedLabReportModal: (rep: LabReport | null) => void;

  // Real-time Chat
  activeChatDoctorId: string;
  setActiveChatDoctorId: (id: string) => void;
  chatMessages: Record<string, ChatMessage[]>;
  sendChatMessage: (doctorId: string, text: string, attachment?: ChatMessage['attachment']) => void;
  unreadCount: number;

  // Nearby Pharmacies & Labs
  nearbyFacilities: PharmacyOrLab[];
  currentLocationName: string;
  setCurrentLocationName: (loc: string) => void;
  facilityTypeFilter: 'all' | 'pharmacy' | 'diagnostic_center';
  setFacilityTypeFilter: (filter: 'all' | 'pharmacy' | 'diagnostic_center') => void;
  orderMedicationsOnline: (pharmacyId: string, prescriptionNumber: string) => void;
  bookHomeLabSample: (facilityId: string, testName: string) => void;

  // Hospital History
  recentHospitalVisits: HospitalVisit[];

  // Modals & Interactivity
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAadhaarLockerOpen: boolean;
  setIsAadhaarLockerOpen: (open: boolean) => void;
  isSosModalOpen: boolean;
  setIsSosModalOpen: (open: boolean) => void;
  activeVideoCallDoctor: Doctor | null;
  setActiveVideoCallDoctor: (doc: Doctor | null) => void;

  // Toast Notifications
  toasts: NotificationToast[];
  addToast: (type: NotificationToast['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [patientProfile, setPatientProfile] = useState<PatientProfile>(INITIAL_PATIENT_PROFILE);
  const [aadhaarInfo, setAadhaarInfo] = useState<AadhaarInfo>(INITIAL_AADHAAR_INFO);

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [doctors] = useState<Doctor[]>(DOCTORS_LIST);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState<MedicalSpecialty | 'All'>('All');

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(INITIAL_PRESCRIPTIONS);
  const [labReports, setLabReports] = useState<LabReport[]>(INITIAL_LAB_REPORTS);
  const [vitals] = useState<VitalSign[]>(PATIENT_VITALS);

  const [selectedPrescriptionModal, setSelectedPrescriptionModal] = useState<Prescription | null>(null);
  const [selectedLabReportModal, setSelectedLabReportModal] = useState<LabReport | null>(null);

  const [activeChatDoctorId, setActiveChatDoctorId] = useState<string>('doc_1');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);

  const [nearbyFacilities] = useState<PharmacyOrLab[]>(NEARBY_PHARMACIES_AND_LABS);
  const [currentLocationName, setCurrentLocationName] = useState<string>('Ahmedabad (SG Highway / Bodakdev)');
  const [facilityTypeFilter, setFacilityTypeFilter] = useState<'all' | 'pharmacy' | 'diagnostic_center'>('all');

  const [recentHospitalVisits] = useState<HospitalVisit[]>(RECENT_HOSPITAL_VISITS);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isAadhaarLockerOpen, setIsAadhaarLockerOpen] = useState<boolean>(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState<boolean>(false);
  const [activeVideoCallDoctor, setActiveVideoCallDoctor] = useState<Doctor | null>(null);

  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  const addToast = (type: NotificationToast['type'], title: string, message: string) => {
    const id = 'toast_' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth functions
  const login = (username: string, pass: string): boolean => {
    if (username.trim() && pass.length >= 3) {
      setUser({
        ...INITIAL_USER,
        username: username,
        fullName: username.includes('.') ? username.replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) : username,
      });
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      addToast('success', 'Welcome Back', `Successfully signed in as ${username}`);
      return true;
    }
    addToast('error', 'Login Failed', 'Please enter a valid username and password (min 3 chars).');
    return false;
  };

  const loginWithGoogle = (googleUser?: { name?: string; email?: string; picture?: string; sub?: string }) => {
    const fullName = googleUser?.name || 'Charmi Gohel';
    const email = googleUser?.email || 'charmigohel.24.bdes@idea.indusuni.ac.in';
    const avatar = googleUser?.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    const username = email.split('@')[0] || fullName.toLowerCase().replace(/\s+/g, '.');

    const newUser: User = {
      id: googleUser?.sub || 'g_usr_' + Date.now(),
      fullName: fullName,
      username: username,
      email: email,
      phone: '+91 98251 34920',
      avatar: avatar,
      patientId: 'HC-G-' + Math.floor(1000 + Math.random() * 9000),
      authProvider: 'google',
      isGoogleVerified: true,
    };

    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    addToast('success', 'Google Sign-In Successful', `Signed in as ${fullName} (${email}). Connected to secure patient gateway.`);

    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.65 },
      });
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    addToast('info', 'Signed Out', 'You have been safely logged out from AarogyaCare.');
  };

  const register = (name: string, username: string, email: string, phone: string) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      fullName: name,
      username: username || name.toLowerCase().replace(/\s+/g, '.'),
      email: email || `${username}@healthmail.com`,
      phone: phone || '+91 98765 00000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      patientId: 'HC-2026-' + Math.floor(1000 + Math.random() * 9000),
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    addToast('success', 'Account Registered', `Welcome to AarogyaCare Hospital Portal, ${name}!`);
  };

  // Aadhaar linking
  const linkAadhaar = async (aadhaarNum: string, otp: string): Promise<boolean> => {
    const cleanNum = aadhaarNum.replace(/\D/g, '');
    if (cleanNum.length === 12 && otp.length >= 4) {
      const lastFour = cleanNum.slice(8);
      const generatedAbha = `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${lastFour}`;
      setAadhaarInfo({
        isLinked: true,
        aadhaarNumberMasked: `XXXX-XXXX-${lastFour}`,
        abhaId: generatedAbha,
        abhaAddress: `${user?.username || 'patient'}@abdm`,
        verifiedOn: 'Just now via UIDAI & ABDM Gateway',
        consentSharingEnabled: true,
        linkedHospitals: INITIAL_AADHAAR_INFO.linkedHospitals,
      });
      addToast(
        'success',
        'Aadhaar Verified & Linked!',
        `Your 14-digit ABHA Health ID (${generatedAbha}) is now active across all linked hospitals.`
      );
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      return true;
    }
    addToast('error', 'Verification Failed', 'Please provide a valid 12-digit Aadhaar number and OTP.');
    return false;
  };

  const unlinkAadhaar = () => {
    setAadhaarInfo((prev) => ({
      ...prev,
      isLinked: false,
    }));
    addToast('info', 'Aadhaar Unlinked', 'Digital Health ID unlinked from this session.');
  };

  const toggleConsentSharing = () => {
    setAadhaarInfo((prev) => {
      const nextVal = !prev.consentSharingEnabled;
      addToast(
        'info',
        'ABDM Consent Updated',
        nextVal
          ? 'Secure EMR data sharing is now ENABLED with accredited health institutions.'
          : 'EMR data sharing paused. Records remain private to your local device.'
      );
      return {
        ...prev,
        consentSharingEnabled: nextVal,
      };
    });
  };

  // Appointments
  const bookAppointment = ({
    doctorId,
    date,
    timeSlot,
    mode,
    symptoms,
  }: {
    doctorId: string;
    date: string;
    timeSlot: string;
    mode: 'in_clinic' | 'video_call';
    symptoms: string;
  }): Appointment => {
    const doc = doctors.find((d) => d.id === doctorId) || doctors[0];
    const newApt: Appointment = {
      id: 'apt_' + Date.now(),
      bookingRef: `APT-${doc.hospital.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialty: doc.specialty,
      doctorAvatar: doc.avatar,
      hospital: doc.hospital,
      date,
      timeSlot,
      mode,
      status: 'confirmed',
      symptoms: symptoms || 'General Consultation & Health Evaluation',
      tokenNumber: Math.floor(5 + Math.random() * 20),
      roomNumber: mode === 'in_clinic' ? `OPD Suite ${Math.floor(100 + Math.random() * 200)} (Wing ${doc.specialty.substring(0, 4)})` : undefined,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAppointments((prev) => [newApt, ...prev]);
    addToast(
      'success',
      'Appointment Confirmed! 🏥',
      `Confirmed with ${doc.name} for ${date} at ${timeSlot}. Token #${newApt.tokenNumber}`
    );

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    return newApt;
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );
    addToast('info', 'Appointment Cancelled', 'Your consultation slot has been released.');
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? {
              ...apt,
              date: newDate,
              timeSlot: newTime,
              status: 'rescheduled',
            }
          : apt
      )
    );
    addToast('success', 'Appointment Rescheduled', `Updated slot to ${newDate} at ${newTime}.`);
  };

  // Real-time Chat
  const sendChatMessage = (doctorId: string, text: string, attachment?: ChatMessage['attachment']) => {
    if (!text.trim() && !attachment) return;

    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      doctorId,
      sender: 'patient',
      text,
      timestamp: 'Just now',
      read: true,
      attachment,
    };

    setChatMessages((prev) => ({
      ...prev,
      [doctorId]: [...(prev[doctorId] || []), newMsg],
    }));

    // Simulate realistic doctor response after 1.5s
    setTimeout(() => {
      const doc = doctors.find((d) => d.id === doctorId);
      const responses = [
        `Thank you for sharing, Priya. I have noted this in your clinical record. Please follow the prescribed medication schedule and let me know if any discomfort persists.`,
        `Got it! Keep a check on your blood pressure twice this week. If the readings stay consistent around 120/80 mmHg, everything is progressing on track.`,
        `I have reviewed the details. Your vitals and recent reports look very encouraging. Keep up the regular daily walks and low-sodium diet!`,
        `Understood. I will also review this during our next scheduled consultation. Stay well-hydrated!`,
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];

      const doctorReply: ChatMessage = {
        id: 'msg_' + (Date.now() + 10),
        doctorId,
        sender: 'doctor',
        text: randomReply,
        timestamp: 'Just now',
        read: true,
      };

      setChatMessages((prev) => ({
        ...prev,
        [doctorId]: [...(prev[doctorId] || []), doctorReply],
      }));

      addToast(
        'info',
        `New message from ${doc?.name || 'Doctor'}`,
        randomReply.substring(0, 75) + '...'
      );
    }, 1600);
  };

  // Order medicines & lab tests
  const orderMedicationsOnline = (pharmacyId: string, prescriptionNumber: string) => {
    const pharm = nearbyFacilities.find((p) => p.id === pharmacyId);
    addToast(
      'success',
      'Prescription Transmitted! 💊',
      `Rx #${prescriptionNumber} successfully forwarded to ${pharm?.name || 'Pharmacy'}. Express doorstep delivery dispatched.`
    );
  };

  const bookHomeLabSample = (facilityId: string, testName: string) => {
    const lab = nearbyFacilities.find((f) => f.id === facilityId);
    addToast(
      'success',
      'Home Sample Collection Booked! 🧪',
      `Phlebotomist from ${lab?.name || 'Diagnostic Lab'} booked for ${testName}. They will arrive at your address with barcode collection kit.`
    );
  };

  const unreadCount = 0;

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        patientProfile,
        aadhaarInfo,
        login,
        loginWithGoogle,
        logout,
        register,
        linkAadhaar,
        unlinkAadhaar,
        toggleConsentSharing,

        activeTab,
        setActiveTab,

        appointments,
        doctors,
        selectedDoctorForBooking,
        setSelectedDoctorForBooking,
        selectedSpecialtyFilter,
        setSelectedSpecialtyFilter,
        bookAppointment,
        cancelAppointment,
        rescheduleAppointment,

        prescriptions,
        labReports,
        vitals,
        selectedPrescriptionModal,
        setSelectedPrescriptionModal,
        selectedLabReportModal,
        setSelectedLabReportModal,

        activeChatDoctorId,
        setActiveChatDoctorId,
        chatMessages,
        sendChatMessage,
        unreadCount,

        nearbyFacilities,
        currentLocationName,
        setCurrentLocationName,
        facilityTypeFilter,
        setFacilityTypeFilter,
        orderMedicationsOnline,
        bookHomeLabSample,

        recentHospitalVisits,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isAadhaarLockerOpen,
        setIsAadhaarLockerOpen,
        isSosModalOpen,
        setIsSosModalOpen,
        activeVideoCallDoctor,
        setActiveVideoCallDoctor,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
