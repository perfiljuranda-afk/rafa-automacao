'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MARCA, PERGUNTAS, resultadoPara, type Alerta, type Resposta } from '@/lib/quiz/conteudo';

type Tela =
  | { tipo: 'inicio' }
  | { tipo: 'pergunta'; indice: number }
  | { tipo: 'alerta'; alerta: Alerta; proximo: number };

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
    if (prox === -1) {
      router.push(`/quiz/resultado/${resultadoPara(r)}`);
      return;
    }
    ir({ tipo: 'pergunta', indice: prox });
  }

  function responder(indice: number, valor: string) {
    const q = PERGUNTAS[indice];
    const r = { ...respostas, [q.id]: valor };
    setRespostas(r);
    const alerta = q.alerta?.(r);
    if (alerta) ir({ tipo: 'alerta', alerta, proximo: indice });
    else avancar(indice, r);
  }

  function voltar() {
    setHistorico((h) => {
      const anterior = h[h.length - 1];
      if (anterior) setTela(anterior);
      return h.slice(0, -1);
    });
  }

  if (tela.tipo === 'inicio') {
    return (
      <section className="quiz-cartao quiz-inicio">
        <p className="quiz-selo">Teste gratuito · 1 minuto</p>
        <h1>O seu bebê está mamando do jeito certo?</h1>
        <p className="quiz-texto">{MARCA.chamada}</p>
        <button className="quiz-botao" onClick={() => ir({ tipo: 'pergunta', indice: 0 })}>
          Clique para fazer o diagnóstico gratuito
        </button>
      </section>
    );
  }

  if (tela.tipo === 'alerta') {
    return (
      <section className={`quiz-cartao quiz-alerta quiz-tom-${tela.alerta.tom}`}>
        <p className="quiz-selo">{tela.alerta.tom === 'urgente' ? 'Importante' : 'Alerta'}</p>
        <h2>{tela.alerta.titulo}</h2>
        <p className="quiz-texto">{tela.alerta.texto}</p>
        <button className="quiz-botao" onClick={() => avancar(tela.proximo, respostas)}>
          Continuar
        </button>
        <button className="quiz-voltar" onClick={voltar}>← Voltar</button>
      </section>
    );
  }

  const q = PERGUNTAS[tela.indice];
  const passo = historico.filter((t) => t.tipo === 'pergunta').length + 1;
  // O total depende do caminho; 5 é o caminho mais longo.
  const progresso = Math.min(100, Math.round((passo / 5) * 100));

  return (
    <section className="quiz-cartao" key={q.id}>
      <div className="quiz-progresso" aria-hidden="true"><span style={{ width: `${progresso}%` }} /></div>
      <p className="quiz-selo">Pergunta {passo}</p>
      <h2>{q.texto}</h2>
      {q.ajuda && <p className="quiz-ajuda">{q.ajuda}</p>}
      <div className="quiz-opcoes">
        {q.opcoes.map((o) => (
          <button key={o.valor} className="quiz-opcao" onClick={() => responder(tela.indice, o.valor)}>
            {o.texto}
          </button>
        ))}
      </div>
      {historico.length > 1 && <button className="quiz-voltar" onClick={voltar}>← Voltar</button>}
    </section>
  );
}
