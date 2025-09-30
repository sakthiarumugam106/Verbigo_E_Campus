
'use client';

import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TamilComingSoonPage() {
  return (
    <div className="bg-background min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
            <div className="relative w-full max-w-sm h-64">
                <Image 
                    src="https://picsum.photos/seed/construction/600/400"
                    alt="Under Construction"
                    fill
                    className="object-cover rounded-xl shadow-lg"
                    data-ai-hint="website construction"
                />
            </div>
          <div className="space-y-4">
             <div className="flex justify-center items-center gap-3 text-primary dark:text-primary-foreground">
                <Construction className="h-8 w-8" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Coming Soon!
                </h1>
             </div>
            <p className="text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
              எங்கள் தமிழ் பதிப்பு விரைவில் வருகிறது. The Tamil version of our website is under development and will be launching soon. Stay tuned!
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/">Go Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
