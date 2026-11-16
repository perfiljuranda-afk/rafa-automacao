import { describe, expect, it } from 'vitest';
import { comoBooleano, comoInteiro, comoLista } from '@/lib/mcp/entrada';

/*
 * O cliente que manda tudo como texto. O caso real que trouxe estes testes:
 * criar automacao recusava dizendo que a DM deve ser uma lista de textos, e
 * publicar recusava dizendo que o id era invalido, com a lista e o id certos.
 */
describe('entrada do MCP', () => {
  it('lista entregue como texto JSON volta a ser lista', () => {
    expect(comoLista('["Primeira","Segunda"]')).toEqual(['Primeira', 'Segunda']);
  });

  it('texto unico vale como um item', () => {
    expect(comoLista('Oi')).toEqual(['Oi']);
  });

  it('texto que so comeca com colchete segue inteiro', () => {
    expect(comoLista('[promo] o link está aqui')).toEqual(['[promo] o link está aqui']);
  });

  it('lista de verdade passa sem mexer', () => {
    const lista = ['a', 'b'];
    expect(comoLista(lista)).toBe(lista);
  });

  it('numero escrito como texto vale como numero', () => {
    expect(comoInteiro('10')).toBe(10);
    expect(comoInteiro(' 7 ')).toBe(7);
    expect(comoInteiro(10)).toBe(10);
  });

  it('o que nao e inteiro continua sendo recusado', () => {
    for (const valor of ['sete', '1.5', '', '10a', undefined, null, 1.5, NaN, {}, []]) {
      expect(comoInteiro(valor)).toBeNull();
    }
  });

  it('sim so e sim', () => {
    expect(comoBooleano(true)).toBe(true);
    expect(comoBooleano('true')).toBe(true);
    expect(comoBooleano('false')).toBe(false);
    expect(comoBooleano('sim')).toBe(false);
    expect(comoBooleano(1)).toBe(false);
    expect(comoBooleano(undefined)).toBe(false);
  });
});
