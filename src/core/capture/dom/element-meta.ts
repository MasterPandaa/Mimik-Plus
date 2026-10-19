import { getCssSelector } from 'css-selector-generator';
import type { ElementMeta } from '@/core/guides/types';

function getCleanText(el: HTMLElement): string | null {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.pointerEvents = 'none';
  document.body.appendChild(clone);
  try {
    const hidden = clone.querySelectorAll('[aria-hidden="true"], [hidden], script, style');
    for (const h of Array.from(hidden)) h.remove();
    const text = clone.innerText?.trim();
    if (!text) return null;
    const firstLine = text
      .split('\n')
      .find((l) => l.trim().length > 2)
      ?.trim();
    return firstLine?.slice(0, 80) || null;
  } finally {
    clone.remove();
  }
}

export interface FrozenRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function freezeRect(el: Element): FrozenRect {
  const { x, y, width, height } = el.getBoundingClientRect();
  return { x, y, width, height };
}

/**
 * Generates a CSS selector for an element.
 * If the element is inside a Shadow DOM, we explicitly provide its ShadowRoot as root
 * to prevent css-selector-generator from logging console warnings that Chrome reports
 * as extension errors. If a shadow host is present, we chain the host and inner selectors (e.g. 'host >>> inner').
 */
export function generateCssSelector(el: HTMLElement): string {
  try {
    const rootNode = el.getRootNode?.();
    if (typeof ShadowRoot !== 'undefined' && rootNode instanceof ShadowRoot && rootNode.host) {
      const host = rootNode.host as HTMLElement;
      const hostSelector = generateCssSelector(host);
      const innerSelector = getCssSelector(el, { root: rootNode });
      return `${hostSelector} >>> ${innerSelector}`;
    }

    const root = (rootNode as ParentNode) || document;
    return getCssSelector(el, { root });
  } catch {
    return el.tagName?.toLowerCase() ?? 'unknown';
  }
}

export function extractElementMeta(el: HTMLElement, atEvent?: FrozenRect): ElementMeta {
  const live = freezeRect(el);
  const rect = live.width > 0 || live.height > 0 ? live : (atEvent ?? live);
  const cssSelector = generateCssSelector(el);
  return {
    tag: el.tagName?.toLowerCase() ?? 'unknown',
    cssSelector,
    textContent: getCleanText(el),
    ariaLabel: el.getAttribute('aria-label'),
    placeholder: el.getAttribute('placeholder'),
    altText: el instanceof HTMLImageElement ? el.alt : null,
    name: el.getAttribute('name'),
    role: el.getAttribute('role') || (el.tagName?.toLowerCase() ?? null),
    href: el instanceof HTMLAnchorElement ? el.href : null,
    inputType: el instanceof HTMLInputElement ? el.type : null,
    dataTestId: el.getAttribute('data-testid') || el.getAttribute('data-test-id') || el.getAttribute('data-qa') || null,
    rect,
    devicePixelRatio: window.devicePixelRatio,
  };
}
