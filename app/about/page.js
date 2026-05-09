import About from '@/views/About';

export const metadata = {
  title: 'Sobre CoinSurgical | Proveedor de Instrumental Quirúrgico',
  description: 'Conozca CoinSurgical, proveedor de instrumental quirúrgico y médico de precisión para clínicas, distribuidores y profesionales de la salud.',
  alternates: {
    canonical: '/about',
  },
};

export default function Page() {
  return <About />;
}
