
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
import { Feather, BookOpen, MessageCircle, ArrowRight, GraduationCap, Languages, Laptop, MessageSquareQuote, TrendingUp, Users, Target, Lightbulb, Globe } from 'lucide-react';
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { whatsapp } from '@/lib/config';

const benefits = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary dark:text-primary-foreground" />,
    title: 'Expert-Led Instruction',
    description: 'Learn from seasoned linguists and certified language coaches.',
  },
  {
    icon: <Feather className="h-8 w-8 text-primary dark:text-primary-foreground" />,
    title: 'Practical Writing Exercises',
    description: 'Apply what you learn with hands-on assignments and real-world scenarios.',
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary dark:text-primary-foreground" />,
    title: 'Interactive Feedback',
    description: 'Receive personalized feedback to refine your grammar and style.',
  },
];

const values = [
    {
        icon: <Users className="h-10 w-10 text-primary dark:text-primary-foreground" />,
        title: 'Learner-centric Environment',
        description: "We tailor every aspect of learning to the individual student's needs, pace, and goals, ensuring a personalized and effective journey.",
    },
    {
        icon: <BookOpen className="h-10 w-10 text-primary dark:text-primary-foreground" />,
        title: 'Foundational Literacy',
        description: "We focus on building strong literacy fundamentals, providing the essential building blocks for lifelong learning and communication.",
    },
    {
        icon: <Lightbulb className="h-10 w-10 text-primary dark:text-primary-foreground" />,
        title: 'Experiential & Competency-Based Education',
        description: "Our approach is hands-on and practical, focusing on developing real-world skills and measurable competencies, not just theoretical knowledge.",
    },
    {
        icon: <Globe className="h-10 w-10 text-primary dark:text-primary-foreground" />,
        title: 'Global Competence & 21st Century Skills',
        description: 'We equip learners with the language skills and cultural understanding needed to thrive in an interconnected, 21st-century world.',
    },
    {
        icon: <Laptop className="h-10 w-10 text-primary dark:text-primary-foreground" />,
        title: 'Blending Education & Technology',
        description: "As a language hub, we leverage cutting-edge technology to create innovative, engaging, and accessible learning experiences.",
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
  const coursesPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [courseFilter, setCourseFilter] = React.useState('Professional');

  const filteredCourses = courses.filter(course => course.category === courseFilter.toLowerCase());


  return (
    <>
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-primary py-12 md:py-20"
      >
        <div 
          className="absolute inset-0 bg-repeat" 
          style={{ 
            backgroundImage: "url('/subtle-pattern.svg')",
            opacity: 0.1,
          }}
        />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-primary-foreground sm:text-6xl xl:text-7xl/none font-brand">
                  Learn english through your native language
                </h1>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                 <Button asChild size="lg" variant="secondary" className="rounded-full shadow-lg">
                  <Link href="/find-tutor">
                    Find your tutor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full shadow-lg bg-primary-foreground/10 text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/20">
                  <Link href="/know-your-level">
                    Know Your Level <GraduationCap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl border-4 border-white/80">
              <video
                src="https://cdn.pixabay.com/video/2024/05/29/213054_large.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="relative w-full bg-secondary py-16 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-repeat" 
          style={{ 
            backgroundImage: "url('/subtle-pattern.svg')",
            opacity: 0.05,
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-primary dark:text-primary-foreground sm:text-4xl md:text-5xl">
                Our Courses
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-foreground/80">
                Whether you're starting from scratch or honing your expertise, we have a course for you.
              </p>
            </div>
            <Tabs value={courseFilter} onValueChange={setCourseFilter} className="mt-8">
               <TabsList className="grid w-full grid-cols-2 bg-primary/20 text-primary-foreground p-1 h-auto rounded-lg">
                <TabsTrigger value="Professional" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md py-2 font-medium">For Professionals</TabsTrigger>
                <TabsTrigger value="Kids" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-md py-2 font-medium">For Kids</TabsTrigger>
              </TabsList>
            </Tabs>
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
              {filteredCourses.map((course) => (
                 <CarouselItem key={course.slug} className="md:basis-1/2 lg:basis-1/3 pl-4">
                   <div className="p-1 h-full">
                    <Card className="group h-full overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 flex flex-col bg-background/80 backdrop-blur-sm border-primary/10">
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
                        <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
                          <CardTitle className="text-lg md:text-xl font-bold text-primary group-hover:text-primary dark:text-primary-foreground">{course.title}</CardTitle>
                          <p className="mt-2 text-muted-foreground text-sm flex-grow dark:text-foreground/80">{course.description}</p>
                           <div className="flex items-center mt-4 text-primary font-medium dark:text-primary-foreground">
                            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </section>

      <section id="values" className="relative w-full bg-primary/10 py-16 md:py-24 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-repeat" 
          style={{ 
            backgroundImage: "url('/subtle-pattern.svg')",
            opacity: 0.05,
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary dark:text-primary-foreground">
                  Our Core Values
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
                  At Verbigo, our core values shape every lesson and interaction.
              </p>
          </div>
          <div className="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {values.map((value, index) => (
                  <Card key={index} className="flex flex-col justify-start bg-background/60 backdrop-blur-sm border-accent/20 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 ease-in-out">
                      <CardHeader className="flex flex-row items-center gap-4 pb-4">
                          {value.icon}
                          <CardTitle className="text-xl font-semibold text-primary dark:text-primary-foreground">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground dark:text-foreground/80">{value.description}</p>
                      </CardContent>
                  </Card>
              ))}
               <Card className="flex flex-col justify-center items-center bg-background/60 backdrop-blur-sm border-accent/20 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 ease-in-out">
                  <CardContent className="p-4 md:p-6 text-center">
                      <h3 className="text-xl font-bold text-primary dark:text-primary-foreground mb-2">And so much more...</h3>
                      <p className="text-muted-foreground dark:text-foreground/80">We are constantly evolving to meet the needs of our learners.</p>
                  </CardContent>
              </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter text-primary dark:text-primary-foreground sm:text-4xl md:text-5xl">
                    Testimonials
                </h2>
                <p className="mt-4 text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
                    Hear directly from learners who have transformed their skills with Verbigo.
                </p>
            </div>
            <Testimonials />
        </div>
      </section>

      <section id="faq" className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
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
                  <AccordionContent className="text-base text-muted-foreground dark:text-foreground/80">
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
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-foreground/80">
                Have a question about a course? We're here to help. For demo requests, please use our dedicated demo form.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <ContactForm />
              <p className="text-xs text-muted-foreground dark:text-foreground/80">
                Our language experts will get back to you shortly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

    

    