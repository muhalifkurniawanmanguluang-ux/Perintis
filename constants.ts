import { Product, Translation, Language } from './types';

// --- 1. LANGUAGE CONFIGURATION ---
export const LANG_CONFIG: Record<Language, { label: string; flag: string }> = {
  EN: { label: 'English', flag: '🇺🇸' },
  ID: { label: 'Indonesia', flag: '🇮🇩' },
};

// --- 2. BASE PRODUCT DATA & TRANSLATION ---
export const PRODUCTS: Record<Language, Product[]> = {
  EN: [
    {
      id: 'shipping-agency',
      title: 'Shipping & Port Agency Services',
      description: 'Fully licensed general shipping agency providing seamless port clearances (CIQP), ship husbandry, crew change orchestration, freshwater/bunkering support, and round-the-clock vessel attendance across Indonesian terminal facilities.',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=2574&auto=format&fit=crop',
      tags: ['Licensed AL-Agen', 'Full Husbandry', '24/7 Dispatch'],
      specs: [
        { name: 'Average Turnaround', value: 24, standard: 36, unit: 'hrs', type: 'count' },
        { name: 'Clearance Accuracy', value: 100, standard: 98, unit: '%', type: 'percentage' },
        { name: 'Daily Reports Rate', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Active Port Network', value: 15, standard: 10, unit: 'ports', type: 'count' },
      ],
    },
    {
      id: 'pbm-stevedoring',
      title: 'Cargo Handling & Stevedoring (PBM)',
      description: 'Professional cargo terminal operations (Perusahaan Bongkar Muat). Specializing in efficient stevedoring, cargodoring, receiving, and delivery for dry bulk minerals (coal, nickel ore, silica sand), clinker, cement, and general industrial cargo.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2574&auto=format&fit=crop',
      tags: ['Bulk Stevedoring', 'Heavy Gear Handling', 'Zero-Loss Goal'],
      specs: [
        { name: 'Average Handling Rate', value: 8500, standard: 7500, unit: 't/day', type: 'count' },
        { name: 'Supervision Presence', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Cargo Defect Rate', value: 0, standard: 0.1, unit: '%', type: 'percentage' },
        { name: 'Heavy Equipment Ready', value: 100, standard: 100, unit: '%', type: 'percentage' },
      ],
    },
  ],
  ID: [
    {
      id: 'shipping-agency',
      title: 'Layanan Keagenan Kapal (Shipping Agency)',
      description: 'Layanan keagenan kapal umum berizin resmi (AL-Agen). Mengurus kelancaran port clearances (CIQP), ship husbandry, pergantian kru (crew change), bunkering air tawar, serta pendampingan kapal penuh 24/7 di seluruh pelabuhan utama Indonesia.',
      image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=2574&auto=format&fit=crop',
      tags: ['Izin Resmi AL-Agen', 'Pelayanan Penuh', 'Siaga 24/7'],
      specs: [
        { name: 'Waktu Bongkar-Muat', value: 24, standard: 36, unit: 'jam', type: 'count' },
        { name: 'Akurasi Clearance', value: 100, standard: 98, unit: '%', type: 'percentage' },
        { name: 'Laporan Berkala', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Jaringan Pelabuhan', value: 15, standard: 10, unit: 'lokasi', type: 'count' },
      ],
    },
    {
      id: 'pbm-stevedoring',
      title: 'Bongkar Muat Kargo & Stevedoring (PBM)',
      description: 'Operasional bongkar muat kargo profesional (Perusahaan Bongkar Muat). Menangani stevedoring, cargodoring, receiving, dan delivery untuk komoditas pertambangan curah kering (batu bara, nikel, pasir kuarsa), semen, clinker, hingga general cargo.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=2574&auto=format&fit=crop',
      tags: ['Bongkar Muat Curah', 'Pemuatan Cepat', 'Zero-Loss Kargo'],
      specs: [
        { name: 'Laju Bongkar Muat', value: 8500, standard: 7500, unit: 'ton/hari', type: 'count' },
        { name: 'Pengawasan Lapangan', value: 100, standard: 100, unit: '%', type: 'percentage' },
        { name: 'Rasio Klaim Rusak', value: 0, standard: 0.1, unit: '%', type: 'percentage' },
        { name: 'Kesiapan Alat Berat', value: 100, standard: 100, unit: '%', type: 'percentage' },
      ],
    },
  ],
};

// --- 3. FULL UI TRANSLATIONS ---
export const TRANSLATIONS: Record<Language, Translation> = {
  EN: {
    nav: {
      home: "Home",
      whyChooseUs: "Why Us",
      services: "Services",
      products: "Business Lines",
      sustainability: "Compliance",
      traceability: "Operational Flow",
      contact: "Contact",
      client: "Client Portal",
      about: "About Us",
      themeSettings: "Theme Settings",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      selectLanguage: "Language"
    },
    hero: {
      badge: "Licensed Port Agency & PBM",
      titleLine1: "Your Trusted Partner for",
      titleLine2: "Port Agency & PBM",
      subtitle: "Providing fully-integrated shipping agency solutions and professional cargo handling (PBM/stevedoring) to ensure timely maritime logistics across Indonesia.",
      ctaPrimary: "View Services Catalog",
      ctaSecondary: "Contact Port Agent",
      currentVol: "Agency Operations Active"
    },
    marquee: "PT PERINTIS BERMUDA PERKASA • RELIABLE • PROFESSIONAL • COMPLIANT • EFFICIENT • TRANSPARENT • ",
    stats: {
      farmers: "Vessels Serviced",
      countries: "Ports Under Service",
      shipping: "Total Cargo Handled (Tons)"
    },
    whyChooseUs: {
      title: "Why PT Perintis Bermuda Perkasa?",
      subtitle: "Our local team manages shipping workflows, regulatory procedures, port health, crew assistance, and cargo coordination, ensuring seamless operations for your fleet.",
      heading: "Our Key Advantages",
      reasons: [
        {
          title: "24/7 Port Coordination",
          desc: "Around-the-clock Support",
          detail: "Our port agents monitor vessel operations 24/7, expediting berthing clearances and terminal services without delay."
        },
        {
          title: "Financial Transparency",
          desc: "Detailed Proforma D/As",
          detail: "Every Proforma D/A is fully itemized and transparent. We operate with high financial ethics and no hidden charges."
        },
        {
          title: "Regulatory Compliance",
          desc: "CIQP Clearance Authority",
          detail: "We maintain strong relations and direct compliance with Customs, Immigration, and Port Health authorities to ensure smooth vessel clearances."
        },
        {
          title: "Express Sailing Permits",
          desc: "Fast SPB Processing",
          detail: "Our deep knowledge of local port regulations helps expedite Sailing Permits (SPB) and vessel allocation services in a timely manner."
        },
        {
          title: "Reliable Ship Husbandry",
          desc: "Provisions & Supply Management",
          detail: "Prompt supply of certified fresh water, provisions, marine fuel (bunkering), and spare parts coordination at port anchorage coordinates."
        },
        {
          title: "Strategic Regional Base",
          desc: "Direct Access in Kendari",
          detail: "Headquartered in Kendari, Southeast Sulawesi, we provide direct husbanding access for vessels loading coal, nickel, and iron ore."
        }
      ],
      comparison: {
        tag: "Operational Integration",
        title: "Efficient Vessel Operations",
        subtitle: "Minimizing waiting times and administrative bottlenecks in Indonesian territorial waters for robust supply lines.",
        directImpact: "Inbound & Outbound Clearances",
        farmer: "Vessel Clearance",
        farmerDesc: "Coordinating with Syahbandar, Customs, and Immigration authorities",
        hub: "Local Operations Center",
        hubDesc: "Real-time communication, weather reports, and draft inspections",
        buyer: "Indonesian Smelters & Terminals",
        buyerDesc: "Timely delivery and optimized cargo handling procedures",
        statTraceable: "Quick Port Turnaround",
        statMiddlemen: "Reduced Idle Hours"
      },
      visual: {
        moisture: "Operational Activity Index",
        grading: "Pre-arrival Safety Match",
        packaging: "Agent Years of Service"
      },
      learnMore: "Vessel Checklist"
    },
    services: {
      title: "Our Ship Agency Services",
      subtitle: "Providing safe berth bookings, crew transfers, fueling, and CIQP clearances across major Indonesian hubs.",
      items: [
        {
          title: "Clearance In and Out",
          desc: "Managing vessel arrival and departure clearances with local port authorities, Customs, Immigration, and Quarantine (CIQP).",
          features: ["CIQP Port Clearance", "Official Port Authorities Coordination"]
        },
        {
          title: "Vessel Operations and Berthing",
          desc: "Booking berths, pilot ships, and tugboats to ensure safe vessel berthing and unberthing.",
          features: ["Berth & Tugboat Booking", "Senior Pilotage Support"]
        },
        {
          title: "Logistics and Chandlery",
          desc: "Supplying daily vessel needs such as provisions, fresh water, spare parts, and other ship equipment.",
          features: ["Fresh Provisions & Water", "Engine & Deck Spare Parts"]
        },
        {
          title: "Bunkering Services",
          desc: "Arranging prompt refueling of marine fuel oils and lubricants for vessel compliance and power.",
          features: ["Refueling & Lubricating Oils", "Quality Assurance Compliance"]
        },
        {
          title: "Crew Management (Crewing/Husbandry)",
          desc: "Handling crew changes, visa documentation, airport transfers, accommodation, and immediate medical help with local hospitals.",
          features: ["Seamless Crew Change", "Visa & Medical Support"]
        },
        {
          title: "Stevedoring & Cargo Handling (PBM)",
          desc: "Direct stevedoring, cargodoring, and terminal operations for dry bulk mining ores, minerals, clinker, cement, and industrial cargoes.",
          features: ["Stevedoring & Cargodoring", "Bulk Cargo Operations Specialist"]
        }
      ]
    },
    products: {
      title: "Our Core Business Lines",
      subtitle: "We offer professional ship agency representation, reliable cargo handling (PBM), and high-capacity barge chartering.",
      viewCatalog: "View Business Details"
    },
    catalogPage: {
      title: "Standard Vessel Capability Specs",
      subtitle: "We manage port logistics, draft limits, and payload calculations across multiple vessel types.",
      backToHome: "Return to Home"
    },
    sustainability: {
      title: "Regulatory Compliance & Standards",
      subtitle: "PT Perintis Bermuda Perkasa is fully licensed and compliant with national maritime regulations and international safety guidelines.",
      tagline: "Safety First",
      cards: [
        { title: "BKI Certified", value: "100%", desc: "Full compliance with BKI and national safety standards." },
        { title: "Clearance Record", value: "0 incident", desc: "No quarantine or customs infractions." },
        { title: "Efficiency Index", value: "98%", desc: "Optimal berthing times with zero unnecessary delays." }
      ],
      metrics: [
        { label: "Vessels Serviced", value: "480+" },
        { label: "Water Safety Level", value: "1.0 Perfect" },
        { label: "Certified Port Crew", value: "100%" }
      ]
    },
    specs: {
      title: "Vessel Suitability Limits",
      analysisLabel: "Business Line Capabilities & Parameters",
      grade: "Licensed Shipping Agency (AL-Agen)"
    },
    traceability: {
      title: "Step-by-Step Port Clearance Flow",
      subtitle: "Our streamlined workflow guarantees that all clearances are handled sequentially and smoothly.",
      steps: {
        farm: "Pre-Arrival Notifications (72 Hours Before)",
        process: "Port Entry & Pilotage Booking",
        qc: "Terminal Loading / Discharging Supervision",
        export: "Sailing Permit (SPB) Approval"
      }
    },
    clientForm: {
      title: "Request Agent Nomination",
      subtitle: "Kindly provide your vessel parameters below to obtain a Proforma D/A and agency proposal.",
      name: "Vessel Owner / Operator Name",
      origin: "Arrival / Departure Port Location",
      whatsapp: "Operational Representative WhatsApp",
      email: "Inquiry Contact Email",
      product: "Services / Service Interest",
      submit: "Send Proforma D/A Inquiry",
      successMsg: "Thank you. Your inquiry has been transmitted successfully."
    },
    inquiry: {
      title: "Need a professional port representative?",
      subtitle: "Receive a detailed Proforma D/A within 24 business hours.",
      namePlaceholder: "Company Name",
      emailPlaceholder: "Business Email",
      productLabel: "Servicable Ship Type",
      submitBtn: "Request Proforma D/A"
    },
    cookieConsent: {
      text: "We use cookies to improve your browsing experience on our website.",
      accept: "Accept Cookies",
      decline: "Decline"
    },
    footer: {
      ctaPrefix: "Let's align",
      ctaHighlight: "your shipping logistics.",
      startSourcing: "Request Proforma D/A",
      exploreLabel: "[ Navigation Directory ]",
      connectLabel: "[ Communication ]",
      officeLabel: "[ Head Office ]",
      tagline: "Your trusted ship agency partner connecting Indonesian cargo trades with reliable, compliant port hub solutions.",
      addressTitle: "Headquarters",
      address: "Perumahan Kendari Indah Blok F/7\nKendari, Sulawesi Tenggara, Indonesia",
      contactTitle: "Business Contacts",
      legalTitle: "Information & Compliance",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Settings",
      systemStatus: "Agency Operations Active",
      rights: "PT Perintis Bermuda Perkasa.",
      rightsReserved: "All rights reserved.",
      worldClock: {
        wita: "Kendari Base (WITA)",
        wit: "Maluku Base (WIT)",
        wib: "Jakarta HQ (WIB)"
      }
    },
    aboutPage: {
      tagline: "About the Company",
      location: "Kendari Base Office, Southeast Sulawesi",
      introBold: "PT Perintis Bermuda Perkasa is a fully licensed Shipping Agency and Stevedoring Company (PBM) handling complete cargo logistics and vessel clearances in Indonesia.",
      introText: "Our local team manages complete shipping agency procedures for domestic and international shipowners, professional dry bulk cargo handling (PBM/stevedoring) services, crew transitions, and fresh provisions supply. We prioritize operational safety, efficiency, and speed above all.",
      visionTitle: "Our Vision",
      visionText: "To be the most reliable, compliant, and efficient general shipping agency and cargo handling (PBM) partner in Indonesian maritime logistics.",
      missionTitle: "Our Mission",
      missionPoints: [
        "Minimizing port idle hours through proactive communication with local authorities.",
        "Achieving flawless compliance with Indonesian Customs, Immigration, and Quarantine procedures.",
        "Ensuring vessel crew welfare and captain demands are handled directly and safely.",
        "Delivering transparent and competitive Proforma D/A calculations."
      ],
      imageDesc: "Standard marine docking.",
      originLabel: "Bases of Operation",
      empoweringLabel: "Supporting Ship Operations",
      exportStandardLabel: "BKI Vessel Safety Compliance"
    },
    privacyPage: {
      lastUpdated: "May 2026",
      introTitle: "Privacy Policy & Disclosure",
      introText: "We handle your business coordinates and ship specifications with high confidentiality.",
      collectTitle: "Information We Process",
      collectText: "To draft a correct Proforma D/A, we collect standard voyage details such as:",
      collectList: [
        { title: "Vessel Parameters", desc: "Vessel size, draft, loading/discharging rates, port coordinates, and timeline." }
      ],
      useTitle: "Operational Usage",
      useText: "Data is strictly processed to initiate and fulfill agency coordinates:",
      useList: [
        "Filing harbor clearances with state port authorities.",
        "Preparing official manifest reports and harbor master records."
      ],
      securityTitle: "Security",
      securityText: "We follow strict guidelines and use encrypted communication channels to prevent information leakage.",
      contactTitle: "Contact Shipping Hub",
      contactText: "Direct coordinate inquiries to legal@perintisbermuda.co.id."
    },
    termsPage: {
      effectiveDate: "May 2026",
      agreementTitle: "Standard Ship Agency Terms",
      agreementText: "All general shipping appointments are subject to the regulations of the Indonesian Ministry of Transportation and standard agency service agreements.",
      ipTitle: "Intellectual Property",
      ipText: "All visual media, layouts, and textual content on this website are owned by PT Perintis Bermuda Perkasa.",
      userRepTitle: "Principal Understandings",
      userRepText: "Vessel operators must provide correct certificates, safe load declarations, and prompt advance deposits for the agreed Proforma D/A.",
      productsTitle: "Force Majeure",
      productsText1: "Agency actions are provided in good faith and with professional diligence.",
      productsText2: "Delays caused by extreme weather, port congestion, or state authority checks are subject to standard force majeure clauses.",
      lawTitle: "Governing Law",
      lawText: "These terms are governed and construed in accordance with the laws of the Republic of Indonesia."
    }
  },
  ID: {
    nav: {
      home: "Beranda",
      whyChooseUs: "Keunggulan Kami",
      services: "Layanan Kami",
      products: "Lini Bisnis",
      sustainability: "Kepatuhan",
      traceability: "Alur Operasional",
      contact: "Hubungi Kami",
      client: "Portal Klien",
      about: "Tentang Kami",
      themeSettings: "Tema",
      lightMode: "Terang",
      darkMode: "Gelap",
      selectLanguage: "Bahasa"
    },
    hero: {
      badge: "Keagenan Kapal & PBM Resmi",
      titleLine1: "Partner Terpercaya untuk",
      titleLine2: "Keagenan Kapal & PBM",
      subtitle: "Menghadirkan layanan keagenan kapal umum (AL-Agen) serta jasa bongkar muat kargo (PBM / stevedoring) terpercaya secara cepat, aman, dan patuh hukum pelayaran.",
      ctaPrimary: "Lihat Katalog Layanan",
      ctaSecondary: "Hubungi Agen Pelabuhan",
      currentVol: "Keagenan Aktif"
    },
    marquee: "PT PERINTIS BERMUDA PERKASA • PROFESIONAL • TERPERCAYA • PATUH RESMI • ANDAL • TRANSPARAN • ",
    stats: {
      farmers: "Kapal yang Dilayani",
      countries: "Pelabuhan yang Dilayani",
      shipping: "Kargo yang Dikelola (Ton)"
    },
    whyChooseUs: {
      title: "Mengapa PT Perintis Bermuda Perkasa?",
      subtitle: "Kami tidak sekadar mengurus administrasi di pelabuhan. Tim lokal kami mengawal langsung kelaikan pelayaran, pengurusan instansi terkait, dan penyediaan perbekalan kapal Anda.",
      heading: "Kelebihan Kami",
      reasons: [
        {
          title: "Koordinasi Pelabuhan 24/7",
          desc: "Agen Siaga di Lapangan",
          detail: "Petugas lapangan kami siaga 24 jam memantau aktivitas dermaga, draf pasang surut, dan kelancaran tambat kapal."
        },
        {
          title: "Transparansi Biaya Penuh",
          desc: "Rincian Biaya yang Akurat",
          detail: "Penyusunan Proforma D/A disajikan secara terperinci tanpa ada penambahan biaya tidak wajar atau biaya yang tidak terduga di luar koordinasi."
        },
        {
          title: "Kepatuhan Aturan Hukum",
          desc: "Pengurusan Instansi CIQP",
          detail: "Kepatuhan penuh pada protokol Bea Cukai, Imigrasi, Karantina, dan Syahbandar memastikan kelancaran operasional kapal tanpa hambatan."
        },
        {
          title: "Pengurusan SPB Cepat",
          desc: "Penerbitan Surat Persetujuan Berlayar",
          detail: "Pengalaman lapangan yang mendalam mempermudah proses alokasi pandu tunda pelabuhan serta mempercepat terbitnya Surat Persetujuan Berlayar."
        },
        {
          title: "Layanan Perbekalan & Logistik",
          desc: "Pasokan Air Bersih & Bahan Bakar",
          detail: "Pemasokan air tawar bersertifikat, bahan pokok kru kapal, pelumas mesin, serta suku cadang secara langsung di area anchorage."
        },
        {
          title: "Basis Operasional di Kendari",
          desc: "Menghubungkan Jalur Tambang",
          detail: "Berbasis utama di Kendari, Sulawesi Tenggara untuk melayani kapal pengangkut batu bara, nikel, dan hasil tambang di Sulawesi dan sekitarnya."
        }
      ],
      comparison: {
        tag: "Integrasi Operasional",
        title: "Kelancaran Keagenan Kapal",
        subtitle: "Meminimalkan waktu tunggu draf administrasi dan kendala teknis sandar kapal di perairan Indonesia.",
        directImpact: "Proses Masuk & Keluar Pelabuhan",
        farmer: "Clearance Dokumen",
        farmerDesc: "Koordinasi intensif dengan Bea Cukai, Syahbandar, Imigrasi & Karantina Kesehatan Pelabuhan",
        hub: "Kantor Koordinasi Lokal",
        hubDesc: "Komunikasi radio, pemantauan cuaca, dan laporan harian kapal dari lapangan",
        buyer: "Dermaga Tambangan Industri",
        buyerDesc: "Pemuatan kargo yang efisien dan sandar kapal yang aman",
        statTraceable: "Waktu Tambat Efisien",
        statMiddlemen: "Pengurangan Waktu Idle"
      },
      visual: {
        moisture: "Indeks Kesiapan Keagenan",
        grading: "Kepatuhan Keselamatan Pra-Kedatangan",
        packaging: "Pengalaman Agen Lapangan (Tahun)"
      },
      learnMore: "Daftar Persyaratan Kapal"
    },
    services: {
      title: "Layanan Keagenan Kapal",
      subtitle: "Menangani pengurusan izin pelabuhan, logistik, pengisian bahan bakar, dan kebutuhan kru di seluruh pelabuhan utama Indonesia.",
      items: [
        {
          title: "Clearance In dan Out",
          desc: "Mengurus perizinan kedatangan dan keberangkatan kapal dengan otoritas pelabuhan setempat, Bea Cukai (Customs), Imigrasi, dan Karantina (CIQP).",
          features: ["Izin Masuk & Keluar CIQP", "Koordinasi Otoritas Pelabuhan Resmi"]
        },
        {
          title: "Operasional dan Sandar Kapal",
          desc: "Memesan dermaga, kapal pandu (pilot), dan kapal tunda (tugboat) agar kapal dapat bersandar dan lepas sandar dengan aman.",
          features: ["Pemesanan Dermaga & Tunda", "Panduan Navigasi Senior"]
        },
        {
          title: "Logistik dan Perbekalan (Chandlery)",
          desc: "Memasok kebutuhan harian kapal, seperti bahan makanan (provision), air tawar, suku cadang (spare parts), dan perlengkapan kapal lainnya.",
          features: ["Bahan Makanan & Air Bersih", "Suku Cadang Deck & Mesin"]
        },
        {
          title: "Bunkering",
          desc: "Mengatur pengisian bahan bakar bermutu tinggi dan minyak pelumas kapal sesuai kepatuhan waktu and regulasi.",
          features: ["Pengisian Bahan Bakar Cair", "Minyak Pelumas Kapal Standar"]
        },
        {
          title: "Manajemen Kru (Crewing/Husbandry)",
          desc: "Mengurus pergantian kru kapal (crew change), dokumen visa, transportasi dari/ke bandara, akomodasi, serta bantuan medis jika ada kru yang sakit.",
          features: ["Pergantian Kru Lancar & Cepat", "Sertifikat VAK & Layanan Medis"]
        },
        {
          title: "Jasa Bongkar Muat Kargo (PBM)",
          desc: "Layanan stevedoring, cargodoring, receiving, dan delivery untuk komoditas tambang mineral curah, batu bara, semen, serta kargo industri.",
          features: ["Bongkar Muat & Stevedoring", "Keamanan & Pengawasan Susut Kargo"]
        }
      ]
    },
    products: {
      title: "Lini Bisnis Utama Kami",
      subtitle: "Kami menghadirkan layanan keagenan kapal umum, operasional bongkar muat kargo (PBM) profesional, serta penyewaan kapal tongkang premium.",
      viewCatalog: "Lihat Detail Bisnis"
    },
    catalogPage: {
      title: "Spesifikasi Kemampuan & Parameter Kapal",
      subtitle: "Kami merancang standar penanganan yang ketat dan efisien untuk memandu keselamatan logistik kapal Anda.",
      backToHome: "Kembali ke Beranda"
    },
    sustainability: {
      title: "Standar Keamanan & Kepatuhan Regulasi",
      subtitle: "PT Perintis Bermuda Perkasa menjunjung kepatuhan hukum setinggi 100% pada aturan pelayaran nasional dan kenyamanan lingkungan laut.",
      tagline: "Utamakan Keselamatan",
      cards: [
        { title: "Tersertifikasi BKI", value: "100%", desc: "Kepatuhan penuh pada aturan Biro Klasifikasi Indonesia dan Syahbandar." },
        { title: "Bebas Masalah Hukum", value: "0 insiden", desc: "Tidak ada sanksi administratif, karantina kapal, atau penahanan dokumen." },
        { title: "Efisiensi Sandar", value: "98%", desc: "Proses sandar yang cepat dengan draf navigasi yang akurat." }
      ],
      metrics: [
        { label: "Armada yang Dilayani", value: "480+" },
        { label: "Indeks Keamanan Air", value: "1.0 Sempurna" },
        { label: "Petugas Port Bersertifikat", value: "100%" }
      ]
    },
    specs: {
      title: "Batas Kemampuan Dermaga & Kapal",
      analysisLabel: "Analisis Kapabilitas Lini Bisnis",
      grade: "Layanan Keagenan Kapal Resmi Berizin (AL-Agen)"
    },
    traceability: {
      title: "Alur Pengurusan Izin Masuk & Keluar",
      subtitle: "Langkah koordinasi sistematis untuk melindungi jalannya pelayaran kapal Anda sejak awal penunjukan agen.",
      steps: {
        farm: "Notifikasi Rencana Tiba (72 Jam Pra-Kedatangan)",
        process: "Izin Masuk & Pemesanan Kapal Tunda",
        qc: "Pengawasan Bongkar Muat & Terminal",
        export: "Clearance Keluar & Terbit Surat Izin SPB"
      }
    },
    clientForm: {
      title: "Formulir Layanan Keagenan",
      subtitle: "Lengkapi data kapal Anda untuk mendapatkan estimasi Proforma D/A resmi serta penawaran tertulis.",
      name: "Nama Perusahaan Pemilik / Operator Kapal",
      origin: "Koordinat Pelabuhan Tujuan",
      whatsapp: "Nomor WhatsApp Kontak Operasional",
      email: "Alamat Email Bisnis",
      product: "Layanan yang Dibutuhkan",
      submit: "Ajukan Estimasi Proforma D/A",
      successMsg: "Formulir berhasil terkirim. Petugas kami akan segera menghubungi Anda."
    },
    inquiry: {
      title: "Hubungi Agen Pelabuhan Profesional",
      subtitle: "Dapatkan rincian Proforma D/A dalam waktu 24 jam.",
      namePlaceholder: "Nama Perusahaan",
      emailPlaceholder: "Alamat Email",
      productLabel: "Spesifikasi Jenis Kapal",
      submitBtn: "Minta Penawaran Proforma D/A"
    },
    cookieConsent: {
      text: "Kami menggunakan cookies untuk meningkatkan kenyamanan Anda menelusuri website kami.",
      accept: "Setujui",
      decline: "Tolak"
    },
    footer: {
      ctaPrefix: "Konsultasikan",
      ctaHighlight: "Kebutuhan Maritim Anda.",
      startSourcing: "Minta Penawaran D/A",
      exploreLabel: "[ Direktori Navigasi ]",
      connectLabel: "[ Hubungi Hub Kami ]",
      officeLabel: "[ Kantor Pusat ]",
      tagline: "Menghubungkan rantai transportasi mineral tanah air dengan layanan keagenan kapal yang loyal, andal, dan patuh hukum maritim.",
      addressTitle: "Kantor Pusat",
      address: "Perumahan Kendari Indah Blok F/7\nKendari, Sulawesi Tenggara, Indonesia",
      contactTitle: "Hubungi Kami",
      legalTitle: "Kepatuhan Hukum Maritim",
      privacy: "Kebijakan Privasi",
      terms: "Syarat & Ketentuan Pengangkutan",
      cookies: "Pengaturan Cookie",
      systemStatus: "Sistem Pelacak Armada Online",
      rights: "PT Perintis Bermuda Perkasa.",
      rightsReserved: "Hak cipta dilindungi undang-undang.",
      worldClock: {
        wita: "WITA Kendari",
        wit: "WIT Maluku",
        wib: "WIB Jakarta"
      }
    },
    aboutPage: {
      tagline: "Profil Perusahaan",
      location: "Kendari Base Office, Sulawesi Tenggara",
      introBold: "PT Perintis Bermuda Perkasa adalah perusahaan Keagenan Kapal Umum (Shipping Agency) dan Perusahaan Bongkar Muat (PBM) berlisensi resmi yang melayani logistik kargo dan kelaikan pelayaran kapal di Indonesia.",
      introText: "Kami bertindak sebagai mitra tepercaya bagi pemilik kargo dan armada kapal. Mengawal langsung penanganan bongkar muat kargo tambang (nikel, batu bara, pasir) dan general kargo secara aman, pengurusan perizinan masuk-keluar pelabuhan (port clearance) dengan instansi terkait, serta pergantian kru secara presisi.",
      visionTitle: "Visi Kami",
      visionText: "Menjadi keagenan kapal umum dan perusahaan bongkar muat (PBM) terdepan yang paling andal, patuh regulasi, dan berkinerja efisien di pelabuhan utama Indonesia.",
      missionTitle: "Misi Utama Keagenan",
      missionPoints: [
        "Meminimalkan waktu tunggu sandar kapal melalui persiapan izin masuk sebelum kedatangan.",
        "Mencapai nihil pelanggaran kepabeanan dan administrasi imigrasi serta karantina.",
        "Mengutamakan kenyamanan kru kapal serta kelengkapan pemesanan kapten secara cepat.",
        "Menyajikan perhitungan Proforma D/A yang transparan, jujur, dan berdaya saing."
      ],
      imageDesc: "Fasilitas dok galangan perkapalan nasional.",
      originLabel: "Kantor Pelayanan & Cabang",
      empoweringLabel: "Mendukung Kelancaran Operasional Pelayaran",
      exportStandardLabel: "Kepatuhan Standar Keselamatan BKI"
    },
    privacyPage: {
      lastUpdated: "Mei 2026",
      introTitle: "Kebijakan Privasi & Data Layanan",
      introText: "Kami berkomitmen untuk menjaga kerahasiaan draf kargo, koordinat rute pelayaran, dan data pemilik kapal milik klien.",
      collectTitle: "Jenis Data yang Diproses",
      collectText: "Untuk merumuskan draf Proforma D/A, kami mengumpulkan data pelayaran umum seperti:",
      collectList: [
        { title: "Klausa Kapal & Muatan", desc: "Dimensi kapal, data draf, laju bongkar muat kargo, nama nakhoda, serta jadwal tiba." }
      ],
      useTitle: "Penggunaan Data",
      useText: "Data yang terkumpul dimanfaatkan penuh secara eksklusif untuk:",
      useList: [
        "Pengajuan permohonan sandar jangkar kepada Otoritas Pelabuhan setempat.",
        "Penyusunan manifest kapal resmi serta laporan kepada Kantor Syahbandar."
      ],
      securityTitle: "Keamanan Informasi",
      securityText: "Kami menggunakan perlindungan komunikasi internal guna meminimalkan risiko perpindahan bocoran data kepada pihak ketiga.",
      contactTitle: "Hubungi Hub Legal Maritim",
      contactText: "Direksi penanganan hukum keagenan diajukan melalui legal@perintisbermuda.co.id."
    },
    termsPage: {
      effectiveDate: "Mei 2026",
      agreementTitle: "Syarat dan Ketentuan Keagenan",
      agreementText: "Seluruh penunjukan keagenan kapal pelabuhan tunduk pada ketentuan hukum Kementerian Perhubungan Republik Indonesia.",
      ipTitle: "Hak Milik Informasi",
      ipText: "Segala bentuk teks, gambar, bagan, dan draf kalkulator di dalam website ini adalah milik sah PT Perintis Bermuda Perkasa.",
      userRepTitle: "Tanggung Jawab Pemilik Kapal",
      userRepText: "Pemilik kapal atau operator bertanggung jawab atas keabsahan dokumen kapal, jaminan kelayakan armada, serta penyelesaian dana Proforma D/A.",
      productsTitle: "Penolakan & Kondisi Force Majeure",
      productsText1: "Kami senantiasa berupaya melaksanakan pelayanan dengan kecakapan dan ketekunan profesional terbaik.",
      productsText2: "Keterlambatan rute pandu atau operasional pelabuhan akibat badai laut, cuaca ekstrem, atau penutupan pelabuhan adalah kondisi di luar kendali agen.",
      lawTitle: "Yurisdiksi Hukum",
      lawText: "Peraturan keagenan ini ditafsirkan dan diselesaikan sesuai dengan ketentuan hukum Republik Indonesia."
    }
  }
};
