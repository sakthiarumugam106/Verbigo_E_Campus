
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, CircleUserRound, Pen, BarChart } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Phonics Learning for Kids | Build Strong English Reading Skills',
  description: 'Verbigo’s phonics learning program helps children read, speak, and understand English naturally. Our structured method improves sound recognition and pronunciation.',
};

const benefits = [
    {
        icon: <CircleUserRound className="h-8 w-8 text-primary" />,
        title: 'Clear Speaking',
    },
    {
        icon: <BookText className="h-8 w-8 text-primary" />,
        title: 'Strong Reading Skills',
    },
    {
        icon: <Pen className="h-8 w-8 text-primary" />,
        title: 'Better Spelling',
    },
    {
        icon: <BarChart className="h-8 w-8 text-primary" />,
        title: 'Vocabulary Growth',
    },
];

const features = [
    {
        title: 'Sound Recognition',
        description: 'Kids learn all 44 English sounds through fun and interactive activities, building a strong auditory foundation.',
    },
    {
        title: 'Reading Practice',
        description: 'Our step-by-step reading modules are designed to build confidence and fluency from the very first word.',
    },
    {
        title: 'Phonics Games & Stories',
        description: 'We use engaging lessons with memorable games and stories to make learning phonics a joyful experience.',
    },
];

export default function PhonicsLearningPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground mb-4">Phonics Learning for Kids</h1>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-foreground/80">
            Verbigo’s phonics learning program helps children read, speak, and understand English naturally. Our structured method improves sound recognition and pronunciation.
          </p>
        </section>

        <section className="py-16 md:py-20">
            <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-foreground mb-12">Why Phonics is the Foundation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-col items-center text-center gap-3">
                        <div className="p-4 bg-primary/10 rounded-full">
                            {benefit.icon}
                        </div>
                        <h3 className="font-semibold text-lg">{benefit.title}</h3>
                    </div>
                ))}
            </div>
        </section>

        <section className="py-16 md:py-20 bg-secondary rounded-lg">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-foreground mb-12">What We Teach</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="neumorphic-outer p-4 text-center">
                  <CardHeader>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground dark:text-foreground/80">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center max-w-4xl mx-auto py-16 md:py-24">
            <h2 className="text-3xl font-bold text-primary dark:text-primary-foreground mb-4">Give Your Child the Best Start</h2>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-foreground/80 mb-8">
                Enroll in Verbigo’s phonics learning program and watch your child blossom into a confident reader and speaker.
            </p>
            <Button asChild size="lg">
                <Link href="/get-demo">Enroll Now</Link>
            </Button>
        </section>
      </div>
    </div>
  );
}
