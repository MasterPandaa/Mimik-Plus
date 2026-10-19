export const STEP_DESCRIPTION_PROMPT = `ROLE: You write concise step instructions for browser workflow guides.

TASK: Given the DOM context below, write ONE concise instruction sentence describing the user action.

CONTEXT:
{{context}}

FORMAT RULES:
- Start directly with an action verb (Click, Enter, Select, Open, Navigate, Toggle, Scroll).
- Use the imperative mood (command form, e.g. "Click", never "Clicking" or "The user clicks").
- Name the exact UI element from the context (button label, field name, link text, placeholder).
- Exactly ONE sentence only. Keep it under 15 words.
- Do NOT add information, explanations, or elements not present in the context.
- Output ONLY the instruction text. No numbering, no bullet, no quotes, no preamble.

GOOD examples:
- "Click the Submit button"
- "Enter your email address in the Email field"
- "Select 'Admin' from the Role dropdown"
- "Navigate to the Settings page"
- "Toggle the Dark Mode switch"

BAD examples (do NOT do this):
- "Step 1: Click Submit" (no numbering)
- "You should click the Submit button" (no conversational filler)
- "The user clicks Submit" (use imperative, not third person)
- "Click Submit to proceed to next page" (no extra speculation)

Write only the description.`;

export const GUIDE_META_PROMPT = `These are the steps of a browser workflow, with the page URL and description for each step:

{{steps}}

Write a title and a description for this workflow.

TITLE: specific and descriptive. Mention the application or website name and the specific task performed. Reference specific pages, features, or items that were interacted with. MUST be under 60 characters.

Examples of good titles:
- "Review claude-code Pull Requests"
- "Configure Slack Notification Preferences"
- "Submit Expense Report in Workday"
- "Create Repository in GitHub Organization"

DESCRIPTION: one or two sentences stating what the workflow accomplishes and who would follow it. Do not repeat the title. Do not list the individual steps. Do not mention any UI element that does not appear in the steps above.

Examples of good descriptions:
- "Reset a locked-out user's password from the Okta admin panel. For IT support staff."
- "Configure which Slack channels send desktop notifications, and set a do-not-disturb schedule."`;

export const GUIDE_META_JSON_SUFFIX = `\n\nReply with nothing but a JSON object shaped {"title": string, "description": string}. No code fence, no commentary.`;

export const REWRITE_PROMPT = `You are editing one span of text inside a browser workflow guide. The text describes a step a reader must perform, or summarises what the workflow accomplishes.

Selected text:
"""
{{text}}
"""

Instruction: {{instruction}}

Rules:
- Keep it imperative and describing a single action when the original does.
- Never introduce a UI element, button, page, or value that is absent from the original.
- Preserve specific names, labels, and quoted strings exactly as written.
- Match the length the instruction implies; otherwise stay close to the original length.

Return only the rewritten text. No preamble, no quotes, no explanation.`;

export const REWRITE_PRESETS = {
  shorter: 'Make it shorter and tighter without losing any required detail.',
  detail: 'Add detail that clarifies the action, using only information already present.',
  grammar: 'Fix grammar, spelling, and punctuation. Change nothing else.',
  formal: 'Make the tone more formal and professional.',
  casual: 'Make the tone more casual and conversational.',
} as const;

export type RewritePreset = keyof typeof REWRITE_PRESETS;

export const AI_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'zh-CN', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const;

export type AILanguageCode = (typeof AI_LANGUAGES)[number]['code'];

const LANGUAGE_NAMES: Record<string, string> = {
  es: 'Spanish',
  fr: 'French',
  pt: 'Brazilian Portuguese',
  de: 'German',
  id: 'Indonesian',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
};

/**
 * Language-specific step guidance for small/cheap models to enforce natural
 * imperative phrasing and prevent awkward literal translations.
 */
