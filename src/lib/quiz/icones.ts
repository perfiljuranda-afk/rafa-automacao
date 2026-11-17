/*
 * Desenhos do quiz, em SVG puro (texto), para funcionar tanto na página do
 * Next quanto na prévia. As cores vêm das variáveis do quiz.css.
 */

export type Icone =
  | 'aviso'
  | 'urgente'
  | 'ok'
  | 'gota'
  | 'balanca'
  | 'relogio'
  | 'fralda'
  | 'peito'
  | 'fissura';

export const ICONES: Record<Icone, string> = {
  // Placa amarela de "atenção"
  aviso: `<svg viewBox="0 0 120 108" aria-hidden="true"><path d="M60 6 L114 100 H6 Z" fill="#ffc83d" stroke="#2b2024" stroke-width="7" stroke-linejoin="round"/><rect x="54" y="36" width="12" height="36" rx="6" fill="#2b2024"/><circle cx="60" cy="84" r="7" fill="#2b2024"/></svg>`,
  // Sirene vermelha
  urgente: `<svg viewBox="0 0 120 120" aria-hidden="true"><g stroke="#e0483a" stroke-width="6" stroke-linecap="round"><path d="M14 40 L26 46"/><path d="M106 40 L94 46"/><path d="M60 6 V20"/><path d="M28 16 L36 28"/><path d="M92 16 L84 28"/></g><path d="M30 92 V66 a30 30 0 0 1 60 0 V92 Z" fill="#e0483a" stroke="#2b2024" stroke-width="6" stroke-linejoin="round"/><path d="M46 70 a14 14 0 0 1 14 -14" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/><rect x="20" y="92" width="80" height="16" rx="5" fill="#2b2024"/></svg>`,
  ok: `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="#3fa266" stroke="#2b2024" stroke-width="6"/><path d="M36 62 L53 79 L86 44" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  gota: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 10 C60 10 22 56 22 78 a38 38 0 0 0 76 0 C98 56 60 10 60 10 Z" fill="#fff" stroke="#2b2024" stroke-width="6"/><path d="M42 80 a18 18 0 0 0 14 18" fill="none" stroke="#f3b6c8" stroke-width="7" stroke-linecap="round"/></svg>`,
  balanca: `<svg viewBox="0 0 120 120" aria-hidden="true"><rect x="14" y="56" width="92" height="50" rx="14" fill="#fff" stroke="#2b2024" stroke-width="6"/><path d="M30 56 a30 30 0 0 1 60 0" fill="#f3b6c8" stroke="#2b2024" stroke-width="6"/><path d="M60 56 L74 36" stroke="#2b2024" stroke-width="6" stroke-linecap="round"/><circle cx="60" cy="56" r="6" fill="#2b2024"/><rect x="40" y="76" width="40" height="14" rx="5" fill="#ffc83d" stroke="#2b2024" stroke-width="4"/></svg>`,
  relogio: `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="64" r="46" fill="#fff" stroke="#2b2024" stroke-width="6"/><rect x="50" y="6" width="20" height="10" rx="3" fill="#2b2024"/><path d="M60 64 V36 M60 64 L80 74" stroke="#b4476a" stroke-width="7" stroke-linecap="round"/><circle cx="60" cy="64" r="5" fill="#2b2024"/></svg>`,
  fralda: `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M12 30 H108 V48 C108 80 88 100 60 100 C32 100 12 80 12 48 Z" fill="#fff" stroke="#2b2024" stroke-width="6" stroke-linejoin="round"/><rect x="12" y="30" width="96" height="16" fill="#9ed2f0" stroke="#2b2024" stroke-width="6"/><path d="M60 58 C60 58 48 72 48 79 a12 12 0 0 0 24 0 C72 72 60 58 60 58 Z" fill="#9ed2f0"/></svg>`,
  peito: `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" fill="#fbe2d6" stroke="#2b2024" stroke-width="6"/><circle cx="60" cy="60" r="24" fill="#d99a86"/><circle cx="60" cy="60" r="9" fill="#b9705d"/></svg>`,
  fissura: `<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="50" fill="#fbe2d6" stroke="#2b2024" stroke-width="6"/><circle cx="60" cy="60" r="24" fill="#d99a86"/><circle cx="60" cy="60" r="10" fill="#b9705d"/><path d="M52 50 L60 58 L56 64 L66 72" fill="none" stroke="#e0483a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};

/*
 * Pega errada × pega certa, vista de frente: a aréola e o contorno da boca do
 * bebê. Errada: boca pequena, só no bico. Certa: boca bem aberta, cobrindo a
 * aréola, mais por baixo do que por cima.
 */
export const ILUSTRACAO_PEGA = `
<div class="pega-comparacao">
  <figure class="pega pega-errada">
    <svg viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r="60" fill="#fbe2d6" stroke="#2b2024" stroke-width="5"/>
      <circle cx="70" cy="70" r="30" fill="#d99a86"/>
      <circle cx="70" cy="70" r="11" fill="#b9705d"/>
      <ellipse cx="70" cy="70" rx="17" ry="13" fill="none" stroke="#e0483a" stroke-width="6" stroke-dasharray="7 5"/>
      <circle cx="118" cy="22" r="17" fill="#e0483a" stroke="#2b2024" stroke-width="4"/>
      <path d="M110 14 L126 30 M126 14 L110 30" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
    </svg>
    <figcaption><strong>Pega errada</strong> Boca pequena, só no bico. Aperta, dói e machuca.</figcaption>
  </figure>
  <figure class="pega pega-certa">
    <svg viewBox="0 0 140 140" aria-hidden="true">
      <circle cx="70" cy="70" r="60" fill="#fbe2d6" stroke="#2b2024" stroke-width="5"/>
      <circle cx="70" cy="70" r="30" fill="#d99a86"/>
      <circle cx="70" cy="70" r="11" fill="#b9705d"/>
      <ellipse cx="70" cy="76" rx="40" ry="34" fill="none" stroke="#3fa266" stroke-width="6" stroke-dasharray="7 5"/>
      <circle cx="118" cy="22" r="17" fill="#3fa266" stroke="#2b2024" stroke-width="4"/>
      <path d="M110 22 L116 28 L127 16" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <figcaption><strong>Pega certa</strong> Boca bem aberta, abocanha a aréola, mais por baixo.</figcaption>
  </figure>
</div>`;
