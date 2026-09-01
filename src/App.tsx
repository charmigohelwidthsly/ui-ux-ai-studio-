import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { AppointmentsView } from './components/AppointmentsView';
import { EmrRecordsView } from './components/EmrRecordsView';
import { DoctorChatView } from './components/DoctorChatView';
import { NearbyLocatorView } from './components/NearbyLocatorView';
import { RecentHospitalsView } from './components/RecentHospitalsView';
import { DoctorCategoryGuide } from './components/DoctorCategoryGuide';

import { AuthModal } from './components/AuthModal';
import { AadhaarLockerModal } from './components/AadhaarLockerModal';
import { PrescriptionModal } from './components/PrescriptionModal';
import { LabReportModal } from './components/LabReportModal';
import { VideoCallModal } from './components/VideoCallModal';
import { SosModal } from './components/SosModal';
import { ToastContainer } from './components/ToastContainer';

import {
  ShieldCheck,
  PhoneCall,
  HeartPulse,
  Building2,
  Stethoscope,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsSosModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-[#f9f7f2] text-[#43423b] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#4f6352] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'appointments' && <AppointmentsView />}
        {activeTab === 'emr' && <EmrRecordsView />}
        {activeTab === 'chat' && <DoctorChatView />}
        {activeTab === 'nearby' && <NearbyLocatorView />}
        {activeTab === 'hospitals' && <RecentHospitalsView />}
        {activeTab === 'doctor_guide' && <DoctorCategoryGuide />}
      </main>

      {/* Footer */}
      <footer className="bg-[#262522] text-[#e8e4db] border-t border-[#3a3934] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Brand & ABDM Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#8da08b] text-[#262522] flex items-center justify-center font-black">
                  <HeartPulse className="w-5 h-5 text-[#262522]" />
                </div>
                <span className="font-extrabold text-base tracking-tight font-['Space_Grotesk'] text-white">
                  AarogyaCare <span className="text-[#a5b6a3] font-normal text-xs">EMR Portal</span>
                </span>
              </div>
              <p className="text-xs text-[#a9a79e] leading-relaxed">
                National electronic healthcare ecosystem seamlessly connecting patients, hospital OPDs, digital prescriptions, and NABL diagnostic laboratories via Aadhaar / ABHA identity.
              </p>
              <div className="flex items-center space-x-2 text-[11px] text-[#9fc09c] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>ABDM Integrated • ISO 27001 Certified</span>
              </div>
            </div>

            {/* Column 2: Quick Portals */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#dfdacd] uppercase tracking-wider text-[11px] font-['Space_Grotesk']">
                Patient Services
              </h4>
              <ul className="space-y-1.5 text-[#a9a79e]">
                <li>
                  <button onClick={() => setActiveTab('appointments')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    Book OPD Specialist Consultation
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('emr')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    Electronic Medical Records (EMR)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('chat')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    24/7 Doctor Teleconsultation Chat
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('nearby')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    Nearby Chemist & Doorstep Labs
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Medical Specialties */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-[#dfdacd] uppercase tracking-wider text-[11px] font-['Space_Grotesk']">
                Specialist Categories
              </h4>
              <ul className="space-y-1.5 text-[#a9a79e]">
                <li>
                  <button onClick={() => setActiveTab('doctor_guide')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    Cardiology & Heart Care
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('doctor_guide')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    Neurology & Stroke Center
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('doctor_guide')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    Orthopedics & Joint Replacement
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('doctor_guide')} className="hover:text-[#a5b6a3] transition-colors cursor-pointer">
                    Pediatrics & Child Wellness
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Emergency Assistance */}
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-[#e0836e] uppercase tracking-wider text-[11px] font-['Space_Grotesk'] flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#c25e47] animate-ping mr-1"></span>
                <span>24x7 Emergency Trauma Network</span>
              </h4>
              <p className="text-[11px] text-[#a9a79e]">
                For acute cardiac events, severe trauma, or ambulance dispatch:
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => setIsSosModalOpen(true)}
                  className="w-full bg-[#a05643] hover:bg-[#8b4736] text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all shadow-md shadow-[#262522]/50 flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Launch SOS Medical Emergency</span>
                </button>
                <div className="text-[11px] text-[#a9a79e] text-center font-mono">
                  National Ambulance Helpline: <strong className="text-[#f9f7f2]">108 / 112</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#3a3934] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#86847c] gap-3">
            <p>© 2026 AarogyaCare Digital Health Systems. Unified Health Interface (UHI) Enabled.</p>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 text-[#a9a79e]">
                <Lock className="w-3 h-3 text-[#8da08b]" />
                <span>256-bit AES EMR Encryption</span>
              </span>
              <span>•</span>
              <span className="text-[#a9a79e]">Aadhaar / ABHA Consent Framework v3.2</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Modals */}
      <AuthModal />
      <AadhaarLockerModal />
      <PrescriptionModal />
      <LabReportModal />
      <VideoCallModal />
      <SosModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
