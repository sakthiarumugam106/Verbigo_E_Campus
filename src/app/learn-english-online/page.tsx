
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, BookOpen, Users, Briefcase, Smile } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learn English Online with Expert Tutors | Verbigo',
  description: 'Improve your English speaking, grammar, vocabulary, and communication skills online with Verbigo. Live tutors, interactive lessons, and personalized learning paths.',
};

const features = [
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: 'Live Expert Tutors',
        description: 'Join classes taught by experienced English trainers who guide you step-by-step.',
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: 'Improve Speaking & Fluency',
        description: 'Daily speaking practice, conversation modules, and real-time feedback.',
    },
    {
        icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
        title: 'Grammar & Vocabulary Training',
        description: 'Strengthen grammar fundamentals and expand your vocabulary with fun exercises.',
    },
    {
        icon: <Smile className="h-8 w-8 text-primary" />,
        title: 'English for Kids',
        description: 'Special phonics-based learning programs designed for children.',
    },
     {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: 'English for Professionals',
        description: 'Learn business English, email writing, interview prep, and communication skills.',
    },
];

const courses = [
    'Spoken English Course',
    'English for Beginners',
    'English Fluency Program',
    'Phonics & Reading Course',
    'Business English Communication',
    'Exam Preparation (IELTS, TOEFL)',
];

export default function LearnEnglishOnlinePage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground mb-4">Learn English Online with Expert Tutors</h1>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-foreground/80">
            Verbigo helps you learn English online through interactive lessons, practice sessions, and personalized training programs. Whether you’re a beginner or looking to improve fluency, our platform offers everything you need to speak English confidently.
          </p>
        </section>

        <section className="py-16 md:py-20">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-foreground mb-12">Why Learn English Online with Verbigo?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="neumorphic-outer p-4 text-center">
                <CardHeader className="flex flex-col items-center gap-4">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground dark:text-foreground/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-20 bg-secondary rounded-lg">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-foreground mb-12">Courses We Offer</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {courses.map((course, index) => (
                        <div key={index} className="flex items-center gap-2 bg-background p-3 rounded-lg neumorphic-inner">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span className="font-medium">{course}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        <section className="text-center max-w-4xl mx-auto py-16 md:py-24">
            <h2 className="text-3xl font-bold text-primary dark:text-primary-foreground mb-4">Start Learning English Today</h2>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-foreground/80 mb-8">
                Improve the way you speak, write, and communicate in English. Join Verbigo and begin your English learning journey now.
            </p>
            <Button asChild size="lg">
                <Link href="/get-demo">Book a Free Demo</Link>
            </Button>
        </section>
      </div>
    </div>
  );
}
