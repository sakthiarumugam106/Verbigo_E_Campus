
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { VerbigoLogo } from '@/components/verbigo-logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/#courses' },
  { name: 'AI Coach', href: '/#grammar-coach'},
  { name: 'Know Your Level', href: '/know-your-level' },
  { name: 'Our Values', href: '/#values' },
  { name: 'FAQ', href: '/#faq' },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const phoneNumber = '7708071872';
  const message = "Hello Verbigo, I am interested in your courses and would like to schedule a demo. Please let me know the next steps.";
  const whatsappDemoUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between pl-4 md:pl-6">
        <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-primary">
                <VerbigoLogo />
                <div className="flex flex-col">
                    <span className="font-brand text-xl font-bold leading-none">Verbigo</span>
                    <span className="text-[10px] font-medium text-muted-foreground leading-none mt-1">E-Campus for Language Intelligence</span>
                </div>
            </Link>
        </div>
        <nav className="hidden items-center justify-center gap-6 text-sm font-medium md:flex flex-1">
            {navLinks.map((link) => (
                <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                {link.name}
                </Link>
            ))}
        </nav>
        <div className="flex items-center gap-4">
           <Button asChild className="hidden sm:flex">
            <Link href={whatsappDemoUrl} target="_blank" rel="noopener noreferrer">Book a Demo</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden hover:bg-primary hover:text-primary-foreground"
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
                className="flex items-center gap-2 text-primary mb-6"
                onClick={() => setIsOpen(false)}
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
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                ))}
                 <Link href="/careers" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 hover:text-foreground">Careers</Link>
                 <Link href="/#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 hover:text-foreground">Contact</Link>
              </nav>
              <Button asChild size="lg" className="w-full mt-8">
                  <Link href={whatsappDemoUrl} target="_blank" rel="noopener noreferrer">Book a Demo</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
