<p align="center">
  <img src="https://raw.githubusercontent.com/MasterPandaa/MasterPandaa/main/assets/banners/Mimik-Plus.svg" alt="Mimik Plus Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Standard-Manifest_V3-6366F1?style=flat-square" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Storage-100%25_Local_Privacy-10B981?style=flat-square" alt="Local Privacy">
  <img src="https://img.shields.io/badge/AI-Custom_LLM_Endpoints-8B5CF6?style=flat-square" alt="Custom LLM">
  <img src="https://img.shields.io/badge/i18n-Bahasa_Indonesia-06B6D4?style=flat-square" alt="i18n">
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-gray?style=flat-square" alt="License"></a>
</p>

## Overview

Documenting internal tools, client workflows, and regression test steps is traditionally slow and error-prone, requiring manual screenshot cropping and tedious annotation. Mimik Plus is a community fork of **Mimik by Westpoint**, engineered as a **Manifest V3** browser extension that automatically captures browser interactions into polished, step-by-step guides.

This fork enhances the upstream project with **Custom AI Provider Support**, complete **Indonesian Localization (Bahasa Indonesia)**, strict IndexedDB storage validation, and dynamic model switching.

---

## What Is Enhanced in This Fork

| Capability | Upstream Mimik | Mimik Plus (This Fork) |
| :--- | :--- | :--- |
| **AI Providers** | Fixed proprietary options | Custom endpoints (Ollama, LM Studio, OpenAI-compatible APIs) |
| **Localization** | EN, ES, PT, FR, ZH | Complete **Bahasa Indonesia** translation across all guide views |
| **Step Management** | Post-recording editing only | Live real-time step deletion during active recordings |
| **Model Selection** | Hardcoded model identifiers | Dynamic model configuration with real-time API key validation |
| **Storage Security** | Direct IndexedDB writes | Strict schema validation on every read and write transaction |

---

## Core Capabilities

- **Automatic DOM Action Capture**: Transparently records button clicks, form inputs, navigation events, and hotkeys.
- **Auto-Annotated Cropping**: Automatically zooms and highlights clicked UI elements on captured screenshots.
- **100% Local Privacy Guarantee**: Guides, screenshots, and credentials remain inside local browser storage without telemetry.
- **Smart Blur Filter**: Automatically redacts passwords, credit card numbers, and sensitive form values from captured steps.
- **Multi-Format Export**: Export completed step guides to Markdown, PDF, HTML, or shareable web archives.

---

## Quickstart (Developer Mode)

1. Clone and build:
   ```bash
   git clone https://github.com/MasterPandaa/Mimik-Plus.git
   cd Mimik-Plus
   npm install
   npm run build
   ```

2. Load unpacked extension:
   - In Chrome, Brave, or Edge, navigate to `chrome://extensions`.
   - Enable **Developer mode**.
   - Click **Load unpacked** and select the generated `dist/` directory.

---

## License

This project is licensed under the [MIT License](LICENSE), with original attribution to [Westpoint](https://github.com/westpoint-io).
