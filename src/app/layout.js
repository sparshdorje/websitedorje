import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { Fraunces, Quicksand } from 'next/font/google';
import { Toaster } from 'sonner';
import { GoogleTagManager } from '@next/third-parties/google';
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
      {/* <>
        <script>
          {`          jdgm = window.jdgm || {};jdgm.SHOP_DOMAIN='dorjeteas.myshopify.com';jdgm.PLATFORM ='shopify';jdgm.PUBLIC_TOKEN= 'bpV91llnywtnrfAytVgThOndTEI';`}
        </script>
        <script
          data-cfasync="false"
          type="text/javascript"
          async
          src="https://cdn.judge.me/widget_preloader.js"
        ></script>
        <script
          data-cfasync="false"
          type="text/javascript"
          async
          src="https://cdn1.judge.me/assets/installed.js"
        ></script>
      </> */}

      <body
        className={cn(
          'relative h-full font-sans antiliased',
          fraunces.variable,
          questrial.variable
        )}
      >
        <GoogleTagManager gtmId="GTM-WL5K93Z4" />
        {/* <NextTopLoader showSpinner={false} /> */}
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <Footer />
        </main>

        <Toaster position="top-center" richColors />
        {/* <Script>
          jdgm =window.jdgm jdgm.SHOP_DOMAIN ='dorjeteas.myshopify.com'
          jdgm.PLATFORM ='shopify' jdgm.PUBLIC_TOKEN
          ='bpV91llnywtnrfAytVgThOndTEI'
        </Script>

        <Script
          data-cfasync="false"
          type="text/javascript"
          async
          src="https://cdn.judge.me/widget_preloader.js"
        />
        <Script
          data-cfasync="false"
          type="text/javascript"
          async
          src="https://cdn1.judge.me/assets/installed.js"
        /> */}
      </body>
    </html>
  );
}
