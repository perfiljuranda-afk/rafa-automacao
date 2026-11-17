/*
 * Quiz "Diagnóstico gratuito da amamentação" — draalinewelz.com.br/quiz
 *
 * TUDO o que a mãe lê no quiz mora neste arquivo: produtos, perguntas,
 * alertas e as páginas de resultado. Para trocar um texto, um preço ou o
 * link do checkout, mexa só aqui.
 *
 * O caminho de cada mãe:
 *
 *   Início
 *    └─ Sente dor para amamentar?
 *        ├─ SIM → alerta "dor não é normal"
 *        │        ├─ Tem fissura / machucado no bico?
 *        │        ├─ O peito está vermelho, empedrado, quente ou com febre?
 *        │        └─ O bebê está ganhando peso?
 *        │            → resultado: dor-com-mastite | dor-com-fissura | dor-pega-errada
 *        └─ NÃO → O bebê está ganhando peso?
 *                 ├─ NÃO → alerta "sinal fortíssimo" → fraldas → resultado: sem-dor-sem-peso
 *                 └─ SIM / NÃO SEI → quanto tempo mama → fraldas
 *                       → resultado: sem-dor-sinais-de-alerta | tudo-certo
 */

export const MARCA = {
  nome: 'Dra. Aline Welz',
  chamada: 'Sou a Dra. Aline Welz e criei este teste de 1 minuto para você descobrir se o seu bebê está mamando de forma adequada e conseguindo extrair leite suficiente.',
};

// ─── Produtos ───────────────────────────────────────────────────────────────
// Troque `link` pelo endereço do checkout (Hotmart, Kiwify, Greenn...).
// Enquanto o link for '#', o botão aparece mas não leva a lugar nenhum.

export type ChaveProduto = 'pegaPerfeita' | 'sosFissura' | 'sosMastite' | 'aplicativo';

export type Produto = {
  nome: string;
  descricao: string;
  preco?: string;
  link: string;
  botao: string;
};

export const PRODUTOS: Record<ChaveProduto, Produto> = {
  pegaPerfeita: {
    nome: 'Protocolo Pega Perfeita — Amamentação de Sucesso',
    descricao: 'O passo a passo para ajustar a pega do seu bebê: amamentar sem dor e garantir que ele extraia o leite de que precisa.',
    preco: undefined, // ex.: 'R$ 97'
    link: '#',
    botao: 'Quero o Protocolo Pega Perfeita',
  },
  sosFissura: {
    nome: 'SOS Fissura',
    descricao: 'Para o seu peito cicatrizar mais rápido enquanto você ajusta a pega.',
    preco: 'R$ 20',
    link: '#',
    botao: 'Quero cicatrizar mais rápido',
  },
  sosMastite: {
    nome: 'SOS Mastite',
    descricao: 'O que fazer com o peito empedrado, dolorido e inflamado para aliviar e voltar a amamentar com conforto.',
    preco: 'R$ 20',
    link: '#',
    botao: 'Quero o SOS Mastite',
  },
  aplicativo: {
    nome: 'Aplicativo gratuito de acompanhamento',
    descricao: 'Anote mamadas, fraldas e peso e acompanhe a evolução do seu bebê dia a dia.',
    preco: 'Grátis',
    link: '#',
    botao: 'Baixar o aplicativo grátis',
  },
};

// ─── Perguntas ──────────────────────────────────────────────────────────────

export type Resposta = Record<string, string>;

export type Opcao = { valor: string; texto: string };

export type Pergunta = {
  id: string;
  texto: string;
  ajuda?: string;
  opcoes: Opcao[];
  /** Mostrada só se a função devolver true para as respostas até aqui. */
  quando?: (r: Resposta) => boolean;
  /** Tela de alerta exibida logo depois de responder, conforme a resposta. */
  alerta?: (r: Resposta) => Alerta | null;
};

export type Alerta = { titulo: string; texto: string; tom: 'alerta' | 'urgente' };

const SIM_NAO: Opcao[] = [
  { valor: 'sim', texto: 'Sim' },
  { valor: 'nao', texto: 'Não' },
];

