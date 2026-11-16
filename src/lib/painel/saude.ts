export type IdDaIntegracao =
  | 'instagram'
  | 'atendimento'
  | 'banco'
  | 'senha_painel'
  | 'assinatura_meta'
  | 'endereco_app'
  | 'hotmart'
  | 'segredo_cron';

export type Integracao = {
  id: IdDaIntegracao;
  nome: string;
  seFaltar: string;
  opcional: boolean;
};

export type EstadoDaIntegracao = 'configurado' | 'faltando' | 'opcional';

export const INTEGRACOES: readonly Integracao[] = [
  {
    id: 'instagram',
    nome: 'Instagram',
    seFaltar: 'Nada entra na instalação: comentários, mensagens e contatos não chegam.',
    opcional: false,
  },
  {
    id: 'banco',
    nome: 'Banco de dados',
    seFaltar: 'Toda a instalação para porque nenhum dado pode ser lido ou gravado.',
    opcional: false,
  },
  {
    id: 'senha_painel',
    nome: 'Senha do painel',
    seFaltar: 'O painel permanece bloqueado até que uma senha seja configurada.',
    opcional: false,
  },
  {
    id: 'assinatura_meta',
    nome: 'Assinatura do Meta',
    seFaltar: 'As notificações são recusadas porque não é possível validar a assinatura.',
    opcional: false,
  },
  {
    id: 'endereco_app',
    nome: 'Endereço do app',
    seFaltar: 'Os links rastreados enviados nas DMs podem apontar para o endereço errado.',
    opcional: false,
  },
  {
    id: 'hotmart',
    nome: 'Hotmart',
    seFaltar: 'Nenhuma venda da Hotmart é atribuída; configure se você vende por lá.',
    opcional: true,
  },
  {
    id: 'segredo_cron',
    nome: 'Segredo do cron',
    seFaltar: 'A renovação do acesso e o recálculo ficam bloqueados. Crie um segredo para as tarefas agendadas nas configurações da Vercel e publique novamente.',
    opcional: false,
  },
] as const;

/**
 * O Atendimento, que nao mora na lista de cima.
 *
 * Fica de fora porque nao existe nos quatro produtos: so o Radar tem a tela.
 * No MEUCHAT, uma linha dizendo "Atendimento: faltando" mandaria a pessoa
 * procurar o que ela nao comprou.
 *
 * E entra como obrigatoria, e nao como opcional, por causa de quem conduz: a
 * unica forma de saber de fora se esta ligado era a palavra da compradora.
 * Escrito na tela, uma conversa de suporte comeca sabendo. O texto abaixo
 * explica que desligado nao e defeito, porque a palavra do estado nao tem como
 * dizer isso.
 */
export const ATENDIMENTO: Integracao = {
  id: 'atendimento',
  nome: 'Atendimento',
  seFaltar:
    'Está desligado nesta cópia, e desligado não é defeito: as conversas do Instagram e do WhatsApp não ficam guardadas e a tela não aparece no menu. Para ligar, rode o comando de atualização e responda sim quando ele perguntar pelo Atendimento. O que chegar depois disso aparece; o que passou antes, não.',
  opcional: false,
};

/**
 * A lista que a tela mostra. `temAtendimento` vem da navegacao, que e o
 * arquivo trocado em cada produto — e e por isso que a decisao nao mora aqui.
 */
export function integracoesDoPainel(
  temAtendimento: boolean,
): readonly Integracao[] {
  return temAtendimento ? [...INTEGRACOES, ATENDIMENTO] : INTEGRACOES;
}

export function estadoDaIntegracao(
  integracao: Integracao,
  presente: boolean,
): EstadoDaIntegracao {
  if (presente) return 'configurado';
  return integracao.opcional ? 'opcional' : 'faltando';
}

export function credencialPresente(valor: unknown): boolean {
  return typeof valor === 'string' && valor.trim().length > 0;
}
