import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import nextConfig from '../next.config';

/**
 * `/api/webhooks/instagram` atende o mesmo que `/api/webhook`.
 *
 * Os três endereços que a pessoa cola em portais diferentes nasceram com cara
 * diferente, e o do Instagram é o fora de padrão: singular, sem `s`. Quem
 * digita de memória come o `s`, e endereço de webhook errado falha do pior
 * jeito possível — a Meta aceita, a tela mostra tudo certo e nada dispara.
 *
 * Os dois testes aqui guardam coisas diferentes. O apelido existir é o
 * conforto; o endereço antigo continuar existindo é o que não pode quebrar,
 * porque ele está colado no portal de todas as instalações que já rodam.
 */
describe('o apelido do webhook do Instagram', () => {
  it('manda /api/webhooks/instagram para /api/webhook', async () => {
    expect(typeof nextConfig.rewrites).toBe('function');
    const regras = await nextConfig.rewrites!();
    const lista = Array.isArray(regras) ? regras : regras.beforeFiles;
    expect(lista).toEqual(
      expect.arrayContaining([
        { source: '/api/webhooks/instagram', destination: '/api/webhook' },
      ]),
    );
  });

  it('não mexe no endereço antigo, que está colado nos portais que já existem', () => {
    expect(existsSync(resolve(__dirname, '..', 'src', 'app', 'api', 'webhook', 'route.ts'))).toBe(
      true,
    );
    const regras = nextConfig.rewrites;
    expect(regras).toBeTypeOf('function');
  });
});
