import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Calendar,
  User,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  PhoneCall,
  MapPin,
  Star,
  Activity,
  ArrowRight
} from 'lucide-react';

export const RecentHospitalsView: React.FC = () => {
  const {
    recentVisits,
    hospitalsDirectory,
    setSelectedDoctorForBooking,
    doctors,
    setActiveTab,
    addToast,
  } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-[#4f6352] text-white rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <span className="bg-[#ffffff]/15 text-[#e5efe3] text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/20 uppercase tracking-wider inline-flex items-center space-x-1">
            <Building2 className="w-3.5 h-3.5" />
            <span>Health System Network History</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-white">
            Recently Visited Hospitals & Network Centers
          </h1>
          <p className="text-xs sm:text-sm text-[#e5efe3]/90 leading-relaxed">
            Review past inpatient admissions, day-care procedures, discharge summaries, attending medical teams, and discover accredited partner hospitals.
          </p>
        </div>
      </div>

      {/* Recently Visited Hospitals Timeline */}
      <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#4f6352]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#36352f] font-['Space_Grotesk']">
              Your Clinical Visit & Inpatient History
            </h2>
          </div>
          <span className="text-xs font-bold text-[#364b39] bg-[#edf2ec] px-2.5 py-0.5 rounded-full border border-[#d2ded0]">
            {recentVisits.length} Recorded Visits
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentVisits.map((visit) => (
            <div
              key={visit.id}
              className="bg-[#f9f7f2] rounded-2xl p-5 border border-[#e8e4db] hover:border-[#8da08b] transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#79776e] uppercase">
                    IPD / OPD ID: {visit.ipdOrOpdNumber}
                  </span>
                  <h3 className="font-bold text-base text-[#36352f] mt-0.5">{visit.hospitalName}</h3>
                  <p className="text-xs text-[#4f6352] font-semibold">{visit.department}</p>
                </div>

                <span className="text-[10px] font-bold bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] px-2 py-0.5 rounded flex items-center">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-[#4f6352]" />
                  {visit.type === 'inpatient' ? 'Inpatient Stay' : 'OPD Consultation'}
                </span>
              </div>

              {/* Diagnosis Details */}
              <div className="p-3 bg-[#ffffff] rounded-xl border border-[#ded8cc] text-xs space-y-1">
                <div className="text-[#79776e] font-medium">Admission / Reason for Visit:</div>
                <div className="font-bold text-[#36352f]">{visit.reasonForVisit}</div>
                <p className="text-[11px] text-[#6e6d65] italic pt-1 border-t border-[#f0ece3] mt-1">
                  Discharge Summary: "{visit.summary}"
                </p>
              </div>

              {/* Doctor & Date sub-row */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#6e6d65] pt-1">
                <div>
                  <span className="text-[10px] text-[#8a887e] block">Attending Doctor</span>
                  <span className="font-bold text-[#36352f]">{visit.doctorName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#8a887e] block">Visit Date</span>
                  <span className="font-bold text-[#36352f]">{visit.visitDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-[#e8e4db] flex items-center justify-between">
                <button
                  onClick={() => addToast('success', 'Discharge Summary Downloaded', `PDF record saved for ${visit.hospitalName}`)}
                  className="text-xs text-[#4f6352] hover:text-[#364b39] font-bold flex items-center space-x-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Discharge Slip</span>
                </button>

                <button
                  onClick={() => {
                    const doc = doctors.find((d) => d.name === visit.doctorName) || doctors[0];
                    setSelectedDoctorForBooking(doc);
                    setActiveTab('appointments');
                  }}
                  className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <span>Book Follow-up</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Partner Hospital Directory */}
      <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-[#4f6352]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#36352f] font-['Space_Grotesk']">
              Suggested Accredited Hospital Centers
            </h2>
          </div>
          <span className="text-xs text-[#79776e]">NABH & JCI Certified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {hospitalsDirectory.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-[#f9f7f2] rounded-3xl p-5 border border-[#e8e4db] hover:border-[#8da08b] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] text-[10px] font-bold px-2 py-0.5 rounded">
                      {hosp.accreditation}
                    </span>
                    <h3 className="font-bold text-base text-[#36352f] mt-1">{hosp.name}</h3>
                    <p className="text-xs text-[#79776e] flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8a887e]" />
                      <span>{hosp.location} • {hosp.city}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-1 text-xs font-bold text-[#865d2c]">
                      <Star className="w-3.5 h-3.5 fill-[#865d2c] text-[#865d2c]" />
                      <span>{hosp.rating}</span>
                      <span className="text-[#8a887e] font-normal">({hosp.reviewsCount})</span>
                    </div>
                    <span className="text-[10px] text-[#364b39] font-bold bg-[#edf2ec] border border-[#d2ded0] px-2 py-0.5 rounded mt-1 block">
                      {hosp.emergencyBeds} ICU Beds Available
                    </span>
                  </div>
                </div>

                {/* Specialties Tag list */}
                <div>
                  <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block mb-1">
                    Key Centers of Excellence:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {hosp.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-[#ffffff] text-[#43423b] text-[11px] font-medium px-2 py-0.5 rounded-md border border-[#ded8cc]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6e6d65] pt-1 border-t border-[#e8e4db]">
                  <span>Emergency Desk: <strong className="text-[#36352f]">{hosp.emergencyContact}</strong></span>
                  <span>OPD Timing: <strong className="text-[#36352f]">{hosp.opdTiming}</strong></span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-[#e8e4db] mt-3 flex items-center justify-between">
                <a
                  href={`tel:${hosp.emergencyContact}`}
                  className="text-xs text-[#43423b] font-semibold hover:text-[#262522] flex items-center space-x-1"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#4f6352]" />
                  <span>Call Hospital</span>
                </a>

                <button
                  onClick={() => {
                    setActiveTab('appointments');
                  }}
                  className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-xs flex items-center space-x-1 cursor-pointer"
                >
                  <span>Book Hospital OPD</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
