/*
 * O HTML de cada tela do quiz. Fica em texto (e não em JSX) para que a página
 * do Next e a prévia mostrem exatamente a mesma coisa. Os botões levam
 * `data-acao`; quem desenha a tela escuta os cliques.
 */

import { ICONES, ILUSTRACAO_PEGA } from './icones';
import { MARCA, PRODUTOS, RESULTADOS, type Alerta, type Pergunta, type SlugResultado } from './conteudo';

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const LETRAS = 'ABCDEF';

export function telaInicio(): string {
  return `
<section class="quiz-cartao quiz-inicio quiz-entra">
  <div class="quiz-icone quiz-icone-grande quiz-balanca">${ICONES.gota}</div>
  <p class="quiz-selo">Teste gratuito · 1 minuto</p>
  <h1>O seu bebê está mamando do jeito certo?</h1>
  <p class="quiz-texto">${esc(MARCA.chamada)}</p>
  <ul class="quiz-promessa">
    <li><span>4</span> perguntas rápidas</li>
    <li><span>1</span> minuto</li>
    <li><span>100%</span> gratuito</li>
  </ul>
  <button class="quiz-botao quiz-pulsa" data-acao="comecar">Clique para fazer o diagnóstico gratuito</button>
</section>`;
}

export function telaPergunta(q: Pergunta, passo: number, podeVoltar: boolean): string {
  const progresso = Math.min(100, passo * 25);
  return `
<section class="quiz-cartao quiz-entra">
  <div class="quiz-topo">
    <span class="quiz-passo">Pergunta ${passo}</span>
    <div class="quiz-progresso" aria-hidden="true"><span style="width:${progresso}%"></span></div>
  </div>
  <div class="quiz-icone">${ICONES[q.icone]}</div>
  <h2>${esc(q.texto)}</h2>
  ${q.ajuda ? `<p class="quiz-ajuda">${esc(q.ajuda)}</p>` : ''}
  <div class="quiz-opcoes">
    ${q.opcoes
      .map(
        (o, i) =>
          `<button class="quiz-opcao" data-acao="responder" data-valor="${esc(o.valor)}"><span class="quiz-letra">${LETRAS[i]}</span><span>${esc(o.texto)}</span></button>`,
      )
      .join('')}
  </div>
  ${podeVoltar ? '<button class="quiz-voltar" data-acao="voltar">← Voltar</button>' : ''}
</section>`;
}

export function telaAlerta(a: Alerta): string {
  return `
<section class="quiz-cartao quiz-tela-alerta quiz-tom-${a.tom} quiz-entra">
  <div class="quiz-faixa" aria-hidden="true"></div>
  <div class="quiz-icone quiz-icone-grande quiz-${a.tom === 'bom' ? 'pula' : 'balanca'}">${ICONES[a.icone]}</div>
  <p class="quiz-selo-grande">${esc(a.selo)}</p>
  <h2>${esc(a.titulo)}</h2>
  <p class="quiz-texto">${esc(a.texto)}</p>
  ${a.mostrarPega ? ILUSTRACAO_PEGA : ''}
  ${a.dica ? `<aside class="quiz-dica"><strong>Você sabia?</strong> ${esc(a.dica)}</aside>` : ''}
  <button class="quiz-botao" data-acao="continuar">Continuar o diagnóstico →</button>
  <button class="quiz-voltar" data-acao="voltar">← Voltar</button>
</section>`;
}

export function telaResultado(slug: SlugResultado, linkRefazer: string): string {
  const r = RESULTADOS[slug];
  return `
<section class="quiz-cartao quiz-tela-alerta quiz-tom-${r.tom} quiz-entra">
  <div class="quiz-faixa" aria-hidden="true"></div>
  <div class="quiz-icone quiz-icone-grande quiz-${r.tom === 'bom' ? 'pula' : 'balanca'}">${ICONES[r.icone]}</div>
  <p class="quiz-selo-grande">${esc(r.selo)}</p>
  <h1>${esc(r.titulo)}</h1>

  <h2 class="quiz-subtitulo">Seus sinais</h2>
  <ul class="quiz-sinais">
    ${r.sinais
      .map((s) => `<li class="${s.ok ? 'sinal-ok' : 'sinal-ruim'}"><span class="sinal-marca">${s.ok ? '✓' : '✕'}</span>${esc(s.texto)}</li>`)
      .join('')}
  </ul>

  <h2 class="quiz-subtitulo">O que as suas respostas mostram</h2>
  ${r.diagnostico.map((p) => `<p class="quiz-texto">${esc(p)}</p>`).join('')}

  ${r.aviso ? `<p class="quiz-aviso"><strong>Importante:</strong> ${esc(r.aviso)}</p>` : ''}

  <h2 class="quiz-subtitulo">O que eu indico para você primeiro</h2>
  <p class="quiz-texto">${esc(r.indicacao)}</p>

  <div class="quiz-produtos">
    ${r.produtos
      .map((k, i) => {
        const p = PRODUTOS[k];
        return `<div class="quiz-produto${i === 0 ? ' quiz-produto-principal' : ''}">
          ${i === 0 ? '<span class="quiz-etiqueta">Indicado para você</span>' : ''}
          <h3>${esc(p.nome)}</h3>
          <p>${esc(p.descricao)}</p>
          ${p.preco ? `<p class="quiz-preco">${esc(p.preco)}</p>` : ''}
          <a class="quiz-botao${i === 0 ? ' quiz-pulsa' : ''}" href="${esc(p.link)}">${esc(p.botao)}</a>
        </div>`;
      })
      .join('')}
  </div>

  <a class="quiz-voltar" href="${esc(linkRefazer)}" data-acao="refazer">Refazer o teste</a>
</section>`;
}
