import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Loading from './loading';
import { cn } from '@/lib/utils';
import { GoogleTagManager } from '@next/third-parties/google';
import { Fraunces, Quicksand } from 'next/font/google';
import Script from 'next/script';

import { Toaster } from 'sonner';
import './globals.css';
import { Suspense } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { ASSETS } from '@/config';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});
const questrial = Quicksand({
  subsets: ['latin'],
  variable: '--font-questrial',
});

export const metadata = {
  title: {
    default: 'Dorje Teas | The Original Taste of Darjeeling',
    template: '%s | Dorje Teas | The Original Taste of Darjeeling',
  },
  description:
    'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
  openGraph: {
    title: {
      default: 'Dorje Teas | The Original Taste of Darjeeling',
      template: '%s | Dorje Teas | The Original Taste of Darjeeling',
    },
    description:
      'Dorje Teas sells only whole leaf Darjeeling Tea which has been plucked, packed and dispatched directly from certified Organic Selim Hill Tea Estate. We prepare the tea in small batches. It is our effort to revive and consolidate the beauty and romance of Darjeeling.',
    url: 'https://dorjeteas.com',
    siteName: 'Dorje Teas',
    images: [
      {
        url: `${ASSETS.ICONS}/dorje-logo.png`, // Must be an absolute URL
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JBYQ4E6RK0"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-JBYQ4E6RK0');
        `}
      </Script>

      <body
        className={cn(
          'relative h-full font-sans antiliased',
          fraunces.variable,
          questrial.variable
        )}
      >
        <NextTopLoader color="#B3C8C7" showSpinner={false} crawl={true} />

        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <Suspense fallback={<Loading />}>
            <div className="flex-grow flex-1">{children}</div>
          </Suspense>
          <Footer />
        </main>

        <Toaster position="top-center" richColors />
      </body>
      <GoogleTagManager gtmId="GTM-WL5K93Z4" />
    </html>
  );
}
