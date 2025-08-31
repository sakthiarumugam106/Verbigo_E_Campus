
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Target, Eye, Briefcase } from 'lucide-react';

const missionVisionItems = [
    {
    icon: <Briefcase className="h-12 w-12 text-primary" />,
    title: 'Join Our Team',
    text: "We're on a mission to make language learning accessible. If you're passionate about education and technology, we'd love to hear from you.",
  },
  {
    icon: <Target className="h-12 w-12 text-primary" />,
    title: 'Our Mission',
    text: "To empower individuals by making high-quality language education accessible, engaging, and effective through innovative technology.",
  },
  {
    icon: <Eye className="h-12 w-12 text-destructive" />,
    title: 'Our Vision',
    text: "To become a world leader in language intelligence, creating a global community of confident and proficient communicators.",
  },
];

export function MissionVision() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="mb-12">
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                align: 'start',
                loop: true,
            }}
            >
            <CarouselContent className="-ml-4">
                {missionVisionItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <div className="p-1 h-full">
                    <Card className="shadow-lg h-full transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 ease-in-out">
                        <CardContent className="flex flex-col items-center justify-start p-8 text-center gap-4 min-h-[320px]">
                            {item.icon}
                            <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                            <p className="text-md text-muted-foreground flex-grow">{item.text}</p>
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
  );
}
