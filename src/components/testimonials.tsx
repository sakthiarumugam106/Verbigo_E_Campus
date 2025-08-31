
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
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Verbigo has been a game-changer for my writing. The feedback is constructive, and the instructors are incredibly supportive. My confidence has soared!',
    name: 'Sarah L.',
    title: 'Advanced Writing Student',
    avatar: 'https://picsum.photos/100/100?random=11',
    aiHint: 'happy student',
  },
  {
    quote:
      "I struggled with grammar for years, but the 'Grammar Essentials' course made everything click. The lessons are clear, concise, and easy to follow.",
    name: 'Michael B.',
    title: 'Grammar Essentials Student',
    avatar: 'https://picsum.photos/100/100?random=12',
    aiHint: 'smiling person',
  },
  {
    quote:
      'The Business Communication course helped me land my dream job. I can now write professional emails and reports with ease and precision.',
    name: 'Jessica P.',
    title: 'Business Communication Student',
    avatar: 'https://picsum.photos/100/100?random=13',
    aiHint: 'professional woman',
  },
  {
    quote:
      'I never thought I could write creatively, but the "Creative Writing Unleashed" course proved me wrong. It unlocked a passion I never knew I had.',
    name: 'David H.',
    title: 'Creative Writing Student',
    avatar: 'https://picsum.photos/100/100?random=14',
    aiHint: 'thoughtful man',
  },
    {
    quote:
      "As a non-native speaker, I found Verbigo's patient approach incredibly helpful. I feel much more comfortable expressing myself in English now.",
    name: 'Maria G.',
    title: 'ESL Student',
    avatar: 'https://picsum.photos/100/100?random=15',
    aiHint: 'student portrait',
  },
];

export function Testimonials() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="testimonials" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
                What Our Students Say
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                Hear directly from learners who have transformed their skills with Verbigo.
            </p>
        </div>
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
                    <CardContent className="flex flex-col items-center text-center p-6 gap-6">
                        <Quote className="w-12 h-12 text-primary/20" />
                        <p className="text-muted-foreground italic">
                            "{testimonial.quote}"
                        </p>
                    </CardContent>
                    <div className="bg-primary/5 p-4 flex flex-col items-center text-center">
                        <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="rounded-full border-4 border-background mb-3"
                             data-ai-hint={testimonial.aiHint}
                        />
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
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
