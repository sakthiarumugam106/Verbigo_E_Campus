
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
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useLoading } from '@/components/loading-provider';
import { useRouter } from 'next/navigation';
import { CourseCategoryToggle } from '@/components/course-category-toggle';
import './sparkle-button.css';
import { Balancer } from 'react-wrap-balancer';

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

function MobileValueItem({ value, isExpanded }: { value: (typeof values)[0], isExpanded: boolean }) {
    const ref = React.useRef(null);
    
    return (
        <div 
            ref={ref}
            className={cn(
                "bg-background border rounded-lg overflow-hidden transition-all duration-500 neumorphic-outer",
                 isExpanded ? "neumorphic-pressed" : ""
            )}
        >
            <div className="flex items-center gap-4 p-4 text-left">
                <div className={cn("flex-shrink-0 transition-colors duration-500", isExpanded ? "text-primary dark:text-primary-foreground" : "text-primary/70 dark:text-primary-foreground/70")}>{value.icon}</div>
                <span className={cn("flex-1 text-lg font-semibold transition-colors duration-500", isExpanded ? "text-primary dark:text-primary-foreground" : "text-primary/80 dark:text-primary-foreground/80")}>{value.title}</span>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 pt-0">
                            <p className="text-muted-foreground dark:text-foreground/80">{value.description}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MobileValuesSection() {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            
            const itemElements = Array.from(containerRef.current.children) as HTMLElement[];
            const viewportCenter = window.innerHeight / 2;

            let closestItemIndex: number | null = null;
            let smallestDistance = Infinity;

            itemElements.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;
                const distance = Math.abs(viewportCenter - itemCenter);
                
                if (distance < smallestDistance) {
                    smallestDistance = distance;
                    closestItemIndex = index;
                }
            });
            
            // Only highlight if the item is reasonably close to the center
            if (smallestDistance < window.innerHeight / 4) {
                 setActiveIndex(closestItemIndex);
            } else {
                 setActiveIndex(null);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div ref={containerRef} className="mx-auto mt-12 max-w-3xl space-y-4">
            {values.map((value, index) => (
                <MobileValueItem 
                    key={index} 
                    value={value}
                    isExpanded={activeIndex === index}
                />
            ))}
        </div>
    );
}


function DesktopValuesSection() {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
         <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12"
        >
            {values.map((value, index) => (
                 <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full flex flex-col justify-start neumorphic-outer neumorphic-outer-hover transition-transform hover:-translate-y-1">
                        <CardHeader className="flex flex-row items-center gap-4 pb-4">
                            {value.icon}
                            <CardTitle className="text-xl font-semibold text-primary dark:text-primary-foreground">{value.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground dark:text-foreground/80">{value.description}</p>
                        </CardContent>
                    </Card>
                 </motion.div>
            ))}
             <motion.div variants={itemVariants}>
                <Card className="h-full flex flex-col justify-center items-center neumorphic-outer neumorphic-outer-hover transition-transform hover:-translate-y-1">
                    <CardContent className="p-4 md:p-6 text-center">
                        <h3 className="text-xl font-bold text-primary dark:text-primary-foreground mb-2">And so much more...</h3>
                        <p className="text-muted-foreground dark:text-foreground/80">We are constantly evolving to meet the needs of our learners.</p>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}

function ValuesSection() {
    const [isClient, setIsClient] = React.useState(false);
    const isMobile = useIsMobile();

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12" style={{ minHeight: '400px' }} />;
    }

    return isMobile ? <MobileValuesSection /> : <DesktopValuesSection />;
}


export default function HomePage() {
  const coursesPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [courseFilter, setCourseFilter] = React.useState<'Professional' | 'Kids'>('Professional');
  
  const filteredCourses = courses.filter(course => course.category === courseFilter.toLowerCase());
  const { showLoader } = useLoading();
  const router = useRouter();
  
  const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    showLoader();
    router.push(href);
  };


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
                  <Balancer>
                    Learn english through your native language
                  </Balancer>
                </h1>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                 <Button asChild size="lg" useNeumorphic={false} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full shadow-lg">
                  <Link href="/find-tutor" onClick={handleLinkClick('/find-tutor')}>
                    Find your tutor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Link href="/know-your-level" onClick={handleLinkClick('/know-your-level')}>
                    <button className="sparkle-button" type="button">
                        <span className="sparkle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146 152" fill="none" className="path">
                                <path d="M73 0L95.2433 50.4132L146 58.6487L103.25 91.5868L119.457 146L73 114.15L26.5433 146L42.75 91.5868L0 58.6487L50.7567 50.4132L73 0Z" />
                            </svg>
                        </span>
                        <span className="backdrop"></span>
                        <span className="text_button">Know Your Level</span>
                    </button>
                </Link>
              </div>
            </div>
            <div className="relative h-80 lg:h-96 w-full rounded-xl overflow-hidden shadow-2xl">
               <Image
                src="/images/World_Languages.png"
                alt="World map of official languages"
                fill
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
                    <Card className="group h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1 flex flex-col">
                      <Link href={`/courses/${course.slug}`} onClick={handleLinkClick(`/courses/${course.slug}`)} className="flex flex-col h-full">
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
                      </Link>
                    </Card>
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
