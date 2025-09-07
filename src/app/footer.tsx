
import Link from 'next/link';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { VerbigoLogo } from '@/components/verbigo-logo';

export function Footer() {
  const phoneNumber = '7708071872';
  const message = "Hello Verbigo, I am interested in your courses and would like to schedule a demo. Please let me know the next steps.";
  const whatsappDemoUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <footer id="page-footer" className="bg-black text-white py-12">
      <div className="container mx-auto px-6 md:px-8 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col items-center md:items-start gap-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white">
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
            <div className="grid gap-2 text-center sm:text-left">
              <h3 className="font-semibold">Platform</h3>
              <Link href="/#courses" className="text-sm text-gray-400 hover:text-white">Courses</Link>
              <Link href="/#values" className="text-sm text-gray-400 hover:text-white">Our Values</Link>
              <Link href={whatsappDemoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white">Book a Demo</Link>
              <Link href="/#faq" className="text-sm text-gray-400 hover:text-white">FAQ</Link>
            </div>
            <div className="grid gap-2 text-center sm:text-left">
              <h3 className="font-semibold">Company</h3>
              <Link href="/about-us" className="text-sm text-gray-400 hover:text-white">About Us</Link>
              <Link href="/careers" className="text-sm text-gray-400 hover:text-white">Careers</Link>
              <Link href="/#contact" className="text-sm text-gray-400 hover:text-white">Contact</Link>
            </div>
            <div className="grid gap-2 text-center sm:text-left">
              <h3 className="font-semibold">Legal</h3>
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Verbigo. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
