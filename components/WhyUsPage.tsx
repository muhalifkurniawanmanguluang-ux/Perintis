import React from 'react';
import { Translation } from '../types';
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';

interface WhyUsPageProps {
  t: Translation;
  isDark?: boolean;
  onInquiry?: () => void;
}

const WhyUsPage: React.FC<WhyUsPageProps> = ({ t, onInquiry }) => {
  return (
    <div className="pt-28 md:pt-40 pb-20 animate-fade-up relative overflow-hidden">
      
      {/* KINETIC BACKGROUND TYPOGRAPHY */}
      <div className="absolute top-32 -left-20 pointer-events-none opacity-[0.03] dark:opacity-[0.05] select-none">
         <h1 className="text-[25vw] font-black uppercase leading-none tracking-tighter italic">
            Bermuda Maritime Excellence
         </h1>
      </div>

      {/* 1. EDITORIAL HERO HEADER */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 mb-20 md:mb-32 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-zinc-200 dark:border-zinc-800 pb-16 md:pb-20">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full border border-brand-500/30 text-brand-600 dark:text-brand-400 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.3em] mb-8 bg-brand-500/5">
               [ Industrial Integrity ]
            </span>
            <h1 className="text-6xl md:text-[9vw] font-bold leading-[0.8] tracking-tighter mb-8 text-zinc-900 dark:text-white uppercase italic">
              {t.whyChooseUs.title.split(' ')[0]} <br/>
              <span className="text-brand-500 ml-[8%] not-italic">{t.whyChooseUs.title.split(' ')[1]}</span>
            </h1>
          </div>
          <div className="lg:max-w-lg lg:mt-32">
             <p className="text-lg md:text-2xl font-light opacity-80 leading-snug text-balance">
                {t.whyChooseUs.subtitle}
             </p>
          </div>
        </div>
      </div>

      {/* 2. ASYMMETRICAL STORYTELLING GRID */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 space-y-24 md:space-y-48 relative z-10">
        {t.whyChooseUs.reasons.map((reason, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row gap-12 lg:gap-32 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Visual Part with Awwwards-style Reveal */}
            <div className="w-full lg:w-[55%] group relative">
              <div className="aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-zinc-200 dark:bg-zinc-800 relative shadow-2xl">
                 <img 
                   src={
                     idx === 0 ? "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2670&auto=format&fit=crop" :
                     idx === 1 ? "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" :
                     idx === 2 ? "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop" :
                     "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2670&auto=format&fit=crop"
                   } 
                   className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.8s] scale-110 group-hover:scale-100 opacity-90"
                   alt={reason.title}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                 {/* Floating Counter */}
                 <div className="absolute -top-6 -left-4 md:-left-8 font-fun text-[8rem] md:text-[12rem] leading-none text-zinc-900/10 dark:text-white/5 font-black italic select-none">
                    0{idx + 1}
                 </div>
              </div>
            </div>

            {/* Content Part */}
            <div className="w-full lg:w-[45%] lg:px-6">
               <span className="text-brand-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] block mb-6">/// {reason.desc}</span>
               <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter leading-none">{reason.title}</h2>
               <p className="text-base md:text-xl font-light opacity-70 leading-relaxed mb-10 border-l-2 border-brand-500/30 pl-6">
                  {reason.detail}
               </p>
               <button 
                  onClick={onInquiry} 
                  className="flex items-center gap-6 group/btn focus:outline-none"
                  aria-label="Contact Operational Team"
               >
                  <div className="w-16 h-16 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center group-hover/btn:bg-brand-500 group-hover/btn:border-brand-500 transition-all duration-700 hover:rotate-45">
                     <ArrowRight size={24} className="group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                  </div>
                  <span className="font-bold text-[10px] uppercase tracking-[0.2em] group-hover/btn:text-brand-500 transition-colors">Strategic Insights</span>
               </button>
            </div>

          </div>
        ))}
      </div>

      {/* 3. HIGH-END STATS - DARK MONOLITH */}
      <div className="mt-32 md:mt-48 bg-zinc-950 text-white py-32 md:py-48 px-6 md:px-12 relative overflow-hidden rounded-[3rem] md:rounded-[5rem]">
         <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-brand-500/10 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2"></div>
         <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-600/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>
         
         <div className="max-w-[95rem] mx-auto relative z-10">
            <h2 className="text-5xl md:text-[10vw] font-black uppercase mb-24 leading-[0.8] tracking-tighter opacity-10 italic">
               {t.whyChooseUs.heading} <br/> {t.whyChooseUs.heading}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 lg:gap-40 border-t border-white/10 pt-24">
               {[
                 { label: t.whyChooseUs.reasons[0]?.desc || "Operational Hubs", val: "48+", icon: <Globe size={32}/> },
                 { label: t.whyChooseUs.reasons[1]?.desc || "Fleet Capacity", val: "350+", icon: <Zap size={32}/> },
                 { label: t.whyChooseUs.reasons[2]?.desc || "Safety Compliance", val: "99.8%", icon: <ShieldCheck size={32}/> }
               ].map((stat, i) => (
                 <div key={i} className="group flex flex-col items-center text-center">
                    <div className="text-brand-500 mb-8 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-700">{stat.icon}</div>
                    <div className="text-7xl md:text-[8rem] font-bold mb-6 tracking-tighter tabular-nums leading-none">{stat.val}</div>
                    <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] opacity-40">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* 4. CALL TO ACTION - ELEGANT FINALE */}
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 py-32 md:py-60 text-center relative">
         <h3 className="text-4xl md:text-[6vw] font-bold leading-[0.9] mb-16 italic font-serif tracking-tight text-balance">
            {t.inquiry.title}
         </h3>
         <button 
           className="relative inline-flex items-center justify-center p-1 px-12 py-6 overflow-hidden font-bold text-white transition duration-500 ease-out bg-zinc-900 dark:bg-white dark:text-zinc-950 rounded-full group hover:shadow-[0_0_80px_-10px_rgba(16,185,129,0.4)]"
           onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
         >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-500 -translate-x-full bg-brand-600 group-hover:translate-x-0 ease">
              <ArrowRight size={32} />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full transition-all duration-500 transform group-hover:translate-x-full ease text-xl uppercase tracking-widest">{t.footer.startSourcing}</span>
            <span className="relative invisible text-xl uppercase tracking-widest">{t.footer.startSourcing}</span>
         </button>
      </div>

    </div>
  );
};

export default WhyUsPage;
