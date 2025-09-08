
'use client';

import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function SocialShareButtons({ title }: { title: string }) {
  const pathname = usePathname();
  const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${pathname}`;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
  };

  return (
    <div className="flex items-center gap-2">
       <span className="text-sm font-medium text-muted-foreground dark:text-foreground/80">Share:</span>
      <Button asChild variant="outline" size="icon">
        <Link href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" />
        </Link>
      </Button>
       <Button asChild variant="outline" size="icon">
        <Link href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <Twitter className="h-4 w-4" />
        </Link>
      </Button>
       <Button asChild variant="outline" size="icon">
        <Link href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" />
        </Link>
      </Button>
       <Button asChild variant="outline" size="icon">
        <Link href={shareLinks.email} target="_blank" rel="noopener noreferrer" aria-label="Share via Email">
          <Mail className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
