import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { Cookie, Settings, Check, X, Shield, BarChart2, Heart } from 'lucide-react';

interface CookieConsentProps {
  lang: Language;
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ lang, onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Granular settings states
  const [prefCookies, setPrefCookies] = useState(true);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);

  useEffect(() => {
    // Show banner after a premium delay
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Set initial settings from localStorage if available
  useEffect(() => {
    const savedPref = localStorage.getItem('pbp_cookie_pref_settings');
    const savedAnalytic = localStorage.getItem('pbp_cookie_pref_analytics');
    if (savedPref !== null) setPrefCookies(savedPref === 'true');
    if (savedAnalytic !== null) setAnalyticsCookies(savedAnalytic === 'true');
  }, []);

  const t = {
    EN: {
      title: "Cookie Privacy Settings",
      desc: "Our portal uses functional cookies to optimize user experience and track agency service proposals.",
      essentialTitle: "Essential cookies",
      essentialDesc: "Required for the website's basic functionality, such as keeping you logged in, maintaining session state, and remembering your language or theme settings.",
      prefTitle: "Preference cookies",
      prefDesc: "Allows the website to remember choices you make (such as service category filtering) to provide a richer experience.",
      analysisTitle: "Analytical & Performance cookies",
      analysisDesc: "Helps us understand visitor behavior and tracking speed anonymously so we can optimize server performance.",
      alwaysActive: "Always Active",
      acceptAll: "Accept All",
      declineAll: "Reject Non-Essential",
      manage: "Configure Settings",
      saveSelected: "Save Selection",
      back: "Back",
      buttonManage: "Cookie Settings",
    },
    ID: {
      title: "Pengaturan Privasi Cookie",
      desc: "Portal kami menggunakan cookie fungsional untuk mengoptimalkan pengalaman pengguna dan melacak pengajuan keagenan.",
      essentialTitle: "Cookie fungsional & wajib",
      essentialDesc: "Diperlukan untuk fungsionalitas dasar situs web, seperti menyimpan bahasa pilihan Anda, mode warna, dan status sesi secara aman.",
      prefTitle: "Cookie preferensi",
      prefDesc: "Memgunakan situs mengingat pilihan yang Anda buat (seperti kategori layanan keagenan) untuk memberikan pengalaman yang lebih personal.",
      analysisTitle: "Cookie analitik & kinerja",
      analysisDesc: "Membantu kami memahami perilaku pengunjung secara anonim agar kami dapat mengoptimalkan kecepatan respons server.",
      alwaysActive: "Selalu Aktif",
      acceptAll: "Setujui Semua",
      declineAll: "Tolak Non-Esensial",
      manage: "Pengaturan Lanjutan",
      saveSelected: "Simpan Pilihan",
      back: "Kembali",
      buttonManage: "Atur Cookie",
    }
  }[lang] || {
    title: "Pengaturan Privasi Cookie",
    desc: "Portal kami menggunakan cookie fungsional untuk mengoptimalkan pengalaman pengguna dan melacak pengajuan keagenan.",
    essentialTitle: "Cookie fungsional & wajib",
    essentialDesc: "Diperlukan untuk fungsionalitas dasar situs web, seperti menyimpan bahasa pilihan Anda, mode warna, dan status sesi secara aman.",
    prefTitle: "Cookie preferensi",
    prefDesc: "Memungkinkan situs mengingat pilihan yang Anda buat (seperti kategori layanan keagenan) untuk memberikan pengalaman yang lebih personal.",
    analysisTitle: "Cookie analitik & kinerja",
    analysisDesc: "Membantu kami memahami perilaku pengunjung secara anonim agar kami dapat mengoptimalkan kecepatan respons server.",
    alwaysActive: "Selalu Aktif",
    acceptAll: "Setujui Semua",
    declineAll: "Tolak Non-Esensial",
    manage: "Pengaturan Lanjutan",
    saveSelected: "Simpan Pilihan",
    back: "Kembali",
    buttonManage: "Atur Cookie",
  };

  const handleSavePreferences = () => {
    localStorage.setItem('pbp_cookie_pref_functional', 'true');
    localStorage.setItem('pbp_cookie_pref_settings', prefCookies ? 'true' : 'false');
    localStorage.setItem('pbp_cookie_pref_analytics', analyticsCookies ? 'true' : 'false');
    onAccept();
  };

  const handleAcceptAll = () => {
    localStorage.setItem('pbp_cookie_pref_functional', 'true');
    localStorage.setItem('pbp_cookie_pref_settings', 'true');
    localStorage.setItem('pbp_cookie_pref_analytics', 'true');
    onAccept();
  };

  const handleDeclineAll = () => {
    localStorage.setItem('pbp_cookie_pref_functional', 'true');
    localStorage.setItem('pbp_cookie_pref_settings', 'false');
    localStorage.setItem('pbp_cookie_pref_analytics', 'false');
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[32rem] z-[100]"
        id="cookie-consent-container"
      >
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 p-6 rounded-[2rem] shadow-2xl flex flex-col gap-5 text-zinc-950 dark:text-zinc-50 relative overflow-hidden">
          
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 dark:bg-brand-500/5 rounded-full filter blur-3xl pointer-events-none" />

          {/* Banner Main Mode */}
          {!showPreferences ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 rounded-2xl shrink-0 shadow-inner">
                  <Cookie size={24} className="animate-spin-slow" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold font-sans tracking-tight mb-1">
                    {t.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                    {t.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 justify-between items-stretch sm:items-center">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-open-cookie-settings"
                >
                  <Settings size={14} />
                  {t.buttonManage}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleDeclineAll}
                    className="px-4 py-2 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/55 rounded-xl transition-all cursor-pointer"
                    id="btn-decline-all-cookies"
                  >
                    {t.declineAll}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transition-all cursor-pointer"
                    id="btn-accept-all-cookies"
                  >
                    {t.acceptAll}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Settings Mode */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-brand-500" />
                  <h4 className="text-sm font-bold tracking-tight">
                    {t.manage}
                  </h4>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-850 dark:hover:text-white rounded-full transition-all cursor-pointer"
                  id="btn-close-cookie-preferences"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Preferences List Container */}
              <div className="flex flex-col gap-3 max-h-[14rem] overflow-y-auto pr-1">
                
                {/* Essential Cookies */}
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 flex items-start gap-3">
                  <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg mt-0.5">
                    <Shield size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-850 dark:text-zinc-100">
                        {t.essentialTitle}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full text-emerald-600 dark:text-emerald-400 uppercase">
                        {t.alwaysActive}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mt-1">
                      {t.essentialDesc}
                    </p>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 flex items-start gap-3">
                  <div className="p-1.5 bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 rounded-lg mt-0.5">
                    <Heart size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-850 dark:text-zinc-100">
                        {t.prefTitle}
                      </span>
                      {/* Premium Toggle Switch */}
                      <button
                        onClick={() => setPrefCookies(!prefCookies)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${prefCookies ? 'bg-brand-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                        id="toggle-pref-cookies"
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${prefCookies ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mt-1">
                      {t.prefDesc}
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 flex items-start gap-3">
                  <div className="p-1.5 bg-sky-50 dark:bg-sky-950/30 text-sky-600 dark:text-sky-400 rounded-lg mt-0.5">
                    <BarChart2 size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-zinc-850 dark:text-zinc-100">
                        {t.analysisTitle}
                      </span>
                      {/* Premium Toggle Switch */}
                      <button
                        onClick={() => setAnalyticsCookies(!analyticsCookies)}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${analyticsCookies ? 'bg-brand-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                        id="toggle-analytics-cookies"
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${analyticsCookies ? 'translate-x-4' : 'translate-x-0'}`} />
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light leading-relaxed mt-1">
                      {t.analysisDesc}
                    </p>
                  </div>
                </div>

              </div>

              {/* Action Buttons in settings view */}
              <div className="flex justify-between items-center mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800/85">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-all cursor-pointer"
                  id="btn-back-to-consent"
                >
                  {t.back}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-500/10 hover:shadow-brand-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                  id="btn-confirm-selected-preferences"
                >
                  <Check size={14} />
                  {t.saveSelected}
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;
