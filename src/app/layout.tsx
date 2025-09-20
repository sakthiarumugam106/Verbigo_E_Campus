
'use client'; // Required for useEffect

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
      <head>
        <title>Verbigo | Master Your Language Skills</title>
        <meta name="description" content="Unlock your full potential with expert-led courses in grammar, writing, and communication." />
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        {isClient ? (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <AiChatbot />
            <WhatsAppButton />
            <BackToTopButton />
            <Toaster />
          </ThemeProvider>
        ) : (
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
