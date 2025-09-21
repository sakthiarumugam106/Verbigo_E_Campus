'use client'; 

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
import { useEffect } from 'react';
import { LoadingProvider, GlobalLoader, useLoading } from '@/components/loading-provider';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hideLoader } = useLoading();

  useEffect(() => {
    hideLoader();
  }, [pathname, hideLoader]);

  return (
    <>
      <GlobalLoader />
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
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <LoadingProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <AppContent>{children}</AppContent>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
