
'use client';
import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { VerbigoLogo } from '@/components/verbigo-logo';
import { siteConfig, whatsapp } from '@/lib/config';
import { useLoading } from '@/components/loading-provider';
import { useRouter, usePathname } from 'next/navigation';

export function Footer() {
    const { showLoader, hideLoader } = useLoading();
    const router = useRouter();
    const pathname = usePathname();

    const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        // If navigating to the same page, do nothing.
        if (href === pathname) {
            return;
        }

        if (href.startsWith('/#')) {
            const id = href.substring(2);
            const element = document.getElementById(id);
            if (element) {
                showLoader();
                element.scrollIntoView({ behavior: 'smooth' });
                 setTimeout(hideLoader, 800);
            } else {
                // If on a different page, navigate to home and then scroll
                showLoader();
                router.push('/');
                // The scrolling logic will be handled by the header's click handler
                // once the homepage loads.
            }
        } else {
            showLoader();
            router.push(href);
        }
    };

  return (
    <footer id="page-footer" className="bg-black text-white py-12">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4 lg:col-span-1">
            <Link href="/" onClick={handleLinkClick('/')} className="flex items-center gap-2 text-white">
               <VerbigoLogo />
                <div className="flex flex-col text-left">
                    <span className="font-brand text-xl font-bold leading-none">Verbigo</span>
                    <span className="text-[10px] font-medium text-gray-400 leading-none mt-1">E-Campus for Language Intelligence</span>
                </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Master the Art of Language with our expert-led courses and personalized feedback.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:col-span-2 lg:col-span-3">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <h3 className="font-semibold">Platform</h3>
              <Link href="/#courses" onClick={handleLinkClick('/#courses')} className="text-sm text-gray-400 hover:text-white">Courses</Link>
              <Link href="/learn-english-online" onClick={handleLinkClick('/learn-english-online')} className="text-sm text-gray-400 hover:text-white">Learn English Online</Link>
              <Link href="/spoken-english-classes" onClick={handleLinkClick('/spoken-english-classes')} className="text-sm text-gray-400 hover:text-white">Spoken English</Link>
              <Link href="/phonics-learning" onClick={handleLinkClick('/phonics-learning')} className="text-sm text-gray-400 hover:text-white">Phonics Learning</Link>
              <Link href={whatsapp.whatsappDemoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Book a Demo</Link>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <h3 className="font-semibold">Company</h3>
              <Link href="/about-us" onClick={handleLinkClick('/about-us')} className="text-sm text-gray-400 hover:text-white">About Us</Link>
              <Link href="/blog" onClick={handleLinkClick('/blog')} className="text-sm text-gray-400 hover:text-white">Blog</Link>
              <Link href="/careers" onClick={handleLinkClick('/careers')} className="text-sm text-gray-400 hover:text-white">Careers</Link>
              <Link href="/#contact" onClick={handleLinkClick('/#contact')} className="text-sm text-gray-400 hover:text-white">Contact</Link>
            </div>
            <div className="flex flex-col items-center sm:items-start gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link href="/privacy-policy" onClick={handleLinkClick('/privacy-policy')} className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/terms-of-service" onClick={handleLinkClick('/terms-of-service')} className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Verbigo. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-white">
              <Mail className="h-5 w-5" />
            </Link>
            <Link href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
