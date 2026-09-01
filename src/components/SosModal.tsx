import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  PhoneCall,
  AlertTriangle,
  Ambulance,
  MapPin,
  HeartPulse,
  ShieldAlert,
  Send,
  CheckCircle2,
  Building2
} from 'lucide-react';

export const SosModal: React.FC = () => {
  const { isSosModalOpen, setIsSosModalOpen, patientProfile, user, addToast } = useApp();
  const [isAmbulanceDispatched, setIsAmbulanceDispatched] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  if (!isSosModalOpen) return null;

  const handleDispatchAmbulance = () => {
    setIsAmbulanceDispatched(true);
    addToast('error', '🚨 108 Emergency Ambulance Dispatched', 'Indus Critical Care Ambulance #AMB-408 has been dispatched to your current GPS location.');
  };

  const handleAlertEmergencyContact = () => {
    setAlertSent(true);
    addToast('success', 'Emergency SMS Sent', `Alert & live location broadcasted to ${patientProfile.emergencyContact.name} (${patientProfile.emergencyContact.phone}).`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-xl border border-[#e0836e] w-full max-w-lg overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-[#86372d] p-6 text-white relative">
          <button
            onClick={() => setIsSosModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-[#f9d7d3] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <span>24x7 Critical Emergency Trauma Network</span>
          </div>

          <h2 className="text-xl font-black font-['Space_Grotesk'] text-white flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-[#dfdacd]" />
            <span>Emergency Medical Response (SOS)</span>
          </h2>
          <p className="text-xs text-[#f9d7d3] mt-1">
            Immediate dispatch for acute cardiac distress, severe trauma, stroke symptoms, or breathing failure.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Main Action Call Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:108"
              onClick={() => addToast('info', 'Calling 108', 'Initiating national emergency ambulance dialer...')}
              className="p-4 bg-[#86372d] hover:bg-[#722e26] text-white rounded-2xl flex flex-col justify-between transition-all shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <PhoneCall className="w-6 h-6 text-[#dfdacd]" />
                <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded">Toll Free</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-semibold text-[#f9d7d3]">National Emergency</div>
                <div className="text-xl font-black font-mono">Dial 108 / 112</div>
              </div>
            </a>

            <a
              href="tel:18002008800"
              onClick={() => addToast('info', 'Calling Indus Emergency Desk', 'Connecting to 24x7 Trauma Triage...')}
              className="p-4 bg-[#4f6352] hover:bg-[#3f5042] text-white rounded-2xl flex flex-col justify-between transition-all shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <HeartPulse className="w-6 h-6 text-[#dfdacd]" />
                <span className="text-[10px] bg-[#394a3c] text-[#dfdacd] font-bold px-2 py-0.5 rounded">24x7 ICU Desk</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-semibold text-[#dfdacd]/90">Indus Trauma Center</div>
                <div className="text-base font-black font-mono">1800-200-8800</div>
              </div>
            </a>
          </div>

          {/* 1-Click Ambulance Dispatch */}
          <div className="p-4 bg-[#fcedeb] rounded-2xl border border-[#f0c2bd] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Ambulance className="w-5 h-5 text-[#86372d]" />
                <span className="text-xs font-bold text-[#86372d] uppercase tracking-wider">
                  Request GPS Ambulance Dispatch
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#86372d] bg-white px-2 py-0.5 rounded border border-[#f0c2bd]">
                Est. Arrival: 8 Mins
              </span>
            </div>

            <p className="text-xs text-[#6e2d25] leading-relaxed">
              Dispatches the closest Advanced Life Support (ALS) cardiac ambulance equipped with ventilators & defibrillators to your recorded coordinates.
            </p>

            <button
              onClick={handleDispatchAmbulance}
              disabled={isAmbulanceDispatched}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                isAmbulanceDispatched
                  ? 'bg-[#4f6352] text-white'
                  : 'bg-[#86372d] hover:bg-[#722e26] text-white shadow-xs'
              }`}
            >
              {isAmbulanceDispatched ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ambulance #AMB-408 Dispatched • Tracking Live</span>
                </>
              ) : (
                <>
                  <Ambulance className="w-4 h-4" />
                  <span>DISPATCH EMERGENCY AMBULANCE NOW</span>
                </>
              )}
            </button>
          </div>

          {/* Emergency Contact & Medical ID Alert */}
          <div className="p-4 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#262522]">Primary Emergency Contact:</span>
              <span className="font-semibold text-[#43423b]">{patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relationship})</span>
            </div>
            <div className="text-xs font-mono text-[#6e6d65]">{patientProfile.emergencyContact.phone}</div>

            <div className="pt-2">
              <button
                onClick={handleAlertEmergencyContact}
                disabled={alertSent}
                className="w-full bg-[#e8e4db] hover:bg-[#ded8cc] disabled:bg-[#edf2ec] disabled:text-[#364b39] text-[#43423b] font-bold text-xs py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2 border border-[#ded8cc]"
              >
                {alertSent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4f6352]" />
                    <span>Emergency Alert Broadcasted via SMS</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#6e6d65]" />
                    <span>Send Immediate SOS SMS with Medical Vitals & GPS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
