"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { VerbigoLogo } from '@/components/verbigo-logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/#courses' },
  { name: 'Our Values', href: '/#values' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contact', href: '/#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <VerbigoLogo className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="font-brand text-2xl font-bold leading-none">Verbigo</span>
              <span className="text-xs font-medium text-muted-foreground leading-none mt-1">E-Campus for language Intelligence</span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-6 text-sm font-medium md:flex">
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

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:flex">
            <Link href="/get-demo">Get a Demo</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link
                href="/"
                className="flex items-center gap-2 text-primary mb-6"
                onClick={() => setIsOpen(false)}
              >
                <VerbigoLogo className="h-10 w-10" />
                 <div className="flex flex-col">
                    <span className="font-brand text-2xl font-bold leading-none">Verbigo</span>
                    <span className="text-xs font-medium text-muted-foreground leading-none mt-1">E-Campus for language Intelligence</span>
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
              </nav>
              <Button asChild size="lg" className="w-full mt-8">
                  <Link href="/get-demo">Get a Demo</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
