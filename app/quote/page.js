import Quote from '@/views/Quote';

export const metadata = {
  title: 'Request a Quote | CoinSurgical',
  description: 'Send CoinSurgical your selected surgical instruments and request trade pricing or product information.',
  alternates: {
    canonical: '/quote',
  },
};

export default function Page() {
  return <Quote />;
}
