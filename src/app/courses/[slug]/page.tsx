import { courses } from '@/app/page';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/whatsapp-button';
import { CheckCircle2, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const phoneNumber = '15551234567';
  const message = `Hello Verbigo! I'm interested in the ${course.title} course.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="bg-primary/5">
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                 <Link href="/" className="text-sm font-medium text-primary hover:underline">
                  &larr; Back to All Courses
                </Link>
                <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">
                  Language Course
                </div>
                <h1 className="text-4xl font-bold tracking-tighter text-primary sm:text-5xl">
                  {course.title}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {course.description}
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-center gap-3 font-semibold text-lg text-primary">
                    <BookOpen className="h-6 w-6" />
                    What You'll Learn
                </li>
                {course.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                    Enroll via WhatsApp
                  </Link>
                </Button>
                 <Button asChild size="lg" variant="outline" className="shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <Link href="/get-demo">
                    Schedule a Consultation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={course.image}
                alt={course.title}
                width={700}
                height={700}
                className="w-full h-full object-cover"
                data-ai-hint={course.aiHint}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
