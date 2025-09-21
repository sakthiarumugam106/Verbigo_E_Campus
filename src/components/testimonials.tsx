
'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))}
  </div>
);


export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-5xl mx-auto mt-12"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="flex flex-col justify-between h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center text-center p-6 gap-4">
                        <Quote className="w-10 h-10 text-primary/20" />
                        <StarRating rating={testimonial.rating} />
                        <p className="text-muted-foreground italic text-sm dark:text-foreground/80">
                            "{testimonial.review}"
                        </p>
                    </CardContent>
                    <div className="bg-primary/5 p-4 flex flex-col items-center text-center mt-auto">
                        <Image
                            src={testimonial.userImage}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="rounded-full border-4 border-background mb-3"
                             data-ai-hint={testimonial.aiHint}
                        />
                        <p className="font-semibold text-primary dark:text-primary-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground dark:text-foreground/80">{testimonial.role}</p>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2" />
        </Carousel>
  );
}