const LANGUAGE_STEP_GUIDELINES: Record<string, string> = {
  id: 'Use natural Indonesian imperative mood (kalimat perintah) starting with active action verbs (e.g., Klik, Masukkan, Pilih, Buka). Never use passive voice, third-person descriptions, or verb prefix "Meng-".',
  es: 'Use natural Spanish in the imperative mood starting directly with an action verb (e.g., Haz clic, Introduce, Selecciona, Navega). Avoid passive voice or literal word-for-word translation.',
  fr: 'Use natural French in the imperative mood starting directly with an action verb (e.g., Cliquez, Saisissez, Sélectionnez, Accédez). Avoid passive voice or literal word-for-word translation.',
  de: 'Use natural German in the imperative mood starting directly with an action verb (e.g., Klicke, Gib, Wähle, Navigiere). Avoid passive voice or literal word-for-word translation.',
  pt: 'Use natural Brazilian Portuguese in the imperative mood starting directly with an action verb (e.g., Clique, Insira, Selecione, Navegue). Avoid passive voice or literal word-for-word translation.',
  zh: 'Use natural Chinese concise imperative phrasing starting directly with action verbs (e.g. 点击, 输入, 选择, 前往). Avoid wordy or literal translations.',
  ja: 'Use natural Japanese concise instruction phrasing (e.g., 「送信」をクリック, 「メール」に入力). Avoid wordy or literal translations.',
  ko: 'Use natural Korean concise instruction phrasing (e.g., 클릭, 입력, 선택). Avoid wordy or literal translations.',
};

/**
 * Few-shot step description examples per language so small/cheap models produce
 * natural output instead of awkward literal translations from English.
 */
const STEP_EXAMPLES: Record<string, string[]> = {
  id: [
    'Klik tombol Kirim',
    'Masukkan alamat email di kolom Email',
    "Pilih 'Admin' dari dropdown Peran",
    'Buka halaman Pengaturan',
  ],
  es: [
    'Haz clic en el botón Enviar',
    'Introduce la dirección de correo en el campo Email',
    "Selecciona 'Admin' en el menú desplegable Rol",
    'Navega a la página de Configuración',
  ],
  fr: [
    'Cliquez sur le bouton Envoyer',
    "Saisissez l'adresse e-mail dans le champ Email",
    'Sélectionnez « Admin » dans le menu déroulant Rôle',
    'Accédez à la page Paramètres',
  ],
  de: [
    'Klicke auf die Schaltfläche Senden',
    'Gib die E-Mail-Adresse im Feld E-Mail ein',
    "Wähle 'Admin' aus dem Dropdown-Menü Rolle",
    'Navigiere zur Seite Einstellungen',
  ],
  pt: [
    'Clique no botão Enviar',
    'Insira o endereço de e-mail no campo Email',
    "Selecione 'Admin' no menu suspenso Função",
    'Navegue até a página de Configurações',
  ],
  zh: ['点击“提交”按钮', '在“邮箱”字段输入电子邮件地址', '从“角色”下拉菜单中选择“管理员”', '打开“设置”页面'],
  ja: [
    '「送信」ボタンをクリック',
    '「メール」フィールドにメールアドレスを入力',
    '「役割」ドロップダウンから「Admin」を選択',
    '「設定」ページに移動',
  ],
  ko: [
    "'제출' 버튼 클릭",
    "'이메일' 입력란에 이메일 주소 입력",
    "'역할' 드롭다운에서 'Admin' 선택",
    "'설정' 페이지로 이동",
  ],
};

interface MetaExampleSet {
  titles: string[];
  descriptions: string[];
}

