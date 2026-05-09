import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center">
        <h1>Página no Encontrada</h1>
        <p style={{ color: 'var(--color-gray-dark)', marginBottom: '2rem' }}>
          La página que busca no está disponible.
        </p>
        <Link href="/catalog" className="btn btn-primary">Ver Productos</Link>
      </div>
    </section>
  );
}
