import { Fraunces, Questrial } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import NextTopLoader from 'nextjs-toploader';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});
const questrial = Questrial({
  weight: '400',
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
        <NextTopLoader showSpinner={false} />
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
