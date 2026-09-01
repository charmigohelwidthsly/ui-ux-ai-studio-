import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GoogleAuthButton } from './GoogleAuthButton';
import {
  X,
  Lock,
  User,
  ShieldCheck,
  Smartphone,
  KeyRound,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  Fingerprint
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    login,
    register,
    linkAadhaar,
    aadhaarInfo,
  } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'register' | 'aadhaar'>('login');

  // Login form state
  const [username, setUsername] = useState('priya.sharma');
  const [password, setPassword] = useState('HospitalPass@2026');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Aadhaar linking form state
  const [aadhaarInput, setAadhaarInput] = useState('5839 8812 8921');
  const [otpInput, setOtpInput] = useState('782190');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regFullName.trim() || !regUsername.trim()) return;
    register(regFullName, regUsername, regEmail, regPhone);
  };

  const handleSendAadhaarOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = aadhaarInput.replace(/\D/g, '');
    if (cleanNum.length === 12) {
      setOtpSent(true);
    }
  };

  const handleVerifyAadhaarOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    await linkAadhaar(aadhaarInput, otpInput);
    setIsVerifying(false);
    setIsAuthModalOpen(false);
  };

  const fillQuickDemoAccount = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262522]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#ffffff] rounded-3xl shadow-xl border border-[#e8e4db] w-full max-w-lg overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* Modal Top Header */}
        <div className="bg-[#4f6352] p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-[#e5efe3] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-[#dfdacd]" />
            <span>Secure Patient Portal & ABDM Gateway</span>
          </div>

          <h2 className="text-xl font-bold font-['Space_Grotesk'] text-white">
            {authMode === 'login' && 'Patient Sign In'}
            {authMode === 'register' && 'Create New Patient Account'}
            {authMode === 'aadhaar' && 'Aadhaar & ABHA Health ID Linking'}
          </h2>
          <p className="text-xs text-[#e5efe3]/90 mt-1">
            {authMode === 'login' && 'Access prescriptions, lab results, appointment bookings, and live doctor chats.'}
            {authMode === 'register' && 'Register in under 60 seconds to manage your medical history digitally.'}
            {authMode === 'aadhaar' && 'Connect your 12-digit Aadhaar for seamless Ayushman Bharat Digital Mission (ABDM) record linking.'}
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex bg-[#394a3c] p-1 rounded-xl mt-4 space-x-1 text-xs font-semibold">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                authMode === 'login' ? 'bg-white text-[#262522] shadow-xs' : 'text-[#d4e4d2] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer ${
                authMode === 'register' ? 'bg-white text-[#262522] shadow-xs' : 'text-[#d4e4d2] hover:text-white'
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setAuthMode('aadhaar')}
              className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                authMode === 'aadhaar' ? 'bg-[#dfdacd] text-[#262522] shadow-xs font-bold' : 'text-[#d4e4d2] hover:text-white'
              }`}
            >
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Aadhaar ID</span>
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6">
          {/* LOGIN VIEW */}
          {authMode === 'login' && (
            <div className="space-y-4">
              {/* Google Sign In Integration */}
              <div className="space-y-1.5">
                <GoogleAuthButton
                  variant="full"
                  text="Continue with Google Account"
                  onSuccess={() => setIsAuthModalOpen(false)}
                />
              </div>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-[#e8e4db]"></div>
                <span className="shrink mx-3 text-[10px] uppercase font-bold text-[#8a887e] tracking-wider">
                  Or Sign In with Username & Password
                </span>
                <div className="grow border-t border-[#e8e4db]"></div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1.5">
                    Username or Mobile Number
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8a887e] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. priya.sharma"
                      className="w-full bg-[#f9f7f2] border border-[#ded8cc] focus:border-[#4f6352] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#36352f] outline-hidden font-medium transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[#43423b] uppercase tracking-wider">
                      Password
                    </label>
                    <span className="text-[11px] text-[#4f6352] font-semibold hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8a887e] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your secure password"
                      className="w-full bg-[#f9f7f2] border border-[#ded8cc] focus:border-[#4f6352] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#36352f] outline-hidden font-medium transition-all"
                    />
                  </div>
                </div>

                {/* Quick Demo Pre-fill Pill */}
                <div className="p-3 bg-[#edf2ec] rounded-xl border border-[#d2ded0] text-xs">
                  <p className="font-bold text-[#364b39] mb-1 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#4f6352]" />
                    <span>Quick Test Patient Credentials:</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    <button
                      type="button"
                      onClick={() => fillQuickDemoAccount('priya.sharma', 'HospitalPass@2026')}
                      className="px-2.5 py-1 bg-white text-[#364b39] rounded-md border border-[#d2ded0] text-[11px] font-semibold hover:bg-[#e4ede3] transition-colors cursor-pointer"
                    >
                      👤 Priya Sharma (Cardio & EMR Active)
                    </button>
                    <button
                      type="button"
                      onClick={() => fillQuickDemoAccount('rahul.verma', 'Secret@2026')}
                      className="px-2.5 py-1 bg-white text-[#364b39] rounded-md border border-[#d2ded0] text-[11px] font-semibold hover:bg-[#e4ede3] transition-colors cursor-pointer"
                    >
                      👤 Rahul Verma (New Patient)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  id="submit_login_btn"
                  className="w-full bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Sign In to Health Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 border-t border-[#f0ece3] flex items-center justify-between text-xs text-[#79776e]">
                  <span>Want to link Aadhaar directly?</span>
                  <button
                    type="button"
                    onClick={() => setAuthMode('aadhaar')}
                    className="text-[#4f6352] font-bold hover:underline cursor-pointer"
                  >
                    Verify Aadhaar & ABHA →
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* REGISTER VIEW */}
          {authMode === 'register' && (
            <div className="space-y-3">
              {/* Google Sign Up */}
              <GoogleAuthButton
                variant="full"
                text="Sign up with Google (Fastest)"
                onSuccess={() => setIsAuthModalOpen(false)}
              />

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-[#e8e4db]"></div>
                <span className="shrink mx-3 text-[10px] uppercase font-bold text-[#8a887e] tracking-wider">
                  Or Register with Details
                </span>
                <div className="grow border-t border-[#e8e4db]"></div>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1">
                    Full Legal Name (as per ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3.5 py-2 text-xs text-[#36352f] outline-hidden font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="priyasharma"
                      className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3.5 py-2 text-xs text-[#36352f] outline-hidden font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1">
                      Mobile Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3.5 py-2 text-xs text-[#36352f] outline-hidden font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3.5 py-2 text-xs text-[#36352f] outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3.5 py-2 text-xs text-[#36352f] outline-hidden font-medium"
                  />
                </div>

                <button
                  type="submit"
                  id="submit_register_btn"
                  className="w-full bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs cursor-pointer mt-2"
                >
                  Create Account & Generate Patient UHID
                </button>
              </form>
            </div>
          )}

          {/* AADHAAR & ABHA LINKING VIEW */}
          {authMode === 'aadhaar' && (
            <div className="space-y-4">
              <div className="bg-[#edf2ec] border border-[#d2ded0] p-3.5 rounded-2xl flex items-start space-x-3 text-xs text-[#2d3d30]">
                <Fingerprint className="w-5 h-5 text-[#4f6352] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#364b39]">Ayushman Bharat Digital Mission (ABDM) Integration</div>
                  <div className="text-[#43423b] text-[11px] leading-relaxed mt-0.5">
                    Connecting your Aadhaar links your national 14-digit ABHA Health ID, permitting instantaneous sharing of verified EMR records across hospitals (Apollo, Fortis, Max, AIIMS, Indus).
                  </div>
                </div>
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendAadhaarOtp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1.5">
                      12-Digit Aadhaar Identification Number
                    </label>
                    <div className="relative">
                      <Fingerprint className="w-4 h-4 text-[#8a887e] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={aadhaarInput}
                        onChange={(e) => setAadhaarInput(e.target.value)}
                        placeholder="XXXX XXXX XXXX"
                        className="w-full bg-[#f9f7f2] border border-[#ded8cc] focus:border-[#4f6352] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#36352f] font-mono font-bold tracking-wider outline-hidden"
                      />
                    </div>
                    <p className="text-[10px] text-[#79776e] mt-1">
                      A 6-digit one-time verification password (OTP) will be dispatched to your UIDAI registered mobile number.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-[#6e6d65] bg-[#f9f7f2] p-2.5 rounded-xl border border-[#ded8cc]">
                    <CheckCircle2 className="w-4 h-4 text-[#4f6352] shrink-0" />
                    <span>256-Bit TLS Encryption • NHA & UIDAI Compliant</span>
                  </div>

                  <button
                    type="submit"
                    id="send_aadhaar_otp_btn"
                    className="w-full bg-[#4f6352] hover:bg-[#3f5042] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Request Aadhaar OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyAadhaarOtp} className="space-y-3">
                  <div className="p-3 bg-[#f9f7f2] border border-[#ded8cc] rounded-xl text-xs flex items-center justify-between">
                    <div>
                      <span className="text-[#79776e]">Aadhaar: </span>
                      <span className="font-mono font-bold text-[#36352f]">{aadhaarInput}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[#4f6352] font-bold text-[11px] hover:underline cursor-pointer"
                    >
                      Change Number
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1.5">
                      Enter 6-Digit UIDAI OTP
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-[#8a887e] absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        placeholder="782190"
                        className="w-full bg-[#f9f7f2] border border-[#ded8cc] focus:border-[#4f6352] focus:bg-white rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#36352f] font-mono font-bold tracking-widest outline-hidden"
                      />
                    </div>
                    <p className="text-[10px] text-[#79776e] mt-1">
                      Demo OTP pre-filled: <strong>782190</strong> (Valid for 10 minutes)
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifying}
                    id="verify_aadhaar_btn"
                    className="w-full bg-[#4f6352] hover:bg-[#3f5042] disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isVerifying ? (
                      <span>Verifying with UIDAI & ABDM...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify & Link Digital Health ID</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
