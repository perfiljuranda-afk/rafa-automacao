'use client';

import { useRouter } from 'next/navigation';
import { useState, type MouseEvent } from 'react';
import { PERGUNTAS, resultadoPara, type Alerta, type Resposta } from '@/lib/quiz/conteudo';
import { telaAlerta, telaInicio, telaPergunta } from '@/lib/quiz/telas';

type Tela =
  | { tipo: 'inicio' }
  | { tipo: 'pergunta'; indice: number }
  | { tipo: 'alerta'; alerta: Alerta; depoisDe: number };

function proximaPergunta(depoisDe: number, r: Resposta): number {
  for (let i = depoisDe + 1; i < PERGUNTAS.length; i++) {
    const q = PERGUNTAS[i];
    if (!q.quando || q.quando(r)) return i;
  }
  return -1;
}

export function Quiz() {
  const router = useRouter();
  const [tela, setTela] = useState<Tela>({ tipo: 'inicio' });
  const [respostas, setRespostas] = useState<Resposta>({});
  const [historico, setHistorico] = useState<Tela[]>([]);

  function ir(nova: Tela) {
    setHistorico((h) => [...h, tela]);
    setTela(nova);
    window.scrollTo({ top: 0 });
  }

  function avancar(depoisDe: number, r: Resposta) {
    const prox = proximaPergunta(depoisDe, r);
    if (prox === -1) router.push(`/quiz/resultado/${resultadoPara(r)}`);
    else ir({ tipo: 'pergunta', indice: prox });
  }

  function clique(e: MouseEvent<HTMLDivElement>) {
    const botao = (e.target as HTMLElement).closest<HTMLElement>('[data-acao]');
    if (!botao) return;
    const acao = botao.dataset.acao;

    if (acao === 'comecar') ir({ tipo: 'pergunta', indice: 0 });
    if (acao === 'continuar' && tela.tipo === 'alerta') avancar(tela.depoisDe, respostas);
    if (acao === 'voltar') {
      const anterior = historico[historico.length - 1];
      if (anterior) {
        setTela(anterior);
        setHistorico(historico.slice(0, -1));
      }
    }
    if (acao === 'responder' && tela.tipo === 'pergunta') {
      const q = PERGUNTAS[tela.indice];
      const r = { ...respostas, [q.id]: botao.dataset.valor ?? '' };
      setRespostas(r);
      const alerta = q.alerta?.(r);
      if (alerta) ir({ tipo: 'alerta', alerta, depoisDe: tela.indice });
      else avancar(tela.indice, r);
    }
  }

  let html: string;
  if (tela.tipo === 'inicio') html = telaInicio();
  else if (tela.tipo === 'alerta') html = telaAlerta(tela.alerta);
  else {
    const passo = historico.filter((t) => t.tipo === 'pergunta').length + 1;
    html = telaPergunta(PERGUNTAS[tela.indice], passo, historico.length > 1);
  }

  // `key` faz a animação de entrada rodar a cada tela nova.
  return <div key={historico.length} onClick={clique} dangerouslySetInnerHTML={{ __html: html }} />;
}
