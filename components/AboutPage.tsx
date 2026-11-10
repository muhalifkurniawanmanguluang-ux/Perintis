
import React from 'react';
import { Translation } from '../types';
import { Ship, Target, Eye, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import ScrollRevealText from './ScrollRevealText';

interface AboutPageProps {
  t: Translation;
  isDark?: boolean;
}

const AboutPage: React.FC<AboutPageProps> = ({ t }) => {
  return (
    <div className="pt-32 md:pt-48 pb-20 bg-zinc-50 dark:bg-black min-h-screen">
      
      {/* 1. HERO: Big Typography & Tagline */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative px-6 md:px-12 max-w-[95rem] mx-auto mb-20 md:mb-32"
      >


        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-2 rounded-full border border-brand-500/30 text-brand-600 dark:text-brand-400 font-mono text-xs uppercase tracking-widest mb-8 bg-brand-50 dark:bg-brand-900/10"
        >
            {t.nav.about}
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-[8rem] font-bold leading-[0.9] tracking-tighter text-balance mb-8 md:mb-12 font-fun text-zinc-900 dark:text-white"
        >
            {t.aboutPage.tagline.split(',')[0]},<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-sky-400 italic font-serif pr-4">
              {t.aboutPage.tagline.split(',')[1] || "Maritime Trust."}
            </span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 font-mono text-sm md:text-base border-l-2 border-brand-500 pl-4"
        >
            <MapPin size={18} className="text-brand-500" />
            {t.aboutPage.location}
        </motion.div>
      </motion.div>

      {/* 2. INTRODUCTION: Asymmetric Layout */}
      <div className="px-6 md:px-12 max-w-[95rem] mx-auto mb-32 md:mb-48">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
             
             {/* Left: Highlight Image & Stats */}
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="lg:col-span-5 relative"
             >
                 <div className="relative h-[500px] md:h-[700px] rounded-[3rem] overflow-hidden group shadow-2xl">
                     <img 
                        src="https://images.unsplash.com/photo-1621961458348-15e18cc33968?q=80&w=2574&auto=format&fit=crop" 
                        alt="PT Perintis Bermuda Perkasa Origin" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                     <div className="absolute bottom-10 left-10 text-white max-w-xs">
                         <div className="text-xs font-mono uppercase mb-2 opacity-80">{t.aboutPage.originLabel}</div>
                         <div className="text-3xl font-bold font-fun">{t.aboutPage.location.split(',')[1] || "Southeast Sulawesi"}</div>
                     </div>
                 </div>
                 {/* Floating Card */}
                 <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   whileInView={{ scale: 1, opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.3, duration: 0.6 }}
                   className="absolute -bottom-10 -right-4 md:-right-12 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 max-w-[240px]"
                 >
                     <Ship className="text-brand-500 mb-4" size={40} />
                     <p className="text-lg font-bold leading-tight">{t.aboutPage.empoweringLabel}</p>
                 </motion.div>
             </motion.div>

             {/* Right: Narrative Text */}
             <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="lg:col-span-7 pt-8 md:pt-24"
             >
                 <h3 className="text-3xl md:text-5xl font-bold leading-tight mb-10 text-zinc-900 dark:text-zinc-100 text-balance">
                     {t.aboutPage.introBold}
                 </h3>
                 <div className="text-lg md:text-xl leading-relaxed text-zinc-650 dark:text-zinc-300 space-y-8 font-light border-l border-zinc-200 dark:border-zinc-800 pl-8">
                     {t.aboutPage.introText.split('\n\n').map((paragraph, idx) => (
                         <div key={idx} className="block"><ScrollRevealText text={paragraph} /></div>
                     ))}
                 </div>
             </motion.div>
         </div>
      </div>

      {/* 3. VISION: Cinematic Experience */}
      <div className="bg-zinc-950 text-white py-32 md:py-48 relative overflow-hidden">
          {/* Abstract Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-900/40 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative px-6 md:px-12 max-w-7xl mx-auto text-center z-10"
          >
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12">
                  <Eye size={18} className="text-brand-400" />
                  <span className="text-sm font-bold uppercase tracking-widest text-brand-100">{t.aboutPage.visionTitle}</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-[1.1] text-balance font-fun">
                  "{t.aboutPage.visionText}"
              </h2>
          </motion.div>
      </div>

      {/* 4. MISSION: Creative Grid */}
      <div className="px-6 md:px-12 max-w-[95rem] mx-auto mt-24 md:mt-32 pb-24 md:pb-36">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-end gap-6 mb-16 md:mb-24 border-b border-zinc-200 dark:border-zinc-800 pb-12"
          >
              <div className="w-16 h-16 rounded-3xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 mb-4 md:mb-0">
                  <Target size={32} />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white flex-1">{t.aboutPage.missionTitle}</h2>
              <p className="md:max-w-md text-zinc-500 text-lg">Guided by principles that ensure longevity, quality, and mutual prosperity.</p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative space-y-16 md:space-y-24">
              {t.aboutPage.missionPoints.map((point, index) => {
                  const isFirst = index === 0;
                  const bgClass = index % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-zinc-100 dark:bg-zinc-800/60";
                  
                  return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: index * 0.1 }}
                        className={`
                            sticky w-full p-10 md:p-14 lg:p-16 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl transition-all duration-500 group border border-zinc-200/50 dark:border-zinc-800/80 backdrop-blur-md
                            ${isFirst ? 'bg-gradient-to-br from-brand-600 to-brand-700 dark:from-brand-900 dark:to-brand-950 text-white border-transparent' : bgClass}
                        `}
                        style={{ 
                          top: `${130 + index * 40}px`, 
                          zIndex: index + 10,
                        }}
                      >
                          <div className="flex justify-between items-center mb-8 md:mb-12">
                              <span className={`font-mono text-xl md:text-2xl font-bold ${isFirst ? 'text-brand-200/80' : 'text-brand-500 dark:text-brand-400'}`}>
                                  / 0{index + 1}
                              </span>
                              <div className={`p-4 rounded-3xl ${isFirst ? 'bg-white/15 text-white' : 'bg-brand-100/50 dark:bg-brand-900/20 text-brand-600'}`}>
                                 <Target size={24} />
                              </div>
                          </div>
                          
                          <p className={`text-2xl md:text-3.5xl lg:text-4xl font-bold leading-tight font-fun max-w-3xl ${isFirst ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                              {point}
                          </p>
                      </motion.div>
                  );
              })}
          </div>
      </div>

    </div>
  );
};

export default AboutPage;
