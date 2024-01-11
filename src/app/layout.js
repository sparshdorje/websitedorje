import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { Fraunces, Quicksand } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Toaster } from 'sonner';
import './globals.css';

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
      <Head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-WL5K93Z4')`}
        </Script>
      </Head>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WL5K93Z4"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>
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
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <Footer />
        </main>

        <Toaster position="top-center" richColors />
      </body>
      <GoogleTagManager gtmId="GTM-WL5K93Z4" />
    </html>
  );
}