export const PERGUNTAS: Pergunta[] = [
  {
    id: 'dor',
    texto: 'Você está sentindo dor para amamentar?',
    opcoes: SIM_NAO,
    alerta: (r) =>
      r.dor === 'sim'
        ? {
            tom: 'alerta',
            titulo: 'Atenção: amamentar não deveria doer',
            texto: 'Se você sente dor para amamentar, é muito provável que o seu bebê não esteja fazendo a pega correta. Vamos entender melhor o seu caso.',
          }
        : null,
  },

  // Ramo COM dor
  {
    id: 'fissura',
    texto: 'Você tem fissura, rachadura ou machucado no bico do peito?',
    ajuda: 'Pode ser um corte, uma ferida, sangramento ou o bico saindo "amassado" depois da mamada.',
    opcoes: SIM_NAO,
    quando: (r) => r.dor === 'sim',
  },
  {
    id: 'mastite',
    texto: 'Seu peito está vermelho, empedrado, quente ou você teve febre?',
    opcoes: SIM_NAO,
    quando: (r) => r.dor === 'sim',
    alerta: (r) =>
      r.mastite === 'sim'
        ? {
            tom: 'urgente',
            titulo: 'Esses podem ser sinais de mastite',
            texto: 'Se você tiver febre, calafrios ou se sentir mal, procure atendimento médico hoje. Continue amamentando ou esvaziando esse peito: isso ajuda na recuperação.',
          }
        : null,
  },

  // Os dois ramos
  {
    id: 'peso',
    texto: 'O seu bebê está ganhando peso?',
    ajuda: 'Pense na última consulta com o pediatra ou na última pesagem.',
    opcoes: [
      { valor: 'sim', texto: 'Sim, o pediatra disse que está bem' },
      { valor: 'nao', texto: 'Não, está ganhando pouco ou perdeu peso' },
      { valor: 'nao_sei', texto: 'Não sei' },
    ],
    alerta: (r) =>
      r.peso === 'nao'
        ? {
            tom: 'urgente',
            titulo: 'Esse é um sinal fortíssimo',
            texto: 'Quando o bebê não ganha peso, é sinal fortíssimo de que ele não está extraindo leite suficiente — e a causa mais comum é a pega. Converse com o pediatra o quanto antes.',
          }
        : null,
  },

  // Ramo SEM dor: entender a queixa
  {
    id: 'tempo',
    texto: 'Como costumam ser as mamadas do seu bebê?',
    quando: (r) => r.dor === 'nao' && r.peso !== 'nao',
    opcoes: [
      { valor: 'curta', texto: 'Muito curtas: ele solta o peito ou dorme em poucos minutos' },
      { valor: 'longa', texto: 'Muito longas: fica quase uma hora no peito e logo quer de novo' },
      { valor: 'normal', texto: 'Ele mama, solta sozinho e fica satisfeito' },
    ],
  },
  {
    id: 'fraldas',
    texto: 'O seu bebê molha 6 fraldas ou mais por dia?',
    ajuda: 'Vale para bebês com mais de 5 dias de vida.',
    quando: (r) => r.dor === 'nao',
    opcoes: [
      { valor: 'sim', texto: 'Sim' },
      { valor: 'nao', texto: 'Não, molha menos' },
      { valor: 'nao_sei', texto: 'Nunca reparei' },
    ],
  },
];

// ─── Resultados ─────────────────────────────────────────────────────────────

export type SlugResultado =
  | 'dor-com-mastite'
  | 'dor-com-fissura'
  | 'dor-pega-errada'
  | 'sem-dor-sem-peso'
  | 'sem-dor-sinais-de-alerta'
  | 'tudo-certo';

/** Decide a página de resultado a partir das respostas. */
export function resultadoPara(r: Resposta): SlugResultado {
  if (r.dor === 'sim') {
    if (r.mastite === 'sim') return 'dor-com-mastite';
    if (r.fissura === 'sim') return 'dor-com-fissura';
    return 'dor-pega-errada';
  }
  if (r.peso === 'nao') return 'sem-dor-sem-peso';
  if (r.peso === 'sim' && r.tempo === 'normal' && r.fraldas === 'sim') return 'tudo-certo';
  return 'sem-dor-sinais-de-alerta';
}

export type Resultado = {
  titulo: string;
  /** "O que as suas respostas mostram" — o diagnóstico em si. */
  diagnostico: string[];
  /** "O que eu indico para você primeiro". */
  indicacao: string;
  produtos: ChaveProduto[];
  /** Aviso extra que aparece em destaque (ex.: procurar médico). */
  aviso?: string;
  tom: 'alerta' | 'urgente' | 'tranquilo';
};

