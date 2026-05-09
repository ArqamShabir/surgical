import Catalog from '@/views/Catalog';
import { Suspense } from 'react';

export const metadata = {
  title: 'Catálogo de Instrumental Quirúrgico',
  description: 'Explore el instrumental quirúrgico de CoinSurgical, incluyendo tijeras, pinzas, separadores e instrumentos médicos de precisión.',
  alternates: {
    canonical: '/catalog',
  },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Catalog />
    </Suspense>
  );
}
