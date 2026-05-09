import '../style.css';
import AppShell from '@/components/AppShell';

const siteUrl = 'https://coinsurgical.shop';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CoinSurgical | Instrumental Médico Premium',
    template: '%s | CoinSurgical',
  },
  description: 'CoinSurgical suministra instrumental quirúrgico y médico de precisión para profesionales de la salud, clínicas, distribuidores y compradores B2B.',
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
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
