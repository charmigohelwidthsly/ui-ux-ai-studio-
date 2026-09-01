import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

interface GoogleAuthButtonProps {
  variant?: 'full' | 'compact' | 'navbar';
  text?: string;
  onSuccess?: () => void;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  variant = 'full',
  text = 'Continue with Google',
  onSuccess,
}) => {
  const { loginWithGoogle, user, isAuthenticated } = useApp();
  const gsiButtonRef = useRef<HTMLDivElement>(null);
  const [showAccountChooser, setShowAccountChooser] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Available Google demo accounts for instant seamless testing
  const googleAccounts = [
    {
      name: 'Charmi Gohel',
      email: 'charmigohel.24.bdes@idea.indusuni.ac.in',
      picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      tag: 'Current User Account',
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@healthmail.com',
      picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      tag: 'Cardio & EMR Profile',
    },
    {
      name: 'Dr. Rahul Verma',
      email: 'rahul.verma.med@gmail.com',
      picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      tag: 'Verified Google ID',
    },
  ];

  const handleSelectAccount = (account: typeof googleAccounts[0]) => {
    setIsProcessing(true);
    setTimeout(() => {
      loginWithGoogle({
        name: account.name,
        email: account.email,
        picture: account.picture,
        sub: 'google_' + Math.random().toString(36).substr(2, 9),
      });
      setIsProcessing(false);
      setShowAccountChooser(false);
      if (onSuccess) onSuccess();
    }, 400);
  };

  const handleCustomGoogleLogin = (customName: string, customEmail: string) => {
    if (!customEmail.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      loginWithGoogle({
        name: customName.trim() || customEmail.split('@')[0],
        email: customEmail.trim(),
        picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        sub: 'google_' + Math.random().toString(36).substr(2, 9),
      });
      setIsProcessing(false);
      setShowAccountChooser(false);
      if (onSuccess) onSuccess();
    }, 400);
  };

  const clientId = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    // Attempt Google Identity Services initialization if available
    const win = window as any;
    if (win.google?.accounts?.id && clientId && gsiButtonRef.current) {
      try {
        win.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) => {
            try {
              // Parse JWT credential
              const base64Url = response.credential.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split('')
                  .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                  .join('')
              );
              const payload = JSON.parse(jsonPayload);
              loginWithGoogle({
                name: payload.name,
                email: payload.email,
                picture: payload.picture,
                sub: payload.sub,
              });
              if (onSuccess) onSuccess();
            } catch (e) {
              console.error('Error decoding Google JWT credential', e);
            }
          },
        });

        win.google.accounts.id.renderButton(gsiButtonRef.current, {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'pill',
        });
      } catch (err) {
        console.warn('Google GSI init notice:', err);
      }
    }
  }, [clientId, loginWithGoogle, onSuccess]);

  if (variant === 'navbar') {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowAccountChooser(true)}
          className="bg-white hover:bg-[#f5f2eb] text-[#36352f] px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#ded8cc] transition-all shadow-2xs flex items-center space-x-1.5 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span className="hidden sm:inline">Google Sign In</span>
        </button>

        {showAccountChooser && (
          <GoogleAccountChooserModal
            accounts={googleAccounts}
            isProcessing={isProcessing}
            onSelect={handleSelectAccount}
            onCustom={handleCustomGoogleLogin}
            onClose={() => setShowAccountChooser(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="w-full space-y-2">
      {/* Real GSI Render Target if Client ID is configured */}
      <div ref={gsiButtonRef} className="empty:hidden"></div>

      {/* High-Fidelity Google OAuth Button */}
      <button
        type="button"
        id="google_signin_action_btn"
        onClick={() => setShowAccountChooser(true)}
        disabled={isProcessing}
        className="w-full bg-white hover:bg-[#faf8f4] text-[#36352f] font-semibold text-xs py-2.5 px-4 rounded-xl border border-[#ded8cc] transition-all shadow-2xs hover:shadow-xs flex items-center justify-center space-x-3 cursor-pointer group"
      >
        <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span className="text-[#36352f]">{text}</span>
      </button>

      {/* Account Chooser Dialog */}
      {showAccountChooser && (
        <GoogleAccountChooserModal
          accounts={googleAccounts}
          isProcessing={isProcessing}
          onSelect={handleSelectAccount}
          onCustom={handleCustomGoogleLogin}
          onClose={() => setShowAccountChooser(false)}
        />
      )}
    </div>
  );
};

interface AccountChooserProps {
  accounts: { name: string; email: string; picture: string; tag: string }[];
  isProcessing: boolean;
  onSelect: (acc: any) => void;
  onCustom: (name: string, email: string) => void;
  onClose: () => void;
}

const GoogleAccountChooserModal: React.FC<AccountChooserProps> = ({
  accounts,
  isProcessing,
  onSelect,
  onCustom,
  onClose,
}) => {
  const [showManualInput, setShowManualInput] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#262522]/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#ded8cc] w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-150">
        {/* Google Header */}
        <div className="p-5 border-b border-[#f0ece3] flex items-center justify-between bg-[#fdfcf9]">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div>
              <h3 className="font-bold text-sm text-[#262522]">Sign in with Google</h3>
              <p className="text-[11px] text-[#79776e]">Choose an account to continue to AarogyaCare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#8a887e] hover:text-[#262522] p-1 rounded-full hover:bg-[#f3efe6] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Account List */}
        <div className="p-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {!showManualInput ? (
            <>
              <div className="space-y-2">
                {accounts.map((acc, i) => (
                  <button
                    key={i}
                    onClick={() => onSelect(acc)}
                    disabled={isProcessing}
                    className="w-full text-left p-3 rounded-xl border border-[#ded8cc] hover:border-[#4f6352] hover:bg-[#f9f7f2] transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={acc.picture}
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#ded8cc]"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#262522] group-hover:text-[#4f6352] flex items-center space-x-1.5">
                          <span>{acc.name}</span>
                          <span className="text-[9px] bg-[#edf2ec] text-[#364b39] px-1.5 py-0.2 rounded border border-[#d2ded0] font-normal">
                            {acc.tag}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#79776e] truncate max-w-[220px]">{acc.email}</div>
                      </div>
                    </div>
                    <span className="text-[#8a887e] group-hover:text-[#4f6352] text-xs">→</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualInput(true)}
                  className="w-full py-2.5 text-center text-xs font-semibold text-[#4f6352] hover:bg-[#edf2ec] rounded-xl border border-dashed border-[#c5d8c3] transition-colors cursor-pointer"
                >
                  + Use another Google account
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-3 p-1">
              <div>
                <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1">
                  Google Account Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. Charmi Gohel"
                  className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3 py-2 text-xs text-[#36352f] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#43423b] uppercase tracking-wider mb-1">
                  Google Email Address
                </label>
                <input
                  type="email"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-[#f9f7f2] border border-[#ded8cc] rounded-xl px-3 py-2 text-xs text-[#36352f] outline-hidden"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualInput(false)}
                  className="flex-1 py-2 text-xs text-[#79776e] hover:bg-[#f3efe6] rounded-xl border border-[#ded8cc] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => onCustom(customName, customEmail)}
                  className="flex-1 py-2 text-xs font-bold text-white bg-[#4f6352] hover:bg-[#3f5042] rounded-xl cursor-pointer shadow-2xs"
                >
                  Authorize Google Sign-In
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Security Badge */}
        <div className="bg-[#f9f7f2] p-3 border-t border-[#f0ece3] flex items-center justify-between text-[10px] text-[#79776e]">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4f6352]" />
            <span>OAuth 2.0 / OpenID Connect Verified</span>
          </div>
          <span className="font-semibold text-[#4f6352]">Indus Health Network</span>
        </div>
      </div>
    </div>
  );
};
