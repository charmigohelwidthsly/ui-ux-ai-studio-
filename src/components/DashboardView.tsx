import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  FileText,
  MessageSquare,
  MapPin,
  HeartPulse,
  Activity,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Clock,
  Video,
  ShoppingBag,
  Building2,
  AlertCircle,
  HelpCircle,
  FlaskConical,
  PhoneCall,
  UserCheck,
  ChevronRight,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    user,
    patientProfile,
    aadhaarInfo,
    appointments,
    prescriptions,
    labReports,
    vitals,
    setActiveTab,
    setSelectedDoctorForBooking,
    setSelectedPrescriptionModal,
    setSelectedLabReportModal,
    setActiveChatDoctorId,
    setActiveVideoCallDoctor,
    doctors,
    setIsAadhaarLockerOpen,
    setIsSosModalOpen,
    currentLocationName,
  } = useApp();

  // Find next upcoming confirmed appointment
  const nextAppointment = appointments.find((a) => a.status === 'confirmed');
  const assignedDoctor = doctors.find((d) => d.id === (nextAppointment?.doctorId || 'doc_1'));

  // Active prescriptions summary
  const activeRx = prescriptions[0];

  // Most recent lab report
  const latestLabReport = labReports[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome & Aadhaar Integration Hero Card */}
      <div className="bg-gradient-to-br from-[#3b4d3f] via-[#2f3f33] to-[#262522] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-[#4f6352]/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#8da08b]/15 to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#4f6352]/40 text-[#d4e4d2] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#8da08b]/30 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a5c9a2] animate-pulse"></span>
                <span>Patient Portal Active</span>
              </span>
              {aadhaarInfo.isLinked && (
                <button
                  onClick={() => setIsAadhaarLockerOpen(true)}
                  className="bg-[#4f6352]/40 text-[#d4e4d2] hover:bg-[#4f6352]/60 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-[#8da08b]/30 flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a5c9a2]" />
                  <span>ABHA Linked: {aadhaarInfo.abhaId}</span>
                </button>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] tracking-tight text-white">
              Welcome back, {user?.fullName || 'Patient'}
            </h1>
            <p className="text-xs sm:text-sm text-[#dfdacd] leading-relaxed">
              Your personalized electronic health portal is fully synchronized with{' '}
              <strong className="text-white">Indus Health City, Apollo, Max, and Fortis</strong> networks.
            </p>
          </div>

          {/* Quick Action Buttons in Hero */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab('appointments')}
              className="flex-1 sm:flex-none bg-[#8da08b] hover:bg-[#9cb09a] text-[#262522] font-bold text-xs px-4 py-3 rounded-xl transition-all shadow-md shadow-[#262522]/30 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-3 rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-[#d4e4d2]" />
              <span>Chat with Doctor</span>
            </button>
          </div>
        </div>

        {/* Patient Profile Sub-bar */}
        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#cfcac0]">
          <div>
            <span className="text-[10px] text-[#b0aca2] font-semibold uppercase block">Patient UHID</span>
            <span className="font-bold text-white font-mono">{user?.patientId || 'HC-2026-9042'}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#b0aca2] font-semibold uppercase block">Blood Group</span>
            <span className="font-bold text-white">{patientProfile.bloodGroup}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#b0aca2] font-semibold uppercase block">Active Insurance</span>
            <span className="font-bold text-white truncate block">{patientProfile.insurancePolicy?.provider}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#b0aca2] font-semibold uppercase block">EMR Records Linked</span>
            <span className="font-bold text-[#a5c9a2]">16 Verified Documents</span>
          </div>
        </div>
      </div>

      {/* Next Upcoming Appointment Highlight */}
      {nextAppointment && (
        <div className="bg-[#ffffff] rounded-3xl p-5 sm:p-6 border border-[#e8e4db] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4f6352] animate-pulse"></span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#36352f] font-['Space_Grotesk']">
                Next Confirmed Consultation
              </h2>
            </div>
            <span className="text-xs font-bold text-[#364b39] bg-[#edf2ec] px-2.5 py-1 rounded-full border border-[#d2ded0]">
              Token #{nextAppointment.tokenNumber}
            </span>
          </div>

          <div className="p-4 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <img
                src={nextAppointment.doctorAvatar}
                alt={nextAppointment.doctorName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#8da08b]/40 shadow-xs"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base text-[#36352f]">{nextAppointment.doctorName}</h3>
                  <span className="bg-[#edf2ec] text-[#364b39] text-[10px] font-bold px-2 py-0.5 rounded border border-[#d2ded0]">
                    {nextAppointment.doctorSpecialty}
                  </span>
                </div>
                <p className="text-xs text-[#6e6d65] font-medium flex items-center space-x-1 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#8a887e]" />
                  <span>{nextAppointment.hospital}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#43423b] mt-1 font-semibold">
                  <span className="flex items-center text-[#4f6352]">
                    <Calendar className="w-3.5 h-3.5 mr-1" />
                    {nextAppointment.date}
                  </span>
                  <span className="flex items-center text-[#4f6352]">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {nextAppointment.timeSlot}
                  </span>
                  <span className="text-[#a9a79e]">•</span>
                  <span className="text-[#6e6d65]">
                    Mode: {nextAppointment.mode === 'in_clinic' ? '🏥 Hospital In-Clinic' : '📹 Teleconsultation Video'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto">
              {nextAppointment.mode === 'video_call' ? (
                <button
                  onClick={() => {
                    const doc = doctors.find((d) => d.id === nextAppointment.doctorId) || doctors[0];
                    setActiveVideoCallDoctor(doc);
                  }}
                  className="w-full sm:w-auto bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Join Video Call Now</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="w-full sm:w-auto bg-[#36352f] hover:bg-[#262522] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>View Appointment Pass</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => {
                  setActiveChatDoctorId(nextAppointment.doctorId);
                  setActiveTab('chat');
                }}
                className="w-full sm:w-auto bg-[#ffffff] hover:bg-[#f3efe6] text-[#36352f] font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-[#ded8cc] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#4f6352]" />
                <span>Message Doctor</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Health Vitals Summary Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HeartPulse className="w-4 h-4 text-[#4f6352]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#36352f] font-['Space_Grotesk']">
              Live Clinical Vitals & Biometrics
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('emr')}
            className="text-xs text-[#4f6352] font-bold hover:underline cursor-pointer flex items-center space-x-1"
          >
            <span>Complete Vitals History</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {vitals.map((vital, idx) => (
            <div
              key={idx}
              className="bg-[#ffffff] p-4 rounded-2xl border border-[#e8e4db] shadow-xs hover:border-[#8da08b] transition-all"
            >
              <div className="text-[11px] font-bold text-[#79776e] truncate mb-1">{vital.name}</div>
              <div className="text-lg font-black text-[#36352f] font-mono tracking-tight">{vital.value}</div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#f0ece3] text-[10px]">
                <span className="text-[#364b39] font-bold flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-0.5 text-[#4f6352]" />
                  {vital.status.toUpperCase()}
                </span>
                <span className="text-[#8a887e]">{vital.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Grid: Active Prescriptions + Recent Lab Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Prescriptions Snapshot */}
        <div className="bg-[#ffffff] rounded-3xl p-5 sm:p-6 border border-[#e8e4db] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#4f6352]" />
                <h3 className="font-bold text-sm text-[#36352f] font-['Space_Grotesk'] uppercase tracking-wider">
                  Active Prescriptions
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('emr')}
                className="text-xs text-[#4f6352] font-bold hover:underline cursor-pointer"
              >
                View All ({prescriptions.length})
              </button>
            </div>

            {activeRx && (
              <div className="p-4 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#8a887e] uppercase">
                      {activeRx.prescriptionNumber}
                    </span>
                    <h4 className="font-bold text-xs text-[#36352f] mt-0.5">{activeRx.diagnosis}</h4>
                    <p className="text-[11px] text-[#6e6d65]">Prescribed by {activeRx.doctorName} ({activeRx.hospital})</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#364b39] bg-[#edf2ec] px-2 py-0.5 rounded border border-[#d2ded0]">
                    Active
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {activeRx.medications.map((med) => (
                    <div
                      key={med.id}
                      className="p-2 bg-[#ffffff] rounded-xl border border-[#e8e4db] text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#36352f]">{med.medicineName}</span>
                        <span className="text-[10px] text-[#79776e] block">{med.genericName} • {med.timing}</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#364b39] bg-[#edf2ec] px-2 py-0.5 rounded border border-[#d2ded0]">
                        {med.frequency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setSelectedPrescriptionModal(activeRx)}
              className="flex-1 bg-[#36352f] hover:bg-[#262522] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Official Rx Slip</span>
            </button>
            <button
              onClick={() => setActiveTab('nearby')}
              className="bg-[#f3efe6] hover:bg-[#eae5da] text-[#36352f] border border-[#ded8cc] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#4f6352]" />
              <span>Order Refill</span>
            </button>
          </div>
        </div>

        {/* Recent Lab & Diagnostic Reports Snapshot */}
        <div className="bg-[#ffffff] rounded-3xl p-5 sm:p-6 border border-[#e8e4db] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FlaskConical className="w-4 h-4 text-[#4f6352]" />
                <h3 className="font-bold text-sm text-[#36352f] font-['Space_Grotesk'] uppercase tracking-wider">
                  Recent Diagnostic Lab Reports
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('emr')}
                className="text-xs text-[#4f6352] font-bold hover:underline cursor-pointer"
              >
                All Reports ({labReports.length})
              </button>
            </div>

            {latestLabReport && (
              <div className="p-4 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#8a887e] uppercase">
                      {latestLabReport.reportNumber}
                    </span>
                    <h4 className="font-bold text-xs text-[#36352f] mt-0.5">{latestLabReport.testName}</h4>
                    <p className="text-[11px] text-[#6e6d65]">{latestLabReport.labName} • {latestLabReport.date}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#364b39] bg-[#edf2ec] px-2 py-0.5 rounded border border-[#d2ded0] flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-[#4f6352]" />
                    Verified
                  </span>
                </div>

                {/* Key parameters preview */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {latestLabReport.results.slice(0, 4).map((res, i) => (
                    <div key={i} className="p-2 bg-[#ffffff] rounded-xl border border-[#e8e4db] text-xs">
                      <div className="text-[10px] text-[#79776e] truncate">{res.parameter}</div>
                      <div className="font-bold text-[#36352f] font-mono mt-0.5">
                        {res.value} <span className="text-[10px] font-normal text-[#8a887e]">{res.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-[#6e6d65] italic bg-[#ffffff]/90 p-2 rounded-lg border border-[#e8e4db]">
                  Impression: "{latestLabReport.clinicalImpression}"
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setSelectedLabReportModal(latestLabReport)}
              className="flex-1 bg-[#36352f] hover:bg-[#262522] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Inspect Full Investigation Report</span>
            </button>
            <button
              onClick={() => setActiveTab('nearby')}
              className="bg-[#f3efe6] hover:bg-[#eae5da] text-[#36352f] border border-[#ded8cc] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <span>Book Lab Test</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Feature Shortcuts Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveTab('doctor_guide')}
          className="p-4 bg-[#ffffff] hover:bg-[#f5f2eb] rounded-2xl border border-[#e8e4db] hover:border-[#8da08b] transition-all text-left group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#edf2ec] text-[#364b39] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-[#d2ded0]">
            <HelpCircle className="w-5 h-5 text-[#4f6352]" />
          </div>
          <h4 className="font-bold text-xs text-[#36352f] group-hover:text-[#2d3d30]">Doctor Category Guide</h4>
          <p className="text-[11px] text-[#79776e] mt-1">
            Check which specialist to consult based on your current symptoms.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('nearby')}
          className="p-4 bg-[#ffffff] hover:bg-[#f5f2eb] rounded-2xl border border-[#e8e4db] hover:border-[#8da08b] transition-all text-left group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#edf2ec] text-[#364b39] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-[#d2ded0]">
            <MapPin className="w-5 h-5 text-[#4f6352]" />
          </div>
          <h4 className="font-bold text-xs text-[#36352f] group-hover:text-[#2d3d30]">Nearby Chemist & Labs</h4>
          <p className="text-[11px] text-[#79776e] mt-1">
            Find 24/7 pharmacies and diagnostic centers near {currentLocationName.split(' ')[0]}.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('hospitals')}
          className="p-4 bg-[#ffffff] hover:bg-[#f5f2eb] rounded-2xl border border-[#e8e4db] hover:border-[#8da08b] transition-all text-left group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#edf2ec] text-[#364b39] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-[#d2ded0]">
            <Building2 className="w-5 h-5 text-[#4f6352]" />
          </div>
          <h4 className="font-bold text-xs text-[#36352f] group-hover:text-[#2d3d30]">Recent Hospital Visits</h4>
          <p className="text-[11px] text-[#79776e] mt-1">
            Review past discharge summaries, attending doctors, and follow-ups.
          </p>
        </button>

        <button
          onClick={() => setIsAadhaarLockerOpen(true)}
          className="p-4 bg-[#ffffff] hover:bg-[#f5f2eb] rounded-2xl border border-[#e8e4db] hover:border-[#8da08b] transition-all text-left group shadow-xs cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#fbf4eb] text-[#865d2c] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-[#ecdcc2]">
            <ShieldCheck className="w-5 h-5 text-[#a66a2e]" />
          </div>
          <h4 className="font-bold text-xs text-[#36352f] group-hover:text-[#734b1e]">ABHA Health Locker</h4>
          <p className="text-[11px] text-[#79776e] mt-1">
            Manage Aadhaar consent sharing & digital health card QR.
          </p>
        </button>
      </div>
    </div>
  );
};
