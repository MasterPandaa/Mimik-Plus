import { describe, expect, it } from 'vitest';
import {
  AI_LANGUAGES,
  GUIDE_META_PROMPT,
  getLanguageSuffix,
  getMetaLanguageSuffix,
  STEP_DESCRIPTION_PROMPT,
} from '../prompts';

describe('STEP_DESCRIPTION_PROMPT', () => {
  it('has a context placeholder', () => {
    expect(STEP_DESCRIPTION_PROMPT).toContain('{{context}}');
  });

  it('includes structured role and task instructions', () => {
    expect(STEP_DESCRIPTION_PROMPT).toContain('ROLE:');
    expect(STEP_DESCRIPTION_PROMPT).toContain('TASK:');
  });

  it('enforces format rules including imperative mood and single sentence', () => {
    expect(STEP_DESCRIPTION_PROMPT).toContain('FORMAT RULES:');
    expect(STEP_DESCRIPTION_PROMPT.toLowerCase()).toContain('imperative');
    expect(STEP_DESCRIPTION_PROMPT).toMatch(/one/i);
    expect(STEP_DESCRIPTION_PROMPT.toLowerCase()).toContain('sentence');
  });

  it('prohibits preamble and numbering', () => {
    expect(STEP_DESCRIPTION_PROMPT).toContain('No numbering');
    expect(STEP_DESCRIPTION_PROMPT).toContain('no preamble');
  });
});

describe('GUIDE_META_PROMPT', () => {
  it('has a steps placeholder', () => {
    expect(GUIDE_META_PROMPT).toContain('{{steps}}');
  });

  it('keeps the 60-character title constraint', () => {
    expect(GUIDE_META_PROMPT).toContain('60 characters');
  });

  it('asks for a description of one or two sentences', () => {
    expect(GUIDE_META_PROMPT.toLowerCase()).toContain('description');
    expect(GUIDE_META_PROMPT).toMatch(/one or two sentences/i);
  });
});

describe('getLanguageSuffix', () => {
  it('returns empty string for English', () => {
    expect(getLanguageSuffix('en')).toBe('');
  });

  it('returns empty string for en-US', () => {
    expect(getLanguageSuffix('en-US')).toBe('');
  });

  it('returns Spanish suffix for es', () => {
    expect(getLanguageSuffix('es')).toContain('Spanish');
  });

  it('returns French suffix for fr', () => {
    expect(getLanguageSuffix('fr')).toContain('French');
  });

  it('returns Chinese suffix for zh-CN', () => {
    expect(getLanguageSuffix('zh-CN')).toContain('Chinese');
  });

  it('returns Indonesian suffix for id', () => {
    expect(getLanguageSuffix('id')).toContain('Indonesian');
  });

  it('returns Brazilian Portuguese suffix for pt-BR', () => {
    expect(getLanguageSuffix('pt-BR')).toContain('Brazilian Portuguese');
  });

  it('returns the locale code for unknown languages', () => {
    expect(getLanguageSuffix('sv')).toContain('sv');
  });

  it('includes IMPORTANT instruction and natural phrasing guidance', () => {
    const suffix = getLanguageSuffix('es');
    expect(suffix).toContain('IMPORTANT');
    expect(suffix).toContain('Write the output in');
    expect(suffix).toContain('natural');
  });

  it('includes few-shot examples for Indonesian including required actions', () => {
    const suffix = getLanguageSuffix('id');
    expect(suffix).toContain('Klik tombol Kirim');
    expect(suffix).toContain('Masukkan alamat email di kolom Email');
    expect(suffix).toContain("Pilih 'Admin' dari dropdown Peran");
    expect(suffix).toContain('Buka halaman Pengaturan');
  });

  it('enforces Indonesian imperative mood (kalimat perintah)', () => {
    const suffix = getLanguageSuffix('id');
    expect(suffix).toContain('kalimat perintah');
    expect(suffix).toContain('Meng-');
  });

  it('includes few-shot examples for Spanish', () => {
    const suffix = getLanguageSuffix('es');
    expect(suffix).toContain('Haz clic');
  });

  it('does not include examples for unknown languages', () => {
    const suffix = getLanguageSuffix('sv');
    expect(suffix).not.toContain('Examples in');
  });

  it('supports context="meta" parameter delegation', () => {
    const stepSuffix = getLanguageSuffix('id', 'step');
    const metaSuffix = getLanguageSuffix('id', 'meta');
    expect(stepSuffix).toContain('Klik tombol Kirim');
    expect(metaSuffix).toContain('Title examples in Indonesian');
    expect(metaSuffix).toContain('Description examples in Indonesian');
  });
});

describe('getMetaLanguageSuffix', () => {
  it('returns empty string for English', () => {
    expect(getMetaLanguageSuffix('en')).toBe('');
  });

  it('includes language name, title, and description examples for Indonesian', () => {
    const suffix = getMetaLanguageSuffix('id');
    expect(suffix).toContain('Indonesian');
    expect(suffix).toContain('Title examples in Indonesian');
    expect(suffix).toContain('Description examples in Indonesian');
  });

  it('includes language name for Spanish', () => {
    const suffix = getMetaLanguageSuffix('es');
    expect(suffix).toContain('Spanish');
  });
});

describe('AI_LANGUAGES', () => {
  it('has 7 supported languages', () => {
    expect(AI_LANGUAGES).toHaveLength(7);
  });

  it('includes English as first entry', () => {
    expect(AI_LANGUAGES[0]).toEqual({ code: 'en', label: 'English' });
  });

  it('includes Simplified Chinese', () => {
    expect(AI_LANGUAGES).toContainEqual({ code: 'zh-CN', label: '中文' });
  });

  it('includes Indonesian right after English', () => {
    expect(AI_LANGUAGES[1]).toEqual({ code: 'id', label: 'Bahasa Indonesia' });
  });

  it('each entry has code and label', () => {
    for (const lang of AI_LANGUAGES) {
      expect(lang.code).toBeTruthy();
      expect(lang.label).toBeTruthy();
    }
  });
});
