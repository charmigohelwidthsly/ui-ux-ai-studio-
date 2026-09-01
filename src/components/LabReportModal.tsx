import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  ShieldCheck,
  Building2,
  Calendar,
  Share2
} from 'lucide-react';

export const LabReportModal: React.FC = () => {
  const {
    selectedLabReportModal,
    setSelectedLabReportModal,
    user,
    patientProfile,
    aadhaarInfo,
    addToast,
  } = useApp();

  if (!selectedLabReportModal) return null;

  const rep = selectedLabReportModal;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    addToast('success', 'Diagnostic Report Saved', `Report ${rep.reportNumber} downloaded as PDF.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-3xl shadow-xl border border-[#e8e4db] w-full max-w-3xl overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#4f6352] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FlaskConical className="w-5 h-5 text-[#dfdacd]" />
            <span className="font-bold text-sm">Diagnostic Investigation: {rep.reportNumber}</span>
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
              onClick={() => setSelectedLabReportModal(null)}
              className="text-[#d4e4d2] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white text-[#36352f] font-sans">
          {/* Lab Header */}
          <div className="border-b-2 border-[#262522] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-[#4f6352] flex items-center justify-center text-white font-black text-xl shadow-xs">
                <FlaskConical className="w-7 h-7 text-[#dfdacd]" />
              </div>
              <div>
                <h2 className="font-black text-lg text-[#262522] tracking-tight font-['Space_Grotesk']">
                  {rep.labName}
                </h2>
                <p className="text-xs text-[#6e6d65] font-medium">NABL & CAP Accredited Central Diagnostic Laboratory</p>
                <p className="text-[10px] text-[#8a887e]">Specimen: {rep.specimenType} • Sample: {rep.sampleCollectedAt}</p>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs">
              <div className="font-bold text-[#262522]">{rep.pathologist}</div>
              <div className="text-[#6e6d65] text-[11px]">Consultant Pathologist</div>
              <div className="text-[10px] font-semibold text-[#4f6352] mt-0.5">Report Date: {rep.date}</div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="bg-[#f9f7f2] p-4 rounded-xl border border-[#e8e4db] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">Patient Name</span>
              <span className="font-bold text-[#262522]">{user?.fullName || 'Priya Sharma'}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">Age / Gender</span>
              <span className="font-semibold text-[#43423b]">{patientProfile.age} Yrs / {patientProfile.gender}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">UHID / Lab ID</span>
              <span className="font-mono font-bold text-[#43423b]">{user?.patientId}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider block">ABHA ID (Linked)</span>
              <span className="font-mono font-bold text-[#364b39]">{aadhaarInfo.abhaId}</span>
            </div>
          </div>

          {/* Test Name & Category */}
          <div className="flex items-center justify-between pb-1 border-b border-[#e8e4db]">
            <div>
              <span className="text-[10px] font-bold text-[#364b39] uppercase tracking-wider bg-[#edf2ec] px-2 py-0.5 rounded border border-[#d2ded0]">
                {rep.category}
              </span>
              <h3 className="font-bold text-base text-[#262522] mt-1">{rep.testName}</h3>
            </div>
            <span className="text-xs font-semibold text-[#364b39] bg-[#edf2ec] px-2.5 py-1 rounded-full border border-[#d2ded0] flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#4f6352]" />
              Verified NABL Report
            </span>
          </div>

          {/* Tabular Results */}
          <div className="border border-[#e8e4db] rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#f3efe6] text-[#43423b] font-bold border-b border-[#ded8cc] text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Investigation Parameter</th>
                  <th className="p-3">Observed Value</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Biological Reference Interval</th>
                  <th className="p-3 text-right">Flag / Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ece3]">
                {rep.results.map((res, i) => (
                  <tr key={i} className="hover:bg-[#f9f7f2]">
                    <td className="p-3 font-semibold text-[#262522]">
                      <div>{res.parameter}</div>
                      {res.interpretation && (
                        <div className="text-[10px] text-[#79776e] font-normal mt-0.5">{res.interpretation}</div>
                      )}
                    </td>
                    <td className="p-3 font-bold font-mono text-sm text-[#262522]">{res.value}</td>
                    <td className="p-3 text-[#79776e]">{res.unit}</td>
                    <td className="p-3 font-medium text-[#43423b]">{res.referenceRange}</td>
                    <td className="p-3 text-right">
                      {res.status === 'normal' && (
                        <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] font-bold text-[10px] px-2 py-0.5 rounded">
                          NORMAL
                        </span>
                      )}
                      {res.status === 'borderline' && (
                        <span className="bg-[#faf6ee] text-[#634e2c] border border-[#e8dfc8] font-bold text-[10px] px-2 py-0.5 rounded">
                          BORDERLINE
                        </span>
                      )}
                      {res.status === 'high' && (
                        <span className="bg-[#fcedeb] text-[#86372d] border border-[#f0c2bd] font-bold text-[10px] px-2 py-0.5 rounded">
                          HIGH
                        </span>
                      )}
                      {res.status === 'low' && (
                        <span className="bg-[#eef2f5] text-[#364a59] border border-[#ccdbe6] font-bold text-[10px] px-2 py-0.5 rounded">
                          LOW
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Clinical Impression & Recommendation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-[#f9f7f2] rounded-xl border border-[#e8e4db] text-xs space-y-1">
              <span className="font-bold text-[#262522] text-[11px] uppercase tracking-wider block">
                Clinical Impression
              </span>
              <p className="text-[#43423b] text-xs leading-relaxed">{rep.clinicalImpression}</p>
            </div>
            <div className="p-3.5 bg-[#edf2ec] rounded-xl border border-[#d2ded0] text-xs space-y-1">
              <span className="font-bold text-[#364b39] text-[11px] uppercase tracking-wider block">
                Doctor's Recommendation
              </span>
              <p className="text-[#2d3d30] text-xs leading-relaxed">{rep.doctorRecommendation}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f9f7f2] p-4 border-t border-[#e8e4db] flex items-center justify-between text-xs text-[#79776e]">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4f6352]" />
            <span>End of Report • Verified by {rep.pathologist}</span>
          </div>
          <button
            onClick={() => setSelectedLabReportModal(null)}
            className="bg-[#4f6352] hover:bg-[#3f5042] text-white text-xs font-semibold py-1.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
