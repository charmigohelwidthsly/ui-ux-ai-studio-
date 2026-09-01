import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Video,
  Phone,
  Paperclip,
  Image,
  FileText,
  FlaskConical,
  CheckCheck,
  Building2,
  Clock,
  Sparkles,
  ShieldCheck,
  User,
  HeartPulse,
  Smile,
  Info
} from 'lucide-react';

export const DoctorChatView: React.FC = () => {
  const {
    doctors,
    activeChatDoctorId,
    setActiveChatDoctorId,
    chatMessages,
    sendChatMessage,
    setActiveVideoCallDoctor,
    setSelectedPrescriptionModal,
    setSelectedLabReportModal,
    prescriptions,
    labReports,
    addToast,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeDoctor = doctors.find((d) => d.id === activeChatDoctorId) || doctors[0];
  const activeConversation = chatMessages[activeDoctor.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendChatMessage(activeDoctor.id, inputMessage);
    setInputMessage('');
  };

  const handleSendQuickPrompt = (promptText: string) => {
    sendChatMessage(activeDoctor.id, promptText);
  };

  const handleAttachPrescription = () => {
    const rx = prescriptions[0];
    sendChatMessage(activeDoctor.id, `Shared active prescription: ${rx.prescriptionNumber} (${rx.diagnosis})`, {
      type: 'prescription',
      title: `${rx.prescriptionNumber} - ${rx.diagnosis}`,
      refId: rx.id,
    });
    setIsAttachmentMenuOpen(false);
    addToast('success', 'Prescription Attached', 'Prescription forwarded to doctor conversation.');
  };

  const handleAttachLabReport = () => {
    const rep = labReports[0];
    sendChatMessage(activeDoctor.id, `Shared latest diagnostic report: ${rep.testName}`, {
      type: 'lab_report',
      title: `${rep.testName} (${rep.date})`,
      refId: rep.id,
    });
    setIsAttachmentMenuOpen(false);
    addToast('success', 'Lab Report Attached', 'Pathology report forwarded to doctor conversation.');
  };

  const quickPrompts = [
    'How should I adjust my dosage if my BP is 120/80?',
    'I have completed the 5-day antibiotic course.',
    'Should I do overnight 12-hour fasting for tomorrow’s lipid test?',
    'Requesting a refill for my monthly Atorvastatin.',
  ];

  return (
    <div className="pb-12 h-[calc(100vh-140px)] min-h-[580px] flex flex-col space-y-4">
      {/* Top Banner Notice */}
      <div className="bg-[#edf2ec] border border-[#d2ded0] px-4 py-2 rounded-2xl flex items-center justify-between text-xs text-[#2d3d30] shadow-xs shrink-0">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#4f6352] shrink-0" />
          <span>
            Real-time direct doctor messaging is active with <strong>{activeDoctor.hospital}</strong> medical staff.
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#364b39] hidden sm:inline">Encrypted HIPAA & ABDM Compliant</span>
      </div>

      {/* Main Chat Container */}
      <div className="flex-1 bg-[#ffffff] rounded-3xl border border-[#e8e4db] shadow-xs overflow-hidden flex flex-col md:flex-row">
        {/* Doctors Directory Sidebar */}
        <div className="w-full md:w-80 border-r border-[#e8e4db] bg-[#f9f7f2] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#e8e4db]">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#79776e] font-['Space_Grotesk']">
              Assigned Hospital Doctors
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#f0ece3] p-2 space-y-1">
            {doctors.slice(0, 5).map((doc) => {
              const isSelected = doc.id === activeDoctor.id;
              const docMsgs = chatMessages[doc.id] || [];
              const lastMsg = docMsgs[docMsgs.length - 1];

              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveChatDoctorId(doc.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center space-x-3 ${
                    isSelected ? 'bg-[#4f6352] text-white shadow-xs' : 'hover:bg-[#eae5da] text-[#43423b]'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-11 h-11 rounded-xl object-cover border border-white/20"
                    />
                    <span className="w-3 h-3 rounded-full bg-[#8da08b] border-2 border-white absolute -bottom-0.5 -right-0.5"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs truncate">{doc.name}</h4>
                      <span className={`text-[10px] ${isSelected ? 'text-[#d4e4d2]' : 'text-[#8a887e]'}`}>Online</span>
                    </div>
                    <div className={`text-[11px] truncate ${isSelected ? 'text-[#e5efe3]' : 'text-[#4f6352] font-semibold'}`}>
                      {doc.specialty}
                    </div>
                    <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-[#d4e4d2]/80' : 'text-[#79776e]'}`}>
                      {lastMsg ? lastMsg.text : 'Tap to start consultation chat'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Chat Conversation Area */}
        <div className="flex-1 flex flex-col bg-[#ffffff] overflow-hidden">
          {/* Active Doctor Header */}
          <div className="p-4 border-b border-[#e8e4db] flex items-center justify-between bg-[#f9f7f2]">
            <div className="flex items-center space-x-3">
              <img
                src={activeDoctor.avatar}
                alt={activeDoctor.name}
                className="w-10 h-10 rounded-xl object-cover border border-[#8da08b]/40 shadow-xs"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-sm text-[#36352f]">{activeDoctor.name}</h3>
                  <span className="bg-[#edf2ec] text-[#364b39] border border-[#d2ded0] text-[10px] font-bold px-2 py-0.5 rounded">
                    {activeDoctor.specialty}
                  </span>
                </div>
                <p className="text-[11px] text-[#79776e] flex items-center space-x-1 mt-0.5">
                  <Building2 className="w-3 h-3 text-[#8a887e]" />
                  <span>{activeDoctor.hospital}</span>
                </p>
              </div>
            </div>

            {/* Header Call Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveVideoCallDoctor(activeDoctor)}
                className="bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs cursor-pointer"
                title="Start Video Call Consultation"
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:inline">Start Video Call</span>
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#f9f7f2]/50">
            {activeConversation.map((msg) => {
              const isPatient = msg.sender === 'patient';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs shadow-xs space-y-2 ${
                      isPatient
                        ? 'bg-[#4f6352] text-white rounded-br-xs'
                        : 'bg-[#ffffff] text-[#36352f] border border-[#e8e4db] rounded-bl-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Attached records preview */}
                    {msg.attachment && (
                      <div
                        onClick={() => {
                          if (msg.attachment?.type === 'prescription') {
                            setSelectedPrescriptionModal(prescriptions[0]);
                          } else if (msg.attachment?.type === 'lab_report') {
                            setSelectedLabReportModal(labReports[0]);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center space-x-2 transition-colors ${
                          isPatient
                            ? 'bg-[#3f5042] border-[#8da08b]/40 text-white hover:bg-[#354337]'
                            : 'bg-[#f9f7f2] border-[#ded8cc] text-[#43423b] hover:bg-[#eae5da]'
                        }`}
                      >
                        {msg.attachment.type === 'prescription' && <FileText className="w-4 h-4 text-[#8da08b]" />}
                        {msg.attachment.type === 'lab_report' && <FlaskConical className="w-4 h-4 text-[#8da08b]" />}
                        <div className="flex-1 truncate">
                          <span className="font-bold block truncate">{msg.attachment.title}</span>
                          <span className="text-[10px] opacity-80">Click to inspect official record</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-1 text-[10px] text-[#8a887e] px-1">
                    <span>{msg.timestamp}</span>
                    {isPatient && <CheckCheck className="w-3 h-3 text-[#4f6352]" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-4 py-2 border-t border-[#f0ece3] bg-[#ffffff]">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              <Sparkles className="w-3.5 h-3.5 text-[#4f6352] shrink-0" />
              <span className="text-[10px] font-bold text-[#8a887e] uppercase tracking-wider shrink-0 mr-1">
                Quick Prompts:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendQuickPrompt(prompt)}
                  className="bg-[#f3efe6] hover:bg-[#edf2ec] hover:text-[#2d3d30] text-[#43423b] text-[11px] font-medium px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors border border-[#ded8cc] cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Send Box */}
          <div className="p-3 bg-[#ffffff] border-t border-[#e8e4db] relative">
            {/* Attachment Popover Menu */}
            {isAttachmentMenuOpen && (
              <div className="absolute bottom-16 left-4 bg-[#ffffff] rounded-2xl shadow-xl border border-[#e8e4db] p-2 space-y-1 z-30 animate-in fade-in zoom-in-95 duration-150 w-64">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8a887e]">
                  Attach Medical Records
                </div>
                <button
                  onClick={handleAttachPrescription}
                  className="w-full text-left p-2 hover:bg-[#f3efe6] rounded-xl text-xs text-[#43423b] flex items-center space-x-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#4f6352]" />
                  <div>
                    <div className="font-bold text-[#36352f]">Active Prescription</div>
                    <div className="text-[10px] text-[#79776e]">{prescriptions[0].prescriptionNumber}</div>
                  </div>
                </button>
                <button
                  onClick={handleAttachLabReport}
                  className="w-full text-left p-2 hover:bg-[#f3efe6] rounded-xl text-xs text-[#43423b] flex items-center space-x-2 cursor-pointer"
                >
                  <FlaskConical className="w-4 h-4 text-[#4f6352]" />
                  <div>
                    <div className="font-bold text-[#36352f]">Latest Lab Report</div>
                    <div className="text-[10px] text-[#79776e]">{labReports[0].testName}</div>
                  </div>
                </button>
              </div>
            )}

            <form onSubmit={handleSend} className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                className="p-2.5 rounded-xl text-[#79776e] hover:bg-[#f3efe6] hover:text-[#36352f] transition-colors cursor-pointer"
                title="Attach EMR Records"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Type a medical query to ${activeDoctor.name}...`}
                className="flex-1 bg-[#f9f7f2] border border-[#ded8cc] focus:border-[#4f6352] focus:bg-white rounded-xl px-4 py-2.5 text-xs text-[#36352f] outline-hidden font-medium"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-[#4f6352] hover:bg-[#3f5042] disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-md shadow-[#4f6352]/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
