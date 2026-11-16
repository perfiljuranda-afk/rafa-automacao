/**
 * O que chega do cliente, antes de ser conferido.
 *
 * Em 15/11/2026 um cliente de MCP deixou a criacao de automacao impossivel:
 * ele serializa em JSON tudo que nao e texto antes de enviar. Lista chega como
 * `["Oi"]`, numero como `"10"` e booleano como `"true"`. A ferramenta recusava
 * dizendo que `dm` deve ser uma lista de textos, ou que `automacaoId` e
 * invalido, e quem lia a recusa nao tinha como adivinhar o porque.
 *
 * Aqui a entrada e normalizada num lugar so, antes das conferencias. O que nao
 * for reconhecido continua chegando como veio, para a validacao recusar com a
 * mensagem dela: `automacaoId: 'sete'` segue sendo invalido.
 */

/**
 * O valor como lista.
 *
 * Aceita as tres formas: a lista, o texto unico, que vale como um item, e o
 * texto que e uma lista em JSON. So vira lista quando o JSON e mesmo uma
 * lista; qualquer outra coisa continua sendo um item so, e um texto que por
 * acaso comeca com `[` segue inteiro.
 */
export function comoLista(valor: unknown): unknown {
  if (typeof valor !== 'string') return valor;
  const texto = valor.trim();
  if (!texto.startsWith('[') || !texto.endsWith(']')) return [valor];
  try {
    const lido: unknown = JSON.parse(texto);
    return Array.isArray(lido) ? lido : [valor];
  } catch {
    return [valor];
  }
}

/**
 * O valor como numero inteiro, ou nada.
 *
 * Nada quando o valor nao e inteiro de verdade: assim quem chama devolve a
 * mesma recusa de antes para `'sete'`, para `1.5` e para ausencia.
 */
export function comoInteiro(valor: unknown): number | null {
  if (typeof valor === 'number') {
    return Number.isSafeInteger(valor) ? valor : null;
  }
  if (typeof valor !== 'string') return null;
  const texto = valor.trim();
  if (!/^-?\d+$/.test(texto)) return null;
  const numero = Number(texto);
  return Number.isSafeInteger(numero) ? numero : null;
}

/**
 * O valor como sim ou nao.
 *
 * So `true` e o texto `"true"` valem como sim. Qualquer outra coisa e nao, que
 * e o lado seguro de todo campo que usa isto.
 */
export function comoBooleano(valor: unknown): boolean {
  return valor === true || (typeof valor === 'string' && valor.trim() === 'true');
}
