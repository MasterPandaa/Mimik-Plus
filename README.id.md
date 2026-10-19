<div align="center"><a name="readme-top"></a>

<img src="public/mascot.svg" width="140" height="140" alt="Maskot Mimik" />

# Mimik Plus

[English](./README.md) · [Español](./README.es.md) · [Português (BR)](./README.pt-BR.md) · [Français](./README.fr.md) · [简体中文](./README.zh-CN.md) · **Bahasa Indonesia**

**Rekam otomatis alur kerja browser apa pun menjadi panduan langkah demi langkah. Tanpa akun, tanpa cloud, tanpa pelacakan.**

Klik rekam, lakukan aktivitasmu, dapatkan panduan rapi dengan tangkapan layar beranotasi. Narasi saat merekam, edit setelahnya, lalu putar ulang atau ekspor.

> **Ini adalah fork komunitas dari [Mimik](https://github.com/westpoint-io/mimik) oleh Westpoint**, yang telah ditingkatkan dengan fitur tambahan termasuk dukungan penyedia AI kustom, Bahasa Indonesia, dan peningkatan lainnya. Seluruh kredit asli tetap milik tim Westpoint.

<!-- SHIELD GROUP -->

[![License][license-shield]][license-link]
[![Manifest V3][mv3-shield]][mv3-link]
[![100% Local][local-shield]][local-link]
[![No Account][no-account-shield]][no-account-link]
<br/>
[![Stars][star-shield]][star-link]
[![Contributors][contributors-shield]][contributors-link]
![Last Commit][last-commit-shield]
[![Issues][issues-shield]][issues-link]
[![Fork dari][fork-shield]][fork-link]

</div>

<details>
<summary><kbd>Daftar isi</kbd></summary>

#### TOC

- [📺 Demo](#-demo)
- [👋 Memulai](#-memulai)
- [🛠️ Pemasangan Manual (Developer Mode)](#️-pemasangan-manual-developer-mode)
- [✨ Fitur](#-fitur)
  - [🔒 Smart Blur](#-smart-blur)
  - [🧠 Deskripsi AI (opsional)](#-deskripsi-ai-opsional)
  - [🔌 Penyedia AI Kustom (baru!)](#-penyedia-ai-kustom-baru)
  - [🗑️ Hapus Langkah Langsung (v1.3.1)](#️-hapus-langkah-langsung-v131)
  - [🔄 Pemilihan Model Dinamis (v1.3.0)](#-pemilihan-model-dinamis-v130)
  - [▶️ Pemutaran Guide Me](#️-pemutaran-guide-me)
  - [🎙️ Narasi suara (opsional)](#️-narasi-suara-opsional)
  - [✏️ Editor panduan](#️-editor-panduan)
  - [📤 Ekspor multi-format](#-ekspor-multi-format)
- [🆕 Yang Baru di Fork Ini](#-yang-baru-di-fork-ini)
- [🔐 Privasi & penyimpanan](#-privasi--penyimpanan)
- [🤝 Kontribusi](#-kontribusi)
- [⭐ Riwayat Bintang](#-riwayat-bintang)
- [📜 Lisensi](#-lisensi)

<br/>

</details>

## 📺 Demo

<div align="center">
<img src="https://github.com/user-attachments/assets/9de20b45-2256-4127-8242-141cf1802f39" alt="Demo Mimik" width="800" />
</div>

## 👋 Memulai

Mimik mengubah tugas browser berulang apa pun menjadi panduan terdokumentasi yang bisa dibagikan dalam hitungan detik. Semuanya berjalan di browser-mu. Tanpa backend, tanpa akun, tanpa telemetri, dan tidak ada yang keluar dari perangkatmu.

Baik kamu mendokumentasikan alat internal, menulis tutorial produk, atau melatih rekan tim — Mimik menangkap setiap klik, ketukan, dan navigasi secara otomatis sehingga kamu bisa fokus pada pekerjaan itu sendiri.

Setiap tindakan penting menjadi satu langkah: klik pada tombol dan tautan, input formulir, pintasan keyboard, aksi clipboard, drag-and-drop, dan navigasi halaman. Klik cepat pada elemen terdekat digabungkan agar panduan tetap rapi.

Setiap langkah mendapatkan tangkapan layar dengan elemen yang diklik disorot dan diperbesar. Tanpa pemotongan manual, tanpa alat anotasi yang perlu dipelajari.

| Browser | Dukungan | Metode Instalasi |
| ------- | -------- | ---------------- |
| Chrome / Brave / Vivaldi | Manifest V3 | [Pemasangan Manual (Developer Mode)](#️-pemasangan-manual-developer-mode) |
| Microsoft Edge | Manifest V3 | [Pemasangan Manual (Developer Mode)](#️-pemasangan-manual-developer-mode) |
| Opera / Opera GX | Manifest V3 | [Pemasangan Manual (Developer Mode)](#️-pemasangan-manual-developer-mode) |
| Mozilla Firefox | Manifest V3 | [Pemasangan Manual (Developer Mode)](#️-pemasangan-manual-developer-mode) |

> \[!NOTE]
> **Catatan Mimik Plus**: Ini adalah versi kustom (*fork*). Karena membawa fitur-fitur baru (seperti Penyedia AI Kustom & Bahasa Indonesia) yang tidak ada pada versi asli, ekstensi ini dipasang secara manual menggunakan **Mode Pengembang** (*Developer Mode*) di browser-mu.

Tersedia dalam Bahasa Inggris, Spanyol, Portugis Brasil, Prancis, Jerman, Mandarin, dan kini **Bahasa Indonesia**.

## 🛠️ Pemasangan Manual (Developer Mode)

Karena repositori ini adalah versi kustom (**Mimik Plus**), kamu dapat menginstalnya secara manual di browser favoritmu menggunakan **Mode Pengembang** (*Developer Mode*):

### Langkah 1: Build Ekstensi

Kloning repositori ini dan pasang dependensi:

```bash
git clone https://github.com/MasterPandaa/mimik-plus.git
cd mimik-plus
pnpm install   # atau npm install
```

Jalankan perintah build sesuai browser tujuan:
- **Google Chrome / Edge / Brave / Vivaldi**:
  ```bash
  npm run build
  ```
  *(Hasil build tersimpan di folder `.output/chrome-mv3`)*
- **Opera / Opera GX**:
  ```bash
  npm run build:opera
  ```
  *(Hasil build tersimpan di folder `.output/opera-mv3`)*
- **Mozilla Firefox**:
  ```bash
  npm run build:firefox
  ```
  *(Hasil build tersimpan di folder `.output/firefox-mv3`)*

---

### Langkah 2: Muat Ekstensi di Browser

#### 🌐 Google Chrome, Brave, & Vivaldi
1. Buka browser, lalu navigasi ke `chrome://extensions` (atau `brave://extensions`).
2. Aktifkan sakelar **Developer mode** (Mode Pengembang) di pojok kanan atas.
3. Klik tombol **Load unpacked** (Muat yang dibuka kemasannya) di pojok kiri atas.
4. Pilih folder hasil build: `.output/chrome-mv3`.
5. Klik ikon **Ekstensi** di toolbar browser, lalu **Pin** Mimik Plus.

#### 🌊 Microsoft Edge
1. Navigasi ke `edge://extensions` di address bar Edge.
2. Aktifkan **Developer mode** (Mode Pengembang) di bilah sisi kiri.
3. Klik tombol **Load unpacked** (Muat yang dibuka kemasannya).
4. Pilih folder hasil build: `.output/chrome-mv3`.
5. **Pin** ekstensi Mimik Plus di toolbar.

#### 🔴 Opera / Opera GX
1. Navigasi ke `opera://extensions` di address bar Opera.
2. Aktifkan **Developer mode** di pojok kanan atas.
3. Klik tombol **Load unpacked** (Muat yang dibuka kemasannya).
4. Pilih folder hasil build: `.output/opera-mv3` (atau `.output/chrome-mv3`).
5. **Pin** ekstensi Mimik Plus di toolbar.

#### 🦊 Mozilla Firefox
1. Navigasi ke `about:debugging#/runtime/this-firefox` di address bar Firefox.
2. Klik tombol **Load Temporary Add-on...** (Muat Pengaya Sementara...).
3. Buka folder `.output/firefox-mv3` dan pilih file **`manifest.json`**.

> \[!NOTE]
> Untuk pengembangan langsung (*live reload*), kamu juga dapat menjalankan `npm run dev` (Chrome/Edge/Opera) atau `npm run dev:firefox` (Firefox).

> \[!IMPORTANT]
>
> **⭐️ Bintangi repo ini** jika Mimik Plus menghemat waktumu. Ini membantu orang lain menemukannya!

<a href="https://github.com/MasterPandaa/mimik-plus">
  <img width="100%" alt="Bintangi Mimik Plus di GitHub" src="https://github.com/user-attachments/assets/80d304da-a765-4bde-bf49-b1bdcb4fe804" />
</a>

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## ✨ Fitur

### 🔒 Smart Blur

Mimik secara otomatis mendeteksi dan memblur data sensitif di tangkapan layarmu: email, nomor telepon, SSN, kartu kredit, alamat IP, alamat MAC. Aktifkan atau nonaktifkan setiap kategori secara terpisah.

Perlu memblur sesuatu yang kustom? Pemilih blur manual memungkinkanmu memilih elemen DOM mana pun dan menyembunyikannya di setiap tangkapan layar tempat elemen itu muncul.

<img src="https://github.com/user-attachments/assets/968d2518-c561-4d68-92a6-3d5f569fe38a" alt="Smart Blur" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🧠 Deskripsi AI (opsional)

Gunakan kunci API milikmu sendiri (OpenAI, Anthropic, atau Google Gemini) dan Mimik akan menghasilkan deskripsi langkah yang mudah dibaca seperti *"Klik tombol **Kirim** untuk menyimpan perubahan"* alih-alih `Klik Submit` yang berbasis aturan.

Deskripsi dibuat dari konteks DOM yang ringan (~50-100 token), bukan tangkapan layar. Sekitar 15-30x lebih hemat dibanding model vision. Pilih bahasa deskripsi (Inggris, Spanyol, Portugis, Prancis, Jerman, Mandarin, **Indonesia**).

<img src="https://github.com/user-attachments/assets/3540cbd5-133f-46fd-a9b6-ffce9b4d422a" alt="Deskripsi AI" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🔌 Penyedia AI Kustom (baru!)

Selain OpenAI, Anthropic, dan Google Gemini, kini kamu bisa menghubungkan **API apa pun yang kompatibel dengan OpenAI** sebagai penyedia AI kustom. Ini termasuk model yang di-*host* sendiri seperti Ollama, LM Studio, vLLM, atau penyedia pihak ketiga seperti Together AI, Groq, atau gateway API perusahaanmu.

**Cara menggunakannya:**
1. Buka **Pengaturan** di panel samping Mimik
2. Gulir ke bagian **Penyedia Kustom**
3. Klik **Tambah penyedia**
4. Isi formulir berikut:
   - **ID Penyedia**: Pengenal unik (huruf kecil, angka, tanda hubung, garis bawah — mis. `ollama-lokal`)
   - **Nama Tampilan**: Nama ramah yang ditampilkan di UI
   - **URL Dasar**: Endpoint API (mis. `http://localhost:11434/v1` untuk Ollama)
   - **Kunci API**: Opsional — kosongkan jika autentikasi dikelola lewat header
   - **Model**: Tambahkan satu atau lebih ID model (mis. `llama3.2`, `mistral`)
   - **Header**: Header kustom opsional untuk autentikasi atau routing
5. Klik **Simpan**, lalu pilih penyedia baru dari dropdown penyedia AI
6. Gunakan **Periksa kunci** untuk memverifikasi koneksi sebelum merekam

> [!TIP]
> Untuk Ollama yang berjalan lokal, atur URL Dasar ke `http://localhost:11434/v1` dan tambahkan nama model-mu (mis. `llama3.2`). Tidak perlu kunci API — Ollama tidak memerlukannya.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

### 🗑️ Hapus Langkah Langsung (v1.3.1)

Salah klik tombol atau tidak sengaja membuka tab saat sedang merekam? Kamu tidak perlu mengulang rekaman dari awal atau menunggu selesai merekam. Hapus langkah yang salah secara langsung dari daftar rekaman di panel samping (*side panel*).

Mimik secara instan memperbarui antarmuka pengguna secara optimistik, menghapus data tangkapan layar dari IndexedDB, menyusun ulang indeks langkah yang tersisa, dan memastikan daftar rekaman tetap sinkron tanpa flicker.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🔄 Pemilihan Model Dinamis (v1.3.0)

Menu dropdown model AI kini secara dinamis mengambil dan menampilkan model yang tersedia langsung dari endpoint `/models` penyedia hanya setelah kunci API berhasil diuji dan diverifikasi.

Fitur ini mencegah kesalahan pemilihan model yang tidak didukung akun, mendukung endpoint lokal kustom (Ollama, LM Studio, vLLM) dengan model yang terpasang, serta menjaga tata letak pengaturan tetap intuitif dan ringkas.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### ▶️ Pemutaran Guide Me

Putar ulang panduan mana pun secara langsung di halaman nyata. Mimik menyorot elemen berikutnya yang perlu diklik, melacak progresmu langkah demi langkah, dan maju otomatis saat kamu berinteraksi. Cocok untuk melatih rekan tim atau memandu dirimu sendiri.

<img src="https://github.com/user-attachments/assets/56ffca1d-5074-491f-8571-dd70782d4b05" alt="Pemutaran Guide Me" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🎙️ Narasi suara (opsional)

Ucapkan alur kerja dengan lantang saat merekam dan Mimik akan mengubah ucapanmu menjadi deskripsi langkah. Audio ditranskripsi menggunakan kuncimu sendiri (OpenAI atau Groq) dan dicocokkan dengan langkah yang sesuai — sehingga kamu hanya perlu bernarasi sekali alih-alih menulis setiap langkah secara manual.

<img src="https://github.com/user-attachments/assets/061fddc7-da65-4641-8b39-d30b80c36531" alt="Narasi suara" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### ✏️ Editor panduan

Perbaiki panduan setelah selesai tanpa perlu merekam ulang. Potong, beri anotasi, dan sensor tangkapan layar mana pun; tulis ulang langkah dengan AI secara langsung; sisipkan judul dan catatan di antara langkah; urutkan ulang atau hapus massal; dan kembalikan perubahan melalui riwayat versi.

Setiap langkah kini menampilkan **label sumber** yang menunjukkan asal deskripsinya: `AI`, `Suara`, `Dasar` (berbasis aturan), atau `Diedit` (ditulis manual).

<img src="https://github.com/user-attachments/assets/62d3a01e-b129-44c8-8ba3-e9b97ff08d7e" alt="Editor panduan" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 📤 Ekspor multi-format

Bagikan panduan dalam format yang sesuai dengan alur kerjamu:

- **Video**: panduan bernarasi, mp4/H.264, dengan kursor bergerak ke setiap target
- **GIF**: ekspor animasi, pilih kualitas Kecil/Sedang/Besar
- **PDF**: siap cetak, A4 potret dengan pemutus halaman otomatis
- **DOCX**: buka dan lanjutkan pengeditan di Word
- **HTML**: mandiri, bisa dibagikan di mana saja, gambar tertanam dalam base64
- **Markdown**: tempel ke Notion, GitHub, dokumentasi internal, wiki

Semua ekspor dibuat di sisi klien. Tidak ada yang melalui server.

<img src="https://github.com/user-attachments/assets/e7584527-7d68-4f3f-9261-8380ee08dfb4" alt="Ekspor multi-format" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 🆕 Yang Baru di Fork Ini (v1.3.1)

Fork ini dibangun di atas Mimik dengan peningkatan modern berikut:

| Fitur | Deskripsi |
|-------|-----------|
| 🗑️ **Hapus Langkah Langsung (v1.3.1)** | Hapus langkah yang salah secara instan di panel samping saat perekaman masih aktif. UI optimistik cepat dengan pelacakan client-side untuk mencegah flicker dan penomoran otomatis. |
| 🔄 **Pemilihan Model Dinamis (v1.3.0)** | Menu dropdown model memuat model yang tersedia secara dinamis langsung dari penyedia setelah verifikasi kunci API. |
| 🇮🇩 **Optimasi Caption AI Indonesia** | Panduan prompt natural dan penegasan nada imperatif untuk memastikan deskripsi langkah berbahasa Indonesia tetap berkualitas tinggi di model murah/gratis. |
| 🔴 **Dukungan Opera & Opera GX MV3** | Target build dan paket distribusi resmi Manifest V3 untuk Opera (`npm run build:opera`, `npm run zip:opera`). |
| 🛡️ **Penembusan Shadow DOM** | Pembuatan selektor elemen bertingkat (`host >>> inner`) untuk portal web perusahaan kompleks (seperti sistem Mazda). |
| 🔌 **Penyedia AI Kustom** | Hubungkan API apa pun yang kompatibel dengan OpenAI — Ollama, LM Studio, vLLM, atau gateway pihak ketiga. Atur URL dasar, daftar model, kunci API, dan header kustom. |
| 🌐 **Bahasa Indonesia** | Terjemahan UI lengkap dalam Bahasa Indonesia. Semua panel, dialog, pesan error, dan label ekspor sudah dilokalkan. |
| 🏷️ **Label Sumber Langkah** | Setiap kartu langkah kini menampilkan asal deskripsinya: AI, Suara, Dasar (berbasis aturan), atau Diedit. |
| ✅ **Validasi Kunci API Lebih Baik** | Umpan balik real-time dengan daftar model yang tersedia, peringatan kredit, dan error konektivitas. |
| 🔐 **Validasi Penyimpanan Lebih Ketat** | Setiap baca/tulis ke IndexedDB divalidasi terhadap bentuk yang dideklarasikan, mencegah kerusakan data yang tidak terdeteksi. |

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 🔐 Privasi & penyimpanan

Panduan, langkah, dan tangkapan layar tersimpan di perangkatmu. Tidak ada backend, tidak ada akun, tidak ada telemetri. Kunci API-mu (jika ada) tidak pernah keluar dari browser — disimpan secara lokal dan digunakan untuk memanggil penyedia yang kamu pilih secara langsung.

Dua hal yang keluar dari browser: ikon situs diambil dari layanan favicon Google, dan fitur AI dan narasi suara opsional mengirim teks atau audio ke penyedia yang kamu konfigurasi.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 🤝 Kontribusi

Semua jenis kontribusi disambut: laporan bug, permintaan fitur, PR, dan terjemahan.

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md) untuk pengaturan pengembangan, tata letak proyek, dan panduan kontributor.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## ⭐ Riwayat Bintang

<a href="https://www.star-history.com/#MasterPandaa/mimik-plus&Timeline">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=MasterPandaa/mimik-plus&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=MasterPandaa/mimik-plus&type=Timeline" />
    <img alt="Grafik Riwayat Bintang" src="https://api.star-history.com/svg?repos=MasterPandaa/mimik-plus&type=Timeline" width="800" />
  </picture>
</a>

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 📜 Lisensi

MIT © [Westpoint](https://github.com/westpoint-io) (asli) · Fork dikelola oleh [MasterPandaa](https://github.com/MasterPandaa). Lihat [LICENSE](./LICENSE) untuk detailnya.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-1E1B4B?style=flat-square

[license-shield]: https://img.shields.io/badge/license-MIT-4F46E5?style=flat-square&labelColor=1E1B4B
[license-link]: ./LICENSE

[mv3-shield]: https://img.shields.io/badge/manifest-v3-3730A3?style=flat-square&labelColor=1E1B4B
[mv3-link]: https://developer.chrome.com/docs/extensions/mv3/intro/

[local-shield]: https://img.shields.io/badge/penyimpanan-100%25%20lokal-4F46E5?style=flat-square&labelColor=1E1B4B
[local-link]: #-privasi--penyimpanan

[no-account-shield]: https://img.shields.io/badge/akun-tidak%20diperlukan-4F46E5?style=flat-square&labelColor=1E1B4B
[no-account-link]: #-privasi--penyimpanan

[fork-shield]: https://img.shields.io/badge/fork%20dari-westpoint--io%2Fmimik-6366F1?style=flat-square&labelColor=1E1B4B
[fork-link]: https://github.com/westpoint-io/mimik

[star-shield]: https://img.shields.io/github/stars/MasterPandaa/mimik-plus?style=flat-square&label=bintang&color=4F46E5&labelColor=1E1B4B
[star-link]: https://github.com/MasterPandaa/mimik-plus/stargazers

[contributors-shield]: https://img.shields.io/github/contributors/MasterPandaa/mimik-plus?style=flat-square&labelColor=1E1B4B
[contributors-link]: https://github.com/MasterPandaa/mimik-plus/graphs/contributors

[last-commit-shield]: https://img.shields.io/github/last-commit/MasterPandaa/mimik-plus?style=flat-square&label=commit&labelColor=1E1B4B

[issues-shield]: https://img.shields.io/github/issues/MasterPandaa/mimik-plus?style=flat-square&labelColor=1E1B4B
[issues-link]: https://github.com/MasterPandaa/mimik-plus/issues

[chrome-version-shield]: https://img.shields.io/chrome-web-store/v/jmfohdaflahliammccpiadmkcibohgha?label=Versi%20Chrome&style=flat-square&logo=googlechrome&logoColor=C7D2FE&color=4F46E5&labelColor=1E1B4B
[chrome-link]: https://chromewebstore.google.com/detail/mimik/jmfohdaflahliammccpiadmkcibohgha
[firefox-version-shield]: https://img.shields.io/amo/v/mimik?label=Versi%20Firefox&style=flat-square&logo=firefoxbrowser&logoColor=C7D2FE&color=4F46E5&labelColor=1E1B4B
[firefox-link]: https://addons.mozilla.org/en-US/firefox/addon/mimik/
[edge-version-shield]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fhgjemhfoffebbollleajkpefblppleai&query=%24.version&label=Versi%20Edge&style=flat-square&logo=microsoftedge&logoColor=C7D2FE&color=4F46E5&labelColor=1E1B4B
[edge-link]: https://microsoftedge.microsoft.com/addons/detail/hgjemhfoffebbollleajkpefblppleai