const META_EXAMPLES: Record<string, MetaExampleSet> = {
  id: {
    titles: [
      'Konfigurasi Preferensi Notifikasi Slack',
      'Buat Repositori di Organisasi GitHub',
      'Kirim Laporan Pengeluaran di Workday',
      'Tinjau Pull Request claude-code',
    ],
    descriptions: [
      'Atur saluran Slack mana yang mengirimkan notifikasi desktop, dan tetapkan jadwal jangan ganggu.',
      'Reset kata sandi pengguna yang terkunci dari panel admin Okta. Untuk staf dukungan IT.',
    ],
  },
  es: {
    titles: [
      'Configurar Preferencias de Notificaciones en Slack',
      'Crear un Repositorio en GitHub',
      'Enviar Informe de Gastos en Workday',
      'Revisar Pull Requests de claude-code',
    ],
    descriptions: [
      'Configura qué canales de Slack envían notificaciones de escritorio y establece un horario de no molestar.',
      'Restablece la contraseña de un usuario bloqueado desde el panel de administración de Okta. Para el personal de soporte de TI.',
    ],
  },
  fr: {
    titles: [
      'Configurer les Préférences de Notification Slack',
      'Créer un Dépôt dans GitHub',
      'Soumettre une Note de Frais dans Workday',
      'Examiner les Pull Requests claude-code',
    ],
    descriptions: [
      'Configure les canaux Slack qui envoient des notifications de bureau et définit un calendrier ne pas déranger.',
      "Réinitialise le mot de passe d'un utilisateur verrouillé depuis le panneau d'administration Okta. Pour le personnel de support informatique.",
    ],
  },
  de: {
    titles: [
      'Slack-Benachrichtigungseinstellungen konfigurieren',
      'Repository in GitHub-Organisation erstellen',
      'Spesenabrechnung in Workday einreichen',
      'claude-code Pull Requests prüfen',
    ],
    descriptions: [
      'Festlegen, welche Slack-Kanäle Desktop-Benachrichtigungen senden, und Ruhezeiten einrichten.',
      'Passwort eines gesperrten Benutzers über das Okta-Admin-Panel zurücksetzen. Für IT-Support-Mitarbeiter.',
    ],
  },
  pt: {
    titles: [
      'Configurar Preferências de Notificação do Slack',
      'Criar Repositório na Organização GitHub',
      'Enviar Relatório de Despesas no Workday',
      'Revisar Pull Requests do claude-code',
    ],
    descriptions: [
      'Configure quais canais do Slack enviam notificações na área de trabalho e defina um horário de não perturbe.',
      'Redefina a senha de um usuário bloqueado no painel de administração do Okta. Para a equipe de suporte de TI.',
    ],
  },
  zh: {
    titles: [
      '配置 Slack 通知偏好设置',
      '在 GitHub 组织中创建代码仓库',
      '在 Workday 中提交报销单',
      '审核 claude-code 的 Pull Request',
    ],
    descriptions: [
      '配置哪些 Slack 频道发送桌面通知，并设置免打扰时间段。',
      '在 Okta 管理后台重置被锁定用户的密码。适用于 IT 支持人员。',
    ],
  },
};

export type LanguagePromptContext = 'step' | 'meta';

export function getLanguageSuffix(locale: string, context: LanguagePromptContext = 'step'): string {
  if (locale.startsWith('en')) return '';
  if (context === 'meta') {
    return getMetaLanguageSuffix(locale);
  }
  const base = locale.split('-')[0];
  const lang = LANGUAGE_NAMES[base] || locale;
  const guidance =
    LANGUAGE_STEP_GUIDELINES[base] ||
    `Use natural ${lang} phrasing in imperative mood, not a literal translation from English.`;
  const examples = STEP_EXAMPLES[base];
  const exampleBlock = examples ? `\nExamples in ${lang}:\n${examples.map((e) => `- "${e}"`).join('\n')}` : '';
  return `\nIMPORTANT: Write the output in ${lang}. Use natural ${lang} phrasing, not a literal translation from English. ${guidance}${exampleBlock}`;
}

export function getMetaLanguageSuffix(locale: string): string {
  if (locale.startsWith('en')) return '';
  const base = locale.split('-')[0];
  const lang = LANGUAGE_NAMES[base] || locale;
  const meta = META_EXAMPLES[base];
  const titleBlock = meta?.titles
    ? `\nTitle examples in ${lang}:\n${meta.titles.map((t) => `- "${t}"`).join('\n')}`
    : '';
  const descBlock = meta?.descriptions
    ? `\nDescription examples in ${lang}:\n${meta.descriptions.map((d) => `- "${d}"`).join('\n')}`
    : '';
  return `\nIMPORTANT: Write the title AND description in ${lang}. Use natural ${lang} phrasing, not a literal translation from English.${titleBlock}${descBlock}`;
}
