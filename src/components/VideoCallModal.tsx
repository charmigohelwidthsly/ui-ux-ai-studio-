import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  ShieldCheck,
  FileText,
  User,
  HeartPulse,
  Activity,
  Send,
  Maximize2
} from 'lucide-react';

export const VideoCallModal: React.FC = () => {
  const { activeVideoCallDoctor, setActiveVideoCallDoctor, user, addToast } = useApp();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [callMessages, setCallMessages] = useState<string[]>([
    'Doctor Arvind Sen joined the secure consultation room.',
    'Doctor: "Hello Priya, how are you feeling today?"',
  ]);

  useEffect(() => {
    if (!activeVideoCallDoctor) return;
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeVideoCallDoctor]);

  if (!activeVideoCallDoctor) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setActiveVideoCallDoctor(null);
    addToast('info', 'Call Ended', `Teleconsultation with ${activeVideoCallDoctor.name} completed. Consultation notes saved to EMR.`);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setCallMessages((prev) => [...prev, `You: ${chatInput}`]);
    const text = chatInput;
    setChatInput('');

    setTimeout(() => {
      setCallMessages((prev) => [
        ...prev,
        `Doctor: "Noted your comment: '${text}'. Let's check your latest reading."`,
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#262522] rounded-3xl shadow-xl border border-[#3f3e39] w-full max-w-4xl overflow-hidden relative flex flex-col h-[85vh]">
        {/* Call Top Bar */}
        <div className="bg-[#1c1b18] p-4 border-b border-[#36352f] flex items-center justify-between text-white z-10">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-[#86372d] animate-ping"></div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <span>Teleconsultation: {activeVideoCallDoctor.name}</span>
                <span className="text-[10px] bg-[#4f6352] text-[#dfdacd] px-2 py-0.5 rounded border border-[#657d69]">
                  {activeVideoCallDoctor.specialty}
                </span>
              </h3>
              <p className="text-[11px] text-[#a8a59b]">Encrypted HD Clinical Video Stream • ABDM EMR Connected</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs bg-[#36352f] text-[#dfdacd] px-3 py-1 rounded-full border border-[#4a4942] font-bold">
              {formatTime(callDuration)}
            </span>
            <button
              onClick={handleEndCall}
              className="text-[#a8a59b] hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Area Grid */}
        <div className="flex-1 relative bg-[#1c1b18] flex flex-col md:flex-row overflow-hidden">
          {/* Main Doctor Video Frame */}
          <div className="flex-1 relative flex items-center justify-center bg-radial from-[#262522] to-[#1c1b18] p-4">
            {/* Realistic Doctor Video Feed Simulation */}
            <div className="relative w-full h-full max-w-2xl max-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-[#3f3e39] flex items-center justify-center bg-[#262522]">
              <img
                src={activeVideoCallDoctor.avatar}
                alt={activeVideoCallDoctor.name}
                className="w-full h-full object-cover opacity-90 filter brightness-95"
              />

              {/* Overlay Doctor Name Tag */}
              <div className="absolute bottom-4 left-4 bg-[#1c1b18]/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-white/10 text-white text-xs flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#8da08b]"></span>
                <span className="font-bold">{activeVideoCallDoctor.name}</span>
                <span className="text-[#a8a59b] text-[10px]">({activeVideoCallDoctor.hospital})</span>
              </div>

              <div className="absolute top-4 right-4 bg-[#1c1b18]/80 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] text-[#dfdacd] border border-white/10 flex items-center space-x-1">
                <Activity className="w-3 h-3 text-[#8da08b]" />
                <span>HD 1080p • 60fps</span>
              </div>
            </div>

            {/* Picture-in-picture Patient Self Video Feed */}
            <div className="absolute top-6 right-6 w-36 h-28 sm:w-44 sm:h-32 bg-[#262522] rounded-xl overflow-hidden border-2 border-[#8da08b] shadow-xl z-20">
              {isVideoOn ? (
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
                  alt="You"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[#a8a59b] text-xs">
                  <VideoOff className="w-6 h-6 mb-1 text-[#6e6d65]" />
                  <span>Camera Off</span>
                </div>
              )}
              <div className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                You {isMicOn ? '🎙️' : '🔇'}
              </div>
            </div>
          </div>

          {/* In-Call Live Chat / Notes Drawer */}
          {chatOpen && (
            <div className="w-full md:w-80 bg-[#262522] border-l border-[#3f3e39] flex flex-col h-full animate-in slide-in-from-right duration-200">
              <div className="p-3 border-b border-[#3f3e39] text-xs font-bold text-white flex items-center justify-between">
                <span>In-Call Messages</span>
                <button onClick={() => setChatOpen(false)} className="text-[#a8a59b] hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {callMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl ${
                      msg.startsWith('You:')
                        ? 'bg-[#4f6352] text-white ml-4'
                        : 'bg-[#36352f] text-[#dfdacd] mr-4'
                    }`}
                  >
                    {msg}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-2 border-t border-[#3f3e39] flex space-x-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type to doctor..."
                  className="flex-1 bg-[#1c1b18] border border-[#3f3e39] rounded-xl px-3 py-2 text-xs text-white outline-hidden"
                />
                <button
                  type="submit"
                  className="bg-[#4f6352] hover:bg-[#3f5042] text-white p-2 rounded-xl cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="bg-[#1c1b18] p-4 border-t border-[#3f3e39] flex items-center justify-between">
          <div className="text-xs text-[#a8a59b] hidden sm:flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#8da08b]" />
            <span>End-to-End Encrypted Teleconsultation</span>
          </div>

          <div className="flex items-center space-x-3 mx-auto sm:mx-0">
            {/* Mic Toggle */}
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-3.5 rounded-2xl transition-all cursor-pointer shadow-xs ${
                isMicOn
                  ? 'bg-[#36352f] hover:bg-[#43423b] text-white'
                  : 'bg-[#86372d] hover:bg-[#722e26] text-white'
              }`}
              title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            {/* Video Toggle */}
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3.5 rounded-2xl transition-all cursor-pointer shadow-xs ${
                isVideoOn
                  ? 'bg-[#36352f] hover:bg-[#43423b] text-white'
                  : 'bg-[#86372d] hover:bg-[#722e26] text-white'
              }`}
              title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            {/* Chat Drawer Toggle */}
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`p-3.5 rounded-2xl transition-all cursor-pointer shadow-xs ${
                chatOpen ? 'bg-[#4f6352] text-white' : 'bg-[#36352f] hover:bg-[#43423b] text-white'
              }`}
              title="Open Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="bg-[#86372d] hover:bg-[#722e26] text-white px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs"
            >
              <PhoneOff className="w-5 h-5" />
              <span>Leave Consultation</span>
            </button>
          </div>

          <div className="hidden sm:block">
            <button
              onClick={() => addToast('info', 'Prescription Sync', 'Doctor is updating your clinical notes live.')}
              className="bg-[#36352f] hover:bg-[#43423b] text-[#dfdacd] text-xs px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#8da08b]" />
              <span>View Shared EMR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
