import type { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { AVISO_LEGAL, MARCA } from '@/lib/quiz/conteudo';
import './quiz.css';

const titulo = Baloo_2({ subsets: ['latin'], weight: ['600', '800'], variable: '--q-fonte-titulo' });
const texto = Nunito({ subsets: ['latin'], weight: ['400', '600', '700', '800'], variable: '--q-fonte-texto' });

export const metadata: Metadata = {
  title: `Diagnóstico gratuito da amamentação · ${MARCA.nome}`,
  description: 'Teste de 1 minuto para saber se o seu bebê está mamando de forma adequada e extraindo leite suficiente.',
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`quiz-pagina ${titulo.variable} ${texto.variable}`}>
      <header className="quiz-marca">{MARCA.nome}</header>
      <main className="quiz-conteudo">{children}</main>
      <footer className="quiz-rodape">{AVISO_LEGAL}</footer>
    </div>
  );
}
