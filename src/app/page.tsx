
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Globe, Laptop, Lightbulb, Users } from 'lucide-react';
import dynamic from 'next/dynamic';
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
import { cn } from '@/lib/utils';
import { CourseCategoryToggle } from '@/components/course-category-toggle';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter, usePathname } from 'next/navigation';
import { useLoading } from '@/components/loading-provider';
import { useIsMobile } from '@/hooks/use-mobile';

const ContactForm = dynamic(() => import('@/components/contact-form').then(mod => mod.ContactForm), {
  loading: () => <Skeleton className="h-[500px] w-full max-w-lg" />,
});

const Testimonials = dynamic(() => import('@/components/testimonials').then(mod => mod.Testimonials), {
  loading: () => <Skeleton className="h-[400px] w-full max-w-5xl" />,
});


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

function ValuesSection() {
    const isMobile = useIsMobile();
    const [isClient, setIsClient] = React.useState(false);
    const [openItem, setOpenItem] = React.useState<string | undefined>();
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const pathname = usePathname();


    React.useEffect(() => {
        setIsClient(true);
    }, []);

    React.useEffect(() => {
        // Reset accordion when navigating away
        if (pathname !== '/') {
            setOpenItem(undefined);
        }
    }, [pathname]);

    React.useEffect(() => {
        if (!isMobile || !sectionRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the section is not intersecting (is not visible), collapse the item.
                if (!entry.isIntersecting) {
                    setOpenItem(undefined);
                }
            },
            { threshold: 0 } // A threshold of 0 means the callback will run as soon as the element is no longer visible.
        );

        observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isMobile]);

    if (!isClient) {
        return <Skeleton className="h-[400px] w-full" />;
    }

    if (isMobile) {
        return (
             <div className="mx-auto w-full max-w-2xl py-12" ref={sectionRef}>
                <Accordion type="single" collapsible className="w-full space-y-4" value={openItem} onValueChange={setOpenItem}>
                  {values.map((value, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="neumorphic-outer rounded-lg border-none overflow-hidden">
                        <AccordionTrigger className="p-4 hover:no-underline w-full">
                            <div className="flex items-center gap-4">
                                {value.icon}
                                <h3 className="text-xl font-semibold text-left text-primary dark:text-primary-foreground">{value.title}</h3>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-0">
                            <p className="text-muted-foreground dark:text-foreground/80">{value.description}</p>
                        </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
            </div>
        );
    }

    return (
         <div
            className="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12"
        >
            {values.map((value, index) => (
                 <div key={index}>
                    <Card className="h-full flex flex-col justify-start neumorphic-outer neumorphic-outer-hover transition-transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4 pb-4">
                            {value.icon}
                            <CardTitle className="text-xl font-semibold text-primary dark:text-primary-foreground">{value.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground dark:text-foreground/80">{value.description}</p>
                        </CardContent>
                    </Card>
                 </div>
            ))}
             <div>
                <Card className="h-full flex flex-col justify-center items-center neumorphic-outer neumorphic-outer-hover transition-transform hover:-translate-y-1">
                    <CardContent className="p-4 md:p-6 text-center">
                        <h3 className="text-xl font-bold text-primary dark:text-primary-foreground mb-2">And so much more...</h3>
                        <p className="text-muted-foreground dark:text-foreground/80">We are constantly evolving to meet the needs of our learners.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default function HomePage() {
  const coursesPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [courseFilter, setCourseFilter] = React.useState<'Professional' | 'Kids'>('Professional');
  const router = useRouter();
  const { showLoader } = useLoading();
  
  const filteredCourses = courses.filter(course => course.category === courseFilter.toLowerCase());

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showLoader();
    router.push(href);
  };

  const handleCourseCardClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    showLoader();
    router.push(href);
  };

  return (
    <>
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-[#2A3C9F] py-12 md:py-20"
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
                 
                    <button className="cssbuttons-io-button" onClick={handleNavClick('/find-tutor')}>
                        <span>Find your tutor</span>
                        <div className="icon">
                            <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                fill="currentColor"
                            ></path>
                            </svg>
                        </div>
                    </button>
                
                    <button className="sparkle-button default-animated" type="button" onClick={handleNavClick('/know-your-level')}>
                        <div className="dots_border"></div>
                        <span className="sparkle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="sparkle_path">
                                <path
                                className="path"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
                                ></path>
                                <path
                                className="path"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
                                ></path>
                                <path
                                className="path"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
                                ></path>
                            </svg>
                        </span>
                        <span className="backdrop"></span>
                        <span className="text_button">Know Your Level</span>
                    </button>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
               <Image
                src="/images/World_Languages.png"
                alt="World map of official languages"
                fill
                priority
                className="object-cover"
                data-ai-hint="world language map"
                />
                 <blockquote className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-sm p-4 text-center rounded-b-xl">
                    <p className="text-lg font-medium text-foreground">"To have another language is to possess a second soul."</p>
                    <footer className="mt-2 text-sm text-muted-foreground">- Charlemagne</footer>
                </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="relative w-full bg-background py-16 md:py-24">
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
            <div className="pt-8">
              <CourseCategoryToggle value={courseFilter} onChange={setCourseFilter} />
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
              {filteredCourses.map((course) => (
                 <CarouselItem key={course.slug} className="md:basis-1/2 lg:basis-1/3 pl-4">
                   <div className="p-1 h-full">
                    <Link
                      href={`/courses/${course.slug}`}
                      onClick={(e) => handleCourseCardClick(e, `/courses/${course.slug}`)}
                      className="flex flex-col h-full cursor-pointer"
                      prefetch={true}
                      aria-label={`Read more about the ${course.title} course`}
                    >
                      <Card className="neumorphic-outer group h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1 flex flex-col">
                        <div className="overflow-hidden rounded-t-lg">
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
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2 neumorphic-outer neumorphic-outer-hover" />
            <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2 neumorphic-outer neumorphic-outer-hover" />
          </Carousel>
        </div>
      </section>

      <section id="values" className="relative w-full bg-secondary py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary dark:text-primary-foreground">
                  Our Core Values
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
                  At Verbigo, our core values shape every lesson and interaction.
              </p>
          </div>
          <ValuesSection />
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
          <div className="mx-auto mt-12 max-w-3xl neumorphic-outer rounded-lg p-2">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                  <AccordionTrigger className="text-lg font-medium text-left p-4 hover:no-underline rounded-md hover:bg-primary/5">
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

      <section id="contact" className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 flex justify-center">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
