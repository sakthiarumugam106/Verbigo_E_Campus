import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, BrainCircuit, ArrowRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

const benefits = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Expert-Led Courses',
    description: 'Learn from industry leaders and renowned academics.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Community Focused',
    description: 'Connect and collaborate with peers from around the globe.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Cutting-Edge Curriculum',
    description: 'Stay ahead with courses on the latest trends and technologies.',
  },
];

export const courses = [
  {
    slug: 'digital-marketing-pro',
    title: 'Digital Marketing Pro',
    description: 'Master SEO, content marketing, and social media strategies.',
    image: 'https://picsum.photos/600/400?random=1',
    aiHint: 'digital marketing',
    features: [
      'Strengthen grammar and sentence structure',
      'Improve reading, listening, and speaking',
      'Build vocabulary for everyday use',
      'Practice short conversations with confidence',
    ],
  },
  {
    slug: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    description: 'From React to Node.js, become a complete web developer.',
    image: 'https://picsum.photos/600/400?random=2',
    aiHint: 'web development',
     features: [
      'Master front-end with React and Next.js',
      'Build robust back-ends with Node.js and Express',
      'Learn database management with MongoDB and SQL',
      'Deploy full-stack applications to the cloud',
    ],
  },
  {
    slug: 'data-science-and-ai',
    title: 'Data Science & AI',
    description: 'Unlock the power of data with Python, ML, and deep learning.',
    image: 'https://picsum.photos/600/400?random=3',
    aiHint: 'data science',
     features: [
      'Master Python for data analysis',
      'Learn machine learning algorithms from scratch',
      'Understand neural networks and deep learning',
      'Build and deploy AI models',
    ],
  },
  {
    slug: 'ux-ui-design-fundamentals',
    title: 'UX/UI Design Fundamentals',
    description: 'Create beautiful and intuitive user experiences.',
    image: 'https://picsum.photos/600/400?random=4',
    aiHint: 'ui design',
     features: [
      'Learn the principles of user-centered design',
      'Master wireframing and prototyping with Figma',
      'Understand user research and testing methodologies',
      'Build a professional design portfolio',
    ],
  },
];

const faqItems = [
  {
    question: 'Are the courses self-paced?',
    answer:
      'Yes, most of our courses are self-paced, allowing you to learn on your own schedule. Some programs may include live sessions, which will be clearly indicated.',
  },
  {
    question: 'Do I get a certificate upon completion?',
    answer:
      'Absolutely! Upon successful completion of any course, you will receive a shareable digital certificate from Verbigo E-Campus to showcase your new skills.',
  },
  {
    question: 'What kind of support is available?',
    answer:
      'We offer comprehensive support, including 24/7 access to our help center, dedicated forums for each course, and direct support from instructors during virtual office hours.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      "While we don't offer a traditional free trial, you can request a demo to see our platform in action. We also have several free introductory courses to give you a taste of the Verbigo experience.",
  },
];

export default function HomePage() {
  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden bg-primary/5 pt-20 pb-20 md:pt-32 md:pb-24"
      >
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl xl:text-6xl/none">
                  Unlock Your Potential with Verbigo E-Campus
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover a new era of online learning. Our platform offers
                  engaging courses, expert instruction, and a vibrant community to
                  help you achieve your goals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <Link href="/get-demo">Get a Demo</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#courses">Explore Courses</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://picsum.photos/1200/800"
              alt="Hero"
              width={1200}
              height={800}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover w-full"
              data-ai-hint="online learning"
            />
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Explore Our Programs
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From technology and business to creative arts, find the perfect
                course to advance your career or pursue your passion.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12">
            {courses.map((course) => (
               <Card key={course.slug} className="grid md:grid-cols-2 overflow-hidden transition-all hover:shadow-lg">
                <div className="flex flex-col justify-between p-6">
                  <div>
                    <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                    <p className="mt-2 text-muted-foreground">{course.description}</p>
                  </div>
                  <Button asChild variant="link" className="p-0 h-auto mt-4 justify-start text-primary">
                    <Link href={`/courses/${course.slug}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="p-0">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={600}
                    height={400}
                    className="aspect-video w-full object-cover md:aspect-auto md:h-full"
                    data-ai-hint={course.aiHint}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
              Have questions? We've got answers. Here are some of the most
              common inquiries we receive.
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

      <section id="contact" className="bg-background">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have a question or want to learn more? Drop us a line. For demo
              requests, please use our dedicated demo form.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <ContactForm />
            <p className="text-xs text-muted-foreground">
              We'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
