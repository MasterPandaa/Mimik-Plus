import { describe, expect, it } from 'vitest';
import { cleanStepDescription } from '../description';

describe('cleanStepDescription', () => {
  it('passes through clean descriptions untouched', () => {
    expect(cleanStepDescription('Klik tombol "Kirim"')).toBe('Klik tombol "Kirim"');
    expect(cleanStepDescription('Click the Submit button')).toBe('Click the Submit button');
  });

  it('strips surrounding quotes', () => {
    expect(cleanStepDescription('"Klik tombol Kirim"')).toBe('Klik tombol Kirim');
    expect(cleanStepDescription('«Haz clic en Enviar»')).toBe('Haz clic en Enviar');
    expect(cleanStepDescription('“Pilih opsi Admin”')).toBe('Pilih opsi Admin');
  });

  it('strips markdown bold and italic wrappers', () => {
    expect(cleanStepDescription('**Klik tombol Masuk**')).toBe('Klik tombol Masuk');
    expect(cleanStepDescription('*Click Submit*')).toBe('Click Submit');
    expect(cleanStepDescription('__Masukkan nama pengguna__')).toBe('Masukkan nama pengguna');
  });

  it('strips numbered list prefixes', () => {
    expect(cleanStepDescription('1. Klik tombol "Simpan"')).toBe('Klik tombol "Simpan"');
    expect(cleanStepDescription('2) Masukkan alamat email')).toBe('Masukkan alamat email');
    expect(cleanStepDescription('- Buka halaman profil')).toBe('Buka halaman profil');
    expect(cleanStepDescription('• Klik tombol Lanjut')).toBe('Klik tombol Lanjut');
  });

  it('strips step/action labels in various languages', () => {
    expect(cleanStepDescription('Langkah 1: Klik tombol Kirim')).toBe('Klik tombol Kirim');
    expect(cleanStepDescription('Step 2: Enter your email')).toBe('Enter your email');
    expect(cleanStepDescription('Tindakan: Pilih opsi Admin')).toBe('Pilih opsi Admin');
    expect(cleanStepDescription('Action: Click the save icon')).toBe('Click the save icon');
    expect(cleanStepDescription('Deskripsi: Buka tab Pengaturan')).toBe('Buka tab Pengaturan');
  });

  it('handles multi-line commentary by taking the first line', () => {
    const raw = `Klik tombol Kirim
Tindakan ini akan mengirimkan formulir ke server.
Pastikan semua kolom sudah terisi.`;
    expect(cleanStepDescription(raw)).toBe('Klik tombol Kirim');
  });

  it('strips markdown code blocks', () => {
    const raw = `\`\`\`
Klik tombol Simpan
\`\`\``;
    expect(cleanStepDescription(raw)).toBe('Klik tombol Simpan');
  });
});
