import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { GoogleTagManager } from '@next/third-parties/google';
import { Fraunces, Quicksand } from 'next/font/google';
import Script from 'next/script';

import { Toaster } from 'sonner';
import './globals.css';
import { Suspense } from 'react';

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
  description: 'Dorje Teas | The Original Taste of Darjeeling ',
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
        {/* <NextTopLoader showSpinner={false} /> */}

        <Suspense>
          <main className="relative flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </main>
        </Suspense>

        <Toaster position="top-center" richColors />
      </body>
      <GoogleTagManager gtmId="GTM-WL5K93Z4" />
    </html>
  );
}
