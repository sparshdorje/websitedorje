import { Fraunces, Quicksand } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});
const questrial = Quicksand({
  subsets: ['latin'],
  variable: '--font-questrial',
});

export const metadata = {
  title: 'Dorje Teas | The Original Taste of Darjeeling',
  description: 'Dorje Teas | The Original Taste of Darjeeling ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
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
    </html>
  );
}
