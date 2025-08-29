import { courses } from '@/app/page';
import { Button } from '@/components/ui/button';
import { WhatsAppIcon } from '@/components/whatsapp-button';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  const phoneNumber = '15551234567'; // Replace with a real number
  const message = `Hello Verbigo! I'm interested in the ${course.title} course.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                {course.title}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {course.description}
              </p>
            </div>
            <ul className="grid gap-4">
              {course.features?.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600">
                <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  WhatsApp Now
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={course.image}
              alt={course.title}
              width={600}
              height={600}
              className="rounded-xl object-cover shadow-2xl"
              data-ai-hint={course.aiHint}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
