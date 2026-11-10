
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Globe, Moon, Sun, ArrowRight, ArrowUpRight,
  ShieldCheck, Activity, Check, Anchor, Waves, User, MessageCircle,
  FileCheck, Package, Fuel, Users, Boxes, Mail, Copy, CheckCheck, CheckCircle2
} from 'lucide-react';
import { TRANSLATIONS, PRODUCTS, LANG_CONFIG } from './constants';
import { Language, Theme } from './types';
import AboutPage from './components/AboutPage';
import WhyUsPage from './components/WhyUsPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import ProductDetailPage from './components/ProductDetailPage';
import CatalogPage from './components/CatalogPage';
import CookieConsent from './components/CookieConsent';
import ScrollRevealText from './components/ScrollRevealText';
import OceanWaves from './components/OceanWaves';
import { BrandLogo } from './components/BrandLogo';
import { AIChatBot } from './components/AIChatBot';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ViewState = 'home' | 'about' | 'why-us' | 'privacy' | 'terms' | 'product-detail' | 'catalog';

function App() {
  // Initialize state from localStorage if available
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('pbp_lang') as Language) || 'ID';
  });
  
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('pbp_theme') as Theme) || 'light';
  });

  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(() => {
    return localStorage.getItem('pbp_cookie_consent') as 'accepted' | 'declined' | null;
  });

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // Store the INDEX of the active product to maintain selection across language changes
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(0);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  
  const [scrolled, setScrolled] = useState(false);
  const [view, setView] = useState<ViewState>('home');
  const [worldTimes, setWorldTimes] = useState({ wita: '', wit: '', wib: '' });
  const langMenuRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State for inquiry form confirmation and copy feedback
  const [formSubmittedData, setFormSubmittedData] = useState<{
    whatsappUrl: string;
    mailtoUrl: string;
    summary: string;
    name: string;
    service: string;
  } | null>(null);
  const [copiedInquiry, setCopiedInquiry] = useState(false);

  // Prevent background scroll leak when modals or navigation drawer are open
  useEffect(() => {
    if (isNavOpen || isClientModalOpen || isLangMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen, isClientModalOpen, isLangMenuOpen]);

  // Sync state with location hash for browser/phone back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '') as ViewState;
      const validViews: ViewState[] = ['home', 'about', 'why-us', 'privacy', 'terms', 'product-detail', 'catalog'];
      if (validViews.includes(hash)) {
        setView(hash);
      } else {
        setView('home');
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Update hash when view state changes
  useEffect(() => {
    const currentHash = window.location.hash.replace('#/', '');
    if (currentHash !== view) {
      window.location.hash = `#/${view}`;
    }
  }, [view]);

  const t = TRANSLATIONS[lang];
  const products = PRODUCTS[lang];
  const activeProduct = products[activeProductIndex];

  // Persist Language Choice
  useEffect(() => {
    if (cookieConsent === 'accepted') {
      localStorage.setItem('pbp_lang', lang);
    }
  }, [lang, cookieConsent]);

  // Persist Theme Choice
  useEffect(() => {
    if (cookieConsent === 'accepted') {
      localStorage.setItem('pbp_theme', theme);
    }
    
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme, cookieConsent]);

  // Language direction logic (Standard LTR for EN/ID)
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // World Time Updater
  useEffect(() => {
    const updateTime = () => {
      const getCityTime = (zone: string) => new Date().toLocaleTimeString('en-US', { 
        timeZone: zone, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      });

      setWorldTimes({
        wita: getCityTime('Asia/Makassar'), // WITA Kendari
        wit: getCityTime('Asia/Jayapura'),  // WIT Maluku
        wib: getCityTime('Asia/Jakarta')   // WIB Jakarta
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second for blinking effect preference
    return () => clearInterval(interval);
  }, []);

  // Close lang menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        // Only close desktop menu here, mobile has its own overlay
        if (window.innerWidth >= 768) {
           setIsLangMenuOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsNavOpen(false); // Ensure nav closes on view change
  }, [view]);

  // GSAP ScrollTrigger for Stacked Cards in Products section
  useEffect(() => {
    if (view !== 'home') return;

    // Filter null values from our refs
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
    if (cards.length === 0) return;

    // Reset styles on recalculation
    gsap.killTweensOf(cards);
    
    // We register the context for cleanup
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        // Set starting properties
        gsap.set(card, { 
          transformOrigin: "top center",
          scale: 1,
          opacity: 1,
          y: 0,
          yPercent: 0
        });

        // Skip animating the very last card since nothing covers it
        if (index === cards.length - 1) return;

        const nextCard = cards[index + 1];
        if (!nextCard) return;

        // Animate card when next card comes into view and overlays it
        gsap.to(card, {
          scale: 0.98, // extremely subtle premium depth
          opacity: 0, // fades out completely under the overlaying card for 100% clean stack
          yPercent: -2, // elegant subtle upward lift
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: () => {
              const currentCardHeight = card.offsetHeight;
              return `top top+=${currentCardHeight + 110}px`;
            },
            end: "top top+=110px",   // finishes precisely as next card docks into place at 110px
            scrub: 1.2,              // golden inertia-based smooth scrubbing
            invalidateOnRefresh: true,
          }
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [view, products]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleCookieAccept = () => {
    setCookieConsent('accepted');
    localStorage.setItem('pbp_cookie_consent', 'accepted');
    // Immediately save current preferences upon acceptance
    localStorage.setItem('pbp_lang', lang);
    localStorage.setItem('pbp_theme', theme);
  };

  const handleCookieDecline = () => {
    setCookieConsent('declined');
    localStorage.setItem('pbp_cookie_consent', 'declined');
    // Clear existing preferences if declined
    localStorage.removeItem('pbp_lang');
    localStorage.removeItem('pbp_theme');
  };

  // Safe Navigation Handler
  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault(); // This stops the browser from trying to navigate to the #hash URL
    setView('home');
    setIsNavOpen(false);
    
    // Small timeout ensures the DOM is ready (switched to 'home') before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleProductClick = (index: number) => {
    setActiveProductIndex(index);
    setView('product-detail');
  };

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = (formData.get('name') as string)?.trim() || '';
    const origin = (formData.get('origin') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const product = (formData.get('product') as string)?.trim() || '';

    // Create bilingual formatted message
    const isId = lang === 'ID';
    const text = isId 
      ? `Halo PT Perintis Bermuda Perkasa,\n\nSaya ingin mengajukan permohonan layanan kepelabuhanan & keagenan kapal:\n\n` +
        `• Nama Instansi / Perusahaan: ${name}\n` +
        `• Pelabuhan / Rute Operasional: ${origin}\n` +
        `• Kontak / WhatsApp: ${phone}\n` +
        `• Email Perusahaan: ${email}\n` +
        `• Layanan / Armada yang Diminati: ${product}\n\n` +
        `Mohon informasi ketersediaan jadwal serta estimasi biaya layanan. Terima kasih.`
      : `Dear PT Perintis Bermuda Perkasa,\n\nI would like to submit an inquiry for maritime shipping services:\n\n` +
        `• Organization / Company: ${name}\n` +
        `• Port / Operational Route: ${origin}\n` +
        `• Phone / WhatsApp: ${phone}\n` +
        `• Business Email: ${email}\n` +
        `• Service / Fleet Required: ${product}\n\n` +
        `Please provide availability and proforma disbursement estimation. Thank you.`;
                  
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/6281775030638?text=${encodedText}`;
    const subject = encodeURIComponent(isId ? `Permohonan Layanan Maritim - ${name}` : `Maritime Service Inquiry - ${name}`);
    const mailtoUrl = `mailto:sales@perintisbermudaperkasa.com?subject=${subject}&body=${encodedText}`;
    
    setFormSubmittedData({
      whatsappUrl,
      mailtoUrl,
      summary: text,
      name,
      service: product
    });

    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      // Browser popup blocked; user has direct clickable button in confirmation screen
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-700 font-sans selection:bg-brand-500 selection:text-white ${isDark ? 'bg-brand-950 text-white' : 'bg-brand-50 text-zinc-900'} overflow-x-clip`}>
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-noise opacity-[0.06] mix-blend-overlay"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6 md:py-8'}`}>
        <div className={`w-[92%] md:max-w-[90rem] mx-auto transition-all duration-500 rounded-3xl px-4 md:px-6 py-3 flex justify-between items-center ${scrolled ? 'bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5' : 'bg-transparent'}`}>
          {/* Brand */}
          <button onClick={() => setView('home')} className="flex items-center group transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none" aria-label="Home">
             <BrandLogo size="md" variant="horizontal" lightModeForce={!scrolled} />
          </button>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-1 p-1 rounded-2xl ${scrolled ? '' : 'bg-white/10 border border-white/10'}`}>
             {[
               { id: 'home', label: t.nav.home, action: () => setView('home') },
               { id: 'about', label: t.nav.about, action: () => setView('about') },
               { id: 'why-us', label: t.nav.whyChooseUs, action: () => setView('why-us') },
             ].map(link => (
               <button 
                 key={link.id}
                 onClick={link.action} 
                 className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                   view === link.id 
                     ? scrolled 
                       ? 'bg-white dark:bg-zinc-800 shadow-sm text-brand-600 dark:text-brand-400' 
                       : 'bg-white/20 text-white'
                     : scrolled 
                       ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400' 
                       : 'hover:bg-white/10 text-zinc-200 hover:text-white'
                 }`}
               >
                 {link.label}
               </button>
             ))}
             <a 
               href="#products" 
               onClick={(e) => handleScrollTo(e, 'products')} 
               className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                 scrolled 
                   ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400' 
                   : 'hover:bg-white/10 text-zinc-200 hover:text-white'
               }`}
             >
               {t.nav.products}
             </a>
             <a 
               href="#services" 
               onClick={(e) => handleScrollTo(e, 'services')} 
               className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                 scrolled 
                   ? 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-400' 
                   : 'hover:bg-white/10 text-zinc-200 hover:text-white'
               }`}
             >
               {t.nav.services}
             </a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
             <button onClick={toggleTheme} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
             </button>

             <button onClick={() => setCookieConsent(null)} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-zinc-800 transition-colors" title={t.footer.cookies}>
                <ShieldCheck size={18} />
             </button>
             
             {/* Language Dropdown */}
             <div className="relative" ref={langMenuRef}>
               <button 
                 onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                 className={`w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-zinc-800 transition-colors ${isLangMenuOpen ? 'ring-2 ring-brand-500/20' : ''}`}
                 title={t.nav.selectLanguage}
               >
                  <Globe size={18} />
               </button>

               {isLangMenuOpen && (
                 <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-3 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-up z-50">
                   <div className="p-2 flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                     {(Object.keys(LANG_CONFIG) as Language[]).map((langKey) => (
                       <button
                         key={langKey}
                         onClick={() => { setLang(langKey); setIsLangMenuOpen(false); }}
                         className={`flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors ${
                           lang === langKey 
                             ? 'bg-brand-50 dark:bg-brand-900/20 font-bold text-brand-600 dark:text-brand-400' 
                             : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <span className="text-lg">{LANG_CONFIG[langKey].flag}</span>
                           <span>{LANG_CONFIG[langKey].label}</span>
                         </div>
                         {lang === langKey && <Check size={14} className="text-brand-500" />}
                       </button>
                     ))}
                   </div>
                 </div>
               )}
             </div>
             
             {/* New Client Button */}
             <button 
               onClick={() => setIsClientModalOpen(true)}
               className="group relative px-6 py-2.5 bg-brand-950 dark:bg-brand-500 text-white dark:text-brand-950 rounded-full text-sm font-bold overflow-hidden transition-all hover:pr-8"
             >
                <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors"></div>
                <span className="relative flex items-center gap-2">
                   {t.nav.client} <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all absolute right-0" />
                </span>
             </button>
          </div>

           {/* Mobile Toggle */}
           <div className="md:hidden flex items-center gap-2">
             <button 
                onClick={() => { setIsLangMenuOpen(!isLangMenuOpen); setIsNavOpen(false); }} 
                className={`p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/20 ${isLangMenuOpen ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
             >
               <Globe size={20} />
             </button>
             <button 
                onClick={() => { setIsNavOpen(!isNavOpen); setIsLangMenuOpen(false); }}
                className="p-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
             >
               {isNavOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
           </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isNavOpen && (
        <div className="fixed inset-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl pt-32 px-6 overflow-y-auto pb-10 animate-fade-up">
           <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 text-3xl font-light font-fun">
                 <button onClick={() => { setView('home'); setIsNavOpen(false); }} className={`text-left py-2 border-b border-zinc-100 dark:border-zinc-800 ${view === 'home' ? 'font-bold text-brand-500' : ''}`}>{t.nav.home}</button>
                 <button onClick={() => { setView('about'); setIsNavOpen(false); }} className={`text-left py-2 border-b border-zinc-100 dark:border-zinc-800 ${view === 'about' ? 'font-bold text-brand-500' : ''}`}>{t.nav.about}</button>
                 <button onClick={() => { setView('why-us'); setIsNavOpen(false); }} className={`text-left py-2 border-b border-zinc-100 dark:border-zinc-800 ${view === 'why-us' ? 'font-bold text-brand-500' : ''}`}>{t.nav.whyChooseUs}</button>
                 <a href="#products" onClick={(e) => handleScrollTo(e, 'products')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">{t.nav.products}</a>
                <a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="text-left py-2 border-b border-zinc-100 dark:border-zinc-800">{t.nav.services}</a>
              </div>
              
              <button 
                onClick={() => { setIsNavOpen(false); setIsClientModalOpen(true); }} 
                className="w-full py-4 bg-brand-500 text-white rounded-2xl text-lg font-bold shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
              >
                <User /> {t.nav.client}
              </button>
              
              <div className="pt-4 flex items-center justify-between">
                <span className="text-sm opacity-50 font-mono uppercase tracking-widest">{t.nav.themeSettings}</span>
                <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                   <span className="text-sm font-bold">{isDark ? t.nav.darkMode : t.nav.lightMode}</span>
                   {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-850">
                <span className="text-sm opacity-50 font-mono uppercase tracking-widest">{t.footer.cookies}</span>
                <button onClick={() => { setCookieConsent(null); setIsNavOpen(false); }} className="flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800">
                   <span className="text-sm font-bold">{t.footer.cookies}</span>
                   <ShieldCheck size={18} />
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Language Menu for Mobile Trigger (Overlay) */}
      {(isLangMenuOpen && !isNavOpen) && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 md:hidden">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsLangMenuOpen(false)}></div>
           <div className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl animate-fade-up max-h-[70vh] flex flex-col">
              <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="text-lg font-bold">{t.nav.selectLanguage}</h3>
                <button onClick={() => setIsLangMenuOpen(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full"><X size={16}/></button>
              </div>
              <div className="flex flex-col gap-2 overflow-y-auto">
                 {(Object.keys(LANG_CONFIG) as Language[]).map((langKey) => (
                   <button
                     key={langKey}
                     onClick={() => { setLang(langKey); setIsLangMenuOpen(false); }}
                     className={`flex items-center justify-between px-4 py-4 rounded-xl border transition-colors shrink-0 ${
                       lang === langKey 
                         ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-500' 
                         : 'border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                     }`}
                   >
                     <div className="flex items-center gap-3">
                       <span className="text-3xl">{LANG_CONFIG[langKey].flag}</span>
                       <div className="flex flex-col items-start">
                         <span className="font-bold text-base">
                             {langKey}
                         </span>
                         <span className="text-xs opacity-50 uppercase tracking-wider">{LANG_CONFIG[langKey].label}</span>
                       </div>
                     </div>
                     {lang === langKey && <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white"><Check size={14} /></div>}
                   </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {cookieConsent === null && (
        <CookieConsent 
          lang={lang} 
          onAccept={handleCookieAccept} 
          onDecline={handleCookieDecline} 
        />
      )}

      {/* Client Modal Form */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => { setIsClientModalOpen(false); setFormSubmittedData(null); }}
          ></div>
          <div className="relative bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-fade-up max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => { setIsClientModalOpen(false); setFormSubmittedData(null); }}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rtl:right-auto rtl:left-4 md:rtl:left-6 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            
            {formSubmittedData ? (
              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/40">
                    <CheckCircle2 size={26} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-fun text-zinc-900 dark:text-white">
                      {lang === 'ID' ? 'Permohonan Siap Dikirim' : 'Inquiry Ready to Send'}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {lang === 'ID' 
                        ? 'Rincian permohonan Anda telah berhasil disusun.' 
                        : 'Your service request draft has been prepared.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-850/60 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">{lang === 'ID' ? 'Nama / Perusahaan:' : 'Name / Company:'}</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{formSubmittedData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">{lang === 'ID' ? 'Layanan Terpilih:' : 'Selected Service:'}</span>
                    <span className="font-semibold text-brand-600 dark:text-brand-400 text-right max-w-[240px] truncate">{formSubmittedData.service}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href={formSubmittedData.whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle size={18} />
                    <span>{lang === 'ID' ? 'Kirim via WhatsApp Resmi' : 'Send via Official WhatsApp'}</span>
                  </a>

                  <a 
                    href={formSubmittedData.mailtoUrl}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                  >
                    <Mail size={18} />
                    <span>{lang === 'ID' ? 'Kirim via Email Resmi' : 'Send via Official Email'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(formSubmittedData.summary);
                      setCopiedInquiry(true);
                      setTimeout(() => setCopiedInquiry(false), 2000);
                    }}
                    className="w-full py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copiedInquiry ? <CheckCheck size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copiedInquiry ? (lang === 'ID' ? 'Teks Tersalin!' : 'Text Copied!') : (lang === 'ID' ? 'Salin Rincian Teks' : 'Copy Inquiry Text')}</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                  <button
                    type="button"
                    onClick={() => { setFormSubmittedData(null); setIsClientModalOpen(false); }}
                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-medium py-1"
                  >
                    {lang === 'ID' ? 'Selesai & Tutup' : 'Done & Close'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2 font-fun text-zinc-900 dark:text-white">{t.clientForm.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 md:mb-8">{t.clientForm.subtitle}</p>

                <form className="space-y-4 md:space-y-5" onSubmit={handleClientSubmit}>
                   <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.name}</label>
                      <input name="name" required type="text" placeholder={lang === 'ID' ? "PT Nama Perusahaan / Nama Lengkap" : "Company Name / Full Name"} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.origin}</label>
                        <input name="origin" required type="text" placeholder={lang === 'ID' ? "Pelabuhan Muat - Bongkar" : "Loading / Discharging Port"} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                     </div>
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.whatsapp}</label>
                        <input name="phone" required type="tel" placeholder="08xxxxxxxxxx" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                     </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.email}</label>
                      <input name="email" required type="email" placeholder="email@perusahaan.com" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm" />
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-zinc-500">{t.clientForm.product}</label>
                      <select name="product" className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-500 text-zinc-900 dark:text-white transition-colors text-sm">
                         <optgroup label={lang === 'ID' ? "Layanan Keagenan & Kepelabuhanan" : "Shipping Agency & Port Services"}>
                            <option value="Keagenan Kapal Umum & Port Clearance (CIQP)">Keagenan Kapal Umum & Port Clearance (CIQP)</option>
                            <option value="Jasa Bongkar Muat (PBM / Stevedoring & Cargodoring)">Jasa Bongkar Muat (PBM / Stevedoring & Cargodoring)</option>
                            <option value="Ship Husbandry & Crew Change Logistics">Ship Husbandry & Crew Change Logistics</option>
                            <option value="Suplai Air Bersih & Bunkering (MGO / VLSFO)">Suplai Air Bersih & Bunkering (MGO / VLSFO)</option>
                            <option value="Pemanduan & Penundaan (Pilotage & Towage)">Pemanduan & Penundaan (Pilotage & Towage)</option>
                         </optgroup>
                         <optgroup label={lang === 'ID' ? "Penyewaan Kapal Tongkang & Tug" : "Tug & Barge Charter Solutions"}>
                            <option value="Sewa Kapal Tongkang 330 Feet & Tugboat">Sewa Kapal Tongkang 330 Feet & Tugboat</option>
                            <option value="Sewa Kapal Tongkang 300 Feet & Tugboat">Sewa Kapal Tongkang 300 Feet & Tugboat</option>
                            <option value="Sewa Kapal Tongkang 270 Feet & Tugboat">Sewa Kapal Tongkang 270 Feet & Tugboat</option>
                         </optgroup>
                         <optgroup label={lang === 'ID' ? "Layanan Khusus" : "Specialized Services"}>
                            <option value="Konsultasi & Layanan Maritim Khusus">Konsultasi & Layanan Maritim Khusus</option>
                         </optgroup>
                      </select>
                   </div>

                   <button type="submit" className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-brand-500/20 mt-4 flex items-center justify-center gap-2 text-sm">
                      <MessageCircle size={18} />
                      <span>{t.clientForm.submit}</span>
                   </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content Switcher */}
      {view === 'about' ? (
        <AboutPage t={t} isDark={isDark} />
      ) : view === 'why-us' ? (
        <WhyUsPage t={t} isDark={isDark} onInquiry={() => setIsClientModalOpen(true)} />
      ) : view === 'privacy' ? (
        <PrivacyPage 
          lang={lang} 
          onNavigate={(v) => setView(v)} 
          onBack={() => setView('home')} 
          isDark={isDark} 
        />
      ) : view === 'terms' ? (
        <TermsPage 
          lang={lang} 
          onNavigate={(v) => setView(v)} 
          onBack={() => setView('home')} 
          isDark={isDark} 
        />
      ) : view === 'catalog' ? (
        <CatalogPage 
          products={products}
          t={t}
          onBack={() => setView('home')}
          onProductClick={(idx) => handleProductClick(idx)}
          isDark={isDark}
        />
      ) : view === 'product-detail' ? (
        <ProductDetailPage 
          product={activeProduct} 
          t={t} 
          onBack={() => setView('home')} 
          onInquiry={() => setIsClientModalOpen(true)}
          isDark={isDark}
        />
      ) : (
        <>
          {/* SPECTACULAR FULL-BLEED HERO SECTION */}
          <header className="relative pt-36 md:pt-48 pb-24 md:pb-36 px-6 md:px-16 overflow-hidden min-h-[95vh] md:min-h-screen flex flex-col justify-center transition-colors duration-500">
             
             {/* Full Bleed Hero Background Image with Dual Scrims */}
             <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
                <img 
                   src="/src/assets/images/hero_maritime_full_1794312180884.jpg" 
                   alt={lang === 'ID' ? "Operasional Keagenan Kapal dan Pemanduan Maritim PT Perintis Bermuda Perkasa" : "Maritime Ship Agency & Vessel Escort Operations PT Perintis Bermuda Perkasa"}
                   referrerPolicy="no-referrer"
                   className="w-full h-full object-cover object-center scale-105"
                   loading="eager"
                />
                {/* Directional contrast scrim: deep navy from left to preserve text legibility in both themes */}
                <div className={`absolute inset-0 ${isDark 
                   ? 'bg-gradient-to-r from-[#031520]/95 via-[#031E2C]/85 to-[#031E2C]/40' 
                   : 'bg-gradient-to-r from-white/95 via-white/85 to-white/40'}`} 
                />
                {/* Top and bottom subtle gradient transitions */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-50/90 via-transparent to-transparent dark:from-brand-950/90 dark:via-transparent dark:to-transparent" />
                {/* Ambient glow highlight */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[55vw] h-[55vw] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen" />
             </div>

             <div className="max-w-[95rem] mx-auto w-full relative z-10">
                <div className="max-w-5xl relative">
                   
                   {/* Badge */}
                   <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center gap-3 mb-8 pl-1 pr-4 py-1 rounded-full border border-zinc-200/80 dark:border-white/15 bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-sm"
                   >
                      <div className="px-2.5 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider">Official</div>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">{t.hero.badge}</span>
                   </motion.div>

                   {/* Massive Typography */}
                   <motion.h1 
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.08] tracking-tight mb-8 text-balance font-fun text-left text-zinc-900 dark:text-white drop-shadow-sm"
                   >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400">{t.hero.titleLine1}.</span> <br/>
                      <span className="text-zinc-900 dark:text-white">{t.hero.titleLine2}.</span>
                   </motion.h1>

                   {/* Subtitle / Description Paragraph */}
                   <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-base sm:text-lg md:text-xl lg:text-[1.35rem] text-zinc-700 dark:text-zinc-300 font-light leading-relaxed mb-12 max-w-3xl text-left"
                   >
                      {t.hero.subtitle}
                   </motion.p>

                   {/* Action Buttons */}
                   <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="flex flex-col sm:flex-row gap-4 justify-start"
                   >
                      <button onClick={() => setView('catalog')} className="group relative px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-brand-500 dark:hover:bg-brand-500 dark:hover:text-white rounded-full text-base font-bold flex items-center justify-center gap-3 overflow-hidden transition-all shadow-xl shadow-brand-500/20">
                         <span className="relative z-10">{t.hero.ctaPrimary}</span>
                         <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </button>
                      <button onClick={() => setIsClientModalOpen(true)} className="px-10 py-5 border border-zinc-300 dark:border-white/20 hover:border-zinc-500 dark:hover:border-white/50 rounded-full text-base font-bold text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-white/40 dark:bg-black/30 hover:bg-white/60 dark:hover:bg-black/50 transition-colors backdrop-blur-md">
                         {t.hero.ctaSecondary}
                      </button>
                   </motion.div>

                   {/* Core Manifesto Text Panel */}
                   <motion.div 
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="mt-16 pt-8 border-t border-zinc-200/80 dark:border-white/15 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-left"
                   >
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-zinc-200 dark:border-white/20 text-[10px] font-mono tracking-widest text-brand-600 dark:text-brand-400 uppercase shrink-0">
                         <Anchor size={12} className="animate-pulse" /> Core Manifesto
                      </div>
                      <ScrollRevealText 
                         text={lang === 'ID' 
                            ? "PT Perintis Bermuda Perkasa berkomitmen memberikan layanan keagenan kapal terbaik dengan standar keselamatan tertinggi, koordinasi kepelabuhanan andal, serta ketepatan waktu pengurusan clearance kapal." 
                            : "PT Perintis Bermuda Perkasa is committed to providing ship agency services with the highest safety standards, reliable port husbanding, and precise vessel clearance schedules."
                         }
                         className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-3xl block"
                      />
                   </motion.div>

                </div>
             </div>
          </header>

          {/* OVERLAPPING SCROLL CONTAINER */}
          <div className="relative z-10 bg-brand-50 dark:bg-brand-950 shadow-[0_-20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_-20px_50px_rgba(0,0,0,0.35)]">
             {/* Infinite Marquee - Modernized */}
             <div className="w-full bg-transparent py-6 overflow-hidden">
             <div className="flex gap-12 animate-marquee whitespace-nowrap items-center rtl:flex-row-reverse">
                {Array(8).fill(t.marquee).map((text, i) => (
                   <span key={i} className="text-lg md:text-xl font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 opacity-85">{text}</span>
                ))}
             </div>
          </div>


          {/* Products Section (Spectacular Cards) */}
          <section id="products" className="py-24 md:py-32 px-4 md:px-12 bg-white dark:bg-zinc-950">
             <div className="max-w-[95rem] mx-auto">
                <motion.div 
                   initial={{ opacity: 0, y: 35 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8 }}
                   className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
                >
                   <div>
                      <span className="text-brand-500 font-mono text-xs uppercase tracking-widest mb-2 block">{t.nav.products}</span>
                      <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white font-fun">{t.products.title}</h2>
                   </div>
                   <button onClick={() => setView('catalog')} className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:text-brand-500 transition-colors border-b border-zinc-200 dark:border-zinc-800 pb-1">
                      {t.products.viewCatalog} <ArrowRight size={16} className="rtl:rotate-180" />
                   </button>
                </motion.div>

                <div ref={cardsContainerRef} className="relative flex flex-col gap-12 md:gap-24 w-full pb-12">
                   {products.map((product, idx) => (
                      <div 
                         key={product.id}
                         ref={(el) => { cardsRef.current[idx] = el; }}
                         onClick={() => handleProductClick(idx)}
                         className="sticky w-full h-[76vh] md:h-[80vh] min-h-[460px] md:min-h-[580px] rounded-[3rem] overflow-hidden cursor-pointer shadow-[0_35px_70px_-15px_rgba(0,0,0,0.2)] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 flex flex-col md:flex-row group transition-colors duration-350 hover:border-brand-500/30"
                         style={{ 
                            top: "110px",
                            zIndex: 10 + idx
                         }}
                      >
                         {/* Image half */}
                         <div className="relative w-full h-[32%] md:h-full md:w-1/2 overflow-hidden">
                            <img 
                               src={product.image} 
                               className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 group-hover:rotate-1"
                               alt={product.title} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/20 to-transparent opacity-60 md:opacity-40" />
                            
                            {/* Small Floating Index badge */}
                            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-white text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase">
                               MODEL 0{idx + 1}
                            </div>
                         </div>

                         {/* Content half */}
                         <div className="w-full flex-1 md:h-full md:w-1/2 p-6 md:p-14 flex flex-col justify-between bg-zinc-50 dark:bg-zinc-900/95 text-zinc-900 dark:text-white relative">
                            {/* Glowing accent dot for active card */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-500/10 transition-colors" />

                            <div className="flex justify-between items-center mb-4 md:mb-0">
                               <span className="text-brand-500 dark:text-brand-400 font-mono text-[10px] md:text-xs uppercase tracking-widest font-semibold">{product.tags[0]}</span>
                               <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300">
                                  <ArrowUpRight size={18} className="md:size-[22px] rtl:rotate-90" />
                                </div>
                            </div>

                            <div className="my-auto">
                               <h3 className="text-2xl md:text-5xl font-bold font-fun leading-none mb-3 md:mb-5 tracking-tight group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors duration-300">
                                  {product.title}
                               </h3>
                               <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-lg leading-relaxed max-w-xl font-light line-clamp-3 md:line-clamp-none">
                                  {product.description}
                               </p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </section>

          {/* SERVICES SECTION */}
          <section id="services" className="py-24 md:py-32 px-4 md:px-12 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200/50 dark:border-zinc-800/40 relative overflow-hidden">
             {/* Decorative Background Accents */}
             <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-[100px] pointer-events-none"></div>
             <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none"></div>

             <div className="max-w-4xl mx-auto relative z-10">
                <motion.div 
                   initial={{ opacity: 0, y: 35 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 0.8 }}
                   className="text-center mb-16 md:mb-20"
                >
                   <span className="text-brand-500 font-mono text-xs uppercase tracking-widest mb-3 block">{t.nav.services}</span>
                   <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white font-fun mb-6 tracking-tight">{t.services.title}</h2>
                   <p className="opacity-75 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light">{t.services.subtitle}</p>
                </motion.div>

                {/* Vertical Accordion Stack - Monolog Style */}
                <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 divide-y divide-zinc-200/80 dark:divide-zinc-800/80 border-b">
                   {t.services.items.map((srv, idx) => {
                      const ServiceIcon = (() => {
                        switch(idx) {
                          case 0: return FileCheck; // Clearance In dan Out
                          case 1: return Anchor;    // Operasional dan Sandar
                          case 2: return Package;   // Logistik dan Chandlery
                          case 3: return Fuel;      // Bunkering
                          case 4: return Users;     // Manajemen Kru
                          case 5: return Boxes;     // Pengawasan Bongkar Muat
                          default: return Anchor;
                        }
                      })();

                      const isOpen = activeServiceIdx === idx;

                      return (
                         <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className="group overflow-hidden"
                         >
                            <button
                               onClick={() => setActiveServiceIdx(isOpen ? null : idx)}
                               className="w-full text-left py-6 md:py-8 flex items-center justify-between gap-6 outline-none focus:visible:ring-1 focus:visible:ring-brand-500/50"
                               aria-expanded={isOpen}
                            >
                               <div className="flex items-center gap-3.5">
                                  <ServiceIcon size={22} className="text-brand-500 shrink-0" />
                                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-fun text-zinc-900 dark:text-white transition-colors duration-350 group-hover:text-brand-500 dark:group-hover:text-brand-400">
                                     {srv.title}
                                  </h3>
                               </div>
                               
                               {/* Hollow Circle Indicator (Monolog style) */}
                               <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
                                  <div 
                                     className={`w-3 h-3 rounded-full border-1.5 transition-all duration-500 ${
                                        isOpen 
                                           ? 'border-brand-500 bg-brand-500 scale-110 shadow-[0_0_10px_rgba(34,211,238,0.55)]' 
                                           : 'border-zinc-400 dark:border-zinc-650 group-hover:border-zinc-900 dark:group-hover:border-zinc-200 group-hover:scale-110'
                                     }`}
                                  />
                               </div>
                            </button>

                            {/* Animated Inner Content Panel */}
                            <motion.div
                               initial={false}
                               animate={{ 
                                  height: isOpen ? "auto" : 0,
                                  opacity: isOpen ? 1 : 0
                               }}
                               transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                               className="overflow-hidden"
                            >
                               <div className="pb-8 pr-6 md:pr-12">
                                  <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-light mb-6 max-w-3xl">
                                     {srv.desc}
                                  </p>

                                  {/* Feature tags for the service */}
                                  <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-200/50 dark:border-zinc-800/20">
                                     {srv.features.map((feat, fIdx) => (
                                        <span key={fIdx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 text-[11px] font-mono tracking-wide border border-zinc-200/30 dark:border-zinc-800/30">
                                           <Check size={10} className="text-brand-500 shrink-0" /> {feat}
                                        </span>
                                     ))}
                                  </div>
                                </div>
                            </motion.div>
                         </motion.div>
                      );
                   })}
                </div>
             </div>
          </section>

          {/* SUSTAINABILITY SECTION (Formerly Analytics) */}
          <section id="sustainability" className="hidden">
             {/* Bio-Luminescent Gradient Background */}
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-[120px] pointer-events-none"></div>
             
             {/* Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98110_1px,transparent_1px),linear-gradient(to_bottom,#10b98110_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

             <div className="max-w-[95rem] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                   
                   {/* Sticky Heading */}
                   <div className="lg:w-1/3 lg:h-[80vh] lg:sticky lg:top-32 flex flex-col justify-center">
                      <div className="mb-12">
                         <div className="flex items-center gap-3 mb-6">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                            </span>
                            <span className="text-brand-500 font-mono text-xs uppercase tracking-widest">{t.sustainability.tagline}</span>
                         </div>
                         <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-zinc-900 dark:text-white leading-tight">{t.sustainability.title}</h2>
                         <p className="text-xl opacity-60 leading-relaxed">
                            <ScrollRevealText text={t.sustainability.subtitle} />
                         </p>
                      </div>
                      
                      <div className="p-6 rounded-3xl bg-white/80 dark:bg-black/40 backdrop-blur-md border border-brand-200 dark:border-brand-900 shadow-xl">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-brand-500 text-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-brand-500/30">
                               <ShieldCheck size={28} />
                            </div>
                            <div>
                               <div className="font-bold text-lg">Net-Zero Commitment</div>
                               <div className="text-sm opacity-60">Target: 2030 Carbon Neutral</div>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Sustainability Cards */}
                   <div className="lg:w-2/3 space-y-8">
                      {/* Featured Hero Card */}
                      <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl group">
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb7d5fa5?q=80&w=2626&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
                         <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
                            <div>
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-8">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold mb-4 font-fun">Safety Absolute</h3>
                                <p className="text-xl text-brand-100 max-w-md">Our continuous dry-dock maintenance schedules ensure zero-incident sea transit journeys and complete deck loads.</p>
                            </div>
                            <div className="text-right">
                                <div className="text-6xl font-bold font-mono">100%</div>
                                <div className="text-brand-200 uppercase tracking-widest text-sm">BKI Class Standards</div>
                            </div>
                         </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         {t.sustainability.cards.map((card, idx) => (
                           <div key={idx} className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 border border-brand-100 dark:border-zinc-800 hover:border-brand-500 transition-colors group shadow-lg">
                               <div className="mb-6 flex justify-between items-start">
                                  <div className={`p-4 rounded-2xl ${idx === 0 ? 'bg-blue-100 text-blue-600' : idx === 1 ? 'bg-orange-100 text-orange-600' : 'bg-brand-100 text-brand-600'}`}>
                                      {idx === 0 ? <ShieldCheck size={24} /> : idx === 1 ? <Activity size={24} /> : <Waves size={24} />}
                                  </div>
                                  <ArrowUpRight className="text-zinc-300 group-hover:text-brand-500 transition-colors" />
                               </div>
                               <h4 className="text-zinc-500 dark:text-zinc-400 font-mono text-sm uppercase tracking-wider mb-2">{card.title}</h4>
                               <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">{card.value}</div>
                               <p className="text-zinc-600 dark:text-zinc-400">{card.desc}</p>
                           </div>
                         ))}
                         
                         {/* Water Card (Visual) */}
                         <div className="bg-cyan-900 text-white rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-center items-center text-center group">
                             <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[80px] -translate-y-1/2"></div>
                             <Waves size={48} className="text-cyan-400 mb-4 relative z-10 group-hover:scale-110 transition-transform" />
                             <h4 className="text-3xl font-bold mb-2 relative z-10">Eco Maritime</h4>
                             <p className="opacity-80 relative z-10">Strictly enforcing zero-ballast water pollution and eco-friendly engine emission guidelines.</p>
                         </div>
                      </div>
                   </div>

                </div>
             </div>
          </section>

          {/* Traceability (Timeline / Workflow) */}
          <section id="traceability" className="py-24 md:py-36 px-6 md:px-12 relative overflow-hidden bg-black transition-colors duration-500 text-white">
             
             <div className="max-w-7xl mx-auto relative z-10">
                {/* Capsule Pill Switcher (Matching Screenshot) */}
                <div className="mb-12 md:mb-16 flex justify-start">
                   <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#141414] border border-white/10 backdrop-blur-md overflow-x-auto max-w-full">
                      {[
                        { num: "01", title: lang === 'ID' ? "Logistik" : "Logistics" },
                        { num: "02", title: lang === 'ID' ? "Navigasi" : "Navigation" },
                        { num: "03", title: lang === 'ID' ? "Pelayaran" : "Voyage" },
                        { num: "04", title: lang === 'ID' ? "Bongkar" : "Discharge" },
                      ].map((st, idx) => {
                        const isCurrent = activeWorkflowStep === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveWorkflowStep(idx)}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all duration-300 font-sans shrink-0 focus:outline-none ${
                              isCurrent
                                ? 'bg-white text-zinc-950 font-semibold shadow-md'
                                : 'text-zinc-500 hover:text-zinc-300 font-medium'
                            }`}
                            aria-label={`Langkah ${st.num}: ${st.title}`}
                          >
                            <span className={`text-[10px] font-mono ${isCurrent ? 'text-zinc-500' : 'text-zinc-600'}`}>{st.num}</span>
                            <span className="tracking-tight">{st.title}</span>
                          </button>
                        );
                      })}
                   </div>
                </div>

                {/* Stepped Cascade Workflow Cards (Matching Screenshot) */}
                <div className="flex flex-col md:flex-row justify-center items-stretch md:items-start gap-5 md:gap-4 lg:gap-6 xl:gap-7 pb-12">
                   {[
                      { 
                        num: "01",
                        title: lang === 'ID' ? "Logistik" : "Logistics", 
                        desc: lang === 'ID' 
                          ? "PENANGANAN LENGKAP DOKUMEN PRA-KEDATANGAN KAPAL (PPK/PKK), KOORDINASI PERIZINAN SYAHBANDAR (KSOP), BEA CUKAI, IMIGRASI, DAN KARANTINA KESEHATAN (CIQP) SECARA AKURAT DAN CEPAT." 
                          : "COMPREHENSIVE PRE-ARRIVAL NOTIFICATIONS (PPK/PKK), STATUTORY CIQP ADVANCE CLEARANCES WITH KSOP, CUSTOMS, IMMIGRATION, AND PORT HEALTH WITH ZERO ANCHORAGE DELAYS." 
                      },
                      { 
                        num: "02",
                        title: lang === 'ID' ? "Navigasi" : "Navigation", 
                        desc: lang === 'ID' 
                          ? "PANDUAN PEMANDUAN (PILOTAGE) DAN PENARIKAN KAPAL TUNDA (TOWAGE), PEMERIKSAAN DRAFT ALUR ALIRAN, SERTA ALOKASI SANDAR DERMAGA TERMINAL ATAU SMELTER TAMBANG YANG AMAN." 
                          : "HARBOR PILOTAGE DISPATCH, TUG ASSISTANCE COORDINATION, NAVIGATIONAL CHANNEL DRAFT CHECKS, AND TIMELY BERTHING AT SMELTER JETTIES OR INDUSTRIAL CARGO TERMINALS." 
                      },
                      { 
                        num: "03",
                        title: lang === 'ID' ? "Pelayaran" : "Voyage", 
                        desc: lang === 'ID' 
                          ? "SUPERVISI BONGKAR MUAT (PBM / STEVEDORING) NIKEL DAN BATU BARA BERSAMA INDEPENDENT DRAFT SURVEYOR, DILENGKAPI BUNKER BAHAN BAKAR, AIR TAWAR, SERTA CREW ASSISTANCE." 
                          : "SUPERVISED STEVEDORING OPERATIONS WITH DRAFT SURVEYORS, VESSEL HUSBANDING SERVICES, FUEL BUNKERING, FRESH WATER DELIVERY, AND SEAMEN CREW CHANGES." 
                      },
                      { 
                        num: "04",
                        title: lang === 'ID' ? "Bongkar" : "Discharge", 
                        desc: lang === 'ID' 
                          ? "PENYELESAIAN STATEMENT OF FACTS (SOF), REKAPITULASI DOKUMEN MUATAN, PENERBITAN SURAT PERSETUJUAN BERLAYAR (SPB) RESMI SECARA KILAT, DAN PELEPASAN KAPAL." 
                          : "FINALIZING STATEMENT OF FACTS (SOF), CARGO MANIFEST CERTIFICATION, RAPID ISSUANCE OF STATUTORY PORT CLEARANCE OUT (SPB), AND ESCORTING SAFE DEPARTURE TO OPEN SEAS." 
                      }
                   ].map((step, i) => {
                      const desktopOffsets = ["md:translate-y-0", "md:translate-y-16 lg:translate-y-24", "md:translate-y-36 lg:translate-y-48", "md:translate-y-10 lg:translate-y-14"];
                      const isSelected = activeWorkflowStep === i;
                      
                      return (
                         <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            onClick={() => setActiveWorkflowStep(i)}
                            className={`w-full md:w-[240px] lg:w-[270px] xl:w-[285px] shrink-0 rounded-3xl p-6 lg:p-7 flex flex-col justify-start border transition-all duration-400 cursor-pointer ${
                               desktopOffsets[i]
                            } ${
                               isSelected 
                                  ? 'bg-[#181818] border-white/50 ring-1 ring-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] scale-[1.02]' 
                                  : 'bg-[#131313] hover:bg-[#161616] border-white/10 hover:border-white/25'
                            }`}
                         >
                            <div className="flex justify-between items-start mb-6 md:mb-8">
                               <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight">
                                  {step.title}
                                </h3>
                                <span className={`text-xl md:text-2xl font-light font-mono tracking-wider transition-colors ${
                                   isSelected ? 'text-white' : 'text-zinc-600'
                                }`}>
                                   {step.num}
                                </span>
                            </div>
                            <p className="text-[10px] md:text-[11px] lg:text-xs text-[#8e8e93] font-sans uppercase tracking-wider leading-[1.85] font-normal">
                               {step.desc}
                            </p>
                         </motion.div>
                      );
                   })}
                </div>
             </div>
          </section>
          </div>
        </>
      )}

      <footer id="contact" className="bg-gradient-to-b from-[#0e5c7c] via-[#0b3d54] to-[#041d2a] text-white relative pt-12 pb-12 px-6 md:px-12 overflow-hidden group border-t border-cyan-800/20">
         
         {/* Top Section: Massive CTA & CLOCKS */}
         <div className="max-w-[95rem] mx-auto mb-12 border-b border-brand-900/40 pb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
               <motion.div 
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="relative"
               >
                  <h2 className="text-[12vw] md:text-[8vw] font-bold leading-[0.8] tracking-tight text-white mb-8 font-fun">
                     {t.footer.ctaPrefix} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-100">{t.footer.ctaHighlight}</span>
                  </h2>
               </motion.div>
               
               <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="flex flex-col items-start lg:items-end gap-10 mb-2 w-full lg:w-auto rtl:lg:items-start"
               >
                   
                   {/* WORLD CLOCKS - FUN FONT 'SYNE' */}
                   <div className="flex flex-wrap gap-4 mb-2">
                      {[
                        { city: t.footer.worldClock.wita, time: worldTimes.wita, code: 'ID' },
                        { city: t.footer.worldClock.wit, time: worldTimes.wit, code: 'ID' },
                        { city: t.footer.worldClock.wib, time: worldTimes.wib, code: 'ID' }
                      ].map((clock, idx) => (
                        <div key={idx} className="flex items-center gap-3 px-6 py-4 rounded-full border border-brand-800 bg-brand-900/50 backdrop-blur-sm hover:border-brand-600 transition-colors">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-mono text-brand-300 uppercase tracking-widest leading-none mb-2">{clock.city}</span>
                              <span className="font-fun text-2xl font-bold text-white tabular-nums leading-none tracking-tight">
                                 {clock.time}
                              </span>
                           </div>
                           <div className="hidden">🇮🇩</div>
                        </div>
                      ))}
                   </div>

                   <div className="flex flex-col md:flex-row gap-6 items-center w-full lg:w-auto">
                      <button onClick={() => setIsClientModalOpen(true)} className="w-full md:w-auto px-12 py-6 bg-brand-600 hover:bg-brand-500 text-white rounded-full text-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-4 shadow-[0_4px_24px_rgba(34,211,238,0.25)]">
                         {t.footer.startSourcing} <ArrowUpRight size={24} className="rtl:rotate-270" />
                      </button>
                   </div>
               </motion.div>
            </div>
         </div>

         {/* Middle Section: Links Grid */}
         <div className="max-w-[95rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
             
             {/* Column 1: Brand Info */}
             <div className="lg:col-span-2 flex flex-col items-start text-left">
                <BrandLogo size="md" variant="horizontal" lightModeForce={true} className="mb-6 scale-95 origin-left" />
                <p className="text-base text-brand-200/85 max-w-sm leading-relaxed mb-6 font-light font-sans">
                   {lang === 'ID' 
                     ? "Keagenan kapal terpercaya di Indonesia yang berkomitmen memberikan layanan maritim profesional dengan koordinasi andal, respons cepat, dan dukungan hubung 24/7." 
                     : "Reliable ship agency in Indonesia committed to delivering professional maritime services with dependable coordination, rapid response, and 24/7 support."}
                </p>
             </div>

             {/* Column 2: Navigation */}
             <div>
                <span className="block text-xs font-mono text-brand-300 mb-6 uppercase tracking-widest">{t.footer.exploreLabel}</span>
                <ul className="space-y-4 text-xl md:text-2xl font-medium">
                   <li><button onClick={() => setView('home')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.home}</button></li>
                   <li><button onClick={() => setView('about')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.about}</button></li>
                   <li><a href="#products" onClick={(e) => handleScrollTo(e, 'products')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.products}</a></li>
                   <li><a href="#services" onClick={(e) => handleScrollTo(e, 'services')} className="hover:text-brand-300 transition-colors hover:translate-x-2 inline-block duration-300 rtl:hover:-translate-x-2">{t.nav.services}</a></li>
                </ul>
             </div>

             {/* Column 2: Socials (Added Gmail and TikTok) */}
             <div>
                <span className="block text-xs font-mono text-brand-300 mb-6 uppercase tracking-widest">{t.footer.connectLabel}</span>
                <ul className="space-y-4 text-xl md:text-2xl font-medium">
                   <li><a href="mailto:sales@perintisbermudaperkasa.com" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">Email <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">TikTok <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">LinkedIn <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">Instagram <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                   <li><a href="#" className="hover:text-brand-300 transition-colors flex items-center gap-2 group/link">WeChat <ArrowUpRight size={18} className="opacity-0 group-hover/link:opacity-100 transition-opacity rtl:rotate-270" /></a></li>
                </ul>
             </div>

             {/* Column 4: Contact */}
             <div className="lg:col-span-1">
                <span className="block text-xs font-mono text-brand-300 mb-6 uppercase tracking-widest">{t.footer.officeLabel}</span>
                <address className="not-italic text-base text-brand-100 leading-relaxed mb-6 whitespace-pre-line">
                   {t.footer.address}
                </address>
                <a href="mailto:sales@perintisbermudaperkasa.com" className="text-sm font-semibold hover:text-brand-300 transition-colors border-b border-brand-800 hover:border-brand-400 pb-1 inline-block">
                   sales@perintisbermudaperkasa.com
                </a>
             </div>
         </div>

         {/* Bottom Section: Footer Meta */}
         <div className="max-w-[95rem] mx-auto border-t border-brand-900 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs md:text-sm text-brand-300 font-mono">
             <div className="flex gap-6">
                <button onClick={() => setView('privacy')} className="hover:text-white transition-colors text-left">{t.footer.privacy}</button>
                <button onClick={() => setView('terms')} className="hover:text-white transition-colors text-left">{t.footer.terms}</button>
                <button onClick={() => setCookieConsent(null)} className="hover:text-white transition-colors text-left">{t.footer.cookies}</button>
             </div>
             <div className="flex items-center gap-6">
                <span>&copy; 2026 PT Perintis Bermuda Perkasa. {t.footer.rightsReserved}</span>
             </div>
         </div>

         {/* Giant Background Typography */}
         <div className="mt-12 select-none pointer-events-none">
            <h1 className="text-[18vw] font-black leading-none text-center text-[#0b3d54] group-hover:text-[#0c4a6e] transition-colors duration-700 tracking-tighter">
               PERINTIS
            </h1>
         </div>

         {/* Beautiful Moving Ocean Waves with Vessel Patrol at the absolute bottom */}
         <div className="relative -mx-6 md:-mx-12 -mb-12 mt-8 overflow-hidden z-20">
            <OceanWaves />
         </div>
         
      </footer>

      {/* Floating Interactive Chatbot and WhatsApp actions */}
      <AIChatBot lang={lang} />

    </div>
  );
}

export default App;