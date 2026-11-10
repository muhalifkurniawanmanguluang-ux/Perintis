# PT Perintis Bermuda Perkasa - Website Resmi

Website resmi **PT Perintis Bermuda Perkasa** (Perusahaan Keagenan Kapal / General Shipping Agency, Stevedoring / Perusahaan Bongkar Muat PBM, Vessel Husbanding, dan Barge Chartering).

---

## 🚀 Panduan Menjalankan di Visual Studio Code (Langkah Demi Langkah)

Ikuti langkah mudah berikut untuk menjalankan website ini di komputer Anda menggunakan **Visual Studio Code**:

### 1. Prasyarat Sistem
Pastikan komputer Anda sudah terinstal **Node.js** (versi 18 atau 20+).
Untuk memeriksanya, buka terminal di komputer Anda dan ketik:
```bash
node -v
npm -v
```
*Jika belum terinstal, unduh versi LTS gratis di: [https://nodejs.org](https://nodejs.org)*

---

### 2. Buka Folder Proyek di Visual Studio Code
1. Buka aplikasi **Visual Studio Code**.
2. Klik menu **File** > **Open Folder...** (atau tekan `Ctrl + K Ctrl + O` di Windows / `Cmd + O` di Mac).
3. Pilih folder proyek ini.

---

### 3. Buka Terminal Terpadu VS Code
Buka terminal bawaan VS Code dengan:
* Menekan kombinasi tombol: `` Ctrl + ` `` (Backtick) atau
* Klik menu atas: **Terminal** > **New Terminal**.

---

### 4. Pasang Dependensi (Install Dependencies)
Ketik perintah berikut di terminal VS Code lalu tekan **Enter**:
```bash
npm install
```
*Tunggu hingga proses instalasi paket selesai (folder `node_modules` akan otomatis terbuat).*

---

### 5. Siapkan File Konfigurasi `.env` (Opsional)
Salin file `.env.example` menjadi `.env`:
* **Windows (PowerShell):**
  ```powershell
  copy .env.example .env
  ```
* **Mac / Linux:**
  ```bash
  cp .env.example .env
  ```
*(Jika ingin mengaktifkan live AI Chatbot PBP, isi `GEMINI_API_KEY=` di dalam file `.env` dari [Google AI Studio](https://aistudio.google.com/app/apikey). Tanpa API key pun website tetap berjalan normal).*

---

### 6. Jalankan Website (Development Server)
Jalankan perintah berikut:
```bash
npm run dev
```
Setelah muncul pesan `Server running on port 3000`, buka peramban (browser) Anda dan kunjungi:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## ⚡ Cara Pintas di Visual Studio Code (Tekan F5)
Proyek ini sudah dilengkapi konfigurasi otomatis untuk VS Code:
1. Tekan tombol **F5** pada keyboard Anda, **atau**
2. Klik ikon **Run and Debug** di bilah sisi kiri VS Code (`Ctrl + Shift + D`), lalu klik tombol hijau **"Jalankan Web (npm run dev)"**.
3. Server akan langsung aktif di terminal terpadu!

---

## 🛠️ Daftar Perintah Tersedia (NPM Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server backend Express + frontend Vite secara bersamaan (Port: 3000). |
| `npm run dev:client` | Menjalankan server Vite frontend secara langsung. |
| `npm run build` | Melakukan kompilasi bundle produksi ke folder `/dist`. |
| `npm start` | Menjalankan aplikasi dari hasil kompilasi produksi (`dist/server.cjs`). |
| `npm run typecheck` | Memeriksa seluruh kode TypeScript agar bebas dari kesalahan tipe. |

---

## 📁 Struktur Direktori Proyek

```text
├── components/           # Komponen UI Halaman & Fitur
│   ├── AboutPage.tsx         # Halaman Profil Perusahaan
│   ├── AIChatBot.tsx         # Asisten Virtual Interaktif PBP
│   ├── BrandLogo.tsx         # Logo Vektor Resmi PT Perintis Bermuda Perkasa
│   ├── CatalogPage.tsx       # Katalog Layanan & Armada
│   ├── CookieConsent.tsx     # Notifikasi Persetujuan Cookie
│   ├── OceanWaves.tsx        # Animasi Visual Gelombang Laut & Patrol Boat
│   ├── PrivacyPage.tsx       # Dokumen Kebijakan Privasi Resmi (UU PDP)
│   ├── ProductDetailPage.tsx # Detail Layanan & Spesifikasi Armada
│   ├── TermsPage.tsx         # Dokumen Syarat & Ketentuan Layanan (BIMCO)
│   └── WhyUsPage.tsx         # Keunggulan & Integritas Industri
├── src/assets/images/    # Aset Gambar Resolusi Tinggi (Hero Maritim, dll)
├── .vscode/              # Konfigurasi Otomatis Visual Studio Code
│   ├── launch.json           # Konfigurasi Shortcut F5 (Run & Debug)
│   ├── tasks.json            # Konfigurasi Build & Run Tasks
│   ├── settings.json         # Konfigurasi Formatting & TypeScript VS Code
│   └── extensions.json       # Rekomendasi Ekstensi VS Code
├── App.tsx               # Komponen Utama Web, Navigasi & Hero Maritim
├── constants.ts          # Dataset Teks Bilingual (Bahasa Indonesia & English)
├── server.ts             # Server Backend Express & API Proxy
├── types.ts              # Definisi Tipe TypeScript
├── vite.config.ts        # Konfigurasi Vite Bundler
├── tsconfig.json         # Konfigurasi TypeScript Compiler
├── .env.example          # Contoh Variabel Lingkungan
├── .gitignore            # Filter Git Repository
└── package.json          # Manajemen Dependensi & Script Proyek
```

---

## 💡 Rekomendasi Ekstensi VS Code
Saat Anda membuka proyek ini di VS Code, Anda disarankan menginstal ekstensi pendukung berikut:
* **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)
* **Prettier - Code formatter** (`esbenp.prettier-vscode`)
* **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`)
