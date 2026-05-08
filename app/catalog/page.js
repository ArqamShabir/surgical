import Catalog from '@/views/Catalog';
import { Suspense } from 'react';

export const metadata = {
  title: 'Surgical Instruments Catalog',
  description: 'Browse CoinSurgical surgical instruments including facelift scissors, dissecting scissors, forceps, retractors, and precision medical tools.',
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
