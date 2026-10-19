import { generateText } from 'ai';
import { localStorage } from '@/lib/browser-api';
import type { DOMContext } from '../dom/context';
import { serializeDOMContext } from '../dom/context';
import { getLanguageSuffix, STEP_DESCRIPTION_PROMPT } from './prompts';
import { createModel } from './provider';

/**
 * Cleans raw output from AI models, particularly small/free models which
 * frequently prepend numbers (e.g. "1. "), step labels ("Langkah 1: ", "Step 1: "),
 * wrap in markdown (**text**), or output multi-line commentary.
 */
export function cleanStepDescription(raw: string): string {
  let text = raw.trim();
  // Strip code fences if present
  text = text.replace(/^```[a-z]*\s*|\s*```$/gi, '').trim();
  // Keep only the first non-empty line (avoids multi-paragraph explanations)
  const firstLine =
    text
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l.length > 0) || '';
  text = firstLine;

  const stripEnclosing = (str: string, open: string, close: string): string => {
    if (str.startsWith(open) && str.endsWith(close) && str.length >= open.length + close.length) {
      return str.slice(open.length, str.length - close.length).trim();
    }
    return str;
  };

  const quotePairs: [string, string][] = [
    ['"', '"'],
    ["'", "'"],
    ['«', '»'],
    ['“', '”'],
    ['„', '”'],
  ];

  // Strip outer quotes if entire string is wrapped in quotes
  for (const [open, close] of quotePairs) {
    text = stripEnclosing(text, open, close);
  }

  // Strip markdown bold / italic formatting wrapper if wrapping the entire string
  text = stripEnclosing(text, '***', '***');
  text = stripEnclosing(text, '**', '**');
  text = stripEnclosing(text, '*', '*');
  text = stripEnclosing(text, '___', '___');
  text = stripEnclosing(text, '__', '__');
  text = stripEnclosing(text, '_', '_');

  // Strip numbered list prefix e.g. "1. ", "1) ", "- ", "• ", "* " (requires space after bullet)
  text = text.replace(/^(\d+[.)]\s*|[-*•]\s+)/, '');
  // Strip labels e.g. "Step 1: ", "Langkah 1: ", "Tindakan: ", "Action: ", "Deskripsi: "
  text = text.replace(/^(step\s*\d+|langkah\s*\d+|tindakan|action|description|deskripsi)\s*:\s*/i, '');

  // Strip outer markdown and quotes once more in case it was inside a label: e.g. "Langkah 1: **Klik Kirim**"
  text = stripEnclosing(text, '**', '**');
  text = stripEnclosing(text, '*', '*');
  for (const [open, close] of quotePairs) {
    text = stripEnclosing(text, open, close);
  }

  return text;
}

export async function getAIDescription(
  domContext: DOMContext,
  provider: string,
  model: string,
  apiKey: string,
  baseUrl?: string,
  headers?: Record<string, string>,
): Promise<string | null> {
  const settings = await localStorage.get(['aiLanguage']);
  const locale = (settings.aiLanguage as string) || 'en';
  const { text } = await generateText({
    model: createModel(provider, model, apiKey, baseUrl, headers),
    prompt: STEP_DESCRIPTION_PROMPT.replace('{{context}}', serializeDOMContext(domContext)) + getLanguageSuffix(locale),
    maxOutputTokens: 100,
  });
  const cleaned = cleanStepDescription(text);
  return cleaned || null;
}
