import React from 'react';
import { Product, Translation } from '../types';
import { 
  ArrowLeft, 
  Ship, 
  Compass, 
  ShieldCheck, 
  Users, 
  Anchor, 
  Activity, 
  Gauge, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailPageProps {
  product: Product;
  t: Translation;
  onBack: () => void;
  onInquiry: () => void;
  isDark?: boolean;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, t, onBack, onInquiry }) => {
  const isIndonesian = t.products.viewCatalog.toLowerCase().includes("lihat");

  // Custom high-fidelity operational datasets matching each specific agency type
  const getCargoDetailData = (id: string) => {
    switch (id) {
      case 'barge-chartering': // Tug & Barge Chartering
        return {
          headerTag: isIndonesian ? "PENYEWAAN KAPAL TONGKANG & TUG" : "TUG & BARGE CHARTER SOLUTIONS",
          pillarTitle: isIndonesian ? "Spesialisasi Armada & Carter Tongkang" : "Tug & Barge Fleet Specializations",
          timelineTitle: isIndonesian ? "Alur Proses Sewa Tongkang (Chartering)" : "Tug & Barge Chartering Process Flow",
          pillars: [
            {
               icon: Compass,
               title: isIndonesian ? "Pilihan Armada Sesuai Kebutuhan" : "Tailored Fleet Sizing (270ft/300ft/330ft)",
               desc: isIndonesian 
                 ? "Menyediakan sewa armada tongkang berukuran 270 kaki, 300 kaki, dan 330 kaki yang bersertifikasi Biro Klasifikasi Indonesia (BKI) untuk berbagai volume kargo."
                 : "Providing modern 270ft, 300ft, and 330ft steel deck barges certified by BKI (Biro Klasifikasi Indonesia) for varied cargo requirements."
            },
            {
               icon: Anchor,
               title: isIndonesian ? "Rute Pelayaran Komoditas Tambang" : "Strategic Mining Freight Routes",
               desc: isIndonesian 
                 ? "Mengirimkan komoditas curah seperti nikel, batu bara, bijih besi, dan pasir dari lokasi tambang ke pabrik peleburan (smelter) domestik."
                 : "Shipping mineral commodities safely from mining jetties directly to domestic smelting facilities and power plants."
            },
            {
               icon: ShieldCheck,
               title: isIndonesian ? "Opsi Sewa Fleksibel (Spot & Time Charter)" : "Flexible Spot & Time Charter Terms",
               desc: isIndonesian 
                 ? "Menawarkan skema sewa fleksibel, baik Freight Charter per rute perjalanan maupun Time Charter jangka panjang sesuai kebutuhan bisnis."
                 : "Offering versatile chartering frameworks including Freight Charter per voyage and long-term Time Charter agreements."
            }
          ],
          timeline: [
            {
               step: "01",
               title: isIndonesian ? "Negosiasi & Penawaran Sewa" : "Inquiry & Fixture Note Negotiation",
               desc: isIndonesian 
                 ? "Penyusunan jadwal angkut, verifikasi rute muat-bongkar, rincian biaya sewa, serta pembuatan Surat Perjanjian Sewa Kapal (Fixture Note)."
                 : "Drafting voyage schedules, verifying loading/discharging ports, and finalizing charter Fixture Notes."
            },
            {
               step: "02",
               title: isIndonesian ? "Pra-Pemuatan & On-Hire Survey" : "Pre-Loading & On-Hire Inspection",
               desc: isIndonesian 
                 ? "Melakukan pemeriksaan kelaikan kapal tunda dan tongkang sebelum proses loading dimulai untuk memastikan bebas kendala."
                 : "Conducting rigorous structural and fuel surveys (On-Hire) to confirm vessels are ready for action."
            },
            {
               step: "03",
               title: isIndonesian ? "Pelayaran & Pengawasan Perjalanan" : "Active Voyage Monitoring & Delivery",
               desc: isIndonesian 
                 ? "Melacak pergerakan kapal secara berkala dan memastikan cargo sampai di pelabuhan bongkar tujuan dengan aman dan tepat waktu."
                 : "Tracking fleet transit coordinates in real-time, delivering mining cargos safely to designated industrial smelters."
            }
          ]
        };
      case 'pbm-stevedoring': // Perusahaan Bongkar Muat & Stevedoring
        return {
          headerTag: isIndonesian ? "PERUSAHAAN BONGKAR MUAT (PBM)" : "CARGO HANDLING & STEVEDORING (PBM)",
          pillarTitle: isIndonesian ? "Pilar Operasional Bongkar Muat Kargo" : "Stevedoring & Cargo Operational Pillars",
          timelineTitle: isIndonesian ? "Siklus Kerja Operasional Stevedoring" : "Stevedoring Operational Work Cycle",
          pillars: [
            {
               icon: SlidersHorizontal,
               title: isIndonesian ? "Supervisi Pemuatan Curah Kering" : "Dry Bulk Loading Supervision",
               desc: isIndonesian 
                 ? "Supervisi fisik dan verifikasi berkala (Draft Survey) bersama surveyor independen untuk memastikan akurasi kargo tambang."
                 : "On-site physical draft survey coordination with independent inspectors to guarantee precise cargo weights and prevent material shortfalls."
            },
            {
               icon: Anchor,
               title: isIndonesian ? "Kecepatan Pemuatan Kargo (Loading Rate)" : "High Productivity Loading Rates",
               desc: isIndonesian 
                 ? "Memaksimalkan pemuatan kargo per hari demi kelancaran operasional kapal tambat dan menekan demurrage sekecil mungkin."
                 : "Maximizing cargo throughput daily to optimize vessel turnarounds and slash demurrage costs across all loading terminals."
            },
            {
               icon: ShieldCheck,
               title: isIndonesian ? "Kepatuhan K3 & Zero Loss" : "HSE Safety & Zero Material Loss",
               desc: isIndonesian 
                 ? "Menjamin pemuatan kargo curah berjalan dengan aman serta nihil susut material di area dermaga maupun lambung tongkang."
                 : "Ensuring high-safety loading with zero environmental spillage and zero cargo losses alongside private and public harbor docks."
            }
          ],
          timeline: [
            {
               step: "01",
               title: isIndonesian ? "Persiapan Alat Berat & Crane" : "Heavy Equipment & Crane Setup",
               desc: isIndonesian 
                 ? "Menyiapkan excavator, grab kargo, serta conveyor di dermaga pemuatan sebelum kapal sandar."
                 : "Deploying excavator units, industrial grabs, and harbor loaders prior to vessel docking."
            },
            {
               step: "02",
               title: isIndonesian ? "Operasional Pemuatan Kargo" : "Active Cargo Loading Operations",
               desc: isIndonesian 
                 ? "Melakukan bongkar muat kargo 24 jam non-stop dengan pengawasan ketat petugas lapangan PBM."
                 : "Executing 24/7 continuous stevedoring operations under tight physical supervisions."
            },
            {
               step: "03",
               title: isIndonesian ? "Survey Draft & Dokumen Kargo" : "Draft Survey & Clean Cargo Closing",
               desc: isIndonesian 
                 ? "Melakukan pengukuran akhir draft bersama tim surveyor dan menandatangani Time Sheet serta Statement of Facts."
                 : "Conducting final soundings, signing port Time Sheets, and securing official Statement of Facts."
            }
          ]
        };
      case 'shipping-agency': // Shipping & Port Agency
      default:
        return {
          headerTag: isIndonesian ? "KEAGENAN KAPAL & PORT SERVICES" : "SHIPPING AGENCY & PORT SERVICES",
          pillarTitle: isIndonesian ? "Pilar Operasional Keagenan Kapal" : "Shipping Agency Operational Pillars",
          timelineTitle: isIndonesian ? "Alur Proses Clearance In & Out" : "Port Clearance In & Out Process Flow",
          pillars: [
            {
               icon: Users,
               title: isIndonesian ? "Manajemen Pergantian Awak Kapal (Crew Change)" : "Crew Substitution & Medicals",
               desc: isIndonesian 
                 ? "Layanan terpadu koordinasi penjemputan awak kapal asing dan lokal, penjaminan dokumen Imigrasi (Calling Visa), karantina KKP, hingga transportasi darat yang terjadwal."
                 : "Formulating safe, accredited crew rotations via direct immi clearance counters (Calling Visa), port clinical tests, and secure sea-to-shore transfers."
            },
            {
               icon: Gauge,
               title: isIndonesian ? "Penyediaan Air Bersih & Bahan Bakar" : "Bunkering & Provision Supply",
               desc: isIndonesian 
                 ? "Pengadaan air tawar murni kualitas standar industri, bahan bakar laut (MDF/MGO), serta ketentuan perbekalan darurat kru langsung di tengah laut (offshore anchorage)."
                 : "Sourcing premium drinking water supplies, marine gas oil (MGO) bunkering, and dry food provisions straight to offshore deepwater anchor berths."
            },
            {
               icon: SlidersHorizontal,
               title: isIndonesian ? "Penanganan CTM (Cash-to-Master)" : "Verified Cash-To-Master Execution",
               desc: isIndonesian 
                 ? "Pengiriman dana tunai operasional darurat nahkoda secara resmi, aman, transparan dengan tanda terima kepabeanan yang tercatat utuh di dalam pelaporan pembiayaan."
                 : "Executing highly secure physical cash deliveries to vessel captains, complete with customs reporting audits and real-time disbursement receipts."
            }
          ],
          timeline: [
            {
               step: "01",
               title: isIndonesian ? "CIQP Terpadu Pra-Labuh" : "Integrated CIQP Pre-Arrival Audit",
               desc: isIndonesian 
                 ? "Sinkronisasi pra-kedatangan terpadu bersama tim Bea Cukai, Imigrasi, Karantina Kesehatan, serta Pihak Otoritas Pelabuhan demi kelancaran ijin bebas hambatan."
                 : "Full pre-arrival alignment with Customs, Immigration, Quarantine, and Port Health departments to guarantee non-stop incoming clearance."
            },
            {
               step: "02",
               title: isIndonesian ? "Pemeriksaan Karantina Sehat & Bea Cukai" : "Onboard Health Clearances & Manifest Filing",
               desc: isIndonesian 
                 ? "Penerbitan status Bebas Karantina KKP serta pelaporan manifes Bea Cukai (BC 1.1) tepat waktu guna menghindari denda administratif kepabeanan."
                 : "Obtaining instant harbor sanitation declarations from Port Health authorities and filing initial customs imports manifests (BC 1.1) to block late-fee penalties."
            },
            {
               step: "03",
               title: isIndonesian ? "Berth Allocation & Pemanduan Sandar" : "Dock Allocation & Vessel Lay-Day Control",
               desc: isIndonesian 
                 ? "Penyediaan kapal pandu (Pilot Boat) laut lepas untuk mengawal sandar kapal kelas Supramax/Panamax di conveyor belt smelter industri."
                 : "Deploying high-power harbor tugboats and pilot crews to dock giant Supramax/Panamax carriers alongside industrial smelter conveyor bays."
            }
          ]
        };
    }
  };

  const detailedData = getCargoDetailData(product.id);

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-[95rem] mx-auto min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
      
      {/* Back to Catalog Catalog Navigation Button */}
      <div className="max-w-7xl mx-auto mb-10">
        <motion.button 
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-brand-500 dark:hover:text-brand-400 transition-all group font-mono text-xs uppercase tracking-widest bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 px-6 py-3.5 rounded-full shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{t.products.viewCatalog}</span>
        </motion.button>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Main Title Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-24">
          
          {/* Left Column: Premium Visual Cover */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.96 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.7 }}
             className="lg:col-span-5 relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] group w-full border border-zinc-200 dark:border-zinc-800"
           >
             <img 
               src={product.image} 
               alt={product.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85"></div>
             
             {/* Category floating header */}
             <div className="absolute top-6 left-6">
               <span className="bg-brand-500 text-white text-[10px] font-mono font-bold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-md">
                 {detailedData.headerTag}
               </span>
             </div>

             <div className="absolute bottom-8 left-8 right-8">
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wide uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
             </div>
          </motion.div>

          {/* Right Column: Hero Information */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
             <div className="mb-8">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-brand-500 uppercase tracking-widest mb-4 font-semibold">
                   <Activity size={12} />
                   <span>PT Perintis Bermuda Perkasa</span>
                </div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white leading-[1.1] tracking-tight font-fun"
                >
                  {product.title}
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-lg md:text-xl text-zinc-650 dark:text-zinc-300 leading-relaxed pr-2 font-light text-balance mb-8"
                >
                  {product.description}
                </motion.p>
             </div>



             {/* Dynamic Core Action Buttons */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="flex flex-col sm:flex-row gap-4"
             >
                <button 
                  onClick={onInquiry}
                  className="w-full py-4.5 bg-brand-500 hover:bg-brand-600 text-white rounded-full text-base font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/25 transition-all hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-2 select-none"
                >
                  <Ship size={18} />
                  <span>{t.clientForm.submit}</span>
                </button>
             </motion.div>
          </div>
        </div>

        {/* HIGH-FIDELITY OPERATIONS & PORT CLEARANCE SPECIFICATIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 pt-16 border-t border-zinc-200 dark:border-zinc-800">
           
           {/* Section 1: Strategic Operational Pillars - Bento design */}
           <div>
              <div className="mb-10">
                 <span className="text-xs font-mono font-bold text-brand-500 uppercase tracking-widest block mb-4">
                    {isIndonesian ? "STRATEGI OPERASI LAPANGAN" : "FIELD ACTION EFFICIENCIES"}
                 </span>
                 <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight font-fun">
                    {detailedData.pillarTitle}
                 </h2>
              </div>

              <div className="space-y-6">
                 {detailedData.pillars.map((pillar, i) => {
                    const IconComponent = pillar.icon;
                    return (
                       <div 
                          key={i} 
                          className="flex gap-5 p-6 rounded-2.5xl bg-white dark:bg-zinc-900/30 border border-zinc-200/80 dark:border-zinc-800/80 transition-all hover:border-zinc-300 dark:hover:border-zinc-700/80"
                       >
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500/10 dark:bg-brand-500/15 text-brand-500 shrink-0 border border-brand-500/20 shadow-sm">
                             <IconComponent size={22} />
                          </div>
                          <div>
                             <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                                {pillar.title}
                             </h3>
                             <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
                                {pillar.desc}
                             </p>
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>

           {/* Section 2: Step-by-Step Port Clearance Timeline */}
           <div className="bg-zinc-100 dark:bg-zinc-950 p-8 md:p-10 rounded-[2.5rem] border border-zinc-200/80 dark:border-zinc-800/80">
              <div className="mb-12">
                 <span className="text-xs font-mono font-bold text-brand-500 uppercase tracking-widest block mb-4">
                    {isIndonesian ? "KONEKTIVITAS REGULASI MARITIM" : "REGULATORY COMPLIANCE ROADMAP"}
                 </span>
                 <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight font-fun">
                    {detailedData.timelineTitle}
                 </h2>
              </div>

              <div className="relative border-l border-zinc-250 dark:border-zinc-800 pl-6 space-y-10">
                 {detailedData.timeline.map((step, i) => (
                    <div key={i} className="relative group">
                       
                       {/* Floating Number dot */}
                       <div className="absolute -left-[35px] top-0 w-4 h-4 rounded-full bg-brand-500 border-4 border-zinc-100 dark:border-zinc-950 flex items-center justify-center transition-transform duration-300 group-hover:scale-125 shadow-sm shadow-brand-500/20" />
                       
                       <div className="mb-2 flex items-center gap-3">
                          <span className="text-xs font-mono font-semibold text-brand-500 bg-brand-500/10 dark:bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                             {isIndonesian ? "FASE" : "STAGE"} {step.step}
                          </span>
                          <ChevronRight size={14} className="text-zinc-350 dark:text-zinc-600" />
                       </div>
                       
                       <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">
                          {step.title}
                       </h3>
                       <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
                          {step.desc}
                       </p>
                    </div>
                 ))}
              </div>
           </div>

        </div>

        {/* Bottom micro branding message */}
        <div className="mt-20 border-t border-zinc-200 dark:border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-450 dark:text-zinc-500 gap-4">
           <span>{isIndonesian ? "Sistem Integrasi Port Clearance PBP v2" : "PBP Port Clearance Integration Line v2"}</span>
           <span>&copy; PT Perintis Bermuda Perkasa</span>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
