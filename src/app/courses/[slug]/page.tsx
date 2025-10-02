
'use client';

import { courses } from '@/lib/courses';
import { Button } from '@/components/ui/button';
import { WhatsAppButtonIcon } from '@/components/whatsapp-button-icon';
import { CheckCircle2, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { whatsapp } from '@/lib/config';

export default function CoursePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }
  
  return (
    <div className="bg-primary/5">
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
               <Link href="/#courses" className="text-sm font-medium text-primary dark:text-primary-foreground hover:underline">
                &larr; Back to Courses
              </Link>
              <div className="flex items-center gap-3">
                <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">
                  Language Course
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter text-primary dark:text-primary-foreground sm:text-5xl">
                {course.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl dark:text-foreground/80">
                {course.description}
              </p>
            </div>
            <ul className="grid gap-4">
              <li className="flex items-center gap-3 font-semibold text-lg text-primary dark:text-primary-foreground">
                  <BookOpen className="h-6 w-6" />
                  What You'll Learn
              </li>
              {course.features?.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-muted-foreground dark:text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 min-[400px]:flex-row pt-4">
              <Button asChild size="lg" className="bg-green-600 text-white hover:bg-white hover:text-green-600 shadow-lg transform hover:-translate-y-1 transition-all duration-300 group" useNeumorphic={false}>
                <Link href={whatsapp.getCourseInquiryUrl(course.title)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppButtonIcon />
                  Enroll via WhatsApp
                </Link>
              </Button>
               <Link href={whatsapp.getCourseDemoUrl(course.title)} target="_blank" rel="noopener noreferrer" className="md:hidden">
                  <button className="btn h-11">
                      <span className="btn-text-one">Book a Demo</span>
                      <span className="btn-text-two">Now</span>
                  </button>
               </Link>
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
      </section>
    </div>
  );
}
