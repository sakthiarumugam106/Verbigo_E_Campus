

'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Feather, BookOpen, MessageCircle, ArrowRight, GraduationCap, Languages, Laptop, MessageSquareQuote, TrendingUp } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Testimonials } from '@/components/testimonials';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { courses } from '@/lib/courses';
import { WhatsAppButtonIcon } from '@/components/whatsapp-button-icon';

const benefits = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Expert-Led Instruction',
    description: 'Learn from seasoned linguists and certified language coaches.',
  },
  {
    icon: <Feather className="h-8 w-8 text-primary" />,
    title: 'Practical Writing Exercises',
    description: 'Apply what you learn with hands-on assignments and real-world scenarios.',
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: 'Interactive Feedback',
    description: 'Receive personalized feedback to refine your grammar and style.',
  },
];

const values = [
    {
        icon: <MessageSquareQuote className="h-10 w-10 text-primary" />,
        title: 'Empower through communication',
        description: 'Clear communication transforms lives. It builds confidence, opens opportunities, and fuels personal growth.',
    },
    {
        icon: <Languages className="h-10 w-10 text-primary" />,
        title: 'Bridge gaps through language',
        description: 'Language should connect, not divide. We make English approachable for those left behind by traditional methods.',
    },
    {
        icon: <TrendingUp className="h-10 w-10 text-primary" />,
        title: 'Treat language as a tool for growth',
        description: "English isn't just a subject. It's a skill that can unlock better opportunities, whether it's for work, study, or self-expression.",
    },
    {
        icon: <GraduationCap className="h-10 w-10 text-primary" />,
        title: 'Learner First approach',
        description: 'We design every course around the person learning it. Their pace, their comfort, their goals. Learning works best when it adapts to the learner.',
    },
    {
        icon: <Laptop className="h-10 w-10 text-primary" />,
        title: 'Blending Education & Technology',
        description: "As a language hub we're trying to utilize technology to its best and become a game changer in the field of language learning.",
    },
];

const faqItems = [
  {
    question: 'Who are the instructors?',
    answer:
      'Our courses are taught by a team of experienced linguists, published authors, and certified language coaches. Each instructor brings a wealth of knowledge and a passion for teaching.',
  },
  {
    question: 'What is the course format?',
    answer:
      'Courses consist of video lessons, interactive quizzes, and practical writing assignments. You can learn at your own pace and revisit materials anytime.',
  },
  {
    question: 'Will I get feedback on my writing?',
    answer:
      'Yes! All our courses include opportunities for personalized feedback from instructors and peers. Our Advanced Writing Workshop offers in-depth critiques to help you grow as a writer.',
  },
  {
    question: 'Do you offer courses for non-native English speakers?',
    answer:
      "Absolutely. Our 'Grammar Essentials' course is a great starting point for non-native speakers looking to solidify their understanding of English grammar.",
  },
];

export default function HomePage() {
  const phoneNumber = '7708071872';
  const message = "Hello Verbigo, I am interested in your courses and would like to know more. Please let me know the next steps.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const coursesPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <>
      <section
        id="hero"
        className="w-full overflow-hidden bg-[#f2b9ca] pt-20 pb-20 md:pt-32 md:pb-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold tracking-tighter text-black sm:text-6xl xl:text-7xl/none font-brand">
                  Learn english through your native language
                </h1>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                 <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white shadow-lg rounded-full">
                  <Link href="/#courses">
                    Find your tutor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3NDE5ODJ8MHwxfGFsbHwxfHx8fHx8fHx8fHwxNjE2NjYyOTU1&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Language tutor"
              width={600}
              height={400}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              data-ai-hint="language tutor online"
            />
          </div>
        </div>
      </section>

      <section id="courses" className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Language & Writing Courses
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're starting from scratch or honing your expertise, we have a course for you.
              </p>
            </div>
          </div>
           <Carousel
            plugins={[coursesPlugin.current]}
            className="w-full max-w-6xl mx-auto mt-12"
            onMouseEnter={coursesPlugin.current.stop}
            onMouseLeave={coursesPlugin.current.reset}
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {courses.map((course) => (
                 <CarouselItem key={course.slug} className="md:basis-1/2 lg:basis-1/3 pl-4">
                   <div className="p-1 h-full">
                    <Card className="group h-full overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 flex flex-col">
                      <Link href={`/courses/${course.slug}`} className="flex flex-col h-full">
                        <div className="overflow-hidden">
                          <Image
                            src={course.image}
                            alt={course.title}
                            width={600}
                            height={400}
                            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={course.aiHint}
                          />
                        </div>
                        <CardContent className="p-6 flex flex-col flex-grow">
                          <CardTitle className="text-xl font-bold text-primary group-hover:text-accent">{course.title}</CardTitle>
                          <p className="mt-2 text-muted-foreground text-sm flex-grow">{course.description}</p>
                           <div className="flex items-center mt-4 text-primary font-medium">
                            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Link>
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

      <section id="values" className="w-full bg-primary/5 py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">
                  Our Core <span className="text-destructive">Values</span>
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                  At Verbigo, our core values shape every lesson and interaction.
              </p>
          </div>
          <div className="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {values.map((value, index) => (
                  <Card key={index} className="flex flex-col justify-start transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 ease-in-out">
                      <CardHeader className="flex flex-row items-center gap-4 pb-4">
                          {value.icon}
                          <CardTitle className="text-xl font-semibold text-primary">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                  </Card>
              ))}
               <Card className="flex flex-col justify-center items-center bg-background/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 ease-in-out">
                  <CardContent className="text-center p-6">
                      <h3 className="text-xl font-bold text-primary mb-2">And so much more...</h3>
                      <p className="text-muted-foreground">We are constantly evolving to meet the needs of our learners.</p>
                  </CardContent>
              </Card>
          </div>
        </div>
      </section>

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
            <Testimonials />
        </div>
      </section>

      <section id="faq" className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
              Find answers to common questions about our language and grammar courses.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contact" className="w-full bg-primary/5 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid items-center justify-center gap-4 text-center">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Contact Our Team
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a question about a course? We're here to help. For demo requests, please use our dedicated demo form.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <ContactForm />
              <p className="text-xs text-muted-foreground">
                Our language experts will get back to you shortly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
