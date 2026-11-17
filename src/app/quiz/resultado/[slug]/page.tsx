import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUTOS, RESULTADOS, type SlugResultado } from '@/lib/quiz/conteudo';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(RESULTADOS).map((slug) => ({ slug }));
}

export default async function ResultadoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = RESULTADOS[slug as SlugResultado];
  if (!res) notFound();

  return (
    <section className={`quiz-cartao quiz-tom-${res.tom}`}>
      <p className="quiz-selo">Seu resultado</p>
      <h1>{res.titulo}</h1>

      <h2 className="quiz-subtitulo">O que as suas respostas mostram</h2>
      {res.diagnostico.map((p) => <p key={p} className="quiz-texto">{p}</p>)}

      {res.aviso && <p className="quiz-aviso">{res.aviso}</p>}

      <h2 className="quiz-subtitulo">O que eu indico para você primeiro</h2>
      <p className="quiz-texto">{res.indicacao}</p>

      <div className="quiz-produtos">
        {res.produtos.map((chave, i) => {
          const p = PRODUTOS[chave];
          return (
            <div key={chave} className={`quiz-produto${i === 0 ? ' quiz-produto-principal' : ''}`}>
              <h3>{p.nome}</h3>
              <p>{p.descricao}</p>
              {p.preco && <p className="quiz-preco">{p.preco}</p>}
              <a className="quiz-botao" href={p.link}>{p.botao}</a>
            </div>
          );
        })}
      </div>

      <Link href="/quiz" className="quiz-voltar">Refazer o teste</Link>
    </section>
  );
}
