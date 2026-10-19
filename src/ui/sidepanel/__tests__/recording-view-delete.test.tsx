// @vitest-environment jsdom
import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Step } from '@/core/guides/types';
import { TooltipProvider } from '@/ui/components/ui/tooltip';

const mockGetStepsForGuide = vi.fn();
const mockGetScreenshotsForSteps = vi.fn();
const mockSendMessage = vi.fn();

vi.mock('@/core/guides/service', () => ({
  getStepsForGuide: (...args: unknown[]) => mockGetStepsForGuide(...args),
  getScreenshotsForSteps: (...args: unknown[]) => mockGetScreenshotsForSteps(...args),
}));

vi.mock('@/lib/messaging', () => ({
  sendMessage: (...args: unknown[]) => mockSendMessage(...args),
}));

vi.mock('@/lib/browser-api', () => ({
  getActiveTab: vi.fn().mockResolvedValue({ url: 'https://example.com' }),
  localStorage: {
    get: vi.fn().mockResolvedValue({ voiceEnabled: false }),
    set: vi.fn().mockResolvedValue(undefined),
  },
}));

import RecordingView from '../RecordingView';

describe('RecordingView step deletion', () => {
  const steps: Step[] = [
    {
      id: 'step-1',
      guideId: 'g1',
      index: 0,
      description: 'First step',
      action: 'click',
      url: 'https://example.com',
      timestamp: Date.now(),
    },
    {
      id: 'step-2',
      guideId: 'g1',
      index: 1,
      description: 'Second step',
      action: 'click',
      url: 'https://example.com',
      timestamp: Date.now(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetStepsForGuide.mockResolvedValue([...steps]);
    mockGetScreenshotsForSteps.mockResolvedValue(new Map());
    mockSendMessage.mockResolvedValue({ deleted: true, remainingCount: 1 });
  });

  it('optimistically deletes the step and prevents resurrection on polling', async () => {
    let resolveDeleteMsg: (val: unknown) => void = () => {};
    mockSendMessage.mockReturnValue(
      new Promise((resolve) => {
        resolveDeleteMsg = resolve;
      }),
    );

    const { container } = render(
      <TooltipProvider>
        <RecordingView guideId="g1" onStop={vi.fn()} voice={{ type: 'VOICE_UPDATE', phase: 'idle' }} aiFailure={null} />
      </TooltipProvider>,
    );

    // Wait for initial loadSteps
    await act(async () => {
      await Promise.resolve();
    });

    expect(screen.getByText('First step')).toBeDefined();
    expect(screen.getByText('Second step')).toBeDefined();

    // Click delete on first step
    const deleteButtons = container.querySelectorAll('button[aria-label="recording.deleteStep"]');
    expect(deleteButtons.length).toBe(2);

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    // Optimistic: First step is immediately gone
    expect(screen.queryByText('First step')).toBeNull();
    expect(screen.getByText('Second step')).toBeDefined();

    // Now simulate polling while delete is still pending in DB
    // mockGetStepsForGuide still returns both steps because DB has not completed
    await act(async () => {
      // Re-trigger loadSteps
      const pollingIntervalTrigger = mockGetStepsForGuide;
      await pollingIntervalTrigger('g1');
    });

    // First step should STILL not be resurrected in UI
    expect(screen.queryByText('First step')).toBeNull();
    expect(screen.getByText('Second step')).toBeDefined();

    // Now resolve the background message
    await act(async () => {
      resolveDeleteMsg({ deleted: true, remainingCount: 1 });
    });

    expect(mockSendMessage).toHaveBeenCalledWith('deleteRecordedStep', {
      guideId: 'g1',
      stepId: 'step-1',
    });
  });
});
