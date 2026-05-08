import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center">
        <h1>Page Not Found</h1>
        <p style={{ color: 'var(--color-gray-dark)', marginBottom: '2rem' }}>
          The page you are looking for is not available.
        </p>
        <Link href="/catalog" className="btn btn-primary">Browse Products</Link>
      </div>
    </section>
  );
}
