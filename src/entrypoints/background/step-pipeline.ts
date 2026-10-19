import { AI_RUNTIME_SETTINGS, resolveAiRuntime } from '@/core/capture/ai/custom-providers';
import type { DOMContext } from '@/core/capture/dom/context';
import { CaptureState } from '@/core/capture/machine';
import { buildFallbackDescription } from '@/core/capture/step-description';
import { db } from '@/core/guides/db';
import {
  addStepToGuide,
  clearStepAiPending,
  createStep,
  saveScreenshot,
  updateStepDescription,
} from '@/core/guides/service';
import type { ElementMeta, Screenshot, Step } from '@/core/guides/types';
import { DEFAULT_TARGET_COLOR } from '@/core/screenshot/types';
import { captureVisibleTab, localStorage } from '@/lib/browser-api';
import { logger } from '@/lib/logger';
import type { CaptureStepData, CaptureStepResponse } from '@/lib/messaging';
import { getActor } from './actor';
import { generateAiDescription } from './ai-description';
import { deferDescription, shouldQueueAiDescription } from './deferred-descriptions';
import { queueDescription } from './description-queue';
import { flushNarrationForStep, getVoiceUpdate } from './voice';

async function takeScreenshot(stepId: string, meta: ElementMeta, windowId?: number): Promise<string | undefined> {
  try {
    const { targetColor } = await localStorage.get(['targetColor']);
    const dataUrl = await captureVisibleTab('jpeg', 90, windowId);
    const blob = await fetch(dataUrl).then((r) => r.blob());
    const img = await createImageBitmap(blob);
    const screenshot: Screenshot = {
      id: crypto.randomUUID(),
      stepId,
      blob,
      mimeType: 'image/jpeg',
      width: img.width,
      height: img.height,
      bounds: { x: meta.rect.x, y: meta.rect.y, width: meta.rect.width, height: meta.rect.height },
      pixelRatio: meta.devicePixelRatio,
      clickPoint: meta.clickPoint,
      edits: {
        target: {
          x: meta.rect.x * meta.devicePixelRatio,
          y: meta.rect.y * meta.devicePixelRatio,
          width: meta.rect.width * meta.devicePixelRatio,
          height: meta.rect.height * meta.devicePixelRatio,
          border: 'dashed',
          color: (targetColor as string) || DEFAULT_TARGET_COLOR,
        },
      },
    };
    img.close();
    await saveScreenshot(screenshot);
    return screenshot.id;
  } catch (err) {
    logger.warn('Screenshot capture failed', err);
    return undefined;
  }
}

async function hasAiAuth(): Promise<boolean> {
  return resolveAiRuntime(await localStorage.get([...AI_RUNTIME_SETTINGS])) !== null;
}

async function tryAIDescription(stepId: string, domContext: DOMContext) {
  if (!(await hasAiAuth())) return;
  const existing = await db.steps.get(stepId);
  if (!existing) return;
  try {
    await clearStepAiPending(stepId, await generateAiDescription(domContext));
  } catch (err) {
    await clearStepAiPending(stepId);
    throw err;
  }
}

export async function handleCaptureStep(data: CaptureStepData, windowId?: number): Promise<CaptureStepResponse> {
  const snap = getActor().getSnapshot();
  if (snap.value !== CaptureState.RECORDING) return { ignored: true };

  const stepIndex = snap.context.stepCount;
  getActor().send({ type: 'USER_ACTION' });

  const guideId = snap.context.currentGuideId!;
  const stepId = crypto.randomUUID();

  const screenshotId = await takeScreenshot(stepId, data.elementMeta, windowId);

  const narrationCapturing = getVoiceUpdate().phase === 'recording';
  const hasAiKey = await hasAiAuth();
  const willUseAI = shouldQueueAiDescription({
    action: data.action,
    hasDomContext: !!data.domContext,
    hasAiKey,
    narrationCapturing,
  });

  const timestamp = Date.now();
  await createStep({
    id: stepId,
    guideId,
    index: stepIndex,
    description: buildFallbackDescription(data.action, data.elementMeta),
    action: data.action,
    url: snap.context.currentUrl,
    timestamp,
    screenshotId,
    elementMeta: data.elementMeta,
    descriptionSource: 'heuristic',
    aiPending: willUseAI || narrationCapturing,
    ...(data.domContext ? { domContext: JSON.stringify(data.domContext) } : {}),
  });
  await addStepToGuide(guideId, stepId);

  const domContext = data.domContext;
  if (data.action !== 'input' && domContext) {
    if (willUseAI) queueDescription(guideId, () => tryAIDescription(stepId, domContext));
    else if (narrationCapturing && hasAiKey) deferDescription(guideId, stepId, domContext);
  }

  if (narrationCapturing) void flushNarrationForStep(guideId, stepId, timestamp);

  return { stepId };
}

export async function handleUpdateInputStep(
  stepId: string,
  description: string,
  inputValue?: string,
): Promise<{ updated: boolean; deleted?: boolean }> {
  const step = await db.steps.get(stepId);
  if (!step) {
    return { updated: false, deleted: true };
  }
  await updateStepDescription(stepId, description);
  if (inputValue !== undefined) {
    await db.steps.update(stepId, { inputValue });
  }
  return { updated: true };
}

export async function handleFinalizeInputStep(
  stepId: string,
  elementMeta: ElementMeta,
  domContext: DOMContext | undefined,
  windowId?: number,
): Promise<{ updated: boolean; deleted?: boolean }> {
  const step = await db.steps.get(stepId);
  if (!step) {
    return { updated: false, deleted: true };
  }

  const screenshotId = await takeScreenshot(stepId, elementMeta, windowId);
  const updates: Partial<Step> = { elementMeta };
  if (screenshotId) updates.screenshotId = screenshotId;
  if (domContext) updates.domContext = JSON.stringify(domContext);
  await db.steps.update(stepId, updates);

  const guideId = step.guideId;
  if (domContext && guideId) {
    queueDescription(guideId, () => tryAIDescription(stepId, domContext));
  }
  return { updated: true };
}
