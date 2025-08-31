
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Linkedin } from 'lucide-react';
import { teamMembers } from '@/lib/team';

export function Team() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section id="team" className="w-full bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
                 <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
                    Our Team
                </h2>
            </div>
            <div>
                 <p className="text-muted-foreground md:text-lg">
                    Our team is driven by a passion for empowering learners worldwide. We combine
                    innovative methods with personalized attention to help every student succeed.
                    Together, we are redefining the future of English education.
                </p>
            </div>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-6xl mx-auto mt-12"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {teamMembers.map((member, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 pl-4">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <div className="relative">
                        <Image
                            src={member.image}
                            alt={member.name}
                            width={400}
                            height={400}
                            className="w-full h-auto aspect-square object-cover"
                            data-ai-hint="team member portrait"
                        />
                         <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: 'url(/logo-bg.svg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                mixBlendMode: 'lighten',
                                opacity: 0.1,
                            }}
                         ></div>
                    </div>
                    <CardContent className="flex flex-col items-center text-center p-6 flex-grow">
                        <h3 className="font-bold text-lg text-primary">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.title}</p>
                        <Link href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-3 text-muted-foreground hover:text-primary">
                            <Linkedin className="h-6 w-6" />
                        </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
