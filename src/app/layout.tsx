import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/app/footer';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Verbigo | Master Your Language Skills',
  description:
    'Unlock your full potential with expert-led courses in grammar, writing, and communication.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-body-container antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
