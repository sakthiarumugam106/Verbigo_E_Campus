
import type { Metadata } from 'next';
import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { AppContent } from '@/components/app-content';
import { LoadingProvider } from '@/components/loading-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

const siteUrl = 'https://verbigo.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Verbigo | Master Your Language Skills',
    template: `%s | Verbigo`,
  },
  description:
    'Unlock your full potential with expert-led courses in grammar, writing, and communication. Join Verbigo to master the art of language with personalized feedback and cutting-edge technology.',
  keywords: ['language learning', 'English courses', 'IELTS preparation', 'business communication', 'public speaking', 'phonics', 'Verbigo'],
  robots: 'index, follow',
  icons: {
    icon: '/images/logo.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Verbigo | Master Your Language Skills',
    description: 'Unlock your full potential with expert-led courses in grammar, writing, and communication.',
    url: siteUrl,
    siteName: 'Verbigo',
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Verbigo - E-Campus for Language Intelligence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verbigo | Master Your Language Skills',
    description: 'Unlock your full potential with expert-led courses in grammar, writing, and communication.',
    images: [`${siteUrl}/images/og-image.png`],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <LoadingProvider>
          <AppContent>{children}</AppContent>
        </LoadingProvider>
      </body>
    </html>
  );
}
