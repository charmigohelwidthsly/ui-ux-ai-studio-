import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  FlaskConical,
  HeartPulse,
  Download,
  Printer,
  ShieldCheck,
  ShoppingBag,
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Building2
} from 'lucide-react';

export const EmrRecordsView: React.FC = () => {
  const {
    prescriptions,
    labReports,
    vitals,
    patientProfile,
    aadhaarInfo,
    setSelectedPrescriptionModal,
    setSelectedLabReportModal,
    orderMedicationsOnline,
    setActiveTab,
    addToast,
  } = useApp();

  const [activeEmrTab, setActiveEmrTab] = useState<'prescriptions' | 'lab_reports' | 'vitals_history'>('prescriptions');
  const [reportCategoryFilter, setReportCategoryFilter] = useState<string>('All');

  const labCategories = ['All', 'Biochemistry', 'Hematology', 'Radiology / Imaging'];

  const filteredLabReports = labReports.filter((rep) => {
    if (reportCategoryFilter === 'All') return true;
    return rep.category === reportCategoryFilter;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top EMR Header */}
      <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#4f6352] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#4f6352]" />
            <span>Ayushman Bharat Digital Locker (EMR Vault)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-[#36352f]">
            Electronic Medical Records (EMR / EHR)
          </h1>
          <p className="text-xs text-[#79776e] mt-0.5">
            Encrypted clinical vault storing official prescriptions, NABL lab investigations, and biometric vitals.
          </p>
        </div>

        {/* Sub-Tabs Switch */}
        <div className="flex bg-[#f3efe6] p-1.5 rounded-2xl space-x-1 text-xs font-bold w-full md:w-auto">
          <button
            onClick={() => setActiveEmrTab('prescriptions')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeEmrTab === 'prescriptions'
                ? 'bg-[#4f6352] text-white shadow-xs'
                : 'text-[#6e6d65] hover:text-[#36352f]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Prescriptions ({prescriptions.length})</span>
          </button>
          <button
            onClick={() => setActiveEmrTab('lab_reports')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeEmrTab === 'lab_reports'
                ? 'bg-[#4f6352] text-white shadow-xs'
                : 'text-[#6e6d65] hover:text-[#36352f]'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Lab Reports ({labReports.length})</span>
          </button>
          <button
            onClick={() => setActiveEmrTab('vitals_history')}
            className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
              activeEmrTab === 'vitals_history'
                ? 'bg-[#4f6352] text-white shadow-xs'
                : 'text-[#6e6d65] hover:text-[#36352f]'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Vitals & Allergies</span>
          </button>
        </div>
      </div>

      {/* PRESCRIPTIONS TAB */}
      {activeEmrTab === 'prescriptions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-5">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs hover:border-[#8da08b] transition-all space-y-4"
              >
                {/* Prescription Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f0ece3] gap-2">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#edf2ec] border border-[#d2ded0] text-[#364b39] flex items-center justify-center font-bold text-lg shrink-0">
                      Rx
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-[#79776e]">{rx.prescriptionNumber}</span>
                        <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] text-[10px] font-bold px-2 py-0.5 rounded">
                          Active Prescription
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#36352f] mt-0.5">{rx.diagnosis}</h3>
                      <p className="text-xs text-[#6e6d65]">
                        Prescribed by <strong>{rx.doctorName}</strong> ({rx.doctorSpecialty}) • {rx.hospital}
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs text-[#79776e]">
                    <div>Issued: <strong className="text-[#36352f]">{rx.date}</strong></div>
                    <div>Valid Till: <strong className="text-[#36352f]">{rx.validUntil}</strong></div>
                  </div>
                </div>

                {/* Medications List */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">
                    Prescribed Medications ({rx.medications.length})
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {rx.medications.map((med) => (
                      <div
                        key={med.id}
                        className="p-3.5 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] text-xs space-y-1.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="font-bold text-[#36352f] text-xs">{med.medicineName}</div>
                          <div className="text-[10px] text-[#79776e]">{med.genericName}</div>
                        </div>

                        <div className="pt-2 border-t border-[#e8e4db] space-y-1 text-[11px]">
                          <div className="flex justify-between">
                            <span className="text-[#79776e]">Frequency:</span>
                            <span className="font-bold text-[#364b39] bg-[#edf2ec] px-1.5 py-0.2 rounded border border-[#d2ded0]">
                              {med.frequency}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#79776e]">Timing:</span>
                            <span className="font-medium text-[#36352f]">{med.timing}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#79776e]">Duration:</span>
                            <span className="font-medium text-[#36352f]">{med.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dietary Advice */}
                <div className="p-3.5 bg-[#fbf4eb] rounded-2xl border border-[#ecdcc2] text-xs">
                  <span className="font-bold text-[#865d2c] text-[11px] uppercase tracking-wider block mb-1">
                    Doctor's Advice & Lifestyle Guide:
                  </span>
                  <p className="text-[#594d3f] text-[11px]">{rx.adviceAndDiet.join(' • ')}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between pt-2 border-t border-[#f0ece3] gap-2">
                  <div className="text-xs text-[#79776e]">
                    Next Follow-up Due: <strong className="text-[#364b39]">{rx.followUpDate}</strong>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSelectedPrescriptionModal(rx)}
                      className="bg-[#262522] hover:bg-[#36352f] text-[#f9f7f2] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Official Prescription Slip</span>
                    </button>
                    <button
                      onClick={() => {
                        orderMedicationsOnline('loc_1', rx.prescriptionNumber);
                        setActiveTab('nearby');
                      }}
                      className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Medicines via Chemist</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LAB REPORTS TAB */}
      {activeEmrTab === 'lab_reports' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-[#8a887e] uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {labCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setReportCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  reportCategoryFilter === cat
                    ? 'bg-[#4f6352] text-white shadow-xs'
                    : 'bg-[#ffffff] text-[#43423b] border border-[#ded8cc] hover:bg-[#f3efe6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5">
            {filteredLabReports.map((rep) => (
              <div
                key={rep.id}
                className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs hover:border-[#8da08b] transition-all space-y-4"
              >
                {/* Lab Report Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f0ece3] gap-2">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#edf2ec] border border-[#d2ded0] text-[#364b39] flex items-center justify-center font-bold text-lg shrink-0">
                      <FlaskConical className="w-6 h-6 text-[#4f6352]" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-[#79776e]">{rep.reportNumber}</span>
                        <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] text-[10px] font-bold px-2 py-0.5 rounded">
                          {rep.category}
                        </span>
                        <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] text-[10px] font-bold px-2 py-0.5 rounded flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-[#4f6352]" />
                          NABL Verified
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#36352f] mt-0.5">{rep.testName}</h3>
                      <p className="text-xs text-[#6e6d65]">{rep.labName} • Verified by {rep.pathologist}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs text-[#79776e]">
                    <div>Date: <strong className="text-[#36352f]">{rep.date}</strong></div>
                    <div>Specimen: <strong className="text-[#36352f]">{rep.specimenType}</strong></div>
                  </div>
                </div>

                {/* Parameters Preview Table */}
                <div className="border border-[#e8e4db] rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#f3efe6] text-[#6e6d65] font-bold text-[10px] uppercase tracking-wider border-b border-[#e8e4db]">
                      <tr>
                        <th className="p-3">Investigation Parameter</th>
                        <th className="p-3">Observed Value</th>
                        <th className="p-3">Reference Range</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f0ece3]">
                      {rep.results.slice(0, 4).map((r, idx) => (
                        <tr key={idx} className="hover:bg-[#f9f7f2]">
                          <td className="p-3 font-semibold text-[#36352f]">{r.parameter}</td>
                          <td className="p-3 font-mono font-bold text-[#36352f]">
                            {r.value} <span className="text-[10px] font-normal text-[#79776e]">{r.unit}</span>
                          </td>
                          <td className="p-3 text-[#6e6d65]">{r.referenceRange}</td>
                          <td className="p-3 text-right">
                            {r.status === 'normal' && (
                              <span className="text-[10px] font-bold bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] px-2 py-0.5 rounded">
                                NORMAL
                              </span>
                            )}
                            {r.status === 'borderline' && (
                              <span className="text-[10px] font-bold bg-[#fbf4eb] text-[#865d2c] border border-[#ecdcc2] px-2 py-0.5 rounded">
                                BORDERLINE
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Clinical Impression */}
                <p className="text-xs text-[#6e6d65] italic bg-[#f9f7f2] p-3 rounded-xl border border-[#e8e4db]">
                  Impression: "{rep.clinicalImpression}"
                </p>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#f0ece3]">
                  <button
                    onClick={() => setSelectedLabReportModal(rep)}
                    className="bg-[#262522] hover:bg-[#36352f] text-[#f9f7f2] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5 shadow-xs"
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>View Complete Pathology Report</span>
                  </button>
                  <button
                    onClick={() => addToast('success', 'Report Downloaded', `PDF saved for ${rep.testName}`)}
                    className="bg-[#f3efe6] hover:bg-[#eae5da] text-[#43423b] border border-[#ded8cc] text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VITALS & ALLERGIES HISTORY TAB */}
      {activeEmrTab === 'vitals_history' && (
        <div className="space-y-6">
          {/* Vitals Grid */}
          <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#36352f] font-['Space_Grotesk']">
              Clinical Vitals Tracker
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vitals.map((v, i) => (
                <div key={i} className="p-4 bg-[#f9f7f2] rounded-2xl border border-[#e8e4db] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#6e6d65]">{v.name}</span>
                    <span className="text-[10px] text-[#8a887e]">{v.lastChecked}</span>
                  </div>
                  <div className="text-xl font-black font-mono text-[#36352f]">{v.value}</div>
                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#e8e4db]">
                    <span className="text-[#364b39] font-bold flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-[#4f6352]" />
                      Optimal Zone
                    </span>
                    <span className="text-[#79776e] font-medium">{v.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Known Allergies & Chronic Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-[#a05643]" />
                <h3 className="font-bold text-base text-[#36352f] font-['Space_Grotesk']">
                  Known Drug & Environmental Allergies
                </h3>
              </div>
              <p className="text-xs text-[#79776e]">
                These allergies are permanently flagged across all electronic hospital prescriptions.
              </p>

              <div className="space-y-2 pt-2">
                {patientProfile.allergies.map((alg, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#fbf0eb] text-[#6d3023] rounded-xl border border-[#ecdcc2] text-xs font-bold flex items-center justify-between"
                  >
                    <span>⚠️ {alg}</span>
                    <span className="text-[10px] bg-[#ecdcc2] text-[#6d3023] px-2 py-0.5 rounded font-bold">
                      Critical Alert
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#ffffff] rounded-3xl p-6 border border-[#e8e4db] shadow-xs space-y-3">
              <div className="flex items-center space-x-2">
                <HeartPulse className="w-5 h-5 text-[#4f6352]" />
                <h3 className="font-bold text-base text-[#36352f] font-['Space_Grotesk']">
                  Chronic Health Conditions
                </h3>
              </div>
              <p className="text-xs text-[#79776e]">
                Ongoing clinical conditions actively monitored by consulting physicians.
              </p>

              <div className="space-y-2 pt-2">
                {patientProfile.chronicConditions.map((cond, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#edf2ec] text-[#2d3d30] rounded-xl border border-[#d2ded0] text-xs font-bold flex items-center justify-between"
                  >
                    <span>🩺 {cond}</span>
                    <span className="text-[10px] bg-[#d2ded0] text-[#2d3d30] px-2 py-0.5 rounded font-bold">
                      Under Treatment
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
