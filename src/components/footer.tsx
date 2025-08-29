import Link from 'next/link';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { WhatsAppIcon } from '@/components/whatsapp-button';

export function Footer() {
  return (
    <footer className="bg-primary/5 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                <div className="h-8 w-8 bg-[#25D366] rounded-full flex items-center justify-center">
                  <WhatsAppIcon />
                </div>
                <span>Verbigo</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The future of online education, today.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2">
            <div className="grid gap-2">
              <h3 className="font-semibold">Platform</h3>
              <Link href="#courses" className="text-sm text-muted-foreground hover:text-primary">Courses</Link>
              <Link href="/get-demo" className="text-sm text-muted-foreground hover:text-primary">Request a Demo</Link>
              <Link href="#faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Company</h3>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Verbigo E-Campus. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