export const RESULTADOS: Record<SlugResultado, Resultado> = {
  'dor-com-mastite': {
    tom: 'urgente',
    titulo: 'Seu peito está pedindo socorro — e a pega precisa ser ajustada',
    diagnostico: [
      'Você sente dor para amamentar: é muito provável que o seu bebê esteja mamando com a pega errada.',
      'Peito vermelho, empedrado ou quente são sinais de inflamação, que costuma aparecer quando o peito não está sendo bem esvaziado.',
    ],
    indicacao: 'Primeiro, alivie o peito com o SOS Mastite. Ao mesmo tempo, corrija a causa com o Protocolo Pega Perfeita, para isso não voltar a acontecer.',
    produtos: ['sosMastite', 'pegaPerfeita'],
    aviso: 'Se você tem febre, calafrios ou mal-estar, procure atendimento médico hoje. Este teste não substitui uma consulta.',
  },
  'dor-com-fissura': {
    tom: 'alerta',
    titulo: 'A fissura é o recado: a pega do seu bebê está errada',
    diagnostico: [
      'Você sente dor para amamentar e está com fissura no bico do peito.',
      'Fissura quase sempre acontece porque o bebê pega só o bico, e não a aréola. Enquanto a pega não for corrigida, o machucado volta.',
    ],
    indicacao: 'O que você precisa primeiro é do Protocolo Pega Perfeita, para o seu bebê mamar certo. E para agilizar: com o SOS Fissura o seu peito cicatriza mais rápido enquanto você ajusta a pega — por apenas R$ 20.',
    produtos: ['pegaPerfeita', 'sosFissura'],
  },
  'dor-pega-errada': {
    tom: 'alerta',
    titulo: 'Diagnóstico: é muito provável que o seu bebê esteja mamando errado',
    diagnostico: [
      'Amamentar pode ser desconfortável nos primeiros segundos, mas dor durante a mamada não é normal.',
      'Dor é o sinal mais comum de pega incorreta — e, se nada mudar, ela costuma evoluir para fissura.',
    ],
    indicacao: 'Eu indico para você, primeiro, o Protocolo Pega Perfeita. Lá você aprende a posicionar o bebê e a corrigir a pega para amamentar sem dor.',
    produtos: ['pegaPerfeita', 'sosFissura'],
  },
  'sem-dor-sem-peso': {
    tom: 'urgente',
    titulo: 'Seu bebê pode não estar extraindo leite suficiente',
    diagnostico: [
      'Não sentir dor é ótimo, mas não garante que a pega esteja certa.',
      'Se o bebê não está ganhando peso, é sinal fortíssimo de que ele não está conseguindo extrair leite suficiente do peito. Muitas vezes ele mama, mas a pega é rasa e o leite não sai na quantidade de que ele precisa.',
    ],
    indicacao: 'O que você precisa é aprender a pega correta para o seu bebê conseguir extrair o leite de verdade. É exatamente isso que eu ensino no Protocolo Pega Perfeita.',
    produtos: ['pegaPerfeita'],
    aviso: 'Bebê que não ganha peso precisa ser avaliado pelo pediatra o quanto antes. Use o protocolo junto com o acompanhamento médico.',
  },
  'sem-dor-sinais-de-alerta': {
    tom: 'alerta',
    titulo: 'Sem dor, mas com sinais de que a mamada não está rendendo',
    diagnostico: [
      'Você não sente dor, o que é um bom sinal. Mas algumas respostas chamaram a atenção: mamadas muito curtas ou muito longas, poucas fraldas molhadas ou não saber se ele está ganhando peso.',
      'Esses são sinais clássicos de transferência de leite ineficiente: o bebê fica no peito, mas não consegue tirar o leite de que precisa.',
    ],
    indicacao: 'Eu indico o Protocolo Pega Perfeita para você ter certeza de que o seu bebê está pegando o peito do jeito certo e saindo satisfeito de cada mamada.',
    produtos: ['pegaPerfeita', 'aplicativo'],
    aviso: 'Se você não sabe se o seu bebê está ganhando peso, peça para pesá-lo na próxima consulta com o pediatra.',
  },
  'tudo-certo': {
    tom: 'tranquilo',
    titulo: 'Mamãe, pode ficar tranquila',
    diagnostico: [
      'Pela nossa pré-análise, é muito provável que o seu bebê esteja com uma pega correta e uma boa transferência de leite.',
      'Você não sente dor, ele está ganhando peso, molha fraldas suficientes e sai satisfeito das mamadas: esses são os principais sinais de uma amamentação que está dando certo.',
    ],
    indicacao: 'Continue acompanhando com o pediatra. E, para ter tudo anotado — mamadas, fraldas e peso —, use o meu aplicativo gratuito.',
    produtos: ['aplicativo'],
  },
};

export const AVISO_LEGAL =
  'Esta é uma pré-análise educativa e não substitui a avaliação de um profissional de saúde. Em caso de dúvida, converse com o seu médico ou o pediatra do seu bebê.';
