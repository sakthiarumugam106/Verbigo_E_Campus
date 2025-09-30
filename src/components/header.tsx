
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { VerbigoLogo } from '@/components/verbigo-logo';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { useLoading } from './loading-provider';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/#courses' },
  { name: 'Blog', href: '/blog' },
  { name: 'Know Your Level', href: '/know-your-level' },
  { name: 'Our Values', href: '/#values' },
  { name: 'FAQ', href: '/#faq' },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();

  const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (href.startsWith('/#')) {
      if (pathname === '/') {
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          showLoader();
          element.scrollIntoView({ behavior: 'smooth' });
          setTimeout(hideLoader, 500);
        }
      } else {
        showLoader();
        router.push(href);
      }
    } else if (href === '/') {
       if (pathname === '/') {
          showLoader();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(hideLoader, 500);
       } else {
          showLoader();
          router.push(href);
       }
    } else {
      if (pathname !== href) {
        showLoader();
        router.push(href);
      }
    }
  };
  
   const handleSheetLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsOpen(false);
    handleLinkClick(href)(e);
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full h-16 px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary dark:text-primary-foreground" onClick={handleLinkClick('/')}>
            <VerbigoLogo />
            <div className="flex flex-col">
                <span className="font-brand text-xl font-bold leading-none">Verbigo</span>
                <span className="text-[10px] font-medium text-muted-foreground leading-none mt-1">E-Campus for Language Intelligence</span>
            </div>
        </Link>
        
        <nav className="hidden items-center justify-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick(link.href)}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                {link.name}
                </Link>
            ))}
        </nav>
        
        <div className="flex items-center justify-end gap-4">
            <div className="hidden sm:flex">
                <Link href="/get-demo" onClick={handleLinkClick('/get-demo')}>
                  <button className="btn">
                      <span className="btn-text-one">Book Demo</span>
                      <span className="btn-text-two">Now</span>
                  </button>
                </Link>
            </div>
            <ThemeToggle />
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Open navigation menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                            <SheetDescription className="sr-only">
                                Navigation links for Verbigo.
                            </SheetDescription>
                        </SheetHeader>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-primary dark:text-primary-foreground mb-6"
                        onClick={handleSheetLinkClick('/')}
                    >
                        <VerbigoLogo />
                        <div className="flex flex-col">
                            <span className="font-brand text-xl font-bold leading-none">Verbigo</span>
                            <span className="text-[10px] font-medium text-muted-foreground leading-none mt-1">E-Campus for Language Intelligence</span>
                        </div>
                    </Link>
                    <nav className="grid gap-4">
                        {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={handleSheetLinkClick(link.href)}
                            className="text-lg font-medium text-foreground/80 hover:text-foreground"
                        >
                            {link.name}
                        </Link>
                        ))}
                        <Link href="/careers" onClick={handleSheetLinkClick('/careers')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Careers</Link>
                        <Link href="#contact" onClick={handleSheetLinkClick('/#contact')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Contact</Link>
                    </nav>
                    <div className="mt-8 space-y-4">
                         <Link href="/get-demo" onClick={handleSheetLinkClick('/get-demo')}>
                            <button className="btn w-full">
                                <span className="btn-text-one">Book Demo</span>
                                <span className="btn-text-two">Now</span>
                            </button>
                        </Link>
                    </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
