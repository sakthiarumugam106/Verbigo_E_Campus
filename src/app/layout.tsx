'use client'; // Required for useEffect

import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/app/footer';
import { Toaster } from '@/components/ui/toaster';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Inter, Poppins } from 'next/font/google';
import { AiChatbot } from '@/components/ai-chatbot';
import { ThemeProvider } from '@/components/theme-provider';
import { BackToTopButton } from '@/components/back-to-top-button';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

// We can't export metadata from a client component, so we'll leave this here.
// The metadata from the previous version of the file will still be used.
// export const metadata: Metadata = {
//   title: 'Verbigo | Master Your Language Skills',
//   description:
//     'Unlock your full potential with expert-led courses in grammar, writing, and communication.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {isClient && (
            <>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <AiChatbot />
              <WhatsAppButton />
              <BackToTopButton />
              <Toaster />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
