
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GlobalLoader, useLoading } from './loading-provider';
import { Header } from './header';
import { Footer } from '@/app/footer';
import { AiChatbot } from './ai-chatbot';
import { WhatsAppButton } from './whatsapp-button';
import { BackToTopButton } from './back-to-top-button';
import { Toaster } from './ui/toaster';
import { ThemeProvider } from './theme-provider';

export function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hideLoader } = useLoading();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs once on the client after hydration is complete.
    setIsClient(true);
  }, []);

  useEffect(() => {
    // This effect runs whenever the path changes, hiding the loader.
    hideLoader();
  }, [pathname, hideLoader]);

  // To prevent hydration mismatch, we can render a loader or nothing on the server
  // and then render the full UI on the client.
  if (!isClient) {
    // Render a global loader or a minimal skeleton on the server.
    return <GlobalLoader />;
  }

  // Once mounted on the client, render the full application UI.
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      storageKey="verbigo-theme"
    >
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
    </ThemeProvider>
  );
}
