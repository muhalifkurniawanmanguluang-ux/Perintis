
export type Language = 'EN' | 'ID';
export type Theme = 'light' | 'dark';

export interface SpecData {
  name: string;
  value: number;
  standard: number;
  unit: string;
  type: 'percentage' | 'count' | 'text';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  specs: SpecData[];
  tags: string[];
}

export interface Translation {
  nav: {
    home: string;
    whyChooseUs: string;
    services: string;
    products: string;
    sustainability: string; // Changed from specs
    traceability: string;
    contact: string;
    client: string;
    about: string;
    themeSettings: string;
    lightMode: string;
    darkMode: string;
    selectLanguage: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    currentVol: string;
  };
  marquee: string;
  stats: {
    farmers: string;
    countries: string;
    shipping: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    heading?: string;
    reasons: {
      title: string;
      desc: string;
      detail: string;
    }[];
    comparison: {
      tag: string;
      title: string;
      subtitle: string;
      directImpact: string;
      farmer: string;
      farmerDesc: string;
      hub: string;
      hubDesc: string;
      buyer: string;
      buyerDesc: string;
      statTraceable: string;
      statMiddlemen: string;
    };
    visual: {
      moisture: string;
      grading: string;
      packaging: string;
    };
    learnMore: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      features: string[];
    }[];
  };
  products: {
    title: string;
    subtitle: string;
    viewCatalog: string;
  };
  catalogPage: {
    title: string;
    subtitle: string;
    backToHome: string;
  };
  sustainability: { // Renamed & Restructured
    title: string;
    subtitle: string;
    tagline: string;
    cards: {
      title: string;
      value: string;
      desc: string;
    }[];
    metrics: {
        label: string;
        value: string;
    }[];
  };
  // Kept for Product Detail Page compatibility
  specs: {
    title: string;
    analysisLabel: string;
    grade: string;
  };
  traceability: {
    title: string;
    subtitle: string;
    steps: {
      farm: string;
      process: string;
      qc: string;
      export: string;
    }
  };
  clientForm: {
    title: string;
    subtitle: string;
    name: string;
    origin: string;
    whatsapp: string;
    email: string;
    product: string;
    submit: string;
    successMsg: string;
  };
  inquiry: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    productLabel: string;
    submitBtn: string;
  };
  cookieConsent: {
    text: string;
    accept: string;
    decline: string;
  };
  footer: {
    ctaPrefix: string;
    ctaHighlight: string;
    startSourcing: string;
    exploreLabel: string;
    connectLabel: string;
    officeLabel: string;
    tagline: string;
    addressTitle: string;
    address: string;
    contactTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    cookies: string;
    systemStatus: string;
    rights: string;
    rightsReserved: string;
    worldClock: {
      wita: string;
      wit: string;
      wib: string;
    }
  };
  aboutPage: {
    tagline: string;
    introBold: string;
    introText: string;
    location: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionPoints: string[];
    imageDesc: string;
    originLabel: string;
    empoweringLabel: string;
    exportStandardLabel: string;
  };
  privacyPage: {
    lastUpdated: string;
    introTitle: string;
    introText: string;
    collectTitle: string;
    collectText: string;
    collectList: { title: string; desc: string }[];
    useTitle: string;
    useText: string;
    useList: string[];
    securityTitle: string;
    securityText: string;
    contactTitle: string;
    contactText: string;
  };
  termsPage: {
    effectiveDate: string;
    agreementTitle: string;
    agreementText: string;
    ipTitle: string;
    ipText: string;
    userRepTitle: string;
    userRepText: string;
    productsTitle: string;
    productsText1: string;
    productsText2: string;
    lawTitle: string;
    lawText: string;
  };
}