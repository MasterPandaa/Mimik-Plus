<div align="center"><a name="readme-top"></a>

<img src="public/mascot.svg" width="140" height="140" alt="Mimik mascot" />

# Mimik Plus

**English** · [Español](./README.es.md) · [Português (BR)](./README.pt-BR.md) · [Français](./README.fr.md) · [简体中文](./README.zh-CN.md) · [Bahasa Indonesia](./README.id.md)

**Auto-capture any browser workflow into a step-by-step guide. No account, no cloud, no tracking.**

Click record, do the thing, get a polished guide with annotated screenshots. Narrate it as you go, edit it after, then replay or export.

> **This is a community fork of [Mimik](https://github.com/westpoint-io/mimik) by Westpoint**, enhanced with additional features including custom AI provider support, Indonesian language (Bahasa Indonesia), and other improvements. All original credit goes to the Westpoint team.

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
[![Forked From][fork-shield]][fork-link]

</div>

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [📺 Demo](#-demo)
- [👋 Getting Started](#-getting-started)
- [🛠️ Manual Installation (Developer Mode)](#️-manual-installation-developer-mode)
- [✨ Features](#-features)
  - [🔒 Smart Blur](#-smart-blur)
  - [🧠 AI descriptions (optional)](#-ai-descriptions-optional)
  - [🔌 Custom AI Providers (new!)](#-custom-ai-providers-new)
  - [🗑️ Live Step Deletion (v1.3.1)](#️-live-step-deletion-v131)
  - [🔄 Dynamic Model Selection (v1.3.0)](#-dynamic-model-selection-v130)
  - [▶️ Guide Me replay](#️-guide-me-replay)
  - [🎙️ Voice narration (optional)](#️-voice-narration-optional)
  - [✏️ Guide editor](#️-guide-editor)
  - [📤 Multi-format export](#-multi-format-export)
  - [🌐 Indonesian Language Support (new!)](#-indonesian-language-support-new)
- [🆕 What's New in This Fork](#-whats-new-in-this-fork)
- [🔐 Privacy & storage](#-privacy--storage)
- [🤝 Contributing](#-contributing)
- [⭐ Star History](#-star-history)
- [📜 License](#-license)

<br/>

</details>

## 📺 Demo

<div align="center">
<img src="https://github.com/user-attachments/assets/9de20b45-2256-4127-8242-141cf1802f39" alt="Mimik demo" width="800" />
</div>

## 👋 Getting Started

Mimik turns any repetitive browser task into a documented, shareable guide in seconds. It runs entirely in your browser. No backend, no account, no telemetry, and nothing ever leaves your device.

Whether you're documenting internal tools, writing product tutorials, or onboarding a teammate, Mimik captures every click, keystroke, and navigation automatically so you can focus on the work.

Every meaningful action becomes a step: clicks on buttons and links, form inputs, keyboard shortcuts, clipboard actions, drag events, and page navigations. Rapid clicks on nearby elements are merged so guides stay clean, and clicks are intercepted before the page navigates away, so nothing is lost on SPAs or full page loads.

Each step gets a screenshot with the clicked element highlighted and zoomed in. No manual cropping, no annotation tools to learn.

| Browser | Support | Installation Method |
| ------- | ------- | ------------------- |
| Chrome / Brave / Vivaldi | Manifest V3 | [Manual Installation (Developer Mode)](#️-manual-installation-developer-mode) |
| Microsoft Edge | Manifest V3 | [Manual Installation (Developer Mode)](#️-manual-installation-developer-mode) |
| Opera / Opera GX | Manifest V3 | [Manual Installation (Developer Mode)](#️-manual-installation-developer-mode) |
| Mozilla Firefox | Manifest V3 | [Manual Installation (Developer Mode)](#️-manual-installation-developer-mode) |

> \[!NOTE]
> **Mimik Plus Notice**: This repository is a custom community fork. To use our new features (Custom AI Providers, Bahasa Indonesia, etc.), load the extension manually in your browser using **Developer Mode**.

Available in English, Spanish, Brazilian Portuguese, French, German, Simplified Chinese, and now **Bahasa Indonesia**. The AI description language is set separately, so you can run Mimik in English and generate guides in any supported language.

## 🛠️ Manual Installation (Developer Mode)

Since this repository is a custom version (**Mimik Plus**), you can install it manually in your preferred browser using **Developer Mode**:

### Step 1: Build the Extension

Clone this repository and install dependencies:

```bash
git clone https://github.com/MasterPandaa/mimik-plus.git
cd mimik-plus
pnpm install   # or npm install
```

Run the build command for your target browser:
- **Google Chrome / Edge / Brave / Vivaldi**:
  ```bash
  npm run build
  ```
  *(Build output will be in `.output/chrome-mv3`)*
- **Opera / Opera GX**:
  ```bash
  npm run build:opera
  ```
  *(Build output will be in `.output/opera-mv3`)*
- **Mozilla Firefox**:
  ```bash
  npm run build:firefox
  ```
  *(Build output will be in `.output/firefox-mv3`)*

---

### Step 2: Load Extension into Browser

#### 🌐 Google Chrome, Brave, & Vivaldi
1. Open browser and navigate to `chrome://extensions` (or `brave://extensions`).
2. Toggle on **Developer mode** in the top right corner.
3. Click **Load unpacked** in the top left corner.
4. Select the build directory: `.output/chrome-mv3`.
5. Pin **Mimik Plus** from the extensions toolbar.

#### 🌊 Microsoft Edge
1. Navigate to `edge://extensions`.
2. Toggle on **Developer mode** in the left sidebar.
3. Click **Load unpacked**.
4. Select the build directory: `.output/chrome-mv3`.
5. Pin **Mimik Plus** from the toolbar.

#### 🔴 Opera / Opera GX
1. Navigate to `opera://extensions`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked**.
4. Select the build directory: `.output/opera-mv3` (or `.output/chrome-mv3`).
5. Pin **Mimik Plus** from the toolbar.

#### 🦊 Mozilla Firefox
1. Navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select `manifest.json` inside `.output/firefox-mv3`.

> \[!NOTE]
> For active development with live reload, you can run `npm run dev` (Chrome/Edge/Opera) or `npm run dev:firefox` (Firefox).

> \[!IMPORTANT]
>
> **⭐️ Star the repo** if Mimik Plus saves you time. It helps other people discover it!

<a href="https://github.com/MasterPandaa/mimik-plus">
  <img width="100%" alt="Star Mimik Plus on GitHub" src="https://github.com/user-attachments/assets/80d304da-a765-4bde-bf49-b1bdcb4fe804" />
</a>

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## ✨ Features

### 🔒 Smart Blur

Mimik automatically detects and blurs sensitive data in your screenshots: emails, phone numbers, SSNs, credit cards, IP addresses, MAC addresses. Toggle each category independently.

Need to blur something custom? The manual blur picker lets you select any DOM element and mask it across every screenshot where it appears.

<img src="https://github.com/user-attachments/assets/968d2518-c561-4d68-92a6-3d5f569fe38a" alt="Smart Blur" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🧠 AI descriptions (optional)

Bring your own API key (OpenAI, Anthropic, or Google Gemini) and Mimik generates human-readable step descriptions like *"Click the **Submit** button to save changes"* instead of the rule-based `Click Submit`.

Descriptions are generated from a lightweight DOM context (~50-100 tokens), not screenshots. Roughly 15-30x cheaper than vision models. Choose the language you want descriptions in (English, Spanish, Portuguese, French, German, Chinese, Indonesian).

<img src="https://github.com/user-attachments/assets/3540cbd5-133f-46fd-a9b6-ffce9b4d422a" alt="AI descriptions" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🔌 Custom AI Providers (new!)

Beyond OpenAI, Anthropic, and Google Gemini, you can now connect **any OpenAI-compatible API** as a custom AI provider. This includes self-hosted models via Ollama, LM Studio, vLLM, or any other OpenAI-compatible endpoint — as well as third-party providers like Together AI, Groq, or your own company's API gateway.

**How to use:**
1. Open **Settings** in the Mimik side panel
2. Scroll to the **Custom Providers** section
3. Click **Add provider**
4. Fill in:
   - **Provider ID**: A unique identifier (lowercase letters, numbers, hyphens, underscores — e.g., `my-ollama`)
   - **Display Name**: A friendly name shown in the UI
   - **Base URL**: The API endpoint (e.g., `http://localhost:11434/v1` for Ollama)
   - **API Key**: Optional — leave blank if authentication is managed via headers
   - **Models**: Add one or more model IDs (e.g., `llama3.2`, `mistral`)
   - **Headers**: Optional custom headers for authentication or routing
5. Click **Save**, then select the new provider from the AI provider dropdown
6. Use **Check Key** to verify the connection before recording

> [!TIP]
> For Ollama running locally, set Base URL to `http://localhost:11434/v1` and add your model names (e.g., `llama3.2`). No API key required — Ollama doesn't need one.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

### 🗑️ Live Step Deletion (v1.3.1)

Accidentally clicked the wrong button or opened an unwanted tab while recording? You don't have to restart or wait until recording finishes. Delete mistaken steps directly from the live recording feed in the side panel.

Mimik immediately updates the UI optimistically, removes the screenshot and step data from IndexedDB, re-indexes remaining steps, and ensures the feed stays in sync without flickering.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🔄 Dynamic Model Selection (v1.3.0)

The AI model selection dropdown dynamically fetches and displays available models directly from the provider's `/models` endpoint only after your API key is tested and verified.

This prevents invalid model selections, supports custom self-hosted endpoints (Ollama, LM Studio, vLLM) with their installed models, and keeps the settings interface intuitive and streamlined.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### ▶️ Guide Me replay

Replay any guide live on a real page. Mimik highlights the next element to click, tracks your progress step by step, and advances automatically as you interact. Perfect for onboarding teammates or walking through a process yourself.

<img src="https://github.com/user-attachments/assets/56ffca1d-5074-491f-8571-dd70782d4b05" alt="Guide Me replay" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🎙️ Voice narration (optional)

Talk through the workflow out loud while you record and Mimik turns what you said into the step
descriptions. Audio is transcribed with your own key (OpenAI or Groq) and matched to the steps it
belongs to, so you narrate once instead of writing every step by hand.

<img src="https://github.com/user-attachments/assets/061fddc7-da65-4641-8b39-d30b80c36531" alt="Voice narration" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### ✏️ Guide editor

Fix a guide after the fact without re-recording. Crop, annotate and redact any screenshot, rewrite a
step with AI inline, drop headings and notes between steps, reorder or bulk-delete, and roll back
through version history.

Each step now shows a **source label** indicating where its description came from: `AI`, `Voice`, `Basic` (rule-based), or `Edited` (manually written).

<img src="https://github.com/user-attachments/assets/62d3a01e-b129-44c8-8ba3-e9b97ff08d7e" alt="Guide editor" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 📤 Multi-format export

Share guides in whatever format fits your workflow:

- **Video**: narrated walkthrough, mp4/H.264, with the cursor moving to each target
- **GIF**: animated export, choose Small/Medium/Large quality
- **PDF**: print-ready, A4 portrait with auto page breaks
- **DOCX**: open and keep editing in Word
- **HTML**: self-contained, share anywhere, base64-embedded images
- **Markdown**: paste into Notion, GitHub, internal docs, wikis

All exports are generated client-side. Nothing touches a server.

<img src="https://github.com/user-attachments/assets/e7584527-7d68-4f3f-9261-8380ee08dfb4" alt="Multi-format export" width="800" />

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

### 🌐 Indonesian Language Support (new!)

Mimik Plus now includes full support for **Bahasa Indonesia**. The entire interface — sidepanel, guide editor, onboarding wizard, export dialogs, settings, and error messages — is fully translated.

**How to switch to Indonesian:**
1. Open the extension settings page (click the gear icon in the sidepanel)
2. Your browser's language preference is detected automatically. If your browser is set to Indonesian (`id`), the UI will display in Bahasa Indonesia
3. AI-generated step descriptions can also be set to Indonesian — go to **Settings → AI Language → Indonesian**

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 🆕 What's New in This Fork (v1.3.1)

This fork builds on top of Mimik with the following modern additions:

| Feature | Description |
|---------|-------------|
| 🗑️ **Live Step Deletion (v1.3.1)** | Delete mistaken steps on-the-fly directly in the side panel during active recording. Instant optimistic UI with persistent client-side tracking to prevent flickering and automatic step renumbering. |
| 🔄 **Dynamic Model Selection (v1.3.0)** | Model selector dynamically loads available models directly from your provider upon API key verification. |
| 🇮🇩 **Optimized Indonesian AI Captions** | Enhanced prompt guidelines and imperative tone enforcement to ensure natural, concise descriptions in Bahasa Indonesia even on budget/free models. |
| 🔴 **Opera & Opera GX MV3 Support** | Dedicated Manifest V3 build targets and distribution packaging (`npm run build:opera`, `npm run zip:opera`). |
| 🛡️ **Shadow DOM Piercing** | Deep element selector generation (`host >>> inner`) resolving capture issues on complex enterprise web portals (e.g. Mazda systems). |
| 🔌 **Custom AI Providers** | Connect any OpenAI-compatible API — Ollama, LM Studio, vLLM, or third-party gateways. Set custom base URL, model list, API key, and request headers. |
| 🌐 **Bahasa Indonesia** | Full UI translation for Indonesian language. All panels, dialogs, error messages, and export labels are localized. |
| 🏷️ **Step Source Labels** | Each step card now shows where its description came from: AI, Voice, Basic (rule-based), or Edited. |
| ✅ **Improved API Key Validation** | Real-time verification with available model lists, spending warnings, and connectivity errors. |
| 🔐 **Stricter Storage Validation** | Every read/write to IndexedDB is validated against the declared shape, preventing silent data corruption. |

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 🔐 Privacy & storage

Guides, steps, and screenshots live on your device. There's no backend, no account, no telemetry. Your API keys (if you bring one) never leave your browser — they're stored locally and used to call the provider you chose directly.

Two things do leave the browser: site icons are fetched from Google's favicon service, and the optional AI and voice features send text or audio to the provider you configured.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 🤝 Contributing

Contributions of all kinds are welcome: bug reports, feature requests, PRs, and translations.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup, project layout, and contributor guidelines.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## ⭐ Star History

<a href="https://www.star-history.com/#MasterPandaa/mimik-plus&Timeline">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=MasterPandaa/mimik-plus&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=MasterPandaa/mimik-plus&type=Timeline" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=MasterPandaa/mimik-plus&type=Timeline" width="800" />
  </picture>
</a>

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

## 📜 License

MIT © [Westpoint](https://github.com/westpoint-io) (original) · Fork maintained by [MasterPandaa](https://github.com/MasterPandaa). See [LICENSE](./LICENSE) for details.

<div align="right">

[![Back to top][back-to-top]](#readme-top)

</div>

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-1E1B4B?style=flat-square

[license-shield]: https://img.shields.io/badge/license-MIT-4F46E5?style=flat-square&labelColor=1E1B4B
[license-link]: ./LICENSE

[mv3-shield]: https://img.shields.io/badge/manifest-v3-3730A3?style=flat-square&labelColor=1E1B4B
[mv3-link]: https://developer.chrome.com/docs/extensions/mv3/intro/

[local-shield]: https://img.shields.io/badge/storage-100%25%20local-4F46E5?style=flat-square&labelColor=1E1B4B
[local-link]: #-privacy--storage

[no-account-shield]: https://img.shields.io/badge/account-not%20required-4F46E5?style=flat-square&labelColor=1E1B4B
[no-account-link]: #-privacy--storage

[fork-shield]: https://img.shields.io/badge/fork%20of-westpoint--io%2Fmimik-6366F1?style=flat-square&labelColor=1E1B4B
[fork-link]: https://github.com/westpoint-io/mimik

[star-shield]: https://img.shields.io/github/stars/MasterPandaa/mimik-plus?style=flat-square&label=stars&color=4F46E5&labelColor=1E1B4B
[star-link]: https://github.com/MasterPandaa/mimik-plus/stargazers

[contributors-shield]: https://img.shields.io/github/contributors/MasterPandaa/mimik-plus?style=flat-square&labelColor=1E1B4B
[contributors-link]: https://github.com/MasterPandaa/mimik-plus/graphs/contributors

[last-commit-shield]: https://img.shields.io/github/last-commit/MasterPandaa/mimik-plus?style=flat-square&label=commit&labelColor=1E1B4B

[issues-shield]: https://img.shields.io/github/issues/MasterPandaa/mimik-plus?style=flat-square&labelColor=1E1B4B
[issues-link]: https://github.com/MasterPandaa/mimik-plus/issues

[chrome-version-shield]: https://img.shields.io/chrome-web-store/v/jmfohdaflahliammccpiadmkcibohgha?label=Chrome%20Version&style=flat-square&logo=googlechrome&logoColor=C7D2FE&color=4F46E5&labelColor=1E1B4B
[chrome-link]: https://chromewebstore.google.com/detail/mimik/jmfohdaflahliammccpiadmkcibohgha
[firefox-version-shield]: https://img.shields.io/amo/v/mimik?label=Firefox%20Version&style=flat-square&logo=firefoxbrowser&logoColor=C7D2FE&color=4F46E5&labelColor=1E1B4B
[firefox-link]: https://addons.mozilla.org/en-US/firefox/addon/mimik/
[edge-version-shield]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fhgjemhfoffebbollleajkpefblppleai&query=%24.version&label=Edge%20Version&style=flat-square&logo=microsoftedge&logoColor=C7D2FE&color=4F46E5&labelColor=1E1B4B
[edge-link]: https://microsoftedge.microsoft.com/addons/detail/hgjemhfoffebbollleajkpefblppleai
