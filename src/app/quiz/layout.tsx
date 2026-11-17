import type { Metadata } from 'next';
import { AVISO_LEGAL, MARCA } from '@/lib/quiz/conteudo';
import './quiz.css';

export const metadata: Metadata = {
  title: `Diagnóstico gratuito da amamentação · ${MARCA.nome}`,
  description: 'Teste de 1 minuto para saber se o seu bebê está mamando de forma adequada e extraindo leite suficiente.',
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="quiz-pagina">
      <header className="quiz-marca">{MARCA.nome}</header>
      <main className="quiz-conteudo">{children}</main>
      <footer className="quiz-rodape">{AVISO_LEGAL}</footer>
    </div>
  );
}
