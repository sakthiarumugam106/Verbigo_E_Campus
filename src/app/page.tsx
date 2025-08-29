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
import { Feather, BookOpen, MessageCircle, ArrowRight, GraduationCap, Languages, Laptop, MessageSquareQuote, TrendingUp } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

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

export const courses = [
  {
    slug: 'grammar-essentials',
    title: 'Grammar Essentials',
    description: 'Build a strong foundation in English grammar and sentence structure.',
    image: 'https://picsum.photos/600/400?random=1',
    aiHint: 'grammar book',
    features: [
      'Master parts of speech (nouns, verbs, adjectives)',
      'Understand verb tenses and subject-verb agreement',
      'Learn to use punctuation correctly',
      'Construct clear and grammatically correct sentences',
    ],
  },
  {
    slug: 'advanced-writing-workshop',
    title: 'Advanced Writing Workshop',
    description: 'Elevate your writing with advanced techniques in style and rhetoric.',
    image: 'https://picsum.photos/600/400?random=2',
    aiHint: 'writing workshop',
     features: [
      'Develop a compelling writing voice and tone',
      'Master persuasive writing and argumentation',
      'Learn narrative techniques and storytelling',
      'Analyze and critique complex texts',
    ],
  },
  {
    slug: 'business-communication',
    title: 'Business Communication Pro',
    description: 'Write effective emails, reports, and presentations for the modern workplace.',
    image: 'https://picsum.photos/600/400?random=3',
    aiHint: 'business communication',
     features: [
      'Write professional and persuasive emails',
      'Create clear and concise business reports',
      'Design and deliver impactful presentations',
      'Master the art of virtual communication',
    ],
  },
  {
    slug: 'creative-writing-unleashed',
    title: 'Creative Writing Unleashed',
    description: 'Unlock your inner storyteller and bring your imaginative ideas to life.',
    image: 'https://picsum.photos/600/400?random=4',
    aiHint: 'creative writing',
     features: [
      'Explore different genres: fiction, poetry, and non-fiction',
      'Develop memorable characters and compelling plots',
      'Master descriptive language and imagery',
      'Learn the process of revision and editing',
    ],
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
                  Master the Art of Language with Verbigo
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Elevate your writing, perfect your grammar, and communicate with confidence. Our expert-led courses are designed for learners at every level.
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
              data-ai-hint="language learning"
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
                Our Language & Writing Courses
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're starting from scratch or honing your expertise, we have a course for you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {courses.map((course) => (
              <Card key={course.slug} className="group overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-2 duration-300">
                <Link href={`/courses/${course.slug}`}>
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
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-bold text-primary group-hover:text-accent">{course.title}</CardTitle>
                    <p className="mt-2 text-muted-foreground text-sm">{course.description}</p>
                     <div className="flex items-center mt-4 text-primary font-medium">
                      Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="values" className="bg-primary/5 py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
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
             <div className="text-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                    <Link href="/get-demo">Get a Consultation</Link>
                </Button>
            </div>
        </div>
      </section>

      <section id="faq" className="bg-background">
        <div className="container px-4 md:px-6">
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

      <section id="contact" className="bg-primary/5">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
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
      </section>
    </>
  );
}
