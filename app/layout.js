import '../style.css';
import AppShell from '@/components/AppShell';

const siteUrl = 'https://coinsurgical.shop';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CoinSurgical | Premium Medical Instruments',
    template: '%s | CoinSurgical',
  },
  description: 'CoinSurgical supplies high-quality precision surgical and medical instruments for healthcare professionals, clinics, distributors, and trade buyers.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: 'CoinSurgical',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
