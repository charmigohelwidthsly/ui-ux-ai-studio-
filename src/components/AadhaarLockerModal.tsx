import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ShieldCheck,
  QrCode,
  Building2,
  Lock,
  RefreshCw,
  CheckCircle2,
  Download,
  Share2,
  FileCheck,
  AlertTriangle,
  Fingerprint,
  Radio,
  ExternalLink
} from 'lucide-react';

export const AadhaarLockerModal: React.FC = () => {
  const {
    isAadhaarLockerOpen,
    setIsAadhaarLockerOpen,
    aadhaarInfo,
    user,
    patientProfile,
    toggleConsentSharing,
    unlinkAadhaar,
    setIsAuthModalOpen,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'card' | 'consent' | 'hospitals'>('card');

  if (!isAadhaarLockerOpen) return null;

  const handleDownloadCard = () => {
    addToast('success', 'ABHA Health Card Downloaded', 'Digital ABHA Card saved to your device in PDF/Image format.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-3xl shadow-xl border border-[#e8e4db] w-full max-w-2xl overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#4f6352] p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#dfdacd]">
              <Fingerprint className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base text-white font-['Space_Grotesk']">
                  National Digital Health ID (ABHA)
                </h3>
                <span className="bg-white/15 text-[#e5efe3] text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                  ABDM Verified
                </span>
              </div>
              <p className="text-xs text-[#d4e4d2]">Ayushman Bharat Digital Mission • National Health Authority</p>
            </div>
          </div>

          <button
            onClick={() => setIsAadhaarLockerOpen(false)}
            className="text-[#d4e4d2] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-[#e8e4db] bg-[#f9f7f2] px-6 pt-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('card')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'card'
                ? 'border-[#4f6352] text-[#262522] font-bold'
                : 'border-transparent text-[#79776e] hover:text-[#262522]'
            }`}
          >
            ABHA Digital Card
          </button>
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'hospitals'
                ? 'border-[#4f6352] text-[#262522] font-bold'
                : 'border-transparent text-[#79776e] hover:text-[#262522]'
            }`}
          >
            Linked Hospitals ({aadhaarInfo.linkedHospitals.length})
          </button>
          <button
            onClick={() => setActiveTab('consent')}
            className={`pb-3 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'consent'
                ? 'border-[#4f6352] text-[#262522] font-bold'
                : 'border-transparent text-[#79776e] hover:text-[#262522]'
            }`}
          >
            Consent & Privacy Manager
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'card' && (
            <div className="space-y-4">
              {aadhaarInfo.isLinked ? (
                <>
                  {/* Official ABDM Health Card Visual Design */}
                  <div className="bg-[#262522] text-[#f9f7f2] rounded-2xl p-6 shadow-xs relative overflow-hidden border border-[#3f3e39]">
                    {/* Background seal watermarks */}
                    <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#8da08b]/5 border border-[#8da08b]/10 pointer-events-none flex items-center justify-center">
                      <ShieldCheck className="w-32 h-32 text-[#8da08b]/10" />
                    </div>

                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-lg bg-white/10 p-1 flex items-center justify-center border border-white/20">
                          <Fingerprint className="w-5 h-5 text-[#dfdacd]" />
                        </div>
                        <div>
                          <div className="text-[10px] uppercase font-bold tracking-widest text-[#8da08b]">
                            National Health Authority
                          </div>
                          <div className="text-sm font-black font-['Space_Grotesk'] text-white">
                            ABHA DIGITAL HEALTH CARD
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] bg-[#dfdacd] text-[#262522] font-extrabold px-2 py-0.5 rounded shadow-xs">
                          AADHAAR VERIFIED
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10 relative z-10">
                      <div className="sm:col-span-2 space-y-3">
                        <div>
                          <div className="text-[10px] text-[#a8a59b] uppercase font-semibold">Patient Full Name</div>
                          <div className="text-base font-bold text-white tracking-wide">{user?.fullName || 'Priya Sharma'}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-[10px] text-[#a8a59b] uppercase font-semibold">ABHA Number</div>
                            <div className="font-mono font-bold text-[#dfdacd] text-sm tracking-wider">
                              {aadhaarInfo.abhaId}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#a8a59b] uppercase font-semibold">ABHA Address</div>
                            <div className="font-mono font-bold text-white text-xs">
                              {aadhaarInfo.abhaAddress}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                          <div>
                            <div className="text-[10px] text-[#a8a59b] uppercase font-semibold">Gender</div>
                            <div className="font-bold text-white">{patientProfile.gender}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#a8a59b] uppercase font-semibold">Blood Group</div>
                            <div className="font-bold text-[#dfdacd]">{patientProfile.bloodGroup}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#a8a59b] uppercase font-semibold">Aadhaar Last 4</div>
                            <div className="font-bold font-mono text-white">{aadhaarInfo.aadhaarNumberMasked}</div>
                          </div>
                        </div>
                      </div>

                      {/* QR Code section */}
                      <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl text-[#262522] shadow-xs">
                        {/* Realistic Mock QR Code */}
                        <div className="w-24 h-24 bg-[#262522] rounded-lg p-1.5 flex flex-col items-center justify-center">
                          <QrCode className="w-full h-full text-white" />
                        </div>
                        <span className="text-[9px] font-bold text-[#6e6d65] mt-1 uppercase tracking-tighter">
                          SCAN TO LINK RECORDS
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#a8a59b]">
                      <span>Verified On: {aadhaarInfo.verifiedOn}</span>
                      <span>UIDAI e-KYC Certified</span>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button
                      onClick={handleDownloadCard}
                      className="flex-1 bg-[#4f6352] hover:bg-[#3f5042] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Official PDF Card</span>
                    </button>
                    <button
                      onClick={() => addToast('info', 'Share QR Code', 'ABHA Health ID QR link copied to clipboard.')}
                      className="bg-[#f3efe6] hover:bg-[#eae5da] text-[#43423b] border border-[#ded8cc] text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share QR</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 px-4 bg-[#f9f7f2] rounded-2xl border border-[#ded8cc]">
                  <Fingerprint className="w-12 h-12 text-[#8a887e] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#36352f]">No Aadhaar ID Linked Yet</h4>
                  <p className="text-xs text-[#79776e] max-w-md mx-auto mt-1 mb-4">
                    Link your 12-digit Aadhaar to automatically pull medical histories, discharge summaries, and lab reports from all participating hospitals across India.
                  </p>
                  <button
                    onClick={() => {
                      setIsAadhaarLockerOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Link Aadhaar & Generate ABHA Card</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'hospitals' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h4 className="text-xs font-bold text-[#36352f] uppercase tracking-wider">
                    Participating Hospital Providers in Your Network
                  </h4>
                  <p className="text-xs text-[#79776e]">
                    These hospital institutions are securely synchronizing prescriptions and test results with your ABHA ID.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#364b39] bg-[#edf2ec] border border-[#d2ded0] px-2.5 py-1 rounded-full">
                  {aadhaarInfo.linkedHospitals.length} Active Nodes
                </span>
              </div>

              <div className="space-y-2">
                {aadhaarInfo.linkedHospitals.map((hosp) => (
                  <div
                    key={hosp.hospitalId}
                    className="p-3.5 bg-[#f9f7f2] rounded-xl border border-[#e8e4db] hover:border-[#8da08b] transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4 text-[#4f6352]" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#36352f]">{hosp.hospitalName}</div>
                        <div className="text-[11px] text-[#79776e] flex items-center space-x-2 mt-0.5">
                          <span>{hosp.recordsLinked} EMR Documents Synchronized</span>
                          <span>•</span>
                          <span>Last Synced: {hosp.lastSynced}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center text-[10px] font-bold text-[#364b39] bg-[#edf2ec] border border-[#d2ded0] px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-[#4f6352]" />
                        {hosp.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'consent' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#f9f7f2] border border-[#e8e4db] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#36352f]">ABDM Automatic Record Sharing Consent</h4>
                    <p className="text-xs text-[#79776e]">
                      Permits authorized doctors and diagnostic labs to view prior diagnostic reports and drug allergies during consultations.
                    </p>
                  </div>
                  <button
                    onClick={toggleConsentSharing}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      aadhaarInfo.consentSharingEnabled ? 'bg-[#4f6352]' : 'bg-[#ded8cc]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                        aadhaarInfo.consentSharingEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="border-t border-[#e8e4db] pt-3 space-y-2 text-xs text-[#6e6d65]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4f6352] shrink-0" />
                    <span>You receive instant SMS alerts whenever a hospital requests medical records</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4f6352] shrink-0" />
                    <span>Time-bound access: Doctors only see records for 72 hours post consultation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4f6352] shrink-0" />
                    <span>Data encrypted in transit using FIPS 140-2 validated protocols</span>
                  </div>
                </div>
              </div>

              {aadhaarInfo.isLinked && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={unlinkAadhaar}
                    className="text-xs font-semibold text-[#865d2c] hover:text-[#594d3f] hover:underline cursor-pointer flex items-center space-x-1"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Unlink Aadhaar / Revoke ABHA from this browser</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
