import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Printer, 
  Share2, 
  ArrowLeft, 
  Check 
} from 'lucide-react';
import { Language } from '../types';

interface PrivacyPageProps {
  lang: Language;
  onNavigate?: (view: 'home' | 'about' | 'why-us' | 'privacy' | 'terms' | 'product-detail' | 'catalog') => void;
  onBack?: () => void;
  isDark?: boolean;
}

interface LegalSection {
  id: string;
  number: string;
  title: string;
  clauses: {
    label?: string;
    text: string;
    items?: string[];
  }[];
  statutoryNote?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ 
  lang, 
  onNavigate, 
  onBack 
}) => {
  const [activeSection, setActiveSection] = useState<string>('dasar-hukum');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const isId = lang === 'ID';

  const sections: LegalSection[] = useMemo(() => {
    if (isId) {
      return [
        {
          id: 'dasar-hukum',
          number: '1',
          title: 'Dasar Hukum & Komitmen Perusahaan',
          clauses: [
            {
              label: '1.1 Kedudukan Korporasi',
              text: 'PT Perintis Bermuda Perkasa ("Perusahaan") adalah perseroan terbatas yang didirikan dan tunduk pada hukum Negara Republik Indonesia, menjalankan kegiatan usaha keagenan umum perkapalan (General Shipping Agency & Husbandry) berdasarkan perizinan resmi dari Kementerian Perhubungan Republik Indonesia.'
            },
            {
              label: '1.2 Kerangka Kepatuhan Hukum',
              text: 'Kebijakan Privasi ini merupakan perwujudan kepatuhan Perusahaan terhadap Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi ("UU PDP"), Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik, serta Undang-Undang Nomor 1 Tahun 2024 tentang Perubahan Kedua atas UU ITE.'
            },
            {
              label: '1.3 Peran Pengendali Data',
              text: 'Dalam kaitannya dengan data pribadi yang dikumpulkan melalui situs web, korespondensi bisnis, dan dokumen administrasi kapal, Perusahaan bertindak sebagai Pengendali Data Pribadi (Data Controller) yang bertanggung jawab atas penentuan tujuan dan pelaksanaan pemrosesan data.'
            }
          ],
          statutoryNote: 'Catatan Statutoria: Penanganan manifes kapal, data nakhoda, dan sertifikat kelautan diselaraskan secara langsung dengan sistem Inaportnet Direktorat Jenderal Perhubungan Laut dan ketentuan CIQP (Customs, Immigration, Quarantine, Port Authority).'
        },
        {
          id: 'kategori-data',
          number: '2',
          title: 'Kategori Data Pribadi yang Dikumpulkan',
          clauses: [
            {
              label: '2.1 Data Identitas Awak Kapal & Perwakilan Prinsipal',
              text: 'Untuk memenuhi kewajiban hukum kepelabuhanan dan pengurusan clearance, Perusahaan memproses data identitas awak kapal yang mencakup:',
              items: [
                'Nama lengkap, tanggal lahir, kewarganegaraan, dan jenis kelamin.',
                'Nomor paspor, masa berlaku, dan salinan pindaian paspor resmi.',
                'Buku Pelaut (Seaman\'s Book) dan nomor registrasi pelaut.',
                'Sertifikat keahlian dan kompetensi maritim (STCW Certifications).',
                'Data kontak resmi pemilik kapal (Ship Owner), operator kapal, atau charterer.'
              ]
            },
            {
              label: '2.2 Data Teknis & Telemetri Maritim',
              text: 'Dalam koordinasi izin sandar dan pemanduan, Perusahaan mencatat informasi teknis kapal:',
              items: [
                'Nama kapal, Call Sign, IMO Number, MMSI, dan bendera kapal (Flag State).',
                'Gross Tonnage (GT), Net Tonnage (NT), panjang kapal (LOA), dan draft maksimum.',
                'Koordinat labuh jangkar, riwayat pelabuhan singgah (Last Port of Call), dan estimasi jadwal (ETA/ETD).',
                'Manifes kargo, jenis muatan (dangerous goods declaration jika ada), dan Bill of Lading.'
              ]
            },
            {
              label: '2.3 Data Keuangan & Transaksi Komersial',
              text: 'Meliputi rekening bank perusahaan untuk penyetoran Proforma Disbursement Account (PDA), data Nomor Pokok Wajib Pajak (NPWP), Nomor Induk Berusaha (NIB), serta bukti pemotongan pajak PPh Pasal 23/15.'
            },
            {
              label: '2.4 Data Navigasi Situs Web',
              text: 'Alamat Protokol Internet (IP address), jenis peramban, resolusi layar, dan preferensi bahasa yang disimpan semata-mata untuk mengoptimalkan navigasi situs.'
            }
          ]
        },
        {
          id: 'tujuan-pemrosesan',
          number: '3',
          title: 'Tujuan & Dasar Pemrosesan Data',
          clauses: [
            {
              label: '3.1 Dasar Pemrosesan Sah',
              text: 'Sesuai Pasal 20 UU PDP, pemrosesan data dilakukan atas dasar pelaksanaan kontrak keagenan (contractual performance), pemenuhan kewajiban hukum (statutory compliance), serta perlindungan kepentingan vital awak kapal.'
            },
            {
              label: '3.2 Rincian Tujuan Operasional',
              text: 'Data diproses untuk tujuan-tujuan berikut:',
              items: [
                'Penerbitan surat persetujuan berlayar dan clearance in/out pada Kantor Kesyahbandaran dan Otoritas Pelabuhan (KSOP).',
                'Pemeriksaan imigrasi untuk awak kapal asing dan penerbitan izin singgah pelabuhan (shore pass).',
                'Pemeriksaan sanitasi dan karantina kesehatan pelabuhan (Port Health Quarantine).',
                'Pelaksanaan pergantian awak kapal (crew change), mencakup izin transit, penjemputan darat, dan bantuan evakuasi medis darurat (medevac).',
                'Penyusunan Proforma Disbursement Account (PDA) dan Final Disbursement Account (FDA).',
                'Pemberian layanan suplai air tawar, bunker bahan bakar (MGO/VLSFO), dan kebutuhan perbekalan kapal.'
              ]
            }
          ]
        },
        {
          id: 'pengungkapan-pihak-ketiga',
          number: '4',
          title: 'Pengungkapan & Pembagian Data kepada Pihak Ketiga',
          clauses: [
            {
              label: '4.1 Larangan Penjualan Data Komersial',
              text: 'Perusahaan menegaskan komitmen mutlak untuk tidak pernah menjual, menyewakan, menukar, atau memonetisasi data pribadi pengguna atau awak kapal kepada pihak ketiga untuk kepentingan pemasaran komersial.'
            },
            {
              label: '4.2 Instansi Pemerintah & Otoritas Berwenang',
              text: 'Data hanya dibagikan kepada instansi resmi yang berwenang menurut peraturan perundang-undangan:',
              items: [
                'Kantor Kesyahbandaran dan Otoritas Pelabuhan (KSOP/KUPP).',
                'Direktorat Jenderal Imigrasi melalui Tempat Pemeriksaan Imigrasi (TPI).',
                'Direktorat Jenderal Bea dan Cukai (KPPBC).',
                'Balai Kekarantinaan Kesehatan (BKK).',
                'PT Pelabuhan Indonesia (Pelindo) atau Badan Usaha Pelabuhan (BUP) terkait alokasi dermaga.'
              ]
            },
            {
              label: '4.3 Mitra Layanan Maritim',
              text: 'Pembagian data terbatas kepada operator kapal tunda, penyedia pandu bersertifikat, dan rumah sakit/klinik rujukan pelabuhan dalam kondisi penanganan darurat awak kapal.'
            }
          ]
        },
        {
          id: 'transfer-internasional',
          number: '5',
          title: 'Transfer Data Lintas Batas Negara',
          clauses: [
            {
              label: '5.1 Transmisi ke Prinsipal Luar Negeri',
              text: 'Dalam penyelenggaraan keagenan kapal pelayaran samudera internasional, Perusahaan mengirimkan dokumen clearance dan laporan pertanggungjawaban kepada pemilik kapal (Ship Owner) atau charterer yang berdomisili di luar wilayah Indonesia.'
            },
            {
              label: '5.2 Kepatuhan Pasal 56 UU PDP',
              text: 'Transfer data lintas batas negara dilakukan dengan memastikan bahwa negara penerima memiliki standar pelindungan data yang setara, atau diikat melalui Klausul Kontrak Standar (Standard Contractual Clauses) yang menjamin kerahasiaan data.'
            }
          ]
        },
        {
          id: 'keamanan-data',
          number: '6',
          title: 'Keamanan, Enkripsi & Integritas Sistem',
          clauses: [
            {
              label: '6.1 Standar Keamanan Teknis',
              text: 'Seluruh komunikasi digital pada situs web dilindungi protokol enkripsi TLS 1.3 (HTTPS). Dokumen administrasi disimpan dalam peladen terenkripsi dengan pembatasan hak akses berbasis peran (Role-Based Access Control).'
            },
            {
              label: '6.2 Kewajiban Pemberitahuan Insiden',
              text: 'Apabila terjadi kegagalan pelindungan data (data breach), Perusahaan wajib menyampaikan pemberitahuan tertulis kepada pemilik data dan Lembaga Pelindungan Data Pribadi dalam jangka waktu paling lambat 3 x 24 jam sesuai amanat UU PDP.'
            }
          ]
        },
        {
          id: 'retensi-data',
          number: '7',
          title: 'Jadwal Retensi & Pemusnahan Data',
          clauses: [
            {
              label: '7.1 Batas Waktu Penyimpanan Dokumen',
              text: 'Data pribadi disimpan selama masa yang diperlukan untuk memenuhi tujuan awal pengumpulannya serta kewajiban statutoria perundang-undangan perpajakan dan pelayaran Republik Indonesia.'
            }
          ],
          tableData: {
            headers: ['Kategori Dokumen / Data', 'Masa Retensi Wajib', 'Dasar Regulasi & Prosedur Akhir'],
            rows: [
              ['Dokumen Port Clearance, Manifes & FDA', '10 (Sepuluh) Tahun', 'UU Dokumen Perusahaan / Pengarsipan Statutoria'],
              ['Identitas Awak Kapal (Crew List, Paspor)', '5 (Lima) Tahun', 'Regulasi Keimigrasian & Hubla / Pemusnahan Aman'],
              ['Berkas Proforma Disbursement Account (PDA)', '10 (Sepuluh) Tahun', 'Ketentuan Perpajakan Ditjen Pajak / Arsip Keuangan'],
              ['Surat Korespondensi & Formulir Permohonan', '2 (Dua) Tahun', 'Administrasi Bisnis / Dihapus Permanen'],
              ['Log Aktivitas Situs & Cookies Fungsional', 'Maksimal 12 Bulan', 'Optimasi Sistem / Dihapus Otomatis']
            ]
          }
        },
        {
          id: 'hak-pemilik-data',
          number: '8',
          title: 'Hak-Hak Pemilik Data Pribadi',
          clauses: [
            {
              label: '8.1 Hak Subjek Data berdasarkan UU PDP',
              text: 'Sebagai pemilik data pribadi, Anda memiliki hak-hak yang diakui hukum:',
              items: [
                'Hak mendapatkan informasi mengenai identitas pengendali dan dasar legalitas pemrosesan data.',
                'Hak mengakses dan memperoleh salinan data pribadi yang dikelola oleh Perusahaan.',
                'Hak melengkapi, memperbarui, dan memperbaiki kesalahan data pribadi Anda.',
                'Hak meminta penghentian pemrosesan atau penghapusan data, sepanjang tidak bertentangan dengan kewajiban retensi hukum maritim.',
                'Hak menarik kembali persetujuan pemrosesan data yang pernah diberikan sebelumnya.'
              ]
            },
            {
              label: '8.2 Prosedur Pengajuan Permohonan',
              text: 'Permohonan pelaksanaan hak pemilik data diajukan secara tertulis dengan menyertakan bukti identitas yang sah ke alamat surat elektronik: legal@perintisbermudaperkasa.com.'
            }
          ]
        },
        {
          id: 'cookies-web',
          number: '9',
          title: 'Penggunaan Cookies & Analitik',
          clauses: [
            {
              label: '9.1 Cookies Fungsional',
              text: 'Situs ini menggunakan cookies teknis semata-mata untuk menyimpan preferensi bahasa (ID/EN) dan tema tampilan (Terang/Gelap). Kami tidak menggunakan cookies pihak ketiga untuk pelacakan lintas situs (cross-site behavioral advertising).'
            },
            {
              label: '9.2 Pengaturan Peramban',
              text: 'Pengguna dapat menolak atau menghapus cookies melalui pengaturan peramban internet masing-masing kapan saja tanpa menghalangi akses ke informasi utama situs.'
            }
          ]
        },
        {
          id: 'perubahan-kebijakan',
          number: '10',
          title: 'Perubahan & Penyesuaian Kebijakan',
          clauses: [
            {
              label: '10.1 Hak Perubahan',
              text: 'Perusahaan berhak merevisi atau memperbarui Kebijakan Privasi ini sewaktu-waktu guna menyelaraskan dengan perkembangan perundang-undangan atau penyempurnaan sistem operasional pelabuhan.'
            },
            {
              label: '10.2 Keberlakuan Versi',
              text: 'Versi terbaru yang dipublikasikan pada halaman ini membatalkan versi-versi sebelumnya. Tanggal efektif dan riwayat revisi selalu dicantumkan di bagian kepala dokumen.'
            }
          ]
        },
        {
          id: 'kontak-resmi',
          number: '11',
          title: 'Kontak Pejabat Pelindungan Data (DPO)',
          clauses: [
            {
              label: '11.1 Alamat Korespondensi Resmi',
              text: 'Segala pertanyaan, masukan, atau permohonan resmi terkait data pribadi dapat dialamatkan kepada unit kepatuhan Perusahaan:',
              items: [
                'Badan Hukum: PT Perintis Bermuda Perkasa',
                'Unit Kerja: Corporate Legal & Compliance Department',
                'Alamat Kantor: Jl. Jampea No. 28, Koja, Tanjung Priok, Jakarta Utara, DKI Jakarta 14210, Indonesia',
                'Surat Elektronik: legal@perintisbermudaperkasa.com / admin@perintisbermudaperkasa.com',
                'Telepon / WhatsApp Layanan Maritim: +62 817-7503-0638'
              ]
            }
          ]
        }
      ];
    } else {
      return [
        {
          id: 'dasar-hukum',
          number: '1',
          title: 'Legal Basis & Corporate Commitment',
          clauses: [
            {
              label: '1.1 Corporate Standing',
              text: 'PT Perintis Bermuda Perkasa ("Company") is a limited liability company duly established under the laws of the Republic of Indonesia, carrying out general shipping agency and hub husbanding operations under statutory licenses granted by the Ministry of Transportation of the Republic of Indonesia.'
            },
            {
              label: '1.2 Statutory Compliance Framework',
              text: 'This Privacy Policy is promulgated in strict conformity with Law of the Republic of Indonesia Number 27 of 2022 on Personal Data Protection ("UU PDP"), Government Regulation Number 71 of 2019 on Electronic Systems and Transactions, and Law Number 1 of 2024 (Electronic Information and Transactions Amendment).'
            },
            {
              label: '1.3 Data Controller Status',
              text: 'Regarding personal data assembled through our digital portal, commercial negotiations, and vessel clearance submissions, the Company acts as a Data Controller determining the explicit purposes and means of data processing.'
            }
          ],
          statutoryNote: 'Statutory Maritime Notice: All crew manifests, ship master credentials, and seaworthiness documentation are integrated directly into the Inaportnet clearing portal of the Directorate General of Sea Transportation and relevant CIQP (Customs, Immigration, Quarantine, Port Authority) agencies.'
        },
        {
          id: 'kategori-data',
          number: '2',
          title: 'Categories of Personal Data Collected',
          clauses: [
            {
              label: '2.1 Crew & Ship Principal Identity Data',
              text: 'In fulfilling statutory harbor clearance mandates, the Company processes crew identity records including:',
              items: [
                'Full name, date of birth, nationality, and gender.',
                'Passport number, expiry date, and scanned passport biometric pages.',
                'Seaman\'s Book identification and seafarer registration numbers.',
                'Standards of Training, Certification and Watchkeeping (STCW) certificates of competency.',
                'Contact credentials of Ship Owners, Ship Managers, and Charterer representatives.'
              ]
            },
            {
              label: '2.2 Nautical Particulars & Vessel Telemetry',
              text: 'In facilitating berthing reservations and pilotage services, technical parameters are recorded:',
              items: [
                'Vessel name, Call Sign, IMO Number, MMSI, and Flag State administration.',
                'Gross Tonnage (GT), Net Tonnage (NT), Length Overall (LOA), and maximum draft.',
                'Anchorage coordinates, Last Port of Call voyage history, and estimated schedules (ETA/ETD).',
                'Cargo manifests, dangerous goods declarations, and Bills of Lading.'
              ]
            },
            {
              label: '2.3 Commercial & Financial Records',
              text: 'Corporate bank details for Proforma Disbursement Account (PDA) advances, corporate Tax ID (NPWP), Business Identification Number (NIB), and official withholding tax certificates.'
            },
            {
              label: '2.4 Website Navigation Telemetry',
              text: 'Internet Protocol (IP) addresses, browser engines, operating platforms, and language preferences retained strictly for functional interface rendering.'
            }
          ]
        },
        {
          id: 'tujuan-pemrosesan',
          number: '3',
          title: 'Purposes & Legal Grounds of Data Processing',
          clauses: [
            {
              label: '3.1 Lawful Grounds of Processing',
              text: 'Pursuant to Article 20 of the UU PDP, processing is performed under the legal grounds of contractual necessity, statutory maritime compliance, and safeguarding vital interests of seafarers.'
            },
            {
              label: '3.2 Concrete Operational Purposes',
              text: 'Personal and vessel records are assembled for the following objectives:',
              items: [
                'Procuring official Port Clearance In and Clearance Out from the Harbor Master & Port Authority (KSOP).',
                'Executing immigration border clearances for foreign crew members and issuing shore passes.',
                'Securing port health sanitation inspections and maritime quarantine clearances.',
                'Administering crew change logistics, including transit visas, airport escorts, and emergency medical evacuations (medevac).',
                'Preparing Proforma Disbursement Accounts (PDA) and post-voyage Final Disbursement Accounts (FDA).',
                'Coordinating fresh water delivery, certified bunker provisioning (MGO/VLSFO), and ship chandlery supplies.'
              ]
            }
          ]
        },
        {
          id: 'pengungkapan-pihak-ketiga',
          number: '4',
          title: 'Third-Party Disclosures & Shared Stakeholders',
          clauses: [
            {
              label: '4.1 Prohibition of Commercial Data Trading',
              text: 'The Company covenants unequivocally that personal and operational data will never be sold, leased, traded, or monetized to external commercial marketing entities under any circumstances.'
            },
            {
              label: '4.2 Statutory Harbor Authorities',
              text: 'Disclosures are strictly limited to authorized sovereign institutions:',
              items: [
                'Harbor Master & Port Authority Offices (KSOP/KUPP).',
                'Directorate General of Immigration at designated Immigration Checkpoints (TPI).',
                'Directorate General of Customs and Excise (KPPBC).',
                'Port Health Quarantine Offices (BKK).',
                'PT Pelabuhan Indonesia (Pelindo) or specialized terminal operators.'
              ]
            },
            {
              label: '4.3 Certified Maritime Partners',
              text: 'Limited disclosures to licensed harbor tugboat operators, certified pilotage teams, and accredited port hospitals in situations of medical emergency.'
            }
          ]
        },
        {
          id: 'transfer-internasional',
          number: '5',
          title: 'Cross-Border International Data Transfers',
          clauses: [
            {
              label: '5.1 Transmission to Overseas Principals',
              text: 'In facilitating ocean freight voyages, the Company regularly transmits clearance manifests and disbursement statements to foreign Ship Owners, Managers, or Charterers located outside Indonesia.'
            },
            {
              label: '5.2 Article 56 UU PDP Adherence',
              text: 'International data transfers comply with Article 56 of the UU PDP, verifying that the destination jurisdiction offers adequate data protections or binding parties to Standard Contractual Clauses.'
            }
          ]
        },
        {
          id: 'keamanan-data',
          number: '6',
          title: 'Data Security, Encryption & Integrity',
          clauses: [
            {
              label: '6.1 Technical Safeguards',
              text: 'Digital portal communications are secured via TLS 1.3 cryptographic protocols. Administrative archives are stored within encrypted repositories governed by strict Role-Based Access Control (RBAC).'
            },
            {
              label: '6.2 Breach Notification Protocol',
              text: 'In the event of a verified data security breach, the Company is legally obligated to notify affected data subjects and the competent Data Protection Authority within 72 hours under the UU PDP.'
            }
          ]
        },
        {
          id: 'retensi-data',
          number: '7',
          title: 'Document Retention & Destruction Schedule',
          clauses: [
            {
              label: '7.1 Statutory Storage Limits',
              text: 'Personal and vessel records are retained only as long as necessary to satisfy operational purposes and mandatory Indonesian corporate and maritime documentation laws.'
            }
          ],
          tableData: {
            headers: ['Document / Record Category', 'Mandatory Retention Term', 'Statutory Basis & Disposal Action'],
            rows: [
              ['Port Clearance Permits, Manifests & FDA', '10 (Ten) Years', 'Indonesian Corporate Documents Law / Secure Archival'],
              ['Crew Manifests & Identity Documents', '5 (Five) Years', 'Immigration Directives / Certified Shredding'],
              ['Proforma Disbursement Accounts (PDA)', '10 (Ten) Years', 'Directorate General of Taxes Mandates / Digital Vault'],
              ['Commercial Inquiries & Correspondence', '2 (Two) Years', 'Internal Administration / Permanent Deletion'],
              ['Web Session Logs & Analytics Tokens', 'Maximum 12 Months', 'Network Optimization / Automated Purge']
            ]
          }
        },
        {
          id: 'hak-pemilik-data',
          number: '8',
          title: 'Statutory Data Subject Rights',
          clauses: [
            {
              label: '8.1 Rights Under Chapter IV UU PDP',
              text: 'As a recognized Data Subject under Indonesian jurisprudence, you hold enforceable rights:',
              items: [
                'Right to obtain transparent notification regarding controller identity and processing legitimacy.',
                'Right of access and verifiable copy of personal records maintained by the Company.',
                'Right to rectification of incomplete, obsolete, or inaccurate personal information.',
                'Right to erasure or deletion, subject to statutory maritime documentation obligations.',
                'Right to withdraw consent previously granted for specific non-statutory processing.'
              ]
            },
            {
              label: '8.2 Application Procedure',
              text: 'Formal applications to exercise data subject rights must be submitted in writing with verified identification to: legal@perintisbermudaperkasa.com.'
            }
          ]
        },
        {
          id: 'cookies-web',
          number: '9',
          title: 'Cookies & Analytical Telemetry',
          clauses: [
            {
              label: '9.1 Functional Cookies',
              text: 'This website utilizes purely functional cookies to store language preferences (ID/EN) and visual mode toggles (Light/Dark). We do not deploy third-party cross-site behavioral tracking cookies.'
            },
            {
              label: '9.2 Browser Configuration',
              text: 'Users may refuse or clear cookies via local browser configurations at any time without compromising access to the core website services.'
            }
          ]
        },
        {
          id: 'perubahan-kebijakan',
          number: '10',
          title: 'Policy Amendments & Governance Reviews',
          clauses: [
            {
              label: '10.1 Reservation of Revision',
              text: 'The Company reserves the right to modify or modernize this Privacy Policy periodically to reflect prevailing harbor regulations or legislative revisions.'
            },
            {
              label: '10.2 Effective Version',
              text: 'The latest version published on this page supersedes all earlier editions. The effective date and revision metadata are permanently specified at the document header.'
            }
          ]
        },
        {
          id: 'kontak-resmi',
          number: '11',
          title: 'Data Protection Officer (DPO) Contact',
          clauses: [
            {
              label: '11.1 Official Inquiries',
              text: 'All formal privacy inquiries or regulatory correspondence should be addressed to our corporate compliance team:',
              items: [
                'Corporate Entity: PT Perintis Bermuda Perkasa',
                'Department: Corporate Legal & Compliance Desk',
                'Headquarters: Jl. Jampea No. 28, Koja, Tanjung Priok, North Jakarta 14210, Indonesia',
                'Official Email: legal@perintisbermudaperkasa.com / admin@perintisbermudaperkasa.com',
                'Maritime Operations Hotline: +62 817-7503-0638'
              ]
            }
          ]
        }
      ];
    }
  }, [isId]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter((sec) => 
      sec.title.toLowerCase().includes(q) ||
      sec.clauses.some((c) => 
        (c.label && c.label.toLowerCase().includes(q)) ||
        c.text.toLowerCase().includes(q) ||
        c.items?.some((it) => it.toLowerCase().includes(q))
      )
    );
  }, [sections, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pt-28 md:pt-36 pb-36 px-6 sm:px-8 md:px-16 max-w-7xl mx-auto min-h-screen text-zinc-900 dark:text-zinc-100 font-sans selection:bg-brand-500 selection:text-white">
      
      {/* 1. MINIMALIST TOP NAV & DOCUMENT SWITCHER */}
      <nav aria-label="Breadcrumb and document switch" className="mb-10 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>{isId ? 'Kembali ke Beranda' : 'Return to Home'}</span>
        </button>

        {/* Minimalist Tab Navigation */}
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest">
          <span className="font-bold text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-1">
            {isId ? 'Kebijakan Privasi' : 'Privacy Policy'}
          </span>
          <button 
            onClick={() => onNavigate?.('terms')}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors pb-1"
          >
            {isId ? 'Syarat & Ketentuan' : 'Terms of Service'}
          </button>
          
          <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-700 ml-1 mr-1" />

          <button
            onClick={handlePrint}
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-1.5"
            title={isId ? 'Cetak Dokumen' : 'Print Document'}
          >
            <Printer size={13} />
            <span className="hidden sm:inline">{isId ? 'Cetak' : 'Print'}</span>
          </button>
          
          <button
            onClick={handleCopyLink}
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-1.5"
            title={isId ? 'Salin Tautan' : 'Copy Link'}
          >
            {copiedLink ? <Check size={13} className="text-emerald-500" /> : <Share2 size={13} />}
            <span className="hidden sm:inline">{copiedLink ? (isId ? 'Tersalin' : 'Copied') : (isId ? 'Tautan' : 'Link')}</span>
          </button>
        </div>
      </nav>

      {/* 2. AUTHENTIC EDITORIAL DOCUMENT HEADER */}
      <header className="mb-14 max-w-4xl">
        <div className="text-xs uppercase tracking-widest font-mono text-zinc-500 dark:text-zinc-400 mb-3">
          PT Perintis Bermuda Perkasa · General Shipping Agency & Port Husbanding
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4 font-fun">
          {isId ? 'Kebijakan Privasi' : 'Privacy Policy'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-6">
          {isId
            ? 'Dokumen tata kelola kerahasiaan data pribadi, manifes kapal, dan identitas awak pelayaran berdasarkan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).'
            : 'Statutory policy governing the protection and lawful processing of personal, nautical, and crew identity records under Indonesian Personal Data Protection Act No. 27 of 2022.'
          }
        </p>

        {/* Clean, Unboxed Document Metadata Line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <span>Ref: PBP-LEG-2026/POL-01</span>
          <span aria-hidden="true">·</span>
          <span>{isId ? 'Berlaku Efektif: 1 Januari 2026' : 'Effective Date: January 1, 2026'}</span>
          <span aria-hidden="true">·</span>
          <span>{isId ? 'Pembaruan: 26 Mei 2026' : 'Updated: May 26, 2026'}</span>
          <span aria-hidden="true">·</span>
          <span>{isId ? 'Yurisdiksi: Republik Indonesia' : 'Jurisdiction: Republic of Indonesia'}</span>
        </div>
      </header>

      {/* 3. TWO-COLUMN EDITORIAL LAYOUT (Zero Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: QUIET STICKY INDEX */}
        <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-28 space-y-8">
          
          {/* Minimalist Search Line */}
          <div>
            <div className="relative border-b border-zinc-300 dark:border-zinc-700 pb-2">
              <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isId ? 'Cari pasal atau kata kunci...' : 'Search articles or terms...'}
                className="w-full pl-6 pr-2 bg-transparent text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <span className="text-[11px] font-mono text-zinc-400 block mt-2">
                {isId ? `${filteredSections.length} pasal ditemukan` : `${filteredSections.length} articles found`}
              </span>
            )}
          </div>

          {/* Section Index List */}
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
              {isId ? 'Indeks Pasal' : 'Document Index'}
            </span>
            <ul className="space-y-2 text-xs">
              {filteredSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <li key={sec.id}>
                    <button
                      onClick={() => scrollToSection(sec.id)}
                      className={`text-left block w-full py-1 transition-colors ${
                        isActive
                          ? 'border-l-2 border-zinc-900 dark:border-white pl-3 font-semibold text-zinc-900 dark:text-white'
                          : 'border-l-2 border-transparent pl-3 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-normal'
                      }`}
                    >
                      <span className="font-mono text-[11px] text-zinc-400 mr-2">{sec.number}.</span>
                      <span>{sec.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quiet Legal Desk Contact */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
            <span className="block font-mono uppercase tracking-widest text-[11px] text-zinc-400">
              {isId ? 'Kontak Kepatuhan' : 'Compliance Officer'}
            </span>
            <p className="leading-relaxed text-[11px]">
              PT Perintis Bermuda Perkasa<br />
              Legal & Risk Division
            </p>
            <div className="space-y-1 pt-1 font-mono text-[11px]">
              <a href="mailto:legal@perintisbermudaperkasa.com" className="hover:text-zinc-900 dark:hover:text-white block transition-colors">
                legal@perintisbermudaperkasa.com
              </a>
              <a href="tel:081775030638" className="hover:text-zinc-900 dark:hover:text-white block transition-colors">
                +62 817-7503-0638
              </a>
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: CONTINUOUS EDITORIAL PROSE */}
        <main className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-16">
          
          {filteredSections.length === 0 ? (
            <div className="py-16 text-center text-zinc-500">
              <p className="text-sm mb-3">
                {isId ? `Tidak ada pasal yang memuat "${searchQuery}".` : `No articles match "${searchQuery}".`}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs uppercase tracking-wider underline hover:text-zinc-900 dark:hover:text-white"
              >
                {isId ? 'Reset Pencarian' : 'Reset Search'}
              </button>
            </div>
          ) : (
            filteredSections.map((sec) => (
              <section 
                key={sec.id}
                id={sec.id}
                className="scroll-mt-32 pt-10 first:pt-0 border-t border-zinc-200/90 dark:border-zinc-800/90 first:border-0"
              >
                {/* Section Title */}
                <header className="mb-6">
                  <span className="block text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                    {isId ? `Pasal ${sec.number}` : `Article ${sec.number}`}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white font-fun">
                    {sec.number}. {sec.title}
                  </h2>
                </header>

                {/* Clauses & Paragraphs */}
                <div className="space-y-6 text-sm sm:text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 font-light">
                  {sec.clauses.map((clause, cIdx) => (
                    <div key={cIdx} className="space-y-2">
                      {clause.label && (
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                          {clause.label}
                        </h3>
                      )}
                      <p>{clause.text}</p>
                      
                      {clause.items && clause.items.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1.5 text-zinc-650 dark:text-zinc-350 pt-1">
                          {clause.items.map((item, iIdx) => (
                            <li key={iIdx} className="pl-1">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Clean Table for Retention Schedule */}
                {sec.tableData && (
                  <div className="mt-8 overflow-x-auto border-t border-b border-zinc-200 dark:border-zinc-800 py-2">
                    <table className="w-full text-left text-xs leading-normal">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-semibold">
                          {sec.tableData.headers.map((h, hIdx) => (
                            <th key={hIdx} className="py-3 pr-4 font-mono uppercase text-[11px] tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 text-zinc-600 dark:text-zinc-400">
                        {sec.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-200">{row[0]}</td>
                            <td className="py-3 pr-4 font-mono text-zinc-800 dark:text-zinc-300 whitespace-nowrap">{row[1]}</td>
                            <td className="py-3 text-zinc-500 dark:text-zinc-400">{row[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Statutory Note if present (typographic border-left, zero colorful card) */}
                {sec.statutoryNote && (
                  <div className="mt-6 pl-4 border-l-2 border-zinc-300 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed italic">
                    {sec.statutoryNote}
                  </div>
                )}
              </section>
            ))
          )}

          {/* 4. FORMAL CORPORATE SIGNATORY BLOCK */}
          <footer className="pt-12 mt-16 border-t-2 border-zinc-900 dark:border-zinc-100 text-xs text-zinc-600 dark:text-zinc-400 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <span className="block font-mono uppercase tracking-widest text-[10px] text-zinc-400 mb-1">
                  {isId ? 'DITETAPKAN DI' : 'EXECUTED AT'}
                </span>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  DKI JAKARTA, REPUBLIK INDONESIA
                </p>
                <span className="block font-mono text-[11px] text-zinc-400 mt-1">
                  {isId ? 'Tanggal Efektif: 1 Januari 2026' : 'Effective: January 1, 2026'}
                </span>
              </div>

              <div>
                <span className="block font-mono uppercase tracking-widest text-[10px] text-zinc-400 mb-1">
                  {isId ? 'OTORITAS KORPORASI' : 'AUTHORIZED ENTITY'}
                </span>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  PT PERINTIS BERMUDA PERKASA
                </p>
                <p className="text-[11px] leading-relaxed text-zinc-500 mt-1">
                  Direktorat Kepatuhan &amp; Urusan Hukum Maritim<br />
                  SIUPKK No. 2605240098172
                </p>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-4">
              {isId 
                ? 'Seluruh hak cipta dilindungi undang-undang. Dokumen ini merupakan instrumen kepatuhan publik PT Perintis Bermuda Perkasa yang mengikat secara hukum.'
                : 'All rights reserved. This document constitutes the public compliance policy of PT Perintis Bermuda Perkasa and is legally binding.'
              }
            </p>
          </footer>

        </main>

      </div>

    </div>
  );
};

export default PrivacyPage;
