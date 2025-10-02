
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, Globe } from 'lucide-react';
import * as React from 'react';
import { VerbigoLogo } from '@/components/verbigo-logo';
import { ThemeToggle } from './theme-toggle';
import { usePathname } from 'next/navigation';
import { useLoading } from './loading-provider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { 
    name: 'Languages', 
    isDropdown: true,
    subLinks: [
      { name: 'English', href: '/' },
      { name: 'Tamil', href: '/ta' },
    ]
  },
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
    setIsOpen(false);

    // If already on the page and it's a hash link, just scroll.
    if (pathname === '/' && href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // If navigating to the same page (but not a hash link), scroll to top.
    if (href === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // For all other navigations.
    showLoader();
    router.push(href);
  };
  
  React.useEffect(() => {
    // Hide loader on initial mount and on path changes
    hideLoader();
  }, [pathname, hideLoader]);


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
                link.isDropdown ? (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-1 transition-colors hover:text-foreground/80 text-foreground/60 focus:outline-none">
                        {link.name}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {link.subLinks?.map(subLink => (
                        <DropdownMenuItem key={subLink.name} asChild>
                          <Link href={subLink.href} onClick={handleLinkClick(subLink.href)}>{subLink.name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick(link.href)}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    {link.name}
                  </Link>
                )
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
                        onClick={handleLinkClick('/')}
                    >
                        <VerbigoLogo />
                        <div className="flex flex-col">
                            <span className="font-brand text-xl font-bold leading-none">Verbigo</span>
                            <span className="text-[10px] font-medium text-muted-foreground leading-none mt-1">E-Campus for Language Intelligence</span>
                        </div>
                    </Link>
                    <nav className="grid gap-4">
                        <Link href="/" onClick={handleLinkClick('/')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Home</Link>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="flex items-center justify-between w-full text-lg font-medium text-foreground/80 hover:text-foreground focus:outline-none">
                              Languages
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link href="/" onClick={handleLinkClick('/')}>English</Link>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                              <Link href="/ta" onClick={handleLinkClick('/ta')}>Tamil</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href="/#courses" onClick={handleLinkClick('/#courses')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Courses</Link>
                        <Link href="/blog" onClick={handleLinkClick('/blog')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Blog</Link>
                        <Link href="/know-your-level" onClick={handleLinkClick('/know-your-level')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Know Your Level</Link>
                        <Link href="/#values" onClick={handleLinkClick('/#values')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Our Values</Link>
                        <Link href="/#faq" onClick={handleLinkClick('/#faq')} className="text-lg font-medium text-foreground/80 hover:text-foreground">FAQ</Link>
                        <Link href="/careers" onClick={handleLinkClick('/careers')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Careers</Link>
                        <Link href="#contact" onClick={handleLinkClick('/#contact')} className="text-lg font-medium text-foreground/80 hover:text-foreground">Contact</Link>
                    </nav>
                    <div className="mt-8 space-y-4">
                         <Link href="/get-demo" onClick={handleLinkClick('/get-demo')}>
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
