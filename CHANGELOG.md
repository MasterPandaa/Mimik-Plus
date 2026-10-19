# Changelog

All notable changes to Mimik will be documented in this file.

## [1.3.1] - 2026-10-19

### Fixed
- **Mid-Recording Step Deletion Reliability**:
  - Eliminated the 800ms polling race condition that caused deleted steps to temporarily flicker back into view before database operations completed by introducing persistent client-side tracking (`deletedStepIdsRef`).
  - Added concurrent deletion support so multiple steps can be removed in sequence without blocking clicks or freezing the interface.
  - Wrapped delete button inside Radix UI Tooltip with a layout span and stop-propagation to ensure flawless click registration.
  - Guarded against jsdom/embedded scroll crashes with safe optional chaining on `scrollIntoView`.
  - Added automatic snapshot creation before single step deletion in dashboard view for full undo/redo history support.
  - Broadcasted `notifyGuidesChanged({ type: 'mutated' })` upon step deletion across all open tabs and sidepanels.

## [1.3.0] - 2026-10-19

### Added
- **Live Step Deletion**: Delete steps directly in the side panel during active recording without having to finish or stop the recording session. Includes automatic re-indexing, clean step numbering badges, and responsive optimistic UI.
- **Dynamic Model Selection**: Model dropdown now dynamically queries and displays available models from the provider's `/models` endpoint only after the API key is verified.
- **Reordered Settings Fields**: AI Settings layout updated to an intuitive flow: Provider → API Key → Dynamic Model Selection → Language.
- **Indonesian AI Captions Optimization**: Added few-shot natural Indonesian prompt guidelines and imperative tone enforcement to ensure high quality descriptions even with low-cost/free AI models.
- **Opera MV3 Support**: Added verified build scripts (`npm run build:opera`) and automated zip distribution packaging (`npm run zip:opera`).

### Fixed
- **Shadow DOM Piercing Selectors**: Resolved `CssSelectorGenerator: shadow root inferred` errors on complex enterprise web portals (such as Mazda systems) by introducing multi-level `host >>> inner` selector chaining.
- **InputSession Mid-Record Race Conditions**: Guarded `handleUpdateInputStep` and `handleFinalizeInputStep` in background service worker to prevent orphaned screenshots or lingering AI jobs if a step is removed while typing is active.
- **Client Input State Auto-Reset**: Content script `InputSession` automatically resets when a step deletion is acknowledged by the background, allowing seamless typing continuation.
- **Locale Test Coverage**: Added missing `settings.modelConnectFirst` translation to Chinese (`zh-CN.yml`) maintaining 100% test coverage across all supported locales.

## [1.2.0] - 2026-10-06

### Added
- **Google Gemini Provider**: Added support for Google Gemini as a built-in AI provider using Google's official OpenAI-compatible REST endpoint (`https://generativelanguage.googleapis.com/v1beta/openai`).
  - Supported models: `gemini-3.8-flash`, `gemini-3.7-flash`, `gemini-3.6-flash`.
  - Support for custom model input selection.

### Fixed
- **Custom Provider Key Check & Inference Fallback**:
  - Fixed logic bug where valid custom provider servers failed validation if inference probing returned HTTP 400/500, even when the model was present in the `/models` catalog.
  - Added inference probe fallback retry without `max_tokens` (resolves issues with reasoning and modern OpenAI-compatible endpoints).
  - Fixed custom provider state synchronization in `SettingsView.tsx` where API keys were wiped or not saved during provider switching or form editing.
  - Fixed error when initializing custom providers without API keys (e.g. local Ollama / LM Studio instances).
  - Enabled API key checking in onboarding wizard for custom providers.
