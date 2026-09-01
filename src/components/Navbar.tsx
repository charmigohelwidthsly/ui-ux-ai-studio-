import React, { useState } from 'react';
import { useApp, NavigationTab } from '../context/AppContext';
import {
  HeartPulse,
  Calendar,
  FileText,
  MessageSquare,
  MapPin,
  Building2,
  HelpCircle,
  ShieldCheck,
  PhoneCall,
  User,
  LogOut,
  ChevronDown,
  Bell,
  Sparkles,
  QrCode,
  Activity,
  Menu,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    user,
    isAuthenticated,
    logout,
    activeTab,
    setActiveTab,
    aadhaarInfo,
    setIsAuthModalOpen,
    setIsAadhaarLockerOpen,
    setIsSosModalOpen,
    currentLocationName,
    setCurrentLocationName,
    chatMessages,
  } = useApp();

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const locationsList = [
    'Ahmedabad (SG Highway / Bodakdev)',
    'Mumbai (Bandra / Andheri West)',
    'Delhi NCR (South Ext / Saket)',
    'Bengaluru (Indiranagar / Koramangala)',
    'Pune (Kothrud / Baner)',
    'Chennai (Anna Nagar / T. Nagar)',
  ];

  const navItems: { id: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'appointments', label: 'Book Appointment', icon: Calendar },
    { id: 'emr', label: 'Medical Records (EMR)', icon: FileText },
    { id: 'chat', label: 'Doctor Chat', icon: MessageSquare },
    { id: 'nearby', label: 'Nearby Chemist & Labs', icon: MapPin },
    { id: 'hospitals', label: 'Recent Visits', icon: Building2 },
    { id: 'doctor_guide', label: 'Specialty Guide', icon: HelpCircle },
  ];

  // Calculate unread chat messages
  const totalChatMessages = Object.values(chatMessages).flat().length;

  return (
    <header id="main_navbar" className="sticky top-0 z-40 bg-[#fdfcf9]/95 backdrop-blur-md border-b border-[#e8e4db] shadow-xs">
      {/* Top emergency announcement bar */}
      <div className="bg-[#2a2925] text-[#dfdacd] text-xs px-4 py-1.5 flex items-center justify-between border-b border-[#3a3934]">
        <div className="flex items-center space-x-3 overflow-hidden">
          <span className="flex items-center text-[#8da08b] font-semibold uppercase tracking-wider text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#8da08b] animate-pulse mr-1.5"></span>
            AarogyaCare ABDM Network
          </span>
          <span className="hidden sm:inline text-[#66645d]">|</span>
          <span className="truncate text-[#cac6bc]">
            24x7 Emergency Trauma & Ambulance Helpline: <strong className="text-white">+91 1800-200-8800</strong>
          </span>
        </div>
        <div className="flex items-center space-x-4 shrink-0">
          <button
            id="emergency_sos_btn"
            onClick={() => setIsSosModalOpen(true)}
            className="bg-[#a05643] hover:bg-[#8c4937] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center space-x-1.5 transition-all shadow-xs animate-pulse cursor-pointer"
          >
            <PhoneCall className="w-3 h-3" />
            <span>EMERGENCY SOS</span>
          </button>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f6352] to-[#3a4c3c] flex items-center justify-center text-white shadow-md shadow-[#4f6352]/20">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-[#36352f] font-['Space_Grotesk']">
                  Aarogya<span className="text-[#4f6352]">Care</span>
                </span>
                <span className="bg-[#edf2ec] text-[#425445] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#d2ded0]">
                  HOSPITAL EMR
                </span>
              </div>
              <p className="text-[11px] text-[#79776e] font-medium leading-none">Indus & Multi-Specialty Health Network</p>
            </div>
          </div>

          {/* Location Selector */}
          <div className="hidden lg:flex items-center relative">
            <button
              id="location_selector_btn"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#43423b] bg-[#f3efe6] hover:bg-[#eae5da] border border-[#e2ddd1] transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#4f6352] shrink-0" />
              <span className="max-w-[200px] truncate">{currentLocationName}</span>
              <ChevronDown className="w-3 h-3 text-[#79776e]" />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#ffffff] rounded-xl shadow-xl border border-[#e8e4db] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 text-[11px] font-bold text-[#8a887e] uppercase tracking-wider">
                  Select Location for Pharmacies & Labs
                </div>
                <div className="space-y-1">
                  {locationsList.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => {
                        setCurrentLocationName(loc);
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        currentLocationName === loc
                          ? 'bg-[#edf2ec] text-[#364b39] font-semibold'
                          : 'text-[#43423b] hover:bg-[#f5f1e8]'
                      }`}
                    >
                      <span className="truncate">{loc}</span>
                      {currentLocationName === loc && <span className="w-1.5 h-1.5 rounded-full bg-[#4f6352]"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons & Aadhaar Status */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Aadhaar Verified Badge / Button */}
            <button
              id="aadhaar_health_card_btn"
              onClick={() => setIsAadhaarLockerOpen(true)}
              className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer shadow-xs ${
                aadhaarInfo.isLinked
                  ? 'bg-[#edf2ec] text-[#364b39] border-[#c5d8c3] hover:bg-[#e4ede3]'
                  : 'bg-[#fbf4eb] text-[#865d2c] border-[#ecdcc2] hover:bg-[#f5ebd9]'
              }`}
              title="Aadhaar ABHA Health Locker"
            >
              <ShieldCheck className={`w-4 h-4 ${aadhaarInfo.isLinked ? 'text-[#4a634e]' : 'text-[#a66a2e]'}`} />
              <div className="text-left leading-tight hidden sm:block">
                <div className="text-[10px] uppercase font-bold text-[#79776e]">
                  {aadhaarInfo.isLinked ? 'Aadhaar ABHA ID' : 'Digital Health ID'}
                </div>
                <div className="text-xs font-bold font-mono">
                  {aadhaarInfo.isLinked ? aadhaarInfo.aadhaarNumberMasked : 'Link Aadhaar ID'}
                </div>
              </div>
              <QrCode className="w-3.5 h-3.5 text-[#8a887e] ml-0.5" />
            </button>

            {/* User Profile / Auth Button */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  id="user_menu_btn"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-[#f5f1e8] transition-colors border border-[#e8e4db] cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-lg object-cover border border-[#8da08b]/50"
                  />
                  <div className="text-left hidden md:block pr-1">
                    <div className="text-xs font-bold text-[#36352f] leading-tight truncate max-w-[110px]">
                      {user.fullName}
                    </div>
                    <div className="text-[10px] text-[#4f6352] font-semibold">UHID: {user.patientId}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#79776e]" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#ffffff] rounded-2xl shadow-xl border border-[#e8e4db] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2 border-b border-[#f0ece3] mb-1">
                      <p className="text-xs font-bold text-[#36352f]">{user.fullName}</p>
                      <p className="text-[11px] text-[#79776e]">{user.email}</p>
                      <div className="mt-1 flex items-center space-x-1.5 text-[10px] font-mono text-[#364b39] bg-[#edf2ec] px-2 py-0.5 rounded border border-[#d2ded0]">
                        <ShieldCheck className="w-3 h-3 text-[#4f6352]" />
                        <span>ABHA: {aadhaarInfo.abhaId}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsAadhaarLockerOpen(true);
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#43423b] hover:bg-[#edf2ec] hover:text-[#364b39] rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#4f6352]" />
                      <span>View ABHA Health Card & QR</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('emr');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#43423b] hover:bg-[#edf2ec] hover:text-[#364b39] rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#4f6352]" />
                      <span>Electronic Medical Records (EMR)</span>
                    </button>

                    <div className="border-t border-[#f0ece3] my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#a05643] hover:bg-[#fbf0eb] rounded-lg flex items-center space-x-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 text-[#a05643]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="login_trigger_btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-[#4f6352] hover:bg-[#3f5042] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center space-x-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In / Aadhaar</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#6e6d65] hover:bg-[#f3efe6] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Secondary Navigation Bar */}
      <div className="hidden lg:block bg-[#f5f2eb] border-t border-[#e8e4db] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 py-1.5 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav_tab_${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4f6352] text-white shadow-xs'
                    : 'text-[#6e6d65] hover:text-[#36352f] hover:bg-[#eae5da]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#79776e]'}`} />
                <span>{item.label}</span>
                {item.id === 'chat' && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-[#edf2ec] text-[#364b39]'}`}>
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff] border-t border-[#e8e4db] px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <div className="py-2 border-b border-[#f0ece3] mb-2">
            <p className="text-[11px] font-bold text-[#8a887e] uppercase tracking-wider mb-1">Location</p>
            <select
              value={currentLocationName}
              onChange={(e) => setCurrentLocationName(e.target.value)}
              className="w-full bg-[#f9f7f2] border border-[#e2ddd1] rounded-lg p-2 text-xs font-medium text-[#36352f]"
            >
              {locationsList.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-[#4f6352] text-white'
                      : 'text-[#43423b] hover:bg-[#f5f1e8]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'chat' && (
                    <span className="bg-[#edf2ec] text-[#364b39] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Direct
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
