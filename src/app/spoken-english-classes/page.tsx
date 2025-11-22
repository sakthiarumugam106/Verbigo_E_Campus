
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MessageCircle, Mic, Users, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Spoken English Classes Online | Improve Fluency with Verbigo',
  description: 'Become a confident English speaker with Verbigo’s expert-led spoken English classes. Our training focuses on real-life conversations, pronunciation, and fluency building.',
};

const features = [
    {
        icon: <MessageCircle className="h-8 w-8 text-primary" />,
        title: 'Daily Speaking Practice',
        description: 'Speak with trainers every day in structured conversation sessions.',
    },
    {
        icon: <Mic className="h-8 w-8 text-primary" />,
        title: 'Pronunciation Correction',
        description: 'Improve clarity and reduce mother-tongue influence.',
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: 'Conversation Skills',
        description: 'Learn to speak confidently in office meetings, interviews, social conversations, and public speaking.',
    },
     {
        icon: <Award className="h-8 w-8 text-primary" />,
        title: 'Perfect for All Levels',
        description: 'Tailored curriculum for beginners, intermediate learners, and professionals.',
    },
];

const whyChooseUs = [
    '1:1 live training',
    'Small group sessions',
    'Real-time feedback',
    'Flexible timings',
    'Study materials included',
];

export default function SpokenEnglishClassesPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground mb-4">Spoken English Classes Online</h1>
          <p className="text-lg md:text-xl text-muted-foreground dark:text-foreground/80">
            Become a confident English speaker with Verbigo’s expert-led spoken English classes. Our training focuses on real-life conversations, pronunciation, and fluency building.
          </p>
        </section>

        <section className="py-16 md:py-20">
          <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-foreground mb-12">What You Will Learn</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="neumorphic-outer">
                <CardHeader className="flex flex-row items-center gap-4">
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
                <h2 className="text-3xl font-bold text-center text-primary dark:text-primary-foreground mb-12">Why Choose Verbigo?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
                    {whyChooseUs.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 bg-background p-3 rounded-lg neumorphic-inner">
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="font-medium text-sm">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="text-center max-w-4xl mx-auto py-16 md:py-24">
            <h2 className="text-3xl font-bold text-primary dark:text-primary-foreground mb-4">Start Speaking English Fluently</h2>
            <p className="text-lg md:text-xl text-muted-foreground dark:text-foreground/80 mb-8">
              Join our Spoken English classes today and take the first step towards confident communication.
            </p>
            <Button asChild size="lg">
                <Link href="/get-demo">Join a Class</Link>
            </Button>
        </section>
      </div>
    </div>
  );
}
