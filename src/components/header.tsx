
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import * as React from 'react';
import { VerbigoLogo } from '@/components/verbigo-logo';
import { whatsapp } from '@/lib/config';
import { ThemeToggle } from './theme-toggle';


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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-primary dark:text-primary-foreground">
                <VerbigoLogo />
                <div className="flex flex-col">
                    <span className="font-brand text-xl font-bold leading-none">Verbigo</span>
                    <span className="text-[10px] font-medium text-muted-foreground leading-none mt-1">E-Campus for Language Intelligence</span>
                </div>
            </Link>
        </div>
        
        <nav className="hidden items-center justify-center gap-6 text-sm font-medium md:flex">
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
            <div className="hidden sm:flex items-center gap-2">
                <Button asChild>
                    <Link href="/get-demo">Book Demo</Link>
                </Button>
            </div>
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary hover:text-primary-foreground"
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
                    <Link href="#contact" onClick={() => setIsOpen(false)} className="text-lg font-medium text-foreground/80 hover:text-foreground">Contact</Link>
                </nav>
                <div className="mt-8 space-y-4">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/get-demo">Book Demo</Link>
                    </Button>
                </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
