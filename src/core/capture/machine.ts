import { assign, createMachine, type SnapshotFrom } from 'xstate';

export const CaptureState = {
  IDLE: 'IDLE',
  RECORDING: 'RECORDING',
} as const;

export type CaptureStateValue = (typeof CaptureState)[keyof typeof CaptureState];

type CaptureEvent =
  | { type: 'START_RECORDING'; url?: string; insertTargetGuideId?: string; insertAtIndex?: number }
  | { type: 'STOP_RECORDING' }
  | { type: 'USER_ACTION' }
  | { type: 'URL_CHANGED'; url: string }
  | { type: 'STEP_DELETED'; count?: number };

interface CaptureContext {
  currentGuideId: string | null;
  stepCount: number;
  currentUrl: string;
  insertTargetGuideId: string | null;
  insertAtIndex: number | null;
}

export const captureMachine = createMachine({
  id: 'capture',
  initial: CaptureState.IDLE,
  types: {} as {
    context: CaptureContext;
    events: CaptureEvent;
  },
  context: {
    currentGuideId: null,
    stepCount: 0,
    currentUrl: '',
    insertTargetGuideId: null,
    insertAtIndex: null,
  },
  states: {
    [CaptureState.IDLE]: {
      on: {
        START_RECORDING: {
          target: CaptureState.RECORDING,
          actions: assign({
            currentGuideId: () => crypto.randomUUID(),
            stepCount: 0,
            currentUrl: ({ event }) => event.url ?? '',
            insertTargetGuideId: ({ event }) => event.insertTargetGuideId ?? null,
            insertAtIndex: ({ event }) => event.insertAtIndex ?? null,
          }),
        },
      },
    },
    [CaptureState.RECORDING]: {
      on: {
        STOP_RECORDING: {
          target: CaptureState.IDLE,
          actions: assign({
            currentGuideId: null,
            stepCount: 0,
            currentUrl: '',
            insertTargetGuideId: null,
            insertAtIndex: null,
          }),
        },
        USER_ACTION: {
          actions: assign({
            stepCount: ({ context }) => context.stepCount + 1,
          }),
        },
        URL_CHANGED: {
          actions: assign({
            currentUrl: ({ event }) => event.url,
          }),
        },
        STEP_DELETED: {
          actions: assign({
            stepCount: ({ context, event }) =>
              typeof event.count === 'number' ? Math.max(0, event.count) : Math.max(0, context.stepCount - 1),
          }),
        },
      },
    },
  },
});

export type CaptureSnapshot = SnapshotFrom<typeof captureMachine>;
