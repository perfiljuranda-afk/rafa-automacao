import { notFound } from 'next/navigation';
import { RESULTADOS, type SlugResultado } from '@/lib/quiz/conteudo';
import { telaResultado } from '@/lib/quiz/telas';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(RESULTADOS).map((slug) => ({ slug }));
}

export default async function ResultadoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in RESULTADOS)) notFound();
  return <div dangerouslySetInnerHTML={{ __html: telaResultado(slug as SlugResultado, '/quiz') }} />;
}
