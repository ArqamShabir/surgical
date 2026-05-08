import About from '@/views/About';

export const metadata = {
  title: 'About CoinSurgical | Surgical Instrument Supplier',
  description: 'Learn about CoinSurgical, a supplier of precision surgical and medical instruments for clinics, distributors, and healthcare professionals.',
  alternates: {
    canonical: '/about',
  },
};

export default function Page() {
  return <About />;
}
