import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * `/api/webhooks/instagram` atende o mesmo que `/api/webhook`.
   *
   * Os três endereços que a pessoa cola em portal diferente nasceram com cara
   * diferente: `/api/webhook` no Meta (singular), `/api/webhooks/hotmart` e
   * `/api/webhooks/whatsapp` (plural). O do Instagram é o fora de padrão, e
   * endereço de webhook errado falha do pior jeito: a Meta aceita, a tela
   * mostra tudo certo e nada dispara nunca. Quem digita de memória come o `s`.
   *
   * O antigo continua valendo, e tem que continuar: ele está colado no portal
   * de todas as instalações que já existem. Este é só um apelido, para quem
   * cola de agora em diante ter uma regra só em vez de três exceções.
   */
  rewrites() {
    return [{ source: '/api/webhooks/instagram', destination: '/api/webhook' }];
  },
};

export default nextConfig;
