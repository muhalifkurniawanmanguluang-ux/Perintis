import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Printer, 
  Share2, 
  ArrowLeft, 
  Check 
} from 'lucide-react';
import { Language } from '../types';

interface TermsPageProps {
  lang: Language;
  onNavigate?: (view: 'home' | 'about' | 'why-us' | 'privacy' | 'terms' | 'product-detail' | 'catalog') => void;
  onBack?: () => void;
  isDark?: boolean;
}

interface TermsClause {
  label?: string;
  text: string;
  items?: string[];
}

interface TermsSection {
  id: string;
  number: string;
  title: string;
  clauses: TermsClause[];
  statutoryNote?: string;
}

export const TermsPage: React.FC<TermsPageProps> = ({ 
  lang, 
  onNavigate, 
  onBack 
}) => {
  const [activeSection, setActiveSection] = useState<string>('ketentuan-umum');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const isId = lang === 'ID';

  const sections: TermsSection[] = useMemo(() => {
    if (isId) {
      return [
        {
          id: 'ketentuan-umum',
          number: '1',
          title: 'Ketentuan Umum & Penerimaan Syarat',
          clauses: [
            {
              label: '1.1 Ruang Lingkup Perjanjian',
              text: 'Syarat dan Ketentuan Layanan ini ("Ketentuan") merupakan perjanjian hukum yang mengikat antara PT Perintis Bermuda Perkasa ("Perusahaan") dengan Pengguna, Prinsipal, Pemilik Kapal (Ship Owner), Operator, Manajer, maupun Penyewa Kapal (Charterer) yang menunjuk Perusahaan sebagai agen kapal atau memanfaatkan jasa keagenan pelabuhan Kami.'
            },
            {
              label: '1.2 Penerimaan Mengikat',
              text: 'Dengan menyampaikan permohonan keagenan, menyetujui estimasi Proforma Disbursement Account (PDA), menerbitkan Surat Penunjukan Agen (Letter of Appointment), atau menerima pelayanan kapal di pelabuhan, Prinsipal menyatakan persetujuan tanpa syarat untuk terikat pada seluruh klausul dalam Ketentuan ini.'
            },
            {
              label: '1.3 Kewenangan Bertindak',
              text: 'Pihak yang mewakili Prinsipal menjamin bahwa dirinya memiliki kapasitas hukum dan kewenangan korporasi penuh untuk mengikat badan usaha yang bersangkutan dalam hubungan keagenan maritim ini.'
            }
          ],
          statutoryNote: 'Penyelarasan Industri: Ketentuan ini mengadopsi standar internasional The Baltic and International Maritime Council (BIMCO Standard Agency Terms) serta peraturan perundang-undangan pelayaran Republik Indonesia.'
        },
        {
          id: 'legalitas-badan-usaha',
          number: '2',
          title: 'Legalitas Badan Usaha & Lisensi Pelayaran',
          clauses: [
            {
              label: '2.1 Badan Hukum Indonesia',
              text: 'PT Perintis Bermuda Perkasa adalah perseroan terbatas yang didirikan secara sah menurut hukum Negara Republik Indonesia, berdomisili hukum di Jakarta Utara, dan terdaftar pada Kementerian Hukum dan HAM Republik Indonesia.'
            },
            {
              label: '2.2 Lisensi Keagenan Kapal (SIUPKK)',
              text: 'Perusahaan beroperasi berdasarkan Surat Izin Usaha Perusahaan Keagenan Kapal (SIUPKK) resmi yang diterbitkan oleh Kementerian Perhubungan Republik Indonesia melalui Direktorat Jenderal Perhubungan Laut, serta memegang Nomor Induk Berusaha (NIB) dan izin operasional Inaportnet yang sah.'
            }
          ]
        },
        {
          id: 'ruang-lingkup-keagenan',
          number: '3',
          title: 'Ruang Lingkup Jasa Keagenan & Husbanding',
          clauses: [
            {
              label: '3.1 Pengurusan Port Clearance (CIQP)',
              text: 'Perusahaan bertindak sebagai Agen Umum (General Agent) atau Sub-Agen untuk menyelesaikan seluruh prosedur statutoria kedatangan dan keberangkatan kapal:',
              items: [
                'Clearance In dan Clearance Out pada Kantor Kesyahbandaran dan Otoritas Pelabuhan (KSOP/KUPP).',
                'Pemeriksaan dan penerbitan izin imigrasi Tempat Pemeriksaan Imigrasi (TPI).',
                'Deklarasi pabean kapal dan pengawasan manifes kargo pada Kantor Bea dan Cukai (KPPBC).',
                'Pemeriksaan sanitasi dan penerbitan Port Health Quarantine Clearance oleh Balai Kekarantinaan Kesehatan.'
              ]
            },
            {
              label: '3.2 Pelayanan Port Husbanding',
              text: 'Menyediakan asistensi operasional kapal mencakup pergantian awak kapal (crew change, OKTB, perizinan transit, dan akomodasi), pengantaran dana tunai nakhoda (Cash-to-Master), bantuan medis darurat (medevac), serta pengurusan perpanjangan sertifikat kapal.'
            },
            {
              label: '3.3 Suplai Maritim & Olah Gerak',
              text: 'Mengatur koordinasi kapal pandu dan tunda resmi Pelindo, pengisian air bersih tawar melalui tongkang atau dermaga, serta bunker bahan bakar minyak bersertifikat (MGO/VLSFO).'
            }
          ]
        },
        {
          id: 'nominasi-agen',
          number: '4',
          title: 'Prosedur Nominasi & Penunjukan Agen',
          clauses: [
            {
              label: '4.1 Surat Penunjukan (Letter of Appointment)',
              text: 'Prinsipal wajib mengirimkan konfirmasi penunjukan tertulis sekurang-kurangnya 7 (tujuh) hari kerja sebelum perkiraan kedatangan kapal (ETA) di pelabuhan tujuan.'
            },
            {
              label: '4.2 Penyerahan Dokumen Teknis',
              text: 'Prinsipal wajib menyediakan dokumen lengkap kapal (Ship Particulars, Certificate of Registry, International Tonnage Certificate, Crew List, Cargo Manifest, dan Last Port Clearance).'
            },
            {
              label: '4.3 Hak Diskresi Penolakan',
              text: 'Perusahaan berhak menolak penunjukan kapal apabila terdapat indikasi pelanggaran sanksi internasional, dokumen keselamatan kedaluwarsa, atau ketidaksepakatan komersial atas estimasi biaya pelabuhan.'
            }
          ]
        },
        {
          id: 'ketentuan-keuangan',
          number: '5',
          title: 'Ketentuan Keuangan, Pembayaran PDA & FDA',
          clauses: [
            {
              label: '5.1 Kebijakan 100% Dana di Muka (Advance of Funds)',
              text: 'Prinsipal wajib menyetorkan 100% nilai estimasi biaya Proforma Disbursement Account (PDA) ke rekening resmi Perusahaan sebelum kapal tiba (ETA) atau sebelum permohonan Clearance In diproses pada otoritas pelabuhan.'
            },
            {
              label: '5.2 Kebijakan Tanpa Dana Talangan (No Pre-funding Policy)',
              text: 'Perusahaan tidak berkewajiban membayarkan terlebih dahulu (menalangi) pungutan pelabuhan, pemanduan, bunker, atau tarif jasa instansi pemerintah jika dana estimasi PDA belum efektif diterima di rekening Perusahaan.'
            },
            {
              label: '5.3 Pertanggungjawaban Final Disbursement Account (FDA)',
              text: 'Dalam jangka waktu 14 hingga 30 hari kalender setelah kapal bertolak (ATD), Perusahaan wajib menerbitkan FDA definitif yang dilampiri seluruh kuitansi asli, invoice resmi pelabuhan, dan bukti pembayaran yang sah.'
            },
            {
              label: '5.4 Rekonsiliasi & Kurs Mata Uang',
              text: 'Kelebihan dana setoran akan dikembalikan secara utuh kepada Prinsipal. Kekurangan dana wajib dilunasi Prinsipal paling lambat 7 (tujuh) hari kerja sejak penerbitan FDA. Nilai tukar valas (USD/EUR ke IDR) dihitung berdasarkan kurs transaksi riil Bank Indonesia pada saat pembayaran dilakukan.'
            }
          ],
          statutoryNote: 'Pemberitahuan Finansial: Segala keterlambatan penyetoran dana PDA yang berakibat pada penundaan pelayanan pandu/tunda dan timbulnya demurrage kapal sepenuhnya merupakan tanggung jawab finansial Prinsipal.'
        },
        {
          id: 'laytime-demurrage',
          number: '6',
          title: 'Klausul Laytime, Demurrage & Despatch',
          clauses: [
            {
              label: '6.1 Pencatatan Waktu Operasional',
              text: 'Agen bertindak membantu Nakhoda dalam menyampaikan Notice of Readiness (NOR) serta memverifikasi pencatatan kronologis bongkar muat dalam Statement of Facts (SOF).'
            },
            {
              label: '6.2 Pembatasan Tanggung Jawab Waktu Tunggu',
              text: 'Perusahaan murni bertindak sebagai fasilitator administratif pelabuhan. Perusahaan dibebaskan secara mutlak dari segala tanggung jawab hukum maupun finansial atas perselisihan perhitungan Laytime, klaim Demurrage, atau hak Despatch antara Pemilik Kapal dan Charterer.'
            },
            {
              label: '6.3 Kepadatan Pelabuhan (Congestion)',
              text: 'Waktu tunggu kapal akibat antrean labuh, kepadatan alur pelayaran, atau keterlambatan alokasi dermaga oleh Badan Usaha Pelabuhan (BUP) bukan merupakan kelalaian Perusahaan.'
            }
          ]
        },
        {
          id: 'kewajiban-prinsipal',
          number: '7',
          title: 'Kewajiban Prinsipal, Nakhoda & Keselamatan',
          clauses: [
            {
              label: '7.1 Kelaiklautan Kapal (Seaworthiness)',
              text: 'Prinsipal dan Nakhoda menjamin kapal berada dalam kondisi laik laut (seaworthy), laik muat, dan memegang seluruh sertifikat keselamatan statutoria yang sah menurut konvensi SOLAS, MARPOL, dan regulasi Ditjen Hubla.'
            },
            {
              label: '7.2 Larangan Kontrabanda & Narkotika',
              text: 'Nakhoda menjamin bahwa kapal bebas dari muatan terlarang, narkotika, psikotropika, senjata api ilegal, atau barang selundupan yang melanggar hukum pidana Republik Indonesia.'
            },
            {
              label: '7.3 Kepatuhan ISPS Code & Lingkungan Maritim',
              text: 'Kapal wajib mematuhi standar International Ship and Port Facility Security (ISPS) Code serta konvensi MARPOL 73/78 mengenai pencegahan pencemaran air laut oleh tumpahan minyak atau limbah kapal.'
            }
          ]
        },
        {
          id: 'keadaan-kahar',
          number: '8',
          title: 'Keadaan Kahar (Force Majeure)',
          clauses: [
            {
              label: '8.1 Peristiwa di Luar Kendali',
              text: 'Perusahaan dibebaskan dari segala tuntutan atau kewajiban ganti rugi atas kegagalan, keterlambatan, atau hambatan pelayanan yang diakibatkan oleh Keadaan Kahar (Force Majeure).'
            },
            {
              label: '8.2 Cakupan Peristiwa',
              text: 'Termasuk namun tidak terbatas pada cuaca laut ekstrem, gelombang tinggi (high swell), siklon tropis, gempa bumi, tsunami, penutupan alur pelayaran oleh Syahbandar, pemogokan buruh pelabuhan resmi, embargo pemerintah, perang, kerusuhan sipil, kebakaran terminal, atau karantina wabah pelabuhan.'
            }
          ]
        },
        {
          id: 'batasan-tanggung-jawab',
          number: '9',
          title: 'Batasan Tanggung Jawab & Ganti Rugi',
          clauses: [
            {
              label: '9.1 Pengecualian Kerugian Tidak Langsung',
              text: 'Mengadopsi prinsip standar BIMCO, Perusahaan tidak bertanggung jawab atas kerugian tidak langsung, kerugian insidental, kehilangan potensi keuntungan (loss of profit), hilangnya sewa kapal (loss of charter hire), atau denda komersial yang diderita Prinsipal.'
            },
            {
              label: '9.2 Batasan Finansial Maksimal',
              text: 'Apabila terbukti adanya kelalaian nyata (gross negligence) oleh Perusahaan berdasarkan putusan hukum berkekuatan tetap, total tanggung jawab finansial Perusahaan secara tegas dibatasi maksimal sebesar nilai Jasa Keagenan (Agency Fee) bersih yang diterima untuk port call terkait.'
            },
            {
              label: '9.3 Kewajiban Indemnifikasi Prinsipal',
              text: 'Prinsipal wajib mengganti kerugian, membela, dan membebaskan Perusahaan dari segala tuntutan pihak ketiga, denda bea cukai, atau sanksi kepelabuhanan yang timbul akibat kesalahan data muatan, pelanggaran nakhoda, atau cacat teknis kapal.'
            }
          ]
        },
        {
          id: 'hak-retensi',
          number: '10',
          title: 'Hak Retensi Maritim & Piutang Pelabuhan',
          clauses: [
            {
              label: '10.1 Hak Menahan Dokumen',
              text: 'Berdasarkan hukum maritim dan perdata Indonesia, apabila Prinsipal gagal melunasi tagihan biaya pelabuhan atau jasa keagenan yang sah, Perusahaan berhak menahan dokumen kapal, manifes, atau Surat Persetujuan Berlayar (Port Clearance) yang berada dalam penguasaannya sampai kewajiban diselesaikan.'
            },
            {
              label: '10.2 Penahanan Sementara Kapal (Vessel Arrest)',
              text: 'Perusahaan memiliki hak hukum untuk mengajukan permohonan penahanan kapal kepada Pengadilan Negeri atau Syahbandar setempat atas dasar Piutang Maritim yang Diutamakan (Maritime Liens) untuk menjamin pelunasan biaya operasional pelabuhan.'
            }
          ]
        },
        {
          id: 'anti-korupsi-sanksi',
          number: '11',
          title: 'Kepatuhan Anti-Penyuapan & Sanksi Maritim',
          clauses: [
            {
              label: '11.1 Kebijakan Anti-Korupsi',
              text: 'PT Perintis Bermuda Perkasa menegakkan kebijakan Zero Tolerance terhadap suap, gratifikasi, atau pembayaran tidak sah kepada aparatur pelabuhan, sesuai UU Tipikor Republik Indonesia dan US Foreign Corrupt Practices Act (FCPA).'
            },
            {
              label: '11.2 Kepatuhan Sanksi Internasional',
              text: 'Prinsipal menjamin bahwa kapal, pemilik, operator, dan kargo tidak tercatat dalam daftar sanksi Perserikatan Bangsa-Bangsa (UN Sanctions), US OFAC, maupun sanksi Uni Eropa.'
            }
          ]
        },
        {
          id: 'hak-kekayaan-intelektual',
          number: '12',
          title: 'Hak Kekayaan Intelektual',
          clauses: [
            {
              label: '12.1 Hak Cipta & Merek',
              text: 'Seluruh materi publikasi, logo, sistem perhitungan estimasi Proforma D/A, dan isi portal web adalah hak kekayaan intelektual milik PT Perintis Bermuda Perkasa yang dilindungi undang-undang.'
            }
          ]
        },
        {
          id: 'hukum-penyelesaian-sengketa',
          number: '13',
          title: 'Hukum yang Berlaku & Yurisdiksi Sengketa',
          clauses: [
            {
              label: '13.1 Hukum Negara Republik Indonesia',
              text: 'Ketentuan ini ditafsirkan, diatur, dan tunduk sepenuhnya pada hukum Negara Republik Indonesia.'
            },
            {
              label: '13.2 Musyawarah Mufakat',
              text: 'Setiap perselisihan atau klaim wajib diselesaikan terlebih dahulu secara damai melalui musyawarah mufakat antara perwakilan eksekutif para pihak dalam waktu 30 (tiga puluh) hari kalender.'
            },
            {
              label: '13.3 Arbitrase BANI Jakarta',
              text: 'Apabila musyawarah tidak menghasilkan mufakat, sengketa akan diselesaikan secara final dan mengikat melalui arbitrase di Jakarta di bawah peraturan Badan Arbitrase Nasional Indonesia (BANI) oleh 3 (tiga) orang arbiter, atau melalui yurisdiksi Pengadilan Negeri Jakarta Pusat.'
            }
          ]
        },
        {
          id: 'keterpisahan-bahasa',
          number: '14',
          title: 'Keterpisahan Klausul & Bahasa Resmi',
          clauses: [
            {
              label: '14.1 Keterpisahan (Severability)',
              text: 'Ketidaksahan suatu klausul oleh putusan pengadilan yang berwenang tidak membatalkan atau memengaruhi keberlakuan penuh klausul-klausul lainnya.'
            },
            {
              label: '14.2 Primasi Bahasa Indonesia',
              text: 'Sesuai Undang-Undang Republik Indonesia Nomor 24 Tahun 2009, dokumen ini disusun dalam Bahasa Indonesia dan Bahasa Inggris. Dalam hal terjadi perbedaan penafsiran atau pertentangan arti, versi Bahasa Indonesia yang berlaku dan mengikat secara hukum.'
            }
          ]
        },
        {
          id: 'kontak-keagenan',
          number: '15',
          title: 'Kontak Operasional Port Dispatch',
          clauses: [
            {
              label: '15.1 Komunikasi Resmi',
              text: 'Segala pemberitahuan formal, penunjukan keagenan kapal, atau korespondensi hukum wajib ditujukan kepada kantor operasional Perusahaan:',
              items: [
                'Badan Hukum: PT Perintis Bermuda Perkasa',
                'Divisi: Corporate Legal & Port Husbanding Desk',
                'Alamat Kantor: Jl. Jampea No. 28, Koja, Tanjung Priok, Jakarta Utara, DKI Jakarta 14210, Indonesia',
                'Email Komersial: sales@perintisbermudaperkasa.com / admin@perintisbermudaperkasa.com',
                'Email Legal: legal@perintisbermudaperkasa.com',
                'Hotline Port Dispatch 24/7 & WhatsApp: +62 817-7503-0638'
              ]
            }
          ]
        }
      ];
    } else {
      return [
        {
          id: 'ketentuan-umum',
          number: '1',
          title: 'General Provisions & Acceptance of Terms',
          clauses: [
            {
              label: '1.1 Contractual Scope',
              text: 'These Terms of Service ("Terms") constitute a legally binding agreement between PT Perintis Bermuda Perkasa ("Company") and the User, Principal, Ship Owner, Operator, Manager, or Charterer retaining the Company as general shipping agent or utilizing our harbor logistics services.'
            },
            {
              label: '1.2 Binding Acceptance',
              text: 'By requesting agency services, approving a Proforma Disbursement Account (PDA), executing a Letter of Appointment, or accepting vessel husbanding at any port, the Principal unconditionally covenants to be bound by every provision of these Terms.'
            },
            {
              label: '1.3 Corporate Capacity',
              text: 'The individual acting on behalf of the Principal warrants that they possess full legal capacity and corporate authority to bind the commercial shipping entity into this maritime agreement.'
            }
          ],
          statutoryNote: 'Industry Alignment: These Terms integrate international standards of The Baltic and International Maritime Council (BIMCO Standard Agency Terms) and maritime statutory laws of the Republic of Indonesia.'
        },
        {
          id: 'legalitas-badan-usaha',
          number: '2',
          title: 'Corporate Standing & Shipping Licenses',
          clauses: [
            {
              label: '2.1 Indonesian Corporate Entity',
              text: 'PT Perintis Bermuda Perkasa is a limited liability corporation duly incorporated under the laws of the Republic of Indonesia, legally domiciled in North Jakarta, and registered with the Ministry of Law and Human Rights.'
            },
            {
              label: '2.2 Shipping Agency License (SIUPKK)',
              text: 'The Company operates pursuant to a statutory Shipping Agency Business License (SIUPKK) issued by the Ministry of Transportation c.q. Directorate General of Sea Transportation, holding an active Business Identification Number (NIB) and Inaportnet clearance certification.'
            }
          ]
        },
        {
          id: 'ruang-lingkup-keagenan',
          number: '3',
          title: 'Scope of General Agency & Husbanding',
          clauses: [
            {
              label: '3.1 Port Clearance Formalities (CIQP)',
              text: 'The Company acts as General Agent or Sub-Agent expediting mandatory arrival and departure statutory clearances:',
              items: [
                'Clearance In and Clearance Out through the Harbor Master & Port Authority (KSOP/KUPP).',
                'Immigration inspections, border formalities, and shore passes through the Immigration Checkpoint (TPI).',
                'Customs inward/outward declarations and cargo manifest verification with Customs and Excise (KPPBC).',
                'Port health quarantine inspections and sanitation certifications through the Port Health Quarantine Office.'
              ]
            },
            {
              label: '3.2 Port Husbanding Operations',
              text: 'Administering seafarer welfare and husbandry logistics including crew changes (OKTB, transit permits, ground transport, hotel arrangements), Cash-to-Master (CTM) deliveries, emergency medical evacuations (medevac), and vessel statutory certificate renewals.'
            },
            {
              label: '3.3 Marine Supplies & Maneuvering Escorts',
              text: 'Coordinating official Pelindo pilotage and harbor tug escorts, high-purity fresh water deliveries via barge or pier hydrant, and certified bunker provisioning (MGO/VLSFO).'
            }
          ]
        },
        {
          id: 'nominasi-agen',
          number: '4',
          title: 'Agency Nomination Formalities',
          clauses: [
            {
              label: '4.1 Letter of Appointment',
              text: 'The Principal must furnish a formal written Letter of Appointment at least 7 (seven) business days prior to the vessel\'s Estimated Time of Arrival (ETA).'
            },
            {
              label: '4.2 Technical Document Delivery',
              text: 'The Principal must provide verified vessel documentation (Ship Particulars, Certificate of Registry, International Tonnage Certificate, Crew List, Cargo Manifest, and Last Port Clearance).'
            },
            {
              label: '4.3 Discretion of Declination',
              text: 'The Company reserves the right to decline any nomination if the vessel is subject to international sanctions, manifests compromised safety certificates, or where commercial consensus on the Proforma D/A cannot be achieved.'
            }
          ]
        },
        {
          id: 'ketentuan-keuangan',
          number: '5',
          title: 'Financial Provisions, PDA & FDA Settlement',
          clauses: [
            {
              label: '5.1 100% Advance of Funds Policy',
              text: 'The Principal must remit 100% of the estimated Proforma Disbursement Account (PDA) to the Company\'s designated bank account prior to vessel arrival (ETA) or clearance processing.'
            },
            {
              label: '5.2 Strict No Pre-funding Policy',
              text: 'The Company is under no obligation to advance corporate funds or incur liability for harbor dues, pilotage, bunkers, or statutory charges until cleared PDA funds are received.'
            },
            {
              label: '5.3 Final Disbursement Account (FDA)',
              text: 'Within 14 to 30 calendar days following vessel departure (ATD), the Company shall deliver an audited FDA accompanied by original statutory port vouchers, tariffs, and receipts.'
            },
            {
              label: '5.4 Currency Exchange & Reconciliation',
              text: 'Unexpended credit balances shall be promptly refunded in full to the Principal. Any operational deficit must be settled within 7 (seven) business days of FDA invoice receipt. Foreign exchange conversions adhere to Bank Indonesia spot transaction rates on the settlement date.'
            }
          ],
          statutoryNote: 'Financial Notice: Delayed remittance of PDA funds resulting in pilotage suspension, harbor idle time, or vessel demurrage remains the sole financial liability of the Principal.'
        },
        {
          id: 'laytime-demurrage',
          number: '6',
          title: 'Laytime, Demurrage & Despatch Clause',
          clauses: [
            {
              label: '6.1 Operational Timekeeping',
              text: 'The Agent assists the Master in tendering Notice of Readiness (NOR) and recording chronological cargo operations within the Statement of Facts (SOF).'
            },
            {
              label: '6.2 Limitation Regarding Charter Disputes',
              text: 'The Company acts strictly as a port administrative facilitator and bears zero financial or legal liability for disputes regarding Laytime calculation, Demurrage claims, or Despatch allowances arising between Ship Owners and Charterers.'
            },
            {
              label: '6.3 Harbor Congestion',
              text: 'Anchorage waiting time arising from port congestion, fairway density, or berth delays controlled by port authorities cannot be imputed as agent default.'
            }
          ]
        },
        {
          id: 'kewajiban-prinsipal',
          number: '7',
          title: 'Obligations of Principal, Master & Safety',
          clauses: [
            {
              label: '7.1 Seaworthiness Warranty',
              text: 'The Principal and Master warrant that the nominated vessel is thoroughly seaworthy, cargo-worthy, and compliant with SOLAS, MARPOL, and statutory maritime safety conventions.'
            },
            {
              label: '7.2 Exclusion of Contraband & Narcotics',
              text: 'The Master warrants that the vessel carries zero contraband, illicit narcotics, psychotropic substances, or unlawful weapons under Indonesian criminal jurisprudence.'
            },
            {
              label: '7.3 ISPS Code & Marine Environment',
              text: 'The vessel must comply with International Ship and Port Facility Security (ISPS) Code standards and MARPOL 73/78 conventions preventing marine pollution by oily water or waste.'
            }
          ]
        },
        {
          id: 'keadaan-kahar',
          number: '8',
          title: 'Force Majeure',
          clauses: [
            {
              label: '8.1 Unforeseeable Sovereign & Natural Events',
              text: 'The Company is exonerated from any liability, default, or damages resulting from circumstances beyond reasonable human control (Force Majeure).'
            },
            {
              label: '8.2 Scope of Exemption',
              text: 'Including extreme sea states, high swell, tropical cyclones, earthquakes, tsunamis, harbor fairway closures decreed by Harbor Masters, strikes by harbor laborers, war, maritime blockades, sovereign embargoes, civil unrest, or epidemic quarantine shutdowns.'
            }
          ]
        },
        {
          id: 'batasan-tanggung-jawab',
          number: '9',
          title: 'Limitation of Liability & Indemnity',
          clauses: [
            {
              label: '9.1 Exclusion of Consequential Damages',
              text: 'Adopting standard BIMCO principles, the Company shall never be liable for indirect, consequential, or punitive damages, including loss of profit, loss of charter hire, or commercial freight penalties.'
            },
            {
              label: '9.2 Strict Financial Liability Cap',
              text: 'In the event of proven gross negligence established by a final non-appealable court judgment, total aggregate liability of the Company is capped strictly at the net Agency Fee received for the specific port call.'
            },
            {
              label: '9.3 Principal\'s Indemnity',
              text: 'The Principal covenants to defend, indemnify, and hold harmless the Company against all third-party claims, harbor fines, or customs penalties arising from incorrect cargo manifests, Master defaults, or vessel defects.'
            }
          ]
        },
        {
          id: 'hak-retensi',
          number: '10',
          title: 'Maritime Liens & Right of Retention',
          clauses: [
            {
              label: '10.1 Retention of Documents',
              text: 'Under Indonesian maritime law, in the event that a Principal defaults on undisputed disbursements, the Company possesses the legal right to retain possession of vessel certificates, cargo manifests, or Port Clearance Out until fully settled.'
            },
            {
              label: '10.2 Conservatory Vessel Arrest',
              text: 'The Company reserves the statutory right to petition the competent District Court or Harbor Master for conservatory vessel arrest pursuant to recognized Maritime Liens against unpaid port dues.'
            }
          ]
        },
        {
          id: 'anti-korupsi-sanksi',
          number: '11',
          title: 'Anti-Bribery & Sanctions Governance',
          clauses: [
            {
              label: '11.1 Anti-Corruption Mandate',
              text: 'PT Perintis Bermuda Perkasa enforces a strict Zero Tolerance policy regarding bribery, facilitation payments, or corrupt inducements to port officials, in adherence to Indonesian Anti-Corruption legislation and the US Foreign Corrupt Practices Act (FCPA).'
            },
            {
              label: '11.2 Sanctions Warranty',
              text: 'The Principal warrants that the nominated vessel, registered owner, charterer, and cargo are not designated under United Nations (UN), US OFAC, or European Union sanctions listings.'
            }
          ]
        },
        {
          id: 'hak-kekayaan-intelektual',
          number: '12',
          title: 'Intellectual Property Rights',
          clauses: [
            {
              label: '12.1 Proprietary Materials',
              text: 'All publications, commercial marks, Proforma D/A estimation algorithms, and digital portal contents remain the exclusive intellectual property of PT Perintis Bermuda Perkasa protected by copyright laws.'
            }
          ]
        },
        {
          id: 'hukum-penyelesaian-sengketa',
          number: '13',
          title: 'Governing Law & Dispute Resolution',
          clauses: [
            {
              label: '13.1 Indonesian Jurisdiction',
              text: 'These Terms shall be governed by, interpreted, and enforced in accordance with the laws of the Republic of Indonesia.'
            },
            {
              label: '13.2 Amicable Deliberation',
              text: 'Any dispute or controversy shall first be addressed through good-faith deliberation (Musyawarah) between executive representatives within 30 (thirty) calendar days.'
            },
            {
              label: '13.3 BANI Arbitration in Jakarta',
              text: 'Failing amicable settlement, the dispute shall be finally resolved through binding arbitration administered by the Indonesian National Board of Arbitration (BANI) in Jakarta by three arbitrators, or through the exclusive jurisdiction of the Central Jakarta District Court.'
            }
          ]
        },
        {
          id: 'keterpisahan-bahasa',
          number: '14',
          title: 'Severability & Prevailing Language',
          clauses: [
            {
              label: '14.1 Severability',
              text: 'Should any clause be adjudged invalid or unenforceable by a court of competent jurisdiction, such invalidity shall not prejudice the continuing enforceability of the remaining provisions.'
            },
            {
              label: '14.2 Primacy of Indonesian Text',
              text: 'Pursuant to Law of the Republic of Indonesia Number 24 of 2009, this agreement is drafted in Indonesian and English. In the event of any linguistic divergence or ambiguity, the Indonesian text shall legally govern.'
            }
          ]
        },
        {
          id: 'kontak-keagenan',
          number: '15',
          title: 'Official Inquiries & Port Dispatch Desk',
          clauses: [
            {
              label: '15.1 Coordination Channels',
              text: 'All formal nominations, PDA applications, or statutory legal notices must be submitted to the Company\'s headquarters:',
              items: [
                'Entity: PT Perintis Bermuda Perkasa',
                'Division: Corporate Legal & Port Husbanding Operations Desk',
                'Headquarters: Jl. Jampea No. 28, Koja, Tanjung Priok, North Jakarta 14210, Indonesia',
                'Commercial Inquiries: sales@perintisbermudaperkasa.com / admin@perintisbermudaperkasa.com',
                'Legal Correspondence: legal@perintisbermudaperkasa.com',
                '24/7 Port Husbanding Hotline: +62 817-7503-0638'
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
          <button 
            onClick={() => onNavigate?.('privacy')}
            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors pb-1"
          >
            {isId ? 'Kebijakan Privasi' : 'Privacy Policy'}
          </button>
          <span className="font-bold text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white pb-1">
            {isId ? 'Syarat & Ketentuan' : 'Terms of Service'}
          </span>
          
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
          {isId ? 'Syarat & Ketentuan Layanan' : 'Terms of Service'}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-6">
          {isId
            ? 'Ketentuan standar keagenan kapal maritim, pengurusan port clearance CIQP, ketentuan pembayaran Proforma Disbursement Account (PDA), dan batasan tanggung jawab operasional di pelabuhan Indonesia.'
            : 'Standard maritime agency terms governing vessel husbanding, CIQP clearance administration, Proforma Disbursement Account (PDA) advances, and statutory harbor liabilities.'
          }
        </p>

        {/* Clean, Unboxed Document Metadata Line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <span>Ref: PBP-LEG-2026/TOS-01</span>
          <span aria-hidden="true">·</span>
          <span>{isId ? 'Berlaku Efektif: 1 Januari 2026' : 'Effective Date: January 1, 2026'}</span>
          <span aria-hidden="true">·</span>
          <span>{isId ? 'Pembaruan: 26 Mei 2026' : 'Updated: May 26, 2026'}</span>
          <span aria-hidden="true">·</span>
          <span>{isId ? 'Standar: BIMCO / Ditjen Hubla' : 'Standard: BIMCO / Hubla'}</span>
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

          {/* Quiet Operations Desk Contact */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
            <span className="block font-mono uppercase tracking-widest text-[11px] text-zinc-400">
              {isId ? 'Port Dispatch 24 Jam' : '24/7 Operations Desk'}
            </span>
            <p className="leading-relaxed text-[11px]">
              PT Perintis Bermuda Perkasa<br />
              Commercial &amp; Husbanding
            </p>
            <div className="space-y-1 pt-1 font-mono text-[11px]">
              <a href="mailto:sales@perintisbermudaperkasa.com" className="hover:text-zinc-900 dark:hover:text-white block transition-colors">
                sales@perintisbermudaperkasa.com
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
                ? 'Seluruh hak cipta dilindungi undang-undang. Syarat & Ketentuan ini merupakan instrumen perjanjian resmi PT Perintis Bermuda Perkasa yang mengikat secara hukum.'
                : 'All rights reserved. These Terms of Service constitute the binding corporate agreement of PT Perintis Bermuda Perkasa under Indonesian and international maritime law.'
              }
            </p>
          </footer>

        </main>

      </div>

    </div>
  );
};

export default TermsPage;
