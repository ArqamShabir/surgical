import Contact from '@/views/Contact';

export const metadata = {
  title: 'Contacto CoinSurgical | Instrumental Quirúrgico',
  description: 'Contacte a CoinSurgical para consultas sobre instrumental quirúrgico, solicitudes comerciales, detalles de producto e información para distribuidores.',
  alternates: {
    canonical: '/contact',
  },
};

export default function Page() {
  return <Contact />;
}
