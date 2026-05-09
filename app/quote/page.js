import Quote from '@/views/Quote';

export const metadata = {
  title: 'Solicitar Cotización | CoinSurgical',
  description: 'Envíe a CoinSurgical sus instrumentos quirúrgicos seleccionados y solicite precio comercial o información del producto.',
  alternates: {
    canonical: '/quote',
  },
};

export default function Page() {
  return <Quote />;
}
