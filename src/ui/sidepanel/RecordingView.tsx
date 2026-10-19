import { Check, EyeOff, Loader2, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { browser, i18n } from '#imports';
import { getScreenshotsForSteps, getStepsForGuide } from '@/core/guides/service';
import type { Screenshot, Step } from '@/core/guides/types';
import { getActiveTab, localStorage } from '@/lib/browser-api';
import { logger } from '@/lib/logger';
import { sendMessage } from '@/lib/messaging';
import type { PanelAiUpdate, PanelVoiceUpdate } from '@/lib/port';
import { extractDomain } from '@/lib/utils';
import { Button } from '@/ui/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/components/ui/tooltip';
import ScreenshotView from '@/ui/shared/ScreenshotView';
import StepSourceBadge from '@/ui/shared/StepSourceBadge';
import AiStatus from './AiStatus';
import MicToggle from './MicToggle';
import VoiceStatus from './VoiceStatus';

interface RecordingViewProps {
  guideId: string;
  onStop: () => void;
  voice: PanelVoiceUpdate;
  aiFailure: PanelAiUpdate | null;
}

function timeAgo(createdAt: number): string {
  const diff = Math.floor((Date.now() - createdAt) / 1000);
  if (diff < 3) return i18n.t('recording.justNow');
  if (diff < 60) return i18n.t('recording.secondsAgo', [String(diff)]);
  return i18n.t('recording.minutesAgo', [String(Math.floor(diff / 60))]);
}

interface LiveStep {
  step: Step;
  screenshot?: Screenshot;
}

export default function RecordingView({ guideId, onStop, voice, aiFailure }: RecordingViewProps) {
  const [steps, setSteps] = useState<LiveStep[]>([]);
  const [siteUrl, setSiteUrl] = useState('');
  const [isBlurring, setIsBlurring] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [deletingStepIds, setDeletingStepIds] = useState<Set<string>>(() => new Set());
  const deletedStepIdsRef = useRef<Set<string>>(new Set());
  const [, setTick] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevStepsLengthRef = useRef(0);

  const loadSteps = useCallback(async () => {
    const allSteps = await getStepsForGuide(guideId);
    const visibleSteps = allSteps.filter((s) => !deletedStepIdsRef.current.has(s.id));
    const screenshotIds = visibleSteps.map((s) => s.screenshotId).filter(Boolean) as string[];
    const screenshotMap = await getScreenshotsForSteps(screenshotIds);

    setSteps(
      visibleSteps.map((step) => ({
        step,
        screenshot: screenshotMap.get(step.id),
      })),
    );

    if (visibleSteps.length > 0 && !siteUrl) {
      setSiteUrl(visibleSteps[0].url || '');
    }
  }, [guideId, siteUrl]);

  useEffect(() => {
    loadSteps();
    const interval = setInterval(loadSteps, 800);
    return () => clearInterval(interval);
  }, [loadSteps]);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (steps.length > prevStepsLengthRef.current) {
      const scroll = () => bottomRef.current?.scrollIntoView?.({ behavior: 'smooth' });
      scroll();
      const t = setTimeout(scroll, 300);
      prevStepsLengthRef.current = steps.length;
      return () => clearTimeout(t);
    }
    prevStepsLengthRef.current = steps.length;
  }, [steps.length]);

  useEffect(() => {
    getActiveTab().then((tab) => {
      if (tab?.url) setSiteUrl(tab.url);
    });
  }, []);

  useEffect(() => {
    if (import.meta.env.BROWSER === 'firefox') return;
    localStorage.get(['voiceEnabled']).then((stored) => setVoiceEnabled(stored.voiceEnabled === true));
  }, []);

  useEffect(() => {
    if (voice.phase !== 'error' || voice.reason !== 'permission-denied') return;
    setVoiceEnabled(false);
    void localStorage.set({ voiceEnabled: false });
  }, [voice.phase, voice.reason]);

  const handleBlur = useCallback(async () => {
    await sendMessage('enterBlurMode', undefined);
    setIsBlurring(true);
  }, []);

  useEffect(() => {
    const handler = (changes: Record<string, { newValue?: unknown }>) => {
      if ('mimikBlurMode' in changes && changes.mimikBlurMode.newValue === false) {
        setIsBlurring(false);
      }
    };
    browser.storage.onChanged.addListener(handler);
    return () => browser.storage.onChanged.removeListener(handler);
  }, []);

  const handleDeleteStep = useCallback(
    async (stepId: string) => {
      if (deletedStepIdsRef.current.has(stepId)) return;
      deletedStepIdsRef.current.add(stepId);
      setDeletingStepIds((prev) => new Set(prev).add(stepId));
      // Optimistic update
      setSteps((prev) => prev.filter((s) => s.step.id !== stepId));
      try {
        await sendMessage('deleteRecordedStep', { guideId, stepId });
        await loadSteps();
      } catch (err) {
        logger.error('Failed to delete step during recording', err);
        deletedStepIdsRef.current.delete(stepId);
        await loadSteps();
      } finally {
        setDeletingStepIds((prev) => {
          const next = new Set(prev);
          next.delete(stepId);
          return next;
        });
      }
    },
    [guideId, loadSteps],
  );

  const _domain = extractDomain(siteUrl);
  return (
    <div className="flex flex-col h-screen bg-card relative">
      {/* Floating recording pill */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-border shadow-sm">
        <span className={`w-2 h-2 rounded-full ${isBlurring ? 'bg-accent' : 'bg-destructive animate-pulse'}`} />
        <span className="text-xs font-semibold text-foreground">
          {isBlurring
            ? i18n.t('recording.capturePaused')
            : steps.length === 1
              ? i18n.t('recording.recording', [String(steps.length)])
              : i18n.t('recording.recordingPlural', [String(steps.length)])}
        </span>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto pt-12">
        {steps.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <svg width="64" height="64" viewBox="0 0 200 200" fill="none">
              <rect x="30" y="105" width="140" height="68" rx="5" fill="#1E1B4B" />
              <path d="M30 105 L30 90 Q30 70, 100 70 Q170 70, 170 90 L170 105 Z" fill="#3730A3" />
              <rect x="30" y="103" width="140" height="3" fill="#C7D2FE" />
              <path d="M68 132 Q76 122 84 132" stroke="#C7D2FE" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M116 132 Q124 122 132 132" stroke="#C7D2FE" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M84 148 Q100 158 116 148" stroke="#C7D2FE" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <rect x="60" y="38" width="80" height="50" rx="8" fill="#3730A3" stroke="#3730A3" strokeWidth="2" />
              <circle cx="100" cy="62" r="16" fill="#1E1B4B" stroke="#3730A3" strokeWidth="2" />
              <circle cx="100" cy="62" r="9" fill="#080818" />
              <circle cx="100" cy="62" r="4" fill="#C7D2FE" opacity="0.4" />
              <rect x="112" y="42" width="18" height="8" rx="3" fill="#C7D2FE" opacity="0.7" />
              <circle cx="121" cy="38" r="20" fill="#C7D2FE" className="animate-[cam-flash_3s_ease_infinite]" />
              <circle cx="80" cy="42" r="5" fill="#4F46E5" />
              <ellipse cx="54" cy="64" rx="10" ry="8" fill="#1E1B4B" />
              <ellipse cx="146" cy="64" rx="10" ry="8" fill="#1E1B4B" />
            </svg>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">{i18n.t('recording.readyTitle')}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{i18n.t('recording.readySub')}</p>
            </div>
          </div>
        ) : (
          <div>
            {steps.map((liveStep, idx) => (
              <div key={liveStep.step.id}>
                <div className="px-4 pb-4 group">
                  {liveStep.screenshot && (
                    <div className="mb-2">
                      <ScreenshotView
                        screenshot={liveStep.screenshot}
                        alt={liveStep.step.description}
                        className="shadow-sm"
                        crop
                        animate
                        readOnly
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary text-foreground/80">
                          {i18n.t('steps.stepLabel', [String(idx + 1)])}
                        </span>
                      </div>
                      {liveStep.step.aiPending ? (
                        <p className="flex items-center gap-1.5 text-[13px] font-medium leading-snug text-muted-foreground">
                          <Loader2 size={13} className="animate-spin shrink-0" />
                          {i18n.t(
                            voice.phase === 'recording' || voice.phase === 'transcribing'
                              ? 'editor.transcribingStepDescription'
                              : 'editor.writingStepDescription',
                          )}
                        </p>
                      ) : (
                        <p className="text-[13px] font-medium leading-snug text-foreground break-words">
                          {liveStep.step.description}
                        </p>
                      )}
                      <span className="flex items-baseline gap-1.5 text-[10px] text-purple mt-0.5">
                        {!liveStep.step.aiPending && <StepSourceBadge source={liveStep.step.descriptionSource} />}
                        <span>
                          {timeAgo(liveStep.step.timestamp)} · {extractDomain(liveStep.step.url || siteUrl)}
                        </span>
                      </span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="shrink-0">
                          <button
                            type="button"
                            disabled={deletingStepIds.has(liveStep.step.id)}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleDeleteStep(liveStep.step.id);
                            }}
                            aria-label={i18n.t('recording.deleteStep')}
                            className="p-1.5 rounded-md text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 focus-visible:opacity-100 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            {deletingStepIds.has(liveStep.step.id) ? (
                              <Loader2 size={14} className="animate-spin text-destructive" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                          </button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent align="end">{i18n.t('recording.deleteStep')}</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                {idx < steps.length - 1 && <div className="mx-4 mb-4 h-px bg-border" />}
              </div>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-border">
        <AiStatus update={aiFailure} />
        {import.meta.env.BROWSER !== 'firefox' && <VoiceStatus update={voice} enabled={voiceEnabled} />}
        <div className="px-4 py-2.5 flex items-center gap-2">
          <Button onClick={onStop} className="flex-1 h-10 rounded-full font-semibold text-[13px]">
            <Check size={16} strokeWidth={3} />
            {i18n.t('recording.finishRecording')}
          </Button>
          {import.meta.env.BROWSER !== 'firefox' && (
            <MicToggle enabled={voiceEnabled} live={voice.phase === 'recording'} onChange={setVoiceEnabled} />
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="shrink-0">
                <button
                  onClick={handleBlur}
                  disabled={isBlurring}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors text-muted-foreground hover:border-accent hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <EyeOff size={16} />
                </button>
              </span>
            </TooltipTrigger>
            <TooltipContent>{i18n.t('recording.smartBlur')}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onStop}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors text-purple hover:border-destructive/30 hover:text-destructive"
              >
                <X size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent align="end">{i18n.t('recording.discard')}</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
