
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Building, Target, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <div className="bg-primary/5 min-h-screen">
      
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">
                Our Story
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-primary dark:text-primary-foreground sm:text-5xl md:text-6xl">
                About Verbigo
              </h1>
              <p className="text-muted-foreground md:text-xl/relaxed dark:text-foreground/80">
                Verbigo was founded on a simple yet powerful idea: that language intelligence is the key to unlocking human potential. We are an e-campus dedicated to helping individuals master the art of language through expert-led courses, personalized feedback, and cutting-edge technology. Our mission is to blend education with technology to create a learner-centric environment where everyone can thrive.
              </p>
               <Button asChild size="lg">
                    <Link href="/#contact">Get in Touch</Link>
                </Button>
            </div>
             <div className="relative h-80 lg:h-96 w-full">
               <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Our Team"
                fill
                className="rounded-xl object-cover shadow-2xl"
                data-ai-hint="diverse team working"
                />
            </div>
          </div>
        </div>
      </section>

       <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary dark:text-primary-foreground">
                    Why Choose Verbigo?
                </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <Card className="p-4 md:p-6 flex flex-col items-center text-center gap-4 bg-background/60 backdrop-blur-sm border-accent/20">
                    <Target className="h-12 w-12 text-accent"/>
                    <h3 className="text-xl font-bold text-primary dark:text-primary-foreground">Our Mission</h3>
                    <p className="text-muted-foreground text-sm dark:text-foreground/80">To empower individuals by making high-quality language education accessible, engaging, and effective through innovative technology.</p>
                </Card>
                 <Card className="p-4 md:p-6 flex flex-col items-center text-center gap-4 bg-background/60 backdrop-blur-sm border-accent/20">
                    <Building className="h-12 w-12 text-accent"/>
                    <h3 className="text-xl font-bold text-primary dark:text-primary-foreground">Our Vision</h3>
                    <p className="text-muted-foreground text-sm dark:text-foreground/80">To become a world leader in language intelligence, creating a global community of confident and proficient communicators.</p>
                </Card>
                <Card className="p-4 md:p-6 flex flex-col items-center text-center gap-4 bg-background/60 backdrop-blur-sm border-accent/20 md:col-span-2 lg:col-span-1">
                    <Users className="h-12 w-12 text-accent"/>
                    <h3 className="text-xl font-bold text-primary dark:text-primary-foreground">Our Team</h3>
                    <p className="text-muted-foreground text-sm dark:text-foreground/80">A dedicated group of educators, technologists, and innovators committed to your success.</p>
                </Card>
            </div>
        </div>
      </section>

    </div>
  );
}
