import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Printer,
  Download,
  ShoppingBag,
  HeartPulse,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';

export const PrescriptionModal: React.FC = () => {
  const {
    selectedPrescriptionModal,
    setSelectedPrescriptionModal,
    user,
    patientProfile,
    aadhaarInfo,
    orderMedicationsOnline,
    setActiveTab,
    addToast,
  } = useApp();

  if (!selectedPrescriptionModal) return null;

  const rx = selectedPrescriptionModal;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast('success', 'Prescription Downloaded', `Prescription ${rx.prescriptionNumber} saved as PDF.`);
  };

  const handleSendToPharmacy = () => {
    orderMedicationsOnline('loc_1', rx.prescriptionNumber);
    setSelectedPrescriptionModal(null);
    setActiveTab('nearby');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-3xl shadow-xl border border-[#e8e4db] w-full max-w-3xl overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Top Control Bar */}
        <div className="bg-[#4f6352] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#dfdacd]" />
            <span className="font-bold text-sm">Official Clinical Prescription: {rx.prescriptionNumber}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="bg-[#394a3c] hover:bg-[#2d3d30] text-[#e5efe3] text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="bg-[#394a3c] hover:bg-[#2d3d30] text-[#e5efe3] text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setSelectedPrescriptionModal(null)}
              className="text-[#d4e4d2] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Prescription Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white text-[#36352f] font-sans">
          {/* Hospital Letterhead */}
          <div className="border-b-2 border-[#262522] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-[#4f6352] flex items-center justify-center text-white font-black text-xl shadow-xs">
                <HeartPulse className="w-7 h-7 text-[#dfdacd]" />
              </div>
              <div>
                <h2 className="font-black text-lg text-[#262522] tracking-tight font-['Space_Grotesk']">
                  {rx.hospital}
                </h2>
                <p className="text-xs text-[#6e6d65] font-medium">Department of {rx.doctorSpecialty} • Clinical Outpatient Division</p>
                <p className="text-[10px] text-[#8a887e]">NABH & JCI Accredited Medical Facility • 24x7 Helpline: 1800-200-8800</p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs">
              <div className="font-bold text-[#262522]">{rx.doctorName}</div>
              <div className="text-[#6e6d65] text-[11px]">{rx.doctorSpecialty}</div>
              <div className="text-[10px] font-mono text-[#8a887e]">Reg No: {rx.doctorRegistrationNo}</div>
              <div className="text-[10px] font-semibold text-[#4f6352] mt-0.5">Date: {rx.date}</div>
            </div>
          </div>

          {/* Patient Demographics Banner */}
          <div className="bg-[#f9f7f2] p-4 rounded-xl border border-[#e8e4db] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">Patient Name</span>
              <span className="font-bold text-[#262522]">{user?.fullName || 'Priya Sharma'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">Age / Gender / Blood</span>
              <span className="font-semibold text-[#43423b]">{patientProfile.age} Yrs / {patientProfile.gender} / {patientProfile.bloodGroup}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">Patient UHID</span>
              <span className="font-mono font-bold text-[#43423b]">{user?.patientId || 'HC-2026-9042'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">ABHA ID Linked</span>
              <span className="font-mono font-bold text-[#364b39]">{aadhaarInfo.abhaId}</span>
            </div>
          </div>

          {/* Clinical Diagnosis & Complaints */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Diagnosis
              </span>
              <h3 className="font-bold text-sm text-[#262522]">{rx.diagnosis}</h3>
            </div>

            <div className="text-xs text-[#6e6d65] pl-2">
              <span className="font-semibold text-[#43423b]">Chief Symptoms / Evaluation: </span>
              {rx.chiefComplaints.join('; ')}
            </div>
          </div>

          {/* Rx Medications Table */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 border-b border-[#e8e4db] pb-1">
              <span className="text-xl font-black text-[#4f6352] font-serif italic">℞</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#36352f]">
                Prescribed Medications & Schedule
              </span>
            </div>

            <div className="border border-[#e8e4db] rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#f3efe6] text-[#43423b] font-bold border-b border-[#ded8cc] text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Medicine & Generic Strength</th>
                    <th className="p-3">Dosage & Frequency</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Timing & Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece3]">
                  {rx.medications.map((med, idx) => (
                    <tr key={med.id} className="hover:bg-[#f9f7f2]">
                      <td className="p-3 font-bold text-[#8a887e]">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-bold text-[#262522] text-xs">{med.medicineName}</div>
                        <div className="text-[10px] text-[#79776e]">{med.genericName}</div>
                      </td>
                      <td className="p-3 font-semibold text-[#364b39]">
                        <span className="bg-[#edf2ec] border border-[#d2ded0] px-2 py-0.5 rounded text-[11px] font-bold">
                          {med.frequency}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-[#43423b]">{med.duration}</td>
                      <td className="p-3 text-[11px] text-[#6e6d65]">
                        <div className="font-semibold text-[#262522]">{med.timing}</div>
                        <div className="text-[10px] text-[#79776e]">{med.instructions}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Advice, Diet & Follow-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 bg-[#faf6ee] rounded-xl border border-[#e8dfc8] text-xs space-y-1.5">
              <span className="font-bold text-[#634e2c] block text-[11px] uppercase tracking-wider">
                Lifestyle & Dietary Instructions
              </span>
              <ul className="list-disc list-inside space-y-1 text-[#594d3f] text-[11px]">
                {rx.adviceAndDiet.map((adv, i) => (
                  <li key={i}>{adv}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-[#f9f7f2] rounded-xl border border-[#e8e4db] text-xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="font-bold text-[#43423b] block text-[11px] uppercase tracking-wider">
                  Next Follow-up Review
                </span>
                <p className="font-bold text-[#4f6352] text-sm mt-0.5">{rx.followUpDate}</p>
                <p className="text-[10px] text-[#79776e]">Book slot 2 days prior via AarogyaCare portal.</p>
              </div>

              <div className="pt-2 border-t border-[#e8e4db] flex items-center justify-between text-[10px] text-[#79776e]">
                <span>Digitally Signed by {rx.doctorName}</span>
                <span className="text-[#364b39] font-bold flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-[#4f6352]" />
                  Verified e-Signature
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-[#f9f7f2] p-4 border-t border-[#e8e4db] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#6e6d65] flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4f6352]" />
            <span>Valid across all verified pharmacies under ABDM Digital Health Network.</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={handleSendToPharmacy}
              className="w-full sm:w-auto bg-[#4f6352] hover:bg-[#3f5042] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Medicines from Nearby Pharmacy (Doorstep Delivery)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
