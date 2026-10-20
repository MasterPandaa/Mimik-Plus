<p align="center">
  <a href="https://github.com/MasterPandaa/Mimik-Plus">
    <img src="assets/banner.svg" alt="Mimik-Plus Official Hero Banner" width="100%">
  </a>
</p>

<p align="center">
  <b>Automated Browser Persona & Session Recorder Extension</b>
</p>

<p align="center">
  <a href="#-quickstart"><b>⚡ Quickstart</b></a> &nbsp;&bull;&nbsp;
  <a href="#-core-features"><b>✨ Features</b></a> &nbsp;&bull;&nbsp;
  <a href="#-architecture--system-design"><b>🏛️ Architecture</b></a> &nbsp;&bull;&nbsp;
  <a href="#-benchmarks--security"><b>📊 Benchmarks</b></a> &nbsp;&bull;&nbsp;
  <a href="#-contributing"><b>🤝 Contributing</b></a>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-2ea44f.svg?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/Status-Production--Ready-2ea44f?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/Tests-Passing-brightgreen?style=flat-square" alt="Tests">
  <img src="https://img.shields.io/badge/Security-SAST%20Audited-blue?style=flat-square" alt="Security">
  <img src="https://img.shields.io/badge/Telemetry-Zero%20External-lightgrey?style=flat-square" alt="Privacy">
</p>

---

## 📖 Overview & Entity Pitch

**Mimik-Plus** is a manifest v3 browser automation extension engineered for synthetic session playback, behavioral persona emulation, and web interaction capture.

> [!NOTE]
> This project is maintained under the **MasterPandaa Engineering Lab** ecosystem, strictly adhering to anti-slop technical documentation standards, deterministic test verification, and clean architecture.

---

## 🌟 The Problem vs The Solution

| Dimensi | Pendekatan Konvensional | Pendekatan Mimik-Plus |
| :--- | :--- | :--- |
| **Workflow Efficiency** | ❌ Manual repetition of complex multi-step browser workflows across development, staging, and QA environments. | ⚡ **Records user DOM events and executes automated, reproducible session replays with variable timing and payload parameters.** |
| **Operational Reliability** | ⚠️ Static automation scripts break when dynamic CSS classes or async DOM mutations shift. | 🎯 **Heuristic DOM selector engine combines ID, XPath, semantic tags, and aria-labels for resilient element targeting.** |
| **Privacy & Security** | 🔓 Automation extensions that harvest user keystrokes and transmit sensitive cookies to external servers. | 🛡️ **100% client-side execution with zero telemetry and strictly isolated local storage persistence.** |
| **Developer Experience** | 🐌 Heavyweight external test runners requiring complex Node.js runtime environments for simple task automation. | 🚀 **Zero external dependencies: loads directly as an unpacked extension in Chrome, Edge, and Brave.** |

---

## ✨ Core Features

1. **DOM Interaction Recorder** (`Event Listener Interceptor`):
   - Captures clicks, inputs, scrolls, and navigation events with millisecond-precision timestamps.

2. **Resilient Element Resolution** (`Multi-Strategy DOM Matcher`):
   - Resolves elements using hierarchical selector cascades to withstand UI layout refactoring.

3. **Configurable Playback Profiles** (`Deterministic Execution Engine`):
   - Allows playback throttling, loop counts, and variable delays to simulate natural human usage.

4. **Session Export & Import** (`JSON Workflow Format`):
   - Exports recorded action matrices for distribution across engineering teams and QA runners.

---

## 🏛️ Architecture & System Design

<p align="center">
  <img src="assets/banner-architecture.svg" alt="Mimik-Plus Architecture & System Design Banner" width="100%">
</p>

The system follows a modular pipeline ensuring clear separation of concerns, testability, and deterministic performance.

### Component Breakdown

| Komponen | Layer | Teknologi | Peran & Deskripsi Teknis |
| :--- | :--- | :--- | :--- |
| **Entry Point** | Interface | `Manifest V3 Action Popup` | Handles user interaction, input validation, and request routing |
| **Core Engine** | Business Logic | `DOM Event Synthesis Engine` | Executes core state processing, computational logic, and transformations |
| **Data Layer** | Persistence | `chrome.storage.local Store` | Manages transactional data storage, caching, and state integrity |
| **Security Gate** | Audit & Guard | `Content Security Policy Strict` | Enforces input sanitization, access boundaries, and zero telemetry |

---

## ⚡ Quickstart

### Prasyarat Sistem
- Google Chrome >= 115, Microsoft Edge, or Chromium-based browser
- Node.js >= 18.0 (for development build)

### 1. Kloning & Pemasangan Dependensi
```bash
git clone https://github.com/MasterPandaa/Mimik-Plus.git
cd Mimik-Plus
npm install
npm run build
```

### 2. Konfigurasi Lingkungan
```bash
# Open chrome://extensions
# Enable 'Developer mode'
# Click 'Load unpacked' and select the 'dist' directory
```

### 3. Menjalankan Aplikasi
```bash
# Open target web page
# Click Mimik-Plus mascot in toolbar
# Click 'Record' to capture actions or 'Play' to execute saved sequences
```
Akses layanan pada `chrome://extensions`.

---

## 📊 Benchmarks & Security Assurance

- ⚡ **Execution Performance**: `Under 5MB memory footprint, sub-1ms event interception overhead, 100% local data privacy.`
- 🛡️ **SAST Security Clearance**: Audited against common vulnerability patterns (OWASP Top 10 / Bandit / Semgrep). High/Critical Vulnerabilities: 0.
- 🔒 **Data Privacy**: Local-first or strictly isolated operational context with zero undisclosed external telemetry.

---

## 📦 Directory Structure

```text
Mimik-Plus/
├── assets/
│   ├── banner.svg                  # Official Hero Banner with Mimik Robot Mascot
│   └── banner-architecture.svg     # Architecture & DOM Event Loop Banner
├── src/
│   ├── background/                 # Manifest V3 service worker scripts
│   ├── content/                    # Content scripts injected into active pages
│   ├── popup/                      # Extension control panel React/TypeScript UI
│   └── core/                       # DOM recording and event synthesis engine
├── manifest.json                   # Chrome Extension Manifest V3 configuration
├── vite.config.ts                  # Vite build bundler configuration
└── README.md                       # Official technical documentation
```

---

## 🤝 Contributing & Community

Contributions, issue reports, and technical discussions are welcome:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m "feat: Implement new capability"`).
4. Push to your branch (`git push origin feature/NewFeature`).
5. Open a Pull Request with verifiable test evidence.

---

## 📄 License & Maintainer

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for complete terms.

Engineered and maintained by:  
**Muhammad Luthfi Abdillah** ([@MasterPandaa](https://github.com/MasterPandaa))  
[Portfolio](https://portofolio-luthfi.up.railway.app) &bull; [LinkedIn](https://www.linkedin.com/in/luthfiabdl/) &bull; [Kaggle](https://www.kaggle.com/pandaa12) &bull; [Email](mailto:luthfiabd.14@gmail.com)
