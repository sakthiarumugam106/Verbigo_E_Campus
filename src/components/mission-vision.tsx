
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Target, Eye } from 'lucide-react';

const missionVisionItems = [
  {
    icon: <Target className="h-12 w-12 text-primary" />,
    title: 'Our Mission',
    text: "To empower individuals by making high-quality language education accessible, engaging, and effective. We bridge communication gaps and unlock global opportunities through innovative technology and personalized learning experiences.",
  },
  {
    icon: <Eye className="h-12 w-12 text-destructive" />,
    title: 'Our Vision',
    text: "To become a world leader in language intelligence, creating a global community of confident and proficient communicators. We envision a future where language is a tool for growth, connection, and mutual understanding, not a barrier.",
  },
];

export function MissionVision() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="mt-16 mb-12">
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-4xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                align: 'start',
                loop: true,
            }}
            >
            <CarouselContent>
                {missionVisionItems.map((item, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <Card className="shadow-lg">
                        <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center gap-4">
                            {item.icon}
                            <h3 className="text-3xl font-bold text-primary">{item.title}</h3>
                            <p className="text-lg text-muted-foreground max-w-2xl">{item.text}</p>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    </div>
  );
}
